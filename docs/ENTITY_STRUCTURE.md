# Entity Structure — Hillbilly Dreams ecosystem

*Authoritative map of every legal entity, ownership stake, and inter-entity billing relationship. Latest revisions 2026-04-18 evening (Chase corrections, lawyer engaged).*

---

## Entity count and filing status (LOCKED 2026-04-18 evening)

**Two new LLCs to file** (lawyer engaged):
1. **Measurably Better Things LLC** (Mississippi)
2. **Big Muddy Touring LLC** (state TBD with lawyer)

**Existing entities staying:**
- **Big Muddy Natchez LLC** — already exists as the current Inn operating entity. NOT a new filing. Becomes wholly-owned subsidiary of MBT once MBT files (operating-agreement assignment).

**Existing entities being shut down:**
- **FarleyPierson LLC** — DECISION MADE: shut down. (Reverses the earlier "kept as legacy shell" assumption.)

**Existing affiliate (one LLC, two operating DBAs):**
- **Tuthill Design LLC** — 50/50 LLC ownership Chase + Elijah Tuthill
  - Operates two DBA service lines under one legal entity, one insurance umbrella:
    - **Tuthill Design** (DBA) — real estate photo, video, 3D, design (LiDAR + AI)
    - **Studio C** (DBA) — production for MBT platform work + concert/event production
  - **Operating profit split: 40/30/30** — Chase 40% · Elijah Tuthill 30% · Miles 30% (presumed; confirm with Chase)
  - Tuthill / Studio C LLC split deferred — they may eventually become two LLCs but operate as DBAs today

**MBT ↔ Tuthill Design LLC — unified vendor relationship:**
- MBT has ONE vendor relationship with the Tuthill Design LLC
- Paid via **buckets of Studio C hours** (fungible across all platform work) + per-project Tuthill Design work
- Studio C internally staffs the bucket — Elijah primarily, Miles as needed, others if scope grows
- "$50/hr × 40-hr starter block = $2K" is **bucket pricing**, not Elijah's personal rate



---

## Top-line picture (corrected)

```
                  ┌─────────────────────────────────┐
                  │  Measurably Better Things LLC   │
                  │  (Mississippi, to be filed)     │
                  │                                 │
                  │  Chase 1/3 · Tracy 1/3 · Amy 1/3│
                  │                                 │
                  │  Holds directly:                │
                  │  • The tech platform IP         │
                  │  • Canonical entity store       │
                  │  • Directory module             │
                  │  • Outsider Economics code       │
                  │                                 │
                  │  Holds Chase's stakes in:       │
                  │  • Tuthill Design 50%           │
                  │  • Studio C 40%                 │
                  └────────────────┬────────────────┘
                                   │
       ┌───────────────────────────┼───────────────────────────┐
       │                           │                           │
       ▼                           ▼                           ▼
┌──────────────┐          ┌──────────────┐          ┌────────────────────┐
│ Big Muddy    │          │ Big Muddy    │          │ Project LLCs       │
│ Natchez LLC  │          │ Touring LLC  │          │ (per tenant with   │
│ (new — file) │          │ (status?     │          │  meaningful        │
│              │          │  see Q below)│          │  liability)        │
│ Wholly-owned │          │ Wholly-owned │          │                    │
│ subsidiary   │          │ subsidiary   │          │ Spun up per case,  │
│ of MBT       │          │ of MBT       │          │ contained under    │
│              │          │              │          │ MBT, parent stays  │
│ Holds:       │          │ Holds:       │          │ clean              │
│ • The Inn    │          │ • Touring    │          │                    │
│ • Magazine   │          │ • Radio      │          │                    │
│              │          │ • Record     │          │                    │
│              │          │   label      │          │                    │
│              │          │ • Band       │          │                    │
│              │          │ • Music biz  │          │                    │
│              │          │ • Mobile     │          │                    │
│              │          │   performance│          │                    │
└──────────────┘          └──────────────┘          └────────────────────┘
```

