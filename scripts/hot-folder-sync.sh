#!/bin/bash
# hot-folder-sync.sh — watches ~/BigMuddy-Dropbox and syncs to GCS + indexes
#
# Drop files into subfolders:
#   ~/BigMuddy-Dropbox/photos/    → gs://bmt-media-bigmuddy/inbox/photos/
#   ~/BigMuddy-Dropbox/documents/ → gs://bmt-media-bigmuddy/inbox/documents/
#   ~/BigMuddy-Dropbox/videos/    → gs://bmt-media-bigmuddy/inbox/videos/
#   ~/BigMuddy-Dropbox/audio/     → gs://bmt-media-bigmuddy/inbox/audio/
#
# Usage: Run via cron every 2 minutes, or manually
# crontab: */2 * * * * /Users/chasethis/hillbilly-dreams/scripts/hot-folder-sync.sh

DROPBOX="$HOME/BigMuddy-Dropbox"
BUCKET="gs://bmt-media-bigmuddy/inbox"
LOG="$DROPBOX/.sync-log.txt"
API_URL="${HDI_API_URL:-https://measurablybetterthings.com}"

echo "$(date): Starting sync..." >> "$LOG"

for folder in photos documents videos audio; do
  SRC="$DROPBOX/$folder"
  DEST="$BUCKET/$folder"
  
  # Find new files (modified in last 5 minutes)
  find "$SRC" -type f -mmin -5 -not -name ".*" 2>/dev/null | while read filepath; do
    filename=$(basename "$filepath")
    
    # Upload to GCS
    gsutil cp "$filepath" "$DEST/$filename" 2>/dev/null
    
    if [ $? -eq 0 ]; then
      echo "$(date): Uploaded $folder/$filename" >> "$LOG"
      
      # Index in the database via API
      GCS_URL="https://storage.googleapis.com/bmt-media-bigmuddy/inbox/$folder/$filename"
      
      curl -s -X POST "$API_URL/api/context/import" \
        -H "Content-Type: application/json" \
        -d "{
          \"content\": \"$(echo "{\"url\":\"$GCS_URL\",\"filename\":\"$filename\",\"folder\":\"$folder\",\"type\":\"$folder\",\"uploadedAt\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"source\":\"hot-folder\"}" | sed 's/"/\\"/g')\",
          \"domain\": \"media\",
          \"topic\": \"inbox-$folder\",
          \"key\": \"inbox.$folder.$(echo $filename | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9.-]/-/g')\"
        }" > /dev/null 2>&1
      
      echo "$(date): Indexed $folder/$filename" >> "$LOG"
      
      # Move to processed subfolder
      mkdir -p "$SRC/.processed"
      mv "$filepath" "$SRC/.processed/$filename"
    fi
  done
done

echo "$(date): Sync complete" >> "$LOG"
