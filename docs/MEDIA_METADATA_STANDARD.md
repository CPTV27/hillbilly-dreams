# Media Metadata Standard — Big Muddy / HDI

**Every media asset must have this metadata before it enters the system. No exceptions.**

---

## Required Fields (Photos)

| Field | Type | Description | Source | Example |
|-------|------|-------------|--------|---------|
| `id` | string | Unique identifier | Auto-generated | `cuid()` |
| `gcsUrl` | string | Full-res GCS URL | Upload pipeline | `gs://bmt-media-bigmuddy/library/full/...` |
| `thumbnailUrl` | string | 400px thumbnail URL | Upload pipeline | `gs://bmt-media-bigmuddy/library/thumb/...` |
| `heroUrl` | string | 2400px hero URL | Upload pipeline | `gs://bmt-media-bigmuddy/library/hero/...` |
| `sourceFile` | string | Original filename | EXIF/filesystem | `DSC_4521.DNG` |
| `sourceResolution` | json | {width, height} | EXIF | `{width: 6000, height: 4000}` |
| `printReady` | boolean | Is this >= 2400px wide? | Computed | `true` |
| `brand` | string | Which brand this belongs to | Manual or collection | `big-muddy-touring` |
| `locationCity` | string | City where shot was taken | GPS/EXIF/manual | `Natchez` |
| `locationState` | string | State | GPS/EXIF/manual | `MS` |
| `locationVenue` | string | Specific venue if applicable | Manual | `Blues Room` |
| `dateTaken` | datetime | When the photo was taken | EXIF | `2026-03-15T21:30:00Z` |
| `photographer` | string | Who shot it | Manual/default | `chase-pierson` |
| `visionLabels` | json[] | Vision API label detection | Google Vision API | `[{description: "Brass instrument", score: 0.94}]` |
| `visionObjects` | json[] | Vision API object detection | Google Vision API | `[{name: "Trumpet", score: 0.89}]` |
| `subjectTags` | string[] | Granular content tags | Vision API + rules | `["horn-player", "live-performance", "stage"]` |
| `peopleTags` | string[] | People identified | Face detection + manual | `["chase-pierson", "arrie-aslin"]` |
| `mood` | string[] | Mood/atmosphere | Vision API + Gemini | `["warm", "intimate", "golden-hour"]` |
| `caption` | string | Human-readable description | Gemini from Vision labels | `"Horn section performing at the Blues Room, warm stage lighting"` |
| `usableAs` | string[] | What this photo works for | Computed from quality | `["hero", "article", "social", "thumbnail"]` |
| `qualityScore` | float | 0-1 quality rating | Computed | `0.87` |
| `reviewed` | boolean | Has a human approved this? | Manual | `false` |
| `createdAt` | datetime | When added to system | Auto | now |

---

## Required Fields (Music/Audio)

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `id` | string | Unique identifier | Auto |
| `title` | string | Track title | ID3/manual |
| `artist` | string | Artist name | ID3/manual |
| `album` | string | Album name | ID3/manual |
| `duration` | float | Seconds | Computed |
| `bpm` | int | Beats per minute | Audio analysis |
| `key` | string | Musical key | Audio analysis |
| `mood` | string[] | Mood tags | AI analysis |
| `genre` | string[] | Genre tags | AI analysis |
| `instruments` | string[] | Detected instruments | AI analysis |
| `gcsUrl` | string | Full audio URL | Upload |
| `waveform` | json | Peak data | Computed |

---

## Subject Tag Taxonomy (Granular)

The old system had 8 tags. The new system needs at least these:

### People & Performance
- `vocalist`, `guitarist`, `bassist`, `drummer`, `horn-player`, `keyboard-player`, `violinist`, `DJ`
- `solo-performer`, `band`, `duo`, `orchestra`, `choir`
- `audience`, `crowd`, `dancing`, `applause`
- `soundcheck`, `backstage`, `loading-gear`, `setup`

### Instruments
- `acoustic-guitar`, `electric-guitar`, `bass-guitar`, `piano`, `keyboard`, `organ`
- `trumpet`, `saxophone`, `trombone`, `tuba`, `french-horn`
- `drums`, `percussion`, `congas`, `tambourine`
- `violin`, `cello`, `upright-bass`, `banjo`, `mandolin`, `harmonica`, `accordion`
- `turntable`, `mixing-console`, `recording-equipment`, `microphone`

