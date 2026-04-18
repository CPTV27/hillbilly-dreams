#!/usr/bin/env bash
# scripts/router/unblock.sh
# Mark a blocked project as ready.
# Usage: bash scripts/router/unblock.sh <project-id>

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
QUEUE="$ROOT/docs/router/queue.json"

PROJECT_ID="${1:-}"
if [ -z "$PROJECT_ID" ]; then
    echo "Usage: bash scripts/router/unblock.sh <project-id>" >&2
    exit 1
fi

python3 << EOF
import json
from datetime import datetime
with open('$QUEUE') as f:
    data = json.load(f)
for p in data['queue']:
    if p['id'] == '$PROJECT_ID':
        p['status'] = 'ready'
        p.pop('blocked_by', None)
        p.pop('blocked_at', None)
data['_updated'] = datetime.now().isoformat(timespec='seconds')
with open('$QUEUE', 'w') as f:
    json.dump(data, f, indent=2)
print(f"○ $PROJECT_ID marked READY")
EOF

bash "$ROOT/scripts/router/sync.sh" >/dev/null
