# Blocker: Canva API / BC-09 brand packages (#53)

**Status:** **BLOCKED — Canva API access + contract**

## Intent

Programmatic template instantiation for Bearsville Creative **brand packages** — reduce hand-copy between kits.

## Blockers

1. **Canva Apps / API** entitlement under the correct **Business** tenant.
2. **Legal** — ToS review for automated generation of client-facing assets.
3. **Secret storage** — `CANVA_*` keys in Vercel + Bitwarden (not committed).

## Until unblocked

- Manual Canva workflow per `BLOCKER_CANVA_BUSINESS_86.md`.
- No server routes calling Canva from production.

## Unblock criteria

- [ ] API credentials issued + test POST succeeds from dev.