### Venues & Spaces
- `stage`, `blues-room`, `theater`, `bar`, `restaurant`, `outdoor-venue`
- `recording-studio`, `control-room`, `live-room`
- `gallery`, `art-space`, `warehouse`, `church`

### Architecture & Places
- `antebellum`, `victorian`, `art-deco`, `shotgun-house`, `plantation`
- `downtown`, `main-street`, `storefront`, `porch`, `balcony`, `ironwork`
- `river`, `bluff`, `bridge`, `levee`, `delta-flatland`
- `natchez`, `clarksdale`, `oxford`, `jackson`, `memphis`, `new-orleans`
- `woodstock`, `bearsville`, `hudson-valley`, `catskills`

### Nature & Atmosphere
- `sunset`, `sunrise`, `golden-hour`, `blue-hour`, `night`
- `fog`, `rain`, `storm`, `spanish-moss`, `live-oak`, `kudzu`
- `mississippi-river`, `river-barge`, `fireflies`

### Food & Hospitality
- `food-plating`, `cooking`, `bar-drinks`, `coffee`
- `inn-interior`, `hotel-room`, `lobby`, `dining-room`

### Production & Gear
- `camera-rig`, `gimbal`, `lighting`, `c-stand`, `monitor`
- `van`, `gear-loading`, `road-case`, `cable-run`

---

## Tagging Rules

### Rule 1: Full-res only
Never tag or index a photo below 2400px wide. Smart previews (256px) are for catalog reference only. The system indexes the real photos.

### Rule 2: Vision API on every photo
Every photo that enters the system gets Google Vision API label detection AND object detection. No exceptions. Cost is ~$0.004/image.

### Rule 3: Subject tags derived from Vision labels
Vision API returns raw labels. A mapping layer converts them to our taxonomy:
- "Brass instrument" + "Person" → `horn-player`
- "Guitar" + "Stage" → `guitarist`, `live-performance`
- "Building" + "Column" → `antebellum`, `architecture`

### Rule 4: Gemini generates captions
After Vision API tags, pass the labels + thumbnail to Gemini 2.5 Flash for a one-sentence human-readable caption. Store in `caption` field.

### Rule 5: Location is mandatory
If EXIF has GPS, geocode it. If no GPS, infer from Lightroom collection name, folder path, or manual input. A photo with no location is incomplete.

### Rule 6: Brand is mandatory
Every photo belongs to a brand. Infer from location (Natchez = Big Muddy, Woodstock = Bearsville), collection, or manual assignment. Default "unassigned" — not "big-muddy."

### Rule 7: People get identified
Run face detection. Maintain a known-faces library. When a face matches, add to peopleTags. Unknown faces get flagged for manual review. We know who Chase is. We know who Arrie is. We know who Tracy and Amy are.

### Rule 8: Quality scoring
Compute quality score from: resolution, sharpness (laplacian variance), exposure (histogram analysis), composition (rule of thirds). Photos below 0.5 quality score get flagged, not indexed for hero use.

### Rule 9: Review before hero use
Any photo used as a full-bleed hero image on a page must have `reviewed: true`. Agents can use unreviewed photos for thumbnails and grids but not heroes.

### Rule 10: Music gets full analysis
Every audio track gets BPM detection, key detection, mood analysis, genre classification, and instrument detection. If Gemini returns unparseable JSON, retry with a different prompt — don't use fallback data.

---

## Processing Pipeline (Correct Order)

```
1. Photo enters system (Apple Photos shared album, AirDrop, manual upload)
2. Convert to WebP (2400px hero, 800px grid, 400px thumb)
3. Extract EXIF (GPS, datetime, camera, lens)
4. Upload all 3 sizes to GCS
5. Run Google Vision API (labels + objects + face detection)
6. Map Vision labels to subject tag taxonomy
7. Run Gemini for caption generation
8. Geocode GPS to city/state (or flag for manual location)
9. Infer brand from location + collection
10. Match faces to known-faces library
11. Compute quality score
12. Write all metadata to PostgreSQL (PhotoIndex table)
13. Photo is now searchable
```

Every step is required. Skipping step 5-12 is how we got here.

---

*This standard applies to all media assets across all HDI properties. No photo enters the searchable library without meeting these requirements.*
