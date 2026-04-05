# Outstanding work queue (master list)

**Last updated:** 2026-04-05 (evening). **Purpose:** Single checklist for Cursor / agents / Chase.

**Cursor setup:** see [`.cursor/CURSOR_SETUP.md`](../.cursor/CURSOR_SETUP.md).

**Code freeze: April 10. No new features. Cleanup and hardening only.**

---

## OVERNIGHT SPRINT (April 5-6) — Cursor

### P0 — Must ship before morning

- [ ] **Press auth gate:** Move entry point for `/public/press/` files behind admin auth. Pattern: `apps/web/app/briefings/scan2plan-bob/PasswordGate.tsx`. Create `apps/web/app/admin/press/page.tsx` that loads the static HTML files from `/public/press/`. The existing `/admin/` layout requires auth via `lib/admin-auth.ts`. Add `X-Robots-Tag: noindex`.

- [ ] **Internal-only banner on all press articles:** Add sticky orange banner to all 7 HTML files in `/public/press/` (index.html already has it):
  ```html
  <div style="background:#2a1a00;border-bottom:2px solid #c17817;padding:12px 20px;text-align:center;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c17817;position:sticky;top:0;z-index:100;">
    <strong style="color:#e8a030;">Internal Use Only</strong> — HDI Marketing — Not real press coverage
  </div>
  ```

- [ ] **Purge "corridor" from customer-facing pages:** Search all `.tsx` files in `apps/web/app/` for "corridor" (case-insensitive). Replace with "the Deep South", "the region", or specific town names. Do NOT touch: Prisma models, database seeds, `outsider-economics-v2/`, image folder names.

### P1 — Should ship tonight

- [ ] **Dependabot PR triage:** 10 open. Merge safe patch/minor bumps (`sharp`, `turbo`, `@types/node`, `framer-motion`). Close risky major bumps with "deferring until after April 10 freeze."

- [ ] **Stale branch cleanup:** Check these remote branches — if changes are on main, delete: `feat/dsd-copy-rewrite`, `feat/native-social-publisher`, `dev/cms-editor`, `feat/admin-master-roadmap`, `integrate/elegant-volhard-2026-04-04`, `release/internal-ready-2026-04-04`.

- [ ] **Domain health check:** Curl all 14 domains, log results with timestamp to `.workflow/DOMAIN_HEALTH_CHECK.md`.

- [ ] **Pricing audit on .tsx files:** Search for remaining `$20`, `$49`, `The Listing`, `The Works` (old tier names) in customer-facing pages. Replace with locked pricing: Free / $25 Essentials / $50 Pro / $99 Marketing / $250 Engine. Don't touch admin/internal pages where these are database references.

### P2 — Nice to have

- [ ] **Roadmap brands section redesign** (`/sandbox/roadmap.html`): The "Ecosystem / Brands" section (section 03) has brand cards stacked too tight with full-bleed background images that bleed into each other. Text is lost in photo noise. Redesign to:
  - Give each brand its own distinct card with generous whitespace between them
  - Image on one side (left or right, alternating), text on the other — not image-as-background
  - Each card should have: brand name, one-line description, domain, and a clean photo that breathes
  - More vertical space between cards (at least 2rem gap)
  - The image should be visible and clear, not overlaid with text
  - Keep the dark theme, gold accent colors
  - Look at the press articles (`/press/*.html`) for good image-beside-text patterns
  - Also fix: "corridor" appears in descriptions — replace with "the Deep South" or specific towns

- [ ] **Mobile pass on press articles:** Open each press HTML at 375px, fix layout breaks.
- [ ] **Install `gh` CLI:** `brew install gh && gh auth login`. Run `gh issue list --state open`, save to `.workflow/GITHUB_ISSUES.md`.

### Rules for tonight
- All work goes to `main` (build mode until April 10)
- `pnpm exec tsc --noEmit` before committing
- `pnpm test:p0` after significant changes
- No new features. Cleanup and hardening only.
- Don't touch `outsider-economics-v2/` content
- Don't rename Prisma models

