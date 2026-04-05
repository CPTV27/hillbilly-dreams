export const dynamic = 'force-dynamic';
// apps/web/app/api/media/enhance/route.ts
// POST /api/media/enhance — enhance a photo with Sharp presets + optional AI enhancement
// Accepts: multipart/form-data with fields:
//   file (required) — the image to enhance
//   preset (optional) — 'auto' | 'editorial' | 'moody' | 'warm' | 'crisp' (default: 'auto')
//   ai (optional) — 'true' to also run through Imagen AI enhancement
//   album (optional) — target album in GCS (default: 'enhanced')

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { enhancePhoto, type EnhancePreset, ENHANCE_PRESETS } from '@/lib/enhance';
import { editImage } from '@/lib/imagen';
import { uploadToGCS } from '@/lib/gcs';

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export async function POST(request: Request) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const preset = (formData.get('preset') as EnhancePreset) ?? 'auto';
    const useAI = formData.get('ai') === 'true';
    const album = (formData.get('album') as string) ?? 'enhanced';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!VALID_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Accepted: ${VALID_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
    }

    if (!(preset in ENHANCE_PRESETS)) {
      return NextResponse.json(
        { error: `Invalid preset: ${preset}. Options: ${Object.keys(ENHANCE_PRESETS).join(', ')}` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    let buffer: Buffer = Buffer.from(arrayBuffer) as Buffer;

    // Step 1: Sharp-based enhancement (fast, local)
    buffer = await enhancePhoto(buffer, preset) as Buffer;

    // Step 2 (optional): AI enhancement via Imagen
    if (useAI) {
      try {
        const aiResults = await editImage(buffer, {
          prompt: 'Enhance this photograph while preserving its authentic content',
          sampleCount: 1,
        });
        if (aiResults.length > 0) {
          buffer = aiResults[0] as Buffer;
        }
      } catch (aiError) {
        // AI enhancement is optional — if it fails, return Sharp-only result
        console.warn('[Enhance] AI enhancement failed, using Sharp-only result:', aiError);
      }
    }

    // Sanitize filename
    const baseName = file.name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    const timestamp = Date.now();
    const extension = useAI ? 'png' : 'webp'; // AI returns PNG, Sharp returns WebP
    const contentType = useAI ? 'image/png' : 'image/webp';
    const path = `${album}/${baseName}-${preset}-${timestamp}.${extension}`;

    // Upload to GCS
    const url = await uploadToGCS(buffer, path, contentType);

    return NextResponse.json({
      url,
      path,
      size: buffer.length,
      contentType,
      preset,
      aiEnhanced: useAI,
    });
  } catch (error) {
    console.error('[API Error] POST /api/media/enhance', error);
    return NextResponse.json({ error: 'Enhancement failed' }, { status: 500 });
  }
}
