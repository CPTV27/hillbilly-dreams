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
- **Big Muddy Inn** — already operating. The bar for the Inn is **cash flow positive**. Once positive, the platform's job there is done; everything else is leverage.
- **Big Muddy Magazine** — Tracy's editorial vehicle. The framing is "Mississippi Martha Stewart" — she gets a real platform for her voice. The Magazine's job is twofold: market the Inn AND give Tracy editorial reach. Not optimized for ad revenue.
- **Business development + sales for Chase Pierson Photography** — Tracy is taking on the BizDev/sales/management for the photography business. Real role, real revenue line, named here so it doesn't get lost.

### Amy Allen
- **Amy is an abandoned singer** with serious chops. Big Muddy Touring + Big Muddy Records + Big Muddy Radio exist primarily to **support her career** — give her a band, a label, a distribution channel.
- **Ancillary effect:** the same infrastructure that supports Amy can support OTHER bands touring through the corridor. That generates additional revenue (booking fees, room nights at the Inn, merch margin, record sales) and incidentally lifts the music economy of the Deep South.
- **Inn + bar day-of operations** — also her domain.

### Chase Pierson
- **FarleyPierson LLC** — existing business
- **Studio C Video** — partner studio that benefits from being inside this ecosystem (gets directed work, editorial coverage, brand alignment)
- **Chase Pierson Photography** — Chase's personal photography business expanding its market into Natchez and the Deep South via Tracy's biz dev
- **Plus:** CTO/showrunner of the platform itself

### Tuthill Design
- Partner studio. Gets amplified by being inside the ecosystem (directed work, brand association). Not a third-party SaaS customer.

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

## What success looks like (in Chase's words)

> "Drive around in a tour bus, on time, play awesome shows, bring awesome bands down here, have the inn run itself, reduce the workload, get cash flow positive."

> "As long as it's cash flow positive, we're in really good shape with everything else. If it's making profit, that's even better. But we don't want to have to spend much time running that."

The metric stack:

1. **Inn: cash flow positive.** Not maximum revenue. Not maximum occupancy. Just CFP. Once there, leverage exhausted.
2. **Touring: Amy plays + other bands tour + the corridor music economy lifts.** Not a touring agency P&L target.
3. **Magazine: Tracy has a platform + Inn pipeline gets fed.** Not an ad-revenue target.
4. **Records / Radio: Amy gets a label + ancillary revenue from merch / records / sponsor packages.** Pre-revenue Y1 is fine.
5. **Photography (CPP) + Studio C + Tuthill + FarleyPierson: get amplified into a new market.** New leads from Tracy's biz dev.
6. **MBT platform: keeps the rest of the costs low.** Saves us money is more important than makes us money.

---

## What this means for the pro forma

The previous pro forma (`docs/onboarding-2026-04-20/01-business-case-and-pro-forma.md`) was modeled as 9 standalone businesses with individual P&L targets totaling $510k base / $760k stretch. That framing is **partially right + significantly wrong:**

- **Right:** the dollar amounts are reasonable starting estimates.
- **Wrong:** treating each line item as a business to optimize. The Inn's job is CFP, not max-rev. The Magazine's job is editorial reach + Inn pipeline, not ad-rev. The Directory line is wrong (was modeled as $106k of walk-in subscriptions; should be 1-3 B2B engagements + internal use of the module).

**Action:** the pro forma needs a re-cut as a portfolio model with ecosystem-level metrics, not standalone-business metrics. Tomorrow-after-onboarding task. Tracy + Amy don't need this re-cut for tomorrow — the existing pro forma is directionally fine for the onboarding conversation.

---

## What this means for tomorrow's onboarding

Don't strip out the existing onboarding docs. They're 90% right. Just frame the conversation with this thesis up front:

> "We're not building 9 separate startups. We're amplifying the businesses we already run — your Inn, your singing career, my photography, our partner studios — with shared technology and shared brand. The platform's job is to make the whole thing cost less and bring in more leads to each of you. Cash-flow-positive Inn is the floor. Everything else is upside that subsidizes the next thing."

That's the lens. Then walk them through the Sanity Studio, the admin tools, the cheat sheet — as the operational interface for that thesis.

---

## What this means for AI agents reading this

If anything in any other doc, memory file, or generated report frames this as a "startup ecosystem," "vertically integrated SaaS play," or "B2B SMB walk-in sales motion" — **ignore that framing.** Replace it with the lens above. When in doubt, ask Chase.

This file (`docs/THE_THESIS.md`) is the canonical statement. CLAUDE.md, the pro forma, the operator manual, the external-review brief — all are downstream and may carry partial-incorrect framings until they're re-aligned.