---

## Done (archive — do not reopen)

- [x] Docs alignment PR (`chore/docs-alignment-and-api-guards`) merged to `main`.
- [x] Auth audit batch 2 (agent/publish/media/ops admin view, etc.) on `main`.
- [x] Playwright smoke: `GET /api/admin/deploys` → **401** without session ([`e2e/smoke.spec.ts`](../e2e/smoke.spec.ts)).
- [x] **A.** Feature branch **`integrate/elegant-volhard-2026-04-04`** merged to **`main`** (PR #26).
- [x] **Auth batch 3 (partial):** `/api/metrics` **GET** requires **admin**; **POST/PUT** and **`/api/metrics/[key]` PUT** require **`requireCronOrAdmin`**. **`publish/batch`** uses shared **`lib/cron-or-admin.ts`**.
- [x] **Structured logging:** `lib/api-logger.ts`; **billing** + **Cloudbeds** webhooks migrated off raw `console.*` (pattern for remaining routes).
- [x] **Metrics bulk upsert:** **`$transaction`** for metric + snapshot writes.
- [x] **CI:** **`SENTRY_AUTH_TOKEN`** passed into **build** job env (set secret in GitHub for uploads).
- [x] **`.gitignore`:** `.playwright-mcp/`.
- [x] **Decisions / tier reconciliation:** [`.workflow/DECISIONS.md`](DECISIONS.md).

---

## A. Post-merge ops (Chase / Vercel)

- [ ] Confirm **Vercel** env: **`CRON_SECRET`**, cron schedule for `/api/cron/monthly-reports` if desired.
- [ ] Production smoke: signed-in **Admin → Deploys**, **Amy**, **admin/reviews** as needed.

---

## B. Heuristic worktree — product catalog (Prisma)

- [ ] Copy **schema + seed** from `.claude/worktrees/heuristic-volhard` onto a **new branch from `main`** when that worktree exists on a dev machine (not shipped in this repo).
- [ ] **Migration / `db:generate`:** CC/Chase process; no prod `db push` without approval.

---

## C. Observability (remaining)

- [ ] Add **`SENTRY_AUTH_TOKEN`** in **GitHub → Settings → Secrets** (if not already) so CI uploads succeed.
- [ ] Verify Sentry shows symbolicated frames for a thrown error after deploy.

---

## D. Security / API (remaining)

- [ ] Extend **`apiLog`** to remaining API routes (grep `console.` under `app/api`).
- [ ] **`marketing/scout-photo`:** Optional rate limit / auth if Vertex spend spikes (see DECISIONS).
- [ ] **`ops/chat` POST:** Optional auth gate (see DECISIONS).

---

## E. Dependabot / supply chain

- [ ] GitHub **Security → Dependabot** — triage **critical/high** in small PRs with CI.
- [ ] Record **deferred** CVEs in [`.workflow/DECISIONS.md`](DECISIONS.md) when skipping.

---

## F. Database & architecture debt

- [ ] **Prisma:** baseline **`prisma migrate`** (Chase/CC); see `docs/ARCHITECTURE.md` §5.6.
- [ ] **`$transaction`** on other multi-write routes (search `Promise.all` + multiple `prisma.` writes).
- [ ] **N+1** on hot list endpoints (profile with Prisma query logging in staging).
- [ ] **`tokens.css`** modularization (phased, heavy QA).

---

## G. Product / copy

- [ ] **Legacy billing / `directory/claim`:** Mark internal-only or align with current tier model when retail checkout is live.

---

## H. Testing (optional)

- [ ] Run Playwright **authenticated** test: set **`E2E_SESSION_COOKIE`** and run `pnpm test:smoke` (see `e2e/smoke.spec.ts`).

---

## Quick commands (local)

```bash
rm -rf apps/web/.next
pnpm type-check && pnpm lint && pnpm build
pnpm test:smoke
```

**Do not** run `db push` / `migrate` against **production** without Chase.
