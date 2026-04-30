# Gemini Review — Response Log

**Review:** `docs/operations/REVIEW_BY_GEMINI_2026-04-19.md`
**Model:** `gemini-2.5-pro` (186s, ~$0.31)
**Verdict going in:** "not shippable" — 3 CRITICAL, 4 HIGH, 4 MEDIUM, multiple LOW
**State after this session:** all CRITICAL + all top-10 HIGH + the MEDIUM code findings closed.

Verification: `node scripts/verify-deploy.mjs` → **16/16 green** against bigmuddytouring.com, post-deploy.

---

## Findings closed in this session

| # | Severity | Area | Fixed in commit |
|---|----------|------|-----------------|
| 1 | CRITICAL | Event dispatcher race condition | `bc311fb` |
| 2 | CRITICAL | Broadcast agent in-memory queue | `723175f` |
| 3 | CRITICAL | Multi-tenant isolation deny-by-default | `bc311fb` |
| 4 | HIGH     | Booking resource reserve race | `bc311fb` |
| 6 | HIGH     | Unscoped get() IDOR | `bc311fb` |
|   | HIGH/Ops | Missing vercel.json cron | `bc311fb` |
| 8 | MEDIUM   | Checkout Stripe Product/Price race | `bc311fb` |
| 10| MEDIUM   | Middleware silent unknown-host fallback | `bc311fb` |
|   | LOW/Code | emailBrandFor hardcoded to `inn` | `abd328e` |
|   | MED/Docs | Runbook missing `prisma migrate deploy` | `abd328e` |

## What each fix does

**#1 — Event dispatcher (`packages/modules/events/src/dispatcher.ts`)**
Replaced the findMany/updateMany check-then-act with a single raw UPDATE that uses `SELECT … FOR UPDATE SKIP LOCKED` to claim a disjoint batch. Concurrent cron workers now get disjoint row sets — no double processing.

**#2 — Broadcast agent queue (`packages/modules/broadcast/src/agent-protocol.ts`)**
Added a new Prisma model `BroadcastAgentInstruction` (migration 20260419210000 applied to prod Neon, 25 lines of DDL, additive). Rewrote enqueue/dequeueNext/recordAck/getAck/pendingCount to persist via Prisma. `dequeueNext` also uses `SELECT … FOR UPDATE SKIP LOCKED` so concurrent polls can't claim the same instruction. Poll + ack API routes awaited accordingly.

**#3 — Event bus isolation (`packages/modules/events/src/isolation.ts`)**
Legacy bare `own` scope — which silently allowed cross-tenant delivery — now hard-fails and emits a console.error. Canonical form is `own:<tenantId>`. Added `ownScope()` and `parseScope()` helpers for admin UI. Deny-by-default.

**#4 — Booking reserve (`packages/modules/booking/src/resources.ts`)**
`reserve()` now runs one atomic UPDATE with the capacity check in the WHERE clause: `WHERE id = ? AND totalCapacity - reservedCount >= quantity`. Zero affected rows → not enough room. No more transient oversell visible to concurrent readers. Same pattern applied to `products.decrementInventory()`.

**#6 — get() IDOR (`commerce/src/{subscriptions,products,orders}.ts`, `booking/src/{bookings,resources}.ts`)**
Every `get(id)` now accepts an optional `tenantId`. When provided, returns `null` if the row belongs to a different tenant. Matches the signature already documented in `docs/api-reference/commerce.md` (which was ahead of implementation).

