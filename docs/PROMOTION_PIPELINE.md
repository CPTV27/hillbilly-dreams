# Promotion Pipeline

## Environments & Deployments
- **Sandbox:** Experimental rendering lives via static HTML delivered in `/public/sandbox/`. Pull requests automatically generate Sandbox URLs via Vercel Preview environments for inspection.
- **Staging:** Entire frontend branches are auto-generated as Vercel Preview deployments per PR.
- **Production:** A merge into `main` automatically triggers Vercel to route identical deployments simultaneously across all 14 attached domains.

## Merge Authorization Guidelines
- **Approvals:** **Chase holds exclusive merge authority for the `main` branch.**
- **Workflow:** Agents process tickets, generate features, and propose Pull Requests. Chase audits and explicitly approves the merges.
- **Hotfix Exception:** For critical operational bugs, Chase exercises direct commit maneuvers straight to the `main` branch outside standard PR channels.
