# Deep South Directory — task marketplace (spec)

**Product idea:** Directory businesses post discrete jobs (photography, reel edit, flyer, event cover). Verified creatives in the network claim work. The platform captures a **take rate** on each completed job — margin recovery for HDI, income for local creatives.

**Pricing ladder context (2026):** Free / **$25** Essentials / **$50** Pro / **$99** Marketing / **$250** Engine — marketplace access and fee discounts can tier with Pro+.

---

## 1. User stories

| Actor | Need |
|--------|------|
| Business | Post a scoped task with budget range, deadline, and deliverables. |
| Creative | Browse open tasks, filter by geography and skill, claim one at a time. |
| Admin | Resolve disputes, refund platform fee, ban bad actors. |

## 2. Core flows

1. **Post task** — Business authenticated as DSD subscriber; task includes title, description, city, optional attachments (GCS), **max pay** or **fixed price**, deadline.
2. **Claim** — Creative with completed profile + payout method (Stripe Connect) claims; task moves to `in_progress`.
3. **Deliver** — Creative uploads deliverable or pastes link; business approves or requests one revision round (configurable).
4. **Pay** — Escrow model (preferred): charge business at post OR capture on approve; platform fee (e.g. 10–15%) retained; remainder to creative via Connect.
5. **Dispute** — Freeze payout; admin console with transcript + files.

## 3. Data model (draft)

- `MarketplaceTask` — id, businessProfileId or clientId, title, body, status (`open` | `claimed` | `delivered` | `approved` | `disputed` | `cancelled`), priceCents, platformFeeBps, claimedByUserId, dueAt, createdAt.
- `MarketplaceTaskEvent` — audit log for claim, message, delivery, approval.

## 4. Trust and safety

- **KYC-lite:** phone-verified businesses; creatives need Connect `active`.
- **Rating** after job close (both directions).
- **Geofence:** default visibility to same MSA or state until network density supports wider radius.

## 5. Non-goals (v1)

- Full Upwork-style arbitration.
- Cross-border payouts.
- Automatic AI matching (backlog — Delta Dawn suggests, human claims).

## 6. Build order

1. Schema + admin-only CRUD for dogfood.
2. Stripe Connect destination charges with application fee.
3. Business-facing UI under `/media` or DSD operator portal (no consumer MBT branding on DSD walk-in surfaces).
