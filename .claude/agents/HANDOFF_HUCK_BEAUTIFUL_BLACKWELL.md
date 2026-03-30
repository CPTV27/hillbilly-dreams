# Session Handoff: Huck Jr — Beautiful Blackwell → Kind Wright

**Date:** March 30, 2026
**From:** Beautiful Blackwell session (AG + Huck Jr collaborative)
**To:** Kind Wright session (Huck Jr continuing)

---

## 1. Completed Work (Uncommitted in worktree beautiful-blackwell)

### Prisma Schema — 3 New Models
**File:** `packages/database/prisma/schema.prisma`

- **ProductionCampaign** — Top-level container for client production jobs (links to client, tracks status, budget, timeline)
- **ProductionJob** — Individual deliverables within a campaign (video spot, radio promo, social post, etc.)
- **ProductionArtifact** — Generated assets attached to jobs (Veo output, TTS audio, Imagen images, Lyria music)

### API Routes — 8 endpoints
**Location:** `apps/web/app/api/productions/`

- `GET /api/productions` — List all campaigns with job counts
- `POST /api/productions` — Create new campaign
- `GET /api/productions/[id]` — Get campaign with all jobs and artifacts
- `PUT /api/productions/[id]` — Update campaign
- `DELETE /api/productions/[id]` — Delete campaign
- `POST /api/productions/[id]/jobs` — Add job to campaign
- `PUT /api/productions/[id]/jobs/[jobId]` — Update job status
- `POST /api/productions/[id]/seed` — Seed 6 campaign concepts

### Admin Pages — 3 pages
**Location:** `apps/web/app/admin/productions/`

- `/admin/productions` — Campaign list view (cards with status, client, job counts)
- `/admin/productions/[id]` — Campaign detail with job board (kanban-style)
- `/admin/productions/new` — Create new campaign form

### Navigation
**File:** `apps/web/app/admin/layout.tsx`
- Added "Productions" nav item to the admin sidebar under the Create section

### Prisma Client
- `npx prisma generate` has been run
- Migration has NOT been run against live DB yet

---

## 2. Deployment Steps

```bash
# 1. Switch to the worktree
cd /Users/chasethis/BigMuddy/hillbilly-dreams/.claude/worktrees/beautiful-blackwell

# 2. Run migration against live DB
npx prisma migrate dev --name add-productions

# 3. Commit all changes
git add -A
git commit -m "feat: Production pipeline — campaigns, jobs, artifacts

3 Prisma models (ProductionCampaign, ProductionJob, ProductionArtifact),
8 API routes, 3 admin pages, nav item. Full production management
for Studio C client jobs — replaces Asana for production tracking.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"

# 4. Push and create PR
git push origin beautiful-blackwell
# OR merge directly to main if confident:
git checkout main && git merge beautiful-blackwell && git push origin main

# 5. After deploy, hit the seed button
# Navigate to /admin/productions → click "Seed 6 Campaign Concepts"
```

---

## 3. Queued Tasks (Not Started)

### Monthly Burn Audit Page
- **Location:** `/admin/finance/burn`
- **Purpose:** Top-line financial overview — monthly spend, revenue, burn rate
- **Priority:** High — Tracy needs this for financial oversight
- **Notes:** Currently mock data, needs Stripe + QuickBooks integration

### Fix Touring Homepage Images
- **File:** `apps/web/app/touring/page.tsx` — lines 184, 187
- **Issue:** Two too-similar porch/veranda shots making the page feel repetitive
- **Fix:** Replace one with a different category (music, river, food, etc.)

### Client Billing Hookup
- **Purpose:** Connect Stripe backend to the finance page
- **Status:** Finance page exists with mock data, needs real Stripe Connect integration
- **Depends on:** Stripe Connect already configured for photography storefront (75/25 split)

---

## 4. Context Notes

### Chase Wants Off Asana
All production management should move through the admin dashboard. The Productions page is the first step — client jobs, deliverables, status tracking, artifact management all happen inside the platform, not in Asana. Asana remains for people-facing task management (JP, Tracy, Amy boards) but operational production work lives in `/admin/productions`.

### Crossover Milestone — 5 Gates
Chase defined a crossover point where he stops building in Claude Code and starts using the product as a user:

