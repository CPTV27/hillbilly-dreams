# Handoff: beautiful-blackwell worktree

**From:** Chase's session (2026-03-30)
**To:** Huck
**Worktree:** `.claude/worktrees/beautiful-blackwell`
**Branch:** `claude/beautiful-blackwell`

---

## What's Built (Uncommitted)

### Video Production Pipeline — "Big Muddy Entertainment Publicity & Promotions Department"

A complete production pipeline for managing 27 promo video scripts across 6 campaign concepts. Replaces Asana. Everything runs through `/admin/productions`.

#### Database (3 new Prisma models)

**File:** `packages/database/prisma/schema.prisma` (appended at end)

| Model | Purpose |
|---|---|
| `ProductionCampaign` | 6 campaign concepts (Fits In Your Hand, Twenty Dollars, The Corridor, Built on Google, Freedom, The Full Story) |
| `ProductionJob` | One per video script. Tracks stage (script → voiceover → video → review → published), script fields, voice/video settings, async Veo operation ID, approval status |
| `ProductionArtifact` | Every generated file — versioned, append-only, with GCS URL and metadata |

Prisma client is generated. **Migration has NOT been run against the live DB yet.**

#### API Routes (8 files)

All under `apps/web/app/api/productions/`:

| Route | Method | What it does |
|---|---|---|
| `route.ts` | GET/POST | List all jobs (filter by campaign/stage), create job |
| `[id]/route.ts` | GET/PATCH | Get job detail with artifacts, update fields |
| `[id]/voiceover/route.ts` | POST | Generate TTS via Google Cloud TTS → upload to GCS → create artifact → auto-advance stage |
| `[id]/video/route.ts` | POST | Start Veo 3.1 generation → store operation ID on job |
| `[id]/video/status/route.ts` | GET | Poll Veo operation → on complete: download video, upload to GCS, create artifact, clear operation ID, advance to review |
| `[id]/approve/route.ts` | POST | Set approval status (approved/revision/pending) with notes. Approved → published. Revision → back to video. |
| `campaigns/route.ts` | GET/POST | List/create campaigns |
| `seed/route.ts` | POST | Seed the 6 campaign concepts |

**Voiceover and video routes reuse the same Google Auth + TTS/Veo patterns** from `app/api/media/audio/route.ts` and `app/api/media/video/route.ts` but add Prisma artifact tracking and structured GCS paths.

**GCS path convention:** `productions/{campaign-slug}/{job-slug}/{type}-v{version}-{timestamp}.{ext}`

#### Admin Pages (3 files)

All under `apps/web/app/admin/productions/`:

| Page | What it does |
|---|---|
| `page.tsx` | Pipeline board — table of all jobs with stage filter pills, campaign dropdown, stage counts. Click row → detail. Seed button if no campaigns. |
| `[id]/page.tsx` | Job detail — stage stepper, script editor, TTS generator with audio player, Veo generator with 10s polling spinner, review panel with approval controls, artifact history table |
| `new/page.tsx` | Create job form — campaign selector, format, all script fields, voice/video settings |

#### Nav Update

**File:** `apps/web/app/admin/layout.tsx`
- Added `{ label: 'Productions', href: '/productions', icon: '▶' }` to the **Create** nav section

---

## Deployment Steps

```bash
# 1. Run migration against live DB
npx prisma migrate dev --name add-productions

# 2. Commit
git add -A
git commit -m "feat: Video production pipeline — admin dashboard, API routes, 3 Prisma models"

# 3. Push and PR
git push -u origin claude/beautiful-blackwell
gh pr create --title "Video production pipeline" --body "..."

# 4. After deploy
# Go to /admin/productions → click "Seed 6 Campaign Concepts"
```

---

## Verification

1. Migration applies cleanly
2. `POST /api/productions/seed` creates 6 campaigns
3. Create a job via `/admin/productions/new`
4. Generate voiceover — audio plays in browser, artifact appears in GCS
5. Generate video (draft quality) — polling shows spinner, completes
6. Approve the job — status updates to published
7. GCS files at `productions/{campaign}/{job}/` paths

**TypeScript:** Compiles clean. No errors in production files.
**Dev server:** All pages return 200. API routes resolve correctly (500s are expected — no DATABASE_URL in worktree).

---

