// packages/modules/events/src/pgboss-adapter.ts
// Optional PgBoss-backed dispatcher. Off by default — current dispatcher.ts
// uses a simple Postgres SELECT/UPDATE pattern (adequate for our throughput).
// Flip USE_PGBOSS=1 + run boss.start() once to enable durable queue semantics
// (SKIP LOCKED, exponential backoff, dead-letter via pgboss.failed_jobs).
//
// To activate:
//   1. Add `boss = await getBoss()` to apps/web/instrumentation.ts
//   2. Replace publish.ts internals to call boss.send() instead of inserting
//      EventDelivery rows directly (or run both — PgBoss for queueing,
//      EventDelivery for audit log)
//   3. In a worker route, call boss.work('event-dispatch', handler)
//   4. Run pg-boss schema bootstrap: boss.start() once

import type PgBoss from 'pg-boss';

let bossInstance: PgBoss | null = null;

export async function getBoss(): Promise<PgBoss> {
  if (bossInstance) return bossInstance;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');

  // Dynamic import keeps pg-boss out of the cold-start path when USE_PGBOSS=0
  const pgBossModule = (await import('pg-boss')) as unknown as {
    default: new (opts: { connectionString: string }) => PgBoss;
  };
  const Boss = pgBossModule.default;
  bossInstance = new Boss({ connectionString: url });
  await bossInstance.start();
  return bossInstance;
}

/**
 * Enqueue an event-dispatch job. Caller persists EventDelivery row first
 * (for audit), then enqueues here for actual processing.
 */
export async function enqueueDelivery(deliveryId: string): Promise<string | null> {
  const boss = await getBoss();
  return boss.send('event-dispatch', { deliveryId }, {
    retryLimit: 5,
    retryBackoff: true,
    expireInSeconds: 300,
  });
}

/**
 * Worker setup. Call once on app startup (in instrumentation.ts) when
 * USE_PGBOSS=1.
 */
export async function startWorker(
  handle: (deliveryId: string) => Promise<void>
): Promise<void> {
  const boss = await getBoss();
  await boss.work('event-dispatch', { batchSize: 10 }, async (job) => {
    const payload = (job as unknown as { data: { deliveryId: string } }).data;
    await handle(payload.deliveryId);
  });
}

export async function stopBoss(): Promise<void> {
  if (bossInstance) {
    await bossInstance.stop();
    bossInstance = null;
  }
}
