# Runbook — AzuraCast Admin Password Recovery + Get Big Muddy Radio Live

**For:** Chase, executable in your first hour in NY
**Why:** Public Big Muddy Radio player at `bigmuddytouring.com/radio/` shows "Station Offline" because AzuraCast on the DigitalOcean droplet has no working source feeding it. Bitwarden's AzuraCast admin entry has placeholder credentials. The DO droplet root password was rejected on Apr 15. We need to reset both via DO's web console.
**Time budget:** 15–25 minutes if everything cooperates, 45 if SSL also needs fixing.

---

## What's broken

- `https://stream.bigmuddytouring.com/listen/bigmuddyradio/radio.mp3` — endpoint returns 200 but no live audio source attached
- AzuraCast admin login at `https://206.189.200.208/login` — password unknown
- DO droplet `bigmuddy-radio` root SSH password — rejected Apr 15, may have been rotated
- AzuraCast SSL — self-signed cert (browsers warn); needs Let's Encrypt

## What's working

- Local Icecast on the Mac mini at port 8010 (working, but dead when mini powers off)
- Bitwarden has correct DO account login (so you can web-console into the droplet)
- The droplet itself is up (HTTP 200 on stream endpoint)

---

## Step-by-step recovery

### Phase 1 — Reset DO root password (5 min)

1. Open DigitalOcean dashboard:
   https://cloud.digitalocean.com
2. Sign in with the credentials in Bitwarden item `Digital Ocean` (username `me@chasepierson.tv`)
3. Navigate to Droplets → click `bigmuddy-radio` (IP `206.189.200.208`)
4. In the droplet's left sidebar, click **Access**
5. Under "Reset root password," click **Reset Root Password**
6. DO emails the new temporary password to the account email — check inbox + grab it
7. Update Bitwarden item `DigitalOcean — bigmuddy-radio droplet` with the new root password — **don't skip this step or we'll be in this same situation in two months**

### Phase 2 — SSH into the droplet + reset AzuraCast admin (10 min)

1. SSH in (use the temporary password from Phase 1):
   ```
   ssh root@206.189.200.208
   ```
   When prompted, enter the temporary password. DO will force you to change it on first login. Set a new strong password, save it to Bitwarden (overwrite the temporary one).

2. Find AzuraCast install directory:
   ```
   cd /var/azuracast
   ls
   ```
   (Should show `docker-compose.yml`, `azuracast.env`, etc.)

3. List existing AzuraCast admin accounts:
   ```
   docker compose exec --user=azuracast web azuracast_cli azuracast:account:list
   ```
   This prints all admin accounts. Note the email of the account you want to reset (probably `me@chasepierson.tv`).

4. Reset that admin's password:
   ```
   docker compose exec --user=azuracast web azuracast_cli azuracast:account:reset-password <email>
   ```
   AzuraCast generates a fresh password and prints it to the terminal.

5. **Save that password to Bitwarden** in `AzuraCast — Big Muddy Radio Admin`. Replace the placeholder password field. Add a note with today's date: "Password reset 2026-04-XX via CLI."

6. Test admin login at `https://206.189.200.208/login` — accept the SSL warning for now (we fix that in Phase 4).

### Phase 3 — Get a source feeding the AzuraCast stream (5 min)

Once you're admin-logged-in:

1. AzuraCast left sidebar → Stations → Big Muddy Radio → **Streaming**
2. Find the **Source Password** (or generate a new one)
3. Save the source password to Bitwarden as a new field on the AzuraCast item: `Source Password`
4. Configure your local broadcaster (ezstream, OBS, BUTT — whichever Patch was using) to push to:
   - **Server:** `206.189.200.208`
   - **Port:** 8000 (per Bitwarden notes — NOT 8010)
   - **Mount point:** `/bigmuddyradio` (or whatever station shortcode says)
   - **Source password:** (from step 3)
   - **Format:** MP3 (matches the stream URL)

   For ezstream specifically, the config block is:
   ```xml
   <server>
     <hostname>206.189.200.208</hostname>
     <port>8000</port>
     <password>YOUR_SOURCE_PASSWORD</password>
     <mountpoint>/bigmuddyradio</mountpoint>
     <format>MP3</format>
   </server>
   ```

