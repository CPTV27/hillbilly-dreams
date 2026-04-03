# Overnight / next-session queue

**Purpose:** Runnable checks and follow-ups while Chase is away. Pick up in order; tick boxes in a PR or next agent run.

---

## A. Already queued (branch)

- [ ] **Merge PR** for branch `chore/docs-alignment-and-api-guards-2026-04-04` (or whatever name lands on GitHub) after review.
- [ ] **Smoke authenticated flows** after deploy: sign in → `/admin` → confirm **Deploys** and **Amy** dashboard still load (we added `requireAdmin()` to their API routes).

---

## B. Run tonight (machine can stay on)

These are **safe to run unattended** (no deploy). From repo root:

```bash
# 1) Clean Next generated types if tsc ever complains about missing .next paths
rm -rf apps/web/.next

# 2) Full gate (same as CI)
pnpm type-check && pnpm lint && pnpm build
```

**Playwright smoke** (starts `next dev` on port **3334** automatically):

```bash
pnpm test:smoke
```

If port 3334 is busy, either stop the other process or `PLAYWRIGHT_PORT=3335 pnpm test:smoke`.

**Optional (informational only):**

```bash
pnpm audit --audit-level=high
```

Do **not** auto-apply major version bumps without review (Dependabot list is separate).

---

## C. Next agent — high value (not automated)

| Priority | Task | Notes |
|----------|------|--------|
| P1 | **Sentry source maps in CI** | Add `SENTRY_AUTH_TOKEN` (or Vercel integration) — see `.workflow/STATUS.md` 2026-04-04. |
| P1 | **Auth audit batch 2** | Grep `app/api` for routes without `auth()` / `requireAdmin` / cron secret pattern; especially `/api/ops/*` not yet reviewed (`chat` is complex — read before changing). |
| P2 | **Prisma migrate baseline** | CC decision: move from `db push` to `migrate` with a baseline migration. |
| P2 | **Replace `console.log` in API routes** | Webhooks/cron — swap for structured logging pattern used elsewhere. |
| P3 | **E2E: admin session** | Add Playwright test that hits `/api/admin/deploys` with/without cookie (expect 401 unauthenticated) — needs auth fixture or mock. |

---

## D. What *not* to run blindly overnight

- **`db push` / `migrate`** against production without Chase.
- **Load tests** against production URLs without a plan.
- **Deleting `.claude/worktrees`** until heuristic WIP is triaged (see `AGENT_HANDOFF_TASKS.md` on integrate branch if present).

---

## E. If smoke fails

1. Read `test-results/` and Playwright trace.
2. Check whether failure is **auth redirect** (new `requireAdmin` on APIs) vs **real regression**.
3. Log finding in `.workflow/STATUS.md` under **Blockers**.
