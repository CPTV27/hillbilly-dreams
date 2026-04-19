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

/**
 * Fetch a bookable resource by id.
 *
 * Pass `tenantId` from API handlers where `id` is untrusted. Returns `null`
 * for resources belonging to a different tenant — IDOR protection.
 */
export async function get(
  id: string,
  tenantId?: TenantId
): Promise<Resource | null> {
  const resource = await prisma.resource.findUnique({ where: { id } });
  if (!resource) return null;
  if (tenantId && resource.tenantId !== tenantId) return null;
  return resource;
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

/**
 * Atomically reserve N seats. Returns null if not enough capacity.
 *
 * Uses a single atomic UPDATE with a capacity check in the WHERE clause.
 * If the update affects 0 rows, either the resource doesn't exist OR there
 * wasn't enough available capacity — we refetch to distinguish, but NO
 * oversell window is ever visible to other queries.
 *
 * Previous implementation (2026-04-19 Gemini review, HIGH #4): incremented
 * first, refetched, and rolled back if oversold — which briefly exposed
 * oversold state to concurrent readers and could misreport capacity.
 */
export async function reserve(
  id: string,
  quantity: number
): Promise<Resource | null> {
  if (quantity <= 0) return null;

  // Atomic: only increment if there's room. Postgres evaluates the WHERE
  // on the current row state within the UPDATE's row lock.
  const result = await prisma.$executeRaw`
    UPDATE "Resource"
    SET "reservedCount" = "reservedCount" + ${quantity}
    WHERE id = ${id}
      AND active = true
      AND "totalCapacity" - "reservedCount" >= ${quantity}
  `;

  // $executeRaw returns affected row count. 0 = not enough capacity or missing.
  if (result === 0) return null;

  return prisma.resource.findUnique({ where: { id } });
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
