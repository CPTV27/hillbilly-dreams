# Studio C Production Ops Module

**Phase:** 1 — Schema + Architecture Draft
**Status:** Draft, not merged. Awaiting Chase review.
**Branch:** `feat/studio-c-production-ops`
**Synthesis doc:** `docs/studio-c/workflow-synthesis-2026-05-01.md`

---

## What this is

The data model and state machine for Studio C's production operations. Every downstream automation (ingest, approval, QC, distribution, archive) hangs off these primitives.

**Phase 1 = schema + state machine + docs only.** No UI, no automations, no external service integrations. Get the data model right first.

---

## Module location (deviation from handoff doc)

The handoff doc proposed `apps/studio-c/...`. After investigating the monorepo, this module is currently scoped as a **module within the existing `apps/web` Next.js app** rather than a separate app:

- Sanity schemas: `apps/web/sanity/schemas/studio-c/`
- TypeScript logic: `apps/web/lib/studio-c/`
- Prisma additions: `packages/database/prisma/schema.prisma` (extended in place)

Rationale: the existing apps directory has `web` as the main Next.js app plus three small ones (`books`, `demo`, `manual`). Sanity schemas live under `apps/web/sanity/schemas/`, not in a sibling app. Splitting Studio C into its own app would require setting up a parallel Next.js project, separate Prisma client wiring, and separate Sanity studio config — that's a larger architectural decision than Phase 1 calls for.

If we eventually decide to spin Studio C out into its own app/repo (e.g., when the NY corp is filed and operational independence matters), this module is structured to be portable: the state machine has zero external dependencies, the Prisma models are namespaced, and the Sanity schemas are isolated under `studio-c/`.

**Open question for Chase:** keep here, or split into a sibling app? Phase 1 stays here regardless; the question affects Phase 2+.

---

## Storage split (the rule)

- **Sanity** = canonical content humans edit through a CMS (brands, brand kits, shows, episode plans, sponsor reads).
- **Postgres (Prisma)** = operational state with state machines and frequent querying by status/date (jobs, ingest records, approvals, version history, QC, rights, retention, deliverables).

Rule of thumb: if it has a state machine or needs frequent querying by status/date, it goes in Postgres. If it's structured content humans edit, it goes in Sanity.

Some entities live in **both** (e.g., `Brand`, `BrandKit`, `StudioShow`, `StudioEpisode`) — the human-edited content fields in Sanity, the relational/state fields in Postgres. The Prisma `BrandKit` row carries a `sanityDocId` reference back to the Sanity document.

---

## Files added/modified in Phase 1

```
docs/studio-c/
  workflow-synthesis-2026-05-01.md          (new — design rationale doc)

apps/web/sanity/schemas/studio-c/
  client.ts                                 (new — production client)
  brand.ts                                  (new — brand identity)
  brandKit.ts                               (new — machine-readable brand kit)
  show.ts                                   (new — recurring show)
  episode.ts                                (new — episode within a show)
  index.ts                                  (new — barrel export)

apps/web/lib/studio-c/
  README.md                                 (this file)
  state-machines/
    job-lifecycle.ts                        (new — state machine + validators)
    job-lifecycle.test.ts                   (new — 31 unit tests, all passing)

packages/database/prisma/schema.prisma      (extended — see below)
```

Prisma schema extensions (appended at end of file):

- `ProductionClient` — entity Studio C invoices
- `BrandKit` — machine-readable brand kit (1:1 with existing `Brand`)
- `StudioShow` — recurring production format
- `StudioEpisode` — individual episode within a show
- `StudioJob` — canonical work order (the job ticket)
- `IngestRecord` — checksummed card offload log
- `StudioApproval` — tiered approval gate
- `VersionHistory` — v01_editor → v05_final tracking
- `QcChecklist` — definition-of-done per deliverable
- `RightsRecord` — releases, licenses, permissions
- `RetentionStatus` — active / 30d / 90d / 1yr / forever / purged
- `Deliverable` — final outputs

