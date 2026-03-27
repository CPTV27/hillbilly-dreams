# DELTA DAWN OPERATIONS REPORT
## The Big Muddy Ecosystem — All Properties
### Date: March 27, 2026
### Prepared by: Delta Dawn, Operations Agent

> **Purpose:** Comprehensive operational review covering the Inn, Magazine, Radio, Records, Entertainment, and Gallery. Synthesized from 20+ source documents.

---

## 1. PROPERTY STATUS DASHBOARD

### THE BIG MUDDY INN [LIVE]

| Metric | Current State |
|--------|---------------|
| Address | 411 North Commerce Street, Natchez, MS 39120 |
| Room Inventory | 6 suites: John Lee Hooker, Robert Johnson, Muddy Waters, British Invasion I, British Invasion II, B.B. King |
| Recorded PMS Revenue | ~$36,700/year (~$3,060/month) |
| Shadow Revenue (off-books) | ~$59,000/year (weddings $24K, events $30K, merch $5K — not in PMS) |
| Total Real Revenue | ~$95,000/year |
| Monthly Burn Rate | ~$11,000/month |
| Current Deficit | ~$8,000/month |
| Occupancy Breakeven | 45% |
| Occupancy Target | 65% |
| Airbnb Listings | Only 3 of 6 suites listed |
| Missing OTA Listings | Booking.com, Expedia, VRBO status unverified |

**What's working:** Physical property, Blues Room stage (50-seat venue), Arri Aslin as artist-in-residence, Night Owl brand positioning. Cultural gravity is real.

**What's not:** $59K in shadow revenue is off-books and invisible to financial analysis. 3 rooms missing from Airbnb. Squarespace still displays a 7-month-stale "temporarily closed" banner.

---

### BIG MUDDY MAGAZINE [LIVE]
- Division Head: Tracy Alderson-Allen
- Domain: bigmuddymagazine.com [live on Vercel]
- Voice: "Editorial, print-quality. Garden & Gun meets Kinfolk."
- Social: @bigmuddymagazine — NEEDS SETUP
- Revenue: Sponsors and bank partnerships in development

---

### BIG MUDDY RADIO [LIVE — listenable]
- Domain: bigmuddyradio.com [live on Vercel]
- Spotify: IN PROGRESS — 5+ playlists defined
- Social: @bigmuddyradio — NEEDS SETUP on Instagram and TikTok
- Voice: "Fun outlaw radio. Friendly, wacky, silly. NOT dark brooding."
- Revenue model: Sponsorships, media licensing, content deals (DBA under Newco)
- Spin-off trigger: Revenue > $150K OR licensing deal requiring standalone entity

---

