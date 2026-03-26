// lib/vertex-embeddings.ts
// Vertex AI text-embedding-005 service (768 dimensions)
// Used by embedding-pipeline.ts and vector-search.ts
//
// Auth: Uses Application Default Credentials (ADC) via @google-cloud/vertexai

import { VertexAI } from '@google-cloud/vertexai';

const VERTEX_PROJECT = process.env.VERTEX_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || 'bigmuddy-ff651';
const VERTEX_LOCATION = process.env.VERTEX_LOCATION || 'us-east4';
const EMBEDDING_MODEL = 'text-embedding-005';
const EMBEDDING_DIMENSIONS = 768;
const MAX_BATCH_SIZE = 250; // Vertex AI batch limit

let vertexAI: VertexAI | null = null;

function getVertexAI(): VertexAI {
  if (!vertexAI) {
    vertexAI = new VertexAI({
      project: VERTEX_PROJECT,
      location: VERTEX_LOCATION,
    });
  }
  return vertexAI;
}

/**
 * Generate a single embedding vector from text.
 * Returns a 768-dimensional float array.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const results = await generateEmbeddings([text]);
  return results[0];
}

/**
 * Generate embeddings for multiple texts in a single API call.
 * Vertex AI supports up to 250 texts per batch.
 * Returns array of 768-dimensional vectors in the same order as input.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const ai = getVertexAI();
  const model = ai.getGenerativeModel({ model: EMBEDDING_MODEL });

  const allVectors: number[][] = [];

  // Process in batches of MAX_BATCH_SIZE
  for (let i = 0; i < texts.length; i += MAX_BATCH_SIZE) {
    const batch = texts.slice(i, i + MAX_BATCH_SIZE);

    // Use the prediction API for embeddings
    // The @google-cloud/vertexai SDK routes through the generative model
    // but for embeddings we need the prediction endpoint
    const response = await fetch(
      `https://${VERTEX_LOCATION}-aiplatform.googleapis.com/v1/projects/${VERTEX_PROJECT}/locations/${VERTEX_LOCATION}/publishers/google/models/${EMBEDDING_MODEL}:predict`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`,
        },
        body: JSON.stringify({
          instances: batch.map((text) => ({ content: text })),
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vertex AI embedding failed (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const vectors = data.predictions.map(
      (p: { embeddings: { values: number[] } }) => p.embeddings.values
    );

    // Validate dimensions
    for (const v of vectors) {
      if (v.length !== EMBEDDING_DIMENSIONS) {
        throw new Error(`Expected ${EMBEDDING_DIMENSIONS} dimensions, got ${v.length}`);
      }
    }

    allVectors.push(...vectors);
  }

  return allVectors;
}

/**
 * Get an access token from ADC for direct REST calls.
 * Uses the Google Auth library that ships with @google-cloud/vertexai.
 */
async function getAccessToken(): Promise<string> {
  const { GoogleAuth } = await import('google-auth-library');
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  if (!tokenResponse.token) {
    throw new Error('Failed to get access token from ADC');
  }
  return tokenResponse.token;
}

export { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL };
