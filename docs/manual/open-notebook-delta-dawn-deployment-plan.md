# Open Notebook for Delta Dawn — Deployment Plan

**Created:** 2026-05-01
**Owner:** Chase + Cos
**Status:** Plan only — deployment requires Hetzner SSH access (Cos sandbox cannot reach the host directly)

---

## What we're building

An Open Notebook instance, self-hosted on the Hetzner CCX23 box (`bigmuddy-services`), preloaded with the full MBT/Big Muddy/Studio C corpus. Delta Dawn — the Cloudbeds-aware AI agent for the Inn — gets her own notebook inside it.

Open Notebook is the open-source alternative to NotebookLM. Same idea: a corpus of documents + an LLM that can answer questions grounded in that corpus, with citations back to the source. Self-hosted means we own the data and the embeddings.

---

## Why Delta Dawn needs this

Today, Delta Dawn answers Cloudbeds-related questions but has no awareness of:
- The MBT thesis / Inverted Intelligence
- Studio C as production vendor
- The Big Muddy ecosystem (Inn ↔ Touring ↔ Magazine ↔ Records)
- Approval tiers and escalation rules
- The current state of pilots, customers, and production work
- Workflow SOPs once they're written

Without that context, every answer requires Chase to fill in the gaps. With an Open Notebook corpus loaded, Delta Dawn can answer like a competent ops manager who's read every internal doc.

---

## Architectural decisions

### Where it runs

**Hetzner CCX23 `bigmuddy-services`** (5.161.61.151). Already running Caddy + Immich. Open Notebook joins that host alongside existing services. Tailscale-only access (`bigmuddy-services` → 100.89.173.28) for first iteration; public URL added later if needed.

### How users reach it

Phase 1: web UI on a Tailscale-only URL like `notebook.bigmuddy.tail-net.ts.net` or via local port-forward.
Phase 2: Caddy reverse-proxy with auth gate at `notebook.bigmuddytouring.com` once we trust the auth setup.

### What corpus it loads

Three layers:

