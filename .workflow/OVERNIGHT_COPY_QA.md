# Cursor Overnight — P0 + P1 Copy Fixes QA

Date: 2026-04-16

## Gates

- `pnpm --filter @bigmuddy/web exec tsc --noEmit` — PASS
- `pnpm test:p0` — PASS (4 passed, 3 skipped)

## P0 checks

- Radio (`apps/web/app/radio/page.tsx`)
  - Removed mock recent-played array and dev note.
  - Replaced section with **What's On** + `/radio/shows` link.
  - Verification (`AzuraCast|MOCK|placeholder` in `radio/page.tsx`): **0 hits**.

- Gallery hero above fold
  - Added hero block and CTA links in `apps/web/app/gallery/GalleryPageClient.tsx`.
  - Added metadata title in `apps/web/app/gallery/page.tsx`.

- Entertainment CTA
  - Added dual CTA strip before closing image.
  - Added closing “Bring your music to the river.” + button.

- Directory onboard labels
  - `free` → Free Listing
  - `core` → Essentials ($25/mo)
  - `growth` → Pro ($50/mo)
  - `partner` → Marketing ($99/mo)
  - `/directory/onboard?tier=core` now maps to Essentials label.

## P1 checks

- Entity-name removal (`hillbillydreamsinc`) on consumer pages
  - Directory/touring/dashboard + additional public pages cleaned.
  - Verification with admin/ops excluded: **0 hits**.
  - Remaining hits exist only in `admin` pages.

- Bearsville copy cleanup
  - Replaced jargon copy.
  - Metadata updated to: **Bearsville Creative — Stories from the Hudson Valley**.
  - Added “Coming Summer 2026 · Follow along” CTA mail link.
  - Verification (`sovereign|node|stack|when available|will appear`): **0 hits**.

- DCTV copy cleanup
  - Replaced sovereign-stack line with public-access description.
  - Added **Get Involved** CTA section (Volunteer / Underwrite / Submit a Story).
  - Verification (`sovereign` in `dctv/page.tsx`): **0 hits**.

- Magazine jargon removal
  - Replaced “Proof from real builds” block with **From the Field** copy.
  - Verification (`mesh distribution|tourism rails|real builds`): **0 hits**.

- MBT eyebrow fix
  - Eyebrow changed to **Measurably Better**.
  - Intro now includes “Meet Delta Dawn — your personal guide to the Deep South”.

- New stubs created
  - `apps/web/app/tuthill/page.tsx`
  - `apps/web/app/studioc/page.tsx`
  - Verified both files exist.

## Requested verification commands summary

- `hillbillydreamsinc` in `apps/web/app` excluding admin/ops: **PASS (0 consumer hits)**
- `sovereign` in `apps/web/app` excluding admin: **NON-ZERO (pre-existing non-target routes such as `/store/sovereign-pi` and economics content)**
- `TBD` in `apps/web/app`: **NON-ZERO in admin/internal pages only**
- `MOCK|placeholder` in `apps/web/app/radio`:
  - `radio/page.tsx`: **PASS (0)**
  - other radio files still contain placeholder assets/comments (not part of this task)

## Do-not-touch policy

No edits made to:

- `outsider-economics-v2/`
- `packages/database/prisma/schema.prisma`
- `apps/web/app/api/dawn/chat/route.ts`
- `scripts/media/`
- `.env*`

