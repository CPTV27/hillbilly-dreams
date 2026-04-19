// packages/modules/commerce/src/checkout.ts
// Stripe Checkout helpers — subscription checkout, one-time checkout,
// customer portal redirect.

import Stripe from 'stripe';
import { prisma } from '@bigmuddy/database';
import * as plans from './plans';
import * as products from './products';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY not configured');
  }
  return new Stripe(key);
}

/**
 * Create a Stripe Checkout Session for a subscription.
 * Returns the session URL the customer is redirected to.
 *
 * If the Plan doesn't yet have a stripePriceId, this will create the
 * Stripe Product + Price on demand and persist them back to the Plan.
 */
export async function createSubscriptionCheckout(input: {
  planId: string;
  customerEmail: string;
  customerName?: string;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
  metadata?: Record<string, string>;
}): Promise<{ sessionId: string; url: string }> {
  const stripe = getStripe();
  const plan = await plans.get(input.planId);
  if (!plan) throw new Error(`Plan not found: ${input.planId}`);
  if (!plan.active) throw new Error(`Plan is not active: ${input.planId}`);

  // Lazy-create Stripe Product + Price if not yet synced.
  //
  // Atomicity (Gemini review #8): two concurrent checkouts for a plan with
  // no stripePriceId could both create a duplicate Stripe Product + Price,
  // orphaning one. We mitigate with:
  //   1. Stripe idempotency keys derived from the plan id — duplicate calls
  //      return the SAME Stripe Product/Price instead of creating new ones.
  //   2. Re-read the plan after creation so the DB-side persisted value
  //      wins if another concurrent caller already saved its ids.
  let stripePriceId = plan.stripePriceId;
  if (!stripePriceId) {
    const product = await stripe.products.create(
      {
        name: plan.name,
        description: plan.description,
        metadata: {
          platform_plan_id: plan.id,
          tenant_id: plan.tenantId,
          brand: plan.brand,
        },
      },
      { idempotencyKey: `plan-product-${plan.id}` }
    );
    const price = await stripe.prices.create(
      {
        product: product.id,
        unit_amount: plan.priceCents,
        currency: plan.currency,
        recurring:
          plan.interval === 'one_time'
            ? undefined
            : {
                interval: plan.interval as 'month' | 'year',
                interval_count: plan.intervalCount,
              },
      },
      { idempotencyKey: `plan-price-${plan.id}-${plan.priceCents}-${plan.currency}` }
    );
    // First-writer-wins: only persist if stripePriceId is still null. If a
    // concurrent request already persisted, re-read and use that value
    // (Stripe idempotency guaranteed the product/price we created is the
    // same logical object, so either is correct).
    await plans.setStripeIdsIfMissing(plan.id, {
      stripePriceId: price.id,
      stripeProductId: product.id,
    });
    const refreshed = await plans.get(plan.id);
    stripePriceId = refreshed?.stripePriceId ?? price.id;
  }

  const trialPeriodDays = input.trialDays ?? plan.trialDays;
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: stripePriceId, quantity: 1 }],
    customer_email: input.customerEmail,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    subscription_data: {
      ...(trialPeriodDays > 0 && { trial_period_days: trialPeriodDays }),
      metadata: {
        platform_plan_id: plan.id,
        tenant_id: plan.tenantId,
        brand: plan.brand,
        ...(input.metadata ?? {}),
      },
    },
    metadata: {
      platform_plan_id: plan.id,
      tenant_id: plan.tenantId,
      brand: plan.brand,
      customer_name: input.customerName ?? '',
      ...(input.metadata ?? {}),
    },
  });

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL');
  }
  return { sessionId: session.id, url: session.url };
}

/**
 * Create a Stripe Checkout Session for a one-time Order.
 * Order must already exist in pending status.
 */
export async function createOrderCheckout(input: {
  orderId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ sessionId: string; url: string }> {
  const stripe = getStripe();
  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    include: { items: { include: { product: true } } },
  });
  if (!order) throw new Error(`Order not found: ${input.orderId}`);
  if (order.status !== 'pending') {
    throw new Error(`Order ${input.orderId} not pending: ${order.status}`);
  }

  // Build line items from order — lazy-sync Stripe Product/Price as needed.
  // Same race-condition mitigation as createSubscriptionCheckout: Stripe
  // idempotency keys + first-writer-wins DB persist.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of order.items) {
    const product = item.product;
    let stripePriceId = product.stripePriceId;
    if (!stripePriceId) {
      const stripeProduct = await stripe.products.create(
        {
          name: product.name,
          description: product.description,
          images: product.imageUrls.length > 0 ? product.imageUrls : undefined,
          shippable: product.shippable,
          metadata: {
            platform_product_id: product.id,
            tenant_id: product.tenantId,
            brand: product.brand,
          },
        },
        { idempotencyKey: `product-product-${product.id}` }
      );
      const stripePrice = await stripe.prices.create(
        {
          product: stripeProduct.id,
          unit_amount: product.priceCents,
          currency: product.currency,
        },
        {
          idempotencyKey: `product-price-${product.id}-${product.priceCents}-${product.currency}`,
        }
      );
      // First-writer-wins. If a concurrent caller already stored the ids,
      // we pick them up on re-read below.
      await prisma.product.updateMany({
        where: { id: product.id, stripePriceId: null },
        data: {
          stripePriceId: stripePrice.id,
          stripeProductId: stripeProduct.id,
        },
      });
      const refreshed = await products.get(product.id);
      stripePriceId = refreshed?.stripePriceId ?? stripePrice.id;
    }
    lineItems.push({ price: stripePriceId, quantity: item.quantity });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    customer_email: order.customerEmail,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: {
      platform_order_id: order.id,
      tenant_id: order.tenantId,
    },
  });

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL');
  }
  // Persist the session ID on the Order so webhooks can correlate.
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeCheckoutId: session.id },
  });
  return { sessionId: session.id, url: session.url };
}

/**
 * Generate a Stripe Customer Portal URL — for self-serve subscription
 * management (cancel, update card, view invoices).
 */
export async function createCustomerPortal(input: {
  stripeCustomerId: string;
  returnUrl: string;
}): Promise<{ url: string }> {
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: input.stripeCustomerId,
    return_url: input.returnUrl,
  });
  return { url: session.url };
}
