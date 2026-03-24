// lib/stripe.ts
// ─────────────────────────────────────────────────────────────
// Platform-Portable Stripe Client
// ─────────────────────────────────────────────────────────────
// Lazy singleton Stripe client. Tenant-specific fee schedules
// live in config/stripe-config.ts.
//
// SEAM: 2026-03-24 (AG)
// ─────────────────────────────────────────────────────────────

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

// Re-export tenant fee config for backward compatibility
export { type BrandClass, PLATFORM_FEE_PERCENT, calculateApplicationFee } from '@/config/stripe-config';

