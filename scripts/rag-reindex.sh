#!/bin/bash
# Auto-reindex RAG after code changes
# Add to git hooks or run manually: bash scripts/rag-reindex.sh

echo "Reindexing RAG..."
RESULT=$(curl -s -X POST http://localhost:8090/api/audit/reindex \
  -H "Authorization: Bearer hdi-audit-2026" 2>/dev/null)

if echo "$RESULT" | grep -q "reindexed"; then
  CHUNKS=$(echo "$RESULT" | python3 -c "import json,sys; print(json.load(sys.stdin)['chunks'])" 2>/dev/null)
  echo "RAG reindexed: $CHUNKS chunks"
else
  echo "RAG not running or reindex failed"
fi
