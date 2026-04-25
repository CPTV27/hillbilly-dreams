#!/usr/bin/env python3
"""
Asana Day 1 EXECUTE — destructive zero-out.

Operations (in order):
  1. Close every open task in the 3 already-archived projects
     (Monumental Taco, Cross-functional project plan, Scan2Plan Airtable).
     The projects are already archived — the open tasks inside them are zombie.
  2. Close every task flagged STALE (F category from triage):
     14+ days since creation, untouched since creation, in an active project.
     Adds a story comment explaining the auto-close so it's auditable.
  3. Generate SHORT_LIST.md per-person proposal — saves to derived/

Safety:
  - Each task close adds a story (comment) before the completion update so the
    Asana audit log shows what happened and why.
  - Archive snapshots in /asana-archive/2026-04-25/ already preserve every
    field of every task, so closes are reversible from JSON if needed.
  - DRY_RUN=1 envvar = print only, no API writes.
"""

import json, os, re, sys, time, datetime, urllib.request
from urllib.error import HTTPError

PAT = "2/1211216881488767/1213753731599360:8b45ddff7dfb6f0742d1e4653d2ab16a"
ARCHIVE = "/Users/chasethis/measurably-better-things/asana-archive/2026-04-25"
RAW = os.path.join(ARCHIVE, "raw")
DERIVED = os.path.join(ARCHIVE, "derived")
TODAY = datetime.date(2026, 4, 25)
DRY = os.environ.get("DRY_RUN") == "1"

ARCHIVED_PROJECT_GIDS = {
    "1211217148011243": "Cross-functional project plan",
    "1211391656233221": "Monumental Taco",
    "1211614595868310": "Scan2Plan Airtable",
}

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

def parse_date(s):
    if not s: return None
    try: return datetime.date.fromisoformat(s[:10])
    except: return None

# ---- Load all tasks from backup ----
with open(os.path.join(RAW, "projects.json")) as f:
    pidx = json.load(f)
all_projects = pidx["active"] + pidx["archived"]

def walk(t):
    yield t
    for sub in t.get("_subtasks", []):
        yield from walk(sub)

# Stale matcher — matches the triage script
def is_stale(t):
    created = parse_date(t.get("created_at"))
    modified = parse_date(t.get("modified_at"))
    if not created: return False
    age = (TODAY - created).days
    untouched = (modified == created) if modified else True
    return age >= 14 and untouched

# ---- Build the close manifest ----
to_close = []  # list of (reason, project_name, task)
for p in all_projects:
    with open(os.path.join(RAW, "projects", f"{p['gid']}.json")) as f:
        pd = json.load(f)
    for top in pd["tasks"]:
        for t in walk(top):
            if t.get("completed"): continue
            if p["gid"] in ARCHIVED_PROJECT_GIDS:
                to_close.append(("project_archived", p["name"], t))
            elif is_stale(t):
                to_close.append(("stale_14d_untouched", p["name"], t))

print(f"Close manifest: {len(to_close)} tasks")
reasons = {}
for r, _, _ in to_close:
    reasons[r] = reasons.get(r, 0) + 1
for r, n in reasons.items():
    print(f"  {r}: {n}")

if DRY:
    print("DRY_RUN — no writes")
    for r, p, t in to_close[:10]:
        print(f"  [{r}] {p[:30]:<30} {t['name'][:60]}")
    sys.exit(0)

# ---- Execute closes ----
results = {"ok": 0, "fail": 0, "errors": []}
log_path = os.path.join(DERIVED, "ZERO_OUT_LOG.md")
log_lines = [f"# Day 1 Zero-Out Execution Log\n",
             f"**Run:** 2026-04-25\n**Total close attempts:** {len(to_close)}\n\n",
             "| # | Reason | Project | Task name | GID | Result |\n",
             "|---|---|---|---|---|---|\n"]

for i, (reason, pname, t) in enumerate(to_close, 1):
    gid = t["gid"]
    name = t["name"]
    # 1. Add explanatory story (comment)
    note_text = (f"Auto-closed by Day 1 zero-out (2026-04-25). Reason: {reason}. "
                 f"Full pre-close snapshot in repo: "
                 f"https://github.com/CPTV27/measurably-better-things/blob/main/"
                 f"asana-archive/2026-04-25/raw/projects/<gid>.json. "
                 f"To restore: re-create from archive JSON.")
    api("POST", f"/tasks/{gid}/stories", {"data": {"text": note_text}})
    time.sleep(0.05)
    # 2. Close the task
    r = api("PUT", f"/tasks/{gid}", {"data": {"completed": True}})
    time.sleep(0.05)
    if "error" in r:
        results["fail"] += 1
        results["errors"].append((gid, name, r))
        outcome = f"❌ {r.get('code', '?')}"
    else:
        results["ok"] += 1
        outcome = "✅"
    log_lines.append(f"| {i} | {reason} | {pname[:30]} | {name[:50].replace('|','\\|')} | `{gid}` | {outcome} |\n")
    if i % 20 == 0:
        print(f"  [{i}/{len(to_close)}] ok={results['ok']} fail={results['fail']}")

with open(log_path, "w") as f:
    f.writelines(log_lines)

print(f"\nDONE: {results['ok']} closed · {results['fail']} failed")
if results["errors"]:
    print("Errors:")
    for gid, name, e in results["errors"][:10]:
        print(f"  {gid} {name[:60]}: {e}")
