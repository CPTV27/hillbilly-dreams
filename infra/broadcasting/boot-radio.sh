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

# Don't double-launch if screen session already exists
if /usr/bin/screen -list 2>&1 | grep -q 'bigmuddy-radio'; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] bigmuddy-radio screen session already running, skipping" >> "$LOG"
  exit 0
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
