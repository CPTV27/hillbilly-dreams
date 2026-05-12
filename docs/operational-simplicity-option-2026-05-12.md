# Operational Simplicity — A Strategic Option

**Date:** 2026-05-12
**Status:** Documented as an option. Not committed. One of several paths.
**Companions:**
- `docs/first-principles-strategy-2026-05-12.md` — the strategic frame (Job One focus)
- `docs/off-the-shelf-ecosystem-analysis-2026-05-12.md` — the per-service SaaS analysis
- `docs/infrastructure-cost-analysis-2026-05-11.md` — current state baseline
- Memory: `feedback_drop_mbt_brand.md` — the brand decision this option lives under

---

## The premise

After dropping MBT as a brand and collapsing to two umbrellas (Big Muddy Touring + Big Muddy Inn), the question on the table is: **what's the easiest system to operate that covers the full surface area?**

This document lays out the easiest-operational-system option in concrete detail. It is one of several paths — the others being hybrid (keep some custom infrastructure for Job One cost savings) or status quo (continue running the existing custom platform).

Not taking a position here. The option goes on the menu.

---

## The principle

**One platform per function. Off-the-shelf wherever possible. No custom code unless absolutely required. Each piece is something Tracy or Amy could learn in an afternoon.**

Optimizing for: **operational simplicity > dollar savings > flexibility > differentiation.**

---

## The stack

### Public-facing brand surfaces

| Brand | Tool | Notes |
|---|---|---|
| **Big Muddy Touring** (bigmuddytouring.com) | Squarespace Business | One main site. Sections for tour calendar, the route, artist roster, contact. |
| **Big Muddy Inn** (within the BMT site, or separate) | Squarespace + Cloudbeds embed | Cloudbeds booking widget on the page. Past-guest emails via Klaviyo. |
| **Big Muddy Magazine** | Beehiiv newsletter | Standalone newsletter with archive pages. Embed latest posts on the BMT site. |
| **Big Muddy Records** | A /records page on BMT site + DistroKid + Spotify for Artists | DistroKid Label for distribution. Linkfire or Hypeddit for release-marketing landing pages. No custom platform. |
| **Big Muddy Radio** | Curated Spotify playlists embedded on the BMT site | No 24/7 stream. If/when audience justifies it, optional Mixcloud or Live365 upgrade — Y2+ decision. |
| **Big Muddy Directory** | Airtable database + embedded view on the BMT site | The 67-room corridor scout map runs as an Airtable. Public view filterable + sortable. |

### Operational systems

| Function | Tool | Why this one |
|---|---|---|
| Inn property management | **Cloudbeds** | Already in place. Already working. No change. |
| Show ticketing | **Eventbrite** | Standard for one-off events. Per-ticket fees, no monthly. |
| Email marketing | **Klaviyo** (or Loops / Mailchimp) | Past-guest sequences, welcome flows, win-back. Industry standard for hospitality. |
| Social scheduling | **Buffer Essentials** | Cross-posts to Instagram, Facebook, LinkedIn, X, TikTok. Simple. |
| Commerce (merch + record sales) | **Shopify Lite** OR **Stripe Payment Links** | Lite is $9/mo; Payment Links are free + per-transaction. Pick based on inventory complexity. |
| Analytics | **Google Analytics 4** (free) + native platform analytics | GA4 for web; Spotify / Eventbrite / Cloudbeds report natively. |
| Live streaming (if needed) | **Restream** | Already in the Studio C bucket. Multi-stream a show to YouTube + FB Live. |
| Podcast hosting (if Buzzsprout retained) | **Buzzsprout** OR **Spotify for Podcasters** (free) | Already paying Buzzsprout; could downgrade to Spotify free. |

### Internal coordination

| Function | Tool | Notes |
|---|---|---|
| Project / task management | **Asana** (free tier) | Already in use. Stay on free tier; the partner Asana setup is working. |
| Documents + Drive | **Google Workspace Ultra** | Already in place. Master identity. |
| Design + collateral | **Canva Teams** + **Adobe** + **CapCut** | Already in place via Studio C bucket. No change. |
| Secrets / credentials | **Bitwarden Family** | Already in place. Canonical per CLAUDE.md. |
| Code (for the small bits that survive) | **GitHub Pro / Team** | Lighter usage; the small Directory bit if it stays custom. |
| Communication | iMessage + email + Asana comments | No new chat tool. |

