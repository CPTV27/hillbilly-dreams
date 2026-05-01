# Handoff — From Sandboxed Cos Session → Local Mac Session

**Date:** 2026-05-01 (evening)
**From:** Cos (sandboxed Claude Code session, network-restricted)
**To:** Cos (or successor) running locally on Chase's MacBook with full Mac + network access
**Reason for handoff:** the sandboxed session cannot reach `api.bitwarden.com`, `my.1password.com`, `api.openai.com`, `api.x.ai`, `api.anthropic.com`, or any other LLM provider host (egress allowlist returns `403 host_not_allowed`). All the verification work and any vault/API operation needs to run from a non-sandboxed environment.

---

## Boot sequence for the new session

```
1. cd ~/hillbilly-dreams
2. git pull origin main           ← fast-forward to the latest
3. Read docs/THE_THESIS.md        ← canonical mental model
4. Read CLAUDE.md                 ← project rules
5. Read this file                 ← current state + open items
6. git branch -a                  ← review open feature branches
```

---

## What's shipped to main today

In order of merge time:

| PR | What | Live URL |
|---|---|---|
| #152 | Removed password gate from `/demo/scan2plan` | https://bigmuddytouring.com/demo/scan2plan |
| #153 | the-case: removed inappropriate photos, kept barn renderings | https://bigmuddytouring.com/the-case |
| #154 | `/big-muddy-acres/welcome` public landing for Brian Mitchell | https://bigmuddytouring.com/big-muddy-acres/welcome |
| #155 | Fix: `/big-muddy-acres/welcome` 404 (welcome.html → welcome/index.html) | (resolved 154) |
| #156 | `/mbt/modules` MBT modules + capabilities page | https://bigmuddytouring.com/mbt/modules |
| #157 | `scripts/provision-studio-c-team.ts` — DB-side User records for Elijah + Miles | provisioned in Neon |
| #158 | `/onboarding/studio-c` Studio C team welcome | https://bigmuddytouring.com/onboarding/studio-c |
| #159 | `/inverted-intelligence` v1 (drifted to podcast-only) | (replaced by #160) |
| #160 | `/inverted-intelligence` rolled back to original concept | https://bigmuddytouring.com/inverted-intelligence |
| #161 | **Phase 1 Studio C Production Ops** (schema + state machine + 31 unit tests + docs) — DRAFT, do not merge without Chase review | branch: `feat/studio-c-production-ops` |
| #162 | `/workflows` resource center + `/manual` user manual + Open Notebook deployment plan | https://bigmuddytouring.com/workflows · /manual |
| #163 | `/handoff` readiness charter — measurable definition of "done building" | https://bigmuddytouring.com/handoff |

## Currently open / not yet merged

- **PR #161** — Phase 1 Studio C Production Ops. **Status: draft, waiting on Chase review on a real screen.** Per handoff doc rules, do not merge without his approval. Schema + state machine + 31 passing unit tests. Branch `feat/studio-c-production-ops`.
- **PR currently in progress (the multi-LLM eval branch `feat/multi-llm-eval`)** — adapters added for OpenAI + Grok in `apps/web/lib/ai-models.ts`, plus `scripts/multi-llm-eval.ts`. Not yet opened as a PR. **First task in the new session: open the PR, run a smoke test, merge if clean.**

## High-priority queued work (was blocked by sandbox)

These items should run **first** in the new session since they unblock everything else.

### 1. Verify the AI router actually works (P-03 from the readiness charter)

The router (`apps/web/lib/ai-models.ts`) hasn't been runtime-tested in the sandboxed session because we couldn't reach LLM API hosts. On the Mac with proper env vars, run:

```bash
cd ~/hillbilly-dreams
# Make sure these are exported (or in apps/web/.env.local):
#   ANTHROPIC_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY, GROK_API_KEY, PERPLEXITY_API_KEY

npx tsx scripts/generate-workflow.ts card-to-cloud-ingest \
  "Studio C field card offload with checksums to LucidLink"
```

Expected: a draft workflow markdown lands in `docs/workflows/drafts/card-to-cloud-ingest.md`.
If error: report which provider failed and why.

### 2. Smoke test the multi-LLM eval

```bash
# Tiny smoke test — just two models, no synthesis:
npx tsx scripts/multi-llm-eval.ts \
  --target https://bigmuddytouring.com/the-case \
  --type page-audit \
  --models claude-sonnet,gpt-4o
```

Expected: two markdown files in `docs/evaluations/<today>/<slug>/`. If they look reasonable, expand to the full default panel:

```bash
npx tsx scripts/multi-llm-eval.ts \
  --target https://bigmuddytouring.com/the-case \
  --type page-audit \
  --synthesize
```

Then commit the evaluations as the first real audit output.

### 3. 1Password → Bitwarden migration (script not yet written)

Chase asked me to migrate API keys (and possibly other items) from 1Password to Bitwarden. I couldn't write or run the migration script from the sandbox. **First-class task in the new session:**

1. Inventory items in 1Password:
   ```bash
   eval $(op signin)
   op item list --format json | jq '.[] | {id, title, vault: .vault.name}'
   ```
2. Identify which items are project-relevant (LLM keys, API tokens, deploy creds).
3. Write `scripts/migrate-1password-to-bitwarden.ts` (idempotent: skip if Bitwarden already has matching item).
4. Run, verify, document.

Bitwarden master password should already be unlocked from earlier in the session — if not, `bw unlock` again.

### 4. Asana project consolidation (P-07)

Chase has Asana PAT in Bitwarden. The earlier consolidation attempt got partway but never executed via the API because the sandbox can't reach Asana. With local network access:

