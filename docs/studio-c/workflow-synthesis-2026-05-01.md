# Studio C Workflow Synthesis — 2026-05-01

**Source:** Cross-LLM stress test of the Studio C production workflow draft.
**Authors of the original critiques:** Three independent LLM reviews (Claude, Gemini-class, GPT-class) commissioned 2026-04-30 night.
**Synthesizer:** Chase, with Cos.
**Status:** Canonical reference for Phase 1 of the Studio C Production Ops module.

This is the design rationale doc. The schema, state machine, and module README all derive from the decisions captured here. If a future agent wants to know *why* something is shaped the way it is, they read this first.

---

## Universal agreements across all three LLM reviews

- **Production ops system must come before post pipeline tools.** Tools don't fix process problems. The boring scaffolding (job tickets, approval rules, ingest discipline, QC) is the missing layer.
- **Hardware timecode** (Tentacle Sync E or Deity TC-1) is mandatory for multicam, not optional. Software-only sync is fallback, not default.
- **LucidLink for active editing storage; Frame.io for review only.** Separate concerns.
- **Backblaze B2 or Cloudflare R2** for archive. Hetzner Storage Box as a cheap cold-tier option.
- **AutoPod (Premiere plugin) and/or Descript Automatic Multicam** for podcast pipeline auto-edit.
- **Opus Clip for social, with mandatory human approval before posting.** Brand-sensitive content never auto-publishes.
- **NLE-native templates required:** `.mogrt` for Premiere, `.drfx` for Resolve. Generated from a machine-readable brand kit.
- **Filename starts with `YYYYMMDD`** for chronological sort. Filenames are handles; metadata is the brain. Don't cram everything into filenames.
- **AI for grunt work** (transcription, tagging, first-pass cuts); humans for taste, legal, approvals.
- **Resolve/Premiere split is fine if segregated by track**, not by editor preference. Track A = Premiere. Track B = Resolve.

## Gaps the three reviews caught in the original spec

1. **Audio pipeline missing entirely.** LUFS targets, EQ chain, noise reduction. Adobe Podcast AI or Resolve Voice Isolation belong **at ingest**, not as a separate later step.
2. **QC / Definition of Done checklist** — audio peaks, captions, brand kit applied, names spelled right. Without this, Chase becomes the QC robot forever.
3. **Rights / releases / music licensing** has to live next to the project record, not in email.
4. **Approval tiers** — Chase cannot bottleneck everything. Pilot/commercial = Chase. Recurring podcast under template = Elijah/Miles ship, exceptions only to Chase. Social clips under approved show rules = no Chase at all.
5. **Version control naming:** `v01_editor → v02_internal → v03_chase_notes → v04_client_review → v05_final`. Never "final_final_REAL."
6. **Ingest discipline with checksums** — religious, or every automation downstream collapses.
7. **Disaster recovery / 3-2-1 backup rule** wasn't in the spec.
8. **Technical specs bible** — frame rate matrix per show, color space, audio loudness targets per platform.

## The framing critique (also unanimous)

> "You're designing a post pipeline before you've designed the production operations system."

Tools don't fix process problems. The data model, state machine, and approval rules come first. Tools plug into them later.

## Stack decision: build inside MBT, not Airtable

All three reviews recommended Airtable as the production database. **We are not using Airtable.** The MBT monorepo already has the pieces:

- **Sanity** for content humans edit (brands, brand kits, shows, episodes)
- **Postgres + Prisma** for operational state (jobs, ingest records, approvals, version history, QC, rights, retention)
- **Next.js 14 + multi-tenant middleware** for routing
- **Existing tenant `studio-c`** in `apps/web/config/tenants.ts` (entity field needs updating to MBT — see open questions)

A third-party tool at $20/seat/month would be a downgrade. The MBT stack already gives us state machines, webhooks, foreign keys, and a UI layer. Use them.

### Storage split (the rule)

