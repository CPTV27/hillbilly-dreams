# Measurably Better Things — The Story

*A backstage holding company that lets distinctive consumer brands stay distinctive while sharing the infrastructure that makes them work. April 2026.*

> **Quiet holding company. Loud consumer brands. One shared spine.**

MBT is what Automattic is to WordPress: anchored on the Mississippi corridor with a Hudson Valley node, three equal partners, eight brands, thirteen modules, built on a stack that already exists.

---

## 01 · Three layers, top to bottom

### Tier 1 — What customers see
Each brand keeps its own voice, domain, and customer relationship. None of them mention MBT.

- Big Muddy Inn
- Big Muddy Touring
- Big Muddy Records
- Big Muddy Radio
- Big Muddy Magazine
- Chase Pierson Photography
- Tuthill Design
- Studio C

### Tier 2 — Production B2B (north and south)
**Tuthill Design · Studio C** — the two production-side brands that sell media services to outside clients *and* serve the in-family brands. Operating in two corridors now: Hudson Valley up north, Mississippi corridor in the south.

### Tier 3 — The platform
**MBT — Measurably Better Things LLC.** The infrastructure underneath. Owns the canonical entity store, the directory module, the Sanity-based CMS, the photo archive — all the shared technology that lets each brand operate without rebuilding the same wheel.

> Public-facing only when selling to broker-tier clients (real estate firms, civic partners). Otherwise invisible.

---

## 02 · The brands, in plain language

### Consumer brands

**Big Muddy Inn.** A boutique inn in Natchez with a working blues stage and a kitchen that takes dinner seriously. *Sells: room nights, Blues Room tickets, private events.*

**Big Muddy Touring.** Bringing artists to the Mississippi corridor — booking, route planning, on-the-ground promotion. *Sells: tour dates, gigs to venues, sponsorships.*

**Big Muddy Records.** Three concentric purposes: (1) house the **Amy Allen** catalog and the **Mechanical Bull** catalog, (2) offer a **non-exclusive promotion partnership** to outside artists who aren't on a label and would benefit from MBT's media structure (no equity grab — we just help them reach audiences), and (3) for artists we approve onto the label proper, add a **low monthly fee** for marketing and label-type services. Recurring revenue, not just unit sales. *Sells: catalog units (vinyl, digital, streaming, merch) + recurring monthly label services.*

**Big Muddy Radio.** For now: podcasts and curated playlists distributed across the platforms people actually listen on (Spotify, Apple Podcasts, YouTube Music, etc.). Built around the artists we book and document. May grow into linear streaming radio later. *Sells: sponsorships on shows + future linear-radio inventory.*

**Big Muddy Magazine.** Editorial vehicle covering music, hospitality, and the people on the corridor. Feeds traffic to every other Big Muddy property. *Cross-marketing engine that drives Inn bookings — not a subscription product.*

**Chase Pierson Photography.** Chase's editorial and documentary photography practice. Premium rate, distinct from Tuthill's advertised rates. *Sells: editorial commissions, documentary projects, prints, portraits.*

### Production B2B brands

**Tuthill Design.** Real estate media and design — photo, video, 3D tours, floor plans, LiDAR + AI renderings. Hudson Valley counties + Natchez branch opening. *Sells: per-property packages, recurring social management for realtors.*

**Studio C.** Multicam event production, live streaming, post production. Bearsville-anchored + Natchez branch opening. *Sells: per-event packages, venue retainer relationships, premium cinema tier.*

---

## 03 · Who owns what

Three operating LLCs (two new, one existing). Three equal partners. Two production-side affiliates Chase partly owns personally. One legacy entity winding down.

### The parent

**MBT — Measurably Better Things LLC** — Mississippi · TO FILE · lawyer engaged. Three equal partners: Chase, Tracy, Amy (one third each). Holds the platform IP. Receives Chase's pass-through distributions from Tuthill and Studio C (currently routed through FarleyPierson — switching to MBT post-restructure).

### The subsidiaries

**Big Muddy Natchez LLC** — Mississippi · ALREADY EXISTS. Holds the Inn and the Magazine. Becomes a wholly-owned subsidiary of MBT once MBT files (assignment, not a new filing).

**Big Muddy Touring LLC** — TBD state · TO FILE alongside MBT. Holds touring, radio, the record label, the band, and all mobile performance work. Separate entity required for vehicle and road insurance.

### The affiliates (Chase partly owns; MBT only receives distributions)

**Tuthill Design** — NY · existing · Chase 50% / Elijah Tuthill 50%. Real estate photo, video, 3D, design (LiDAR + AI). Hudson Valley counties and a new Natchez branch. Holds the retainer with MBT that funds Elijah's cross-entity work.

**Studio C** — NY + new Natchez branch · Chase 40% / 60% TBD. Concert and event production. Holds the production insurance umbrella that covers in-family camera work.

### Legacy

**FarleyPierson LLC** — SHUTTING DOWN, lawyer-handled. Wind-down begins after MBT files.

---

## 04 · How it works under the hood

One Next.js codebase across most brands. One Sanity CMS. One Hetzner-hosted photo archive. One canonical entity database. Spinning up a new client should be one command.

### The 13 modules

| # | Module | Status |
|---|---|---|
| 01 | Canonical Entity Store | partial |
| 02 | CMS · Sanity | live |
| 03 | Directory Module | live |
| 04 | Media Gallery · Immich | live |
| 05 | Booking Module | partial |
| 06 | Commerce Module | partial |
| 07 | Broadcast Module | partial |
| 08 | Social Media Module | partial |
| 09 | Tour & Calendar | partial |
| 10 | Finance & Billing | partial |
| 11 | Affiliate & Referral | partial |
| 12 | Coordination Layer | partial |
| 13 | Prompt-driven Content Creation | building |

