// lib/s2px/ingestion.ts
// ─────────────────────────────────────────────────────────────
// S2PX Spatial Intelligence — Ingestion Service
// ─────────────────────────────────────────────────────────────
// Handles GCS upload events. Processes spatial scans through
// the Vertex AI pipeline and persists extracted capacity metrics.
//
// Architecture:
//   GCS Upload → Eventarc/Webhook → This service → Vertex AI → DB
//
// State machine: PENDING → ANALYZING → MAPPED (or ERROR)
// ─────────────────────────────────────────────────────────────

import { prisma } from '@/lib/db';
import { extractCapacityMetrics } from './vertex-spatial';
import type { GCSObjectEvent, IngestionResult, ScanStatus, EstimatedQuote, QuoteLineItem } from './types';

/**
 * Infer MIME type from GCS object key.
 */
function inferMimeType(objectName: string): string {
  const ext = objectName.split('.').pop()?.toLowerCase();
  const map: Record<string, string> = {
    mp4: 'video/mp4', mov: 'video/quicktime', avi: 'video/x-msvideo',
    las: 'application/vnd.las', laz: 'application/vnd.laszip',
    e57: 'application/x-e57', ply: 'application/x-ply',
    pdf: 'application/pdf', jpg: 'image/jpeg', png: 'image/png',
    webp: 'image/webp',
  };
  return map[ext || ''] || 'application/octet-stream';
}

/**
 * Build a GCS URI from bucket and object name.
 */
function gcsUri(bucket: string, name: string): string {
  return `gs://${bucket}/${name}`;
}

/**
 * Generate a deterministic quote from extracted capacity metrics.
 * This is the "auto-quote from form data" referenced in the deployment roadmap.
 */
