# Ledger → Huck Handoff: Data Platform Questions + Tasks

**From:** Ledger (Data Scientist Agent)
**To:** Huck (Build Agent)
**Date:** 2026-03-26
**Re:** Deep South Data Platform — Phase 1-3 just shipped, need your help wiring things up

---

## What I Built (already committed to main)

Commit `5d65329` — "feat: Deep South Data Platform — Phase 1-3 foundation"
Commit `9325831` — "feat: agent data handoff prompts + staging directory"

**Schema changes (live on Neon):**
- DirectoryBusiness upgraded with 18 new fields (slug, state, lat/lng, phone, address, Google/Yelp ratings, hours, photos, clientId)
- 5 new tables: MetricSnapshot, Embedding, CensusData, EconomicIndicator, EnrichmentJob
- pgvector extension enabled, IVFFlat cosine index created
- 19 Natchez businesses seeded with slugs

**New services:** vertex-embeddings.ts, embedding-pipeline.ts, vector-search.ts, google-places.ts, census-api.ts, bls-api.ts

**New endpoints:** GET /api/search, POST /api/directory/enrich, POST /api/embeddings/index, GET /api/data/health, POST /api/cron/process-enrichment-queue, POST /api/cron/sync-census

**Updated endpoints:** POST /api/directory/submit (now writes to DB), POST /api/metrics (now writes MetricSnapshot)

---

## Questions for Huck

### 1. Environment Variables
I need these set in the Vercel/deployment environment. Which are already configured?

- `GOOGLE_MAPS_API_KEY` — needed for Google Places enrichment. Is there one in the GCP project `bigmuddy-ff651`? The Places API (New) needs to be enabled in the GCP console.
- `BLS_API_KEY` — free registration at https://data.bls.gov/registrationEngine/. Is this already set up?
- `VERTEX_PROJECT_ID` — I default to `bigmuddy-ff651`. Is that still correct?
- `VERTEX_LOCATION` — I default to `us-east4`. Correct?

### 2. Google Chat Bot Webhook
I see the Google Chat API is configured at `https://hillbillydreamsinc.com/api/gchat/bot`.

- What does this bot do currently?
- Can I hook into it to send data platform alerts (e.g., "19 new businesses discovered in Vicksburg" or "Census data synced for 14 counties")?
- Or should I keep using ntfy for ops notifications?

### 3. Cron Setup
I built these cron endpoints but they need to be scheduled:

| Endpoint | Frequency | Purpose |
|---|---|---|
| `POST /api/cron/process-enrichment-queue` | Every 5 min | Process pending enrichment jobs |
| `POST /api/cron/enrich-directory` | Weekly | Re-enrich stale business data |
| `POST /api/cron/sync-census` | Annually (Jan) | Census ACS data refresh |
| `POST /api/cron/sync-bls` | Monthly | BLS employment data refresh |

Are you using Vercel Cron (`vercel.json`) or Cloud Scheduler? What's the pattern for existing crons?

### 4. Directory API Discrepancy
The existing `GET /api/directory` reads from the **Client** table, not **DirectoryBusiness**. My new submission flow writes to DirectoryBusiness. These are separate tables with no FK between them (except the new `clientId` I added on DirectoryBusiness for the promotion path).

**Question:** Should I:
- (a) Add a parallel `GET /api/directory/listings` endpoint that reads from DirectoryBusiness (the free directory), keeping the existing Client-based endpoint for paid clients?
- (b) Merge the two — make `/api/directory` read from both tables with a union?
- (c) Something else?

### 5. Auth for Admin Endpoints
These endpoints should be admin-only:
- `POST /api/directory/enrich`
- `POST /api/embeddings/index`
- `POST /api/cron/*` (all cron routes)

What auth pattern do you use? I see no auth middleware on the existing cron routes. Is there a shared secret, API key header, or Vercel Cron signature check?

### 6. Existing Ingestion Pipelines
I see these existing ingestion routes:
- `/api/ingestion/google` — Google Calendar + Drive
- `/api/ingestion/quickbooks` — P&L, margins

These pipelines calculate metrics but don't write MetricSnapshots. Should I update them to also insert MetricSnapshot rows (same pattern I added to `/api/metrics`)?

### 7. The `/api/directory/[slug]` Route
This exists but I haven't read it. Does it read from Client or DirectoryBusiness? Now that DirectoryBusiness has a `slug` field, this route should serve directory detail pages.

### 8. Vercel Build
Does the project build cleanly with the new Prisma `previewFeatures = ["postgresqlExtensions"]`? The `Unsupported("vector(768)")` type on the Embedding model means Prisma will skip that column in the generated client — all vector operations use raw SQL. But I want to make sure the build doesn't error.

---

## Tasks I Need Huck to Do

### Priority 1 (Unblocks everything)
1. **Set `GOOGLE_MAPS_API_KEY`** in Vercel env vars (and enable Places API New in GCP console)
2. **Verify build passes** with the new schema (`npx prisma generate` + `next build`)
3. **Set up cron schedule** for `/api/cron/process-enrichment-queue` (every 5 min)

### Priority 2 (Activates the data platform)
4. **Run Census sync:** `POST /api/cron/sync-census` with `{ "year": 2023 }` — populates economic data for all 14 corridor counties
5. **Run embedding reindex:** `POST /api/embeddings/index` with `{ "reindexAll": true }` — indexes all 19 businesses into pgvector for semantic search
6. **Test search:** `GET /api/search?q=barbecue+natchez&type=directory_business` — should return Pig Out Inn

### Priority 3 (Polish)
7. **Resolve directory API discrepancy** (question 4 above)
8. **Add auth to admin endpoints** (question 5 above)
9. **Update ingestion pipelines** to write MetricSnapshots (question 6 above)

---

## File Manifest (what I created/modified)

**New files:**
- `apps/web/lib/vertex-embeddings.ts`
- `apps/web/lib/embedding-pipeline.ts`
- `apps/web/lib/vector-search.ts`
- `apps/web/lib/google-places.ts`
- `apps/web/lib/census-api.ts`
- `apps/web/lib/bls-api.ts`
- `apps/web/app/api/search/route.ts`
- `apps/web/app/api/directory/enrich/route.ts`
- `apps/web/app/api/embeddings/index/route.ts`
- `apps/web/app/api/data/health/route.ts`
- `apps/web/app/api/cron/process-enrichment-queue/route.ts`
- `apps/web/app/api/cron/sync-census/route.ts`
- `.claude/agents/DATA_HANDOFF_PROMPT.md`
- `.claude/agents/FRONTEND_DATA_PROMPT.md`
- `packages/database/staging/.gitkeep`

**Modified files:**
- `packages/database/prisma/schema.prisma` — 6 model changes
- `packages/database/scripts/seed-directory-natchez.ts` — slug + state support
- `apps/web/app/api/directory/submit/route.ts` — now writes to DB
- `apps/web/app/api/metrics/route.ts` — now writes MetricSnapshot

---

*Ledger out. The foundation is poured. Need Huck to wire the plumbing.*
