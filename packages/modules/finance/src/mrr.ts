// packages/modules/finance/src/mrr.ts
// Recurring revenue dashboard: MRR / churn / cohort retention views.

import { prisma } from '@bigmuddy/database';

export interface MRRBreakdown {
  totalCents: number;
  perTenant: Array<{ tenantId: string; cents: number; activeCount: number }>;
  perBrand: Array<{ brand: string; cents: number; activeCount: number }>;
}

/** Active MRR across all tenants, broken down by tenant and brand. */
export async function getCurrentMRR(): Promise<MRRBreakdown> {
  const active = await prisma.subscription.findMany({
    where: { status: 'active' },
    include: { plan: true },
  });

  const perTenantMap = new Map<string, { cents: number; activeCount: number }>();
  const perBrandMap = new Map<string, { cents: number; activeCount: number }>();
  let totalCents = 0;

  for (const sub of active) {
    let monthly = 0;
    if (sub.plan.interval === 'month') {
      monthly = sub.plan.priceCents / sub.plan.intervalCount;
    } else if (sub.plan.interval === 'year') {
      monthly = sub.plan.priceCents / sub.plan.intervalCount / 12;
    }
    totalCents += monthly;

    const t = perTenantMap.get(sub.tenantId) ?? { cents: 0, activeCount: 0 };
    t.cents += monthly;
    t.activeCount += 1;
    perTenantMap.set(sub.tenantId, t);

    const b = perBrandMap.get(sub.plan.brand) ?? { cents: 0, activeCount: 0 };
    b.cents += monthly;
    b.activeCount += 1;
    perBrandMap.set(sub.plan.brand, b);
  }

  return {
    totalCents: Math.round(totalCents),
    perTenant: Array.from(perTenantMap.entries()).map(([tenantId, v]) => ({
      tenantId,
      cents: Math.round(v.cents),
      activeCount: v.activeCount,
    })),
    perBrand: Array.from(perBrandMap.entries()).map(([brand, v]) => ({
      brand,
      cents: Math.round(v.cents),
      activeCount: v.activeCount,
    })),
  };
}

/**
 * Trailing-30-day churn rate: cancelled subs / active subs at start of window.
 */
export async function get30DayChurnRate(): Promise<{
  rate: number;
  cancelledCount: number;
  startActiveCount: number;
}> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const cancelledIn30Days = await prisma.subscription.count({
    where: { canceledAt: { gte: thirtyDaysAgo } },
  });

  // Approximation: active count today + cancelled in window = active at window start
  const activeNow = await prisma.subscription.count({
    where: { status: 'active' },
  });
  const startActive = activeNow + cancelledIn30Days;

  return {
    rate: startActive > 0 ? cancelledIn30Days / startActive : 0,
    cancelledCount: cancelledIn30Days,
    startActiveCount: startActive,
  };
}

/**
 * Cohort retention: for each month-of-first-subscription, what % are
 * still active N months later? Returns a 12-month curve.
 */
export async function getCohortRetention(): Promise<
  Array<{
    cohortMonth: string;
    cohortSize: number;
    retentionByMonth: number[];
  }>
> {
  const allSubs = await prisma.subscription.findMany({
    select: {
      customerEmail: true,
      createdAt: true,
      canceledAt: true,
      status: true,
    },
  });

  const cohorts = new Map<
    string,
    Array<{ start: Date; end: Date | null }>
  >();

  for (const sub of allSubs) {
    const cohortMonth = `${sub.createdAt.getUTCFullYear()}-${String(
      sub.createdAt.getUTCMonth() + 1
    ).padStart(2, '0')}`;
    const arr = cohorts.get(cohortMonth) ?? [];
    arr.push({ start: sub.createdAt, end: sub.canceledAt });
    cohorts.set(cohortMonth, arr);
  }

  const result: Array<{
    cohortMonth: string;
    cohortSize: number;
    retentionByMonth: number[];
  }> = [];
  Array.from(cohorts.entries()).forEach(([cohortMonth, members]) => {
    const retention: number[] = [];
    for (let m = 0; m < 12; m++) {
      const cutoff = new Date(members[0]!.start);
      cutoff.setMonth(cutoff.getMonth() + m);
      const stillActive = members.filter(
        (mem: { start: Date; end: Date | null }) => !mem.end || mem.end >= cutoff
      ).length;
      retention.push(stillActive / members.length);
    }
    result.push({
      cohortMonth,
      cohortSize: members.length,
      retentionByMonth: retention,
    });
  });
  return result.sort((a, b) => a.cohortMonth.localeCompare(b.cohortMonth));
}
