# MelodyVault Features → Big Muddy Records Integration
> Mapping MelodyVault's music monetization platform features into the BMR tech stack

## Source
PDF: `/Users/chasethis/Downloads/MelodyVault.pdf` (10 slides)
Tagline: "Monetize Your Music, Your Way"

## Core Features to Build

### 1. AI Track Analysis & Metadata
**MelodyVault**: Upload track → auto-detect genre, mood, BPM, key. Sync suggestions, trending insights, audience analysis.
**BMR Implementation**:
- Track upload endpoint (`POST /api/tracks/upload`)
- Audio analysis pipeline using `essentia.js` or Spotify Audio Features API
- Auto-tag: genre, mood (uplifting/melancholic/energetic/chill/intense/warm), BPM, musical key
- Sync match scoring against open SyncOpportunity records
- Prisma model: `Track.aiAnalysis` (JSON field)
- Dashboard: `/records/dashboard/tracks/[id]` — analysis results display

### 2. Catalog Management
**MelodyVault**: Organize and optimize existing releases, "Catalog Refresh" tier.
**BMR Implementation**:
- Track listing with filters (genre, mood, status, artist)
- Metadata editor — ISRC, ISWC, credits, lyrics
- Bulk operations: update genre tags, add missing metadata
- Optimization score per track (metadata completeness %)
- Prisma model: `Track` with full metadata fields
- Dashboard: `/records/dashboard/catalog`

### 3. Sync Marketplace
**MelodyVault**: Browse sync licensing opportunities (film, TV, ads, games). Filter by genre/mood. $1,500-$5,000 buyout budgets.
**BMR Implementation**:
- `SyncOpportunity` model with project type, genre, mood, budget, deadline
- Artist-facing marketplace: `/records/sync` — browse open opportunities
- One-click submission per track
- Status tracking: submitted → shortlisted → selected → rejected
- Admin: create/manage opportunities from incoming briefs
- API: `GET /api/sync` (list), `POST /api/sync/submit` (artist submission)

### 4. Splits Ledger
**MelodyVault**: Track songwriter/producer splits per song. ISWC codes, audit trail, contributor management.
**BMR Implementation**:
- `Split` model linked to Track and optionally to Artist
- Percentage validation (must sum to 100%)
- Roles: songwriter, producer, performer, engineer, featured
- Audit trail via `createdAt`/`updatedAt`
- Visual split bar (like MelodyVault's pink progress bar)
- Dashboard: `/records/dashboard/tracks/[id]/splits`

### 5. Automated PRO Rights Management
**MelodyVault**: Auto-register songs with ASCAP, BMI, SESAC. Real-time registration status. Work ID traceability.
**BMR Implementation**:
- `PRORegistration` model per track per PRO
- Status pipeline: pending → processing → registered → error
- Work ID assignment and tracking
- Admin bulk registration tool
- Dashboard: `/records/dashboard/rights`
- **Phase 1**: Manual tracking with status updates
- **Phase 2**: API integration with PRO systems (ASCAP has an API)

### 6. Royalty Tracking & Distribution
**MelodyVault**: Revenue dashboard, split-based payouts, multi-source tracking.
**BMR Implementation**:
- `RoyaltyPayment` model: per-track, per-source, per-period
- Sources: Spotify, Apple Music, YouTube, sync, merch, direct sales
- Auto-calculate split distributions based on `Split` records
- Quarterly payout pipeline → Stripe Connect (already built!)
- Dashboard: `/records/dashboard/royalties`
- Artist-facing: `/records/dashboard/earnings` — total earnings, by track, by source

### 7. Data-Driven Optimization Pipeline
**MelodyVault**: Audit → Strategy → Optimize → Launch → Track
**BMR Implementation**:
- Maps directly to band onboarding flow (`/records/artists/onboard`)
- **Audit**: Auto-research (social scan, music scan, press scan)
- **Strategy**: AI-generated content calendar + release strategy
- **Optimize**: Metadata optimization, playlist pitch prep
- **Launch**: Coordinated release across platforms + Radio Big Muddy feature
- **Track**: Analytics dashboard with streaming numbers, social growth, revenue

## Tiered Packages (MelodyVault → BMR mapping)

| MelodyVault | BMR Equivalent | Price |
|---|---|---|
| Catalog Refresh | Front Porch | $100/mo |
| New Release Maximizer | The Route | $250/mo |
| Complete Overhaul | Blues Room | $500/mo |

## Implementation Priority

1. **Track model + upload** (Prisma migration + API) — needed for everything else
2. **Splits Ledger** — core to "artists own their masters" promise
3. **Catalog dashboard** — track listing, metadata editor, analysis display
4. **PRO Registration tracking** — manual first, then auto
5. **Sync Marketplace** — requires critical mass of tracks first
6. **Royalty tracking** — needs real revenue data flowing
7. **AI analysis pipeline** — can use Claude/Gemini for initial analysis

## Architecture Notes
- All models added to `packages/database/prisma/schema.prisma`
- Track audio files stored in GCS/R2 (same bucket as other media)
- AI analysis runs as background job (queue system TBD)
- Stripe Connect already built for directory — reuse for artist payouts
- Artist dashboard at `/records/dashboard` extends existing admin patterns
