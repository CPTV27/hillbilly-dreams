## Battle-Readiness Audit — MBT chat-and-service product

*Drafted 2026-04-30. Voice: `docs/voice/admin-documentation-voice.md`. Anchored to `docs/positioning/mbt-product-definition-2026-04-30.md` + `docs/positioning/inverted-intelligence-2026-04-30.md`. Companion to `docs/audits/full-audit-2026-04-29.md`.*

---

## Overall verdict

**Red.** The chat MVP is technically alive at `/chat` and streams Claude responses end-to-end. But four of seven battle-ready objectives are Red, two are Yellow, one is Green-with-caveats. No paying customer can be put through this stack today without a live operator standing behind it.

**Headline:** what shipped 2026-04-29 is a *demo* of the inverted-intelligence thesis — not a *product* a Natchez customer can sign up for, pay for, and get value from without Chase / Cos / Patch in the loop.

| # | Objective | Score |
|---|---|---|
| 1 | Chat works without manual intervention | Yellow |
| 2 | Escalation path actually fires | Yellow |
| 3 | Pricing is implementable (Stripe + token meter) | Red |
| 4 | Story coherent across surfaces | Red |
| 5 | Team ready to handle escalations | Red |
| 6 | Operational basics work | Yellow |
| 7 | Pilot can be measured | Red |

The 3 highest-leverage gaps to close (in order):

1. **Wire `ASANA_PAT` + Asana user GIDs into `apps/web/.env.local`** (and Vercel Production). Without it, every escalation silently 500s after the user types — the headline product feature is non-functional.
2. **Build the token meter — software tokens + human tokens + a visible running total in the chat UI + a Stripe usage-record write.** Today there is no metering, no Stripe wiring for the new tier model, and no visible meter. Pricing is a slide deck.
3. **Publish the pricing page + Inverted Intelligence narrative on at least one customer-facing surface** (`measurablybetter.life` or `/chat` onboarding). Today neither phrase appears anywhere in `apps/web/`. The story exists only inside `docs/positioning/`.

**Realistic ship-to-Natchez date:** **late May 2026 (target: Friday 2026-05-22).** Three weeks. The chat is the easiest piece; everything around it (billing, narrative, SLA, on-call rota) needs honest build time. If Chase tries to walk Tracy + Amy through this on May 1 the partner trust risk outweighs the upside.

---

## Objective 1 — Chat works without manual intervention

### Current state

