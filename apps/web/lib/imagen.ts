// lib/imagen.ts
// Google Vertex AI Imagen helper for image generation
// Uses Application Default Credentials (same as gcs.ts)

import { PredictionServiceClient, helpers } from '@google-cloud/aiplatform';

const PROJECT_ID = process.env.GCP_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || '';
const LOCATION = process.env.VERTEX_AI_LOCATION || 'us-central1';
const MODEL = 'imagen-3.0-generate-002';

const endpoint = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}`;

// Lazy-init client to avoid cold-start overhead on non-generate requests
let client: PredictionServiceClient | null = null;

function getClient(): PredictionServiceClient {
  if (!client) {
    client = new PredictionServiceClient({
      apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
    });
  }
  return client;
}

export interface GenerateImageOptions {
  negativePrompt?: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
  sampleCount?: number; // 1-4
}

/**
 * Generate images from a text prompt using Vertex AI Imagen.
 * Returns an array of PNG buffers.
 */
export async function generateImage(
  prompt: string,
  options: GenerateImageOptions = {}
): Promise<Buffer[]> {
  if (!PROJECT_ID) {
    throw new Error('GCP_PROJECT_ID or GOOGLE_CLOUD_PROJECT must be set');
  }

  const { negativePrompt, aspectRatio = '16:9', sampleCount = 1 } = options;

  const parameters = helpers.toValue({
    sampleCount,
    aspectRatio,
    ...(negativePrompt ? { negativePrompt } : {}),
  });

  const instance = helpers.toValue({ prompt });

  const [response] = await getClient().predict({
    endpoint,
    instances: [instance!],
    parameters,
  });

  const buffers: Buffer[] = [];

  if (response.predictions) {
    for (const prediction of response.predictions) {
      const b64 = prediction.structValue?.fields?.bytesBase64Encoded?.stringValue;
      if (b64) {
        buffers.push(Buffer.from(b64, 'base64'));
      }
    }
  }

  if (buffers.length === 0) {
    throw new Error('No images returned — prompt may have been blocked by safety filters');
  }

  return buffers;
}
