// lib/imagen.ts
// Google Vertex AI Imagen — REST API approach (works on Vercel)
// Uses GoogleAuth for credentials instead of PredictionServiceClient

import { GoogleAuth } from 'google-auth-library';

const PROJECT_ID = process.env.GCP_PROJECT_ID || 'bigmuddy-ff651';
const LOCATION = process.env.VERTEX_AI_LOCATION || 'us-central1';
const GENERATE_MODEL = 'imagen-3.0-generate-002';

function getAuth() {
  const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credsJson) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON not set');
  return new GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
}

export interface GenerateImageOptions {
  negativePrompt?: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
  sampleCount?: number;
}

/**
 * Generate images from a text prompt using Vertex AI Imagen REST API.
 * Returns an array of PNG buffers.
 */
export async function generateImage(
  prompt: string,
  options: GenerateImageOptions = {}
): Promise<Buffer[]> {
  const { negativePrompt, aspectRatio = '16:9', sampleCount = 1 } = options;

  const auth = getAuth();
  const client = await auth.getClient();
  const token = (await client.getAccessToken()).token;

  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${GENERATE_MODEL}:predict`;

  const parameters: Record<string, unknown> = {
    sampleCount,
    aspectRatio,
  };
  if (negativePrompt) parameters.negativePrompt = negativePrompt;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters,
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 429) throw new Error('Imagen rate limit exceeded — try again in a moment');
    if (res.status === 400 && errText.includes('safety')) throw new Error('Prompt blocked by safety filters');
    throw new Error(`Imagen API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const buffers: Buffer[] = [];

  if (data.predictions) {
    for (const prediction of data.predictions) {
      const b64 = prediction.bytesBase64Encoded;
      if (b64) buffers.push(Buffer.from(b64, 'base64'));
    }
  }

  if (buffers.length === 0) {
    throw new Error('No images returned — prompt may have been blocked by safety filters');
  }

  return buffers;
}

// ── AI Photo Enhancement ──

const BMM_STYLE_SUFFIX =
  'Maintain the authentic content and composition of the original photograph. ' +
  'Improve lighting, color balance, and clarity. ' +
  'Apply a warm, editorial tone with rich shadows and natural contrast. ' +
  'The result should feel like a high-end travel or music magazine photograph.';

export interface EditImageOptions {
  prompt?: string;
  sampleCount?: number;
}

/**
 * Enhance/edit an existing photo using Vertex AI Imagen editing REST API.
 */
export async function editImage(
  sourceImage: Buffer,
  options: EditImageOptions = {}
): Promise<Buffer[]> {
  const { prompt = 'Enhance this photograph', sampleCount = 1 } = options;
  const fullPrompt = `${prompt}. ${BMM_STYLE_SUFFIX}`;
  const sourceB64 = sourceImage.toString('base64');

  const auth = getAuth();
  const client = await auth.getClient();
  const token = (await client.getAccessToken()).token;

  const EDIT_MODEL = 'imagen-3.0-capability-001';
  const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${EDIT_MODEL}:predict`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instances: [{
        prompt: fullPrompt,
        image: { bytesBase64Encoded: sourceB64 },
      }],
      parameters: {
        sampleCount,
        editConfig: { editMode: 'inpainting-insert' },
      },
    }),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Imagen edit API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const buffers: Buffer[] = [];

  if (data.predictions) {
    for (const prediction of data.predictions) {
      const b64 = prediction.bytesBase64Encoded;
      if (b64) buffers.push(Buffer.from(b64, 'base64'));
    }
  }

  if (buffers.length === 0) {
    throw new Error('No enhanced images returned — the image may have been blocked by safety filters');
  }

  return buffers;
}