- **Sanity** = canonical content edited by humans through a CMS. Brands, brand kits (fonts, colors, logos, templates), recurring shows, episode plans.
- **Postgres** = operational state with state machines and frequent querying by status/date. Jobs, ingest records, approvals, version history, QC checklists, rights records, retention status, deliverables.

Rule of thumb: if it has a state machine or needs frequent querying by status/date, it goes in Postgres. If it's structured content humans edit through a CMS, it goes in Sanity.

## Approval tiers (encoded in the state machine)

| Tier | Who can ship | SLA | Examples |
|---|---|---|---|
| **A** | Chase only | 48h | Pilots, commercial deliverables, anything client-facing for external paid work |
| **B** | Elijah or Miles | 24h | Recurring podcast episodes that match an approved show template; exceptions escalate to A |
| **C** | Automated, no human in loop | Instant | Social clips generated under approved show rules from already-approved episode masters |

Auto-escalation rules (when Tier B becomes Tier A): TBD in Phase 2.

## What's NOT in Phase 1

- Frame.io / LucidLink / Tentacle Sync / Postiz integrations
- Brand kit JSON → `.mogrt` / `.drfx` generation pipeline
- Folder structure auto-creation webhooks
- Ingest checksumming tool
- AutoPod / Descript / Opus Clip integrations
- Any UI for any of the above

Phase 1 is schema + state machine + docs only. UI + integrations come in Phase 2+.

## Build order (Phase 1 → Phase 2+ sequence)

| # | Item | Phase | Type |
|---|---|---|---|
| 1 | Studio C production ops schema (Sanity + Postgres) | 1 | Code |
| 2 | Folder + filename standard, locked and documented | 1 | Doc |
| 3 | Ingest SOP with checksums | 1 | Doc |
| 4 | Approval tier rules + state machine | 1 | Code |
| 5 | Tentacle Sync standard across both studios | 2 | Hardware purchase |
| 6 | Frame.io for review (read-only integration with the platform) | 2 | SaaS subscription |
| 7 | Brand kit schema (`brandKit` Sanity doc) + NLE template generation pipeline | 2 | Code |
| 8 | Premiere podcast template (.mogrt-driven from brand kit) | 2 | Template asset |
| 9 | Resolve commercial template (.drfx-driven from brand kit) | 2 | Template asset |
| 10 | LucidLink active storage layer | 2 | SaaS subscription |
| 11 | Postiz social handoff | 3 | Integration |
| 12 | Iconik MAM | Deferred until search is a revenue problem | SaaS subscription |

## Hanging decision: line cut failure fallback

Every podcast records ISOs to local SSD as backup, even when we don't plan to use them. Cheap insurance. If line cut breaks, Miles syncs ISOs via Tentacle TC (3-second job in Resolve/Premiere) and rebuilds. We never rely on a perfect line cut. That's the rule.

This rule is encoded in the QC checklist (every shoot must verify ISOs were recorded; the `IngestRecord` model includes an `isoBackupPresent: Boolean` field).

## Entity framing (one-step-behind correction)

The original synthesis still called Studio C a "DBA under Tuthill Design LLC." Per Chase's 2026-04-30 clarification: **Studio C will incorporate as its own NY corporation.** Customers (Big Muddy, Utopia, Scan2Plan) are MBT clients with Studio C as the production vendor.

The schema reflects this:
- `ProductionClient` belongs to a tenant (MBT primarily, with Studio C as production org)
- `ProductionJob` has both a `clientId` (who's paying) and a `productionOrgId` (who's executing — Studio C today, future expansion later)

The `apps/web/config/tenants.ts` Studio C entry currently says `entity: "Tuthill Design LLC d/b/a Studio C Video"`. **This is stale.** Update path queued in Phase 2 once the NY corp filing is in motion.

---

*Maintained by Cos. Update when the workflow design sharpens, gaps are filled, or new tools are adopted into the pipeline.*
