// packages/modules/booking/src/resources.ts
// Resource = bookable inventory (Blues Room ticket inventory for one show,
// a service appointment slot, an event-day rental window).

import { prisma } from '@bigmuddy/database';
import type {
  Resource,
  CreateResourceInput,
  ResourceType,
  TenantId,
} from './types';

export async function list(opts?: {
  tenantId?: TenantId;
  type?: ResourceType;
  upcomingOnly?: boolean;
  includeInactive?: boolean;
}): Promise<Resource[]> {
  return prisma.resource.findMany({
    where: {
      ...(opts?.tenantId && { tenantId: opts.tenantId }),
      ...(opts?.type && { type: opts.type }),
      ...(opts?.upcomingOnly && { startsAt: { gte: new Date() } }),
      ...(opts?.includeInactive ? {} : { active: true }),
    },
    orderBy: [{ startsAt: 'asc' }, { name: 'asc' }],
  });
}

export async function get(id: string): Promise<Resource | null> {
  return prisma.resource.findUnique({ where: { id } });
}

export async function create(input: CreateResourceInput): Promise<Resource> {
  return prisma.resource.create({
    data: {
      tenantId: input.tenantId,
      brand: input.brand,
      type: input.type,
      name: input.name,
      description: input.description ?? null,
      startsAt: input.startsAt ?? null,
      endsAt: input.endsAt ?? null,
      totalCapacity: input.totalCapacity,
      priceCents: input.priceCents,
      currency: input.currency ?? 'usd',
      metadata: input.metadata as never,
    },
  });
}

/** Atomically reserve N seats. Returns null if not enough capacity. */
export async function reserve(
  id: string,
  quantity: number
): Promise<Resource | null> {
  const updated = await prisma.resource.updateMany({
    where: {
      id,
      reservedCount: { lte: 1_000_000 }, // sentinel — real check below
    },
    data: { reservedCount: { increment: quantity } },
  });
  if (updated.count === 0) return null;
  // Re-fetch to validate we didn't oversell. If we did, roll back.
  const after = await prisma.resource.findUnique({ where: { id } });
  if (!after) return null;
  if (after.reservedCount > after.totalCapacity) {
    await prisma.resource.update({
      where: { id },
      data: { reservedCount: { decrement: quantity } },
    });
    return null;
  }
  return after;
}

/** Release a previously-reserved hold (cancellation, expired hold). */
export async function release(id: string, quantity: number): Promise<Resource> {
  return prisma.resource.update({
    where: { id },
    data: { reservedCount: { decrement: quantity } },
  });
}

export async function deactivate(id: string): Promise<Resource> {
  return prisma.resource.update({ where: { id }, data: { active: false } });
}
