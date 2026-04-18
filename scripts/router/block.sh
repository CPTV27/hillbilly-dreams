#!/usr/bin/env bash
# scripts/router/block.sh
# Mark a project as blocked with a reason.
# Usage: bash scripts/router/block.sh <project-id> "<reason>"

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
QUEUE="$ROOT/docs/router/queue.json"

PROJECT_ID="${1:-}"
REASON="${2:-no reason given}"

if [ -z "$PROJECT_ID" ]; then
    echo "Usage: bash scripts/router/block.sh <project-id> '<reason>'" >&2
    exit 1
fi

python3 << EOF
import json
from datetime import datetime
with open('$QUEUE') as f:
    data = json.load(f)
for p in data['queue']:
    if p['id'] == '$PROJECT_ID':
        p['status'] = 'blocked'
        p['blocked_by'] = '$REASON'
        p['blocked_at'] = datetime.now().isoformat(timespec='seconds')
data['_updated'] = datetime.now().isoformat(timespec='seconds')
with open('$QUEUE', 'w') as f:
    json.dump(data, f, indent=2)
print(f"✕ $PROJECT_ID blocked: $REASON")
EOF

bash "$ROOT/scripts/router/sync.sh" >/dev/null
