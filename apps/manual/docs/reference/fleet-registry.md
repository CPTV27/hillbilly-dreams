---
title: Fleet Registry
sidebar_position: 3
---

# Fleet Registry — Every HDI Machine

**The canonical list of every machine under HDI management.** Update this file whenever a new machine joins the fleet or one gets decommissioned.

## Desktops + laptops

| Machine | User | IP | SSH Key | Role | Setup log |
|---|---|---|---|---|---|
| Chase's MacBook Pro | chasethis | local | — | Dev, code, deployment, Claude Code primary | *(not logged)* |
| Mac mini | ClawdBOT | 192.168.4.37 | `~/.ssh/id_mini` | Broadcasting, Plex, Icecast, Postiz, HDI services | See [Broadcasting Runbook](https://github.com/CPTV27/hillbilly-dreams/blob/main/docs/runbooks/broadcasting.md) |
| Tracy's iMac | tracyfort | 192.168.4.26 | Chase's laptop-to-mini key installed | Inn ops, hospitality, bookings, finance | [Tracy iMac setup](https://github.com/CPTV27/hillbilly-dreams/blob/main/.claude/agents/IMAC_TRACY_SETUP_PROMPT.md) |
| **Amy's Mac** | *(TBD — fill in after setup)* | *(TBD)* | *(TBD)* | Inn & Bar ops, music, content approval | [Amy computer setup](/amy/computer-setup) |

## Phones

| User | Device | Apple ID | Primary account | Notes |
|---|---|---|---|---|
| Chase | iPhone | personal | `me@chasepierson.tv` | Also runs the Delta Dawn Shortcut |
| Tracy | iPhone | personal | `tracyaldersonallen@gmail.com` | Also `tracy@thebigmuddyinn.com` in Mail |
| Amy | iPhone | personal | `amyaldersonallen@gmail.com` | Also `bigmuddy@chasepierson.tv` |
| Elijah | *(TBD)* | *(TBD)* | `team@chasepierson.tv` | *(not yet set up)* |
| Miles | *(TBD)* | *(TBD)* | `team@chasepierson.tv` | *(not yet set up)* |

## iPads

| User | iPad | Role | Status |
|---|---|---|---|
| Chase | iPad Pro | Dev support, photography, HomeKit control | Active |
| Tracy | iPad | Inn ops, hospitality, HomeKit | *(returned from Ardent? check task "Get iPad Pro Back from Ardent")* |
| Amy | iPad | *(none yet)* | *(not set up)* |

## Shared HDI devices

| Device | Location | Role |
|---|---|---|
| HomePod mini | Studio (at the Inn) | HomeKit hub |
| Apple TV 4K | *(TBD)* | HomeKit hub candidate, TV display for common areas |
| Sprinter van | Rolling | Touring + mobile production kit |

## Decommissioned / archived

| Machine | Decommissioned | Reason |
|---|---|---|
| *(none yet)* | | |

## Network topology

```
Internet
  │
Router (at the Inn, 192.168.4.1)
  ├─ Mac mini            192.168.4.37  (ClawdBOT)
  ├─ Tracy's iMac        192.168.4.26  (tracyfort)
  ├─ Amy's Mac           TBD
  ├─ Chase's MacBook Pro 192.168.4.XX  (DHCP)
  └─ Various iPads/iPhones via Wi-Fi
```

## Services running on the Mac mini (ports)

| Port | Service | Credentials |
|---|---|---|
| 8080 | OpenBroadcaster | admin/bigmuddy2026 |
| 8010 | Icecast | source/bigmuddy-source, admin/bigmuddy-admin |
| 8888 | Big Muddy TV HLS encoder | none (LAN only) |
| 32400 | Plex Media Server | Chase's Plex account |
| 5055 | Open Notebook | *(check Bitwarden)* |
| 4007 | Postiz | *(check Bitwarden)* |

All port-mapped services are **LAN-only** — do not expose publicly without explicit security review.

## Credentials registry (by reference only — actual values in Bitwarden)

- **Mac mini root SSH:** `~/.ssh/id_mini` on Chase's MacBook
- **OpenBroadcaster admin:** Bitwarden entry "Mac mini — OpenBroadcaster"
- **Icecast source:** Bitwarden entry "Icecast — Big Muddy Radio"
- **Plex:** Chase's personal Plex account, Tracy + Amy are users
- **Postiz:** Bitwarden entry "Postiz admin"
- **Google Workspace admin:** `me@chasepierson.tv` (super admin), Bitwarden entry "Google Workspace admin"
- **Cloudflare DNS:** Chase's ChasePierson.TV Cloudflare account, Bitwarden entry "Cloudflare account"
- **Vercel:** Chase's personal Vercel account
- **GitHub org:** CPTV27 (Chase's personal), Bitwarden entry "GitHub — CPTV27"
- **ElevenLabs:** "Resolute Golden Eagle" API key, Bitwarden entry

## How to add a new machine to the fleet

1. Start with the [Machine Setup Protocol](/setup/overview)
2. Pick the right device guide: [Mac](/setup/mac) / [iPad](/setup/ipad) / [iPhone](/setup/iphone)
3. During Phase 1, assign the machine a static IP if it's on the Inn LAN
4. During Phase 5, add the machine to this Fleet Registry table
5. Write a per-person setup log under `{user}/computer-setup.md` (e.g., [Amy's computer setup](/amy/computer-setup))
6. Test SSH from Chase's MacBook if remote management is needed
7. Confirm Google Drive + Asana multi-account setup works
8. Commit + push

## Related

- [Machine Setup Protocol](/setup/overview)
- [Mac Setup](/setup/mac)
- [iPad Setup](/setup/ipad)
- [iPhone Setup](/setup/iphone)
- [Google Drive Structure](/reference/google-drive-structure)
- [Tool Registry](/reference/tool-registry)
