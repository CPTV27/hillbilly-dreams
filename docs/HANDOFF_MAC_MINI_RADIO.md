# Mac Mini Agent Handoff — Radio Relay Setup

*For the Claude Code agent running on ClawdBOT@192.168.4.37. April 9, 2026.*

---

## Your Job

Configure the Mac mini's OpenBroadcaster to push audio to an external AzuraCast relay droplet. The droplet handles all public listener connections. The Mac mini's local IP stays hidden.

## Context

- The Mac mini runs OpenBroadcaster Server (Docker, port 8080) and Icecast (Docker, port 8010)
- Currently, Icecast only serves the local network (192.168.4.37:8010)
- We are NOT using Cloudflare Tunnel (ToS violation for sustained media streams)
- Instead, a DigitalOcean droplet running AzuraCast will be the public-facing relay
- Chase will provide the droplet IP once it's provisioned

## What You Need To Do

### Step 1: Wait for the droplet IP from Chase

Chase is provisioning a $6/mo DigitalOcean droplet with AzuraCast. Once it's up, he'll provide:
- Droplet IP address
- Icecast source password (from AzuraCast setup wizard)
- Mount point (default: `/stream`)
- Port (default: `8000`)

### Step 2: Configure OpenBroadcaster Source Output

In OpenBroadcaster Server (http://192.168.4.37:8080, admin/bigmuddy2026):

Navigate to Output settings and configure a new output target:

```
Type:     Icecast (Source Client)
Host:     [DROPLET_IP]
Port:     8000
Password: [ICECAST_SOURCE_PASSWORD]
Mount:    /stream
Format:   MP3 128kbps (or Ogg Vorbis if AzuraCast supports it)
```

The Mac mini becomes a **source client** — it pushes audio OUT to the droplet. The droplet's AzuraCast handles all listener connections, metadata, and the fallback mount.

### Step 3: Create a Fallback MP3

Record or compile a 1-hour loop of Big Muddy evergreen music (instrumentals, bumpers, station IDs). Export as MP3. Upload to Cloudflare R2 bucket or GCS. This URL gets configured as the AzuraCast fallback mount — when the Mac mini source drops, listeners hear this instead of silence.

The R2 bucket is already set up. Upload path: `bmt-media-bigmuddy/radio/fallback-loop.mp3`

### Step 4: Verify the Stream

Once configured:
1. Start OpenBroadcaster playback
2. Check AzuraCast dashboard at `http://[DROPLET_IP]` — should show source connected
3. Test from an external device: `https://stream.bigmuddytouring.com/stream`
4. Test the Now Playing API: `https://stream.bigmuddytouring.com/api/nowplaying/1`

### Step 5: Set Up Auto-Start

Ensure OpenBroadcaster restarts on Mac mini reboot:
```bash
# If running via Docker, ensure the container has --restart=unless-stopped
docker update --restart unless-stopped [ob-container-name]
```

## What NOT To Do

- Do NOT install cloudflared or set up a Cloudflare Tunnel
- Do NOT open ports on the router/ISP
- Do NOT expose the Mac mini's IP publicly
- Do NOT replace OpenBroadcaster with AzuraCast locally — AzuraCast runs on the DROPLET only

## Current Services on Mac Mini

| Service | Port | Status |
|---------|------|--------|
| OpenBroadcaster | 8080 | Running (Docker) |
| Icecast | 8010 | Running (Docker) — will push to droplet |
| Plex | 32400 | Running |
| Postiz | 4007 | Running |
| Open Notebook | 5055 | Running |

Do not disturb the other services.
