# Phase C Block 5 — Coordination Layer Event Bus

*Plan generated 2026-04-18 by background Plan agent. To execute after Block 1 (Commerce) ships.*

## 1. Recommendation: **PgBoss on the existing Postgres** (with thin abstraction layer)

**Rationale.** Four candidates score against four constraints (in-stack, durable, multi-tenant safe, Vercel-friendly):

- **LISTEN/NOTIFY** — fails durability. A handler crash loses the event. Disqualified for at-least-once.
- **Vercel Queues** — durable and managed, but still beta as of 2026-04 with rate caps that bite under bursty webhook fan-out. Lock-in to Vercel.
- **Inngest** — excellent DX but adds a third-party SaaS, another auth surface, another bill. Multi-tenant isolation must be re-implemented at the Inngest project level.
- **PgBoss** — durable job queue built on the Postgres already running for Prisma. SKIP LOCKED guarantees at-least-once-with-once-effective semantics. Built-in retries, exponential backoff, dead-letter via `pgboss.failed_jobs`, scheduled jobs, completion archives. Zero new infra.

The thin abstraction at `packages/modules/events/` means we can swap to Inngest later if PgBoss saturates, without touching publisher/subscriber code.

## 2. Prisma schema additions

Add to `packages/database/prisma/schema.prisma` (PgBoss creates its own tables in a `pgboss` schema via `boss.start()` — these models are the **catalog/audit** layer, separate from the queue itself):

```prisma
model Event {
  id          String   @id @default(cuid())
  type        String   // "directory.entry.created"
  tenantId    String   // multi-tenant isolation key
  payload     Json
  source      String   // module that published it ("directory")
  correlationId String?
  publishedAt DateTime @default(now())
  jobId       String?  // pgboss job id (for trace)

  deliveries  EventDelivery[]

  @@index([type, tenantId, publishedAt])
  @@index([tenantId, publishedAt])
}

model EventHandler {
  id          String   @id @default(cuid())
  name        String   @unique          // "social.publishDirectoryEntry"
  eventType   String                    // "directory.entry.created"
  module      String                    // "social"
  tenantScope String   @default("own")  // "own" | "all" | comma-sep tenant ids
  enabled     Boolean  @default(true)
  maxRetries  Int      @default(5)
  timeoutMs   Int      @default(30000)
  createdAt   DateTime @default(now())

  deliveries  EventDelivery[]

  @@index([eventType, enabled])
}

model EventDelivery {
  id          String   @id @default(cuid())
  eventId     String
  handlerId   String
  status      String   // "pending" | "running" | "succeeded" | "failed" | "dead"
  attempt     Int      @default(0)
  lastError   String?
  startedAt   DateTime?
  completedAt DateTime?
  createdAt   DateTime @default(now())

  event   Event        @relation(fields: [eventId], references: [id], onDelete: Cascade)
  handler EventHandler @relation(fields: [handlerId], references: [id])

  @@index([status, createdAt])
  @@index([eventId])
}
```

## 3. Module API surface

```ts
import { events } from "@mbt/events";

// Publish
await events.publish({
  type: "directory.entry.created",
  tenantId: ctx.tenantId,
  payload: { businessId: business.id, slug: business.slug },
  source: "directory",
});

// Subscribe (registered once at module init)
events.on("directory.entry.created", {
  name: "social.publishDirectoryEntry",
  module: "social",
  tenantScope: "own",
  maxRetries: 5,
  handler: async (event, ctx) => {
    await socialPublisher.draft({
      tenantId: event.tenantId,
      businessId: event.payload.businessId,
    });
  },
});
```

Handler functions are **idempotent by contract** — at-least-once delivery means handlers will occasionally see the same event twice.

## 4. Files to create under `packages/modules/events/`

```
packages/modules/events/
├── package.json                  # name: "@mbt/events", deps: pg-boss, @mbt/database
├── src/
│   ├── index.ts                  # public API: events.publish(), events.on(), events.start()
│   ├── bus.ts                    # PgBoss singleton, lazy init, connection from DATABASE_URL
│   ├── publish.ts                # publish() — writes Event row + enqueues PgBoss job per handler
│   ├── register.ts               # on() — registers handler in EventHandler table + in-memory router
│   ├── dispatcher.ts             # PgBoss worker: looks up handler, invokes, writes EventDelivery
│   ├── isolation.ts              # tenantScope check (handler tenant vs event tenant)
│   ├── types.ts                  # EventType union, EventPayloadMap, HandlerContext
│   └── handlers-registry.ts      # in-process map of handlerName -> fn (rebuilt per cold start)
└── README.md
```

