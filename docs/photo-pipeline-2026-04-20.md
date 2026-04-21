# Photo Pipeline — Canonical Reference

**Date:** April 20, 2026 (documenting Patch's work through April 18 + making it reproducible after mini shutdown).
**Origin:** Patch (Mac mini agent) built this pipeline over April 14–18, 2026. Scripts lived in `/tmp` and were lost when macOS cleared the tmp dir. **Outputs survived on T7 + GCS.**
**Companion:** `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` for general infra; this doc is the photo-specific layer.

---

## 1. Current state (as of 2026-04-18 pipeline run + 2026-04-20 backup)

**What Patch processed:** 1,609 Sony A7 ARWs + 27 SnapCam videos from the Natchez trip dump.

**Distribution (from `reports/ai-analysis-summary.json`):**
- 1,607 analyzed
- 0 five-star (Gemini was conservative — 4-star is the real hero bar)
- 12–13 four-star "heroes"
- 577 three-star keepers
- 463 total 3+ star (the DxO select-option-B target)
- 1,533 XMP sidecars written next to ARWs on T7 (Lightroom reads them)

**Hero shots Patch flagged (by filename, look for these first):**
- `DSC05139` — woman with flashlight at John Lee Sr Chinese tombstone at night
- `DSC05057` — woman on Rufus L Case tomb at dusk
- `DSC05850` — three seniors helping each other from a van (humanist cover candidate)
- `DSC05962` — two women at casino slots (documentary gold)
- `DSC05031` — Chase photographing on the tomb (meta BTS)

---

## 2. Canonical URLs (publicly accessible; all via GCS allUsers:objectViewer)

Live gallery + slideshow from Patch's April 18 run. Bookmark these before the mini goes offline — they survive mini shutdown because they're on GCS.

**Mobile review (phone-friendly):**
https://storage.googleapis.com/bmt-media-bigmuddy/review/2026-04-18/index.html

**Slideshow of 590 keepers:**
https://storage.googleapis.com/bmt-media-bigmuddy/review/2026-04-18-slideshow/index.html

**Approved folder (229 curated Chase photos, used by the Next.js platform):**
`gs://bmt-media-bigmuddy/approved/` — list via `gsutil ls gs://bmt-media-bigmuddy/approved/`

**Hero previews (13 four-star shots):**
`gs://bmt-media-bigmuddy/review/2026-04-18-heroes/`

**SnapCam (8mm video) thumbnails (5):**
`gs://bmt-media-bigmuddy/review/2026-04-18-snapcam/`

**Pipeline state backup (small metadata, 590 KB):**
`gs://bmt-media-bigmuddy/pipeline-state/2026-04-20/`
  - `reports/` — ai-analysis-summary.json, standouts.json, a7-exif-inventory.csv, preview-generation.log
  - `sessions/sessions.json` — EXIF-time-gap session clusters
  - `dxo-queue/` — dxo-all-raws.txt (1,609 paths), dxo-ai-selects.txt (463 paths), README with processing instructions
  - `gallery-index.html` — the local HTML gallery template

---

## 3. The pipeline, reproducible

**Inputs:**

- Camera dumps to `/Volumes/T7/__111aaaINGEST/100MSDCF/*.ARW` (Sony A7)
- SnapCam 8mm videos to `/Volumes/T7/__111aaaINGEST/SnapCamp/*.MP4`
- Workspace: `/Volumes/T7/__111aaaINGEST/WORKSPACE/`

**Pipeline stages (rebuild if needed):**

### Stage 1 — Preview generation

Tool: macOS `sips` (ARW native).
Output: JPEG thumbnails in `WORKSPACE/previews/`
Notes: sips handles Sony ARW with no extra drivers on macOS. One-liner: `for f in *.ARW; do sips -s format jpeg "$f" --out previews/ ; done`

### Stage 2 — Session clustering

Input: EXIF timestamps on all ARWs.
Method: Python script groups photos into sessions by time gap (>30 min between frames = new session).
Output: `WORKSPACE/sessions/sessions.json`

### Stage 3 — Gemini analysis

Model: `gemini-2.5-flash` (cheap, fast)
Auth: service account at `/Volumes/T7/BigMuddy/bigmuddy-sa-key.json` when ADC expires (~24h)
Prompt: asks for subject, description, rating 0-5, tags, emotion, composition, focus, story_value
Output: one JSON per photo in `WORKSPACE/ai-analysis/<DSC...>.json`
**Key setting:** `maxOutputTokens: 2048` (not 1024 — smaller value truncated ~19 files in Patch's run)
Cost at ~1,609 images: low tens of dollars on Gemini Flash.

### Stage 4 — XMP sidecar writing

Script writes `<DSC...>.xmp` next to each `<DSC...>.ARW` on T7.
Content: Gemini tags + rating as XMP rating + keywords.
Result: Lightroom CC auto-detects the sidecars on import and shows all tags + ratings.
This is Patch's most valuable contribution — the tagging is preserved in files Lightroom understands.

### Stage 5 — Gallery + slideshow generation

HTML templates that read the Gemini JSON outputs + embed preview JPEGs.
Uploaded to `gs://bmt-media-bigmuddy/review/<date>/` with bucket-level `allUsers:objectViewer` so anyone with the URL can see it. No auth needed, but URLs are obscure-by-default (date-scoped).

### Stage 6 — DxO queue build

Two text files of ARW paths:
- `dxo-all-raws.txt` — every ARW (1,609 lines)
- `dxo-ai-selects.txt` — 463 lines, 3+ star only

Chase or Cos opens DxO PhotoLab on MBP, "Import selected RAWs," points at the file list, hits Process. Output: DNG files with DxO DeepPRIME XD2s noise reduction applied. Ingests into Lightroom after.

---

## 4. Snapcam (8mm video) pipeline

27 MP4 clips from Chase's 8mm SnapCam from the same trip.

**Tools:**
- ffmpeg for thumbnail extraction + audio stripping
- Gemini for voice transcription (camera files) + video content analysis
- For long clips (>20 min): upload to GCS first, Gemini reads via GCS URI (avoids timeout on local upload)

**Output:**
- `WORKSPACE/snapcam/<clip>-thumb.jpg`
- `WORKSPACE/snapcam/<clip>-transcript.txt`
- `WORKSPACE/snapcam/<clip>-analysis.json`

5 thumbnails + analysis uploaded to `gs://bmt-media-bigmuddy/review/2026-04-18-snapcam/`.

---

## 5. Scripts — lost in /tmp, recreate when needed

Patch originally kept the pipeline scripts in `/tmp/` on the mini. macOS clears `/tmp/` on reboot. By the time I tried to commit them to the repo, they were gone.

**Action for next iteration:** when Chase is in NY and next photo batch arrives (or when he wants to re-run the pipeline), Patch recreates the scripts and commits them to `scripts/photo-pipeline/` in the repo. The OUTPUTS from the April 18 run survive on T7 + in GCS, so the loss is scripts only — not data.

**What the scripts were (recreatable from this doc + Patch's knowledge):**

- `bmm-ingest-phase1-cluster.py` — session clustering by EXIF time gap
- `bmm-generate-previews.sh` — `sips`-based ARW → JPEG preview generator
- `bmm-gemini-v2.py` — Gemini 2.5 Flash batch analyzer (the core of the pipeline)
- `bmm-retry-errors.py` — retry wrapper for truncated JSON responses
- `bmm-tag-iptc-v2.py` — XMP sidecar writer (the Lightroom-integration output)
- `bmm-build-gallery.py` — local HTML gallery generator
- `bmm-build-dxo-list.py` — DxO queue file generator
- `bmm-snapcam-pipeline.py` — SnapCam video transcribe + analyze pipeline
- `transcribe-clips-gemini.sh` — v1 camera-file transcription wrapper
- `transcribe-long-clips.sh` — v2 GCS-URI transcription for clips >20 min
- `id3-audit-radio-library.py` — ID3 tag auditor (ran against 144-track radio rotation)
- `bmm-hero-mobile.html` — mobile review HTML template
- `bmm-slideshow.html` — slideshow HTML template

**Governance note:** in line with the infrastructure-governance rule, any scripts that run production pipelines must be committed to the repo with a runbook. `/tmp/` is not acceptable storage for anything we might need again. This applies to both Patch + Cos.

---

## 6. Gotchas Patch hit (document so we don't repeat)

1. **T7 is exFAT.** Creates `._*` resource-fork files on parallel writes. Any glob must filter `startswith('._')`.
2. **ADC tokens expire ~24h.** Use the service account at `/Volumes/T7/BigMuddy/bigmuddy-sa-key.json` as the stable fallback for Gemini + GCS.
3. **Bucket uniform IAM.** Don't use `gsutil acl ch` — objects inherit bucket's `allUsers:objectViewer`, public by default.
4. **Gemini conservatism on 5-star.** 0 five-star across 1,607 photos. Treat 4-star as the real hero bar.
5. **`maxOutputTokens: 1024` truncates JSON.** Use 2048 minimum.
6. **ingest-music.ts schema mismatch** — Prisma wanted `name` + `sharePercent`; earlier draft had `recipientName` + `percentage`. Chase committed fix as `cf33037`.

---

## 7. Active work queue for Cos (me — MacBook)

1. **DxO processing run** — 1,609 ARWs on the MBP. Estimated 9 hours overnight.
   - Queue file: `/Volumes/T7/__111aaaINGEST/WORKSPACE/dxo-queue/dxo-all-raws.txt`
   - Output dir: `/Volumes/T7/__111aaaINGEST/WORKSPACE/dxo-output/`
   - Settings: DxO DeepPRIME XD2s
   - ~60 GB DNG output expected
   - **Blocker:** T7 is traveling with Chase to Woodstock. The DxO run needs T7 mounted. When Chase + T7 are in NY (~Apr 27), I kick off the run overnight.
2. **Confirm Immich is seeded.** Log into https://immich.hillbillydreamsinc.com and count assets.
3. **Confirm Postiz + Open Notebook migration status.** Both listed as "planned" in Bitwarden; neither deployed to Hetzner yet.

---

## 8. Ongoing sync plan (Chase, 2026-04-20 PM)

Per Chase's direction tonight, the T7 data gets migrated to cloud via:

1. Chase takes T7 to Woodstock (with him on the drive)
2. Plugs T7 into the **Studio C Synology NAS**
3. T7 → Synology: one-time copy of the whole workspace
4. **Synology ↔ cloud in ongoing sync:**
   - Photos → Hetzner Immich (per the Elijah Asana task, on hold until Chase arrives)
   - Photos also → `gs://bmt-media-bigmuddy/` via gsutil rsync
   - Both layers, belt + suspenders

Synology becomes the canonical local mirror; cloud is the canonical remote. T7 becomes the historical origin but doesn't have to be connected for daily work.

---

## 9. Open questions for the next pipeline run

1. **Two Gemini API keys in Bitwarden** (chasepierson.tv + Hillbilly Dreams) — Patch used which one? Consolidate before next run.
2. **Output format decision** — keep Gemini analysis as one JSON per photo (current) or roll into a single `analysis.json` + `.jsonl` lookup table?
3. **Lightroom CC handoff** — Patch wrote XMP sidecars next to ARWs. When Chase imports into LR CC, does he get every tag + rating? Verify first time through.
4. **DxO output as DNG vs TIFF** — DNG is smaller + more Lightroom-friendly, but TIFF preserves more for grading. Current default: DNG.

---

*End of photo pipeline reference.*
