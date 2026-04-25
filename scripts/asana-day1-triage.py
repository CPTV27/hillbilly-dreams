#!/usr/bin/env python3
"""
Asana Day 1 triage — answers "how many tasks can we just DO right now?"

Categorizes 448 open tasks into:
  A. Cos can ship from keyboard in <30 min (drafts, configs, content, scripts, pushes)
  B. Cos can ship but needs Chase decision first (pick A vs B, approve, choose vendor)
  C. Chase keyboard required (call, drive, take a photo, in-person, sign)
  D. Tracy / Amy / JP / partner — their domain, not ours
  E. External wait state (waiting on reply, filing, third party)
  F. STALE — created 14+ days ago, no recent activity, low priority candidate for archive
  G. UNCLEAR — name too vague to categorize without reading the full task

Then re-counts per assignee.
"""

import json, os, re, datetime
from collections import defaultdict

ARCHIVE = "/Users/chasethis/measurably-better-things/asana-archive/2026-04-25"
RAW = os.path.join(ARCHIVE, "raw")
TODAY = datetime.date(2026, 4, 25)

with open(os.path.join(RAW, "projects.json")) as f:
    pidx = json.load(f)
all_projects = pidx["active"] + pidx["archived"]

# ---- Pattern matchers (run in priority order; first match wins) ----

# C — Chase keyboard required (in-person, call, photo, drive, sign)
PAT_CHASE_HANDS = re.compile(
    r"\b(call|phone|meet(?!ing\s+notes)|visit|drive|tour|"
    r"photo(?!shop)|shoot|capture|"
    r"sign(?!\s*(off|age))|deliver|pick up|drop off|"
    r"in\s*person|on\s*site|"
    r"record(?!\s+label)|interview|"
    r"present(?!ation\s+template)|demo to)\b", re.I
)

# D — Tracy/Amy/JP/partner domain
PAT_OTHER_HANDS = re.compile(
    r"\b(tracy|amy|jp |jp\b|elijah|miles|chandra|carrie|kate|"
    r"bookkeeping|accounting|tax|invoice|insurance|"
    r"housekeeping|kitchen|bar|"
    r"file (the |an? )?llc|file with state|EIN|"
    r"book.{0,15}(band|show|gig)|"
    r"contract.{0,15}(sign|review)|"
    r"hr\b|payroll)\b", re.I
)

# E — External wait state
PAT_WAIT = re.compile(
    r"\b(wait(ing)?|follow\s*up|chase|reply|response|"
    r"pending|expect|approval from|review by|"
    r"once .* (lands|arrives|comes|files)|"
    r"after .* (signs|files|approves)|"
    r"awaiting)\b", re.I
)

# B — Decision required (Chase picks)
PAT_DECISION = re.compile(
    r"\b(decide|decision|choose|pick|select|approve|approval needed|"
    r"vs[\.\s]|or\s+(should|do|use)|"
    r"finalize|lock|confirm)\b", re.I
)

# A — Cos can ship from keyboard
PAT_COS_DOABLE = re.compile(
    r"\b(draft|write|create (page|doc|post|email|brief|spec|landing|article|copy|deck)|"
    r"update (page|doc|copy|footer|content|nav|navigation|spec|brief|env|config)|"
    r"add (to|copy|page|section|article|env|var|domain)|"
    r"generate|build (page|doc|component|landing|sitemap)|"
    r"push|deploy|commit|migrate|"
    r"refactor|rewrite|cleanup|consolidate|archive|"
    r"audit|inventory|catalog|map|catalog|"
    r"schedule|calendar (entry|invite|block)|"
    r"set up (vercel|cloudflare|sanity|env|dns|redirect)|"
    r"configure|enable|disable|"
    r"document|spec|outline)\b", re.I
)

def parse_date(s):
    if not s: return None
    try: return datetime.date.fromisoformat(s[:10])
    except: return None

def categorize(task):
    name = task.get("name", "") or ""
    notes = (task.get("notes") or "")[:300]
    blob = f"{name} {notes}"

    # F — STALE (created 14+ days ago, never modified since creation)
    created = parse_date(task.get("created_at", ""))
    modified = parse_date(task.get("modified_at", ""))
    age_days = (TODAY - created).days if created else 0
    untouched = (modified == created) if modified and created else True
    is_stale = age_days >= 14 and untouched

    if PAT_CHASE_HANDS.search(blob): return "C"
    if PAT_OTHER_HANDS.search(blob): return "D"
    if PAT_WAIT.search(blob): return "E"
    if PAT_DECISION.search(blob): return "B"
    if PAT_COS_DOABLE.search(blob): return "A"
    if is_stale: return "F"
    return "G"

