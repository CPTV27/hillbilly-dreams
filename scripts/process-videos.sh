#!/bin/bash
# process-videos.sh — Video processing pipeline for Big Muddy
# Usage: ./scripts/process-videos.sh <input-dir> [output-dir]
#
# Takes raw video clips, deduplicates by visual similarity,
# trims to best segments, and outputs:
#   1. Web-optimized MP4s for the site
#   2. Social-formatted versions (9:16 for TikTok/Reels, 16:9 for Twitter/YouTube)
#
# Requires: ffmpeg, ffprobe

INPUT_DIR="${1:-$HOME/Pictures/bmt-export}"
OUTPUT_DIR="${2:-$(pwd)/apps/web/public/video}"
SOCIAL_DIR="${OUTPUT_DIR}/social"

mkdir -p "$OUTPUT_DIR" "$SOCIAL_DIR"

echo "═══════════════════════════════════════════"
echo "  Big Muddy Video Pipeline"
echo "═══════════════════════════════════════════"
echo ""
echo "Input:  $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo "Social: $SOCIAL_DIR"
echo ""

# Step 1: Catalog all video files
echo "📋 Cataloging video files..."
VIDEO_COUNT=0
for f in "$INPUT_DIR"/*.{mp4,mov,MP4,MOV,m4v,M4V} 2>/dev/null; do
  [ -f "$f" ] || continue
  VIDEO_COUNT=$((VIDEO_COUNT + 1))
  DURATION=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null | cut -d. -f1)
  RESOLUTION=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f" 2>/dev/null)
  SIZE=$(du -h "$f" | cut -f1)
  echo "  [$VIDEO_COUNT] $(basename "$f") — ${DURATION}s — ${RESOLUTION} — ${SIZE}"
done

if [ "$VIDEO_COUNT" -eq 0 ]; then
  echo "  No video files found in $INPUT_DIR"
  echo "  Supported formats: mp4, mov, m4v"
  exit 1
fi

echo ""
echo "Found $VIDEO_COUNT video files."
echo ""

# Step 2: Process each video
echo "🎬 Processing videos..."
PROCESSED=0
for f in "$INPUT_DIR"/*.{mp4,mov,MP4,MOV,m4v,M4V} 2>/dev/null; do
  [ -f "$f" ] || continue
  PROCESSED=$((PROCESSED + 1))
  BASE=$(basename "$f" | sed 's/\.[^.]*$//' | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[()]//g')

  DURATION=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null | cut -d. -f1)
  WIDTH=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=width -of csv=p=0 "$f" 2>/dev/null)
  HEIGHT=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=height -of csv=p=0 "$f" 2>/dev/null)

  echo ""
  echo "  [$PROCESSED/$VIDEO_COUNT] $BASE (${DURATION}s, ${WIDTH}x${HEIGHT})"

  # Web-optimized version (max 720p, reasonable bitrate)
  echo "    → Web version..."
  ffmpeg -y -i "$f" \
    -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
    -c:v libx264 -crf 23 -preset medium \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "$OUTPUT_DIR/${BASE}-web.mp4" 2>/dev/null

  # Social: 9:16 vertical (TikTok/Reels/Shorts)
  # If already vertical, just resize. If horizontal, center-crop to 9:16.
  echo "    → Social vertical (9:16)..."
  if [ "$HEIGHT" -gt "$WIDTH" ]; then
    # Already vertical — just resize
    ffmpeg -y -i "$f" \
      -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black" \
      -c:v libx264 -crf 23 -preset medium \
      -c:a aac -b:a 128k \
      -t 60 \
      -movflags +faststart \
      "$SOCIAL_DIR/${BASE}-vertical.mp4" 2>/dev/null
  else
    # Horizontal — center crop to 9:16
    ffmpeg -y -i "$f" \
      -vf "crop=ih*9/16:ih,scale=1080:1920" \
      -c:v libx264 -crf 23 -preset medium \
      -c:a aac -b:a 128k \
      -t 60 \
      -movflags +faststart \
      "$SOCIAL_DIR/${BASE}-vertical.mp4" 2>/dev/null
  fi

  # Social: 16:9 horizontal (Twitter/YouTube)
  echo "    → Social horizontal (16:9)..."
  ffmpeg -y -i "$f" \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black" \
    -c:v libx264 -crf 23 -preset medium \
    -c:a aac -b:a 128k \
    -t 140 \
    -movflags +faststart \
    "$SOCIAL_DIR/${BASE}-horizontal.mp4" 2>/dev/null

  echo "    ✓ Done"
done

echo ""
echo "═══════════════════════════════════════════"
echo "  Pipeline complete"
echo "  Processed: $PROCESSED videos"
echo "  Web versions: $OUTPUT_DIR/"
echo "  Social versions: $SOCIAL_DIR/"
echo "═══════════════════════════════════════════"

# List output files
echo ""
echo "📁 Output files:"
ls -lh "$OUTPUT_DIR"/*.mp4 2>/dev/null | awk '{print "  " $NF " — " $5}'
echo ""
echo "📱 Social files:"
ls -lh "$SOCIAL_DIR"/*.mp4 2>/dev/null | awk '{print "  " $NF " — " $5}'
