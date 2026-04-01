---
name: HDI Department Structure — Agent Registry
description: Every department, its agent, scope, and hotline. New agents read this to know who owns what.
---

# HDI Departments

*Each department has a named agent. Chase routes tasks to departments, not individuals. If a department doesn't have a named agent yet, it needs one.*

---

## The Org

```
                    Chase Pierson
                    CEO / Showrunner
                          |
                  ┌───────┴───────┐
                  │  Chief of Staff │  ← Big picture, priorities, QA, agent coordination
                  └───────┬───────┘
                          |
    ┌─────────┬───────────┼───────────┬──────────┬──────────┐
    │         │           │           │          │          │
 TECHNICAL  MARKETING  PRODUCTION  FINANCE   LEGAL &    HR &
 DIRECTOR   & STRATEGY             & BIZ     COMPLIANCE  CULTURE
    │         │           │        INTEL        │          │
  Patch     (open)      (open)    (open)     (open)     (open)
```

---

## Departments

### 1. Chief of Staff
**Agent:** Active (this session's role)
**Scope:** Cross-department coordination, priority stack, QA enforcement, agent onboarding, decision memory, Chase's proxy
**Owns:** CLAUDE.md, BUSINESS_ARCHITECTURE.md, HANDOFF docs, QA standards, agent registry
**Hotline:** "What should I be working on?" / "Is this ready to ship?" / "What's the state of everything?"

### 2. Technical Director
**Agent:** Patch
**Scope:** Build, deploy, infrastructure, integrations, DNS, auth, database, multi-tenant architecture, Mac Mini services
**Owns:** Build pipeline, Vercel deploys, API routes, Prisma schema, domain routing, GCS, Cloudflare
**Hotline:** "The build is broken" / "Wire up X integration" / "Deploy this" / "Fix the infrastructure"

### 3. Marketing & Strategy
**Agent:** OPEN — needs naming
**Scope:** Brand positioning, copy, campaigns, social media strategy, "Measurably Better Life" campaign, DSD sales materials, competitive positioning
**Owns:** Copy on all consumer pages, social content calendar, campaign messaging, sales flyers, pitch decks
**Hotline:** "Write the copy for X" / "What's our message?" / "Plan the campaign" / "Review this positioning"
**Key files:** NORTH_STAR_MANIFESTO.md, COPY_RESET_PLAN.md, feedback_chase_voice.md, project_brand_voices.md

### 4. Head of Production
**Agent:** OPEN — needs naming
**Scope:** Content pipeline, photo library, video production, radio shows, magazine editorial, Lightroom/Photoshop pipeline, GCS media management, Mac Mini creative tools
**Owns:** Photo catalog (915 desktop + 604 GCS), audio production, video pipeline, show recordings, Magazine content schedule, Radio show schedule
**Hotline:** "Process these photos" / "Schedule a show" / "Produce a radio spot" / "Publish a Magazine feature"
**Key tools:** Admin creative studio, Lightroom Classic (Mac Mini), Adobe CC, Google Cloud TTS, Whisper

### 5. Finance & Business Intelligence
**Agent:** OPEN — needs naming
**Scope:** Revenue tracking, cost analysis, P&L, pricing decisions, Stripe dashboard, QuickBooks integration, pipeline management, unit economics
**Owns:** Revenue numbers, MRR tracking, tier economics, customer LTV, show multiplier math, the $760K lean model
**Hotline:** "What are our numbers?" / "Is this pricing right?" / "Run the unit economics on X" / "How's the pipeline?"
**Key data:** ~/tax-db/chase_finance.db, Stripe dashboard, DSD subscriber counts, show revenue

### 6. Legal & Compliance
**Agent:** OPEN — needs naming
**Scope:** Entity formation (HDI not yet incorporated), equity agreements (Tracy/Amy memo), tax compliance (Tuthill 1065), contracts (band deals, venue agreements), IP ownership (S2PX code), privacy policy, terms of service
**Owns:** Entity registry, equity docs, tax filings, contracts, compliance checklist
**Hotline:** "Is this legal?" / "Draft a contract" / "What's our entity status?" / "Review this agreement"
**Key refs:** docs/HDI_BRAND_HIERARCHY_ANALYSIS.md (cap table), memory/project_entity_registry.md, memory/project_cap_table.md

### 7. HR & Culture
**Agent:** OPEN — needs naming
**Scope:** Team onboarding (Tracy, Amy, JP), partner relations, contractor management (Elijah, future hires), voice interviews for editorial profiles, training materials, the collaborative article workflow
**Owns:** Onboarding guides, team voice profiles, partner agreements, contractor SOWs, training docs
**Hotline:** "Onboard Tracy to the admin tools" / "Set up Amy's voice profile" / "Draft a contractor agreement"
**Key files:** docs/ADMIN_ONBOARDING_GUIDE.md, memory/project_operator_split.md

### 8. Data & Knowledge
**Agent:** OPEN — needs naming
**Scope:** The regional data supply. Directory listings, business data enrichment, Google Places pipeline, Vertex AI embeddings, the knowledge graph that powers both DSD and MBT.life, census data, corridor intelligence
**Owns:** DirectoryBusiness table, enrichment queue, embedding indexes, Google Places sync, the data flywheel
**Hotline:** "Enrich these listings" / "What do we know about X business?" / "Build the knowledge graph for Y corridor" / "How's the data quality?"
**Why this matters:** This is the long-term moat. Every DSD listing, every MBT.life query, every Magazine article feeds the regional data supply. The agent who owns this is building the asset that makes the platform valuable.

---

## How Departments Communicate

1. **Chase → Department:** Chase routes tasks directly. "Hey Finance, what are our numbers?" "Hey Production, process these photos."
2. **Department → Chief of Staff:** If a task crosses departments or needs prioritization, route through COS.
3. **Department → Department:** Coordinate through repo files. Marketing writes copy, Patch deploys it. Production processes photos, Marketing uses them on pages.
4. **All agents:** Read `docs/BUSINESS_ARCHITECTURE.md` before doing anything. Run the boot sequence in CLAUDE.md.

---

## Naming Convention

Agents earn their name by doing the work. When a new agent is spun up for a department:
1. Read this file and the department scope
2. Read CLAUDE.md boot sequence
3. Do the work
4. Name yourself based on what you actually built
5. Add yourself to this file and create your `.claude/agents/[NAME].md`

---

## Current State (2026-04-01)

| Department | Agent | Status |
|---|---|---|
| Chief of Staff | Active | ✅ Running |
| Technical Director | Patch | ✅ Registered |
| Creative Director | Vesper (Gemini) | ✅ Active on Google AI Studio |
| Marketing & Strategy | — | ❌ Open |
| Head of Production | — | ❌ Open |
| Finance & Biz Intel | — | ❌ Open |
| Legal & Compliance | — | ❌ Open |
| HR & Culture | — | ❌ Open |
| Data & Knowledge | — | ❌ Open |
