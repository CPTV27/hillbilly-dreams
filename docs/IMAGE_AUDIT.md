# Image Audit — Full Inventory, Kill List & Shot List

**Author:** Frontend Design Agent
**Date:** 2026-03-26
**For:** Huck (Build Agent) to create Photo table entries, Chase to shoot replacements

---

## KILL LIST (Remove/Replace Immediately)

These images have over-processed skies, weird color casts, or AI artifacts that hurt credibility.

### Priority 1: Weird Sky / Over-Processed (REAL photos with bad edits)

| Image | Location | Problem | Used On |
|---|---|---|---|
| `/images/corridor/natchez-bluff-river-view.webp` | Bluff overlooking river | **TEAL/ORANGE split-tone disaster.** Sky is unnatural cyan, grass is orange, heavy HDR. Looks like a bad Instagram filter. | `touring/page.tsx` (line 200), `touring/inn/page.tsx` (line 666) |
| `/images/corridor/mississippi-river-bridge.webp` | River + bridge + barge | **Over-saturated blue sky**, heavy HDR processing. River looks grey/muddy, sky is electric blue. Uncanny. | `touring/page.tsx` (line 285) |
| `/images/corridor/historic-home-natchez.webp` | Yellow Victorian house | **Teal sky** — unnaturally deep cyan/teal, over-sharpened. The house itself is fine but the sky screams "filter." | `touring/page.tsx` (line 142), `touring/inn/page.tsx` (line 667, 727) |
| `/images/corridor/craftsman-porch-columns.webp` | Yellow craftsman porch | **Same teal sky issue.** Looks like the same edit preset as historic-home. Sky is too cyan/teal to be natural. | `touring/page.tsx` (line 197), `touring/inn/page.tsx` (line 605, 725) |
| `/images/platform/bluff-azaleas-river.webp` | Same bluff location | **Yellow/teal version** of the bluff view. Different color cast but same over-processed feel. Hedges look magenta. | Platform pages |

**Action:** These are REAL Chase photos that got over-processed (likely a DxO preset or Lightroom filter went too far). Re-export from RAW with natural color grading, or Chase reshoots at golden hour.

### Priority 2: AI-Generated Images (Replace with Real Photography)

| Image | GCS Path | Problem | Used On | Replacement Shot Needed |
|---|---|---|---|---|
| `heroes/hero-highway-sunset.webp` | GCS heroes/ | AI — generic highway sunset. No sense of place. | `touring/page.tsx` hero (line 72) | **Shoot: Hwy 61 heading south from Natchez, golden hour, with the van or bus in frame** |
| `heroes/hero-ozarks-sunrise.webp` | GCS heroes/ | AI — person at overlook. Not Mississippi, looks like Blue Ridge. Wrong geography. | `touring/inn/page.tsx` hero (line 429) | **Shoot: Natchez bluffs at sunrise, looking over the river** |
| `heroes/hero-bayou-mist.webp` | GCS heroes/ | AI — generic bayou. Pretty but soulless. | Homepage hero | **Shoot: Real bayou/cypress at dawn near Natchez or along corridor** |
| `heroes/hero-mississippi-dawn.webp` | GCS heroes/ | AI — river at dawn from bluff. Decent composition but no character. | About/story sections | **Shoot: Same angle but REAL — Natchez bluff overlook at dawn** |
| `magazine/natchez-bluff-sunset.webp` | GCS magazine/ | AI — postcard-y Natchez waterfront. | Magazine sections | **Shoot: Under-the-Hill at golden hour from the bluff** |
| `magazine/memphis-beale-street-neon.webp` | GCS magazine/ | AI — **garbled sign text** visible at full res. | Magazine nightlife sections | **Shoot: Real Beale Street at night (next Memphis trip)** |
| `magazine/clarksdale-crossroads.webp` | GCS magazine/ | AI — **garbled sign text** on Hwy marker. | Magazine blues/history | **Shoot: Real crossroads sign, Clarksdale (next corridor trip)** |
| `command/highway-61.webp` | GCS command/ | AI — **garbled sign text** on Hwy 61 sign. | Card thumbnails | **Shoot: Real Hwy 61 sign with cotton field** |
| `command/juke-joint.webp` | GCS command/ | AI — generic juke joint interior. | Card thumbnails | Already have `real/juke-joint-interior.webp` — swap it |
| All `fleet/` images (11) | GCS fleet/ | AI — **the van and bus are AI renderings, not real vehicles**. They look great but they're not real. | Touring route page, touring page | **This is the biggest credibility risk. If someone zooms in, the brand collapses. Need real fleet photos ASAP.** |
| All `ai-corridor/` images (10) | Local /images/ai-corridor/ | AI — labeled as AI in the folder name. | Various pages | Replace with real corridor photos from the archive/ folder |
| All `dsd/` lifestyle images | Local /images/dsd/ | AI — hero-mainstreet, restaurant-owner, southern-food, etc. | Directory pages | **Shoot: Real Main Street businesses, real owners, real food** |
| `marketing/metaphor_*.png` (6) | Local /images/marketing/ | AI — abstract conceptual images. | Marketing pages | Low priority — these are metaphorical, not pretending to be real |
| `vr/sky-*.webp` (6) | Local /images/vr/ | AI — VR skybox environments. | VR experience | Expected to be AI — this is fine |

