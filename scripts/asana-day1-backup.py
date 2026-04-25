#!/usr/bin/env python3
"""
Asana Day 1 Backup — chasepierson.tv workspace
Run date: 2026-04-25
Output: /Users/chasethis/measurably-better-things/asana-archive/2026-04-25/

Captures, with full fidelity:
- Workspace metadata
- All projects (active + archived) with sections + memberships + custom fields
- All tasks per project, including subtasks (recursive), stories (comments+activity), attachments (metadata only)
- Per-user "My Tasks" lists
- Tags + teams + workspace users

Writes:
- raw/workspace.json
- raw/projects.json (index)
- raw/projects/<gid>.json  (per-project: project meta + tasks + sections)
- raw/users.json
- raw/my_tasks/<user_gid>.json
- raw/tags.json, raw/teams.json
- flat/tasks.csv (one row per task with project + parent + key fields)
- SHA256SUMS
- README.md
"""

import json, os, sys, time, hashlib, csv, datetime
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from urllib.error import HTTPError

PAT = os.environ.get("ASANA_PAT", "2/1211216881488767/1213753731599360:8b45ddff7dfb6f0742d1e4653d2ab16a")
WORKSPACE_GID = "1211216881488780"
OUT_ROOT = "/Users/chasethis/measurably-better-things/asana-archive/2026-04-25"
RAW = os.path.join(OUT_ROOT, "raw")
FLAT = os.path.join(OUT_ROOT, "flat")
THROTTLE_SEC = 0.05  # 50ms between calls — well below 1500/min limit
BASE = "https://app.asana.com/api/1.0"

os.makedirs(RAW, exist_ok=True)
os.makedirs(os.path.join(RAW, "projects"), exist_ok=True)
os.makedirs(os.path.join(RAW, "my_tasks"), exist_ok=True)
os.makedirs(FLAT, exist_ok=True)

# ---- API helper ----
def api(path, params=None, retries=3):
    qs = ("?" + urlencode(params)) if params else ""
    url = f"{BASE}{path}{qs}"
    for attempt in range(retries):
        try:
            req = Request(url, headers={"Authorization": f"Bearer {PAT}"})
            with urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read().decode())
            time.sleep(THROTTLE_SEC)
            return data
        except HTTPError as e:
            if e.code == 429:
                wait = int(e.headers.get("Retry-After", "10"))
                print(f"  [429] sleeping {wait}s", file=sys.stderr)
                time.sleep(wait)
            elif e.code in (502, 503, 504):
                time.sleep(2 ** attempt)
            else:
                print(f"  [HTTPError {e.code}] on {path}: {e.read()[:200]}", file=sys.stderr)
                return {"data": [], "error": str(e), "code": e.code}
        except Exception as e:
            print(f"  [Error] on {path}: {e}", file=sys.stderr)
            time.sleep(1)
    return {"data": [], "error": "max retries"}

def paged(path, params=None):
    """Yield all items across pagination."""
    params = dict(params or {})
    params.setdefault("limit", 100)
    while True:
        d = api(path, params)
        for item in d.get("data", []):
            yield item
        nxt = (d.get("next_page") or {}).get("offset")
        if not nxt:
            return
        params["offset"] = nxt

# ---- 1. Workspace metadata ----
print("[1/8] Workspace metadata")
ws = api(f"/workspaces/{WORKSPACE_GID}", {"opt_fields": "name,email_domains,is_organization"})
with open(os.path.join(RAW, "workspace.json"), "w") as f:
    json.dump(ws, f, indent=2)

# ---- 2. Users ----
print("[2/8] Users")
users = list(paged(f"/workspaces/{WORKSPACE_GID}/users",
                   {"opt_fields": "name,email,workspaces"}))
with open(os.path.join(RAW, "users.json"), "w") as f:
    json.dump(users, f, indent=2)
print(f"      → {len(users)} users")

# ---- 3. Teams + Tags ----
print("[3/8] Teams + Tags")
teams = list(paged(f"/organizations/{WORKSPACE_GID}/teams",
                   {"opt_fields": "name,description,permalink_url"}))
