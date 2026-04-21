# Open Notebook — Three Notebooks Spec + Remote Access Plan

**Date:** April 20, 2026
**Status:** Spec ready; execution blocked on network access (see §4).
**Instance:** Self-hosted Open Notebook on Mac mini (`192.168.4.37:5055`).
**Target users:** Chase, Tracy, Amy, eventually Elijah + Miles + partnership accountant.

---

## 1. The three notebooks

### Notebook A — Big Muddy Inn Operations

**Name:** `Big Muddy Inn — Operations`
**Description:** The canonical knowledge base for running the Inn. PMS setup, OTA strategy, hospitality labor model, guest ops, Inn-specific financial ledger, operator runbooks. Amy + Tracy are the primary users; Chase + accountant + counsel reference.

**Sources (all from the measurably-better-things repo — URLs below, or upload the files directly):**

1. `docs/THE_THESIS.md` — for context on the Inn's role in the ecosystem
2. `docs/90_DAY_PLAN.md` — §3 hospitality labor + weekly grid tasks for Amy
3. `docs/STORY_KIT.md` — voice rules for any Inn-facing comms
4. `docs/partners/cloudbeds-consultant-sourcing-2026-04-20.md` — PMS setup + Fiverr gig + moot VRBO appendix
5. `docs/partners/vrbo-position-2026-04-20.md` — why Vrbo is skipped
6. `docs/partners/channel-yield-strategy-2026-04-20.md` — Inn OTA tier matrix + demand-gen priority
7. `docs/partners/inn-mbt-investment-history-2026-04-20.md` — Inn → MBT financial relationship, Arden pass-through, partner investment history
8. `docs/ecosystem-classification-taxonomy-2026-04-20.md` — the 8 codes, `INN` focus
9. `docs/ADMIN_ONBOARDING_GUIDE.md` — Tracy + Amy admin tools walkthrough
10. `docs/operations/*` — whatever runbooks exist (ENVIRONMENT_VARIABLES.md and similar)
11. `docs/operator-guides/*` — role-specific guides
12. `docs/voice/big-muddy-inn.md` — brand voice for Inn
13. `docs/voice/big-muddy-magazine.md` — for cross-reference since Magazine feeds Inn bookings
14. `docs/ecosystem-subscriptions-2026-04-20.md` §D — Cloudbeds + Inn-specific subs

### Notebook B — Big Muddy Touring Operations

**Name:** `Big Muddy Touring — Operations`
**Description:** The canonical knowledge base for the touring side: Big Muddy Touring, Big Muddy Records, Big Muddy Radio, Blues Room, Arrie Aslin, partner artists. Amy is the primary user on the artist side; Tracy on the show-promotion + venue relationship side; Chase on strategic + platform.

**Sources:**

1. `docs/THE_THESIS.md` — ecosystem context
2. `docs/90_DAY_PLAN.md` — §4 weekly grid (Touring-tagged rows)
3. `docs/STORY_KIT.md` — voice rules
4. `docs/voice/big-muddy-touring.md`
5. `docs/voice/big-muddy-records.md`
6. `docs/voice/big-muddy-radio.md`
7. `docs/voice/chase-pierson-photography.md` — touring-era photography overlap
8. `docs/partners/tuthill-photography-scope-2026-04-20.md` §3 — Studio C TOUR account (10 hrs/mo against touring production)
9. `docs/partners/scan2plan-tuthill-account-2026-04-20.md` — Tuthill holds production insurance covering touring shoots
10. `docs/ecosystem-classification-taxonomy-2026-04-20.md` — `TOUR` code
11. `docs/brands/arrie-aslin-brand-package-2026-04-20.md` — **CREATE LATER** once the Arrie Aslin agent runs (see `docs/agent-briefs/arrie-aslin-brand-and-site-2026-04-20.md`)
12. `docs/agent-briefs/arrie-aslin-brand-and-site-2026-04-20.md` — the brief itself
13. `docs/touring-rnd-findings.md` or equivalent — if Chase has touring-R&D docs, include them
14. Chris Maxwell research (once Tracy + Amy complete it per their Asana tasks) — add as source later

### Notebook C — The Everything Notebook

