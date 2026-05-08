export const dynamic = 'force-dynamic';
// apps/web/app/api/dispatch/subscribe/route.ts
// POST /api/dispatch/subscribe
// Email capture endpoint for the Dispatch No. 01 landing page.
//
// Strategy: write to existing Lead table (no schema change). industry='dispatch-signup'
// makes downstream filtering trivial. Email is stored on Lead.email; Lead.name reuses
// the email so the required `name` field is satisfied without fake data.

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE = 'dispatch-01-landing';
const INDUSTRY = 'dispatch-signup';

export async function POST(request: NextRequest) {
  let body: { email?: unknown };
  try {
    body = (await request.json()) as { email?: unknown };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const raw = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!raw || !EMAIL_RE.test(raw)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }

  try {
    // Idempotent: if the email already signed up via dispatch, return success without
    // creating a duplicate row. We don't have a unique index on email so we search.
    const existing = await (prisma as any).lead.findFirst({
      where: { email: raw, source: SOURCE },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ data: { ok: true, deduped: true } });
    }

    await (prisma as any).lead.create({
      data: {
        name: raw,
        industry: INDUSTRY,
        email: raw,
        source: SOURCE,
        perceivedPower: 5,
        notes: 'Signed up via /dispatch landing page (Dispatch No. 01 — Apr 27 launch).',
      },
    });

    return NextResponse.json({ data: { ok: true } });
  } catch (err) {
    console.error('[POST /api/dispatch/subscribe]', err);
    return NextResponse.json(
      { error: 'Could not save your signup. Try again in a moment.' },
      { status: 500 }
    );
  }
}
