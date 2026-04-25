#!/usr/bin/env python3
"""
Asana Day 1 SHORT_LISTS — pull surviving 112 open tasks, build per-person
short lists (≤7 each), produce a single proposal doc for Chase to approve.

Inputs:  live Asana state (via PAT)
Outputs: derived/SHORT_LISTS.md
         derived/BIG_MUDDY_REASSIGN.md   (the 49 service-account tasks needing owner)

Per-person target: ≤7 high-leverage items.
JP excluded entirely (per Chase: "JP is sending us mixes and that's it").
JP-named projects flagged for archive.
"""

import json, urllib.request, datetime, os
from collections import defaultdict

PAT = "2/1211216881488767/1213753731599360:8b45ddff7dfb6f0742d1e4653d2ab16a"
WS = "1211216881488780"
OUT = "/Users/chasethis/measurably-better-things/asana-archive/2026-04-25/derived"
TODAY = datetime.date(2026, 4, 25)

def api(path, params=None):
    qs = ""
    if params:
        qs = "?" + "&".join(f"{k}={v}" for k,v in params.items())
    req = urllib.request.Request(f"https://app.asana.com/api/1.0{path}{qs}",
                                 headers={"Authorization": f"Bearer {PAT}"})
    return json.loads(urllib.request.urlopen(req, timeout=30).read())

def paged(path, params):
    out = []
    offset = None
    while True:
        p = dict(params)
        if offset: p["offset"] = offset
        d = api(path, p)
        out.extend(d.get("data", []))
        nxt = (d.get("next_page") or {}).get("offset")
        if not nxt: break
        offset = nxt
    return out

def parse_dt(s):
    if not s: return None
    try: return datetime.datetime.fromisoformat(s.replace("Z", "+00:00"))
    except: return None

# ---- Pull all active projects ----
projects = paged(f"/workspaces/{WS}/projects",
                 {"archived": "false", "limit": 100, "opt_fields": "name"})

# ---- Pull surviving open tasks, with full fields ----
all_open = []  # list of (project_name, task_dict)
for p in projects:
    pgid = p["gid"]
    tasks = paged(f"/projects/{pgid}/tasks",
                  {"limit": 100,
                   "opt_fields": ("name,completed,assignee.name,due_on,modified_at,"
                                  "created_at,permalink_url,notes,memberships.section.name")})
    for t in tasks:
        if not t.get("completed"):
            all_open.append((p["name"], t))

print(f"Live open tasks (active projects only): {len(all_open)}")

# ---- Group by assignee ----
by_ass = defaultdict(list)
for pname, t in all_open:
    ass = (t.get("assignee") or {}).get("name") or "Unassigned"
    by_ass[ass].append((pname, t))

# ---- Score each task for short-list selection ----
# Higher score = keep on short list
def score(pname, t):
    s = 0
    # Active project bonus
    HIGH_PRIORITY_PROJECTS = {
        "Big Muddy — Partner Onboarding (April 2026)": 50,
        "Corporate Structure — April 2026": 40,
        "Launch — April 2026": 30,
        "Tracy — Business & Finance": 20,
        "Amy — Inn & Bar Ops": 20,
        "Chase Pierson Photography — Website Build": 25,
        "Chase Pierson Photography — Launch Setup": 25,
        "Big Muddy Magazine": 20,
        "Big Muddy Touring": 30,
        "Big Muddy Radio": 15,
        "Biz Dev Pipeline": 15,
        "Studio C Control Center": 10,
        "Studio C — Engineering": 10,
    }
    s += HIGH_PRIORITY_PROJECTS.get(pname, 5)
    # Recently modified bonus
    mod = parse_dt(t.get("modified_at", ""))
    if mod:
        days_ago = (datetime.datetime.now(mod.tzinfo) - mod).days
        if days_ago < 7: s += 30
        elif days_ago < 14: s += 15
        elif days_ago < 30: s += 5
    # Has due date bonus
    if t.get("due_on"): s += 10
    # Penalize HDI / S2P / archived language
    name = t.get("name", "").lower()
    if any(k in name for k in ["hdi ", "s2p ", "scan2plan", "[hold]", "[archive]"]):
        s -= 20
    return s

