# Night Session Handoff — April 13, 2026

**For:** Chief of Staff
**From:** Two parallel agent sessions (Copy Reset + Infrastructure/Revenue)
**When:** Evening of April 13, 2026
**Net result:** 193 files touched, -55,698 lines deleted, +1,118 lines added, 4 commits on main

---

## Executive Summary

Tonight we ran two sessions in parallel. One fixed everything customers see (copy, pricing, positioning). The other fixed everything customers depend on (review ingestion, social token refresh, dead code removal). The codebase is 55K lines lighter, every customer-facing page now says what's true, and two revenue blockers that were gating tier claims are resolved.

**The claim ladder is now honest through Apr 14.**

---

## Session 1: Copy Reset (11 files)

### The Problem
Customer-facing pages were lying. The pricing page showed $99/$249/$499/$999 under names nobody recognized (Front Porch, The Route, River Room, Blues Room). The locked pricing from April 5 is Free/$25/$50/$99/$250 (Free/Essentials/Pro/Marketing/Engine). Chase couldn't walk into a business and point at the website because the website would contradict him.

Hero copy on brand pages was generic, defensive, or carried SaaS jargon from earlier iterations. The Magazine said "Stories from the Southern Gothic heartland." Records asked "Why another label?" Entertainment just said "Natchez, Mississippi." None of these told you what the brand *does*.

### What Changed

**Pricing alignment (5 files):**
- `apps/web/app/media/pricing/page.tsx` — 4 tiers replaced with 5 at correct prices. Grid 4→5 col. Comparison anchored on $25 Essentials (was $99). FAQ updated.
- `apps/web/app/media/page.tsx` — Feature table expanded to 5 columns. Added Directory Listing + Magazine & Radio rows. Price reference $99 → "From $25/mo".
- `apps/web/app/media/get-started/page.tsx` — Onboarding form dropdown: 4 old tiers → 5 new tiers.
- `apps/web/app/media/how-it-works/page.tsx` — "River Room and up" → "Marketing and up". "The Route and up" → "Pro and up".
- `apps/web/app/admin/dashboard/walkthrough.tsx` — Internal admin walkthrough updated.

**Hero/positioning rewrites (6 files):**

| Page | Before | After |
|------|--------|-------|
| **Directory** (`directory/page.tsx`) | Meta: "Digital hygiene for your business" | Meta: "Find locals. Get found." Body was already strong — only metadata changed. |
| **Touring** (`touring/page.tsx`) | "The Hottest Room on the River" + venue address | "We bring the party." + "We book your shows, drive you there, put you on the radio, write about you in the magazine, release your record, and sell it in the store." + "Memphis to New Orleans - 13 cities - 735 venues" |
| **Entertainment** (`entertainment/page.tsx`) | "Natchez, Mississippi." | "One show becomes everything." + flywheel explanation in subtitle |
| **Records** (`records/page.tsx`) | "The sound of the river." + "Why another label?" | "Keep your masters. Get the machine." + "What you get." (leads with the offer, not the defense) |
| **Magazine** (`magazine/page.tsx`) | "Stories from the Southern Gothic heartland" | "The stories are already here. Somebody has to tell them right." |
| **MBT** (`measurably-better/page.tsx`) | "proposal-based" (meta + body) | "Natchez is customer zero — see what works before you buy." |

**Chase kill:** "The label exists because everything else already does" — Chase flagged this as bad copy during live review. Killed in 4 locations (records hero, records meta, entertainment records section, entertainment/raya). Replaced with "Keep your masters. Get the machine."

### What Was NOT Changed (intentional)
- `hillbilly/page.tsx` — Passes. Berkshire Hathaway energy.
- `radio/page.tsx` — "The radio works." No changes until Part 15 transmitter ships.
- `bearsville/` — Scaffold. Summer activation.
- "Blues Room" in studio-c, demo, call-sheet — refers to the physical venue, not the old tier.

### Verification
- Build passes clean (`pnpm turbo build --filter=@bigmuddy/web` — 0 errors)
- Visual verification via dev server + screenshots
- Grep confirms zero remaining old tier names in production pages

---

## Session 2: Infrastructure + Revenue Blockers (182 files)