## Queued Tasks (Not Started)

### 1. Monthly Burn Audit Page
- **Priority:** High — Chase wants this as a top-line item in admin finance section
- **Location:** `/admin/finance/burn` or integrated into existing `/admin/finance` page
- **What it needs:** Pull real costs from Stripe, Vercel, GCS, Vertex AI, Neon, etc.
- **Existing finance page:** `apps/web/app/admin/finance/page.tsx` — 731 lines, full UI with MOCK DATA. Comment on line 366: "Mock Data Active — Awaiting Stripe backend from CC"
- **QBO integration exists:** `app/api/cron/sync-qbo/route.ts` — fetches P&L nightly
- **Known costs to track:** Neon (~$19/mo), orphaned Cloud SQL (~$8/mo — DELETE THIS), Vercel Pro, GCS per GB, Vertex AI per token, Stripe 2.9% + 30¢, internet, phone plans

### 2. Fix Touring Homepage Images
- **File:** `apps/web/app/touring/page.tsx` lines 184, 187
- **Problem:** Two images too similar in perspective (both Southern porch/inn shots)
- **Images:**
  - `touring-bnb-sunset.webp` — "Southern porch with hanging ferns at sunset"
  - `touring-inn-dusk.webp` — "Historic inn at dusk with warm lights"
- **Fix:** Generate a replacement with a different perspective (Main Street, river bluff, interior, aerial) and swap the GCS URL

### 3. ElevenLabs TTS Integration
- **Priority:** Medium — Chase has credits to burn, wants to test against Google TTS side-by-side
- **API Key:** Chase is adding `ELEVENLABS_API_KEY` to Bitwarden + Vercel
- **Integration point:** `apps/web/app/api/media/audio/route.ts` — add ElevenLabs as second provider
- **Approach:** Add `provider: 'google' | 'elevenlabs'` param to the audio route. ElevenLabs voices get their own presets. Production pipeline voiceover stage gets a provider toggle.
- **ElevenLabs advantage:** Voice cloning (clone Chase's voice for promo narration), better emotional range for storytelling
- **Google advantage:** Cheaper (bundled), lower latency, fine for radio automation
- **Goal:** Test both on same script, compare quality, then decide whether to keep ElevenLabs subscription
- **Data policy:** ElevenLabs is fine for voice generation — no proprietary data concerns (just scripts)

### 4. Client Billing Hookup
- **Stripe is integrated** (v20.4.1, webhook route exists, Invoice model in Prisma)
- **Finance page UI is ready** but loads mock data
- **Need:** Wire Stripe API calls into finance page, connect to real Invoice data

---

## Context Notes

- **Goal: Get off Asana.** All production management goes through the admin dashboard. No external tools.
- **Crossover Milestone:** 5 gates before Chase stops building and starts using the product. See `memory/project_crossover_milestone.md`. Gate #3 (personalized dashboard) is the biggest gap. Gate #4 (end-to-end campaign) is what this pipeline enables.
- **Monday 3/31:** Chase is doing Google account consolidation + user onboarding testing. All tests must pass before opening onboarding.
- **Walmart/OE:** Editorial position updated — Walmart reframed from enemy to qualified ally. See `memory/project_oe_walmart_position.md`.
- **Internet:** Need to check AT&T Fiber availability at 411 N Commerce. See Apple Note "Internet Plan — 411 N Commerce".
- **Phone:** Chase keeping FirstNet ($50/mo unlimited) but comparing with Tracy's Friends & Family plan.

---

## Key Files

| File | What |
|---|---|
| `packages/database/prisma/schema.prisma` | 3 new models at end of file |
| `apps/web/app/api/productions/**` | 8 API route files |
| `apps/web/app/admin/productions/**` | 3 admin page files |
| `apps/web/app/admin/layout.tsx` | Nav item added |
| `apps/web/app/admin/finance/page.tsx` | Existing finance page (mock data) |
| `apps/web/app/touring/page.tsx` | Two similar images to fix (lines 184, 187) |
| `.claude/agents/AG_PROMO_VIDEO_CAMPAIGN.md` | 27 scripts across 6 concepts |
| `memory/project_crossover_milestone.md` | 5-gate crossover checklist |
| `memory/project_oe_walmart_position.md` | Walmart editorial position |
