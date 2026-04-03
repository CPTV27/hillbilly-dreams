export const dynamic = 'force-dynamic';
// apps/web/app/api/media/generate/route.ts
// POST /api/media/generate — generate image via Vertex AI Imagen, save to GCS

import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { generateImage } from '@/lib/imagen';
import { uploadToGCS } from '@/lib/gcs';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const body = await request.json();
    const { prompt, album = 'generated', negativePrompt, aspectRatio = '16:9' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return NextResponse.json({ error: 'Prompt too long (max 1000 chars)' }, { status: 400 });
    }

    // Generate image via Imagen
    const [pngBuffer] = await generateImage(prompt, {
      negativePrompt: negativePrompt || undefined,
      aspectRatio,
      sampleCount: 1,
    });

    // Convert PNG → WebP via Sharp (same pipeline as upload route)
    const webpBuffer = await sharp(pngBuffer)
      .webp({ quality: 85 })
      .toBuffer();

    // Build filename from prompt prefix
    const slug = prompt
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);

    const timestamp = Date.now();
    const path = `${album}/${slug}-${timestamp}.webp`;

    // Upload to GCS
    const url = await uploadToGCS(webpBuffer, path, 'image/webp');

    return NextResponse.json({
      url,
      path,
      size: webpBuffer.length,
      contentType: 'image/webp',
      prompt,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Generation failed';
    console.error('[API Error] POST /api/media/generate', error);

    // Surface safety filter and quota errors clearly
    if (message.includes('safety') || message.includes('blocked')) {
      return NextResponse.json({ error: message }, { status: 422 });
    }
    if (message.includes('quota') || message.includes('429')) {
      return NextResponse.json({ error: 'Rate limit hit — try again in a minute' }, { status: 429 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
