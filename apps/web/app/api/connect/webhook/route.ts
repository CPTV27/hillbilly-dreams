// apps/web/app/api/connect/webhook/route.ts
// POST /api/connect/webhook — Stripe Connect webhook handler
// Handles: account.updated, payment_intent.succeeded (on behalf of connected accounts)

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn('[Connect Webhook] STRIPE_CONNECT_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: {
    type: string;
    account?: string;
    data: { object: Record<string, unknown> };
  };

  try {
    const Stripe = (await import('stripe' as string)).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-06-20' as unknown,
    });

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret) as typeof event;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Connect Webhook] Signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {

    switch (event.type) {
      // ── Connected account updated ──────────────────────────────
      case 'account.updated': {
        const account = event.data.object as {
          id: string;
          charges_enabled: boolean;
          details_submitted: boolean;
          payouts_enabled: boolean;
          disabled_reason?: string;
        };

        // Derive status
        let connectStatus = 'pending';
        if (account.disabled_reason) {
          connectStatus = 'disabled';
        } else if (account.charges_enabled && account.details_submitted) {
          connectStatus = 'active';
        } else if (account.details_submitted) {
          connectStatus = 'restricted';
        }

        // Update Client by stripeConnectId
        await (prisma as any).client.updateMany({
          where: { stripeConnectId: account.id },
          data: { connectStatus },
        });

        // Update ClientIntegration
        const integrationStatus = connectStatus === 'active' ? 'active'
          : connectStatus === 'disabled' ? 'error'
          : 'pending';

        await (prisma as any).clientIntegration.updateMany({
          where: { accountId: account.id, provider: 'stripe' },
          data: {
            status: integrationStatus,
            lastSyncAt: new Date(),
            ...(connectStatus === 'disabled' ? { errorMessage: account.disabled_reason || 'Account disabled' } : { errorMessage: null }),
          },
        });

        console.log(`[Connect Webhook] account.updated — ${account.id} → ${connectStatus}`);
        break;
      }

      // ── Payment on behalf of connected account ─────────────────
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as {
          id: string;
          amount: number;
          currency: string;
          on_behalf_of?: string;
          metadata?: Record<string, string>;
        };

        const connectedAccountId = event.account || paymentIntent.on_behalf_of;

        console.log(
          `[Connect Webhook] payment_intent.succeeded — ${paymentIntent.id}` +
          ` amount=${paymentIntent.amount} currency=${paymentIntent.currency}` +
          ` connected_account=${connectedAccountId || 'n/a'}`
        );

        // Future: create a payment record, update revenue tracking, etc.
        break;
      }

      default:
        console.log(`[Connect Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[Connect Webhook] Processing error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
