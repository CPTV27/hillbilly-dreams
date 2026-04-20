# Tracy + Amy Onboarding — April 20, 2026

**Purpose:** Complete prep package for the morning presentation onboarding Tracy Alderson-Allen and Amy Allen as full operating partners of Big Muddy / MBT.

**Generated:** April 19, 2026 (overnight session)
**Audience:** Tracy + Amy primary; Chase reference; Delta Dawn context fuel

---

## What's in this folder

| # | File | Purpose | Length | Read time |
|---|------|---------|--------|-----------|
| 00 | `00-README.md` | This file | — | 1 min |
| 01 | `01-business-case-and-pro-forma.md` | 12-month financial model + milestones + risks (CFO-style memo) | ~14K | 15 min |
| 02 | `02-tracy-amy-operator-manual.md` | Daily reference: every how-to, glossary, "I want to..." index | ~26K | 30 min |
| 03 | `03-delta-dawn-context-refresh.md` | System-prompt fuel for the team's AI assistant (not for human reading) | ~14K | 10 min skim |
| 04 | `04-sanity-studio-cheat-sheet.md` | **Print and tape above each desk.** Single-page quick reference. | 3K | 30 sec |
| 05 | `05-demo-day-url-checklist.md` | Walk-through script for the morning presentation, every URL with status | 5K | 5 min |
| 06 | `06-photo-tagging-workflow.md` | Interim plan for tagging the 229-photo library | 4K | 5 min |
| 07 | `07-cloud-only-services-inventory.md` | "If the Mac mini dies tonight, can we still work?" — answer + inventory | 4K | 5 min |

## Suggested reading order

**Tracy (45 min total):** 04 → 01 → 02 → 05 → 06 → 07
**Amy (30 min total):** 04 → 02 → 05 → 07
**Chase (presenter prep, 30 min):** 05 → 01 → 04 → all others as reference
**Delta Dawn (paste into context):** 03

## Pre-demo actions for Chase (do tonight or first thing tomorrow)

1. **Invite Tracy + Amy to Sanity** (manage.sanity.io → project 5p7h8glj → Members → Editor role)
   - tracyaldersonallen@gmail.com
   - amyaldersonallen@gmail.com
2. **Add their emails to admin allowlist** (`apps/web/config/auth-rules.ts`)
3. **Print** `04-sanity-studio-cheat-sheet.md` x2 (one per desk)
4. **Hard-refresh** every Tier-1 URL on your demo machine for warm cache
5. **Paste** `03-delta-dawn-context-refresh.md` into Delta Dawn's system prompt
6. **Convert** key files to PDF/Docx (see "Google Drive upload" section below)

## Demo flow (30 min, suggested in `05-demo-day-url-checklist.md`)

1. 5 min — what we built (open business architecture doc)
2. 5 min — public sites tour
3. 10 min — Sanity Studio walkthrough live
4. 5 min — Admin tools
5. 5 min — Pro forma + milestones + action items

End with: **"Here's the manual. Print it. Delta Dawn answers most questions. Call me for anything urgent."**

## Honest scope notes

**What's ready and demonstrable today:**
- Sanity Studio fully operational; CMS-driven Pricing/Shows/Private Events/Account/Magazine
- Touring page Sanity-driven
- 10 new Tracy-voice editorial articles published
- AI imagery purged across magazine and inn pages
- Real-photo library (229 photos) wired into Studio picker
- Customer-facing /pricing, /shows, /private-events, /account/subscriptions, /checkout flows
- Admin dashboard with Treasury, Subscriptions, AI Wizard
- 16/16 deploy verification green

**What's pending (called out in the manual):**
- Magic-link auth on /account/subscriptions (still email-lookup mode)
- Booking ticket checkout flow on /shows (mailto fallback)
- Full CMS migration of ~15 hardcoded pages (Inn, Radio, Records, Entertainment subpages)
- Photo tagging UI in Sanity Studio (interim: Google Sheet)
- Per-tenant GCS bucket isolation (currently shared with prefix isolation)

**The honest framing for tomorrow:** "The platform foundation is built. The CMS is real. The websites are real. Tracy and Amy can edit content today. The remaining buildout — pages we haven't yet wired, features still on the roadmap — happens this month while Chase is in NY, with daily ship cadence."

## Google Drive upload

Recommended Drive folder: `Hillbilly Dreams › Onboarding › Tracy + Amy 2026-04-20`

Upload these as Google Docs (paste markdown, it converts cleanly):
- `01-business-case-and-pro-forma.md`
- `02-tracy-amy-operator-manual.md`
- `04-sanity-studio-cheat-sheet.md` (also print)
- `05-demo-day-url-checklist.md`
- `07-cloud-only-services-inventory.md`

Keep these in repo only (technical / agent-facing):
- `03-delta-dawn-context-refresh.md`
- `06-photo-tagging-workflow.md`

I've also generated `.docx` versions of the 5 user-facing files alongside the `.md` originals for one-click Drive upload.
