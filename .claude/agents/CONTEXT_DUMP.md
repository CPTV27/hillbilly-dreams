# Context Dump — March 27, 2026 16:45 CT

> For Claude.ai agents to read. Updated by CC (Huck).

## Deploy State

**Platform:** Vercel Pro (project `hillbilly-dreams`)
**Status:** LIVE — all 11 domains returning 200
**Last deploy:** March 27, 2026 ~16:00 CT (commit `6cd3942`)
**Auto-deploy:** Push to `main` triggers build + deploy

## All Live Domains

| Domain | Status | Route Group |
|--------|--------|-------------|
| measurablybetterthings.com | 200 | /measurably-better |
| bigmuddytouring.com | 200 | /touring |
| deepsouthdirectory.com | 200 | /directory |
| hillbillydreamsinc.com | 200 | /hillbilly |
| bigmuddyentertainment.com | 200 | /entertainment |
| outsidereconomics.com | 200 | /economics |
| bigmuddymagazine.com | 200 | /magazine |
| bigmuddyradio.com | 200 | /radio |
| buycurious.art | 200 | /gallery |
| superchase.app | 200 | /platform |
| measurablybetter.life | 200 | /measurably-better |

## What Just Happened (today)

1. Consolidated all hosting from Firebase/Cloud Run/scattered Vercel to single Vercel Pro project
2. All Cloudflare DNS updated to Vercel (DNS-only, no proxy)
3. Auth re-enabled (was completely bypassed for debugging)
4. All 15 disabled route groups restored from `_disabled/`
5. Sentry configured (client, server, edge)
6. 11 stale Vercel projects deleted
7. S2PX db-health-cron fixed (removed missing Slack secret)
8. E2E test coverage expanded from 27 to 80 routes
9. Full URL directory created (113 pages)

## Known Issues

- `/measurably-better/notebook` — 500 (NotebookDrop model not in prod DB schema)
- `/api/ops/*` — some routes 500 (restored admin APIs need DB context)
- GCP cleanup pending — old Cloud Run `bmt-web` still exists (needs `gcloud auth login`)
- Sentry source maps not uploading (needs `SENTRY_AUTH_TOKEN` env var)

## Active Work

- Brand voice + copy review in progress (Chase + Marketing Lead + Head of Product)
- Click-through demo of all properties about to start
- MCP bridge (Option 3) planned for today — local MCP server on Mac Mini

## Recent Commits (last 5)

```
6cd3942 test: expand E2E route coverage from 27 to 80 routes
e8db80f docs: update AGENT_LEDGER for Vercel consolidation + cross-agent alignment prompt
cefbbb1 feat: add Sentry error tracking with edge-safe config
09e8da6 fix: remove @sentry/nextjs import from ops chat route
1d08dd8 fix: update @/auth imports to @/lib/auth in restored routes
```

## Environment

- **Vercel:** project `hillbilly-dreams`, team `chase-piersons-projects`
- **GitHub:** `CPTV27/hillbilly-dreams`, branch `main`
- **DB:** Neon Postgres on AWS us-east-1 (via Prisma) — the ONE database. See docs/DATABASE_POLICY.md
- **Agent Context DB:** 827 fragments — query via GET /api/agent/context
- **Orphaned DBs to delete:** Cloud SQL micro-media-db (GCP), Cloudflare D1 openclaw-db (migrating)
- **DNS:** Cloudflare (ChasePierson.TV account), DNS-only mode
- **Monitoring:** Sentry (org `chasepiersontv`, project `javascript-react`)
- **Storage:** GCS bucket `bmt-media-bigmuddy`