### What's eliminated under this option

| Today | Status under this option |
|---|---|
| Multi-tenant Next.js app on Vercel | Eliminated. Replaced by Squarespace. |
| Sanity CMS | Eliminated. Magazine on Beehiiv; brand pages on Squarespace. |
| Neon Postgres | Eliminated. No app DB to feed. |
| Hetzner production server | Eliminated. Or downgrade to a minimal box only for the Directory if that stays custom. |
| DigitalOcean droplet (AzuraCast 24/7 radio) | Eliminated. Radio is Spotify playlists. |
| ElevenLabs voice | Eliminated. Delta Dawn voice goes to GCP TTS Journey or away entirely. |
| Resend transactional email | Eliminated or replaced with cheaper tier. |
| Custom Directory module | Eliminated. Airtable replaces it. |
| Custom Commerce module | Eliminated. Shopify or Stripe Payment Links. |
| Custom AI Content Pipeline (`lib/ai-models.ts`) | Eliminated. Per-platform AI features (Buffer AI, Canva AI). |
| Sentry observability | Eliminated. SaaS bills aren't observable; vendor SLAs cover it. |
| The whole `apps/web` codebase | Eliminated or frozen as historical reference. |
| `measurablybetter.life` domain | Retired or 301 to bigmuddytouring.com. |
| `apps/web/app/measurably-better/*` routes | Killed (consistent with brand decision). |
| Multi-tenant routing for studio-c, tuthill, dctv | Studio C and Tuthill get their own SaaS sites if they want them. DCTV TBC. |

---

## The monthly cost

### Big Muddy Touring side (not Inn-side)

| Line | Monthly |
|---|---|
| Squarespace Business — Touring | $23 |
| Beehiiv Grow tier (Magazine) | $49 |
| Airtable Pro (Directory) | $24 |
| DistroKid Label | $12 |
| Hypeddit (Records marketing) | $20 |
| Klaviyo (email marketing) | $45 |
| Buffer Essentials (social) | $15 |
| Eventbrite | $0 + per-ticket fees |
| Shopify Lite (commerce, if needed) | $9 |
| Google Workspace Ultra | $35 |
| Bitwarden Family | $3 |
| Spotify Family | $17 |
| Claude Pro × 3 (Chase, Tracy, Amy) | $165 |
| Adobe CC + Photography (Studio C bucket) | $70 |
| Canva Teams (5 seats) | $30 |
| CapCut Team (3 seats) | $50 |
| Restream | $30 |
| GitHub Pro (minimal use) | $4 |
| Sentry free tier | $0 |
| **BMT-side monthly** | **~$601** |

### Inn-side (unchanged, separate from BMT)

| Line | Monthly |
|---|---|
| Cloudbeds | $300–500 |
| Twilio SMS | $10 |
| Squarespace (if Inn has its own page) | $23 (or $0 if folded into BMT site) |
| **Inn-side monthly** | **~$310–533** |

### Compared to today

| Bucket | Today | This option |
|---|---|---|
| MBT software + infrastructure (BMT-side) | $740–1,005 | **~$601** |
| Difference per month | — | **−$139 to −$404** |
| Difference per year | — | **−$1,670 to −$4,850** |

The pure-dollar savings are similar to the broader off-the-shelf analysis: $1,700–5,000/yr. Modest.

**The bigger saving is labor:** estimated 5–10 hrs/week of Chase's platform-engineering time eliminated. That time becomes available for photography (revenue line), partner relationships, or simply quality of life.

---

## What this looks like for the team

**Tracy:**
- Cloudbeds dashboard (unchanged)
- Klaviyo for past-guest emails (new tool, easy to learn)
- Maybe edit Squarespace pages for Inn updates (very easy)
- Asana for task coordination (unchanged)

