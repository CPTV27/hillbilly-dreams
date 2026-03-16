// apps/web/app/api/publications/[id]/route.ts
// GET    /api/publications/[id] — fetch single by id
// PATCH  /api/publications/[id] — partial update
// DELETE /api/publications/[id] — delete

import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 });
    }

    const { default: prisma } = await import('@bigmuddy/database');

    const publication = await (prisma as any).publication.findUnique({ where: { id } });

    if (!publication) {
      return NextResponse.json({ error: 'Publication not found.' }, { status: 404 });
    }

    return NextResponse.json({ data: publication });
  } catch (e) {
    console.error('[GET /api/publications/[id]]', e);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 });
    }

    const body = await request.json();
    const { default: prisma } = await import('@bigmuddy/database');

    // Build a partial update — only set fields that are explicitly present in body
    const data: Record<string, unknown> = {};
    const stringFields = [
      'title', 'slug', 'subtitle', 'author', 'description', 'longDescription',
      'category', 'format', 'dimensions', 'isbn', 'currency', 'coverImageUrl',
      'backCoverUrl', 'printPartner', 'printUrl', 'shopifyUrl', 'status',
      'edition', 'relatedCity',
    ];
    for (const field of stringFields) {
      if (field in body) data[field] = body[field] ?? null;
    }
    if ('pageCount' in body) data.pageCount = body.pageCount != null ? Number(body.pageCount) : null;
    if ('price' in body) data.price = body.price != null ? Number(body.price) : null;
    if ('printRun' in body) data.printRun = body.printRun != null ? Number(body.printRun) : null;
    if ('soldCount' in body) data.soldCount = Number(body.soldCount ?? 0);
    if ('previewImages' in body) data.previewImages = Array.isArray(body.previewImages) ? body.previewImages : [];
    if ('tags' in body) data.tags = Array.isArray(body.tags) ? body.tags : [];
    if ('publishedAt' in body) {
      data.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
    }

    const publication = await (prisma as any).publication.update({
      where: { id },
      data,
    });

    return NextResponse.json({ data: publication });
  } catch (e) {
    console.error('[PATCH /api/publications/[id]]', e);
    if ((e as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Publication not found.' }, { status: 404 });
    }
    if ((e as { code?: string }).code === 'P2002') {
      return NextResponse.json({ error: 'That slug is already in use.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID.' }, { status: 400 });
    }

    const { default: prisma } = await import('@bigmuddy/database');

    await (prisma as any).publication.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[DELETE /api/publications/[id]]', e);
    if ((e as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Publication not found.' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