5. Restart the source and check AzuraCast's live status:
   - Web admin → Stations → Big Muddy Radio → **Now Playing**
   - Should show "Online" and the current track
6. Test the public URL: `https://stream.bigmuddytouring.com/listen/bigmuddyradio/radio.mp3` — should now play actual audio.

### Phase 4 — Fix SSL via Let's Encrypt (10 min, optional but should happen this week)

The current cert is self-signed. AzuraCast has built-in Let's Encrypt support.

1. AzuraCast web admin → System Administration → SSL Certificates → Use Let's Encrypt
2. Enter the domain: `stream.bigmuddytouring.com`
3. Confirm Cloudflare DNS for `stream.bigmuddytouring.com` is set to A → 206.189.200.208 with proxy DISABLED (gray cloud per `CLAUDE.md`)
4. Click "Request Certificate" — AzuraCast handles the ACME challenge automatically
5. Verify cert: `curl -vI https://stream.bigmuddytouring.com 2>&1 | grep -E "subject:|issuer:"` — should show "Issuer: Let's Encrypt"

### Phase 5 — Cleanup + governance

1. Update Bitwarden notes on `AzuraCast — Big Muddy Radio Admin`:
   - Username: confirmed admin email
   - Password: newly reset
   - Source password: (from Phase 3)
   - SSL status: ✅ Let's Encrypt as of YYYY-MM-DD
2. Update Bitwarden `DigitalOcean — bigmuddy-radio droplet`:
   - New root password
   - Note: "Password rotated YYYY-MM-DD via DO web console reset"
3. Update `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` §3.2 (DigitalOcean droplet section) — change SSL status from "BROKEN" to "✅ Let's Encrypt"
4. Update Patch via Apple Note `RADIO -> COS — AzuraCast Access Blocked` — add a `[RESOLVED YYYY-MM-DD]` line at top so the next person reading the note knows.

---

## Failure modes + fallbacks

**If DO root password reset doesn't email you:**
DO has been known to delay these. Try refreshing inbox after 5 min. If still nothing, use DO's web console (Droplet → Access → Launch Console) — you can connect via in-browser terminal that doesn't require the SSH password. From there, set a new root password manually with `passwd root` while logged in as root.

**If `azuracast_cli` command not found:**
The container name might be different. Try:
```
docker ps | grep azuracast
```
Use the container name shown in place of `web`. If that still fails, check the AzuraCast Docker compose file:
```
cat /var/azuracast/docker-compose.yml | grep azuracast_cli
```

**If SSL Let's Encrypt fails:**
- DNS propagation issue: wait 10 min, retry
- Cloudflare proxy enabled: turn it off (gray cloud)
- Port 80 blocked: AzuraCast uses HTTP-01 challenge; ensure port 80 is open on the droplet (it should be by default)

**If you can't log into AzuraCast even after password reset:**
The admin might be locked. Try:
```
docker compose exec --user=azuracast web azuracast_cli azuracast:account:set-administrator <email>
```

---

## Time-saver: have these tabs open before starting

- DigitalOcean dashboard: https://cloud.digitalocean.com
- AzuraCast admin: https://206.189.200.208/login
- Public stream test: https://stream.bigmuddytouring.com/listen/bigmuddyradio/radio.mp3
- Bitwarden web vault: https://vault.bitwarden.com (to update creds quickly)

---

## Why this matters

Big Muddy Radio is part of the Touring/Records flywheel — Amy plays as Arrie Aslin, the corridor bands play, the radio promotes both. Public Y1 revenue isn't tied to the radio (it's a support layer per `docs/THE_THESIS.md`), but a station that's been down for weeks is bad for trust + brand. Get this back live in your first NY week.

---

*End of runbook. Once executed, mark this doc with `[STATUS: COMPLETED YYYY-MM-DD]` at the top.*
