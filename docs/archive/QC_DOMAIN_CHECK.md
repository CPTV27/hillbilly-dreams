# QC — domain & Tracy batch checks

**Generated:** 2026-04-05 (Sunday Batch 2)

## 1. Deep South Directory — production HTML

Command:

```bash
curl -sL https://deepsouthdirectory.com | grep -iE "corridor|musician|artist profile" || true
```

**Result:** No matches (homepage HTML does not contain those substrings).

If Tracy still sees musician cards, hard-refresh or check a different URL path; repo `directory/page.tsx` was not modified in this pass.

## 2. Tour (`/tour?audience=team`) — link check

Checked from QC runner (HTTP follow redirects, ~20s timeout):

| # | Target | HTTP |
|---|--------|------|
| 1 | https://hillbillydreamsinc.com | 200 |
| 2 | https://deepsouthdirectory.com | 200 |
| 3 | https://bigmuddytouring.com | 200 |
| 4 | https://bigmuddymagazine.com | 200 |
| 5 | https://bigmuddyradio.com | 200 |
| 6 | https://bigmuddyentertainment.com | 200 |
| 7 | https://bigmuddyrecordlabel.com | 200 |
| 8 | https://bearsvillemediagroup.com | 200 |
| 9 | https://outsidereconomics.com | 200 |
| 10 | https://bigmuddytouring.com/store/sovereign-pi | 200 |
| 11 | https://bigmuddytouring.com/admin/hq | 200 |
| 12 | https://bigmuddytouring.com/admin/links | 200 |
| 13 | https://bigmuddytouring.com/sandbox/dsd-flyer.html | 200 |
| 14 | https://bigmuddytouring.com/hillbilly/org-chart | 200 |
| 15 | https://app.asana.com | 403 (browser login wall — expected) |

**Code change:** Tour card #7 now points to `https://bigmuddyrecordlabel.com` (canonical active domain). `bigmuddyrecord.com` may not resolve on all networks.

## 3. Onboarding

- Flow: `/directory/onboard` → `POST /api/directory/submit` → creates `DirectoryBusiness`, shows success screen.
- **P0 e2e:** `pnpm test:p0` includes DSD homepage → membership → onboard form (passes when run locally).

## 4. Admin login

- `/admin/*` is gated by NextAuth; unauthenticated users see login without the admin shell.
- **Manual:** Tracy should confirm Google OAuth on production (not automatable here).

## 5. Auth (#120)

Listed mutation routes were already guarded in prior work; this batch adds **`PATCH /api/page-edits`** as an authenticated alias of `POST`.

## 6–7. System health & nav

- `GET /api/admin/system-health` — `requireAdmin`, DB ping, deploy meta, RAG health, env **booleans** including **Asana PAT** (`ASANA_PAT` or `ASANA_ACCESS_TOKEN`), **CRON_SECRET**, plus `build.vercelEnv` / `build.nodeEnv`.
- Sidebar: **Report Card** and **HQ** remain under Operations; HQ icon **◈**; **Store** links open `bigmuddytouring.com` in a new tab.

## 8. RAG audit

See `docs/audit/RAG_AUDIT_SUNDAY_AM.md` (regenerate with `bash scripts/rag-audit-loop.sh > docs/audit/RAG_AUDIT_SUNDAY_AM.md`).

## 9–10. Pricing & “corridor”

- `grep '\$20/mo\|\$49/mo' apps/web/app/**/*.tsx` — **no matches** at time of check.
- `corridor` in customer `apps/web/app/**/*.tsx` (excluding admin/ops) — **no matches**.

## 11. Sovereign Pi store

- Hero + three use-case images load from **GCS** (`storage.googleapis.com/bmt-media-bigmuddy/...`).
- Configure: `/store/sovereign-pi/configure` exists in app router.

## 13. Production jobs (database)

Query (Neon / production DB):

| Metric | Value |
|--------|--------|
| Total `ProductionJob` | 14 |
| By stage | All **voiceover** (14) |
| Still `script` | 0 |
| `ProductionArtifact` rows | 14 |

## 14. Press package images

Press HTML references paths under `/images/...`. Spot-check on **bigmuddytouring.com** returned **200** for sample assets (e.g. `/images/processed/slideshow/natchez-319.webp`). Full matrix: re-run with `/usr/bin/curl` in CI or local if needed.

## 15. Fourteen domains (skip Studio C)

| Host | Status |
|------|--------|
| deepsouthdirectory.com | 200 |
| bigmuddytouring.com | 200 |
| bigmuddymagazine.com | 200 |
| bigmuddyradio.com | 200 |
| bigmuddyentertainment.com | 200 |
| bigmuddyrecordlabel.com | 200 |
| hillbillydreamsinc.com | 200 |
| bearsvillemediagroup.com | 200 |
| tuthilldesign.com | 200 |
| outsidereconomics.com | 200 |
| measurablybetter.life | 200 |
| buycurious.art | 200 |
| studiocvideo.com | **Skipped** (not our DNS / known issue) |
