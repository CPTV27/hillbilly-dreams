// packages/modules/finance/src/engagements.ts
// ModuleEngagement = a recurring vendor service powered by MBT modules.
// MBT takes platformFeePercent of the recurring revenue. Auto-created by
// Commerce module when a Subscription with platformFeePercent > 0 activates.

import { prisma } from '@bigmuddy/database';
import type {
  ModuleEngagement,
  CreateEngagementInput,
  EngagementStatus,
} from './types';

export async function list(opts?: {
  vendorTenantId?: string;
  status?: EngagementStatus;
  customerEmail?: string;
}): Promise<ModuleEngagement[]> {
  return prisma.moduleEngagement.findMany({
    where: {
      ...(opts?.vendorTenantId && { vendorTenantId: opts.vendorTenantId }),
      ...(opts?.status && { status: opts.status }),
      ...(opts?.customerEmail && { customerEmail: opts.customerEmail }),
    },
    include: { subscription: { include: { plan: true } } },
    orderBy: { startedAt: 'desc' },
  });
}

export async function get(id: string): Promise<ModuleEngagement | null> {
  return prisma.moduleEngagement.findUnique({
    where: { id },
    include: { subscription: { include: { plan: true } } },
  });
}

export async function create(
  input: CreateEngagementInput
): Promise<ModuleEngagement> {
  return prisma.moduleEngagement.create({
    data: {
      vendorTenantId: input.vendorTenantId,
      customerEmail: input.customerEmail,
      subscriptionId: input.subscriptionId ?? null,
      modules: input.modules,
      monthlyRevenueCents: input.monthlyRevenueCents,
      platformFeePercent: input.platformFeePercent,
      notes: input.notes ?? null,
    },
  });
}

export async function pause(id: string): Promise<ModuleEngagement> {
  return prisma.moduleEngagement.update({
    where: { id },
    data: { status: 'paused' },
  });
}

export async function resume(id: string): Promise<ModuleEngagement> {
  return prisma.moduleEngagement.update({
    where: { id },
    data: { status: 'active' },
  });
}

export async function end(id: string): Promise<ModuleEngagement> {
  return prisma.moduleEngagement.update({
    where: { id },
    data: { status: 'ended', endedAt: new Date() },
  });
}

/**
 * Total platform fee owed by a vendor across active engagements for the month.
 * Returns cents.
 */
export async function calculateMonthlyPlatformFee(
  vendorTenantId: string
): Promise<number> {
  const active = await prisma.moduleEngagement.findMany({
    where: { vendorTenantId, status: 'active' },
  });
  return active.reduce((sum, e) => {
    const fee = (e.monthlyRevenueCents * Number(e.platformFeePercent)) / 100;
    return sum + Math.round(fee);
  }, 0);
}
