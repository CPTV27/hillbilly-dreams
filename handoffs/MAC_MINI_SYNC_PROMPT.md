# Mac Mini — Sync & Rescue Prompt

**For the Claude Code session running on the Mac mini (`ClawdBOT@192.168.4.37`).**
**Authored by the MacBook Pro session on 2026-04-10 as part of the pre-freeze sweep.**

You are running on Chase's Mac mini at 192.168.4.37. Your job tonight is to get every repo on this machine clean, safe, and synced with `origin`. The MacBook Pro session has already handled everything on its side — this is the Mac mini half.

**The pre-freeze commit series the MacBook shipped tonight:**
- `9fd5952` — chore(pre-freeze): Asana Coordinator agent + shared seats + handbook + docs
- `5da3d70` — fix(manual): escape `<20 icons` checklist item (was breaking CI)

`origin/main` currently has both. Start with `git fetch origin main` on every clone and make sure your local is not ahead of something that matters.

---

## 1. SECURITY FIRST — Leaked GitHub PAT (do this before anything else)

The repo at `~/Sites/bigmuddy` (separate `CPTV27/bigmuddy-portal` repo, NOT the main monorepo) has a GitHub personal access token baked into its `.git/config` remote URL. Format: `https://gho_…@github.com/CPTV27/bigmuddy-portal.git`. This is a security leak.

**Do this:**

1. **Do NOT print the token anywhere.** Not in logs, not in comments, not in commit messages. Even though it's already compromised, don't amplify.

2. **Tell Chase the token needs rotation NOW.** He has to go to https://github.com/settings/tokens, find the token starting with `gho_duIlYT…`, and click **Revoke**. Then create a new one or (better) switch the remote to SSH.

3. **Fix the remote in place** once Chase confirms he's rotated the old one. Replace the HTTPS-with-token URL with either:
   - SSH: `git remote set-url origin git@github.com:CPTV27/bigmuddy-portal.git`
   - Or HTTPS with osxkeychain helper: `git remote set-url origin https://github.com/CPTV27/bigmuddy-portal.git` and then `git config credential.helper osxkeychain` so future auth uses Keychain instead of embedding in the URL.

4. **Search the rest of the filesystem for the same pattern** in case the token was pasted into other places:
   ```bash
   grep -r "gho_" ~/Sites ~/ops ~/Projects ~/.openclaw 2>/dev/null | grep -v ".git/"
   ```
   Report anything found to Chase (without printing the match values themselves — just file paths).

5. **Do not touch `~/.git-credentials` or `~/.netrc` without explicit permission** — those are credential stores.

---

## 2. The T7 monorepo — `/Volumes/T7/BigMuddy/hillbilly-dreams`

This is a clone of `CPTV27/hillbilly-dreams` (the main monorepo). It is currently on branch **`rescue/mini-apr9-2026`** with one un-pushed commit:

- `973e696` — rescue: in-progress radio lineup gallery + entertainment night photos (Apr 9 crashed session)
- 2 files, +144 lines: `apps/web/app/entertainment/page.tsx` (Natchez at Night photo triptych) and `apps/web/app/radio/page.tsx` (The Shows — Poster Gallery, 18 show cards, responsive grid)

**The MacBook Pro session already reviewed the diff and confirmed it's QC-compliant** (uses `var(--font-*)`, `var(--accent)`, `var(--border)`, etc. — no hardcoded fonts, no hardcoded colors). The code is good. What's stopping it from landing is:

- The referenced images aren't in `origin/main` yet:
  - `apps/web/public/images/processed/big-muddy/save-the-hall-ball-001.webp` (exists on T7)
  - `apps/web/public/images/radio/show-posters/*.webp` — all 24 show posters (exist on T7 at `apps/web/public/images/radio/show-posters/`)
- The T7 clone has hundreds of AppleDouble `._*` files cluttering `git status` (macOS metadata from the external drive)
- The T7 clone's git remote HTTPS auth is broken ("could not read Username for 'https://github.com'")

**What to do:**

