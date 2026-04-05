#!/bin/bash
# Photo Curator — Analyze and rank photos from GCS and local collections
# Run: bash scripts/photo-curator.sh
# Outputs: docs/ops/PHOTO_CURATION_REPORT.md

set -e

REPO_IMAGES="apps/web/public/images"
OUTPUT="docs/ops/PHOTO_CURATION_REPORT.md"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "# Photo Curation Report" > "$OUTPUT"
echo "" >> "$OUTPUT"
echo "*Generated: $TIMESTAMP*" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Count images by directory
echo "## Collection Inventory" >> "$OUTPUT"
echo "" >> "$OUTPUT"
echo "| Directory | Count | Types |" >> "$OUTPUT"
echo "|---|---|---|" >> "$OUTPUT"

for dir in "$REPO_IMAGES"/*/; do
  dirname=$(basename "$dir")
  count=$(find "$dir" -maxdepth 1 -name "*.webp" -o -name "*.jpg" -o -name "*.png" 2>/dev/null | wc -l | tr -d ' ')
  if [ "$count" -gt 0 ]; then
    echo "| $dirname | $count | webp/jpg/png |" >> "$OUTPUT"
  fi
done

echo "" >> "$OUTPUT"
echo "## Recent Additions (last 7 days)" >> "$OUTPUT"
echo "" >> "$OUTPUT"
find "$REPO_IMAGES" -name "*.webp" -mtime -7 2>/dev/null | while read f; do
  echo "- $(basename $f) ($(basename $(dirname $f)))" >> "$OUTPUT"
done

echo "" >> "$OUTPUT"
echo "## Unused Images (in repo but not referenced by any page)" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Find all referenced images
grep -rho 'src="/images/[^"]*"' apps/web/app/ apps/web/public/press/ apps/web/public/sandbox/ 2>/dev/null | sort -u > /tmp/referenced-images.txt

# Find all images in repo
find "$REPO_IMAGES" -name "*.webp" | sed "s|$REPO_IMAGES|/images|" | sort > /tmp/all-images.txt

# Diff
comm -23 /tmp/all-images.txt /tmp/referenced-images.txt | head -50 >> "$OUTPUT"

echo "" >> "$OUTPUT"
echo "## Lightroom Exports (ready for ingest)" >> "$OUTPUT"
echo "" >> "$OUTPUT"

LR_OUTPUT="/Users/chasethis/Pictures/LR-OUTPUT"
if [ -d "$LR_OUTPUT" ]; then
  count=$(find "$LR_OUTPUT" -name "*.jpg" -o -name "*.tif" -o -name "*.webp" 2>/dev/null | wc -l | tr -d ' ')
  echo "LR-OUTPUT: $count files ready for processing" >> "$OUTPUT"
else
  echo "LR-OUTPUT directory is empty. Export from Lightroom to /Users/chasethis/Pictures/LR-OUTPUT/" >> "$OUTPUT"
fi

echo "" >> "$OUTPUT"
echo "---" >> "$OUTPUT"
echo "*Next: Run Gemini Vision analysis on top 50 unreferenced images to rank by composition, color, and editorial value.*" >> "$OUTPUT"

echo "Report saved to $OUTPUT"
cat "$OUTPUT"
