# Cursor Handoff — Fix Bearsville/Utopia Images on Big Muddy Pages

*These pages show Woodstock, NY studio images instead of Natchez, Mississippi content. Fix all of them.*

---

## The Problem

Pages for Big Muddy (Natchez, MS) are displaying images from Studio C's Utopia demo days in Bearsville/Woodstock, NY. These are the wrong region — Big Muddy pages should show Blues Room, Mississippi River, juke joints, Natchez buildings, and Southern music content.

## Confirmed Natchez GCS Image URLs (Use These as Replacements)

These are verified real images from the GCS bucket, already used on other live pages:

```
https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-live-show.webp
https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-harmonica.webp
https://storage.googleapis.com/bmt-media-bigmuddy/real/musician-performing.webp
https://storage.googleapis.com/bmt-media-bigmuddy/real/blues-room-show.webp
https://storage.googleapis.com/bmt-media-bigmuddy/real/juke-joint-interior.webp
https://storage.googleapis.com/bmt-media-bigmuddy/real/mississippi-river.webp
https://storage.googleapis.com/bmt-media-bigmuddy/magazine/juke-joint-saturday.webp
https://storage.googleapis.com/bmt-media-bigmuddy/magazine/memphis-beale-street-neon.webp
https://storage.googleapis.com/bmt-media-bigmuddy/magazine/clarksdale-ground-zero.webp
https://storage.googleapis.com/bmt-media-bigmuddy/magazine/natchez-under-the-hill.webp
```

## Files to Fix

### Entertainment Pages (3 files)

**apps/web/app/entertainment/page.tsx**
- Line ~46: `/images/studio-c/utopiademo-day-2.webp` → replace with blues-room or live show GCS image

**apps/web/app/entertainment/house-band/page.tsx**
- Line ~27: `/images/studio-c/utopiademo-day-14.webp` → replace with band performing GCS image

**apps/web/app/entertainment/raya/page.tsx**
- Line ~231: `/images/studio-c/utopiademo-day-2.webp` → replace
- Line ~421: `/images/studio-c/utopiademo-day-30.webp` → replace

### Records Pages (4 files)

**apps/web/app/records/page.tsx**
- Lines ~406-409: Four `/images/studio-c/utopiademo-day-*.webp` images → replace all with Southern music/recording GCS images

**apps/web/app/records/sessions/page.tsx**
- Line ~143: `url(/images/studio-c/utopiademo-day-25.webp)` in backgroundImage → replace
- Line ~222: `url(/images/studio-c/utopiademo-day-40.webp)` in backgroundImage → replace

**apps/web/app/records/artists/page.tsx**
- Line ~227: `url(/images/studio-c/utopiademo-day-15.webp)` in backgroundImage → replace

### Radio Pages (1 file)

**apps/web/app/radio/directory/page.tsx**
- Line ~86: `/images/processed/bearsville/theater-show-04.webp` → replace with Blues Room or radio booth GCS image

## Rules

- Replace ALL `/images/studio-c/utopiademo-day-*.webp` references with GCS URLs from the list above
- Replace ALL `/images/processed/bearsville/*.webp` references on non-Bearsville pages
- Use inline CSS only, no Tailwind
- Images should be contextually appropriate (music images for records, live show images for entertainment, radio images for radio)
- Do NOT touch files in `apps/web/app/bearsville/` or `apps/web/app/studioc/` — those are the correct pages for Bearsville content
- Do NOT touch `apps/web/lib/articles.ts` — the Studio C article with Utopia images is contextually correct (it's an article about Studio C)
- Do NOT touch `apps/web/app/gallery/gallery-data.ts` — Catskills images in the gallery are Chase's photography, intentionally there

## Total: 8 files, ~15 image references to replace
