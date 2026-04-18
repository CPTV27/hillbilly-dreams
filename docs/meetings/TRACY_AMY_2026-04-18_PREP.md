# Tracy & Amy Partner Review — 2026-04-18

*Pre-read for Chase. Brings Tracy and Amy current on what shipped between last sync and today, surfaces every decision the partners need to make in this meeting, and puts the financial asks in one frame.*

---

## Logistics

| | |
|---|---|
| **Date** | Saturday, April 18, 2026 |
| **Time** | _TBD_ |
| **Location** | _TBD (Inn vs phone)_ |
| **Attendees** | _TBD (Tracy only, or Tracy + Amy)_ |
| **Suggested length** | 45 min — 20 walking through artifacts, 20 decisions, 5 next steps |

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
| A2 | Sony a7R V vs a7 V (same $3,300) | a7R V | Stills-forward; portrait/print archive is the bigger near-term revenue driver than hybrid video |
| A3 | Profoto head model (D1/D2/B1X/B10/Pro-11) | _Chase to confirm what's already in the kit_ | Determines flashtube SKU |
| A4 | CF Express card quantity in Wave 1 | 2 cards now | One in body, one on standby; expand at Phase 1 |
| A5 | Financing vs cash | **B&H 12-month no-interest** | Preserves Q2 cash; payment is ~$730/mo against the kit |
| A6 | Purchase entity | **FarleyPierson LLC** | Tax-deductible; Chase reimburses if any personal use exceeds 20% |
| A7 | Ronin 4D expansion timing | Phase 1 unless show bookings pull it forward | Optional gear, not blocking |

### B. Photo archive operations — `docs/STUDIO_C_PHOTO_ARCHIVE_WORKFLOW.md`

| # | Decision | Recommendation | Rationale |
|---|---|---|---|
| B1 | **Approve Elijah 40-hr block ($2,000)** | YES | Archive is unmanageable without an operator; photos are rotting in folders |
| B2 | Total photo volume estimate | _Chase to confirm — drives Storage Box sizing_ | BX31 is 10TB, can upgrade if needed |
| B3 | Print-on-demand partner | **Bay Photo** for fine-art prints + **Printful** for casual merch | Bay = museum-quality at premium price; Printful = volume t-shirts/mugs at $20-30 margin |
| B4 | Gallery strategy | **Both** — `chasepierson.tv/gallery` for personal brand + Big Muddy `gallery/` for ecosystem traffic | Cross-link; same backing data |
| B5 | Pricing tiers | **3 tiers**: $50 / $150 / $500 | Easier for Elijah to apply; matches market for digital / open-edition / signed-print |

### C. Infrastructure / monthly burn

| # | Decision | Recommendation | Rationale |
|---|---|---|---|
| C1 | Approve Hetzner photo infrastructure ($70/mo ongoing) | YES | $40 server + $25 storage + ~$5 GCS = backbone for Immich + photo archive + Postiz/Open Notebook |
| C2 | Synology integration via Tailscale (Elijah sets up) | YES, no $ | Read-only mount — Synology stays untouched |

---

## Financial snapshot — what's being asked tonight

| Bucket | One-time | Monthly | Notes |
|---|---|---|---|
| Camera/video Wave 1 | $8,750 | — | Or $730/mo for 12 months on B&H financing |
| Elijah starter block | $2,000 | — | Goes into Q2 P&L; expect 40 hrs over 4 weeks |
| Hetzner photo stack | — | **$45/mo** | Already paid: $40 (CCX23) + $5 (1 TB block volume). GCS bucket continues at usage rate. |
| **TOTAL ASK TONIGHT** | **$10,750** | **$45/mo** | |

> **Note:** Original plan called for a separate 10 TB Hetzner Storage Box at $25/mo (total ~$70/mo). The execution agent used a 1 TB block storage volume on the server itself for $5/mo instead — saves $20/mo, holds the current 1.3 TB archive comfortably. **If the archive grows beyond 1 TB (likely within 6 months), upgrade to the 10 TB Storage Box adds ~$25/mo at that point.**

**Cash position context:** _Chase to plug current bank balance and pending receivables before walking in. The $10.7K is real, not theoretical._

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
| "What's the Bearsville activation timeline?" | Summer 2026 still; this archive work is the groundwork (catalog must exist before Bearsville can sell prints) |
| "Print-on-demand revenue is unproven for us — what's our floor?" | Floor is zero — POD is consignment. Risk is only Elijah's $2K. Upside is 30%+ margins on prints with no inventory. |
| "Can we delay the Storage Box?" | Yes — Immich works without it for the first 1-2TB. But we'll need it within 30 days as ingest ramps. |

---

## Risks the partners should hear from us first

1. **Cash burn timing.** $10.7K out the door in late April with the Inn season ramping up. Mitigated by B&H financing on the camera.
2. **Elijah is remote.** Bearsville is 1,200 miles from Natchez. Mitigated by Tailscale-based Immich access — no physical handoffs needed.
3. **Print-on-demand revenue is speculative.** No comp set in our portfolio yet. Mitigated by Elijah's $2K being the only at-risk capital; prints sit on someone else's inventory.
4. **Single-copy archive risk on the Hetzner volume.** Right now the 52K-photo Immich library lives on one Hetzner volume. If it dies, we lose face-recognition + tag work. **Followup queued: nightly rclone offsite backup to GCS** (`P20-storage-box-offsite-backup` in the agent queue). Cost: zero — uses existing GCS bucket.
5. **Storage will outgrow the 1 TB volume within 6 months.** Plan: upgrade to 10 TB Storage Box ($25/mo) when we cross 800 GB. Currently at ~600 GB after T7 sync completes.
6. **Tailscale free tier expires ~May 1.** Need to upgrade before that or admin access breaks. ~$5/mo per user. Flagging for budget.

---

## What's NOT on the agenda (intentional)

These are on the radar but not for tonight:

- **MBT positioning** — Chase is treating this as his separate open-source project; not a partner decision
- **DSD pricing changes** — locked April 5, no movement until 30 days of dogfood data
- **Bearsville site activation** — summer 2026, separate planning session in May
- **JP Houston deal** — not finalized; not yet in partner-facing materials
- **Asana cleanup / agent infrastructure** — operator-level, no partner decision needed

---

## Suggested meeting flow

| Time | Block |
|---|---|
| 0:00–0:05 | Frame: three asks, one prep doc, decisions in writing today |
| 0:05–0:20 | Walk through artifacts (video budget → photo workflow → directory) |
| 0:20–0:35 | Decisions A1–C2 (most are yes/recommendation; few need real discussion) |
| 0:35–0:40 | Risks + cash position frank-talk |
| 0:40–0:45 | Next 30 days commitments + who's doing what |

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
