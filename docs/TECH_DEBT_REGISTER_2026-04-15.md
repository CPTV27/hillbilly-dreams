# Technical Debt Register — April 15, 2026 Session
**Status:** Open items from tonight. Nothing ships until reviewed.

---

## How to Use This

Each item has an **owner** (which agent/tool handles it) and a **priority** (do first, do next, backlog). Chase approves the plan, then hands chunks to the right tool.

**Agents available:**
- **Primetime** (Claude Code, MBP) — code, content, HTML, presentations, integrations
- **COS / Adrian** (Claude Code, MBP) — strategy, QA, Miro board, approval gates
- **Mac Mini agents** (Radio, Patch) — broadcasting, infrastructure, research
- **Cursor** — quick code edits, component work, CSS fixes, file cleanup
- **Antigravity (AG)** — research, competitive analysis, content generation
- **Google AI** — search, image generation, content enrichment

---

## Priority 1: Do Before Rhea Meeting

| # | Item | Owner | Status | Notes |
|---|------|-------|--------|-------|
| 1 | Micromedia site: strip research catalog, show actual stack + roadmap only | **Primetime** | OPEN | Chase said: "I don't want all the research. Just what we have and what we're building toward." |
| 2 | Business review site: integrate presentation notes (13 items) | **Primetime** | OPEN | Thesis expansion, Delta Dawn UX story, 50/50 split, promotion network, "Built On" logos |
| 3 | Miro board completion | **COS/Adrian** | IN PROGRESS | COS rebooted and working on it. May have context issues. |

## Priority 2: Do This Week

| # | Item | Owner | Status | Notes |
|---|------|-------|--------|-------|
| 4 | Update BUSINESS_ARCHITECTURE.md with 19 decisions | **Primetime** or **Cursor** | OPEN | Needs COS approval first. Clean, careful edit — this is source of truth. |
| 5 | Update BIG_MUDDY_MEDIA_PLAYBOOK.md | **Cursor** | OPEN | Tracy as editor, Magazine→Inn, artist packages, Studio C as production entity |
| 6 | Voice memo pipeline setup | **Mac Mini + Primetime** | OPEN | 209 memos found at ~/Library/Group Containers/.../Recordings/. Need: copy to accessible location, batch transcribe with Whisper, index. |
| 7 | ElevenLabs voice clone from Chase memos | **Primetime** | OPEN | Need ELEVENLABS_API_KEY from Vercel. Select 3-5 cleanest memos, create voice clone. |
| 8 | Artist subscription Stripe products | **Primetime** | OPEN | $99/$250/$500 — needs Chase approval on exact feature set per tier before creating |
| 9 | Tracy voice profile questionnaire | **Primetime** or **Cursor** | OPEN | Onboarding form for writing style, UI preferences, tool connections |
| 10 | Reconcile pricing frameworks | **Chase decision** | BLOCKED | Three frameworks floating: DSD ($0-$250), Artist ($99-$500), Bundles ($99-$599). Need one coherent pricing page. |

## Priority 3: Next Sprint

| # | Item | Owner | Status | Notes |
|---|------|-------|--------|-------|
| 11 | Touring page redesign (bands/venues/fans) | **Primetime** or **Cursor** | OPEN | Three-audience structure |
| 12 | Records + Radio unified page | **Primetime** | OPEN | Merge public experience |
| 13 | Magazine copy reposition as Inn channel | **Cursor** | OPEN | Copy changes, not structural |
| 14 | Production request → Asana pipeline | **Primetime** | OPEN | Form → Asana task creation via API |
| 15 | RSS feed ingestion system | **Primetime** | OPEN | Consume external feeds for script generation |
| 16 | Influencer database | **Cursor** or **AG** | OPEN | New model: name, market, platform, reach, relationship status |

## Backlog (Phase 2+)

| # | Item | Owner | Notes |
|---|------|-------|-------|
| 17 | Land & Expand site plan rendering | **AG** or **Canva** | Visual layout of the cooperative property |
| 18 | Born Free hardware spec | **Mac Mini + AG** | Raspberry Pi BOM, software image, case sourcing |
| 19 | Animated explainer video brief | **Primetime** | Remotion or commission — Tracy's day with Delta Dawn |
| 20 | Google compliance scoring agent | **Primetime** | QA agent for Google best practices |
| 21 | Public access integration module spec | **AG** | Product spec for public access TV stations |
| 22 | Musician community platform spec | **AG** or **Primetime** | "MySpace for Deep South musicians" — full product spec |
| 23 | Venue deep directory (floor plans, calendars) | **Primetime** | Significant build — calendar import, capacity search |
| 24 | AzuraCast evaluation | **Mac Mini** | Test in parallel, don't replace OpenBroadcaster yet |

---

## Delegation Rules

**Cursor gets:** Quick edits, copy changes, CSS fixes, file renames, component tweaks. Things that take < 30 minutes and don't require deep business context.

**AG gets:** Research tasks, competitive analysis, content generation, product specs for new concepts. Things that need web access and creative thinking but don't touch code.

**Mac Mini agents get:** Broadcasting infrastructure, audio processing, music library management, transcription. Things that run on the mini.

**Primetime gets:** Code integrations, HTML sites, Stripe products, API wiring, complex multi-file changes. Things that need full codebase context.

**COS/Adrian gets:** QA review, approval gates, Miro board, strategic alignment checks. The gatekeeper role.

**Chase decides:** Pricing, personnel, partnerships, what ships. The only person who approves anything going live.

---

## System We Need

The agent swarm needs a task router. Right now tasks live in:
- Apple Notes (agent-to-agent comms)
- This debt register (tonight's items)
- Asana (operational tasks)
- Voice memos (Chase's stream of consciousness)
- AGENT_LEDGER.md (session logs)

**Proposed:** Everything routes through Asana. Each agent gets assigned tasks in Asana. Status updates happen there. Apple Notes becomes the "urgent DM" channel, not the task system. The AGENT_LEDGER stays as the audit trail.

This keeps Chase in the tool he and Tracy already use (Asana), uses the Pro subscription he's paying for, and doesn't require building another custom tool.

---

*15 active items. 9 backlog items. 4 agents available. If we run Primetime + Cursor + AG in parallel on Priority 2 items, the week's work is 3-4 days, not 10.*
