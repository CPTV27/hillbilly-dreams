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

**The $100 tier is the target sell.** Above the $20 software-only ceiling that ChatGPT/Claude/Gemini all sit at. Below the $200+ where customers expect dedicated humans. The sweet spot where you get **a router across specialist agents AND access to a human when you need one**. Competitors don't offer "talk to a human" at any consumer price — we make it the headline of the $100 tier.

**The $20 tier holds the line.** ChatGPT is $20/mo. Claude is $20/mo. Gemini Advanced is $20/mo. They all give you ONE model. Standard ($20/mo MBT) gives you the multi-agent router. Same price, dramatically more capability. Drives upgrade pressure to $100 once a user realizes they want to talk to a human.

**The Free tier is the funnel.** Stripped-down chat, cheap models, limited router access. Most features visible-but-locked. Every wall the user hits points to Standard ($20) or Service ($100).

**Industry-metric scaling:** model quality, token cap, specialist count, human-token allocation, custom dashboards, multi-tenant isolation, SLA, support response time. Same playbook as every modern SaaS — we just have an additional axis (human-tokens) the others don't.

**Onboarding fee:** flat-rate setup to ingest data + build the customer's chat persona. Recoverable cost OR capitalizable depending on how Tracy structures it. Bundled into Operator+ tiers, paid separately for Standard upgrades that need data ingestion.

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
