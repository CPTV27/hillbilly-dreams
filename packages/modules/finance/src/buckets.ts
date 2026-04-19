// packages/modules/finance/src/buckets.ts
// Studio C bucket-hour ledger. MBT buys buckets of fungible Studio C hours
// from Tuthill Design LLC. Consuming entities draw down per project.

import { prisma } from '@bigmuddy/database';
import type { RetainerHour, LogBucketHoursInput, EntityId } from './types';

const DEFAULT_HOURLY_RATE_CENTS = 5000; // $50/hr per the bucket pricing

export async function list(opts?: {
  bucketMonth?: string; // "2026-04"
  consumingEntityId?: EntityId | string;
}): Promise<RetainerHour[]> {
  return prisma.retainerHour.findMany({
    where: {
      ...(opts?.bucketMonth && { bucketMonth: opts.bucketMonth }),
      ...(opts?.consumingEntityId && {
        consumingEntityId: opts.consumingEntityId,
      }),
    },
    orderBy: { workedDate: 'desc' },
  });
}

export async function logHours(input: LogBucketHoursInput): Promise<RetainerHour> {
  const hourlyRate = input.hourlyRateCents ?? DEFAULT_HOURLY_RATE_CENTS;
  const totalCents = Math.round(input.hoursWorked * hourlyRate);
  return prisma.retainerHour.create({
    data: {
      bucketMonth: input.bucketMonth,
      consumingEntityId: input.consumingEntityId,
      projectRef: input.projectRef ?? null,
      hoursWorked: input.hoursWorked,
      hourlyRateCents: hourlyRate,
      totalCents,
      workedBy: input.workedBy ?? null,
      workType: input.workType ?? null,
      workedDate: input.workedDate,
      notes: input.notes ?? null,
      invoiceRef: input.invoiceRef ?? null,
    },
  });
}

/**
 * Total hours consumed in a bucket month, optionally per entity.
 * Returns { hours, cents } so consumers can render either.
 */
export async function getMonthSummary(
  bucketMonth: string
): Promise<{
  totalHours: number;
  totalCents: number;
  perEntity: Array<{ entity: string; hours: number; cents: number }>;
}> {
  const rows = await prisma.retainerHour.findMany({
    where: { bucketMonth },
  });
  let totalHours = 0;
  let totalCents = 0;
  const perEntityMap = new Map<string, { hours: number; cents: number }>();

  for (const r of rows) {
    const hours = Number(r.hoursWorked);
    totalHours += hours;
    totalCents += r.totalCents;
    const existing = perEntityMap.get(r.consumingEntityId) ?? {
      hours: 0,
      cents: 0,
    };
    existing.hours += hours;
    existing.cents += r.totalCents;
    perEntityMap.set(r.consumingEntityId, existing);
  }

  return {
    totalHours,
    totalCents,
    perEntity: Array.from(perEntityMap.entries()).map(([entity, v]) => ({
      entity,
      hours: v.hours,
      cents: v.cents,
    })),
  };
}

/**
 * Helper: compute the bucket month string for a given date.
 * Always YYYY-MM, UTC.
 */
export function bucketMonthFor(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}
