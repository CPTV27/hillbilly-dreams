# Blocker: Canva + Miro export before account changes (#82)

**Status:** **BLOCKED — manual export by Chase**

## Required actions

1. **Canva** — Bulk download all designs (per team) to cold storage (GCS or Synology); preserve folder naming = project name.
2. **Miro** — Export boards as **PDF + .rtb** (or current Miro backup format); store with date stamp.
3. **Inventory** — One spreadsheet: asset name, source tool, link, backup path.
4. **Cancellation** — Only after steps 1–3 verified; update Bitwarden with final export location.

## Why blocked on agents

- MFA + enterprise login; possible **legal hold** on certain boards — human decision.

## Unblock

- [ ] Export manifest checked by second reader (Tracy or Chase).
