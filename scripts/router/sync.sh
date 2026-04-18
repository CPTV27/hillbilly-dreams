#!/usr/bin/env bash
# scripts/router/sync.sh
# Regenerate docs/router/QUEUE.md from queue.json.
# Delegates to _sync_impl.py to avoid shell-heredoc quoting hell.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
exec python3 "$ROOT/scripts/router/_sync_impl.py"
