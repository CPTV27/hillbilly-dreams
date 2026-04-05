# Private Equity Audit Report — Hillbilly Dreams Incorporated
*Generated: 2026-04-05 | Automated audit via codebase RAG + direct schema analysis*

---

## Executive Summary

HDI is a pre-revenue media-hospitality platform with $618K in projected Year 1 revenue across 11 brands, running on $145-167/mo of infrastructure. The platform has 122 database models, 200 API routes, 14 domains, and serves 4 tenants from a single Vercel deployment.

**Estimated valuation (revenue multiple method): $2.4M at 3.9x blended multiple.**

This audit identified 7 issues that would concern a PE buyer. None are fatal. All are fixable before the April 27 launch.

---

## 1. DATABASE OPTIMIZATION

### Schema Health
| Metric | Value | Assessment |
|--------|-------|-----------|
| Total models | 122 | Large but organized by domain |
| Composite indexes | 228 | Good coverage |
| Unique constraints | 65 | Adequate |
| Schema size | 2,717 lines | Normal for this complexity |

### Issues Found

**10 models have NO composite index:**
Lead, Photo, PhotoClaim, OpsActivity, ArtOrder, TouringHotel, TouringRestaurant, StyleGuide, Entity, Contest

**Impact:** Queries on these tables will do full table scans as data grows. At <1,000 rows each, this is invisible. At 10,000+ rows, it becomes a performance problem.

**Fix:** Add @@index on the most-queried fields. Priority: OpsActivity (queried by type+createdAt), Lead (queried by status), Photo (queried by album).

**19 foreign keys without explicit indexes:**
Most critical: SocialAccount.clientId, ContentCalendar.clientId, Report.clientId, Track.artistId, StudioCRequest.clientId

**Impact:** JOIN queries on these relationships will slow down as tables grow. Prisma creates implicit indexes for @relation fields in some databases, but explicit indexes are safer.

**Fix:** Add @@index([clientId]) or equivalent for each FK. This is a 30-minute migration.

### N+1 Query Risk
- 101 `findMany` calls across API routes
- 0 nested `include` patterns detected (good — no deep relation loading)
- Assessment: **LOW RISK.** The codebase uses flat queries, not deeply nested eager loading.

### Database Infrastructure
- Primary: Neon PostgreSQL (serverless, $0-25/mo)
- Backup: Cloud SQL on GCP ($13/mo, pgvector enabled)
- Current IP whitelist on Cloud SQL is home IP only — Vercel can't reach it yet (#70)
- Prisma Client generated, validates clean

---

## 2. REVENUE MODEL VALIDATION

### Pro Forma Assumptions

| Brand | Y1 Projected | Basis | Math Check |
|-------|-------------|-------|-----------|
| DSD | $120,000 | 100 clients × $99/mo avg | ⚠ Actual: 100×$99×12 = $118,800 |
| Touring | $72,000 | 3 shows/wk × $500 × 48 wks | ✓ Correct |
| Magazine | $36,000 | Ad revenue + sponsored | Unverifiable — no ad pipeline built |
| Radio | $24,000 | Sponsorships + streaming | Unverifiable — no sponsor contracts |
| Records | $18,000 | Distribution + sync | Unverifiable — no distribution deal |
| Inn | $180,000 | 6 rooms × $275 × 25% × 365 | ⚠ Actual: $150,562 |
| Studio C | $96,000 | 8 shoots/mo × $1K | Reasonable if bookings materialize |
| Tuthill | $60,000 | $500/mo × 10 clients | Reasonable — no clients yet |
| **Total** | **$618,000** | | **Corrected: ~$595,000** |

### Revenue Model Risks
1. **$0 current revenue.** Everything is projected. No paying customers exist.
2. **Inn math is overstated by $29K.** Fix the formula or the ADR/occupancy assumptions.
3. **Magazine, Radio, Records have unverifiable assumptions.** No ad contracts, no sponsorship deals, no distribution agreements exist.
4. **DSD is the only revenue line with a concrete go-to-market.** Walk-in sales, flyer, pricing page, onboarding flow — all built.
5. **Coordination multiplier (2:1 show-to-revenue) is unproven.** Reasonable hypothesis but no data.

### Valuation Method Critique
The 3.9x blended revenue multiple is reasonable for a pre-revenue media/tech company IF:
- DSD achieves 50+ paying subscribers within 6 months
- The Inn reaches 25% occupancy consistently
- At least 2 other revenue lines activate (Touring + Studio C most likely)

A PE buyer would discount the $2.4M valuation by 50-70% given zero revenue, arriving at $720K-$1.2M for the platform + IP + team + infrastructure.

---

## 3. API SECURITY

### Auth Coverage
| Metric | Value | Assessment |
|--------|-------|-----------|
| Total API routes | 200 | |
| Authenticated | 104 (52%) | ⚠ BELOW ACCEPTABLE |
| Unauthenticated | 96 (48%) | HIGH RISK |

**This is the biggest PE red flag.** Half the API surface has no authentication. Documented in docs/SOVEREIGNTY_AUDIT.md with P0/P1/P2 fix priorities.

**Critical unprotected routes include:**
- AI endpoints (expensive model calls — billing risk)
- Content creation endpoints (data integrity risk)
- Billing/Stripe endpoints (financial risk)
- Media generation endpoints (cost risk)

