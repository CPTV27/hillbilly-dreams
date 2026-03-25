#!/bin/bash
# Omni-Hotkey (Cmd+Option+S)
# Script to be bound to an Apple Shortcut or Quick Action.
# Prompts user for input, queries Delta Dawn (Swarm), and reads the response aloud via TTS.

# 1. Prompt for input using AppleScript
USER_INPUT=$(osascript -e 'text returned of (display dialog "Ask Delta Dawn:" default answer "")' 2>/dev/null)

if [ -z "$USER_INPUT" ]; then 
  exit 0
fi

# 2. Query the Swarm Chat endpoint
# The endpoint streams SSE, so we capture the data lines, parse out the 'text' JSON property, and strip newlines.
# (Requires jq to be installed: `brew install jq`)
RESPONSE=$(curl -sL -X POST http://localhost:3000/api/ops/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"$USER_INPUT\", \"sessionId\": \"omni-hotkey-os\"}" \
  | grep '^data: ' | sed 's/^data: //' | jq -r '.text // empty' 2>/dev/null | tr -d '\n')

# 3. macOS TTS response
if [ -n "$RESPONSE" ]; then
  # Samantha is the default US female voice that sounds reasonably warm
  say -v Samantha "$RESPONSE"
else
  say -v Samantha "I couldn't reach the swarm network right now."
fi
