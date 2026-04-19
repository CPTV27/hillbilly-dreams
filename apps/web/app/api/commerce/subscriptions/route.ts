// apps/web/app/api/commerce/subscriptions/route.ts
// GET — list subscriptions (admin-gated).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { subscriptions } from '@bigmuddy/commerce';
import type { TenantId, SubscriptionStatus } from '@bigmuddy/commerce';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const tenantId = (searchParams.get('tenantId') ?? undefined) as
    | TenantId
    | undefined;
  const status = (searchParams.get('status') ?? undefined) as
    | SubscriptionStatus
    | undefined;
  const customerEmail = searchParams.get('customerEmail') ?? undefined;

  try {
    const list = await subscriptions.list({ tenantId, status, customerEmail });
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error('[GET /api/commerce/subscriptions]', err);
    const message =
      err instanceof Error ? err.message : 'Failed to list subscriptions';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
