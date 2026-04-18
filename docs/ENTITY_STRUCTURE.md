# Entity Structure — Hillbilly Dreams ecosystem

*Authoritative map of every legal entity, ownership stake, and inter-entity billing relationship. Updated 2026-04-18 PM after Chase's restructure dictation.*

---

## Top-line picture

The ecosystem is **multi-entity**, not a single holding company:

```
                  ┌──────────────────────────────┐
                  │  Measurably Better Things    │
                  │  LLC (MS, to be filed)       │
                  │  Platform · Holding · Brand  │
                  │  for broker-tier deals only  │
                  │  Owners: Chase · Tracy · Amy │
                  │  (equal thirds)              │
                  └──────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────┴───────┐   ┌─────────┴────────┐   ┌────────┴────────┐
│ Tuthill       │   │ Studio C         │   │ Big Muddy       │
│ Design        │   │                  │   │ Touring LLC     │
│ (NY footprint)│   │ (NY + new        │   │ (separate for   │
│ Chase 50% /   │   │  Natchez branch) │   │  vehicle + tour │
│ Elijah        │   │ Chase 40% /      │   │  liability)     │
│ Tuthill 50%   │   │ Other 60% TBD    │   │ Owners: TBD     │
│ + Natchez     │   │                  │   │                 │
│  branch (new) │   │                  │   │                 │
└───────┬───────┘   └─────────┬────────┘   └────────┬────────┘
        │                     │                     │
        ▼                     ▼                     ▼
   Real estate       Concert + event             Vehicle, road
   media + 3D +      production +                performance,
   design (LiDAR)    multicam streaming +        on-tour liability,
   service menu      post production             house band, etc.
```

