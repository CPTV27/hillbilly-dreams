#!/bin/bash
# Imagen 3 REST API generator — saves PNG to specified path
# Usage: imagen-gen.sh "prompt" output.png [aspect_ratio]
set -e
PROMPT="$1"
OUT="$2"
ASPECT="${3:-16:9}"

if [[ -z "$PROMPT" || -z "$OUT" ]]; then
  echo "Usage: $0 \"prompt\" output.png [aspect_ratio]" >&2
  exit 1
fi

ACCESS_TOKEN=$(gcloud auth print-access-token --account=bigmuddy@bigmuddy-ff651.iam.gserviceaccount.com 2>/dev/null)
if [[ -z "$ACCESS_TOKEN" ]]; then
  echo "Failed to get access token" >&2
  exit 2
fi

RESPONSE=$(curl -sS -X POST \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/bigmuddy-ff651/locations/us-central1/publishers/google/models/imagen-3.0-generate-002:predict" \
  -d "$(jq -n --arg p "$PROMPT" --arg a "$ASPECT" '{
    instances: [{prompt: $p}],
    parameters: {sampleCount: 1, aspectRatio: $a, safetyFilterLevel: "block_only_high", personGeneration: "allow_adult"}
  }')")

echo "$RESPONSE" | jq -r '.predictions[0].bytesBase64Encoded' | base64 --decode > "$OUT"
SIZE=$(stat -f%z "$OUT" 2>/dev/null || stat -c%s "$OUT")
if [[ "$SIZE" -gt 10000 ]]; then
  echo "OK: $OUT ($SIZE bytes)"
else
  echo "FAIL: $OUT only $SIZE bytes — check response:" >&2
  echo "$RESPONSE" | head -c 500 >&2
  exit 3
fi
