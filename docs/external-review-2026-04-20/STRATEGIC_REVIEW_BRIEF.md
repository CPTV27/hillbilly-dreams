# MBT / Big Muddy — Strategic Review Brief

> **Historical snapshot.** This brief was the input to the external AI review on 2026-04-20 AM. The financial numbers in it (especially the $250k Y1 break-even framing) were subsequently refined against actual QuickBooks line items the same afternoon. **The canonical break-even is now $191k; the baseline target is $330k.** See `docs/THE_THESIS.md` for current numbers. This file is preserved unchanged so the reviewers' context stays intact and their analysis stays legible.

**Purpose:** External AI analysis focused on **maximizing strategic effectiveness** against the canonical thesis. NOT a defense of the existing plan — a search for the highest-leverage next moves.

**Prepared:** April 20, 2026
**Replaces:** `EXTERNAL_AI_REVIEW_BRIEF.md` (defensive framing, April 20 morning draft — superseded)
**Canonical source:** `docs/THE_THESIS.md` (Chase's mental model, captured verbatim 2026-04-19)
**Length:** ~6,000 words. Fits in any major LLM context window.
**Ask of the reviewer:** 5 strategic prompts in Section 6. Copy-paste ready.

---

## Section 1 — Executive Summary (What This Actually Is)

**Not:** a vertically-integrated startup ecosystem chasing a unicorn exit.
**Is:** a media-amplification strategy applied to existing businesses that already operate independently. The technology + brand infrastructure (MBT platform) is built so three equity partners (Chase, Tracy, Amy) can run their existing businesses with shared cost, shared distribution, and shared sales — **freeing attention for a life they want, not replacing it with more work.**

The exit goal is lifestyle, not scale. The financial bar is **$250,000 in Y1 (May 2026 – April 2027)** across all channels — the level at which the ecosystem covers itself. Above $250k, every dollar buys back time, subsidizes the next interesting project, or gets reinvested in the lifestyle (a tour bus, a new show series, a Bearsville activation). Out-year growth target: **25% YoY** through Y5.

The platform is built. The brands are live. The people are aligned. What's needed now is **sequencing** — of the next 6 months of effort — to hit Y1 without burning the partners out and to set up compounding from Y2 forward.

**This brief asks external AIs five questions designed to find the highest-leverage moves.** Not to critique the thesis — the thesis is locked. To amplify the execution.

---

## Section 2 — The Thesis, Distilled

### Who the businesses belong to

| Partner | Their business(es) being amplified |
|---------|-----------------------------------|
| **Tracy Alderson-Allen** | Big Muddy Inn (6 rooms + 50-seat Blues Room). Big Muddy Magazine (her editorial vehicle — "Mississippi Martha Stewart" voice). BizDev/sales/management for Chase Pierson Photography. |
| **Amy Allen** | Her singing career — performs as Arrie Aslin (Inn artist-in-residence). Big Muddy Touring + Records + Radio exist primarily to support her career, with ancillary lift to other corridor bands. Plus day-of Inn + bar operations. |
| **Chase Pierson** | Studio C Video. Chase Pierson Photography (expanded into Deep South via Tracy's biz dev). Plus CTO/showrunner of the platform itself. FarleyPierson name is being retired — the LLC gets renamed or closed. |

Equity: one-third each across the Big Muddy holding.

### What MBT (the platform) does

- **Makes the ecosystem cost less than the sum of its parts.** Shared CMS (Sanity), shared hosting (Vercel), shared photo library (GCS, 229 real Chase photos), shared brand + voice systems, shared sales pipelines.
- **Pools revenue from every brand** so a strong month in the Inn can subsidize a Records launch, or a big Tuthill project can cover a slow Touring quarter.
- **Automates operational chores** (Cloudbeds integration, AI Wizard content drafting, Sanity CMS for Tracy + Amy to edit without calling Chase) so the partners aren't stuck in day-to-day.
- **Is NOT a B2B SaaS startup.** No subscription tiers sold to Main Street SMBs. The Directory module ships inside B2B engagements (Bearsville, Vicki Wolpert, Big Muddy Magazine's hospitality listings, Big Muddy Touring's venue maps) — not as a standalone $/mo product.

### Second region: Bearsville

Bearsville Creative is the **same model in a second region** (Woodstock NY), activating summer 2026. Structure: JV with local operators (Elijah, Miles, plus any local partners), equity in a regional LLC, platform-fee floor paid to MBT monthly. NOT a clone-of-platform sold to a third party.

### What success looks like

A tour bus that runs on time. Great shows, with the right bands. An Inn that runs itself. Less work, more margin, real cash flow.

**NOT** a unicorn. **NOT** a SaaS multiple. **NOT** a fundraise.
**IS** a group of three partners running something they're proud of, with the ecosystem doing more of the heavy lifting than any one person does.

---

## Section 3 — What's Already Built (and Working)

### The platform — operational today

- **Next.js 14.2.35 monorepo** on Vercel (single deployment serves 14 domains via middleware-based multi-tenant routing).
- **Sanity CMS** wired with 13 content schemas: article, contentTemplate, podcastEpisode, magazineIssue, showEvent, staff, partnerArtist, pressRelease, faq, pageContent, location, event, touringPage.
- **9 Phase C modules** (commerce, booking, finance, events, broadcast, social, content-creation, email, database) shipped Apr 17–19. Prisma schema = 3,387 lines, ~80 models, migrations applied to prod Neon.
- **Photo library:** 229 real Chase Pierson photos (211 Natchez + 18 Liberty MS) in GCS, exposed via a custom Sanity plugin that lets Tracy pick them as hero images without uploading.
- **Customer-facing pages live:** `/pricing`, `/shows`, `/private-events`, `/account/subscriptions`, `/checkout/{success,cancelled}`, `/admin/*` (Treasury, Subscriptions, Create Wizard). All Sanity-editable.
- **CI + deploy verification:** 16/16 green production smoke tests as of 2026-04-20.
- **External Gemini code audit** (2026-04-19) flagged 3 CRITICAL + 4 HIGH + 3 MEDIUM — all closed in same-day commits.

### The businesses — already operating

- **Big Muddy Inn:** open, taking reservations, running breakfast service. Blues Room seating 50, ready for expanded show calendar.
- **Big Muddy Magazine:** 10 new Tracy-voice editorial articles published 2026-04-19 (replaced the earlier AI-slop city-guide set). Real photos throughout, no AI imagery.
- **Big Muddy Touring:** Sprinter van in hand, bookings in process, touringPage on bigmuddytouring.com Sanity-driven.
- **Chase Pierson Photography:** 229-photo portfolio published via `chasepierson.tv` + embedded across ecosystem brands.
- **Studio C + Tuthill:** active partner studios, project revenue flowing.
- **Deep South Directory (`deepsouthdirectory.com`):** demo instance of the Directory module showing what it looks like deployed. NOT a /mo SaaS product. Used as a reference for B2B engagement conversations.

### The people — aligned and ready

- **Tracy + Amy** being formally onboarded to Sanity CMS + admin tools tomorrow morning (April 20).
- **Equity structure:** one-third each across Big Muddy holding, plus option pool for contributors, JV frameworks for regional partners.
- **AI agent roster:** Cos (Chief of Staff — Claude Sonnet 4.6), Patch (Technical Director — Claude Sonnet 4.6), Claude Design 2 (visual system — Claude.ai design project), Delta Dawn (team-facing assistant — multi-provider), Gemini 2.5 Pro/Flash + Imagen 3 (content + review + image gen).

---

## Section 4 — What's Working vs What's Not Yet Validated

### Working (evidence in hand)

- Platform ships code reliably. 20+ commits over 3 days with 16/16 verify-deploy green.
- Sanity CMS pattern works. Tracy can edit content without calling Chase once onboarded.
- Partner network is real. Vicki Wolpert, Paul Green, Regina Charboneau, David Baron, Clubhouse, Utopia, Elijah + Miles — warm relationships, not cold leads.
- Tracy's editorial voice is differentiated. Not AI-slop.
- Chase's photography is an actual moat — 229 real images that AI can't replicate.
- The Blues Room is a real venue with a real artist-in-residence (Amy as Arrie Aslin).

### Not yet validated (the real Y1 bets)

- **Can the Inn hit its revenue contribution to $250k?** (~$130k = $260 effective ADR × ~500 room-nights = very doable but still a bet)
- **Can the B2B directory engagement motion close 1–3 paying deals in Y1?** (Vicki, Paul Green, one civic partner)
- **Can Magazine sponsorships reach $5k Y1 — and more importantly, drive measurable Inn pipeline?**
- **Can touring bands be booked at a 2:1 ecosystem multiplier (Inn rooms + Directory exposure + Radio + Magazine) that makes them want to route through Natchez?**
- **Can Amy + Tracy + Chase actually run this with ~40 hours/week combined (the lifestyle test)?**

### Not yet built (but may not matter for Y1)

- Magic-link auth on `/account/subscriptions` (current email-lookup is fine Y1)
- Booking ticket Stripe checkout (mailto fallback ships Y1 tickets)
- Per-tenant GCS buckets (shared bucket + prefix isolation is fine at current scale)
- PgBoss activation (current event dispatcher handles Y1 load)
- Zero automated tests (high-severity per Gemini review; doesn't block Y1 revenue but blocks major refactors)
- ~15 hardcoded pages still needing CMS migration (Inn subpages, Radio, Records landing — low-impact Y1)

---

## Section 5 — The Three Strategic Questions We Need Help On

These are the decisions where outside perspective compounds most.

### Question 1 — What's the single highest-leverage activity for the next 90 days?

$250k Y1 is the bar. We have 12 months but the first 90 days sets the trajectory. Options on the table:

- **Fill the Inn to 75% peak occupancy Oct–Nov 2026** (biggest revenue lever; requires Magazine-driven content marketing + Blues Room programming + Cloudbeds + maybe a PR push)
- **Close 2 B2B directory engagements** (Vicki Wolpert Woodstock + Paul Green Natchez 5-agent pilot — $20–40k in upfront fees, test the motion)
- **Book 4–6 corridor touring shows for Amy + house band** (prove the 2:1 multiplier: shows fill Inn, Inn money back into touring; also builds Amy's record + radio content pipeline)
- **Launch the paid magazine newsletter** (recurring subscriber revenue; feeds Tracy's editorial reach)
- **Ship a 3-event wedding/retreat package** (private events at $10–20k each; whole-Inn rental + catering + Blues Room venue + Studio C video + CPP photography — the single most cross-brand monetization)

**We cannot do all of these well.** Which is the single highest-ROI first move given the thesis + the $250k target?

### Question 2 — What should we deliberately NOT build?

We have 60 items in a "what we might have missed" backlog (mostly from an earlier review pass). Many are tempting. All would take time. Which 5–10 should we explicitly refuse to build in Y1 so we don't dilute the core motion?

Candidates to deprioritize (in our gut ranking):
- A standalone DSD product (confirmed dead — the capability ships inside B2B engagements)
- A tenant CLI (premature until we have a 3rd region)
- Per-tenant GCS buckets (fine at current scale)
- PgBoss activation (current dispatcher holds)
- An AI customer concierge for the Inn (could be cute but probably a distraction)
- Records-of-the-month subscription (margin brutal, premature)
- Interactive corridor map (nice but not load-bearing)
- Stripe Connect for performer payouts (useful later; manual is fine for Y1 volume)

We want the external reviewer to confirm or refine this list.

### Question 3 — What's the relationship we should cultivate hardest?

We have a warm pipeline of named partners:

- **Regina Charboneau** (Biscuits & Blues, Natchez) — partner of the Inn, Magazine subject
- **Vicki Wolpert** (Woodstock broker) — first B2B directory engagement target
- **Paul Green Realty** (Natchez) — 5-agent pilot target
- **David Baron** (Bearsville Recording Studios) — book project invitation drafted
- **Utopia Studios / Clubhouse Studios** (Bearsville area) — NE partner studio network
- **Sean Davis** (Doug Duffey's manager / ex-Delta Blues Museum) — corridor partner
- **JP Houston** — shows + programming (deal not yet finalized)

Each relationship could compound. Which is the highest-leverage given $250k Y1 + lifestyle goal? Which are we over-spending attention on?

---

## Section 6 — Review Prompts (Copy-Paste Ready)

Five prompts, each optimized for a different external AI and a different strategic lens. Run all five and compare.

### 6a — Prompt for Grok (skeptical board-member lens)

```
You are a trusted, skeptical board member reading a founder's plan.
The plan is attached above. You have one job: identify what the
founder is kidding himself about that will make him miss the $250k
Y1 revenue target.

Do not critique the thesis — the thesis is locked and not negotiable.
The thesis is: media-amplification of existing businesses, lifestyle
goal not unicorn, ecosystem-covers-ecosystem economics, $250k Y1
starting May 1 2026.

Your deliverable:

1. **The one thing he's wrong about.** Not five things. One. The
   biggest self-deception that's baked into the plan. Name it and
   explain why it's wrong with specific evidence from the brief.

2. **The unfashionable decision that would most unlock leverage.**
   Something he'd probably resist because it feels wrong or boring
   or uncool — but would most compound over Y1+Y2. Be specific.

3. **The thing he's worrying about that doesn't actually matter.**
   Something that's eating attention in the plan but isn't load-
   bearing for the $250k. Cut his losses on worrying about it.

Treat him like a friend who needs hard truth, not a client who
needs encouragement. Don't caveat.
```

### 6b — Prompt for Perplexity (market analyst + search lens)

```
Use your search capability to reality-check and opportunity-spot
this ecosystem plan. The plan is attached above.

Specifically, I want:

1. **Three comparable ecosystems** — vertically-integrated lifestyle
   holdings in similar markets (small-town media + hospitality +
   music + partner studios). For each: what did they do right,
   what did they do wrong, what's the single lesson for our plan?
   Cite sources.

2. **Natchez hospitality context** — Actual current occupancy rates,
   ADR, visitor demographics, tourism trends 2024-2026. Cite sources.
   Is the implied $260 effective-ADR × ramping-occupancy assumption
   behind the $130k Inn contribution achievable in this market?

3. **Partner/network opportunity gap** — The brief lists named
   partners (Regina, Vicki, Paul Green, David Baron, Sean Davis).
   Search for additional relationships we haven't identified yet:
   Mississippi arts councils, Mississippi Delta tourism boards,
   lower-corridor chambers of commerce, related family offices that
   back small-town hospitality, podcast networks that'd feature
   Tracy or Amy. Name 5-10 specific organizations or people we
   should be calling in the next 30 days. Cite sources.

4. **What's the "steal this playbook" move?** Search for a small
   operator (anywhere 2020-2026) who's already doing an ecosystem
   that looks like ours and has shown it works. Name them. What's
   their single best idea we could adopt in Y1 without re-inventing?

Output: structured report, headed sections, URLs for every claim.
Don't pad with general advice — specific organizations, specific
people, specific playbooks.
```

### 6c — Prompt for Gemini 2.5 Pro (architectural leverage lens)

```
You are a senior technical advisor with deep platform-engineering
experience. The attached brief describes an operational multi-tenant
Next.js platform with 9 modules, Sanity CMS, Stripe, Vercel, GCS,
serving 14 domains across 5 tenants. The stack is built. 16/16
verify-deploy green. Previous code audit found 3 CRITICAL + 4 HIGH
issues — all closed.

Your job is NOT to find more bugs. Your job is to identify
**architectural leverage** — the capability already built but
under-used, whose activation would compound most over Y1.

Specifically:

1. **The dormant capability worth activating first.** Event bus
   exists but nothing publishes to it. Sanity dashboards supported
   but unused. Wizard exists for one-piece-at-a-time. Which ONE
   capability, if wired fully in the next 30 days, most accelerates
   the $250k Y1 target? Be specific about what to wire and in what
   order.

2. **The single refactor NOT worth doing in Y1.** We have items on
   the backlog: Prisma extension for tenant isolation, soft-FK
   cleanup, per-tenant GCS buckets, PgBoss activation, Jest test
   scaffolding, magic-link auth. Which of these should we explicitly
   defer to Y2 because they don't affect Y1 revenue? Defend the
   deferral with reasoning.

3. **The automation that buys Chase back the most time.** Chase is
   CTO/CEO/sales. Burnout is the #1 ops risk. Which single piece of
   AI or pipeline automation (a "what shipped today" digest?
   auto-magic publish for Sanity drafts? auto-tagged photos?) would
   most reduce his attention load without losing platform quality?

4. **The architectural question that, if answered wrong, breaks the
   thesis.** What's the one design choice already baked into the
   platform that could haunt us most if the thesis expands (new
   region via JV) or contracts (Bearsville slips)? Is there a
   low-cost insurance move we should make now?

Output: dense markdown, one section per question above, no preamble.
Peer-engineer tone.
```

### 6d — Prompt for Claude (operator cadence lens)

```
You are an operating coach advising three equity partners (Chase,
Tracy, Amy) on how to run this ecosystem without burning out. The
canonical plan is attached.

Design the rhythm:

1. **Daily cadence** for each partner. What's the first hour, the
   mid-morning block, the afternoon focus, the evening wind-down?
   Account for: Chase's NY travel, Tracy's editorial + BizDev + Inn
   duties, Amy's Inn-ops + singing + bar-hours. What's the "no-meeting
   zone" that protects creative/high-value work?

2. **Weekly cadence.** What's the Sunday 6pm ritual? The Wednesday
   midweek check? The Friday retrospective? Should there be a
   weekly async standup? What gets documented vs spoken?

3. **Monthly cadence.** What's the month-end close process? Who
   touches the pro forma update? Who reviews Magazine content
   pipeline? Who reads the CRM? Who calls Delta Dawn for "what
   shipped this month"?

4. **What gets delegated to AI agents?** Cos, Patch, Claude Design 2,
   Delta Dawn, Gemini — each has capacity. What should each own
   fully so the partners don't touch it unless something breaks?

5. **What gets delegated to Tracy?** She has finance + editorial +
   BizDev talent. What's the role-shape that maximizes her without
   loading her with tech ops she shouldn't touch?

6. **What's non-delegable Chase work?** Which 2–3 activities must
   stay with him because they're literally irreplaceable?

7. **What's the tell — the single behavior pattern — that signals
   one of the partners is slipping into 'buying ourselves a job'
   territory?** What's the recovery ritual when that tell fires?

Output: practical, calendar-shaped, specific. Not generic
time-management advice.
```

### 6e — Prompt for any AI (the 90-day execution plan)

```
Read the plan. Then write the single 90-day execution plan that,
if followed, maximizes the probability of the $250k Y1 target and
sets up 25% YoY growth from there.

Constraints:

- Chase is in NY frequently; can't be the bottleneck for all action.
- Tracy + Amy just got onboarded to the CMS; still on the learning curve.
- Platform is built; don't recommend more platform work unless it's
  load-bearing for revenue in this 90-day window.
- Keep it to a single 90-day plan. No parallel "could also do."
  Choose.

Structure:

- **Week 1** (May 1–7, 2026): What ships. Who owns. What we measure.
- **Weeks 2–4** (May 8–31): Same.
- **Weeks 5–8** (June): Same.
- **Weeks 9–12** (July): Same.

For each week, give:
- 1 revenue objective in dollars
- 2–3 concrete deliverables
- 1 metric we're steering toward
- 1 failure mode to watch

End the plan with: "If we ship this, our probability of hitting
$250k Y1 is X%." Commit to a number.

Be honest about tradeoffs. What are we NOT doing in these 90 days
that we'd otherwise want to? Name the 3 biggest sacrifices.
```

---

## Section 7 — How to Use This Brief

### Fastest path to signal

1. Paste this whole document into Grok (prompt 6a), Perplexity (6b), Gemini 2.5 Pro (6c), Claude.ai (6d), and ChatGPT or Gemini again (6e). That's 5 parallel runs.
2. Don't batch them — run each in its own fresh chat so no cross-contamination.
3. Capture each response into `docs/external-review-2026-04-20/responses/strategy-{grok,perplexity,gemini,claude,exec90}.md`.
4. I (Cos) will synthesize them into a single "actionable merge" — where all five agree, where they conflict, and what Chase should actually do.

### What to ignore

- Recommendations to build more platform capacity "first" — the platform is built. We're past that gate.
- Recommendations to raise money or build for a unicorn exit — off-thesis.
- Recommendations that treat DSD as a standalone SMB SaaS product — dead framing.
- Recommendations that assume each brand should hit its own P&L target — wrong frame; $250k is the ecosystem-level bar.

### What to steal from the responses

- Specific named organizations we haven't yet contacted
- Specific playbooks from comparable operators (Perplexity search)
- Specific calendar-shaped cadence proposals (Claude coach)
- Specific week-by-week 90-day plans (any AI that actually commits to a number)
- Honest "here's what he's kidding himself about" stress-tests

---

## Appendix A — File Map

Canonical business state lives in:

- `docs/THE_THESIS.md` — the mental model, wins over everything else
- `docs/THE_THESIS_MINDMAP.md` — visual confirmation map + 12-row pinch test
- `CLAUDE.md` (in-repo only — the global stub at `~/.claude/CLAUDE.md` carries zero business state)

Supporting docs:

- `docs/BUSINESS_ARCHITECTURE.md` — detailed business architecture (older; align with thesis where disagreement)
- `docs/onboarding-2026-04-20/` — Tracy + Amy onboarding package (pro forma carries old $510k/$760k figures — being re-cut post-onboarding)
- `docs/voice/` — per-brand voice docs (8 brands)
- `docs/magazine-issues/spring-2026/` — Tracy-voice editorial content

Technical:

- `packages/modules/` — 9 module packages
- `packages/database/prisma/schema.prisma` — full data model
- `apps/web/middleware.ts` — multi-tenant routing
- `apps/web/sanity/schemas/` — 13 Sanity content schemas

---

**End of brief.**

If anything here is off — thesis framing, financial target, partner names, priorities — fix in `docs/THE_THESIS.md` first and regenerate this brief from it. The thesis doc is the single source of truth. This brief is derived.