> **The core insight:** the bones already exist. Multi-tenant routing works. Sanity, Stripe, Cloudbeds, Icecast, social publisher, draft generation — all wired in some form. The next phase is to formalize module boundaries, build a one-command tenant provisioning pipeline, and add the prompt-driven content creation module that makes the platform feel different from generic SaaS.

---

## 05 · How money flows

Three economic patterns for MBT, depending on what the platform is doing.

### Tier 1 — Internal tooling
**No revenue share.** When a Big Muddy brand uses MBT infrastructure for its own operations, value consolidates back up through subsidiary ownership. No internal billing.

### Tier 2 — One-off vendor work
**No revenue share.** When Tuthill shoots a single property or Studio C streams a single event, the vendor keeps the revenue. MBT infrastructure is covered by the standing retainer.

### Tier 3 — Recurring module engagement
**15–30% to MBT.** When a vendor sells a recurring service powered by MBT modules — a realtor's directory and social management, a sponsor's ongoing radio package, a broker licensing the Deep South Directory — MBT is the value driver and takes a percentage of the recurring revenue.

---

## 06 · The people

### Partners

**Chase Pierson** — CEO · Photography · Video · Code · Strategy. Owns the broad architecture, Big Muddy Touring booking relationships, and the premium photography brand.

**Tracy Alderson-Allen** — Innkeeper · MBT Executive · Magazine Editor. Runs the Inn (with housekeeper and hospitality coordinator support). Steps up to MBT-level executive work: portfolio oversight, back office across ventures, marketing across ventures. Edits the Magazine.

**Amy Allen** — Big Muddy Radio · Records · Performing Artist. Day-to-day operator for the music side. Programs the radio, runs the record label, performs in the band.

### Specialists and operators

**Elijah** — Photo archive operator. Onboarding on hold pending Chase review of the package.

**Patch** — Technical Director. Always-on infrastructure, builds, deploys.

**JP Houston** — Wrapping current scope (First Arctic mixes + NOLA introductions). End of engagement after that.

**Cos** — Chief of Staff agent. Runs the project queue, commits code, fans context across the system.

---

## 07 · What is live, what is queued

### Live now

- Hetzner photo infrastructure (Immich) with **52,892 photos already ingested**, face recognition + semantic search active
- Multi-tenant Next.js platform across 14 domains
- Sanity CMS wired and serving content
- Internal directory with 459 corridor records (venues, musicians, festivals, more)
- Big Muddy Inn website on Squarespace + Cloudbeds (stays there — not migrating)
- Stripe integration for subscriptions
- Cloudbeds integration for Inn room bookings
- Big Muddy Radio streaming via Icecast

### Active this week

- **Vicki Wolpert** onboarding (KW realtor in Athens NY, regular customer of Tuthill Design and Chase Pierson Photography) — first external multi-tenant client. Date is movable; getting the launch clean matters more than May 1.
- Upstate Directory research seed (Vicki's List) for Hudson Valley businesses
- Camera kit Wave 1 ($8,750) — Sony a7 V, 70-200 GM II, wireless TX
- Studio C Wave 1 video kit ordered for both north and south corridors
- Lawyer engaged for MBT LLC and Big Muddy Touring LLC formation

### Coming next

- Monday April 20 partner session — wireframe consumer-facing front-end per brand
- Module API formalization across the existing codebase
- Tenant provisioning pipeline — single command to onboard a new client
- Prompt-driven content creation module (the wizard that pulls entities + media + templates)
- Recording Studios summer project at Bearsville (Utopia, Clubhouse, David Baron studios) — magazine + coffee-table book
- Paul Green Realty and City of Natchez partnership conversations before Chase leaves for summer

---

## 08 · Outsider Economics — the open-source layer

Inside MBT but separate from the commercial work, Chase maintains an open-source project called Outsider Economics. Tools and writing for people who want to reimagine the economy on their own terms. A spare-time effort, deliberately not commercial, but useful infrastructure that the rest of the platform can pull from.

---

## 09 · Where this goes

The next 30 days lock the front-end story per brand and start formalizing the module boundaries that turn the existing infrastructure into a real product. Vicki's onboarding becomes the proof point for the next ten realtors. Chase's summer at Bearsville produces the Recording Studios book and a content stream that runs across every channel. The Paul Green Realty conversation, if it lands, opens the broker-tier playbook.

**Quiet holding company. Loud consumer brands. One shared spine.**

---

## More detail

- **Living context for any AI agent:** [`docs/CURRENT_CONTEXT.md`](./CURRENT_CONTEXT.md)
- **Entity hierarchy + ownership:** [`docs/ENTITY_STRUCTURE.md`](./ENTITY_STRUCTURE.md)
- **Per-brand front-end worksheets** (for Monday April 20 session): [`docs/brand-offerings/`](./brand-offerings/)
- **Product-to-platform mapping:** [`docs/PRODUCT_TO_PLATFORM_MAPPING.md`](./PRODUCT_TO_PLATFORM_MAPPING.md)
- **Active project queue (51+):** [`docs/router/QUEUE.md`](./router/QUEUE.md)

*Visual version of this same story available at any-domain.com/story (once Vercel deploy clears the Sanity env var fix).*
