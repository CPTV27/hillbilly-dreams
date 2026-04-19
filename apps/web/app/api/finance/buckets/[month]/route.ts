// apps/web/app/api/finance/buckets/[month]/route.ts
// GET — bucket-month summary (total hours / cents / per-entity breakdown).
// Admin-gated.

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { buckets } from '@bigmuddy/finance';

export async function GET(
  _request: Request,
  { params }: { params: { month: string } }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  // Expect "2026-04" format
  if (!/^\d{4}-\d{2}$/.test(params.month)) {
    return NextResponse.json(
      { error: 'Month must be YYYY-MM format' },
      { status: 400 }
    );
  }

  try {
    const summary = await buckets.getMonthSummary(params.month);
    return NextResponse.json({ data: summary });
  } catch (err) {
    console.error('[GET /api/finance/buckets/[month]]', err);
    const message = err instanceof Error ? err.message : 'Summary failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
