// apps/web/app/api/media/upload/route.ts
// POST /api/media/upload — multipart image upload with sharp webp conversion
// Accepts: multipart/form-data with fields: file (required), album (optional, default "uploads")

import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { uploadToGCS } from '@/lib/gcs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const album = (formData.get('album') as string) ?? 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Accepted: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Max 10 MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Convert to webp via sharp (unless already webp/avif)
    let outputBuffer: Buffer;
    let contentType: string;
    let extension: string;

    if (file.type === 'image/webp') {
      outputBuffer = inputBuffer;
      contentType = 'image/webp';
      extension = 'webp';
    } else if (file.type === 'image/avif') {
      outputBuffer = inputBuffer;
      contentType = 'image/avif';
      extension = 'avif';
    } else {
      // Convert JPEG/PNG/GIF → webp
      outputBuffer = await sharp(inputBuffer)
        .webp({ quality: 85 })
        .toBuffer();
      contentType = 'image/webp';
      extension = 'webp';
    }

    // Sanitize filename
    const baseName = file.name
      .replace(/\.[^.]+$/, '') // strip extension
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    const timestamp = Date.now();
    const path = `${album}/${baseName}-${timestamp}.${extension}`;

    // Upload to GCS
    const url = await uploadToGCS(outputBuffer, path, contentType);

    return NextResponse.json({
      url,
      path,
      size: outputBuffer.length,
      contentType,
    });
  } catch (error) {
    console.error('[API Error] POST /api/media/upload', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