Plus FarleyPierson LLC (legacy shell, kept alive — Chase's existing entity).

And the production-side affiliates Chase partly owns through MBT:

```
   ┌─────────────────────────┐         ┌─────────────────────────┐
   │  Tuthill Design         │         │  Studio C               │
   │  (NY, may split from    │         │  (NY + Natchez branch)  │
   │   Studio C)             │         │                         │
   │                         │         │  Chase 40% (held by     │
   │  Chase 50% (held by     │         │   MBT) · Other 60% TBD  │
   │   MBT) · Elijah         │         │                         │
   │   Tuthill 50%           │         │                         │
   │                         │         │                         │
   │  Real estate media,     │         │  Concert + event        │
   │  3D, design (LiDAR)     │         │  production, multicam,  │
   │                         │         │  streaming, post        │
   │  Holds RETAINER with    │         │                         │
   │  MBT — covers work      │         │                         │
   │  across MBT, Big Muddy  │         │                         │
   │  Natchez, Big Muddy     │         │                         │
   │  Touring                │         │                         │
   └─────────────────────────┘         └─────────────────────────┘
```

---

## Entity-by-entity

### 1 · Measurably Better Things LLC (in formation — TO FILE)

| Field | Value |
|---|---|
| **Type** | LLC |
| **Filing state** | Mississippi |
| **NOT** | Registering as foreign LLC in NY |
| **Owners** | Chase Pierson 1/3 · Tracy Alderson-Allen 1/3 · Amy Allen 1/3 |
| **Holds DIRECTLY** | Tech platform IP, canonical entity store, directory module, Sanity architecture, Outsider Economics code |
| **Receives** | Chase's personal distributions from Tuthill Design (50%) and Studio C (40%) — currently flow through FarleyPierson; redirect to MBT post-restructure. **Equity in those entities stays personal to Chase. MBT does NOT acquire ownership in Tuthill or Studio C.** |
| **Wholly-owned subsidiaries** | Big Muddy Natchez LLC · Big Muddy Touring LLC · project LLCs as needed |
| **Public-facing?** | No — surfaces only for broker-tier B2B deals |

### 2 · Big Muddy Natchez LLC (ALREADY EXISTS — current Inn operating entity)

| Field | Value |
|---|---|
| **Type** | LLC, existing as the current Inn operating entity |
| **Filing state** | Mississippi (existing) |
| **Becomes** | Wholly-owned subsidiary of MBT once MBT files (operating-agreement assignment, not a new filing) |
| **Effective ownership post-MBT** | 100% MBT, which means 1/3 each Chase/Tracy/Amy through the parent |
| **Holds** | The Inn (hospitality) · Big Muddy Magazine (publishing) |
| **Action item** | Lawyer documents the assignment from current ownership structure to "wholly owned by MBT" once MBT files |

### 3 · Big Muddy Touring LLC (status — SEE QUESTION BELOW)

| Field | Value |
|---|---|
| **Type** | LLC, intended as wholly-owned subsidiary of MBT |
| **Filing state** | TBD (likely Mississippi) |
| **Effective ownership** | 100% MBT, which means 1/3 each Chase/Tracy/Amy through the parent |
| **Holds** | Touring · Radio · Record label · Band · Music biz · Mobile performance |
| **Why separate** | Vehicle insurance (12-passenger van, eventually Prevost bus) + road performance / on-tour liability requires its own entity and policy |

**Chase's question to Cos:** Is BMT LLC (a) already filed, or (b) a third new entity to file alongside MBT and Big Muddy Natchez?

**My read (for Chase to confirm):** Likely **(b) — third new entity, not yet filed.** Reasoning:
- This morning's handoff explicitly described BMT LLC as a "new LLC" required for insurance reasons
- "Big Muddy Touring" exists as a brand and a website but I have no record of an LLC by that name on file
- The earlier "two new entities to create" phrasing probably referred to the two top-of-mind today (MBT + Big Muddy Natchez); BMT may have been mentioned earlier and slipped during the late-afternoon dictation

If I'm right: three new LLC formations are coming. MBT first, then BMT and Big Muddy Natchez can be filed in parallel since they're both wholly-owned subsidiaries of MBT.

If I'm wrong and BMT is already filed under another name (e.g., FarleyPierson d/b/a Big Muddy Touring): two new filings, plus restructuring BMT to become a subsidiary of MBT.

### 4 · Tuthill Design

| Field | Value |
|---|---|
| **Type** | LLC (currently shared with Studio C — split deferred) |
| **Filing state** | New York (existing) |
| **Owners** | Chase Pierson 50% (personal — MBT receives the distributions post-restructure but does NOT acquire equity) · Elijah Tuthill 50% |
| **Effect of MBT restructure on Tuthill itself** | None. Operations unchanged. Ownership unchanged. Elijah Tuthill unaffected. Only Chase's distribution path changes (FarleyPierson → MBT). |
| **NY footprint** | Dutchess · Ulster · Orange · Westchester · Columbia Counties |
| **South footprint (NEW)** | Natchez, MS branch opening · Arkansas possible next |
| **Service menu** | Stills (HDR/drone/twilight/architectural) · 3D (Matterport+Zillow tours, floor plans) · Video (cinematic, reels, lifestyle) · Design (LiDAR + AI renderings — Scan2Plan bridge) |
| **Special role** | **Holds the retainer with MBT** that funds platform-side work across MBT, Big Muddy Natchez, and Big Muddy Touring |

### 5 · Studio C

| Field | Value |
|---|---|
| **Type** | LLC (currently shared with Tuthill — split deferred) |
| **Filing state** | New York (existing) |
| **Owners** | Chase Pierson 40% (personal — MBT receives the distributions post-restructure but does NOT acquire equity) · Other 60% **TBD (Cos needs Chase to provide)** |
| **Effect of MBT restructure on Studio C itself** | None. Operations unchanged. Ownership unchanged. Other 60%-holders unaffected. Only Chase's distribution path changes (FarleyPierson → MBT). |
| **NY footprint** | Bearsville-anchored |
| **South footprint (NEW)** | Natchez, MS branch opening |
| **Service menu** | Multicam event production · Broadcast-quality live streaming · Post production · Focus: concerts and events |
| **Relationship to MBT** | Vendor for production work; client of MBT for own marketing |

### 6 · Project LLCs (pattern, not a single entity)

When MBT takes on a tenant project with meaningful liability exposure, spin up a project-level LLC under MBT. Contains liability to that child entity; parent MBT stays clean.

**What constitutes "meaningful liability exposure" — open question for Chase to define.** Candidates:
- Tenants with physical operations (events, hospitality, transportation)
- Tenants with regulated activities (financial, healthcare, licensed professions)
- Tenants with significant capital assets in their care
- Tenants whose actions could create third-party harm

Tenants that are **purely platform users** (Vicki Wolpert, future realtors, magazine subscribers) probably don't need project LLCs — they're customers of the MBT platform, not joint operations.

### 7 · FarleyPierson LLC (BEING SHUT DOWN — 2026-04-18 decision)

| Field | Value |
|---|---|
| **Type** | Existing LLC, EIN 81-4280721 |
| **Owner** | Chase (and partner history) |
| **Status** | **SHUTTING DOWN.** Decision made 2026-04-18. Reverses the earlier "kept as legacy shell" assumption. |
| **Wind-down considerations** | Existing contracts (if any) need migration to MBT or cancellation. Tax history retained per IRS records. Bank accounts closed. Lawyer handling. |

---

## Retainer / work flow (NEW)

MBT holds a retainer with Tuthill Design. (Mechanically held with Tuthill since Tuthill + Studio C currently share one legal entity.)

**Retainer hours cover work across:**
- MBT itself (platform development, ops, admin)
- Big Muddy Natchez (Inn ops, Magazine production, hospitality marketing)
- Big Muddy Touring (touring ops, radio, records, music business)

**Elijah administers the hours**, prioritizing by task urgency across the three operating entities.

**Open questions for Chase:**
- Retainer monthly amount and hourly rate
- Volume of hours per month at the retainer level
- Burn-rate reporting cadence (Tracy probably wants monthly visibility)
- What happens when retainer is exhausted mid-month — burst rate? Pause?

---

## Inter-entity billing example — Big Muddy Touring

BMT operates inside the MBT family but bills as a real entity. Three billing relationships:

```
                      Big Muddy Touring LLC
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
    Bills MBT for       Bills Elijah     Bills Studio C
    platform services   directly for     for brand +
    (directory, site,   MBT platform     production work
    automation,         maintenance      (concert
    booking)            (his time)       multicam, post)
```

(Note: now that MBT holds the retainer with Tuthill that funds Elijah's hours, this billing flow may simplify — see "Retainer / work flow" above.)

---

## Summary — corrections from late-evening Chase update

| Change | Impact |
|---|---|
| **Big Muddy Natchez LLC** already exists as Inn operating entity | NOT a new filing. Lawyer documents assignment to MBT subsidiary structure post-MBT-filing. |
| **Chase's stakes in Tuthill (50%) and Studio C (40%) STAY PERSONAL.** MBT only receives the distributions (currently routed through FarleyPierson). | Tuthill + Studio C ownership unchanged. Elijah Tuthill + Studio C 60%-holder unaffected. The earlier "MBT holds the equity" framing was wrong — corrected. |
| **Big Muddy Natchez + Big Muddy Touring are wholly-owned subsidiaries of MBT** | Tracy + Amy have indirect 1/3 stakes via MBT, not direct equity in subsidiaries |
| **Project LLC pattern** introduced | New tool in the toolbox; threshold to invoke TBD |
| **Retainer with Tuthill** funds Elijah's cross-entity work | Single payment hub; Elijah triages by urgency |
| **External co-owner conversations** | Walked back to a lawyer check (transfer/assignment clauses in Tuthill + Studio C operating agreements). Courtesy notice only if triggered. NOT a relationship negotiation. |

---

## Open questions for Chase

| # | Question | Status |
|---|---|---|
| 1 | Studio C 60% owner — name? | Cos can't determine; needs Chase |
| 2 | ~~Big Muddy Touring LLC status~~ | **RESOLVED:** Two new LLCs to file (MBT + BMT). Lawyer engaged. |
| 3 | "Elijah" disambiguation — Elijah from Bearsville (photo archive) = Elijah Tuthill? | My read = yes. Confirm. |
| 4 | ~~Big Muddy Natchez LLC filing state~~ | **RESOLVED:** Already exists. Not a new filing. |
| 5 | ~~FarleyPierson kept alive?~~ | **RESOLVED:** SHUTTING DOWN. Lawyer handling. |
| 6 | Retainer monthly rate + hours volume? | Need numbers from Chase. Elijah maintains the backend per Chase 2026-04-18 PM. |
| 7 | What constitutes "meaningful liability exposure" that triggers a project LLC? | Need Chase's threshold |
| 8 | LLC split trigger for Tuthill ↔ Studio C? | Deferred but tracked |
| 9 | Insurance flash radius — agent identified yet? | Action item P38 |
| 10 | **NEW: Innkeeper role** — Tracy stepping back from Inn day-to-day; Amy loaded with Radio + Records + performing. Who fills the Innkeeper role? | **Open. Surface before Tracy's transition starts.** |
| 11 | ~~External co-owner conversations~~ | **WALKED BACK 2026-04-18 evening.** Chase's stakes in Tuthill/Studio C stay personal. MBT only redirects pass-through DISTRIBUTIONS (FarleyPierson → MBT). No equity transfer. Co-owners are unaffected. Reduced to: lawyer reviews Tuthill + Studio C operating agreements for transfer/assignment clauses to confirm distribution-redirect isn't a triggered assignment. If it is, courtesy notice to co-owners (formality, not negotiation). |

---

## Implications for already-drafted docs

| Doc | What needs updating |
|---|---|
| `docs/CURRENT_CONTEXT.md` | Multi-entity map updated to new hierarchy (subsidiaries vs equity stakes) |
| `docs/MBT_WORKSPACE_MIGRATION_ARCHITECTURE.md` | Phase 0 now includes filing **three** new LLCs (MBT + Big Muddy Natchez + likely BMT), all in MS |
| `docs/finance/VICKI_WALPURT_LOI_2026-04-18.md` | Already corrected to MS-filing; section 7 still accurate |
| `docs/prds/big-muddy-inn.md` | Update parent entity to Big Muddy Natchez LLC (not directly under MBT) |
| New: `docs/prds/big-muddy-magazine.md` | Sibling under Big Muddy Natchez LLC |
| New: `docs/prds/big-muddy-touring.md` | Under BMT LLC when it files |
| Router queue | P37 (BMT LLC formation) still applies; add P42 Big Muddy Natchez LLC formation; add P43 retainer arithmetic + reporting |

---

*Updated 2026-04-18 PM (Cos, from Chase's late-afternoon correction). This doc supersedes the earlier "MBT alongside Tuthill/Studio C/BMT as parallel entities" framing — the corrected reality is MBT is the parent; Big Muddy Natchez and Big Muddy Touring are subsidiaries; Tuthill and Studio C are affiliates Chase partly owns through MBT.*
