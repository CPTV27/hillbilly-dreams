# Tracy & Amy Partner Review — 2026-04-18

*Pre-read for Chase. Brings Tracy and Amy current on what shipped between last sync and today, surfaces every decision the partners need to make in this meeting, and puts the financial asks in one frame.*

---

## Logistics

| | |
|---|---|
| **Date** | Saturday, April 18, 2026 |
| **Time** | Morning, after wake-up and before departure to New Orleans |
| **Location** | The Inn (in-person) |
| **Attendees** | Chase, Tracy, Amy, **possibly Rhea** |
| **Suggested length** | 45–60 min — 25 walking through artifacts, 25 decisions, 10 next steps |
| **Hard stop** | NOLA departure |

---

## What changed since the last sync

Four things, all material:

1. **Big Muddy Internal Directory shipped.** 459 records seeded across 10 categories (66 venues, 115 musicians, 39 festivals + 7 placeholder categories awaiting deeper research). Browse UI live at `/admin/directory`. This is the operational backbone for booking, press outreach, and the publicity-package product Tracy and I scoped earlier this week.

2. **Photo infrastructure is live.** Hetzner server up at `5.161.61.151`. Immich (the photo DAM) is running with TLS at https://immich.hillbillydreamsinc.com. **52,892 photos already ingested from the GCS bucket**, face detection + CLIP semantic search active, Chase's iPhone backing up automatically. T7 SSD sync from the Mac mini is in flight (~590 GB total, ~10% done, ETA 2.5 days, auto-restarts on drop). Full handoff at `docs/HANDOFF_HETZNER_MEDIA_INFRASTRUCTURE.md`.

3. **Studio C operator hire identified.** Elijah from Bearsville will run the photo archive end-to-end on top of the Immich stack. Clear engagement model ($50/hr, 40-hour starter block = $2,000). Removes the photo-archive bottleneck that's been blocking Chase Pierson Photography sales.

4. **Capital expenditure plan for Studio C kit is on the table.** $8.7K in week one, $22–25K full vision over 60 days. Driven by what's needed to deliver Studio C's premium tier and unblock Chase's stills pipeline.

---

## Decisions Tracy and Amy need to make today

Listed in priority order. Each item has a recommendation; partners decide.

### A. Video / camera capital — `docs/finance/VIDEO_KIT_BUDGET_APR2026.md`

| # | Decision | Recommendation | Rationale |
|---|---|---|---|
| A1 | **Approve Wave 1 ($8,750) this week** | YES | Unblocks Chase Pierson Photography revenue + Studio C premium tier |
| A2 | Sony a7R V vs a7 V (same $3,300) | **a7 V** — decided by Chase | Hybrid body, better for the video-into-Studio-C path |
| A3 | Profoto head model | **D2 (likely)** — Chase to double-check in the kit before ordering flashtube | Most common D-series; flashtube SKU is D2-specific |
| A4 | CF Express card quantity in Wave 1 | 2 cards now | One in body, one on standby; expand at Phase 1 |
| A5 | Financing vs cash | **B&H 12-month no-interest** | Preserves Q2 cash; payment is ~$730/mo against the kit |
| A6 | Purchase entity | **FarleyPierson LLC** | Tax-deductible; Chase reimburses if any personal use exceeds 20% |
| A7 | Ronin 4D expansion timing | Phase 1 unless show bookings pull it forward | Optional gear, not blocking |

### B. Photo archive operations — `docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md`

| # | Decision | Recommendation | Rationale |
|---|---|---|---|
| B1 | **Approve Elijah 40-hr block ($2,000)** | YES | Archive is unmanageable without an operator; photos are rotting in folders |
| B2 | Total photo volume estimate | **~1.3 TB confirmed** (T7 sync in progress; 52K already on Hetzner from GCS) | 1 TB Hetzner volume covers us for 6 months; upgrade to 10 TB Storage Box ~$25/mo when needed |
| B3 | Print-on-demand partner | **Bay Photo** for fine-art prints + **Printful** for casual merch | Bay = museum-quality at premium price; Printful = volume t-shirts/mugs at $20-30 margin |
| B4 | Gallery strategy | **Both** — `chasepierson.tv/gallery` for personal brand + Big Muddy `gallery/` for ecosystem traffic | Cross-link; same backing data |
| B5 | Pricing tiers | **3 tiers**: $50 / $150 / $500 | Easier for Elijah to apply; matches market for digital / open-edition / signed-print |

### C. Infrastructure / monthly burn

| # | Decision | Recommendation | Rationale |
|---|---|---|---|
| C1 | Approve Hetzner photo infrastructure ($45/mo ongoing) | YES | $40 server + $5 (1 TB volume) + GCS pass-through. Already executed; this is just ratification. |
| C2 | Synology integration via Tailscale (Elijah sets up) | YES, no $ | Read-only mount — Synology stays untouched |

### D. Rea engagement — Amy's band development — **DEFERRED**

