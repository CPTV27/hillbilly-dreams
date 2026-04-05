export const dynamic = 'force-dynamic';
// apps/web/app/api/media/sky-replace/route.ts
// Vertex AI Imagen 3 — Sky replacement endpoint for Photoshop plugin

import { NextRequest, NextResponse } from 'next/server';
import { editImage } from '@/lib/imagen';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, prompt, sampleCount = 2 } = body;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const sourceBuffer = Buffer.from(image, 'base64');
    const fullPrompt = `Replace the sky in this photograph: ${prompt}. Keep all buildings, people, trees, and ground elements exactly as they are. Only change the sky.`;

    const results = await editImage(sourceBuffer, {
      prompt: fullPrompt,
      sampleCount,
    });

    const images = results.map((buf) => buf.toString('base64'));

    return NextResponse.json({ images, count: images.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[media/sky-replace]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const maxDuration = 120;