---

## FULL IMAGE INVENTORY

### Format for Huck's Photo Table

Each row = one entry for the `Photo` model in Prisma.

```
source: 'real' | 'ai' | 'stock'
status: 'active' | 'flagged' | 'kill' | 'needs-replacement'
```

### REAL Photos — Keep & Feature (source: 'real', status: 'active')

| ID | Path | Source | Subject | Page(s) | Notes |
|---|---|---|---|---|---|
| R01 | GCS `real/inn-foyer.webp` | real | Inn grand entryway | touring/inn | TOP PICK — hero worthy |
| R02 | GCS `real/inn-blue-suite.webp` | real | Blue suite | touring/inn | |
| R03 | GCS `real/inn-british-suite.webp` | real | British suite, dark navy | touring/inn | Great for dark sections |
| R04 | GCS `real/inn-green-suite.webp` | real | Green suite | touring/inn | |
| R05 | GCS `real/inn-grey-suite.webp` | real | Grey suite, magenta fireplace | touring/inn | |
| R06 | GCS `real/inn-magenta-suite.webp` | real | Magenta suite | touring/inn | Brand color match |
| R07 | GCS `real/inn-pink-suite.webp` | real | Pink suite | touring/inn | |
| R08 | GCS `real/blues-room-live-show.webp` | real | Live show audience | Radio, community | |
| R09 | GCS `real/blues-room-harmonica.webp` | real | Harmonica close-up | Radio, music sections | |
| R10 | GCS `real/blues-room-show.webp` | real | Red's Lounge packed house | Community sections | |
| R11 | GCS `real/musician-performing.webp` | real | Guitarist at mic | Hero candidate | |
| R12 | GCS `real/juke-joint-interior.webp` | real | Smoky bar, Muddy Waters posters | **TOP PICK — thesis hero** | |
| R13 | GCS `real/mississippi-river.webp` | real | Golden sunrise, boat, cypress | **TOP PICK — mission CTA** | |
| R14 | GCS `real/record-player.webp` | real | Turntable + vinyl stack | Radio, Records | |
| R15 | `/images/corridor/victorian-mansion-natchez.webp` | real | White Victorian B&B | touring/page, touring/inn | Good — natural sky |
| R16 | `/images/corridor/natchez-downtown-sidewalk.webp` | real | Brick sidewalk, awnings | touring/page, touring/inn | Good |
| R17 | `/images/corridor/cafe-sidewalk-natchez.webp` | real | Sidewalk cafe | touring/inn | Good |
| R18 | `/images/corridor/bar-interior-floral.webp` | real | Bar with floral decor | touring/inn | Good |
| R19-R44 | `/images/arri-aslin/` (26 files) | real | Arri Aslin portraits | Records, artist profiles | Professional shoot |
| R45-R162 | `/images/studio-c/` (118 files) | real | Studio C production | Radio, Records, Studio | Professional shoot |
| R163-R169 | `/images/records/anthologist-*.webp` (7 files) | real | Vinyl shop photos | Records page | Good |

### FLAGGED — Over-Processed Real Photos (source: 'real', status: 'kill')

| ID | Path | Source | Problem | Action |
|---|---|---|---|---|
| K01 | `/images/corridor/natchez-bluff-river-view.webp` | real | Teal/orange split-tone, over-HDR | Re-export from RAW or reshoot |
| K02 | `/images/corridor/mississippi-river-bridge.webp` | real | Electric blue over-saturated sky | Re-export from RAW or reshoot |
| K03 | `/images/corridor/historic-home-natchez.webp` | real | Teal sky, over-sharpened | Re-export from RAW |
| K04 | `/images/corridor/craftsman-porch-columns.webp` | real | Same teal sky preset | Re-export from RAW |
| K05 | `/images/platform/bluff-azaleas-river.webp` | real | Yellow/teal over-processed | Re-export from RAW |

### AI-Generated — Needs Replacement (source: 'ai', status: 'needs-replacement')

