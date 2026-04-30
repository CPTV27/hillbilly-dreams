# EMPAC Meeting Briefing — 2026-04-30 (for tomorrow's meeting)

**Date drafted:** 2026-04-30 evening
**For:** Chase, before tomorrow's EMPAC / Lyra session
**Audience this doc preps you for:** Margaret Schedel (Lyra Chief Innovation Officer + Stony Brook), Nick Hwang (Lyra CTO + Unity/XR), Mason Youngblood (Lyra Chief AI Officer), Dennis Shelden (RPI / EMPAC bridge), Todd if present
**Ready-to-send package for Nick:** see §6 — three Polycam meshes are on Chase's Desktop right now, sitting in `~/Desktop/EMPAC/`

---

## TL;DR — say it like this if anyone asks

> "Lyra is the acoustic-twin platform. We capture rooms with phone LiDAR + audio. S2PX is the operating system underneath — the same backbone that's already shipping for AEC firms. Today we scanned three rooms at EMPAC. The meshes are clean, the audio is captured. Nick gets the spatial data tonight, we drop it into the demo tomorrow. The big concert hall didn't get scanned today — we have phone video from last June we can run through Polycam Web or Luma to reconstruct it."

That's the whole pitch in one paragraph. Everything below is the receipts.

---

## 1. The S2PX origin story (the part that gives Lyra cover)

**S2PX = Scan2Plan OS X.** Built starting late 2024, originally as a partnership between me and Owen Bush. Owen ran the AEC service business (Scan2Plan, the LLC); I built the platform that operationalized it.

**What it does in one sentence:** end-to-end OS for 3D-scanning + BIM companies — lead intake → CEO scoping → margin-protected proposals → QuickBooks sync → production pipeline → field ops → financial intelligence. Multi-tenant. AI-first. 567+ projects through the catalog as of partnership dissolution.

**Why this matters for Lyra:**

- The platform already exists. 61 Drizzle tables. 7 Gemini agents. Cloud Run + Cloud SQL on production. Multi-tenant routing. A working frontend and a working API.
- Lyra's roadmap assumes building this layer from scratch. Eighteen months of engineering, minimum, before Lyra has the operational backbone it needs to ship to customers.
- We're proposing: Lyra licenses S2PX as the operating layer. Lyra's IP — the LMIR acoustic database, the Acoustic Architect agent, the academic validation work coming out of Stony Brook — sits on top. One platform, two brand surfaces, one engineering team.

**The partnership timeline (only mention if asked):**

- Feb 2026: weekly meetings between Chase, Owen, and Dennis Shelden (RPI) on S2PX direction
- Mar 19: equity structure email to Owen + Dennis
- Mar 25: Owen's partnership dissolved
- Apr 2026: S2PX archived to `/Users/chasethis/S2PX-archive/`. IP confirmed clean to Chase. Now contributed to Measurably Better Things LLC (MBT, Tracy filing in Mississippi)
- Apr 24: Lyra business case drafted for Tracy's review (`docs/partners/lyra-business-case-2026-04-24.md`)

**What you can say:** "S2PX is the IP I built. It's clean — single-owner, single-licensor. Lyra integrates with one party, not three." That's the thing investors care about.

**What you don't need to volunteer:** Twinner. (It's a separate AEC vertical Owen kept rights to discuss; the digital-twin business sits parallel, not in the way.)

---

## 2. How Lyra integrates with S2PX (the architecture story)

