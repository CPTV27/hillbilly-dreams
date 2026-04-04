# Learning loop — Outsider Economics × DSD (Sovereign Scholar)

**Principle:** Reading → verified action → credits. The book is the manual; the directory tool is the lab.

## Path A — Land & extraction (example chapter)

| Step | Mode | Action |
|------|------|--------|
| 1 | **Read** | User reads chapter on land vetting / capital flight (book or `outsider-economics-v2/` mirror). |
| 2 | **Link** | Scans **Sovereign QR** or taps **chapter deep link** → opens DSD (or ops) **Lore Task** pre-filled with parcel hints. |
| 3 | **Act** | User completes **Scout task**: confirm address, hours, or ownership signal per rubric (AI + human spot-check in pilot). |
| 4 | **Reward** | On approval: **+50 credits** to ledger (`reason: lore_task_chapter_N`) and optional subsidy unlock if on utility tier. |

## Path B — Main Street multiplier

| Step | Mode | Action |
|------|------|--------|
| 1 | **Read** | Chapter on local multiplier / directory economics. |
| 2 | **Link** | QR → **verify three directory fields** for one Natchez business (chosen by rotation). |
| 3 | **Act** | Submit corrections with source URL. |
| 4 | **Reward** | **+30 credits**; streak bonus optional. |

## Credit economics (pilot defaults — tune with finance)

- **50 credits** — deep vet (parcel / institutional).  
- **30 credits** — light directory hygiene.  
- **10 credits** — quiz-only (if quiz ships before field tasks).  

## Stack references (for CC)

- `User.credits`, `CreditLedger`, `LoreEntry` / future `VerificationTask` model.  
- Public corpus: `outsider-economics-v2/` (build-time posts).  
- Do not expose raw PII in task payloads; use `LoreEntry.isAnonymized` for city aggregates.
