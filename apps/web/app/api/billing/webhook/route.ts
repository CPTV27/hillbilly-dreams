export const dynamic = 'force-dynamic';
// apps/web/app/api/billing/webhook/route.ts
// POST /api/billing/webhook — Stripe webhook handler
// Handles: checkout.session.completed, invoice.paid, invoice.payment_failed,
//          customer.subscription.updated, customer.subscription.deleted

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { apiLog } from '@/lib/api-logger';

// Map Stripe unit_amount (cents) → tier name.
// The subscribe route creates inline prices with these amounts,
// so we reverse-map from amount to tier on inbound webhooks.
const AMOUNT_TO_TIER: Record<number, string> = {
  9900: 'front-porch',
  29900: 'route',
  59900: 'river-room',
  120000: 'blues-room',
};

function tierFromAmount(amount: number): string {
  return AMOUNT_TO_TIER[amount] ?? 'front-porch';
}

// Extract the unit_amount from a subscription's first line item
function tierFromSubscription(sub: {
  items?: { data?: Array<{ price?: { unit_amount?: number } }> };
}): string {
  const amount = sub.items?.data?.[0]?.price?.unit_amount;
  return amount ? tierFromAmount(amount) : 'front-porch';
}

export async function POST(request: NextRequest) {
  const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecret) {
    apiLog.warn('stripe/billing-webhook', 'STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  // Raw body is required for Stripe signature verification
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: {
    type: string;
    data: { object: Record<string, unknown> };
  };

  try {
    // Dynamic import to avoid bundling Stripe in all routes
    const Stripe = (await import('stripe' as string)).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-06-20' as unknown,
    });

    event = stripe.webhooks.constructEvent(body, signature, stripeSecret) as typeof event;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    apiLog.error('stripe/billing-webhook', 'signature verification failed', err, { message });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {

    switch (event.type) {
      // ── Checkout completed ───────────────────────────────────
      case 'checkout.session.completed': {
        const session = event.data.object as {
          id: string;
          customer: string;
          subscription: string | null;
          metadata?: { clientId?: string };
          amount_total?: number;
        };

        const clientId = session.metadata?.clientId
          ? parseInt(session.metadata.clientId, 10)
          : null;

        if (!clientId) {
          apiLog.warn('stripe/billing-webhook', 'checkout.session.completed missing clientId metadata');
          break;
        }

        // Determine tier from subscription if available, otherwise from amount
        let tier = 'front-porch';
        if (session.subscription) {
          try {
            const Stripe = (await import('stripe' as string)).default;
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
              apiVersion: '2024-06-20' as unknown,
            });
            const sub = await stripe.subscriptions.retrieve(session.subscription);
            tier = tierFromSubscription(sub as unknown as Parameters<typeof tierFromSubscription>[0]);
          } catch {
            // Fall back to amount_total
            tier = session.amount_total ? tierFromAmount(session.amount_total) : 'front-porch';
          }
        } else if (session.amount_total) {
          tier = tierFromAmount(session.amount_total);
        }

        // Update client: set tier, activate, link Stripe customer
        await (prisma as any).client.update({
          where: { id: clientId },
          data: {
            tier,
            status: 'active',
            stripeCustomerId: session.customer || undefined,
            onboardedAt: new Date(),
          },
        });

        // Create an Invoice record for this checkout
        const now = new Date();
        const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        await (prisma as any).invoice.create({
          data: {
            clientId,
            amount: session.amount_total ?? 0,
            currency: 'usd',
            status: 'paid',
            periodStart,
            periodEnd,
            paidAt: now,
          },
        });

        apiLog.info('stripe/billing-webhook', 'checkout.session.completed', { clientId, tier });
        break;
      }

      // ── Invoice paid ─────────────────────────────────────────
      case 'invoice.paid': {
        const invoice = event.data.object as {
          id: string;
          customer: string;
          amount_paid: number;
          hosted_invoice_url?: string;
          period_start?: number;
          period_end?: number;
          subscription?: string;
        };

        // Try to update an existing invoice record
        const updated = await (prisma as any).invoice.updateMany({
          where: { stripeInvoiceId: invoice.id },
          data: {
            status: 'paid',
            paidAt: new Date(),
            amount: invoice.amount_paid,
            pdfUrl: invoice.hosted_invoice_url ?? null,
          },
        });

        // If no existing record, create one linked to the client
        if (updated.count === 0) {
          const client = await (prisma as any).client.findFirst({
            where: { stripeCustomerId: invoice.customer },
          });

          if (client) {
            const now = new Date();
            await (prisma as any).invoice.create({
              data: {
                clientId: client.id,
                stripeInvoiceId: invoice.id,
                amount: invoice.amount_paid,
                currency: 'usd',
                status: 'paid',
                periodStart: invoice.period_start
                  ? new Date(invoice.period_start * 1000)
                  : new Date(now.getFullYear(), now.getMonth(), 1),
                periodEnd: invoice.period_end
                  ? new Date(invoice.period_end * 1000)
                  : new Date(now.getFullYear(), now.getMonth() + 1, 0),
                paidAt: now,
                pdfUrl: invoice.hosted_invoice_url ?? null,
              },
            });
          }
        }

        apiLog.info('stripe/billing-webhook', 'invoice.paid', { invoiceId: invoice.id });
        break;
      }

      // ── Invoice payment failed ───────────────────────────────
      case 'invoice.payment_failed': {
        const invoice = event.data.object as {
          id: string;
          customer: string;
          attempt_count?: number;
        };

        await (prisma as any).invoice.updateMany({
          where: { stripeInvoiceId: invoice.id },
          data: { status: 'uncollectible' },
        });

        // If repeated failures, pause the client
        if (invoice.attempt_count && invoice.attempt_count >= 3) {
          await (prisma as any).client.updateMany({
            where: { stripeCustomerId: invoice.customer },
            data: { status: 'paused' },
          });
          apiLog.warn('stripe/billing-webhook', 'invoice.payment_failed — client paused', {
            invoiceId: invoice.id,
            attempt: invoice.attempt_count,
          });
        } else {
          apiLog.warn('stripe/billing-webhook', 'invoice.payment_failed', {
            invoiceId: invoice.id,
            attempt: invoice.attempt_count ?? 1,
          });
        }
        break;
      }

      // ── Subscription updated (plan change) ───────────────────
      case 'customer.subscription.updated': {
        const sub = event.data.object as {
          customer: string;
          status: string;
          items?: { data?: Array<{ price?: { unit_amount?: number } }> };
        };

        const newTier = tierFromSubscription(sub);

        // Only update tier if the subscription is active
        if (sub.status === 'active' || sub.status === 'trialing') {
          await (prisma as any).client.updateMany({
            where: { stripeCustomerId: sub.customer },
            data: { tier: newTier, status: 'active' },
          });
          apiLog.info('stripe/billing-webhook', 'customer.subscription.updated', {
            customer: sub.customer,
            tier: newTier,
          });
        } else if (sub.status === 'past_due') {
          await (prisma as any).client.updateMany({
            where: { stripeCustomerId: sub.customer },
            data: { status: 'paused' },
          });
          apiLog.warn('stripe/billing-webhook', 'customer.subscription.updated past_due', {
            customer: sub.customer,
          });
        }
        break;
      }

      // ── Subscription deleted (cancelled) ─────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as { customer: string };

        await (prisma as any).client.updateMany({
          where: { stripeCustomerId: sub.customer },
          data: { tier: 'front-porch', status: 'churned' },
        });

        apiLog.info('stripe/billing-webhook', 'customer.subscription.deleted', {
          customer: sub.customer,
        });
        break;
      }

      default:
        apiLog.info('stripe/billing-webhook', 'unhandled event', { type: event.type });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    apiLog.error('stripe/billing-webhook', 'processing error', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
