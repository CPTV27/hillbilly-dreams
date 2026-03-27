# Plan: Fire Up 5 Business Plan Agents

## Context

Chase has 5 agent prompts on `main` (commit `a4ae0d6`) that each produce a section of a comprehensive HDI business plan. The prompts are thorough — each lists 20-40 source documents and a structured report format. The goal is to launch all 5 as parallel agents, have them read their sources and produce their reports, then consolidate.

**Problem:** This worktree (`hardcore-easley`) branched before the prompts were committed. The prompts exist on `main` but not here. Several `.claude/agents/` files referenced by the prompts (CONTEXT_DUMP.md, INFRA_ALIGNMENT, handoffs) are also main-only.

## Pre-flight: Sync Files from Main

Before launching agents, cherry-pick the missing files into this worktree:

```bash
# Get the business plan prompts + any missing agent files
git checkout main -- .claude/agents/FINANCE_AGENT_BUSINESS_PLAN_PROMPT.md
git checkout main -- .claude/agents/DELTA_DAWN_BUSINESS_PLAN_PROMPT.md
git checkout main -- .claude/agents/ROOK_BUSINESS_PLAN_PROMPT.md
git checkout main -- .claude/agents/CHUCK_BUSINESS_PLAN_PROMPT.md
git checkout main -- .claude/agents/HUCK_BUSINESS_PLAN_PROMPT.md
git checkout main -- .claude/agents/CONTEXT_DUMP.md
git checkout main -- .claude/agents/INFRA_ALIGNMENT_2026-03-27.md
git checkout main -- .claude/agents/HANDOFF_HEAD_OF_PRODUCT_2026-03-27.md
git checkout main -- .claude/agents/HUCK_TEST_HANDOFF.md
git checkout main -- .claude/agents/BRAND_DESIGN_RULES.md
git checkout main -- docs/URL_DIRECTORY.md
git checkout main -- AGENT_LEDGER.md
```

Also verify `~/tax-db/` is accessible (confirmed: it is, all 9+ files present including chase_finance.db).

## Execution: 5 Parallel Agents

Launch all 5 as `general-purpose` agents simultaneously. Each agent gets:
1. The full text of its business plan prompt (read from the file)
2. Instruction to read ALL listed source documents
3. Instruction to write its report to a specific output path
4. Instruction to be honest about what's missing/broken/aspirational

### Agent 1: Ledger (Finance)
- **Prompt source:** `.claude/agents/FINANCE_AGENT_BUSINESS_PLAN_PROMPT.md`
- **Output:** `docs/strategy/business-plan/01-FINANCE-REPORT.md`
- **Key sources:** ~/tax-db/chase_finance.db (query it), ENTITY_REGISTRY.md, ECOSYSTEM_PIPELINE.md, all strategy + google-ecosystem docs, memory files for pricing/cap table
- **Note:** Agent needs to query the SQLite database for real pipeline numbers

### Agent 2: Delta Dawn (Operations)
- **Prompt source:** `.claude/agents/DELTA_DAWN_BUSINESS_PLAN_PROMPT.md`
- **Output:** `docs/strategy/business-plan/02-OPERATIONS-REPORT.md`
- **Key sources:** Operational blueprint, JP entertainment brief, wedding research, Cloudbeds integration, photo catalog, social media accounts

### Agent 3: Rook (Strategy)
- **Prompt source:** `.claude/agents/ROOK_BUSINESS_PLAN_PROMPT.md`
- **Output:** `docs/strategy/business-plan/03-STRATEGY-REPORT.md`
- **Key sources:** All strategy docs, competitive analysis, research docs, gap analysis, claim ladder
- **Note:** This is the "brutally honest" assessment — Chase-only, not a pitch deck

### Agent 4: Chuck (Touring)
- **Prompt source:** `.claude/agents/CHUCK_BUSINESS_PLAN_PROMPT.md`
- **Output:** `docs/strategy/business-plan/04-TOURING-REPORT.md`
- **Key sources:** Master plan (touring sections), JP brief, show multiplier, venue data, operator split

### Agent 5: Huck (Technology)
- **Prompt source:** `.claude/agents/HUCK_BUSINESS_PLAN_PROMPT.md`
- **Output:** `docs/strategy/business-plan/05-TECHNOLOGY-REPORT.md`
- **Key sources:** URL directory, monorepo structure, product capabilities, feature tiers, gap analysis, e2e test specs, design system
- **Note:** Should check live URLs on Vercel to verify what's actually working

## Post-Execution: Consolidation

After all 5 reports are written:
1. Create `docs/strategy/business-plan/00-EXECUTIVE-SUMMARY.md` that synthesizes all 5 into a 2-page executive summary
2. Create `docs/strategy/business-plan/README.md` as table of contents
3. Commit all reports to this branch

## Verification

- Each report should cite specific numbers (not estimates)
- Each report should flag contradictions between sources
- Each report should distinguish built/demoable vs specced vs aspirational
- Cross-check: all 5 reports should agree on entity structure, cap table, pricing, and launch date

## Key Constraints
- Only claim what's demoable (per feedback_honest_claims_only.md)
- MBT saves $500-800/mo, not $2,839 (per feedback_honest_claims_only.md)
- MBT abbreviates to MBT, never MB (per feedback_mbt_not_mb.md)
- MBT sells ecosystem access (Directory, Magazine, Radio), not software (per feedback_mbt_value_is_ecosystem.md)
