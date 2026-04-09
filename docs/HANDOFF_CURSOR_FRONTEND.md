# Cursor Agent Handoff — Frontend Sprint

*For the Cursor IDE agent. April 9, 2026.*

---

## Your Job

Build the consumer-facing pages for bigmuddytouring.com and the institutional landing page for measurablybetter.life. Backend work is done — Prisma models are migrated, webhooks are built, routing is updated. You are building the UI layer.

## Context

- **Stack:** Next.js 14.2 App Router, TypeScript, Inline CSS (no Tailwind)
- **Fonts:** `var(--font-body)` and `var(--font-display)` — never hardcode
- **Colors:** CSS custom properties only — never hardcode
- **Photography first.** Real photos from GCS (`storage.googleapis.com/bmt-media-bigmuddy/`), not stock. No AI illustrations with text.
- **No tech jargon** on customer-facing pages
- **Sanity CMS** is being set up for articles/events/locations — you may need to wire up Sanity data fetching once schemas are ready

## Priority Pages

### 1. `/radio` — Big Muddy Radio Player

A simple, beautiful radio player page.

**Requirements:**
- HTML5 `<audio>` element with source: `https://stream.bigmuddytouring.com/stream`
- Play/pause button (large, obvious)
- "Now Playing" display — poll `/api/radio/now-playing` every 15 seconds
- Show: song title, artist name, listener count
- Dark theme (this is a music/radio page)
- Show schedule (hardcode as JSON for v1 — 18 shows, see `.claude/agents/BROADCASTING_CAPABILITIES.md`)
- Mobile-first responsive

**No auth needed.** Public page.

### 2. `measurablybetter.life` landing page — MBT Institutional

This is NOT a SaaS signup page. It's an institutional sales page for towns, chambers, and brokerages.

**Requirements:**
- Hero: "A licensed local growth system for towns, districts, and cultural operators"
- Value prop sections (from `docs/OFFER_ARCHITECTURE.md`):
  - Multi-stakeholder model diagram
  - The 9 modules
  - Buyer profiles (town, chamber, brokerage, hospitality)
  - Proof: Big Muddy / Natchez stats
- CTA: **"Request a Deployment"** button → links to Cal.com scheduling link (NOT Stripe)
- Secondary CTA: "See it live" → links to bigmuddytouring.com
- Footer: "Powered by Measurably Better Things"
- Photography from Natchez (GCS bucket)
- No pricing page — this is proposal-based

**Read these files for content:**
- `docs/OFFER_ARCHITECTURE.md` — the full offer model
- `docs/BUSINESS_ARCHITECTURE.md` — the structure and 9 modules
- `docs/MARKET_PLAN_NATCHEZ.md` — proof points and stats

### 3. Self-serve DSD upgrade flow on `/directory`

Add upgrade CTAs to directory listing pages for self-serve businesses.

**Requirements:**
- "Upgrade to Marketing ($99/mo)" button → Stripe Payment Link (env var `STRIPE_PAYMENT_LINK_MARKETING`)
- "Upgrade to Engine ($250/mo)" button → Stripe Payment Link (env var `STRIPE_PAYMENT_LINK_ENGINE`)
- These are simple `<a href>` links to Stripe — no checkout integration needed
- Show on individual listing pages (`/directory/[slug]`) when the business is on the free tier

### 4. `/programs/[slug]` — Public Program Landing Page (Stretch)

If time permits, build the public-facing program page.

**Requirements:**
- Program name, description, sponsoring organization
- Grid of participating businesses (from `ProgramParticipant` → `DirectoryBusiness`)
- "Join this program" CTA
- Stats: X businesses participating, X listings published
- This page queries Prisma, not Sanity

## Design Constraints

- **Inline CSS only** — no Tailwind, no CSS modules, no styled-components
- Use CSS custom properties: `var(--bg)`, `var(--surface)`, `var(--text)`, `var(--accent)`
- Fonts: `var(--font-body)` for body text, `var(--font-display)` for headings
- Mobile-first responsive
- Photography-heavy — big hero images, real photos
- Natchez photos in GCS: `https://storage.googleapis.com/bmt-media-bigmuddy/`
- Dark theme for music/radio pages, light for directory/institutional

## Files to Read First

1. `docs/OFFER_ARCHITECTURE.md` — MBT offer model (for measurablybetter.life)
2. `docs/BUSINESS_ARCHITECTURE.md` — org structure, 9 modules
3. `apps/web/app/touring/page.tsx` — reference for existing page style
4. `apps/web/app/directory/page.tsx` — reference for directory page style
5. `packages/database/prisma/schema.prisma` — data models (search for "Organization", "Program", "ProgramParticipant")

## What's Already Done (Don't Rebuild)

- Prisma institutional models are migrated to production
- Webhook routes exist at `/api/webhooks/stripe`, `/api/webhooks/sanity`, `/api/radio/now-playing`
- Domain routing is updated — Cloudflare handles sub-domain redirects
- Sanity CMS is being set up (another agent) — articles will move from hardcoded to Sanity
