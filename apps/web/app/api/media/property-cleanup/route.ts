// apps/web/app/api/media/property-cleanup/route.ts
// Vertex AI Imagen 3 — Property cleanup endpoint for Photoshop plugin
// Multi-pass: remove objects, then enhance the scene

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
    const fullPrompt = `Clean up this exterior property photograph: ${prompt}. Maintain the exact building architecture, people, and composition. Only improve the environment — lawn, landscaping, sky, remove clutter.`;

    const results = await editImage(sourceBuffer, {
      prompt: fullPrompt,
      sampleCount,
    });

    const images = results.map((buf) => buf.toString('base64'));

    return NextResponse.json({ images, count: images.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[media/property-cleanup]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const maxDuration = 120;
