# Measurably Better Things — Project Brief

*Chase's open source economics + software project. Not a startup. Not a venture. Not part of HDI's Y1 plan.*

**Updated 2026-04-16 — supersedes the venture-framed version.**

---

## What MBT Actually Is

MBT is Chase's personal project. Two halves, one project:

1. **A book and a body of writing** about economics. Specifically: how local economies get drained by extraction, how regional creative economies could work instead, and what the math looks like when you build infrastructure for them. Working title is *Outsider Economics* — that's already the imprint, the website (`outsidereconomics.com`), and the body of essays.

2. **An open source software platform** that demonstrates the thesis. The same technology stack that powers Big Muddy's properties — directory, magazine, radio, commerce, broadcasting, AI content, analytics — released as a free, public codebase that anyone can run.

The two halves reinforce each other. The book makes the argument. The software ships the argument. You can read why local economies should work this way, and you can install the tools to do it.

This is not a company. It's not seeking investment. It's not a startup. It's Chase's lifelong project — the thing he writes about, builds on, and uses to power his own work.

---

## Why This Framing Is Right

The previous version of this brief framed MBT as a venture with four strategic options — license slowly, open source, spin out + raise, or strategic acquisition. That framing was wrong because it treated MBT as a business decision when it's really a creative project.

Three reasons the open source + book framing fits better:

- **It removes the bottleneck.** A venture requires Chase to be a CEO/CTO/sales lead simultaneously. An open source project requires Chase to be a writer and maintainer. The cognitive load is dramatically lower and the time commitment scales to whatever bandwidth Chase has.
- **It earns authority instead of revenue.** A book + open source codebase is how thought leaders build legitimacy in their field. Linus Torvalds, DHH, Solomon Hykes — they all built influence through the same pattern. The revenue (consulting, speaking, eventually a publisher advance) follows the authority, not the other way around.
- **It opens optionality without forcing a path.** If a city, broker, or sales agent shows up wanting a custom version, the open source codebase + Chase's authority make that easy. If nobody shows up, the project still serves Chase's purpose.

---

## What Gets Built

### The Book / Writing Side

Already exists in skeleton form at `outsidereconomics.com`. The next moves:

- **Long-form essays** posted regularly — the kind that get shared on Hacker News, posted in subreddits, linked from substacks. Chase's voice is the differentiator (direct, no jargon, names the enemy).
- **A book manuscript** organized around the thesis. Whether it's self-published, found by an agent, or stays as a free PDF is a downstream question.
- **Talks and interviews** as the writing builds an audience. Podcasts, conferences, eventually keynotes.

### The Software Side

Already exists as a private monorepo at `~/hillbilly-dreams`. The next moves:

- **Extract the platform code** into a public GitHub repo. Strip HDI-specific config, generalize the multi-tenant architecture, write the docs.
- **Document the architecture** so a developer at another organization can understand and deploy it. README, architecture doc, deployment guide, contribution guide.
- **Pick a license.** Recommendation: **AGPL** (or similar copyleft) for the platform itself, MIT for any libraries that should be embeddable. AGPL keeps the network-effect benefit — if a competitor uses it as SaaS, they have to share their improvements. MIT for things we want broad adoption on.
- **Ship sample deployments.** A demo site, a "deploy your own" template, a video walkthrough. Make it concrete so developers can play with it.

### The Storefront

`measurablybetter.life` already exists. It becomes the home page for both halves:

- "Read the book" → essays, eventually book sales
- "Run the software" → GitHub link, docs, deployment guides
- "Hire Chase for a custom build" → contact form for the opportunistic deals

No SaaS pricing tables. No tiers. No salesy enterprise pitch. Just three doors: book, code, contact.

---

## Opportunistic Deals (Not a Pipeline)

If the right opportunity shows up, MBT can take on a custom build. These are bespoke contracts — not a productized SaaS offering.

**Example: Vicki Wolpert (real estate broker, pilot 1).** $500/mo starting, scaling to $1,500/mo. A custom directory + content engine for her brokerage. She becomes a case study and a paying client. Not the start of a sales motion — just a single deal that funds itself.

**Other plausible custom-build customers:**

