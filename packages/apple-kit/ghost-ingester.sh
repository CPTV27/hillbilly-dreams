#!/bin/bash
# Ghost Folder Ingester
# Watches ~/Desktop/Sovereign-Drop and auto-ingests any file placed there, then deletes it.
# Designed to be triggered by launchd.

DROP_DIR="$HOME/Desktop/Sovereign-Drop"
mkdir -p "$DROP_DIR"

# Loop over any files currently in the directory
for FILE_PATH in "$DROP_DIR"/*; do
  # Skip if it's not a regular file or if the folder is empty (expands to literal '*')
  if [ -f "$FILE_PATH" ]; then
    FILENAME=$(basename "$FILE_PATH")
    
    # Ignore invisible files like .DS_Store
    if [[ "$FILENAME" == .* ]]; then
      continue
    fi

    # Secure JSON payload construction
    JSON_PAYLOAD=$(jq -n \
      --arg title "$FILENAME" \
      --arg content "$(cat "$FILE_PATH")" \
      --arg author "Ghost Folder Daemon" \
      --arg source "macOS launchd" \
      '{title: $title, content: $content, author: $author, sourceSystem: $source, tags: ["ghost-folder"]}')

    HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/notebook/drop \
      -H "Content-Type: application/json" \
      -d "$JSON_PAYLOAD")

    if [ "$HTTP_RESPONSE" -eq 200 ]; then
      # Delete the file to make it a true "Ghost Folder"
      rm "$FILE_PATH"
      osascript -e "display notification \"Ghost ingested '$FILENAME' and dissolved it.\" with title \"Sovereign Drop\""
    fi
  fi
done
