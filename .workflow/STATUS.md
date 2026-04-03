# Agent status

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
