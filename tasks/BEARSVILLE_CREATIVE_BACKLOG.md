# Bearsville Creative — Task Backlog

Status: Tracked | Owner: Chase (Executive Assignment) | Created: 2026-04-04

---

## Data Foundation (COMPLETE)

- [x] Group created: BEARSVILLE_CREATIVE_CORRIDOR
- [x] Brands seeded: bearsville-creative, utopia-studio, studio-c-video, tuthill-design
- [x] Style Guide: Bearsville Creative Voice
- [x] Realtor bundles: Free ($0) + Sovereign ($500/mo)
- [x] Realtor bundle features mapped (listing, photo, analytics, video, magazine)
- [x] Editorial Job: Studio Almanac campaign (DRAFT)
- [x] Tenant config updated: name, accent color (#c8943e), features list
- [ ] Display Channel: bearsville-lobby (seed failed on missing `name` field — fix seed script)

---

## BC-01: Rename — Bearsville Media Group → Bearsville Creative

**Scope:** Find/replace across 24 files. Update CLAUDE.md, domain-routes.ts, tenants.ts (done), bearsville page, sitemap, org-chart, agent files.
**Assign to:** Patch v3 or any code agent
**Priority:** P1
**Estimate:** 1 session

---

## BC-02: Utopia Studio Mode (/admin/studio-mode)

**Scope:** Session Concierge UI for 27" iMacs. Glassmorphism. Zero distraction.
**Features:**
- Track list + lyrics from LoreEntry
- "Order Food" button (pulls from DSD restaurant lore)
- "Request Video Tech" button (notifies Studio C)
- Session credit balance from CreditLedger
**Dependencies:** Socket.IO hub running, LoreEntry data populated
**Assign to:** Frontend agent
**Priority:** P2
**Estimate:** 2-3 sessions

---

## BC-03: Tuthill Realtor Pulse

**Scope:** Street-level directory for realtors. Two tiers: Free pin vs $500/mo Sovereign.
**Features:**
- Free: map pin + basic listing
- Sovereign: AI narrative property listings, video tours (Studio C), photography, signage priority
- "Narrative Listing" tool: realtor uploads photo + MLS data → AI generates story with local historical context
**Dependencies:** Vertex AI for narrative generation, MLS data source TBD
**Assign to:** Product agent + frontend agent
**Priority:** P2
**Estimate:** 3-4 sessions

---

## BC-04: Creative Guild Portal (/admin/contribute)

**Scope:** Upload-and-earn interface for external contributors (photographers, writers, historians).
**Features:**
- Expand Entity types: Recording, Fine Art, Film/Video, Makerspace, Design Lab
- "Guild Card" profiles with portfolio, gear, lore score
- CreditLedger integration: earn credits for vetted contributions
- Invite-only first 90 days to maintain quality
**Dependencies:** CreditLedger earn logic, vetting pipeline
**Assign to:** Product agent
**Priority:** P3
**Estimate:** 3-4 sessions

---

## BC-05: Studio Almanac — Monthly Print Run

**Scope:** Limited-edition physical book. 20 copies/month at $20 each.
**Features:**
- Artifact Drop manager (/admin/drops): inventory counter, revenue ledger
- QR codes on pages linking to live LoreEntry on Glass Kiosk
- Top 20 stories selected by editorial (human pick, not algorithmic)
- Print-on-demand partner integration TBD (local Bearsville preferred)
**Dependencies:** Photography ingestion (Utopia, Arden), summer tour content
**Assign to:** Production agent
**Priority:** P3
**Estimate:** 4-5 sessions

---

## BC-06: Studio Book — Photography Ingestion

**Scope:** Ingest Chase's high-fidelity studio photography as VisualAsset records.
**Studios photographed:** Utopia Studio, Arden Studio
**Summer 2026 plan:** Photograph additional studios for expanded archive
**Features:**
- Upload to VisualAsset with namespace: visual_vault
- AI context analysis (Gemini) generates draft editorial copy per photo
- Red Pen review through Editorial Bureau
**Dependencies:** GCS upload path, existing photography files
**Assign to:** Mac Mini agent (photo processing) + Editorial Bureau
**Priority:** P2
**Estimate:** 2 sessions

---

## BC-07: Onboarding Packages

**Scope:** Create onboarding materials for each Bearsville entity.
**Packages needed:**
- **Utopia Studio:** How to use Studio Mode, booking flow, billing setup
- **Studio C Video:** Service catalog, pricing, integration with Utopia booking
- **Tuthill Design:** Realtor product demo, tier comparison, onboarding walkthrough
**Assign to:** Marketing agent
**Priority:** P2
**Estimate:** 2 sessions

---

## BC-08: Smart TV Signage (DisplayChannel)

**Scope:** Configure Bearsville lobby display with ambient content loop.
**Features:**
- YouTube background (ambient Bearsville/studio footage)
- Ticker: studio availability, almanac submissions, guild announcements
- Ad rotation from AdCampaign table
**Dependencies:** Physical display hardware, Docker on Mac Mini (for Plex)
**Assign to:** Infrastructure agent
**Priority:** P3
**Estimate:** 1-2 sessions

---

## Assignment Matrix

| Task | Agent/Resource | Status | Priority |
|------|---------------|--------|----------|
| BC-01 Rename | Patch v3 | Ready | P1 |
| BC-02 Studio Mode | Frontend | Blocked (Socket.IO) | P2 |
| BC-03 Realtor Pulse | Product + Frontend | Ready (data seeded) | P2 |
| BC-04 Guild Portal | Product | Ready | P3 |
| BC-05 Almanac Drop | Production | Blocked (content) | P3 |
| BC-06 Photo Ingestion | Mac Mini + Bureau | Ready | P2 |
| BC-07 Onboarding | Marketing | Ready | P2 |
| BC-08 Signage | Infrastructure | Blocked (Docker) | P3 |
| BC-09 Brand Packages | Design / Canva API | Ready | P1 |
| BC-10 Marketplace Curation | Commerce / Etsy Layer | Ready | P1 |

---

## BC-09: Brand Packages & Canva Integration

**Scope:** Connect Canva to abstract the core aesthetic DNA (Gold accent #c8943e) across the 'Bearsville Creative' namespace.
**Features:**
- Create 'VisualAsset' records from Canva templates.
- Define constraints for 'Industrial Premium' / 'High-Fidelity' identity.
- Provide baseline mockups for Studio Almanacs and Displays.
**Assign to:** Design / Marketing agent
**Priority:** P1
**Estimate:** 2-3 sessions

---

## BC-10: Marketplace Curation (Hybrid Etsy/GMB)

**Scope:** Seed and activate the `BusinessProfile` (GMB) and `MarketplaceStore` / `Vendor` (Etsy) topology for multi-tenant e-commerce.
**Features:**
- Seed data utilizing 'Sovereign Integrity'—must maintain local ownership vs Amazon/GMB.
- Implement 'ApprovedSupply' structures for curated carts.
- Affiliate tracking (`AffiliateProgram`) commission pipelines setup.
**Assign to:** Product / Database agent
**Priority:** P1
**Estimate:** 3-4 sessions

---

## Decisions Needed (Chase)

1. **Domain:** Keep bearsvillemediagroup.com or acquire bearsvillecreative.com?
2. **Print partner:** Local Bearsville printer or in-house at Studio C?
3. **Guild launch:** Open or invite-only first 90 days?
4. **Realtor pilot:** Which realtors to approach first in Hudson Valley?
5. **Studio tour:** Which studios are on the summer 2026 photography list beyond Utopia/Arden?