| ID | Path | Source | Used On | Priority |
|---|---|---|---|---|
| A01-A04 | GCS `heroes/` (4 files) | ai | Hero banners | HIGH — these are the first thing visitors see |
| A05-A17 | GCS `magazine/` (13 files) | ai | Magazine articles | MEDIUM — most are city-specific, need real location shoots |
| A18-A21 | GCS `command/` (4 files) | ai | Card thumbnails | MEDIUM |
| A22-A32 | GCS `fleet/` (11 files) | ai | Touring, route | **CRITICAL — fleet vehicles are fake. Biggest credibility risk.** |
| A33-A42 | `/images/ai-corridor/` (10 files) | ai | Various | HIGH — already labeled as AI |
| A43-A67 | `/images/dsd/` (25 files) | ai | Directory | MEDIUM — product imagery |
| A68-A73 | `/images/marketing/` (6 files) | ai | Marketing | LOW — metaphorical, not pretending to be real |
| A74-A79 | `/images/vr/` (6 files) | ai | VR experience | KEEP — VR is expected to be generated |

---

## SHOT LIST FOR CHASE

Priority order. Shoot these and they slot right into the existing pages.

### Critical (Do This Week)

| # | What to Shoot | Where | When | Replaces | Page |
|---|---|---|---|---|---|
| 1 | **The actual Big Muddy van** (if it exists) | Wherever it's parked | Any time, good light | All `fleet/fleet-transit-*.webp` AI renders | Touring, Route |
| 2 | **The actual Prevost bus** (if it exists) | Wherever it's parked | Any time, good light | All `fleet/fleet-prevost-*.webp` AI renders | Touring, Route |
| 3 | **Re-export the 5 killed photos** from RAW with natural color grading (no teal sky preset) | Computer — DxO/Lightroom | N/A | K01-K05 | Touring, Inn |
| 4 | **Natchez bluffs at sunrise** — wide shot looking over river | Natchez bluffs overlook | 6:00-6:30 AM | `hero-mississippi-dawn.webp`, `hero-ozarks-sunrise.webp` | Hero banners |
| 5 | **Highway 61 south of Natchez** — two-lane road, golden hour | Hwy 61 heading south | 5:30-6:00 PM | `hero-highway-sunset.webp` | Touring hero |

### High Priority (This Month)

| # | What to Shoot | Where | When | Replaces |
|---|---|---|---|---|
| 6 | **Under-the-Hill at golden hour** from the bluff | Natchez bluff, facing downhill | 5:00-6:00 PM | `natchez-bluff-sunset.webp` (AI) |
| 7 | **Real bayou/cypress at dawn** | Any bayou access near Natchez | 6:00-7:00 AM | `hero-bayou-mist.webp` (AI) |
| 8 | **Business owner with phone** — someone texting, natural | Any Main Street business | Daytime | DSD `hero-mainstreet.webp` |
| 9 | **Food close-up** — plate at a real Natchez restaurant | Any restaurant you love | Lunch/dinner | DSD `southern-food.webp` |
| 10 | **Main Street storefront** — real awnings, real signage | Franklin Street or downtown | Afternoon, open sky | DSD backgrounds |

### Next Corridor Trip

| # | What to Shoot | Where | When | Replaces |
|---|---|---|---|---|
| 11 | **Beale Street at night** — real neon, real people | Memphis, Beale Street | After 8 PM | `memphis-beale-street-neon.webp` (garbled AI text) |
| 12 | **Crossroads sign** — real Hwy 61/49 intersection | Clarksdale | Daytime | `clarksdale-crossroads.webp` (garbled AI text) |
| 13 | **Real Hwy 61 road sign** with Delta landscape | Between Clarksdale and Vicksburg | Golden hour | `command/highway-61.webp` (garbled AI text) |
| 14 | **Oxford Square** — courthouse, storefronts, people | Oxford, MS | Afternoon | `oxford-square.webp` (AI) |

---

## PHOTO-TO-PAGE PIPELINE (Proposed)

### Current Flow
1. Chase shoots on iPhone 16 Pro
2. RAW files land in `~/Pictures/bmt-export/`
3. DxO processes HEIC → edited JPG
4. Manual export to WebP
5. Manual upload to GCS bucket
6. Manual code change to swap image path

### Proposed Flow
1. Chase shoots on iPhone 16 Pro
2. Photo auto-syncs to staging folder (iCloud or Dropbox)
3. Processing pipeline (DxO or automated): crop, color grade, export WebP
4. Upload to GCS bucket with metadata (location, tags, date, source: 'real')
5. Photo table entry created automatically
6. Page references photo by ID → if the photo is swapped in the database, the page updates automatically

**For Huck:** The key is decoupling the image path from the page code. Pages should reference a `photoId`, and the Photo table resolves that to a GCS URL. Then replacing an AI image with a real one is a database update, not a code change.

---

## ARCHIVE GOLDMINE

There are **545+ unreviewed photos** in `GCS archive/`:
- `archive/corridor/` — 400+ OceanSprings-Natchez series
- `archive/library/` — 100+ corridor series

Plus **100 unprocessed HEIC files** from Chase's iPhone.

**Recommendation:** Before Chase shoots anything new, batch-review the archive. Many of the needed shots may already exist.
