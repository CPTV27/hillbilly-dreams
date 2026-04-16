# Hillbilly Dreams Inc — Business Analysis & 3-Year Pro Forma

*April 15, 2026 | Source of truth for financial planning and narrative*
*Currency note (2026-04-16): This analysis is retained as a dated planning snapshot. Pricing assumptions are historical and should be cross-checked against current canonical pricing in `CLAUDE.md`.*

---

## Part 1: What We Are (Plain English)

Big Muddy is a music and media company on the Mississippi River. We book shows, run a radio station, publish a magazine, and operate a record label across 13 cities from Memphis to New Orleans. We also run a 6-room inn and a bar in Natchez, Mississippi.

We built a technology platform (Measurably Better Things) that powers all of this — directory, publishing, radio, commerce, analytics — and we're licensing that platform to other towns and regions.

**Three things generate money:**
1. **Hospitality** — Inn rooms, bar, weddings, private events
2. **Entertainment** — Shows, touring, records, media
3. **Platform** — Directory subscriptions (self-serve) and institutional licenses (program sales to towns/chambers/tourism bureaus)

**The flywheel:** Shows bring people → people stay at the Inn → the magazine writes about it → the radio plays it → the directory lists the venues → tourists find them → more shows get booked. Every show has a 2:1 multiplier — a $1,000 show generates $500+ in downstream revenue.

---

## Part 2: Current State (April 2026)

### Revenue (Monthly)

| Stream | Apr 2026 | Notes |
|--------|----------|-------|
| Inn (6 rooms, 18% occupancy) | $3,000 | ADR $148, seasonal |
| Bar (12 show nights/mo) | $2,000 | 80%+ margin |
| Shows (door/tickets) | $1,500 | 2:1 multiplier feeds other streams |
| DSD self-serve (walk-ins) | $500 | Just launched, 5 pitches/day target |
| Photography/gallery | $500 | Chase's practice |
| MBT institutional | $0 | Pipeline building, no closed deals |
| **Total MRR** | **$7,500** | |

### Expenses (Monthly)

| Category | Amount | Notes |
|----------|--------|-------|
| Rent | $1,000 | |
| Vehicle | $520 | Ends June 2026 |
| Insurance | $165 | |
| Gas/fuel | $400 | |
| Phone | $250 | |
| Software/SaaS | $450 | |
| IRS installment | $100 | From 2020 liability |
| Food | $400 | |
| Internet | $120 | |
| Accounting | $380 | |
| Google services | $140 | |
| Cloud/AI | $200 | |
| Misc | $300 | |
| **Total burn** | **$4,425** | Drops to $3,905 after June (truck paid off) |

**Platform infrastructure:** $31/mo (Vercel $20, DigitalOcean $6, GCS ~$5). This is the cost to run 14 domains, the radio relay, and all storage. Near-zero marginal cost per new region.

### Break-Even Target: $15,000/month

Gap from current: $7,500/month. This is the number that matters for the next 6 months.

### Cash Position
- Cash on hand: ~$5,800 (as of March 27)
- Outstanding receivable (S2PX): $22,739-$27,999
- Vehicle payoff: June 2026 (frees $520/mo)
- Tax liabilities: ~$22K aggregate (IRS installments, state, penalties)

---

## Part 3: Revenue Streams — Deep Dive

### A. Hospitality (Inn + Bar + Events)

**Current:** $91,971/year ($7,664/mo), operating at -$22,055/year loss.

**Five levers to profitability:**

| Lever | Current | Target | Revenue Impact |
|-------|---------|--------|----------------|
| Occupancy | 18% | 28% | +$32,485/yr |
| ADR | $148 | $173 | +$10,266/yr |
| Events/mo | 2 | 5 | +$22,163/yr |
| Private buyouts/yr | 5 | 7 | +$5,200/yr |
| Touring dates | 8 | 24 | Variable |
| **Total incremental** | | | **+$70,114/yr** |

Turns profitable at +$48,000/year NOI ($4,000/mo) in Year 2.

**Wedding revenue (the multiplier):**

| Scenario | Weddings/yr | Avg Package | Annual |
|----------|-------------|-------------|--------|
| Conservative | 12 | $10,000 | $120,000 |
| Target | 16 | $12,000 | $192,000 |
| Stretch | 20 | $14,100 | $282,000 |

Single wedding weekend = 7-17x regular weekend revenue. Full package at $14,100 (venue $2,500 + lodging buyout $3,600 + photography $3,500 + video $2,000 + music $1,500 + coordination $1,000).