Plus one Vercel Function entry point at `apps/web/app/api/events/worker/route.ts` — invoked by Vercel Cron every 30s — that calls `events.processBatch()` to drain pending PgBoss jobs.

## 5. End-to-end example: "directory entry created"

1. Admin user submits a new business at `bigmuddyinn.com/admin/directory/restaurants`.
2. Route handler resolves `tenantId` from middleware-set header (`x-mbt-tenant`), creates `DirectoryBusiness` row in Prisma.
3. Same request calls `events.publish({ type: "directory.entry.created", tenantId, payload: { businessId } })`. This wraps INSERT into `Event` table + enqueue PgBoss jobs per matching handler.
4. PgBoss worker picks up jobs via SKIP LOCKED. Three handlers fire in parallel:
   - `social.publishDirectoryEntry` → queues a Postiz draft.
   - `magazine.addToOutline` → upserts a row in Sanity's `magazineOutline` doc.
   - `email.notifyTracy` → Resend API send to tracy@bigmuddyinn.com.
5. Each handler completion updates `EventDelivery` (status, completedAt). Failures bump `attempt`, exponential backoff up to `maxRetries`, then `status=dead` and surfaced in `/admin/events/dead-letter`.

## 6. Multi-tenant isolation strategy

- **Every event carries `tenantId`** — required field, validated at publish time against `apps/web/config/tenants.ts` keys.
- **`EventHandler.tenantScope`** has three modes:
  - `"own"` (default) — handler only fires when `event.tenantId` matches the registered tenant.
  - `"all"` — explicit opt-in for cross-tenant handlers (MBT analytics, OE aggregation).
  - `"tenant_a,tenant_b"` — explicit allowlist for federation (Inn → Magazine cross-promotion).
- **Dispatcher enforcement** — `dispatcher.ts` calls `isolation.canDeliver(event, handler)` before invoking; mismatches write a `EventDelivery` row with status=blocked for audit.
- **Handler context** — handlers receive a `HandlerContext` with a tenant-scoped Prisma client (`db.forTenant(event.tenantId)`).
- **Audit query** — `SELECT * FROM EventDelivery WHERE event.tenantId != handler.registeredTenant AND status != 'blocked'` should return zero rows in normal operation.

## 7. Migration sequence (do not break Sanity webhook)

1. **PR 1 (additive only).** Add Prisma models. `prisma migrate deploy`. No code references yet.
2. **PR 2.** Add `packages/modules/events/` package, install `pg-boss`. Wire `events.start()` into `apps/web/instrumentation.ts`. Verify PgBoss schema appears in Postgres.
3. **PR 3.** Register first handler: a no-op `events.echo` that logs to console. Add a debug publish endpoint at `/api/events/debug` (admin-gated). Smoke test in preview.
4. **PR 4.** Refactor Sanity webhook to **dual-publish**: keep the existing `revalidatePath()` calls AND emit a new `cms.document.updated` event. Webhook contract unchanged for Sanity; downstream consumers can migrate at their pace.
5. **PR 5.** Add admin UI at `/admin/events/` — list of recent events, per-handler delivery status, dead-letter replay button.
6. **PR 6.** Migrate the directory submit flow as the first real producer. Other modules opt in over the following weeks.

Rollback at any step: handlers can be `enabled=false`'d via DB without code deploy.

## 8. Verification in prod

- **Smoke test cron** at `/api/cron/events-smoke-test` (every 15 min): publishes a synthetic `system.heartbeat` event with a unique correlationId, then queries `EventDelivery` 30s later. Alerts to Tracy + Chase on failure.
- **Dead-letter alarm** — Vercel Cron Job hourly: count dead deliveries in last hour. If > 0, send to email + Slack.
- **Tenant-isolation invariant query** — daily cron asserting zero cross-tenant deliveries that weren't explicitly scoped.
- **Per-event-type SLO dashboard** at `/admin/events/health`: p50/p95 dispatch latency, success rate, retry rate, per type and per tenant.
- **End-to-end integration test in preview** — Playwright spec creates a directory entry and asserts within 60s: a Postiz draft exists, a Sanity outline mutation occurred, a Resend send-id was logged. Block prod deploys on this passing.
- **PgBoss native metrics** at `/api/admin/queue-stats` — pending/active/failed counts per queue.

---

## Critical Files for Implementation

- /Users/chasethis/hillbilly-dreams/packages/database/prisma/schema.prisma
- /Users/chasethis/hillbilly-dreams/apps/web/app/api/webhooks/sanity/route.ts
- /Users/chasethis/hillbilly-dreams/apps/web/app/api/directory/submit/route.ts
- /Users/chasethis/hillbilly-dreams/apps/web/instrumentation.ts
- /Users/chasethis/hillbilly-dreams/apps/web/config/tenants.ts
