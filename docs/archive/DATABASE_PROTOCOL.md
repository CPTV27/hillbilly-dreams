# Database Protocol

## Data Storage Environments
- **Production:** Neon (`DATABASE_URL` in Vercel). All live sites and edge functions read exclusively from here.
- **Cloud SQL:** `sovereign-db-primary` operates at `34.31.180.74`. This is currently on standby until the connector cutover is finalized (Issue #70).
- **Local:** `hillbilly_sovereign` runs on the host MacBook Pro. This is for local development strictly.

## Operational Rules
- **Schema Migrations:** **NEVER** run `db push` to the Neon production database without a verified type-check locally. 
- **Documentation:** Always update `docs/STATUS.md` immediately following any schema changes or alterations to the data modeling layer.
- **Authority Pipeline:** Chase determines and approves schema/structural alterations. Agents execute the raw queries and migrations upon terminal approval.
