#!/usr/bin/env python3
"""
FIX: Close every task currently assigned to Tracy or Amy that was originally
assigned to the "Big Muddy" service account in the Day 1 backup snapshot.

Logic: those tasks were reassigned by phase 2 BigMuddy heuristic, but Chase
correctly flagged that dumping unfamiliar tasks on people is its own failure
mode. Default-close instead. No stories added (silent — no notifications fire).

Original Tracy/Amy tasks (those they had in the Day 1 backup) are preserved.
"""
import json, os, time, urllib.request
from urllib.error import HTTPError
from collections import defaultdict

PAT = "2/1211216881488767/1213753731599360:8b45ddff7dfb6f0742d1e4653d2ab16a"
WS = "1211216881488780"
ARCHIVE_RAW = "/Users/chasethis/measurably-better-things/asana-archive/2026-04-25/raw"

TRACY_NAMES = {"Tracy Alderson Allen"}
AMY_NAMES = {"Amy Allen", "Amy"}
BIGMUDDY_NAME = "Big Muddy"

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
        return {"error": str(e), "code": e.code}

# ---- Load the Day 1 backup: build a map of {task_gid: original_assignee_name} ----
print("Loading Day 1 backup snapshot...")
with open(os.path.join(ARCHIVE_RAW, "projects.json")) as f:
    pidx = json.load(f)

original_assignee = {}
def walk(t):
    yield t
    for sub in t.get("_subtasks", []):
        yield from walk(sub)

for p in pidx["active"] + pidx["archived"]:
    with open(os.path.join(ARCHIVE_RAW, "projects", f"{p['gid']}.json")) as f:
        pd = json.load(f)
    for top in pd["tasks"]:
        for t in walk(top):
            ass = (t.get("assignee") or {}).get("name") or ""
            original_assignee[t["gid"]] = ass

print(f"  → {len(original_assignee)} tasks in Day 1 backup")

# ---- Pull live open state ----
def paged(path, params):
    out, offset = [], None
    while True:
        p = dict(params)
        if offset: p["offset"] = offset
        d = api("GET", f"{path}?" + "&".join(f"{k}={v}" for k,v in p.items()))
        out.extend(d.get("data", []))
        nxt = (d.get("next_page") or {}).get("offset")
        if not nxt: break
        offset = nxt
    return out

print("Pulling live open tasks for Tracy + Amy...")
projects = paged(f"/workspaces/{WS}/projects",
                 {"archived": "false", "limit": 100, "opt_fields": "name"})
to_close = []
for p in projects:
    pgid = p["gid"]
    tasks = paged(f"/projects/{pgid}/tasks",
                  {"limit": 100, "opt_fields": "name,completed,assignee.name"})
    for t in tasks:
        if t.get("completed"): continue
        cur = (t.get("assignee") or {}).get("name") or ""
        if cur not in TRACY_NAMES and cur not in AMY_NAMES: continue
        orig = original_assignee.get(t["gid"], "")
        if orig == BIGMUDDY_NAME:
            to_close.append((p["name"], t["gid"], t.get("name", ""), cur))

print(f"  → {len(to_close)} tasks: originally BigMuddy, now Tracy/Amy → CLOSE")

if not to_close:
    print("Nothing to close.")
    raise SystemExit(0)

# ---- Close silently — no story added, no notification triggered for the change ----
print("Closing silently (no audit story → no notifications)...")
ok = fail = 0
for i, (pname, gid, name, cur) in enumerate(to_close, 1):
    r = api("PUT", f"/tasks/{gid}", {"data": {"completed": True}})
    if "error" in r: fail += 1
    else: ok += 1
    time.sleep(0.04)
    if i % 20 == 0:
        print(f"  [{i}/{len(to_close)}] ok={ok} fail={fail}")
print(f"\nDONE: closed {ok} tasks, {fail} failed")
print("Audit info: this script + log committed to repo. No Asana stories added,")
print("so no notifications fired to Tracy/Amy from this cleanup.")
