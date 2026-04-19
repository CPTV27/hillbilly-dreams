// packages/modules/events/src/types.ts
import type {
  BusEvent as PrismaBusEvent,
  EventHandler as PrismaEventHandler,
  EventDelivery as PrismaEventDelivery,
} from '@prisma/client';

export type BusEvent = PrismaBusEvent;
export type EventHandler = PrismaEventHandler;
export type EventDelivery = PrismaEventDelivery;

export type DeliveryStatus =
  | 'pending'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'dead'
  | 'blocked';

export type TenantScope = 'own' | 'all' | string; // string = comma-sep tenant ids

/**
 * Standard event types — extend as modules add new ones. Keep stringly-typed
 * for forward compatibility (modules can publish event types not yet known
 * to the central catalog).
 */
export type EventType =
  | 'directory.entry.created'
  | 'directory.entry.updated'
  | 'subscription.activated'
  | 'subscription.canceled'
  | 'subscription.past_due'
  | 'order.paid'
  | 'order.fulfilled'
  | 'booking.confirmed'
  | 'booking.cancelled'
  | 'ticket.scanned'
  | 'quote.submitted'
  | 'quote.accepted'
  | 'cms.document.updated'
  | 'broadcast.scheduled'
  | 'broadcast.ended'
  | 'clip.enriched'
  | 'system.heartbeat'
  | string;

export interface PublishInput {
  type: EventType;
  tenantId: string;
  payload: Record<string, unknown>;
  source: string;
  correlationId?: string;
}

export interface RegisterInput {
  name: string;
  eventType: EventType;
  module: string;
  tenantScope?: TenantScope;
  enabled?: boolean;
  maxRetries?: number;
  timeoutMs?: number;
  handler: HandlerFn;
}

export type HandlerFn = (
  event: BusEvent,
  ctx: HandlerContext
) => Promise<void>;

export interface HandlerContext {
  /** Delivery row id for this attempt — useful for logging. */
  deliveryId: string;
  /** Attempt number (1-indexed). */
  attempt: number;
}
