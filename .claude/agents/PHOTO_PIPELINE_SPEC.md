# Photo Pipeline Spec

**Purpose:** Automate the flow from Chase's camera roll to the right page on the right site. GPS data drives placement. Every photo gets registered, tagged, and made available to all properties.

**Author:** Frontend Design Agent
**For:** Huck (Build Agent)
**Date:** 2026-03-27

---

## The Problem

1. Photos shot on iPhone 16 Pro / Sony a7 have GPS embedded
2. DxO DeepPRIME export strips GPS metadata
3. Photos get manually placed on pages with hardcoded paths
4. Same photos get reused 3-4 times across different sections
5. No registry exists — nobody knows which photos are real vs AI
6. No way to auto-match a photo to a Deep South Directory business

## The Pipeline

```
┌─────────────────────────────────┐
│  iPhone 16 Pro / Sony a7        │
│  (GPS + EXIF embedded)          │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Lightroom Classic              │
│  - Import (GPS preserved)       │
│  - Rate + keyword               │
│  - Export to DxO for DeepPRIME  │
│                                 │
│  KEY: Read GPS from catalog     │
│  BEFORE DxO strips it           │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  DxO DeepPRIME Export           │
│  (GPS gets stripped — known)    │
│                                 │
│  FIX: Post-export script that   │
│  re-embeds GPS from LR catalog  │
│  or from the original RAW/HEIC  │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Upload Script (new — Huck)     │
│                                 │
│  1. Read EXIF (GPS, date, cam)  │
│  2. Reverse geocode via Google  │
│     Maps API → business name,   │
│     street, city, zone          │
│  3. Match to DSD business       │
│     listing (fuzzy match on     │
│     name + proximity)           │
│  4. Convert to .webp            │
│     (1600px long edge, q85)     │
│  5. Generate slug filename:     │
│     {city}-{business}-{date}.   │
│     webp                        │
│  6. Upload to GCS bucket        │
│     bmt-media-bigmuddy/real/    │
│  7. Register in D1 image table  │
│  8. Post preview to Google Chat │
│     with suggested placements   │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Image Registry (D1 table)      │
│                                 │
│  See schema below               │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│  Site Components                │
│                                 │
│  Images referenced by registry  │
│  ID, not hardcoded paths.       │
│  Component pulls from GCS URL   │
│  stored in registry.            │
└─────────────────────────────────┘
```

## D1 Image Registry Schema

```sql
CREATE TABLE images (
  id TEXT PRIMARY KEY,              -- uuid
  filename TEXT NOT NULL,           -- natchez-the-camp-20260326.webp
  gcs_url TEXT NOT NULL,            -- https://storage.googleapis.com/bmt-media-bigmuddy/real/...

  -- Source
  source_type TEXT NOT NULL,        -- 'iphone' | 'sony_a7' | 'ai_generated' | 'stock'
  camera_model TEXT,                -- 'iPhone 16 Pro' | 'ILCE-7M4'
  original_filename TEXT,           -- IMG_3482.heic
  date_shot TEXT,                   -- 2026-03-26T17:41:49

  -- Location (from GPS)
  gps_lat REAL,                     -- 31.5596
  gps_lon REAL,                     -- -91.4102
  gps_alt REAL,                     -- 29.5
  city TEXT,                        -- 'Natchez'
  zone TEXT,                        -- 'Under-the-Hill'
  street TEXT,                      -- 'Silver Street'
  business_name TEXT,               -- 'The Camp'
  dsd_business_id TEXT,             -- FK to Deep South Directory listing

  -- Classification
  type TEXT NOT NULL,               -- 'real' | 'ai' | 'composite' | 'edited'
  category TEXT,                    -- 'dining' | 'lodging' | 'music' | 'street' | 'landscape' | 'portrait' | 'food' | 'architecture'
  time_of_day TEXT,                 -- 'golden-hour' | 'blue-hour' | 'night' | 'midday' | 'morning'
  tags TEXT,                        -- JSON array: ["river-view","bridge","porch","lifestyle"]

  -- Usage
  suggested_brands TEXT,            -- JSON array: ["touring","magazine","dsd"]
  suggested_sections TEXT,          -- JSON array: ["natchez-route-stop","under-the-hill-hero","the-camp-listing"]
  current_usage TEXT,               -- JSON array of {page, component, line} where currently used
  usage_count INTEGER DEFAULT 0,    -- how many places this image appears

  -- Status
  status TEXT DEFAULT 'pending',    -- 'pending' | 'approved' | 'live' | 'killed' | 'archived'
  kill_reason TEXT,                 -- 'teal-sky' | 'ai-artifacts' | 'overused' | null
  replacement_for TEXT,             -- ID of image this replaces

  -- Dimensions
  width INTEGER,
  height INTEGER,
  file_size INTEGER,                -- bytes
  format TEXT DEFAULT 'webp',

  -- Metadata
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  approved_by TEXT,                 -- 'chase' | 'tracy' | 'auto'
  notes TEXT
);

-- Index for geo-queries (find photos near a GPS point)
CREATE INDEX idx_images_gps ON images(gps_lat, gps_lon);

-- Index for finding photos by business
CREATE INDEX idx_images_business ON images(dsd_business_id);

-- Index for finding photos by city/zone
CREATE INDEX idx_images_location ON images(city, zone);

-- Index for finding unused or overused photos
CREATE INDEX idx_images_usage ON images(usage_count, status);
```

