# Big Muddy Touring — Computer Handoff Document

**Prepared for:** Chase Pierson, Showrunner  
**Date:** March 4, 2026  
**Purpose:** Complete project state transfer to new Perplexity Computer instance

---

## 1. USER INSTRUCTIONS (paste these into the new Computer's memory)

The new Computer needs these rules stored in memory. Copy each one:

- Chase's title is **"Showrunner"** — NOT CEO, founder, or manager. Always use this.
- Amy Allen's stage name is **Arrie B. Aslin** (A-R-R-I-E B. A-S-L-I-N) — always use stage name in public materials.
- Brand is **"Big Muddy Touring"** — NOT "Big Muddy Network" (deprecated).
- The inn partnership with Amy and Tracy is **FINALIZED** — never use pitch/exploratory language.
- Brand aesthetic: **Southern Gothic sophistication** — dark, moody, editorial. Blues and warm gold. "Think whiskey-stained magazine, NOT SaaS dashboard, NOT Swiss/corporate."
- Brand colors: Background #1a1816, Surface #231f1c, Text cream #f0ebe0, Accent Gold #c8943e, Slate #4a6274
- Typography: Playfair Display (headings), DM Sans (body)
- "The ecosystem is the moat" — no single piece is the competitive advantage alone.
- **Google ecosystem preference**: "Since I have a Google Ultra account, it's preferable to do everything inside the Google ecosystem wherever possible."
- **We are building the entire Big Muddy platform ourselves** — NOT handing off to Elijah.
- **Don't ask Chase to paste secrets directly** — have him store them via Cloud Shell commands.
- Chase has **two Google accounts**: chase@scan2plan.io (also chase@scantoplan.io) and me@chasepierson.tv. The Big Muddy project (bigmuddy-ff651) is under me@chasepierson.tv. CPTV27 GitHub org is also under chasepierson.tv identity.
- **"Memphis to New Orleans" is the brand headline** — the core marketing narrative that resonates. The 18-city network is the full territory.
- **Images should be landscapes, mist, sunsets, sunrises** — things that inspire adventure and exploration. NOT property photos or venue shots for hero images.
- **/inn route = corridor-wide hospitality guide** covering where to stay across all 18 cities. NOT a duplicate of thebigmuddyinn.com which handles the actual property.
- Chase wants to use a **Google Cloud Storage bucket** for image hosting on the Big Muddy site, with an admin panel upload UI featuring a gallery with albums for different image types. For now images go in public/ in the repo, but we'll migrate to GCS bucket in a future session.

---

## 2. PROJECT ARCHITECTURE

### The Four Brands (one platform, four faces)
| Brand | Domain | Purpose |
|-------|--------|---------|
| Big Muddy Touring | bigmuddytouring.com | Hub — connects everything |
| Big Muddy Magazine | bigmuddymagazine.com | Long-form editorial, city guides |
| Big Muddy Radio | bigmuddyradio.com | Curated playlists, live sessions from the Blues Room |
| Big Muddy Inn | thebigmuddyinn.com | The physical property in Natchez (separate from /inn route on platform) |

### Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **Monorepo:** Turborepo + pnpm workspaces
- **Hosting:** Firebase App Hosting (region us-east4)
- **GCP Project:** bigmuddy-ff651 (under me@chasepierson.tv)
- **Firebase Backend:** bmt
- **Live URL:** https://bmt--bigmuddy-ff651.us-east4.hosted.app
- **Database:** Neon PostgreSQL (Supabase project "BigMuddyPlatform", ref: bfzshizqviolheiceosl)
- **ORM:** Prisma (schema defined, pages NOT yet wired — using static data arrays)
- **GitHub:** CPTV27/bmt (private, auto-deploys on push to main)
- **Next.js config:** `images.unoptimized: true` in next.config.mjs

### Repo Structure
```
bmt/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── layout.tsx              # Root layout
│       │   ├── globals.css             # Global styles
│       │   ├── touring/
│       │   │   ├── page.tsx            # Touring homepage (main landing)
│       │   │   ├── layout.tsx          # Touring layout
│       │   │   ├── inn/
│       │   │   │   └── page.tsx        # Corridor-wide hospitality guide (18 cities)
│       │   │   └── route/
│       │   │       └── page.tsx        # Route page (Memphis→NOLA + network)
│       │   ├── magazine/
│       │   │   └── page.tsx            # Magazine homepage
│       │   ├── radio/
│       │   │   └── page.tsx            # Radio homepage
│       │   ├── admin/                  # Admin panel (stub)
│       │   └── api/                    # API routes
│       └── public/
│           └── images/
│               ├── heroes/             # ⚠️ NEEDS IMAGES PUSHED (see Section 5)
│               ├── fleet/              # ⚠️ NEEDS IMAGES PUSHED (see Section 5)
│               ├── generated/          # AI-generated scene images
│               ├── magazine/           # City guide hero images
│               ├── real/               # Actual property photos
│               ├── touring/            # Touring-specific images
│               ├── command/            # Command center images
│               └── textures/           # Background textures
├── packages/
│   ├── ui/                             # Shared components (@bigmuddy/ui)
│   └── config/                         # Shared types/config (@bigmuddy/config)
├── apphosting.yaml                     # Firebase App Hosting config
├── firebase.json
├── turbo.json
├── package.json
└── pnpm-lock.yaml
```