```bash
export ASANA_PAT=$(bw get item "Asana PAT — Chief of Staff" | jq -r .login.password)
# (Then write the migration script if not yet present, or run the existing plan.)
```

Plan summary: 30 active projects today, target 13. Key renames + 4 new projects (MBT Platform, Lyrai, Big Muddy Acres, Inverted Intelligence/Outsider Economics) were created earlier. Outstanding: rename 4 projects, migrate tasks, archive ~17 deprecated. See the migration map in earlier conversation transcripts (saved in voice corpus).

### 5. Open Notebook deployment for Delta Dawn (P-05)

Plan exists at `docs/manual/open-notebook-delta-dawn-deployment-plan.md`. The new session can SSH to Hetzner (`ssh -i ~/.ssh/id_hetzner chase@5.161.61.151`) and run the docker compose setup. ~1 hour on the box.

---

## Lower-priority / can wait

These are queued in the punch list (`/handoff`) but don't unblock other work:

- **P-01** — E2E test scaffold for top 10 endpoints (Playwright, runs on every PR)
- **P-02** — Doc-consistency sweep tooling
- **P-04** — Generate 20 router-drafted workflows (depends on #1 verification)
- **P-06** — Public-page audit (use the multi-LLM eval to do this systematically)
- **P-09** — Health-check + Sentry alerting confirmation
- **P-13** — HDI dead-language cleanup pass
- **P-14** — Vendor roster build (Studio C)
- **P-15** — Photo + visual asset audit

Long-term blockers (financial / legal):
- **P-08** — Stripe metering wired
- **P-10** — MBT LLC formation complete
- **P-11** — Studio C NY corp formed
- **P-12** — FarleyPierson LLC closed

---

## Things that did NOT happen tonight (logged for the new session)

- **Voice corpus file** — the long transcript Chase pasted earlier (iCorps call + Studio C plans + Ari Aslin music + personal exchanges) was supposed to land in `docs/voice-clone/voice-corpus-chase.md`. I never actually wrote it. **TODO:** ask Chase if he still wants it saved (the transcript is in the conversation history above this handoff, but writing all of it requires re-pasting from this thread or him pasting again).
- **Asana cleanup** — partially completed earlier (4 new projects created) but rename + migrate + archive never finished due to MCP tool gaps. PAT-driven approach is the path forward.

---

## Architectural decisions locked tonight

- **MBT (Measurably Better Things)** is the platform. **Studio C** is the production vendor Chase hires to run the human-token side. **Studio C is NOT responsible for running MBT** — only for production work + admin of the production pipeline.
- **Big Muddy** is the flagship implementation (and an MBT customer, internally).
- **Studio C will incorporate as a New York corporation** — not yet filed. Three founders: Chase, Elijah, Miles. Working ownership scenario: 5 shares × 20% (3 to founders, 2 reserved for future market partners). Not committed.
- **Inverted Intelligence** is the narrative through-line for everything MBT does, NOT just a podcast. The page at `/inverted-intelligence` was rolled back from podcast-only to thesis-first per the original concept doc.
- **`/handoff` Readiness Charter** is the canonical "done building" definition. 24 criteria across 6 dimensions. Today's score: 3 pass / 11 partial / 10 not started.
- **Repo migration to `measurably-better-things`** — DEFERRED. Chase wants it eventually but it's out of scope for the readiness criteria.
- **Multi-LLM evaluation panel** — new pattern Chase asked for (Grok + Gemini + ChatGPT + Claude + Perplexity all evaluating the same target in parallel, with optional synthesis). Adapters built. Smoke test pending in the new session.

---

## Tools and access state

- **Bitwarden CLI** (`bw`) — unlocked locally on Chase's Mac. Session key was: `lmB4De1H/0vneriKzMOs721axZbaoFd8hSyjNBsrxBz8mZOR7RM44wa93b2IubFvOkg97m6D82W7+SeHhAN28A==` (may be stale by the time the new session starts; re-unlock).
- **1Password CLI** (`op`) — Chase's email is `me@chasepierson.tv`. Signin command:
  ```bash
  op account add --address my.1password.com --email me@chasepierson.tv
  eval $(op signin)
  ```
- **Hetzner SSH** — `ssh -i ~/.ssh/id_hetzner chase@5.161.61.151` (user is `chase`, NOT `root`)
- **Vercel** — deploys via `git push` to main; project at `chase-piersons-projects/hillbilly-dreams`
- **Neon** — production database. Connection string in Bitwarden under "Neon Postgres — HDI Production Database"

---

## Critical rules (re-iterate)

- **Never amend or force-push to main.** Always create new commits, new branches, new PRs.
- **Bitwarden is the source of truth for ALL credentials.** Never hardcode. After creating any credential anywhere, put it in Bitwarden.
- **Tracy and Amy are equity partners**, never employees.
- **HDI is dead language as of 2026-04-18.** New code/docs use MBT. Cleanup of legacy references is queued (P-13).
- **Honesty gate.** Drafts are not authoritative. CI green ≠ deployed. Verify deploys via the live URL, not just commit landing on main.

---

## Suggested first prompt for the new session

> Read `docs/handoff/HANDOFF_TO_LOCAL_SESSION_2026-05-01.md` carefully. Then run the priorities in order: (1) verify the AI router by running `scripts/generate-workflow.ts` with a real workflow, (2) smoke test `scripts/multi-llm-eval.ts` against a known-stable page like `/the-case`, (3) write and run the 1Password → Bitwarden migration script, (4) finish the Asana consolidation. Surface back when each completes or fails. Don't merge PR #161 — that's still pending Chase review.

---

*Cos (sandboxed) signing off. Good luck.*