1. **Public docs** (already on the website) — the manual, /workflows, /the-case, /the-numbers, /explain, /inverted-intelligence, /mbt/modules, /studio-c/brief, /onboarding/studio-c, /big-muddy-acres/welcome.
2. **Internal markdown** (in the repo) — everything under `docs/` except sensitive (legal drafts, partner-only briefs that aren't ready). Roughly 350 files.
3. **Cloudbeds reservation/guest data snapshot** — read-only export, refreshed daily. Lets Delta Dawn answer "who's checking in tomorrow" without hitting the live API.

### Auth + access control

Initial: shared team password (same as the platform). Later: per-user accounts tied to the existing next-auth user table.

### Costs

Open Notebook is OSS. The host is already paid for ($39.99/mo Hetzner CCX23). The new costs:

- Embedding API calls (one-time per doc + incremental): ~$5-20 depending on corpus size
- Inference API calls (every query): ~$0.01-0.10 per query depending on context size, billed via existing Anthropic/Gemini keys

No new monthly subscription.

---

## Deployment plan

### Phase 1 — Stand up the service (Chase or Patch executes)

```bash
# SSH to the box
ssh -i ~/.ssh/id_hetzner chase@5.161.61.151

# Open Notebook is published as a Docker image. Standard install:
sudo mkdir -p /opt/open-notebook && cd /opt/open-notebook

# Get the docker-compose.yml from the official repo
curl -O https://raw.githubusercontent.com/lfnovo/open-notebook/main/docker-compose.yaml

# Configure env. Pull keys from Bitwarden:
#   - OPENAI_API_KEY (or replace with our Anthropic/Gemini equivalent)
#   - SURREAL_USER, SURREAL_PASS (database creds — generate fresh)
cat > .env <<EOF
OPENAI_API_KEY=<from-bitwarden>
ANTHROPIC_API_KEY=<from-bitwarden>
GOOGLE_API_KEY=<from-bitwarden>
SURREAL_USER=root
SURREAL_PASS=<generate-strong-password-and-add-to-bitwarden>
EOF

# Bring it up
docker compose up -d

# Confirm running
docker compose ps
docker compose logs --tail 50
```

### Phase 2 — Caddy reverse-proxy + Tailscale access

Add a stanza to the Caddyfile already running on the box:

```
notebook.bigmuddy.internal {
  reverse_proxy localhost:8502
  basicauth {
    chase <bcrypt-hash-of-team-password>
  }
}
```

Confirm reachable via Tailscale: `curl http://notebook.bigmuddy.internal` from the Mac.

### Phase 3 — Load the corpus

Use the corpus loader script (Cos to write — see `scripts/open-notebook-corpus-load.ts` once written).

```bash
# On the Mac:
cd ~/hillbilly-dreams
npx tsx scripts/open-notebook-corpus-load.ts \\
  --notebook delta-dawn \\
  --layer public-docs \\
  --layer internal-markdown
```

What the script does:

1. Walks `docs/` and `apps/web/public/manual`, `apps/web/public/workflows`, etc.
2. Filters out anything in `docs/legal/` and any file with `confidential: true` in front-matter.
3. Pushes each file to the Open Notebook ingestion endpoint with metadata (source, last-modified, category).
4. Triggers embedding regeneration.
5. Reports: N files loaded, M skipped, K failed.

### Phase 4 — Create the Delta Dawn notebook

In Open Notebook UI: create a notebook named "Delta Dawn." Set system prompt:

> You are Delta Dawn, the Cloudbeds-aware AI agent for The Big Muddy Inn. You answer questions grounded in the loaded corpus: MBT platform docs, Studio C operations, Big Muddy ecosystem, and Cloudbeds reservation data. Default to citing sources. When information is not in the corpus, say so directly. Voice: warm, operational, no marketing puffery. Match the tone of the existing /docs/operations runbooks and the Manual at /manual.

Add the corpus loaded in Phase 3.

Test queries:

- "Who's checking into the Inn next weekend?"
- "What's the Studio C approval tier for a Big Muddy Records release?"
- "Where do I find the brand kit schema?"
- "Summarize the Inverted Intelligence thesis in 3 sentences."
- "What state is the MBT pilot rollout in as of today?"

### Phase 5 — Wire to the chat

Add Delta Dawn as a routing target in `apps/web/lib/ai-models.ts` so Cloudbeds-related escalations from the chat route through Delta Dawn instead of generic Gemini. Implementation TBD when the chat router supports notebook-grounded subagents.

---

## What I (Cos in this sandbox) can do without Hetzner SSH

- ✅ Write the deployment plan (this doc)
- ✅ Write the corpus loader script (`scripts/open-notebook-corpus-load.ts` — pending; not in this PR)
- ✅ Inventory which docs go in the corpus, which get filtered out
- ✅ Draft the Delta Dawn system prompt
- ✅ Document the test query set

## What requires Chase or Patch to execute

- ❌ SSH into Hetzner and run docker compose
- ❌ Generate the SURREAL_PASS and put in Bitwarden
- ❌ Configure the Caddyfile
- ❌ Run the corpus loader against the live host
- ❌ Verify Delta Dawn answers correctly

## Time estimate

- Phase 1 (docker compose up): 15 min on the box
- Phase 2 (Caddy + Tailscale): 15 min
- Phase 3 (corpus load): script writing 30 min, run 5-15 min depending on corpus size
- Phase 4 (notebook setup): 15 min
- Phase 5 (chat wiring): 1-2 hours, separate PR

Total time on the box: ~1 hour. Total time including script-writing: half a day.

## Honesty gate

This deployment will not be done tonight from this Cos sandbox. The plan above is the canonical reference. Chase or Patch executes when they have the box in front of them.

---

## Companion docs

- Hetzner host inventory: `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md`
- Open Notebook upstream: https://github.com/lfnovo/open-notebook
- Delta Dawn current state (Cloudbeds-only, no corpus): `docs/voice/delta-dawn-system-prompt.md` if it exists, otherwise live in `apps/web/lib/delta-dawn-system-prompt.ts`
- The Manual (canonical context for the corpus): `/manual` and `apps/web/public/manual/index.html`
