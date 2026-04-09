# Sovereign Hub Ops

## Hub Architecture & Connectivity
- **Socket.IO Execution:** The Hub is spun up locally via `pnpm dev:hub` (which executes `server.ts`). Due to its stateful connection requirements, this is **NOT** available on Vercel, as it operates as a serverless instance.
- **Client Configuration:** Kiosk clients resolve the Hub address via the `NEXT_PUBLIC_SOVEREIGN_HUB_URL` environment variable.

## Network Reliability
- **Current Connectivity Strategy:** Relies on dynamic LAN IP parameters via DHCP which fluctuates.
- **Future Strategy:** Implementation of a static Tailscale hostname for unified routing.
- **Failover:** Glass/kiosk functionality is built to degrade gracefully without catastrophic failure if the Socket.IO hub connection drops or goes offline.

## Environments
- **Staging:** No Hub. (Disconnected context)
- **Production:** The Hub runs localized on the MacBook Pro host. A future migration targets long-running containers on Google Cloud Run.
