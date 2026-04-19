// apps/web/app/api/commerce/orders/route.ts
// POST — create a draft Order (pending status). Returns the Order; the
// caller then POSTs to /api/commerce/orders/checkout to begin payment.
// GET — list Orders (admin-gated).

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { orders } from '@bigmuddy/commerce';
import type { TenantId, OrderStatus } from '@bigmuddy/commerce';

export async function POST(request: NextRequest) {
  let body: {
    tenantId: TenantId;
    customerEmail: string;
    customerName?: string;
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.tenantId || !body.customerEmail || !body.items?.length) {
    return NextResponse.json(
      { error: 'tenantId, customerEmail, and items are required' },
      { status: 400 }
    );
  }

  try {
    const order = await orders.create(body);
    return NextResponse.json({ data: order });
  } catch (err) {
    console.error('[POST /api/commerce/orders]', err);
    const message = err instanceof Error ? err.message : 'Order creation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const tenantId = (searchParams.get('tenantId') ?? undefined) as
    | TenantId
    | undefined;
  const status = (searchParams.get('status') ?? undefined) as OrderStatus | undefined;
  const customerEmail = searchParams.get('customerEmail') ?? undefined;

  try {
    const list = await orders.list({ tenantId, status, customerEmail });
    return NextResponse.json({ data: list });
  } catch (err) {
    console.error('[GET /api/commerce/orders]', err);
    const message = err instanceof Error ? err.message : 'Failed to list orders';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