**Amy:**
- Cloudbeds for Inn operations (unchanged)
- Beehiiv to publish Magazine pieces if she's the writer
- Spotify for Artists for her music releases (already exists)
- Maybe edit Squarespace pages for show announcements
- DistroKid Label for releases via Big Muddy Records (already happening)

**Chase:**
- Squarespace administration (basic, low-maintenance)
- Photography work (the freed time)
- DistroKid + Hypeddit for Records marketing
- Klaviyo audience strategy
- Asana for coordination

**Elijah + Miles (Studio C):**
- Adobe CC + CapCut (unchanged)
- Restream for show streaming (unchanged)
- Tuthill Design tools (unchanged on Tuthill's side)

**Sean Davis (if partnership advances):**
- Eventbrite for Arcade tickets
- Asana for show coordination
- The Squarespace site is read-only for Sean unless we give him editor access

**Total tools any partner needs to know:** maybe 6–8 SaaS platforms. All have onboarding and YouTube tutorials. No proprietary anything.

---

## The simplicity picture

### Today
- 14 active domains
- 5 multi-tenant route groups in one Next.js app
- Sanity CMS workflows
- Hetzner box running Immich + Caddy
- DigitalOcean droplet running AzuraCast
- Custom AI routing in `lib/ai-models.ts`
- Custom Directory module
- Custom Commerce module
- Several open infrastructure action items (SSL fix, Cloud SQL audit, Gemini key cleanup)
- Chase as primary operator + maintainer

### Under this option
- 2–3 active domains (bigmuddytouring.com + bigmuddyinn.com → maybe folded together)
- 1 Squarespace site
- 1 Cloudbeds account
- 1 Airtable workspace
- 1 Beehiiv newsletter
- 1 Klaviyo account
- 1 Eventbrite organizer
- 1 Buffer account
- 1 DistroKid Label
- Asana for coordination

**Cognitive load: dramatically lower. Surface area: ~70% smaller. Maintenance: near-zero.**

---

## What we lose

1. **Differentiated brand experience.** Squarespace sites have a template feel even when customized. Today's custom platform has more brand control.
2. **Cross-brand data integration.** Each SaaS keeps its own data. The magazine doesn't auto-share subscriber data with the directory; the radio listener counts don't auto-roll up to the touring P&L.
3. **The Directory as a uniquely BMT-branded asset.** As an Airtable embed, it's still searchable and useful but reads as "embedded database" not "purpose-built scout map."
4. **Some flexibility on bespoke features.** If we wanted a custom multi-party split flow for show settlements, we'd have to build it. SaaS commerce tools don't natively support 3-way splits.
5. **The 14-domain portfolio.** Most domains stay registered but most don't have active sites. Just bigmuddytouring.com and (maybe) bigmuddyinn.com.
6. **The investment already made in the custom platform.** Sunk cost is sunk, but the platform represents real engineering work that doesn't go anywhere new.
7. **Optionality to productize the platform later** (Job Two, already dropped — but this confirms it).

## What we gain

1. **5–10 hrs/week of Chase's time.** The single biggest win. That time goes to photography (revenue), partner work, or quality of life.
2. **~$1,700–5,000/yr in direct cost savings.** Modest but real.
3. **Predictable monthly bills.** Each SaaS has a clear price and an upgrade path. No "what's the actual GCP bill this month" questions.
4. **No infrastructure debt.** Vercel, Sanity, Neon, Hetzner, DigitalOcean — each is a thing that can break, fall behind, or surprise us. SaaS is the vendor's problem.
5. **Easy onboarding for new operators.** Sean Davis, future Hospitality Coordinator, future hires — they use tools they already know or can learn fast.
6. **Easy handoff / exit.** If any partner steps back, the operation is hand-offable. Custom platforms aren't.
7. **Fewer simultaneous decisions.** No "should we upgrade Sanity / migrate to Neon Scale / fix the AzuraCast SSL / audit Cloud SQL" running in parallel.

---

## Migration path (if this option were chosen)

A 90-day, three-phase migration. Each phase produces value independently; you can stop at any phase.

### Phase 1 — Week 1–2: Strip and pause
- Stop new development on the custom platform.
- Freeze the radio audio stack (already in motion per the radio go/no-go memo).
- Cancel the easy-tier subscriptions per the cost reduction sweep (already in Asana).
- Audit Canva seats. Audit Cloud SQL. Audit ChatGPT API.

**End of Phase 1:** ~$150/mo cost reduced; one operational stack (radio) frozen.

### Phase 2 — Week 3–6: Pilot one SaaS replacement
- Move Big Muddy Magazine to Beehiiv. Migrate existing content (probably <20 pieces). Test for 30 days.
- Stand up Klaviyo for past-guest emails. Import past Cloudbeds guest list. Run a single welcome sequence.
- Measure: Magazine cadence, reader engagement, SEO impact, Chase's time spent. Compare to today.

**End of Phase 2:** One major brand surface migrated. Real data on whether SaaS works for us. Decision point: continue migration or revert.

### Phase 3 — Week 7–12: Complete the migration (if Phase 2 went well)
- Stand up Squarespace site at bigmuddytouring.com. Migrate content from Next.js app. Set up redirects.
- Move Directory to Airtable. Public-facing embed on BMT site.
- Move ticketing to Eventbrite. Run next 2 Inn shows through it.
- Move Records marketing to Hypeddit + DistroKid (already happening on the distribution side).
- Switch social to Buffer.
- Move commerce to Stripe Payment Links + Shopify Lite if needed.

**End of Phase 3:** Full migration complete. Custom platform decommissioned or frozen as historical reference. Cost savings + labor savings fully realized.

### What happens to the custom platform code?
- Repo stays in GitHub as historical reference. No deletes.
- Vercel deployment paused (not deleted).
- Domains stay registered.
- Hetzner can be downgraded or paused.
- If we ever want to come back to custom, it's still there.

---

## Open questions if this option is on the menu

1. **Legal entity name.** Still relevant: MBT LLC formation is in motion. The MBT brand is dropped, but the legal entity decision is separate. Confirm with Tracy + counsel.
2. **DSD (Deep South Directory) — what happens?** Currently a sibling brand to MBT. If MBT is gone, does DSD remain as a standalone SEO asset, get folded into Big Muddy Touring's Directory, or retire?
3. **Studio C and Tuthill tenants.** They live as multi-tenant routes today. Under this option, they each get their own Squarespace or stay on whatever they want. Partner-business decision, not BMT decision.
4. **The Big Muddy Inn website.** Does it live as a section of bigmuddytouring.com (single site, two umbrellas, one URL) or as its own Squarespace at bigmuddyinn.com? Either works.
5. **The directory — keep custom or fully Airtable?** The current `/circuit/venues` page is a genuinely nice piece of work. If we kept ONE thing custom, this would be the candidate. Worth a separate decision.
6. **What about the existing PDFs and partner docs that reference MBT and the Glass Engine?** Already flagged in the brand-drop memory. They need updates regardless of which option you pick on infrastructure.

---

## Alternative options for comparison

This option sits alongside:

**Option B — Hybrid:** Keep the Directory custom (Job One cost-saver + real moat), off-the-shelf everything else. Saves ~$100/mo on infrastructure relative to this option, but adds back ~3 hrs/week of Chase's maintenance time. Worth it if you want to preserve one unique asset.

**Option C — Status quo:** Continue the custom platform. Job One framing internally. ~$700–1,000/mo + 5–10 hrs/week of Chase's labor indefinitely. Real cost; preserves maximum flexibility.

**This option (A) — Operational simplicity:** Everything off-the-shelf. Maximum labor savings. Some loss of unique-asset differentiation. Easiest to operate, easiest to hand off, easiest to onboard new partners into.

The three options are real choices, not a recommended path. The right call depends on how much Chase values the freed labor time, how much he values preserving the Directory as a moat, and how much risk tolerance he has for "what if we want a custom feature later."

---

## What this document is for

A complete picture of one strategic option, captured so it can sit alongside the others on the menu. Not a recommendation. Not a commitment.

If Chase eventually chooses this option, the migration path in this document is the starting point. If Chase chooses a different option, this document still serves as a sanity check on "what does the simplest version look like?" — useful for context regardless.

— Chase, May 2026
