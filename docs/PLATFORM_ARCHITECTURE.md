# MBT Platform Architecture — Studio C as Operator

*How the technology stack is organized across every client account Chase serves. Dictated by Chase 2026-04-18 during drive to NOLA. This file is the canonical architecture — any prior MBT doc that conflicts is superseded.*

**Last updated:** 2026-04-18 (by Cos, from Chase dictation)

---

## The three layers

```
┌─────────────────────────────────────────────────────────────┐
│  TENANTS / CLIENTS — what customers see                      │
│  (their own domains, their own brand, their own story)       │
├─────────────────────────────────────────────────────────────┤
│  STUDIO C — the operator                                     │
│  (sets up + runs the tech for every tenant, manages the      │
│  middleware layer that's different per account)              │
├─────────────────────────────────────────────────────────────┤
│  MBT — the platform                                          │
│  (Sanity CMS · Next.js multi-tenant deploy · shared          │
│  infrastructure · marketing/social automation · photo        │
│  archive · directory data)                                   │
└─────────────────────────────────────────────────────────────┘
```

**From the client's perspective, they only care what's on their domain.** Everything below is Studio C's operator responsibility and MBT's platform responsibility.

## CMS choice: Sanity

Sanity is the CMS for every property across every tenant. One schema strategy, many tenants pulling from it. Structured content, shared blocks, per-tenant scoping.

## Rate separation rule

Chase Pierson Photography bookings — even when sourced through Tuthill Design — pay Chase at **his rate**, distinct from Tuthill's advertised rates. Chase maintains his price premium regardless of booking channel.

---

## Client roster

### In-family (we operate on behalf of ourselves)
| Client | Notes |
|---|---|
| **Big Muddy Inn** | Hospitality anchor |
| **Big Muddy Touring** | Entertainment engine |
| **Big Muddy Records** | Label — First Arctic record |
| **Big Muddy Radio** | Broadcasting |
| **Big Muddy Magazine** | Editorial |
| **Big Muddy Entertainment** | Shows / talent programming |
| **Chase Pierson Photography** | Chase's photography brand — distinct rate from Tuthill |
| **Studio C** | Video production services (self-serving + client work) |
| **Tuthill Design** | Partner brand |

### Active external clients
| Client | Type | Notes |
|---|---|---|
| **Utopia** | Recording studio | Already onboarded |
| **Arrie Aslin (BN)** | Artist | Active |
| **Mechanical Bull** | Brand/label adjacent | Active |

### Target clients (immediate pipeline)
| Client | Type | Status | Rate |
|---|---|---|---|
| **Vicki Wolpert** | Upstate NY realtor | **Starts May 1** | $500/mo custom, add-on capable |
| **Clubhouse Studio** | Recording studio | Target — Chase to approach | TBD |
| **David Baron Studio** | Recording studio | Target — Chase to approach (spelling TBD) | TBD |
| **The Woods** | Existing partner elsewhere | Target — different scope than main eng | TBD |
| **Paul Green Realty** | Real estate broker | **Meeting before Chase leaves for summer** | Bigger-level broker account — DSD + Natchez tourism magazine |
| **City of Natchez** | Municipal tourism | Partnership target | Tourism / marketing angle |
| **Other Upstate realtors** | Vicki-tier | Target via introductory rate | $500/mo target · $99/mo intro, then $300+ |

### Internal operator (we serve ourselves)
| Client | Type | Notes |
|---|---|---|
| **Pete** (landlord?) | Service trade | $500/mo trade for rent · year-1 mark coming up in ~6 months · renegotiate |

---

## New products coming out of this direction

### 1. Recording Studios Magazine + Coffee Table Book
- Chase spends summer doing photography of recording studios
- Video pieces from the same shoots
- Content flows to: Utopia/Bearsville channels + local Bearsville campus network
- Publishes as both magazine + coffee table book
- **Target studios for 2026:** Utopia (existing), Clubhouse, David Beren, others TBD
- This is what Chase works on in summer at Bearsville

### 2. Upstate Directory (Vicki-scoped)
- Parallel to Deep South Directory, scoped to Upstate NY
- Region: Athens NY, Catskill, Hudson, Coxsackie
- Content focus: restaurants, attractions, services, contractors, builders, handymen
- Framed as "Vicki's List" — the answers her real-estate clients call her about
- Research team dispatched immediately — same pattern as the corridor directory
- Launches alongside Vicki's May 1 start

