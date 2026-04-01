export const dynamic = 'force-dynamic';
// apps/web/app/api/content/transcribe/route.ts
// POST /api/content/transcribe
// Accepts audio file upload, returns transcription via Whisper API.
// Part of the content pipeline: Audio → Text → Gemini → Social Posts → Asana queue

import { NextRequest, NextResponse } from 'next/server';
import { transcribe, estimateCost, type TranscriptionModel } from '@/lib/whisper';
import { notify } from '@/lib/notify';

// 25MB max — Whisper API file limit
const MAX_FILE_SIZE = 25 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  'audio/mpeg',       // .mp3
  'audio/mp4',        // .m4a
  'audio/wav',        // .wav
  'audio/webm',       // .webm
  'audio/ogg',        // .ogg
  'audio/flac',       // .flac
  'video/mp4',        // .mp4 (audio track extracted)
  'video/webm',       // .webm video
]);

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY not configured' },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const model = (formData.get('model') as TranscriptionModel) || 'whisper-1';
    const language = formData.get('language') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}. Accepted: mp3, m4a, wav, webm, ogg, flac, mp4` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: 25MB. Split with ffmpeg.` },
        { status: 400 }
      );
    }

    const estimatedCost = estimateCost(file.size / 16000, model); // rough estimate from file size

    const result = await transcribe(file, {
      model,
      ...(language && { language }),
    });

    const actualCost = estimateCost(result.duration, model);

    // Notify on completion (low priority — informational)
    await notify({
      title: 'Transcription Complete',
      message: `${file.name} — ${Math.round(result.duration / 60)}min, $${actualCost.toFixed(3)}`,
      topic: 'ops',
      priority: 2,
      tags: ['microphone'],
    }).catch(() => {}); // fire-and-forget

    return NextResponse.json({
      data: {
        text: result.text,
        segments: result.segments,
        duration: result.duration,
        language: result.language,
      },
      meta: {
        model,
        fileName: file.name,
        fileSize: file.size,
        cost: actualCost,
        durationMinutes: Math.round(result.duration / 60 * 10) / 10,
      },
    });
  } catch (err: any) {
    console.error('[transcribe] Error:', err);

    await notify({
      title: 'Transcription Failed',
      message: err.message || 'Unknown error',
      topic: 'ops',
      priority: 4,
      tags: ['x'],
    }).catch(() => {});

    return NextResponse.json(
      { error: err.message || 'Transcription failed' },
      { status: 500 }
    );
  }
}
