// apps/web/app/api/life/time/route.ts
// GET  /api/life/time — list exchanges for current user (as provider or receiver)
// POST /api/life/time — log a new time exchange

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';

export async function GET() {
  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  try {
    const exchanges = await (prisma as any).timeExchange.findMany({
      where: {
        OR: [{ providerId: profile.id }, { receiverId: profile.id }],
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: exchanges });
  } catch (err) {
    console.error('[GET /api/life/time]', err);
    return NextResponse.json({ error: 'Failed to fetch exchanges' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const email = (session?.user as any)?.email as string | undefined;
  if (!email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const profile = await (prisma as any).communityProfile.findFirst({ where: { email } });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.receiverId) return NextResponse.json({ error: 'receiverId is required' }, { status: 400 });
  if (!body.hours) return NextResponse.json({ error: 'hours is required' }, { status: 400 });
  if (!body.skill) return NextResponse.json({ error: 'skill is required' }, { status: 400 });

  try {
    const exchange = await (prisma as any).timeExchange.create({
      data: {
        providerId: profile.id,
        receiverId: body.receiverId as string,
        taskPostId: (body.taskPostId as string) ?? null,
        hours: body.hours as number,
        skill: body.skill as string,
        description: (body.description as string) ?? null,
        status: 'pending',
        sandbox: profile.sandbox ?? false,
      },
    });
    return NextResponse.json({ data: exchange }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/life/time]', err);
    return NextResponse.json({ error: 'Failed to log exchange' }, { status: 500 });
  }
}
