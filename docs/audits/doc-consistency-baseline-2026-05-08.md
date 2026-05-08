# Doc Consistency Baseline — 2026-05-08

First run of `scripts/doc-consistency-check.ts`. This file is the baseline against which future runs are compared.

## Summary

| Severity | Count |
|---|---|
| `block` | 91 |
| `partial` | 49 |
| `info` | 0 |
| **Total** | **140** |
| Files touched | ~130 |

Exit code: `1` (default mode — fails on any `block`).

## Rules in v0.1

| Rule ID | Severity | Pattern (informal) |
|---|---|---|
| `DEPRECATED_SMB_TIER_PRICING` | `block` | `$25/mo`, `$50/mo`, `$99/mo`, `$250/mo` (and `/month`) |
| `HDI_DEAD_LANGUAGE` | `partial` | `Hillbilly Dreams Inc` (HDI dead since 2026-04-18) |
| `ARRIE_ASLIN_MISSPELLED` | `block` | `Arri Aslan`, `Ari Aslan`, etc. |

## What this baseline tells us

### `DEPRECATED_SMB_TIER_PRICING` — 91 hits

The Directory walk-in SMB tier pricing (`$25 / $50 / $99 / $250` per month) was deprecated 2026-04-19 and replaced with a B2B-engagement-only model (per `docs/THE_THESIS.md` and CLAUDE.md). The pricing language is still embedded across:

- **Customer-facing demo / presentation pages** — `app/demo/presentation/page.tsx`, `app/measurably-better/page.tsx`, `app/store/sovereign-pi/page.tsx`
- **Directory pages** — `app/directory/page.tsx`, `app/directory/[slug]/page.tsx`, `app/directory/onboard/*`, `app/directory/dashboard/page.tsx`, `app/directory/submit/confirmed/page.tsx`
- **Admin tooling** — `app/admin/clients`, `app/admin/dashboard/walkthrough`, `app/admin/ecosystem/*Lens.tsx`, `app/admin/hq`, `app/admin/launch`, `app/admin/pulse`, `app/admin/roadmap`, `app/admin/scout/audit/[slug]`, `app/admin/strategic-mural`
- **API routes** — `app/api/billing/subscribe/route.ts`, `app/api/clients/[id]/report/pdf/template.tsx`, `app/api/directory/claim/route.ts`, `app/api/marketing/*/route.ts`, `app/api/scout/audit/[slug]/route.ts`
- **Voice prompts** — `lib/delta-dawn-system-prompt.ts`, `lib/voice/dawn-voice-system-prompt.ts` (Delta Dawn still references the deprecated tiers when explaining the platform)
- **Static HTML** — `public/bearsville-ecosystem.html`, `public/bob-briefing-april.html`, `public/competitive-analysis.html`, `public/big-muddy-acres/plan-big-muddy-radio.html`
- **Misc** — `components/explorer/nodes.ts` (explorer node descriptions)

### `HDI_DEAD_LANGUAGE` — 49 hits

References to "Hillbilly Dreams Inc" across:

- **Tenant config** — `config/tenants.ts:30` (the big-muddy tenant `entity` field; this is the load-bearing one)
- **Admin pages** — `app/admin/ecosystem/OrgChartLens.tsx`, `app/admin/hq/page.tsx`, `app/admin/launch/page.tsx`, `app/admin/links/page.tsx`, `app/admin/roadmap/page.tsx`, `app/admin/strategic-mural/page.tsx`
- **API routes** — `app/api/cron/scan-asana/route.ts`, `app/api/grok/chat/route.ts`, `app/api/ops/chat/route.ts`
- **Voice prompts** — `lib/delta-dawn-system-prompt.ts`, `lib/voice/dawn-voice-system-prompt.ts` (Delta Dawn's identity statement)
- **Other** — `app/demo/presentation`, `app/records/layout.tsx`, `app/whiteboard/partner-meeting-2026-04-20`, `components/explorer/nodes.ts`

### `ARRIE_ASLIN_MISSPELLED` — 0 hits

Clean. The 2026-04 sweep caught all known misspellings in customer-facing code.

## Exempted from scan

- `node_modules/`, `.next/`, `.turbo/` — generated
- `archive/` — historical
- `lib/hdi-links.ts` — file rename pending
- `app/hillbilly/` — legacy route, slated for removal
- `docs/voice/` — voice corpus quotes misspellings as examples
- `public/press/` — AI-generated mock press articles
- `public/sandbox/` — sandbox playground

The script itself self-exempts (its `RULES` list contains exemplars).

## What this baseline does NOT yet catch

This is v0.1. Known gaps for v0.2+:

- **Stale URLs** — internal links pointing at routes that 404
- **Studio C entity drift** — `tenants.ts:63` still says `Tuthill Design LLC d/b/a Studio C Video`. Charter criterion 2.1 names this as the canonical drift. Tracked separately, depends on P-11 (NY corp formation).
- **Date drift** — pages claiming launches that are past (e.g. `/dispatch` "Apr 27 launch" copy).
- **Broken external links** — needs a crawl, not a regex.
- **Live-vs-source drift** — comparing rendered HTML on bigmuddytouring.com to source. Today's tool only scans source.

## How to use

```bash
# Local — see what's drifting:
npx tsx scripts/doc-consistency-check.ts

# JSON for tooling:
npx tsx scripts/doc-consistency-check.ts --json

# Strict — fail on partials too (post-cleanup):
npx tsx scripts/doc-consistency-check.ts --strict

# CI (until cleanup catches up) — always exit 0:
npx tsx scripts/doc-consistency-check.ts --report-only
```

## Path forward

1. **Land this PR** — script + baseline doc only, no source cleanup. Charter criterion 2.1 moves `NOT STARTED → PARTIAL`.
2. **HDI cleanup pass (P-13)** — separate PR. Targets Tier-1 (tenant config, voice prompts, structured-data) first, Tier-2 (sandbox HTML, brand guidelines) later.
3. **Pricing cleanup pass** — separate PR. Replace deprecated tier copy with B2B engagement framing.
4. **CI wiring** — once block-severity counts hit zero, add the script to `.github/workflows/ci.yml` in default mode (no `--report-only`).
5. **v0.2 rule additions** — URL liveness, Studio C entity drift, date drift.
