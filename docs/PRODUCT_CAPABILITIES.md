# Measurably Better — Product Capability Document
## Last Updated: March 26, 2026

---

## WHAT IT IS

Measurably Better is a regional technology platform that powers business operations across any vertical. It's not scanning software. It's not hospitality software. It's not civic software. It's the engine underneath all of them.

Think of it like Shopify — Shopify doesn't sell shoes. It powers the store that sells shoes. Measurably Better doesn't run a hotel. It powers the system that runs the hotel, the magazine, the radio station, and the city hall — all on one engine.

---

## CORE PLATFORM CAPABILITIES

### 1. AI Business Intelligence
- Connects to your real financial data (QuickBooks Online, Stripe, Google Workspace)
- AI chat against YOUR numbers — not generic advice, actual P&L analysis
- Anomaly detection: flags when costs spike, margins shrink, or patterns change
- Powered by Google Gemini Pro on Vertex AI

### 2. Multi-Tenant Architecture
- One codebase serves unlimited brands, businesses, and deployments
- Each tenant gets their own interface, their own data vault, their own domain
- Hostname-based routing: bigmuddytouring.com and measurablybetterthings.com run on the same engine
- Add a new business in minutes, not months

### 3. Content Engine
- CMS for articles, events, playlists, newsletters, publications
- AI-assisted content generation from business data
- Automated case studies, social posts, city guides
- Contributing writer program with three-tier compensation (community / paid / rev-share)

### 4. Payment Rails
- Stripe Connect for split payments and direct payouts
- Artist/vendor/contributor payouts calculated from attribution data
- Permit fees, ticket sales, subscriptions, donations — one payment layer
- Rev-share math is transparent and auditable

### 5. Identity & Access
- Role-based access control (admin, ops, artist, viewer, citizen)
- Google OAuth + credentials auth
- Per-tenant user isolation
- Password-gated experiences for demos and internal tools

### 6. Physical Front End (KioskMode)
- Locked-down tablet/kiosk interface for lobbies, venues, schools, tourism offices
- Connects to the same platform APIs
- Ticket sales, check-in, wayfinding, bill pay
- 82% gross margins (proven)

### 7. Analytics & Monitoring
- Real-time dashboard with live financial telemetry
- Content performance tracking with attribution
- Uptime monitoring and alerting
- Google Analytics 4 integration

---

## PRODUCT LINES (Deployments of the Platform)

Each product line is the same engine configured for a specific vertical:

### Micromedia in a Bottle
- **What:** Hotel + magazine + radio + touring + records on one engine
- **Case study:** Big Muddy (Natchez, MS)
- **Licensable** to other regional operators
- "Everything a media company needs, packaged for a single property"

### Deep South Directory
- **What:** Regional business network powered by MB
- **For:** Main Street businesses, tourism, local commerce
- Every business gets a node. AI-powered search. Stripe payments.
- CVBs and chambers of commerce are the buyers
- Content layer: city guides, business spotlights, local stories

### CivicX
- **What:** Municipal front door — website, 311/CRM, payments, records search
- **For:** Cities under 50K population
- Price anchor: $9,600-18,000/year (under Tyler's $25K minimum)
- AI-assisted search across ordinances, minutes, policies
- Grant-funded (ARPA, CDBG)

### MB Learn
- **What:** Adaptive AI literacy curriculum for K-12
- **For:** School districts
- Students learn by using AI, not reading about it
- Teachers learn alongside students
- Funded by E-Rate, Title IV-A
- "Mississippi becoming AI literate"

### SPX (Spatial Intelligence)
- **What:** 3D scanning data processing and visualization
- **For:** AEC operators, facilities management
- Polycam integration, spatial data pipeline
- NOT the focus right now — available as a capability, not the lead product

---

## PRICING ARCHITECTURE

| Tier | Price | Target | Hook |
|------|-------|--------|------|
| **Free** | $0 | Anyone curious | One dashboard, 20 AI queries/mo |
| **Starter** | $20/mo | Any small business | "It does all the cool stuff you don't know how to do." |
| **Engine** | $99/mo | SMB operators | Marketing automation, multi-source sync, 3 seats |
| **Operator** | $1,500/mo | $500K+/yr businesses | Full outsourced OS. 10 seats, dedicated AI, forecasting, phone support |
| **Institutional** | Custom | Cities, schools, CVBs | Phased deployment, grant-funded |

---

## TECHNOLOGY STACK

- **Cloud:** Google Cloud Platform (Cloud Run, Vertex AI, Cloud SQL)
- **AI:** Gemini Pro via Vertex AI
- **Framework:** Next.js 14, React, TypeScript
- **Database:** Neon Postgres + Prisma ORM
- **Payments:** Stripe + Stripe Connect
- **Auth:** NextAuth v5
- **Deploy:** Vercel Pro
- **Monitoring:** Checkly, Google Analytics 4

---

## WHAT MAKES IT DIFFERENT

| Dimension | National SaaS | Measurably Better |
|-----------|--------------|-------------------|
| Built where | San Francisco, Plano TX | Natchez, Mississippi |
| Pricing | Opaque, quote-only | Transparent, starts at $20/mo |
| Implementation | 6-18 months | 30-90 days |
| AI | Add-on, generic | First-class, reads your actual data |
| Segments | One product, one market | One engine, every vertical |
| Sales | Cold outbound, $50K CAC | Trust networks, phone calls |
| Content $ | Leaves the region | 80% stays local |
| Data | Their cloud, their rules | Your vault, your export |

---

## THE PROOF

It's not a pitch deck. It's running.

| Deployment | What | Status |
|-----------|------|--------|
| Big Muddy Inn | Hotel on MB engine | Live |
| Big Muddy Magazine | Editorial CMS | Live |
| Big Muddy Radio | Playlists, streaming | Live |
| Big Muddy Touring | 18-city corridor | Live |
| Big Muddy Records | Artist services | Live |
| Rise Up | Touring band + talent search | Live |
| KioskMode | Physical kiosk product | Live, 82% margins |
| Deep South Directory | Regional business network | Building |
| CivicX | Municipal platform | Pilot stage |
| MB Learn | K-12 AI curriculum | Designed |
