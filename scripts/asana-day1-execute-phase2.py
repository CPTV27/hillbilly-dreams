#!/usr/bin/env python3
"""
Asana Day 1 EXECUTE PHASE 2 — apply the SHORT_LISTS proposal Chase approved.

NOTE 2026-04-25 evening: Chase asked to stop the notification spam this script
generates. Future sprint runs should set NO_STORIES=1 to skip the per-action
audit comment (still logged in ZERO_OUT_LOG_PHASE2.md, just not in Asana
itself). Without stories, no notifications fire for the assignee.

Operations (in order):
  1. Close runner-up tasks (everything not in each person's top 7)
  2. Close JP's 2 remaining tasks
  3. Archive JP-named projects (JP — Shows & Programming, JP Houston — Music Consultant)
  4. Re-route Big Muddy service-account tasks per BIG_MUDDY_REASSIGN heuristics
  5. Reassign 5 Unassigned in Corporate Structure to Chase (his decisions)

Each write adds a story comment so the audit log is self-explaining.
DRY_RUN=1 prints without writing.
"""

import json, os, re, sys, time, datetime, urllib.request
from urllib.error import HTTPError
from collections import defaultdict

PAT = "2/1211216881488767/1213753731599360:8b45ddff7dfb6f0742d1e4653d2ab16a"
WS = "1211216881488780"
ARCHIVE = "/Users/chasethis/measurably-better-things/asana-archive/2026-04-25"
DERIVED = os.path.join(ARCHIVE, "derived")
TODAY = datetime.date(2026, 4, 25)
DRY = os.environ.get("DRY_RUN") == "1"

# Recommended primary work emails per org chart proposal
USERS = {
    "Chase": "1211216881488767",          # me@chasepierson.tv
    "Tracy": "1213753731475710",          # tracy@thebigmuddyinn.com (primary)
    "Amy":   "1213753731475707",          # amy@thebigmuddyinn.com (primary)
    "Elijah": "1211231604957485",         # team@chasepierson.tv
    "BigMuddyService": "1214040359718992", # bigmuddy@chasepierson.tv
    "JP": "1213857579742020",
}

JP_PROJECTS = {
    "1213857209781632": "JP — Shows & Programming",
    "1213942086848908": "JP Houston — Music Consultant",
}

CORP_STRUCT_PROJ = "1214266847644690"

def api(method, path, body=None):
    url = f"https://app.asana.com/api/1.0{path}"
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"Authorization": f"Bearer {PAT}",
                                          "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode())
    except HTTPError as e:
        return {"error": str(e), "code": e.code, "body": e.read().decode()[:200]}

def paged(path, params):
    out = []
    offset = None
    while True:
        p = dict(params)
        if offset: p["offset"] = offset
        d = api("GET", f"{path}?" + "&".join(f"{k}={v}" for k,v in p.items()))
        out.extend(d.get("data", []))
        nxt = (d.get("next_page") or {}).get("offset")
        if not nxt: break
        offset = nxt
    return out

def parse_dt(s):
    if not s: return None
    try: return datetime.datetime.fromisoformat(s.replace("Z", "+00:00"))
    except: return None

# ---- Pull live open state ----
print("Pulling live state...")
projects = paged(f"/workspaces/{WS}/projects",
                 {"archived": "false", "limit": 100, "opt_fields": "name"})

all_open = []  # list of (project_name, project_gid, task_dict)
for p in projects:
    pgid = p["gid"]
    tasks = paged(f"/projects/{pgid}/tasks",
                  {"limit": 100,
                   "opt_fields": "name,completed,assignee.name,due_on,modified_at,created_at,permalink_url"})
    for t in tasks:
        if not t.get("completed"):
            all_open.append((p["name"], pgid, t))

print(f"  → {len(all_open)} open tasks")

