# Agent status

## 2026-04-04 — Docs alignment + ops/admin API guards

### What changed

- **`CLAUDE.md`**, **`.cursorrules`**, **`docs/ARCHITECTURE.md`:** Next.js version pinned to **14.2.x** (`apps/web/package.json`); deploy = **Vercel** (removed stale Firebase App Hosting / Firebase secrets references); domain counts clarified (**18** hostname patterns vs `CLAUDE.md` **14** marketing domains); middleware `getToken` note updated (no Cloud Run).
- **`/api/ops/reviews/draft`**, **`/api/ops/reviews/approve`**, **`/api/ops/onboarding-checklist`**, **`/api/ops/amy`**, **`/api/admin/deploys`:** **`requireAdmin()`** on every request so unauthenticated callers get **401/403** (aligns with `docs/ARCHITECTURE.md` admin access).

### CI / Sentry (follow-up for Chase)

- **`.github/workflows/ci.yml`** does **not** pass `SENTRY_AUTH_TOKEN` or run Sentry source-map upload. To get readable stack traces in production: add org/project/auth token to **GitHub Actions secrets** and wire the **Sentry Next.js** upload step (or Vercel’s Sentry integration) — see Sentry docs for Next 14.

### Quality gate (run locally)

`pnpm type-check` · `pnpm lint` · `pnpm build`

---

## 2026-04-03 — QA complete, branch pushed, PR open

### CI / deploy

- **Branch:** `release/internal-ready-2026-04-04` (pushed to `origin`)
- **PR:** https://github.com/CPTV27/hillbilly-dreams/pull/25 → merge to `main` for **Vercel production deploy** (per your workflow)
- **GitHub** reported Dependabot vulnerabilities on the repo — separate from this release; triage in Security tab when you can.

### Automated QA (this branch)

| Step | Result |
|------|--------|
| `pnpm type-check` | Pass |
| `pnpm lint` | Pass (warnings only: img hooks) |
| `pnpm build` | Pass |
| `pnpm test:smoke` | **5/5** — Touring, `/`, static roadmap, `/hillbilly/roadmap` redirect, `/directory` |

Playwright now uses **port 3334** by default so smoke tests do not attach to another app on **:3000**.

### Post-merge smoke (production)

1. `https://<prod>/sandbox/roadmap.html`
2. `https://hillbillydreamsinc.com/roadmap` (308 → static)
3. `https://deepsouthdirectory.com/directory` (or your DSD host)
4. `/admin/roadmap` after Google sign-in

---

## 2026-04-03 — Pre–internal-users pass (roadmap asset + canonical copy + QA)

### What changed

- **`public/sandbox/roadmap.html`:** New static internal roadmap (dark/gold, `noindex`). Tier summary **Free / Core / Growth / Partner**, parity reminder, links to `/competitive-analysis.html` and `/admin/roadmap`. **`/hillbilly/roadmap` → 308 → this file** — no longer 404 after deploy.
- **`CLAUDE.md`:** DSD section updated — retail **pricing TBD**, tier names, Stripe env note when checkout goes live (removed fixed $20/$49/$99 table as canonical).
- **`public/competitive-analysis.html`:** One table row updated so “homepage pricing” language matches **TBD** stance.

### QA (this branch)

- `pnpm type-check` — **pass** (tsc --noEmit for `@bigmuddy/web`)
- `pnpm lint` — **pass** (existing warnings only: `<img>`, hook deps — no new errors)
- `pnpm build` — **pass** (run earlier in session; re-run before deploy if large changes since)

### Files touched (this pass)

- `apps/web/public/sandbox/roadmap.html` (new)
- `CLAUDE.md`
- `apps/web/public/competitive-analysis.html`

### Earlier same-day (still relevant)

- Admin `/admin/roadmap`, directory DSD tiers + onboard tier params, `hillbilly/roadmap` redirect route — see git history.

### Deploy checklist

1. Commit all intended files (including untracked API/media routes if in scope).
2. **Smoke:** `GET /sandbox/roadmap.html`, `GET /hillbilly/roadmap` (redirect), `GET /competitive-analysis.html`, sign-in **`/admin/roadmap`**.
3. Internal users: confirm **admin allowlist** emails in Vercel / NextAuth.

### Blockers

- None for static roadmap path. Product catalog DB / seed script — **not** in this repo snapshot; merge separately if on another branch.

---

## 2026-04-04 — Roo Code (VS Code / Cursor-compatible)

### Added

- **`.roo/rules/00-hdx-read-first.md`** — workspace rules for Roo: points at `docs/ARCHITECTURE.md`, `CLAUDE.md`, `docs/BUSINESS_ARCHITECTURE.md`, `.cursorrules`; GA scope; MCP note (`${env:...}` in `.roo/mcp.json`).
- **`.vscode/extensions.json`** — recommends Marketplace extension **`RooVeterinaryInc.roo-cline`**.

### Your steps (local)

1. Install **Roo Code** from the Marketplace (or accept the workspace recommendation when the editor prompts).
2. Open Roo’s settings → add your **API provider / API key** (OpenRouter, Anthropic, etc., per [Roo docs](https://docs.roocode.com/getting-started/installing)).
3. Optional: Roo pane → **MCP** → **Edit Project MCP** to create `.roo/mcp.json` (commit only non-secret config; use env vars for tokens).
4. Work in this repo: Roo loads **`.roo/rules/`** alphabetically plus root **`AGENTS.md`** / **`AGENT.md`** if present (this repo uses **`CLAUDE.md`** + **`.cursorrules`** as the long-form source of truth).

---

## 2026-04-04 — Worktrees: elegant merged to integrate branch; heuristic backlog

- **PR (open):** `integrate/elegant-volhard-2026-04-04` → `main` — admin reviews + monthly PDF + cron; includes PDF `NextResponse` typing fix. Create PR: https://github.com/CPTV27/hillbilly-dreams/pull/new/integrate/elegant-volhard-2026-04-04
- **Handoff doc (on that branch):** `.workflow/AGENT_HANDOFF_TASKS.md` — heuristic worktree product-catalog Prisma WIP, cron checklist, worktree cleanup commands.
- **`main`:** unchanged until PR merges; local `.gitignore` update for `.playwright-mcp/` ships with the PR.
