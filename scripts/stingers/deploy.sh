#!/bin/bash
# scripts/stingers/deploy.sh
# Ships generated stinger MP3s from scripts/stingers/out/ to the Mac mini,
# replaces the existing files, and restarts the radio so the new voices air.
#
# Usage:
#   bash scripts/stingers/deploy.sh
#
# Flow:
#   1. SCP out/*.mp3 → ClawdBOT@192.168.4.37:/Users/ClawdBOT/bigmuddy-radio/stingers/
#   2. Kill the ezstream screen session cleanly
#   3. Restart via /Users/ClawdBOT/broadcasting/boot-radio.sh
#   4. Verify Icecast is serving a new source

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$SCRIPT_DIR/out"
MINI_SSH_KEY="${MINI_SSH_KEY:-$HOME/.ssh/id_mini}"
MINI_HOST="${MINI_HOST:-ClawdBOT@192.168.4.37}"
MINI_STINGER_DIR="/Users/ClawdBOT/bigmuddy-radio/stingers"

if [ ! -d "$OUT_DIR" ] || [ -z "$(ls -A "$OUT_DIR"/*.mp3 2>/dev/null)" ]; then
  echo "ERROR: no MP3s in $OUT_DIR"
  echo "Run 'node scripts/stingers/generate.mjs' first."
  exit 1
fi

echo "→ SCP $(ls "$OUT_DIR"/*.mp3 | wc -l | tr -d ' ') stinger MP3s to $MINI_HOST:$MINI_STINGER_DIR"
scp -q -i "$MINI_SSH_KEY" "$OUT_DIR"/*.mp3 "$MINI_HOST:$MINI_STINGER_DIR/"

echo "→ Restart radio (kill ezstream screen, relaunch via boot-radio.sh)"
ssh -i "$MINI_SSH_KEY" "$MINI_HOST" bash <<'REMOTE'
set -e
export PATH="/opt/homebrew/bin:/usr/bin:/bin:$PATH"
screen -S bigmuddy-radio -X quit 2>/dev/null || true
sleep 2
/Users/ClawdBOT/broadcasting/boot-radio.sh
sleep 6
curl -s http://localhost:8010/status-json.xsl | python3 -c '
import sys, json
d = json.load(sys.stdin)["icestats"].get("source", {})
print("  server_name:", d.get("server_name"))
print("  title:      ", d.get("title"))
print("  bitrate:    ", d.get("audio_bitrate"))
print("  listeners:  ", d.get("listeners"))
' 2>/dev/null || echo "  (Icecast status not yet refreshed)"
REMOTE

echo ""
echo "done. New stingers on air at http://192.168.4.37:8010/stream"
