# Channel Yield Strategy — Big Muddy Inn

**Property:** Big Muddy Inn, Natchez MS (6 rooms + Blues Room)
**Operating entity:** Big Muddy Natchez LLC (under MBT — Measurably Better Things LLC)
**Prepared by:** Chase Pierson
**Date:** April 20, 2026
**Companion:** `vrbo-position-2026-04-20.md`, `cloudbeds-consultant-sourcing-2026-04-20.md`

---

## 1. The Thesis

Yield for a 6-room boutique inn is not determined by OTA channel count. It's determined by two things:

1. **Cost to acquire a guest** (commission + ops overhead + marketing cost)
2. **Lifetime value of that guest** (repeat rate + referral rate + direct-booking migration)

The highest-yield channel is not the channel with the most volume. It's the channel that produces the most margin per room-night after all costs are accounted for, with the best chance of producing a repeat direct-booker.

**By that metric, the priority order is:**

1. Direct booking (Magazine-fed)
2. Google Hotel Ads (metasearch → direct)
3. Airbnb (discovery → repeat direct)
4. Booking.com (commodity volume fill)

Everything else is secondary.

---

## 2. Yield Framework

### The economics of a boutique inn room-night

Illustrative — Tracy to confirm actuals:

| Line | Direct | Booking.com | Expedia | Airbnb |
|---|---|---|---|---|
| ADR | $250 | $250 | $250 | $250 |
| Commission % | 0% | 15% | 18–25% | 3% host + 14% guest (we pay ~3%) |
| Commission $ | $0 | ($37.50) | ($45–62.50) | ($7.50) |
| Payment processing | (2.9% + $0.30) | included | included | included |
| Ops overhead per booking | Low | Medium | High | Low |
| **Net to Inn** | ~$242 | ~$212 | ~$188–205 | ~$242 |

**The direct-booking premium is $30–54 per room-night.** Across 6 rooms × 365 nights × 50% occupancy × $40 avg premium = **~$43K/year in margin left on the table** if we don't win direct.

Every channel decision should be measured against whether it helps or hurts direct-booking share.

### The 4 yield factors

| Factor | Why it matters |
|---|---|
| **Commission cost** | Direct > everything else |
| **Guest quality** | Guests who match the brand leave good reviews that compound across every channel |
| **Direct migration rate** | Some OTAs are feeders to direct (Airbnb, high). Some are traps that hold the customer (Expedia, low) |
| **Strategic leverage** | Does this channel amplify MBT assets? (Magazine, Radio, Touring, Blues Room) |

---

## 3. Channel Yield Matrix — Ranked

### Tier 1 — Highest Yield, Invest Here First

**1. Direct Booking (MBT platform)**
- Commission: 0%
- Yield math: Full margin, full data, full guest relationship
- Feeder channels: Big Muddy Magazine, email list, past-guest marketing, PR, social, Google organic
- Moat: Magazine is the only channel competitors can't clone overnight
- Status: Platform built. Magazine exists. Verify: is the direct-booking conversion funnel actually instrumented and converting?

**2. Google Hotel Ads (metasearch → direct)**
- Commission: Low CPC or low CPA (2–5% effective for Free Booking Links; higher for paid slots)
- Yield math: Highest-intent traffic on the web — guest has already searched "hotel Natchez" or "inn with music venue"
- Why it wins: Intercepts OTA demand and converts it to direct
- Status: Not currently set up (confirm with Tracy)

**3. Airbnb**
- Commission: ~3% host
- Yield math: Low commission + right guest profile for Iron & Earth
- Why it wins: "Unique Stays" category is built for properties like Big Muddy Inn. Discovery engine; repeat guests migrate direct if email capture is tuned.
- Status: To be audited/rebuilt as part of Cloudbeds Fiverr gig

**4. Booking.com**
- Commission: 15%
- Yield math: Lower margin per booking, dominant volume for US boutique hotels
- Why it wins: Commodity OTA infrastructure — shoulder-season and international fill
- Strategy: Volume backstop, not primary growth lever
- Status: To be rebuilt as part of Cloudbeds Fiverr gig