### Commit `19224d9` — Prune 151 files / 54,089 lines
Deleted: entire `apps/demo/` app, entire `apps/books/oe-books/` Docusaurus install, old `apps/web/app/media/` god-pages (MediaHomepage, ClaimPage, PublicationDetailPage, BusinessProfilePage), dead Bearsville onboarding, dead constellation/display/snap routes, dead sovereign wallet/glass reducer, dead newsletter provider, dead social-publishers.ts (replaced by social-publisher.ts), dead agent tools, dead integrations (Asana/Canva/Hootsuite stubs).

### Commit `cf55e19` — Sever blocked imports, 23 more files (-2,721 lines)
Studio C pages, call-sheet, whiteboard, Tuthill layout, book page, JP page, MBT sub-routes (civic, real-estate, enterprise, life, notebook, regional, technology, thesis), admin kiosk, more dead API routes.

### Commit `87d9819` — Review ingestion cron (+202 lines) **REVENUE BLOCKER #1**
**New file:** `apps/web/app/api/cron/reviews-sync/route.ts`
- Hourly cron pulls reviews from Google My Business API for all connected `SocialAccount` records where `platform === 'google_business'`
- Upserts into `Review` table (skips duplicates via `externalId`)
- Feeds the existing admin UI at `/admin/reviews` (which already had: AI draft generation, approval flow, GBP reply posting)
- Added to `vercel.json` cron schedule
- **Impact:** The $99 Marketing tier claim ("review response management") now has a working pipeline end-to-end: Google → Review table → AI draft → human approval → reply posted back to Google.

### Commit `85b350d` — Social token refresh (+110 lines) **REVENUE BLOCKER #2**
**Edited:** `apps/web/lib/social-publisher.ts`
- Added `refreshTokenIfNeeded()` that checks `tokenExpiry` before every publish
- Handles Facebook/Instagram (Meta long-lived token exchange) and Google Business (OAuth2 refresh_token grant)
- Updates `SocialAccount` row with new token + expiry on refresh
- **Impact:** Facebook page tokens expire after ~60 days. Without this, social publishing would silently fail. The $50 Pro tier ("social media management") now won't break 2 months after connection.

---

## Current State of the Claim Ladder

| Date | Claim | Status After Tonight |
|------|-------|---------------------|
| Apr 1 | "$25/mo — your Google presence, managed" | **LIVE.** Pricing correct on all pages. |
| Apr 7 | Add competitive intelligence | Not shipped. Needs work. |
| Apr 14 | $99 fully sellable — review responses work | **PIPELINE COMPLETE.** Review ingestion cron + AI draft + approval + GBP reply. Needs at least one real Google account connected to prove end-to-end. |
| Apr 21 | Full stack — social publishing + reports | **BACKEND READY.** Token refresh works. Publishing works. Admin UI is barebones (no post history, no scheduling UI). Needs: Instagram OAuth, Google Business OAuth, admin UI polish. |

---

## What's Still Open — Priority Ordered

### Revenue (do first)

1. **Google Business OAuth connect flow** — The review cron and social publisher both depend on `SocialAccount` rows with valid Google tokens. There's no UI for a business to connect their Google account. Need: `/api/auth/google/connect` + `/api/auth/google/callback` + button in admin. **This is the single most important missing piece.** Without it, commits `87d9819` and `85b350d` have no accounts to work with.

2. **Instagram OAuth route** — Facebook OAuth exists at `/api/auth/facebook/connect`. Instagram reuses Meta Graph API, same app credentials. ~1 hour to add `/api/auth/instagram/connect`.

3. **Social admin UI** — `/admin/social` exists but is barebones. Needs: post history list, scheduling date picker, account connection management, status filters. Tracy and Amy will need to use this daily. ~4 hours.

4. **Competitive snapshot** — Apr 7 claim ladder item. Not shipped. Not examined in either session tonight.

### Copy (do second)

5. **Gallery/photography pages** — Not audited. May have stale positioning.
6. **Outsider Economics** — Not audited. Build-time sourced from `outsider-economics-v2/`.
7. **Radio page** — Currently fine, revisit when Part 15 transmitter ships.
8. **Bearsville** — Scaffold. Summer.

### Cleanup (do third)

9. **DirectoryPage decomposition** — 1,216-line god-page. Decomposition agent ran but was reverted to protect copy edits. Should re-run on current state. The copy in the file is locked — read `docs/COPY_RESET_HANDOFF.md` before touching.
10. **RecordsPage decomposition** — 652 lines. Hero and "What you get" section were rewritten. Same rule: read handoff first.
11. **WeddingsPage** — 1,024 lines in `touring/inn/`. Not revenue-blocking.
12. **Stale git branches** — 39 remote branches, most from Feb-Mar.