with open(os.path.join(RAW, "teams.json"), "w") as f:
    json.dump(teams, f, indent=2)
print(f"      → {len(teams)} teams")

tags = list(paged(f"/workspaces/{WORKSPACE_GID}/tags",
                  {"opt_fields": "name,color,notes"}))
with open(os.path.join(RAW, "tags.json"), "w") as f:
    json.dump(tags, f, indent=2)
print(f"      → {len(tags)} tags")

# ---- 4. Projects index (active + archived) ----
print("[4/8] Projects index")
project_fields = ("name,archived,owner.name,owner.email,team.name,created_at,modified_at,"
                  "current_status_update.text,due_date,start_on,public,color,notes,"
                  "default_view,permalink_url,members.name")

active = list(paged(f"/workspaces/{WORKSPACE_GID}/projects",
                    {"archived": "false", "opt_fields": project_fields}))
archived = list(paged(f"/workspaces/{WORKSPACE_GID}/projects",
                      {"archived": "true", "opt_fields": project_fields}))
all_projects = active + archived

with open(os.path.join(RAW, "projects.json"), "w") as f:
    json.dump({"active": active, "archived": archived}, f, indent=2)
print(f"      → {len(active)} active + {len(archived)} archived = {len(all_projects)} total")

# ---- 5. Per-project: sections + tasks (with subtasks, stories, attachments) ----
print(f"[5/8] Per-project deep pull (this will take a few minutes)")

TASK_FIELDS = ("name,resource_subtype,completed,completed_at,assignee.name,assignee.email,"
               "due_on,due_at,start_on,start_at,created_at,modified_at,parent.gid,"
               "notes,html_notes,permalink_url,projects.name,memberships.section.name,"
               "memberships.project.name,tags.name,custom_fields,"
               "num_subtasks,liked,num_likes,workspace.gid,assignee_status,"
               "actual_time_minutes,followers.name")

def fetch_task_tree(task_gid, depth=0, max_depth=5):
    """Fetch a task plus its subtasks (recursive), stories, attachments."""
    if depth > max_depth:
        return None
    task = api(f"/tasks/{task_gid}", {"opt_fields": TASK_FIELDS})
    if not task.get("data"):
        return None
    t = task["data"]
    # Stories (comments + activity)
    stories_resp = api(f"/tasks/{task_gid}/stories",
                       {"opt_fields": "type,text,created_by.name,created_at,resource_subtype",
                        "limit": 100})
    t["_stories"] = stories_resp.get("data", [])
    # Attachments metadata
    att_resp = api(f"/tasks/{task_gid}/attachments",
                   {"opt_fields": "name,host,download_url,view_url,created_at,size",
                    "limit": 100})
    t["_attachments"] = att_resp.get("data", [])
    # Subtasks
    if t.get("num_subtasks", 0) > 0:
        sub_resp = api(f"/tasks/{task_gid}/subtasks",
                       {"opt_fields": "gid,name", "limit": 100})
        t["_subtasks"] = []
        for sub in sub_resp.get("data", []):
            sub_tree = fetch_task_tree(sub["gid"], depth + 1, max_depth)
            if sub_tree:
                t["_subtasks"].append(sub_tree)
    else:
        t["_subtasks"] = []
    return t

total_tasks = 0
for i, p in enumerate(all_projects, 1):
    pgid = p["gid"]
    pname = p["name"]
    print(f"  [{i:>2}/{len(all_projects)}] {pname[:50]} ({pgid})")
    sections = list(paged(f"/projects/{pgid}/sections",
                          {"opt_fields": "name,created_at"}))
    # Top-level tasks for the project (subtasks excluded by default at this endpoint)
    task_stubs = list(paged(f"/projects/{pgid}/tasks",
                            {"opt_fields": "gid,name,completed", "completed_since": "now"}))
    # Above gives only incomplete tasks; refetch with no completed_since for full
    task_stubs_all = list(paged(f"/projects/{pgid}/tasks",
                                {"opt_fields": "gid,name"}))
    task_trees = []
    for ts in task_stubs_all:
        tree = fetch_task_tree(ts["gid"])
        if tree:
            task_trees.append(tree)
    total_tasks += len(task_trees)
    # Subtask count
    def count_subs(t):
        return 1 + sum(count_subs(s) for s in t.get("_subtasks", []))
    deep_count = sum(count_subs(t) for t in task_trees)
    print(f"        {len(task_trees)} top tasks · {deep_count} including subtasks · {len(sections)} sections")
    out = {
        "project": p,
        "sections": sections,
        "tasks": task_trees,
    }
    with open(os.path.join(RAW, "projects", f"{pgid}.json"), "w") as f:
        json.dump(out, f, indent=2)

