#!/bin/bash
PUB=/Users/chasethis/hillbilly-dreams/apps/web/public/docs
SRC=/Users/chasethis/hillbilly-dreams/docs
for sub in voice audits research positioning aeo operations touring presentations architecture marketing big-muddy-chat; do
  if [[ -d "$SRC/$sub" ]]; then
    mkdir -p "$PUB/$sub"
    cp "$SRC/$sub"/*.md "$PUB/$sub/" 2>/dev/null || true
    cp "$SRC/$sub"/*.json "$PUB/$sub/" 2>/dev/null || true
  fi
done
echo "✓ docs synced to $PUB"
