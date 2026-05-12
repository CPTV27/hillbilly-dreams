# Infrastructure Cost Analysis

**Date:** 2026-05-11
**Owner:** Chase
**Purpose:** Single-source roll-up of every recurring cost that runs the ecosystem. Reconciles the canonical infrastructure inventory and the ecosystem subscriptions doc against THE_THESIS break-even math.
**Source docs:** `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` · `docs/ecosystem-subscriptions-2026-04-20.md` · `docs/THE_THESIS.md`
**Companion data:** `docs/infrastructure-cost-analysis-2026-05-11.csv` — the same line items in a sortable / filterable form.

---

## TL;DR

- **Total MBT-paid software + infra spend today:** ~**$730–945/mo** = **~$8.8–11.3k/yr**.
- **Hard cap set in THE_THESIS:** **$1,000/mo** (= $12,000/yr). We are **inside the cap** with **~$55–270/mo of headroom**.
- **Validates the THE_THESIS gross-floor line item:** "MBT software + AI subscription stack ($1k/mo)" → $12,000/yr. The cap is set generously to absorb usage spikes and a small number of planned additions.
- **Hetzner + DigitalOcean (production servers)** total roughly **$50–100/mo combined**. Hetzner is confirmed $39.99/mo; the DO droplet cost is one of the verify items below.
- **Not included in MBT spend:** Cloudbeds + Twilio for the Inn (~$310–510/mo) — rolled into the Inn cost basis ($125k line item in THE_THESIS), not the MBT stack. Tuthill's own design tools roll up under Tuthill, not MBT.
- **The biggest single line:** Claude Max at $125/mo. The biggest cluster: AI + identity stack on `chasepierson.tv` (~$350–380/mo) — 42–48% of MBT spend.

---

## How this maps to THE_THESIS break-even math

THE_THESIS gross break-even is built on six lines, $203k/yr total:

| Line | Annual | Monthly | Status |
|---|---|---|---|
| Big Muddy Inn — mortgage, utilities, Chandra @ $20/room, Hospitality Coordinator @ $20/check-in | $125,000 | $10,417 | Inn entity; outside MBT card |
| **MBT software + AI subscription stack ($1k/mo)** | **$12,000** | **$1,000** | **This doc's subject. Currently ~$730–945/mo against the cap.** |
| Studio C retainer bucket ($1k/mo × 20 hrs @ $50/hr) | $12,000 | $1,000 | Partner retainer; not in this doc — separate line |
| Tuthill Design retainer bucket ($1k/mo × 20 hrs @ $50/hr) | $12,000 | $1,000 | Partner retainer; not in this doc |
| Chase's Bearsville Cottage ($1k/mo) | $12,000 | $1,000 | Chase personal line; not infra |
| Chase's aggregate bills (internet, cell, tax repayment $500/mo) | $6,000 | $500 | Chase personal line |
| Chase's living expenses ($2k/mo) | $24,000 | $2,000 | Chase personal line |
| **Gross ecosystem costs** | **$203,000** | **$16,917** | |
| Less: Scan2Plan royalty offset (passive income) | **− $18,000** | − $1,500 | |
| **Net ecosystem break-even** | **$185,000** | **$15,417** | |

**This cost analysis is responsible for the bolded line only — the $12k/yr MBT software + infra stack.** The other lines are partner retainers and Chase personal costs that don't run through this doc.

---

## The MBT cap roll-up

