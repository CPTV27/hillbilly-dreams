// apps/web/app/api/finance/engagements/route.ts
// GET — list ModuleEngagement rows. Admin-gated.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { engagements } from '@bigmuddy/finance';
import type { EngagementStatus } from '@bigmuddy/finance';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const vendorTenantId = searchParams.get('vendorTenantId') ?? undefined;
  const status = (searchParams.get('status') ?? undefined) as EngagementStatus | undefined;
  const customerEmail = searchParams.get('customerEmail') ?? undefined;

  try {
    const list = await engagements.list({ vendorTenantId, status, customerEmail });
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error('[GET /api/finance/engagements]', err);
    const message = err instanceof Error ? err.message : 'List failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
