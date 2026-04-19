// apps/web/app/api/commerce/subscriptions/[id]/cancel/route.ts
// POST — cancel a subscription. Default = cancel-at-period-end (customer
// keeps access until end of billing period). Pass `{ "immediate": true }`
// to revoke immediately (admin-only operation).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { subscriptions } from '@bigmuddy/commerce';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  let body: { immediate?: boolean } = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine — defaults to cancel-at-period-end
  }

  try {
    const result = body.immediate
      ? await subscriptions.cancelImmediately(params.id)
      : await subscriptions.cancelAtPeriodEnd(params.id);
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[POST /api/commerce/subscriptions/[id]/cancel]', err);
    const message = err instanceof Error ? err.message : 'Cancel failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
