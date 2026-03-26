# HILLBILLY DREAMS INC. — CANONICAL ARCHITECTURE MAP
> **Swarm reference document. This is the definitive version.**
> Read before building. Do not contradict without a ledger entry.
> Last updated: 2026-03-23 — owner-verified canonical map.

---

## 1. THE CORE ENGINE & PHILOSOPHY

Hillbilly Dreams Inc. is the holding company and the central nervous system. It is not a collection of disparate software products, but a **single, multi-tenant AI engine** capable of "printing software for any business."

- **The Philosophy:** Outsider Economics — Build local, extract nothing, grow from within.
- **The Geography:** Anchored in the Deep South (The Mississippi Corridor: Memphis → Clarksdale → Natchez → New Orleans), with cultural nodes in Bearsville, NY, and El Dorado, AR — **The "Golden Triangle of Soul"**.

---

## 2. THE MICROMEDIA FUNNEL (Top of Funnel & Acquisition)

Every micromedia brand has both an audience function and a direct commercial function. They are the **zero-CAC acquisition engines** that feed the platform.

| Brand | Vertical | Commercial Function |
|---|---|---|
| **Outsider Economics** | Business / Economic Philosophy | B2B thought leadership. Feeds the Deep South Directory and platform adoption. |
| **Big Muddy Magazine** | Regional Culture & Editorial | Feeds Inn bookings, Touring, and Directory clients. |
| **Big Muddy Radio** | Music & Conversation | Feeds Touring, Records, and the Inn. |
| **Big Muddy Touring** | Live Music & Venues | Feeds Records, the Inn, and regional discovery. |
| **Big Muddy Records** | Artist Development | Feeds Touring, Radio, and Buy Curious Art (BCA). |

---

## 3. THE PLUGGABLE MODULES

These are the decoupled components of the Hillbilly Dreams engine. They can be snapped together and deployed across multiple clients and contexts without custom engineering.

- **Deep South Directory:** The regional B2B acquisition funnel. The entry point for businesses (Free → $99/mo → $299/mo → up to $1,200+/mo Ops deployments).
- **Buy Curious Art (BCA):** The multi-tenant art storefront. Deployable at physical venues (like the Inn), inside digital publications, or as standalone artist pages.
- **Media Module:** The content distribution engine powering Magazine, Radio, Touring, and Records. Licensable to outside brands.
- **KioskMode Pro:** AI-powered self-service kiosk. Replaces static visitor center rack cards with voice-activated local intelligence.
- **Ops Platform (Delta Dawn):** The internal AI operations brain. Knows the full state of the ecosystem, manages client workflows, and identifies upgrade pathways.

---

## 4. FULL ENGINE DEPLOYMENTS & CLIENTS

This is how the engine and its modules manifest in the real world to generate revenue.

### S2PX (B2B SaaS Deployment)
- **Function:** AEC / Spatial Computing. For businesses with high data volume and complex deliverables.
- **Anchor Client:** Scan2Plan / UppTeam (Owen Bush). $134,000/year, 82% margin.

### BMT Platform (Owned & Operated)
- **Function:** The internal Big Muddy hospitality and full media stack.
- **Anchor Client (The Showroom):** The Big Muddy Inn & Blues Room. This serves as the live, physical QA environment and enterprise sales demo for the entire tech stack.

### Custom Builds (Client Deployments)
- **Function:** The engine deployed and styled to order for outside organizations.
- **Anchor Client:** Natchez Tourism / Visit Natchez (Forks of the Road, KioskMode civic routes).

---

## 5. NAMING DEBT (FROZEN — Post-Demo)

Do not execute until after Monday's demos.

| File | Current | Correct | Reason |
|---|---|---|---|
| `packages/config/brands.ts` | `gallery` | `bca` | Buy Curious Art is not a gallery — it's a multi-tenant art storefront module |
| `packages/config/tokens.css` | `.theme-gallery` | `.theme-bca` | Follows brands.ts rename |

---

## 6. AGENT CONSTRAINTS

- **Code freeze in effect** — no changes to `brands.ts`, `tokens.css`, or executing code until post-demo
- **Domain isolation** — S2PX data never touches BMT routes or DB; BMT data never touches S2PX
- **Multi-tenant by default** — every new module must be deployable across multiple client contexts without hardcoding
- **Delta Dawn** — always inject CURRENT_USER context + Asana tasks + DB context. Never ask the user who they are.
- **No outside devs on core** — product engineering stays with the AI syndicate (CC, AG, GA)
