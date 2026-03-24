// lib/s2px/vertex-spatial.ts
// ─────────────────────────────────────────────────────────────
// S2PX Spatial Intelligence — Vertex AI / Gemini 1.5 Pro Wrapper
// ─────────────────────────────────────────────────────────────
// Deterministic extraction. Strict JSON schema output.
// No prompt engineering voodoo — structured output mode only.
//
// GCP Auth: Uses Application Default Credentials (ADC).
//   - Cloud Run: automatic via service account
//   - Local dev: `gcloud auth application-default login`
// ─────────────────────────────────────────────────────────────

import type { CapacityMetrics } from './types';

const VERTEX_MODEL = 'gemini-1.5-pro-002';
const VERTEX_LOCATION = 'us-east4';

/**
 * The strict JSON schema sent to Gemini structured output.
 * This forces deterministic responses — no prose, no hallucination.
 */
const CAPACITY_METRICS_SCHEMA = {
  type: 'OBJECT',
  properties: {
    totalSquareFootage: { type: 'NUMBER', description: 'Total estimated square footage of the scanned area' },
    floorCount: { type: 'INTEGER', description: 'Number of floors/levels detected' },
    ceilingHeightFt: { type: 'NUMBER', description: 'Average ceiling height in feet' },
    occupancyLimit: { type: 'INTEGER', nullable: true, description: 'Estimated maximum occupancy based on IBC/NFPA standards, null if indeterminate' },
    materials: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING', description: 'Material name, e.g. "exposed brick", "drywall (painted)"' },
          confidence: { type: 'NUMBER', description: 'Detection confidence 0.0-1.0' },
          estimatedAreaSqft: { type: 'NUMBER', description: 'Estimated area of this material in square feet' },
          location: { type: 'STRING', description: 'Location description, e.g. "NE wall", "ceiling"' },
        },
        required: ['name', 'confidence', 'estimatedAreaSqft'],
      },
    },
    structuralElements: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          type: { type: 'STRING', description: 'Element type, e.g. "steel beam", "load-bearing wall"' },
          count: { type: 'INTEGER' },
          material: { type: 'STRING' },
          condition: { type: 'STRING', description: 'Condition assessment: good | fair | requires inspection' },
        },
        required: ['type', 'count'],
      },
    },
    hazards: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          type: { type: 'STRING', description: 'Hazard type, e.g. "water_damage", "asbestos_suspect"' },
          severity: { type: 'STRING', enum: ['low', 'moderate', 'high', 'critical'] },
          location: { type: 'STRING', description: 'Location of the hazard' },
          notes: { type: 'STRING' },
        },
        required: ['type', 'severity', 'location'],
      },
    },
    roomCount: { type: 'INTEGER', description: 'Number of distinct rooms/spaces detected' },
    lotOfDetail: { type: 'INTEGER', description: 'Level of detail: 100, 200, 300, or 400' },
    scanPointCount: { type: 'INTEGER', description: 'Estimated LiDAR point cloud density' },
    notes: { type: 'STRING', description: 'Free-text observations about the space' },
  },
  required: [
    'totalSquareFootage', 'floorCount', 'ceilingHeightFt', 'occupancyLimit',
    'materials', 'structuralElements', 'hazards', 'roomCount', 'lotOfDetail',
    'scanPointCount', 'notes',
  ],
};

/**
 * System prompt for spatial analysis. No personality — pure extraction.
 */
const SYSTEM_PROMPT = `You are a spatial analysis engine for the S2PX platform. You analyze walk-through videos and LiDAR point cloud data of commercial, residential, and industrial spaces.

Your job is to extract deterministic capacity metrics from the provided spatial data. You must:
1. Estimate total square footage from the spatial geometry.
2. Identify and catalog all visible materials with confidence scores.
3. Detect structural elements (beams, columns, load-bearing walls).
4. Flag any hazards (water damage, suspected asbestos, structural cracks).
5. Estimate occupancy limits based on IBC/NFPA standards for the detected space type.
6. Count distinct rooms/spaces.
7. Assess the Level of Detail (LOD) achievable from the scan quality.

Be conservative in estimates. Round square footage to the nearest 10. Flag any measurement you are less than 75% confident about in the notes field.`;

/**
 * Extract CapacityMetrics from a GCS-stored spatial asset using Gemini 1.5 Pro.
 *
 * @param gcsUri - Cloud Storage URI (gs://bucket/path/file)
 * @param mimeType - MIME type of the asset (video/mp4, application/las, etc.)
 * @returns Parsed CapacityMetrics or throws on failure
 */
export async function extractCapacityMetrics(
  gcsUri: string,
  mimeType: string = 'video/mp4'
): Promise<{ metrics: CapacityMetrics; model: string; confidence: number }> {
  const projectId = process.env.GCP_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;
  if (!projectId) throw new Error('[vertex-spatial] GCP_PROJECT_ID is not configured');

  const endpoint = `https://${VERTEX_LOCATION}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${VERTEX_LOCATION}/publishers/google/models/${VERTEX_MODEL}:generateContent`;

  // Get ADC token
  const tokenRes = await fetch('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token', {
    headers: { 'Metadata-Flavor': 'Google' },
  }).catch(() => null);

  let accessToken: string;
  if (tokenRes?.ok) {
    // Running on GCP (Cloud Run, GCE, etc.)
    const tokenData = await tokenRes.json();
    accessToken = tokenData.access_token;
  } else {
    // Local dev: use gcloud CLI token
    const { execSync } = await import('child_process');
    accessToken = execSync('gcloud auth print-access-token', { encoding: 'utf-8' }).trim();
  }

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            fileData: {
              mimeType,
              fileUri: gcsUri,
            },
          },
          {
            text: 'Analyze this spatial scan. Extract all capacity metrics according to the schema. Be thorough and conservative in your estimates.',
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: CAPACITY_METRICS_SCHEMA,
      temperature: 0.1,      // Near-deterministic
      maxOutputTokens: 4096,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`[vertex-spatial] Vertex AI returned ${response.status}: ${errBody}`);
  }

  const result = await response.json();
  const content = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error('[vertex-spatial] No content in Vertex AI response');
  }

  const metrics: CapacityMetrics = JSON.parse(content);

  // Calculate overall confidence as average of material confidences
  const materialConfidences = metrics.materials.map(m => m.confidence);
  const avgConfidence = materialConfidences.length > 0
    ? materialConfidences.reduce((a, b) => a + b, 0) / materialConfidences.length
    : 0.5;

  return {
    metrics,
    model: VERTEX_MODEL,
    confidence: Math.round(avgConfidence * 100) / 100,
  };
}
