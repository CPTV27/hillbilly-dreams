---
title: Machine Setup Protocol
sidebar_position: 1
---

# Machine Setup Protocol

**This is the canonical process for bringing any new device into the HDI fleet.** Mac, iPad, iPhone, Android, Linux workstation — doesn't matter. The protocol is the same. The details change per device class; see the specific guide.

## The non-destructive rule

**We never wipe anybody's device.** We curate in place, with the owner sitting next to us, explaining every change before we make it. This is the HDI standard and it's not negotiable.

1. **Back up first** (always)
2. **Ask permission on every removal** (the owner's "keep it" always wins)
3. **Keep the creative suite** (anything that touches cameras, photos, audio, or video stays unless explicitly removed)
4. **Make it a workstation, not a phone** (work defaults, work bookmarks, work folders — personal stays personal)
5. **No Apple ID or Google account surgery** (everyone keeps their personal identity; HDI lives on top via Family Sharing and shared Drive folders)

**Trust rule:** Nothing happens without the owner seeing it. Small demo → owner approves → we do it → owner sees the result → next step.

## The five phases

Every machine setup has the same five phases. The per-device guides break each phase down into specific commands and checklists.

### Phase 0 — Pre-work

- Owner has a backup on their own medium (iCloud, Time Machine, Google One, whatever)
- Chase has the owner's consent for the setup pass
- Bitwarden collection is ready to share with the owner
- Owner is in the room or on video

### Phase 1 — Identity

- Confirm who the primary user of the machine is
- Confirm which Apple ID / Google account is signed in
- DO NOT change it unless the owner explicitly asks
- Add secondary accounts for shared HDI identities (e.g., `bigmuddy@chasepierson.tv`, `team@chasepierson.tv`, `me@chasepierson.tv` as appropriate)

### Phase 2 — HDI stack install

Install the HDI core software package. Which apps depend on device class:
- **Mac:** see [Mac Setup](/setup/mac)
- **iPad:** see [iPad Setup](/setup/ipad)
- **iPhone:** see [iPhone Setup](/setup/iphone)
- **Android:** see [Android Setup](/setup/android) *(not yet written)*

Common to all devices: Bitwarden, Google Drive (personal + shared accounts), Asana, Gmail, Claude, Bitwarden browser extension where applicable.

### Phase 3 — Non-destructive curation

Walk through existing apps with the owner. Three categories for each:

- **Keep** (owner uses it, or it's load-bearing macOS/iOS system)
- **Remove** (owner confirms it's not needed)
- **Defer** (owner isn't sure — leave alone, revisit later)

Document what was removed in the owner's per-person setup log (e.g., `amy/computer-setup.md`, `tracy/computer-setup.md`).

### Phase 4 — Folder structure + shared Drive

Set up the canonical HDI folder structure on disk, connected to the shared Google Drive. See [Google Drive Structure](/reference/google-drive-structure) for the authoritative folder map.

Key: teach the owner ONE rule — "When you want a file to end up where the team can see it, put it in the Big Muddy folder. Your personal Drive is only visible to you."

### Phase 5 — Daily loop walkthrough

Sit with the owner for 10 minutes. Walk through what a typical day looks like on this machine: morning → during the day → blockers → end of day → lock screen. This is the most important part. Without it, the owner has a machine full of icons they don't understand.

## Per-device guides

- [Mac Setup](/setup/mac) — desktop / laptop
- [iPad Setup](/setup/ipad) — tablet
- [iPhone Setup](/setup/iphone) — phone
- *(Android setup: not yet written)*

## Per-person setup logs

Every machine setup that actually happens gets a per-person log file. This is where we record what was installed, what was removed, and what was deferred, so the next time someone touches that machine they know the history.

- [Amy's computer setup](/amy/computer-setup)
- [Tracy's iMac setup](/tracy/computer-setup)
- *(Chase's machines: not yet logged, covered elsewhere)*
- *(Elijah, Miles, JP, future hires: add logs as they join)*

## Related

- [Fleet Registry](/reference/fleet-registry) — the canonical list of every HDI-managed machine
- [Google Drive Structure](/reference/google-drive-structure) — folder conventions
- [Tool Registry](/reference/tool-registry) — software used across the fleet
- [Operations Plan](/operations-plan) — how the HDI business operates (context for why the fleet exists the way it does)
