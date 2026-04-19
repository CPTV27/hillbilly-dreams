// packages/modules/commerce/src/webhooks.ts
// Stripe webhook event handlers for the Commerce module.
// Routes events to the right module function. Idempotent.

import Stripe from 'stripe';
import { prisma } from '@bigmuddy/database';
import { send as emailSend, templates as emailTemplates } from '@bigmuddy/email';
import type { Brand as EmailBrand } from '@bigmuddy/email';
import * as subscriptions from './subscriptions';
import * as orders from './orders';
import type { SubscriptionStatus } from './types';

/** Map commerce BrandId to the email module's Brand union. */
function emailBrand(brand: string): EmailBrand {
  const valid: EmailBrand[] = [
    'inn', 'magazine', 'touring', 'records', 'radio',
    'cpp', 'tuthill', 'studio-c', 'dsd', 'mbt',
  ];
  return (valid.includes(brand as EmailBrand) ? brand : 'mbt') as EmailBrand;
}

/**
 * Verify a Stripe webhook signature and parse the event.
 * Throws on signature mismatch — caller should return 400.
 */
export function verifyAndParse(
  rawBody: string,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
}

/**
 * Dispatch a Stripe event to the right handler. Returns a brief result
 * descriptor for logging. Unhandled event types are no-ops.
 */
export async function handle(event: Stripe.Event): Promise<{
  handled: boolean;
  type: string;
  detail?: string;
}> {
  switch (event.type) {
    case 'checkout.session.completed':
      return handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      return handleSubscriptionUpsert(event.data.object as Stripe.Subscription);

    case 'customer.subscription.deleted':
      return handleSubscriptionDeleted(event.data.object as Stripe.Subscription);

    case 'invoice.payment_succeeded':
      return handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);

    case 'invoice.payment_failed':
      return handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);

    default:
      return { handled: false, type: event.type, detail: 'no-op' };
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // One-time order completion
  const orderId = session.metadata?.platform_order_id;
  if (orderId) {
    await orders.markPaid(orderId, {
      stripeCheckoutId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id,
    });

    // Order-confirmed email. Resolve brand from the first item's product
    // (every Product has a brand) so cross-brand tenants like big-muddy
    // send the right-branded receipt for Records vs Inn vs Touring purchases.
    const order = await orders.get(orderId);
    if (order) {
      const items = (
        order as typeof order & {
          items: Array<{ quantity: number; product: { name: string; brand?: string } }>;
        }
      ).items;
      const itemsWithNames = items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
      }));
      const firstItemBrand = items[0]?.product?.brand;
      const resolvedBrand = emailBrand(
        firstItemBrand ?? (order.tenantId === 'big-muddy' ? 'inn' : order.tenantId)
      );
      void emailSend.sendSafe({
        brand: resolvedBrand,
        to: order.customerEmail,
        email: emailTemplates.orderConfirmed({
          customerName: order.customerName ?? undefined,
          customerEmail: order.customerEmail,
          brand: resolvedBrand,
          orderId: order.id,
          items: itemsWithNames,
          totalCents: order.totalCents,
          currency: order.currency,
        }),
        tags: { event: 'order.paid', orderId: order.id },
      });
    }

    return {
      handled: true,
      type: 'checkout.session.completed',
      detail: `order ${orderId} paid`,
    };
  }

  // Subscription checkout — the actual subscription row gets created via
  // customer.subscription.created which fires shortly after. Nothing to do
  // here for subscriptions; just log.
  return {
    handled: true,
    type: 'checkout.session.completed',
    detail: 'subscription mode (will be handled by subscription.created)',
  };
}

async function handleSubscriptionUpsert(stripeSub: Stripe.Subscription) {
  const planId = stripeSub.metadata?.platform_plan_id;
  if (!planId) {
    return {
      handled: false,
      type: 'subscription.upsert',
      detail: 'no platform_plan_id in metadata — non-platform subscription',
    };
  }

  const existing = await subscriptions.getByStripeId(stripeSub.id);
  const status = stripeSub.status as SubscriptionStatus;
  const currentPeriodStart = new Date(stripeSub.current_period_start * 1000);
  const currentPeriodEnd = new Date(stripeSub.current_period_end * 1000);

  if (existing) {
    await subscriptions.updateStatus(existing.id, {
      status,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
      canceledAt: stripeSub.canceled_at
        ? new Date(stripeSub.canceled_at * 1000)
        : null,
    });
    return {
      handled: true,
      type: 'subscription.updated',
      detail: `${existing.id} → ${status}`,
    };
  }

  // First time seeing this Stripe subscription — create the platform row.
  const customerId =
    typeof stripeSub.customer === 'string'
      ? stripeSub.customer
      : stripeSub.customer.id;
  const tenantId = (stripeSub.metadata?.tenant_id || 'big-muddy') as never;

  // Try to fetch customer email from Stripe (not guaranteed in subscription object)
  let customerEmail = stripeSub.metadata?.customer_email ?? '';
  if (!customerEmail && customerId) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
    const customer = await stripe.customers.retrieve(customerId);
    if (!customer.deleted && customer.email) customerEmail = customer.email;
  }

  const customerName = stripeSub.metadata?.customer_name || undefined;

  const created = await subscriptions.create({
    tenantId,
    planId,
    customerEmail,
    customerName,
    stripeCustomerId: customerId,
    stripeSubscriptionId: stripeSub.id,
    status,
    currentPeriodStart,
    currentPeriodEnd,
    trialEndsAt: stripeSub.trial_end
      ? new Date(stripeSub.trial_end * 1000)
      : undefined,
    metadata: stripeSub.metadata as never,
  });

  // If the Plan has platformFeePercent > 0, auto-create a ModuleEngagement
  // record so Finance Module can track the recurring revenue + platform fee.
  await maybeCreateEngagement(created.id, planId);

  // Fire-and-forget welcome email (sendSafe swallows errors; logs to console).
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (plan) {
    void emailSend.sendSafe({
      brand: emailBrand(plan.brand),
      to: customerEmail,
      email: emailTemplates.subscriptionWelcome({
        customerName,
        customerEmail,
        brand: emailBrand(plan.brand),
        planName: plan.name,
        priceCents: plan.priceCents,
        currency: plan.currency,
        interval: plan.interval,
        currentPeriodEnd: currentPeriodEnd.toISOString(),
        trialEndsAt: stripeSub.trial_end
          ? new Date(stripeSub.trial_end * 1000).toISOString()
          : undefined,
        stripeCustomerId: customerId,
      }),
      tags: { event: 'subscription.welcome', planId },
    });
  }

  return {
    handled: true,
    type: 'subscription.created',
    detail: `${created.id} (${status})`,
  };
}

