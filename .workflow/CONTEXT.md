# Project Context

> **Owner:** CPTV27
> **Last updated:** 2026-03-14
> **Updated by:** perplexity

## Project

- **Name:** Handoff
- **Repo:** `https://github.com/CPTV27/handoff`
- **Branch:** `main` (this is the template repo itself)
- **Description:** File-based orchestration system for the Perplexity → Anti-Gravity → Claude Code development pipeline. This repo is cloned or copied into every new project as the communication layer between tools.

## Tech Stack

- **Runtime:** Any (this is tool-agnostic — works with React, Python, Go, whatever the target project uses)
- **Coordination:** Markdown files in `.workflow/`
- **Version control:** Git (GitHub, org: CPTV27)
- **CI trigger:** Claude Code via `claude -p` (Agent SDK)

## Services & Keys

| Service | Env Var | Where Stored |
|---------|---------|-------------|
| Anthropic (CC) | `ANTHROPIC_API_KEY` | Local env / AG settings |
| GitHub | `GITHUB_TOKEN` | `gh` CLI auth |

## Conventions

- **Commit style:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **Branch naming:** `feature/[name]`, `hotfix/[name]`
- **Never push directly to:** `main` / `production`
- **Test command:** N/A (template repo)
- **Build command:** N/A (template repo)
- **Deploy command:** N/A (template repo)

## File Ownership Boundaries

> These boundaries prevent AG and CC from editing the same files in parallel.

| Scope | Owner | Files/Dirs |
|-------|-------|-----------|
| Frontend | AG | `src/components/`, `src/pages/`, `src/styles/` |
| Backend | CC | `server/`, `scripts/`, `functions/` |
| Infra | CC | `.github/`, `firebase.json`, `Dockerfile`, `.env*` |
| Docs | Perplexity | `.workflow/`, `docs/`, `README.md` |
| Tests | CC | `tests/`, `__tests__/` |

## Notes

This is the meta-project: the workflow system itself. When used in a real project, replace this CONTEXT.md with project-specific details. The file ownership table should be customized per project.