Plus FarleyPierson LLC (Chase's existing operating entity) which stays alive as a legacy shell — not dissolved.

---

## Entity-by-entity

### 1 · Measurably Better Things LLC (in formation)

| Field | Value |
|---|---|
| **Type** | LLC |
| **Filing state** | Mississippi (single-state) |
| **NOT** | Registering as a foreign LLC in NY |
| **Reason** | MBT does not transact in NY directly — NY business routes through Tuthill Design |
| **Owners** | Chase Pierson · Tracy Alderson-Allen · Amy Allen — equal thirds |
| **Role** | Platform, holding company, broker-tier brand |
| **Public-facing?** | No — surfaces only for broker-tier B2B deals (Paul Green Realty, civic/tourism platforms) |
| **Owns** | The directory module, canonical entity store, Sanity architecture, Born Free Network code |

### 2 · Tuthill Design

| Field | Value |
|---|---|
| **Type** | LLC (currently shared with Studio C — may split, decision deferred) |
| **Filing state** | New York |
| **Owners** | Chase Pierson 50% · Elijah Tuthill 50% |
| **Role** | NY-footprint operating entity. Real estate media + design services. |
| **Footprint (north)** | Dutchess · Ulster · Orange · Westchester · Columbia Counties (NY) |
| **Footprint (south, NEW)** | Natchez, MS branch opening · Arkansas possible next |

**Service menu:**
- **Stills:** HDR interior/exterior, drone aerial, twilight, architectural detail
- **3D:** Matterport + Zillow tours, floor plans
- **Video:** cinematic property videos, Instagram reels, lifestyle storytelling
- **Design:** kitchen/bath/additions/whole-home transformations using LiDAR + AI renderings (bridge to the Scan2Plan archived work)

### 3 · Studio C

| Field | Value |
|---|---|
| **Type** | LLC (currently shared with Tuthill — may split) |
| **Filing state** | New York |
| **Owners** | Chase Pierson 40% · Other 60% TBD (Cos needs to confirm with Chase) |
| **Role** | Production vendor — concert + event production focus |
| **Footprint (north)** | New York (Bearsville-anchored) |
| **Footprint (south, NEW)** | Natchez, MS branch opening |

**Service menu:**
- Multicam event production
- Broadcast-quality live streaming
- Post production
- Focus: concerts and events

**Relationship to MBT:** Studio C is a vendor TO MBT (production work) and a client OF MBT (uses platform to market its own services). Eats its own dog food.

### 4 · Big Muddy Touring LLC (new — to be formed)

| Field | Value |
|---|---|
| **Type** | LLC (new, separate from MBT and from Tuthill/Studio C entities) |
| **Filing state** | TBD (Mississippi most likely, Chase to confirm) |
| **Owners** | TBD |
| **Reason for separate entity** | Vehicle insurance (12-passenger van, eventually Prevost bus) + road-performance / on-tour liability requires its own policy and entity |

**What sits inside BMT LLC:**
- The van and bus assets
- Touring operations
- Road performance contracts
- House band / artist transport
- On-tour liability + insurance

### 5 · FarleyPierson LLC (legacy)

| Field | Value |
|---|---|
| **Type** | Existing LLC, EIN 81-4280721 |
| **Filing state** | (existing) |
| **Owner** | Chase (and partner history) |
| **Role going forward** | **Stays alive as legacy shell.** Existing contracts, tax history, banking continuity. Does NOT dissolve. |
| **Operates as** | d/b/a vehicle until MBT LLC files |

---

## Inter-entity billing — Big Muddy Touring example

Big Muddy Touring is a client of THREE in-family entities simultaneously. Each entity bills BMT for its own scope:

```
                      Big Muddy Touring LLC
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
    Bills MBT for       Bills Elijah     Bills Studio C
    platform services   directly for     for brand +
    (directory,         MBT platform     production
    site, automation,   maintenance      (concert
    booking)            (his time)       multicam,
                                         streaming,
                                         post)
```

This is a clean separation. BMT keeps its own books; each in-family entity invoices its own work; nobody forgets to bill.

---

## Insurance flash radius (open question)

The boundary between Studio C's production insurance and Big Muddy Touring's road-performance insurance needs an agent to draw it.

**Examples to resolve:**
- A Studio C team member shoots an in-Inn event — Studio C policy
- A Studio C team member shoots an on-the-road BMT show — which?
- BMT's van transports both BMT artists AND a Studio C crew — vehicle policy + crew coverage
- A Studio C-rented camera gets damaged on the road — equipment policy on which?

Action: get an insurance agent who handles both production and touring entities to draw the line and write the umbrella that catches edge cases.

---

## LLC split decision — Tuthill Design ↔ Studio C

Currently shared one entity. May split into two LLCs.

**Reasons to split:**
- Different ownership (50/50 Tuthill, 40/60 Studio C)
- Different liability profiles (real estate media vs concert production)
- Cleaner P&L per business
- Scaling each independently (Natchez branches, future hires)

**Reasons not to split (yet):**
- Cost of formation + ongoing compliance × 2
- Existing contracts + tax history under one entity
- Operational simplicity while team is still small

**Trigger to split:** Chase to define. Likely candidates:
- When second non-Chase employee at one of them
- When revenue at one crosses a threshold (TBD)
- When a Natchez branch generates enough independent activity to warrant local accounting

---

## Open questions for Chase

| # | Question | Asked of |
|---|---|---|
| 1 | **Studio C 60% ownership** — who holds it? | Chase |
| 2 | **Tuthill / Studio C LLC split** — when and on what trigger? | Chase |
| 3 | **FarleyPierson LLC** — confirmed kept alive as legacy shell? | Chase (likely yes, just confirm) |
| 4 | **Insurance flash radius** — find an agent who covers production + touring? Existing agent or new? | Chase |
| 5 | **Big Muddy Touring LLC** — file in MS? Chase as sole owner or partnership? | Chase |
| 6 | **"Elijah" disambiguation** — is "Elijah" the photo archive operator (Bearsville) the same person as "Elijah Tuthill" the 50% Tuthill Design owner? | Chase (almost certainly yes given Bearsville geography, but confirm) |

---

## Implications for already-drafted docs

| Doc | What changes |
|---|---|
| `docs/MBT_WORKSPACE_MIGRATION_ARCHITECTURE.md` | Phase 0: file in **MS**, not NY |
| `docs/finance/VICKI_WALPURT_LOI_2026-04-18.md` | "in formation, New York" → "in formation, Mississippi" |
| `docs/CURRENT_CONTEXT.md` | Add the 5-entity map |
| New: `docs/prds/tuthill-design.md` | Tuthill is now a formal client of MBT |
| New: `docs/prds/studio-c.md` | Studio C is both vendor and client of MBT |
| New: `docs/prds/big-muddy-touring.md` | When BMT LLC files, it gets its own PRD |
| Router queue | Add: BMT LLC formation · Insurance umbrella scope · Tuthill Natchez branch · Studio C Natchez branch · LLC split decision (deferred but tracked) |

---

*Updated 2026-04-18 PM (Cos, from Chase dictation while driving). This doc supersedes the simpler "MBT = single platform" framing in earlier handoffs. The reality is: MBT is the platform tier, but multiple operating LLCs sit alongside, each with its own ownership and footprint.*
