#!/usr/bin/env bash
# scripts/router/next.sh
# Print the next ready project's prompt. Copies to clipboard on macOS.
# Usage: bash scripts/router/next.sh [--id <project-id>]
#
# By default: picks the FIRST project with status: ready.
# With --id: prints that specific project's prompt.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
QUEUE="$ROOT/docs/router/queue.json"

if [ ! -f "$QUEUE" ]; then
    echo "ERROR: $QUEUE not found" >&2
    exit 1
fi

PROJECT_ID="${1:-}"
if [ "$PROJECT_ID" = "--id" ]; then
    PROJECT_ID="${2:-}"
fi

if [ -n "$PROJECT_ID" ]; then
    SELECTOR=".queue[] | select(.id == \"$PROJECT_ID\")"
else
    SELECTOR='.queue | map(select(.status == "ready")) | .[0]'
fi

PROJECT=$(python3 -c "
import json, sys
with open('$QUEUE') as f:
    data = json.load(f)
queue = data['queue']
target = '$PROJECT_ID'
if target:
    matches = [p for p in queue if p['id'] == target]
    p = matches[0] if matches else None
else:
    matches = [p for p in queue if p['status'] == 'ready']
    p = matches[0] if matches else None
if not p:
    print('NONE_READY', file=sys.stderr)
    sys.exit(2)
print(json.dumps(p))
")

if [ -z "$PROJECT" ]; then
    echo "" >&2
    echo "No ready projects in queue." >&2
    echo "Check status: bash scripts/router/status.sh" >&2
    exit 2
fi

ID=$(echo "$PROJECT" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
TITLE=$(echo "$PROJECT" | python3 -c "import sys,json; print(json.load(sys.stdin)['title'])")
OWNER=$(echo "$PROJECT" | python3 -c "import sys,json; print(json.load(sys.stdin)['owner'])")
EST=$(echo "$PROJECT" | python3 -c "import sys,json; print(json.load(sys.stdin)['estimated_minutes'])")
PROMPT=$(echo "$PROJECT" | python3 -c "import sys,json; print(json.load(sys.stdin)['prompt'])")

# Mark as running unless this was a peek via --id
MARKED_RUNNING="no"
if [ "${1:-}" != "--id" ]; then
    python3 -c "
import json
from datetime import datetime
with open('$QUEUE') as f:
    data = json.load(f)
for p in data['queue']:
    if p['id'] == '$ID':
        p['status'] = 'running'
data['_updated'] = datetime.now().isoformat(timespec='seconds')
with open('$QUEUE', 'w') as f:
    json.dump(data, f, indent=2)
"
    MARKED_RUNNING="yes"
fi

# Copy to clipboard if pbcopy available
if command -v pbcopy >/dev/null 2>&1; then
    echo "$PROMPT" | pbcopy
    CLIPBOARD_NOTE=" (copied to clipboard)"
else
    CLIPBOARD_NOTE=""
fi

if [ "$MARKED_RUNNING" = "yes" ]; then
    STATUS_LINE="marked RUNNING (use ship to advance)"
else
    STATUS_LINE="peek only — state unchanged"
fi

cat <<EOF
═══════════════════════════════════════════════════════════════
NEXT PROJECT — $ID
═══════════════════════════════════════════════════════════════
Title:   $TITLE
Owner:   $OWNER
Time:    ~${EST} min
Status:  $STATUS_LINE

PROMPT (paste into Claude/Cursor)$CLIPBOARD_NOTE:
───────────────────────────────────────────────────────────────
$PROMPT
───────────────────────────────────────────────────────────────

When done:    bash scripts/router/ship.sh $ID
On failure:   bash scripts/router/block.sh $ID "<reason>"
EOF
