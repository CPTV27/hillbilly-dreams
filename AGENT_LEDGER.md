# AGENT_LEDGER.md
> Coordination log for the SuperChase federated agent swarm.
> Read before acting. Write after completing.
> Agents: CC (Claude Code) | AG (Antigravity) | GA (Google AI)

---

## [2026-03-18 22:30] — CC — IN_PROGRESS

**Task:** Big Muddy Ecosystem Build-Out — Delta Dawn Upgrade + Talent Pipeline + Database Population + Revenue Analysis + Splash Page Redesign

### Work Completed:
1. **Delta Dawn Brain Upgrade** — Rewrote `/apps/web/app/api/ops/chat/route.ts`:
   - Upgraded from claude-3-haiku to claude-sonnet-4-20250514
   - Expanded system prompt from inn-only to full 7-brand ecosystem knowledge
   - Added dynamic database context injection (clients, events, articles, playlists, reviews)
   - Added intent detection for content creation, revenue queries, show prep, etc.
   - 9 parallel Prisma queries for live context, graceful degradation if DB unavailable

2. **Talent Pipeline Schema** — Added 4 new Prisma models:
   - `Artist` — talent roster with genre, source, Rise Up cohort tracking
   - `Showcase` — showcase event containers (Ground Zero, B.B. King's, Blues Room)
   - `ShowcaseSlot` — artist↔showcase join table with set order and performance status
   - `TourStop` — individual tour dates with guarantee/door deal financials
   - All validated with `prisma generate`

3. **Database Population** — Created seed scripts:
   - `scripts/seed-natchez-businesses.ts` — 35 real businesses (12 restaurants, 6 venues, 7 hotels, 6 attractions, 3 shops) across Natchez, Clarksdale, Memphis
   - `scripts/seed-natchez-contacts.ts` — 7 key contacts (Regina Charboneau, Morgan Freeman, Bill Luckett, Tracy, Amy, Arri, Chase)
   - All as prospects pending outreach

4. **Revenue Analysis** — Pulled real financials from Google Drive:
   - Year 2 actual: $78K revenue, -$22K NOI
   - $760K Lean & Mean target gap: $632K (17% of target)
   - Directory MRR is the $288K engine — need 100 clients across 18 cities
   - Modeled conservative (52 clients/$118K), base (100/$310K), aggressive (165/$535K) scenarios

5. **Splash Page Redesign** — Rewriting `/apps/web/app/media/page.tsx`:
   - Added: Delta Dawn AI showcase section
   - Added: 7-brand ecosystem flywheel visualization
   - Added: Rise Up talent pipeline (Discover → Showcase → Tour → Promote → Grow)
   - Kept: pricing tiers, value props, moat section (added 5th card for Delta Dawn)

### Files Changed:
- Modified: `/apps/web/app/api/ops/chat/route.ts` — Delta Dawn full rewrite
- Modified: `/packages/database/prisma/schema.prisma` — 4 new models (Artist, Showcase, ShowcaseSlot, TourStop)
- Created: `/scripts/seed-natchez-businesses.ts` — 35 business seed data
- Created: `/scripts/seed-natchez-contacts.ts` — 7 contact seed data
- Modified: `/apps/web/app/media/page.tsx` — Full splash page redesign (in progress)

### Dependencies:
- Seed scripts need `DATABASE_URL` set and `npx tsx scripts/seed-natchez-businesses.ts` run
- Schema changes need `prisma migrate dev` to apply to database
- Delta Dawn upgrade needs `ANTHROPIC_API_KEY` for claude-sonnet-4-20250514

### Next:
- AG: Build Three.js/React visualizations for the ecosystem flywheel and talent pipeline
- GA: Process podcast assets per previous ledger entry, use new Artist model for talent tracking
- CC: Wire onboarding wizard to API, build admin CRUD for Artist/Showcase models, Vertex AI content cross-referencing

**Status:** IN_PROGRESS

---

## [2026-03-18 21:15] — CC — WAITING_ON_GA

**Task:** Big Muddy Radio — Podcast Episodes + Amy Allen Performance — Full Production Pipeline

### Assets in Google Drive: `Big Muddy Content / Raw` (ID: `1ClEfsehikai7GxoBx9xXH-xbS4YWNjYq`)

**Audio:**
- `2026_0317_1537.mp3` — Episode 1 RAW audio (26:27, mono, 192kbps). CC has mastered version locally (`2026_0317_1537_mastered.mp3`) at -16 LUFS podcast standard. Mastered version needs upload.
- `2026_0318_1654-esv2-90p-bg-10p-music-10p.wav` — Episode 2 RAW audio (208.7MB WAV, recorded today). Needs mastering: loudnorm -16 LUFS, compression, EQ, noise gate, same chain as Ep1.
- Transcript for Ep1: Google Doc `2026_0317_1537` (ID: `1Oms3KJxup1Qn7r38aWUOucxwo1ZIqfXZ8bdFQj0PmQM`)

**Video:**
- `DCIM/100MSDCF/` — 20 Sony ARW raw photos (FOR03326-FOR03345). Parlor/Inn/performance shots. Need: develop from RAW, color grade to Big Muddy editorial aesthetic (warm, slightly desaturated, Southern Gothic), export as high-res JPEG + web-optimized WebP.
- `B013_6J0Y12/` — Blackmagic camera card folder (currently empty — MOVs may still need upload from camera card). These are Amy Allen solo performance video files.
- Amy Allen additional assets in `ChaseBigMuddy` shared folder:
  - `Amy Allen Brand Package` (ID: `1s2Nzz0OXGrd7I9wmekMz-mN1kEzjANXG`)
  - `AmyAllenPhotos` (ID: `1yUkrZzdpaHXfzqecwTrDXnZhoQqYsPuK`)
  - `Amy Allen Vids` (ID: `1d-DfgrMoQ-uY1vc0JntZ9p_xZfwqShvc`)
  - `Amy Allen logo final` (ID: `1oocM-STSrmRcmO5VNYxT7PQxSYrRlgGS`)
  - `b&BluesClips` (ID: `1msbNq8bOS3VzdCr4RgXIdq_yhMx9xBYC`)

**Brand Assets:**
- `Big Muddy Primary Logo - Ivory-01.jpg` — 3000x3000, ivory on white (use on dark backgrounds)
- `Big Muddy Tagline-Ivory-01.jpg` — 7365x1441
- `Big Muddy - Beds and Blues - Ivory-01.jpg` — 7365x2641
- `The Big Muddy Brand Package` (ID: `1BhMX1D4eUPBZdLJ8VZLJ-U5d_lwQz2iW`)

### GA Processing Instructions

#### 1. PODCAST EPISODE 1 — Full Video
- **Source:** Mastered audio (needs upload) + B-roll from Sony ARWs + any available video from `Amy Allen Vids` or `b&BluesClips`
- **Transcript summary:** Origin story — Amy & Tracy discover Natchez through Regina Charboneau's biscuit class, take American Queen cruise, find 411 N Commerce, start Big Muddy Inn, launch Bubbles Bites & Blues excursion. Chase talks about rediscovering the South after 25 years in NYC. Discussion of Natchez community, culture, music, food (including gas station fried chicken).
- **Title card:** "Radio Big Muddy — Episode 1: How We Got Here"
- **Lower third:** "Amy Allen & Tracy Allen — The Big Muddy Inn, Natchez MS" / "Chase Pierson — Big Muddy Media"
- **Style:** Warm, intimate, Southern Gothic editorial. Gold accent (#C8943E) on dark backgrounds (#0a0f1a). Use Big Muddy logo watermark bottom-right.
- **Output:** Full episode video → `Ready` folder (ID: `1VBrFHnsxhlPHEItH8LlvwNlZnOSKNxV9`)

#### 2. PODCAST EPISODE 2 — Master & Produce
- **Source:** `2026_0318_1654-esv2-90p-bg-10p-music-10p.wav`
- **Audio mastering chain:** High-pass 80Hz → Low-pass 14kHz → Noise gate (-35dB threshold, 2:1 ratio) → Compressor (-24dB threshold, 3:1 ratio, 10ms attack, 200ms release, 6dB makeup) → EQ (cut 250Hz -3dB, boost 3.5kHz +3dB, boost 5kHz +2dB) → Loudnorm -16 LUFS / -1.5 TP / 7 LRA → Limiter -1dB
- **Video:** Same treatment as Ep1 once video assets are available

#### 3. SIZZLE REEL — Marketing Clips
Cut from Episode 1 transcript — best moments for social:
- **30s clip:** "The Magic of the Blues Room" — Starting at the section about how people from all over come in and "all of a sudden it's a tiny little community and it's magic"
- **60s clip:** "The Regina Story" — The phone call where Regina answers from a boat with Andrew Zimmern, promises to call back, and actually does
- **60s clip:** "How We Got Here" — The opening where they explain the show is about building friendships and making memories in the Deep South
- **30s clip:** "Gas Station Fried Chicken" — Chase discovering Dodge's fried chicken at midnight
- **Format:** 9:16 vertical for TikTok/Reels + 16:9 horizontal for YouTube. Captions burned in. Big Muddy branding. Gold accent color.
- **Output:** → `Clips` folder (ID: `1_jWzsDzURMOaEMKFiLHkXosCiIaKvKJ5`)

#### 4. SONY ARW PROCESSING
- Develop all 20 ARW files from `DCIM/100MSDCF/`
- Color grade: warm tones, slightly lifted blacks, desaturated greens, editorial feel matching Chase's Lightroom/DxO DeepPRIME aesthetic
- Export: Full-res JPEG + 1920px-wide WebP at quality 85
- Output: → `Ready` folder, subfolder `Photos`

### Pipeline Folders
| Folder | ID | Purpose |
|--------|----|---------|
| Raw | `1ClEfsehikai7GxoBx9xXH-xbS4YWNjYq` | Source assets (current) |
| Clips | `1_jWzsDzURMOaEMKFiLHkXosCiIaKvKJ5` | Social clips, sizzle reels |
| Ready | `1VBrFHnsxhlPHEItH8LlvwNlZnOSKNxV9` | Approved for posting |
| Posted | `1m1WJ8Vj63wfobe_61ulEZs0uw7LsOCxq` | Archive |

**Dependencies:** Mastered Ep1 MP3 needs upload to Raw. Blackmagic MOVs may need upload from camera card.
**Next:** GA picks up, processes all assets, outputs to Clips + Ready
**Status:** WAITING_ON_GA

---

## [2026-03-18 20:30] — CC — COMPLETE

**Task:** Built Rise Up landing page for Outsider Economics + fixed DSD hero image orientation
**Files Changed:**
- Created `/apps/web/app/economics/rise-up/page.tsx` — Full Rise Up program page with hero, problem section, 5-phase process, what-you-get exchange cards, production partners (StudioC.video, TuthillDesign.com), network directory, apply CTA
- Modified `/packages/config/brands.ts` — Added "Rise Up" to economics nav links
- Fixed `/apps/web/public/images/dsd/hero-mainstreet.webp` — Rotated from sideways to correct orientation
**Dependencies:** None
**Next:** Deploy with next push
**Status:** COMPLETE

---

## [2026-03-18 20:15] — CC — COMPLETE

**Task:** Mastered podcast Episode 1 audio to broadcast standard
**Files Changed:**
- Created `/Users/chasethis/Downloads/2026_0317_1537_mastered.mp3` — Mastered from -21.7 LUFS to -15.6 LUFS, LRA 5.8→3.2, HPF 80Hz, compression 3:1, EQ vocal presence boost, loudnorm -16 LUFS target
**Dependencies:** Needs upload to Google Drive Raw folder
**Next:** GA uses mastered audio for Episode 1 video production
**Status:** COMPLETE

---
