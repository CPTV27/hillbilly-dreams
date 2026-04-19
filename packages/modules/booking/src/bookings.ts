// packages/modules/booking/src/bookings.ts
// Booking = confirmed seat/slot. For tickets, see ./tickets.ts.

import { prisma } from '@bigmuddy/database';
import type {
  Booking,
  CreateBookingInput,
  BookingStatus,
  TenantId,
} from './types';
import * as resources from './resources';

export async function list(opts?: {
  tenantId?: TenantId;
  status?: BookingStatus;
  customerEmail?: string;
  resourceId?: string;
}): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      ...(opts?.tenantId && { tenantId: opts.tenantId }),
      ...(opts?.status && { status: opts.status }),
      ...(opts?.customerEmail && { customerEmail: opts.customerEmail }),
      ...(opts?.resourceId && { resourceId: opts.resourceId }),
    },
    include: { resource: true },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Fetch a booking by id.
 *
 * Pass `tenantId` from API handlers where `id` comes from untrusted input.
 * Returns `null` when the booking belongs to a different tenant, closing
 * the IDOR gap where a guessed id could reveal or mutate another tenant's
 * reservation.
 */
export async function get(
  id: string,
  tenantId?: TenantId
): Promise<Booking | null> {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { resource: true },
  });
  if (!booking) return null;
  if (tenantId && booking.tenantId !== tenantId) return null;
  return booking;
}

/**
 * Place a hold on a resource. Hold expires at heldUntil if not confirmed.
 * Returns null if the resource doesn't have capacity.
 */
export async function placeHold(
  input: CreateBookingInput & { heldUntil: Date }
): Promise<Booking | null> {
  const reserved = await resources.reserve(
    input.resourceId,
    input.quantity ?? 1
  );
  if (!reserved) return null;

  return prisma.booking.create({
    data: {
      tenantId: input.tenantId,
      resourceId: input.resourceId,
      customerEmail: input.customerEmail,
      customerName: input.customerName ?? null,
      customerPhone: input.customerPhone ?? null,
      status: 'held',
      quantity: input.quantity ?? 1,
      totalCents: input.totalCents,
      depositCents: input.depositCents ?? 0,
      heldUntil: input.heldUntil,
      notes: input.notes ?? null,
      metadata: input.metadata as never,
    },
  });
}

export async function confirm(id: string): Promise<Booking> {
  return prisma.booking.update({
    where: { id },
    data: {
      status: 'confirmed',
      confirmedAt: new Date(),
      heldUntil: null,
    },
  });
}

export async function checkIn(id: string): Promise<Booking> {
  return prisma.booking.update({
    where: { id },
    data: { status: 'checked_in' },
  });
}

export async function markNoShow(id: string): Promise<Booking> {
  return prisma.booking.update({ where: { id }, data: { status: 'no_show' } });
}

export async function cancel(id: string): Promise<Booking> {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new Error(`Booking not found: ${id}`);
  // Release the hold on the resource.
  await resources.release(booking.resourceId, booking.quantity);
  return prisma.booking.update({
    where: { id },
    data: { status: 'cancelled', cancelledAt: new Date() },
  });
}

/**
 * Sweep expired holds — for use by a cron. Cancels any held bookings
 * past their heldUntil deadline and releases their reserved capacity.
 */
export async function expireOldHolds(): Promise<{ cancelled: number }> {
  const expired = await prisma.booking.findMany({
    where: { status: 'held', heldUntil: { lt: new Date() } },
  });
  for (const b of expired) {
    await resources.release(b.resourceId, b.quantity);
    await prisma.booking.update({
      where: { id: b.id },
      data: { status: 'cancelled', cancelledAt: new Date() },
    });
  }
  return { cancelled: expired.length };
}

export async function attachStripeCheckout(
  id: string,
  stripeCheckoutId: string
): Promise<Booking> {
  return prisma.booking.update({
    where: { id },
    data: { stripeCheckoutId },
  });
}
