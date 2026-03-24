// lib/stripe.ts
// Centralized Stripe client with Connect support for Hillbilly Dreams, Inc.
// Destination Charges model: platform collects payment, splits to connected accounts.

import Stripe from 'stripe';

// Lazy singleton — avoids throwing at build time when STRIPE_SECRET_KEY is absent.
let _stripe: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('[Stripe] STRIPE_SECRET_KEY is not configured');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
      typescript: true,
    });
  }
  return _stripe;
}

/** @deprecated Use getStripeClient() inside request handlers. Kept for compatibility. */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripeClient() as any)[prop];
  },
});

// Brand classes for revenue tracking across the holding company
export type BrandClass = 'S2PX' | 'BMT' | 'BuyCurious' | 'Corporate';

// Platform fee percentages per brand
export const PLATFORM_FEE_PERCENT: Record<BrandClass, number> = {
  S2PX: 15,       // SaaS licensing — 15% platform cut
  BMT: 20,        // Touring/tickets — 20% platform cut
  BuyCurious: 25, // Art marketplace — 25% platform cut
  Corporate: 0,   // Direct corporate revenue — no split
};

export function calculateApplicationFee(
  amount: number,
  brandClass: BrandClass
): number {
  const pct = PLATFORM_FEE_PERCENT[brandClass] ?? 20;
  return Math.round(amount * (pct / 100));
}
