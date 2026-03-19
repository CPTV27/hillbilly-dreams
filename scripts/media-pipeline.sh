#!/bin/bash
# media-pipeline.sh — Master media processing pipeline for Big Muddy
# Usage: ./scripts/media-pipeline.sh [export-dir] [output-subdir]
#
# THE WORKFLOW:
#   1. Export from Apple Photos → unmodified originals → export-dir
#   2. Process through DxO PhotoLab (manual step)
#   3. Run this script on the DxO output
#
# This script handles:
#   - Photo conversion (JPG/TIFF → WebP, web + thumbnails)
#   - Video processing (MOV/MP4 → web + social formats)
#   - Catalog generation (markdown inventory of all processed media)
#   - Git staging (shows what's ready to commit)
#
# Requires: cwebp, ffmpeg, ffprobe

set -e

EXPORT_DIR="${1:-$HOME/Pictures/bmt-export}"
SUBDIR="${2:-new-batch}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo ""
echo "╔═══════════════════════════════════════════════╗"
echo "║     Big Muddy Media Pipeline                  ║"
echo "╠═══════════════════════════════════════════════╣"
echo "║                                               ║"
echo "║  Export → DxO → Pipeline → Site               ║"
echo "║                                               ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# Check dependencies
echo "Checking dependencies..."
command -v cwebp >/dev/null 2>&1 || { echo "❌ cwebp not found. Install: brew install webp"; exit 1; }
command -v ffmpeg >/dev/null 2>&1 || { echo "❌ ffmpeg not found. Install: brew install ffmpeg"; exit 1; }
echo "✓ cwebp found"
echo "✓ ffmpeg found"
echo ""

# Count media files
PHOTO_COUNT=$(ls "$EXPORT_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG,tiff,TIFF,heic,HEIC} 2>/dev/null | wc -l | tr -d ' ')
VIDEO_COUNT=$(ls "$EXPORT_DIR"/*.{mp4,mov,MP4,MOV,m4v,M4V} 2>/dev/null | wc -l | tr -d ' ')

echo "Source: $EXPORT_DIR"
echo "Photos: $PHOTO_COUNT"
echo "Videos: $VIDEO_COUNT"
echo ""

# Process photos
if [ "$PHOTO_COUNT" -gt 0 ]; then
  echo "══════════ PHOTOS ══════════"
  bash "$SCRIPT_DIR/process-photos.sh" "$EXPORT_DIR" "$SUBDIR"
  echo ""
fi

# Process videos
if [ "$VIDEO_COUNT" -gt 0 ]; then
  echo "══════════ VIDEOS ══════════"
  bash "$SCRIPT_DIR/process-videos.sh" "$EXPORT_DIR"
  echo ""
fi

# Summary
echo ""
echo "╔═══════════════════════════════════════════════╗"
echo "║     Pipeline Complete                         ║"
echo "╠═══════════════════════════════════════════════╣"
echo "║                                               ║"
echo "║  Photos: $PHOTO_COUNT processed                        ║"
echo "║  Videos: $VIDEO_COUNT processed                        ║"
echo "║                                               ║"
echo "║  Next steps:                                  ║"
echo "║  1. Review processed files                    ║"
echo "║  2. Rename descriptively if needed            ║"
echo "║  3. Place on pages (CC will help)             ║"
echo "║  4. git add + commit                          ║"
echo "║                                               ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# Show new files ready to stage
echo "📁 New files ready for the site:"
cd "$PROJECT_ROOT"
git status --short apps/web/public/images/ apps/web/public/video/ 2>/dev/null | head -20
