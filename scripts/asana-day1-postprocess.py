#!/usr/bin/env python3
"""
Asana Day 1 post-processor — reads the backup JSON and writes:
  derived/MASTER_LIST.md   — every incomplete task bucketed by date
  derived/ORG_CHART.md     — descriptive org skeleton + proposed structural decisions

Bucketing for MASTER_LIST (date-based default; Chase can override):
  This Week     due in [today, today+7d]            or no due_on but assigned to Chase + project flagged "this week"
  This Month    due in (today+7d, today+30d]
  Phase 2       due in (today+30d, today+150d]      ≈ next ~5 months (Q3 push)
  Phase 3       due > today+150d
  No Date       no due_on at all

Within each bucket: group by project, then by section.
"""

import json, os, datetime
from collections import defaultdict

ARCHIVE = "/Users/chasethis/measurably-better-things/asana-archive/2026-04-25"
RAW = os.path.join(ARCHIVE, "raw")
DERIVED = os.path.join(ARCHIVE, "derived")
os.makedirs(DERIVED, exist_ok=True)

TODAY = datetime.date(2026, 4, 25)
WEEK_END = TODAY + datetime.timedelta(days=7)
MONTH_END = TODAY + datetime.timedelta(days=30)
PHASE2_END = TODAY + datetime.timedelta(days=150)

# ---------- Load ----------
with open(os.path.join(RAW, "projects.json")) as f:
    pidx = json.load(f)
all_projects = pidx["active"] + pidx["archived"]

with open(os.path.join(RAW, "users.json")) as f:
    users = json.load(f)

with open(os.path.join(RAW, "teams.json")) as f:
    teams = json.load(f)

# Load every project file and collect tasks
projects_data = []
for p in all_projects:
    with open(os.path.join(RAW, "projects", f"{p['gid']}.json")) as f:
        projects_data.append(json.load(f))

# ---------- Master List ----------
def parse_date(s):
    if not s: return None
    try: return datetime.date.fromisoformat(s[:10])
    except: return None

def bucket_for(due):
    if due is None: return "No Date"
    if due < TODAY: return "Overdue"
    if due <= WEEK_END: return "This Week"
    if due <= MONTH_END: return "This Month"
    if due <= PHASE2_END: return "Phase 2"
    return "Phase 3"

def walk(t, project, section_path, depth=0):
    """Yield (project_name, project_archived, section, task, depth)."""
    section = section_path
    if not section:
        # Find section from memberships
        for m in t.get("memberships", []) or []:
            sec = m.get("section")
            if sec and sec.get("name"):
                section = sec["name"]
                break
    yield (project, section, t, depth)
    for sub in t.get("_subtasks", []):
        yield from walk(sub, project, section, depth + 1)

# Build buckets
buckets = {b: defaultdict(list) for b in ["Overdue", "This Week", "This Month", "Phase 2", "Phase 3", "No Date"]}
total_open = 0
total_done = 0
for pdata in projects_data:
    p = pdata["project"]
    for top in pdata["tasks"]:
        for proj, section, t, depth in walk(top, p, None):
            if t.get("completed"):
                total_done += 1
                continue
            total_open += 1
            due = parse_date(t.get("due_on") or (t.get("due_at") or "")[:10])
            b = bucket_for(due)
            buckets[b][p["name"]].append((section, t, depth, due))

