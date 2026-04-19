# Chief of Staff Handoff — April 15, 2026 Evening Session

**From:** Primetime (Claude Code, MBP)
**To:** Chief of Staff
**Date:** 2026-04-15 11:00 PM CDT
**Priority:** HIGH — Approval required before any builds proceed

---

## What Happened Tonight

Chase recorded two voice memos totaling ~20 minutes that represent a significant restructuring of how the brands relate to each other and how revenue flows. He then requested a full business review package for an internal session with Rea (trusted friend/sounding board) tonight.

Simultaneously, the Mac Mini agents completed a major micromedia research session — 150+ tools cataloged, 23 case studies, revenue projections, and a full broadcast infrastructure buildout.

---

## What Was Produced

### Documents
| File | What |
|------|------|
| `docs/VOICE_MEMO_ANALYSIS_2026-04-15.md` | 19 discrete decisions extracted, analyzed, mapped against codebase |
| `docs/LAND_AND_EXPAND_CONCEPT.md` | Real estate cooperative concept — 30-100 acres, $1.2M build-out |
| `docs/HDI_Business_Review_April_2026.pptx` | 17-slide deck for Rea review |
| `docs/hdi-review-board.html` | Interactive HTML dashboard with sanity scorecard (pw: 1966) |
| `AGENT_LEDGER.md` | Updated with full session log |

### Memory Updates
| File | Change |
|------|--------|
| `project_april15_architecture_decisions.md` | 15 key decisions from voice memo |
| `project_land_and_expand.md` | Cooperative concept, Outsider Economics, Marika |
| `project_people_marika.md` | Potential Catskills partner |
| `project_people_rhea.md` | Friend/sounding board context |
| `project_operator_split.md` | JP removed, open role added |

---

## Key Decisions Requiring COS Acknowledgment

### PERSONNEL
1. **JP Houston is OUT.** No longer involved. Entertainment Director role is OPEN.
2. **Tracy's role expands** — now Finance + Inn Ops + Magazine Editor-in-Chief.
3. **Open role** should be a revenue partner (commission/rev-share), not a salary cost.

### BRAND ARCHITECTURE
4. **Magazine = Inn marketing channel.** Not a standalone editorial brand anymore.
5. **Records + Radio = one public experience.** Unified music page.
6. **Studio C = billing entity** for all music production services.
7. **Artist subscription packages:** $99/$250/$500 per month. New revenue stream.

### STRATEGY
8. **Minimize custom software.** Lean on Asana, Stripe, Google Calendar. App = database + content engine + public pages.
9. **Land & Expand is Phase 2+.** Research only. No software builds. $1.2M capital project.
10. **Outsider Economics** = Raspberry Pi hardware product. Outsider Economics thesis as a product. Sovereign Pi pages exist already.

### MAC MINI RESEARCH (needs integration decision)
11. **Micromedia tool stack proposed:** AzuraCast, Liquidsoap, beets, n8n, faster-whisper, Umami, Listmonk, ComfyUI, Remotion, SRS
12. **Revenue projections from research:** Radio $4,400/mo + Magazine $3,250/mo = $7,650/mo ($91,800/yr) at mid-range
13. **Bundle packages proposed:** $99/$199/$399/$599 combining Directory + Radio + Magazine
14. **Case study models:** Lot Radio (Brooklyn), Bitter Southerner (Atlanta), Marfa TX (pop 1,700)

---

## What Needs COS Approval Before Proceeding

### Gate 1: Business Architecture Updates
- [ ] Approve updating `BUSINESS_ARCHITECTURE.md` with the 19 decisions
- [ ] Approve updating `BIG_MUDDY_MEDIA_PLAYBOOK.md` (Tracy as editor, Magazine→Inn)
- [ ] Approve the personnel change (JP out, open role description)

### Gate 2: Mac Mini Research Integration
- [ ] Review micromedia tool recommendations (AzuraCast vs OpenBroadcaster, etc.)
- [ ] Approve or modify revenue projections before they enter any financial models
- [ ] Decide on bundle pricing ($99/$199/$399/$599) vs current DSD tiers ($0/$25/$50/$99/$250)
- [ ] Approve implementation phases or modify timeline

### Gate 3: Build Priorities
- [ ] Approve 4-sprint plan (Foundation → Revenue → Integration → Deep Data)
- [ ] Confirm "minimize custom software" directive applies retroactively to existing admin tools
- [ ] Decide whether to start Tracy voice profile capture this week or wait

