export const dynamic = 'force-dynamic';
// apps/web/app/api/publish/route.ts
// GET /api/publish — list publish jobs (filterable by status)
// POST /api/publish — create a publish job for a social post

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const postId = searchParams.get('postId');

  try {

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (postId) where.postId = parseInt(postId, 10);

    const jobs = await (prisma as any).publishJob.findMany({
      where,
      orderBy: { createdAt: 'desc' as const },
      take: 50,
    });

    return NextResponse.json({ data: jobs });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    console.error('[GET /api/publish]', dbError);
    return NextResponse.json({ error: 'Failed to list publish jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.postId || typeof body.postId !== 'number') {
    return NextResponse.json({ error: 'postId is required.' }, { status: 400 });
  }
  if (!body.platform || typeof body.platform !== 'string') {
    return NextResponse.json({ error: 'platform is required.' }, { status: 400 });
  }

  try {

    const job = await (prisma as any).publishJob.create({
      data: {
        postId: body.postId as number,
        platform: body.platform as string,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt as string) : null,
        status: body.scheduledAt ? 'pending' : 'pending',
      },
    });

    return NextResponse.json({ data: job }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/publish]', err);
    return NextResponse.json({ error: 'Failed to create publish job' }, { status: 500 });
  }
}
