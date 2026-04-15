# Batch 3 QA — April 15, 2026

## Commands

| Command | Result |
|---------|--------|
| `pnpm --filter @bigmuddy/web exec tsc --noEmit` | **PASS** (exit 0) |
| `pnpm test:p0` | **PASS** — 4 passed, 3 skipped (credentials / vendor / scout require secrets or manual) |

**Note:** First `test:p0` run failed until Playwright browsers were installed (`pnpm exec playwright install chromium`). After install, e2e completed successfully.

## Batch 3 scope delivered

1. **DSD pricing** — Directory landing tiers set to Free $0, Essentials $25, Pro $50, Marketing $99, Engine $250/mo; PDF monthly report tier labels updated; `/api/directory/claim` Stripe line items aligned to Essentials / Pro / Engine (schema still uses `route` / `river-room` / `blues-room` keys; Marketing $99 remains onboard-intent until a dedicated checkout path is added).

2. **Directory page** — Hero (region-first copy), GCS Natchez river hero image, “Claim Your Free Listing,” three-step “How it works,” testimonials block removed (placeholder quotes), pricing table copy de-jargoned.

3. **Hillbilly Dreams (corporate)** — `app/hillbilly/page.tsx` rewritten: Mississippi-rooted copy, GCS photography, links to Big Muddy Touring / Magazine / Radio / Deep South Directory, Tracy & Amy as equity partners, required closing line, `PoweredByFooter`.

4. **Technology / corridor** — New `app/measurably-better/technology/page.tsx` (“How the corridor works”) with flywheel copy and GCS photo; `app/measurably-better/page.tsx` consumer MBT landing; `app/measurably-better/life/page.tsx` redirects to `/dawn`.

5. **404** — Directory search via `NotFoundDirectorySearch` → `GET /api/directory/search`; featured listings from Prisma; library background preserved; links to home and `/directory`.

6. **API** — New `GET /api/directory/search`; `claim` route uses `apiLog` and corrected tier amounts.

7. **Admin mobile** — Bottom quick nav (Dash / HQ / Social / Events) for viewports ≤768px; extra content padding; Social page shell uses CSS variables and `max-width: min(900px,100%)`.

## Deferred / follow-up

- **Console → apiLog:** Migrated `directory/claim` (and `directory/search` uses `apiLog`). Remaining `console.*` in other `app/api/**` files can be migrated in a dedicated pass.
- **Hardcoded colors:** Directory and key sections updated toward tokens; full-repo grep cleanup for `apps/web/app/directory`, `gallery`, and `components` (non-admin) can continue incrementally.
- **Prisma `$transaction`:** `/api/directory/submit` already wraps creates + enrichment jobs in a transaction. No additional multi-write routes were identified as high-risk for this batch; `claim` flow intentionally separates Stripe calls from DB.

## Do not touch (verified)

- `outsider-economics-v2/` — not modified  
- `packages/database/prisma/schema.prisma` — not modified  
- `apps/web/app/api/dawn/chat/route.ts` — not modified  
- `scripts/media/` — not modified  
