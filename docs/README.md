# BMT Documentation Index
## Last Updated: March 25, 2026

## MANDATORY RULE FOR ALL AGENTS
**Every agent (CC, AG, GA) MUST update the relevant doc when making infrastructure,
account, deploy, or architectural changes. If you change it, document it. No exceptions.
Failure to document is treated as a bug.**

## Operational Documents

| Document | Purpose | Update When |
|----------|---------|-------------|
| [../DEPLOY.md](../DEPLOY.md) | Deploy configuration for Vercel and Firebase | Any deploy config change |
| [ACCOUNTS.md](ACCOUNTS.md) | Account map — GCP, Firebase, Vercel, GitHub, Stripe, Neon | Any account/auth change |
| [MONOREPO.md](MONOREPO.md) | Package manager, directory structure, build commands | Any structural change |
| [AGENT_RULES.md](AGENT_RULES.md) | Agent verification protocol, operating rules | Any new failure pattern |
| [ENV_VARS.md](ENV_VARS.md) | Environment variables — what each one does, where it's set | Any env var added/removed |
| [ROUTES.md](ROUTES.md) | Active routes, disabled routes, middleware passthroughs | Any route added/moved/disabled |

## Strategy Documents
- **`strategy/`** — Business plans, content-to-commerce strategy
- **`google-ecosystem/`** — Google Cloud architecture blueprints, migration guides

## Research (from Perplexity Deep Research)
- **`../research/`** — Market research, competitive landscape, funding maps

## How To Use
1. Before starting work: read the relevant doc
2. After finishing work: update the relevant doc
3. If a doc doesn't exist for what you changed: create one
4. If a doc is wrong: fix it immediately
5. If AG claims something: verify against these docs before believing it
