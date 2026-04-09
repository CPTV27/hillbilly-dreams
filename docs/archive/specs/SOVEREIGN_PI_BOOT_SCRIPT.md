# Sovereign Pi — first-boot setup script (spec)

Internal technical spec for the image that ships on Sovereign Pi hardware. Target platforms: **Raspberry Pi 5 (ARM64)** and **Intel/Apple iMac class desktops (x86_64 / arm64)** used as lab burn-in stations. After first successful run, the unit must operate **without internet** except where the operator explicitly tethers for updates.

## Goals

1. Detect CPU architecture, RAM, storage, and display (HDMI).
2. Install a pinned **Node.js LTS** (via `nvm` tarball or distro package mirror baked into the image).
3. Copy and enable the **local RAG / assistant service** (read-only business corpus).
4. Index business data from the bundled SQLite snapshot + optional USB import.
5. Start the API + static dashboard server on `127.0.0.1`.
6. Show a **branded splash** on HDMI (fullscreen Chromium kiosk or framebuffer) until the user completes WiFi/cellular onboarding (optional).

## High-level phases

| Phase | Description |
|-------|-------------|
| `detect` | `uname -m`, `/proc/cpuinfo`, `vcgencmd` on Pi, EDID for HDMI |
| `node` | Install Node if missing; verify `node` / `npm` |
| `sync` | Expand `/opt/sovereign-pi/app` from read-only squashfs overlay |
| `index` | Run `npm run index` — embed Chroma/SQLite vectors from `/var/lib/sovereign-pi/corpus` |
| `serve` | `systemd` unit `sovereign-dashboard.service` — `node server.js` |
| `display` | `sovereign-splash.service` — launch kiosk URL `http://127.0.0.1:8787/splash` |

## Offline constraint

- Ship a **debian/apt snapshot** or static binaries on the image for Node + Chromium dependencies.
- RAG model weights live on NVMe; **no download** on first boot unless tethered.
- Clock sync: optional `fake-hwclock` restore; warn if TLS needed and clock skew detected.

## Phone tethering (operator playbook)

### USB tethering (Android / iPhone)

1. Enable USB tethering on the phone.
2. Pi: `nmcli dev status` — expect `cdc_ether` or `rndis_host` interface.
3. `nmcli con add type ethernet ifname <iface> con-name tether autoconnect yes`
4. Run `sovereign-pi-update` script (pulls signed manifest from HDI CDN) — **optional**.

### WiFi hotspot

1. Phone: personal hotspot ON, note SSID + password.
2. On Pi, pre-seed `wpa_supplicant.conf` via `raspi-config` non-interactive or first-boot `config.json` on FAT `boot` partition.
3. After join, same update path as USB.

## Architecture matrix

| Platform | Boot | Node install | Notes |
|----------|------|--------------|-------|
| Pi 5 ARM64 | UEFI / firmware | aarch64 static Node or apt from offline repo | Use `vcgencmd get_throttled` in health ping |
| Intel iMac x86_64 | GRUB | x64 Node tarball | Test Intel GPU for splash; fall back to software GL |
| Apple Silicon Mac | ARM64 | arm64 Node | Not a shipping SKU for v1 — support for dev parity only |

## Security

- Services bind **localhost only** by default.
- SSH off unless `boot/sovereign-enable-ssh` flag file present.
- Updates require **ed25519-signed** manifest.

## Failure modes

- **No HDMI:** still start API; log to `/var/log/sovereign-pi/boot.log`.
- **Index fails:** serve splash with “Place USB with `corpus/` and reboot.”
- **Disk full:** refuse index; surface on splash.

## Deliverables

- `scripts/pi-first-boot.sh` (idempotent)
- `systemd/*.service` units
- Squashfs layout documented in `/opt/sovereign-pi/README`

---

*HDI internal — aligns with Deep South Directory hardware program.*
