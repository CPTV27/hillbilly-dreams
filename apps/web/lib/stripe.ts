// lib/stripe.ts
// Centralized Stripe client with Connect support for Hillbilly Dreams, Inc.
// Destination Charges model: platform collects payment, splits to connected accounts.

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[Stripe] STRIPE_SECRET_KEY not set — Stripe calls will fail at runtime');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
  typescript: true,
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