## Proof of Concept: IMG_3482.heic

First photo to go through the pipeline:

```json
{
  "filename": "natchez-the-camp-20260326.webp",
  "source_type": "iphone",
  "camera_model": "iPhone 16 Pro",
  "original_filename": "IMG_3482.heic",
  "date_shot": "2026-03-26T17:41:49",
  "gps_lat": 31.5596,
  "gps_lon": -91.4102,
  "gps_alt": 29.5,
  "city": "Natchez",
  "zone": "Under-the-Hill",
  "street": "Silver Street",
  "business_name": "The Camp",
  "type": "real",
  "category": "dining",
  "time_of_day": "golden-hour",
  "tags": ["river-view", "bridge", "porch", "lifestyle", "golden-hour", "the-camp"],
  "suggested_brands": ["touring", "magazine", "dsd"],
  "suggested_sections": ["natchez-route-stop", "under-the-hill-hero", "the-camp-dsd-listing"],
  "status": "approved",
  "approved_by": "chase",
  "notes": "Mississippi River bridge visible. Porch seating at The Camp. Real editorial quality. Could replace any of the AI corridor images."
}
```

## Immediate Actions

### For Huck:
1. Create the D1 `images` table using the schema above
2. Build an upload endpoint: `/api/media/upload` that accepts a photo, reads EXIF, reverse geocodes, registers in D1, uploads to GCS
3. Process `IMG_3482.heic` as the first real entry
4. Wire the reverse geocode to match against DSD business listings

### For the Frontend Design Agent (me):
1. Identify which hardcoded image paths on touring/page.tsx should pull from the registry instead
2. Propose component changes: `<BrandImage id="natchez-the-camp-20260326" />` instead of `<Image src="/images/corridor/..." />`
3. Replace `historic-home-natchez.webp` (the pink-sky kill) with `natchez-the-camp-20260326.webp` as a start

### For Chase:
1. When you shoot: just shoot. GPS is already in your iPhone photos.
2. For Sony a7: make sure GPS is enabled, or shoot with the phone first for GPS reference
3. Lightroom: rate and keyword as usual
4. The pipeline handles the rest — upload, tag, place, register

## GPS Preservation Fix (DxO Problem)

The Lightroom catalog is a SQLite database at:
```
~/Pictures/Lightroom Library.lrlibrary/
```

GPS coordinates are stored in the `AgHarvestedExifMetadata` table. A post-DxO script can:
1. Look up the original filename in the LR catalog
2. Read the GPS from `AgHarvestedExifMetadata`
3. Re-embed it in the DxO export using `exiftool -GPSLatitude=X -GPSLongitude=Y`

This preserves the full pipeline: shoot → LR → DxO → GPS restored → upload → auto-place.
