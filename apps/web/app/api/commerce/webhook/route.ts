// apps/web/app/api/commerce/webhook/route.ts
// POST — Stripe webhook handler for the Commerce module.
// Handles: checkout.session.completed, customer.subscription.{created,updated,deleted},
// invoice.payment_succeeded, invoice.payment_failed.
//
// Configure this URL in Stripe dashboard with the COMMERCE_WEBHOOK_SECRET env var.
// Distinct from the existing Connect webhook at /api/stripe/webhook.

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { webhooks } from '@bigmuddy/commerce';
import { apiLog } from '@/lib/api-logger';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.COMMERCE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    apiLog.warn(
      'commerce/webhook',
      'COMMERCE_WEBHOOK_SECRET not configured'
    );
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event;
  try {
    event = webhooks.verifyAndParse(body, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    apiLog.warn('commerce/webhook', 'signature verification failed', { msg });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const result = await webhooks.handle(event);
    apiLog.info('commerce/webhook', 'processed', result);
    return NextResponse.json({ received: true, ...result });
  } catch (err) {
    console.error('[POST /api/commerce/webhook] processing error:', err);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
