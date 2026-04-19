# Broadcast Agent

Long-lived Node process that runs on the **Mac mini** (`192.168.4.37`) and executes OBS / ffmpeg / clip-upload instructions dispatched from the MBT server.

## What it does

Every ~30 seconds:

1. POSTs HMAC-signed request to `${MBT_BASE_URL}/api/broadcast/agent/poll`
2. If the server returns an `AgentInstruction`, the agent executes it locally
3. POSTs result back to `${MBT_BASE_URL}/api/broadcast/agent/ack`

Instruction types handled:

- `start_scene` — switch OBS to a named scene, start recording/streaming
- `stop_scene` — stop OBS output
- `extract_clip` — ffmpeg-slice a time range out of a recording, upload to GCS, register metadata at `/api/broadcast/clips/ingest`
- `push_thumbnail` — pull a thumbnail image from a URL and write it to local OBS scene state

## Deployment

```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37
mkdir -p ~/broadcast-agent
cd ~/broadcast-agent

# Copy agent.mjs and package.json (scp from dev machine)
# From dev:
#   scp scripts/broadcast-agent/* ClawdBOT@192.168.4.37:~/broadcast-agent/

# Install (no prod deps for v1 — stdlib + fetch only)
# npm install

# Set secrets — keep in sync with Vercel env var
export BROADCAST_AGENT_SECRET="<same secret as BROADCAST_AGENT_SECRET on Vercel>"
export MBT_BASE_URL="https://bigmuddy.app"

# Start in foreground for testing
node agent.mjs
```

## Keeping it alive across reboots (launchd)

Create `~/Library/LaunchAgents/inc.hillbillydreams.broadcast-agent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>inc.hillbillydreams.broadcast-agent</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/node</string>
    <string>/Users/ClawdBOT/broadcast-agent/agent.mjs</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>MBT_BASE_URL</key>
    <string>https://bigmuddy.app</string>
    <key>BROADCAST_AGENT_SECRET</key>
    <string>REPLACE_WITH_SECRET</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>/Users/ClawdBOT/broadcast-agent/agent.out.log</string>
  <key>StandardErrorPath</key>
  <string>/Users/ClawdBOT/broadcast-agent/agent.err.log</string>
</dict>
</plist>
```

Then: `launchctl load ~/Library/LaunchAgents/inc.hillbillydreams.broadcast-agent.plist`.

## What's stubbed in v1 (deliberate)

The `start_scene`, `stop_scene`, `extract_clip`, `push_thumbnail` handlers log instead of executing. Before the first live broadcast we wire them for real:

- **OBS**: `npm install obs-websocket-js`, connect to `ws://localhost:4455` (OBS Studio with WebSocket plugin enabled)
- **ffmpeg**: shell out via `node:child_process` exec
- **GCS upload**: `gcloud auth` on the mini, use `gsutil cp` or `@google-cloud/storage`
- **Clip registration**: POST to `/api/broadcast/clips/ingest` with HMAC signature (same pattern as poll/ack)

Each of those is a short PR on its own — the agent skeleton is stable.

## Monitoring

- Exit code 0 = healthy; 1 = fatal (missing secret or network)
- `agent.out.log` in `~/broadcast-agent/` captures all info-level output
- `journalctl`-equivalent on macOS: `log show --predicate 'subsystem == "inc.hillbillydreams.broadcast-agent"' --last 1h`

## Emergency stop

```bash
launchctl unload ~/Library/LaunchAgents/inc.hillbillydreams.broadcast-agent.plist
```