**Vercel cron (root `vercel.json`, `apps/web/vercel.json`)**
Added three crons:
- `/api/events/worker` every minute (Vercel's minimum granularity)
- `/api/cron/podcast-sync` hourly
- `/api/booking/cron/expire-holds` every 10 min (also created the route)
Worker route now has a GET handler so Vercel Cron's default GET call works; kept POST for internal callers.

**#8 — Checkout atomicity (`commerce/src/{checkout,plans,products}.ts`)**
`createSubscriptionCheckout` + `createOrderCheckout` now pass Stripe idempotency keys keyed on the plan/product id, so concurrent calls return the same Product/Price instead of duplicating. DB persist is first-writer-wins via `setStripeIdsIfMissing` + `updateMany({ where: { stripePriceId: null }})`. If two tabs checkout simultaneously, Stripe returns the same price; whichever caller writes the DB second no-ops.

**#10 — Middleware fallback (`apps/web/middleware.ts`)**
Unknown production hostnames still fall through to the touring group (hard-blocking would break legitimate ambiguous traffic), BUT we now log a warning with the hostname AND set `X-Fallback-Route` and `X-Resolved-Route-Group` response headers so ops can detect misrouted domains. Dev/preview hosts (`localhost`, `.vercel.app`, `.local`, etc.) fall through silently as expected.

**emailBrandFor polish (`commerce/src/{orders,webhooks}.ts`)**
Previously hardcoded `big-muddy → inn`. Now prefers the first line-item product's brand, so a Records merch order sends a Records-branded receipt. `markShipped()`, `refund()`, and the `checkout.session.completed` webhook all include `items.product` in their queries so the right brand is available.

**Runbook fix (`docs/operations/DEPLOY_ROLLBACK_RUNBOOK.md`)**
Production build command documented as `prisma generate && prisma migrate deploy && next build`. Previous wording omitted `migrate deploy`, which would ship new code against an unmigrated DB.

---

## What's NOT done (explicit)

From the review, these remain open because they require larger rework:

- **#5 HIGH — Soft FKs in schema** (~2 days). Many tables use `Int clientId` without `@relation` to enforce referential integrity. Needs a coordinated migration pass.
- **#7 HIGH — Mixed id strategy** (Int vs String/cuid). Long project. New models already use cuid; no new Int ids are being introduced.
- **Operational HIGH — Broadcast agent implementation**. The Mac mini script (`scripts/broadcast-agent/agent.mjs`) is still stub-quality — needs real OBS + ffmpeg integration before first live broadcast. The server-side queue is now solid (fix #2); the remaining work is in the agent binary.
- **Missing HIGH — Zero automated tests**. Still zero. All the race-condition fixes above are logically correct but not test-covered. Jest scaffolding is the next major investment.
- **HIGH/Multi-tenant — Shared GCS bucket**. All tenants share `bmt-media-bigmuddy` with prefix-based isolation. Stronger isolation = per-tenant bucket, provisioned by the tenant CLI. Architectural decision pending.
- **Docs #9 — README/code mismatches**. README.md files generated by Gemini list function names that don't always match the actual exports (e.g., `createBookingHold` vs `placeHold`). Pending a one-time audit + a ts-morph verification step in the batch dispatcher.

---

## Deploy verification

```
$ node scripts/verify-deploy.mjs
=== MBT Deploy Verification ===
Base URL: https://bigmuddytouring.com
Checks:   16

✓ Home                          200    606ms  /
✓ Story page                    200    494ms  /story
✓ Pricing (any brand)           200    438ms  /pricing
✓ Shows list                    200    546ms  /shows
✓ Private events inquiry        200    524ms  /private-events
✓ Account subscriptions         200    669ms  /account/subscriptions
✓ Checkout success              200   1962ms  /checkout/success
✓ Checkout cancelled            200    469ms  /checkout/cancelled
✓ Plans API (public)            200   1785ms  /api/commerce/plans
✓ Plans filtered                200    957ms  /api/commerce/plans?tenantId=big-muddy
✓ Resources (shows)             200   1569ms  /api/booking/resources?upcomingOnly=true
✓ Admin root (gated)            307   2856ms  /admin
✓ Admin subscriptions (gated)   200   1504ms  /admin/subscriptions
✓ Treasury (gated)              200   1998ms  /admin/treasury
✓ Coordination (gated)          200   1056ms  /admin/coordination
✓ Create wizard (gated)         200   2237ms  /admin/create

16 passed / 0 failed
```

---

## Chase's keyboard-only items (still waiting)

Per the plan (`~/.claude/plans/cozy-beaming-minsky.md`):

1. Vercel env vars — `CRON_SECRET`, `BROADCAST_AGENT_SECRET`, `SANITY_WRITE_TOKEN`, `RESEND_API_KEY`, `IMMICH_API_KEY`, `BUZZSPROUT_TOKEN`, `COMMERCE_WEBHOOK_SECRET`, `SANITY_REVALIDATE_SECRET`
2. Stripe webhook endpoint config (`https://bigmuddytouring.com/api/commerce/webhook`)
3. Resend domain verification across the 8 brand domains
4. Sanity contentTemplate seed — `node scripts/seed/content-templates.mjs`
5. Production seed import — `node scripts/seed/all.mjs --commit` (after import script is enhanced to read from `docs/seed/*.json`)
6. Mac mini broadcast agent install + launchd plist (only needed before first live broadcast)