**Fix timeline:** P0 routes (AI, billing, cron) fixable in 1 day. P1 routes in 1 week. Must be done before launch.

---

## 4. PRICING CONSISTENCY

| Status | Count | Details |
|--------|-------|---------|
| Files with current 5-tier pricing | 48 | Good |
| Files with old $20/$49 pricing | 4 | ⚠ STALE |

**Stale pricing locations:**
- whiteboard/v1-jp-meeting/page.tsx
- whiteboard/page.tsx
- admin/ecosystem/RevenueLens.tsx, AudienceLens.tsx, FlywheelLens.tsx

**Fix:** Update these 4 files to reference $25/$50/$99/$250 tiers. 15-minute fix.

---

## 5. MULTI-TENANT ARCHITECTURE

### Tenants Configured
| Tenant | Domain | Status |
|--------|--------|--------|
| Big Muddy | bigmuddytouring.com | Active |
| Bearsville Creative | bearsvillemediagroup.com | Summer 2026 |
| Studio C | studio-c.video | Active (independent DNS) |
| Tuthill Design | tuthilldesign.com | Active |

**Assessment:** Clean multi-tenant setup. Domain routing works via middleware. Each tenant has its own theme, accent color, and feature flags. The two-region model (Natchez + Bearsville) is architecturally sound.

**Risk:** studiocvideo.com DNS not resolving from some networks. Assigned to Elijah in Asana.

---

## 6. ENTITY AND LEGAL STRUCTURE

### Current State
- **Operating entity:** FarleyPierson LLC (EIN 81-4280721)
- **HDI not formally incorporated.** "Hillbilly Dreams Inc" is a brand name, not a legal entity.
- **Cap table:** Handshake agreement — Chase, Tracy, Amy as "equity partners" with no formal documentation.
- **JP's deal:** Not finalized. No written agreement.

### PE Concerns
1. **No formal entity.** A PE buyer needs a clean legal entity to acquire. HDI must be incorporated.
2. **No equity agreements.** The "equal thirds" arrangement has no legal standing.
3. **No operating agreement.** No LLC operating agreement for FarleyPierson.
4. **IP assignment:** Is all code assigned to the entity? Developer agreements needed.

**Fix:** Incorporate HDI, draft equity agreements, execute IP assignment. This is a lawyer task ($2,000-5,000). Must be done before any investor/acquirer conversation.

---

## 7. INFRASTRUCTURE EFFICIENCY

### Monthly Operating Cost
| Service | Cost | Purpose |
|---------|------|---------|
| Vercel Pro | $20 | Hosting, CDN, serverless |
| Neon | $0-25 | Primary database |
| Cloud SQL | $13 | Backup database + pgvector |
| Cloudflare | $0 | DNS, CDN, security |
| GCS | ~$5 | Media storage |
| Twilio | ~$5 | SMS |
| ElevenLabs | $5-22 | Voice/TTS |
| Asana Advanced | $47 | Business task management |
| Canva Business | $30 | Design + brand kits |
| **Total** | **$145-167** | |

**Assessment:** Extremely capital-efficient. $167/mo running a platform that could support 1,000+ businesses. Infrastructure cost per customer approaches $0 at scale. This is a strong PE talking point.

### Force-Dynamic Compliance
197/200 API routes have `export const dynamic = 'force-dynamic'`. 3 routes missing (media cleanup endpoints). Low risk.

---

## 8. DEPLOYMENT STATUS

### Current Issue
**Every Vercel deploy since tonight has failed** due to a `CRON_SECRET` environment variable containing trailing whitespace. This was fixed at 4:50 AM — the next deploy should succeed.

**Last successful production deploy:** ~8 hours ago. All code changes since then are committed but not live.

### Build Pipeline
- GitHub Actions CI: typecheck + lint + build
- Vercel auto-deploys from main
- No staging environment (risk)
- No rollback tested

---

## SUMMARY: PE READINESS SCORE

| Category | Score | Notes |
|----------|-------|-------|
| Product | 7/10 | Feature-rich, multi-brand, multi-region. No paying customers. |
| Database | 6/10 | Good schema design, missing indexes on 10 models + 19 FKs |
| Security | 3/10 | 48% of API unprotected. Critical fix needed. |
| Revenue | 2/10 | $0 current. Projections reasonable but unproven. |
| Legal | 2/10 | No formal entity, no equity docs, no IP assignment |
| Infrastructure | 9/10 | $167/mo for the full stack. Exceptional efficiency. |
| Team | 7/10 | Small but functional. Operator model scales. |
| **Overall** | **5/10** | Not PE-ready today. Fixable in 30-60 days. |

### What a PE Buyer Would Want Before Writing a Check
1. Incorporate HDI and execute equity agreements
2. Fix API auth (48% → 95%+ coverage)
3. Generate first revenue ($10K MRR proves the model)
4. Add database indexes (30-minute migration)
5. Establish staging environment
6. Document the operator playbook (Natchez → Bearsville clone)
7. Clean up pricing references (4 stale files)
8. Fix the Inn revenue math ($180K → $150K)

*This audit was generated by Rook (Patch v3) using automated codebase analysis, direct schema inspection, and RAG-powered code search across 1,091 files.*