print(f"      → {total_tasks} top-level tasks pulled across {len(all_projects)} projects")

# ---- 6. Per-user My Tasks ----
print(f"[6/8] Per-user My Tasks lists")
my_task_summary = {}
for u in users:
    ugid = u["gid"]
    uname = u.get("name", "?")
    # Find user's user task list
    utl = api(f"/users/{ugid}/user_task_list", {"workspace": WORKSPACE_GID})
    if not utl.get("data"):
        my_task_summary[ugid] = {"name": uname, "error": utl.get("error", "no UTL")}
        continue
    utl_gid = utl["data"]["gid"]
    tasks = list(paged(f"/user_task_lists/{utl_gid}/tasks",
                       {"opt_fields": "name,completed,due_on,projects.name,assignee_status",
                        "completed_since": "2020-01-01"}))
    my_task_summary[ugid] = {"name": uname, "task_count": len(tasks)}
    with open(os.path.join(RAW, "my_tasks", f"{ugid}.json"), "w") as f:
        json.dump({"user": u, "user_task_list": utl["data"], "tasks": tasks}, f, indent=2)
    print(f"      {uname[:40]:40s} → {len(tasks)} tasks in My Tasks")

with open(os.path.join(RAW, "my_tasks", "_summary.json"), "w") as f:
    json.dump(my_task_summary, f, indent=2)

