#!/bin/bash
# ============================================================
# Shared Albums → Process → GCS Pipeline
#
# Watches multiple shared Apple Photos albums:
#   "Big Muddy Magazine"      → gs://bmt-media-bigmuddy/photos/magazine/
#   "Big Muddy Entertainment" → gs://bmt-media-bigmuddy/photos/entertainment/
#   "Deep South Directory"    → gs://bmt-media-bigmuddy/photos/directory/
#   "GCS Upload"              → gs://bmt-media-bigmuddy/photos/auto/
#
# Tracy, Amy, and Chase share these albums via iCloud.
# Drop a photo in → it gets processed and uploaded automatically.
#
# Photos:  HEIC/JPG → WebP (2400px, q82) → GCS
# Videos:  MOV/MP4 → thumbnail + Whisper transcription → GCS
#
# Runs via launchd every 30 minutes (com.hdi.photos-to-gcs)
# ============================================================

set -euo pipefail
export PATH="/opt/homebrew/bin:$PATH"

BASE_DIR="$HOME/Pictures/GCS_Upload_Export"
GCS_BUCKET="gs://bmt-media-bigmuddy"
LOG_FILE="$BASE_DIR/pipeline.log"

mkdir -p "$BASE_DIR"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') $1" | tee -a "$LOG_FILE"
}