function generateQuoteFromMetrics(metrics: {
  totalSquareFootage: number;
  roomCount: number;
  hazards: { severity: string }[];
  lotOfDetail: number;
}): EstimatedQuote {
  const sqft = metrics.totalSquareFootage;
  const lineItems: QuoteLineItem[] = [];

  // Base scan fee: $1.20/sqft
  lineItems.push({
    label: `Scan (LOD ${metrics.lotOfDetail}, ${sqft.toLocaleString()} SF)`,
    amountCents: Math.round(sqft * 120),
    unit: 'sqft',
    quantity: sqft,
  });

  // BIM modeling: $1.60/sqft for LOD 300+
  if (metrics.lotOfDetail >= 300) {
    lineItems.push({
      label: `BIM Model (Revit, LOD ${metrics.lotOfDetail})`,
      amountCents: Math.round(sqft * 160),
      unit: 'sqft',
      quantity: sqft,
    });
  }

  // Point cloud registration: flat fee per room
  lineItems.push({
    label: 'Point Cloud Registration',
    amountCents: metrics.roomCount * 30000, // $300/room
    unit: 'rooms',
    quantity: metrics.roomCount,
  });

  // Hazard surcharge: $500 per high/critical hazard
  const criticalHazards = metrics.hazards.filter(
    h => h.severity === 'high' || h.severity === 'critical'
  ).length;
  if (criticalHazards > 0) {
    lineItems.push({
      label: 'Hazard Assessment Surcharge',
      amountCents: criticalHazards * 50000,
      unit: 'hazards',
      quantity: criticalHazards,
    });
  }

  const totalCents = lineItems.reduce((sum, item) => sum + item.amountCents, 0);

  return {
    lineItems,
    totalCents,
    estimatedMarginPercent: 68.2, // S2PX target margin from proposal
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Process a single spatial scan through the Vertex AI pipeline.
 * This is the core ingestion function called by the webhook handler.
 *
 * @param scanId - Database ID of the SpatialScan record
 * @returns IngestionResult with extracted metrics or error
 */
export async function processSpatialScan(scanId: string): Promise<IngestionResult> {
  const startTime = Date.now();

  // 1. Load scan record
  const scan = await (prisma as any).spatialScan.findUnique({
    where: { id: scanId },
    include: { node: true },
  });

  if (!scan) {
    return {
      scanId, nodeId: '', status: 'ERROR' as ScanStatus,
      error: `Scan ${scanId} not found`, durationMs: Date.now() - startTime,
    };
  }

  // 2. Transition to ANALYZING
  await (prisma as any).spatialScan.update({
    where: { id: scanId },
    data: { status: 'ANALYZING', processingStartedAt: new Date() },
  });

  try {
    // 3. Determine primary asset for analysis
    const assetUri = scan.gcsVideoUri || scan.gcsPointCloudUri || scan.gcsFloorPlanUri;
    if (!assetUri) {
      throw new Error('No GCS asset URI found on scan record');
    }

    // 4. Extract the bucket/path from gs:// URI and infer MIME
    const uriPath = assetUri.replace('gs://', '');
    const objectName = uriPath.substring(uriPath.indexOf('/') + 1);
    const mimeType = inferMimeType(objectName);

    // 5. Call Vertex AI
    console.log(`[s2px/ingestion] Processing scan ${scanId} — asset: ${assetUri}`);
    const { metrics, model, confidence } = await extractCapacityMetrics(assetUri, mimeType);

    // 6. Generate auto-quote
    const quote = generateQuoteFromMetrics(metrics);

    // 7. Persist results — transition to MAPPED
    await (prisma as any).spatialScan.update({
      where: { id: scanId },
      data: {
        status: 'MAPPED',
        processingCompletedAt: new Date(),
        capacityMetrics: metrics,
        aiModelVersion: model,
        aiConfidence: confidence,
        estimatedQuote: quote,
        quoteTotalCents: quote.totalCents,
      },
    });

    console.log(`[s2px/ingestion] Scan ${scanId} → MAPPED. Total: $${(quote.totalCents / 100).toFixed(2)}`);

    return {
      scanId, nodeId: scan.nodeId, status: 'MAPPED',
      capacityMetrics: metrics, aiModelVersion: model, aiConfidence: confidence,
      durationMs: Date.now() - startTime,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[s2px/ingestion] Scan ${scanId} → ERROR:`, errorMsg);

    // Transition to ERROR
    await (prisma as any).spatialScan.update({
      where: { id: scanId },
      data: {
        status: 'ERROR',
        errorMessage: errorMsg,
        processingCompletedAt: new Date(),
      },
    });

    return {
      scanId, nodeId: scan.nodeId, status: 'ERROR',
      error: errorMsg, durationMs: Date.now() - startTime,
    };
  }
}

/**
 * Handle a GCS object creation event (Eventarc webhook).
 * Routes the event to the correct scan record and triggers processing.
 *
 * Expected GCS object metadata:
 *   - x-goog-meta-nodeid: HDXNode ID
 *   - x-goog-meta-scanid: SpatialScan ID (if pre-created)
 *
 * If no scanId is provided, a new SpatialScan record is created.
 */
export async function handleGCSUploadEvent(event: GCSObjectEvent): Promise<IngestionResult> {
  const { bucket, name: objectName, metadata } = event;
  const nodeId = metadata?.['x-goog-meta-nodeid'] || metadata?.nodeid;
  const scanId = metadata?.['x-goog-meta-scanid'] || metadata?.scanid;

  if (!nodeId) {
    throw new Error(`[s2px/ingestion] GCS event missing nodeId metadata: ${objectName}`);
  }

  // Verify node exists
  const node = await (prisma as any).hdxNode.findUnique({ where: { id: nodeId } });
  if (!node) {
    throw new Error(`[s2px/ingestion] HDXNode ${nodeId} not found`);
  }

  const fullUri = gcsUri(bucket, objectName);
  const mimeType = inferMimeType(objectName);

  // Determine which GCS field to populate based on content type
  const gcsFields: Record<string, string> = {};
  if (mimeType.startsWith('video/')) {
    gcsFields.gcsVideoUri = fullUri;
  } else if (mimeType.includes('las') || mimeType.includes('e57') || mimeType.includes('ply')) {
    gcsFields.gcsPointCloudUri = fullUri;
  } else if (mimeType === 'application/pdf') {
    gcsFields.gcsFloorPlanUri = fullUri;
  } else if (mimeType.startsWith('image/')) {
    gcsFields.gcsThumbnailUri = fullUri;
    // Thumbnails don't trigger processing
    return {
      scanId: scanId || 'thumbnail-only', nodeId,
      status: 'PENDING', durationMs: 0,
    };
  }

  let resolvedScanId = scanId;

  if (scanId) {
    // Update existing scan with new asset URI
    await (prisma as any).spatialScan.update({
      where: { id: scanId },
      data: gcsFields,
    });
  } else {
    // Create new scan record
    const newScan = await (prisma as any).spatialScan.create({
      data: {
        nodeId,
        status: 'PENDING',
        ...gcsFields,
      },
    });
    resolvedScanId = newScan.id;
  }

  // Trigger processing
  return processSpatialScan(resolvedScanId!);
}
