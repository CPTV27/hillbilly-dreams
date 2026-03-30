# Research Brief: Scan2Plan / Twinner Negotiation

**Purpose:** Give a fresh AI agent full context on this deal so it can help refine the term sheet, draft communications, and advise on negotiation strategy.

---

## The Parties

**Chase Pierson / Hillbilly Dreams Inc (HDI)**
- CEO of HDI, a media-hospitality-technology company in Natchez, Mississippi
- Built the S2PX platform (full-lifecycle scanning business management software)
- Owns the source code (private GitHub repo CPTV27/S2PX)
- Also runs: Big Muddy (15 live domains), Measurably Better Things (SaaS), Outsider Economics
- Chase holds 20% equity in Twinner LLC

**Owen Bush / Scan2Plan LLC / Twinner LLC / UppTeam**
- Owns Scan2Plan (3D laser scanning and BIM documentation business)
- Owns Twinner (digital twin creation from scan data)
- UppTeam is the parent/operational entity
- 2025 revenue: $1,115,449 across 1,888 projects
- Net income: $261,000 on 82% margin
- Outside services + contractors: $357,750/year (the automation target)
- 858 estimates processed in 2025
- Top clients: AYON Studio, Crisp Architects, McBride Architects, Studio DB, Svigals+Partners
- Based in the northeastern US

**Elijah Tuttle**
- Developer who built the original CPQ (Configure-Price-Quote) calculator for Owen
- Owen funded the development
- Elijah also runs Studio C (video/audio production) and Tuthill Design (photography)
- Chase has offered Elijah a separate platform implementation deal for his own businesses
- Elijah is "in the middle" of this negotiation — he built the tool, Owen paid for it, Chase owns the platform it runs on

---

## Timeline

1. **2024-2025:** Elijah builds the S2PX CPQ to Owen's specifications. Owen funds the development.
2. **March 23, 2026:** Chase presents a technology licensing proposal to Owen. Core Node ($5K/mo) + Growth Module ($1K-$10K/mo slider). Total: $6K-$15K/month.
3. **March 25, 2026:** Owen declines the deal. All GitHub collaborator access is revoked.
4. **March 25, 2026:** Chase creates a complete infrastructure handoff package for Elijah to operate the CPQ independently (without source code — just GCP/database/hosting access).
5. **March 30, 2026:** Chase restructures the deal with new terms: $3K/mo base (modular), performance-only rev share on new business, $100/project AI scoping tool with 50/50 split. Preparing to re-approach.

---

## Why Owen Said No (Inferred — No Explicit Reason Documented)

- **Price shock:** $6K-$15K/month is a board-level decision for a business doing $134K/year through the parent entity (though Scan2Plan itself did $1.12M)
- **Technology-forward pitch:** The original proposal led with "Sovereign Model," Vertex AI architecture, and Outsider Economics philosophy. Owen likely just wanted to know: "Will this get me more scans?"
- **Fear of dependency:** Ongoing licensing fees with no exit path may have felt like vendor lock-in
- **Founder ego vs. owner economics:** The proposal spoke Chase's language (tech architecture, philosophy), not Owen's language (P&L, margin, headcount)

---

## The New Deal Structure (March 30, 2026)

### Module 1: Core Ops Node — $2,000/mo
What it replaces: a part-time office manager or bookkeeper.
- Real-time QBO financial dashboard
- End-to-end project tracking
- Capacity forecasting
- Multi-entity view (Scan2Plan + Twinner on one screen)
- All cloud infrastructure managed

### Module 2: Growth Engine — $1,000/mo
What it replaces: a marketing agency or lead-gen service.
- Automated outreach sequences
- Case study generation from project data
- Attribution tracking (performance fees only on tracked leads)
- Google Business Profile sync + local SEO

### Module 3: Efficiency Dividend — $0/mo, $100/project
What it replaces: $500 manual site visits.
- AI video scoping (client walks space with phone, AI extracts scope)
- $100 "Tech Fee" on customer invoice
- 50/50 split: Owen $50, HDI $50
- No cap on volume
- Customer saves ~$400 vs. manual scoping

### Performance Share
- 0% on existing customers
- 5% on new customers brought in by Growth Engine
- 5% on provable margin recovery
- Quarterly calculation, disputes default to zero

### Ramp
- Month 1: $0 (integration)
- Month 2: $1,500 (half rate)
- Months 3-12: $3,000/mo
- Year 1 guaranteed base: $31,500

### Exit
- 30-day notice after 12 months
- Owen keeps data, Chase keeps code
- No penalty

---

