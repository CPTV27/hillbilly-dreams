// packages/modules/commerce/src/subscriptions.ts
// Subscription CRUD + lifecycle. Stripe-side via webhook handlers in webhooks.ts;
// platform-side state machine lives here.

import { prisma } from '@bigmuddy/database';
import type {
  Subscription,
  CreateSubscriptionInput,
  SubscriptionStatus,
  TenantId,
} from './types';

/** List subscriptions, optionally filtered by tenant + status. */
export async function list(opts?: {
  tenantId?: TenantId;
  status?: SubscriptionStatus | SubscriptionStatus[];
  customerEmail?: string;
}): Promise<Subscription[]> {
  const statusFilter = Array.isArray(opts?.status)
    ? { in: opts!.status }
    : opts?.status
      ? opts.status
      : undefined;

  return prisma.subscription.findMany({
    where: {
      ...(opts?.tenantId ? { tenantId: opts.tenantId } : {}),
      ...(statusFilter ? { status: statusFilter as never } : {}),
      ...(opts?.customerEmail ? { customerEmail: opts.customerEmail } : {}),
    },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Fetch a subscription by id.
 *
 * **Tenant scoping (CRITICAL for IDOR protection):**
 * Always pass `tenantId` from any API handler that receives the `id` from
 * an untrusted source (URL params, request body). When `tenantId` is provided,
 * this returns `null` for subscriptions that belong to a different tenant —
 * preventing cross-tenant access via brute-forced or guessed ids.
 *
 * Only omit `tenantId` from trusted internal callers (Stripe webhook handlers,
 * admin-console lookups that already enforce tenant context upstream).
 */
export async function get(
  id: string,
  tenantId?: TenantId
): Promise<Subscription | null> {
  const sub = await prisma.subscription.findUnique({
    where: { id },
    include: { plan: true, engagement: true },
  });
  if (!sub) return null;
  if (tenantId && sub.tenantId !== tenantId) return null;
  return sub;
}

export async function getByStripeId(
  stripeSubscriptionId: string
): Promise<Subscription | null> {
  return prisma.subscription.findUnique({
    where: { stripeSubscriptionId },
    include: { plan: true },
  });
}

/** Create a platform-side subscription record. */
export async function create(
  input: CreateSubscriptionInput
): Promise<Subscription> {
  return prisma.subscription.create({
    data: {
      tenantId: input.tenantId,
      planId: input.planId,
      customerEmail: input.customerEmail,
      customerName: input.customerName ?? null,
      clientId: input.clientId ?? null,
      stripeCustomerId: input.stripeCustomerId ?? null,
      stripeSubscriptionId: input.stripeSubscriptionId ?? null,
      status: input.status,
      currentPeriodStart: input.currentPeriodStart,
      currentPeriodEnd: input.currentPeriodEnd,
      trialEndsAt: input.trialEndsAt ?? null,
      metadata: input.metadata as never,
    },
  });
}

/**
 * Update lifecycle fields. Used by Stripe webhook handlers.
 * Idempotent — safe to call with same patch repeatedly.
 */
export async function updateStatus(
  id: string,
  patch: {
    status?: SubscriptionStatus;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    cancelAtPeriodEnd?: boolean;
    canceledAt?: Date | null;
  }
): Promise<Subscription> {
  return prisma.subscription.update({
    where: { id },
    data: {
      ...(patch.status !== undefined && { status: patch.status }),
      ...(patch.currentPeriodStart !== undefined && {
        currentPeriodStart: patch.currentPeriodStart,
      }),
      ...(patch.currentPeriodEnd !== undefined && {
        currentPeriodEnd: patch.currentPeriodEnd,
      }),
      ...(patch.cancelAtPeriodEnd !== undefined && {
        cancelAtPeriodEnd: patch.cancelAtPeriodEnd,
      }),
      ...(patch.canceledAt !== undefined && { canceledAt: patch.canceledAt }),
    },
  });
}

/**
 * Mark a subscription as cancel-at-period-end. Does NOT immediately revoke
 * access — Stripe will end the subscription at the period boundary.
 */
export async function cancelAtPeriodEnd(id: string): Promise<Subscription> {
  return prisma.subscription.update({
    where: { id },
    data: { cancelAtPeriodEnd: true },
  });
}

/** Hard cancel — for refunds, fraud, manual ops. */
export async function cancelImmediately(id: string): Promise<Subscription> {
  return prisma.subscription.update({
    where: { id },
    data: {
      status: 'canceled',
      canceledAt: new Date(),
      cancelAtPeriodEnd: false,
    },
  });
}

/**
 * Bulk-migrate subscribers off a deactivated plan onto a new plan.
 * Used when a Plan is deactivated and existing subscribers should move.
 */
export async function bulkChangePlan(
  fromPlanId: string,
  toPlanId: string
): Promise<{ updated: number }> {
  const result = await prisma.subscription.updateMany({
    where: { planId: fromPlanId, status: { in: ['active', 'trialing'] } },
    data: { planId: toPlanId },
  });
  return { updated: result.count };
}

/** Active MRR in cents for a tenant (sum of monthly recurring across active subs). */
export async function getMRR(tenantId: TenantId): Promise<number> {
  const active = await prisma.subscription.findMany({
    where: { tenantId, status: 'active' },
    include: { plan: true },
  });
  return active.reduce((sum, sub) => {
    if (sub.plan.interval === 'month') {
      return sum + sub.plan.priceCents / sub.plan.intervalCount;
    }
    if (sub.plan.interval === 'year') {
      return sum + sub.plan.priceCents / sub.plan.intervalCount / 12;
    }
    return sum;
  }, 0);
}
