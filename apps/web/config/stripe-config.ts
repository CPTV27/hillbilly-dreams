// apps/web/config/stripe-config.ts
// ─────────────────────────────────────────────────────────────
// BMT Tenant: Stripe Fee Schedule & Brand Classes
// ─────────────────────────────────────────────────────────────
// This file contains BMT-specific revenue configuration.
// Platform-portable Stripe client lives in lib/stripe.ts.
//
// SEAM: 2026-03-24 (AG)
// When deploying a new tenant, create a new stripe-config.ts
// with that tenant's brand classes and fee schedule.
// ─────────────────────────────────────────────────────────────

/** Revenue brand classes for Hillbilly Dreams, Inc. holding company */
export type BrandClass = 'S2PX' | 'BMT' | 'BuyCurious' | 'Corporate';

/** Platform fee percentages per brand — used for Stripe Connect destination charges */
export const PLATFORM_FEE_PERCENT: Record<BrandClass, number> = {
  S2PX: 15,       // SaaS licensing — 15% platform cut
  BMT: 20,        // Touring/tickets — 20% platform cut
  BuyCurious: 25, // Art marketplace — 25% platform cut
  Corporate: 0,   // Direct corporate revenue — no split
};

/** Default fee percentage when brand class is unknown */
export const DEFAULT_FEE_PERCENT = 20;

/**
 * Calculate the Stripe application fee for a destination charge.
 * @param amount - Total charge amount in cents
 * @param brandClass - Revenue category
 * @returns Application fee in cents (rounded)
 */
export function calculateApplicationFee(
  amount: number,
  brandClass: BrandClass
): number {
  const pct = PLATFORM_FEE_PERCENT[brandClass] ?? DEFAULT_FEE_PERCENT;
  return Math.round(amount * (pct / 100));
}
