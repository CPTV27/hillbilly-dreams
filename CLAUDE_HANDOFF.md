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

We are building toward a **subsidized public utility** model: **Deep South Directory** at **$20/mo** funded by municipal or economic-development programs, with **verified registration**, **task-based proof-of-activity** (mini-lore / vetting tasks) to unlock subsidy, optional **anonymity off subsidy**, and **aggregated utility reporting** for the city. Schema hooks: `User.isGovernmentSubsidized`, `User.lastVerificationTaskDate`, `LoreEntry.isAnonymized` for safe heat-map style ROI without leaking individuals.

### PLATFORM CAPABILITIES
- **RBAC / Groups:** The schema now supports `Group`, `GroupMember`, and `ApiKey`, enabling granular, view-only access for municipal partners.
- **AI Observability (Reasoning Traces):** `ReasoningTrace` captures chain of thought (`prompt`, `contextUsed`, and `rawOutput`) on `AgentTask` executions.
- **Versioning:** Entity and LoreEntry records now support native graph versioning (`version`, `supersededBy`).
- **Hardware Tracking:** The `PhysicalNode` model and `node_heartbeat` socket events continuously track system health of kiosks and TVs.
- **Webhook Hub:** Enabled outbound system orchestration via `WebhookSubscription`.
- **Infrastructure Status:** 
  - Socket.io is active on `:3000`.
  - ChromaDB is confirmed listening on `:8000`.
  - Note: Prisma cache `EPERM` issues are active; `prisma db push` could not run natively, so Postgres updates require `sudo` or Docker CLI handling.
