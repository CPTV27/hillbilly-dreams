# Hillbilly Dreams Agent Queue

*Last sync: 2026-04-18T01:59:35*

Status counts: 0 done · 0 running · 8 ready · 10 blocked · **18 total**

## How to use this

```bash
bash scripts/router/status.sh                   # snapshot of state
bash scripts/router/next.sh                     # next ready (copies prompt to clipboard)
bash scripts/router/next.sh --id P04-press-seed # specific project
bash scripts/router/ship.sh <id>                # mark done; auto-unblocks dependents
bash scripts/router/block.sh <id> '<reason>'    # mark blocked
bash scripts/router/unblock.sh <id>             # mark ready
```

Each project below is **paste-ready** — copy the prompt into a fresh Claude or Cursor session and the agent has everything it needs.

---

## ○ Ready (8)

### `P04-press-seed` — Press seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-press.md. Copy the prompt block (between ===== markers). Paste into Perplexity Deep Research with target: 'Press, podcasts, and music writers covering the Mississippi music corridor (Memphis to New Orleans), 2024-2026, with named contacts and beats'. Save the YAML output to /Users/chasethis/hillbilly-dreams/Perplexity-research/press-seed.yaml.

STEP 2 (agent): cd /Users/chasethis/hillbilly-dreams && python3 scripts/directory/ingest-seed.py press. Verify count + confidence breakdown. Edit apps/web/lib/directory/catalogs.ts: change press entry from source: 'md' to source: 'yaml'. Commit: 'feat(directory): canonical press catalog from YAML seed (N records)'. Push.
```
</details>

### `P05-studios-seed` — Studios seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-studio.md. Copy prompt. Paste into Perplexity Deep Research with target: 'Recording studios — active and historic — on the Mississippi music corridor (Memphis to New Orleans), 2024-2026'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/studios-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py studios. Edit apps/web/lib/directory/catalogs.ts: studios source 'md' → 'yaml'. Commit + push.
```
</details>

### `P06-labels-seed` — Labels seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-label.md. Copy prompt. Perplexity target: 'Record labels, music publishers, management companies, booking agencies, entertainment lawyers — Mississippi music corridor 2024-2026'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/labels-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py labels. Edit catalogs.ts: labels source 'md' → 'yaml'. Commit + push.
```
</details>

### `P07-legacy-seed` — Legacy-artists seed (deceased migration)

**Owner:** chase+agent · **Est:** ~15 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-legacy.md (created by background agent A). Copy prompt. Perplexity target: 'Deceased blues, soul, country, gospel, and Americana musicians from the Mississippi corridor, with estate contacts, rights holders, and catalog owners'. Tell Perplexity to include the 52 deceased records currently in musicians-seed.yaml — research them fresh, do not copy. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/legacy-artists-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py legacy-artists. Edit catalogs.ts: legacy-artists source 'md' → 'yaml'. Commit + push.
```
</details>

### `P08-tourism-seed` — Tourism seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-tourism.md (created by background agent A). Copy prompt. Perplexity target: 'Music heritage tourism on the Mississippi corridor — Blues Trail markers, museums (B.B. King, Stax, Sun, Delta Blues, Muddy Waters), juke joint experiences, plantation tours with music context, civil rights sites tied to music history'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/tourism-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py tourism. Edit catalogs.ts: tourism source 'md' → 'yaml'. Commit + push.
```
</details>

### `P09-infra-seed` — Infrastructure seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-infrastructure.md (created by background agent A). Copy prompt. Perplexity target: 'Touring infrastructure for music acts on the Mississippi corridor — rehearsal spaces, PA rental, backline rental, sprinter van rental, merch fulfillment, instrument repair, tour vehicle service'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/infrastructure-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py infrastructure. Edit catalogs.ts: infrastructure source 'md' → 'yaml'. Commit + push.
```
</details>

### `P10-editorial-seed` — Editorial seed → ingest → flip canonical

**Owner:** chase+agent · **Est:** ~12 min

<details><summary>Show prompt</summary>

