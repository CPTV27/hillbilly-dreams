export const dynamic = 'force-dynamic';
// apps/web/app/api/media/route.ts
// GET /api/media — list all images grouped by album

import { NextResponse } from 'next/server';
import { listImages, GCS_BASE_URL } from '@/lib/gcs';

export async function GET() {
  try {
    const grouped = await listImages();

    return NextResponse.json({
      baseUrl: GCS_BASE_URL,
      albums: grouped,
      totalImages: Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0),
    });
  } catch (error) {
    console.error('[API Error] GET /api/media', error);
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}
