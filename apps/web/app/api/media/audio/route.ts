// POST /api/media/audio — generate voice/speech via Google Cloud TTS
// Returns audio buffer as base64 or uploads to GCS

import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import { uploadToGCS } from '@/lib/gcs';

const PROJECT_ID = process.env.GCP_PROJECT_ID || 'bigmuddy-ff651';

function getAuth() {
  const credsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!credsJson) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON not set');
  return new GoogleAuth({
    credentials: JSON.parse(credsJson),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
}

// Voice presets mapped to Big Muddy characters
const VOICE_PRESETS: Record<string, { languageCode: string; name: string; ssmlGender: string }> = {
  'delta-dawn': { languageCode: 'en-US', name: 'en-US-Journey-F', ssmlGender: 'FEMALE' },
  'catfish-carl': { languageCode: 'en-US', name: 'en-US-Journey-D', ssmlGender: 'MALE' },
  'deacon-slim': { languageCode: 'en-US', name: 'en-US-Journey-D', ssmlGender: 'MALE' },
  'miss-pearline': { languageCode: 'en-US', name: 'en-US-Journey-F', ssmlGender: 'FEMALE' },
  'chase': { languageCode: 'en-US', name: 'en-US-Journey-D', ssmlGender: 'MALE' },
  'neutral-male': { languageCode: 'en-US', name: 'en-US-Standard-D', ssmlGender: 'MALE' },
  'neutral-female': { languageCode: 'en-US', name: 'en-US-Standard-F', ssmlGender: 'FEMALE' },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      voice = 'delta-dawn',
      speed = 1.0,
      pitch = 0,
      album = 'audio',
    } = body as { text: string; voice?: string; speed?: number; pitch?: number; album?: string };

    if (!text?.trim()) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: 'text too long (max 5000 chars)' }, { status: 400 });
    }

    const voiceConfig = VOICE_PRESETS[voice] || VOICE_PRESETS['neutral-female'];

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
        input: { text },
        voice: {
          languageCode: voiceConfig.languageCode,
          name: voiceConfig.name,
          ssmlGender: voiceConfig.ssmlGender,
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: speed,
          pitch,
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
    const audioContent = data.audioContent; // base64 encoded MP3

    if (!audioContent) {
      return NextResponse.json({ error: 'No audio generated' }, { status: 500 });
    }

    // Upload to GCS
    const buffer = Buffer.from(audioContent, 'base64');
    const slug = text.slice(0, 40).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');
    const filename = `${album}/${voice}-${slug}-${Date.now()}.mp3`;

    const url = await uploadToGCS(buffer, filename, 'audio/mpeg');

    return NextResponse.json({
      success: true,
      url,
      voice: voiceConfig.name,
      duration: `~${Math.ceil(text.length / 15)}s`, // rough estimate
      size: buffer.length,
    });
  } catch (err: any) {
    console.error('[audio] Error:', err);
    return NextResponse.json({ error: err.message || 'Audio generation failed' }, { status: 500 });
  }
}
