// POST /api/productions/[id]/voiceover — generate TTS for a production job
// Reuses the same Google Cloud TTS logic as /api/media/audio

import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { uploadToGCS } from '@/lib/gcs';
import { prisma } from '@/lib/db';

const VOICE_PRESETS: Record<string, { languageCode: string; name: string; ssmlGender: string }> = {
  'delta-dawn': { languageCode: 'en-US', name: 'en-US-Journey-F', ssmlGender: 'FEMALE' },
  'catfish-carl': { languageCode: 'en-US', name: 'en-US-Journey-D', ssmlGender: 'MALE' },
  'deacon-slim': { languageCode: 'en-US', name: 'en-US-Journey-D', ssmlGender: 'MALE' },
  'miss-pearline': { languageCode: 'en-US', name: 'en-US-Journey-F', ssmlGender: 'FEMALE' },
  'chase': { languageCode: 'en-US', name: 'en-US-Journey-D', ssmlGender: 'MALE' },
  'neutral-male': { languageCode: 'en-US', name: 'en-US-Standard-D', ssmlGender: 'MALE' },
  'neutral-female': { languageCode: 'en-US', name: 'en-US-Standard-F', ssmlGender: 'FEMALE' },
};

function getAuth() {
  const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credsJson) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON not set');
  return new GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
}

export async function POST(
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

    if (!job.ttsScript?.trim()) {
      return NextResponse.json({ error: 'Job has no TTS script' }, { status: 400 });
    }

    const voiceConfig = VOICE_PRESETS[job.voicePreset] || VOICE_PRESETS['chase'];

    const auth = getAuth();
    const client = await auth.getClient();
    const token = (await client.getAccessToken()).token;

    const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text: job.ttsScript },
        voice: {
          languageCode: voiceConfig.languageCode,
          name: voiceConfig.name,
          ssmlGender: voiceConfig.ssmlGender,
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: job.voiceSpeed,
          pitch: job.voicePitch,
          effectsProfileId: ['small-bluetooth-speaker-class-device'],
        },
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `TTS API error: ${errText}` }, { status: res.status });
    }

    const data = await res.json();
    const audioContent = data.audioContent;

    if (!audioContent) {
      return NextResponse.json({ error: 'No audio generated' }, { status: 500 });
    }

    // Determine version number
    const existingCount = await prisma.productionArtifact.count({
      where: { jobId, type: 'voiceover' },
    });

    const buffer = Buffer.from(audioContent, 'base64');
    const version = existingCount + 1;
    const gcsPath = `productions/${job.campaign.slug}/${job.slug}/voiceover-v${version}-${Date.now()}.mp3`;

    const gcsUrl = await uploadToGCS(buffer, gcsPath, 'audio/mpeg');

    // Create artifact
    const artifact = await prisma.productionArtifact.create({
      data: {
        jobId,
        stage: 'voiceover',
        type: 'voiceover',
        gcsUrl,
        mimeType: 'audio/mpeg',
        fileSize: buffer.length,
        version,
        metadata: JSON.stringify({
          voice: job.voicePreset,
          speed: job.voiceSpeed,
          pitch: job.voicePitch,
          estimatedDuration: `~${Math.ceil(job.ttsScript.length / 15)}s`,
        }),
      },
    });

    // Auto-advance stage if still on script
    if (job.stage === 'script') {
      await prisma.productionJob.update({
        where: { id: jobId },
        data: { stage: 'voiceover' },
      });
    }

    return NextResponse.json({
      success: true,
      artifact,
      gcsUrl,
      version,
    });
  } catch (err: any) {
    console.error('[productions/voiceover] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