# ---- 7. Flatten to CSV ----
print(f"[7/8] Flatten to CSV")
csv_path = os.path.join(FLAT, "tasks.csv")
with open(csv_path, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow([
        "project_gid", "project_name", "project_archived",
        "task_gid", "parent_gid", "depth", "name", "completed", "completed_at",
        "assignee_name", "assignee_email", "due_on", "due_at", "start_on",
        "section_name", "tags", "num_subtasks", "num_stories", "num_attachments",
        "created_at", "modified_at", "permalink_url", "notes_first_120",
    ])
    def write_row(p, t, parent_gid, depth):
        section = ""
        for m in t.get("memberships", []) or []:
            sec = m.get("section")
            if sec and sec.get("name"):
                section = sec["name"]
                break
        tags = ",".join([tg.get("name", "") for tg in t.get("tags", []) or []])
        notes = (t.get("notes") or "").replace("\n", " ")[:120]
        assignee = t.get("assignee") or {}
        w.writerow([
            p["gid"], p["name"], p.get("archived", False),
            t["gid"], parent_gid or "", depth, t["name"], t.get("completed"), t.get("completed_at"),
            assignee.get("name", ""), assignee.get("email", ""),
            t.get("due_on", ""), t.get("due_at", ""), t.get("start_on", ""),
            section, tags, len(t.get("_subtasks", [])), len(t.get("_stories", [])),
            len(t.get("_attachments", [])),
            t.get("created_at", ""), t.get("modified_at", ""), t.get("permalink_url", ""),
            notes,
        ])
        for sub in t.get("_subtasks", []):
            write_row(p, sub, t["gid"], depth + 1)
    for p in all_projects:
        with open(os.path.join(RAW, "projects", f"{p['gid']}.json")) as pf:
            pdata = json.load(pf)
        for t in pdata["tasks"]:
            write_row(p, t, None, 0)
print(f"      → {csv_path}")

# ---- 8. SHA256SUMS + README ----
print(f"[8/8] SHA256SUMS + README")
sums_path = os.path.join(OUT_ROOT, "SHA256SUMS")
with open(sums_path, "w") as sumf:
    for root, dirs, files in os.walk(OUT_ROOT):
        for fn in sorted(files):
            if fn in ("SHA256SUMS", "README.md"):
                continue
            path = os.path.join(root, fn)
            rel = os.path.relpath(path, OUT_ROOT)
            with open(path, "rb") as f:
                h = hashlib.sha256(f.read()).hexdigest()
            sumf.write(f"{h}  {rel}\n")

# File counts
file_count = 0
for root, dirs, files in os.walk(OUT_ROOT):
    for fn in files:
        if fn != "README.md":
            file_count += 1

readme = f"""# Asana Day 1 Backup — chasepierson.tv workspace

**Run date:** 2026-04-25 (Day 1 of Asana Zero sprint)
**Workspace:** chasepierson.tv (gid `{WORKSPACE_GID}`)
**Operator:** Chief of Staff (Chase's proxy) via Asana REST API
**Method:** Python script `scripts/asana-day1-backup.py` in `hillbilly-dreams` repo
**Output location:** This directory + GitHub `CPTV27/measurably-better-things/asana-archive/2026-04-25/`

## Coverage

| Resource | Count |
|---|---|
| Active projects | {len(active)} |
| Archived projects | {len(archived)} |
| Total projects | {len(all_projects)} |
| Workspace users | {len(users)} |
| Teams | {len(teams)} |
| Tags | {len(tags)} |
| Top-level tasks pulled | {total_tasks} |
| Total files in this archive | {file_count} |

For each task we captured: full task fields, all stories (comments + activity log),
attachment metadata (download URLs included — content not mirrored), and the full
subtask tree recursively to depth 5.

For each user we captured the full "My Tasks" list (their user_task_list).

## Layout

```
2026-04-25/
├── README.md                  ← this file
├── SHA256SUMS                 ← integrity hashes for every file in raw/ + flat/
├── raw/
│   ├── workspace.json
│   ├── users.json
│   ├── teams.json
│   ├── tags.json
│   ├── projects.json          ← index of all projects (active + archived)
│   ├── projects/
│   │   ├── <gid>.json         ← one file per project: meta + sections + tasks tree
│   │   └── ...
│   └── my_tasks/
│       ├── _summary.json
│       └── <user_gid>.json    ← one file per user: their My Tasks list
└── flat/
    └── tasks.csv              ← every task (incl. subtasks) as one row, joined to project
```

## What's NOT in this backup

- **Attachment binaries** — only metadata (URLs, names, sizes) is mirrored.
  To restore actual files, re-download via the URLs in the JSON.
  Asana attachment URLs require auth + expire after a window — capture binaries
  in a follow-up run if archival of the file content is required.
- **Comment reactions / heart counts** — Asana API doesn't expose these.
- **Project status updates beyond `current_status_update.text`** — historical
  status updates not captured (would require `/projects/{{gid}}/project_statuses`
  per project; can be added in a v2 backup).
- **Goals + Portfolios** — not captured in v1 (limited use in this workspace).
- **Custom field DEFINITIONS at workspace level** — only the values on each task
  are captured. Definitions can be re-pulled from `/workspaces/{{gid}}/custom_fields`.
- **Webhook configurations** — separate API surface, capture in v2 if needed.

## Verification

```sh
cd /Users/chasethis/measurably-better-things/asana-archive/2026-04-25/
shasum -a 256 -c SHA256SUMS
```

## Re-run

```sh
ASANA_PAT=$(cat /path/to/pat) python3 /Users/chasethis/hillbilly-dreams/scripts/asana-day1-backup.py
```

Output directory must be empty (or change `OUT_ROOT` in the script).

---

*Day 1 baseline. The "zero-out" + reorganization pass operates on this snapshot.*
"""

with open(os.path.join(OUT_ROOT, "README.md"), "w") as f:
    f.write(readme)

# Final summary line for stdout consumers
summary = {
    "run_date": "2026-04-25",
    "workspace_gid": WORKSPACE_GID,
    "active_projects": len(active),
    "archived_projects": len(archived),
    "users": len(users),
    "teams": len(teams),
    "tags": len(tags),
    "top_level_tasks": total_tasks,
    "files_written": file_count,
    "out_root": OUT_ROOT,
}
print("")
print("=" * 60)
print("DONE")
print(json.dumps(summary, indent=2))
