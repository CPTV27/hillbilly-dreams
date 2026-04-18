# Product to Platform — Mapping the brand offerings to MBT modules

*The canonical mapping that ties every dollar customers pay on the front end to a specific module on the back end and a specific revenue tier for MBT. Drafted 2026-04-18 from Chase's strategic frame.*

*Detailed plan with file paths and verification steps lives in `~/.claude/plans/cozy-beaming-minsky.md`. This doc is the public-facing version partners + agents reference.*

---

## The principle

**Define every brand's front-end offering first. The back-end modules fall out of those offerings.**

Each module exists because a specific brand sells a specific thing. No module is built in the abstract. No offering is sold without a module that delivers it.

This stops module work from drifting into vague platform expansion. Every line item has a customer paying for it.

---

## The three tiers of front-end surface area

### Consumer tier
Where the cash register rings for end customers. Big Muddy Inn sells room nights, private events, and Blues Room tickets. Big Muddy Touring sells tour dates to audiences and gigs to venues. Big Muddy Records sells records, downloads, and streaming. Big Muddy Radio is free to listeners and monetizes through sponsorships and directory placements. Big Muddy Magazine sells subscriptions and ad inventory. Chase Pierson Photography sells premium editorial and documentary commissions at his personal rate.

### Production B2B tier
Tuthill Design sells real estate photo and video, 3D tours, floor plans, and design (LiDAR + AI) to realtors and homeowners across two corridors — Hudson Valley up north and Mississippi corridor in the south. Studio C sells multicam event production, live streaming, and post production to venues, festivals, touring acts, and corporate events.

### Platform B2B tier
MBT itself. Customers are the broker-tier B2B clients — Paul Green Realty, the City of Natchez, future civic and regional partnerships — where the sale **is** the platform, not a product on top of it. Internal customers: every brand above pays MBT through the retainer + module-fee mechanism.

Per-brand worksheets at `docs/brand-offerings/`. Eight brands, each one-page, defining offerings + pricing + modules required.

---

## The 13 modules

Working backwards from every offering listed across the eight brand worksheets, you get 13 modules. Most already exist in some form. One is net-new.

| # | Module | Status | What delivers |
|---|---|---|---|
| 1 | Canonical Entity Store | Partial | One master DB of every entity — plumber in Catskill, venue in Clarksdale, contractor in Natchez, musician on the route — lives once. Tenant directories are filtered views. |
| 2 | CMS (Sanity) | Exists | Content layer for every property. Already wired and working. |
| 3 | Directory Module | Exists | Containerized, reusable multimedia contact directory. Each entry rich with name/address/contact, photos, video, floor plans, 3D models. Internal-only or public per entry. |
| 4 | Media Gallery (Immich) | Exists | Photo and video DAM running on Hetzner. 52,892 photos already ingested. CLIP semantic search and face recognition. |
| 5 | Booking Module | Partial | Inn rooms (Cloudbeds working), Blues Room tickets, service appointments, event reservations. |
| 6 | Commerce Module | Partial | Records, subscriptions (DSD live with Stripe), merchandise, directory sponsor slots. |
| 7 | Broadcast Module | Partial | Big Muddy Radio (Mac mini OpenBroadcaster + Icecast running), live stream, multicam orchestration for Studio C. |
| 8 | Social Media Module | Partial | Cross-channel publish + schedule. Postiz on Mac mini handling the heavy lifting. |
| 9 | Tour/Calendar Module | Partial | Show dates, event scheduling, sponsor inventory by tour/season. |
| 10 | Finance/Billing Module | Partial | Per-entity P&L, cross-entity invoicing, retainer hour tracking, Tier 3 module engagement billing. |
| 11 | Affiliate/Referral Module | Partial | Directory entries reference affiliate logic. Future: explicit contract storage and commission tracking. |
| 12 | Coordination Layer | Partial | Workflow orchestration across modules. Currently expressed as router queue + multi-tenant middleware. Needs an event bus. |
| 13 | Prompt-driven Content Creation | Net-new | "I want to write a magazine article about X" → wizard pulls entities + media + templates → produces a draft in Sanity. Starter endpoints exist; the wizard itself is unbuilt. |

---

## The three tiers of MBT economic participation

The mechanism that turns the platform into a real business with its own revenue stream.

### Tier 1 — Internal tooling
**No revenue share.**

When Big Muddy Inn uses the Booking module, when Big Muddy Magazine uses the CMS, when Chase Pierson Photography uses the portfolio — there's no separate billing. It all consolidates up to MBT through ownership of the operating subsidiaries (Big Muddy Natchez LLC, Big Muddy Touring LLC). The cost is absorbed; the value stays in the family.

