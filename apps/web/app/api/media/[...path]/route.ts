// apps/web/app/api/media/[...path]/route.ts
// DELETE /api/media/:album/:filename — delete an image by its path

import { NextResponse } from 'next/server';
import { deleteFromGCS } from '@/lib/gcs';

export async function DELETE(
  _request: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = params.path.join('/');

    if (!filePath) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    await deleteFromGCS(filePath);

    return NextResponse.json({ success: true, deleted: filePath });
  } catch (error: any) {
    if (error?.code === 404) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    console.error('[API Error] DELETE /api/media/[...path]', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