```
STEP 1 (Chase): Open docs/directory-templates/perplexity-editorial.md (created by background agent A). Copy prompt. Perplexity target: 'Story angles, pitches, and undercovered narratives in Mississippi corridor music — for Big Muddy Magazine and freelance placement at Garden & Gun, Oxford American, NPR Music, Rolling Stone, etc.'. Save YAML to /Users/chasethis/hillbilly-dreams/Perplexity-research/editorial-seed.yaml.

STEP 2 (agent): python3 scripts/directory/ingest-seed.py editorial-pitches. Edit catalogs.ts: editorial-pitches source 'md' → 'yaml'. Commit + push.
```
</details>

### `P16-public-musicians` — Public musician catalog MVP

**Owner:** agent · **Est:** ~120 min

<details><summary>Show prompt</summary>

```
Build public musician catalog at /Users/chasethis/hillbilly-dreams/apps/web/app/musicians/.

Pages needed:
- /musicians — index. Photo card grid. Filterable by state (drop-down), genre (chips), confidence. Default sort: alphabetical.
- /musicians/[slug] — single artist page. Bio, genres, location, links (website/socials), 'Request press kit' button (mailto: for now). Use Big Muddy Magazine aesthetic.
- /musicians/join — onboarding form. Fields: name, primary genre, location (state+city), website, instagram, contact email, 'I'm an active artist (not a heritage figure)' checkbox. POST to /api/musicians/join → write to data/directory/musicians/staging/<slug>.yaml. QR-friendly layout (large fields, no horizontal scroll).

Use the existing data loader at apps/web/lib/directory/catalogs.ts.
Server Components only where possible. 'use client' only on the join form.
Match fonts/colors used by Big Muddy Magazine (Playfair Display + Inter, full-bleed photos, var(--*) tokens — no hardcoded values).

When done: typecheck, commit, push.
```
</details>


## ✕ Blocked (10)

### `P02-hetzner-ssh` — Unblock Hetzner SSH (Phase 0)

**Owner:** chase · **Est:** ~5 min · **Blocked by:** chase

### `P03-hetzner-phase1` — Hetzner Phase 1: Server Foundation

**Owner:** agent · **Est:** ~30 min · **Blocked by:** P02-hetzner-ssh · **Depends on:** P02-hetzner-ssh

### `P11-hetzner-phase2` — Hetzner Phase 2: Traefik + DNS

**Owner:** agent · **Est:** ~30 min · **Blocked by:** P03-hetzner-phase1 · **Depends on:** P03-hetzner-phase1

### `P12-hetzner-phase3` — Hetzner Phase 3: Storage Box mount

**Owner:** chase+agent · **Est:** ~25 min · **Blocked by:** P11-hetzner-phase2 · **Depends on:** P11-hetzner-phase2

### `P13-hetzner-phase4-immich` — Hetzner Phase 4: Immich

**Owner:** agent · **Est:** ~60 min · **Blocked by:** P12-hetzner-phase3 · **Depends on:** P12-hetzner-phase3

### `P14-migrate-postiz-notebook` — Migrate Postiz + Open Notebook off mini

**Owner:** agent · **Est:** ~60 min · **Blocked by:** P11-hetzner-phase2 · **Depends on:** P11-hetzner-phase2

### `P15-synology-external` — Synology External Library (Elijah + agent)

**Owner:** elijah+agent · **Est:** ~30 min · **Blocked by:** P13-hetzner-phase4-immich · **Depends on:** P13-hetzner-phase4-immich

### `P17-prisma-migration` — Prisma migration + DB sync

**Owner:** agent · **Est:** ~90 min · **Blocked by:** P04-P10 (need YAML for all 7 placeholder categories first) · **Depends on:** P04-press-seed, P05-studios-seed, P06-labels-seed, P07-legacy-seed, P08-tourism-seed, P09-infra-seed, P10-editorial-seed

### `P18-hetzner-phase7` — Hetzner Phase 7: bulk photo source ingestion

**Owner:** agent · **Est:** ~180 min · **Blocked by:** P15-synology-external · **Depends on:** P15-synology-external

### `P19-elijah-commerce-pipeline` — Studio C commerce-export pipeline (Immich → GCS → Gallery)

**Owner:** agent · **Est:** ~240 min · **Blocked by:** P13-hetzner-phase4-immich · **Depends on:** P13-hetzner-phase4-immich


---

*Generated by `scripts/router/sync.sh` from `docs/router/queue.json`. Do not edit this file directly — edit the JSON.*