// lib/whisper.ts
// Audio transcription via OpenAI Whisper API — feeds the content pipeline.
// Audio → Whisper (text) → Gemini (social posts) → Asana (review queue) → Publish
// Cost: $0.006/min ($0.36/hr). Budget ~$7/mo for 20 hours of Blues Room content.

import OpenAI from 'openai';

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export type TranscriptionModel =
  | 'whisper-1'                // $0.006/min — general
  | 'gpt-4o-transcribe'       // $0.006/min — higher accuracy
  | 'gpt-4o-mini-transcribe'; // $0.003/min — budget

export interface TranscriptionResult {
  text: string;
  segments: TranscriptionSegment[];
  duration: number;
  language: string;
}

export interface TranscriptionSegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

export async function transcribe(
  file: File | Blob,
  options?: {
    model?: TranscriptionModel;
    language?: string;
    prompt?: string;
  }
): Promise<TranscriptionResult> {
  const model = options?.model || 'whisper-1';

  const transcription = await getClient().audio.transcriptions.create({
    model,
    file,
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
    ...(options?.language && { language: options.language }),
    ...(options?.prompt && { prompt: options.prompt }),
  });

  return {
    text: transcription.text,
    segments: (transcription.segments || []).map((s: any) => ({
      id: s.id,
      start: s.start,
      end: s.end,
      text: s.text,
    })),
    duration: transcription.duration || 0,
    language: transcription.language || 'en',
  };
}

/**
 * Estimate transcription cost before processing.
 * @param durationSeconds - audio length in seconds
 * @param model - which Whisper model
 * @returns estimated cost in USD
 */
export function estimateCost(
  durationSeconds: number,
  model: TranscriptionModel = 'whisper-1'
): number {
  const ratePerMinute = model === 'gpt-4o-mini-transcribe' ? 0.003 : 0.006;
  return (durationSeconds / 60) * ratePerMinute;
}
