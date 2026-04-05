# Kiosk hardware — procurement spec (#56)

**Status:** **BLOCKED — physical equipment purchase + install**

## Purpose

Lobby / venue **DisplayChannel** clients: touch or non-touch **kiosk shell** driving ` /display/[slug]` or dedicated admin **Kiosk** mode.

## Reference hardware (draft — validate before PO)

| Component | Spec notes |
|-----------|------------|
| **Display** | 43–55" commercial panel, portrait optional, 250+ nit for window-adjacent installs. |
| **Compute** | Intel NUC / Mac mini class; wired Ethernet; **no Wi-Fi-only** for production. |
| **Enclosure** | VESA mount + tamper screws; cable gutter; ventilation if sealed back. |
| **Input** | Capacitive touch overlay **or** passive + QR remote control. |
| **Power** | UPS 15 min minimum; surge on circuit map. |

## Software

- **Chrome / Edge kiosk mode** or **dedicated wrapper app** — engineering owns manifest in `apps/web` kiosk routes.
- **MDM:** optional — Apple Business / Intune for remote restart.

## Install checklist

1. Site survey — power, network drop, sunlight, theft risk.
2. **Bearsville** pilot one unit; **Natchez** second.
3. Asset tag + Bitwarden doc with serials.

## Unblock

- [ ] PO approved + vendor lead time confirmed.
