#!/bin/bash
# cd-ingest.sh — Rip a CD, tag it, upload to GCS, sync to the radio station
#
# Usage: cd-ingest.sh "Artist Name" [/Volumes/CD-Name]
#
# What it does:
# 1. Reads all .aiff tracks from the mounted CD
# 2. Converts to FLAC (archive) + MP3 320kbps (streaming)
# 3. Tags with artist, album, track number, title, genre
# 4. Organizes into ~/BigMuddy-Ingest/Artist/Album/
# 5. Uploads MP3s to GCS (bmt-media-bigmuddy/radio/library/)
# 6. Syncs to the Mac mini's T7 radio library
# 7. Ejects the CD
#
# Requirements: ffmpeg (brew install ffmpeg), gsutil or gcloud CLI

set -euo pipefail

# --- Args ---
ARTIST="${1:?Usage: cd-ingest.sh \"Artist Name\" [/Volumes/CD-Name]}"

# Auto-detect CD volume if not specified
if [ -n "${2:-}" ]; then
  CD_VOLUME="$2"
else
  CD_VOLUME=$(mount | grep cddafs | head -1 | sed 's/.*on \(.*\) (.*/\1/')
  if [ -z "$CD_VOLUME" ]; then
    echo "ERROR: No audio CD found. Insert a CD and try again."
    exit 1
  fi
fi

ALBUM=$(basename "$CD_VOLUME")
GENRE="${3:-Blues}"

# --- Paths ---
INGEST_BASE=~/BigMuddy-Ingest
DEST="$INGEST_BASE/$ARTIST/$ALBUM"
FLAC_DIR="$DEST/flac"
MP3_DIR="$DEST/mp3"

GCS_BUCKET="gs://bmt-media-bigmuddy/radio/library"
MINI_HOST="ClawdBOT@192.168.4.37"
MINI_DEST="/Volumes/T7/Music/BigMuddy-Radio-Library"
MINI_SSH_KEY="$HOME/.ssh/id_mini"

echo ""
echo "═══════════════════════════════════════════════"
echo "  Big Muddy Radio — CD Ingest Pipeline"
echo "═══════════════════════════════════════════════"
echo ""
echo "  Artist:  $ARTIST"
echo "  Album:   $ALBUM"
echo "  Genre:   $GENRE"
echo "  Source:  $CD_VOLUME"
echo "  Output:  $DEST"
echo ""

# --- Create directories ---
mkdir -p "$FLAC_DIR" "$MP3_DIR"

# --- Count tracks ---
TRACK_COUNT=$(find "$CD_VOLUME" -maxdepth 1 -name "*.aiff" | wc -l | tr -d ' ')
echo "  Tracks:  $TRACK_COUNT"
echo ""
echo "═══════════════════════════════════════════════"
echo ""

# --- Rip + encode + tag each track ---
TRACK_NUM=0
for AIFF in "$CD_VOLUME"/*.aiff; do
  TRACK_NUM=$((TRACK_NUM + 1))
  FILENAME=$(basename "$AIFF" .aiff)

  # Parse title from filename (format: "N Title" or "NN Title")
  TITLE=$(echo "$FILENAME" | sed 's/^[0-9]* //')

  PADDED=$(printf "%02d" "$TRACK_NUM")
  SAFE_TITLE=$(echo "$TITLE" | tr '/' '-' | tr ':' '-')

  echo "[$PADDED/$TRACK_COUNT] $TITLE"

  # FLAC (lossless archive)
  ffmpeg -hide_banner -loglevel warning -i "$AIFF" \
    -metadata artist="$ARTIST" \
    -metadata album="$ALBUM" \
    -metadata title="$TITLE" \
    -metadata track="$TRACK_NUM/$TRACK_COUNT" \
    -metadata genre="$GENRE" \
    -metadata date="$(date +%Y)" \
    -metadata comment="Ingested by Big Muddy Radio from CD" \
    "$FLAC_DIR/${PADDED} - ${SAFE_TITLE}.flac" -y

  # MP3 320kbps (for streaming + playlist)
  ffmpeg -hide_banner -loglevel warning -i "$AIFF" \
    -codec:a libmp3lame -b:a 320k \
    -metadata artist="$ARTIST" \
    -metadata album="$ALBUM" \
    -metadata title="$TITLE" \
    -metadata track="$TRACK_NUM/$TRACK_COUNT" \
    -metadata genre="$GENRE" \
    -metadata date="$(date +%Y)" \
    -metadata comment="Ingested by Big Muddy Radio from CD" \
    "$MP3_DIR/${PADDED} - ${SAFE_TITLE}.mp3" -y

  echo "    ✓ FLAC + MP3"
done

echo ""
echo "═══════════════════════════════════════════════"
echo "  Encoding complete: $TRACK_COUNT tracks"
echo "  FLAC: $(du -sh "$FLAC_DIR" | cut -f1)"
echo "  MP3:  $(du -sh "$MP3_DIR" | cut -f1)"
echo "═══════════════════════════════════════════════"
echo ""

# --- Upload to GCS ---
echo "Uploading MP3s to GCS..."
if command -v gsutil &>/dev/null; then
  gsutil -m cp "$MP3_DIR"/*.mp3 "$GCS_BUCKET/$ARTIST/$ALBUM/" 2>&1 | tail -3
  echo "  ✓ GCS upload complete"
else
  echo "  ⚠ gsutil not found — skipping GCS upload"
  echo "  Run: gcloud auth login && gsutil -m cp '$MP3_DIR'/*.mp3 '$GCS_BUCKET/$ARTIST/$ALBUM/'"
fi
echo ""

# --- Sync to Mac mini ---
echo "Syncing to Mac mini radio library..."
if [ -f "$MINI_SSH_KEY" ]; then
  ssh -i "$MINI_SSH_KEY" -o ConnectTimeout=5 "$MINI_HOST" "mkdir -p '$MINI_DEST/$ARTIST/$ALBUM'" 2>/dev/null
  rsync -avz --progress -e "ssh -i $MINI_SSH_KEY" \
    "$MP3_DIR/" "$MINI_HOST:$MINI_DEST/$ARTIST/$ALBUM/" 2>&1 | tail -5
  echo "  ✓ Synced to mini: $MINI_DEST/$ARTIST/$ALBUM/"
else
  echo "  ⚠ SSH key not found at $MINI_SSH_KEY — skipping mini sync"
  echo "  Manually copy: rsync -avz '$MP3_DIR/' '$MINI_HOST:$MINI_DEST/$ARTIST/$ALBUM/'"
fi
echo ""

# --- Write ingest log ---
LOG="$INGEST_BASE/ingest-log.txt"
echo "[$(date -u +%FT%TZ)] CD: $ARTIST - $ALBUM ($TRACK_COUNT tracks) → GCS + mini" >> "$LOG"

# --- Eject ---
echo "Ejecting CD..."
drutil eject 2>/dev/null || diskutil eject "$CD_VOLUME" 2>/dev/null || echo "  ⚠ Eject failed — remove manually"

echo ""
echo "═══════════════════════════════════════════════"
echo "  DONE: $ARTIST — $ALBUM"
echo "  $TRACK_COUNT tracks ingested"
echo "  Archive: $FLAC_DIR"
echo "  Streaming: $MP3_DIR"
echo "  Log: $LOG"
echo ""
echo "  Insert next CD and run again."
echo "═══════════════════════════════════════════════"