### Step 2a — Fix the AppleDouble noise
Add this to the T7 clone's `.gitignore` (or the repo's main `.gitignore` if you want it permanent):
```
# macOS AppleDouble metadata (external drives, SMB, AFP)
._*
.DS_Store
```
Then `git rm --cached` any `._*` files that are somehow tracked (they shouldn't be, but check). Don't delete them from disk — they're harmless metadata.

### Step 2b — Fix the HTTPS auth on the T7 clone
Either switch to SSH (preferred):
```bash
cd /Volumes/T7/BigMuddy/hillbilly-dreams
git remote set-url origin git@github.com:CPTV27/hillbilly-dreams.git
```
Or configure the osxkeychain helper. Test with `git fetch origin main` — should succeed without prompting.

### Step 2c — Get the rescue work onto main cleanly
The rescue branch was branched from an older state of main. Rebasing 2 days of divergence is risky. Use this safer approach:

1. Make sure everything is clean:
   ```bash
   git stash push -u -m "mini-rescue-wip $(date -u +%FT%TZ)" || true
   git fetch origin main
   ```
2. Check out the rescue commit as a patch:
   ```bash
   git format-patch -1 973e696 --stdout > /tmp/rescue-apr9.mbox
   ```
3. Check out `main` fresh from origin:
   ```bash
   git checkout main
   git reset --hard origin/main
   ```
4. Apply the patch:
   ```bash
   git am /tmp/rescue-apr9.mbox
   ```
5. If `git am` succeeds, the commit is replayed on main with its original author (Chase) and message. If it fails with conflicts, back out (`git am --abort`) and report to Chase — do NOT force it.

### Step 2d — Push the code AND the images
The rescue commit only contains the .tsx files. The images they reference are in the working tree at T7 but not tracked. Stage them as a separate commit:

```bash
git add apps/web/public/images/radio/show-posters/ apps/web/public/images/processed/big-muddy/save-the-hall-ball-001.webp
```

**Check the total size first** — `du -sh apps/web/public/images/radio/show-posters/ apps/web/public/images/processed/big-muddy/save-the-hall-ball-001.webp`. If any single file is >10 MB, flag it to Chase and don't push — big media belongs in GCS, not git.

If the total is under ~20 MB, commit with:
```bash
git commit -m "feat(media): radio show posters + save-the-hall-ball hero for rescue/mini-apr9 work

Adds the image assets referenced by commit 973e696. 24 radio show posters
used in the new 'The Lineup' gallery on /radio, plus the Save the Hall
Ball hero photo for the new 'Natchez at Night' triptych on /entertainment.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
"
```

Then push:
```bash
git push origin main
```

Watch the CI run on GitHub Actions. If it fails, roll back and report to Chase.

---

## 3. `~/Sites/bigmuddy` — the `bigmuddy-portal` clone

After you handle the leaked token (step 1), check what's actually modified here:

```bash
cd ~/Sites/bigmuddy
git status --short
git diff deploy.sh index.html
```

The modified files (`deploy.sh`, `index.html`) are 2 months old (Feb 4). That's a strong signal this is stale work, not recent, not part of any live feature. **Do not commit these without Chase's explicit OK.** Ask him whether to stash them, commit them, or revert them. If stash, name it clearly: `git stash push -u -m "stale-bigmuddy-portal-feb4"`.

The `.DS_Store` file should just be gitignored globally (add to `~/.gitignore_global` and `git config --global core.excludesfile ~/.gitignore_global`).

---

## 4. `~/Sites/bmt` — the `CPTV27/bmt` clone

This repo has an untracked `demo/video/` directory (32K total, tiny). Check what's in it:

```bash
cd ~/Sites/bmt
ls -la demo/video/
file demo/video/*
```

If it's code, ask Chase what to do with it. If it's a dropped test video, add `demo/` to the `bmt` repo's `.gitignore` and move on. Don't commit binaries without checking sizes.

---

## 5. `~/ops/bigmuddy-ops`

Has one untracked `.DS_Store`. Just add `.DS_Store` to its `.gitignore` if it's not already there. Nothing else to do here.

---

## 6. `~/.openclaw/workspace` and `~/.openclaw/workspace-claude-code`

These are agent workspaces on `master` branches (not `main`), with either no upstream or no commits at all. **Do not touch these unless Chase specifically asks.** They're scratchpads for agent state, not production.

If `~/.openclaw/workspace` has meaningful edits to `AGENTS.md`, `CONTEXT.md`, `MEMORY.md`, `SOUL.md` that Chase wants preserved, commit locally but **do not push** — these live on this machine only.

---

## 7. Report back format

When done, write a report as a new file:
```
~/hdi-sync-report-2026-04-10.md
```

The report should have these sections:
1. **Security** — PAT rotation status, any other secrets found
2. **T7 monorepo** — whether the rescue commit landed, new head SHA, image sizes committed
3. **bigmuddy-portal** — what you did with the stale modifications
4. **bmt** — what you found in demo/
5. **ops + openclaw** — anything notable
6. **What's still pending Chase's call** — the list of things you needed permission for

Then `rsync` or `scp` that report back to Chase's MacBook at `/Users/chasethis/hillbilly-dreams/docs/briefs/mini-sync-2026-04-10.md` so the MacBook session can review it.

---

## Hard rules

- **No `git push --force` anywhere, ever, on any branch.**
- **No destructive operations** (`git reset --hard`, `git clean -fd`, `rm -rf .git`) without Chase's explicit chat confirmation.
- **Do not touch any `.env*` file, `.netrc`, `~/.ssh/`, or anything in `Bitwarden`.**
- **Do not restart, stop, or reconfigure any of the Mac mini broadcasting services** (OpenBroadcaster, Icecast, Plex, Postiz, Open Notebook) while running this sync. They're on ports 8080, 8010, 32400, 4007, 5055 and Amy or Tracy may be listening/watching right now.
- **If `git am` fails, stop.** Do not force anything. Report the conflict to Chase and wait.
- **Big binaries (>10 MB) do not go in git.** If you find a candidate, tell Chase — the right answer is almost always GCS.

---

## When you're done

Paste the final report path and the new `origin/main` SHA back into this conversation:

```
Report: ~/hdi-sync-report-2026-04-10.md
New main SHA: <sha>
Status: clean / conflicts / needs-chase
```

The MacBook session will pick it up from there.
