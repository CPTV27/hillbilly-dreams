# Outstanding work queue (master list)

**Last updated:** 2026-04-05. **Purpose:** Single checklist for Cursor / agents / Chase.

**Cursor setup:** see [`.cursor/CURSOR_SETUP.md`](../.cursor/CURSOR_SETUP.md).

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
