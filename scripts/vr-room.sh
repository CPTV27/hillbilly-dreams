#!/bin/bash
# vr-room.sh — Generate a new VR room from a prompt
# Usage: ./scripts/vr-room.sh "room-id" "Room Name" "Subtitle" "prompt for the environment" "#hexcolor"
#
# Example:
#   ./scripts/vr-room.sh "taco-truck" "Monumental Taco" "A Truck in Space" \
#     "Psychedelic taco truck floating in outer space, cosmic food stand with neon signs" "#f97316"

set -e

ID="$1"
NAME="$2"
SUBTITLE="$3"
PROMPT="$4"
COLOR="${5:-#7c3aed}"

if [ -z "$ID" ] || [ -z "$NAME" ] || [ -z "$PROMPT" ]; then
  echo "Usage: $0 <room-id> <room-name> <subtitle> <prompt> [hex-color]"
  echo ""
  echo "Example:"
  echo '  ./scripts/vr-room.sh "inn-tour" "The Big Muddy Inn" "Step Inside" \'
  echo '    "Psychedelic Victorian inn interior, art-filled suites, blues memorabilia" "#c4a35a"'
  exit 1
fi

VR_DIR="apps/web/public/vr"
ROOMS_FILE="$VR_DIR/rooms.json"

# Check if room already exists
if grep -q "\"$ID\"" "$ROOMS_FILE" 2>/dev/null; then
  echo "Room '$ID' already exists in rooms.json"
  exit 1
fi

echo "Generating environment for: $NAME"
echo "Prompt: $PROMPT"
echo ""

# Generate the sky image using the Z-Image API via Claude
# For now, output the command to run manually
FULL_PROMPT="Seamless equirectangular panorama, $PROMPT, Duncan Trussell Midnight Gospel psychedelic style, cel-shaded animation, sacred geometry patterns, warm cosmic colors, immersive 360 environment"

echo "Full prompt for image generation:"
echo "$FULL_PROMPT"
echo ""

# If sky image already exists (manual upload), skip generation
SKY_FILE="$VR_DIR/sky-${ID}.webp"
if [ ! -f "$SKY_FILE" ]; then
  echo "Sky image not found at $SKY_FILE"
  echo "Generate it with Z-Image or place a .webp file there manually."
  echo ""
  echo "Once the sky image is at $SKY_FILE, run this script again to add the room to the manifest."

  # Create a placeholder so the room can be added
  echo "Creating placeholder (solid color sky)..."
  # Use ImageMagick if available, otherwise just touch
  if command -v convert &> /dev/null; then
    convert -size 2048x1024 "xc:${COLOR}" "$SKY_FILE"
  else
    touch "$SKY_FILE"
  fi
fi

# Calculate glow color (darker version of main color)
GLOW=$(echo "$COLOR" | python3 -c "
import sys
h = sys.stdin.read().strip().lstrip('#')
r, g, b = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)
print('#%02x%02x%02x' % (r//2, g//2, b//2))
")

# Calculate text color (lighter version)
TEXT=$(echo "$COLOR" | python3 -c "
import sys
h = sys.stdin.read().strip().lstrip('#')
r, g, b = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)
r = min(255, r + 100); g = min(255, g + 100); b = min(255, b + 100)
print('#%02x%02x%02x' % (r, g, b))
")

# Add to rooms.json
python3 -c "
import json
with open('$ROOMS_FILE') as f:
    rooms = json.load(f)

rooms.append({
    'id': '$ID',
    'name': '$NAME',
    'subtitle': '$SUBTITLE',
    'sky': '/vr/sky-${ID}.webp',
    'color': '$COLOR',
    'glow': '$GLOW',
    'textColor': '$TEXT',
})

with open('$ROOMS_FILE', 'w') as f:
    json.dump(rooms, f, indent=2)

print(f'Added room: $NAME (total: {len(rooms)} rooms)')
"

echo ""
echo "Done! Room '$NAME' added to the VR hub."
echo "Visit /vr/index.html to see it."
