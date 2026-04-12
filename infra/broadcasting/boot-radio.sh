#!/bin/bash
# Big Muddy Radio boot script — launches ezstream inside a persistent screen session.
# Called by launchd agent com.bigmuddy.radio at login.
# The screen wrapper handles ezstream crash/restart internally.
#
# Deployed location: /Users/ClawdBOT/broadcasting/boot-radio.sh on the Mac mini
# Runbook: docs/runbooks/broadcasting.md

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

LOG=/Users/ClawdBOT/broadcasting/boot-radio.log
echo "[$(date '+%Y-%m-%d %H:%M:%S')] boot-radio.sh starting" >> "$LOG"

# Wait for Docker + Icecast to be up (up to 120s)
for i in $(seq 1 60); do
  if /usr/bin/curl -sf http://127.0.0.1:8010/status-json.xsl > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Icecast reachable at attempt $i" >> "$LOG"
    break
  fi
  sleep 2
done

# ZOMBIE PREVENTION — kill orphaned ezstream wrappers from previous runs.
# The screen-session check below catches the normal case, but if launchctl
# kickstart was called while a screen session was dying (e.g. during a Docker
# wedge recovery), orphaned bash+ezstream+ffmpeg+oggenc process trees survive
# the screen session's death and compete for the Icecast /stream mount. That's
# how we got 7 zombie wrappers on 2026-04-10. Kill them all before checking.
EXISTING_EZ=$(pgrep -f 'ezstream.*ezstream.xml' 2>/dev/null | wc -l | tr -d ' ')
if [ "$EXISTING_EZ" -gt 0 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Killing $EXISTING_EZ orphaned ezstream processes" >> "$LOG"
  pkill -9 -f 'ezstream.*ezstream.xml' 2>/dev/null
  /usr/bin/screen -S bigmuddy-radio -X quit 2>/dev/null
  /usr/bin/screen -wipe 2>/dev/null
  sleep 2
fi

# Don't double-launch if screen session already exists AND is healthy
if /usr/bin/screen -list 2>&1 | grep -q 'bigmuddy-radio'; then
  # Verify ezstream is actually running inside the screen, not just a dead shell
  if pgrep -f 'ezstream.*ezstream.xml' > /dev/null 2>&1; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] bigmuddy-radio screen + ezstream both alive, skipping" >> "$LOG"
    exit 0
  else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] bigmuddy-radio screen exists but ezstream dead, restarting" >> "$LOG"
    /usr/bin/screen -S bigmuddy-radio -X quit 2>/dev/null
    sleep 1
  fi
fi

# Launch ezstream inside detached screen with auto-restart wrapper.
# The screen session persists across SSH disconnects. The inner while loop
# handles ezstream crashes with a 10s backoff.
#
# Why screen+wrapper instead of pure launchd: macOS launchd agents have TCC
# (Transparency Consent and Control) limitations that prevent some subprocess
# chains from accessing external volumes. Screen runs in a user session
# context that inherits /Volumes access properly.
/usr/bin/screen -dmS bigmuddy-radio /bin/bash -c '
  export PATH="/opt/homebrew/bin:/usr/bin:/bin"
  cd /Users/ClawdBOT/broadcasting
  while true; do
    /opt/homebrew/bin/ezstream -q -v -c /Users/ClawdBOT/broadcasting/ezstream.xml 2>&1 | /usr/bin/tee -a /Users/ClawdBOT/broadcasting/ezstream-wrapper.log
    echo "[$(date)] ezstream exited code $?, restarting in 10s" >> /Users/ClawdBOT/broadcasting/ezstream-wrapper.log
    sleep 10
  done
'

echo "[$(date '+%Y-%m-%d %H:%M:%S')] screen session launched" >> "$LOG"
exit 0