| Gate | Status (as of this handoff) |
|---|---|
| 1: Content Studio generates real output end-to-end | Needs verification on prod |
| 2: Creative Hub (Imagen/Veo/TTS) works on production | Needs verification on prod |
| 3: Personalized dashboard per user | **DONE** — persona config for Chase/JP/Tracy/Amy |
| 4: Mechanical Bull campaign runs end-to-end through platform | Pending — agent prompt ready |
| 5: Non-technical person (JP or Amy) completes a task without help | Pending — needs live testing |

### Monday 3/31 Priorities
- Google Workspace account consolidation (bigmuddyentertainment.com set up as secondary domain)
- JP user onboarding testing (can he sign in, see his dashboard, use Content Studio?)
- Verify Gates 1 and 2 on production

### What Was Built in Kind Wright Session

**Infrastructure:**
- OAuth fix — JP + Tracy gmail addresses allowlisted, bigmuddyentertainment.com + hillbillydreamsinc.com added as allowed domains
- `/jp` public welcome page (no auth required)
- Privacy Consent Dialog (`PrivacyConsentDialog.tsx`) — "Are you you?" first-login flow
- Consent API (`/api/onboarding/consent`) + 4 new Prisma fields on User model
- Deploy Status dashboard (`/admin/deploys`) — production/staging/sandbox view
- Kiosk mode (`/kiosk?mode=control|lobby|menu`) — Mac Mini + iPad displays
- Personalized dashboard — session-aware, per-user tools and greeting
- Tenant config updates — Studio C entity corrected, features expanded

**Documentation:**
- Sovereign Box spec (`docs/sovereign-box-spec.md`) — full product spec with network economics, Kickstarter, BOM
- Promo video campaign prompt (`AG_PROMO_VIDEO_CAMPAIGN.md`) — 27 scripts across 6 concepts
- Mechanical Bull marketing agent (`AG_MECHANICAL_BULL_MARKETING.md`) — Big Muddy Entertainment P&P dept
- Memory files: `project_sovereign_box.md`, `project_studio_c_tuthill.md`

**Asana:**
- Timestamps added to all 15 people-facing tasks (JP 5, Tracy 6, Amy 4)
- JP email onboarding task created
- 5 real estate prospects added to Biz Dev Pipeline (Vicki Walpert HOT, TKG, Halter, Peter, Johanna)
- 2 Studio C client jobs (MBT video campaign, BME promo series)
- Mechanical Bull remaster/re-release task assigned to JP

**Music:**
- All 14 Suno tracks downloaded (75MB audio + 21 artwork files)
- Blog archive captured from mechanicalbullband.blogspot.com
- Three-album release plan: A Million Yesterdays (remaster), Songs to Get Divorced To (remaster), Artificially Inseminated (new)

### Walmart/OE Editorial Note
Chase noted something about Walmart and Outsider Economics — saved to memory. Check `memory/` for the specific file.

---

## 5. Active Branches

| Branch | Status | Contents |
|---|---|---|
| `main` | Deployed | All Kind Wright work merged |
| `beautiful-blackwell` | Uncommitted | Productions pipeline (3 models, 8 APIs, 3 pages) |
| `feature/honest-data-consent` | Merged to main | Privacy dialog + consent API |
| `fix/oauth-jp-tracy-allowlist` | Merged to main | OAuth fixes + JP page + Sovereign Box spec |
| `ag-tour-redesign` | Pending AG work | Tour page redesign |
| `editorial/copy-overhaul-and-qa` | Ready for review | 16 files, all copy changes |

---

## 6. Files Modified/Created This Session

### New Files
- `apps/web/app/jp/page.tsx`
- `apps/web/app/kiosk/page.tsx`
- `apps/web/app/admin/deploys/page.tsx`
- `apps/web/app/api/admin/deploys/route.ts`
- `apps/web/app/api/onboarding/consent/route.ts`
- `apps/web/components/PrivacyConsentDialog.tsx`
- `docs/sovereign-box-spec.md`
- `.claude/agents/AG_PROMO_VIDEO_CAMPAIGN.md`
- `.claude/agents/AG_MECHANICAL_BULL_MARKETING.md`

### Modified Files
- `apps/web/config/auth-rules.ts` — Added JP, Tracy, BME domain, HDI domain
- `apps/web/config/domain-routes.ts` — Added /jp, /tracy, /amy, /kiosk to passthrough
- `apps/web/config/tenants.ts` — Studio C entity fix, features expanded
- `apps/web/app/admin/dashboard/page.tsx` — Personalized per-user dashboards
- `packages/database/prisma/schema.prisma` — 4 consent fields on User model
