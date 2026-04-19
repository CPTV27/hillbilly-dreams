// apps/web/app/api/events/publish/route.ts
// POST — publish a BusEvent (debug + admin tooling). Admin-gated.
// Production publishers should call publish.publish() directly from
// inside their module, not via this HTTP layer — this exists for testing.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { publish as publishMod } from '@bigmuddy/events';
import type { EventType } from '@bigmuddy/events';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: {
    type: EventType;
    tenantId: string;
    payload: Record<string, unknown>;
    source?: string;
    correlationId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.type || !body.tenantId || !body.payload) {
    return NextResponse.json(
      { error: 'type, tenantId, and payload are required' },
      { status: 400 }
    );
  }

  try {
    const event = await publishMod.publish({
      type: body.type,
      tenantId: body.tenantId,
      payload: body.payload,
      source: body.source ?? 'admin-debug',
      correlationId: body.correlationId,
    });
    return NextResponse.json({ data: event });
  } catch (err) {
    console.error('[POST /api/events/publish]', err);
    const message = err instanceof Error ? err.message : 'Publish failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
