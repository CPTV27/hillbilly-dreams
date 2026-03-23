# Hillbilly Dreams Inc — Canonical Architecture
> **Swarm reference document.** Read before building. Do not contradict this structure without a ledger entry.
> Last updated: 2026-03-22 by CC (Claude Code)

---

## The Engine

Hillbilly Dreams Inc is a holding company managing a portfolio of LLCs, all powered by one AI engine. The engine's output is software — custom-printed for any business or industry. The architecture is **multi-tenant**: every module can be deployed across multiple clients and contexts without rebuilding from scratch.

**Positioning:** One engine, every industry.

**Philosophy:** Outsider Economics — build local, extract nothing, grow from within.

**Geography:** Anchored in the Deep South. Primary corridor: Memphis → Clarksdale → Natchez → New Orleans. Nodes in Bearsville NY and El Dorado AR. Collectively: the **Golden Triangle of Soul**.

---

## Canonical Structure

### Tier 1 — Holding Company
**Hillbilly Dreams Inc**
- Owns all IP, manages all LLCs
- The engine lives here
- Zero outside developers on core — all AI-driven (CC + AG + GA)

---

### Tier 2 — Modules
Reusable, pluggable, multi-tenant. Each module can be deployed to any client context without modification.

| Module | What It Does | Commercial Function |
|---|---|---|
| **Media Module** | Magazine, radio, touring, records content engine | Powers Big Muddy's owned media + licensable to clients |
| **Buy Curious Art (BCA)** | Multi-tenant art storefront | Deployable at venues, publications, artist pages |
| **Deep South Directory** | Regional business acquisition funnel | Free → $99 → $299 → $599 → $1,200+/mo. Entry point for the entire ecosystem |
| **KioskMode Pro** | AI-powered self-service kiosk | Replaces static rack cards with voice-activated local intel |
| **Ops Platform / Delta Dawn** | AI operations brain | Powers internal ops for all clients; knows full ecosystem state |

---

### Tier 3 — Full Engine Deployments
The engine printed for a specific industry vertical.

| Deployment | Industry | Status | Key Relationship |
|---|---|---|---|
| **S2PX** | AEC / spatial computing / any high-data-volume, large-digital-deliverable, multi-vector-analysis business | Live | Owen Bush / Scan2Plan / UppTeam — $134K/year, 82% margin |
| **BMT Platform** | Hospitality + micromedia operations | Live | Big Muddy Inn & Blues Room (anchor client) |
| **Custom Builds** | Any industry — deployed to order | In development | Natchez Tourism (pipeline) |

---

### Tier 4 — Micromedia Brands
Owned media properties. Each runs an instance of the Media Module. Each has both an audience function and a commercial function.

| Brand | Vertical | Commercial Function |
|---|---|---|
| **Outsider Economics** | Business / economic philosophy | Thought leadership for the ecosystem; feeds Directory + platform adoption; speaks directly to the business owner audience |
| **Big Muddy Magazine** | Regional culture + editorial, Mississippi corridor | Feeds Inn bookings, Directory clients, touring discovery |
| **Big Muddy Radio** | Music + conversation, live sessions | Feeds touring, records, Inn |
| **Big Muddy Touring** | Artist touring + venue network | Feeds records, Inn, regional discovery |
| **Big Muddy Records** | Artist development + label | Feeds touring, radio, BCA |

---

### Tier 5 — Clients
Businesses wrapped in the engine + micromedia envelope.

| Client | Status | Deployment |
|---|---|---|
| **Big Muddy Inn & Blues Room** | Live — anchor client | Full BMT platform + media module. 6-room boutique hotel + 50-seat Blues Room, 411 N Commerce St, Natchez MS |
| **Natchez Tourism / Visit Natchez** | Pipeline — prospective | Custom software build + micromedia envelope. Flywheel: Big Muddy amplifies Natchez, Natchez amplifies Big Muddy |

---

## Revenue Model

Three modes off the same engine:

1. **Internal brand revenue** — Inn bookings, magazine, touring, records, BCA art sales
2. **Licensed products** — S2PX ($134K/year confirmed), KioskMode Pro (pipeline), Directory tiers
3. **Custom builds** — engine deployed to order for outside clients

### The Funnel
```
Deep South Directory (free)
  → Media Module tiers ($99 → $299 → $599 → $1,200+/mo)
    → Custom engine build (enterprise)
```

### Known Financial Anchors
- S2PX: $134,000/year, 82% margin, ~$9,141/mo net
- Inn: 6 rooms, 65% occupancy target, $140K revenue target YTD
- Inn rates: $125 base / $139 Pilgrimage weeknights / $169 Pilgrimage weekends / $275 Balloon Festival
- Directory tiers: Front Porch $99 / Route $299 / River Room $599 / Blues Room $1,200+/mo
- Full ecosystem annual target: $760K (Lean & Mean baseline)
- Valuation estimate: $2–2.5M blended (IP floor $2M + cash flow $600K at 4x SDE)

---

## Flywheel Mechanics

**Big Muddy as live demo:**
The Inn is both a client and the most visible proof-of-concept of the full stack. Every prospective client who walks through the Blues Room sees the engine running in production.

**Micromedia amplification loop:**
Outsider Economics attracts businesses that want to build differently → Deep South Directory gives them the entry point → the engine gives them the tools → their growth generates content for the media brands → the media brands attract more businesses.

**Client × media flywheel:**
Big Muddy's media amplifies client reach. Client reach amplifies Big Muddy's audience. The Natchez Tourism engagement is designed to run this loop at a regional scale — two flywheels meshing.

---

## Naming Debt (Do Not Execute — Post-Demo)

| Location | Current Name | Correct Name | Reason |
|---|---|---|---|
| `packages/config/brands.ts` | `gallery` | `bca` | Buy Curious Art is not a "gallery" — it's a multi-tenant art storefront module |
| `packages/config/tokens.css` | `.theme-gallery` | `.theme-bca` | Follows brands.ts rename |
| Any component referencing `theme-gallery` | `theme-gallery` | `theme-bca` | Cascade from above |

**Status:** FROZEN — execute post-demo. See ledger entry 2026-03-22 CC.

---

## Agent Constraints

- **Code freeze in effect** — no changes to `brands.ts`, `tokens.css`, or executing code until post-demo
- **Domain isolation** — S2PX data never touches BMT routes or DB; BMT data never touches S2PX
- **Multi-tenant by default** — every new module must be deployable to multiple client contexts without hardcoding
- **Delta Dawn** — always inject CURRENT_USER context + Asana tasks + DB context. Never ask the user who they are.
- **No outside devs on core** — product engineering stays with the AI syndicate (CC, AG, GA)
