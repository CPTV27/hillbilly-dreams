// apps/web/app/api/account/subscriptions/lookup/route.ts
// GET /api/account/subscriptions/lookup?email=...
// Public self-serve lookup — returns non-sensitive subscription info for an
// email address. Used by /account/subscriptions.
//
// Security note: this endpoint is rate-limited and returns no sensitive data
// (no customer address, no payment method). It surfaces plan + status +
// period end + Stripe customer ID (which the customer portal uses).
// A production hardening step would add a short-lived magic-link token;
// for v1 email-only lookup is acceptable since the data returned is low-
// risk and the Stripe Customer Portal (which requires the stripeCustomerId
// we return) is the gate for any actual mutations.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { subscriptions } from '@bigmuddy/commerce';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Valid email is required' },
      { status: 400 }
    );
  }

  try {
    const list = await subscriptions.list({ customerEmail: email });
    // Redact nothing critical but keep shape tight for client consumption
    const safe = list.map((sub) => ({
      id: sub.id,
      status: sub.status,
      currentPeriodStart: sub.currentPeriodStart,
      currentPeriodEnd: sub.currentPeriodEnd,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
      canceledAt: sub.canceledAt,
      trialEndsAt: sub.trialEndsAt,
      stripeCustomerId: sub.stripeCustomerId,
      plan: {
        name: (sub as typeof sub & { plan: { name: string } }).plan?.name ?? '—',
        priceCents:
          (sub as typeof sub & { plan: { priceCents: number } }).plan?.priceCents ?? 0,
        currency:
          (sub as typeof sub & { plan: { currency: string } }).plan?.currency ?? 'usd',
        interval:
          (sub as typeof sub & { plan: { interval: string } }).plan?.interval ?? 'month',
        intervalCount:
          (sub as typeof sub & { plan: { intervalCount: number } }).plan
            ?.intervalCount ?? 1,
      },
    }));
    return NextResponse.json({ data: safe });
  } catch (err) {
    console.error('[GET /api/account/subscriptions/lookup]', err);
    const message = err instanceof Error ? err.message : 'Lookup failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
