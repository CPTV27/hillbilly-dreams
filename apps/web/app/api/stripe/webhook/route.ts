export const dynamic = 'force-dynamic';
// app/api/stripe/webhook/route.ts
// POST — Stripe Connect webhook handler for Hillbilly Dreams platform.
// Listens for: checkout.session.completed, account.updated, transfer.created
// Separate from the BMT billing webhook (/api/billing/webhook).

import { NextRequest, NextResponse } from 'next/server';
import { apiLog } from '@/lib/api-logger';
import { stripe } from '@/lib/stripe';

// Stripe requires raw body for signature verification — Next.js App Router
// gives us this via request.text().
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;
  if (!webhookSecret) {
    apiLog.warn('stripe/connect-webhook', 'STRIPE_CONNECT_WEBHOOK_SECRET not configured');
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

  let event: {
    type: string;
    data: { object: Record<string, unknown> };
  };

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    ) as unknown as typeof event;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Stripe Connect Webhook] Signature verification failed:', msg);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ── Checkout completed (Destination Charge paid) ────────
      case 'checkout.session.completed': {
        const session = event.data.object as {
          id: string;
          payment_intent: string;
          amount_total: number;
          metadata?: {
            brand_class?: string;
            connected_account?: string;
          };
          customer_email?: string;
        };

        apiLog.info('stripe/connect-webhook', 'checkout.session.completed', {
          sessionId: session.id,
          brandClass: session.metadata?.brand_class || 'unknown',
          amountCents: session.amount_total || 0,
          connectedAccount: session.metadata?.connected_account || 'none',
        });

        // GitHub#203 — When DB schema supports Connect transactions,
        // persist the transaction record here with brand_class tagging.
        break;
      }

      // ── Connected account updated (onboarding complete, etc.) ──
      case 'account.updated': {
        const account = event.data.object as {
          id: string;
          charges_enabled: boolean;
          payouts_enabled: boolean;
          details_submitted: boolean;
          metadata?: { brand_class?: string; partner_name?: string };
        };

        const status = account.charges_enabled && account.payouts_enabled
          ? 'active'
          : account.details_submitted
            ? 'pending_verification'
            : 'onboarding';

        apiLog.info('stripe/connect-webhook', 'account.updated', {
          accountId: account.id,
          status,
          partner: account.metadata?.partner_name || 'unknown',
          brandClass: account.metadata?.brand_class || 'unknown',
        });

        // GitHub#204 — Update partner record in DB when schema supports it.
        // await prisma.partner.upsert({ ... })
        break;
      }

      // ── Transfer created (money moved to connected account) ──
      case 'transfer.created': {
        const transfer = event.data.object as {
          id: string;
          amount: number;
          destination: string;
          metadata?: { brand_class?: string };
        };

        apiLog.info('stripe/connect-webhook', 'transfer.created', {
          transferId: transfer.id,
          amountCents: transfer.amount,
          destination: transfer.destination,
          brandClass: transfer.metadata?.brand_class || 'unknown',
        });
        break;
      }

      default:
        apiLog.info('stripe/connect-webhook', 'unhandled event type', { type: event.type });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[Stripe Connect Webhook] Processing error:', err);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
