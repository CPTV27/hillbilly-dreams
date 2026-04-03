// apps/web/app/api/media/remove/route.ts
// Vertex AI Imagen 3 — Object removal endpoint for Photoshop plugin
// SAFETY: Never alters people. Environment only.

import { NextRequest, NextResponse } from 'next/server';
import { removeFromImage } from '@/lib/imagen';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, prompt, sampleCount = 2, baseSteps = 50 } = body;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    if (!prompt) {
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    const sourceBuffer = Buffer.from(image, 'base64');

    const results = await removeFromImage(sourceBuffer, {
      prompt,
      sampleCount,
    });

    const images = results.map((buf) => buf.toString('base64'));

    return NextResponse.json({ images, count: images.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[media/remove]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const maxDuration = 120;