---

## 3. THE 18 CITIES

### Core Corridor (Memphis → New Orleans)
1. Memphis, TN
2. Clarksdale, MS
3. Vicksburg, MS
4. Natchez, MS (home of The Big Muddy Inn)
5. New Orleans, LA

### Louisiana Network
6. St. Francisville, LA
7. Baton Rouge, LA
8. Lafayette, LA
9. Alexandria, LA
10. Monroe, LA
11. Ruston, LA
12. Natchitoches, LA
13. Shreveport, LA

### Arkansas & Missouri
14. El Dorado, AR
15. Little Rock, AR
16. Fayetteville, AR
17. Bentonville, AR
18. Branson, MO

---

## 4. FLEET VEHICLES

Three vehicles in the Big Muddy fleet:
1. **Ford Transit 350** high-roof — crew/gear van
2. **Prevost H3-45** tour bus (90s/early 2000s model) — full touring (goal: acquire within next year)
3. **Tesla Model 3** (4-door) — advance work/day runs

---

## 5. CRITICAL: IMAGES NOT YET PUSHED

### Status
The page source code (commit `25dc323`) references fleet and hero images, but the actual image files have NOT been pushed to the repo yet. The site will show broken images until these are pushed.

### Files needed in repo
**`apps/web/public/images/heroes/`** (4 files):
- hero-bayou-mist.webp (187KB)
- hero-highway-sunset.webp (106KB)
- hero-mississippi-dawn.webp (93KB)
- hero-ozarks-sunrise.webp (185KB)

**`apps/web/public/images/fleet/`** (11 files):
- fleet-ford-transit.webp (195KB) — Transit at Delta cotton field
- fleet-prevost-bayou-bridge.webp (190KB) — Prevost crossing bayou bridge
- fleet-prevost-french-quarter.webp (242KB) — Prevost in French Quarter, NOLA
- fleet-prevost-tour-bus.webp (169KB) — Prevost on mossy Southern road
- fleet-prevost-vicksburg-battlefield.webp (216KB) — Prevost at Vicksburg battlefield
- fleet-tesla-lafayette-cajun.webp (277KB) — Tesla in Lafayette downtown
- fleet-tesla-model-3.webp (155KB) — Tesla at river with cypress trees
- fleet-tesla-natchez-bluff.webp (235KB) — Tesla at Natchez bluff overlook
- fleet-transit-beale-street.webp (182KB) — Transit on Beale St, Memphis
- fleet-transit-clarksdale-crossroads.webp (177KB) — Transit at Hwy 61/49 crossroads
- fleet-transit-ozarks-highway.webp (113KB) — Transit on Ozark mountain highway

### How to push
A zip file (`bmt-images.zip`, 2.7MB) was shared with Chase. It has the exact repo directory structure. From the repo root:
```bash
unzip ~/Downloads/bmt-images.zip
git add apps/web/public/images/heroes/ apps/web/public/images/fleet/
git commit -m "Add fleet and hero images"
git push origin main
```

### Where fleet images appear on each page
| Page | Fleet Image(s) | Placement |
|------|----------------|-----------|
| Touring | fleet-transit-beale-street.webp | Between hero and inn sections |
| Touring | fleet-prevost-french-quarter.webp | Between route and magazine sections |
| Magazine | fleet-tesla-natchez-bluff.webp | Between featured article and grid |
| Radio | fleet-transit-clarksdale-crossroads.webp | Between playlists and live sessions |
| Inn | fleet-prevost-tour-bus.webp | After hero, before first region |
| Inn | fleet-tesla-lafayette-cajun.webp | Between Louisiana and Arkansas regions |
| Route | fleet-ford-transit.webp | After Memphis, before Clarksdale |
| Route | fleet-prevost-vicksburg-battlefield.webp | After Vicksburg, before Natchez |
| Route | fleet-tesla-model-3.webp | After Natchez, before New Orleans |

### Hero image swaps (already in code)
| Page | Old Hero | New Hero |
|------|----------|----------|
| Touring | /images/generated/hero-touring-bg.jpg | /images/heroes/hero-highway-sunset.webp |
| Magazine | /images/generated/hero-magazine-bg.jpg | /images/heroes/hero-mississippi-dawn.webp |
| Radio | /images/generated/hero-radio-bg.jpg | /images/heroes/hero-bayou-mist.webp |
| Inn | /images/generated/hero-bayou-mist.webp | /images/heroes/hero-ozarks-sunrise.webp |

---

## 6. RECENT COMMIT HISTORY

