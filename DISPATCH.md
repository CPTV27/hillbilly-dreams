# DISPATCH — Deep South Directory MVP Rebuild
> Status: AWAITING QC_GATE
> Narrative anchor: Origin (HDX = armor protecting the music) + Mission (OE_Brief_001 — 80% extraction rate)
> Sovereign: Micromedia (hdi-media / db-media)
> Agent: CC

---

## Objective

Rebuild `apps/web/app/directory/` from a "marketing services" product into the **front door of the HDX network** — the Trojan Horse. A regional business lists here, sees the network working, and upgrades to full HDX.

---

## What Exists (Do Not Break)

- `apps/web/app/directory/page.tsx` — landing page, solid structure, wrong copy + framing
- `apps/web/app/directory/dashboard/page.tsx` — business dashboard, Stripe Connect wired
- `packages/ui/components/DirectoryCTA.tsx` — reusable CTA component
- `apps/web/app/media/directory/` — separate media/publication directory (different sovereign — do not touch)

---

## Task List

### Task 1 — Reframe the Landing Page
**File:** `apps/web/app/directory/page.tsx`

Update copy and framing throughout. No structural rebuild needed — copy surgery only.

- **Hero headline:** "The businesses that make the corridor work." → keep
- **Hero sub:** Replace "Marketing services for restaurants, venues..." with: "The regional business network for the Mississippi Corridor. Find locals. Get found. Keep your money in the region."
- **Add editorial surface section** above the Categories grid: "From the Corridor" — a feed of 2–3 content cards pulled from `OE_Brief_001_80pct_Extraction.md` and `BigMuddy_Spotlight_001_Rise_Up.md` as static featured cards (hardcoded for v1, content engine wired in v2)
- **Update pricing tiers** to canonical spec:
  - Free Listing → Free (keep)
  - Main Street → $99/mo (was $50)
  - The Route → $299/mo (was $150)
  - Blues Room → rename to **HDX Ops** → $1,200+/mo — "Your own HDX deployment. Run your business on the same infrastructure that powers the Directory."
- **Update CTA email** from `directory@bigmuddymedia.com` → `listings@hillbillydreamsinc.com`
- **Add "Powered by HDX" footer mark** to the page footer

### Task 2 — Build the Submission/Intake Flow
**New file:** `apps/web/app/directory/submit/page.tsx`

3-step intake form. No database write in v1 — submits to API route that sends email + triggers content engine.

**Step 1 — The Business**
- Business name
- Category (dropdown: Hospitality, Food & Drink, Trades, Creative, AEC, Retail, Services)
- City / Corridor node (dropdown: Memphis, Clarksdale, Vicksburg, Natchez, New Orleans, El Dorado, Other)
- Website (optional)
- One-line description ("What do you do?")

**Step 2 — The Economics** (the Outsider Economics hook)
- "Where do most of your tools and subscriptions come from?" (Local / Regional / National chains / Mix)
- "Roughly how much do you spend on software per month?" ($0–$200 / $200–$500 / $500–$1,000 / $1,000+)
- These answers are collected, not gated. No wrong answer. This seeds the AI spotlight.

**Step 3 — The Listing**
- Contact name + email
- "How did you hear about the Directory?"
- Submit button: "Get Listed"

**On submit:**
- POST to `/api/directory/submit`
- API route emails `listings@hillbillydreamsinc.com` with full submission data
- API route calls `packages/content-engine` (Gemini) to generate a 300-word spotlight — stores result in submission payload
- Redirect to `/directory/submit/confirmed` with a thank-you message and preview of the AI-generated spotlight

### Task 3 — Wire AI Spotlight to Content Engine
**File:** `apps/web/api/directory/submit/route.ts` (new)

On submission, call `packages/content-engine` with:
```
prompt: Generate a 300-word editorial spotlight for a business in the Deep South Directory.
Business: [name], [category], [city]
Description: [one-line]
Voice: Direct, analog-warm, operator-to-operator. No startup jargon. Sound like a neighbor, not a tech company.
```

Store generated spotlight in the email payload. Do not write to db-media in v1 — that's v2 when the schema is ready.

**Constraint:** Must use `packages/content-engine` — do not call Gemini API directly from the route.

### Task 4 — Update the Business Dashboard
**File:** `apps/web/app/directory/dashboard/page.tsx`

Four additions:

1. **"Powered by HDX" mark** — Add to the dashboard header, small, beneath the "Deep South Directory" eyebrow. Text: `Powered by HDX · hillbillydreamsinc.com`

2. **AI Spotlight card** — New section below Quick Stats: "Your Editorial Spotlight" — shows the Gemini-generated spotlight text with a "Publish to Magazine" CTA (locked at Free tier, unlocked at $99+)

3. **Locked "HDX Operating System" tab** — Add a tab to the dashboard nav: "HDX OS" with a lock icon. On click, shows a locked panel with copy:
   > "You're already running on the same infrastructure that powers the Directory. HDX is the full operating system: sales pipeline, billing, project management, client delivery — all connected. One monthly cost. No engineering team required."
   > CTA: "Talk to us about HDX" → `mailto:licensing@hillbillydreamsinc.com`

4. **Update contact email** in "Edit Listing" from `directory@bigmuddymedia.com` → `listings@hillbillydreamsinc.com`

### Task 5 — db-media Schema: DirectoryBusiness model
**File:** `packages/database/prisma/schema.prisma`

Add to the `db-media` schema (not the main schema — verify correct schema file):

```prisma
model DirectoryBusiness {
  id          Int      @id @default(autoincrement())
  name        String
  category    String
  city        String
  website     String?
  description String   @db.Text
  contactName String
  contactEmail String
  tier        String   @default("free") // free | main_street | the_route | hdx_ops
  spotlight   String?  @db.Text  // AI-generated editorial copy
  active      Boolean  @default(false) // manually activated by admin
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([city])
  @@index([category])
  @@index([tier])
}
```

**Do not migrate in v1** — schema only. Migration happens when Chase approves activation.

---

## Sovereignty Rules

- All directory writes go to `db-media` only
- Do not import from `db-s2px`, `db-hospitality`, or any other sovereign
- Content engine calls are read/write to `db-media` only
- The `packages/content-engine` package is the only permitted Gemini integration point

---

## Definition of Done

- [ ] Landing page reframed with correct copy, editorial surface, updated tiers
- [ ] `/directory/submit` intake flow built and functional
- [ ] `/api/directory/submit` route built, emails on submit, triggers content engine
- [ ] `/directory/submit/confirmed` thank-you page with spotlight preview
- [ ] Dashboard updated: HDX mark, spotlight card, locked HDX OS tab, email updated
- [ ] `DirectoryBusiness` model added to schema (no migration)
- [ ] All pages verified via preview server (`NEXT_PUBLIC_BRAND=media` or `directory`)
- [ ] AGENT_LEDGER.md updated
- [ ] DISPATCH.md cleared

---

## Out of Scope for v1

- Live database reads for listing search (static data only)
- Geographic map view
- Stripe billing integration for tier upgrades
- Automated Magazine cross-publication
- Admin moderation queue

These are v2 — once the schema is migrated and listings are coming in.
