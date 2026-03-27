# Huck — Technology Platform & Product Report

> Paste this into Huck's session (Chief of Staff / Build Agent).

## Task

Compile a comprehensive technology and product state report. What's built, what's live, what's broken, what's next. This is the engineering view of the business.

## Source Documents

### Infrastructure (current as of March 27)
- `AGENT_LEDGER.md` — Read top entry for current infra state
- `.claude/agents/CONTEXT_DUMP.md` — Live state snapshot
- `.claude/agents/INFRA_ALIGNMENT_2026-03-27.md` — Infrastructure consolidation
- `docs/URL_DIRECTORY.md` — All 113 active URLs
- `docs/ENV_VARS.md` — Environment variables
- `docs/MONOREPO.md` — Monorepo structure

### Product
- `.claude/agents/HANDOFF_HEAD_OF_PRODUCT_2026-03-27.md` — Product decisions, pricing, active work
- `docs/PRODUCT_CAPABILITIES.md` — Full capability matrix
- `docs/FEATURE_TIERS.md` — Feature tiers by pricing level
- `~/tax-db/PRODUCT_GAP_ANALYSIS.md` — What's real vs not
- `~/tax-db/PRODUCT_ONBOARDING_PROMPT.md` — 11 onboarding flows
- `docs/APP_UX_SPEC.md` — App UX specification
- `docs/UX_RETHINK.md` — UX rethink

### Design & Frontend
- `docs/DESIGN_SYSTEM.md` — Design system
- `docs/DESIGN_VISION.md` — Design vision
- `.claude/agents/BRAND_DESIGN_RULES.md` — Brand design rules
- `docs/AG_DESIGN_HANDOFF.md` — Antigravity design handoff
- `docs/PAGE_COPY_AND_UX.md` — Page copy and UX spec

### Data Platform
- `.claude/agents/DATA_HANDOFF_PROMPT.md` — Data routing
- `.claude/agents/LEDGER_TO_HUCK_HANDOFF.md` — Data platform handoff
- `docs/DIRECTORY_CONTENT_ENGINE_SPEC.md` — Content engine spec
- `docs/DIRECTORY_SOCIAL_SPEC.md` — Social automation spec

### Integrations
- `docs/cloudbeds-integration.md` — Cloudbeds (just provisioned)
- `docs/melodyvault-integration.md` — Music catalog

### Testing & QC
- `.claude/agents/HUCK_TEST_HANDOFF.md` — E2E test state
- `e2e/routes.spec.ts` — 80-route smoke tests
- Memory: `feedback_qc_policy.md` — QC policy

## Report Structure

### 1. Platform Architecture
- Monorepo structure (apps/web, packages/*)
- Deployment: Vercel Pro, auto-deploy from main
- Database: Neon Postgres (what tables, what data)
- DNS: 11 domains on Cloudflare → Vercel
- Monitoring: Sentry (just configured)

### 2. All 11 Domains — Status
For each domain: what it serves, does it work, what's broken, what's missing.

### 3. Product State (Honest)
- What's built and demoable TODAY
- What's built but broken
- What's specced but not built
- What's aspirational

### 4. Design System State
- Theme system (25+ themes, font firewall)
- What looks good vs what needs work
- Photo/image situation (604 in GCS, bad crops, missing admin picker)

### 5. Data Platform
- Database tables and row counts
- What's seeded vs empty
- API endpoints that work vs don't
- Cloudbeds integration (read-only, just provisioned)

### 6. Testing & Quality
- E2E coverage (80 routes)
- Build status
- Known 500 errors
- Auth state

### 7. Technical Debt & Priorities
- Top 10 things to fix ranked by impact
- What blocks the demo
- What blocks April 27 launch

## Rules
- Be specific: table names, route paths, error codes
- Distinguish "works on localhost" vs "works in production"
- Note what was fixed today vs what's still broken
- Reference the AGENT_LEDGER for anything another agent touched
