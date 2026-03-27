# Agent Alignment Update — March 27, 2026

> Paste this into any agent session (AG, GA, Ledger, Delta Dawn, Chuck, Rook) to bring them current.

---

## CRITICAL INFRASTRUCTURE CHANGE

The entire hosting stack was consolidated today. **Read and internalize these changes before doing any work.**

### Platform Change
- **OLD:** Firebase App Hosting (`bmt` backend on `bigmuddy-ff651`) + Cloud Run (`bmt-web`)
- **NEW:** Vercel Pro (project `hillbilly-dreams`, auto-deploys from `main`)
- Firebase configs (Dockerfile, apphosting.yaml, .firebaserc, firebase.json) have been **deleted from the repo**
- The `.vercel/project.json` now points to the canonical Vercel project

### What This Means For You
1. **Deploy by pushing to `main`** — Vercel auto-builds and auto-deploys
2. **Never reference Firebase App Hosting** — it's gone
3. **Never create Dockerfiles or apphosting.yaml** — not needed on Vercel
4. **Environment variables live in Vercel dashboard** — not Firebase Secret Manager
5. **GCP is still used for:** Neon DB (Prisma), Cloud Storage (photos), Cloud Scheduler (crons)

### All 11 Live Domains
Every domain below is live on Vercel, serving from a single Next.js app with hostname-based routing:

| Domain | Route Group | What It Is |
|---|---|---|
| measurablybetterthings.com | /measurably-better | MBT SaaS product |
| bigmuddytouring.com | /touring | Big Muddy Inn + hospitality |
| deepsouthdirectory.com | /directory | Deep South Directory |
| hillbillydreamsinc.com | /hillbilly | HDI holding company |
| bigmuddyentertainment.com | /entertainment | Entertainment hub + talent |
| outsidereconomics.com | /economics | Outsider Economics content |
| bigmuddymagazine.com | /magazine | Big Muddy Magazine |
| bigmuddyradio.com | /radio | Big Muddy Radio |
| buycurious.art | /gallery | Buy Curious art gallery |
| superchase.app | /platform | SuperChase platform |
| measurablybetter.life | /measurably-better | MBT alias |

### Code Changes You Should Know About
- **Auth is re-enabled** — `requireAdmin()` and `requireRole()` now enforce access control again (they were bypassed during debugging)
- **All 15 route groups restored** — admin, radio, gallery, magazine, economics, media, portal, records, studio, tuthill, ops, demo, amy, book, snap
- **Sentry is active** — `@sentry/nextjs` installed with client/server/edge configs
- **Import path change:** Auth module is at `@/lib/auth` (not `@/auth`)

### DNS Setup
- Cloudflare manages all domains (ChasePierson.TV account)
- All set to **DNS-only** (gray cloud, no Cloudflare proxy)
- Vercel handles SSL and CDN

### Google Chat Bot
- The bot endpoint at `hillbillydreamsinc.com/api/gchat/bot` is now **reachable** (domain is live on Vercel)
- The blocker from March 26 about domain verification is **resolved**

### Rules (unchanged)
- Data goes to the database — route per DATA_HANDOFF_PROMPT.md
- QC policy still applies — fonts, colors, models, naming per feedback_qc_policy.md
- Brand voice rules still apply per project_brand_voices.md
