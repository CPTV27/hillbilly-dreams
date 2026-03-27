# Infrastructure Consolidation: Everything Under Hillbilly Dreams Inc.

## Context

The hosting and DNS infrastructure is scattered across 3 platforms with inconsistent naming, stale services, and broken domain routing. Custom domains point to a mix of:
- Old Cloud Run `bmt-web` service (stale code)
- Static GCP IPs (some dead)
- Firebase App Hosting (working but no custom domains registered)
- Vercel (outsidereconomics.com works)
- GoDaddy (buycurious.art)

Chase has Vercel Pro under `chase-piersons-projects`. Goal: **Vercel is the canonical production host**, all custom domains point there, stale GCP services get decommissioned, everything has clean names under HDI.

---

## Current State (the mess)

| Domain | Currently Points To | Status |
|--------|-------------------|--------|
| measurablybetterthings.com | Cloud Run `bmt-web` (old code) | **STALE** |
| bigmuddytouring.com | GCP IP 35.219.200.206 | **UNKNOWN** |
| deepsouthdirectory.com | GCP IP 35.219.200.201 | **UNKNOWN** |
| hillbillydreamsinc.com | GCP IP 35.219.200.206 | **UNKNOWN** |
| bigmuddyentertainment.com | GCP IP 35.219.200.206 | **WORKS?** |
| outsidereconomics.com | Vercel (76.76.21.21) | **WORKING** |
| bigmuddymagazine.com | GCP IP 35.219.200.192 | **UNKNOWN** |
| bigmuddyradio.com | GCP IP 35.219.200.198 | **UNKNOWN** |
| buycurious.art | GoDaddy IPs | **525 SSL ERROR** |

**Vercel projects (13!):** bmt, bmt-demo, bmt-deploy, bmt-monorepo, bmt-production, outsider-economics, web, superchase, superchase-dashboard, super-chase-os-clean-start, utopia-v1, s2p_os, scan2plan_os

**GCP stale resources:** Cloud Run `bmt-web`, Firebase App Hosting `bmt` backend, static IPs, load balancers from `deploy-iap.sh`

---

## Target State (clean)

### Single Vercel Project
- **Project name:** `hillbilly-dreams` (rename `bmt-demo` or create fresh)
- **Git repo:** `CPTV27/hillbilly-dreams` on `main` branch
- **Root directory:** `apps/web`
- **Auto-deploy:** Push to `main` → build → live

### All Custom Domains on Vercel
Every domain gets added to the single Vercel project. Vercel handles SSL automatically.

| Domain | Vercel CNAME Target | Cloudflare Proxy |
|--------|-------------------|-----------------|
| measurablybetterthings.com | `cname.vercel-dns.com` | DNS-only (gray cloud) |
| www.measurablybetterthings.com | `cname.vercel-dns.com` | DNS-only |
| bigmuddytouring.com | `cname.vercel-dns.com` | DNS-only |
| www.bigmuddytouring.com | `cname.vercel-dns.com` | DNS-only |
| deepsouthdirectory.com | `cname.vercel-dns.com` | DNS-only |
| www.deepsouthdirectory.com | `cname.vercel-dns.com` | DNS-only |
| hillbillydreamsinc.com | `cname.vercel-dns.com` | DNS-only |
| www.hillbillydreamsinc.com | `cname.vercel-dns.com` | DNS-only |
| bigmuddyentertainment.com | `cname.vercel-dns.com` | DNS-only |
| bigmuddymagazine.com | `cname.vercel-dns.com` | DNS-only |
| bigmuddyradio.com | `cname.vercel-dns.com` | DNS-only |
| outsidereconomics.com | Already done | Already working |
| buycurious.art | `cname.vercel-dns.com` | DNS-only |
| superchase.app | `cname.vercel-dns.com` | DNS-only |

**Important:** Cloudflare proxy (orange cloud) will be OFF for all domains — Vercel handles SSL and CDN. Cloudflare in DNS-only mode (gray cloud). **Confirmed by Chase.**

