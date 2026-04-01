export const dynamic = 'force-dynamic';
// app/api/stripe/onboard/route.ts
// POST — Generate a Stripe Connect onboarding link for an artist/venue.
// The connected account enters their own bank info via Stripe's hosted form.
// Hillbilly Dreams never touches their banking details.

import { NextRequest, NextResponse } from 'next/server';
import { stripe, type BrandClass } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY not configured' },
      { status: 503 }
    );
  }

  let body: {
    email: string;
    name: string;
    brandClass?: BrandClass;
    returnPath?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.email || !body.name) {
    return NextResponse.json(
      { error: 'email and name are required' },
      { status: 400 }
    );
  }

  try {
    // Create Express connected account (Stripe handles KYC + payouts)
    const account = await stripe.accounts.create({
      type: 'express',
      email: body.email,
      business_profile: {
        name: body.name,
        product_description: `${body.brandClass || 'BMT'} partner — Hillbilly Dreams network`,
      },
      metadata: {
        brand_class: body.brandClass || 'BMT',
        partner_name: body.name,
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const returnPath = body.returnPath || '/admin/partners';

    // Generate hosted onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${baseUrl}/api/stripe/onboard?refresh=${account.id}`,
      return_url: `${baseUrl}${returnPath}?connected=${account.id}`,
      type: 'account_onboarding',
    });

    return NextResponse.json({
      data: {
        accountId: account.id,
        onboardingUrl: accountLink.url,
      },
    });
  } catch (err) {
    console.error('[POST /api/stripe/onboard]', err);
    const message = err instanceof Error ? err.message : 'Onboarding failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET — Handle refresh (expired onboarding link) by generating a new one
export async function GET(request: NextRequest) {
  const accountId = new URL(request.url).searchParams.get('refresh');
  if (!accountId) {
    return NextResponse.json(
      { error: 'Missing refresh account ID' },
      { status: 400 }
    );
  }

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/api/stripe/onboard?refresh=${accountId}`,
      return_url: `${baseUrl}/admin/partners?connected=${accountId}`,
      type: 'account_onboarding',
    });

    return NextResponse.redirect(accountLink.url);
  } catch (err) {
    console.error('[GET /api/stripe/onboard] refresh failed', err);
    return NextResponse.json(
      { error: 'Failed to refresh onboarding link' },
      { status: 500 }
    );
  }
}
