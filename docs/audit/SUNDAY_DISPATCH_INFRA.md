# Sunday dispatch — infra checks (2026-04-05)

## Production domains (curl, follow redirects)

| Domain | Result |
|--------|--------|
| bigmuddytouring.com | 200 |
| bigmuddymagazine.com | 200 |
| bigmuddyradio.com | 200 |
| bigmuddyentertainment.com | 200 |
| bigmuddyrecordlabel.com | 200 |
| deepsouthdirectory.com | 200 |
| outsidereconomics.com | 200 |
| hillbillydreamsinc.com | 200 |
| tuthilldesign.com | 200 |
| studiocvideo.com | **FAIL** — DNS resolution failed from dev network (known; not HDI DNS per dispatch) |
| bearsvillemediagroup.com | 200 |
| bearsvillemedia.com | 200 |
| measurablybetter.life | 200 |
| buycurious.art | 200 |

**Pass:** 13 of 14 (excluding studiocvideo.com).

## Cloudbeds sync (`GET /api/cron/cloudbeds-sync`)

- **Env:** `CLOUDBEDS_API_KEY` (required), `CLOUDBEDS_PROPERTY_ID`, optional `CLOUDBEDS_API_BASE`.
- **Blocker:** If `CLOUDBEDS_API_KEY` is unset or invalid, `healthCheck()` fails and the route returns **502** with `Cloudbeds API health check failed — check CLOUDBEDS_API_KEY`. Inn occupancy/revenue metrics will not update in the dashboard until the key is live in Vercel (Bitwarden is source of truth).

## AI CEO brief (`POST /api/cron/ai-ceo-brief`)

- **Auth:** `Authorization: Bearer <CRON_SECRET>` or admin session via `requireCronOrAdmin`.
- **AI:** Uses `callAI` from `lib/ai-models.ts` (primary/fallback per routing). If all providers fail, the route still returns **200** with a short stats-only summary.
- **Asana:** `createTask` needs `ASANA_ACCESS_TOKEN` (and project gid). Failures are logged via `cloudLog`; response may include `asanaGid: null`.
- **GCP:** Vertex-only features are not required for this cron path if Anthropic/env text routing succeeds. For model routes that use Vertex, `GOOGLE_APPLICATION_CREDENTIALS_JSON` must be set in Vercel.

## Prisma `NpsResponse`

- `pnpm --filter @bigmuddy/database exec prisma db push` was run successfully against Neon (2026-04-05); `NpsResponse` is in sync. Admin NPS summary and public `/api/nps` depend on this table.
