export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { apiLog } from '@/lib/api-logger';

const MS_30_DAYS = 30 * 24 * 60 * 60 * 1000;

const postSchema = z.object({
  clientId: z.number().int().positive(),
  score: z.number().int().min(1).max(10),
  comment: z.string().max(2000).optional(),
});

function membershipStart(client: { onboardedAt: Date | null; createdAt: Date }): Date {
  return client.onboardedAt ?? client.createdAt;
}

/** Portal eligibility: active client, 30+ days since onboard (or created). */
export async function GET(req: NextRequest) {
  const idStr = req.nextUrl.searchParams.get('client');
  const clientId = idStr ? parseInt(idStr, 10) : NaN;
  if (!Number.isFinite(clientId) || clientId < 1) {
    return NextResponse.json({ error: 'client query required' }, { status: 400 });
  }

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: { id: true, status: true, onboardedAt: true, createdAt: true },
  });
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const start = membershipStart(client);
  const eligible =
    client.status === 'active' && Date.now() - start.getTime() >= MS_30_DAYS;

  const existing = await prisma.npsResponse.findUnique({
    where: { clientId },
    select: { score: true, createdAt: true },
  });

  return NextResponse.json({
    eligible,
    submitted: Boolean(existing),
    score: existing?.score ?? null,
    respondedAt: existing?.createdAt?.toISOString() ?? null,
  });
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 });
  }
  const { clientId, score, comment } = parsed.data;

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: { status: true, onboardedAt: true, createdAt: true },
  });
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const start = membershipStart(client);
  if (client.status !== 'active' || Date.now() - start.getTime() < MS_30_DAYS) {
    return NextResponse.json({ error: 'Not eligible yet' }, { status: 403 });
  }

  try {
    await prisma.npsResponse.upsert({
      where: { clientId },
      create: { clientId, score, comment: comment?.trim() || null },
      update: { score, comment: comment?.trim() || null },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    apiLog.error('POST /api/nps', 'save failed', e);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
