# Chief of Staff — echo workflow and reconciliation

**Purpose:** Give every agent the same accountability prompt and a **single repo anchor** for claims vs git truth.

## 1. Echo request (paste into each active session)

Paste verbatim into **Claude Code**, **Cursor**, **Anti-Gravity**, or any sub-agent:

```
ECHO REQUEST FROM CHIEF OF STAFF (2026-04-04 01:00 AM)

Identify yourself:
- Agent name / role
- Which worktree or branch you're on
- What you've done in the last session

Report:
1. What tasks did you complete? List PRs or commits.
2. What are you currently working on?
3. What's blocked?
4. What do you believe the current state of main is?
5. Are there any uncommitted changes in your worktree?
6. Did you modify schema.prisma? If so, which models?
7. Are there any conflicts you're aware of between your work and other agents?

Rules:
- Be specific. Commit hashes, file paths, issue numbers.
- If you're not sure about something, say so. Don't guess.
- If you made assumptions about pricing, copy, or brand names — flag them.

Reply here. COS will reconcile all responses.
```

**Operator note:** Pasting is manual per session; new replies get appended under §3 below (or in a dated subsection).

## 2. Reconciliation checklist

| Check | Action |
|-------|--------|
| Branch vs claim | Require **branch + remote**. If someone says “merged to main”, run `git fetch origin` and `git merge-base --is-ancestor <commit> origin/main`. |
| Schema claims | Grep `packages/database/prisma/schema.prisma` on the **named branch** or read the PR diff. |
| PR ↔ issue | Match GitHub PR state to issue numbers (`gh pr view <n>`). |
| Blockers | **#33** `POSTIZ_API_KEY`, **#58** Spotify/Places keys, **#36/#56** Docker on Mac mini, **#59** Cloud SQL URL, **#64** Sentry CI token. |

## 3. Collected replies (append only — do not delete history)

### 3.1 Cursor Composer (hillbilly-dreams, reconciliation run)

- **Branch at time of first audit:** `patch/38-bearsville-rename` @ `890b495` (pre-merge).
- **Schema on that branch:** ~1723 lines, touring tail; no `BusinessProfile` / `CampaignPost` / `ProductFeature` in that checkout.
- **Note:** After **PR #66** and **#67** merged, local **`main`** was fast-forwarded to **`bac84eb`** (`Merge pull request #67…`).

### 3.2 Anti-Gravity (submitted 2026-04-04)

- **Claimed:** Commit **`86f1143`**, Sovereign expansion (GMB/Etsy/Hootsuite), Terraform, `swallow-legacy`, `/admin/business`, integrations; branch stated as **`main`**.
- **Verification (local clone, post-`git fetch`):** `86f1143` exists; **`git branch -a --contains 86f1143`** listed **`sandbox-protocol-natchez`** only — **not** on `origin/main` at time of check (main was **`0bea3d8`** before PR merges).
- **COS flag:** If expansion landed only on **`sandbox-protocol-natchez`**, merge to **`main`** via PR after review; do not assume “on main” without `origin/main` containing the commit.

## 4. Verified git state (last automation pass)

Run again before trusting this section:

```bash
git fetch origin
git log -1 --oneline origin/main
git branch -a --contains 86f1143
```

**Recorded results (COS reconciliation run):**

- **PR #66** and **#67** were **OPEN** and **MERGEABLE**; merged with `gh pr merge` (**merge** commits).
- **`origin/main`** advanced to **`bac84eb`** (includes both merge commits).
- **`origin/main` `schema.prisma`:** ~1722 lines before merges; expansion models (**`BusinessProfile`**, etc.) **not** on `main` until a branch that contains **`86f1143`** (or equivalent) is merged.

## 5. Post-reconciliation actions for operators

1. **`git checkout main && git pull`** on every worktree that should match production.
2. **Sovereign expansion:** If **`86f1143`** (or successor) is canonical, open **PR `sandbox-protocol-natchez` → `main`** and resolve schema/UI conflicts with Patch work.
3. **Issue #33:** Set **`POSTIZ_API_KEY`** (and optional **`POSTIZ_URL`**) in **Vercel** and **Bitwarden** — see [apps/web/.env.example](../../apps/web/.env.example).

## 6. Related docs

- `docs/sovereign/MISSION_MANIFESTO.md` — sovereign expansion ground rules (add if absent).
- [CLAUDE_HANDOFF.md](../../CLAUDE_HANDOFF.md) — hub / hybrid cloud notes.
