// apps/web/app/api/events/dead-letter/[id]/replay/route.ts
// POST — re-queue a dead-letter EventDelivery. Admin-gated.

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { dispatcher } from '@bigmuddy/events';

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await dispatcher.replayDeadLetter(params.id);
    return NextResponse.json({ data: { replayed: params.id } });
  } catch (err) {
    console.error('[POST /api/events/dead-letter/[id]/replay]', err);
    const message = err instanceof Error ? err.message : 'Replay failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
