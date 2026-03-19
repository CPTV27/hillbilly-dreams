// apps/web/app/api/social/posts/route.ts
// GET /api/social/posts — list posts (filterable by account, status, source)
// POST /api/social/posts — create a new social post

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');
  const status = searchParams.get('status');
  const sourceType = searchParams.get('sourceType');
  const take = searchParams.get('take');

  try {

    const where: Record<string, unknown> = {};
    if (accountId) where.accountId = parseInt(accountId, 10);
    if (status) where.status = status;
    if (sourceType) where.sourceType = sourceType;

    const posts = await (prisma as any).socialPost.findMany({
      where,
      include: { account: { select: { id: true, platform: true, handle: true, brand: true } } },
      orderBy: { createdAt: 'desc' as const },
      ...(take ? { take: parseInt(take, 10) } : {}),
    });

    return NextResponse.json({ data: posts });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') || message.includes('Cannot read properties of undefined') ||
      message.includes('does not exist') || message.includes('P1001')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    console.error('[GET /api/social/posts]', dbError);
    return NextResponse.json({ error: 'Failed to list posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.accountId || typeof body.accountId !== 'number') {
    return NextResponse.json({ error: 'accountId is required (number).' }, { status: 400 });
  }
  if (!body.content || typeof body.content !== 'string') {
    return NextResponse.json({ error: 'content is required.' }, { status: 400 });
  }

  try {

    const post = await (prisma as any).socialPost.create({
      data: {
        accountId: body.accountId as number,
        content: body.content as string,
        mediaUrls: (body.mediaUrls as string[]) ?? [],
        postUrl: (body.postUrl as string | null) ?? null,
        status: (body.status as string) ?? 'draft',
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt as string) : null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt as string) : null,
        sourceType: (body.sourceType as string | null) ?? null,
        sourceId: (body.sourceId as string | null) ?? null,
        tags: (body.tags as string[]) ?? [],
      },
      include: { account: { select: { id: true, platform: true, handle: true } } },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : 'Unknown error';
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ error: 'Database not available or migration pending.' }, { status: 503 });
    }
    console.error('[POST /api/social/posts]', dbError);
    return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 });
  }
}
