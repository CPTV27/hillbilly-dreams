export const dynamic = 'force-dynamic';
// POST /api/media/video — generate video via Vertex AI Veo 3.1
// Returns a GCS URL to the generated video

import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

const PROJECT_ID = process.env.GCP_PROJECT_ID || 'bigmuddy-ff651';
const LOCATION = 'us-central1';

function getAuth() {
  const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credsJson) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON not set');
  return new GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      duration = 5,
      quality = 'draft', // draft = fast, premium = full quality
    } = body as { prompt: string; duration?: number; quality?: 'draft' | 'premium' };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
    }

    const model = quality === 'premium' ? 'veo-3.1-generate-001' : 'veo-3.1-fast-generate-001';

    const auth = getAuth();
    const client = await auth.getClient();
    const token = (await client.getAccessToken()).token;

    // Veo uses the long-running operations pattern
    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${model}:predictLongRunning`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          videoDuration: `${duration}s`,
          sampleCount: 1,
        },
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Veo API error: ${errText}` }, { status: res.status });
    }

    const data = await res.json();

    // Veo returns an operation — the video generates async
    return NextResponse.json({
      success: true,
      operationId: data.name || null,
      model,
      prompt,
      duration,
      note: 'Video generation is async. Poll the operation ID for completion.',
    });
  } catch (err: any) {
    console.error('[video] Error:', err);
    return NextResponse.json({ error: err.message || 'Video generation failed' }, { status: 500 });
  }
}
