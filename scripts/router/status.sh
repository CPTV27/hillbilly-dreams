#!/usr/bin/env bash
# scripts/router/status.sh
# Snapshot of the queue: what's done, running, ready, blocked.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
QUEUE="$ROOT/docs/router/queue.json"

python3 << 'EOF'
import json, sys
from collections import defaultdict

QUEUE = "$QUEUE"
EOF

python3 << EOF
import json
from collections import defaultdict

with open('$QUEUE') as f:
    data = json.load(f)

queue = data['queue']
buckets = defaultdict(list)
for p in queue:
    buckets[p['status']].append(p)

# Symbols
SYM = {'done': '✓', 'running': '▸', 'ready': '○', 'blocked': '✕'}
COLORS = {
    'done': '\033[32m',     # green
    'running': '\033[33m',  # yellow
    'ready': '\033[36m',    # cyan
    'blocked': '\033[90m',  # gray
}
RESET = '\033[0m'
BOLD = '\033[1m'

print(f"{BOLD}═══════════════════════════════════════════════════════════════{RESET}")
print(f"{BOLD}HILLBILLY DREAMS AGENT QUEUE{RESET}              updated: {data['_updated']}")
print(f"{BOLD}═══════════════════════════════════════════════════════════════{RESET}")

total = len(queue)
done = len(buckets['done'])
running = len(buckets['running'])
ready = len(buckets['ready'])
blocked = len(buckets['blocked'])

print(f"  Done: {done}  ·  Running: {running}  ·  Ready: {ready}  ·  Blocked: {blocked}  ·  Total: {total}")
print()

for status in ['running', 'ready', 'blocked', 'done']:
    items = buckets.get(status, [])
    if not items:
        continue
    color = COLORS[status]
    print(f"{color}{BOLD}{status.upper()}{RESET}  ({len(items)})")
    for p in items:
        sym = SYM[status]
        owner = p.get('owner', '')
        est = p.get('estimated_minutes', '?')
        line = f"  {color}{sym}{RESET} {p['id']:<32} {p['title']}"
        meta = f"      {owner} · ~{est}min"
        if p.get('blocked_by'):
            meta += f" · blocked by: {p['blocked_by']}"
        if p.get('depends_on') and status == 'blocked':
            meta += f" · needs: {', '.join(p['depends_on'])}"
        print(line)
        print(f"{color}{meta}{RESET}")
    print()

print(f"{BOLD}Commands:{RESET}")
print("  bash scripts/router/next.sh                       # pick next ready, print prompt")
print("  bash scripts/router/next.sh --id P04-press-seed   # print specific project's prompt")
print("  bash scripts/router/ship.sh <id>                  # mark done, auto-unblock dependents")
print("  bash scripts/router/block.sh <id> '<reason>'      # mark blocked")
print("  bash scripts/router/sync.sh                       # regenerate docs/router/QUEUE.md")
EOF
