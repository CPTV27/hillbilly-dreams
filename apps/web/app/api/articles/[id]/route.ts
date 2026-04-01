export const dynamic = 'force-dynamic';
// apps/web/app/api/articles/[id]/route.ts
// GET /api/articles/[id] — get by id
// PUT /api/articles/[id] — update
// DELETE /api/articles/[id] — delete

import { NextResponse } from 'next/server';
import { prisma } from '@bigmuddy/database';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('[API /articles/[id] GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();

    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.author !== undefined && { author: body.author }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
        ...(body.body !== undefined && { body: body.body }),
        ...(body.heroImage !== undefined && { heroImage: body.heroImage }),
        ...(body.readTime !== undefined && { readTime: body.readTime }),
        ...(body.publishedAt !== undefined && {
          publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        }),
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error('[API /articles/[id] PUT]', error);
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.article.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API /articles/[id] DELETE]', error);
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
