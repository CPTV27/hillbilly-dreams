// packages/modules/booking/src/quotes.ts
// Private-event quote-to-deposit workflow. Customer submits inquiry →
// Tracy reviews + generates quote → customer pays deposit → Booking is
// created and event scheduled.

import { prisma } from '@bigmuddy/database';
import type {
  QuoteRequest,
  CreateQuoteRequestInput,
  QuoteStatus,
  TenantId,
} from './types';

export async function list(opts?: {
  tenantId?: TenantId;
  status?: QuoteStatus;
  customerEmail?: string;
}): Promise<QuoteRequest[]> {
  return prisma.quoteRequest.findMany({
    where: {
      ...(opts?.tenantId && { tenantId: opts.tenantId }),
      ...(opts?.status && { status: opts.status }),
      ...(opts?.customerEmail && { customerEmail: opts.customerEmail }),
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function get(id: string): Promise<QuoteRequest | null> {
  return prisma.quoteRequest.findUnique({ where: { id } });
}

/** Customer submits an inquiry. Status starts at 'submitted'. */
export async function submit(
  input: CreateQuoteRequestInput
): Promise<QuoteRequest> {
  return prisma.quoteRequest.create({
    data: {
      tenantId: input.tenantId,
      brand: input.brand,
      customerEmail: input.customerEmail,
      customerName: input.customerName,
      customerPhone: input.customerPhone ?? null,
      eventType: input.eventType,
      proposedDate: input.proposedDate ?? null,
      flexibleDates: input.flexibleDates ?? false,
      guestCount: input.guestCount ?? null,
      description: input.description,
      budget: input.budget ?? null,
      status: 'submitted',
      metadata: input.metadata as never,
    },
  });
}

/** Internal: Tracy moves quote to 'reviewing'. */
export async function startReview(
  id: string,
  internalNotes?: string
): Promise<QuoteRequest> {
  return prisma.quoteRequest.update({
    where: { id },
    data: {
      status: 'reviewing',
      ...(internalNotes && { internalNotes }),
    },
  });
}

/** Tracy generates the quote. Customer-facing notes can be attached. */
export async function generateQuote(
  id: string,
  patch: {
    quoteCents: number;
    quoteValidUntil: Date;
    depositCents?: number;
    customerNotes?: string;
  }
): Promise<QuoteRequest> {
  return prisma.quoteRequest.update({
    where: { id },
    data: {
      status: 'quoted',
      quoteCents: patch.quoteCents,
      quoteValidUntil: patch.quoteValidUntil,
      depositCents: patch.depositCents ?? Math.round(patch.quoteCents * 0.4),
      customerNotes: patch.customerNotes ?? null,
    },
  });
}

/** Customer accepts quote. Status moves to deposit_pending. */
export async function acceptQuote(id: string): Promise<QuoteRequest> {
  return prisma.quoteRequest.update({
    where: { id },
    data: { status: 'deposit_pending' },
  });
}

/**
 * Deposit paid via Stripe. Caller passes the payment intent ID.
 * Status moves to 'confirmed'. Caller is responsible for creating the
 * downstream Booking via bookings.placeHold/confirm.
 */
export async function recordDepositPaid(
  id: string,
  stripePaymentIntentId: string,
  bookingId?: string
): Promise<QuoteRequest> {
  return prisma.quoteRequest.update({
    where: { id },
    data: {
      status: 'confirmed',
      depositPaidAt: new Date(),
      stripePaymentIntentId,
      bookingId: bookingId ?? null,
    },
  });
}

export async function decline(
  id: string,
  internalNotes?: string
): Promise<QuoteRequest> {
  return prisma.quoteRequest.update({
    where: { id },
    data: {
      status: 'declined',
      ...(internalNotes && { internalNotes }),
    },
  });
}

export async function abandon(id: string): Promise<QuoteRequest> {
  return prisma.quoteRequest.update({
    where: { id },
    data: { status: 'abandoned' },
  });
}
