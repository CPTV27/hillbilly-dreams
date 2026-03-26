# Kiosk Mode — Mac Mini Setup Handoff
## For: Chase + another CC agent
## Date: March 26, 2026

---

## What Kiosk Mode Is
The MB experience takes over the entire device. No other apps, no desktop, no distractions. Just the briefing, the decisions, and the conversation — fullscreen, nothing else.

It's NOT a special product. It's NOT a lobby display with a custom UI. It's the same elastic MB interface that already adapts to the user — just running fullscreen with Chrome's `--kiosk` flag so there's no escape hatch to other apps.

- Tracy's iMac in kiosk mode: she turns it on, sees her morning briefing. No Finder, no dock, no email app.
- JP's laptop in kiosk mode: his briefing, his decisions, his conversation.
- A phone in kiosk mode: same experience, responsive. The phone IS the MB interface.
- A lobby Mac Mini: same thing — pointed at whatever welcome page or dashboard makes sense for that location.

## Current State
- KioskMode concept exists in the main app (apps/web) with mock data
- `apps/web/lib/kioskMockData.ts` has civic routes (Forks of the Road, 4 stops, audio guides)
- Playwright test exists: `apps/web/tests/kioskmode.spec.ts`
- 82% gross margins proven on existing KioskMode contracts

## Mac Mini Setup Plan

### Hardware
- Mac Mini (any recent model with Apple Silicon)
- Connected display (TV, monitor, or iPad via Sidecar)
- Wired ethernet preferred (reliability)
- Optional: USB touchscreen monitor for interactive kiosk

### Software Stack
1. **macOS in kiosk mode:**
   - System Preferences → Users & Groups → create a "kiosk" user
   - System Preferences → Accessibility → Guided Access OR use a kiosk management tool
   - Auto-login to kiosk user on boot
   - Disable sleep, screen saver shows the app

2. **The app:**
   - Chrome in kiosk mode (`--kiosk` flag) pointed at the local or remote URL
   - OR: a lightweight Electron wrapper that locks to fullscreen
   - Simplest: `open -a "Google Chrome" --args --kiosk --disable-pinch --overscroll-history-navigation=0 https://measurablybetter.life/kiosk`

3. **Auto-restart on crash:**
   - LaunchAgent plist that restarts Chrome if it quits
   - Or use `brew install watch` with a watchdog script

### The Kiosk URL
No special kiosk routes needed. Point Chrome at whatever MB page makes sense:
- Tracy's iMac: `https://measurablybetter.life/welcome/tracy`
- JP's laptop: `https://measurablybetter.life/welcome/jp`
- Inn lobby Mac Mini: `https://measurablybetter.life` (the name gate, or a specific welcome page)
- Tourism office: `https://measurablybetter.life/big-muddy`

The same elastic interface adapts to the user. The kiosk flag just locks the device to it.

### Network
- The Mac Mini can run the app locally (faster) or hit the Vercel URL (simpler)
- Local: `cd ~/hillbilly-dreams/apps/demo && pnpm dev` → localhost:3000
- Remote: point Chrome at https://measurablybetter.life/kiosk
- Remote is simpler — updates deploy automatically, no local maintenance

### Chrome Kiosk Launch Script
```bash
#!/bin/bash
# /Users/kiosk/launch-kiosk.sh
# Auto-launches Chrome in kiosk mode pointed at the MB kiosk URL

# Kill any existing Chrome
killall "Google Chrome" 2>/dev/null
sleep 2

# Launch in kiosk mode
open -a "Google Chrome" --args \
  --kiosk \
  --disable-pinch \
  --overscroll-history-navigation=0 \
  --disable-translate \
  --disable-infobars \
  --disable-session-crashed-bubble \
  --noerrdialogs \
  "https://measurablybetter.life/kiosk"
```

### LaunchAgent (auto-start on login)
Save as `~/Library/LaunchAgents/com.measurablybetter.kiosk.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.measurablybetter.kiosk</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>/Users/kiosk/launch-kiosk.sh</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
</dict>
</plist>
```

### What the Next Agent Needs to Build
Nothing kiosk-specific. The regular MB pages ARE the kiosk content.
The only work is:
1. Make sure the welcome pages and dashboards look good fullscreen at various resolutions
2. Test the Chrome kiosk flag on the Mac Mini
3. Set up the LaunchAgent for auto-start

### Testing
- Run locally: `cd ~/hillbilly-dreams/apps/demo && pnpm dev`
- Open Chrome: `open -a "Google Chrome" --args --kiosk http://localhost:3000/kiosk`
- Test touch targets on iPad via Sidecar
