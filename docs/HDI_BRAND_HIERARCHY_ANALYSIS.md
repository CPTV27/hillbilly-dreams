# Hillbilly Dreams Inc — Brand Hierarchy & Business Logic Analysis

**Date:** 2026-03-30
**Purpose:** Cross-AI validation of brand architecture, URL routing, org structure, and business logic. Feed this document to multiple AI systems for error-checking, gap analysis, and strategic recommendations.

---

## 1. CORPORATE HIERARCHY

```
HILLBILLY DREAMS INC (HDI)
│   Holding company. Not yet legally formed (needs attorney).
│   Currently operates through FarleyPierson LLC (EIN 81-4280721).
│   HQ: Natchez, Mississippi
│
├── BIG MUDDY ECOSYSTEM (proof-of-concept / owned media)
│   │   Physical anchor: The Big Muddy Inn, Natchez MS
│   │   All brands share one Next.js codebase, one Vercel deployment
│   │
│   ├── Big Muddy Touring        bigmuddytouring.com         Hospitality + corridor travel
│   ├── Big Muddy Magazine       bigmuddymagazine.com        Long-form editorial
│   ├── Big Muddy Radio          bigmuddyradio.com           Curated playlists + live shows
│   ├── Big Muddy Records        bigmuddyrecordlabel.com     Independent label
│   ├── Big Muddy Entertainment  bigmuddyentertainment.com   Hub: shows, talent, Rise Up
│   └── BuyCurious Art           buycurious.art              Gallery / artist marketplace
│
├── PRODUCTS (B2B SaaS)
│   ├── Measurably Better Things (MBT)   measurablybetter.life / measurablybetterthings.com
│   │   Local business operating system. $20/$49/$99/mo tiers.
│   │   Sells ecosystem access (Directory + Magazine + Radio), not just software.
│   │
│   └── Deep South Directory (DSD)        deepsouthdirectory.com
│       Regional business network. Entry point for MBT upsell.
│       Walk-in sales: 5 pitches/day at $20-$99/mo.
│
├── PHILOSOPHY / CONTENT
│   └── Outsider Economics               outsidereconomics.com
│       Field manual for independent economic systems.
│       Powers the "why" narrative behind everything above.
│
├── CORPORATE
│   └── Hillbilly Dreams Inc             hillbillydreamsinc.com
│       Holding company site. Currently sparse.
│
└── PARTNER TENANTS (same codebase, separate entities)
    ├── Studio C Video                    studiocvideo.com
    │   Entity: Tuthill Design LLC d/b/a Studio C Video
    │   Chase owns 40%. Production arm.
    │
    ├── Tuthill Design                    tuthilldesign.com
    │   Entity: Tuthill Design LLC (EIN 39-3499965)
    │   Co-owned by Elijah Fitzgerald-Tuttle. Design/photography.
    │
    └── Bearsville Media Group            bearsvillemedia.com (not yet live)
        Entity: Bearsville Media Group LLC (EIN 87-1868337)
        Dormant. Hudson Valley operation. Same stack, different region.
```

---

## 2. COMPLETE DOMAIN MAP

### Live Domains (14 confirmed on Vercel)

| # | Domain | Route Group | Brand Layer | Content | Status |
|---|--------|-------------|-------------|---------|--------|
| 1 | bigmuddytouring.com | touring | Brand | Inn, lodging, corridor travel, events | Live |
| 2 | bigmuddymagazine.com | magazine | Brand | Editorial, articles, photo essays | Live |
| 3 | bigmuddyradio.com | radio | Brand | Playlists, shows, live sessions | Live |
| 4 | bigmuddyrecordlabel.com | records | Brand | Label, artists, releases | Live |
| 5 | bigmuddyentertainment.com | entertainment | Hub | Shows, talent search, Rise Up | Live |
| 6 | deepsouthdirectory.com | directory | Product | Business listings, SaaS | Live |
| 7 | outsidereconomics.com | economics | Content | Field manual, theory | Live |
| 8 | buycurious.art | measurably-better | Brand | Gallery (redirects to MBT storefront) | Live |
| 9 | measurablybetter.life | measurably-better | Product | MBT platform | Live |
| 10 | measurablybetterthings.com | measurably-better | Product | MBT alias | Live |
| 11 | hillbillydreamsinc.com | hillbilly | Corporate | Holding company | Live |
| 12 | studiocvideo.com | studioc | Partner | Video production | Live |
| 13 | tuthilldesign.com | tuthill | Partner | Design/photography | Live |
| 14 | superchase.app | — | Personal | Chase's personal app | Live |

