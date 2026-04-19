// packages/modules/finance/src/pnl.ts
// Per-entity profit-and-loss views. Pulls revenue from subscription/order
// rows tagged for the entity, plus costs from RetainerHour and engagement
// platform fees.

import { prisma } from '@bigmuddy/database';
import type { EntityId, EntityPnL, PnLLine } from './types';

/**
 * Maps tenant IDs (Stripe-side) to operating entity IDs (legal entity).
 * Used to roll up revenue per LLC for accounting.
 */
const TENANT_TO_ENTITY: Record<string, EntityId> = {
  'big-muddy': 'big-muddy-natchez', // default — Inn / Magazine live here
  // Touring brand tenants would map to big-muddy-touring once the data
  // model is finalized; for now, big-muddy covers both subsidiaries.
  tuthill: 'tuthill-design',
  'studio-c': 'tuthill-design', // sister DBA under same LLC
  dctv: 'mbt', // platform-managed
  bearsville: 'mbt',
};

function entityForTenant(tenantId: string): EntityId {
  return TENANT_TO_ENTITY[tenantId] ?? 'mbt';
}

export async function getPnL(
  entity: EntityId,
  periodStart: Date,
  periodEnd: Date
): Promise<EntityPnL> {
  // Revenue from subscriptions + orders attributed to this entity
  const [subs, orders, engagements, hours] = await Promise.all([
    prisma.subscription.findMany({
      where: {
        status: 'active',
        currentPeriodStart: { lte: periodEnd },
        currentPeriodEnd: { gte: periodStart },
      },
      include: { plan: true },
    }),
    prisma.order.findMany({
      where: {
        status: { in: ['paid', 'fulfilled', 'shipped'] },
        createdAt: { gte: periodStart, lte: periodEnd },
      },
    }),
    prisma.moduleEngagement.findMany({
      where: { vendorTenantId: { not: undefined }, status: 'active' },
    }),
    prisma.retainerHour.findMany({
      where: { workedDate: { gte: periodStart, lte: periodEnd } },
    }),
  ]);

  // Filter to this entity
  const subsForEntity = subs.filter(
    (s) => entityForTenant(s.tenantId) === entity
  );
  const ordersForEntity = orders.filter(
    (o) => entityForTenant(o.tenantId) === entity
  );
  const hoursForEntity = hours.filter((h) => h.consumingEntityId === entity);

  // Revenue lines
  const subRevenue = subsForEntity.reduce((sum, s) => {
    if (s.plan.interval === 'month') return sum + s.plan.priceCents;
    if (s.plan.interval === 'year')
      return sum + Math.round(s.plan.priceCents / 12);
    return sum;
  }, 0);
  const orderRevenue = ordersForEntity.reduce((s, o) => s + o.totalCents, 0);

  // Cost lines
  const bucketCost = hoursForEntity.reduce((s, h) => s + h.totalCents, 0);

  // Platform fees: vendor entity owes MBT a fee on engagements
  let platformFeesOwed = 0;
  let platformFeesReceived = 0;
  for (const e of engagements) {
    const vendorEntity = entityForTenant(e.vendorTenantId);
    const fee = Math.round(
      (e.monthlyRevenueCents * Number(e.platformFeePercent)) / 100
    );
    if (vendorEntity === entity) platformFeesOwed += fee;
    if (entity === 'mbt') platformFeesReceived += fee;
  }

  const revenue: PnLLine[] = [
    { category: 'subscriptions', amountCents: subRevenue },
    { category: 'orders', amountCents: orderRevenue },
    ...(platformFeesReceived > 0
      ? [{ category: 'platform fees received', amountCents: platformFeesReceived }]
      : []),
  ];
  const costs: PnLLine[] = [
    ...(bucketCost > 0
      ? [{ category: 'studio C bucket hours', amountCents: bucketCost }]
      : []),
    ...(platformFeesOwed > 0
      ? [{ category: 'platform fees owed', amountCents: platformFeesOwed }]
      : []),
  ];

  const totalRevenueCents = revenue.reduce((s, l) => s + l.amountCents, 0);
  const totalCostsCents = costs.reduce((s, l) => s + l.amountCents, 0);

  return {
    entity,
    periodStart,
    periodEnd,
    revenue,
    costs,
    totalRevenueCents,
    totalCostsCents,
    netCents: totalRevenueCents - totalCostsCents,
  };
}
