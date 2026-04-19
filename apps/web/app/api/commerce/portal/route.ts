// apps/web/app/api/commerce/portal/route.ts
// POST — generate a Stripe Customer Portal URL for self-serve subscription
// management (cancel, update card, view invoices). Caller passes their
// stripeCustomerId; we redirect to the portal.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { checkout } from '@bigmuddy/commerce';

export async function POST(request: NextRequest) {
  let body: { stripeCustomerId: string; returnPath?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.stripeCustomerId) {
    return NextResponse.json(
      { error: 'stripeCustomerId is required' },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const returnUrl = `${baseUrl}${body.returnPath ?? '/account/subscriptions'}`;

  try {
    const result = await checkout.createCustomerPortal({
      stripeCustomerId: body.stripeCustomerId,
      returnUrl,
    });
    return NextResponse.json({ data: result });
  } catch (err) {
    console.error('[POST /api/commerce/portal]', err);
    const message = err instanceof Error ? err.message : 'Portal creation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
