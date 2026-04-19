// packages/modules/commerce/src/types.ts
// Shared types for the Commerce module. Re-exports Prisma types so
// consumers don't need to depend on @bigmuddy/database directly for type info.

import type {
  Plan as PrismaPlan,
  Subscription as PrismaSubscription,
  Product as PrismaProduct,
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
} from '@prisma/client';

export type Plan = PrismaPlan;
export type Subscription = PrismaSubscription;
export type Product = PrismaProduct;
export type Order = PrismaOrder;
export type OrderItem = PrismaOrderItem;

/// Plan billing intervals supported by the module. "one_time" is for
/// products that share the Plan surface (rare — typically Product is used).
export type PlanInterval = 'month' | 'year' | 'one_time';

/// Subscription lifecycle states. Mirrors Stripe but kept independent so
/// the module owns its own state machine.
export type SubscriptionStatus =
  | 'incomplete'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid';

/// Order lifecycle states.
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'fulfilled'
  | 'shipped'
  | 'refunded'
  | 'cancelled';

/// Tenant identifier — mirrors apps/web/config/tenants.ts keys.
export type TenantId =
  | 'big-muddy'
  | 'tuthill'
  | 'studio-c'
  | 'dctv'
  | 'bearsville';

/// Brand identifier — finer-grained than tenant. A tenant can own multiple
/// brands (big-muddy tenant owns inn, magazine, touring, records, radio).
export type BrandId =
  | 'inn'
  | 'magazine'
  | 'touring'
  | 'records'
  | 'radio'
  | 'cpp'
  | 'tuthill'
  | 'studio-c'
  | 'dctv'
  | 'bearsville';

/// Input for creating a new Plan.
export interface CreatePlanInput {
  tenantId: TenantId;
  brand: BrandId;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency?: string;
  interval: PlanInterval;
  intervalCount?: number;
  trialDays?: number;
  features: string[];
  metadata?: Record<string, unknown>;
  /** 0 for internal tooling; 15-30 typical for vendor-delivered services. */
  platformFeePercent?: number;
}

/// Input for creating a new Subscription. Stripe-side handled separately;
/// this records the platform-side row.
export interface CreateSubscriptionInput {
  tenantId: TenantId;
  planId: string;
  customerEmail: string;
  customerName?: string;
  clientId?: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialEndsAt?: Date;
  metadata?: Record<string, unknown>;
}

/// Input for creating a new one-off Product.
export interface CreateProductInput {
  tenantId: TenantId;
  brand: BrandId;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency?: string;
  inventoryLevel?: number;
  trackInventory?: boolean;
  weight?: number;
  shippable?: boolean;
  taxable?: boolean;
  imageUrls?: string[];
  metadata?: Record<string, unknown>;
  platformFeePercent?: number;
}

/// Input for creating an Order with items.
export interface CreateOrderInput {
  tenantId: TenantId;
  customerEmail: string;
  customerName?: string;
  clientId?: number;
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}
