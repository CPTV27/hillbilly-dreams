# Data Handoff Protocol — All Agents

**Owner:** Data Scientist Agent (DS)
**Updated:** 2026-03-26
**Purpose:** When you discover, generate, or receive data that belongs in the Deep South Data Platform, this tells you exactly where to put it.

---

## The Rule

If you encounter structured data about **businesses, people, places, economics, metrics, or content** in the Deep South corridor — don't hold it. Route it to the database via the APIs below, or stage it for the Data Scientist Agent to ingest.

---

## Quick Reference: Where Data Goes

| Data Type | Destination | How to Send |
|---|---|---|
| **New business listing** | `DirectoryBusiness` table | `POST /api/directory/submit` with name, category, city, state, description, contactName, contactEmail |
| **Business enrichment** (phone, address, hours, ratings) | `DirectoryBusiness` table | `POST /api/directory/enrich` with `{ businessId }` — triggers Google Places lookup |
| **Any metric** (subscribers, occupancy, revenue, followers) | `Metric` + `MetricSnapshot` tables | `POST /api/metrics` with `[{ key, value, source }]` — this now writes time-series history automatically |
| **Content for search indexing** (articles, transcripts, notes) | `Embedding` table (pgvector) | `POST /api/embeddings/index` with `{ entityType, entityId }` or `{ reindexAll: true }` |
| **Census/economic data requests** | `CensusData` / `EconomicIndicator` | `POST /api/cron/sync-census` — syncs all 14 corridor counties |
| **Data you can't route yourself** | Staging file | Write to `/packages/database/staging/` as JSON — DS agent will ingest it |

---

## Business Data Format

When you discover a business (from research, user conversation, web scraping, Google Drive docs, etc.), save it as:

```json
{
  "name": "Business Name",
  "category": "Food & Drink | Lodging | Arts & Culture | Retail | Services",
  "city": "Natchez",
  "state": "MS",
  "description": "2-3 sentences about what makes this place real.",
  "contactName": "Owner or manager name (or email if unknown)",
  "contactEmail": "contact@business.com",
  "website": "https://...",
  "phone": "601-555-1234",
  "address": "123 Main St",
  "toolsOrigin": "QuickBooks + Square | Excel + pen | Google Workspace | Nothing yet",
  "softwareSpend": "Under $100/mo | $100-$500/mo | $500-$1,000/mo | Over $1,000/mo"
}
```

**If you can POST to the API**, send it to `POST /api/directory/submit`. The system will:
1. Generate a slug automatically
2. Generate an AI editorial spotlight
3. Queue Google Places enrichment
4. Queue vector embedding
5. Notify ops via ntfy

**If you can't POST**, write the JSON to `/packages/database/staging/{city}-{date}.json` as an array.

---

## Metric Data Format

Any number Chase mentions — subscribers, revenue, occupancy rate, follower count, page views — is a metric. Send it immediately:

```json
POST /api/metrics
[
  { "key": "newsletter_subscribers", "value": 1234, "source": "beehiiv" },
  { "key": "inn_occupancy_rate", "value": 0.72, "unit": "%", "source": "cloudbeds" },
  { "key": "spotify_monthly_listeners", "value": 450, "source": "spotify" }
]
```

**Key naming convention:** `snake_case`, descriptive. Examples:
- `newsletter_subscribers`, `newsletter_open_rate`
- `inn_occupancy_rate`, `inn_revenue_monthly`
- `directory_listings_total`, `directory_paid_clients`
- `website_monthly_visitors`, `website_bounce_rate`
- `spotify_monthly_listeners`, `youtube_subscribers`
- `social_instagram_followers`, `social_twitter_followers`

Every metric POST now automatically creates a time-series snapshot. No data is ever lost.

---

## Content Worth Indexing

If you produce or discover any of these, flag it for embedding:

- **Articles** written for Big Muddy Magazine / Outsider Economics
- **Transcripts** from Blues Room sessions, artist interviews, meetings
- **Research notes** about corridor cities, industries, or culture
- **Business descriptions** longer than 50 characters

The embedding pipeline will chunk it, embed it via Vertex AI, and make it searchable.

---

## Corridor Geography

The Data Platform tracks these areas. If you're working with data from any of these, it belongs in the system:

**Mississippi:** Natchez, Vicksburg, Clarksdale, Oxford, Tupelo, Greenville, Ocean Springs, Jackson, Hattiesburg, Meridian

**Neighboring states:** Memphis TN, New Orleans LA, Mobile AL, Shreveport LA, Little Rock AR

**Counties (FIPS):** Adams 28001, Coahoma 28011, DeSoto 28033, Forrest 28035, Harrison 28047, Hinds 28049, Lafayette 28071, Lee 28081, Lowndes 28087, Warren 28149, Washington 28151, Yazoo 28163, Orleans Parish 22071, Shelby 47157

---

## Data Health Check

To see what's in the system and what's missing:

```
GET /api/data/health
```

Returns: business counts, enrichment rates, embedding counts, Census/BLS coverage, queue status.

---

## Staging Directory

If you can't hit an API endpoint directly, write structured data to:

```
/packages/database/staging/
```

Use this naming convention:
- `businesses-{city}-{date}.json` — array of business objects
- `metrics-{source}-{date}.json` — array of metric objects
- `notes-{topic}-{date}.json` — freeform text for embedding

The Data Scientist Agent will pick these up and ingest them.

---

## What NOT to Do

- **Don't store data only in memory files** — memory is for agent behavior, not structured data
- **Don't save business data to Google Drive or Apple Notes** — it gets lost. Route it here.
- **Don't create your own database tables** — check with DS agent first
- **Don't guess FIPS codes or coordinates** — the enrichment pipeline will geocode via Google Places
- **Don't skip the description** — the embedding pipeline needs text to work with

---

## Agent-Specific Notes

### Voice Agent (Arri / Content)
- When you research a venue or business for content, submit it to the directory too
- Transcripts from radio shows and interviews → flag for embedding
- Listener metrics → POST to /api/metrics with source "radio" or "podcast"

### Frontend Design Agent
- When building UI for the directory, query `DirectoryBusiness` — it now has lat/lng, ratings, hours, photos
- Vector search is at `GET /api/search?q=...` — use it for "smart search" UI
- Economic data is at `GET /api/data/census?geo=county&fips=28001` (once synced)

### Build Agent (CC)
- Schema is authoritative at `packages/database/prisma/schema.prisma`
- Don't modify data models without DS agent review
- All new API routes that touch data should follow the patterns in `/api/directory/enrich` and `/api/cron/process-enrichment-queue`

---

*This document is the single source of truth for where data goes. If you're unsure, stage it as JSON in `/packages/database/staging/` and the DS agent will handle it.*