### Tier 2 — One-off vendor work
**No revenue share.**

When Tuthill does one real estate shoot for a realtor, when Studio C livestreams one wedding — these are transactional. MBT provides the booking and delivery infrastructure at a flat cost, which is covered inside Tuthill's retainer with MBT. Vendor keeps the revenue. MBT is invisible infrastructure, period.

### Tier 3 — Ongoing module-delivered services
**MBT takes 15–30% of recurring revenue, case by case.**

When Tuthill sells a realtor a recurring social media management service that's powered by MBT's Social + Entity + Content modules — MBT is the value driver. When Big Muddy Radio carries a local business as a directory sponsor plus a recurring ad package, the Directory module is doing the work. When Paul Green Realty licenses the Deep South Directory as a running product, MBT is essentially licensing the module.

The vendor is the face of the service. MBT is the engine. Splits depend on how much of the service is module versus how much is vendor labor — typically 15–30% of recurring revenue to MBT.

### Mechanism

Every MBT module has a **license profile** attached — platform fee percentage, monthly minimum, scope definition.

When a vendor brings a client onto a module, it's recorded as a **module engagement** in the finance system. Vendor invoices the client. MBT invoices the vendor. The retainer pool covers the day-to-day labor (Elijah administering hours across MBT, Big Muddy Natchez, and Big Muddy Touring).

Clean separation. Audit-ready per engagement.

---

## The "do we rebuild?" question

**No. Refactor and extend.**

A fresh rebuild costs three to six months and isn't needed. Validation against the codebase: monorepo structure exists (apps/web + packages/database, packages/ui, packages/shared, packages/config). Multi-tenant routing works. Sanity, Stripe, Cloudbeds, Icecast, social publisher, draft generation — all wired in some form.

The bones are right. What's needed is three specific moves.

### Move 1 — Formalize module boundaries
Each of the 13 modules becomes its own clean package with a defined API. Where modules are entangled today (Sanity calls scattered across pages instead of behind a CMS module API), introduce a clean module-level interface and migrate callers. The existing `packages/database/` package is the right shape to follow.

### Move 2 — Build a tenant provisioning pipeline
Spinning up a new client — a new realtor, a new venue, a new property — should be a single command that creates the entity record, provisions the Vercel domain, bootstraps a Sanity project from a template, activates the right modules, and puts the tenant on the dashboard. Currently it's manual edits to config files. **This is the single biggest leverage point for scale.** Vicki on May 1 is the first external tenant; this pipeline keeps her, Paul Green, future realtors, and recording studios from each requiring multi-day setup.

### Move 3 — Build the prompt-driven Content Creation Module fresh
The piece that makes the platform feel different from generic SaaS. A user saying "I want to write a magazine article about X" and the system pulling entities, media, and template scaffolding together. Starter endpoints exist; the wizard itself is unbuilt.

### Things to deliberately NOT do

- **Do not rebuild Sanity integrations from scratch.** They work. Extend them.
- **Do not unify billing across entities before MBT LLC files.** Need clean separate P&Ls from day one. Premature unification makes per-entity accounting messier and forces rework when MBT, Big Muddy Natchez, and Big Muddy Touring stand up as separate entities.

---

## The concrete next step

**Monday April 20 evening planning session.** Chase + Tracy + Amy lock the front-end offering for each brand using the per-brand worksheets at `docs/brand-offerings/`.

That document becomes the brief for module work. Without front-end clarity, modules get built in the abstract and the pricing doesn't map. With it, every module has a direct line to a specific offering making specific money.

---

## Reference docs

- `~/.claude/plans/cozy-beaming-minsky.md` — full plan with file paths and verification
- `docs/brand-offerings/` — per-brand front-end worksheets (8 brands + template)
- `docs/ENTITY_STRUCTURE.md` — the legal entity hierarchy this mapping operationalizes
- `docs/PLATFORM_ARCHITECTURE.md` — the three-layer model (MBT platform · Studio C/Tuthill operators · tenants)
- `docs/MBT_WORKSPACE_MIGRATION_ARCHITECTURE.md` — the workspace migration that frames timing
- `docs/prds/` — per-tenant PRDs each module engagement gets recorded against
- `docs/router/QUEUE.md` — project queue (P44–P48 added for module formalization, tenant provisioning, content creation MVP, brand offerings prep, license profile data model)

---

*Drafted 2026-04-18 from Chase's product-to-platform exercise during the NOLA drive. Validated against codebase state. Approved as a plan in `cozy-beaming-minsky.md`. Execution begins after Monday April 20 partner session locks the front-end offerings.*
