# Agent Operating Rules
## Last Updated: March 25, 2026

## AG (Antigravity) Verification Protocol

AG frequently claims deployments, configurations, and features that don't exist.
ALWAYS verify before acting on AG claims.

### Known AG Failure Patterns
1. **Phantom secrets** — AG added TEAM_PASSWORD to apphosting.yaml but never created it in Secret Manager. Broke deploy for hours.
2. **Route moves without middleware updates** — AG moved /ffx, /mvx, /ambient to (ops)/ops/ without updating middleware passthroughs. Caused 404s.
3. **Exaggerated capabilities** — AG claimed WebRTC telemetry, LiDAR ingestion, and mesh routing that were never built. Just UI scaffolding.
4. **"Deploy complete" claims** — AG says "deployment complete" when it only wrote code. Never actually deployed.
5. **Infrastructure scripts never run** — deploy-cron.sh, deploy-iap.sh exist but were never executed.

### Verification Checklist (run after any AG session)
- [ ] `pnpm build` passes? (exit code 0)
- [ ] Any new secrets referenced in apphosting.yaml actually exist?
- [ ] Any moved routes still accessible via middleware?
- [ ] Any claimed "live" features actually reachable via URL?
- [ ] AGENT_LEDGER.md claims match actual file changes? (`git diff`)

---

## Software Budget Rule

Chase will always pay for premium software that increases performance
or reduces friction. If a tool costs $10-50/month and solves a real
problem, recommend it. Don't waste hours working around a free-tier
limitation when a paid tier fixes it in minutes.

Current paid tools:
- Vercel Pro ($20/mo) — 16GB build machines, preview deploys, analytics
- [Add new tools here as adopted]

---

## CC (Claude Code) Operating Rules

1. Never commit without explicit user request
2. Never push to main without explicit user request
3. Never amend commits — always create new ones
4. Verify build passes before pushing
5. Document every deploy configuration change in DEPLOY.md
6. When AG claims something works, verify with `curl` or build before believing it

---

## Multi-Agent Coordination

- AGENT_LEDGER.md is the coordination backbone
- CC owns: build, deploy, infrastructure, code quality
- AG owns: content, narrative, NotebookLM, creative scaffolding
- GA owns: research, analysis, data synthesis
- When in doubt, check the ledger. When the ledger is wrong, fix it.
