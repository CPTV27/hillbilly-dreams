# Big Muddy Radio — Go / No-Go Decision

**Date:** 2026-05-11
**From:** Chase
**To:** Tracy, Amy
**Status:** Fact pack for joint partner decision. No recommendation taken.
**Scope:** Whether to keep investing in the Big Muddy Radio audio infrastructure stack, freeze it until audience milestones, or some structured middle path.
**Companion docs:**
- `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` — current state of the stack
- `docs/infrastructure-cost-reduction-analysis-2026-05-11.md` — broader cost picture this slots into
- `docs/THE_THESIS.md` — the touring + radio role in the ecosystem story

---

## 1. The situation

Big Muddy Radio runs on a four-piece audio infrastructure stack:

| Component | Where it lives | Monthly cost | Status |
|---|---|---|---|
| **AzuraCast** (24/7 streaming server) | DigitalOcean droplet `bigmuddy-radio` | $12–48 (DO cost TBC) | Running. SSL broken — using self-signed cert. Stream not publicly polished. |
| **Buzzsprout** (podcast hosting) | SaaS | $18 | Standard plan. Covers 3 hrs/mo of upload. |
| **ElevenLabs** (voice synthesis) | SaaS / API | $20–25 | Used by Delta Dawn agent voice + radio audio. |
| **Restream** (multi-destination streaming) | SaaS | $20–49 (paid via Studio C bucket) | Multi-stream from OBS to YouTube + FB Live etc. |
| **Total** | | **$70–140/mo** ($840–1,680/yr) | |

This is **15–18% of the current MBT software + infrastructure spend** going into the audio/radio stack.

## 2. What we know about current radio operations

- The AzuraCast stream is technically live but has a broken SSL cert (per CANONICAL_INFRASTRUCTURE §3.2). Fix is listed as an open action item, no completion date.
- Podcast hosting is on Buzzsprout Standard. Cadence and listener data not consolidated into this doc — needs to be pulled before deciding.
- Delta Dawn agent voice runs through ElevenLabs. GCP TTS Journey is provisioned as a fallback at $0–5/mo.
- Restream is on the Studio C subscription bucket; used for multi-destination live-streaming across Big Muddy brand channels.

## 3. What we don't yet know (and should before deciding)

- **Current podcast download / play counts** (Buzzsprout dashboard).
- **Current AzuraCast listener counts** — does anyone tune in to the stream today?
- **The actual DigitalOcean droplet cost** for `bigmuddy-radio`. The $12–48 range is wide.
- **The intended content cadence:** is there a planned weekly / monthly show schedule, or is the stream playing "whatever's loaded" today?
- **Delta Dawn voice usage volume** — how much of the ElevenLabs spend is voice synthesis for Delta Dawn vs. radio audio?

## 4. Options

### Option A — Freeze the audio stack

- Cancel or pause AzuraCast on DigitalOcean ($12–48/mo).
- Cancel Buzzsprout ($18/mo). If there's a back-catalog of episodes, migrate them to Spotify for Podcasters (free) or pause publishing entirely.
- Cancel ElevenLabs ($20–25/mo). Delta Dawn voice falls back to GCP TTS Journey ($0–5/mo).
- Re-evaluate Restream — if Studio C still needs it for multi-stream destinations (Inn shows, Blues Room), keep; if not, cancel ($20–49/mo).
- Big Muddy Radio's public output becomes curated Spotify playlists + occasional SoundCloud posts until audience milestones justify rebuilding the stack.
- Big Muddy brand sites continue mentioning "Big Muddy Radio" — but the link goes to the placeholder layer rather than a live stream.

**What it saves:** $70–140/mo immediate + zero operational load.
**What it costs:** loss of the live-radio narrative as a current-state claim; Delta Dawn voice quality degradation; some content production loses a publishing home.
**Operational impact:** the AzuraCast SSL fix, the production-cadence question, and the agent-voice-quality question all come off the active-issues list.

### Option B — Commit to the radio investment

