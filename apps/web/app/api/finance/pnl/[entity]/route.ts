// apps/web/app/api/finance/pnl/[entity]/route.ts
// GET — per-entity P&L for a date range. Admin-gated.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { pnl } from '@bigmuddy/finance';
import type { EntityId } from '@bigmuddy/finance';

const VALID_ENTITIES: EntityId[] = [
  'mbt',
  'big-muddy-natchez',
  'big-muddy-touring',
  'tuthill-design',
];

export async function GET(
  request: NextRequest,
  { params }: { params: { entity: string } }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  if (!VALID_ENTITIES.includes(params.entity as EntityId)) {
    return NextResponse.json(
      { error: `Unknown entity: ${params.entity}. Valid: ${VALID_ENTITIES.join(', ')}` },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const periodStart = searchParams.get('periodStart');
  const periodEnd = searchParams.get('periodEnd');

  if (!periodStart || !periodEnd) {
    return NextResponse.json(
      { error: 'periodStart and periodEnd query params required (ISO dates)' },
      { status: 400 }
    );
  }

  try {
    const result = await pnl.getPnL(
      params.entity as EntityId,
      new Date(periodStart),
      new Date(periodEnd)
    );
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[GET /api/finance/pnl/[entity]]', err);
    const message = err instanceof Error ? err.message : 'P&L query failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
