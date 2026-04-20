# The Thesis

**Read this before you read anything else.**

If anything in this repo's docs, code comments, memory files, or generated reports contradicts the model below, **this file wins.** Captured 2026-04-19 from Chase verbatim, lightly edited for written form.

---

## What this actually IS

This is **not** a traditional bundle of independent businesses being scaled.

It is a **media-amplification strategy applied to existing businesses** that already exist independently and that we already operate. The technology and brand infrastructure (MBT, the platform, the cross-brand tooling) is built so that:

1. The existing businesses cost less to run together than they would separately.
2. Each business borrows audience, distribution, and sales effort from the others.
3. The lifestyle the partners actually want is supported — not replaced by — the work.

The exit goal is **not** building a unicorn. It is having a rich, exciting life while three equity partners run something they're proud of, with the ecosystem doing more of the heavy lifting than any one person does.

> "We don't want to create a shit ton of work for ourselves. We want to create enough that we can be comfortable and have a rich, exciting life — without buying ourselves a job."

---

## The existing businesses being amplified

### Tracy Alderson-Allen
- **Big Muddy Inn** — already operating. **Break-even is the minimum threshold of success. Profit is the goal.** We push occupancy, ADR, whole-Inn rentals, Blues Room ticket sales, private events — all of it — to be genuinely profitable, not just covering costs. **But there's a ceiling:** we won't sacrifice quality of life to make an extra million dollars. At the point where additional profit requires burning out, we stop pushing. Between break-even and that ceiling is where we work hardest.
- **Big Muddy Magazine** — Tracy's editorial vehicle. The framing is "Mississippi Martha Stewart" — she gets a real platform for her voice. The Magazine's job is twofold: market the Inn AND give Tracy editorial reach. Not optimized for ad revenue.
- **Business development + sales for Chase Pierson Photography** — Tracy is taking on the BizDev/sales/management for the photography business. Real role, real revenue line, named here so it doesn't get lost.

### Amy Allen
- **Amy is a singer with a band.** She performs publicly as Arrie Aslin (artist-in-residence at the Inn). Big Muddy Touring + Big Muddy Records + Big Muddy Radio exist primarily to **support her career** — give her tour infrastructure, a label, a distribution channel.
- **Ancillary effect:** the same infrastructure that supports Amy can support OTHER bands touring through the corridor. That generates additional revenue (booking fees, room nights at the Inn, merch margin, record sales) and incidentally lifts the music economy of the Deep South.
- **Inn + bar day-of operations** — also her domain.

### Chase Pierson

**Who he is (the right framing for bios, press, partner decks):**

> Business executive + media executive + photographer, with a portfolio of existing production companies he's bringing into the ecosystem to leverage and amplify.

**Not:** "CEO/CTO/Showrunner" — that's startup-tech shorthand and undersells the actual portfolio. The accurate framing is an experienced operator with multiple live businesses being amplified by shared infrastructure.

**The existing portfolio he brings:**
- **Chase Pierson Photography** — established photography business, 6-year $100k+/yr track record, expanding into Natchez + the Deep South via Tracy's biz dev.
- **Studio C Video** — video production company (now offering video services alongside photography). Elijah came on as a partner last year. Counter-seasonal with CPP (NY peak May–Oct, Natchez peak Oct–April).
- **FarleyPierson** — the **name is being retired.** Two options:
  1. Keep the underlying NY LLC, rename it (TBD).
  2. Close the LLC entirely.
- **Future partner studios** (Tuthill Design, others) — joining the ecosystem on similar amplify-don't-acquire terms.

**Plus:** operating-layer role on the MBT platform (build, architecture decisions, technical direction) — but that's the platform, not his headline identity.

### Partner studios — Studio C Video + Tuthill Design

These are **not third-party SaaS customers and not acquisition targets.** They are existing creative production companies being amplified inside the ecosystem the same way Tracy's Inn and Amy's singing career are amplified.

**What MBT does FOR Studio C + Tuthill:**

