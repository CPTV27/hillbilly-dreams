---
name: Bitwarden is the single source of truth for all secrets
description: Every API key, token, and credential must be stored in Bitwarden. No exceptions.
type: feedback
---

All secrets go into Bitwarden. This is a top-level policy from Chase.

**Why:** Credentials were scattered across .env files, Firebase Secret Manager, Vercel dashboard, and local configs. Single source of truth prevents lost credentials and makes rotation manageable.

**How to apply:**
- When creating or receiving any new API key, token, or secret → store in Bitwarden immediately
- Use `bw create item` via CLI (requires `BW_SESSION` from `bw unlock`)
- Vault is under `admin@hillbillydreamsinc.com`
- Secrets can then be copied to Vercel env vars, .env.local, etc. — but Bitwarden is the canonical record
- All agents (CC, AG, GA, Delta Dawn, Ledger, Chuck, Rook) must follow this policy