async function handleSubscriptionDeleted(stripeSub: Stripe.Subscription) {
  const existing = await subscriptions.getByStripeId(stripeSub.id);
  if (!existing) {
    return {
      handled: false,
      type: 'subscription.deleted',
      detail: 'no platform subscription found for stripe id',
    };
  }
  await subscriptions.updateStatus(existing.id, {
    status: 'canceled',
    canceledAt: new Date(),
    cancelAtPeriodEnd: false,
  });

  // Cancellation email
  const plan = await prisma.plan.findUnique({ where: { id: existing.planId } });
  if (plan) {
    void emailSend.sendSafe({
      brand: emailBrand(plan.brand),
      to: existing.customerEmail,
      email: emailTemplates.subscriptionCancelled({
        customerName: existing.customerName ?? undefined,
        customerEmail: existing.customerEmail,
        brand: emailBrand(plan.brand),
        planName: plan.name,
        priceCents: plan.priceCents,
        currency: plan.currency,
        interval: plan.interval,
        currentPeriodEnd: existing.currentPeriodEnd.toISOString(),
      }),
      tags: { event: 'subscription.cancelled', planId: plan.id },
    });
  }

  return {
    handled: true,
    type: 'subscription.deleted',
    detail: `${existing.id} canceled`,
  };
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // Hook for Finance Module — record the actual paid invoice.
  // For now, just log; Finance Module wiring lands in Block 3.
  return {
    handled: true,
    type: 'invoice.payment_succeeded',
    detail: `invoice ${invoice.id} for ${invoice.amount_paid} ${invoice.currency}`,
  };
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (invoice.subscription) {
    const stripeSubId =
      typeof invoice.subscription === 'string'
        ? invoice.subscription
        : invoice.subscription.id;
    const sub = await subscriptions.getByStripeId(stripeSubId);
    if (sub) {
      await subscriptions.updateStatus(sub.id, { status: 'past_due' });

      // Payment-failed dunning email
      const plan = await prisma.plan.findUnique({ where: { id: sub.planId } });
      if (plan) {
        void emailSend.sendSafe({
          brand: emailBrand(plan.brand),
          to: sub.customerEmail,
          email: emailTemplates.subscriptionPaymentFailed({
            customerName: sub.customerName ?? undefined,
            customerEmail: sub.customerEmail,
            brand: emailBrand(plan.brand),
            planName: plan.name,
            priceCents: plan.priceCents,
            currency: plan.currency,
            interval: plan.interval,
            stripeCustomerId: sub.stripeCustomerId ?? undefined,
          }),
          tags: { event: 'subscription.payment_failed', planId: plan.id },
        });
      }
    }
  }
  return {
    handled: true,
    type: 'invoice.payment_failed',
    detail: `invoice ${invoice.id} marked past_due`,
  };
}

/**
 * If a Subscription's Plan has platformFeePercent > 0, create the
 * ModuleEngagement record for Tier 3 revenue tracking. Idempotent —
 * skips if engagement already exists.
 */
async function maybeCreateEngagement(
  subscriptionId: string,
  planId: string
): Promise<void> {
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan?.platformFeePercent || Number(plan.platformFeePercent) <= 0) {
    return; // internal tooling — no engagement to record
  }
  const existing = await prisma.moduleEngagement.findUnique({
    where: { subscriptionId },
  });
  if (existing) return;

  const sub = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
  });
  if (!sub) return;

  await prisma.moduleEngagement.create({
    data: {
      vendorTenantId: plan.tenantId,
      customerEmail: sub.customerEmail,
      subscriptionId,
      modules: ['commerce'], // future: derived from plan metadata
      monthlyRevenueCents:
        plan.interval === 'month'
          ? plan.priceCents / plan.intervalCount
          : plan.interval === 'year'
            ? Math.round(plan.priceCents / plan.intervalCount / 12)
            : 0,
      platformFeePercent: plan.platformFeePercent,
      status: 'active',
    },
  });
}
