# Plan: Fire 5 Business Plan Agents in Parallel

## Context
Chase has 5 agent prompts ready at `.claude/agents/` — each covering a domain of the HDI business plan. All reference existing source docs (40+ files across tax-db, google-ecosystem, memory, research, strategy). They can run in parallel since none depend on another agent's *new* output — all cross-references point to existing files.

## Execution

Launch **all 5 agents simultaneously** as background agents. Each agent:
1. Reads its prompt file from `.claude/agents/`
2. Reads all referenced source docs
3. Produces its report section
4. Appends a ledger entry to `AGENT_LEDGER.md`

| Agent | Prompt File | Deliverable |
|-------|-------------|-------------|
| **Ledger** (Finance) | `FINANCE_AGENT_BUSINESS_PLAN_PROMPT.md` | Executive summary, entity structure, revenue model, $760k target, pipeline, risk |
| **Delta Dawn** (Operations) | `DELTA_DAWN_BUSINESS_PLAN_PROMPT.md` | Property dashboard, hospitality ops, content ops, Cloudbeds, entertainment |
| **Rook** (Strategy) | `ROOK_BUSINESS_PLAN_PROMPT.md` | Strategic thesis, competitive moat, honest assessment, fundraising readiness |
| **Chuck** (Touring) | `CHUCK_BUSINESS_PLAN_PROMPT.md` | Corridor, venue network, fleet, show economics, Snowbird Circuit |
| **Huck** (Tech) | `HUCK_BUSINESS_PLAN_PROMPT.md` | Platform architecture, 11 domains status, product state, tech debt, April 27 blockers |

## Agent Configuration
- Each runs as a `general-purpose` agent in a **worktree** (isolated copy to avoid merge conflicts on AGENT_LEDGER.md)
- Each agent's prompt = the full contents of its prompt file
- Run in background so all 5 execute concurrently

## Post-Execution
After all 5 complete:
1. Review each agent's output for quality
2. Merge worktree branches (resolve any AGENT_LEDGER.md conflicts)
3. Present consolidated results to Chase

## Verification
- Each agent should produce a substantive report (not a stub)
- Each should reference real data from source files (entity names, dollar figures, domain URLs)
- Ledger entries should follow the existing format: `## [YYYY-MM-DD HH:MM] — [AGENT] — STATUS`