def walk(t):
    yield t
    for sub in t.get("_subtasks", []):
        yield from walk(sub)

# Tally
cats = defaultdict(int)
by_cat = defaultdict(list)  # cat -> list of (project, task)
by_assignee = defaultdict(lambda: defaultdict(int))
total_open = 0
overdue_open = 0
nodate_open = 0

for p in all_projects:
    with open(os.path.join(RAW, "projects", f"{p['gid']}.json")) as f:
        pd = json.load(f)
    for top in pd["tasks"]:
        for t in walk(top):
            if t.get("completed"): continue
            total_open += 1
            cat = categorize(t)
            cats[cat] += 1
            by_cat[cat].append((p["name"], t))
            ass = ((t.get("assignee") or {}).get("name") or "Unassigned")
            by_assignee[ass][cat] += 1
            due = parse_date(t.get("due_on") or (t.get("due_at") or "")[:10])
            if due and due < TODAY: overdue_open += 1
            elif not due: nodate_open += 1

print(f"\n=== TRIAGE — {total_open} open tasks ===\n")
LABELS = {
    "A": "Cos can ship from keyboard <30min  (drafts, configs, content, scripts)",
    "B": "Cos can ship but needs Chase decision first (pick A/B, approve)",
    "C": "Chase keyboard required (call, photo, drive, sign, in-person)",
    "D": "Tracy / Amy / JP / partner domain",
    "E": "External wait state (waiting on reply, filing, third party)",
    "F": "STALE — 14+d old, untouched since creation (archive candidate)",
    "G": "UNCLEAR — name too vague, needs full read",
}
for cat in "ABCDEFG":
    n = cats[cat]
    pct = (100 * n // total_open) if total_open else 0
    print(f"  {cat}  {n:>4}  ({pct:>2}%)  {LABELS[cat]}")

print(f"\n=== Per-assignee ===\n")
print(f"  {'Assignee':<22} {'A':>4} {'B':>4} {'C':>4} {'D':>4} {'E':>4} {'F':>4} {'G':>4} {'TOT':>5}")
for ass in sorted(by_assignee.keys(), key=lambda a: -sum(by_assignee[a].values())):
    row = by_assignee[ass]
    tot = sum(row.values())
    print(f"  {ass[:22]:<22} "
          f"{row.get('A',0):>4} {row.get('B',0):>4} {row.get('C',0):>4} "
          f"{row.get('D',0):>4} {row.get('E',0):>4} {row.get('F',0):>4} "
          f"{row.get('G',0):>4} {tot:>5}")

print(f"\n=== Sample of category A (Cos can ship now) — first 25 ===\n")
for i, (proj, t) in enumerate(by_cat["A"][:25], 1):
    name = t.get("name", "")[:80]
    ass = ((t.get("assignee") or {}).get("name") or "Unassigned")[:14]
    due = (t.get("due_on") or "----")
    print(f"  {i:>2}. [{proj[:24]:<24}] {ass:<14} {due}  {name}")

print(f"\n=== Sample of category F (stale archive candidates) — first 15 ===\n")
for i, (proj, t) in enumerate(by_cat["F"][:15], 1):
    name = t.get("name", "")[:80]
    created = parse_date(t.get("created_at", ""))
    age = (TODAY - created).days if created else "?"
    print(f"  {i:>2}. [{proj[:24]:<24}] age {age}d  {name}")

print(f"\n=== Sample of category G (unclear) — first 15 ===\n")
for i, (proj, t) in enumerate(by_cat["G"][:15], 1):
    name = t.get("name", "")[:80]
    ass = ((t.get("assignee") or {}).get("name") or "Unassigned")[:14]
    print(f"  {i:>2}. [{proj[:24]:<24}] {ass:<14} {name}")

print(f"\n=== Headline ===")
print(f"  Total open:                   {total_open}")
print(f"  Overdue:                      {overdue_open}")
print(f"  No due date:                  {nodate_open}")
print(f"  Cos-actionable (A):           {cats['A']}")
print(f"  Cos-actionable IF decided (B): {cats['B']}")
print(f"  Stale archive candidates (F): {cats['F']}")
print(f"  → If we did A + archived F:   {cats['A']} done, {cats['F']} retired = "
      f"{cats['A']+cats['F']} tasks off the board ({100*(cats['A']+cats['F'])//total_open}%)")
