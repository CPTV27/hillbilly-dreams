// apps/web/app/api/social/accounts/route.ts
// GET /api/social/accounts — list social accounts
// POST /api/social/accounts — create a social account

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');
  const platform = searchParams.get('platform');

  try {
    const { default: prisma } = await import('@bigmuddy/database');

    const where: Record<string, unknown> = {};
    if (brand) where.brand = brand;
    if (platform) where.platform = platform;

    const accounts = await (prisma as any).socialAccount.findMany({
      where,
      include: { _count: { select: { posts: true } } },
      orderBy: { createdAt: 'desc' as const },
    });

    return NextResponse.json({ data: accounts });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : String(dbError);
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot find module') || message.includes('Cannot read properties of undefined') ||
      message.includes('does not exist') || message.includes('P1001')
    ) {
      return NextResponse.json({ data: [], _source: 'no-db', _note: 'Database not connected or migration pending.' });
    }
    console.error('[GET /api/social/accounts]', dbError);
    return NextResponse.json({ error: 'Failed to list accounts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.platform || typeof body.platform !== 'string') {
    return NextResponse.json({ error: 'platform is required.' }, { status: 400 });
  }
  if (!body.handle || typeof body.handle !== 'string') {
    return NextResponse.json({ error: 'handle is required.' }, { status: 400 });
  }

  try {
    const { default: prisma } = await import('@bigmuddy/database');

    const account = await (prisma as any).socialAccount.create({
      data: {
        platform: body.platform as string,
        handle: body.handle as string,
        brand: (body.brand as string) ?? 'bigmuddy',
        status: (body.status as string) ?? 'active',
        notes: (body.notes as string | null) ?? null,
      },
    });

    return NextResponse.json({ data: account }, { status: 201 });
  } catch (dbError) {
    const message = dbError instanceof Error ? dbError.message : 'Unknown error';
    if (message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Account with this platform/handle already exists.' }, { status: 409 });
    }
    if (
      message.includes('datasource') || message.includes('DATABASE_URL') ||
      message.includes('Cannot read properties of undefined') || message.includes('does not exist')
    ) {
      return NextResponse.json({ error: 'Database not available or migration pending.' }, { status: 503 });
    }
    console.error('[POST /api/social/accounts]', dbError);
    return NextResponse.json({ error: 'Failed to create account.' }, { status: 500 });
  }
}
