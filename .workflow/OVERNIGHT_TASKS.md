# Outstanding work queue (master list)

**Last updated:** 2026-04-04. **Purpose:** Single checklist for Cursor / agents / Chase. Tick items in GitHub PRs or here as you go.

**Cursor setup:** see [`.cursor/CURSOR_SETUP.md`](../.cursor/CURSOR_SETUP.md).

---

## Done (archive — do not reopen)

- [x] Docs alignment PR (`chore/docs-alignment-and-api-guards`) merged to `main`.
- [x] Auth audit batch 2 (agent/publish/media/ops admin view, etc.) on `main`.
- [x] Playwright smoke: `GET /api/admin/deploys` → **401** without session ([`e2e/smoke.spec.ts`](../e2e/smoke.spec.ts)).

---

## A. Ship feature branch: `integrate/elegant-volhard-2026-04-04`

**Status:** Branch exists on `origin`; **not** merged to `main` (admin reviews + monthly PDF + cron). Latest `main` has been **merged into** this branch (conflict in `ops/reviews/draft` resolved: **`requireAdmin` + `callAI`**).

- [x] Keep branch current with `main` (merged & pushed 2026-04-04).
- [ ] Open PR **integrate/elegant-volhard-2026-04-04 → main** and code review (or merge if PR already exists).
- [ ] Confirm **Vercel** env: **`CRON_SECRET`**, cron schedule for `/api/cron/monthly-reports` if desired.
- [ ] Merge after `pnpm type-check`, `pnpm lint`, `pnpm build`, `pnpm test:smoke`.
- [ ] Post-merge smoke: signed-in **Admin → Deploys**, **Amy**, any new **admin/reviews** UI.

---

## B. Heuristic worktree — product catalog (Prisma)

- [ ] Copy **schema + seed** from `.claude/worktrees/heuristic-volhard` onto a **new branch from `main`** (no wholesale merge of dirty worktree).
- [ ] **CC:** migration / `db:generate` policy; no prod `db push` without approval.
- [ ] Align tiers with **Free / Core / Growth / Partner** and `docs/DSD_MARKETING_COPY.md`.
- [ ] Delete/ignore `.playwright-mcp` junk in worktree; remove worktrees when done.

---

## C. Observability

- [ ] **Sentry source maps:** GitHub Action secret **`SENTRY_AUTH_TOKEN`** + upload step, **or** Vercel Sentry integration ([`.workflow/STATUS.md`](STATUS.md) note).
- [ ] Follow Sentry Next.js guidance: **instrumentation** file vs legacy `sentry.server.config.ts` warnings in build logs.

---

## D. Security / API (remaining)

- [ ] **Auth audit batch 3:** grep `apps/web/app/api` for routes missing `requireAdmin` / `auth` / `CRON_SECRET` / webhook HMAC.
- [ ] **Product:** `marketing/scout-photo` — keep public demo vs add token/auth.
- [ ] **Product:** `ops/chat` **POST** — keep anonymous vs require session/admin (Vertex cost).
- [ ] **Ops:** Any caller of **`POST /api/publish/batch`** must send **`Authorization: Bearer ${CRON_SECRET}`** in production.
- [ ] Replace **`console.log`** in API routes with structured logging (webhooks/cron first).

---

## E. Dependabot / supply chain

- [ ] GitHub **Security → Dependabot** — triage **critical/high** in small PRs with CI.
- [ ] Document deferred risks in `.workflow/DECISIONS.md` if you add that pattern.

---

## F. Database & architecture debt

- [ ] **Prisma:** baseline **`prisma migrate`** (CC-owned process); see `docs/ARCHITECTURE.md` §5.6.
- [ ] **`$transaction`** on multi-write routes.
- [ ] **N+1** on hot list endpoints.
- [ ] **`tokens.css`** modularization (phased, heavy QA).

---

## G. Product / copy

- [ ] Reconcile tier + pricing language across `BUSINESS_ARCHITECTURE`, directory, `DSD_MARKETING_COPY`, `CLAUDE.md`.
- [ ] Decide **legacy billing / claim routes** vs current tier model (or mark internal-only).

---

## H. Testing (optional)

- [ ] Playwright **authenticated** path: **200** on `/api/admin/deploys` with session (needs test user or preview env).

---

## Quick commands (local)

```bash
rm -rf apps/web/.next
pnpm type-check && pnpm lint && pnpm build
pnpm test:smoke
```

**Do not** run `db push` / `migrate` against **production** without Chase.
