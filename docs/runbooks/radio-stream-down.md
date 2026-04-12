# Runbook: Radio Stream Down

**When to use this:** Big Muddy Radio is silent, listeners report no audio, or UptimeRobot alerts on `stream.bigmuddytouring.com`.

**Time to fix:** 5-15 minutes for most failures. If Docker VM is wedged, add 5 minutes for the force-kill cycle.

**Who can run this:** CoS (MacBook Pro via SSH), Broadcast Worker (Mac mini), or Chase directly on the mini.

---

## Step 1 — Is the CLOUD relay alive?

From any machine with internet:

```bash
curl -sI --max-time 5 https://stream.bigmuddytouring.com/stream
```

- **200 + `Content-Type: audio/ogg` or `audio/mpeg`** → Cloud relay is serving audio. Problem is likely that nobody is listening or the listener's player is broken. Skip to Step 5.
- **200 + `Content-Type: text/html`** → AzuraCast is up but the fallback page is showing (no source connected). Go to Step 2.
- **Connection refused / timeout / DNS failure** → The droplet is down. Go to Step 6.

## Step 2 — Is the Mac mini's source connected to the droplet?

From the MacBook Pro:

```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "pgrep -fl ezstream; echo '---'; tail -5 ~/broadcasting/ezstream-wrapper.log"
```

- **ezstream running + log shows "streaming: [track name]"** → ezstream is alive and thinks it's streaming, but it might not be reaching the droplet. Check if the source password is correct, and whether the mini can reach `206.189.200.208:8000`:
  ```bash
  ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "nc -zv 206.189.200.208 8000"
  ```
  If connection refused: the droplet's Icecast isn't accepting source connections. Go to Step 6.
  If connection works: the source password may have changed. Check AzuraCast admin at `http://206.189.200.208`.

- **ezstream not running** → Go to Step 3.
- **Multiple ezstream processes** → ZOMBIE ALERT. Go to Step 4.

## Step 3 — Start ezstream

```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "launchctl kickstart -k gui/\$(id -u)/com.bigmuddy.radio"
```

Wait 10 seconds, then check:

```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "screen -list | grep bigmuddy-radio; tail -3 ~/broadcasting/ezstream-wrapper.log"
```

- **Screen session exists + log shows "streaming:"** → Fixed. Verify cloud relay in Step 5.
- **Log shows "Login failed"** → Wrong password or Icecast not accepting sources. See Step 2 password check.
- **Log shows "Couldn't connect"** → Icecast is not running on the mini. Go to Step 4a.

## Step 4 — Kill zombie ezstream wrappers

If `pgrep -fl ezstream` shows more than one wrapper loop (multiple PIDs of the same bash script), you have the zombie problem from tonight:

```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "
  # Kill everything
  screen -S bigmuddy-radio -X quit 2>/dev/null
  pkill -9 -f ezstream
  sleep 3
  
  # Verify clean
  pgrep -fl ezstream && echo 'STILL RUNNING — manual kill needed' || echo 'Clean'
  
  # Restart one clean wrapper
  launchctl kickstart -k gui/\$(id -u)/com.bigmuddy.radio
  sleep 10
  
  # Verify
  screen -list | grep bigmuddy-radio
  tail -5 ~/broadcasting/ezstream-wrapper.log
"
```

## Step 4a — Docker / Icecast is down

The Icecast container runs inside Docker on the mini. If Docker Desktop's daemon is wedged (control socket refuses connections but helper processes are alive), the fix is a force-kill cycle:

```bash
ssh -i ~/.ssh/id_mini ClawdBOT@192.168.4.37 "
  export PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin
  
  # Check Docker daemon
  curl -sf --max-time 2 --unix-socket ~/.docker/run/docker.sock http://localhost/_ping && echo 'Docker OK' || echo 'Docker WEDGED'
  
  # If wedged:
  # 1. Quit Docker Desktop
  osascript -e 'tell application \"Docker\" to quit' 2>/dev/null
  sleep 2
  
  # 2. Kill zombie VM + backend
  pkill -9 -f 'com.docker.virtualization'
  pkill -9 -f 'com.docker.backend'
  sleep 3
  
  # 3. Remove stale socket
  rm -f ~/.docker/run/docker.sock
  
  # 4. Relaunch
  open -a Docker
  
  # 5. Wait for daemon + containers
  for i in 1 2 3 4 5 6 7 8 9; do
    sleep 10
    if curl -sf --max-time 2 --unix-socket ~/.docker/run/docker.sock http://localhost/_ping > /dev/null 2>&1; then
      echo 'Docker daemon UP at attempt '\$i
      /usr/local/bin/docker ps --format '{{.Names}} {{.Status}}' | grep -i icecast
      break
    fi
  done
"
```

After Docker is back and the Icecast container is running, go back to Step 3 to restart ezstream.

## Step 5 — Verify end-to-end

From a phone on cellular (NOT Inn WiFi):

1. Open `https://stream.bigmuddytouring.com/stream` in a browser or VLC
2. Confirm audio plays
3. Check metadata: `curl -sf https://stream.bigmuddytouring.com/api/nowplaying/1 | python3 -m json.tool | head -20`

If audio plays and metadata returns, the incident is resolved. Post to `docs/agent-chat/thread.md`:

```
---
**[YourName] ([Machine]) @ [timestamp]**

Radio restored. Root cause: [what was wrong]. Fix: [what you did].
Time down: ~[N] minutes. Listeners affected: [count from AzuraCast or unknown].
```

## Step 6 — Droplet is down

If `stream.bigmuddytouring.com` is completely unreachable (DNS failure or connection timeout to the droplet IP):

1. Check DigitalOcean dashboard: https://cloud.digitalocean.com/ (credentials in Bitwarden)
2. Is the droplet powered on? If not, power it on.
3. Is AzuraCast responding? SSH to the droplet and check `docker ps` on the droplet side.
4. If the droplet is destroyed or the $6/mo bill lapsed, Chase needs to re-provision.

**This is the single point of failure.** DigitalOcean SLA is ~99.9% (~8 hours/year). If this happens more than once a month, consider the $12/mo multi-region upgrade.

---

## Prevention (things that should already be in place)

- [ ] UptimeRobot monitoring on `stream.bigmuddytouring.com` (free tier, 60-sec checks, email + SMS alert)
- [ ] UPS for the Mac mini (CyberPower CP685AVR or APC BE600M1, ~$70)
- [ ] Lock file in `boot-radio.sh` preventing zombie wrapper loops
- [ ] `docker update --restart unless-stopped` on the Icecast container
- [ ] Nightly music library backup from T7 to R2 via rclone

---

**File:** `docs/runbooks/radio-stream-down.md`
**Written after:** the April 10-11 incident where Docker Desktop's control socket wedged, 7 zombie ezstream wrappers competed for the mount, and the stream was down for ~2 hours before anyone noticed.
