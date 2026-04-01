# Creative Production Pipeline — Adobe + Google + AI + CapCut

*Canonical reference for all production agents. Updated 2026-04-01.*

---

## The Stack

| Tool | Role | Machines | Status |
|---|---|---|---|
| Lightroom Classic | Master photo catalog, editing, collections | Mac Mini, MacBook | Installed |
| Adobe Bridge 2026 | DAM, batch metadata, AI auto-tag, XMP keywords | Mac Mini, MacBook, Tracy, Amy | Just installed |
| Photoshop + Firefly | Retouching, compositing, AI generative fill, batch actions | Mac Mini, MacBook | Available |
| Google Cloud Vision API | AI auto-tagging at scale | API (bigmuddy-ff651) | Enabled, tested |
| CapCut + Dreamina | Video editing, AI captions, social clips, music sync | MacBook, phone | Available |
| Postiz | Social media scheduling and posting | Mac Mini (port 4007) | Running |
| GCS | Cloud storage and delivery | Google Cloud | Working |
| Vertex AI Imagen 3 | AI image generation | API (bigmuddy-ff651) | Available |
| Google Cloud TTS | Voice generation (7 character voices) | API (bigmuddy-ff651) | Working |

---

## The Photo Pipeline

```
CAPTURE → EDIT → TAG → STORE → DISTRIBUTE → MEASURE → PROMOTE

Camera / Phone
    ↓
Lightroom Classic
  - Import, rate (1-5 stars), flag (pick/reject)
  - Edit: exposure, color, crop
  - Organize into collections by brand/project
    ↓
Adobe Bridge 2026
  - Batch XMP metadata (title, description, keywords, copyright)
  - AI Auto-Tag (built-in ML categorization)
  - Ratings sync with Lightroom
  - Tracy and Amy can browse here without needing Lightroom
    ↓
Google Cloud Vision API
  - Structured JSON tags with confidence scores
  - Labels, landmarks, objects, faces, text detection
  - ~$0.0045/image for full analysis
  - Tags written back to manifest JSON + XMP via exiftool
    ↓
Processing (Mac Mini)
  - cwebp conversion to 3 sizes:
    Hero: 1920px wide, 85% quality
    Grid: 1200px wide, 82% quality
    Thumb: 400px wide, 80% quality
  - Descriptive slug naming (not camera filenames)
    ↓
GCS Upload
  - gs://bmt-media-bigmuddy/archive/ — full-res originals
  - gs://bmt-media-bigmuddy/library/ — web-optimized
  - gs://bmt-media-bigmuddy/library/thumbs/ — thumbnails
    ↓
Website / Apps
  - Hero images, article photos, gallery prints, directory listings
  - Voice AI can search photos by tag ("show me photos of the Blues Room")
    ↓
Social Media (via Postiz)
  - Schedule and post to Instagram, Facebook, TikTok
  - Track engagement per photo
    ↓
Measure + Promote
  - Top performers (engagement data) get promoted to website heroes
  - Rotation: headers change seasonally or when better photos prove themselves
```

---

## The Video Pipeline

```
Camera / Phone
    ↓
CapCut
  - AI-assisted editing
  - Dreamina Seedance 2.0 for AI video generation
  - Auto-captions (removes filler words automatically)
  - Music sync from Big Muddy Radio tracks
  - Platform-specific exports (TikTok 9:16, Instagram 1:1, Facebook 16:9)
    ↓
Social Media (via Postiz or direct)
    ↓
Measure engagement → Winners become website video content
```

---

## The Tagging Schema

Every photo gets tagged with:

| Field | Type | Example |
|---|---|---|
| slug | string | natchez-blues-room-arri-golden-hour |
| brand | enum | big-muddy, bearsville, dsd, gallery, mbt, oe |
| location | string | Natchez, MS |
| corridor | enum | south, northeast, both |
| subject | tags[] | performer, venue, food, landscape, portrait, street, night, architecture |
| people | tags[] | arrie-aslin, tracy, amy, chase, regina |
| usable_as | tags[] | hero, article, gallery-print, social, thumbnail, background |
| mood | tags[] | golden-hour, night, moody, bright, intimate, cinematic |
| vision_api_labels | json | Raw labels from Vision API with confidence scores |
| bridge_keywords | string[] | Keywords from Adobe Bridge AI Auto-Tag |
| photographer | string | chase-pierson |
| source_file | string | FOR03361.jpg |
| collection | string | Big Muddy Magazine |
| gps_lat | float | 31.5604 |
| gps_lng | float | -91.4032 |
| camera | string | SONY ILCE-7M2 |
| date_taken | datetime | 2026-03-31T18:13:12 |

---

## Dual AI Tagging Strategy

Two AI systems tag every photo:

1. **Adobe Bridge Auto-Tag** — runs locally, free, writes keywords into XMP metadata. Good for browsing, filtering, local search. Tags travel with the file.

2. **Google Cloud Vision API** — runs in cloud, $0.0045/image, returns structured JSON. Good for database queries, voice AI search, programmatic access. Tags stored in Prisma Photo table.

Both tag sets are saved. Bridge tags in XMP (on the file). Vision API tags in the database (queryable by the platform).

---

## Photoshop + Firefly Workflows

| Use Case | How |
|---|---|
| Extend a photo for hero crop | Generative Fill to expand canvas |
| Clean up show photos | Remove mic stands, fix lighting, extend backgrounds |
| Batch process gallery prints | Record Action → File > Automate > Batch |
| Generate social variants | AI assistant: "Make this 1080x1080 for Instagram" |
| Background replacement | Select Subject → Generative Fill with prompt |

The Photoshop AI assistant (public beta) is conversational — describe what you want and it executes using Firefly. Commercially safe (trained on Adobe Stock, licensed content, public domain).

---

## CapCut Key Features for Big Muddy

| Feature | Use |
|---|---|
| Dreamina Seedance 2.0 | Generate video clips from show photos + prompts |
| Auto-Captions | Automatic subtitles on all video, removes filler words |
| Music Sync | Drag Big Muddy Radio tracks, CapCut syncs the cuts |
| Multi-format Export | One edit → TikTok (9:16) + Instagram (1:1) + Facebook (16:9) |
| AI Avatars | Potential for the Southern Concierge video persona |

---

## Who Uses What

| Person | Tools | Purpose |
|---|---|---|
| Chase | Lightroom, Bridge, Photoshop, CapCut | Shoot, edit, process, create |
| Tracy | Bridge | Browse catalog, curate gallery, rate photos |
| Amy | Bridge, CapCut | Browse photos for social, create show clips |
| Mac Mini Agent | cwebp, Vision API, GCS upload | Batch processing, tagging, uploading |
| Patch | GCS, Prisma | Database integration, front-end photo delivery |
| Vesper | Design specs | Visual direction, layout decisions |

---

## Social → Hero Promotion Pipeline

1. Photos processed by Mac Mini Photo Lab
2. Tagged by Bridge Auto-Tag + Vision API
3. Posted via Postiz to social channels
4. Engagement tracked (likes, saves, shares, comments)
5. Top 10% by engagement flagged for promotion
6. Winners become website hero images, article photos, directory listing photos
7. Rotation: headers aren't permanent, they evolve with the data

---

*This pipeline is the production DNA. Every photo, every video, every visual asset flows through this system.*