| Bucket | Monthly range | Annual range |
|---|---|---|
| A. chasepierson.tv identity + AI stack (Workspace, Claude Max + Claude Pro × 2, Perplexity Pro + API, ChatGPT API, Canva Teams, Adobe Photography, Bitwarden, Spotify Family) | $350–380 | $4,200–4,560 |
| B. Studio C production stack (Adobe CC full, Restream, CapCut Team × 3) | $125–170 | $1,500–2,040 |
| C. MBT platform infrastructure — managed cloud (Vercel, Sanity, Neon, Cloudflare, Resend, ElevenLabs, GitHub, Buzzsprout, Attio free, Stripe variable) | $140–230 | $1,680–2,760 |
| C.1 Google Cloud services (Vertex AI Gemini + Imagen, GCS bucket, Cloud Logging, optional TTS) | $50–100 | $600–1,200 |
| C.2 Self-hosted on Mac mini (Immich, Postiz, OBS, Plex, Open Notebook) | $0 | $0 |
| C.3 Big Muddy Records label ops (DistroKid Label, SoundCloud For Artists Pro) | $24 | ~$290 |
| **Subscriptions subtotal (A + B + C through C.3)** | **$689–904** | **$8,270–10,850** |
| D. Production servers (added 2026-05-11) — Hetzner CCX23 + DigitalOcean AzuraCast droplet | $50–100 (estimate, DO TBC) | $600–1,200 |
| **MBT total — software + infrastructure** | **$739–1,004** | **$8,870–12,050** |

**Cap status:** at the high end of the estimate range we are **right at the $1k/mo cap**. At the midpoint (~$870/mo) we have **~$130/mo of headroom**. At the low end (~$740) we have **~$260/mo of headroom** for usage spikes and the planned additions.

> **Important reconciliation:** the original `ecosystem-subscriptions-2026-04-20.md` total ($689–904/mo) did NOT include the Hetzner host or the DigitalOcean droplet — those live in the infra doc. Adding them brings the true MBT-paid total to **$739–1,004/mo**. The $1k cap was set with this in mind but the line item is more honestly named "MBT software + infrastructure" not just "subscriptions."

---

## Itemized inventory

### A. Identity + AI stack on `chasepierson.tv`

| Line item | Monthly | Annual | Owner | Confidence |
|---|---|---|---|---|
| Google Workspace Ultra (1 seat — Chase) | ~$35 | ~$420 | Chase | Verify price |
| Claude Max | $125 | $1,500 | Chase | Confirmed |
| Claude Pro — Tracy | $20 | $240 | Tracy (auth) / MBT (pay) | Confirmed |
| Claude Pro — Amy | $20 | $240 | Amy (auth) / MBT (pay) | Confirmed |
| Perplexity Pro | $20 | $240 | Chase | Confirmed |
| Perplexity API | ~$20–50 | $240–600 | API / agents | Estimate |
| ChatGPT API (capped) | ≤$50 | ≤$600 | API / scripts | Confirmed cap |
| Canva Teams (5 seats) | ~$30 | ~$360 | Chase / Tracy / Amy / Miles / Elijah | Verify price |
| Adobe Photography | $10 | $120 | Chase (CPP) | Confirmed |
| Bitwarden Family | ~$3 | ~$36 | All (shared vault) | Confirmed |
| Spotify Family (6 seats) | $17 | $204 | Team | Confirmed |
| **A. Subtotal** | **~$350–380** | **~$4,200–4,560** | | |

### B. Studio C production stack

| Line item | Monthly | Annual | Owner | Confidence |
|---|---|---|---|---|
| Adobe Creative Cloud — All Apps | ~$60 | $720 | Elijah primary | Confirmed |
| Restream.io | ~$20–49 | $240–588 | Studio C | Verify tier |
| CapCut Team (3 seats: Chase / Amy / Elijah) | ~$45–60 | $540–720 | Studio C | Verify tier |
| **B. Subtotal** | **~$125–170** | **~$1,500–2,040** | | |

### C. MBT Platform — managed cloud

| Line item | Monthly | Annual | Owner | Confidence |
|---|---|---|---|---|
| Vercel Pro | $20–40 | $240–480 | Chase / Elijah | Verify seat count |
| Sanity CMS | ~$15–99 | $180–1,188 | Tracy / Amy / Chase | Verify tier (free / Team / Growth) |
| Neon Postgres | ~$19 | $228 | DB layer | Verify plan |
| Cloudflare | ~$20 (or free) | $240 (or $0) | DNS + email routing | Verify Pro vs free |
| Resend | $20 | $240 | Transactional email | Confirmed |
| ElevenLabs | ~$25 | $300 | Voice synth | Estimate |
| GitHub Team (~5 users) | ~$20 | $240 | Repos | Verify seat count |
| Buzzsprout Standard | $18 | $216 | Podcast hosting | Confirmed |
| Attio CRM | $0 | $0 | Free tier Y1 | Confirmed |
| Stripe | $0 fixed | $0 fixed | Per-transaction only | Confirmed |
| **C. Subtotal** | **~$140–230** | **~$1,680–2,760** | | |