### Domains Referenced But Status Unclear

| Domain | Status | Notes |
|--------|--------|-------|
| bigmuddymedia.com | Listed in CLAUDE.md | Not in domain-routes.ts — orphaned? |
| bearsvillemedia.com | Tenant config exists | Not in domain-routes.ts — dormant tenant |

### DNS Architecture

- All domains managed in Cloudflare (ChasePierson.TV account)
- All set to DNS-only (gray cloud, no proxy)
- Apex: A record → 76.76.21.21 (Vercel)
- www: CNAME → cname.vercel-dns.com
- Vercel handles SSL auto-provisioning

### Routing Logic (middleware.ts)

```
Request → Extract hostname
  → Strip www (301 redirect to apex)
  → Skip: /api, /_next, static assets
  → Skip: /admin, /demo, /briefings, /welcome (no rewrite)
  → Skip: paths already matching a brand prefix
  → Match hostname against domain-routes config
  → Rewrite to matched route group (e.g., /touring/*)
  → Fallback: default to 'touring' route group
```

---

## 3. LEGAL ENTITIES

| Entity | EIN | Type | State | Status | Owner |
|--------|-----|------|-------|--------|-------|
| FarleyPierson LLC | 81-4280721 | Single-member LLC | NY | Active (since 2016) | Chase Pierson |
| Tuthill Design LLC | 39-3499965 | Multi-member LLC | NY | Active (since Jul 2025) | Chase + Elijah |
| Bearsville Media Group LLC | 87-1868337 | Single-member LLC | NY | Dormant | Chase Pierson |
| Hillbilly Dreams Inc | — | Not yet formed | — | Needs attorney | — |
| Scan2Plan Inc | — | Delaware C-Corp | DE | Partnership dissolved 03/25/2026 | V. Owen Bush (CEO) |

### Tax Filing Status (as of 2026-03-26)

- **FarleyPierson LLC:** Files Schedule C on Chase's 1040
- **Tuthill Design LLC:** Form 1065 **PAST DUE** (was due 03/15/2026). Accumulating $220/mo late penalties.
- **Bearsville Media Group LLC:** No income, no bank accounts, dormant
- **Chase Personal:** IRS installment agreement: $100/mo by the 28th (2020 taxes)

---

## 4. OWNERSHIP & CAP TABLE

### Current State (Pre-Formation)

| Person | Relationship | Formal Equity |
|--------|-------------|---------------|
| Chase Pierson | Sole proprietor (FarleyPierson LLC) | 100% of operating entity |
| Tracy Alderson-Allen | Equity partner (handshake) | No formal agreement yet |
| Amy Allen | Equity partner (handshake) | No formal agreement yet |
| JP Houston | Contributor (deal not finalized) | No equity, potential rev share |

### Target Cap Table (When HDI Forms)

| Holder | Shares | Notes |
|--------|--------|-------|
| Chase Pierson | 27% | Fully vested |
| Tracy Alderson-Allen | 27% | Fully vested |
| Amy Allen | 27% | Fully vested |
| Option Pool | 19% | For JP, future hires, advisors, talent |

Board decisions require 2-of-3 founder approval. All three founders dilute equally when option grants are issued.

---

## 5. REVENUE MODEL

### MBT / Deep South Directory Pricing (LOCKED)

| Tier | Name | Price | Key Features | Launch |
|------|------|-------|-------------|--------|
| Free | Entry | $0 | Basic DSD profile, 20 AI queries/mo | Live |
| 1 | The Listing | $20/mo | AI listing, Google review alerts, monthly report | Apr 1 |
| 2 | The Works | $49/mo | + Social posting (4/week), content calendar | Apr 21 |
| 3 | The Engine | $99/mo | + Review responses, competitor watch, QB integration, Magazine feature | Apr 14 |

### Revenue Engines (Parallel)

| Engine | Operator | Revenue Model | Target |
|--------|----------|---------------|--------|
| **Inn/Lodging** | Tracy + Amy | Nightly rates + bar revenue | Stable cash flow |
| **Bar** | Amy | $300-500/show night × 12 nights/mo = $3,600-6,000/mo at 80%+ margin | High-margin parallel |
| **Shows** | JP | Tickets + 2:1 ecosystem multiplier | Audience generation |
| **MBT SaaS** | Chase | Walk-in sales, 5 pitches/day at $20-99/mo | Recurring revenue |
| **Magazine/Radio** | Chase + Tracy | Sponsorships, editorial | Brand equity + ad revenue |
| **Gallery** | Chase | Artist sales via Stripe Connect | Commission model |

