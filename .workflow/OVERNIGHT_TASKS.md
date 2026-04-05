# Outstanding work queue (master list)

**Last updated:** 2026-04-06 (morning). **Purpose:** Single checklist for Cursor / agents / Chase.

**Cursor setup:** see [`.cursor/CURSOR_SETUP.md`](../.cursor/CURSOR_SETUP.md).

**Code freeze: April 10. Four days. Cleanup, hardening, alignment only.**

---

## DAYTIME SPRINT (April 6) — Cursor

### P0 — Must ship today

- [ ] **Press auth gate:** `/public/press/` files are publicly accessible. Create `apps/web/app/admin/press/page.tsx` behind admin auth that links to or iframes the static HTML files. Pattern: `apps/web/app/briefings/scan2plan-bob/PasswordGate.tsx`. Add `X-Robots-Tag: noindex`. Tracy and Amy are reading these NOW — content is internal only.

- [ ] **Purge "corridor" from customer-facing .tsx pages:** Search all `.tsx` in `apps/web/app/` for "corridor" (case-insensitive). Replace with "the Deep South", "the region", or specific town names. Do NOT touch: Prisma models, database seeds, `outsider-economics-v2/`, image folder paths.

- [ ] **Internal-only banner on ALL press articles:** 5 new articles landing today (Economist, American Banker, Bloomberg, Fast Company, The Atlantic). Each needs the sticky orange banner. Verify existing 7 articles have it too.

- [ ] **Pricing audit on customer-facing .tsx:** Search for `$20`, `$49`, `The Listing`, `The Works` (old tier names). Replace with: Free / $25 Essentials / $50 Pro / $99 Marketing / $250 Engine. Don't touch admin/internal pages or database refs.

### P1 — Should ship today

- [ ] **Roadmap brands redesign** (`/sandbox/roadmap.html`): Section 03 brand cards are stacked too tight with overlapping background images. Redesign:
  - Each brand gets its own card with whitespace between them
  - Image on one side, text on other — alternating left/right
  - Brand name, one-line description, domain, clean photo
  - 2rem+ gap between cards
  - Fix "corridor" in descriptions → "the Deep South"

- [ ] **FlywheelLens.tsx pricing alignment:** Update to match 5-tier model (Free/$25/$50/$99/$250). May still show old pricing.

- [ ] **Dependabot PR triage:** 10+ open. Merge safe patch/minor (`sharp`, `turbo`, `@types/node`, `framer-motion`). Close risky majors: "deferring until after April 10 freeze."

- [ ] **Stale branch cleanup:** Delete remote branches where changes are on main: `feat/dsd-copy-rewrite`, `feat/native-social-publisher`, `dev/cms-editor`, `feat/admin-master-roadmap`, `integrate/elegant-volhard-2026-04-04`, `release/internal-ready-2026-04-04`.

- [ ] **Domain health check:** Curl all 14 domains, log results to `.workflow/DOMAIN_HEALTH_CHECK.md`.

### P2 — If time allows

- [ ] **Mobile pass on press articles:** All 12 press HTML files at 375px. Fix layout breaks.

- [ ] **Install `gh` CLI:** `brew install gh && gh auth login`. Run `gh issue list --state open`, save to `.workflow/GITHUB_ISSUES.md`.

- [ ] **NpsResponse migration:** Prepare migration for NpsResponse model (in schema, not yet in prod DB). Do NOT push without Chase approval.

- [ ] **Extend `apiLog`** to remaining API routes still using `console.log` (grep `console.` under `app/api`).

- [ ] **OBS client paths:** Align `lib/obs-client.ts` placeholder paths with actual OpenBroadcaster REST surface on Mac Mini (192.168.4.37:8080).

### P3 — Backlog (before April 10 freeze)

- [ ] `$transaction` on remaining multi-write routes
- [ ] N+1 profiling on hot list endpoints
- [ ] Legacy billing / `directory/claim` — align with current tier model
- [ ] Authenticated Playwright test with `E2E_SESSION_COOKIE`
- [ ] `tokens.css` modularization (phased, heavy QA)
- [ ] Sentry: add `SENTRY_AUTH_TOKEN` to GitHub Secrets, verify symbolicated frames

### Rules
- All work goes to `main` (build mode until April 10 freeze)
- `pnpm exec tsc --noEmit` before committing
- `pnpm test:p0` after significant changes
- No new features — cleanup, hardening, alignment only
- Don't touch `outsider-economics-v2/` content
- Don't rename Prisma models
- Don't run `db push` / `migrate` against production without Chase

---

## Done (archive — do not reopen)

### April 5-6 overnight
- [x] Press photo deduplication — 41 unique paths, no duplicates, Victorian banned (dc04c9a, efebc7e)
- [x] Photo spec canonical doc (`docs/ops/PRESS_PHOTO_ASSIGNMENTS.md`)
- [x] Auth: requireAdmin on drafts, page-edits, schedule, notebook, scout (#120)
- [x] Cloud logger on billing, Stripe, AI analyze (#122)
- [x] Revenue dashboard + API (#6)
- [x] Churn alerts + metrics + Asana outreach (#7)
- [x] NPS model + API + portal UI + admin summary (#8)
- [x] CEO morning brief cron (#119)
- [x] OBS client stub + content pipeline API (#19-20)
- [x] Admin sidebar: HQ, report card, revenue, churn, store links (#13-16)
- [x] P0 e2e fix for directory journey (#17)
- [x] RAG audit loop script (#18)
- [x] Rate limiting, CORS, apiLog cleanup, POST validation, TODO→GitHub refs
- [x] Due diligence data dump + RAG audit results
- [x] HQ revenue corrections (Inn + Shows + Studio C + Tuthill + S2PX)
- [x] Report card feedback loop tracking
- [x] Pricing lock across all agent/GTM/doc files (CoS session)

### Earlier
- [x] Docs alignment PR merged
- [x] Auth audit batches 2-3
- [x] Playwright smoke tests
- [x] Structured logging (`lib/api-logger.ts`)
- [x] Metrics bulk upsert with `$transaction`
- [x] CI: `SENTRY_AUTH_TOKEN` in build env
- [x] `.gitignore`: `.playwright-mcp/`
- [x] Tier reconciliation (`DECISIONS.md`)

---

## Quick commands (local)

```bash
rm -rf apps/web/.next
pnpm type-check && pnpm lint && pnpm build
pnpm test:smoke
```

**Do not** run `db push` / `migrate` against **production** without Chase.
