# BMT Deployment Guide
## Last Updated: March 25, 2026

## Vercel (Primary — Public-Facing Site)

### Project Settings (set in Vercel Dashboard)
- **Project:** bmt-deploy
- **Team:** chase-piersons-projects
- **Account:** cptv27 (me@chasepierson.tv)
- **Root Directory:** `apps/web` (set in Dashboard > Build and Development)
- **Framework:** Next.js (auto-detected from Root Directory)
- **Node Version:** 20.x

### Config File: `apps/web/vercel.json`
```json
{
  "installCommand": "corepack enable && pnpm install --frozen-lockfile",
  "buildCommand": "pnpm turbo build --filter=@bigmuddy/web"
}
```

### Why These Settings
- `corepack enable` — Vercel defaults to npm; this activates pnpm
- `--frozen-lockfile` — prevents lockfile drift on build server
- Root Directory `apps/web` — tells Vercel where Next.js lives while uploading full monorepo
- Build machine: 2 cores, 8 GB (Vercel default, sufficient for slim build)

### Deploy Command
```bash
cd ~/bmt && vercel deploy --prod
```

### Critical Notes
- DO NOT put `rootDirectory` in vercel.json — it's a dashboard-only setting
- DO NOT deploy from `apps/web` directory — deploy from monorepo root
- The monorepo uses pnpm workspaces — npm cannot resolve `workspace:*` protocol

---

## Firebase App Hosting (Secondary — NOT WORKING as of March 25, 2026)

### Why It Fails
- `heapsize.sh` hardcodes Node heap at 4096MB regardless of `memoryMiB` setting
- The BMT Next.js app requires more than 4GB to compile
- This is a Firebase App Hosting platform limitation, not a code issue

### If Firebase Is Needed Later
- Reduce app to <30 pages OR
- Wait for Firebase to increase the heap cap OR
- Use a custom Cloud Build step that bypasses heapsize.sh

### Firebase Config (for reference)
- **Project:** hillbillydreams
- **Account:** admin@hillbillydreamsinc.com
- **Backend:** bmt
- **Region:** us-east4
- **URL:** https://bmt--hillbillydreams.us-east4.hosted.app

---

## Environment Variables
All secrets managed via Google Cloud Secret Manager for Firebase,
and Vercel Environment Variables for Vercel deployments.

Required env vars for Vercel (set in Dashboard > Environment Variables):
- DATABASE_URL
- DIRECT_DATABASE_URL
- NEXTAUTH_SECRET
- ADMIN_SESSION_TOKEN
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_URL
- ANTHROPIC_API_KEY
- PERPLEXITY_API_KEY

---

## Disabled Routes
The following routes are in `/_disabled/` to reduce build size:
- admin (29 pages), ops (15 pages), amy, portal, snap, book, studio, demo, tuthill
- media, records, radio, magazine, economics, gallery, directory (68 pages)
- ambient-memory components

To restore: `mv _disabled/app/[route] apps/web/app/[route]`
