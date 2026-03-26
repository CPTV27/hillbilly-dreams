#!/bin/bash
# SOVEREIGN QUICK DROP (macOS Automator Script)
# Use Case: Right-click any text file (.md, .txt) in Finder -> Quick Actions -> "Drop to Sovereign Notebook"
# Setup: 
# 1. Open Automator -> New "Quick Action"
# 2. Workflow receives "Documents" in "Finder"
# 3. Add "Run Shell Script". Pass input "as arguments". Paste this script.
# 4. Save as "Sovereign Quick Drop"

API_ENDPOINT="https://measurablybetterthings.com/api/notebook/drop"
AUTHOR="Chase (MacBook Automator)"

# The script iterates over every file you right-clicked and selected
for f in "$@"
do
    # Extract file name and content
    FILENAME=$(basename "$f")
    CONTENT=$(cat "$f")

    # Send the raw payload to the Measurably Better Swarm
    # The jq utility safely wraps the massive file content into JSON
    jq -n \
      --arg title "Mac Automator Drop: $FILENAME" \
      --arg content "$CONTENT" \
      --arg author "$AUTHOR" \
      --argjson tags '["macos", "automator"]' \
      '{title: $title, content: $content, author: $author, tags: $tags, sourceSystem: "macos-automator"}' \
      | curl -X POST "$API_ENDPOINT" \
      -H "Content-Type: application/json" \
      -d @-

    # Trigger native macOS notification
    osascript -e "display notification \"Successfully ingested into the 1M Token Context window.\" with title \"Sovereign Notebook Drop\" subtitle \"$FILENAME\""
done