### Gate 4: Land & Expand
- [ ] Acknowledge as Phase 2+ (no builds, research only)
- [ ] Approve Outsider Economics as a concept worth researching (hardware BOM, software stack)
- [ ] Approve reaching out to Marika (Chase to present — we don't contact her)

---

## Conflicts to Resolve

### Pricing Confusion
The Mac Mini research proposes bundle packages ($99/$199/$399/$599) while the current canonical pricing is DSD tiers ($0/$25/$50/$99/$250). The voice memo introduces artist packages ($99/$250/$500). These are three different pricing frameworks that need reconciliation:
- **DSD tiers** = business directory subscriptions (walk-in sales)
- **Artist packages** = musician services (touring/records)  
- **Bundle packages** = combined Directory + Radio + Magazine (proposed, not approved)

**Recommendation:** Keep DSD tiers as-is. Add artist packages as a separate product line. Evaluate bundles as a future upsell path. Do not change DSD pricing again.

### Tool Stack Decisions
Mac Mini research recommends replacing OpenBroadcaster with AzuraCast. Radio agent has OpenBroadcaster running. This is a significant infrastructure change that should not happen without explicit approval.

**Recommendation:** Evaluate AzuraCast in parallel. Do not replace OpenBroadcaster until AzuraCast is proven in a test environment.

### Magazine Scope
Voice memo says Magazine serves the Inn. Mac Mini research models Magazine as its own revenue center ($3,250/mo from ads, sponsored content, membership). These aren't necessarily contradictory — the Magazine can serve the Inn editorially while also generating its own ad revenue — but the framing needs alignment.

**Recommendation:** Magazine is the Inn's marketing channel (Tracy edits). It can also carry ads and sponsors. Both revenue models coexist.

---

## What Chase Is Doing Next

1. **Recording detailed notes** — additional context and refinements coming
2. **Meeting with Rhea** — internal review using the HTML dashboard + PPTX
3. **Post-meeting analysis** — we'll process the recording for action items

**HOLD ALL BUILDS until Chase's notes are in and COS approves the plan.**

---

## Sanity Assessment

| Area | Score | Notes |
|------|-------|-------|
| Core business (DSD + Touring + Inn) | 78% | Solid. Revenue model proven. Infrastructure built. |
| Brand reorganization (19 decisions) | 65% | Logical but lots of moving parts. Needs clean execution. |
| Mac Mini research integration | 55% | Great research. Needs filtering — not everything should be adopted. |
| Land & Expand | 30% | Exciting vision. $1.2M capital. Legal complexity. Phase 2+. |
| Outsider Economics | 25% | Cool concept. No product yet. Sovereign Pi pages exist. |
| **Overall** | **65%** | Ambitious but grounded. The core is solid. Don't let the vision distract from the revenue. |

---

---

## ADDENDUM: Chase's Presentation Review Notes (10:45 PM)

Chase reviewed the HTML dashboard and provided 13 additional notes. Full analysis at `docs/PRESENTATION_NOTES_2026-04-15.md`. Key additions:

### Thesis Expansion
- Broaden from "organization" to "experiences enabled by invisible technology"
- The product story should be told through Tracy's eyes — a day using Delta Dawn
- "Imagine opening your phone and it just says 'Hello, here's your day...'"

### New Product Concepts
- **Animated explainer video** — Tracy using the app, cute music, shows the ecosystem working
- **Musician community** — "MySpace for Deep South musicians" — artist profiles, music playback, submit for radio consideration
- **Public access integration module** — Free broadcasting tools for public access stations, show exchange network
- **Audience-specific entry points** — Different views for Tracy, bands, venues, businesses, institutional buyers

### Presentation Changes Requested
- Add "Built On" logos (Google, Stripe, Vercel, Anthropic)
- Rewrite Broadcasting module in plain language (no "Icecast" or "OBS")
- Show 50/50 revenue split with artists in case study
- Emphasize promotion network in Touring (influencer strategy, Big Muddymobile)
- Land & Expand needs phased cost breakdown (not $1.2M lump sum) + site plan rendering

### Google Compliance Agent
- New agent concept: reviews the app against Google best practices
- Scores each category
- Goal: get Google's attention, show alignment with their stack

### Voice Memo Content Pipeline
- Chase's voice memos are now a CONTENT SOURCE, not just instructions
- Mine for social media quotes, radio interstitials, DJ drops
- His natural voice IS the brand voice — don't clean it into corporate language
- Save all audio files + transcripts for the corpus

### COS Questions to Address
1. Do the presentation changes get made tonight (before Rea) or after?
2. Does the musician community concept get its own product spec, or is it an extension of the existing musician onboarding?
3. Is the animated explainer a priority or backlog?
4. How does the influencer network strategy connect to existing Asana workflows?
5. Does the public access module deserve its own sprint or is it a future play?

---

*This handoff is the gate. Nothing moves to build until the Chief of Staff reviews and approves each gate above.*
