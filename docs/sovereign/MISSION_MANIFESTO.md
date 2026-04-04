# Mission manifesto — Project Sovereign Expansion

**Audience:** Cursor, Anti-Gravity, and any agent touching HDX / BMT code.  
**Stack truth:** Next.js App Router, **inline CSS** (no Tailwind in BMT), Prisma → PostgreSQL (local + Cloud SQL), real-time **Socket.io hub** only on `apps/web/server.ts` (not Vercel serverless).

## Ground rules

1. **GitHub is the pulse** — Work is tracked in GitHub Issues; avoid parallel “shadow” task lists. Coordinate with assignees before picking up `Type: Schema` / `Type: Integration` work.
2. **Namespace integrity** — New commerce and broadcast rows use `namespace` (e.g. `BEARSVILLE_CREATIVE`, `DEEP_SOUTH_DIRECTORY`). Do not join data across namespaces without an explicit architectural pass.
3. **GMB + Etsy hybrid (data model)** — Discovery lives in **`BusinessProfile`** (location, hours, map). Storefronts live in **`MarketplaceStore`** + **`Vendor`** + **`ApprovedSupply`**. Legacy **`DirectoryBusiness`** remains the DSD directory SoR until migrated.
4. **Content lifecycle** — Lore → Editorial Bureau (`Job`, `VisualAsset`, drafts) → broadcast (**`SocialAccount` / `SocialPost`** for legacy scheduling; **`SocialCampaign` / `CampaignPost`** for campaign-scoped Hootsuite-style flows).

## Systems of record (external)

| System        | Role                                      |
|---------------|-------------------------------------------|
| GitHub        | Task ledger, PRs, code review             |
| Asana         | Guild milestones, human creative review   |
| Canva         | Brand visuals (not stored as SoR in repo) |
| Hootsuite     | Social distribution                       |
| PostgreSQL    | Sovereign SoR for ingested + native data  |

## Pilot routes (admin)

| Route                    | Purpose |
|--------------------------|---------|
| `/admin/command`         | Executive / marketing command (agent context, harvest — **not** a live GitHub issue viewer unless wired). |
| `/admin/review`          | Review desk for **drafts** (`/api/drafts`). |
| `/admin/business/[slug]` | **Discovery + Shop** readout for Bearsville-family brands (data-driven after `db push` + seed). |

## Sovereignty

External APIs (Google, Amazon, etc.) feed **your** database; do not treat third-party responses as authoritative UI state without a local row.

## Related paths

- Backlog source: `tasks/BEARSVILLE_CREATIVE_BACKLOG.md`
- Glass / hub: `CLAUDE_HANDOFF.md`, `docs/SOVEREIGN_GLASS_KIOSK_SPEC.md`
