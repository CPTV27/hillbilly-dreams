export const dynamic = 'force-dynamic';
// apps/web/app/api/clients/[id]/reviews/route.ts
// GET /api/clients/:id/reviews — list reviews
// POST /api/clients/:id/reviews — add a review (manual or from scraper)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

export async function GET(request: NextRequest, { params }: Params) {
  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');
  const responseStatus = searchParams.get('responseStatus');

  try {

    const where: Record<string, unknown> = { clientId };
    if (platform) where.platform = platform;
    if (responseStatus) where.responseStatus = responseStatus;

    const reviews = await (prisma as any).review.findMany({
      where,
      orderBy: { postedAt: 'desc' as const },
      take: 100,
    });

    return NextResponse.json({ data: reviews });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db' });
    }
    console.error('[GET /api/clients/:id/reviews]', dbError);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const clientId = parseInt(params.id, 10);
  if (isNaN(clientId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.platform || !body.author || body.rating === undefined) {
    return NextResponse.json({ error: 'platform, author, and rating are required.' }, { status: 400 });
  }

  const externalId = (body.externalId as string) || `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {

    const review = await (prisma as any).review.create({
      data: {
        clientId,
        platform: body.platform as string,
        externalId,
        author: body.author as string,
        rating: body.rating as number,
        text: (body.text as string) ?? null,
        postedAt: body.postedAt ? new Date(body.postedAt as string) : new Date(),
      },
    });

    return NextResponse.json({ data: review }, { status: 201 });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : 'Unknown error';
    if (message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Review already exists.' }, { status: 409 });
    }
    console.error('[POST /api/clients/:id/reviews]', dbError);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