**Outcome from the meeting (2026-04-18):** No immediate engagement with Rea. Reasoning: we need to get a bunch of other stuff done first (platform, Vicki, Paul Green, Studio C operator framework) before Rea would have the focus time for a band-dev cycle.

**Re-evaluate:** summer at Woodstock, OR fall when we're back at Big Muddy.

**For Amy's May 8 show:** Amy plays with the **Big Muddy Blues Band**, same lineup as the show last night. If a better bass player turns up between now and May 8, we swap. If Rea is still around and wants to play drums, that's optional. Otherwise, we don't worry about it.

D1–D5 are not active items. Do not surface as open threads.

---

## Financial snapshot — what's being asked tonight

| Bucket | One-time | Monthly | Notes |
|---|---|---|---|
| Camera/video Wave 1 | $8,750 | — | Or $730/mo for 12 months on B&H financing |
| Elijah starter block | $2,000 | — | Goes into Q2 P&L; expect 40 hrs over 4 weeks |
| **Rea band-dev block** | **TBD (~$2K?)** | — | Per Decision D2 — propose mirroring Elijah's structure |
| Hetzner photo stack | — | **$45/mo** | Already paid: $40 (CCX23) + $5 (1 TB block volume). GCS bucket continues at usage rate. |
| **TOTAL ASK TODAY** | **~$12,750** | **$45/mo** | |

> **Note:** Original plan called for a separate 10 TB Hetzner Storage Box at $25/mo (total ~$70/mo). The execution agent used a 1 TB block storage volume on the server itself for $5/mo instead — saves $20/mo, holds the current 1.3 TB archive comfortably. **If the archive grows beyond 1 TB (likely within 6 months), upgrade to the 10 TB Storage Box adds ~$25/mo at that point.**

**Cash position context:** Chase has a working sense of where we are; partners aren't asking for a formal number this meeting. Skip this slide unless Tracy opens the door.

**Phase 1 + Phase 2 (later asks, NOT tonight):** another $13.8–16.4K in camera/video over the next 60 days, contingent on production bookings justifying the spend.

---

## Revenue tie-in — why this pays back

| Investment | Revenue path | Time to payback (est) |
|---|---|---|
| Sony a7R V + 70-200 GM II ($6.3K) | Chase Pierson Photography stills bookings + portrait/print sales from archive | 6–9 months at $1K/mo bookings + archive sales |
| DJI Wireless TX ($1.1K) | Studio C premium tier ($4.5K/day vs $2K/day standard) | 1 booking |
| Elijah block ($2K) | Unblocks 1,000s of photos for sale; first sales in 30–60 days | 30–90 days at $200/mo print sales |
| Hetzner stack ($70/mo) | Archive lives, doesn't get lost, scales | Cost of doing business |

---

## Questions Tracy is most likely to push on

| Question | Answer |
|---|---|
| "Why $8.7K of camera gear right now?" | Studio C is selling premium video; we don't have the kit to deliver it. Also unblocks Chase's stills work which has clear demand. |
| "Why not lease?" | Camera bodies depreciate slowly when held 4-5 years; lease costs ~30% more over the same window. Lenses appreciate or hold value. |
| "Why $50/hr for Elijah?" | Below market for skilled archive curation (typical $65-85). He's in Bearsville so we don't carry overhead. |
| "Is Elijah reliable?" | _Chase to address — track record from Bearsville Studio work_ |
| "What's the Bearsville activation timeline?" | Chase visits next week to walk the property and set the plan. Active work begins immediately after we close out the Big Muddy items in this meeting. Summer activation still on track. |
| "What's happening with JP?" | JP's engagement is now scoped: he's delivering mixes from the First Arctic record and making a few New Orleans intros. End of engagement after that — not a permanent role. Info-only; no decision needed. |
| "What about Amy's band on May 8?" | Same lineup as last night — Amy with the Big Muddy Blues Band. If a better bass player appears, we swap. Rea optional on drums if she's still around. |
| "Print-on-demand revenue is unproven for us — what's our floor?" | Floor is zero — POD is consignment. Risk is only Elijah's $2K. Upside is 30%+ margins on prints with no inventory. |
| "Can we delay the Storage Box?" | Yes — Immich works without it for the first 1-2TB. But we'll need it within 30 days as ingest ramps. |

---

## Itinerary — next 3 weeks (so partners can plan around it)

| Window | Chase | Amy | Notes |
|---|---|---|---|
| Today (4/18) | Meeting → drive NOLA | Inn | |
| Late this week | NOLA — meeting musicians | Inn ops | |
| Next week | NY — few days to a week | Inn ops | Chase reachable but not in-state |
| Following week | Maybe Arkansas, then back to Natchez | Show prep with Big Muddy Blues Band | |
| **May 8** | Back for Amy's show | **Performing with Big Muddy Blues Band** | Same lineup as the show last night; bass player swap if a better one appears |
| After show | Drive van Natchez → Woodstock for supper | TBD | Bearsville activation event |