1. **New market expansion.** MBT brings Natchez + the Deep South corridor as a net-new market. Tracy's BizDev role extends to both partner studios. They get leads they wouldn't have earned on their own.
2. **New customers.** The Big Muddy ecosystem (Inn, Magazine, Touring, Records, Radio, Blues Room) continuously generates creative work that needs production. Studio C shoots Blues Room recordings, wedding package hero content, Magazine visuals. Tuthill handles brand assets, print pieces, logos.
3. **Shared platform resources.** Sanity CMS, GCS photo library, AI tooling, brand voice systems, sales pipelines — infrastructure they don't have to build themselves. This is load-bearing for their ability to scale.
4. **MBT is a paying customer of theirs.** The platform + the brands buy ongoing video + design work. This is a real revenue line for them, not a favor.
5. **Tracy + Amy as extended team members.** Tracy does BizDev + sales for photography AND video services. Amy brings artist-in-residence + Inn hospitality into content that Studio C shoots. They're not just Big Muddy partners — they're part of the team helping Studio C and Tuthill grow.

**What Studio C + Tuthill bring TO the ecosystem:**

- Existing client bases (NY-heavy; some crossover into Deep South opportunity)
- Production capacity that Big Muddy brands can't economically build in-house
- Creative quality that amplifies every customer-facing touchpoint
- Partnership equity in the model, not just vendor relationships

**The framing in the partner conversation:** MBT isn't "selling" Studio C or Tuthill a platform. They're being invited to share the amplification ecosystem Chase is already in. The deal is mutual amplification — MBT helps them grow, they strengthen MBT's output quality, both benefit from shared sales and infrastructure.

**Commercial structure TBD and conversation-specific.** Options range from revenue share on MBT-originated deals, to licensing / retainer structures, to equity positions in a future holding entity. The framing above is the positioning; the structure is the negotiation.

---

## How MBT (the platform) fits

MBT is the tech and brand infrastructure layer. Its purpose:

- **Make the ecosystem cost less than the sum of its parts.** Shared CMS (Sanity), shared hosting (Vercel), shared photo library (GCS), shared brand systems, shared sales pipelines — so any one business's run-rate is lower than running it alone.
- **Top-line revenue from across the ecosystem flows into one place** so it can be redeployed against costs in any other part of the portfolio. Inn is overperforming? That subsidizes Records launching. Touring has a strong quarter? That subsidizes Studio C's slow month.
- **Automate the operational chores** so partners don't get stuck in the day-to-day. Cloudbeds API + automated marketing for the Inn is the model — give Tracy + Amy back their nights.

MBT is **not** a B2B SaaS startup chasing a SaaS multiple. It's the operating layer of an ecosystem of businesses we run.

---

## The Directory is a CAPABILITY, not a product

The Directory module (the entity-based filtered-views system) is a piece of platform capability that gets configured per use case:

- Big Muddy Magazine uses it for hospitality + tourism listings
- Bearsville Creative uses it for studios + production resources
- Vicki Wolpert uses it for her real-estate book
- Future Big Muddy projects use it for whatever they need (artists, venues, restaurants, etc.)

It is **not** a $25-$250/mo SaaS product sold to walk-in SMBs. The "Deep South Directory" walk-in pricing motion (deprecated 2026-04-19) was a misframing.

When third parties (Vicki, future brokers, future civic partners) get a Directory deployment, it ships as part of a **B2B engagement** — project + hosting/licensing fees, deal-sized, relationship-driven. Not subscriptions.

---

## The "second region" (Bearsville) framing

