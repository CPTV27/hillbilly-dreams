# Media Tagging Failure Analysis — April 8, 2026

## Summary

We have 16,936 images processed through Vision API but the data is nearly useless for search. The root cause is that we processed **Lightroom Smart Previews (256px thumbnails)** instead of the actual photos, and the tagging pipeline has critical gaps in location, people, brand, and granularity.

---

## Photo Manifest (16,936 images)

| Field | Population | Problem |
|-------|-----------|---------|
| slug | 100% | Renamed from smart-previews — names from Vision API, not human-readable |
| **brand** | 7.3% | 92.7% stuck on "big-muddy" default. Brand inference only worked for 1,232 images with Lightroom collection data |
| **location_city** | 0.0% | Effectively zero. Only 1 image has a city. Lightroom GPS/IPTC/folder lookup failed for 99.99% |
| **location_state** | 5.5% | Only 927 images have state data |
| mood | 100% | Second-pass fixed this — was 19%, now 100% |
| subject_tags | 84.8% | Only 8 categories (venue, portrait, night, performer, landscape, street, food, architecture). No granularity. |
| **people_tags** | 0.0% | ZERO. Nobody is identified in any photo. No faces, no names. |
| vision_labels | 99.4% | Raw data is there — "Violin", "Musician" — but not indexed for search |
| vision_objects | 88.5% | "Person", "Clothing", "Violin" — there but not searchable |
| **vision_landmarks** | 0.4% | Almost nothing. Vision API doesn't know Stanton Hall or Bearsville Theater |
| **print_ready** | 0.0% | All false — 256px smart previews, not full-res |
| **source_resolution** | ALL 256px | Every image is a Lightroom Smart Preview — thumbnail quality |

## Save the Hall Ball Photos (152 images)

| Field | Population | Problem |
|-------|-----------|---------|
| GCS URLs | 100% | All 3 sizes uploaded |
| **Content tags** | 0% | No Vision API was run. Just resize + upload. |
| **Mood** | 0% | Not analyzed |
| **People** | 0% | Not identified |
| **Captions** | 0% | No descriptions |

## Music Catalog (55 tracks)

| Field | Population | Problem |
|-------|-----------|---------|
| Basic metadata | 100% | Title, artist, album, duration, GCS URL |
| Waveforms | 100% | 200-point peaks data |
| **AI analysis** | 0% | Gemini returned unparseable JSON, used fallback for everything |
| **Mood** | 0% | All "unknown" |
| **BPM** | 0% | Not detected |
| **Key** | 0% | Not detected |

---

## Five Root Causes

### 1. Source material was wrong from the start
We processed 16,936 Lightroom Smart Previews — 256px thumbnails. Not the real photos. The actual high-res files (4000-6000px) live on drives that weren't connected (ATEM SSD, /Volumes/photo/, BlueSSD). The manifest has metadata about thumbnails, not about the photos we'd actually use.

### 2. Location inference has no data to work with
Smart previews are stripped DNG files with no GPS EXIF. The Lightroom catalog has location data for some images (GPS, IPTC, folder paths) but only 934 out of 17,366 had any location data at all. The folder paths on disconnected drives can't be read.

### 3. People identification was never attempted
Vision API was used for label detection and object detection, but NOT face detection. No faces were detected, no names were mapped. The people_tags field exists in the schema but was never populated.

### 4. Subject tags are too coarse
Only 8 categories: venue, portrait, night, performer, landscape, street, food, architecture. "Horn player" requires parsing Vision API labels (which DO contain "Musical instrument", "Brass instrument", "Trumpet") but subject_tags inference only looks for broad categories.

### 5. Brand inference needs collection data
Only images with Lightroom collection associations got correct brand tags. The other 92.7% defaulted to "big-muddy" because there was no location data to infer from.

---

## The Broken Chain

```
[Full-res photos on disconnected drives]
     |
     v
[Lightroom Smart Previews: 256px] --> [Vision API] --> [PHOTO_MANIFEST.json] --> DEAD END
                                                                                  (not in DB)
                                                                                  (not searchable)
                                                                                  (wrong source files)

[Apple Photos: 11,424] --> [photos-to-gcs.sh] --> [GCS bucket] --> DEAD END
                                                                    (no Vision API)
                                                                    (no DB writes)
                                                                    (no tags)

[photo-library.ts: ~80 photos] --> [hardcoded tags] --> [getPhotosByTag()] --> WORKS but tiny
```

---

## What Needs to Happen

See: docs/MEDIA_METADATA_STANDARD.md (the rules)
See: docs/MEDIA_PIPELINE_FIX.md (the implementation plan)
