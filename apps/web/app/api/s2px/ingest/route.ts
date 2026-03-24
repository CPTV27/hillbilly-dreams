// app/api/s2px/ingest/route.ts
// ─────────────────────────────────────────────────────────────
// S2PX Ingestion Webhook — GCS Eventarc / Manual Trigger
// ─────────────────────────────────────────────────────────────
// POST /api/s2px/ingest
//
// Accepts two trigger modes:
//   1. Eventarc: GCS object finalize event (Cloud Storage → Eventarc → this route)
//   2. Manual:   { scanId: "..." } to reprocess an existing scan
//
// Auth: HMAC signature verification or internal service-to-service auth.
// ─────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { handleGCSUploadEvent, processSpatialScan } from '@/lib/s2px';
import type { GCSObjectEvent } from '@/lib/s2px';

/**
 * Verify Eventarc HMAC signature (if configured).
 * In production, use the EVENTARC_WEBHOOK_SECRET env var.
 */
async function verifyEventarcAuth(request: NextRequest): Promise<boolean> {
  const secret = process.env.EVENTARC_WEBHOOK_SECRET;
  if (!secret) {
    // No secret configured — allow in dev, block in production
    return process.env.NODE_ENV !== 'production';
  }

  const signature = request.headers.get('x-goog-signature') || request.headers.get('authorization');
  if (!signature) return false;

  // For Cloud Run internal auth, the Authorization header contains a valid OIDC token
  // Eventarc automatically authenticates when configured with a service account
  // Simple bearer check for now — upgrade to OIDC verification in production
  return signature === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  // Auth check
  const isAuthorized = await verifyEventarcAuth(request);
  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Mode 1: Manual trigger with scanId
    if (body.scanId && typeof body.scanId === 'string') {
      console.log(`[s2px/ingest] Manual trigger for scan: ${body.scanId}`);
      const result = await processSpatialScan(body.scanId);
      return NextResponse.json(result, {
        status: result.status === 'ERROR' ? 500 : 200,
      });
    }

    // Mode 2: Eventarc GCS object finalize event
    // Eventarc wraps the event in a CloudEvents envelope
    const gcsEvent: GCSObjectEvent = body.data || body;

    if (!gcsEvent.bucket || !gcsEvent.name) {
      return NextResponse.json(
        { error: 'Invalid event: missing bucket or name' },
        { status: 400 }
      );
    }

    // Filter: only process S2PX scan assets
    const isS2PXAsset = gcsEvent.name.startsWith('scans/') ||
                        gcsEvent.name.startsWith('s2px/') ||
                        gcsEvent.metadata?.['x-goog-meta-nodeid'];

    if (!isS2PXAsset) {
      return NextResponse.json({
        message: 'Ignored: not an S2PX scan asset',
        object: gcsEvent.name,
      }, { status: 200 });
    }

    console.log(`[s2px/ingest] GCS event: ${gcsEvent.bucket}/${gcsEvent.name}`);
    const result = await handleGCSUploadEvent(gcsEvent);

    return NextResponse.json(result, {
      status: result.status === 'ERROR' ? 500 : 200,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[s2px/ingest] Unhandled error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** Health check / status endpoint */
export async function GET() {
  return NextResponse.json({
    service: 's2px-ingestion',
    version: '1.0.0',
    status: 'operational',
    model: 'gemini-1.5-pro-002',
    location: 'us-east4',
  });
}
