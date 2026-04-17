# Band Catalog — Build vs. Adopt Decision

*Locked 2026-04-17. Research delivered by Perplexity/Gemini agent. Verified by COS.*

## Decision: Path B — Borrow, don't fork

**Borrow Mirlo's Prisma schema (AGPL-3.0, TS/Prisma/Postgres/Stripe stack match), retype clean into our codebase on top of the existing `Artist` model. Build native in Next.js 14 App Router. ~20 dev-days, 25 with buffer.**

- **No fork** (Mirlo is Express + React SPA + Pug — wrong runtime).
- **No federation** at Y1 (revisit only if we ever self-host audio — probably never).
- **No audio hosting** — use SoundCloud / Bandcamp / YouTube embeds. Sidesteps DMCA, transcoding, CDN egress.
- **No third-party embed** (Funkwhale, Faircamp, PeerTube). Federation baggage, wrong brand surface.

## What the research ruled out

| Option | Verdict |
|---|---|
| Fork Mirlo (path A) | ❌ Two runtimes forever; inheriting features we'll rip out |
| Embed Funkwhale/Faircamp (path C) | ❌ Our musicians' profiles live in their UX and URLs |
| Pure custom, no reference (path D) | ⚠️ Fine but gives up ~3 days of free data-modeling Mirlo has already solved |
| Federation w/ regional networks | ❌ No open-source or API-accessible substrate exists in the corridor |

## The regional network reality

No OSS or API-accessible platform has meaningful density in Memphis → Natchez → New Orleans. The three editorial gatekeepers worth a relationship:

| Network | Why they matter | Contact |
|---|---|---|
| **WWOZ / New Orleans & Co Musician Database** | 200+ NOLA artists at launch, growing. WWOZ curators = high-value relationship. | Music director at WWOZ |
| **Music Export Memphis** | Nonprofit export office. Grantees are pre-curated touring-ready artists. They want a distribution surface for their grantees. | Elizabeth Cawein, ED |
| **Mississippi Arts Commission Artist Roster** | Juried. 3-year terms. ~13 new per fiscal year. Strong curation signal. | Leslie Barker, Performing Arts director |

**One hour on the phone with each gets us past the Y1 target of 30 profiles.** That's the real "network adoption" play — build a schema that carries badges like "Featured on WWOZ" or "MS Artist Roster FY26" and pre-seed from these rosters by relationship.

## 20-day build plan

| Work item | Days |
|---|---|
| Extend `Artist` Prisma model (bio2Sentence, influences[3], city, genre[], interests flags, moderationStatus) | 1 |
| `TrackEmbed`, `Photo`, `VideoEmbed` models + R2 upload handler | 2 |
| Public profile page `/bands/[slug]` with embed rendering (react-player / lite-youtube) | 2 |
| 5-step profile builder wizard (autosaves) | 3 |
| QR onboarding — magic-link email → pre-filled wizard with band slug reserved | 2 |
| Admin moderation queue (reuse existing admin pattern) | 1 |
| Discovery page — filter by city / genre / tag / interest flag | 2 |
| Stripe publicity packages (3 products w/ `metadata.packageType`) | 2 |
| Search — Postgres full-text, no Algolia | 1 |
| Seed first 10 profiles manually from MAC + MEM rosters | 1 |
| Moderation policy + ToS + DMCA template | 1 |
| QA + polish + deploy | 2 |
| **Total** | **20 (25 with buffer)** |

## Irreversible decisions to make FIRST

1. **URL structure:** `/bands/[slug]` (mirrors existing `/artists/[slug]` pattern from Records, but differentiates catalog from label roster). Lock before anything else — can't cheaply migrate later.
2. **Slug reservation strategy:** when a band fills out the QR wizard, reserve slug at intake (not at publish). Abandoned profiles hold the slug for 30 days then release.
3. **Moderation default:** every profile enters `moderationStatus: pending`. No public surface until Chase or Tracy approves.

## What this does NOT do

- Stream audio (intentional)
- Support federation / ActivityPub (intentional)
- Host video (embeds only)
- Compete with Bandcamp or Spotify (positioning: Delta-corridor curated catalog, not a streaming service)

## When we build it

**Not this sprint.** Current ships that need landing first:
- Touring homepage rebuild with real photos (in flight today)
- Tracy + Amy Sanity onboarding (in flight)
- Patch's doc-currency + security fixes (token rotation, disk, pptx upload)
- Delta Dawn article-drafting test with Smoots Groceries

**Target start:** after Tracy has published her first Sanity article and walk-in DSD sales are live. ~2-3 weeks from today. That gives this build a clean 5-6 week runway to ship by end of Q2.

## Pre-seeding action (can happen NOW in parallel)

Draft the three relationship emails this week — they're independent of the build and unlock Y1 profile target before we even start coding.

- **Subject template:** "Delta-corridor musician catalog — would love to feature your roster first"
- **Pitch core:** "Free forever for artists. Curated, not aggregated. Goes live on bigmuddytouring.com. We want your rostered artists featured before anyone else's."
- Send date target: this week (week of April 20)

## Source

Research delivered 2026-04-17 by external agent. Full report covered 15+ OSS candidates (Mirlo, Funkwhale, Castopod, Navidrome, Plume, PeerTube, Mastodon, Faircamp, jam.coop, Ampled, OurSpace, TribeNest, Rauversion, Ampwall, Bandwagon, Subvert, Jamcamp). Mirlo wins decisively on stack-match; Rauversion secondary reference for event/ticket patterns.
