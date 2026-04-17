# HDI Positioning Update — 2026-04-17

*Shareable cross-agent briefing. Supersedes any earlier framing that treated DSD as a tightly-coupled Big Muddy module.*

---

## What changed

Two structural decisions on April 17:

1. **Deep South Directory (DSD) is soft-decoupled from Big Muddy.** DSD stays live at `deepsouthdirectory.com`, stops branding itself as "part of the Big Muddy family," and becomes an independent SEO + local-guide play.

2. **Big Muddy Touring now operates its own directory — separate from DSD.** The music-industry / hospitality / venue directory that feeds the touring business lives under `bigmuddytouring.com` (likely `/circuit`). This one IS part of the moat.

This is a split, not a pivot. Everything else holds.

---

## The two-directory architecture

| Dimension | **Big Muddy Touring Directory** | **Deep South Directory (DSD)** |
|---|---|---|
| URL | `bigmuddytouring.com/circuit` (TBD) | `deepsouthdirectory.com` |
| Scope | Music venues, musicians, music-adjacent hospitality, press contacts | General corridor businesses — restaurants, shops, services, any vertical |
| Editorial bar | Human-curated. Vetted relationships matter. | Mixed: AI-generated bulk + human field reports + business self-submit |
| Moat role | ✅ Part of the moat — our actual touring circuit | ❌ Not a moat — compounding SEO + local-guide asset |
| Revenue model | Publicity packages ($500 Spotlight, $2,500 Album Launch, etc.) | Self-serve tiers ($0 / $25 / $50 / $99 / $250) |
| Brand framing | Explicitly Big Muddy family. Lives inside the touring ecosystem. | Standalone. No "Powered by Measurably Better Things" footer. |
| Content engine | Chase + Tracy + musician QR onboarding + editorial team | AI bulk + Chase/Tracy/Amy field reports + business listings |
| Y1 revenue target | $3–5K/mo (publicity packages) | $1–3K/mo (passive subscriptions) |
| Content intensity | High — voice matters | Low — volume and authenticity matter, not tone-policing |

**Why split them:**
- DSD can serve audiences (random businesses, tourists searching "best coffee in vicksburg") that don't care about — and shouldn't be subjected to — the music ecosystem's branding.
- The moat story stays clean. Big Muddy still owns a magazine + radio + label + hotel + touring directory. That's unchanged.
- DSD's growth pace is no longer a dependency for Big Muddy's success. Lower stakes, lower overhead.
- Both surfaces can share infrastructure (same Prisma models, one database) but present distinct brands.

---

## DSD content model — three layers

**Layer 1 — AI bulk (the SEO floor)**
- City guides, "best of" lists, business profile starter pages
- Hands-off weekly cron, Gemini Flash drafts, no per-article review
- Job: rank for commercial corridor searches

**Layer 2 — Field reports (the personality)**
- Chase, Tracy, Amy post quick lunch/discovery notes from a phone-first tool (`/admin/dsd/spot`)
- 3 photos + one sentence + tag a business + submit
- Output: lands on the DSD listing AND drafts a DSD social post
- Voice: *"three locals who eat out a lot and have opinions"* — not Big Muddy editorial voice

**Layer 3 — Business-submitted (the revenue)**
- Self-serve tiers, Stripe checkout, listing + photos + hours + claim flow
- No walk-in sales pressure on this channel

Shared infrastructure: same `DirectoryBusiness` Prisma model with a `scope` field (`'touring'` vs `'general'`) to distinguish which directory a listing surfaces on.

---

## Social accounts — what exists and what's next

**Active (Big Muddy Inn only):**
- Instagram: https://instagram.com/thebigmuddyinnandbluesroom
- Facebook: https://facebook.com/thebigmuddyinn

**To be created (planned):**
| Handle | Voice | Content | Owner |
|---|---|---|---|
| @bigmuddytouring | Music + media umbrella. Road-worn, rock & roll. | Shows, sessions, magazine cross-posts, radio drops, records roster | Chase |
| @deepsouthdirectory | "Three locals who eat out a lot." Casual, personal. | Lunch photos, field reports, city guide posts | Shared — Chase / Tracy / Amy |

Not planned at this stage: per-brand accounts for Magazine, Radio, Records, Entertainment. They all feed `@bigmuddytouring`.

**Platform priority:**
- Instagram on all three (table stakes)
- TikTok on Touring + DSD (short-form fits both voices)
- Everything else (Threads, Bluesky, YouTube) deferred

Postiz on the Mac mini (`192.168.4.37:4007`) handles scheduling once accounts exist.

---

## Band Catalog — architecture confirmed

- Build path: borrow Mirlo's Prisma schema (AGPL-3.0), build native in Next.js
- URL: `bigmuddytouring.com/bands/[slug]` — reserve this before anything else
- ~20 dev-days (25 with buffer)
- Pre-seed strategy: relationship-driven partnerships with WWOZ, Music Export Memphis, Mississippi Arts Commission — no federation possible
- Start date target: 2–3 weeks out, after Tracy is publishing via Sanity and walk-in DSD sales are steady

Full decision doc: `docs/BAND_CATALOG_BUILD_DECISION.md`.

---

## What this doesn't change

- DSD pricing tiers ($0 / $25 / $50 / $99 / $250) — unchanged
- Schema blueprints (`PipelineContent`, `RadioPlayLog`, `SponsorPackage`, `MembershipSubscription`, `ArtistPackage`) — unchanged
- Radio phased rollout (podcast Phase 1, 24/7 Phase 2 on first sponsor) — unchanged
- Sean Davis as corridor partner for touring — unchanged
- Tracy as Editor-in-Chief of Big Muddy Magazine via Sanity — unchanged
- The Outsider Economics → Platform mapping — unchanged. DSD still maps to "Community is the Currency," just in a sibling-brand role rather than a nested module.

---

## What other agents should do with this

- **Chief of Staff:** Read this and `docs/BUSINESS_ARCHITECTURE.md` before reasoning about DSD or the Big Muddy directory. Don't conflate them.
- **Patch (Technical Director):** Any DSD-related deploy changes should scrub "Powered by Measurably Better Things" footers and Big Muddy family navigation. Big Muddy Touring's circuit directory is a separate feature — don't accidentally merge the two.
- **Delta Dawn:** When a user asks about "the directory," clarify which one. Default to the Big Muddy Touring directory for music-industry questions; default to DSD for general business questions.
- **Brand Voice agents:** DSD voice is *"three locals who eat out a lot"* — casual, first-person, not the Big Muddy editorial voice. Don't enforce Big Muddy voice rules on DSD copy.
- **Copy generation agents:** When writing for DSD, do not include "Powered by Measurably Better Things," "part of the Big Muddy network," or HDI parent-brand language.

---

*Locked 2026-04-17 by Chase + COS. Canonical reference: this doc + `docs/BUSINESS_ARCHITECTURE.md` (amended same day).*
