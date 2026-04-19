// packages/modules/booking/src/types.ts
import type {
  Resource as PrismaResource,
  Booking as PrismaBooking,
  Ticket as PrismaTicket,
  QuoteRequest as PrismaQuoteRequest,
} from '@prisma/client';

export type Resource = PrismaResource;
export type Booking = PrismaBooking;
export type Ticket = PrismaTicket;
export type QuoteRequest = PrismaQuoteRequest;

export type ResourceType = 'blues_room_ticket' | 'service_slot' | 'event_rental';

export type BookingStatus =
  | 'held'
  | 'confirmed'
  | 'checked_in'
  | 'no_show'
  | 'cancelled';

export type TicketStatus = 'active' | 'used' | 'refunded' | 'void';

export type QuoteStatus =
  | 'submitted'
  | 'reviewing'
  | 'quoted'
  | 'deposit_pending'
  | 'confirmed'
  | 'declined'
  | 'abandoned';

export type EventType =
  | 'wedding'
  | 'retreat'
  | 'dinner'
  | 'corporate'
  | 'other';

export type TenantId =
  | 'big-muddy'
  | 'tuthill'
  | 'studio-c'
  | 'dctv'
  | 'bearsville';

export type BrandId =
  | 'inn'
  | 'magazine'
  | 'touring'
  | 'records'
  | 'radio'
  | 'cpp'
  | 'tuthill'
  | 'studio-c'
  | 'dctv'
  | 'bearsville';

export interface CreateResourceInput {
  tenantId: TenantId;
  brand: BrandId;
  type: ResourceType;
  name: string;
  description?: string;
  startsAt?: Date;
  endsAt?: Date;
  totalCapacity: number;
  priceCents: number;
  currency?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateBookingInput {
  tenantId: TenantId;
  resourceId: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  quantity?: number;
  totalCents: number;
  depositCents?: number;
  heldUntil?: Date;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateTicketInput {
  resourceId: string;
  bookingId?: string;
  customerEmail: string;
  customerName?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateQuoteRequestInput {
  tenantId: TenantId;
  brand: BrandId;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  eventType: EventType;
  proposedDate?: Date;
  flexibleDates?: boolean;
  guestCount?: number;
  description: string;
  budget?: string;
  metadata?: Record<string, unknown>;
}