# ---- Per-person top N ----
TARGET = 7
TOP_PEOPLE = ["Chase Pierson", "Tracy Alderson Allen", "Amy Allen", "Elijah Tuttle"]

short_lists = {}
runner_ups = {}
for person in TOP_PEOPLE:
    items = by_ass.get(person, [])
    items.sort(key=lambda x: -score(x[0], x[1]))
    short_lists[person] = items[:TARGET]
    runner_ups[person] = items[TARGET:]

# ---- JP handling ----
jp_open = by_ass.get("JP Houston", [])

# ---- "Big Muddy" service account — needs re-routing ----
bm_service = by_ass.get("Big Muddy", [])

# ---- Unassigned ----
unassigned = by_ass.get("Unassigned", [])

# ---- Write SHORT_LISTS.md ----
def fmt_task(pname, t, indent=""):
    name = t.get("name", "")
    due = t.get("due_on") or "    ——    "
    proj = pname[:30]
    url = t.get("permalink_url", "")
    return f"{indent}- **{name}**  \n{indent}  `{proj}` · due `{due}` · [open in Asana]({url})"

with open(os.path.join(OUT, "SHORT_LISTS.md"), "w") as f:
    f.write(f"""# Per-Person Short Lists — Day 1 zero-out proposal

**Run date:** 2026-04-25
**Pre-zero-out open count:** 448
**Post-zero-out open count:** {len(all_open)} (-{448 - len(all_open)} = {100 * (448 - len(all_open)) // 448}% reduction)
**Target after this proposal:** ≤7 per person × 4 people + Cos-in-flight = ~30 active items

## How to read this proposal

For each person: their **Top {TARGET}** (proposed short list — what stays on their plate)
plus the **Runner-ups** below it (proposed to retire OR move to a backlog project).

**JP Houston:** zero items routed to JP. Per Chase: "JP is sending us mixes and that's it."
JP-named projects (`JP — Shows & Programming`, `JP Houston — Music Consultant`) flagged
for archive at the bottom of this doc.

**"Big Muddy" service account (49 open tasks):** these are essentially unowned —
they're routed to a shared catchall account, not a real person. They need re-routing
or closing. See `BIG_MUDDY_REASSIGN.md` (separate file).

---

""")

    for person in TOP_PEOPLE:
        sl = short_lists[person]
        ru = runner_ups[person]
        f.write(f"## {person} — short list ({len(sl)} of {len(by_ass.get(person, []))} open)\n\n")
        if not sl:
            f.write("_No open tasks._\n\n")
        else:
            for pname, t in sl:
                f.write(fmt_task(pname, t) + "\n\n")
        if ru:
            f.write(f"### Runner-ups for {person} ({len(ru)} items — propose to retire OR move to backlog)\n\n")
            for pname, t in ru:
                name = t.get("name", "")
                proj = pname[:30]
                f.write(f"- `{proj:<30}` · {name}\n")
            f.write("\n")
        f.write("---\n\n")

    # JP block
    f.write(f"## JP Houston — close + archive ({len(jp_open)} open)\n\n")
    f.write("Per Chase 2026-04-25: JP sends mixes only. Close all open tasks; archive JP-named projects.\n\n")
    for pname, t in jp_open:
        f.write(f"- `{pname[:30]:<30}` · {t.get('name', '')}\n")
    f.write("\n**Projects to archive:** `JP — Shows & Programming`, `JP Houston — Music Consultant`\n\n")
    f.write("---\n\n")

    # Unassigned + Big Muddy summary
    f.write(f"## Unassigned ({len(unassigned)} open)\n\n")
    for pname, t in unassigned:
        f.write(f"- `{pname[:30]:<30}` · {t.get('name', '')}\n")
    f.write("\nProposal: each gets an owner OR closes. See per-task triage during execution.\n\n")
    f.write("---\n\n")

    f.write(f"""## "Big Muddy" service account ({len(bm_service)} open)

49 tasks routed to the `bigmuddy@chasepierson.tv` shared account. Not a real human.
Detailed re-routing proposal: `BIG_MUDDY_REASSIGN.md`.

Headline: most of these are Inn-ops + Magazine + content tasks that should route
to Amy or Tracy or close.

---

## Cos (in flight + planned)

Things I'm executing or queued — no Asana task needed, tracked in repo:

1. **Day 1 Asana zero-out** — backup ✅, bulk-close 320 ✅, short lists IN FLIGHT, awaiting
   your approval on this proposal to execute step 4 (move/close per the lists)
2. **Phase 5 HDI cleanup** — held for after zero-out completes
3. **Lyra Doc 2** — held until Chase + Tracy double-clear Doc 1 (week of Apr 27)
4. **Daily standup** — repo-tracked
5. **MBT Workspace standup** — your hands required, not mine ($6/mo, 30-45 min, plan in
   `~/.claude/plans/cozy-beaming-minsky.md`)

---

## Approval action

Reply in chat with one of:

- **"go"** — execute the proposal: bulk-close runner-ups + JP + most Big Muddy
  service account, archive JP projects, leave only the short lists. ~80-90 more
  closes. Reversible from archive.
- **"edit"** — tell me what to change. I'll resequence and re-propose.
- **"hold"** — leave Asana state where it is now (112 open). Short lists stay
  as a reading reference but no further closes happen.

""")