### Ecosystem Multiplier

**Every $1 in show revenue generates $0.50 in downstream Inn + Directory revenue.** This 2:1 multiplier means a $1,000 show night actually produces $1,500 in total ecosystem value. Finance must track "show-attributed revenue" separately.

### Walk-In Sales Math

At 100 DSD customers (40% at $20 / 35% at $49 / 25% at $99):
- Monthly: $4,555/mo
- Annual: $54,660

### Competitive Position

MBT replaces an 11-tool stack costing $2,839/mo. But Chase's honest claim is **$500-800/mo savings** until all product gaps ship. Never claim the full $2,839 figure.

---

## 6. TEAM ROLES & OPERATOR SPLIT

### Day/Night Split

| Time | Who | Activity | Revenue Path |
|------|-----|----------|-------------|
| **Daytime** | Chase | Tech/media sales, 5 walk-in MBT pitches/day, CVB meetings, bank sponsors | Recurring SaaS + partnerships |
| **Show Nights** | Tracy + Amy | Bar ops, liquor compliance, guest experience | Bar revenue ($3,600-6K/mo) |
| **Show Nights** | JP | Show production, live entertainment, audience generation | 10% Entertainment rev share |

### Revenue Share Structures (Contractor — No Equity Required)

| Role | Split |
|------|-------|
| Affiliate Sales Rep | $20/mo residual per $99 account sold |
| City Rep | 15% of that city's MBT revenue |
| JP (Entertainment) | 10% of Entertainment dept revenue |
| Tracy (Hospitality) | 15% of Inn NOI |
| Rise Up Artist | 50% door / 70% merch / streaming |
| Content Creator | $50-200/piece or 25% sponsored revenue |

---

## 7. BRAND VOICE MATRIX

| Brand | Tone | Metaphor | Anti-Patterns |
|-------|------|----------|---------------|
| **Touring** | Road-worn, warm, rock & roll, dark twilight | Bourbon on a porch at sunset | No tourism blogs, no hotel chain speak |
| **Magazine** | Literary, observational, place-as-character | Garden & Gun meets Kinfolk | No listicles, no SEO spam |
| **Radio** | Fun outlaw, DJ energy, inclusive chaos | College radio meets juke joint | No corporate radio, no gatekeeping |
| **Records** | Manifesto energy, analog warmth, terse | Indie label with taste | No major label press releases |
| **Entertainment** | Community-first, warm invitation, Rise Up | Block party organizer | No corporate entertainment speak |
| **Gallery** | Museum-minimal, artist-centered, quiet | White walls, natural light | No auction house speak |
| **MBT** | Swiss-clean authority, price-confident | Operating system for Main Street | No Big Muddy warmth (HARD FIREWALL) |
| **DSD** | Helpful local friend, zero jargon | That neighbor who knows everyone | No Yelp speak, no robotic Maps tone |
| **Outsider Economics** | Field manual, confrontational with data | Practitioner's handbook | No hedging, no think-tank tone |
| **Hillbilly Dreams** | Electric, psychedelic, weird, playful | Duncan Trussell / Midnight Gospel | Under-branded currently |
| **Studio C / Tuthill** | Professional competence, understated B2B | The guys who make it look good | No creative agency speak |

### Critical Brand Rules
- MBT has a **hard font firewall** from Big Muddy — different typography, different feel
- MBT abbreviates to **MBT**, never "MB"
- Tracy and Amy are **equity partners**, never employees
- No tech jargon on customer-facing pages
- AI generates art, Canva handles typography — never let AI put text in images

---

## 8. MULTI-TENANT ARCHITECTURE

The codebase supports 4 tenants from a single deployment:

| Tenant ID | Entity | Domains | Location | Features |
|-----------|--------|---------|----------|----------|
| big-muddy | Hillbilly Dreams Inc | 10 domains | Natchez, MS | Full ecosystem |
| bearsville | Bearsville Media Group LLC | 1 (dormant) | Woodstock, NY | directory, radio, magazine, studio |
| studio-c | Tuthill Design LLC d/b/a Studio C | 3 domains | Woodstock, NY | gallery, studio, creative |
| tuthill | Tuthill Design LLC | 1 domain | Woodstock, NY | gallery, studio, creative |

All share one GCS bucket (`bmt-media-bigmuddy`), one Vercel deployment, one database.

---

## 9. IDENTIFIED INCONSISTENCIES & OPEN QUESTIONS