**Rea is not in this table.** Rea engagement deferred — see Decision D above. May reconsider summer (Woodstock) or fall (back at Big Muddy).

**Implication for the partners:** Chase is mostly mobile for the next 2–3 weeks. Anything that requires his sign-off needs to happen today or get queued for the post-show return. Tracy/Amy should know they hold the day-to-day rudder during this window.

---

## Risks the partners should hear from us first

1. **Cash burn timing.** $10.7K out the door in late April with the Inn season ramping up. Mitigated by B&H financing on the camera.
2. **Elijah is remote.** Bearsville is 1,200 miles from Natchez. Mitigated by Tailscale-based Immich access — no physical handoffs needed.
3. **Print-on-demand revenue is speculative.** No comp set in our portfolio yet. Mitigated by Elijah's $2K being the only at-risk capital; prints sit on someone else's inventory.
4. **Single-copy archive risk on the Hetzner volume.** Right now the 52K-photo Immich library lives on one Hetzner volume. If it dies, we lose face-recognition + tag work. **Followup queued: nightly rclone offsite backup to GCS** (`P20-storage-box-offsite-backup` in the agent queue). Cost: zero — uses existing GCS bucket.
5. **Storage will outgrow the 1 TB volume within 6 months.** Plan: upgrade to 10 TB Storage Box ($25/mo) when we cross 800 GB. Currently at ~600 GB after T7 sync completes.
6. **Tailscale free tier expires ~May 1.** Need to upgrade before that or admin access breaks. ~$5/mo per user. **Critical:** Chase is on the road most of the next 2–3 weeks. Either upgrade before Saturday or pre-authorize Tracy to do it from Bitwarden. If Tailscale goes dark while Chase is in NY, the Hetzner stack becomes hard to administer.

---

## What's left for the team after this meeting

Chase told Tracy: **"We're down to just working on pictures, stories, and words on the front end of the website."** That's the post-meeting workstream, broken into three clean lanes:

| Lane | Owner | What | Source feeds |
|---|---|---|---|
| **Pictures** | Elijah | Photo archive triage, AI tag QA, ready-for-sale curation, Topaz enlargements | Immich (already live), Hetzner stack, GCS commerce export to gallery site |
| **Stories** | Tracy | Magazine editorial — long-form pieces, artist features, Inn/region narrative | Big Muddy Magazine site, voice memos, interview transcripts, the directory of musicians |
| **Words** | Humanizer + per-brand voice docs | Site copy, page-by-page rewrites, brand voice consistency across touring/magazine/radio/records/entertainment | Chase voice doc (live), Tracy voice doc (Asana task sent), Amy voice doc (P24 in router) |

**These three lanes are how the front-end of the websites comes together.** Pictures supply the visual layer, stories supply the editorial layer, words supply the brand layer. The directory work that shipped this week is the structural backbone underneath all three.

Elijah's runbook for Pictures: `docs/STUDIO_C_ELIJAH_RUNBOOK.md` (Day 1 / Week 1 / ongoing).

---

## What's NOT on the agenda (intentional)

These are on the radar but not for tonight:

- **MBT positioning** — Chase is treating this as his separate open-source project; not a partner decision
- **DSD pricing changes** — locked April 5, no movement until 30 days of dogfood data
- **Bearsville activation deep planning** — Chase visits next week; partners get the plan after the property walk-through (briefed in passing if asked)
- **JP Houston extension** — current engagement (First Arctic mixes + NOLA intros) is final scope; no extension being discussed
- **Asana cleanup / agent infrastructure** — operator-level, no partner decision needed

---

## Suggested meeting flow

| Time | Block |
|---|---|
| 0:00–0:05 | Frame: four decision groups (A–D), three artifacts, one prep doc, hard stop is NOLA departure |
| 0:05–0:20 | Walk through artifacts (video budget → photo workflow → directory) |
| 0:20–0:35 | Decisions A1–C2 (most are yes/recommendation; few need real discussion) |
| 0:35–0:50 | **Decision D — Rea / Amy band development** (this is the live one; pause for real discussion) |
| 0:50–0:55 | Risks + cash position + Tailscale-while-Chase-travels item |
| 0:55–1:00 | Itinerary confirm + next 30 days commitments + who's holding the rudder |

---

## Artifacts to have open

- `docs/finance/VIDEO_KIT_BUDGET_APR2026.md` — line items + sources
- `docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md` — Elijah runbook
- `docs/hdi-review-board.html` — the broader context (open if Tracy asks "what about Magazine / Touring / Records?")
- `docs/router/QUEUE.md` — only if she asks "what are the agents doing?" — show the 17-project queue

---

## After the meeting — what Chase commits to

(Filled in by Chase post-meeting.)

- Decisions made: _____
- Action items for Chase: _____
- Action items for Tracy: _____
- Action items for Amy: _____
- Next sync: _____

---

*Prepared by Chief of Staff · 2026-04-18 · Update logistics block before walking in.*
