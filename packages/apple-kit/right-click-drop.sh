#!/bin/bash
# Right-Click -> Notebook Drop
# Takes a file path as an argument. Reads the contents, JSON-encodes it safely via jq,
# and ships it to the Sovereign Notebook endpoint.

FILE_PATH="$1"

if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
  osascript -e 'display notification "No valid file selected for dropping." with title "Sovereign Drop Error"'
  exit 1
fi

FILENAME=$(basename "$FILE_PATH")

# Securely build JSON payload escaping all quotes/newlines safely
JSON_PAYLOAD=$(jq -n \
  --arg title "$FILENAME" \
  --arg content "$(cat "$FILE_PATH")" \
  --arg author "Right-Click Drop" \
  --arg source "macOS Finder" \
  '{title: $title, content: $content, author: $author, sourceSystem: $source, tags: ["right-click-drop"]}')

# Send to Swarm context / notebook
HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/notebook/drop \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD")

if [ "$HTTP_RESPONSE" -eq 200 ]; then
  osascript -e "display notification \"Dropped '$FILENAME' into the Swarm context (1M tokens).\" with title \"Sovereign Drop\""
else
  osascript -e "display notification \"Failed to ingest '$FILENAME' (HTTP $HTTP_RESPONSE).\" with title \"Sovereign Drop Error\""
fi