| SHA | Description |
|-----|-------------|
| 25dc323 | Add fleet images throughout all pages, swap hero backgrounds |
| 00b8992 | Inn page rewrite (corridor-wide hospitality guide) |
| 7167c33 | Previous updates |
| b5c8ea6 | Previous updates |
| 846bc32 | Previous updates |

---

## 7. CONTENT ASSETS

### City Guide Articles
- **12 original guides** in `/home/user/workspace/big-muddy-city-guides.md`
  - Covers: Memphis, Clarksdale, Vicksburg, Natchez, New Orleans, St. Francisville, Baton Rouge, Lafayette, Alexandria, Natchitoches, Shreveport, El Dorado
- **6 new guides** in `/home/user/workspace/new-city-guides.md`
  - Covers: Monroe, Ruston, Little Rock, Fayetteville, Bentonville, Branson

### Venue Research
- **108 venues across 12 cities** — `/home/user/workspace/wide/research_results_mmbqu5rh.csv`
- **6 new city venues** — `/home/user/workspace/wide/research_results_mmcbdxai.csv`
- Categories: dining, live music, lodging, attractions per city

### Individual City Research Summaries
- alexandria-la-research-summary.md
- baton_rouge_research_summary.md
- bentonville_research_findings.md
- clarksdale-research-summary.md
- el_dorado_ar_research.md
- memphis_research_summary.md
- natchitoches-la-research.md
- research-natchez.md
- shreveport-research-summary.md
- st_francisville_research_summary.md

### Strategy Documents
- bmt-google-reviews-strategy.md
- bmt-spotify-strategy.md
- nap-audit.md (Name/Address/Phone consistency)
- platform-guides.md
- content-library.md
- gcp-setup-checklist.md

---

## 8. TEAM

| Name | Role | Notes |
|------|------|-------|
| Chase Pierson | Showrunner | Two Google accounts: chase@scan2plan.io + me@chasepierson.tv |
| Elijah Tuttle | Tech | NOT building the platform — Chase + Computer are |
| Miles Dubois | Video | Video production |
| Arrie B. Aslin (Amy Allen) | Artist | Stage name for all public materials |
| Tracy Allen | Ops | Inn partnership finalized |

---

## 9. THE INN

- **Property:** The Big Muddy Inn & Blues Room
- **Address:** 411 N Commerce St, Natchez, MS 39120
- **6 suites:** Muddy Waters, Robert Johnson, John Lee Hooker, B.B. King, British Invasion I, British Invasion II
- **Blues Room:** 40-seat performance venue, streams live to subscribers
- **thebigmuddyinn.com** handles the actual property
- **Platform /inn route** is a corridor-wide hospitality guide (where to stay across all 18 cities)

---

## 10. UPCOMING WORK / KNOWN TODOS

1. **Push the 15 images to the repo** (zip file provided, see Section 5)
2. **Set up GCS bucket** for image hosting — Chase wants a Google Cloud Storage bucket with admin panel gallery/upload UI organized into albums
3. **Wire pages to Prisma/database** — currently all pages use static data arrays, need to connect to Neon PostgreSQL
4. **Admin panel** — image management, content management
5. **Continue building out front end** — Chase's ongoing goal

---

## 11. FILES TO TRANSFER

### Critical files to download and re-upload to new Computer:

**Content (must transfer):**
- `big-muddy-city-guides.md` — 12 city guide articles
- `new-city-guides.md` — 6 new city guide articles
- `wide/research_results_mmbqu5rh.csv` — 108 venue research (12 cities)
- `wide/research_results_mmcbdxai.csv` — 6 new city venue research
- `bmt-images.zip` — 15 optimized webp images (2.7MB)

**Strategy docs (transfer if ongoing):**
- `bmt-google-reviews-strategy.md`
- `bmt-spotify-strategy.md`
- `nap-audit.md`
- `content-library.md`
- `platform-guides.md`

**Source code snapshots (nice to have — also in GitHub):**
- `updated-pages/` — all 5 updated page .tsx files
- `new-inn-page.tsx` — the corridor-wide hospitality guide source

**Can skip:**
- All `.json` files related to image pushing (base64 maps, manifests, push batches)
- Python scripts (encode_images.py, resize_all.py, etc.)
- `tool_calls/` directory (intermediate outputs)

---

## 12. CONNECTOR SETUP FOR NEW COMPUTER

The new Computer needs these connected:
1. **GitHub** — connect to the CPTV27 org (under me@chasepierson.tv). The repo is CPTV27/bmt (private).

---

## 13. FIRST MESSAGE TO NEW COMPUTER

Paste this as your first message to get it oriented:

> I'm Chase Pierson, Showrunner at Big Muddy Touring. I'm transferring a project from another Computer instance. I'm going to upload a handoff document and several content files. Read the handoff doc first — it has everything about the project, architecture, team, brand rules, and current state. After you read it, store all the user instructions from Section 1 into your memory. Then I'll upload the content files and we can pick up where we left off.

---

*End of handoff document.*
