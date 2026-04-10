# Mac Mini Media Processing — Prompt for Mac Mini Claude Code Agent

**Date:** April 8, 2026
**From:** Primetime (MacBook Pro agent)
**Priority:** HIGH — Chase needs marketing output NOW

---

## Context

Chase has been shooting photos and video on his iPhone — river shots, Under the Hill at golden hour, the bridge, Natchez scenes, promo B-roll for Big Muddy. He needs this content processed and ready for:
1. Website pages (full-bleed hero images)
2. Social media clips (short video loops, reels)
3. Marketing output (edited video, promo material)

The photos may be in one of these locations:
- iCloud Photos syncing to the Mac mini Photos library (`~/Pictures/Photos Library.photoslibrary/`)
- The MacBook Pro Photos library has 12,146 photos including tonight's shots
- Some may have been imported via Image Capture or AirDrop to `~/Downloads/`
- The iPhone may still be plugged into the Mac mini — check with `idevicepair validate`

## Task 1: Find Chase's Recent Photos and Videos

Check the Photos library on the Mac mini:
```sql
sqlite3 ~/Pictures/"Photos Library.photoslibrary"/database/Photos.sqlite "
SELECT ZFILENAME, ZUNIFORMTYPEIDENTIFIER, datetime(ZDATECREATED + 978307200, 'unixepoch') as date_taken
FROM ZASSET 
WHERE ZTRASHEDSTATE = 0 AND ZDATECREATED > 784080000
ORDER BY ZDATECREATED DESC LIMIT 50;"
```

Also check:
- `~/Downloads/` for any IMG_*.HEIC or IMG_*.MOV files
- If the iPhone is connected (`idevicepair validate`), use Image Capture or `ifuse` to pull media

We're looking for everything since November 2025 — especially:
- River/sunset shots (golden hour, the bridge, the bluff)
- Under the Hill scenes
- Downtown Natchez
- Any video clips (10-30 second B-roll)
- Promo footage Chase shot recently

## Task 2: Export and Process Photos

For every photo Chase wants to use:
1. Export from Photos library as full-res HEIC/JPEG
2. Convert to WebP: `cwebp -q 82 -resize 2400 0 input.heic -o hero.webp`
3. Make thumbnail: `cwebp -q 75 -resize 400 0 input.heic -o thumb.webp`
4. Upload to GCS: `gsutil cp hero.webp gs://bmt-media-bigmuddy/photos/natchez/`

Tools needed (install if missing):
- `brew install webp` (for cwebp)
- `brew install exiftool` (for EXIF extraction)
- gcloud auth may need refresh: `gcloud auth login`

## Task 3: Process Video for Marketing

Chase shot ~10 video clips tonight (IMG_3622 through IMG_3633, all .MOV files). He wants:

1. **River sunset loop** — find the best 10-second river/sunset clip, make it a seamless loop for website hero backgrounds
2. **Social clips** — trim the best moments from each video into 15-30 second clips for Instagram/TikTok
3. **B-roll reel** — cut all the best footage into a 60-90 second sizzle reel

Tools:
- `ffmpeg` for all video processing
- River loop: `ffmpeg -i input.mov -t 10 -vf "fade=t=in:st=0:d=1,fade=t=out:st=9:d=1" -c:v libx264 -crf 23 river-loop.mp4`
- Social clips: `ffmpeg -i input.mov -ss START -t DURATION -c:v libx264 -crf 23 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" clip-vertical.mp4`
- WebM for web: `ffmpeg -i input.mov -c:v libvpx-vp9 -b:v 2M -an river-loop.webm`

## Task 4: Create "Big Muddy Website" Album

In the Photos library, create a smart album or regular album called "Big Muddy Website" containing:
- All the best Natchez shots (river, bluff, downtown, architecture, music venues)
- The Under the Hill golden hour photo Chase shared tonight
- Any horn player / musician photos from the Bearsville highlights

This album becomes the source for the `photos-to-gcs.sh` pipeline. Add it to the watch list in that script.

## Task 5: Social Media System

Chase wants to show the social media system working. The Postiz instance is running on this Mac mini at port 4007:
- URL: http://192.168.4.37:4007
- Check if it's running: `curl -s http://localhost:4007`
- If not: check Docker containers or the install

The social flow should be:
1. Video clip processed on Mac mini
2. Uploaded to Postiz
3. Scheduled/posted to Instagram, TikTok, etc.
4. Show Chase the output

## Important Files

- `~/hillbilly-dreams/scripts/media/photos-to-gcs.sh` — existing photo pipeline (watches shared albums)
- `~/hillbilly-dreams/docs/MEDIA_METADATA_STANDARD.md` — the tagging rules (read this)
- `~/hillbilly-dreams/docs/MEDIA_TAGGING_FAILURE_ANALYSIS.md` — what went wrong before
- `~/hillbilly-dreams/.claude/agents/MEDIA_PIPELINE_FIX_PROMPT.md` — the database fix tasks

## Output

When done, report back:
- How many photos found and processed
- Which videos are ready (with paths)
- Whether the river loop is ready for the website
- Whether Postiz is running and ready for social posting
- Any blockers (auth, missing tools, etc.)
