// lib/imagen.ts
// Google Vertex AI Imagen helper for image generation + editing
// Uses Application Default Credentials (same as gcs.ts)

import { PredictionServiceClient, helpers } from '@google-cloud/aiplatform';

const PROJECT_ID = process.env.GCP_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || '';
const LOCATION = process.env.VERTEX_AI_LOCATION || 'us-central1';

const GENERATE_MODEL = 'imagen-3.0-generate-002';
const EDIT_MODEL = 'imagen-3.0-capability-001';

const generateEndpoint = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${GENERATE_MODEL}`;
const editEndpoint = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${EDIT_MODEL}`;

// Lazy-init client to avoid cold-start overhead on non-generate requests
let client: PredictionServiceClient | null = null;

function getClient(): PredictionServiceClient {
  if (!client) {
    // On Vercel, credentials come from GOOGLE_APPLICATION_CREDENTIALS_JSON env var
    // On local dev, ADC or GOOGLE_APPLICATION_CREDENTIALS file works
    const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    if (credsJson) {
      try {
        const creds = JSON.parse(credsJson);
        client = new PredictionServiceClient({
          apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
          credentials: {
            client_email: creds.client_email,
            private_key: creds.private_key,
          },
          projectId: creds.project_id,
        } as any);
      } catch {
        console.error('[imagen] Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON');
        client = new PredictionServiceClient({
          apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
        });
      }
    } else {
      client = new PredictionServiceClient({
        apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
      });
    }
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
    endpoint: generateEndpoint,
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

// ── AI Photo Enhancement ──

// Default enhancement prompt suffix applied to all AI enhancements.
// Ensures consistency with the BMM editorial aesthetic.
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
 * Enhance/edit an existing photo using Vertex AI Imagen editing.
 * Sends the source image + prompt to preserve content while improving aesthetics.
 * Returns an array of PNG buffers.
 */
export async function editImage(
  sourceImage: Buffer,
  options: EditImageOptions = {}
): Promise<Buffer[]> {
  if (!PROJECT_ID) {
    throw new Error('GCP_PROJECT_ID or GOOGLE_CLOUD_PROJECT must be set');
  }

  const {
    prompt = 'Enhance this photograph',
    sampleCount = 1,
  } = options;

  const fullPrompt = `${prompt}. ${BMM_STYLE_SUFFIX}`;
  const sourceB64 = sourceImage.toString('base64');

  const parameters = helpers.toValue({
    sampleCount,
    editConfig: {
      editMode: 'inpainting-insert',
    },
  });

  const instance = helpers.toValue({
    prompt: fullPrompt,
    image: {
      bytesBase64Encoded: sourceB64,
    },
  });

  const [response] = await getClient().predict({
    endpoint: editEndpoint,
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
    throw new Error('No enhanced images returned — the image may have been blocked by safety filters');
  }

  return buffers;
}