# ---- BIG_MUDDY_REASSIGN.md ----
with open(os.path.join(OUT, "BIG_MUDDY_REASSIGN.md"), "w") as f:
    f.write(f"""# "Big Muddy" service-account task re-routing

**Source:** `bigmuddy@chasepierson.tv` user (49 open tasks)
**Status:** This is a shared catchall account, not a real human. Tasks routed here
have no real owner. Proposal: re-route to Chase / Tracy / Amy, or close.

| # | Project | Task | Proposed action |
|---|---|---|---|
""")
    by_proj = defaultdict(list)
    for pname, t in bm_service:
        by_proj[pname].append(t)
    i = 1
    for pname in sorted(by_proj.keys()):
        for t in by_proj[pname]:
            name = t.get("name", "")
            # Default routing logic
            n_lower = name.lower()
            proj_lower = pname.lower()
            if "amy" in proj_lower or "inn" in proj_lower or "bar" in proj_lower or "kitchen" in n_lower or "room" in n_lower:
                action = "→ Amy"
            elif "magazine" in proj_lower or "edit" in n_lower or "publish" in n_lower:
                action = "→ Tracy (or Amy)"
            elif "tracy" in proj_lower or "finance" in proj_lower or "tax" in n_lower:
                action = "→ Tracy"
            elif "radio" in proj_lower or "playlist" in n_lower:
                action = "→ Amy (Inn ambient)"
            elif "directory" in proj_lower or "listings" in n_lower:
                action = "→ close (Directory pivoted to B2B per CLAUDE.md)"
            elif "launch" in proj_lower or "happy hour" in n_lower or "found" in n_lower:
                action = "→ close (April launch wrap)"
            else:
                action = "→ Chase to triage"
            f.write(f"| {i} | `{pname[:25]}` | {name[:60]} | {action} |\n")
            i += 1
    f.write("\nApproval: same as SHORT_LISTS.md — reply `go` / `edit` / `hold`.\n")

print(f"  → derived/SHORT_LISTS.md")
print(f"  → derived/BIG_MUDDY_REASSIGN.md")
print(f"  Per-person targets: {sum(len(short_lists[p]) for p in TOP_PEOPLE)} keepers")
print(f"  Runner-ups: {sum(len(runner_ups[p]) for p in TOP_PEOPLE)}")
print(f"  JP closes: {len(jp_open)}")
print(f"  Big Muddy service to re-route: {len(bm_service)}")
print(f"  Unassigned to triage: {len(unassigned)}")
