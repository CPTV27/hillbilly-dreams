# Midnight Sprint Handoff

**Current IP Context:** \`192.168.4.165\` 
*(Note for Claude: The Kiosk Client must connect to \`ws://192.168.4.165:3000\`. If the iMac leaves the workshop LAN, Commander will update this to the static Tailscale IP).*
**Status:** Socket.io port 3000 bound and active.
**Ingestion Engine:** `ambient-watcher.ts` (4096-character High-Memory chunking) is active on `/DeepLore/Inbox`.
**Spec Link:** Please review [docs/SOVEREIGN_GLASS_KIOSK_SPEC.md](docs/SOVEREIGN_GLASS_KIOSK_SPEC.md) for UX and Adaptive Glass interaction details.

### Sandbox Context (Natchez Protocol)
* **Branch:** `sandbox-protocol-natchez`
* **Local DB:** `postgresql://chasethis:postgres@localhost:5432/hillbilly_sovereign`
* **Signing Bonus Logic:** Default 1,000 credits allocated to initialized sovereign-guild accounts. Admin (chase@hillbillydreamsinc.com) seeded with 10k credits.