### Decommission GCP Hosting
- Delete Cloud Run service `bmt-web`
- Delete or disable Firebase App Hosting backend `bmt`
- Release static IPs (35.219.200.xxx)
- Delete Google-managed SSL certs
- Delete Cloud Scheduler cron jobs (recreate as Vercel Cron or GitHub Actions)
- Keep GCP project `bigmuddy-ff651` for: Prisma/Neon DB, Secret Manager, Cloud Storage (photos)

### Clean Up Vercel
Delete all stale projects, keep only:
- `hillbilly-dreams` (the main app)
- Maybe `s2p_os` if that's a separate app

Delete: `bmt`, `bmt-deploy`, `bmt-monorepo`, `bmt-production`, `web`, `superchase`, `superchase-dashboard`, `super-chase-os-clean-start`, `utopia-v1`

### Fix S2PX DB Health Cron
Failing at "Fetch Secrets" — GCP secret access issue. Needs service account permissions fix.

---

## Execution Steps

### Phase 1: Set Up the Canonical Vercel Project (FRESH)
1. Create new Vercel project `hillbilly-dreams` linked to `CPTV27/hillbilly-dreams` repo
2. Set root directory to `apps/web`
3. Set framework preset: Next.js
4. Set install command: `pnpm install --frozen-lockfile`
5. Set build command: `pnpm db:generate && pnpm turbo build --filter=@bigmuddy/web`
6. Set all environment variables from current .env / Firebase secrets
7. Deploy and verify at `hillbilly-dreams.vercel.app`
8. Update `.vercel/project.json` in repo to match new project ID

### Phase 2: Add Custom Domains to Vercel
For each domain:
1. Add domain in Vercel dashboard
2. Update Cloudflare DNS: CNAME → `cname.vercel-dns.com`, proxy OFF
3. Remove old A records / stale CNAMEs
4. Verify SSL provisioning (Vercel auto-provisions Let's Encrypt)
5. Test the live URL

**Order:** measurablybetterthings.com first (most critical), then bigmuddytouring.com, deepsouthdirectory.com, others.

### Phase 3: Cron Migration
Move cron jobs from GCP Cloud Scheduler to Vercel Cron:
- Add `vercel.json` cron config for QBO sync and Google sync
- Or use GitHub Actions scheduled workflows (already have pattern from S2PX)

### Phase 4: Decommission GCP Hosting (requires `gcloud auth`)
1. Delete Cloud Run service: `gcloud run services delete bmt-web --region us-east4`
2. Disable Firebase App Hosting: `firebase apphosting:backends:delete bmt`
3. Release static IPs
4. Delete stale load balancer resources from IAP setup
5. Clean up Google-managed SSL certs

### Phase 5: Clean Up Vercel Projects
Delete all stale Vercel projects except the canonical one.

### Phase 6: Fix S2PX Cron
Investigate and fix the "Fetch Secrets" failure in the db-health-cron workflow.

---

## What Requires Chase's Manual Action
- **Vercel token:** Paste token so agents can use Vercel CLI (**ready to provide**)
- **gcloud auth:** `gcloud auth login` to decommission GCP resources (Phase 4)
- **firebase auth:** `firebase login --reauth` if needed (Phase 4)

## What Agents Can Do With Token
- Create fresh Vercel project `hillbilly-dreams`
- Configure build settings, env vars
- Add all 15 custom domains to Vercel
- Update all Cloudflare DNS records via API (CF token already available)
- Delete stale Vercel projects
- Update codebase configs (`.vercel/project.json`, `vercel.json`)
- Remove `apphosting.yaml` and Firebase hosting config from codebase
- Fix S2PX cron workflow

---

## Verification
1. Every domain resolves to Vercel and shows correct content
2. SSL works on all domains (no mixed content, no 525 errors)
3. `measurablybetterthings.com/measurably-better` shows new "Run your business" page
4. Admin/ops dashboards still work
5. Cron jobs fire on schedule
6. No orphaned GCP resources billing us
