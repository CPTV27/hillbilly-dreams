// apps/web/app/api/lookbook/comments/route.ts
// CRUD for lookbook illustration comments

import { prisma } from '@bigmuddy/database';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const style = req.nextUrl.searchParams.get('style');
  const image = req.nextUrl.searchParams.get('image');

  try {
    const where: Record<string, unknown> = {};
    if (style) where.style = style;
    if (image) where.image = image;

    const comments = await (prisma as any).lookbookComment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: comments });
  } catch {
    return NextResponse.json({ data: [] });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = (session?.user as any)?.email;

  try {
    const body = await req.json();
    const { style, image, text } = body;

    if (!style || !image || !text?.trim()) {
      return NextResponse.json({ error: 'style, image, and text required' }, { status: 400 });
    }

    const comment = await (prisma as any).lookbookComment.create({
      data: {
        style,
        image,
        text: text.trim(),
        author: email || 'anonymous',
      },
    });
    return NextResponse.json({ data: comment });
  } catch (err) {
    console.error('[api/lookbook/comments] POST error:', err);
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, resolved } = body;

    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const comment = await (prisma as any).lookbookComment.update({
      where: { id: Number(id) },
      data: { resolved: Boolean(resolved) },
    });
    return NextResponse.json({ data: comment });
  } catch (err) {
    console.error('[api/lookbook/comments] PATCH error:', err);
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
  }
}
