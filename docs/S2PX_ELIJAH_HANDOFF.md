# S2PX / Scan2Plan CPQ — Handoff Package for Elijah Tuttle

**Prepared by:** Chase Pierson
**Date:** March 26, 2026
**Status:** Owen declined the S2PX deal on March 25, 2026. This handoff covers infrastructure and data transfer so Elijah can operate the CPQ independently.

---

## Table of Contents

1. [What You're Getting (and What You're Not)](#1-what-youre-getting-and-what-youre-not)
2. [Product Overview — What the CPQ Does](#2-product-overview--what-the-cpq-does)
3. [GCP Project Summary](#3-gcp-project-summary)
4. [Google Cloud Storage — Buckets & Data](#4-google-cloud-storage--buckets--data)
5. [Firebase Projects & Hosting](#5-firebase-projects--hosting)
6. [Database](#6-database)
7. [Cloud Run Services (API Backend)](#7-cloud-run-services-api-backend)
8. [Environment Variables & Secrets](#8-environment-variables--secrets)
9. [Domains & DNS](#9-domains--dns)
10. [Third-Party Integrations](#10-third-party-integrations)
11. [Auth Architecture](#11-auth-architecture)
12. [How to Get This Running](#12-how-to-get-this-running)
13. [Credentials You'll Need From Chase](#13-credentials-youll-need-from-chase)
14. [Ownership Boundary — What's Chase's vs. What Transfers](#14-ownership-boundary)

---

## 1. What You're Getting (and What You're Not)

### Transfers to Elijah
- **GCP project access** (`s2px-production`) — IAM roles for managing infrastructure
- **GCS scan data and project files** — all business data in the storage buckets
- **Database access** — Cloud SQL connection for the production PostgreSQL instance
- **Domain** (`scan2plan.io`) — can be transferred if desired
- **Product documentation and architecture docs** — this document and related specs
- **Firebase Hosting sites** — the deployed frontend URLs

### Does NOT Transfer
- **Source code** — The `CPTV27/S2PX` GitHub repository is Chase's. It is NOT being transferred. No codebase leaves.
- **GitHub access** — All collaborator access was revoked on March 25, 2026.
- **Any HDX / Measurably Better / Hillbilly Dreams IP** — completely separate platform.
- If you need the CPQ code, that's a separate conversation about licensing.

---

## 2. Product Overview — What the CPQ Does

The S2PX CPQ is a full-lifecycle platform for 3D scanning and BIM businesses:

| Feature | Description |
|---------|-------------|
| **Sales Pipeline** | Kanban board / lead management with stage tracking |
| **Scoping Forms** | 135-field intake form with geocoding, multi-building support |
| **Deal Workspace** | Full lead detail view with quote builder |
| **CPQ Calculator** | Multi-building, multi-discipline pricing engine with margin controls |
| **Production Pipeline** | Project tracking from scan through delivery |
| **Proposal Builder** | PDF proposal generation with template system |
| **Signature Flow** | E-signature + post-signature email notification |
| **Scan Tech Portal** | Field technician mobile interface with photo analysis AI |
| **QuickBooks Integration** | Estimate/invoice sync via OAuth2 |
| **Google Drive Integration** | File management via GCS 4-bucket architecture |
| **Knowledge Base** | Internal wiki with AI Q&A chat |
| **Strategy Center** | CEO strategy drafts with 3-tier governance |
| **AI Agents (7)** | Pricing, Operator, Photo Analysis, Checklist, Audio-to-Scoping, KB Chat, Strategy Advisor |
| **Scorecard** | Company performance metrics and financial dashboards |
| **Website Manager** | Content management for scan2plan.io marketing site |

### Note on the CPQ Calculator

The pricing engine was the single most labor-intensive component of the system. The underlying pricing logic changed repeatedly during development, requiring multiple full refactors of the calculator — a process that consumed days of engineering time per iteration. The current engine (`shared/engine/pricingV2.ts`) is the stabilized version, backed by database-driven rate tables (15 pricing tables in `shared/schema/pricing.ts`) and covered by 261 unit tests. The test suite exists specifically because of how many regressions the calculator changes introduced.

---

## 3. GCP Project Summary

| Field | Value |
|-------|-------|
| **Project ID** | `s2px-production` |
| **Owner Account** | `chase@scan2plan.io` |
| **Service Account** | `s2px-api@s2px-production.iam.gserviceaccount.com` |
| **Region (primary)** | `us-east4` (N. Virginia) |
| **Region (sandbox)** | `us-central1` (Iowa) |
| **Console URL** | https://console.cloud.google.com/home/dashboard?project=s2px-production |

### Services in Use
- Cloud SQL (PostgreSQL)
- Cloud Run (API backend)
- Cloud Storage (4 buckets)
- Firebase Hosting (3 targets)
- Firebase Auth (Google OAuth)
- Secret Manager
- Cloud Tasks
- Cloud CDN (signed URLs)

---

## 4. Google Cloud Storage — Buckets & Data

Four-bucket architecture (referenced in code — verify live with `gcloud storage buckets list`):

| Bucket | Purpose | Notes |
|--------|---------|-------|
| `s2p-core-vault` | Primary storage — proposals, certificates, exports | Set via `GCS_BUCKET` env var |
| `s2p-active-projects` | Active project data — point clouds, virtual tours, deliverables | Set via `GCS_ACTIVE_BUCKET` env var |
| `s2p-incoming-staging` | Upload staging area — files land here before processing | Set via `GCS_STAGING_BUCKET` env var |
| `s2p-quarantine` | Quarantine bucket for failed/suspicious uploads | Security allowlist in `server/lib/security.ts` |

### What's in the Buckets
- **Scan data** (`.e57`, `.las`, `.laz` point cloud files)
- **Virtual tour assets** (equirectangular panoramas, floor plan SVGs)
- **Proposals** (generated PDFs)
- **Certificates of Assurance** (generated PDFs)
- **Field photos** (scan tech uploads)
- **Project deliverables** (BIM files, CAD exports)

All of this is Scan2Plan business data and can be transferred.

### GCS Folder Structure (inside `s2p-active-projects`)

Each production project follows this canonical folder layout:

```
{ProjectFolder}/                           # e.g., "Studio-DB-534-Bergen"
├── project.json                           # Auto-generated sidecar metadata
├── Deliverables/
│   ├── Point Cloud/
│   │   ├── {raw-files}                   # .las, .laz, .e57, .rcp, .rcs
│   │   └── potree/                       # Auto-generated by point cloud worker
│   │       ├── metadata.json
│   │       ├── octree.bin
│   │       └── hierarchy.bin
│   └── Virtual Tour/
│       ├── tour-manifest.json             # Auto-generated by virtual tour worker
│       ├── floorplan.svg
│       └── panoramas/
│           ├── 001.jpg, 002.jpg, ...
├── BIM/CAD/
├── Photos/
└── Documents/
```

Scoping form uploads land in a different path inside `s2p-core-vault`:
```
scoping/{UPID}/{fieldName}/{filename}
```

### Auto-Processing Pipelines

Files uploaded to GCS don't just sit there — two Cloud Run workers process them automatically:

| Worker | Input | Output | Trigger |
|--------|-------|--------|---------|
| **Virtual Tour** (`build-virtual-tour`) | ZIP bundle (DWG + CSV + panoramas) in staging | `tour-manifest.json` + SVG + panoramas in `s2p-active-projects` | `POST /api/projects/:id/virtual-tour/process` |
| **Point Cloud** (`convert-pointcloud`) | Raw .e57/.las/.laz in active projects | Potree octree (`metadata.json`, `octree.bin`, `hierarchy.bin`) | Manual worker invocation |
| **Sidecar Writer** | Production project data changes | `project.json` metadata file per project folder | Automatic on stage transitions, uploads, quote/proposal creation |

### File Type Categories (used by sidecar writer)

| Category | Extensions |
|----------|-----------|
| Point Cloud | e57, las, laz, pts, ptx, xyz, ply, pcd, rcp, rcs |
| BIM/CAD | rvt, rfa, dwg, dxf, ifc, nwd, nwc, skp, 3dm |
| Photos | jpg, jpeg, png, tif, tiff, bmp, heic, raw, cr2, nef |
| Archives | zip, rar, 7z, tar, gz |
| Documents | pdf, doc, docx, xls, xlsx, csv, txt, rtf |

---

## 5. Firebase Projects & Hosting

### Firebase Project
| Field | Value |
|-------|-------|
| **Project ID** | `s2px-production` |
| **Console** | https://console.firebase.google.com/project/s2px-production |

### Hosting Targets (from `.firebaserc`)

| Target | Firebase Site | URL | API Service |
|--------|--------------|-----|-------------|
| **production** | `s2px` | `s2px.web.app` | `s2px-api` (us-east4) |
| **sandbox** | `s2px-sandbox` | `s2px-sandbox.web.app` | `s2px-api-sandbox` (us-central1) |
| **staging** | `s2px-staging` | `s2px-staging.web.app` | `s2px-api-staging` (us-east4) |

### Firebase Services Used
- **Auth** — Google OAuth provider (this is the only auth method)
- **Hosting** — Static SPA hosting with API rewrites to Cloud Run
- **Storage Rules** — defined in `storage.rules`
- **Firestore** — Client-side only, supplementary to Cloud SQL (see below)

### Firestore Collections (Not Finalized)

Firestore was being evaluated as a supplementary data layer alongside Cloud SQL. This was **not finalized** — the collections below exist in code but their production state should be verified. All Firestore access is client-side only (no server-side reads/writes).

| Collection | Purpose | Status |
|------------|---------|--------|
| `wiki_pages` | Knowledge Base articles (legacy) | Active — has Firestore security rules |
| `deal_sessions` | Viewer session telemetry for Deal Presentations | Not finalized |
| `deal_events` | Section enter/exit tracking with dwell time | Not finalized |
| `deal_voice` | Voice memo transcriptions for deal proposals | Not finalized |
| `deal_cta_clicks` | CTA click tracking | Not finalized |

**Note:** Only `wiki_pages` has explicit Firestore security rules (requires auth). The `deal_*` collections have no explicit rules in `firestore.rules` — they fall under the default deny rule. The primary database for all business data is Cloud SQL (PostgreSQL).

### Warning
All three environments (production, staging, local) share the **same Firebase Auth project**. There is no auth isolation between environments. Destructive auth operations in one environment affect all others.

---

## 6. Database

| Field | Value |
|-------|-------|
| **Type** | PostgreSQL (Google Cloud SQL) |
| **Instance** | `s2px-production-db` (verify with `gcloud sql instances list`) |
| **ORM** | Drizzle ORM |
| **Connection** | Via `DATABASE_URL` env var |
| **Max Connections** | ~100 (Cloud SQL instance setting) |
| **Pool Size** | 5 per Cloud Run instance |
| **Backups** | Daily automated, 7-day retention + PITR enabled |

### Schema Files (5 files, ~90 tables total)
- `shared/schema/db.ts` — 59 core tables (users, scoping_forms, quotes, proposals, production, etc.)
- `shared/schema/pricing.ts` — 15 pricing engine tables (rate tables, baselines, modifiers)
- `shared/schema/platform.ts` — 2 tables (content, roadmap)
- `shared/schema/market-intelligence.ts` — 9 tables (segments, competitors, scanners, benchmarks)
- `shared/schema/initiatives.ts` — 1 table
- Plus: `shared/schema/deal-arena.ts`, `shared/schema/engagement.ts`, `shared/schema/aiUsage.ts`

### Key Tables

| Table | Purpose |
|-------|---------|
| `users` | Firebase-authed users with RBAC roles |
| `scoping_forms` | Deal intake (135 columns — the big one) |
| `quotes` | Generated quotes with line items |
| `proposals` | Proposal documents with PDF generation metadata |
| `production_projects` | Active production pipeline |
| `qbo_tokens` | QuickBooks OAuth tokens |
| `kb_sections` | Knowledge base content |
| `strategy_drafts` | CEO strategy documents |
| `pricing_constants` | V2 pricing engine config |
| `scan_checklists` | Field technician QC checklists |

### Migrations
- 18 migration files in `migrations/` directory
- Managed via Drizzle Kit (`npm run db:generate`, `npm run db:migrate`)

---

## 7. Cloud Run Services (API Backend)

Three Cloud Run services handle the Express API:

| Service | Region | Purpose |
|---------|--------|---------|
| `s2px-api` | `us-east4` | Production API |
| `s2px-api-sandbox` | `us-central1` | Sandbox API |
| `s2px-api-staging` | `us-east4` | Staging API |

### Configuration (production)
| Setting | Value |
|---------|-------|
| Max instances | 10 (was 20, capped for connection safety) |
| Concurrency | 80 |
| Pool max | 5 per instance |

**Connection pool rule:** `instances × pool_max ≤ 0.7 × cloud_sql_max_connections`

---

## 8. Environment Variables & Secrets

Every env var the S2PX app needs. Values are **not included** — Chase will provide credentials separately.

### Required

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Cloud SQL) |
| `DB_POOL_MAX` | Connection pool max (currently `5`) |
| `DB_POOL_MIN` | Connection pool min (currently `1`) |
| `GCS_BUCKET` | Primary GCS bucket (`s2p-core-vault`) |
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics measurement ID |
| `FIREBASE_PROJECT_ID` | Server-side Firebase project ID |
| `GEMINI_API_KEY` | Google Gemini AI (powers all 7 AI agents) |
| `GOOGLE_MAPS_API_KEY` | Server-side Maps API (geocoding, distance) |
| `VITE_GOOGLE_MAPS_API_KEY` | Client-side Maps API |

### Optional

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude AI (KB extraction, notebook) |
| `XAI_API_KEY` | Grok (sentiment analysis, strategy) |
| `QBO_CLIENT_ID` | QuickBooks Online OAuth2 client ID |
| `QBO_CLIENT_SECRET` | QuickBooks Online OAuth2 client secret |
| `QBO_REDIRECT_URI` | QuickBooks OAuth callback URL |
| `QBO_ENVIRONMENT` | `sandbox` or `production` |
| `SENDGRID_API_KEY` | Email delivery (proposals) |
| `SENDGRID_FROM_EMAIL` | Sender address for proposals |
| `ENCRYPTION_KEY` | Encrypts stored API keys in DB |
| `GCS_ACTIVE_BUCKET` | Active projects bucket (`s2p-active-projects`) |
| `GCS_STAGING_BUCKET` | Upload staging bucket (`s2p-incoming-staging`) |

### Where Secrets Are Stored
- **GCP Secret Manager** on `s2px-production` project
- CDN signing key stored as `s2px-cdn-key` in Secret Manager
- Cloud Run services pull secrets from Secret Manager at deploy time

---

## 9. Domains & DNS

| Domain | Purpose | Registrar | Notes |
|--------|---------|-----------|-------|
| `scan2plan.io` | Primary domain | TBD — verify with Chase | Can be transferred |
| `s2px.web.app` | Production Firebase Hosting | Firebase-managed | Tied to Firebase project |
| `s2px-sandbox.web.app` | Sandbox Firebase Hosting | Firebase-managed | Tied to Firebase project |
| `s2px-staging.web.app` | Staging Firebase Hosting | Firebase-managed | Tied to Firebase project |

---

## 10. Third-Party Integrations

| Service | SDK / Protocol | Purpose | Account Owner |
|---------|---------------|---------|---------------|
| **Firebase** | Admin SDK (server) + Web SDK (client) | Auth (Google OAuth) + hosting | `chase@scan2plan.io` |
| **Google Cloud Storage** | `@google-cloud/storage` | 4-bucket file architecture | `s2px-production` project |
| **Google Maps** | `@vis.gl/react-google-maps` + Distance Matrix | Address geocoding, travel calc | API key on `s2px-production` |
| **Google Gemini AI** | `@google/genai` | 7 AI agents (server-side only) | API key |
| **QuickBooks Online** | OAuth2 REST API | Estimate/invoice sync | Owen's QBO account — **may need to be disconnected** |
| **SendGrid** | Nodemailer transport | Proposal email delivery | API key |
| **Google Cloud Tasks** | `@google-cloud/tasks` | Async job processing | `s2px-production` project |
| **Google Cloud CDN** | Signed URLs | Secure file delivery | `s2px-production` project |

### QuickBooks Note
The QBO integration connects to Owen's QuickBooks account. Since Owen is out, this connection will need to either be:
1. Disconnected (revoke OAuth tokens in `qbo_tokens` table)
2. Reconnected to a different QBO account

---

## 11. Auth Architecture

- **Provider:** Firebase Auth with Google OAuth (only auth method)
- **Flow:** Client-side Google sign-in → Firebase token → Bearer token in every API call → `server/middleware/auth.ts` verifies token and attaches `req.user`
- **Roles:** `developer`, `admin`, `ceo`, `production`, `scantech`, `viewer`
- **Frontend guard:** `<RequireAuth allowedRoles={[...]}>`
- **Backend guard:** `requireRole('role1', 'role2')` middleware
- **No password auth** — Google OAuth only

---

## 12. How to Get This Running

### Prerequisites
- Node.js 20+
- Access to `s2px-production` GCP project (Chase grants IAM roles)
- `gcloud` CLI authenticated as an account with project access
- Cloud SQL Auth Proxy (for local development) or a `DATABASE_URL` connection string

### Step 1: Get GCP Access
Chase adds your Google account to the `s2px-production` project with appropriate IAM roles:
- `roles/cloudsql.client` (database access)
- `roles/storage.admin` (GCS bucket access)
- `roles/run.admin` (Cloud Run management)
- `roles/firebase.admin` (Firebase hosting + auth)
- `roles/secretmanager.secretAccessor` (read secrets)

### Step 2: Get Credentials
Chase provides:
- [ ] `DATABASE_URL` (Cloud SQL connection string)
- [ ] Firebase config values (6 VITE_FIREBASE_* vars)
- [ ] `GEMINI_API_KEY`
- [ ] `GOOGLE_MAPS_API_KEY` (both server and client keys)
- [ ] Any optional keys you need (SendGrid, QBO, etc.)

### Step 3: Verify Access
```bash
# Authenticate
gcloud auth login
gcloud config set project s2px-production

# Verify Cloud SQL
gcloud sql instances list

# Verify GCS
gcloud storage buckets list

# Verify Cloud Run
gcloud run services list

# Verify Firebase
firebase projects:list
```

### Step 4: Database Access
```bash
# Option A: Cloud SQL Auth Proxy (for local dev)
cloud-sql-proxy s2px-production:us-east4:s2px-production-db

# Option B: Direct connection via DATABASE_URL
# (Chase provides the connection string)
```

### Step 5: Deploy Updates (if you have the code)
```bash
# Frontend: Firebase Hosting
firebase deploy --only hosting:production

# Backend: Cloud Run
gcloud run deploy s2px-api --source . --region us-east4 --project s2px-production
```

**Note:** Steps 4-5 require the source code, which is not part of this handoff. These are here for reference if a licensing arrangement is made separately.

---

## 13. Credentials You'll Need From Chase

Checklist — Chase fills in and delivers separately (never in this document):

- [ ] GCP IAM access granted to Elijah's Google account
- [ ] `DATABASE_URL` connection string
- [ ] Firebase config block (6 `VITE_FIREBASE_*` values)
- [ ] `FIREBASE_PROJECT_ID`
- [ ] `GEMINI_API_KEY`
- [ ] `GOOGLE_MAPS_API_KEY` (server)
- [ ] `VITE_GOOGLE_MAPS_API_KEY` (client)
- [ ] `ENCRYPTION_KEY` (if applicable)
- [ ] `SENDGRID_API_KEY` + `SENDGRID_FROM_EMAIL` (if email delivery needed)
- [ ] `ANTHROPIC_API_KEY` (if Claude AI features needed)
- [ ] Domain registrar transfer (if `scan2plan.io` is being transferred)
- [ ] QBO decision: disconnect Owen's account or reconnect to new account

---

## 14. Ownership Boundary

| Asset | Owner | Transfers? |
|-------|-------|-----------|
| Source code (`CPTV27/S2PX` repo) | Chase Pierson | **NO** |
| GitHub repository access | Chase Pierson | **NO** |
| HDX / Measurably Better / Hillbilly Dreams IP | Chase Pierson / HDX | **NO** |
| GCS scan data & project files | Business data | **YES** — it's Scan2Plan business data |
| GCP project access (`s2px-production`) | Chase (owner) | **YES** — IAM roles can be granted |
| Cloud SQL database & data | Business data | **YES** — connection access granted |
| Firebase Hosting sites | Tied to GCP project | **YES** — follows GCP project access |
| Firebase Auth user accounts | Tied to Firebase project | **YES** — follows Firebase project access |
| Domain (`scan2plan.io`) | Chase | **YES** — can be transferred if desired |
| Product documentation | General knowledge | **YES** — this document and architecture docs |
| API keys (Gemini, Maps, SendGrid) | Account-specific | **CONDITIONAL** — new keys should be provisioned under Elijah's accounts |

### Clear Boundaries
1. **The code is Chase's.** The `CPTV27/S2PX` repository is private and stays with Chase. No source code is part of this handoff.
2. **The data is the business's.** GCS files, database records, and project deliverables are Scan2Plan operational data.
3. **Infrastructure access is grantable.** Chase can add Elijah to the GCP project with IAM roles without transferring ownership.
4. **API keys should be re-provisioned.** Elijah should create his own Google Cloud project and API keys long-term, rather than depending on Chase's accounts.

---

*This document was generated from the S2PX codebase configuration, GCP project settings, and architecture documentation. GCS bucket inventory should be verified live with `gcloud storage buckets list` once `chase@scan2plan.io` auth is refreshed.*
