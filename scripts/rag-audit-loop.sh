#!/bin/bash
# RAG Audit Feedback Loop
# Runs queries against the RAG, logs findings, creates GitHub issues for problems
# Usage: bash scripts/rag-audit-loop.sh

RAG="http://localhost:8090/api/audit/query"
TOKEN="hdi-audit-2026"
REPORT="/tmp/rag-audit-$(date +%Y%m%d-%H%M).md"

echo "# RAG Audit Loop — $(date)" > $REPORT
echo "" >> $REPORT

QUERIES=(
  "API routes without error handling try catch"
  "hardcoded API keys secrets tokens passwords"
  "console.log in production API routes"
  "TODO FIXME HACK workaround temporary"
  "race condition concurrent async await parallel"
  "missing validation parseInt parseFloat NaN"
  "CORS origin access-control headers"
  "rate limiting throttle abuse prevention"
  "memory leak connection pool cleanup disconnect"
  "deprecated function method library outdated"
  "test coverage jest vitest playwright spec"
  "accessibility aria label alt text screen reader"
  "performance optimization lazy load bundle size"
  "caching strategy stale-while-revalidate TTL"
  "logging structured json error tracking sentry"
)

for q in "${QUERIES[@]}"; do
  echo "=== Query: $q ===" >> $REPORT
  result=$(curl -s -X POST "$RAG" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"question\": \"$q\", \"maxChunks\": 3}")
  
  echo "$result" | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    for r in d.get('results', [])[:3]:
        f = r['file']
        # Skip build artifacts
        if 'build/' in f or '.css' in f or 'node_modules' in f:
            continue
        print(f'- [{r[\"score\"]:.0f}] {f}')
        chunk = r['chunk'][:200].replace('\n', ' ')
        print(f'  {chunk}')
        print()
except:
    print('  (parse error)')
" >> $REPORT 2>/dev/null
  
  echo "" >> $REPORT
  sleep 1
done

echo "---" >> $REPORT
echo "Report saved to: $REPORT"
echo "$(wc -l < $REPORT) lines"
cat $REPORT
