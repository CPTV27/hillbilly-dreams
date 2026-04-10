# TASK: 30-Second Apple-Style Product Trailer

**Status:** QUEUED — media generation agents pick up
**Requested by:** Chase
**Priority:** HIGH — presentation asset, needed ASAP
**Created:** 2026-04-10

---

## The Ask

A 30-second Apple-style product walkthrough trailer that shows off the full Hillbilly Dreams / Big Muddy / MBT ecosystem AND demonstrates our own video generation, voice generation, and AI capabilities as the proof point.

This is both the trailer AND a capability demo. The medium is the message.

---

## Voice Over Script (≈28 seconds at 170 WPM)

```
[0:00]  In Natchez, Mississippi, something is happening.
[0:03]  A radio show. A record label. A magazine.
[0:06]  A house band. A hotel. A town.
[0:09]  One team built it all.
[0:11]  Then they built the platform that runs it.
[0:14]  Same engine. Different skin.
[0:16]  Now any town, any broker, any business
[0:19]  can have their own media company
[0:21]  without building one from scratch.
[0:23]  We shoot it. We set it up.
[0:25]  You never think about it again.
[0:27]  Measurably Better Things.
[0:29]  From the river up.
```

**Voice direction:** Warm male baritone. Southern but not cartoonish. Documentary-grade, like a Ken Burns film. Not salesy. Confident, understated, unhurried.

**Voice model:** ElevenLabs primary → Cloud TTS Journey fallback
**Preferred voice:** Something in the range of "Adam" / "Daniel" / a Sam Elliott-adjacent register

---

## Shot List (Storyboard)

| Time | Shot | Audio Beat |
|------|------|------------|
| 0:00–0:03 | Aerial pull-back from the Mississippi River at golden hour, Natchez bluff in frame | River ambience, distant horn |
| 0:03–0:06 | Rapid triple cut — radio on-air light, vinyl press, magazine spread flipping | Mic click, vinyl pop, page turn |
| 0:06–0:09 | Triple cut — house band at the Blues Room, Inn hallway with guests, downtown storefronts | Crowd murmur, guitar note, birds |
| 0:09–0:11 | Hero shot — Chase at the console, warm side light, hands on the board | Low hum of gear |
| 0:11–0:14 | Screen content morph — the MBT platform UI assembling itself, Glass Engine aesthetic | Soft interface chimes |
| 0:14–0:16 | Logo reveals for Big Muddy properties sliding past | Whoosh, ambient tone |
| 0:16–0:19 | Town square / Main Street timelapse — businesses lighting up | Community ambience |
| 0:19–0:21 | Real estate broker at a listing, then same photo in the magazine | Camera shutter |
| 0:21–0:23 | Crew setting up a shoot — Studio C logo just visible | Equipment clink |
| 0:23–0:25 | MBT dashboard populating with content autonomously | Subtle data beeps |
| 0:25–0:27 | Sunset over the Mississippi — client closes laptop, walks away smiling | Warm exhale, ambient |
| 0:27–0:29 | Logo lockup: "Measurably Better Things" + "A Hillbilly Dreams Company" | Final musical resolution |

---

## Visual Style

- **Aesthetic:** North Star Manifesto — photography first, technology invisible. Glass Engine for UI moments.
- **Color grade:** Warm amber + deep teal + film blacks. Natchez golden hour palette. Matches brand: `#0a0a08` / `#e8e0d4` / `#c8943e`.
- **Typography:** Georgia serif display for text moments. All caps amber labels at 0.3em letter-spacing.
- **No stock footage.** Real Natchez, real corridor. Pull from:
  - `gs://bmt-media-bigmuddy/real/*`
  - `apps/web/public/images/corridor/*`
  - `apps/web/public/images/processed/big-muddy/*`
  - Chase Pierson photo library (16,936 photos in `/admin/photos`)

## Sound Design

- **Music:** Original, instrumental, southern roots with modern undertone. Guitar + upright bass + light strings. Build from sparse to full. Resolve warm.
  - **Source:** Generate via Suno or similar, OR pull from Big Muddy Records library if available.
- **Sound effects:** Studio-grade Foley. Room tone from the actual Studio C rooms preferred.
- **Mix:** Leave headroom. VO always on top. No mud.

## Text Overlays

Minimal. Only use where the image needs a caption. Suggested moments:
- 0:03 — "BIG MUDDY TOURING" (tiny, amber, top-left)
- 0:14 — "ONE PLATFORM" (center, briefly)
- 0:27 — Final logo lockup

---

## Pipeline

**Stage 1 — Script + Storyboard lock**
- Confirm VO script (above)
- Confirm shot list (above)
- Chase approves before generation starts

**Stage 2 — Voice generation**
- Tool: ElevenLabs (primary) or Cloud TTS Journey (fallback)
- Output: `assets/trailer-30s/vo.wav` @ 48kHz/24-bit
- Deliver 3 takes with slightly different pacing

**Stage 3 — Video generation**
- Tool: Veo 3 (primary per `lib/ai-models.ts`)
- Per-shot generation using the shot list above
- For UI/platform moments: screen-record from the actual live site at `bigmuddytouring.com/demo/presentation`
- Output: `assets/trailer-30s/shots/*.mp4`

**Stage 4 — Music generation**
- Tool: Suno or equivalent
- Brief: southern roots, instrumental, 30-second arc, warm resolution
- Output: `assets/trailer-30s/music.wav`

**Stage 5 — Assembly**
- Tool: Studio C editor / DaVinci Resolve on Mac mini (preferred) or ffmpeg for agent-driven assembly
- Output: `assets/trailer-30s/final.mp4` @ 1080p 24fps H.264
- Also deliver: 9:16 vertical cut for social, 1:1 square cut for IG feed

**Stage 6 — Delivery**
- Upload to `gs://bmt-media-bigmuddy/trailers/mbt-30s-v1.mp4`
- Post to Postiz ready queue
- Notify Chase via Google Chat webhook

---

## Acceptance Criteria

- [ ] 30 seconds ± 1 second
- [ ] VO matches the script exactly
- [ ] All footage is Natchez / corridor real — no generic stock
- [ ] Logo lockup is correct (Measurably Better Things + A Hillbilly Dreams Company)
- [ ] No copyright-claimable music
- [ ] Delivered in 16:9, 9:16, 1:1
- [ ] No typos in text overlays
- [ ] Chase gets a preview link before anything goes public

---

## Agents to Route To

- **Media Generation Agent** — orchestrator
- **Voice Generation subtask** — ElevenLabs / Cloud TTS
- **Video Generation subtask** — Veo 3
- **Music Generation subtask** — Suno or equivalent
- **Assembly subtask** — Mac mini editor or ffmpeg pipeline
- **QA Agent (QA_CHASE)** — final pass before delivery

---

## Notes

- This is a capability demo as much as a product trailer. Every tool used should be our own stack.
- If any stage blocks (API quota, model availability), log it in `docs/tasks/PENDING_ISSUES_QUEUE.md` and continue other stages.
- First draft does not need to be perfect. Chase will iterate.