### C.1 Google Cloud Platform

| Line item | Monthly | Annual | Confidence |
|---|---|---|---|
| Vertex AI — Gemini 2.5 Pro/Flash | ~$30–60 | $360–720 | Estimate (volume-dependent) |
| Vertex AI — Imagen 3 | ~$10–20 | $120–240 | Estimate |
| Cloud Storage (`bmt-media-bigmuddy`) | ~$5–10 | $60–120 | Confirmed range |
| Cloud Logging + Monitoring | ~$5 | $60 | Estimate |
| Cloud TTS Journey (fallback) | $0–5 | $0–60 | Minimal usage |
| Cloud SQL `sovereign-db-primary` | **TBC** | **TBC** | **Open audit — see §6** |
| **C.1 Subtotal** | **~$50–100** | **~$600–1,200** | |

### C.2 Self-hosted (Mac mini → migrating off)

| Line item | Monthly | Notes |
|---|---|---|
| Immich, Postiz, OBS, Plex, Open Notebook | $0 | Mac mini hosting; CapEx already paid. **Note (CANONICAL_INFRASTRUCTURE):** mini is being demoted; Immich is actually live on Hetzner. Migration of remaining services TBD. |

### C.3 Big Muddy Records label ops

| Line item | Monthly | Annual | Notes |
|---|---|---|---|
| DistroKid Label tier | ~$12 | $139 | Distributes Mechanical Bull, Kate Skwire, future signings. Unlimited artists. |
| SoundCloud For Artists Pro Unlimited | $12 | $144 | Big Muddy Records main + per-artist profiles |
| Songtrust (per writing artist, optional) | $10/artist | $100/artist/yr | Activate per-artist basis. Currently zero activated. |
| **C.3 Subtotal** | **~$24** | **~$283** | |

### D. Production servers (new addition to the cap analysis)

| Line item | Monthly | Annual | Confidence |
|---|---|---|---|
| Hetzner CCX23 `bigmuddy-services` (Immich, Caddy live; Postiz + Open Notebook planned) | **$39.99** | **$479.88** | **Confirmed** in CANONICAL_INFRASTRUCTURE |
| DigitalOcean droplet `bigmuddy-radio` (AzuraCast) | **TBC** — likely $12–48 depending on tier | TBC | Open audit |
| **D. Subtotal** | **$50–88 estimated** | **$600–1,060 estimated** | |

---

## Inn-side infrastructure (NOT in the MBT cap)

These are real costs but they roll into the $125k Inn cost line in THE_THESIS, paid by Big Muddy Natchez LLC on the Inn's card. Including for visibility.

| Line item | Monthly | Annual | Owner | Confidence |
|---|---|---|---|---|
| Cloudbeds (PMS) | ~$300–500 | $3,600–6,000 | Big Muddy Natchez LLC | Verify exact plan |
| Twilio SMS | ~$10 | $120 | Big Muddy Natchez LLC | Verify usage |
| **Inn infra subtotal** | **~$310–510** | **~$3,720–6,120** | | |

---

## Partner-side infrastructure (NOT in the MBT cap)

| Line item | Owner | Notes |
|---|---|---|
| Tuthill Design tools (Adobe, print vendors) | Tuthill Design | Tuthill pays from their own books. Not on MBT card. |
| Studio C self-funded tools (if any) | Studio C Video | Most Studio C tools ARE on the MBT card per the consolidation plan; remaining items stay with Studio C. |

---

## What we get for the money — value mapped to each bucket

