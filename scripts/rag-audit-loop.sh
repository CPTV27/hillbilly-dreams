#!/usr/bin/env bash
# RAG audit baseline — static checks for overnight feedback loop.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "# RAG audit loop"
echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo

echo "## TODO/FIXME/HACK (apps/web/app)"
rg -n "TODO|FIXME|HACK" apps/web/app --glob "*.ts" --glob "*.tsx" 2>/dev/null || true
echo

echo "## getGeminiModel (apps/web/app/api)"
rg -rl "getGeminiModel" apps/web/app/api 2>/dev/null || true
echo "(expect empty lines above)"
echo

echo "## console.log in apps/web/app/api (sample)"
rg -l "console\.log" apps/web/app/api 2>/dev/null | head -40 || true
echo

echo "## requireAdmin usage count"
rg -c "requireAdmin" apps/web/app/api --glob "*.ts" 2>/dev/null | wc -l || true
echo

echo "## Done"