**Name:** `MBT / Big Muddy — Everything`
**Description:** Master ecosystem knowledge base. Every canonical doc, every partner doc, every brief, every voice doc. The notebook you query when you're not sure which of the other two covers your question, or when you're asking a cross-cutting strategic question.

**Sources:**

All files under `docs/` in the `measurably-better-things` repo, specifically:

- Every `.md` file at `docs/*.md` (canonical top-level docs — THE_THESIS, 90_DAY_PLAN, STORY_KIT, THE_THESIS_MINDMAP, BUSINESS_ARCHITECTURE, partner-studios-pitch, ecosystem-classification-taxonomy, ecosystem-subscriptions, and all other top-level docs)
- Everything in `docs/partners/` (all partner-specific docs, including Vicki, David Baron, Clubhouse, DCTV, Utopia, dsd-pilot-businesses, and new ones added this week)
- Everything in `docs/agent-briefs/` (per-partner agent setup, Arrie Aslin brief, Tracy Gmail audit prompt)
- Everything in `docs/voice/` (per-brand voice docs)
- Everything in `docs/onboarding/` and `docs/onboarding-2026-04-20/`
- `docs/operations/*`
- `docs/legal/*` (legal drafts in counsel review)
- `docs/brands/*` (brand packages as they get created)

Exclude (don't add):
- `docs/archive/` (intentionally archived — noise)
- `docs/api-reference/` (technical — not strategic)
- `docs/external-review-2026-04-20/` (historical snapshot; the summary is in the canonical docs)

---

## 2. Ready-to-run MCP calls (execute when network works)

Once the Mac mini is reachable (either you're on Natchez LAN, or the tunnel in §4 is up), this spec turns into three `create_notebook` calls plus N `create_source` calls per notebook. Pseudocode:

```
notebookA = create_notebook(
  name="Big Muddy Inn — Operations",
  description="Canonical knowledge base for running the Inn..."
)
for source in notebook_A_sources:
  create_source(
    notebook_id=notebookA.id,
    type="upload",  # or "link" with GitHub URL if repo becomes public
    title=source.title,
    content=source.markdown_content,
    embed=True
  )

# Same pattern for notebookB and notebookC
```

Private-repo caveat: Open Notebook can't fetch raw GitHub URLs from private repos. Either:
- Upload docs as text content (extract markdown from the local clone and pass as `text` type source), or
- Mount the local repo clone into the Open Notebook container and reference local paths, or
- Use a GitHub token at the Mac mini's Open Notebook config

Practical path: **upload as text**. The local clone on Chase's MacBook / Mac mini reads the file and pushes content to the notebook. The `create_source` tool accepts `type="text"` with a `url` or content parameter (verify tool signature at execution time).

---

## 3. Sharing with Tracy + Amy

Open Notebook supports per-user accounts, shared notebooks with permissions, or a single shared admin account. Options:

**Option A — Single shared admin login (simplest, less secure):**
- All three partners (Chase + Tracy + Amy) use the same Open Notebook login
- Credentials stored in Bitwarden shared vault
- Risk: no audit trail of who queried what; shared session state

**Option B — Per-user accounts (if Open Notebook supports multi-user — verify on the deployed instance):**
- Each partner has their own login
- Notebooks are shared with them at read/write permission level
- Cleaner audit, no shared session state
- Requires Open Notebook admin config to create users

**Recommendation:** Option B if Open Notebook's current deployment supports it. Chase verifies on the mini. If not, fall back to Option A and add multi-user config to the backlog.

---

## 4. Remote access — the network problem

Open Notebook lives at `192.168.4.37:5055` on the Mac mini. That's the Natchez LAN. Right now:

- Chase's MacBook needs to be on the Natchez LAN (or via a tunnel) to reach it
- Tracy + Amy, when physically in Natchez, are fine — same LAN
- Anyone remote (Chase driving, Amy on tour, Tracy traveling) is blocked

**Two legit solutions:**

### Solution A — Cloudflare Tunnel (recommended)

Expose Open Notebook at `notebook.chasepierson.tv` via Cloudflare Tunnel. Zero-trust auth via Cloudflare Access ensures only authenticated partnership members can reach it.

Setup on Mac mini:
```
brew install cloudflared
cloudflared tunnel login
cloudflared tunnel create big-muddy-notebook
cloudflared tunnel route dns big-muddy-notebook notebook.chasepierson.tv
cloudflared tunnel run --url http://localhost:5055 big-muddy-notebook
```

Then in Cloudflare Access, add a policy that only me@chasepierson.tv, tracyaldersonallen@gmail.com, and amyaldersonallen@gmail.com can authenticate.

Result: `https://notebook.chasepierson.tv` is reachable from anywhere, auth-gated to the three partners.

Time: ~20 minutes.
Cost: free on Cloudflare's plan.

### Solution B — Tailscale mesh VPN

Install Tailscale on the Mac mini + Chase's MacBook + Tracy's + Amy's devices. Each device gets a private IP on the Tailnet. Open Notebook is reachable at `192.168.4.37:5055` OR the Tailscale device name `.ts.net` address from anywhere.

Cost: free for personal use up to 3 users; $6/user/mo for business. At 3-5 users, free tier is enough initially.

Time: ~10 minutes setup per device.

**Recommendation:** Cloudflare Tunnel. We already use Cloudflare for DNS + email routing; keeps tooling consolidated. Tailscale is a fine Plan B if Cloudflare Tunnel has issues.

---

## 5. Execution sequence

| Step | Owner | When |
|---|---|---|
| 1. Verify Open Notebook is running on mini (SSH to ClawdBOT@192.168.4.37, check port 5055 is listening) | Chase | When back on Natchez LAN OR via existing SSH from remote |
| 2. Set up Cloudflare Tunnel (§4 Solution A) | Chase | Same session |
| 3. Test `https://notebook.chasepierson.tv` reachability from remote | Chase | Same session |
| 4. Add MCP URL in Claude Code config to point at the new Cloudflare Tunnel URL instead of 192.168.4.37:5055 | Chase | Same session |
| 5. Verify MCP `list_notebooks()` works from remote Claude session | Cos / automated | Post-tunnel |
| 6. Create Notebook A (Inn Ops) + add all sources | Cos + Chase | Once MCP works |
| 7. Create Notebook B (Touring Ops) + add all sources | Cos + Chase | Same |
| 8. Create Notebook C (Everything) + add all sources | Cos + Chase | Same |
| 9. Share notebook access with Tracy + Amy (§3) | Chase | Next |
| 10. Tracy + Amy log in, test queries | Tracy + Amy | Week 1 post-creation |

---

## 6. Open questions

1. **Multi-user support:** does the current Open Notebook deployment support multiple accounts, or is it single-admin? (Solution §3 depends on this.)
2. **Source upload size limits:** some docs are long (THE_THESIS is 6K words, 90_DAY_PLAN is 10K+ words). Check Open Notebook's source-length limit per source.
3. **Embedding model config:** verify which embedding model is configured (affects query quality). Check `get_default_models()` once reachable.
4. **Refresh workflow:** when canonical docs update (they do, multiple times per day as we're learning), how do notebook sources stay current? Manual re-upload? Hook into git commit?
5. **Audio / video sources:** Open Notebook supports podcasts + videos. Do we want to add meeting recordings, Arrie Aslin demos, Blues Room recordings to the relevant notebooks? Yes probably — flag for Phase 2.

---

## 7. Link + cross-reference

- Canonical source list for Notebook A (Inn) is derived from `docs/partners/*.md`, `docs/90_DAY_PLAN.md`, `docs/STORY_KIT.md`, `docs/voice/big-muddy-inn.md`, `docs/voice/big-muddy-magazine.md`
- Canonical source list for Notebook B (Touring) is derived from `docs/voice/big-muddy-*.md`, `docs/partners/tuthill-photography-scope-2026-04-20.md`, Arrie Aslin brand package (when produced)
- Everything-notebook is a superset of both plus all other `docs/*` files

When docs change, the notebooks need refresh. Propose: a monthly "notebook refresh" checklist item on the Chase + Cos calendar. If refresh becomes a burden, automate via git hook that pushes changed docs to the notebook on commit.

---

*End of spec.*
