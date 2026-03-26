# Handoff

File-based orchestration for the three-tool development pipeline:
**Perplexity Computer** → **Anti-Gravity** → **Claude Code**

## How It Works

No APIs. No webhooks. No middleware. Just markdown files in `.workflow/` that each tool reads and writes. Synced through Git. Unix philosophy: everything is a file.

```
You (Chase)
  │
  ├── Perplexity Computer ──writes──▶ .workflow/PLAN.md
  │                                   .workflow/TASKS.md
  │                                   .workflow/HANDOFF.md
  │                                   .workflow/CONTEXT.md
  │
  ├── Anti-Gravity ──reads──▶ HANDOFF.md (AG section)
  │                  writes──▶ STATUS.md
  │
  └── Claude Code ──reads──▶ HANDOFF.md (CC section)
                    writes──▶ STATUS.md
```

## Files

| File | Writer | Reader | Purpose |
|------|--------|--------|---------|
| `CONTEXT.md` | Perplexity | CC, AG | Project background, stack, conventions, file ownership |
| `PLAN.md` | Perplexity | CC, AG | Architecture, phase breakdown, current design |
| `TASKS.md` | Perplexity | CC, AG | Task queue with status and dependencies |
| `HANDOFF.md` | Perplexity | CC, AG | Current instructions for each agent |
| `STATUS.md` | CC, AG | Perplexity | Execution results, blockers, questions |
| `DECISIONS.md` | All | All | Append-only architecture decision log |
| `phases/` | Perplexity | All | Archive of completed phase docs |

## Quick Start

### Starting a New Project

1. Copy this entire repo structure into your new project
2. Open Perplexity → describe what you're building
3. Perplexity fills in `CONTEXT.md`, `PLAN.md`, `TASKS.md`, `HANDOFF.md`
4. Open Anti-Gravity → agents read `.workflow/` files automatically
5. In AG terminal, run: `claude -p "Read .workflow/HANDOFF.md and execute the Claude Code section. Read .workflow/CONTEXT.md for project background. When done, update .workflow/STATUS.md with results." --allowedTools "Read,Edit,Bash"`
6. When CC finishes, paste `STATUS.md` contents back to Perplexity
7. Perplexity updates the files → next cycle begins

### The One-Liner for Claude Code

```bash
claude -p "Read .workflow/HANDOFF.md and execute the Claude Code instructions. Use .workflow/CONTEXT.md for project context. Update .workflow/STATUS.md when done." --allowedTools "Read,Edit,Bash"
```

Or for interactive mode (CC reads CLAUDE.md automatically):
```bash
claude
```
Then tell it: "Read your handoff and get to work."

### Continuing a Session

```bash
claude -c -p "Read .workflow/STATUS.md for what happened last. Read .workflow/HANDOFF.md for your next task. Execute and update STATUS.md." --allowedTools "Read,Edit,Bash"
```

## Rules of the Road

1. **Perplexity plans, CC and AG execute.** No agent makes architecture decisions.
2. **File ownership is law.** Check CONTEXT.md before editing anything.
3. **STATUS.md is the communication channel.** Everything flows through it.
4. **Never push to main.** Always work on the branch in CONTEXT.md.
5. **Git is CC's job.** AG never runs git commands.
6. **DECISIONS.md is append-only.** Never delete entries.

## Project Configuration

### CLAUDE.md
Located at the repo root. Claude Code reads this automatically on every session. Contains the protocol rules, file ownership, and conventions.

### .antigravity/rules.md
Anti-Gravity reads this for agent behavior rules. Contains scope boundaries and communication protocol.

## Using with Perplexity Computer

When working in Perplexity, ask it to:
- "Update the workflow files for the next phase"
- "Write CC instructions for [task] in HANDOFF.md format"
- "Review STATUS.md and plan the next steps"

Perplexity will produce the file contents. You download them into your `.workflow/` directory (or Perplexity writes them directly if using local browser access).