process_album() {
    local ALBUM_NAME="$1"
    local GCS_PHOTO_PREFIX="$2"
    local GCS_VIDEO_PREFIX="$3"

    local EXPORT_DIR="$BASE_DIR/$ALBUM_NAME"
    local PROCESSED_DIR="$EXPORT_DIR/processed"
    local MANIFEST="$EXPORT_DIR/manifest.jsonl"

    mkdir -p "$EXPORT_DIR" "$PROCESSED_DIR"

    log "--- Album: $ALBUM_NAME → $GCS_PHOTO_PREFIX ---"

    # Export from album
    local SAFE_ALBUM
    SAFE_ALBUM=$(echo "$ALBUM_NAME" | sed 's/"/\\"/g')

    local EXPORT_COUNT
    EXPORT_COUNT=$(osascript -e "
set exportFolder to (POSIX file \"$EXPORT_DIR\") as alias
tell application \"Photos\"
    try
        set targetAlbum to album \"$SAFE_ALBUM\"
    on error
        return \"0\"
    end try
    set albumItems to every media item of targetAlbum
    set itemCount to count of albumItems
    if itemCount is 0 then return \"0\"
    export albumItems to exportFolder
    return itemCount as string
end tell
" 2>/dev/null || echo "0")

    log "  Exported: $EXPORT_COUNT items"

    if [ "$EXPORT_COUNT" = "0" ]; then
        return
    fi

    local PHOTO_COUNT=0
    local VIDEO_COUNT=0
    local SKIPPED=0

    # Process photos
    for file in "$EXPORT_DIR"/*.HEIC "$EXPORT_DIR"/*.heic "$EXPORT_DIR"/*.JPG "$EXPORT_DIR"/*.jpg "$EXPORT_DIR"/*.JPEG "$EXPORT_DIR"/*.jpeg "$EXPORT_DIR"/*.PNG "$EXPORT_DIR"/*.png; do
        [ -f "$file" ] || continue
        local BASENAME
        BASENAME=$(basename "$file")
        local NAME="${BASENAME%.*}"

        # Skip duplicates (Photos app adds " (1)" etc)
        [[ "$BASENAME" == *" ("* ]] && continue

        # Skip if already processed
        if grep -q "\"source\":\"$BASENAME\"" "$MANIFEST" 2>/dev/null; then
            SKIPPED=$((SKIPPED + 1))
            continue
        fi

        # Extract EXIF
        local GPS_LAT GPS_LNG DATETIME
        GPS_LAT=$(exiftool -s3 -GPSLatitude "$file" 2>/dev/null || echo "")
        GPS_LNG=$(exiftool -s3 -GPSLongitude "$file" 2>/dev/null || echo "")
        DATETIME=$(exiftool -s3 -DateTimeOriginal "$file" 2>/dev/null || echo "")

        # Convert to WebP
        local OUTPUT_FILE="$PROCESSED_DIR/${NAME}.webp"
        if [[ "$BASENAME" == *.HEIC || "$BASENAME" == *.heic ]]; then
            local TEMP_JPG="$PROCESSED_DIR/${NAME}_temp.jpg"
            sips -s format jpeg "$file" --out "$TEMP_JPG" 2>/dev/null
            cwebp -q 82 -resize 2400 0 "$TEMP_JPG" -o "$OUTPUT_FILE" 2>/dev/null
            rm -f "$TEMP_JPG"
        else
            cwebp -q 82 -resize 2400 0 "$file" -o "$OUTPUT_FILE" 2>/dev/null
        fi

        # Upload to GCS
        if [ -f "$OUTPUT_FILE" ]; then
            gsutil -q cp "$OUTPUT_FILE" "${GCS_BUCKET}/${GCS_PHOTO_PREFIX}/${NAME}.webp" 2>/dev/null
            local SIZE
            SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
            log "  📷 ${NAME}.webp ($SIZE) | GPS: ${GPS_LAT:-none} | $ALBUM_NAME"
        fi

        # Manifest
        local TIMESTAMP
        TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
        echo "{\"source\":\"$BASENAME\",\"type\":\"photo\",\"album\":\"$ALBUM_NAME\",\"gps_lat\":\"$GPS_LAT\",\"gps_lng\":\"$GPS_LNG\",\"datetime\":\"$DATETIME\",\"gcs_url\":\"${GCS_BUCKET}/${GCS_PHOTO_PREFIX}/${NAME}.webp\",\"processed_at\":\"$TIMESTAMP\"}" >> "$MANIFEST"

        PHOTO_COUNT=$((PHOTO_COUNT + 1))
    done

    # Process videos
    for file in "$EXPORT_DIR"/*.MOV "$EXPORT_DIR"/*.mov "$EXPORT_DIR"/*.MP4 "$EXPORT_DIR"/*.mp4; do
        [ -f "$file" ] || continue
        local BASENAME
        BASENAME=$(basename "$file")
        local NAME="${BASENAME%.*}"

        [[ "$BASENAME" == *" ("* ]] && continue

        if grep -q "\"source\":\"$BASENAME\"" "$MANIFEST" 2>/dev/null; then
            SKIPPED=$((SKIPPED + 1))
            continue
        fi

        local GPS_LAT GPS_LNG DATETIME DURATION
        GPS_LAT=$(exiftool -s3 -GPSLatitude "$file" 2>/dev/null || echo "")
        GPS_LNG=$(exiftool -s3 -GPSLongitude "$file" 2>/dev/null || echo "")
        DATETIME=$(exiftool -s3 -DateTimeOriginal "$file" 2>/dev/null || echo "")
        DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$file" 2>/dev/null || echo "0")

        # Thumbnail
        local THUMB_FILE="$PROCESSED_DIR/${NAME}_thumb.webp"
        local THUMB_JPG="$PROCESSED_DIR/${NAME}_thumb.jpg"
        ffmpeg -y -i "$file" -ss 1 -frames:v 1 -q:v 2 "$THUMB_JPG" 2>/dev/null || true
        if [ -f "$THUMB_JPG" ]; then
            cwebp -q 82 -resize 2400 0 "$THUMB_JPG" -o "$THUMB_FILE" 2>/dev/null || true
            rm -f "$THUMB_JPG"
        fi

        # Google Cloud Speech-to-Text transcription
        local TRANSCRIPT=""
        local AUDIO_FILE="$PROCESSED_DIR/${NAME}_audio.wav"
        ffmpeg -y -i "$file" -vn -acodec pcm_s16le -ar 16000 -ac 1 "$AUDIO_FILE" 2>/dev/null || true
        if [ -f "$AUDIO_FILE" ] && [ -s "$AUDIO_FILE" ]; then
            # Use gcloud CLI for speech recognition (uses existing auth)
            TRANSCRIPT=$(gcloud ml speech recognize "$AUDIO_FILE" \
                --language-code=en-US \
                --format=json 2>/dev/null | \
                python3 -c "
import sys,json
try:
    d=json.load(sys.stdin)
    parts=[r['alternatives'][0]['transcript'] for r in d.get('results',[])]
    print(' '.join(parts))
except: pass
" 2>/dev/null || echo "")
            if [ -n "$TRANSCRIPT" ]; then
                echo "$TRANSCRIPT" > "$PROCESSED_DIR/${NAME}_transcript.txt"
                log "  🎤 Transcribed: ${#TRANSCRIPT} chars"
            fi
        fi
        rm -f "$AUDIO_FILE"

        # Upload video + thumbnail
        gsutil -q cp "$file" "${GCS_BUCKET}/${GCS_VIDEO_PREFIX}/${BASENAME}" 2>/dev/null || true
        [ -f "$THUMB_FILE" ] && gsutil -q cp "$THUMB_FILE" "${GCS_BUCKET}/${GCS_VIDEO_PREFIX}/${NAME}_thumb.webp" 2>/dev/null || true

        local FILE_SIZE
        FILE_SIZE=$(du -h "$file" | cut -f1)
        log "  🎬 ${BASENAME} ($FILE_SIZE) | ${DURATION}s | GPS: ${GPS_LAT:-none} | $ALBUM_NAME"

        # Manifest
        local TIMESTAMP
        TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
        echo "{\"source\":\"$BASENAME\",\"type\":\"video\",\"album\":\"$ALBUM_NAME\",\"gps_lat\":\"$GPS_LAT\",\"gps_lng\":\"$GPS_LNG\",\"datetime\":\"$DATETIME\",\"duration\":\"$DURATION\",\"transcript\":\"$(echo "$TRANSCRIPT" | head -c 500 | tr '"' "'")\",\"gcs_url\":\"${GCS_BUCKET}/${GCS_VIDEO_PREFIX}/${BASENAME}\",\"processed_at\":\"$TIMESTAMP\"}" >> "$MANIFEST"

        VIDEO_COUNT=$((VIDEO_COUNT + 1))
    done

    log "  ✅ Photos: $PHOTO_COUNT | Videos: $VIDEO_COUNT | Skipped: $SKIPPED"
}

# ============================================================
# Main — process all channels
# ============================================================

log ""
log "📸 HDI Media Pipeline starting..."
log "================================================"

process_album "Big Muddy Magazine"      "photos/magazine"       "video/magazine"
process_album "Big Muddy Entertainment" "photos/entertainment"  "video/entertainment"
process_album "Deep South Directory"    "photos/directory"      "video/directory"
process_album "GCS Upload"              "photos/auto"           "video/auto"

log "================================================"
log "📸 Pipeline complete."
log ""
