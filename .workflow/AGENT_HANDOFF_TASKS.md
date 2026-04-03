# Agent handoff — worktrees & follow-ups

Created 2026-04-04. **CC** owns Prisma/migrations; coordinate before applying schema from heuristic WIP.

---

## A. `integrate/elegant-volhard-2026-04-04` (ready for PR → `main`)

**Contains:** merge of `claude/elegant-volhard` plus a **TypeScript fix** for PDF `NextResponse` body (`Uint8Array`).

**Scope**

- Admin reviews UI: `apps/web/app/admin/reviews/*`
- Client review response + ops draft routes (callAI / queue)
- Monthly report **PDF** (`@react-pdf/renderer`): `apps/web/app/api/clients/[id]/report/pdf/*`
- Cron: `GET /api/cron/monthly-reports` (uses `CRON_SECRET` like other crons)

**Next agent / Chase**

1. Open **PR**: `integrate/elegant-volhard-2026-04-04` → `main` (or merge locally after review).
2. **Vercel:** ensure `CRON_SECRET` is set; add cron schedule for `/api/cron/monthly-reports` if desired (monthly).
3. **Smoke:** authenticated admin can load `/admin/reviews`; generate report then PDF for a test client (month/year query params).
4. **Optional hardening:** replace `console.error` in new API routes with structured logging per repo norms; audit `(prisma as any)` usage on these routes.

---

## B. `heuristic-volhard` worktree — **do not merge the branch again** (already on `main`)

The **branch** is merged. What remains is **dirty local WIP** under  
`.claude/worktrees/heuristic-volhard/` (path is gitignored as a directory listing but the edits live in that clone).

### B1 — Worth finishing (product catalog schema)

**Uncommitted** `packages/database/prisma/schema.prisma` adds:

- `ProductFeature`, `ProductBundle`, `BundleFeature` (tier/feature catalog modeling)

**Also modified (uncommitted):** `CLAUDE.md`, `docs/FEATURE_TIERS.md`, `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` (tier narrative alignment).

**Untracked:** `packages/database/scripts/seed-product-catalog.ts` — wire up after schema is approved.

**Tasks**

1. Copy or cherry-pick the **schema** diff into a **new branch from `main`** (do not merge the whole heuristic worktree blindly).
2. Run `pnpm db:generate` / migration in `packages/database` per CC workflow.
3. Reconcile with canonical tier naming (Free / Core / Growth / Partner — see `docs/DSD_MARKETING_COPY.md` / `CLAUDE.md`).
4. Add seed script + tests only after migration review.

### B2 — Discard / ignore

- **`.playwright-mcp/*`** — debug artifacts; **`.playwright-mcp/`** is now in root `.gitignore` for future runs from repo root.
- **Root `gallery-*.png`** in that worktree — delete if not needed for design.
- **`apps/web/public/sandbox/`** untracked there — **`main` already has** `sandbox/roadmap.html`; drop duplicate tree after diffing.

### B3 — Optional doc

- **`.claude/agents/PATCH_V3.md`** (untracked) — review; merge into existing Patch handoff or delete if superseded.

---

## C. Old worktrees cleanup (manual)

When B is triaged:

```bash
# After closing PR from integrate branch and you no longer need parallel checkouts:
git worktree remove .claude/worktrees/heuristic-volhard
git worktree remove .claude/worktrees/elegant-volhard
git branch -d claude/heuristic-volhard claude/elegant-volhard   # only if fully merged / obsolete
```

Do **not** remove worktrees while they contain uncommitted work you still need — copy files out first.
