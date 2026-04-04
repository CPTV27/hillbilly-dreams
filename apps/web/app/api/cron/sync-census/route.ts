export const dynamic = 'force-dynamic';
// apps/web/app/api/cron/sync-census/route.ts
// POST /api/cron/sync-census
// Syncs Census ACS 5-Year data for all corridor counties.
// Designed to run annually (January) via Vercel Cron.

import { NextRequest, NextResponse } from 'next/server';
import { syncAllCorridorCensus } from '@/lib/census-api';
import { requireCronOrAdmin } from '@/lib/cron-or-admin';

export async function POST(request: NextRequest) {
  const denied = await requireCronOrAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json().catch(() => ({}));
    const year = (body as { year?: number }).year || 2023;

    const result = await syncAllCorridorCensus(year);

    return NextResponse.json({
      success: true,
      year,
      counties: result.counties,
      variables: result.variables,
      errors: result.errors,
    });
  } catch (error) {
    console.error('[API Error] POST /api/cron/sync-census', error);
    return NextResponse.json({ error: 'Census sync failed' }, { status: 500 });
  }
}
