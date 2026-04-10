# Asana Agent Handoff — For Chief of Staff

**Owner:** Asana Agent (Claude Code)
**Last Updated:** 2026-04-05
**Status:** Active — Q2 2026 restructure complete

---

## What This Agent Does

The Asana Agent owns the operational state of the Hillbilly Dreams Asana workspace. It can read, create, update, assign, and delete tasks across all projects. It maintains alignment between the Asana workspace and the business priorities defined in `docs/BUSINESS_ARCHITECTURE.md`.

---

## Workspace Overview

**Workspace:** chasepierson.tv (GID: 1211216881488780)
**Team:** Hillbilly Dreams (GID: 1213770213431272)

### People (Canonical Accounts)

| Person | GID | Email | Role |
|--------|-----|-------|------|
| Chase Pierson | 1211216881488767 | me@chasepierson.tv | CEO, CTO |
| Tracy Alderson Allen | 1213857209814579 | tracyaldersonallen@gmail.com | Finance & Inn Ops |
| Amy Allen | 1213838128321988 | amyaldersonallen@gmail.com | Inn & Bar Ops |
| JP Houston | 1213857579742020 | jphoustonlives@gmail.com | Shows & Programming |
| Elijah Tuttle | 1211231604957485 | team@chasepierson.tv | Technical Deployment |

**Duplicate accounts to deactivate:**
- Tracy: 1213753731475710 (tracy@thebigmuddyinn.com)
- Amy: 1213753731475707 (amy@thebigmuddyinn.com)

---

## Active Projects (19)

### Core Operations
| Project | GID | Owner | Purpose |
|---------|-----|-------|---------|
| Hillbilly Dreams Inc | 1213753731475702 | Chase | Corporate + engineering backlog + GitHub issue mirror |
| Launch — April 2026 | 1213945999485433 | Chase | Soft launch (17th) + full launch (27th) milestones |
| Marketing — 4-Week Sprint | 1213828983804994 | Chase | Active sprint (Apr 1-21) |
| Biz Dev Pipeline | 1213828691250638 | Chase | Sales prospects, partnerships |

### Brand Projects
| Project | GID | Owner | Purpose |
|---------|-----|-------|---------|
| Big Muddy Touring | 1213945999361535 | Chase/JP | Shows, booking, transportation |
| Big Muddy Magazine | 1213945999434115 | Chase | Editorial calendar, articles |
| Big Muddy Radio | 1213963697802865 | Chase | Streaming, FM, playlists |
| Music & Entertainment | 1213828982457283 | Chase/JP | Artist pipeline, records, booking |
| Deep South Directory | 1213942613519300 | Chase/Amy | DSD product + client onboarding |
| Bearsville Creative | 1213963715492641 | Chase | Summer 2026 activation (placeholder) |

### People Boards
| Project | GID | Owner | Purpose |
|---------|-----|-------|---------|
| Amy — Inn & Bar Ops | 1213859652065310 | Amy | Amy's operational tasks |
| Tracy — Business & Finance | 1213853652406670 | Tracy | Tracy's finance/compliance tasks |
| JP — Shows & Programming | 1213857209781632 | JP | JP's booking/programming tasks |

### Reference & Vendor
| Project | GID | Owner | Purpose |
|---------|-----|-------|---------|
| HDI — Org Chart & Brand Map | 1213942086710192 | Chase | Living org chart |
| Shot List — Photo Pipeline | 1213828793807810 | Chase | Real photo needs |
| Studio C Control Center | 1211309411699481 | Chase | Client production jobs |
| Chandra — Housekeeping | 1213942086747969 | Tracy | Vendor: housekeeping |
| JP Houston — Music Consultant | 1213942086848908 | Chase | Vendor: JP contract |
| TEMPLATE — Vendor Contract | 1213948091620461 | Chase | Duplicate for new vendors |

---

## Archived Projects (17)

These were archived during the Q2 2026 cleanup. They contain historical data but are not active:

CSV imports (2025): Utopia_App_PM_V1, SuperChase_Coordinator, Design_System_and_Skins, LLM_and_RAG, Ops_and_Purchasing, Supervisor_Rollup

Dead projects: Monumental Taco, Airtable Scan2Plan, Superchase Live., Outsider Economics, Tuthill Design — Clients, Shot List — Real Photo Pipeline

Empty SuperChase shells: SC: Projects, SC: Leads, SC: Expenses, SC: Tasks, SC: Contracts

---

## Assignment Rules

| Domain | Default Owner | Backup |
|--------|--------------|--------|
| Engineering / Platform / GitHub | Chase | — |
| Inn operations, bar, F&B, housekeeping | Amy | Tracy |
| Finance, accounting, legal, insurance | Tracy | Chase |
| Shows, booking, artist relations, music | JP | Chase |
| DSD sales, merchant onboarding | Amy | Chase |
| Marketing, social, content, photography | Chase | — |
| Bearsville Creative (summer) | Chase | Elijah |
| Vendor management | Tracy | Amy |

**Rule:** Every task must have an assignee. No orphan tasks.

---

## Codebase Integration

### scan-asana cron (`apps/web/app/api/cron/scan-asana/route.ts`)
- Runs hourly
- Scans active projects for comments containing actionable feedback
- Auto-creates follow-up tasks assigned to Chase
- PROJECTS array must be kept in sync with active project GIDs

### sync-github-asana cron (`apps/web/app/api/cron/sync-github-asana/route.ts`)
- Mirrors GitHub issues labeled `sync-asana` into HDI project (1213753731475702)
- **Do NOT move engineering tasks out of HDI** — they need to stay for sync to work
- Maps labels: P0 → Urgent, `dsd` → DSD portfolio, `bearsville` → Bearsville

### GitHub webhook (`apps/web/app/api/webhooks/github/route.ts`)
- Real-time mirror of issue events (opened/closed/reopened) into HDI project
- SHA256 HMAC signature verification

---

## What the Chief of Staff Should Know

1. **This agent can be invoked to triage Asana** — ask it to audit task assignments, check for overdue work, or create tasks for new initiatives.

2. **The workspace is now clean** — 36 projects → 19. Every task has an owner. The structure maps to BUSINESS_ARCHITECTURE.md.

3. **When new work comes in**, route it to the correct project using the table above. Don't dump everything into HDI.

4. **Weekly check:** Are there unassigned tasks? Are there tasks past due with no update? The scan-asana cron catches some of this, but a weekly sweep is good hygiene.

5. **New vendors** get their own project: duplicate TEMPLATE — Vendor Contract and rename it.

6. **New team members** need to be added to the Hillbilly Dreams team and given projects relevant to their role.

---

## Key Decisions Made (April 5, 2026)

- VR room tasks were marked complete (not Q2 scope)
- Outsider Economics project archived (publishing-only, no operational tasks)
- Tuthill Design — Clients archived (Elijah not active in Asana)
- Shot List projects consolidated into one
- All artist review tasks assigned to JP
- All listing/GBP tasks assigned to Amy
- All financial/legal tasks assigned to Tracy
- Agent function declaration tasks kept in HDI (engineering backlog)
