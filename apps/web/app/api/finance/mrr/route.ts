// apps/web/app/api/finance/mrr/route.ts
// GET — current MRR snapshot + 30-day churn rate. Admin-gated.

export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { mrr } from '@bigmuddy/finance';

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const [current, churn] = await Promise.all([
      mrr.getCurrentMRR(),
      mrr.get30DayChurnRate(),
    ]);
    return NextResponse.json({ data: { mrr: current, churn } });
  } catch (err) {
    console.error('[GET /api/finance/mrr]', err);
    const message = err instanceof Error ? err.message : 'MRR query failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