### Structural Issues

1. **bigmuddymedia.com** is listed in CLAUDE.md as a live domain but has NO routing in domain-routes.ts. Orphaned domain? Does it need a route, or should it redirect somewhere?

2. **buycurious.art** routes to `measurably-better` route group, not a gallery route. The gallery was "moved to Storefront module on MBT." Is this intentional? The brand DNA file still describes it as a standalone gallery with museum-minimal voice.

3. **Bearsville tenant** has a full config in tenants.ts but no domain routing in domain-routes.ts and the LLC is dormant. Should it be removed from the codebase until active?

4. **Studio C and Tuthill** are separate tenants but the same LLC (Tuthill Design LLC). The d/b/a relationship should be formally documented. Are they distinct products or one entity with two brands?

### Legal / Formation Gaps

5. **HDI not formed.** Cap table is handshake. Tracy and Amy have no formal equity agreement. The "equity partner" designation has no legal standing until incorporation.

6. **Tuthill Design LLC Form 1065 is past due** with $220/mo penalties accumulating since 03/15/2026.

7. **JP's deal is not finalized.** His name should not appear on public-facing pages, but he's referenced in GTM plans for Entertainment.

### Revenue / Pricing

8. **Two pricing frameworks coexist.** The locked DSD tiers ($20/$49/$99) and the narrative pricing framework ($20/$50/$100/$250) describe overlapping but non-identical products. Which is canonical? Are they the same product at different stages?

9. **The $2,839/mo competitive claim** is documented as an overstatement. Honest claim is $500-800/mo savings. But the competitive-stack-analysis.md (now archived) used the higher number. Has this been purged from all customer-facing copy?

10. **MBT at $99/mo includes Magazine feature and Radio mentions.** These are human-operated editorial products. At scale (100+ customers), can the editorial team produce enough content to honor this promise?

### Brand Architecture

11. **15 domains for one business** is a lot of surface area. Some domains (bigmuddymedia.com, superchase.app) may create confusion rather than value. Consider whether consolidation would strengthen the brand.

12. **"Big Muddy" vs "Hillbilly Dreams"** — the parent company is HDI, but all consumer brands say "Big Muddy." The relationship between these two names isn't clear to an outsider. Which is the brand? Which is the entity?

13. **Theme inconsistency:** 12 themes exist in the theme registry, but only 10 brands have Brand DNA files. The `inn` and `gallery-funky` themes have no corresponding brand DNA or GTM plans.

14. **Default metadata** points to Big Muddy Touring (not HDI or MBT). A visitor landing on any unmapped domain sees Touring content. Should the default be MBT or HDI instead?

### Technical

15. **All 4 tenants share one GCS bucket** (bmt-media-bigmuddy). If Bearsville or Tuthill scales independently, media isolation will be needed.

16. **CLAUDE.md exists as both a tracked file AND an untracked root file.** The tracked version (committed) and the one at repo root may diverge.

---

## 10. QUESTIONS FOR CROSS-AI VALIDATION

When feeding this document to other AIs, ask them:

1. **Brand architecture:** Is 15 domains across 10 brands the right structure for a company with 4 team members and 6 weeks of runway? Where would you consolidate?

2. **Legal risk:** With equity partners on handshake, past-due tax filings, and no formal entity — what's the priority order for legal formation?

3. **Pricing coherence:** Do the DSD tiers ($20/$49/$99) and the narrative framework ($20/$50/$100/$250) conflict? How should they unify?

4. **Ecosystem multiplier:** Is the 2:1 show-to-revenue claim verifiable? What data would you need to validate it?

5. **Competitive moat:** "No SaaS competitor owns media properties" — is this true? Are there regional media companies doing something similar?

6. **Tenant architecture:** Is it premature to have 4 tenants in the system when only 1 (Big Muddy) is generating revenue? Does the complexity help or hurt at this stage?

7. **Operator split:** Chase selling MBT during the day while Tracy/Amy run the Inn at night — does this create single-point-of-failure risk? What happens if Chase is unavailable for a week?

8. **Revenue math:** At the walk-in cadence (5 pitches/day, ~20% close rate), how long to reach 100 customers? Is the timeline realistic with 6 weeks of runway?

---

*This document was generated from the live codebase at commit 3377096 (2026-03-30). All data sourced from: packages/config/brands.ts, apps/web/config/domain-routes.ts, apps/web/config/tenants.ts, apps/web/middleware.ts, .claude/agents/brands/*, .claude/agents/gtm/*, CLAUDE.md, and memory files.*