| Bucket | What it powers | If we cut it, what breaks |
|---|---|---|
| A. AI stack on chasepierson.tv | Cos, Codex, agent runs, content wizard, research, partner agents for Tracy + Amy | The platform agents stop. Cos goes dark. Wizard goes dark. |
| B. Studio C stack | Every video produced for any Big Muddy brand + partner clients | Video pipeline stops; reverts to per-project rentals at ~3x cost |
| C. Managed cloud | The Next.js app, the database, transactional email, source control, podcast hosting, CRM, payments | The websites stop. Email stops. DB stops. Everything customer-facing dark. |
| C.1 GCP | AI generation, image gen, the canonical photo library | Content wizard stops producing assets. Photo archive loses canonical home. |
| C.3 Records label ops | Distribution to Spotify/Apple/etc., per-artist SoundCloud profiles | Records distribution stops. We can't ship a release. |
| D. Production servers | Immich (photo archive + sync), Big Muddy Radio streaming | Photo backup stops; radio goes off-air. |
| Inn-side (separate) | Property management for the Inn | Inn check-ins go manual; reservations stop. |

---

## Verification items (open audits)

Pulled from `ecosystem-subscriptions-2026-04-20.md` §7 + new items from this pass:

| # | Item | Why | Owner | Impact |
|---|---|---|---|---|
| 1 | Confirm Google Workspace Ultra exact monthly cost per seat | $35 is an estimate | Chase | $5/mo variance |
| 2 | Confirm Sanity CMS plan (free / Team / Growth) | Range is $0–99/mo | Chase | Up to $84/mo variance |
| 3 | Confirm Neon Postgres plan (Launch / Scale / etc.) | $19 estimate | Chase | $10–50/mo variance |
| 4 | Confirm Cloudflare Pro vs free | $0 or $20/mo | Chase | $20/mo |
| 5 | Confirm Restream tier | Range $20–49/mo | Chase / Elijah | $29/mo variance |
| 6 | Confirm CapCut Team exact pricing for 3 seats | Range $45–60/mo | Chase | $15/mo variance |
| 7 | Confirm GitHub Team seat count | Estimated 5 users | Chase | $20–40/mo variance |
| 8 | Confirm Cloudbeds exact plan (Inn) | Range $300–500/mo | Chase + Tracy | $200/mo variance, Inn line not MBT |
| 9 | Pull Vertex AI actual burn rate from GCP billing for past 30 days | Estimate ~$30–60 Gemini + $10–20 Imagen | Chase | Anchor the GCP estimate |
| 10 | Identify and price the `sovereign-db-primary` Cloud SQL instance | Unknown purpose, unknown monthly | Chase + accountant | Could be $0–50/mo |
| 11 | **NEW: Pull DigitalOcean monthly bill for the `bigmuddy-radio` droplet** | Cost not in CANONICAL_INFRASTRUCTURE doc | Chase | $12–48/mo line item |
| 12 | Resolve duplicate Gemini API keys — retire the legacy one | Two keys exist (CANONICAL_INFRASTRUCTURE §5) | Chase | Hygiene, possibly cost |
| 13 | Resolve duplicate Cloudflare API tokens | Two tokens, document scope | Chase | Hygiene |
| 14 | Audit `Loopback`, `Developer Knowledge API`, `gmail (bigmuddy@chasepierson.tv)`, `mbt-seed-writer` Bitwarden items | Unknown what they power, possibly cost | Chase | Possible cleanup savings |

If everything resolves to the **low end** of each range, MBT spend lands at ~**$739/mo** ($8.9k/yr). At the **high end** it lands at ~**$1,004/mo** ($12.0k/yr) — right at the cap.

---

## Optimization opportunities

Ranked by savings potential and ease.