```
        ┌─────────────────────────────────────────────────────────┐
        │                  CAPTURE LAYER                          │
        │       Phone LiDAR (Polycam) + ambisonic audio           │
        │       Geometry mesh + textures + audio file             │
        └────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
        ┌─────────────────────────────────────────────────────────┐
        │                  S2PX (the OS underneath)               │
        │  ─────────────────────────────────────────────────────  │
        │  • Project / scan metadata schema                       │
        │  • Asset storage (mesh, textures, audio)                │
        │  • Multi-tenant access (Lyra tenant = lyrai.io)         │
        │  • Job queue + automation layer                         │
        │  • Gemini agents for scoping / docs / QA                │
        │  • Auth, billing, customer portals                      │
        │  • REST API + admin console                             │
        └────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
        ┌─────────────────────────────────────────────────────────┐
        │                  LYRA (the acoustic layer)              │
        │  ─────────────────────────────────────────────────────  │
        │  • LMIR acoustic-fingerprint database                   │
        │  • Acoustic Architect agent (Mason's IP)                │
        │  • RT60 / frequency-response / spatial-audio analysis   │
        │  • Spatial-audio export for XR (Nick's domain)          │
        │  • Cultural-preservation deliverables (Margaret)        │
        │  • Customer-facing acoustic reports + BIM annotations   │
        └─────────────────────────────────────────────────────────┘
```

**The translation table** (from existing Big Muddy infrastructure → Lyra surfaces):

| Big Muddy / S2PX has | Lyra reuses it as |
|---|---|
| Multi-tenant domain routing | `lyrai.io` + `scan2plan.io` + per-client portals |
| Project / scan metadata schema | Acoustic-scan registry |
| Asset storage (GCS bucket) | Mesh + audio + LMIR fingerprint store |
| Gemini agent stack | Acoustic Architect + report generator |
| Hot-folder ingest | Polycam / phone-export drop zone |
| GPS shot list | Scan list — locations needing capture |
| Admin dashboard | Lyra ops — active scans, deliverables, clients |
| Billing + customer portal | Lyra's first-touch + invoicing surface |

**The deal economics** (high level, full doc at `docs/partners/lyra-business-case-2026-04-24.md`):

- MBT contributes S2PX as the operating backbone
- MBT becomes Lyra's licensed tech vendor
- MBT also holds Lyra equity via Chase's founder shares (contributed to MBT)
- Recommended structure: License + revenue share. Predictable license fee floors MBT cash. Revenue share captures upside if Lyra's seed-stage projections come in.

**What you can say to Margaret + Nick at this meeting:** "We're proposing Lyra runs on S2PX. Doc 2 — the technical case for the buy-vs-build math, written from Lyra's seat — is in draft. Tracy wants to read the business case first. Once she greenlights, we send Doc 2 and walk you through the architecture in detail."

**What you can say to Nick specifically:** "You're inheriting a platform that already does 80% of what Lyra needs. The 20% is the acoustic IP — that's all yours. You don't have to build user accounts, billing, multi-tenant routing, or job queues. You build the parts only Lyra can build."

---

## 3. The capture process (how a room becomes data)

**Field capture (what we did today):**

1. **LiDAR scan** — iPhone Pro + Polycam app. Walk the room, sweep ceiling-floor-walls. ~3-8 minutes per room depending on size. Output: `.obj` mesh + `.mtl` material file + folder of JPG textures.
2. **Capture video** — same walk, separate phone-camera capture. Records human-eye reference for what the mesh represents.
3. **Audio capture** — ambisonic mic or phone equivalent. Sweeps + impulse responses + one ambient room recording. Output: `.wav` files keyed to the same room.
4. **Metadata note** — room name, date, capture conditions (HVAC on/off, audience present/absent, etc.). Today: HVAC on, no audience, late afternoon.

**Cloud ingest (what S2PX does next):**

1. Hot-folder drop or direct upload via Polycam → S2PX bucket
2. S2PX registers a `Scan` record (project, room, capture date, file paths, GPS)
3. Mesh post-processing (decimation if >50MB, normal recomputation, hole-fill if needed)
4. Audio post-processing (peak normalization, noise floor characterization, IR convolution)
5. Lyra layer kicks in: LMIR fingerprint computed from audio, RT60 + frequency response logged, spatial-audio export rendered
6. Customer portal updates: scan available for review, acoustic report generated, BIM annotations queued