### 3. Natchez Tourism Magazine ("I ❤️ NY for Mississippi")
- Distinct from Big Muddy Magazine
- Hospitality/tourism campaign around the city of Natchez
- Structural sponsor slots per industry category:
  - Top real estate broker slot (Paul Green?)
  - Regional bank sponsor slot
  - Regional insurance sponsor slot
  - Hospital / health system slot
  - (One top sponsor per big category)
- Physical circulation + social + DSD platform activation
- Content ecosystem via Big Muddy's multi-brand / multi-studio / multi-channel strategy
- Studio C / Tuthill office in Natchez = production hub
- Photography-driven, sells photography as byproduct

### 4. DSD as a multi-tenant tool
- Already live as the corridor directory
- Upstate Directory = second tenant
- Paul Green Realty version = third tenant (co-branded with City of Natchez)
- Each tenant gets: directory data + activation tools for local businesses + social media leverage

---

## Studio C's operator responsibilities

Studio C runs the middleware per client account. The middleware is **different per client** — but the PLATFORM underneath is shared.

### Clear PRD per client
For each tenant, Studio C maintains a product requirements document:
- **"Here's the level we support now"** (current feature set)
- **"Feature requests → professional services"** (new capabilities = paid add-ons)
- Add-ons built for one client are reusable for others
- Build once, serve many = compounds margin over time

### Client onboarding sequence
1. Define tenant scope + domain + brand
2. Stand up Sanity schema + content structure
3. Deploy to Vercel under tenant prefix in `config/tenants.ts`
4. Configure domain routing in `config/domain-routes.ts`
5. Operator (Studio C) runs marketing + social + content ops on the tenant's behalf
6. Monthly billing from the tenant to Studio C

---

## Infrastructure footprint

| Layer | What | Current state |
|---|---|---|
| CMS | Sanity | Live, being extended tenant-by-tenant |
| App framework | Next.js 14.2 multi-tenant | Live on Vercel — 14 domains share one deploy |
| DNS | Cloudflare | Live — all domains gray cloud |
| Photo backbone | Immich on Hetzner | Live — 52,892 photos ingested |
| Operational data | Internal Directory (Postgres + JSON) | Live — 459 records |
| Production compute | Hetzner CCX23 | Live |
| Possible: second Hetzner for production/dev split | Not yet provisioned | Consider when scale demands |

---

## Monday night (April 20) planning session

Chase + Amy + Tracy work through **the front-end story** of each property, which becomes the requirements document.

**Flow:**
1. Write what the website says — the story to customers
2. Infer the capabilities needed to deliver on those claims
3. That becomes the PRD
4. Elijah + Miles work from the PRD — stabilize and hook up the ~90% done pieces

**What's being planned:**
- Big Muddy Inn site copy
- Big Muddy Touring (artist recruitment angle, tour bus hero)
- Big Muddy Magazine
- Big Muddy Radio
- Big Muddy Records
- Big Muddy Entertainment
- Chase Pierson Photography
- Studio C (services we sell)
- Tuthill Design
- Utopia client view
- Vicki's tenant (new — first external rollout after May 1)

---

## What this means for the router queue

New projects added (see `docs/router/queue.json`):
- `P30-vicki-wolpert-onboarding` — ready · due May 1
- `P31-upstate-directory-research` — ready · dispatch research team
- `P32-paul-green-realty-prep` — ready · meeting before Chase leaves for summer
- `P33-recording-studios-magazine` — blocked (starts summer at Bearsville)
- `P34-natchez-tourism-magazine` — blocked (needs Paul Green + City of Natchez alignment first)
- `P35-monday-planning-session` — scheduled 2026-04-20 · produces PRDs per property
- `P36-studio-c-prd-framework` — ready · one-page-per-client PRD template

---

## Hard rules from this architecture

1. **Sanity is the CMS. Period.** Don't propose alternatives without Chase's sign-off.
2. **Studio C operates, MBT is the platform, tenants are above.** Never collapse the layers.
3. **Chase Pierson Photography rate is separate from Tuthill rates.** Bookings through Tuthill still pay Chase his rate.
4. **Features built for one tenant are reusable.** Don't fork per-client.
5. **Feature requests from clients → professional services add-on.** Not free work.
6. **Each tenant has a current-state PRD.** Studio C maintains them.

---

*Agents reading this: this supersedes any MBT doc that characterized MBT as "Chase's open-source project." MBT is the operating platform. Studio C runs it.*