- Fix the AzuraCast SSL (Let's Encrypt via the AzuraCast Certbot integration). Open action item gets closed.
- Define a real content cadence (weekly podcast, daily stream programming, etc.) and commit to producing it.
- Set audience milestones (listener counts, download counts) and revisit at each.
- Keep all four subscriptions running at current spend.
- Optionally upgrade — Buzzsprout to higher tier if cadence demands it; ElevenLabs voice library refresh if Delta Dawn needs more variation.

**What it costs:** $70–140/mo recurring + the time to fix SSL + the recurring time to produce content + an active commitment to the radio narrative.
**What it gains:** the radio remains a publicly polished surface of the Big Muddy ecosystem. Delta Dawn keeps her current voice. Podcast publishing pipeline stays warm.
**Operational impact:** all current open action items on the radio stack become real this-quarter work.

### Option C — Partial freeze

- Cancel ElevenLabs ($20–25). Delta Dawn fallbacks to GCP TTS Journey.
- Cancel AzuraCast hosting on DigitalOcean ($12–48). Live stream goes off until/unless we commit to fixing SSL + producing cadence.
- Keep Buzzsprout ($18) if there's a real podcast in production.
- Keep Restream ($20–49) if Studio C uses it for live show streaming separately from the radio.

**What it saves:** $32–73/mo (about half of Option A).
**What it costs:** loses the 24/7 stream and the ElevenLabs voice, keeps the podcast publishing surface and live-stream multi-destination capability.
**Operational impact:** SSL action item goes away. Voice-quality decision gets made by default. Podcast cadence question becomes the only one to answer.

### Option D — Status quo

No change. All four subscriptions continue. SSL stays broken until someone fixes it. Cadence stays undefined.

**What it saves:** $0.
**What it costs:** $70–140/mo + the recurring open action items.

## 5. Decision criteria — what would point toward which option

If the answer is "yes" to any of the questions below, **lean toward Option B (commit)** for that piece of the stack:

- Is there a recurring podcast or show with measurable listener growth?
- Is there a specific marketing or brand reason the live stream needs to be public this quarter?
- Is the Delta Dawn voice quality from ElevenLabs materially better than GCP TTS Journey for the partners who hear it?
- Is the Restream multi-destination feature actively used for show streaming?

If the answer to all of those is "no," **Option A (freeze)** is the alignment.

If some yes / some no, **Option C (partial)** keeps the pieces that are working.

## 6. What freezing does NOT touch

- The Big Muddy Records DistroKid + SoundCloud Pro stack ($24/mo). Records label distribution is separate from the radio stack.
- Big Muddy Records artist signings (Mechanical Bull, Arrie Aslin development, future signings).
- Big Muddy Records as a brand — the label keeps running.
- Spotify-as-marketing — curated playlists remain viable.

The freeze decision is specifically about the **broadcast / streaming infrastructure**, not about the label or the music output itself.

## 7. Decision points

| # | Decision | Tracy | Amy |
|---|---|---|---|
| 1 | Pick an option: A (freeze), B (commit), C (partial), or D (status quo)? | | |
| 2 | If A or C: do we keep Buzzsprout for the active podcast, or also drop it? | | |
| 3 | If C: which specific pieces stay vs. go? | | |
| 4 | What audience milestone would trigger a re-evaluation (download count, listener count, sponsor interest, etc.)? | | |
| 5 | Anything missing from §4 options or §5 decision criteria? | | |

## 8. What happens after partner sign-off

- **If Option A or C:** Chase executes cancellations + GCP TTS Journey voice migration within 2 weeks. New monthly cost reflects in the Q3 cost analysis refresh.
- **If Option B:** SSL fix + content cadence definition become Q2 priorities. New action items on the canonical task list. Re-evaluate at end of Q3.
- **If Option D:** the radio stack stays open as a known $70–140/mo recurring cost; SSL fix and cadence questions stay on the action item list.

## 9. Response

Either:
- **Async:** mark up §7 directly with your choice + any additions.
- **Sync:** 15 min on the phone — quick decision; this isn't a long conversation.

No clock pressure beyond the next monthly billing cycle. If we want to act this billing cycle, decisions by end of week.