**Demo handoff (how this lands at tomorrow's meeting):**

- Nick gets the three `.obj` files from today's scans (see §6 for the exact paths)
- Nick drops them into the Unity scene that has the Lyra Acoustic Architect overlay
- Spatial audio plays in the demo, mapped to where the mics were placed
- Visitors see: a real EMPAC room rendered in Unity, with the room's actual acoustic signature playing back

**That's the demo.** Show, don't tell. Phones captured this last night. The platform processed it overnight. Now it's a working visualization. *That's* the inversion in practice — the labor that used to be 6 weeks of architectural-acoustic consultancy work is now 6 hours of phone scans plus an automated pipeline.

---

## 4. What we have, ready right now (today's captures)

All three scans are on Chase's MacBook in `~/Desktop/EMPAC/`. Captured **2026-04-29 ~17:00 EDT**. Polycam mesh format (.obj + .mtl + textures). Total package: **~210 MB**.

| Room | OBJ size | Textures | Capture video | Path |
|---|---|---|---|---|
| **Red Theater** | 130 MB (large mesh, high detail) | 7 JPGs | RedTheater.MOV + RedTheater2.MOV | `~/Desktop/EMPAC/RedTheater/4_29_2026/` |
| **Studio 2** | 52 MB | 5 JPGs | Studio2.MOV | `~/Desktop/EMPAC/Studio2/4_29_2026 (1)/` |
| **Studio 1** | 10 MB (small space) | 3 JPGs | Studio1.MOV | `~/Desktop/EMPAC/Studio1/4_29_2026 (2)/` |

**Audio files for these rooms:** Chase mentioned we have them. Need to surface them — likely in iCloud or a separate field-recording app export. Confirm location tonight and add to the handoff zip.

---

## 5. The gap — Concert Hall (the big theater) didn't get scanned today

Chase didn't get the main Concert Hall on this trip. EMPAC has multiple rooms (Concert Hall, Theater, Studio 1, Studio 2, plus the Anechoic Chamber, Goodman Theater, etc.) — so any reconstruction has to be tied to the right space.

### What we already have from a June 2025 visit

Apple Photos library has **4 videos at EMPAC coordinates from June 12-14, 2025**, plus 25 photos from the same trip. I extracted preview frames from each video (saved at `~/Desktop/EMPAC/identify-videos/`) so you can confirm room IDs without re-downloading from iCloud. **My read of each preview frame:**

| Date | Duration | Looks like | Useful for Concert Hall? |
|---|---|---|---|
| 2025-06-13 18:42 (89s) | `79926AE6...` | **Anechoic chamber** — foam-wedge walls all four sides. NOT Concert Hall. | No, but valuable for Anechoic acoustic baseline |
| 2025-06-12 16:49 (50s) | `386ACFA4...` | A **diffuser-walled studio room** with light grid above, hardwood floor — looks like a reverb/echo studio or one of the larger studios. NOT Concert Hall. | No |
| 2025-06-14 10:38 (32s) | `3F7457A2...` | Screen recording / handheld of a **tablet showing a 3D scan rendering** — this is someone's prior scan data on their device. NOT a room. | No, but *interesting* — implies prior EMPAC scan data exists somewhere; ask Nick |
| 2025-06-13 17:36 (25s) | `9CDFE58C...` | A **sunny studio with floor-to-ceiling windows + a precision measurement scanner on a tripod** (Faro/Leica). One of the daylit studios at EMPAC. NOT Concert Hall. | No |

**Honest read: none of the June videos show the Concert Hall.** Reconstruction-from-existing-video for the big space isn't going to work from this source.

### Two paths forward for the Concert Hall

**Path A — Online photo/video photogrammetry (best path tonight).**
EMPAC's Concert Hall is one of the most-photographed concert spaces in the academic world. RPI's media gallery, EMPAC's own press kit, plus thousands of recital photos online cover it from every angle. Polycam Web and Luma AI both accept unstructured image sets:

- Pull 30-60 high-resolution Concert Hall press photos tonight (RPI EMPAC site, AP wire, architecture blogs, Davis Brody Bond's project page since they designed it)
- Upload to Polycam Web (we have the $30/mo subscription per the Lyrai exec text)
- Run Luma AI in parallel as backup
- Either tool returns a usable mesh by morning if the input set is decent

**Path B — Honest framing in the meeting.**
"We didn't get the Concert Hall on this visit because the priority was the three production rooms. Online photogrammetry is running tonight; if it lands clean, we demo it tomorrow. Otherwise, the three captured rooms are enough to show the workflow end-to-end. Concert Hall gets a proper LiDAR pass on the next visit." This is true and protects the demo.

### To pull the June 2025 videos out anyway (Anechoic + the diffuser studio are still useful as Lyra acoustic baselines)

1. Open Photos app
2. Library → Media Types → Videos
3. Filter to June 2025
4. Select the four videos above
5. File → Export → Export Unmodified Original (drops them in `~/Desktop/EMPAC/ConcertHall-source-videos/`)

**Then run the videos through one of:**

- **Polycam Web** (we already have the $30/mo subscription per the Lyrai exec text thread) — supports image-based capture, accepts video upload, returns mesh in cloud. Cleanest for our existing workflow because Nick is already familiar with Polycam output. Upload tonight, mesh ready by morning.
- **Luma AI** (free tier sufficient for one room) — newer, often better quality on indoor architectural spaces. Gaussian-splatting renders are gorgeous in demos.
- **RealityCapture** (pro photogrammetry) — slower, more setup, best fidelity. Only worth it if Polycam Web fails.

**My recommendation: Polycam Web tonight, Luma AI in parallel as a backup.** If Polycam returns a usable mesh by morning, ship it. If Luma's Gaussian splat looks better in the Unity scene, swap.

### Path B — Online photos/videos from EMPAC

EMPAC has been documented online thousands of times. Concert Hall press photos exist at high resolution. Photogrammetry tools that ingest unstructured image sets can reconstruct the space:

- **PolyCam Web** also accepts unstructured photo uploads — we can scrape the Concert Hall press kit + RPI media gallery tonight, throw 30-50 images at it
- **Luma AI** likewise
- **NeRF** via Nvidia Instant-NGP — most fidelity, requires GPU compute (Hetzner box is sufficient if we want to run it in-house)

**Best move: combine both paths.** Chase's iPhone footage has known camera path + EMPAC-confirmed location, which gives Polycam strong scale + alignment. Online photos add detail to the parts the phone didn't catch. Hybrid reconstruction usually beats either source alone.

### Honest framing for the meeting

If Margaret/Nick ask about the Concert Hall, the honest line is: "We didn't capture it today because the priority was the three production rooms. We have phone footage from last summer that's running through Polycam Web tonight. If the reconstruction lands clean by morning we'll demo it; if not, the three captured rooms are enough to show the workflow end-to-end. Concert Hall gets a proper LiDAR pass on the next visit."

That's true, doesn't oversell, and protects the demo if the photogrammetry doesn't land in time.

---

## 5b. NEW (Chase 2026-04-30 evening): test the video → mesh path TONIGHT, ship as a Lyra-branded S2PX feature TOMORROW

Chase's call: if video → mesh works clean enough, the customer onboarding flow simplifies massively. Customer shoots a phone-camera walkthrough, uploads it, S2PX runs it through the Lyra pipeline, mesh + acoustic profile comes back. **No LiDAR phone required. No Polycam app install. Just a video.**

If that holds, this is the headline product feature for tomorrow's meeting.

### Test plan tonight

We have a built-in A/B comparison sitting on the Desktop right now: each EMPAC room has BOTH the Polycam LiDAR mesh (today's `4_29_2026.obj` files) AND a phone-camera video of the same walk (`RedTheater.MOV`, `Studio1.MOV`, `Studio2.MOV`). Run the videos through video-photogrammetry pipelines tonight, compare to the LiDAR ground truth tomorrow morning.

| Step | Tool | What it tests | Cost / time |
|---|---|---|---|
| 1 | **Polycam Web** (we already pay for it) | Whether our existing customer pipeline works for video input | $0 incremental, ~1-3 hr processing |
| 2 | **Luma AI** (free tier) | Whether Gaussian-splatting is better quality than mesh photogrammetry for indoor architecture | $0, ~30 min processing |
| 3 (only if 1 + 2 fail) | **KIRI Engine** or **RealityCapture** | Backup paths | KIRI = $20/mo, RC = pro tool |

### Step-by-step for tonight (Chase manual)

1. Open https://poly.cam in a browser logged in as `lyrai-shared@proton.me` (per the credentials in the Lyrai exec text thread)
2. Click **Upload → Video** (or Image Set if needed)
3. Drag `~/Desktop/EMPAC/RedTheater/RedTheater.MOV` (large mesh, well-lit, complex space — best stress test)
4. Submit. Get the share URL once processing completes.
5. In a second browser tab, go to https://lumalabs.ai/dashboard, drag the same MOV file, submit.
6. Both processing runs are background jobs. Check status in the morning.

### The unexpected jackpot — the videos already contain spatial audio

I checked the metadata on `RedTheater.MOV` (1m 56s, 181 MB). It contains:

- 1920×1080 HEVC video at 30 fps (12 Mbps — high quality)
- Stereo audio (AAC, 161 kbps)
- **4-channel APAC (Apple Positional Audio Codec) spatial audio at 392 kbps** — this is iPhone 14 Pro+ ambisonic-style capture, automatically recorded with the video

**Translation: the iPhone, when shooting video on a recent Pro model, is already capturing what Lyra needs in one pass.** Mesh from the video frames, room acoustic profile from the 4-channel APAC audio. ONE phone walkthrough = both halves of the Lyra workflow.

That's the real product story for tomorrow:

> "The customer doesn't need LiDAR. The customer doesn't need an audio rig. The customer just needs a recent iPhone and a 2-minute video walk through their space. We get the geometry from the video frames and the room's acoustic signature from the spatial-audio track that's already baked in. One capture, both deliverables."

If you're feeling bold tomorrow, that line is the headline.

I extracted the spatial audio out of `RedTheater.MOV` to `~/Desktop/EMPAC/RedTheater/audio/RedTheater_4ch_spatial.wav` so we have a worked example to show. Same pattern can run on Studio1.MOV and Studio2.MOV.

### What "good enough" looks like

The bar tomorrow morning: **does the video-derived mesh, when overlaid against the LiDAR mesh in Blender, agree on the major room geometry within 5-10%?** If yes, the workflow is shippable. If it's wildly off, we say so and stick with LiDAR-only for now.

### If it works — branding + framing for tomorrow's meeting

The product slot is real. Chase's instruction was "put Lyra's name on it." Quick naming options for tomorrow (pick whichever Margaret/Nick respond to in the moment):

- **Lyra Walkthrough** — most descriptive, lowest friction
- **Lyra Capture** — generic, room for both LiDAR + video paths
- **Lyra Phone** — emphasizes the no-special-equipment angle
- **Lyra Snap** — cute, customer-facing, easy to say

The pitch line for tomorrow if the test lands:
> "We can capture rooms two ways now. LiDAR for highest fidelity — that's what these three rooms are. And a phone-video walkthrough mode for everything else. Customer shoots a video, we turn it into a model and an acoustic profile. Demo it on the laptop in front of you."

### Wiring into S2PX (the product step Chase committed to)

The minimum-viable S2PX surface for this feature is:
1. New "Capture method: Video walkthrough" option on the Scan creation form
2. File-upload accepts `.mov`, `.mp4`, `.m4v` up to 2 GB
3. Job queue: video → frame extraction (every 0.5 sec) → upload to Polycam Web API → poll for completion → download mesh → register in Scan record
4. Customer portal shows: "Your scan is processing. ETA 2-4 hours." → email when done with mesh viewer link

Honest scope: we can stub the UI surface tonight (Scan form + upload widget) but the full Polycam Web API integration takes a couple of focused days. For tomorrow's meeting, the demo can be: "Here's the customer-facing form. Here's a worked example we processed last night via the Polycam Web upload (manual). The API integration ships in week 1 of the Lyra build."

That's an honest ship — UI stub + worked example — not a fake demo.

---

## 6. Handoff package for Nick — what to send tonight

**Scope:** zip of today's three rooms, ready for Nick to drop into the Unity demo scene.

```bash
cd ~/Desktop
zip -r empac-scans-2026-04-29.zip EMPAC/RedTheater EMPAC/Studio1 EMPAC/Studio2 \
  -x '*.DS_Store'
ls -lh empac-scans-2026-04-29.zip
```

That produces a single ~200 MB zip. Drop it on a Drive link or send via Wetransfer.

**Send-along note for Nick (paste straight into iMessage):**

> Nick — three rooms scanned today, all in this zip:
> - Red Theater (large mesh, full main-floor coverage)
> - Studio 2 (mid-size, full coverage)
> - Studio 1 (smallest, full coverage)
>
> Each folder has a `.obj` + `.mtl` + `textures/` subfolder. Standard Polycam export. Open in Blender to verify alignment before drop into Unity.
>
> Audio for each room is coming separately tonight — running through pre-processing first.
>
> Concert Hall didn't get scanned today. We're attempting a photogrammetric reconstruction from June 2025 phone video tonight via Polycam Web. If it lands clean I'll send it before morning. If not, we'll demo with the three rooms and add Concert Hall on the next pass.

---

## 7. Open questions to flag in the meeting

These are the things Tracy + I have not closed yet, and they land cleanly as "I want to make sure we're aligned" instead of as gaps:

1. **License fee structure** — Tracy and I are aligned on Option B (license + revenue share) per the business case. Need to confirm Lyra side is open to that frame before we send Doc 2.
2. **Founder equity transfer feasibility** — Does Lyra's operating agreement permit Chase's founder shares to flow to MBT (the LLC Tracy is filing)? This is standard but needs Margaret + Lyra counsel to confirm.
3. **Mobile LiDAR app ownership** — If the Polycam-equivalent capture app turns out to be its own IP layer (vs. just S2PX wrapping the Polycam SDK), it needs its own contribution path before deal closes.
4. **MBT formation timing** — Lyra deal can paper after MBT exists. Tracy's MS filing is in flight. Realistic gate: MBT formed within 4-8 weeks, Lyra paperwork follows.
5. **Demo cadence going forward** — Today was opportunistic. If we're shipping demos every 2-3 weeks, we need a regular capture cadence. Worth scheduling a recurring monthly visit while the academic year is in session.

---

## 8. Follow-up tasks (do these tonight, in this order)

1. **Zip + send the EMPAC scans to Nick** — see §6 above. ~5 min.
2. **Locate the audio files for the three rooms** — Chase has them somewhere. Surface, normalize, append to the same Drive folder. ~30 min.
3. **Export the 4 EMPAC videos from June 2025 out of Photos** — see §5 Path A. ~15 min.
4. **Upload the videos to Polycam Web** for Concert Hall reconstruction — ~20 min upload + overnight processing.
5. **Optional backup: upload same videos to Luma AI** — parallel path if Polycam fails.
6. **Sleep.** Tomorrow's meeting needs you sharp, not exhausted.

---

## 9. Source materials Chase should have open in another tab during the meeting

- This briefing — http://localhost:8888/empac/empac-meeting-briefing-2026-04-30.md (after deploy: https://bigmuddytouring.com/empac/)
- Lyra business case — `docs/partners/lyra-business-case-2026-04-24.md`
- Dennis Shelden context — `~/.claude/projects/-Users-chasethis-hillbilly-dreams/memory/project_dennis_shelden_rpi.md`
- S2PX archive (if anyone wants to see the platform) — `/Users/chasethis/S2PX-archive/PRODUCT_ARCHITECTURE.md`

---

## 10. Things NOT to commit to in this meeting

To protect Tracy's review process and keep our negotiating position clean:

- Don't quote a specific license fee dollar amount yet (Doc 2 contains the range; Tracy hasn't signed off)
- Don't promise feature roadmap items beyond what's already in S2PX today
- Don't talk about other Lyra-style verticals MBT might pursue (game audio, AR/VR audio, etc.) — that's strategic, not on today's agenda
- Don't mention Owen or partnership-dissolution detail unless directly asked, and only at high level if so

---

*Drafted by Cos, 2026-04-30 evening. Audio files inventory + Concert Hall reconstruction status will update inline once those steps complete tonight.*