## The S2PX Platform (What Actually Exists)

This is not vaporware. This is a fully built, production-tested platform:

| Component | Description | Status |
|---|---|---|
| Sales Pipeline | Kanban lead management | Built |
| 135-Field Scoping Form | Structured intake with geocoding, multi-building | Built |
| CPQ Calculator | Multi-building pricing engine (15 tables, 261 tests) | Built, battle-tested |
| Proposal Builder | PDF generation with templates | Built |
| Signature Flow | E-sign + email notification | Built |
| Production Pipeline | Scan-through-delivery tracking | Built |
| Scan Tech Portal | Field tech mobile interface with photo AI | Built |
| QuickBooks Integration | Real-time estimate/invoice sync | Built |
| Google Drive Integration | 4-bucket GCS architecture | Built |
| 7 AI Agents | Pricing, Operator, Photo Analysis, Checklist, Audio-to-Scoping, KB Chat, Strategy Advisor | Built |
| Knowledge Base | Internal wiki with AI Q&A | Built |
| CEO Scorecard | Performance metrics and financial dashboards | Built |
| AI Video Scoping | Phone walkthrough → AI spatial analysis → auto-quote | Built (Vertex AI Gemini) |

Technical stack: Express/Cloud Run, PostgreSQL/Cloud SQL (90+ tables, 6 schemas, 18 migrations), Firebase Auth, 4-bucket GCS, Gemini 1.5 Pro for all AI agents.

---

## Owen's Business Economics

| Metric | Value |
|---|---|
| 2025 Revenue | $1,115,449 |
| Projects | 1,888 |
| Estimates processed | 858 |
| Average quote | ~$593 (skewed by many small jobs) |
| Outside services | $242,976 |
| Contractor costs | $114,774 |
| Combined labor bleed | $357,750 |
| Net income | $261,000 |
| Officer salary | $130,350 |
| Margin | 82% (UppTeam level) |
| Top clients | AYON Studio, Crisp Architects, McBride Architects, Studio DB, Svigals+Partners |

The $357,750 in outside services + contractors is the automation target. Even a 35% reduction = $125K in recovered margin, which more than covers the $31.5K Year 1 license.

---

## The 3D Scanning Industry

- Global market: $5-6B (2025), growing 8-13% CAGR
- BIM software market: projected $28.2B by 2035
- Fragmented — dominated by small regional operators
- Typical project pricing: $2,500 (small) to $200K+ (large facility)
- Per-sqft: $0.50-$3.00 basic, $3.00-$10.00 detailed MEP
- No purpose-built CPQ exists for this industry — S2PX is unique
- Traditional scoping requires site visits ($200-500 each), senior estimator time, manual quote assembly

---

## Negotiation Psychology

**What to avoid:**
- Technology-forward language (Vertex AI, Sovereign Model, nodes)
- Outsider Economics framing (extraction, local multiplier)
- Anything that sounds like the first proposal repackaged
- Apologizing — Chase isn't sorry, the first proposal just didn't land

**What to emphasize:**
- Owner economics (P&L, margin recovery, headcount)
- Modular pricing (pay for what you use, each module replaces a person)
- Zero risk on existing business (0% on current customers)
- The Efficiency Dividend (customer pays for the tool, not Owen)
- Easy exit (30-day notice, no penalty)
- Chase is busy with other things — this is an offer, not a negotiation

**The tone:**
"We'd like this to work. Here's an easy deal. We've got a lot going on, so take it or don't — but the offer is good and the window is open."

Not desperate. Not aggressive. Confident and busy.

---

## Chase's Position

- Owns 100% of the source code
- Holds 20% equity in Twinner
- Has revoked all GitHub collaborator access
- Created a handoff package for Elijah (infrastructure access only, not code)
- Has multiple other revenue streams (Big Muddy ecosystem, MBT SaaS, consulting)
- Does not need this deal, but would like a paying customer to prove the platform model
- Minimum acceptable: $3,000/mo base + per-project licensing revenue
- Ideal outcome: $3K/mo + growing rev share + Efficiency Dividend at scale

---

## Open Questions for the Negotiation

1. Does the re-approach go to Owen directly, or through Elijah?
2. Is the Twinner equity (Chase's 20%) a factor in the deal terms?
3. Should Module 3 (Efficiency Dividend) be priced differently for Twinner projects vs. Scan2Plan projects? (Twinner projects are higher-value)
4. What's Owen's emotional state after declining? Is there relationship damage or just a business disagreement?
5. Is there a timeline pressure? (e.g., Owen's current tools breaking down, a competitor emerging)
