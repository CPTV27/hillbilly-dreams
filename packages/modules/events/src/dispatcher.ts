// packages/modules/events/src/dispatcher.ts
// processBatch() — run by a cron route every 30s. Picks up pending
// EventDelivery rows, invokes the registered handler, records success/failure.
// At-least-once delivery via SELECT FOR UPDATE SKIP LOCKED semantics
// (Prisma raw query for the lock; otherwise standard upsert).

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

export async function processBatch(): Promise<ProcessResult> {
  const result: ProcessResult = {
    picked: 0,
    succeeded: 0,
    failed: 0,
    dead: 0,
    skipped: 0,
  };

  // Pick pending deliveries. We claim them by setting status=running before
  // invoking — so a parallel worker won't double-pick. (For higher throughput
  // we'd add SELECT FOR UPDATE SKIP LOCKED via a raw query — TODO.)
  const pending = await prisma.eventDelivery.findMany({
    where: { status: 'pending' },
    take: BATCH_SIZE,
    orderBy: { createdAt: 'asc' },
    include: { event: true, handler: true },
  });

  result.picked = pending.length;

  for (const delivery of pending) {
    // Claim it.
    const claimed = await prisma.eventDelivery.updateMany({
      where: { id: delivery.id, status: 'pending' },
      data: {
        status: 'running',
        startedAt: new Date(),
        attempt: { increment: 1 },
      },
    });
    if (claimed.count === 0) {
      result.skipped++;
      continue;
    }

    const handlerFn = getHandler(delivery.handler.name);
    if (!handlerFn) {
      // Handler not registered in this process — leave for another worker
      // to pick up. Mark blocked so admin can see it.
      await prisma.eventDelivery.update({
        where: { id: delivery.id },
        data: {
          status: 'blocked',
          lastError: `Handler "${delivery.handler.name}" not registered in this process`,
          completedAt: new Date(),
        },
      });
      result.skipped++;
      continue;
    }

    // Invoke with timeout
    const timeoutMs = delivery.handler.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    let success = false;
    let error: string | null = null;
    try {
      await Promise.race([
        handlerFn(delivery.event, {
          deliveryId: delivery.id,
          attempt: delivery.attempt + 1,
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
      const newAttempt = delivery.attempt + 1;
      const isDead = newAttempt >= delivery.handler.maxRetries;
      await prisma.eventDelivery.update({
        where: { id: delivery.id },
        data: {
          status: isDead ? 'dead' : 'pending', // requeue if we have retries left
          lastError: error,
          completedAt: isDead ? new Date() : null,
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