### B. Entertainment (Shows + Touring + Records)

**Show economics (Mississippi non-union market):**
- Per-show musician cost: $200-300
- Monthly retainer (12 shows, 4-piece): $7,200-9,600
- Bar revenue per show night: $300-500 at 80%+ margin
- 12 show nights/month = $3,600-6,000/mo bar revenue alone

**Artist booking tiers:**
- Regular rotation: $300-2K/show
- Monthly headliners: $2-8K
- Quarterly anchors: $5-15K

**Products:**
- Destination Session: $25,000 price / $20,900 cost = $4,100 margin
- Delta Run corridor tour (Natchez-Clarksdale-Memphis, 292mi): $3,200-$19,800 per run
- The ecosystem multiplier recovers ~$8,300 mid-case via downstream revenue

**Records:** Non-exclusive deals. Revenue shares: 50% door, 70% merch, streaming pass-through. Low cost, long tail.

### C. Platform — Self-Serve (DSD)

| Tier | Price | Target at 12 mo |
|------|-------|-----------------|
| Free | $0 | 500 listings |
| Marketing | $99/mo | 50 businesses |
| Engine | $250/mo | 20 businesses |

**Walk-in sales math:**
- 5 pitches/day × 5 days/week = 25/week
- 20% close rate = 5 new customers/week
- 20 weeks to 100 customers (mid-August)
- At blended $99 avg: $9,900/month by August
- At 12 months: $10,000-$15,000/month ($120K-$180K/year)

**Unit economics at scale:**

| Scale | AI Cost/User | Total Cost | Revenue | Margin |
|-------|-------------|-----------|---------|--------|
| 50 users | $1.31 | $1,948/mo | $5,577/mo | 65% |
| 100 users | $1.88 | $3,910/mo | $28,452/mo | 86% |
| 250 users | $1.88 | $9,563/mo | $114,375/mo | 92% |

### D. Platform — Institutional (MBT Program Sales)

**Pricing per engagement (not a tier chart):**

| Component | Range |
|-----------|-------|
| Setup/Implementation | $5K-$25K one-time |
| Annual Platform License | $12K-$75K/year |
| Content/Media Package | $24K-$60K/year |
| Merchant Onboarding | Per-business at scale |

**Directional pricing tiers:**
- Base Platform: ~$1,000/month ($12K/year)
- Advanced + Custom Dev: ~$5,000/month ($60K/year)
- Full Stack + Support: ~$6,300/month ($75.6K/year)

**Addressable market:**
- 16,000 US municipalities under 5,000 population
- 0.1% penetration = 16 institutional clients
- At $25K-$50K/year each = $400K-$800K ARR

**Sales cycle:** 90-180 days. MS municipal fiscal year July 1 - June 30. First institutional close realistic Q4 2026 at earliest.

