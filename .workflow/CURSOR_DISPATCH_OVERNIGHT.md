# CURSOR DISPATCH — Overnight Sprint

**Date:** April 6, 2026
**Priority:** Ship before April 10 freeze
**Gate:** `pnpm --filter @bigmuddy/web exec tsc --noEmit` must pass after each task

---

## 1. DSD Homepage Image Audit (P0)

Replace all AI-generated / stock / placeholder images on customer-facing pages with real photos from GCS.

Check these pages:
- `/` (DSD homepage) — category cards have bad images
- `/directory` — any placeholder photos
- `/store/sovereign-pi` — verify GCS images load

Photos are now at `gs://bmt-media-bigmuddy/photos/auto/` — 23 WebP files from Chase's camera roll with GPS coordinates.

Use `https://storage.googleapis.com/bmt-media-bigmuddy/photos/auto/IMG_3588.webp` format for GCS URLs.

Rules from `docs/ops/PHOTO_PROCESSING_SPEC.md`:
- No over-sharpened photos
- No AI-generated people
- No stock photography
- Warm, natural look
- Check orientation (no sideways images)

## 2. Commit Uncommitted Cursor Changes

These files are modified but not committed:
- `apps/web/app/directory/page.tsx`
- `apps/web/app/layout.tsx`
- `apps/web/app/store/sovereign-pi/page.tsx`
- `apps/web/app/touring/inn/tv/page.tsx`
- `apps/web/components/DeltaDawnWidget.tsx`
- `apps/web/components/explorer/nodes.ts`

Review, commit with descriptive message, push.

## 3. Constellation Seed — Fix O(n²) Proximity

The constellation seed script (`scripts/graph-lab/seed-constellation.ts`) takes too long with 5,600+ nodes because it does O(n²) distance comparisons.

Fix: Skip the proximity edge calculation for now. Only create these edge types:
- `corridor_city` (entity → city)
- `directory_link` (venue/hotel/restaurant → DirectoryBusiness)
- `route_stop_venue` / `route_stop_hotel` (route → stops)
- `route_sequence` (consecutive stops)
- `hierarchy` + `flywheel` (brand nodes)

This gets the constellation seeded in seconds instead of hours. Proximity edges can be added later with a PostGIS query or spatial index.

After fixing, run:
```bash
pnpm --filter @bigmuddy/database run seed:constellation
pnpm --filter @bigmuddy/database run refresh:constellation-views
```

## 4. DSD Onboarding Flow Test

Visit `deepsouthdirectory.com/directory/onboard` and verify:
- Form loads
- All fields work
- Submit doesn't error
- Mobile layout (375px) doesn't overflow

If the route doesn't exist, create a basic onboarding page at `apps/web/app/directory/onboard/page.tsx`.

## 5. Admin Dashboard Mobile

The admin dashboard at `/admin` overflows on mobile (375px). Fix:
- Tables need horizontal scroll
- Cards need single-column layout
- Navigation needs hamburger or collapse

## 6. Press Article QA

Run through all 14 press articles at `/press/`:
- Verify no duplicate images (script already checked)
- Verify pricing shows $25 (not $20)
- Verify "INTERNAL USE ONLY" banner on each
- Verify no broken image links (404 on any src)

## 7. Type Check + Build

After all changes:
```bash
pnpm --filter @bigmuddy/web exec tsc --noEmit
pnpm --filter @bigmuddy/web build
```

Both must pass before pushing.

---

## DO NOT TOUCH

- `apps/web/app/api/dawn/chat/route.ts` — just fixed, tools wired
- `apps/web/app/api/voice/stream/route.ts` — Siri auth bypass live
- `apps/web/app/api/grok/chat/route.ts` — tool execution loop fixed
- `packages/database/prisma/schema.prisma` — constellation models added
- `scripts/media/` — photo pipeline, scrapers
- `docs/adr/` — ADR-001, 002, 003

## CONTEXT

- 5,605 businesses in DB across 13 corridor cities
- 735 venues, 660 hotels, 1,571 restaurants
- Census data loaded for 11 cities
- Delta Dawn chat + voice both have 10 database tools
- Siri shortcut downloadable at /DeltaDawn.shortcut
- Media pipeline running via launchd every 30 min
- Tracy + Amy have 12 Asana tasks for testing tonight