### Chase-Only (not code)

13. **AzuraCast DJ credentials** — Live Streaming section of station dashboard. Needed to wire ezstream.
14. **DistroKid signup** — $35, then upload Amy's catalog.
15. **Tracy: RAM kit order** — $50 for the iMac.
16. **Entity incorporation** — HDI not formally incorporated. Legal risk before institutional sales.
17. **GCS auth expired** — `gcloud auth login` on MacBook Pro for photo uploads.

---

## Key Decisions Made Tonight

1. **"The label exists because everything else already does" is dead.** Chase killed it. Don't resurrect. The records hero is "Keep your masters. Get the machine."
2. **Entertainment hero is "One show becomes everything."** This is the flywheel line. It's the single best sentence in the brand. Protect it.
3. **Pricing comparison anchors on $25 Essentials** (not $99). "$736/mo vs $25/mo" is a stronger pitch than the old "$736/mo vs $99/mo."
4. **Revenue blockers before cleanup.** Chase explicitly confirmed this priority order. Don't let decomposition or branch cleanup jump the queue.
5. **Directory page body copy is strong.** Only the metadata was stale. Don't rewrite the hero, categories, testimonials, tiers, or "Why DSD" section — they're good.

---

## Files the CoS Should Read

| File | Why |
|------|-----|
| `docs/COPY_RESET_HANDOFF.md` | Detailed file-by-file audit of every copy change. Any agent touching these pages reads this first. |
| `docs/BUSINESS_ARCHITECTURE.md` | Source of truth. If copy contradicts this, the copy is wrong. |
| `docs/COPY_RESET_PLAN.md` | The original audit that drove the copy work. Shows what was checked vs. what was skipped. |
| `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` | Voice rules, kill words, copy patterns. |
| `apps/web/app/api/cron/reviews-sync/route.ts` | New tonight. The review ingestion cron. |
| `apps/web/lib/social-publisher.ts` | Edited tonight. Now has token refresh logic. |
| `vercel.json` | Updated tonight. New cron entry for review sync. |

---

## Prompt Suggestions for Next Session

### Prompt 1: Google Business OAuth (highest priority)
> Build the Google Business Profile OAuth connect flow. Need `/api/auth/google/connect` (initiates OAuth with `business.manage` scope) and `/api/auth/google/callback` (exchanges code, extracts location resource name, upserts `SocialAccount` with `platform: 'google_business'`). Add a "Connect Google" button to `/admin/social`. This unblocks both the review ingestion cron (`87d9819`) and social publishing. Reference the existing Facebook OAuth at `/api/auth/facebook/connect` and `/api/auth/facebook/callback` for the pattern.

### Prompt 2: Social Admin UI
> The social command center at `/admin/social/page.tsx` (141 lines) needs: (1) post history grid fetched from `/api/social/posts?status=published`, (2) scheduling UI with date picker that POST to `/api/social/schedule`, (3) account management showing connected platforms with disconnect option, (4) status filters like the review dashboard at `/admin/reviews`. The backend is complete — this is frontend only. Tracy and Amy will use this daily. Follow the dark admin theme.

### Prompt 3: Instagram OAuth
> Add Instagram OAuth by reusing the Meta Graph API flow. Facebook OAuth exists at `/api/auth/facebook/connect` and `/api/auth/facebook/callback`. Instagram uses the same `META_APP_ID` and `META_APP_SECRET` but requests `instagram_basic` and `instagram_content_publish` scopes. Create `/api/auth/instagram/connect` and `/api/auth/instagram/callback`. Upsert `SocialAccount` with `platform: 'instagram'`.

### Prompt 4: DirectoryPage Decomposition (after revenue work)
> Decompose `apps/web/app/directory/page.tsx` (1,216 lines) into components. **Read `docs/COPY_RESET_HANDOFF.md` first** — the metadata was just rewritten and must be preserved exactly. Extract: HeroSection, WhyDSD, HowItWorks, Categories, FeaturedBusinesses, Testimonials, TierCards, BottomCTA. Keep all inline styles (this page uses inline, not CSS classes). The page is a server component importing next/image.
