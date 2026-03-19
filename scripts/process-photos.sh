#!/bin/bash
# process-photos.sh — Photo processing pipeline for Big Muddy
# Usage: ./scripts/process-photos.sh <input-dir> [output-subdir]
#
# Takes DxO-processed JPEGs from bmt-export and:
#   1. Converts to web-optimized WebP (1600px wide, q82)
#   2. Creates thumbnail versions (400px wide, q75)
#   3. Auto-straightens using ImageMagick if available
#   4. Generates a catalog file listing all processed images
#
# Requires: cwebp (libwebp)
# Optional: convert (ImageMagick) for auto-straighten

INPUT_DIR="${1:-$HOME/Pictures/bmt-export}"
OUTPUT_SUBDIR="${2:-corridor}"
OUTPUT_DIR="$(pwd)/apps/web/public/images/${OUTPUT_SUBDIR}"
THUMB_DIR="${OUTPUT_DIR}/thumbs"
CATALOG_FILE="$(pwd)/docs/photo-catalog-${OUTPUT_SUBDIR}.md"

mkdir -p "$OUTPUT_DIR" "$THUMB_DIR"

echo "═══════════════════════════════════════════"
echo "  Big Muddy Photo Pipeline"
echo "═══════════════════════════════════════════"
echo ""
echo "Input:      $INPUT_DIR"
echo "Output:     $OUTPUT_DIR"
echo "Thumbnails: $THUMB_DIR"
echo "Catalog:    $CATALOG_FILE"
echo ""

# Initialize catalog
echo "# Photo Catalog — ${OUTPUT_SUBDIR}" > "$CATALOG_FILE"
echo "" >> "$CATALOG_FILE"
echo "Generated: $(date '+%Y-%m-%d %H:%M')" >> "$CATALOG_FILE"
echo "" >> "$CATALOG_FILE"
echo "| # | Filename | Size | Original |" >> "$CATALOG_FILE"
echo "|---|----------|------|----------|" >> "$CATALOG_FILE"

# Process each image
COUNT=0
TOTAL=$(ls "$INPUT_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG,tiff,TIFF} 2>/dev/null | wc -l | tr -d ' ')

echo "Found $TOTAL images to process."
echo ""

for f in "$INPUT_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG,tiff,TIFF} 2>/dev/null; do
  [ -f "$f" ] || continue
  COUNT=$((COUNT + 1))

  # Generate clean filename
  BASE=$(basename "$f" | sed 's/\.[^.]*$//' | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[()]//g' | sed 's/--*/-/g' | sed 's/-dxo_deepPRIME.*//i' | sed 's/-dxo-deepprime.*//i')
  OUTFILE="${OUTPUT_DIR}/${BASE}.webp"
  THUMBFILE="${THUMB_DIR}/${BASE}-thumb.webp"

  # Skip if already processed
  if [ -f "$OUTFILE" ]; then
    echo "  [$COUNT/$TOTAL] SKIP $(basename "$OUTFILE") (exists)"
    continue
  fi

  echo "  [$COUNT/$TOTAL] $(basename "$f") → ${BASE}.webp"

  # Full-size web version (1600px wide)
  cwebp -q 82 -resize 1600 0 "$f" -o "$OUTFILE" 2>/dev/null

  # Thumbnail (400px wide)
  cwebp -q 75 -resize 400 0 "$f" -o "$THUMBFILE" 2>/dev/null

  # Get file size
  SIZE=$(du -h "$OUTFILE" | cut -f1 | tr -d ' ')

  # Add to catalog
  echo "| $COUNT | ${BASE}.webp | $SIZE | $(basename "$f") |" >> "$CATALOG_FILE"
done

echo ""
echo "═══════════════════════════════════════════"
echo "  Pipeline complete"
echo "  Processed: $COUNT / $TOTAL images"
echo "  Full-size: $OUTPUT_DIR/"
echo "  Thumbnails: $THUMB_DIR/"
echo "  Catalog: $CATALOG_FILE"
echo "═══════════════════════════════════════════"