Bearsville Creative is the **same model in a second region**, not a clone of MBT-as-a-product sold to a third party. It amplifies an existing set of NE businesses (Studio C's NE work, Tuthill's NE clients, Elijah + Miles's local relationships, partner studios in Woodstock/Catskills) the same way Big Muddy amplifies Natchez businesses.

The relationship structure is JV (per the earlier convo with Gemini), not licensee. Equity in a regional LLC + minimum platform-fee floor.

---

## What success looks like

A tour bus that runs on time. Great shows, with the right bands. An Inn that runs itself. Less work, more margin, real cash flow.

Break-even is the minimum and is itself a success. Above it we work for real profit. The one thing we will not trade for another million dollars is the quality of life that made us want to build this in the first place.

The metric stack:

1. **Inn: we genuinely want profit. Break-even is the minimum (success). Above break-even we keep pushing — occupancy, ADR, whole-Inn rentals, tickets — because profit matters. The ceiling is quality of life: when pushing harder requires sacrificing the actual life the partners want to live, we stop pushing there and put attention elsewhere. Between break-even (floor) and the lifestyle ceiling is where the work happens.**
2. **Touring: Amy plays + other bands tour + the corridor music economy lifts.** Not a touring agency P&L target.
3. **Magazine: Tracy has a platform + Inn pipeline gets fed.** Not an ad-revenue target.
4. **Records / Radio: Amy gets a label + ancillary revenue from merch / records / sponsor packages.** Pre-revenue Y1 is fine.
5. **Photography (CPP) + Studio C + Tuthill: get amplified into a new market.** New leads from Tracy's biz dev. (FarleyPierson the name is being retired — see Chase Pierson section above for the LLC restructure-or-close decision.)
6. **MBT platform: keeps the rest of the costs low.** Saves us money is more important than makes us money.

---

## What this means for the pro forma

### The real Y1 financial target

**$250,000 in total revenue across all channels.** Fiscal year starts **May 1, 2026** and runs through April 30, 2027.

That number is the canonical Y1 goal. It supersedes any earlier number you might find in older docs (the brief, the onboarding pro forma, memory files all carried $510k base / $760k stretch — those were aspirational and wrong). $250k is the real bar, set by Chase 2026-04-19.

### Why $250k

$250k is the break-even number — the minimum threshold of success. Run-rate costs are roughly $250-260k/year. Hitting $250k means the ecosystem covers itself on its own steam.

**We actually want to be profitable, not just break even.** Break-even is the floor we commit to hit; profit is the real goal. Above $250k, every dollar is real profit — and we will work to generate it.

**The ceiling is quality of life, not revenue.** At the point where making more money requires sacrificing the life the partners are here to live, we stop pushing harder for money. That's the whole reason we're structured this way. Not every extra million is worth the attention it costs.

### Growth targets (out years)

**25% year-over-year revenue growth** is the target after Y1.

| Year | Period | Revenue target |
|------|--------|----------------|
| Y1 | May 2026 – Apr 2027 | **$250,000** |
| Y2 | May 2027 – Apr 2028 | $312,500 |
| Y3 | May 2028 – Apr 2029 | $390,625 |
| Y4 | May 2029 – Apr 2030 | $488,281 |
| Y5 | May 2030 – Apr 2031 | $610,352 |

25% YoY is intentionally modest — sustainable, doesn't require a fundraise, doesn't require burning out, doesn't force chase-the-unicorn decisions that betray the thesis. If the ecosystem outperforms, that's upside (more time, more cushion, more interesting projects); if it underperforms, the floor is ecosystem-covers-ecosystem so we're never in distress.

### What the existing onboarding pro forma still covers

The detailed monthly tables in `docs/onboarding-2026-04-20/01-business-case-and-pro-forma.md` are useful as a spread of where revenue COULD come from across the brands, but the totals there ($510k base / $760k stretch) are not the targets. They're projections of upside. The bar is $250k. If we hit $250k, we're succeeding even if no individual line hits its line-item projection.

**Action:** the pro forma gets re-cut post-onboarding into a portfolio model anchored to $250k Y1 ecosystem-level target, with the existing per-brand monthly tables retained as "where it could come from" rather than "what each must hit."

---

## What this means for tomorrow's onboarding

Don't strip out the existing onboarding docs. They're 90% right. Just frame the conversation with this thesis up front:

> "We're not building 9 separate startups. We're amplifying the businesses we already run — your Inn, your singing career, my photography, our partner studios — with shared technology and shared brand. The platform's job is to make the whole thing cost less and bring in more leads to each of you. We push the Inn revenue as hard as we can; cash-flow-positive is just the threshold above which we don't have to worry about it. Everything else gets the same energy — work to maximize it, but the ecosystem covers the ecosystem."

That's the lens. Then walk them through the Sanity Studio, the admin tools, the cheat sheet — as the operational interface for that thesis.

---

## What this means for AI agents reading this

If anything in any other doc, memory file, or generated report frames this as a "startup ecosystem," "vertically integrated SaaS play," or "B2B SMB walk-in sales motion" — **ignore that framing.** Replace it with the lens above. When in doubt, ask Chase.

This file (`docs/THE_THESIS.md`) is the canonical statement. CLAUDE.md, the pro forma, the operator manual, the external-review brief — all are downstream and may carry partial-incorrect framings until they're re-aligned.
