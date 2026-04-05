export const dynamic = 'force-dynamic';
// app/api/stripe/checkout/route.ts
// POST — Create a Stripe Checkout session with Destination Charges.
// Money flows: Customer → Hillbilly Dreams (platform) → Connected Account (minus platform fee).
// brand_class metadata ensures revenue attribution across BMT / Storefront.

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import {
  stripe,
  calculateApplicationFee,
  type BrandClass,
} from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY not configured' },
      { status: 503 }
    );
  }

  let body: {
    connectedAccountId: string;
    amount: number; // in cents
    currency?: string;
    brandClass: BrandClass;
    productName: string;
    productDescription?: string;
    customerEmail?: string;
    successPath?: string;
    cancelPath?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.connectedAccountId || !body.amount || !body.brandClass || !body.productName) {
    return NextResponse.json(
      { error: 'connectedAccountId, amount, brandClass, and productName are required' },
      { status: 400 }
    );
  }

  if (body.amount < 50) {
    return NextResponse.json(
      { error: 'Amount must be at least 50 cents' },
      { status: 400 }
    );
  }

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const applicationFee = calculateApplicationFee(body.amount, body.brandClass);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: body.currency || 'usd',
            product_data: {
              name: body.productName,
              description: body.productDescription || undefined,
            },
            unit_amount: body.amount,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: applicationFee,
        transfer_data: {
          destination: body.connectedAccountId,
        },
        metadata: {
          brand_class: body.brandClass,
          product_name: body.productName,
          platform: 'hillbilly-dreams',
        },
      },
      metadata: {
        brand_class: body.brandClass,
        connected_account: body.connectedAccountId,
        platform: 'hillbilly-dreams',
      },
      customer_email: body.customerEmail || undefined,
      success_url: `${baseUrl}${body.successPath || '/checkout/success'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${body.cancelPath || '/checkout/cancelled'}`,
    });

    return NextResponse.json({
      data: {
        sessionId: session.id,
        url: session.url,
        applicationFee,
        artistPayout: body.amount - applicationFee,
      },
    });
  } catch (err) {
    console.error('[POST /api/stripe/checkout]', err);
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
