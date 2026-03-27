# Context Bridge — GitHub Shared Layer

> How CC (Huck) and Claude.ai agents share context via the repo.

## Files That CC Keeps Current

| File | Purpose | Updated When |
|------|---------|-------------|
| `AGENT_LEDGER.md` | What each agent did, decisions made, blockers | After every significant action |
| `.claude/agents/INFRA_ALIGNMENT_2026-03-27.md` | Infrastructure state snapshot | After any infra change |
| `docs/URL_DIRECTORY.md` | All live URLs across all domains | After route changes |
| `.claude/agents/CONTEXT_DUMP.md` | Live state for Claude.ai to pull | Daily or on-demand |

## CONTEXT_DUMP.md Format

CC writes this file whenever Chase says "update context" or before handing off to a Claude.ai session. It contains:

1. **Current deploy state** — what's live, what's broken
2. **Active work** — what CC is building right now
3. **Blockers** — what needs Chase or another agent
4. **Recent changes** — last 5 commits with summaries
5. **Environment** — which platform, which domains, which env vars

## How Claude.ai Reads It

Option A: Chase pastes the file content into the chat
Option B: Claude.ai reads it via Google Drive (if synced)
Option C: Claude.ai reads it via MCP filesystem bridge (Option 3, coming soon)

## How To Trigger

Chase says to CC: "update the context dump"
CC runs: writes `.claude/agents/CONTEXT_DUMP.md` and pushes to main.

Chase says to Claude.ai: "pull the latest context from the repo"
Claude.ai: reads the file (via whatever bridge is available).
