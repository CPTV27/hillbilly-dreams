# Photo Library — Tagging Workflow

**Status:** Interim plan. Long-term tagging UI in Sanity Studio is on the roadmap.

## Where we are today (April 20, 2026)

The "Big Muddy Photo Library" is **229 real Chase Pierson photos** living in Google Cloud Storage at:

```
gs://bmt-media-bigmuddy/approved/big-muddy/{city}/{shoot}/
```

Breakdown:
- **211 Natchez photos**, distributed across 3 named shoots and ~60 untitled
- **18 Liberty MS photos**

The custom Sanity plugin (`apps/web/sanity/plugins/bmm-library/`) reads an index.json that the photos are published into, and shows them as a grid picker on every Image field in Studio.

**The problem:** Each photo has metadata (region, city, shoot, GPS, camera, lens, captured-at) but **subjects/captions/categories are mostly empty**. So Tracy and Amy can browse the grid but can't filter by "porches," "biscuits," "Stanton Hall ballroom," etc.

## The schema we want every photo to have

| Field | Type | Example | Required? |
|-------|------|---------|-----------|
| `category` | enum | `interior`, `exterior`, `food`, `event`, `portrait`, `landscape`, `detail`, `architecture` | yes |
| `subjects` | string array | `["porch", "morning light", "wicker chairs"]` | recommended |
| `caption` | string | "Front porch of the Inn at 7am, late spring." | recommended |
| `credit` | string | "Chase Pierson" | yes (default to "Chase Pierson") |
| `suitable-for` | string array | `["magazine-hero", "social-square", "blog-inline"]` | optional |
| `do-not-use-for` | string array | `["dating-site", "AI-training"]` | optional |
| `released` | boolean | `true` once any people in the photo have signed releases | required for portraits |

## Interim tagging workflow (this week)

### Step 1 — Tracy gets the spreadsheet

Chase creates a Google Sheet titled **"Big Muddy Photo Library — Tagging Queue"** with the following columns:

| col A | col B | col C | col D | col E | col F | col G | col H |
|-------|-------|-------|-------|-------|-------|-------|-------|
| Photo (image preview) | Hash | Original filename | Shoot | Category | Subjects (comma-sep) | Caption | Released? |

Pre-populate rows for all 229 photos. Image preview uses an `=IMAGE()` formula pointing to the `urls.thumb` URL.

### Step 2 — Tracy tags

Tracy works through the sheet at her own pace, ~30 photos per session. Fill in category, subjects, caption. Mark portraits as Released yes/no.

### Step 3 — Nightly re-sync

A small Node script (`scripts/photo-library/apply-tags.mjs`, **TODO Cos**) reads the sheet, updates the GCS-side `index.json`, and the Sanity picker immediately benefits from the new tags (filter dropdowns populate, search starts working).

Cron schedule: every night at 02:00 CDT.

### Step 4 — Tracy verifies in Studio

Open Studio → any Image field → "Big Muddy Photo Library" → category filter now shows the new tags → confirm photos are findable by subject.

## Long-term plan (next 30 days)

**A custom Sanity Studio "Photo Library Manager" tab** that lets Tracy:
- Click any photo
- Edit category/subjects/caption inline
- Hit Save → writes back to GCS index automatically
- See the change reflected in the picker immediately

This eliminates the spreadsheet round-trip. ~1 day of Cos build time.

## What Tracy + Amy should know tomorrow

- The picker works **today**. If you can't find a photo by subject, scroll. The grid is 229 photos — a few minutes of scrolling.
- Tags are coming via the Google Sheet — Chase will set it up this week.
- **Do not upload to GCS directly.** Drop new photos in the "Photos to Approve" Drive folder; Chase processes nightly.
- **Do not use stock photos or AI imagery** — ever. Library only.

## Action items

- [ ] **Chase** — create the Google Sheet, share with Tracy as Editor (~30 min)
- [ ] **Chase** — populate it with all 229 photos via a one-off script (~1 hr)
- [ ] **Cos** — build `scripts/photo-library/apply-tags.mjs` + nightly cron (~3 hr)
- [ ] **Tracy** — first tagging pass on 30 hero-quality photos (~1 hr)
- [ ] **Cos** (later) — Sanity Studio tagging UI (~1 day)
