// apps/web/app/api/life/time/[id]/route.ts
// PUT /api/life/time/[id] — confirm or dispute a time exchange

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;

  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const exchange = await (prisma as any).timeExchange.findUnique({ where: { id } });
  if (!exchange) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Only the receiver can confirm or dispute
  if (exchange.receiverId !== profile.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const validStatuses = ['confirmed', 'disputed'];
  if (!body.status || !validStatuses.includes(body.status as string)) {
    return NextResponse.json({ error: 'status must be "confirmed" or "disputed"' }, { status: 400 });
  }

  try {
    const updated = await (prisma as any).timeExchange.update({
      where: { id },
      data: { status: body.status as string },
    });
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error('[PUT /api/life/time/:id]', err);
    return NextResponse.json({ error: 'Failed to update exchange' }, { status: 500 });
  }
}