- **A city or chamber** that wants the civic-commerce stack (Natchez Tourism Office is the closest). $5K-$25K setup + monthly retainer.
- **A real estate broker like Vicki** who wants her own corridor directory + content. $500-$2K/mo.
- **A regional creative cluster** — a music corridor in another state, a craft district, a tourism region — that wants what Big Muddy has. $5K-$50K depending on scope.
- **A nonprofit or foundation** that wants to fund a deployment in a specific region. Grant-funded build.

**The rules for opportunistic deals:**

1. **Inbound only.** Chase doesn't pitch. The book and the code do the marketing. People come to him.
2. **One at a time.** Maximum one active custom build at a time so it doesn't bleed into HDI bandwidth.
3. **Custom-priced.** No standard rate card. Each deal scoped on its merits.
4. **Open source benefit clause.** Anything Chase builds for a custom client gets contributed back to the open source codebase (with the client's data redacted). The client pays for speed; the world gets the improvements.
5. **HDI gets a perpetual free license.** Whatever Chase builds, HDI can use without paying. HDI is customer zero forever.

---

## Ownership and Legal

These questions get answered as the project develops, not now:

- **Who owns MBT legally?** Default: Chase personally, until/unless a custom-build deal requires structuring it as a separate LLC. Could live under FarleyPierson LLC for now.
- **HDI's relationship to MBT.** HDI uses MBT as its tech stack. If MBT ever monetizes externally, HDI has a perpetual free license to whatever it needs.
- **Contributor agreements.** If outside developers contribute to the open source codebase, standard CLA. Boilerplate, not custom.

None of these need to be resolved this year. They get resolved when there's a forcing function (first custom client, first contributor, etc.).

---

## What This Removes from the HDI Plan

Just to be explicit — pulling MBT out of HDI removes:

- The institutional sales pipeline ($27.5K Y1, $108K Y2 in the old plan)
- The "MBT Civic" line item
- The 90-180 day enterprise sales cycle as an HDI burden
- The Natchez Tourism Office deal as HDI revenue (it can still happen, but it's framed as an MBT pilot, not an HDI account)
- The El Dorado expansion target
- The third licensed market in Y3
- The pressure to do enterprise sales while running an inn and booking shows

What stays with HDI:

- Deep South Directory as a customer-facing product (HDI sells DSD to local businesses; MBT is the technology under the hood)
- All the music + media + hospitality verticals
- The Sprinter van, the venue directory, the wedding pipeline
- The 2:1 ecosystem multiplier

---

## What Chase Actually Does in Y1

For MBT specifically, in the next 12 months:

1. **Write essays.** Regular posts on `outsidereconomics.com`. The book emerges from the essays.
2. **Extract the open source codebase.** Public GitHub repo, clean docs, deployable template.
3. **Take Vicki Wolpert's pilot if she signs.** First custom deal, becomes the case study.
4. **Don't pitch.** Inbound only. The writing and the code do the work.
5. **Defer big decisions.** Legal entity, licensing structure, custom build pricing — handled when there's a real reason to handle them.

Time commitment: a few hours a week of writing, an occasional code commit, plus whatever the custom builds require if they happen. Not a full-time anything.

---

## What This Is Not

Naming the things MBT is **not** because the previous brief got several of them wrong:

- **Not a venture.** No raise, no investors, no board.
- **Not a SaaS company.** No tier pricing, no enterprise sales team, no MRR target.
- **Not a competitor to Townsquare or Birdeye.** Those are commercial SaaS plays. MBT is open source + custom builds.
- **Not a startup spin-out from HDI.** It's Chase's personal project that pre-dates and post-dates HDI.
- **Not on the HDI Y1 critical path.** HDI ships without MBT shipping anything new.
- **Not seeking acquisition.** If a strategic buyer ever appears, that's a separate conversation. Default is open source forever.

---

## Bottom Line

MBT is Chase's lifelong project. A book and a codebase that argue the same thesis from two angles — economics and engineering. Released as open source so anyone can build on it. Funded by HDI's operating revenue (because HDI uses it). Custom deals taken when they make sense, not pursued.

This is the right framing. It removes the bottleneck, it builds real authority, it preserves all optionality, and it doesn't compete with HDI for Chase's attention.

The previous "venture brief" is archived. This is the operating reality.

---

*Maintained alongside `docs/HDI_BUSINESS_PLAN.md` (the operating company) and `docs/hdi-review-board.html` (the visual review).*
