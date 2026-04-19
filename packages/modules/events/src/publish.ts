// packages/modules/events/src/publish.ts
// publish() — writes a BusEvent row + creates EventDelivery rows for each
// matching enabled handler (filtered by tenantScope). The actual handler
// invocation happens via the dispatcher (cron or inline-on-publish).

import { prisma } from '@bigmuddy/database';
import type { PublishInput, BusEvent } from './types';
import { isAllowedDelivery } from './isolation';

export async function publish(input: PublishInput): Promise<BusEvent> {
  const event = await prisma.busEvent.create({
    data: {
      type: input.type,
      tenantId: input.tenantId,
      payload: input.payload as never,
      source: input.source,
      correlationId: input.correlationId ?? null,
    },
  });

  // Find every enabled handler registered for this event type.
  const handlers = await prisma.eventHandler.findMany({
    where: { eventType: input.type, enabled: true },
  });

  // Create EventDelivery rows for every handler whose tenantScope allows this event.
  await prisma.$transaction(
    handlers
      .filter((h) => isAllowedDelivery(h.tenantScope, input.tenantId))
      .map((h) =>
        prisma.eventDelivery.create({
          data: {
            eventId: event.id,
            handlerId: h.id,
            status: 'pending',
            attempt: 0,
          },
        })
      )
  );

  return event;
}