### Tier 2 — Secondary Volume, Lower Priority

**5. Expedia / Hotels.com**
- Commission: 15–25%
- Earns a slot: Different audience than Booking.com. Captures package-travel and corporate bookers.
- Lower because: Highest commission of the majors. Least boutique-friendly UX. Weakest direct-migration potential.
- Status: In Fiverr gig scope; keep but de-prioritize vs Booking

**6. TripAdvisor**
- Commission: 12–15%
- Earns a slot: Review authority. Research-phase travelers. Trust signal.
- Lower because: Low booking volume relative to the majors. Real value is review SEO, not transaction volume.
- Status: Not in current Fiverr gig. Add for review syndication, not booking engine.

### Tier 3 — Strategic Positioning, Phase 2

**7. Mr & Mrs Smith**
- Commission: 15–20%
- Earns a slot: Curated boutique brand signal. Premium guest, higher ADR, longer LOS. Listing is a positioning statement.
- Phase 2: Application required; need strong review base first

**8. Historic Hotels of America**
- Earns a slot: Natchez has elite historical authority. Cloudbeds became HHA supplier partner Feb 2026. Heritage-travel segment is underserved and loyal.
- Phase 2: Membership process + property qualification

**9. Tablet Hotels / Michelin**
- Curated, application-based, premium ADR
- Phase 2: Need review track record + strong photography package

### Tier 4 — Skip or Defer

- **Vrbo** — wrong product (see `vrbo-position-2026-04-20.md`)
- **HomeAway** — inherits Vrbo mismatch
- **Hostelworld** — wrong segment
- **Agoda** — APAC skew, low US boutique fit

---

## 4. The Non-OTA Channels That Actually Drive Yield

OTAs are distribution. These are the channels that build the flywheel, and most don't cost a commission.

| Channel | Role | Current Status |
|---|---|---|
| **Big Muddy Magazine** | Organic search + editorial authority → direct bookings | In development / live (Tracy confirm) |
| **Email to past guests** | Highest-converting marketing channel in hospitality (3–8% open-to-book) | Unknown — needs audit |
| **PR / earned media** | Travel + Leisure, NYT Travel, Conde Nast Traveler, Southern Living, Oxford American | No active campaign |
| **Creator / influencer** | Music + travel creators staying at the Inn and producing content | Not scheduled |
| **Touring LLC cross-sell** | Radio listeners → Inn guests; Blues Room show-goers → overnight guests | Infrastructure exists, flywheel not activated |
| **Partnerships** | Natchez tourism board, Visit Mississippi, corridor partners | Unknown |
| **Travel advisors** | Virtuoso, Signature, boutique TA network — drive premium bookings | Not pursued |
| **Wedding / retreat / buyout** | Whole-inn buyout SKU | Phase 2 concept (see Vrbo paper) |

**The biggest yield lever we have is probably not an OTA at all.** It's the Magazine. Every article that ranks on Google for "best boutique inns Mississippi" or "Natchez weekend" drives direct bookings at zero commission. That compounds.

---

## 5. Gap Analysis

### In flight

| Initiative | Status | Yield Impact |
|---|---|---|
| MBT Next.js platform (direct booking) | Built | High — enables the whole thesis |
| Cloudbeds PMS | Active, rebuild in flight via Fiverr gig | High — fixes the plumbing |
| Big Muddy Magazine | In development | Very high — flywheel engine |
| Iron & Earth brand system | Defined | Medium — trust + conversion |
| Sanity CMS for content ops | Built | Medium — enables Magazine scale |

### Not yet done (and matters for yield)

