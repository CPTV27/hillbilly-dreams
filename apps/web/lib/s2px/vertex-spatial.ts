// lib/s2px/vertex-spatial.ts
// ─────────────────────────────────────────────────────────────
// S2PX Spatial Intelligence — Vertex AI / Gemini 2.5 Flash Wrapper
// ─────────────────────────────────────────────────────────────
// Deterministic extraction. Strict JSON schema output.
// No prompt engineering voodoo — structured output mode only.
//
// GCP Auth: Uses Application Default Credentials (ADC) natively
// via the @google-cloud/vertexai SDK.
// ─────────────────────────────────────────────────────────────

import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai';
import type { CapacityMetrics } from './types';

const VERTEX_PROJECT_ID = process.env.VERTEX_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || 'bigmuddy-ff651';
const VERTEX_LOCATION = process.env.VERTEX_LOCATION || 'us-east4';
const VERTEX_MODEL = 'gemini-3.1-pro'; // Spatial analysis requires reasoning

/**
 * The strict JSON schema sent to Gemini structured output.
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
 * Extract CapacityMetrics from a GCS-stored spatial asset using Gemini 2.5 Flash.
 */
export async function extractCapacityMetrics(
  gcsUri: string,
  mimeType: string = 'video/mp4'
): Promise<{ metrics: CapacityMetrics; model: string; confidence: number }> {
  const vertexAI = new VertexAI({ project: VERTEX_PROJECT_ID, location: VERTEX_LOCATION });
  
  const generativeModel = vertexAI.getGenerativeModel({
    model: VERTEX_MODEL,
    safetySettings: [{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: CAPACITY_METRICS_SCHEMA as any,
      temperature: 0.1,
      maxOutputTokens: 4096,
    },
  });

  const request = {
    contents: [
      {
        role: 'user',
        parts: [
          { fileData: { mimeType, fileUri: gcsUri } },
          { text: 'Analyze this spatial scan. Extract all capacity metrics according to the schema. Be thorough and conservative in your estimates.' },
        ],
      },
    ],
    systemInstruction: { role: 'system', parts: [{ text: SYSTEM_PROMPT }] },
  };

  const responseStream = await generativeModel.generateContentStream(request);
  const result = await responseStream.response;

  const content = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error('[vertex-spatial] No content in Vertex AI response');
  }

  const metrics: CapacityMetrics = JSON.parse(content);

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