| # | Lever | Estimated savings | Effort | Notes |
|---|---|---|---|---|
| 1 | Cancel deprecated Google Workspace seats on `bigmuddyinn.com` + `hillbillydreamsinc.com`; route via Cloudflare Email Routing | **~$24–48/mo** (2× Workspace seats) | Low | Already planned in subscriptions doc §6a. Do before May 15. |
| 2 | Confirm Cloudflare is on free tier unless we're actually using Pro features | up to $20/mo | Low | Verify in Cloudflare dashboard |
| 3 | Right-size Sanity CMS plan | up to $84/mo | Low | If on Growth and Team would do, that's the line |
| 4 | Mac mini service migration to Hetzner — when complete, the mini's CapEx-paid services don't matter, but the Hetzner box is well under-utilized | $0 direct but enables possible Hetzner downgrade later | Medium | Photo migration is the gating step |
| 5 | Audit + retire any unused Bitwarden API keys (Gemini duplicate, mystery items in #11) | $0–25/mo + hygiene | Low | Open audits §11–13 above |
| 6 | Negotiate annual prepay where it cuts >10% | varies | Medium | Adobe, Canva, Restream all offer annual discounts |
| 7 | Cap ChatGPT API at $25 instead of $50 if monthly usage is consistently low | up to $25/mo | Low | Check actual ChatGPT API spend trend |

**Realistic savings if we close audits #1–5 plus annual prepay where it makes sense:** ~$50–100/mo = ~$600–1,200/yr. Not life-changing, but it covers a Klaviyo-class email tool + meeting recorder (the two P1 planned additions in subscriptions §4.5) without breaking the cap.

---

## Planned additions (from subscriptions doc §4.5)

Within the existing $1k cap:

| Priority | Service | Monthly | Notes |
|---|---|---|---|
| P1 | Klaviyo-class email marketing (Loops likely cheapest) | $50–100 | Before end of Week 3 of 90-day plan |
| P1 | Meeting recording / transcription (Otter or Fireflies) | $10–30 | Before next partner meeting — needed for transcript ingestion |
| P2 | Buzzsprout upgrade if cadence demands | +$6–16 | Decision Q3 based on actual episode rate |
| P2 | Social scheduler hosted alt if Postiz gaps | $15–99 | Decision Week 1–2 |

If we add both P1 items: total goes from ~$740 to ~$860/mo at the low end, ~$900 to ~$1,070/mo at the high end. **At the high end this puts us over the cap.** Mitigation: close at least 2 of the verification items above to bring the high end under $1,000 before activating the P1 additions, OR raise the cap formally with a revenue line that justifies it.

---

## Recommendation

1. **Treat the line in THE_THESIS as "$12k/yr MBT software + infrastructure"** (not just "subscriptions"). Hetzner + DigitalOcean belong in this number; they're $600–1,060/yr combined. The cap as set already accommodates them.
2. **Close the top three high-variance audits first:** Sanity CMS plan (#2), Cloudflare Pro vs free (#4), DigitalOcean droplet cost (#11). These three alone could shift the actual monthly by $80+/mo. Tightening these tightens the whole picture.
3. **Cancel the two deprecated Google Workspace seats** before May 15 per the subscriptions doc. That's the easiest $24–48/mo recovery. Do it now.
4. **Defer the P1 planned additions** (Klaviyo, meeting recorder) until after the three audits in #2 close, so we know exact headroom before adding new lines.
5. **Set GCP billing alerts at $50, $75, $100/mo** (already on the action-item list — confirm done).
6. **Re-run this analysis at end of June** with two months of actuals against the new MBT credit card billing. The current numbers are estimates anchored to subscription plans, not actual invoices.

---

## What this changes about THE_THESIS

Nothing. THE_THESIS already books $12k/yr for the MBT stack at $1k/mo, and the actuals fit inside that. The cap is set with appropriate headroom for the planned additions and for usage spikes. The audit list above tightens the range, but the cap as written holds.

The one honesty update: the line should be **"MBT software + infrastructure"** rather than **"MBT software + AI subscription stack"** — Hetzner + DigitalOcean are part of this number. Cost analysis would be incomplete without them. Suggest updating THE_THESIS line label on the next revision.

---

*End. Next refresh: end of June 2026, with two months of MBT credit card actuals.*
