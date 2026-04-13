# Chief of Staff — Strategy Brief

**For:** The Chief of Staff agent (`.claude/agents/CHIEF_OF_STAFF.md`).
**From:** Chase Pierson.
**Date:** 2026-04-11.
**Deliverable:** A complete enumeration of everything that needs to happen for Hillbilly Dreams Inc to be successful, structured so it converts directly into an Asana board.

---

## The question I want you to answer

**What needs to happen — specifically, in order, owned by somebody — for Hillbilly Dreams Inc to be a successful operating company by the end of 2026?**

Not a vision document. Not a pitch deck. A work plan. Every item on the list has to be something a human or an agent can actually do, with a clear definition of done.

---

## What I mean by "successful"

HDI is successful when all of the following are true at the same time:

1. **Big Muddy Touring is booking real shows and the Inn is full on show nights.** The touring engine produces artists, transport, and promotion. The Inn converts that traffic into lodging, F&B, and bar revenue.
2. **Big Muddy Magazine is publishing regularly and the editorial calendar is running on its own.** Tracy owns it day-to-day. Chase produces the photography. It doesn't live in Chase's head.
3. **Biscuits & Blues (Regina Charboneau) is dogfooding the platform and loving it.** One real external client who can vouch for the product and the process.
4. **The Big Muddy Inn is operating as a hospitality business with repeatable processes.** Amy owns front-of-house. Tracy owns back-of-house and finance. Neither of them has to text Chase to figure out what to do on a Tuesday.
5. **Deep South Directory has paying external customers** — not just dogfood. Small numbers are fine. The point is that the product has proven itself with real money from people outside the HDI family.
6. **Bearsville Creative activates in summer 2026** with Elijah (and Miles) running it as a Northeast node. Real production work, real revenue, real handoff from Chase.
7. **The money works.** Revenue is tracked. Expenses are controlled. Tracy can run the P&L without me. We're not dying.
8. **The team knows what they own.** Nobody wakes up wondering what they're supposed to do. Nobody is waiting on Chase to unblock them on something Chase shouldn't be in the middle of.
9. **The platform runs on the rails.** No frantic deploys. No broken links. No "I'll fix it later" scattered across 15 domains. The Glass Engine supports everything the humans are trying to do.
10. **Chase is working on the things only Chase can do** — architecture, product, vision, photography, deals — not doing other people's work because the other people don't know what their work is.

If those ten things are true, HDI is successful. Your job in this exercise is to enumerate what has to happen to get there.

---

## Constraints I want you to respect

- **Time horizon is end of 2026** — not a ten-year plan. Everything you write should land before December.
- **The team is four people.** Chase, Tracy, Amy, JP. Elijah and Miles are coming online for Bearsville. That is the headcount. No "hire a team of five for this."
- **Cash is not unlimited.** Tracy is the equity partner who manages finance. Everything should be able to be done inside a realistic operating budget.
- **Honest claims only.** Never describe something as done when it isn't. Never describe a feature as shipped when it's half-built. If you don't know whether something is done, say so and name it as a verification task.
- **No vanity work.** If it doesn't move one of the ten success criteria, it doesn't go on the list.
- **No new brands, domains, or products.** We have fourteen domains already. The product surface is locked. If you find yourself inventing a new brand, stop and ask why.
- **Chase is the bottleneck and the gatekeeper.** Every task that requires a decision routes to him, not around him. But also: the goal is to reduce how many things require Chase. Flag anything that could get delegated.

---

## What I want the output to look like

A document structured in exactly this shape, because this shape maps directly to Asana:

```
# HDI 2026 — The Work That Has To Happen

## Initiative 1: [name]
**Why it matters:** one paragraph, connects to the ten success criteria above
**Owner:** [person]
**Definition of done:** [specific, observable]
**Target date:** [month]
**Current state:** [what exists, what's missing, what's broken]

### Streams
- Stream 1: [cluster of related tasks]
  - Task: [specific, owned, with a definition of done]
  - Task: ...
- Stream 2: ...

## Initiative 2: ...
```

Each initiative becomes an Asana project. Each stream becomes a section inside that project. Each task becomes an Asana task with an owner and a due date.

**I expect somewhere between 8 and 15 initiatives.** Not 50. Not 3. If you give me 50 you haven't prioritized. If you give me 3 you haven't enumerated.

Under each initiative I expect somewhere between 2 and 6 streams. Under each stream, somewhere between 3 and 10 tasks. Do the math: the total deliverable is somewhere between 150 and 500 discrete tasks across the whole year. That's real but not overwhelming.

---

## Coverage I expect you to include

At minimum, your enumeration must cover:

1. **Big Muddy Touring** — booking, transportation (Sprinter van, future bus), artist pipeline, promotion, corridor routing, house band assembly, first three shows, European Destination Session pilot
2. **Big Muddy Magazine** — editorial calendar, first feature article, Regina Charboneau profile, photography workflow, print production, distribution, Tracy's handoff
3. **Big Muddy Radio** — 24/7 streaming stability, FM transmitter deployment, show programming, DJ drops, content rotation, Icecast + OpenBroadcaster infrastructure health
4. **Big Muddy Records** — Amy Allen catalog release, Kate Skwire deal, Mechanical Bull re-releases, DistroKid setup, BMI/ASCAP registration, distribution pipeline
5. **Big Muddy Entertainment** — the one-pager, the entertainment pitch, the talent search, community credits program
6. **The Big Muddy Inn** — daily ops, guest experience, bar operations, housekeeping protocol, liquor compliance, room readiness, show night logistics
7. **Deep South Directory** — product readiness, walk-in sales kit, onboarding flow, first external customer, first paying customer, pricing enforcement, listing curation
8. **Biscuits & Blues (Regina Charboneau)** — external dogfood client, onboarding, feature article, magazine coverage, directory listing, testimonial
9. **Bearsville Creative / Studio C / Tuthill** — Elijah's custodianship, Hudson Valley broker pipeline, Bearsville summer activation, Studio C job queue, Tuthill product buildout, Miles onboarding
10. **The platform (MBT / the Glass Engine)** — multi-tenant stability, admin dashboard usability, Delta Dawn, photo pipeline, Content Studio, Stripe integration, honest-claims gate, Prisma migration hygiene, cron jobs, QC rules enforcement
11. **Finance + legal + entity hygiene** — FarleyPierson LLC, HDI incorporation, Tuthill 1065, Stripe account, insurance, bookkeeping system, IRS installment plan, Q2 report gaps
12. **Team operations** — onboarding docs for Tracy/Amy/Elijah/Miles, clear role boundaries, the communications policy, Asana discipline, daily rhythm, weekly cadence, monthly review
13. **Chase's personal throughput** — photography production, gallery curation, print pricing, the Chase Pierson Photography storefront, the Sovereign Pi product line if it survives the cut

For each area, tell me:
- **What exists today.** Be specific. Name files, pages, systems.
- **What's broken or half-built.** Be brutally honest.
- **What doesn't exist yet but has to.** Enumerate the missing pieces.
- **Who owns the work** — and if the owner doesn't exist yet, name the hiring or training task that comes first.
- **How we'll know it's done.**

---

## What to leave out

- Vesper / the omni-agent blueprint. That's backlog, not 2026 work.
- Any "phase 2" or "future" labeling — if it's not 2026, delete it.
- Agent-building for its own sake. Agents only get built if they unblock a human or a revenue path.
- Nostalgia tasks from Q1 (VR rooms, Google AI Studio agents, the Director Station, DMX lighting, projector integration). If it's not on the path to one of the ten success criteria, it doesn't survive.
- Any reference to Scan2Plan, S2PX, Owen Bush. That chapter is closed.

---

## Ground truth sources

Before you write the strategy, read:

- `docs/BUSINESS_ARCHITECTURE.md` — the three-layer model
- `docs/BIG_MUDDY_MEDIA_PLAYBOOK.md` — cadences and promises for each brand
- `docs/HDI_BRAND_HIERARCHY_ANALYSIS.md` — entities, cap table, revenue
- `docs/ASANA_POLICY_AND_PROCEDURE.md` — how the work lands in Asana
- `docs/ASANA_ONBOARDING.md` — how the team opens their daily list
- `.claude/agents/ASANA_COORDINATOR.md` — how tasks are written and routed
- `.claude/agents/CHIEF_OF_STAFF.md` — your own mission (this document supersedes the outdated priority stack at the bottom of that file)
- `.claude/agents/QA_CHASE.md` — what ships and what doesn't
- `memory/feedback_chase_voice.md` — the voice every task has to match
- `memory/project_mbt_pricing_tiers.md` — the locked DSD pricing
- `memory/project_operator_split.md` — who runs what, day vs night

If any of these contradict each other, flag the contradiction in your output. I'd rather know about it now than six weeks from now.

---

## Format rules

- Plain markdown. No emoji. No all-caps urgency. No pressure language. Match the Asana Coordinator's voice doctrine because this document becomes Asana tasks.
- Numbers are specific. "Book three shows by May 15" not "book several shows soon."
- Every task has an owner. If the owner is "TBD," that's a task to assign an owner, named explicitly.
- Every initiative has a one-paragraph "why it matters" that ties back to the ten success criteria. If you can't write the paragraph, the initiative doesn't belong on the list.
- End the document with a **Roll-up table**: one row per initiative, columns for Owner, Target date, Definition of done, Status. This becomes the master dashboard.

---

## What happens after you deliver this

1. I read your output end-to-end. I argue with anything I disagree with.
2. We lock a final version.
3. The Asana Coordinator converts the locked version into Asana projects, sections, and tasks. One sweep. One batch. No dribble.
4. The daily 4pm cadence starts running against the new board.
5. Every task has a home. Nothing falls through the cracks. I stop being the bottleneck.

Your job is Step 1 — the enumeration. Take it seriously. Do not give me a vision document. Give me a work plan.

Go.
