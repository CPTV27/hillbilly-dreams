# MBT Product Definition — SaaS + Service

*Locked 2026-04-30 by Chase. Supersedes any prior MBT product framing.*

## The product, in one sentence

Measurably Better Things is a **chatbot-first hybrid SaaS+Service** — a custom AI interface on top of the customer's own data, backed by a human service team that handles whatever the chat can't.

## The model

Three layers, all wrapped behind one chat surface. **Studio C runs all three.**

| Layer | What it is | Who runs it |
|---|---|---|
| **Software (S)** — the tech wrapper | OpenAI-style chat interface + Open Notebook holding customer data + custom dashboards built on demand + multi-agent routing | Studio C |
| **Data (D)** | The customer's own data, ingested in onboarding (docs, calendars, sales records, customer lists, whatever they have) | Studio C handles ingest + refresh |
| **Service (V)** — the human layer | A human team that resolves anything the chat can't — subscription mgmt, vendor coordination, "I need X done" requests | Studio C team + Cos / specialist agents |
| **Billing** | Token-based metering across both software and human work | Studio C |

**Studio C IS the tech wrapper + service layer + token billing engine.** MBT is the product brand. Studio C is the operating company that runs the product. (Resolves audit Open Question #1 — Studio C role: "implementation + admin vendor for MBT" expands to "the operating company behind the MBT product.")

## What the customer experiences

> They open a chatbot. They ask it anything. If the chat can answer (which it usually can, because it knows their data), it answers. If it can't, the request escalates to the service team, who handles it.

That's the whole product. No multi-page UI to learn. No setup wizards beyond onboarding. No "go file a ticket" friction.

## What the customer pays for — Token Pricing (locked 2026-04-30 evening)

The whole product is metered in TOKENS. Same unit, two prices:

| Token type | What it measures | Price tier |
|---|---|---|
| **Software tokens** | LLM tokens consumed by the chat (Claude / OpenAI / Gemini API usage) | Pass-through + margin (industry standard) |
| **Human tokens** | Service team time spent resolving escalations | Premium rate (multiples of software tokens) |

**Why human tokens:** Same chat interface. Same billing surface. The customer doesn't care whether the answer came from the model or from Tracy / Studio C / Cos / Chase — they care that the problem got solved. Bill them the same way for both.

**Why the human-token rate is high:**
- We're solving big problems on a fractional scale
- One escalation can resolve a $5K-$50K problem in 30 minutes of human time
- Customer would otherwise hire a $150K/yr ops person, an engineer, or a marketing agency
- Fractional access at premium rate is still 10-50x cheaper for them than full-time hires

**Operational implications:**
- Every escalation must log time (chat tracks the duration of human involvement)
- Every "ticket" closure produces a billable line item
- The chat UI shows a running token meter (software + human, separated) so customers see what they're consuming in real time
- No surprise bills — meter is always visible
- Optional caps + alerts ("notify me when monthly spend hits $X")

**Pricing tiers (locked 2026-04-30 evening):**

| Tier | Price | Models | Multi-agent routing | Human service | Onboarding | Who it's for |
|---|---|---|---|---|---|---|
| **Free** | $0 | Cheap/fast models (Haiku, Gemini Flash, smaller open-weights) | Limited (3-5 specialists exposed) | None | Self-serve | Tire-kickers, lead-gen |
| **Standard** | **$20/mo** | Standard models (Sonnet, GPT-4o, Gemini Pro) | Full registry (30+ specialists) | None included; pay-per-escalation at human-token rate | Self-serve | Individual users, sole operators |
| **Service** | **$100/mo** ⭐ TARGET SELL | Standard + premium models (Opus / GPT-5 when available) | Full registry | **Includes 30 min human-tokens + access to the human service layer** | Light onboarding | The customer sweet spot — small business owners, founders, solo operators who need real help |
| **Operator** | $200/mo | Premium models | Full registry | 1-2 hrs human-tokens + custom dashboards | Standard onboarding | Small teams, multi-property operators |
| **Business** | $500/mo | Premium + custom-tuned | Full registry + custom routing rules | 4-6 hrs human-tokens + workspace customization | Full onboarding included | Growing businesses, agencies |
| **Enterprise** | Custom | Premium + dedicated infra | Full registry + private specialists | Dedicated service team, SLA, volume discount | White-glove onboarding | Large customers, B2B platform deals |

**No steering. The customer picks. We explain the math.** (Locked 2026-04-30 evening per Chase: "It should be for every customer. We shouldn't be trying to steer them towards one or the other. Be like, 'Which one do you want?' If you want a little, just get the $99. If you eat a lot, get the big one, because it's cheaper.")

When a prospect signs up, the chat asks **how much extra stuff they need each month** — not "do you want our $100 tier?" The customer answers honestly, the chat surfaces the tier that matches the answer, and the math speaks for itself:

- **Need a little a month?** → Standard $20 fits (full router + standard models, no human service included; pay per escalation)
- **Need a real human in the loop?** → Service $100 (premium models + 30 min human-tokens included)
- **Use it heavily and want a better per-token rate?** → Operator $200 or Business $500 (bigger plans = cheaper per-unit human-token rate; the math literally rewards heavier usage)
- **Big team, custom needs?** → Enterprise

The honest sales line: *"If you don't know how much you'll use, start at $20. Move up when you hit the wall. Bigger plans cost less per unit of work — so heavy users save money by going bigger, not smaller."*

**No "RECOMMENDED" badge on the $100 tier in the UI.** No upsell pressure. Just the question, the math, and the customer's answer.

**The $20 tier still holds the line on the consumer software ceiling.** ChatGPT is $20/mo. Claude is $20/mo. Gemini Advanced is $20/mo. They all give you ONE model. Standard ($20/mo MBT) gives you the multi-agent router. Same price, more capability. We don't need to push it — the comparison does that for us.

**The Free tier is still the funnel.** Stripped-down chat, cheap models, limited router access. Most features visible-but-locked. The customer self-promotes when they're ready.

**Industry-metric scaling:** model quality, token cap, specialist count, human-token allocation, custom dashboards, multi-tenant isolation, SLA, support response time. Same playbook as every modern SaaS — we just have an additional axis (human-tokens) the others don't.

**Onboarding fee:** flat-rate setup to ingest data + build the customer's chat persona. Recoverable cost OR capitalizable depending on how Tracy structures it. Bundled into Operator+ tiers, paid separately for Standard upgrades that need data ingestion.

## Human-token rate scales DOWN as tier scales UP (added 2026-04-30 evening)

The higher your monthly tier, the cheaper your human-tokens beyond the included allocation. Customers paying for more access get a better deal on the labor itself.

| Tier | Monthly | Human-token rate (ops) | Human-token rate (specialist) | Effective discount vs Standard |
|---|---|---|---|---|
| Free | $0 | n/a (no human service) | n/a | — |
| Standard | $20 | $5.00/min | $10.00/min | baseline |
| Service | $100 | $4.50/min | $9.00/min | 10% off |
| Operator | $200 | $4.00/min | $8.00/min | 20% off |
| Business | $500 | $3.50/min | $7.00/min | 30% off |
| Enterprise | custom | $2.50–$3.50/min | $5.00–$7.00/min | up to 50% off, contract-dependent |

The bigger your monthly commitment, the more you signal you'll actually use human work — and the better we can plan the team's capacity. Customers reap the savings.

## Annual prepay = 20% off (added 2026-04-30 evening)

Pay for the year upfront, save 20% on the monthly subscription line. The human-token rate on usage beyond allocation is unchanged (annual customers already get the lower per-tier rate from the table above).

Math examples:
- Standard ($20/mo) → annual $192 (vs $240) → save $48/year
- Service ($100/mo) → annual $960 (vs $1,200) → save $240/year
- Business ($500/mo) → annual $4,800 (vs $6,000) → save $1,200/year

For Studio C, annual prepay is operationally cleaner — predictable cash, fewer churn cycles, easier to staff against. For the customer, it's a real discount that costs nothing if they were going to stay anyway.

## The stacked discount math (locked 2026-04-30)

Heavy users stack TWO discounts simultaneously:

1. **Tier-based per-unit discount** — bigger plans get cheaper per-minute human-token rates (Business pays $3.50/min ops vs Standard's $5/min — 30% off per unit of work)
2. **Annual prepay discount** — pay 12 months upfront, save 20% on the subscription line

Combined example — Business customer paying annually:
- Monthly subscription: $500 × 12 = $6,000/yr → minus 20% prepay = **$4,800/yr** (saves $1,200)
- Human-token usage at $3.50/min ops vs Standard's $5/min = **30% cheaper per unit of human work**
- Plus the bigger included human-token allocation (4-6 hrs vs Standard's 0)

**Net result:** the customer who actually uses MBT a lot pays less per unit of value than the one dabbling at Standard. The economics reward intensity. There's no "loyalty tier" theater — just stacked math.

Chase has been looking for a SaaS pricing model that does this honestly for a year. Most "annual discount" pricing flattens into a single line item. Most "tier discount" pricing only applies to the subscription, not the variable usage. Stacking both — and making both visible to the customer in the chat meter — is the differentiator.

## The sales rule, reinforced

> **"It is what it is. We don't have to sell it. We just say what it is and show examples."**

The chat doesn't pitch. The pricing page doesn't pitch. The Studio C service page doesn't pitch. We:
1. State the model (tiers, modules, token meter, stacked discount)
2. Show worked examples (see /docs/positioning/token-pricing-examples — 25 tasks with real software-token + human-token math + comparisons to freelancer alternatives)
3. Let the customer pick what fits their need

If a customer asks the chat "which tier should I get?", the chat asks back: *"How much extra stuff do you need each month? A little or a lot?"* Then surfaces the tier that matches. If they don't know, recommend Standard ($20) and tell them they can move up the moment they hit a wall — heavy users save money by going bigger, not smaller.

## Modular add-ons — On Demand Everything (added 2026-04-30 evening)

The base tier subscription buys the chat door. Customers add capability modules as they need them. Each module = a focused capability with its own monthly fee, often bundled with included human-tokens for the work that module needs.

**Marketing tagline:** *"Pay for what you need. Have all your problems solved."* — On Demand Everything.

### Module pricing tiers

| Module class | Monthly add | Includes | Examples |
|---|---|---|---|
| **Light modules** | +$20/mo | Chat capability + occasional automation | Email triage, reminders sync, calendar coordination, link-in-bio, custom prompts |
| **Standard modules** | +$50–100/mo | Chat capability + ~1 hr/mo human-tokens for the module's work | Bookkeeping ingest, customer support triage, lead-gen automation, social posting, weekly reporting |
| **Specialized modules** | +$200–500/mo | Chat capability + 3-8 hr/mo human-tokens + dedicated specialist on the queue | Video production, podcast editing, brand identity refresh, sales pipeline ops, recruiting screen, content engine |
| **High-touch modules** | +$500–2,000/mo | Chat capability + 10+ hr/mo human-tokens + dedicated multi-skill team rotation | Full social media management, ongoing PR, agency-of-record, custom ML model maintenance, dedicated CSM |

Why specialized modules cost more: they require humans with rare skills. A video production module needs editors, colorists, sound designers — that's not $5/min ops work, that's $10-15/min specialist work, plus equipment + software costs. The customer pays the real cost of the capability + Studio C's margin.

### Sample module catalog (illustrative — populated as modules ship)

- **Lead Gen** ($50/mo) — outbound email + qualifying chat + handoff to your sales workflow
- **Social Media** ($100/mo) — scheduled posts + engagement responses across 3 platforms
- **Bookkeeping** ($75/mo) — receipt categorization, monthly P&L, expense reports
- **Customer Support** ($100/mo) — first-line ticket triage + escalation routing
- **Content Engine** ($200/mo) — weekly blog post + newsletter + repurposed clips
- **Video Production** ($500/mo) — 4 short-form videos + thumbnails + posting
- **Podcast Production** ($300/mo) — edit + master + show notes + clip generation per episode
- **Recruiting** ($200/mo) — job posts + initial screening + scheduling
- **Inventory** ($75/mo) — stock alerts + reorder triggers + supplier comms
- **Analytics** ($100/mo) — auto-generated weekly + monthly reports
- **Brand Identity Refresh** (one-time $1,500-5,000 + $50/mo for ongoing tweaks)
- **PR / Press** ($500-1,500/mo) — pitch list + outreach + responses

### Why modules instead of one giant tier

Customers don't want to pay for things they don't use. A solo operator at the $100 Service tier might add Bookkeeping + Social Media for an extra $175/mo and skip everything else. A small business at Operator might add Content Engine + Customer Support + Lead Gen.

The chat is always the front door. Modules just expand what the chat can DO behind the scenes. From the customer's perspective: "I need this." → "We have a module for that. Activate it?"

### How customers shop modules

In the chat:
- Customer: *"Can you help me with my Instagram?"*
- Chat: *"You don't have the Social Media module activated. It's $100/mo and includes 3-platform scheduled posts + engagement responses. Want me to turn it on?"*
- Customer: *"Yes."*
- Chat: *"Activated. Tell me your handles and what kind of content you want to run."*

No procurement cycle. No sales call. No 30-day trial that turns into a 12-month contract. Just pay for what you need, the moment you need it. Pause when you don't.

## Interface choice — the customer picks where the chat lives (added 2026-04-30)

The chat is the engine. The interface is configurable per tier. Customers don't have to switch tools — we meet them where they already work.

| Interface | Tier | Where the chat lives |
|---|---|---|
| MBT web chat | Free / $20 / $100 | chat.measurablybetter.life |
| MBT terminal CLI | $20+ | `cos chat` in your shell |
| Apple Notes | $100+ | A thread in your Notes app, synced across devices |
| Apple Reminders / Tasks | $100+ | Escalations land as reminders |
| ClickUp | $200+ | Chat creates ClickUp tasks, syncs both ways |
| Notion | $200+ | Chat threads into Notion pages |
| Slack / Discord bot | $500+ | Chat is a bot in your team's channels |
| Custom interface | Token-priced per build | We design and build a UI that matches your brand and workflow. **Build cost is just a number of tokens** — small custom = few tokens, large custom = many tokens. Same billing rail as everything else. |

The custom interface is also token-billed. The build cost depends on the complexity of what's being built. A simple Notion-style sidebar widget = a few thousand human-tokens. A full white-labeled customer portal with multi-tenant isolation = a lot more. The customer sees the token estimate before approving the build, then watches the meter run during construction. No separate "engineering retainer" or "implementation fee" — everything in MBT is tokens, including the engineering itself.

Customers can also choose from a TEMPLATE GALLERY — 10 starting design templates produced 2026-04-30 (magazine narrative / visual manifesto / interactive widget / pure numbers / heritage journal / punchy social / show business analogy / honest cut / enterprise sell sheet / wildcard cost-oracle). Each becomes a workspace style they can adopt + customize.

The template tier is included in Standard+. The custom-build tier is Enterprise.

This is the pricing piece that's been missing from the MBT framing for months. Token pricing makes the product bill-able, the customer experience legible, and the service layer defensible.

## Why this works

1. **The chat is easy to ship.** OpenAI / Claude / Gemini APIs handle the model layer. Open Notebook handles the data layer. Custom dashboards are built per-customer on demand, not pre-spec'd.

2. **The service is where defensibility lives.** Anyone can stand up a chatbot. Few can stand up a chatbot that escalates cleanly to humans who actually resolve operational tasks. That's MBT's edge.

3. **It explains the existing infrastructure.** Open Notebook (we just decided to deploy), the agent ecosystem (router + 30+ specialists), Studio C as admin vendor — all of it ladders to this product.

4. **It scales naturally with the ecosystem.** Big Muddy Inn becomes the proof case (we run our own ops on this stack). Vicki Wolpert, Paul Green, etc. become external customers using the same stack.

5. **It absorbs vertical products like S2PX.** S2PX (Scan2Plan, the scanning-companies tool) was a standalone product post-Owen Bush dissolution. The MBT chat-and-service model converts it cleanly: scanning companies bring their existing data (scans, projects, clients), MBT wraps it in chat + service + token billing, and the offering becomes "you have all your scanning data — what do you want from it?" Marketing material, sales reports, scan insights, pricing help. **$500/mo platform + bundled human tokens, more available pay-as-you-go.** S2PX becomes a vertical deployment of MBT, not a separate product.

## Vertical deployments — the same chat, different customer data

The same chat + service + token model works for any vertical where customers have data they want to interrogate but no time to write SQL or analyze it themselves. Each vertical = a customer profile + a system prompt persona + a curated agent registry + appropriate human-token pricing.

| Vertical | Customer data | What they ask the chat | Pricing band |
|---|---|---|---|
| **Hospitality (Big Muddy Inn proof case)** | Cloudbeds reservations, calendar, payments, guest history | "What weekend should I push the Blues Room package?" / "Who's the best fit for the founders' suite?" | $20-100/mo |
| **Music / touring (Big Muddy Touring, future external)** | Booking calendar, artist contacts, venue history | "What's the routing for a Sept run through MS-LA?" / "Which agents work the corridor?" | $100-200/mo |
| **Scanning companies (S2PX absorbed)** | Scans, project files, client lists, deliverables, rates | "Give me a marketing piece for this scan" / "Show me revenue trends" / "How should I price this Boston project?" | **$500/mo + human tokens** |
| **Real estate brokers (Vicki Wolpert pilot)** | Listings, comps, client database, transaction history | "Draft a listing description" / "What's the right offer strategy here?" / "Who are my best referral sources?" | $200-500/mo |
| **Civic / Main Street programs (Paul Green pilot, original DSD framing)** | Local business directory, event calendar, member roster | "Write the monthly newsletter" / "Identify businesses that haven't engaged in 90 days" | $500-2000/mo |

Same product, same engine, same Studio C operating team. Different system prompts, different data ingest pipelines, different pricing reflective of the customer's willingness to pay.

**S2PX's specific transition path:** offer existing S2PX customers the MBT vertical deployment as an upgrade. "Same data, same workflows, plus you can ask the chat anything and get either an instant answer or a human handling it. $500/mo includes the platform and your monthly human-token allocation." Existing S2PX product can run in parallel for customers who want the standalone tool, or get sunset over 6-12 months.

## What this means for the existing docs

Updates needed across:

- **CLAUDE.md** — MBT product description should match this doc
- **BUSINESS_ARCHITECTURE.md** — re-cut or supersede; the "two products" (consumer AI + business marketing) framing collapses into one product (SaaS+Service)
- **THE_THESIS.md** — likely already aligned but verify
- **measurablybetter.life website** — front-page should explain SaaS+Service in plain English, not feature lists
- **Plan: Studio C** (just generated) — Studio C's role as the service team should be foregrounded
- **Plan: MBT** (not yet drafted — now has a clear spine)

## How this resolves the audit's open question #2

Audit's question #2 was: *MBT definition — ecosystem operating layer (THE_THESIS) OR licensed civic OS (BUSINESS_ARCHITECTURE) OR both?*

Answer: **Neither, exactly. MBT is a hybrid SaaS+Service product** that's built ON the ecosystem operating layer. The civic-commerce framing was a demo of one customer profile (Main Street programs). The product itself is more general — it works for any business that needs an AI chat + a service team behind it.

## What ships first (MVP)

1. **The chat works.** Any LLM API + the customer's data + Open Notebook backend.
2. **One escalation path works.** When chat can't resolve → Studio C / Cos / Chase gets the ticket and handles it.
3. **One custom dashboard exists.** For one early customer, hand-built. Sets the pattern.

That's it for MVP. Everything else — pricing tiers, multi-tenant infra, productized onboarding flow, dashboard builder — is iteration.

## What it is NOT

- Not a self-serve SaaS (the service layer is non-negotiable)
- Not consulting (the chat + data + dashboards do most of the work; service is for what's left)
- Not a chatbot platform (we build customer-specific chat experiences, not a platform other people build on)
- Not the deprecated $25/$50/$99/$250 "DSD walk-in" tier model (that was retracted 2026-04-19)

## Open questions for follow-up

1. Which LLM provider for the chat? OpenAI, Claude, Gemini, multi-provider router?
2. Open Notebook on Hetzner is the data layer for now — does it scale to 10 customers? 100?
3. What's the onboarding playbook? (Tracy + Studio C / Cos / Chase walking each new customer through data ingest)
4. Pricing — what does the first paying customer pay? Vicki Wolpert pilot is the natural test.
5. SLA — what's the service team's response time commitment?

These are the next decisions for the MBT plan deep-dive (sibling to the other 7 business plans).

---

*Source: Chase voice memo 2026-04-30. Captured to lock the definition before BUSINESS_ARCHITECTURE.md re-cut. Cos to cascade to other docs during the doc cleanup pass.*