# Write master list
with open(os.path.join(DERIVED, "MASTER_LIST.md"), "w") as f:
    f.write(f"""# Master List — Asana Day 1

**Source:** Day 1 backup `2026-04-25` ({total_open + total_done} total tasks across 28 projects: {total_open} open, {total_done} completed)
**Bucketing:** date-based (configurable in `scripts/asana-day1-postprocess.py`)
**Today:** 2026-04-25 (Saturday)

| Bucket | Window | Open task count |
|---|---|---|""")
    for b in ["Overdue", "This Week", "This Month", "Phase 2", "Phase 3", "No Date"]:
        n = sum(len(v) for v in buckets[b].values())
        if b == "Overdue":
            window = f"due < {TODAY}"
        elif b == "This Week":
            window = f"due {TODAY} – {WEEK_END}"
        elif b == "This Month":
            window = f"due {WEEK_END + datetime.timedelta(days=1)} – {MONTH_END}"
        elif b == "Phase 2":
            window = f"due {MONTH_END + datetime.timedelta(days=1)} – {PHASE2_END}"
        elif b == "Phase 3":
            window = f"due > {PHASE2_END}"
        else:
            window = "no due date set"
        f.write(f"\n| **{b}** | {window} | {n} |")
    f.write(f"\n\n---\n\n")

    f.write("## How to read this list\n\n")
    f.write("Tasks are grouped by **bucket → project → section**. Indentation reflects subtask depth.\n")
    f.write("Each line: `assignee · due · task name`. Completed tasks are excluded.\n\n")
    f.write("Open the Day 1 raw JSON for the full record (notes, stories, attachments, custom fields):\n")
    f.write(f"`asana-archive/2026-04-25/raw/projects/<project_gid>.json`\n\n---\n\n")

    for b in ["Overdue", "This Week", "This Month", "Phase 2", "Phase 3", "No Date"]:
        n = sum(len(v) for v in buckets[b].values())
        f.write(f"# {b}  ({n} open tasks)\n\n")
        if not buckets[b]:
            f.write("_No tasks in this bucket._\n\n")
            continue
        # Sort projects: archived last, alpha within
        proj_names = sorted(buckets[b].keys(),
                            key=lambda n: (any(p["name"] == n and p.get("archived")
                                               for p in all_projects), n.lower()))
        for pname in proj_names:
            archived = any(p["name"] == pname and p.get("archived") for p in all_projects)
            tag = " *(archived)*" if archived else ""
            f.write(f"## {pname}{tag}\n\n")
            # Group by section
            by_sec = defaultdict(list)
            for section, t, depth, due in buckets[b][pname]:
                by_sec[section or "(no section)"].append((t, depth, due))
            for sec_name in sorted(by_sec.keys()):
                if sec_name and sec_name != "(no section)":
                    f.write(f"**{sec_name}**\n\n")
                # Sort by due, then by name
                by_sec[sec_name].sort(key=lambda x: (x[2] or datetime.date(9999, 12, 31), x[0]["name"].lower()))
                for t, depth, due in by_sec[sec_name]:
                    indent = "  " * depth + "- "
                    assignee = ((t.get("assignee") or {}).get("name") or "—")[:18]
                    due_s = (str(due) if due else "      ——") + "  "
                    name = t.get("name", "(unnamed)")
                    f.write(f"{indent}`{assignee:<18} · {due_s}` {name}\n")
                f.write("\n")
            f.write("\n")
        f.write("\n")

print(f"  → derived/MASTER_LIST.md  ({total_open} open tasks bucketed)")

# ---------- Org Chart Skeleton ----------
# Build per-project-per-user load
user_load = defaultdict(lambda: defaultdict(int))  # user_name -> project_name -> count of open tasks
user_buckets = defaultdict(lambda: defaultdict(int))  # user_name -> bucket -> count
proj_owners = {}
proj_member_counts = defaultdict(int)
proj_open_counts = defaultdict(int)

for pdata in projects_data:
    p = pdata["project"]
    pname = p["name"]
    owner = (p.get("owner") or {}).get("name", "—")
    proj_owners[pname] = owner
    proj_member_counts[pname] = len(p.get("members", []) or [])
    open_count = 0
    for top in pdata["tasks"]:
        for proj, section, t, depth in walk(top, p, None):
            if t.get("completed"): continue
            open_count += 1
            assignee = ((t.get("assignee") or {}).get("name") or "Unassigned")
            user_load[assignee][pname] += 1
            due = parse_date(t.get("due_on") or (t.get("due_at") or "")[:10])
            user_buckets[assignee][bucket_for(due)] += 1
    proj_open_counts[pname] = open_count

