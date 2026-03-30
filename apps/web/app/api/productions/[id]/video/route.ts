// POST /api/productions/[id]/video — start Veo video generation
// Stores operationId on the job for polling

import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { prisma } from '@/lib/db';

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

export const maxDuration = 300;

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);

    const job = await prisma.productionJob.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (!job.veoPrompt?.trim()) {
      return NextResponse.json({ error: 'Job has no Veo prompt' }, { status: 400 });
    }

    if (job.veoOperationId) {
      return NextResponse.json(
        { error: 'Video generation already in progress', operationId: job.veoOperationId },
        { status: 409 }
      );
    }

    const model = job.veoQuality === 'premium'
      ? 'veo-3.1-generate-001'
      : 'veo-3.1-fast-generate-001';

    const auth = getAuth();
    const client = await auth.getClient();
    const token = (await client.getAccessToken()).token;

    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${model}:predictLongRunning`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ prompt: job.veoPrompt }],
        parameters: {
          videoDuration: `${job.videoDuration}s`,
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
    const operationId = data.name || null;

    // Store operation ID on the job
    await prisma.productionJob.update({
      where: { id: jobId },
      data: {
        veoOperationId: operationId,
        stage: job.stage === 'script' || job.stage === 'voiceover' ? 'video' : job.stage,
      },
    });

    return NextResponse.json({
      success: true,
      operationId,
      model,
      quality: job.veoQuality,
      duration: job.videoDuration,
    });
  } catch (err: any) {
    console.error('[productions/video] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
