#!/usr/bin/env bash
# scripts/router/ship.sh
# Mark a project as done. Auto-unblock any dependents.
# Usage: bash scripts/router/ship.sh <project-id>

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
QUEUE="$ROOT/docs/router/queue.json"

PROJECT_ID="${1:-}"
if [ -z "$PROJECT_ID" ]; then
    echo "Usage: bash scripts/router/ship.sh <project-id>" >&2
    echo "" >&2
    echo "Current running projects:" >&2
    python3 -c "
import json
with open('$QUEUE') as f:
    data = json.load(f)
for p in data['queue']:
    if p['status'] == 'running':
        print(f\"  {p['id']:<30} {p['title']}\")
" >&2
    exit 1
fi

python3 << EOF
import json
from datetime import datetime

with open('$QUEUE') as f:
    data = json.load(f)

found = False
unblocked = []
for p in data['queue']:
    if p['id'] == '$PROJECT_ID':
        p['status'] = 'done'
        p['shipped_at'] = datetime.now().isoformat(timespec='seconds')
        found = True

if not found:
    import sys
    print(f"ERROR: project '$PROJECT_ID' not in queue", file=sys.stderr)
    sys.exit(1)

# Auto-unblock anything whose deps are now satisfied
done_ids = {p['id'] for p in data['queue'] if p['status'] == 'done'}
for p in data['queue']:
    if p['status'] == 'blocked' and p.get('depends_on'):
        if all(d in done_ids for d in p['depends_on']):
            p['status'] = 'ready'
            unblocked.append(p['id'])

data['_updated'] = datetime.now().isoformat(timespec='seconds')
with open('$QUEUE', 'w') as f:
    json.dump(data, f, indent=2)

print(f"✓ {p['id']} marked DONE")
if unblocked:
    print(f"  Unblocked: {', '.join(unblocked)}")
EOF

# Regenerate the human-readable queue
bash "$ROOT/scripts/router/sync.sh" >/dev/null
echo ""
echo "Run next: bash scripts/router/next.sh"