Existing models extended (back-relations added):

- `Brand` — gained `productionClient`, `brandKit`, `studioShows`, `studioJobs`
- `User` — gained `studioJobsOwned`, `studioApprovalsSigned`, `ingestRecords`, `versionHistoriesAuthored`, `qcChecksReviewed`

---

## State machine — quick reference

States: `intake → prep → shooting → ingesting → editing → internal_review → (chase_review →) conforming → delivered → archived`. Plus side-states: `revisions`, `on_hold`, `cancelled`.

Approval tiers:

| Tier | Who can ship | Examples |
|---|---|---|
| A | Chase only | Pilots, commercial deliverables, anything client-facing for external paid work |
| B | Elijah or Miles | Recurring podcast episodes that match an approved show template |
| C | Automated | Social clips under approved show rules from already-approved masters |

Key rule enforced in `validateTransition`: **Tier A jobs MUST route through `chase_review`. They cannot ship directly from `internal_review → conforming`** even if a Tier A actor (Chase) signs off.

Full transition table is the source of truth — see `state-machines/job-lifecycle.ts`.

---

## Migration plan (no migration is run by this PR)

This PR adds models to the schema. Running the migration is a **separate** step.

When ready:

```bash
# 1. Confirm DATABASE_URL points where you want it (Neon production = source of truth).
#    Bitwarden: "Neon Postgres — HDI Production Database"
echo $DATABASE_URL

# 2. Generate the migration.
cd packages/database
npx prisma migrate dev --create-only --name studio-c-production-ops-phase-1

# 3. Review the generated SQL. Spot-check:
#    - All new tables have indexes on tenantId / status / approvalTier where present
#    - Foreign keys are correctly typed
#    - No accidental drops on existing tables

# 4. Apply the migration.
npx prisma migrate deploy

# 5. Regenerate the Prisma client.
npx prisma generate
```

**Do not run migrations against production until Chase has reviewed the generated SQL.**

---

## Run the tests

```bash
cd apps/web
npx tsx --test lib/studio-c/state-machines/job-lifecycle.test.ts
```

Expected output: `# tests 31 / # pass 31 / # fail 0`.

---

## Open questions (also in PR description)

1. **Module location** — Phase 1 lives in `apps/web/lib/studio-c/`. Future split into sibling app `apps/studio-c/`? Decision affects Phase 2 file moves.
2. **Naming conflicts** — `Job`, `Client`, `ProductionJob` already exist in Prisma with different semantics. Phase 1 namespaces new models with `Studio*` prefix where needed. Recommend a future cleanup pass to rename existing ones (e.g., `Job` → `EditorialJob`) but that's not Phase 1 scope.
3. **Tenant entity stale** — `apps/web/config/tenants.ts` says Studio C entity is "Tuthill Design LLC d/b/a Studio C Video." Per Chase, Studio C will incorporate as its own NY corp. Update path queued for when filing is in motion.
4. **Existing `Brand` model is minimal** — extending in place. If we ever consolidate Brand with the existing `StyleGuide` (voice/tone) model, that's a future pass.
5. **No unit-test framework configured** — repo uses Playwright (E2E) only. Phase 1 tests run via Node's built-in `node:test` to avoid pulling in Vitest or Jest. If we want a proper Vitest setup for `apps/web/lib/`, that's a separate PR.

---

## What's NOT in Phase 1

- Frame.io / LucidLink / Tentacle Sync / Postiz integrations
- Brand kit JSON → `.mogrt` / `.drfx` template generation pipeline
- Folder structure auto-creation webhooks
- Ingest checksumming tool implementation
- AutoPod / Descript / Opus Clip integrations
- Any UI for any of the above
- Migration run against production
- Sanity schema registration in `apps/web/sanity/schemas/index.ts` (deferred until UI work begins)

These are Phase 2+ and depend on the Phase 1 schema being approved.
