# Midnight Sprint Handoff

**Current IP Context:** \`192.168.4.165\` 
*(Note for Claude: The Kiosk Client must connect to \`ws://192.168.4.165:3000\`. If the iMac leaves the workshop LAN, Commander will update this to the static Tailscale IP).*
**Status:** Socket.io port 3000 bound and active.
**Ingestion Engine:** `ambient-watcher.ts` (4096-character High-Memory chunking) is active on `/DeepLore/Inbox`.
**Spec Link:** Please review [docs/SOVEREIGN_GLASS_KIOSK_SPEC.md](docs/SOVEREIGN_GLASS_KIOSK_SPEC.md) for UX and Adaptive Glass interaction details.

### Sandbox Context (Natchez Protocol)
* **Branch:** `sandbox-protocol-natchez`
* **Local DB:** `postgresql://chasethis@localhost:5432/hillbilly_sovereign` (or `postgresql://chasethis:postgres@localhost:5432/hillbilly_sovereign` if auth requires a password). After schema changes: `pnpm db:generate` from repo root, then `pnpm --filter @bigmuddy/database exec prisma db push` with `DATABASE_URL` set.
* **Signing Bonus Logic:** Default 1,000 credits allocated to initialized sovereign-guild accounts. Admin (chase@hillbillydreamsinc.com) seeded with 10k credits.

### Hybrid cloud / edge (handoff baseline)
* **Cloud (GCP):** Production brain and durable state — **Cloud SQL** (Postgres; same Prisma schema as local `hillbilly_sovereign` baseline), **Vertex AI**, **GCS**, **Secret Manager**. API routes and SSR use the DB the deployment is configured for (`DATABASE_URL` / connector).
* **Edge (Sovereign Hub):** Real-time plane — `apps/web/server.ts` loads **Socket.io** on the LAN mainframe / hub host (`pnpm dev` at repo root or `@bigmuddy/web` hub script). **Not** available on serverless-only deploys; kiosks/displays set **`NEXT_PUBLIC_SOVEREIGN_HUB_URL`** when the browser is not same-origin as the hub.
* **Socket contract:** `join_session` / `sovereign_event` (Glass cognitive stream); **`sovereign_pulse`** (hub-wide `io.emit`, from `EventProducer.broadcastPulse` on credit/submission paths); **`node_heartbeat`** (updates `PhysicalNode` `lastSeen` / `ONLINE` by unique `name`, payload `nodeId` or `name`).
* **Glass routes:** `/admin/kiosk` (`KioskLiveClient` → session room + pulses); `/display/[slug]` (`DisplaySignageClient` → `join_display` + ticker + pulses).

We are building toward a **subsidized public utility** model: **Deep South Directory** at **$20/mo** funded by municipal or economic-development programs, with **verified registration**, **task-based proof-of-activity** (mini-lore / vetting tasks) to unlock subsidy, optional **anonymity off subsidy**, and **aggregated utility reporting** for the city. Schema hooks: `User.isGovernmentSubsidized`, `User.lastVerificationTaskDate`, `LoreEntry.isAnonymized` for safe heat-map style ROI without leaking individuals.

### PLATFORM CAPABILITIES
- **RBAC / Groups:** The schema now supports `Group`, `GroupMember`, and `ApiKey`, enabling granular, view-only access for municipal partners.
- **AI Observability (Reasoning Traces):** `ReasoningTrace` captures chain of thought (`prompt`, `contextUsed`, and `rawOutput`) on `AgentTask` executions.
- **Versioning:** Entity and LoreEntry records now support native graph versioning (`version`, `supersededBy`).
- **Hardware Tracking:** The `PhysicalNode` model and `node_heartbeat` socket events continuously track system health of kiosks and TVs.
- **Webhook Hub:** Enabled outbound system orchestration via `WebhookSubscription`.
- **Infrastructure status**
  - **Socket.io (hub):** bind on hub host port **3000** (or `PORT`) when using `server.ts`.
  - **ChromaDB:** vector store expected on **`:8000`** for local RAG / lore tooling.
  - **Prisma:** If `db push` / `generate` hits local permission errors, fix workspace `node_modules` ownership or run the same commands in CI / a clean shell with `DATABASE_URL` pointed at the target instance (local or Cloud SQL).
