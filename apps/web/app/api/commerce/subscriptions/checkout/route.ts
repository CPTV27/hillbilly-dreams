// apps/web/app/api/commerce/subscriptions/checkout/route.ts
// POST — create a Stripe Checkout session for a subscription.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { checkout } from '@bigmuddy/commerce';

export async function POST(request: NextRequest) {
  let body: {
    planId: string;
    customerEmail: string;
    customerName?: string;
    successPath?: string;
    cancelPath?: string;
    trialDays?: number;
    metadata?: Record<string, string>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.planId || !body.customerEmail) {
    return NextResponse.json(
      { error: 'planId and customerEmail are required' },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const successUrl = `${baseUrl}${body.successPath ?? '/checkout/success'}?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}${body.cancelPath ?? '/checkout/cancelled'}`;

  try {
    const result = await checkout.createSubscriptionCheckout({
      planId: body.planId,
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      successUrl,
      cancelUrl,
      trialDays: body.trialDays,
      metadata: body.metadata,
    });
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[POST /api/commerce/subscriptions/checkout]', err);
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