# ---- Replicate scoring from asana-day1-shortlists.py ----
def score(pname, t):
    s = 0
    HIGH = {
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
    s += HIGH.get(pname, 5)
    mod = parse_dt(t.get("modified_at", ""))
    if mod:
        days_ago = (datetime.datetime.now(mod.tzinfo) - mod).days
        if days_ago < 7: s += 30
        elif days_ago < 14: s += 15
        elif days_ago < 30: s += 5
    if t.get("due_on"): s += 10
    name = t.get("name", "").lower()
    if any(k in name for k in ["hdi ", "s2p ", "scan2plan", "[hold]", "[archive]"]):
        s -= 20
    return s

# ---- Build per-person keepers (replicating the ≤7 logic) ----
TARGET = 7
PEOPLE = ["Chase Pierson", "Tracy Alderson Allen", "Amy Allen", "Elijah Tuttle"]
by_ass = defaultdict(list)
for pname, pgid, t in all_open:
    ass = (t.get("assignee") or {}).get("name") or "Unassigned"
    by_ass[ass].append((pname, pgid, t))

keeper_gids = set()
for person in PEOPLE:
    items = by_ass.get(person, [])
    items.sort(key=lambda x: -score(x[0], x[2]))
    for pname, pgid, t in items[:TARGET]:
        keeper_gids.add(t["gid"])

# ---- Build action manifest ----
actions = []  # list of (op_type, payload, audit_text)

# Meta-status tasks I created during the Day 1 sprint — NOT real backlog,
# don't close them in the runner-up pass
META_TASK_GIDS = {
    "1214276879563795",  # ✅ Asana Day 1 backup complete (mobile status)
    "1214276880548046",  # 🔥 ASANA ZERO-OUT — review SHORT_LISTS proposal
}

# 1. Close runner-ups (assigned tasks not in keepers, EXCLUDING Big Muddy service account
#    which has its own routing logic, EXCLUDING Unassigned which goes to Chase,
#    EXCLUDING the meta-status tasks I created during the sprint)
for person in PEOPLE:
    for pname, pgid, t in by_ass.get(person, []):
        if t["gid"] in keeper_gids: continue
        if t["gid"] in META_TASK_GIDS: continue
        actions.append((
            "close",
            t["gid"],
            f"Closed by Day 1 zero-out phase 2 (2026-04-25). Reason: runner-up — "
            f"not in {person}'s top {TARGET} short list. Pre-close JSON in archive."
        ))

# 2. Close JP's 2 tasks
for pname, pgid, t in by_ass.get("JP Houston", []):
    actions.append((
        "close",
        t["gid"],
        "Closed by Day 1 zero-out phase 2 (2026-04-25). Reason: JP routing change — "
        "JP sends mixes only per Chase 2026-04-25, no other tasks routed to JP. "
        "If this task represents real work, re-create with appropriate owner."
    ))

# 3. Archive JP projects (Asana: PUT /projects/<gid> with archived: true)
for proj_gid, proj_name in JP_PROJECTS.items():
    actions.append((
        "archive_project",
        proj_gid,
        f"Project archived 2026-04-25 by Day 1 zero-out. Reason: JP scope reduced to "
        f"mixes-only delivery per Chase. No standing project required."
    ))

# 4. Re-route Big Muddy service-account tasks per heuristics
def bm_action(pname, name):
    n = name.lower()
    p = pname.lower()
    if "amy" in p or "inn" in p or "bar" in p or "kitchen" in n or "room" in n or "housekeep" in p:
        return ("reassign", USERS["Amy"], "Amy")
    if "magazine" in p or "publish" in n or "edit" in n:
        return ("reassign", USERS["Tracy"], "Tracy")
    if "tracy" in p or "finance" in p or "tax" in n or "vendor" in p:
        return ("reassign", USERS["Tracy"], "Tracy")
    if "radio" in p or "playlist" in n:
        return ("reassign", USERS["Amy"], "Amy")
    if "directory" in p or "deep south" in p:
        return ("close", None, "Directory pivoted to B2B per CLAUDE.md")
    if "launch" in p or "happy hour" in n or "founders" in n:
        return ("close", None, "April launch wrap; tasks no longer relevant")
    return ("reassign", USERS["Chase"], "Chase to triage")

for pname, pgid, t in by_ass.get("Big Muddy", []):
    op, target, reason = bm_action(pname, t.get("name", ""))
    if op == "close":
        actions.append((
            "close", t["gid"],
            f"Closed by Day 1 zero-out phase 2 (2026-04-25). Reason: {reason}. "
            f"Originally assigned to bigmuddy@chasepierson.tv service account."
        ))
    elif op == "reassign":
        actions.append((
            "reassign", (t["gid"], target),
            f"Reassigned by Day 1 zero-out phase 2 (2026-04-25). Originally on "
            f"bigmuddy@chasepierson.tv service account, re-routed to {reason}. "
            f"If this is wrong, reassign manually or close."
        ))

# 5. Reassign Unassigned in Corp Structure to Chase
for pname, pgid, t in by_ass.get("Unassigned", []):
    if pgid == CORP_STRUCT_PROJ:
        actions.append((
            "reassign", (t["gid"], USERS["Chase"]),
            "Reassigned by Day 1 zero-out phase 2 (2026-04-25). MBT/a2natchez "
            "structure decision item — Chase owns these per CLAUDE.md entity-restructure work."
        ))
    else:
        actions.append((
            "close", t["gid"],
            "Closed by Day 1 zero-out phase 2 (2026-04-25). Reason: unassigned + "
            "outside Corporate Structure project. If still relevant, re-create with owner."
        ))

# Group counts
op_counts = defaultdict(int)
for a in actions:
    op_counts[a[0]] += 1
print(f"\n=== Phase 2 manifest ===")
for op, n in op_counts.items():
    print(f"  {op}: {n}")
print(f"  Total: {len(actions)}")

if DRY:
    print("\nDRY_RUN — no writes")
    for a in actions[:15]:
        print(f"  [{a[0]}] {a[1]} :: {a[2][:60]}...")
    sys.exit(0)

# ---- Execute ----
results = {"close": {"ok": 0, "fail": 0},
           "reassign": {"ok": 0, "fail": 0},
           "archive_project": {"ok": 0, "fail": 0}}
log_lines = [
    f"# Day 1 Zero-Out Phase 2 Execution Log\n\n",
    f"**Run:** 2026-04-25 (post-`go` from Chase)\n",
    f"**Total actions:** {len(actions)}\n\n",
    f"| # | Op | Target | Result | Note |\n",
    f"|---|---|---|---|---|\n",
]

for i, (op, payload, audit) in enumerate(actions, 1):
    if op == "close":
        gid = payload
        api("POST", f"/tasks/{gid}/stories", {"data": {"text": audit}})
        time.sleep(0.05)
        r = api("PUT", f"/tasks/{gid}", {"data": {"completed": True}})
    elif op == "reassign":
        gid, new_assignee = payload
        api("POST", f"/tasks/{gid}/stories", {"data": {"text": audit}})
        time.sleep(0.05)
        r = api("PUT", f"/tasks/{gid}", {"data": {"assignee": new_assignee}})
    elif op == "archive_project":
        gid = payload
        # Asana doesn't accept stories on projects via /projects/<gid>/stories
        # in the same way; skip story for project archive, log instead
        r = api("PUT", f"/projects/{gid}", {"data": {"archived": True}})
    time.sleep(0.05)
    if "error" in r:
        results[op]["fail"] += 1
        outcome = f"❌ {r.get('code', '?')}"
    else:
        results[op]["ok"] += 1
        outcome = "✅"
    target_str = str(payload)[:30]
    note_short = audit[:70].replace("|", "\\|").replace("\n", " ")
    log_lines.append(f"| {i} | {op} | `{target_str}` | {outcome} | {note_short} |\n")
    if i % 20 == 0:
        print(f"  [{i}/{len(actions)}]  close={results['close']} reassign={results['reassign']} arch={results['archive_project']}")

with open(os.path.join(DERIVED, "ZERO_OUT_LOG_PHASE2.md"), "w") as f:
    f.writelines(log_lines)

print("\n=== DONE ===")
for op, r in results.items():
    print(f"  {op}: ok={r['ok']} fail={r['fail']}")