with open(os.path.join(DERIVED, "ORG_CHART.md"), "w") as f:
    f.write("""# Org Chart Skeleton — Asana Day 1

**Source:** Day 1 backup `2026-04-25`
**Status:** Descriptive (Section A) + proposed structural decisions with blanks (Section B)
**Decision authority:** Chase. Tracy reviews. Then we restructure Asana to match.

---

## Section A — Current state (descriptive)

### A.1 Workspace

- **Workspace:** chasepierson.tv (gid `1211216881488780`, Asana Organization)
- **Active projects:** 25
- **Archived projects:** 3
- **Total users with workspace seats:** """ + str(len(users)) + """

### A.2 Users in workspace

| Name | Email | Notes |
|---|---|---|
""")
    for u in sorted(users, key=lambda u: u.get("name", "").lower()):
        notes = ""
        email = u.get("email", "—")
        # Annotate duplicates
        same_name = [x for x in users if x.get("name", "").split()[0] == u.get("name", "").split()[0]]
        if len([x for x in users if x.get("name") == u.get("name")]) > 1:
            notes = "**duplicate account** — same display name as another seat; consolidate"
        elif "@chasepierson.tv" in email and u.get("name") not in ("Chase Pierson",):
            notes = "service / shared account"
        elif "mycocentric" in email:
            notes = "**unknown** — flag for review (probable orphan from prior client work)"
        f.write(f"| {u.get('name','?')} | `{email}` | {notes} |\n")

    f.write("""
### A.3 Teams

| Name | Description |
|---|---|
""")
    for t in teams:
        f.write(f"| {t.get('name','?')} | {(t.get('description') or '—')[:60]} |\n")

    f.write("""
### A.4 Projects — owners + load

Owner = the Asana "owner" field on the project. Open tasks = top-level + subtasks, incomplete only.

| Project | Owner | Members | Open tasks |
|---|---|---:|---:|
""")
    for pdata in sorted(projects_data, key=lambda p: p["project"]["name"].lower()):
        p = pdata["project"]
        if p.get("archived"): continue
        f.write(f"| {p['name']} | {proj_owners.get(p['name'], '—')} | {proj_member_counts.get(p['name'], 0)} | {proj_open_counts.get(p['name'], 0)} |\n")

    f.write("\n*Archived projects (kept for reference):*\n\n")
    f.write("| Project | Owner | Open tasks |\n|---|---|---:|\n")
    for pdata in sorted(projects_data, key=lambda p: p["project"]["name"].lower()):
        p = pdata["project"]
        if not p.get("archived"): continue
        f.write(f"| {p['name']} | {proj_owners.get(p['name'], '—')} | {proj_open_counts.get(p['name'], 0)} |\n")

    f.write("""
### A.5 Per-user open-task load (across all active projects)

Sorted by total open count.

| User | Total open | This Week | This Month | Phase 2 | Phase 3 | No Date | Top projects |
|---|---:|---:|---:|---:|---:|---:|---|
""")
    user_totals = sorted(user_load.items(),
                         key=lambda x: -sum(x[1].values()))
    for uname, projs in user_totals:
        total = sum(projs.values())
        if total == 0: continue
        b = user_buckets[uname]
        top3 = sorted(projs.items(), key=lambda x: -x[1])[:3]
        top3_str = "; ".join(f"{n} ({c})" for n, c in top3)
        f.write(f"| {uname} | {total} | {b.get('This Week',0)} | {b.get('This Month',0)} | {b.get('Phase 2',0)} | {b.get('Phase 3',0)} | {b.get('No Date',0)} | {top3_str} |\n")

    f.write("""
### A.6 Observations from the data

- **Unassigned load**: see "Unassigned" row above. These tasks have no owner.
  In the Asana zero-out, every Unassigned open task either gets an owner or
  gets archived.
- **Duplicate Asana seats**: Tracy and Amy each have two accounts (their
  thebigmuddyinn.com address + their personal Gmail). Consolidate to one
  seat per person; pick the address that matches their primary identity in
  Bitwarden + Google Workspace.
- **Service accounts**: `bigmuddy@chasepierson.tv`, `team@chasepierson.tv`
  (Elijah), and `mycocentricllc@gmail.com` are non-human or partner seats.
  Decide: are these still needed? If yes, document who controls them.
- **Owner concentration**: Chase owns the majority of projects + tasks.
  Section B proposes a re-distribution.

---

## Section B — Proposed structural decisions  (DRAFT — Chase to fill blanks)

### B.1 Departments / functional areas (proposal)

Proposed top-level Asana team structure. Each department gets:
- A team in Asana
- A primary owner
- A "department wiki" project for SOPs/policy
- Project membership scoped to that department's people

| Department | Primary owner | Backup | Scope (in plain English) | Approved? |
|---|---|---|---|---|
| **Touring & Talent** | _____ | _____ | Booking, contracts, transport, talent acquisition (Big Muddy Touring + Records) | ☐ |
| **Hospitality & Inn Ops** | Amy Allen | _____ | The Inn day-to-day (rooms, bar, kitchen, housekeeping, guest experience) | ☐ |
| **Finance & Admin** | Tracy Alderson Allen | _____ | LLC formation paperwork, banking, bookkeeping, vendor contracts, insurance | ☐ |
| **Editorial & Media** | _____ | _____ | Magazine, Radio, podcasts, social, photo direction | ☐ |
| **Product & Engineering** | Chase Pierson | _____ | MBT platform (Glass Engine), web sites, AI agents, infrastructure | ☐ |
| **Sales & Partnerships** | _____ | _____ | Big Muddy partner onboarding, Vicki broker pilot, Bearsville activation, Lyra | ☐ |
| **Photography (CPP)** | Chase Pierson | _____ | Chase Pierson Photography, gallery, commercial shoots | ☐ |

> **Decision needed**: who owns Touring & Talent and Editorial & Media, given
> JP's deal isn't finalized? (`feedback_chase_is_gatekeeper.md` says don't
> name JP publicly.) Default if blank: Chase owns until the deal closes.

### B.2 Project-to-department mapping (proposal — flag exceptions)

| Current project | Proposed department | Action |
|---|---|---|
| Big Muddy Touring | Touring & Talent | keep, re-team |
| Music & Entertainment — Big Muddy Records | Touring & Talent | keep, re-team |
| Hillbilly Dreams Inc | _DEPRECATE_ | rename → "Measurably Better Things — Holding"; archive HDI references |
| Biz Dev Pipeline | Sales & Partnerships | keep, re-team |
| Big Muddy — Partner Onboarding (April 2026) | Sales & Partnerships | keep |
| Tracy — Business & Finance | Finance & Admin | rename "Finance & Admin — Backlog" |
| JP — Shows & Programming | Touring & Talent | keep, owner = JP if deal closes; else Chase |
| Amy — Inn & Bar Ops | Hospitality & Inn Ops | keep, owner = Amy |
| Chandra — Housekeeping | Hospitality & Inn Ops | keep, sub-team |
| JP Houston — Music Consultant | Touring & Talent | merge with JP — Shows & Programming |
| Studio C Control Center | Product & Engineering | keep, partner-facing |
| Studio C — Engineering | Product & Engineering | keep, sub-team |
| Bearsville Creative | Sales & Partnerships | keep |
| Big Muddy Magazine | Editorial & Media | keep, owner = ___ |
| Big Muddy Radio | Editorial & Media | keep, owner = ___ |
| Marketing Department — 4-Week Sprint | Editorial & Media | wrap up sprint, then archive |
| Deep South Directory | Product & Engineering | keep — module dev, NOT walk-in sales (per CLAUDE.md) |
| Hillbilly Dreams Org Chart & Brand Map | _DEPRECATE_ | absorb into "MBT — Brand & Identity" under Editorial |
| Launch — April 2026 | _CLOSE_ | wrap, archive once April work is done |
| Shot List — Real Photo Pipeline | Photography (CPP) | keep |
| Shot List — Real Photos Needed | Photography (CPP) | merge with above |
| TEMPLATE — Vendor Contract | Finance & Admin | keep, template only |
| Chase Pierson Photography — Website Build | Photography (CPP) | keep |
| Chase Pierson Photography — Launch Setup | Photography (CPP) | keep |
| Corporate Structure — April 2026 | Finance & Admin | keep — active MBT formation work |
| Cross-functional project plan *(archived)* | — | leave archived |
| Monumental Taco *(archived)* | — | leave archived |
| Scan2Plan Airtable *(archived)* | — | leave archived (S2PX was archived 03/25/2026) |

### B.3 Asana account consolidation (proposal)

| User | Recommended action | Decision |
|---|---|---|
| Tracy Alderson Allen — `tracy@thebigmuddyinn.com` + `tracyaldersonallen@gmail.com` | Pick ONE primary. Recommend the work address (`tracy@thebigmuddyinn.com`) for tax + audit cleanliness. Migrate task assignments + memberships, then deactivate the personal-Gmail seat. | ☐ |
| Amy Allen — `amy@thebigmuddyinn.com` + `amyaldersonallen@gmail.com` | Same as Tracy. Pick `amy@thebigmuddyinn.com` as primary. | ☐ |
| Big Muddy — `bigmuddy@chasepierson.tv` | Service account. Document purpose (likely catchall / shared inbox). Keep or retire. | ☐ |
| Elijah Tuttle — `team@chasepierson.tv` | Partner seat (Tuthill Design). Keep, but if MBT Workspace migration happens, consider moving Elijah to a dedicated partner identity. | ☐ |
| `mycocentricllc@gmail.com` | **Unknown / orphan.** Identify who this is. If no longer relevant, deactivate. | ☐ |

### B.4 What "Asana zero-out" means in practice (proposal)

Once Section B above is approved, the destructive zero-out pass does:

1. Re-team every active project per B.2
2. Re-assign Unassigned open tasks (per A.5) — every task gets an owner or gets archived
3. Consolidate duplicate user seats per B.3
4. Archive `_CLOSE_`-flagged projects in B.2 once their April work wraps
5. Rename `_DEPRECATE_`-flagged projects per B.2
6. Replace the existing `Tracy — Business & Finance` / `Amy — Inn & Bar Ops` /
   `JP — Shows & Programming` / `Chandra — Housekeeping` per-person projects with
   department-level projects + per-person sections inside them, OR keep the per-person
   projects as personal backlogs and add department-level projects on top
   (Chase decides — both work)

**Nothing in step B.4 happens without explicit Chase greenlight.** This file is a draft for review.

---

*Generated 2026-04-25 by `scripts/asana-day1-postprocess.py` from the Day 1 backup.*
""")

print(f"  → derived/ORG_CHART.md")
print("DONE")
