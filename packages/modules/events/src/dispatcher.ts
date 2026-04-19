// packages/modules/events/src/dispatcher.ts
// processBatch() — run by a cron route every 30s. Atomically claims pending
// EventDelivery rows via SELECT ... FOR UPDATE SKIP LOCKED (Postgres primitive),
// invokes the registered handler, records success/failure.
//
// At-least-once delivery. The claim SQL is the ONLY safe way to guarantee
// two concurrent workers don't both process the same delivery. Handlers are
// idempotent-by-contract — if a handler sees the same event twice (e.g.,
// after a worker crash before completedAt is written), it must produce the
// same outcome as a single invocation.

import { prisma } from '@bigmuddy/database';
import { getHandler } from './bus';

const BATCH_SIZE = 50;
const DEFAULT_TIMEOUT_MS = 30000;

interface ProcessResult {
  picked: number;
  succeeded: number;
  failed: number;
  dead: number;
  skipped: number;
}

interface ClaimedDelivery {
  id: string;
  attempt: number;
  eventId: string;
  handlerId: string;
}

/**
 * Atomically claim up to BATCH_SIZE pending EventDelivery rows using
 * SELECT ... FOR UPDATE SKIP LOCKED. Each row is locked to this transaction;
 * concurrent workers SKIP these rows and pick different ones. The UPDATE
 * transitions claimed rows to status='running' + bumps attempt + sets
 * startedAt.
 *
 * Returns the set of deliveries this worker now owns.
 */
async function claimPending(): Promise<ClaimedDelivery[]> {
  // Postgres raw SQL — Prisma's $queryRaw respects the same transaction as
  // the enclosing scope. The RETURNING clause gives us the claimed rows.
  const rows = await prisma.$queryRaw<ClaimedDelivery[]>`
    UPDATE "EventDelivery"
    SET
      status = 'running',
      "startedAt" = NOW(),
      attempt = attempt + 1
    WHERE id IN (
      SELECT id FROM "EventDelivery"
      WHERE status = 'pending'
      ORDER BY "createdAt" ASC
      LIMIT ${BATCH_SIZE}
      FOR UPDATE SKIP LOCKED
    )
    RETURNING id, attempt, "eventId" AS "eventId", "handlerId" AS "handlerId"
  `;
  return rows;
}

export async function processBatch(): Promise<ProcessResult> {
  const result: ProcessResult = {
    picked: 0,
    succeeded: 0,
    failed: 0,
    dead: 0,
    skipped: 0,
  };

  const claimed = await claimPending();
  result.picked = claimed.length;

  if (claimed.length === 0) return result;

  // Fetch event + handler details for the claimed deliveries.
  // Could be one query but simpler to fetch each — tiny batch.
  for (const delivery of claimed) {
    const [event, handler] = await Promise.all([
      prisma.busEvent.findUnique({ where: { id: delivery.eventId } }),
      prisma.eventHandler.findUnique({ where: { id: delivery.handlerId } }),
    ]);

    if (!event || !handler) {
      // Delivery references a missing event or handler — mark dead.
      await prisma.eventDelivery.update({
        where: { id: delivery.id },
        data: {
          status: 'dead',
          lastError: !event ? 'Event row missing' : 'Handler row missing',
          completedAt: new Date(),
        },
      });
      result.dead++;
      continue;
    }

    const handlerFn = getHandler(handler.name);
    if (!handlerFn) {
      // Handler not registered in this process — roll back to pending so
      // another worker (with that handler registered) can pick it up.
      // BUT track via a 'blocked' status with lastError so admin can see it.
      await prisma.eventDelivery.update({
        where: { id: delivery.id },
        data: {
          status: 'blocked',
          lastError: `Handler "${handler.name}" not registered in this process`,
          completedAt: new Date(),
        },
      });
      result.skipped++;
      continue;
    }

    // Invoke with timeout
    const timeoutMs = handler.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    let success = false;
    let error: string | null = null;
    try {
      await Promise.race([
        handlerFn(event, {
          deliveryId: delivery.id,
          attempt: delivery.attempt,
        }),
        new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error(`Handler timeout (${timeoutMs}ms)`)), timeoutMs)
        ),
      ]);
      success = true;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }

    if (success) {
      await prisma.eventDelivery.update({
        where: { id: delivery.id },
        data: { status: 'succeeded', completedAt: new Date() },
      });
      result.succeeded++;
    } else {
      const isDead = delivery.attempt >= handler.maxRetries;
      await prisma.eventDelivery.update({
        where: { id: delivery.id },
        data: {
          status: isDead ? 'dead' : 'pending', // requeue if we have retries left
          lastError: error,
          completedAt: isDead ? new Date() : null,
          startedAt: isDead ? undefined : null, // reset startedAt on requeue
        },
      });
      if (isDead) {
        result.dead++;
      } else {
        result.failed++;
      }
    }
  }

  return result;
}

/**
 * Replay a dead-letter delivery. Resets it to pending with attempt=0 so the
 * next dispatcher pass picks it up.
 */
export async function replayDeadLetter(deliveryId: string): Promise<void> {
  await prisma.eventDelivery.update({
    where: { id: deliveryId },
    data: {
      status: 'pending',
      attempt: 0,
      lastError: null,
      startedAt: null,
      completedAt: null,
    },
  });
}