### BIG MUDDY RECORDS [LIVE — artists signed]
- Division Head: JP Houston
- Artists: Arri Aslin (artist-in-residence), Kate Skwire ("Burned and Blessed," 9 tracks), Mechanical Bull (Chase's band, "A Million Yesterdays")
- Deal structure: Flat monthly retainer + revenue share. Artists keep 100% of masters. Always.
- Tiers: Front Porch ($100/mo), The Route ($250/mo), Blues Room ($500/mo)
- MelodyVault integration: Mapped but not yet built (AI track analysis, splits ledger, PRO registration, sync marketplace, royalty tracking)
- Stripe Connect: Already built for Directory — reuse for artist payouts
- Social: @bigmuddyrecords — NEEDS SETUP

---

### BIG MUDDY ENTERTAINMENT HUB [LIVE — hub page]
- Domain: bigmuddyentertainment.com [live on Vercel]
- Division Head: JP Houston
- Sub-brands: Records, Radio, Touring (Snowbird Circuit), Rise Up
- Snowbird Circuit: 18 cities, Memphis to New Orleans, 5 states
- Community Credits Program: [PLANNED] Free MBT access for artists, small businesses, individuals
- Talent Search: [PLANNED] Finding corridor artists, giving them stage/studio/audience/platform

---

### BIG MUDDY GALLERY (buycurious.art) [LIVE — domain active]
- Domain: buycurious.art [live on Vercel]
- Voice: "Clean, minimal, the art speaks. Museum-gallery feel."
- Social: @buycuriousart — NEEDS SETUP on Instagram and TikTok
- **Note:** This property has the least documentation of any in the ecosystem. No named operator, no inventory list, no revenue model specifics documented in any source file.

**[ACTION NEEDED: Chase/Tracy]** Who is running Gallery operations? What artists are currently featured?

---

## 2. THE ECOSYSTEM FLYWHEEL

### The 2:1 Show Multiplier [VERIFIED — Vertex Strategic Analysis]
A $1,000 show generates $500 in downstream Inn + Directory revenue. Never evaluate shows by ticket revenue alone. Finance tracks "show-attributed revenue" as a separate metric.

Bar economics: $300–500/bar per show night at 80%+ margin. 12 show nights/month = $3,600–6,000/month.

### One Booking Triggers Seven Revenue Events
1. Artist plays Inn stage
2. Show recorded for Radio
3. Magazine writes the city guide for the tour stop
4. Artist goes on Rise Up's roster
5. Catalog lives on Records
6. Touring route adds the venue
7. Kiosk mode sells the ticket at the front desk

### Annual Synergy Value Stack

| Synergy Component | Annual Value |
|-------------------|--------------|
| Facilities Subsidy (Inn to Media) | $180K–$240K |
| Operational Overhead Subsidy | $120K–$180K |
| Logistics Subsidy (shared van) | $30K–$45K |
| CAC Reduction (Media to Inn) | $60K–$110K |
| Ambassador Efficiency | $65K |
| **Total Annual Synergy** | **$455K–$640K** |

Traditional Inn CAC: $85–160/booking. Big Muddy target CAC: $25–50/booking. Annual savings on 1,000 bookings: $60–110K.

### $760K Revenue Model Breakdown (Target: Month 24–36)

| Revenue Source | Amount | % of Target |
|----------------|--------|-------------|
| Regular lodging | $250K–$350K | 33–46% |
| Weddings (target: 16/year) | $224K | 29% |
| Blues Room shows / events | $75K–$100K | 10–13% |
| Touring revenue | $50K–$100K | 7–13% |
| Merch / other | $25K–$50K | 3–7% |
| **Total** | **$624K–$824K** | **82–108%** |

### July 2026 Bridge: $520/month truck savings ring-fenced for MBT Directory B2B sales sprint. Not absorbed into general expenses.

---

## 3. HOSPITALITY OPERATIONS — THE INN

### Cloudbeds Integration Status [PLANNED — Meeting Pending]
Architecture fully documented. Key questions for the meeting:
1. Plan tier includes self-service API key generation?
2. PIE (Pricing Intelligence Engine) — included or add-on?
3. Webhook availability for reservation events?
4. Stripe native integration status?
5. Do rate updates push automatically to Airbnb/Booking.com/VRBO?

**What Delta Dawn manages via Cloudbeds API once live:**
- Dynamic pricing engine (weekday/weekend/seasonal/event-based rates)
- Daily occupancy metrics sync (`inn_occupancy_rate`, `inn_revenue_mtd`, `inn_adr`, `inn_revpar`)
- Booking notification webhooks → welcome email sequence
- 7 AM automated morning brief delivery

**Dynamic pricing rules to implement:**
- Weekend multiplier: 1.25x (Fri–Sat)
- High occupancy (4 of 6 rooms): raise remaining rates 15%
- Last-minute discount: –15% unsold rooms within 48 hours
- Natchez Pilgrimage: 1.50x rates, 2-night minimum

### Wedding Market Opportunity [PLANNED — Foundation Work Needed]

Big Muddy's lane: intimate buyout weddings for 20–40 guests who want a music-and-hospitality weekend, not a banquet. No venue in Natchez offers this package.

**Full Package: $14,100**
- Venue fee (Blues Room + porch): $2,500
- Lodging buyout (6 rooms, 2 nights): $3,600
- Photography (Chase, 8 hours): $3,500
- Videography / content package: $2,000
- Live music (Arri Aslin, 3–4 hours): $1,500
- Day-of coordination: $1,000

**Revenue scenarios:**
- Conservative (12 weddings/year at $10K): $138K/year
- Target (16 weddings/year at $12K): $224K/year — 29% of the $760K model
- Stretch (20 weddings/year at $14K): $330K/year

A single wedding weekend generates 7–17x the revenue of a regular weekend.

**Activation requires:** Wedding page on site, The Knot/WeddingWire/Zola listings, 2–3 styled shoots, preferred vendor list, deposit system in Cloudbeds.

**[ACTION NEEDED: Chase]** Schedule one styled shoot before April 27. Chase shoots, Arri performs, The Anthologist does flowers. This single action unlocks the $224K/year revenue line.

### Tracy / Amy / JP Responsibilities

| Person | Role | Revenue Calculus |
|--------|------|-----------------|
| Tracy | Bar, liquor license, inventory, guest experience | $300–500/bar per show night at 80%+ margin |
| Amy/Arri | Stage. Performing. Artist. NOT ops staff. | Content + show draw + wedding music package |
| JP | Programs shows, performs, curates | 2:1 downstream multiplier per show |
| Chase | Daytime only: MBT walk-ins, tourism, bank visits | $99/mo recurring per 15-min pitch |

**Hard rule:** Chase should never be behind the bar when he could be on the street selling.

### SEO — Critical Issues [ACTION NEEDED: Tracy/Chase]
1. Squarespace "temporarily closed" banner — 7 months stale. Remove today.
2. Missing alt text on all images.
3. Empty business hours in schema.
4. Only 3 of 6 suites on Airbnb.
5. No individual room pages (can't rank for suite-specific searches).
6. No blog (massive missed SEO opportunity).

---

## 4. CONTENT OPERATIONS

### Photography Inventory
- **Total in GCS:** 604 photos
- **Ready to use:** ~59 named and tagged files (Inn rooms, Blues Room, corridor shots, heroes)
- **Unreviewed archive:** 545 files (corridor ~200+, portraits ~100+, library ~200+)

**Real vs AI rule:** AI images have garbled text at full resolution. Real photography is a competitive advantage. Always prefer real.

### Missing Shots — Priority Order

**Priority 1 — Kill AI Images Live on Site:**
- Real historic home exterior in Natchez (not AI teal/pink sky)
- Craftsman porch (Natchez or Ocean Springs, morning light)
- Real Natchez bluff view (Broadway gazebo or Roth Hill, golden hour)
- Inn exterior from across the street
- Inn neighborhood and restaurant context shots

**Priority 2 — Route Stops (no real coverage):**
Clarksdale, Vicksburg, Greenville, Baton Rouge, New Orleans all need 3 real photos each.

**Priority 3 — Brand-Specific:**
Radio: Recording booth, listening shot. Records: Vinyl close-ups, recording session. Magazine: Food photography at Natchez restaurants. Inn: All 6 room interiors, Blues Room stage, breakfast spread. MBT: Real small business owners, Main Street storefronts.

**[ACTION NEEDED: Chase]** Do the 3-star Lightroom pass on the 545-photo archive first. You may already have most of what you need.

### Social Media Accounts

**Phase 1 — This Week (content ready):**
1. Twitter/X @OutsiderEcon — 200+ posts written
2. TikTok @OutsiderEconomics — 15 video scripts ready, Remotion renders available
3. Spotify Big Muddy Radio — playlists defined

**Phase 2 — Next Week:** Instagram @bigmuddytouring, YouTube Outsider Economics, Bluesky

**Phase 3 — Month 1:** Instagram @bigmuddyrecords, Bandcamp, Instagram @deepsouthdirectory, LinkedIn Deep South Directory

Publishing infrastructure is built at `/admin/social` with Twitter, Bluesky, Instagram, and TikTok publishers live in `lib/social-publishers.ts`.

### Content Queue — 20 Posts Ready, All in DRAFT
Scheduled March 20–29. Media gaps blocking several posts (Stanton Hall photos, Directory launch graphic, video edits from existing footage). IG-004 (Under-the-Hill Reel) and IG-005 (Downtown Natchez) are raw footage already in Chase's export folder — quick edits, no new shooting required.

### Arri Aslin Content Engine
Portrait series at the Inn is complete and ready to use. She is the content anchor for the entire ecosystem: Records artist page, Instagram carousel (IG-002 drafted), Blues Room show recordings for Radio, wedding package live music, Rise Up touring headliner.

---

## 5. ENTERTAINMENT & EVENTS

### JP Houston — Division Head Credentials

JP's career is the template for what Big Muddy Entertainment is building:
- American Parlor Songbook (NPR, 20+ stations since 2013) → blueprint for Radio syndication
- Pappy & Harriet's house band (2-year residency, Pioneertown CA) → exact analog for Blues Room programming
- PBS, BBC, HBO, CBC composition credits → broadcast-quality media production standard
- The Relationship (Brian Bell/Weezer) + collaborations with Leon Russell, Glen Hansard, Band of Horses, The Jayhawks, M. Ward → active industry booking network
- Gemini Award nomination (2001) → production credential

**JP has full creative authority.** Records, Radio, Touring, Rise Up — and anything else he wants to build. If he wants to produce a TV show, Big Muddy sponsors it.

### Blues Room Programming
- Capacity: 50 seats
- Bar economics: $300–500 per show night at 80%+ margin
- Target: 12 show nights/month = $3,600–6,000/month bar revenue
- 2:1 multiplier: every $1,000 show → $500 downstream Inn + Directory revenue
- Content output per show: Radio session recording, Records catalog asset, Magazine coverage, social performance clips

**[ACTION NEEDED: JP]** Share Q2 2026 (April–June) show calendar. Confirmed dates + artist names. This feeds Cloudbeds event-based pricing triggers.

### Rise Up Gospel & Blues Band [LIVE — performing]
- Amy + Arri anchor flagship unit
- Regional talent fills rotating cast from Snowbird Circuit talent searches
- Franchisable model (like Yachtley Crew / Blue Man Group)
- Multiple units can tour simultaneously
- US first, Europe planned after proof of concept

### Snowbird Circuit [LIVE — 18-city route]
- Memphis to New Orleans, 14 more cities, 5 states
- Prevost bus doubles as Inn guest shuttle (subsidizes transport costs)
- Every tour stop is a content event
- Wedding application: airport transfer from Jackson/New Orleans — "groomsmen arrive by tour bus"

**[ACTION NEEDED: Chase/JP]** Is the Prevost bus currently operable and insured for guest shuttle and artist transport?

### Community Enrichment Program [PLANNED]
Free MBT access tiers for artists ($99/mo), small businesses ($49/mo), individuals ($20/mo). Structured learning modules convert non-customers into educated paying customers. Municipal funding pitch: workforce development + tourism investment in one program.

### MelodyVault / Records Tech Stack [PLANNED — Architecture Complete]
Build priority: Track model → Splits Ledger → Catalog dashboard → PRO Registration → Sync Marketplace → Royalty tracking → AI analysis. Stripe Connect from Directory reused for artist payouts.

---

## 6. OPERATIONAL GAPS & RECOMMENDATIONS

### Critical Gaps (Revenue-Blocking)

**Gap 1: Shadow Revenue is Invisible [CRITICAL]**
$59,000/year in actual Inn revenue (weddings $24K, events $30K, merch $5K) is off-books and not in Cloudbeds PMS. Every financial analysis understates performance. Every metric is wrong until this is captured.
**[ACTION NEEDED: Tracy]** Log all shadow revenue into Cloudbeds. Even backdated manual entry gives us a baseline.

**Gap 2: Airbnb Has Half the Inventory**
British Invasion I, II, and B.B. King suites are not on Airbnb. Pure lost revenue. 30 minutes of work.
**[ACTION NEEDED: Tracy]** List remaining 3 suites today.

**Gap 3: Social Accounts Don't Exist**
20 posts drafted. Publishing infrastructure built. Accounts not set up.
**[ACTION NEEDED: Chase]** Phase 1 accounts live before April 27.

**Gap 4: Squarespace Still Says "Temporarily Closed"**
7-month stale banner. Any visitor thinks the Inn might still be closed.
**[ACTION NEEDED: Tracy/Chase]** Remove today. Replace with "Now Booking Spring 2026 — Live Blues Every Weekend."

**Gap 5: Wedding Revenue Has No Front Door**
$224K/year potential. No dedicated page, no platform listings, no styled portfolio.
**[ACTION NEEDED: Chase]** One styled shoot before April 27 unlocks the entire wedding revenue line.

**Gap 6: Gallery Operations Undocumented**
buycurious.art is live but has no operational brief, no named operator, no inventory, no artist roster. Least-documented property in the ecosystem.
**[ACTION NEEDED: Chase/Tracy]** Gallery operational brief needed.

**Gap 7: 545 Photos Unreviewed**
Mother lode of corridor and portrait shots that could replace AI images on the site.
**[ACTION NEEDED: Chase]** Do the Lightroom archive pass before commissioning new shoots.

**Gap 8: Cloudbeds API Connection Pending**
Without Cloudbeds connected, Delta Dawn cannot see occupancy, push dynamic pricing, or trigger welcome emails. Single largest ops automation leverage point.
**[ACTION NEEDED: Chase]** Confirm meeting scheduled. After: get `cbat_` API key, set env vars, test `getHotelDetails`.

**Gap 9: Blues Room Calendar Undocumented**
JP's bookings drive everything downstream (bar revenue, Inn surge pricing, Radio content, Magazine coverage). No Q2 calendar documented.
**[ACTION NEEDED: JP]** Share Q2 show calendar.

**Gap 10: Newco Formation Blockers Unresolved**
Four hard blockers before Newco LLC can be filed: Chase's family trust, A2 Natchez op agreement review, CPA confirmation, Newco name selection. All equity and distribution mechanics depend on this.
**[ACTION NEEDED: Chase]** Trust formation status?

### Before April 27 — Prioritized Action List

| Priority | Action | Owner | Effort |
|----------|--------|-------|--------|
| 1 | Remove "temporarily closed" Squarespace banner | Tracy/Chase | 5 min |
| 2 | List 3 missing suites on Airbnb | Tracy | 30 min |
| 3 | Set up Twitter @OutsiderEcon | Chase | 1 hr |
| 4 | Set up Spotify Big Muddy Radio playlists | Chase | 2 hr |
| 5 | Complete Cloudbeds API meeting + get `cbat_` key | Chase | Half day |
| 6 | Verify Booking.com / Expedia / VRBO status | Tracy | 30 min |
| 7 | 3-star Lightroom pass on 545 archive photos | Chase | Half day |
| 8 | Schedule 1 wedding styled shoot | Chase | 1 hr planning |
| 9 | Share Q2 Blues Room show calendar | JP | 30 min |
| 10 | Add Google Business Profile hours + 20+ photos | Tracy/Chase | 2 hr |
| 11 | Log shadow revenue into Cloudbeds | Tracy | Half day |
| 12 | Wedding page on bigmuddytouring.com | Chase/build | 1 day |
| 13 | Set up @bigmuddytouring Instagram | Chase | 1 hr |
| 14 | Edit and post IG-004 (Under-the-Hill) + IG-005 (Downtown Natchez) | Chase | 2 hr |
| 15 | Gallery operational brief | Chase/Tracy | 1 hr |

---

*Delta Dawn Operations Report — March 27, 2026. Source: 20+ documents including AGENT_LEDGER.md, NARRATIVE.md, BigMuddy Operational Blueprint, synergy model, JP Entertainment Brief, JP Houston profile, wedding market research, SEO audit, Cloudbeds integration spec, MelodyVault integration, brand notes, brand asset catalog, photo catalog, shot list, social accounts, social content queue, and all six memory files.*
