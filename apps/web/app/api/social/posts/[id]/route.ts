export const dynamic = 'force-dynamic';
// apps/web/app/api/social/posts/[id]/route.ts
// GET, PATCH, DELETE for a single social post

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Params) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const post = await (prisma as any).socialPost.findUnique({
      where: { id },
      include: { account: true },
    });
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ data: post });
  } catch (err) {
    console.error('[GET /api/social/posts/:id]', err);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if ('content' in body) data.content = body.content;
  if ('mediaUrls' in body) data.mediaUrls = body.mediaUrls;
  if ('postUrl' in body) data.postUrl = body.postUrl;
  if ('status' in body) data.status = body.status;
  if ('tags' in body) data.tags = body.tags;
  if ('scheduledAt' in body) data.scheduledAt = body.scheduledAt ? new Date(body.scheduledAt as string) : null;
  if ('publishedAt' in body) data.publishedAt = body.publishedAt ? new Date(body.publishedAt as string) : null;
  if ('accountId' in body) data.accountId = body.accountId;

  try {
    const post = await (prisma as any).socialPost.update({
      where: { id },
      data,
      include: { account: { select: { id: true, platform: true, handle: true } } },
    });
    return NextResponse.json({ data: post });
  } catch (err) {
    console.error('[PATCH /api/social/posts/:id]', err);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = parseInt(params.id, 10);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await (prisma as any).socialPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/social/posts/:id]', err);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
