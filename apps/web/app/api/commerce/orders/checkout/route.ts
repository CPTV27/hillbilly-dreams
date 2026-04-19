// apps/web/app/api/commerce/orders/checkout/route.ts
// POST — create a Stripe Checkout session for an existing pending Order.
// Order must be created first via POST /api/commerce/orders.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { checkout } from '@bigmuddy/commerce';

export async function POST(request: NextRequest) {
  let body: {
    orderId: string;
    successPath?: string;
    cancelPath?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.orderId) {
    return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const successUrl = `${baseUrl}${body.successPath ?? '/checkout/success'}?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}${body.cancelPath ?? '/checkout/cancelled'}`;

  try {
    const result = await checkout.createOrderCheckout({
      orderId: body.orderId,
      successUrl,
      cancelUrl,
    });
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[POST /api/commerce/orders/checkout]', err);
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
