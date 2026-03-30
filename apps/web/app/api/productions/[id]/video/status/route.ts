// GET /api/productions/[id]/video/status — poll Veo operation
// On completion: download video, upload to GCS, create artifact, clear operationId

import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { uploadToGCS } from '@/lib/gcs';
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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id, 10);

    const job = await prisma.productionJob.findUnique({
      where: { id: jobId },
      include: { campaign: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (!job.veoOperationId) {
      return NextResponse.json({ status: 'idle', message: 'No video generation in progress' });
    }

    const auth = getAuth();
    const client = await auth.getClient();
    const token = (await client.getAccessToken()).token;

    // Poll the operation
    const opUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/${job.veoOperationId}`;
    const res = await fetch(opUrl, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ status: 'error', error: errText }, { status: res.status });
    }

    const op = await res.json();

    if (!op.done) {
      return NextResponse.json({
        status: 'generating',
        operationId: job.veoOperationId,
        metadata: op.metadata || null,
      });
    }

    // Operation complete — check for errors
    if (op.error) {
      await prisma.productionJob.update({
        where: { id: jobId },
        data: { veoOperationId: null },
      });
      return NextResponse.json({
        status: 'failed',
        error: op.error.message || 'Video generation failed',
      });
    }

    // Extract video data from response
    const predictions = op.response?.predictions || [];
    if (!predictions.length || !predictions[0].bytesBase64Encoded) {
      await prisma.productionJob.update({
        where: { id: jobId },
        data: { veoOperationId: null },
      });
      return NextResponse.json({ status: 'failed', error: 'No video data in response' });
    }

    const videoBase64 = predictions[0].bytesBase64Encoded;
    const videoBuffer = Buffer.from(videoBase64, 'base64');

    // Determine version
    const existingCount = await prisma.productionArtifact.count({
      where: { jobId, type: 'video' },
    });
    const version = existingCount + 1;

    const gcsPath = `productions/${job.campaign.slug}/${job.slug}/video-v${version}-${Date.now()}.mp4`;
    const gcsUrl = await uploadToGCS(videoBuffer, gcsPath, 'video/mp4');

    // Create artifact
    const artifact = await prisma.productionArtifact.create({
      data: {
        jobId,
        stage: 'video',
        type: 'video',
        gcsUrl,
        mimeType: 'video/mp4',
        fileSize: videoBuffer.length,
        version,
        metadata: JSON.stringify({
          quality: job.veoQuality,
          duration: job.videoDuration,
          operationId: job.veoOperationId,
        }),
      },
    });

    // Clear operation ID and advance stage
    await prisma.productionJob.update({
      where: { id: jobId },
      data: {
        veoOperationId: null,
        stage: 'review',
      },
    });

    return NextResponse.json({
      status: 'complete',
      artifact,
      gcsUrl,
      version,
    });
  } catch (err: any) {
    console.error('[productions/video/status] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
