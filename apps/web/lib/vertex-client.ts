import { VertexAI } from '@google-cloud/vertexai';

/**
 * Shared Vertex AI client — handles authentication for both
 * local development (ADC) and Vercel deployment (service account JSON).
 */
let vertexInstance: VertexAI | null = null;

export function getVertexAI(): VertexAI {
  if (vertexInstance) return vertexInstance;

  const project = process.env.GCP_PROJECT_ID || 'bigmuddy-ff651';
  const location = process.env.VERTEX_LOCATION || 'us-east4';

  // On Vercel, use the service account JSON from env
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (credentialsJson) {
    const credentials = JSON.parse(credentialsJson);
    // Set the credentials file path for the Google Auth library
    process.env.GOOGLE_APPLICATION_CREDENTIALS = '/tmp/gcp-credentials.json';
    require('fs').writeFileSync('/tmp/gcp-credentials.json', credentialsJson);
  }

  vertexInstance = new VertexAI({ project, location });
  return vertexInstance;
}

export function getGeminiModel(modelName: string = 'gemini-2.5-flash') {
  return getVertexAI().getGenerativeModel({ model: modelName });
}
