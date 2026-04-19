// packages/modules/booking/src/tickets.ts
// Ticket = single Blues Room admission. Emitted with a unique QR code
// (scanned at door for validation). Multiple tickets attach to one booking
// for group purchases.

import { randomBytes } from 'node:crypto';
import { prisma } from '@bigmuddy/database';
import type { Ticket, CreateTicketInput, TicketStatus } from './types';

/** Generate a 16-byte random ticket code, base64url-encoded. */
function generateTicketCode(): string {
  return randomBytes(16).toString('base64url');
}

export async function list(opts?: {
  resourceId?: string;
  status?: TicketStatus;
  customerEmail?: string;
}): Promise<Ticket[]> {
  return prisma.ticket.findMany({
    where: {
      ...(opts?.resourceId && { resourceId: opts.resourceId }),
      ...(opts?.status && { status: opts.status }),
      ...(opts?.customerEmail && { customerEmail: opts.customerEmail }),
    },
    include: { resource: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function get(id: string): Promise<Ticket | null> {
  return prisma.ticket.findUnique({
    where: { id },
    include: { resource: true },
  });
}

export async function getByCode(ticketCode: string): Promise<Ticket | null> {
  return prisma.ticket.findUnique({
    where: { ticketCode },
    include: { resource: true },
  });
}

export async function create(input: CreateTicketInput): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      resourceId: input.resourceId,
      bookingId: input.bookingId ?? null,
      ticketCode: generateTicketCode(),
      customerEmail: input.customerEmail,
      customerName: input.customerName ?? null,
      status: 'active',
      metadata: input.metadata as never,
    },
  });
}

/** Issue N tickets for one booking. Each gets its own code. */
export async function issueBatch(
  resourceId: string,
  bookingId: string,
  quantity: number,
  customerEmail: string,
  customerName?: string
): Promise<Ticket[]> {
  const created: Ticket[] = [];
  for (let i = 0; i < quantity; i++) {
    created.push(
      await create({
        resourceId,
        bookingId,
        customerEmail,
        customerName,
      })
    );
  }
  return created;
}

/**
 * Validate a ticket at the door. Returns the ticket if valid, throws
 * with a useful message otherwise. Marks the ticket as used.
 */
export async function scan(
  ticketCode: string,
  scannedBy?: string
): Promise<Ticket> {
  const ticket = await getByCode(ticketCode);
  if (!ticket) throw new Error('Ticket not found');
  if (ticket.status === 'used') {
    throw new Error(
      `Ticket already scanned at ${ticket.scannedAt?.toISOString()}`
    );
  }
  if (ticket.status === 'refunded') throw new Error('Ticket has been refunded');
  if (ticket.status === 'void') throw new Error('Ticket is void');
  return prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      status: 'used',
      scannedAt: new Date(),
      scannedBy: scannedBy ?? null,
    },
  });
}

export async function refund(id: string): Promise<Ticket> {
  return prisma.ticket.update({
    where: { id },
    data: { status: 'refunded' },
  });
}

export async function voidTicket(id: string): Promise<Ticket> {
  return prisma.ticket.update({ where: { id }, data: { status: 'void' } });
}
