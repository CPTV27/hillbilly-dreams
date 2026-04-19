// packages/modules/commerce/src/plans.ts
// Plan CRUD — pricing tier templates.

import { prisma } from '@bigmuddy/database';
import type {
  Plan,
  CreatePlanInput,
  TenantId,
  BrandId,
} from './types';

/** List active plans, optionally filtered by tenant or brand. */
export async function list(opts?: {
  tenantId?: TenantId;
  brand?: BrandId;
  includeInactive?: boolean;
}): Promise<Plan[]> {
  return prisma.plan.findMany({
    where: {
      ...(opts?.tenantId ? { tenantId: opts.tenantId } : {}),
      ...(opts?.brand ? { brand: opts.brand } : {}),
      ...(opts?.includeInactive ? {} : { active: true }),
    },
    orderBy: [{ tenantId: 'asc' }, { brand: 'asc' }, { priceCents: 'asc' }],
  });
}

/** Get a plan by id. Returns null if not found. */
export async function get(id: string): Promise<Plan | null> {
  return prisma.plan.findUnique({ where: { id } });
}

/** Get a plan by tenant + slug. Returns null if not found. */
export async function getBySlug(
  tenantId: TenantId,
  slug: string
): Promise<Plan | null> {
  return prisma.plan.findUnique({
    where: { tenantId_slug: { tenantId, slug } },
  });
}

/** Create a new plan. Slugs are unique per tenant. */
export async function create(input: CreatePlanInput): Promise<Plan> {
  return prisma.plan.create({
    data: {
      tenantId: input.tenantId,
      brand: input.brand,
      slug: input.slug,
      name: input.name,
      description: input.description,
      priceCents: input.priceCents,
      currency: input.currency ?? 'usd',
      interval: input.interval,
      intervalCount: input.intervalCount ?? 1,
      trialDays: input.trialDays ?? 0,
      features: input.features,
      metadata: input.metadata as never,
      platformFeePercent:
        input.platformFeePercent !== undefined
          ? input.platformFeePercent
          : null,
    },
  });
}

/** Soft-update a plan. Only provided fields change. */
export async function update(
  id: string,
  patch: Partial<CreatePlanInput> & { active?: boolean }
): Promise<Plan> {
  return prisma.plan.update({
    where: { id },
    data: {
      ...(patch.name !== undefined && { name: patch.name }),
      ...(patch.description !== undefined && { description: patch.description }),
      ...(patch.priceCents !== undefined && { priceCents: patch.priceCents }),
      ...(patch.features !== undefined && { features: patch.features }),
      ...(patch.metadata !== undefined && { metadata: patch.metadata as never }),
      ...(patch.platformFeePercent !== undefined && {
        platformFeePercent: patch.platformFeePercent,
      }),
      ...(patch.active !== undefined && { active: patch.active }),
    },
  });
}

/**
 * Mark a plan inactive. Does NOT cancel existing subscriptions on this plan.
 * To migrate subscribers off, call subscriptions.bulkChangePlan() separately.
 */
export async function deactivate(id: string): Promise<Plan> {
  return prisma.plan.update({
    where: { id },
    data: { active: false },
  });
}

/** Attach Stripe Price + Product IDs after Stripe-side creation. */
export async function setStripeIds(
  id: string,
  ids: { stripePriceId: string; stripeProductId: string }
): Promise<Plan> {
  return prisma.plan.update({
    where: { id },
    data: {
      stripePriceId: ids.stripePriceId,
      stripeProductId: ids.stripeProductId,
    },
  });
}