**First targets:**
1. Natchez Tourism Office ($5K/mo, 80% confidence)
2. El Dorado, AR (Tracy's relationships, Murphy Arts District $54M invested)
3. Regional brokerages (faster procurement than municipal)

### E. Media Revenue

| Stream | Current | Year 2 Target | Year 3 Target |
|--------|---------|---------------|---------------|
| Magazine sponsored content | $0 | $2,000/mo | $3,500/mo |
| Radio sponsorships | $0 | $1,000/mo | $2,000/mo |
| Freelance (Chase, $150/hr) | $1,500/mo | $4,000/mo | $6,000/mo |
| Stock/prints | $0 | $500/mo | $2,000/mo |
| Touring revenue share | $0 | $2,000/mo | $4,000/mo |

---

## Part 4: Three-Year Pro Forma

### Key Assumptions

| Assumption | Value | Basis |
|------------|-------|-------|
| Walk-in close rate | 20% | Industry standard for local B2B |
| Show frequency | 12/mo Y1 → 20/mo Y3 | Current 12, capacity for 20+ |
| Occupancy growth | 18% → 28% → 40% | Seasonal, wedding-driven |
| DSD customer churn | 5%/month | SaaS SMB typical |
| Institutional sales cycle | 90-180 days | Municipal procurement |
| Institutional close rate | 25% of qualified pipeline | Conservative |
| Bearsville activation | Q3 2026 | Summer, minimal revenue Y1 |
| Third market (licensed) | Q2 2027 | First external MBT deployment |
| Inflation | 3%/year on costs | |
| Wedding ramp | 8 Y1 → 16 Y2 → 20 Y3 | Building reputation |
| Truck payment ends | June 2026 | Confirmed |

### Year 1 (Apr 2026 — Mar 2027): BUILD + PROVE

| Revenue Stream | Q2 2026 | Q3 2026 | Q4 2026 | Q1 2027 | Y1 Total |
|----------------|---------|---------|---------|---------|----------|
| Inn (rooms) | $9,000 | $15,000 | $12,000 | $9,000 | $45,000 |
| Bar | $6,000 | $12,000 | $10,000 | $8,000 | $36,000 |
| Shows (door) | $4,500 | $9,000 | $7,500 | $6,000 | $27,000 |
| Weddings | $0 | $28,000 | $20,000 | $12,000 | $60,000 |
| DSD self-serve | $3,000 | $15,000 | $24,000 | $30,000 | $72,000 |
| MBT institutional | $0 | $0 | $12,500 | $15,000 | $27,500 |
| Photography/freelance | $3,000 | $6,000 | $6,000 | $6,000 | $21,000 |
| Media (magazine, radio) | $0 | $3,000 | $6,000 | $9,000 | $18,000 |
| Records/touring | $1,500 | $4,500 | $4,500 | $4,500 | $15,000 |
| **Total Revenue** | **$27,000** | **$92,500** | **$102,500** | **$99,500** | **$321,500** |

| Expense Category | Q2 | Q3 | Q4 | Q1 | Y1 Total |
|-----------------|-----|-----|-----|-----|----------|
| Personal burn | $13,275 | $11,715 | $11,715 | $11,715 | $48,420 |
| Inn operating | $28,500 | $28,500 | $28,500 | $28,500 | $114,000 |
| Entertainment (talent) | $3,600 | $7,200 | $9,600 | $9,600 | $30,000 |
| Platform/infra | $93 | $93 | $93 | $93 | $372 |
| Marketing/sales | $1,500 | $3,000 | $3,000 | $3,000 | $10,500 |
| **Total Expenses** | **$46,968** | **$50,508** | **$52,908** | **$52,908** | **$203,292** |

| | Q2 | Q3 | Q4 | Q1 | Y1 Total |
|---|---|---|---|---|---|
| **Net Income** | **-$19,968** | **$41,992** | **$49,592** | **$46,592** | **$118,208** |

**Y1 milestones:**
- Break even by end of Q2 ($15K/mo)
- 100 DSD self-serve customers by August
- First institutional deal by Q4
- 8 weddings
- Bearsville soft launch Q3

### Year 2 (Apr 2027 — Mar 2028): SCALE + LICENSE

| Revenue Stream | Annual | Monthly Avg | Growth Driver |
|----------------|--------|-------------|---------------|
| Inn (rooms, 35% occ) | $85,000 | $7,083 | Weddings + tourism season |
| Bar | $60,000 | $5,000 | 16 show nights/mo |
| Shows | $48,000 | $4,000 | Anchor artists + circuit |
| Weddings | $192,000 | $16,000 | 16 weddings at $12K avg |
| DSD self-serve (200 cust) | $180,000 | $15,000 | Walk-in + online conversion |
| MBT institutional (3 clients) | $108,000 | $9,000 | Tourism office + 2 chambers |
| Photography/freelance | $72,000 | $6,000 | Destination sessions |
| Media | $66,000 | $5,500 | Sponsorships + syndication |
| Records/touring | $36,000 | $3,000 | Corridor circuit established |
| Bearsville (4 modules) | $24,000 | $2,000 | Directory + media in HV |
| **Total Revenue** | **$871,000** | **$72,583** | |

| Expense Category | Annual |
|-----------------|--------|
| Personal/overhead | $46,860 |
| Inn operating | $120,000 |
| Entertainment (talent + touring) | $72,000 |
| Platform/infra | $1,200 |
| Sales + marketing | $24,000 |
| Contractor (managing editor) | $36,000 |
| Bearsville ops | $18,000 |
| **Total Expenses** | **$318,060** |

| **Y2 Net Income** | **$552,940** |
|---|---|

**Y2 milestones:**
- $760K "Lean & Mean" target within reach at $871K
- 200 DSD customers
- 3 institutional clients
- 16 weddings
- Bearsville generating revenue
- Hire managing editor
- First licensed third-party market exploration

### Year 3 (Apr 2028 — Mar 2029): REPLICATE + COMPOUND

| Revenue Stream | Annual | Monthly Avg | Growth Driver |
|----------------|--------|-------------|---------------|
| Inn (40% occ, premium pricing) | $110,000 | $9,167 | Reputation + wedding book |
| Bar | $72,000 | $6,000 | 20 show nights/mo |
| Shows | $60,000 | $5,000 | Regional headliners |
| Weddings | $282,000 | $23,500 | 20 weddings at $14.1K |
| DSD self-serve (350 cust) | $300,000 | $25,000 | Multi-city, online growth |
| MBT institutional (8 clients) | $360,000 | $30,000 | 3 towns + 3 chambers + 2 brokerages |
| Photography/freelance | $72,000 | $6,000 | Steady |
| Media | $96,000 | $8,000 | Magazine profitable, radio sponsored |
| Records/touring | $60,000 | $5,000 | Multi-artist roster |
| Bearsville | $72,000 | $6,000 | Full 4-module revenue |
| Third market (licensed) | $48,000 | $4,000 | First external MBT license |
| **Total Revenue** | **$1,532,000** | **$127,667** | |

| Expense Category | Annual |
|-----------------|--------|
| Personal/overhead | $48,300 |
| Inn operating | $130,000 |
| Entertainment | $96,000 |
| Platform/infra | $3,600 |
| Sales + marketing | $48,000 |
| Staff (editor + 1 sales) | $96,000 |
| Bearsville ops | $36,000 |
| Third market support | $24,000 |
| **Total Expenses** | **$481,900** |

| **Y3 Net Income** | **$1,050,100** |
|---|---|

---

## Part 5: Regional Ramp-Up Model

### What a Regional Deployment Looks Like

| Phase | Timeline | Cost | What Happens |
|-------|----------|------|-------------|
| **Seed** | Month 1-2 | $5K | Tenant configured, DNS wired, directory seeded, 50 businesses imported |
| **Activate** | Month 3-4 | $10K | Radio stream live, magazine content flowing, 10 paid listings |
| **Operate** | Month 5-12 | $2K/mo | Local operators running shows, content, business development |
| **Steady state** | Month 13+ | $1.5K/mo | Self-sustaining with local revenue covering costs |

**Infrastructure cost per new region:** Near zero (same Vercel deployment, same database, same DNS). The real cost is operator time and physical venue.

### Regional Revenue Ramp

| Month | Free Listings | Paid ($99) | Paid ($250) | Monthly Rev | Cumulative |
|-------|--------------|-----------|-------------|-------------|------------|
| 1 | 50 | 0 | 0 | $0 | $0 |
| 3 | 100 | 5 | 1 | $745 | $1,490 |
| 6 | 200 | 15 | 3 | $2,235 | $8,385 |
| 9 | 300 | 30 | 5 | $4,220 | $22,545 |
| 12 | 400 | 50 | 10 | $7,450 | $51,495 |

A new region breaks even on platform costs (~$2K/mo operator support) by month 6-9.

### Three-Region Revenue Stack (Year 3)

| Region | Status | Annual Revenue |
|--------|--------|----------------|
| **Natchez (Big Muddy)** | Flagship, all 9 modules | $1,056,000 |
| **Bearsville (Hudson Valley)** | 4 modules, Elijah + Miles | $72,000 |
| **Market 3 (Licensed)** | External operator, 4-6 modules | $48,000 |
| **Platform (cross-region)** | Institutional + self-serve | $660,000 |
| **Deduplication** | (Platform rev counted above) | -$304,000 |
| **Total** | | **$1,532,000** |

### Target Markets for Licensing (Priority Order)

| Market | Why | Contact | Timeline |
|--------|-----|---------|----------|
| **El Dorado, AR** | $54M Murphy Arts District, Tracy's relationships, new Chamber CEO with $400K mandate | Steven Jones (Chamber) | Q3-Q4 2026 |
| **Clarksdale, MS** | Blues corridor, 22 venues, Ground Zero | JP's connections | Q1 2027 |
| **Oxford, MS** | University town, Square Books, 18 venues | TBD | Q2 2027 |
| **Greenwood, MS** | Viking Range HQ, culinary tourism | TBD | Q3 2027 |
| **Woodstock, NY** | Bearsville anchor, Colony, Levon Helm Studios | Elijah (operator) | Active |

---

## Part 6: Competitive Position

| Us | Them |
|----|------|
| $99/mo (Marketing tier) | Townsquare Interactive: $499/mo |
| Own the magazine, radio, photography, label, hotel | Competitors own none of these |
| Same team that brings the talent brings the promotion | Disconnected vendors |
| $31/month to run 14 domains | Competitors spend $500K+ on infrastructure |
| Walk-in sales, same-day close | 90-day enterprise sales cycle |

**The one-liner:** "We're not a software company. We're a media company that sells software at software prices."

**The moat:** No competitor can offer editorial coverage + radio mentions + a regional directory + a touring circuit + a hotel. Because they don't own a magazine, radio station, record label, or a Sprinter van. We do.

---

## Part 7: Risk Factors

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Institutional sales take longer than 180 days | High | High | Bridge with self-serve DSD + Inn + shows |
| Wedding pipeline doesn't materialize Y1 | Medium | High | Focus on Inn occupancy + bar revenue |
| Chase bandwidth (CEO/CTO/photographer/sales) | High | High | Hire managing editor at 50 Engine customers |
| Seasonal revenue dips (Jan-Mar) | Certain | Medium | Weddings are counter-seasonal, conferences |
| S2PX receivable never collected | Medium | Medium | Write off, focus forward |
| Tax liabilities compound | Medium | High | IRS installment current, file 2025 on time |
| Bearsville launch delays | Low | Low | Not revenue-dependent Y1 |

---

## Part 8: The Narrative (Derived from the Numbers)

### What the numbers tell us to say:

1. **We are a media company first.** The technology serves the media. Not the other way around. Lead with what we DO (shows, radio, magazine, records), not what we BUILT (platform, modules, AI).

2. **The ecosystem multiplier is the story.** A $1,000 show generates $500+ downstream. Nobody else can say this because nobody else owns the magazine, the radio station, AND the hotel. This is the pitch to every audience.

3. **The price is the differentiator.** $99/month vs. $499/month (Townsquare). Name the competitor. Name the price. Let the math do the selling.

4. **Regional identity is the brand.** "Memphis to New Orleans" is the geography. "The Mississippi corridor" is the territory. Natchez is the anchor. This is place-based branding, not tech branding.

5. **Weddings are the revenue surprise.** A single wedding weekend is 7-17x a regular weekend. At 16 weddings/year, that's $192K — more than any other single revenue stream. The narrative should feature the Inn as a wedding/event destination, not just "a place to stay."

6. **Institutional sales are the long game.** Don't promise them on the website. Don't pitch "civic-commerce OS" to consumers. The institutional track happens in person, in meetings, with proposals. The website's job is to prove we're real — shows, magazine, radio, directory, photography. Proof, not pitch.

### The narrative sequence for each audience:

**Tourist/music fan:** "Live music from Memphis to New Orleans. A magazine, a radio station, and a record label — all from Natchez, Mississippi. Come for a show. Stay at the Inn."

**Local business owner:** "Get your business listed where travelers actually look. Free to start. $99/month gets you the magazine, the radio, and the AI assistant that answers questions about your business 24/7."

**Band/artist:** "We book your shows, drive you there, put you on the radio, write about you in the magazine, release your record, and sell it in the store. Non-exclusive. You keep your masters."

**Venue owner:** "We bring the talent, the production, the promotion, and the audience. Your venue ends up in the directory where every tourist finds it."

**Institutional buyer (in person, not on website):** "You're spending $499/month per business on disconnected tools. We do it for $99 — and we own the magazine, the radio station, and the event pipeline. Buy the program. We stand it up. Your businesses participate."

---

## Appendix: Pipeline (Top 20 Opportunities)

| Opportunity | Annual Value | Confidence | Category |
|------------|-------------|-----------|----------|
| MS Tourism — County CVB | $60,000 | 40% | MBT Directory |
| Natchez Tourism Office | $60,000 | 80% | MBT Directory |
| El Dorado Chamber | $50,000 | 30% | Platform |
| Wedding packages (Y1) | $60,000 | 60% | Inn |
| DSD Self-Serve (100 cust) | $118,800 | 50% | MBT Directory |
| Freelance Photography | $72,000 | 70% | Freelance |
| Magazine Sponsorships | $42,000 | 40% | Content/Media |
| Radio Sponsorships | $24,000 | 35% | Content/Media |
| Touring Circuit Revenue | $48,000 | 50% | Touring |
| Inn Optimized Revenue | $180,000 | 55% | Inn |

---

*This document is the input for the Narrative Bible. Every page, every tagline, every CTA should trace back to a number in this analysis.*
