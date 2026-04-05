#!/usr/bin/env bash
# RAG audit baseline — static checks for overnight feedback loop.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "# RAG audit loop"
echo "Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo

echo "## TODO/FIXME/HACK (apps/web/app)"
if command -v rg >/dev/null 2>&1; then
  rg -n "TODO|FIXME|HACK" apps/web/app --glob "*.ts" --glob "*.tsx" 2>/dev/null || true
else
  grep -rn "TODO\|FIXME\|HACK" apps/web/app --include='*.ts' --include='*.tsx' 2>/dev/null | head -80 || true
fi
echo

echo "## getGeminiModel (apps/web/app/api)"
if command -v rg >/dev/null 2>&1; then
  rg -rl "getGeminiModel" apps/web/app/api 2>/dev/null || true
else
  grep -rl "getGeminiModel" apps/web/app/api --include='*.ts' 2>/dev/null || true
fi
echo "(expect empty lines above)"
echo

echo "## console.log in apps/web/app/api (sample)"
if command -v rg >/dev/null 2>&1; then
  rg -l "console\.log" apps/web/app/api 2>/dev/null | head -40 || true
else
  grep -rl "console\.log" apps/web/app/api --include='*.ts' 2>/dev/null | head -40 || true
fi
echo

echo "## requireAdmin usage count (files)"
if command -v rg >/dev/null 2>&1; then
  rg -l "requireAdmin" apps/web/app/api --glob "*.ts" 2>/dev/null | wc -l || true
else
  grep -rl requireAdmin apps/web/app/api --include='*.ts' 2>/dev/null | wc -l || true
fi
echo

echo "## Done"