`/chat` ships. `apps/web/app/chat/page.tsx` is a clean single-column UI. `apps/web/app/api/chat/route.ts` streams Anthropic Sonnet 4.5 over SSE, hand-rolled (no Vercel AI SDK, per Chase's "no heavy dependencies" constraint). Auth via `next-auth` works — unauthenticated `POST /api/chat` returns 401. Context loader (`apps/web/lib/big-muddy-context.ts`) reads 5 canonical docs from disk with a 5-min in-memory cache. Middleware bypass for `/chat` is in place (line 120 of `apps/web/middleware.ts`).

What does not work without manual intervention: **Open Notebook backend.** Per `docs/open-notebook-setup-2026-04-20.md`, Open Notebook lives on the Mac mini at `192.168.4.37:5055`. Per CLAUDE.md, the Mac mini is "powering off during Chase's NY drive" and Hetzner Open Notebook status is "planned." So the chat reads context from local repo files instead — fine for Chase running locally, broken in Vercel Production where there is no repo on disk at `process.cwd() + ../..`.

### Battle-ready bar

- A guest can hit `https://[customer-subdomain]/chat`, sign in once, ask 5 questions, and get 5 answers within 8 seconds each.
- No 500s in `vercel logs` over a 50-message smoke test.
- Context comes from a live data source (Open Notebook, Sanity, or a flat JSON cache deployed with the build) — not `process.cwd()`.

### Gap to close

`loadBigMuddyContext()` will fail in Vercel Production because the relative path `..` from `apps/web/` does not resolve to docs in the deployed bundle. Either ship a build-time-baked context blob (Patch can wire this in 30 min), stand up Open Notebook on Hetzner per `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` §production-services, or stub a remote-fetch from Sanity. Until that's done the chat will only run locally on Chase's MacBook.

### Owner + ETA

Patch owns. **ETA: 2026-05-05 (3 working days).** Hetzner Open Notebook deploy is the bigger swing — defer that to the second sprint. Build-time bake is the 30-min ship.

### Risk if we ship without closing

The chat 500s the first time a Tracy/Amy guest hits it from a Vercel-deployed origin. Partner trust break. Customer either silently leaves or pings Chase, who fixes it manually — exactly the "manual intervention" we're auditing against.

---

## Objective 2 — Escalation path actually fires

### Current state

The route handler defines a single tool (`create_task`) with a clean schema. Asana client (`apps/web/lib/asana-client.ts`) reads `ASANA_PAT` or `ASANA_ACCESS_TOKEN` from env. `executeCreateTask()` posts to project GID `1214376792613690` (Weekly Partner Commitments → Inbox). Returns `{ ok, taskGid, taskUrl, assigneeLabel }` to the UI. UI renders an escalation callout with a clickable Asana link.

What's broken or missing:

1. **`ASANA_PAT` is not in `apps/web/.env.local`** (verified). The README flags this. The chat will return a friendly "escalation failed" callout, but the user has no recourse.
2. **No assignee field is set on the Asana task itself.** Routing is encoded as a label string in the task body. Someone has to triage Inbox → assign manually. Per the README: "to fill it we need the actual Asana user GIDs for Tracy / Amy / Elijah / Chase. Add those as a follow-up env or a small lookup."
3. **No SLA enforcement.** The model is told to escalate; nothing watches the Asana task afterward. There is no "if no response in N hours, ping Chase" mechanism. Per the Inverted Intelligence pilot plan, $100 Service tier needs a stated SLA — TBD per Chase's own note.
4. **The result does not surface back to the customer in the chat.** Once the assignee resolves the Asana task, the chat session has no way to render "Tracy responded — here's her answer." The customer has to click into the Asana URL or check email. Breaks the "one-glass" promise.
5. **Routing keywords are in the system prompt only, not a tested function.** Easy to drift. Hard to debug when the model picks the wrong assignee.

### Battle-ready bar

- `ASANA_PAT` set in Vercel Production + local env. Confirmed by hitting `/chat` and getting a real Asana task with a real GID.
- Asana task is assigned to a real user (Tracy / Amy / Elijah / Chase by GID), not just labeled.
- A documented SLA for each tier — $100 Service = 24-hour response, $200 Operator = 8-hour, $500 Business = 4-hour, Enterprise = TBD — published on `/pricing` and in the chat onboarding.
- A way for the assignee's response to surface back into the customer's chat session (Asana webhook → write to chat history → next-message render).
- A weekly drill: someone fires a test escalation, the on-call assignee responds within SLA, the response shows up in the customer chat.

### Gap to close

`ASANA_PAT` add is 5 minutes. Asana user GIDs lookup is a half-day (Patch). SLA writeup + publish is a half-day (Cos drafts, Chase approves). Asana webhook → chat-session relay is the meaty piece — call it 2-3 days for Patch (need to design how the chat session persists, since today it's purely client-side state).

### Owner + ETA

Patch owns the wiring. Cos owns the SLA + on-call rota documentation. **ETA: 2026-05-12** — one full week after Objective 1 is closed, because the webhook → chat relay is the biggest single unsolved problem in the MVP.

### Risk if we ship without closing

The pricing model the audit is anchored to (`mbt-product-definition-2026-04-30.md`) sells *human tokens at premium rates*. If the human-token mechanism doesn't visibly work — escalation fires, response surfaces, customer sees the meter — we are charging premium prices for a feature that doesn't function. Refund risk + churn risk + brand risk.

---

## Objective 3 — Pricing is implementable (Stripe + token meter)

### Current state

Stripe is wired for **destination-charge checkout** (`apps/web/app/api/stripe/checkout/route.ts`), **subscription plans** (`apps/web/app/api/commerce/`), and **invoice creation** (`apps/web/app/api/billing/route.ts`). The pricing page (`apps/web/app/pricing/page.tsx`) is wired to `/api/commerce/plans` and renders dynamic plan cards.

What is **not** wired:

1. **The new locked tier structure** — Free / $20 Standard / $100 Service / $200 Operator / $500 Business / Enterprise — does not exist anywhere in the codebase. The current pricing structure in `apps/web/app/api/billing/route.ts` line 71-84 still references the **deprecated DSD walk-in ladder** ($25 Essentials / $50 Works / $99 Marketing / $250 Engine + the "Front Porch / Route / River Room / Blues Room" naming). Per CLAUDE.md and `THE_THESIS.md`, that ladder was retracted 2026-04-19. The audit yesterday flagged this. It is still live in code today.
2. **No token metering.** Zero. There is no software-token counter, no human-token counter, no Stripe usage-record write, no running total in the chat UI. The whole product definition is built on token pricing; the implementation is at zero.
3. **No Stripe metered billing setup.** Need: a Stripe Product per tier, a usage-based price (per 1K software tokens, per minute of human time), and a customer-portal flow. None of these exist for the new tiers.
4. **No invoice generation tied to chat usage.** `/api/billing` creates invoices manually (admin-only POST). Nothing reads chat usage and writes invoice line items.
5. **No customer-visible meter in the chat.** The whole "no surprise bills, meter is always visible" promise is currently impossible to honor.

### Battle-ready bar

- 6 Stripe Products + Prices live in test mode (Free / Standard / Service / Operator / Business / Enterprise). Customer-portal works. Subscription upgrades + downgrades work.
- Software-token counter wired into the chat route — Anthropic returns input/output token counts per message; a `usage_record` posts to Stripe per turn.
- Human-token counter wired — Asana task time-tracking (or a manual "I spent N min" comment-parser) creates a usage record at the human-token rate.
- Chat UI shows two running totals: "Software: $0.43 this session / Human: $0.00 this session." Visible by default. Settable cap.
- A test customer can sign up at $20, run 50 messages, see the meter tick, escalate once, see the human-token meter tick, and receive a clean invoice at month-end.

### Gap to close

This is the single biggest piece of unbuilt scope in the entire audit. Realistically a 1-2 week build for Patch (Stripe products + usage records + portal + chat-side counter + invoice tie-in), plus 2-3 days for Cos to write the customer-facing "how token billing works" doc + onboarding chat opener that explains it.

### Owner + ETA

Patch owns implementation. Tracy owns Stripe Product setup (she has Stripe credential ownership and the accounting head). Cos owns the explanation copy. **ETA: 2026-05-19 (3 weeks).** This is the critical-path item for the realistic ship-to-Natchez date.

### Risk if we ship without closing

We charge customers at the old DSD-walk-in $25/$50/$99/$250 prices because that's what's in the code. We promise token billing in the marketing and don't deliver it. The first customer to actually look at their invoice files a complaint.

---

## Objective 4 — Story coherent across surfaces

### Current state

The Inverted Intelligence narrative is locked in `docs/positioning/inverted-intelligence-2026-04-30.md` — sharp, well-written, ready. The MBT product definition is locked in `docs/positioning/mbt-product-definition-2026-04-30.md` — equally sharp.

**Neither phrase appears anywhere in `apps/web/`.** I grepped for "inverted intelligence", "software is cheap", "human-token" — zero hits in `.tsx`, `.ts`, or `.html` under the web app.

The customer-facing surfaces that should carry the narrative today:

| Surface | State |
|---|---|
| `/chat` onboarding (the empty-state placeholder) | Generic example questions. No narrative hook. |
| `/pricing` | Renders dynamic plan cards from `/api/commerce/plans`. Plans don't exist for the new tiers, so the page is currently meaningless for the new product. |
| `measurablybetter.life` homepage | Not opened in this audit pass — but per the full audit yesterday, the BUSINESS_ARCHITECTURE doc still describes MBT as "consumer AI" + "business marketing" (two products). The locked product definition (one product, SaaS+Service) hasn't propagated to the public site. |
| Chat system prompt | Mentions context docs but not the Inverted Intelligence framing. |
| Radio show | The "Inverted Intelligence" weekly show concept exists in the doc. No episodes recorded, no AzuraCast playlist update, no `/radio` page reference. |
| Social media | No posts found. (Not deeply audited — flag for review.) |
| Customer-facing decks | No deck under `apps/web/public/` or `docs/presentations/` ties the thesis to the product. The 12-month forecast deck is internal and doesn't carry the narrative. |

### Battle-ready bar

- `/pricing` renders the new 6-tier table with the "Software is cheap. Humans are the premium" tagline and a brief explainer of token billing.
- `/chat` empty-state shows a one-paragraph Inverted Intelligence hook before the example questions.
- `measurablybetter.life` homepage leads with the SaaS+Service product definition and the Inverted Intelligence thesis (one paragraph each).
- At least one published radio episode (or recorded pilot) titled "Inverted Intelligence" lives in `apps/web/app/radio/` or AzuraCast.
- A two-pager customer deck at `apps/web/public/decks/inverted-intelligence-overview.html` (uses the dense-information-presentation prompt template) — sharable URL Tracy and Amy can hand to a Natchez prospect.

### Gap to close

Cos can draft all five surfaces in a day. Patch can wire the tier table in 2 hours once Stripe Products are built. The radio episode is the biggest swing — needs Chase or Amy to actually record one, which is its own thing. Realistic call: copy ships in 3-4 days, radio pilot ships in 7-10 days.

### Owner + ETA

Cos drafts copy. Chase / Amy record the radio pilot. Patch wires the pricing table. **ETA: 2026-05-08** for copy-ships; **2026-05-15** for radio pilot. Tie this to Objective 3 (pricing wiring) — same delivery window.

### Risk if we ship without closing

Customers land on a pricing page that still shows DSD walk-in tiers, a chat that doesn't mention the thesis, and a homepage that contradicts the product definition. The narrative becomes a back-room artifact that never reaches customers — and the entire "we named the trend, we priced for it correctly" positioning evaporates.

---

## Objective 5 — Team ready to handle escalations

### Current state

The chat routes escalations to four labels: Chase / Elijah / Tracy / Amy. The product definition (`mbt-product-definition-2026-04-30.md`) names Studio C as the operating company that runs the product, supported by Cos / specialist agents.

Reality check on each:

- **Chase** — currently driving from Mississippi to New York (per CLAUDE.md note about Mac mini powering off). Bandwidth is split between this audit, the AEO push, and the move. He should not be on-call for customer escalations during the move week.
- **Studio C (Elijah + Miles)** — per `THE_THESIS.md` and full audit, role is contested (admin/implementation vendor for MBT vs production arm of Tuthill — Chase has not decided). They have not been told they are the on-call human-token responders. There is no documented agreement that they will respond inside an SLA.
- **Cos (the agent ecosystem) + specialist agents** — Cos is functional (this very audit was generated by it). Specialist agents exist but their on-call discipline for customer-facing escalations has not been defined. There is no "if a chat escalation comes in, Cos triages within X minutes" protocol.
- **Tracy** — running Inn ops, finance, BizDev for photography. Equity partner. Not technical. Will need a one-page playbook to handle Stripe / billing escalations. Doesn't exist yet.
- **Amy** — running Inn + bar + her singing career as Arrie Aslin. Equity partner. Not technical. Will need a one-page playbook for Inn/Blues Room escalations. Doesn't exist yet.
- **JP** — explicitly removed from the team table 2026-04-30 ("not part of the plan"). Should not be on the routing list. (He is not — the chat routes only the four named above.)

### Battle-ready bar

- Studio C role decision made (Chase). Studio C team formally agrees to be on-call for $100 Service tier escalations with a stated SLA.
- One-page playbook per assignee (`docs/operations/escalation-playbook-{chase,studio-c,tracy,amy}.md`) — what to do when an Asana task lands in their inbox, how to log time for human-token billing, how to close the loop back to the customer.
- An on-call rotation if more than one person can cover (Chase + Studio C alternate weeks for tech escalations, Tracy/Amy alternate for Inn).
- Cos documented as the first-line triage — every escalation gets a Cos look before it routes to a human, in case Cos can resolve from context.
- Chase is NOT on the rotation during the NY move week (May 1-7).

### Gap to close

The decisions are blocking. Chase has to (a) lock Studio C's role, (b) tell Elijah + Miles they are the human-token team, (c) draft an SLA per tier. Cos can write the playbooks once the decisions are made. None of this can ship if the decisions aren't made.

### Owner + ETA

Chase decides. Cos drafts. Studio C confirms. **ETA: 2026-05-09** assuming Chase makes the role-lock decision in the first week. If Chase defers the decision, this objective stays Red indefinitely and the whole battle-ready timeline slips.

### Risk if we ship without closing

A real customer fires an escalation while Chase is driving I-65 with no signal. The Asana task lands in Inbox. Nobody on the team knows it's their job. Customer waits 48 hours. Customer churns. The whole promise of the human-token premium tier is invalidated by the first real test.

---

## Objective 6 — Operational basics work

### Current state

What works:
- Auth (next-auth v5) — verified, returns 401 cleanly.
- Multi-tenant routing — middleware bypasses `/chat` and `/api/chat` correctly.
- Anthropic SDK — installed, working.
- Asana client — installed, working (when token is present).
- Vercel deployment — the rest of the codebase ships through it daily.
- Logging — `apiLog` and `cloudLog` exist; Vercel runtime logs are queryable.

What's broken or missing:
- **No rate limiting on `/api/chat`.** Single-user MVP per the README. The first time a customer accidentally hits the endpoint in a loop (or someone scripts an attack), Anthropic costs spike unbounded.
- **No per-customer tenant isolation in chat context.** The `loadBigMuddyContext()` loads the canonical Big Muddy docs for everyone. The product definition explicitly says "different system prompts, different data ingest pipelines per vertical." Today every chat sees Big Muddy context.
- **Open Notebook backend reachable: NO.** Per `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` it's on Mac mini (powering off) with "planned" status on Hetzner. The chat falls back to disk reads, which only works locally.
- **fail2ban on Hetzner** — per CLAUDE.md, Hetzner SSH triggers fail2ban on root attempts. Not directly chat-related, but if Patch needs to deploy Open Notebook this week it's a footgun.
- **AzuraCast on `bigmuddy-radio` droplet has broken SSL** (`stream.bigmuddytouring.com`). Not chat-related, but the Inverted Intelligence radio show concept depends on a working stream.
- **`apps/web/.env.example` lists ~5 vars; the codebase references 115.** Per yesterday's audit. Anyone bootstrapping local dev is stuck. Studio C cannot run the chat locally without Chase walking them through Bitwarden item by item.
- **`buycurious.art` inconsistency** between robots.ts and sitemap.ts. Yesterday's audit flagged it; not closed.
- **Cos status dashboard** lives at `/Users/chasethis/cos-status-dashboard/` — separate Next.js app. Verified it exists. Whether it's deployed to a public URL Tracy/Amy can hit was not verified in this pass.

### Battle-ready bar

- Rate limiting on `/api/chat` — 60 messages per hour per authenticated user, with a clean 429 response.
- Per-customer context isolation — chat reads from a customer-specific Sanity dataset or Open Notebook namespace.
- Open Notebook reachable from Vercel Production (Hetzner deploy or fallback architecture).
- `.env.example` populated.
- Cos status dashboard either deployed or formally retired.

### Gap to close

Rate limiting is a half-day with `@upstash/ratelimit` (Patch). Per-customer isolation is a 3-5 day build. Open Notebook on Hetzner is a 1-2 day setup. `.env.example` is a 2-hour pass.

### Owner + ETA

Patch owns. **ETA: 2026-05-15.** Rate limiting + .env.example + Cos dashboard verification ship first (3-day window). Per-customer isolation is the bigger effort — push to Sprint 2 if needed.

### Risk if we ship without closing

Without rate limiting, a single customer's runaway script bills $1,000 of Anthropic tokens overnight. Without per-customer isolation, customer A asks "what was Big Muddy's October revenue" and the chat answers — using *Big Muddy's* internal forecast doc. Cross-tenant data leak.

---

## Objective 7 — Pilot can be measured

### Current state

What we can measure today:
- Vercel runtime logs — request counts to `/api/chat`, latency, error rate.
- Asana — tasks created in Weekly Partner Commitments → Inbox by source "Big Muddy assistant chat" (from the notes field).
- Anthropic console — total token spend.
- Stripe — total subscription revenue (but for the deprecated tiers, not the new model).

What we cannot measure:
- **Chat sessions per customer per day.** No session table in Prisma. No per-customer breakdown in logs.
- **Escalation fire rate.** Asana counts can be eyeballed, but no dashboard.
- **SLA compliance.** No SLA defined yet, no tracking of "task created → task closed" duration.
- **Tier conversion rate.** Pre-product. Tiers don't exist.
- **Churn.** No churn telemetry. The /api/commerce/subscriptions code path exists but no analytics on cancellations.
- **NPS or satisfaction proxy.** Nothing in the chat asks "did this help?" No rating widget. No CSAT.
- **Total revenue per customer per month.** Invoices exist as a data type, but with the tier confusion (Objective 3) no useful number aggregates today.

### Battle-ready bar

- A single Cos-status-dashboard or `/admin/pilot-metrics` page that shows, daily:
  - Chat sessions started (last 24h, last 7d, by customer)
  - Escalations fired (last 24h, last 7d, by assignee)
  - SLA compliance percentage (escalations resolved within tier SLA)
  - Software-token spend per customer per day
  - Human-token spend per customer per day
  - Revenue per customer per month (live from Stripe)
  - Active subscribers per tier
  - Churn count (last 30d)
- A weekly Cos-generated report Chase reads Saturday morning before the week's WPC sync.

### Gap to close

Building this dashboard is 2-3 days of Patch work IF the underlying data exists. Today, a third of it doesn't (no session table, no SLA tracking, no token meter — see Objectives 2, 3). Realistically this objective cannot be Green until Objectives 2 + 3 are Green; it depends on them.

### Owner + ETA

Patch owns dashboard. Cos owns the weekly report. **ETA: 2026-05-22** — last item before the realistic ship date, because it depends on the upstream wiring being complete.

### Risk if we ship without closing

The pilot runs blind. Three weeks in, Chase has no idea whether $100 Service is converting, whether SLA is being met, whether human-token margins are healthy. We cannot iterate. We cannot prove the thesis. The pilot is a vibe, not data.

---

## Critical path to launch

These items must close in order for the Natchez pilot to begin:

1. **Open Notebook backend reachable from Vercel Production** (Objective 1) — 2026-05-05
2. **`ASANA_PAT` + Asana user GIDs wired** (Objective 2) — 2026-05-05 (parallel with #1)
3. **Studio C role lock + on-call agreement + escalation playbooks** (Objective 5) — 2026-05-09
4. **Stripe Products + token metering + Stripe usage records + chat-side meter UI** (Objective 3) — 2026-05-19
5. **Pricing page + Inverted Intelligence narrative on `/chat`, `/pricing`, `measurablybetter.life`** (Objective 4) — 2026-05-15
6. **SLA + asynchronous escalation-response → chat surface relay** (Objective 2) — 2026-05-12
7. **Pilot metrics dashboard** (Objective 7) — 2026-05-22

Critical-path total: ~3 weeks from 2026-04-30. Targets a **Friday 2026-05-22 ship-to-Natchez date.**

## What can ship in parallel (don't serialize unnecessarily)

- **Cos drafting copy** for `/pricing`, `/chat` onboarding, `measurablybetter.life` homepage, escalation playbooks, customer-facing deck — independent of any code work. Can land 2026-05-04.
- **Tracy creating Stripe Products** in the dashboard (manual UI work) — can happen as soon as the tier structure is approved, independent of code wiring.
- **Chase recording a radio pilot episode** — independent of platform work. Could ship 2026-05-08 if Chase carves the time.
- **`.env.example` cleanup + `buycurious.art` reconciliation + `llms.txt` fixes** (yesterday's audit items) — parallel housekeeping. Patch in 1-2 hours.
- **Rate limiting on `/api/chat`** — half-day Patch task, independent of any other objective.
- **HDI cleanup pass** — yesterday's audit. Can run in background.

## Specific recommendation — when can Chase tell Tracy + Amy "we're putting this in front of Natchez customers"?

**Friday 2026-05-22.** Three weeks. Not earlier.

The earlier date is tempting because the chat *visibly works.* But "battle-ready" means the customer can sign up, pay, ask questions, escalate, get answers, see what they're being charged, and trust the meter. Today four of seven objectives are Red.

The 2026-05-22 date assumes:
- Chase makes the Studio C role decision by Monday 2026-05-04.
- Tracy carves time to set up Stripe Products in week 2.
- Patch gets uninterrupted runway for the metering build (it's the biggest single unsolved problem).
- Cos handles the documentation + copy in parallel without blocking other work.

**The version Chase can show Tracy + Amy** *as a demo* (not a customer-facing product) **today** is the local-running chat. He should walk them through the existing `/chat` page with a verbal explanation of what the product will be — but he should not say "we're putting this in front of Natchez customers" until the meter visibly ticks, the escalation reliably fires, and Studio C confirms they own the on-call.

Earlier-than-five-22 is possible only if Chase picks a single Natchez beta customer (likely Vicki Wolpert or a Big Muddy Inn-adjacent partner) and runs a manually-operated pilot — Chase + Cos personally backing every escalation, no tier billing, free for the pilot period. That's a fine intermediate step. Don't conflate it with launching the product.

---

## Appendix — deferred to next audit pass

- Whether Cos status dashboard at `/Users/chasethis/cos-status-dashboard/` is deployed and Tracy/Amy can reach it.
- Bitwarden item presence verified for each Stripe / Anthropic / Asana credential.
- Each `/admin/*` route's liveness — many likely abandoned per yesterday's audit.
- Sanity tenant/customer isolation patterns (no `customerWorkspace` schema today).
- Whether the AzuraCast SSL fix can be done concurrently with the chat work.
- Cron jobs (`api/cron/*`) — verify schedule discipline + `CRON_SECRET` envelope.

*End of audit. Next re-cut: 2026-05-08, after Studio C role decision and first sprint milestone.*