| Gap | Tier | Priority |
|---|---|---|
| **Google Hotel Ads** setup | 1 | **High — add to Fiverr gig** |
| **Direct booking funnel instrumentation** (GA4, conversion tracking, abandoned-cart) | 1 | **High — platform work** |
| **Past-guest email marketing** (welcome series, win-back, seasonal) | — | **High — highest ROI channel in hospitality** |
| **TripAdvisor property claim + review syndication** | 2 | Medium |
| **Mr & Mrs Smith application** | 3 | Phase 2 |
| **Historic Hotels of America membership investigation** | 3 | Phase 2 |
| **Creator / PR outreach program** | — | Medium — pair with Magazine launch |
| **Whole-inn buyout SKU** | — | Phase 2 product decision |

---

## 6. Recommended Next Investments (Ranked by Yield)

If we had $10K discretionary spend today:

| Rank | Investment | Est. Cost | Expected Yield |
|---|---|---|---|
| 1 | **Google Hotel Ads setup + 90 days of spend** | $2–3K | High — direct bookings at ~3% effective cost |
| 2 | **Direct-booking funnel audit + conversion fixes** | $1K (add to Fiverr gig) | Very high — improves every direct campaign |
| 3 | **Past-guest email program build** (Klaviyo-class + 3 initial flows) | $1K setup + $50/mo | Very high — repeat + win-back |
| 4 | **PR outreach package** (pitch list + press kit + 3 targeted pitches) | $2K | Medium-high — unpredictable spikes, long tail |
| 5 | **TripAdvisor claim + photo/content refresh** | $500 | Medium |
| 6 | **Creator hosting program** (2–3 creators, comp stays, content rights) | $1.5K (food + amenities, not cash) | Medium — Magazine content + social |
| 7 | **Magazine content acceleration** (Tracy + 1 freelance writer for 6 months) | $3–5K | Very high — compounds |

**What we should NOT spend on:**
- New OTA channel launches beyond Tier 1–2 until review volume justifies curation plays
- Paid search on generic hotel keywords (expensive, low fit, OTAs outbid us)
- Premium Mr & Mrs Smith / Tablet applications before we have 50+ strong direct reviews

---

## 7. Current State vs. Updated Plan

**Current OTA plan (as of 2026-04-20, after Vrbo paper):**
- Direct booking ✅ (platform built)
- Booking.com ✅ (Fiverr gig scope)
- Expedia / Hotels.com ✅ (Fiverr gig scope)
- Airbnb ✅ (Fiverr gig scope)
- Google Hotel Ads ✅ (added to Fiverr gig 2026-04-20)
- Vrbo ❌ (removed)

**Updated Phase plan:**

**Phase 1 (next 90 days) — Tier 1 channels live and optimized:**
- Direct booking: funnel instrumentation + conversion audit
- Google Hotel Ads: set up (in Fiverr gig scope)
- Booking.com: rebuild (Fiverr gig)
- Expedia: rebuild (Fiverr gig)
- Airbnb: rebuild (Fiverr gig)
- Past-guest email program: launch basic flows
- TripAdvisor: claim + sync

**Phase 2 (months 4–9) — Tier 2 + strategic builds:**
- Magazine content acceleration
- PR outreach campaign
- Creator hosting program
- Whole-inn buyout SKU decision
- Historic Hotels of America investigation

**Phase 3 (months 9–12) — Tier 3 curation plays:**
- Mr & Mrs Smith application
- Tablet Hotels application
- Travel advisor relationships

---

## 8. Summary

- **OTAs are distribution, not strategy.** The highest-yield channels for Big Muddy Inn are direct booking (Magazine-fed), Google Hotel Ads, and Airbnb — in that order.
- **The Magazine is the real moat.** It's the only channel a competitor can't replicate by opening an OTA account.
- **The PMS side is on track** (Cloudbeds rebuild via Fiverr). The gap is on the *demand-generation* side — Google Hotel Ads, email marketing, PR, creator, Magazine cadence.
- **Shift the lens** from "which OTAs should we be on" to "which investments produce the most direct bookings per dollar." OTAs are a line item. The flywheel is the strategy.

---

*End of position paper.*
