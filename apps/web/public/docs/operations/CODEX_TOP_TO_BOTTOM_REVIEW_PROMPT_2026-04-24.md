# ChatGPT Codex (Pro) — Top-to-Bottom Review Prompt: Code + Business

*Created 2026-04-24 by Cos for Chase. Hand this to ChatGPT Pro / ChatGPT Codex with repo access. Repo: `CPTV27/hillbilly-dreams`, main branch, HEAD at commit `56791ad4` or later.*

**Type of review:** Proctology report. Two-track: (1) full code review, (2) full business review. Independent. Adversarial. No politeness, no boosterism. The point is to find what's broken before a customer, partner, or lawyer does.

---

## TL;DR for the human pasting this

1. Open ChatGPT Pro with Codex enabled (or Code Interpreter / Advanced Data Analysis with shell + git).
2. Give it access to https://github.com/CPTV27/hillbilly-dreams (clone or upload — Codex can `git clone` if you grant network).
3. Paste the prompt block below verbatim. Send.
4. Expect 30–90 minutes of real processing. Output: 8,000–15,000 words.
5. Save the response to `docs/operations/REVIEW_BY_CODEX_2026-04-24.md`.

The prior review by Gemini lives at `docs/operations/REVIEW_BY_GEMINI_2026-04-19.md` and our response at `docs/operations/GEMINI_REVIEW_RESPONSE_2026-04-19.md`. **Codex should read those first to avoid re-finding the same issues** — its job is to find the things Gemini missed, plus the business-side axes Gemini didn't cover.

---

## THE PROMPT (paste verbatim into ChatGPT Codex)

```
You are doing a top-to-bottom adversarial review of a private business
operating system — the MBT (Measurably Better Things LLC) platform — and
the business it powers. The codebase is a multi-tenant Next.js 14 monorepo
serving 14 brand domains for a media-hospitality-entertainment ecosystem
anchored in Natchez, Mississippi, with a Hudson Valley node.

I want both:
  (A) A code review — security, schema, multi-tenant isolation, code
      quality, deployment, dependencies, accessibility, performance.
  (B) A business review — positioning consistency, pricing coherence,
      brand voice, financial-model honesty, legal exposure, claim ladder
      enforcement, operational readiness, partner readiness, narrative
      drift across docs.

Find what is wrong, broken, contradictory, legally risky, financially
optimistic, or operationally unsupported. Skip the praise unless something
is genuinely surprising and good. File + line references are mandatory
for every finding.

================================================================
REPO LOCATION + ACCESS
================================================================

Clone: https://github.com/CPTV27/hillbilly-dreams
Branch: main
HEAD commit: 56791ad4 (or later — pull main)

You have shell + git access. Use them. `git log`, `git blame`, `rg`, `find`,
`tree`, `wc`, `cloc` — all fair game. Don't ask permission to read files;
read them.

================================================================
PHASE 0 — READ THESE FIRST (don't skip)
================================================================

These docs constrain everything else. If your findings contradict these,
say so explicitly — these are the sources of truth, but they may also be
wrong. Either way, name the disagreement.

CANONICAL MENTAL MODELS
  - docs/THE_THESIS.md ............................ THE canonical thesis (Chase's voice, 2026-04-19)
  - docs/BUSINESS_ARCHITECTURE.md ................. Three-layer model: HDI / MBT / Implementations
  - docs/STORY_KIT.md ............................. The narrative — read end-to-end
  - docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md ... Source of truth for hosts + secrets + services
  - CLAUDE.md (root) .............................. Master agent handoff; QC rules; current focus

RECENT STRATEGIC ADDITIONS (post-Gemini-review, 2026-04-19 → 2026-04-24)
  - docs/business-plan/2026-04-22.md .............. Latest formal business plan
  - docs/decision-briefs/measurably-better-things-llc-formation-plan-2026-04-21.md
  - apps/web/public/the-hollow.html ............... 12-slide pitch deck for The Hollow / RRC
  - apps/web/public/dispatch-01.html .............. April 27 launch dispatch
  - docs/90_DAY_PLAN.md ........................... Operating cadence
  - docs/THE_THESIS_MINDMAP.md .................... Visual mental model
  - docs/ecosystem-subscriptions-2026-04-20.md .... $1k/mo subscription cap
  - docs/partner-studios-pitch-2026-04-20.md ...... Tuthill + Studio C partnership scope

PRIOR REVIEWS (so you don't repeat findings)
  - docs/operations/REVIEW_BY_GEMINI_2026-04-19.md  Gemini's findings at SHA ef0f4d9
  - docs/operations/GEMINI_REVIEW_RESPONSE_2026-04-19.md  What we accepted / disputed / fixed
  - docs/operations/GEMINI_TOP_TO_BOTTOM_REVIEW_PROMPT.md  The prompt we gave Gemini

WHAT CHANGED SINCE GEMINI REVIEW (~5 days, ~30+ commits)
  - Tagline standardized: "An entertainment, hospitality, and media
    ecosystem anchored in Natchez, Mississippi." (commit 56791ad4)
  - Dispatch No. 01 brochure added (commit 03d6f424 + iterations)
  - The Hollow / Rockstar Retirement Community (RRC) pitch added
    (12-slide HTML at apps/web/public/the-hollow.html, marked noindex)
  - Big Muddy Acres concept LOCKED at 10-unit tiered structure
    (3 Premium Full @ 2 acres @ $200K each, 2 Standard Full @ 1 acre @
    $100K each, 2 Half-share @ shared 2 acres @ $600/mo each, 2 Quarter-
    share @ shared 2 acres @ $300/mo each, 1 Model home)
  - 4 new magazine articles published (Tracy bylines IDs 24–27)
  - "Powered by Measurably Better Things" universalized in footers
  - HDI brand on the path to retirement (still referenced; planned removal)
  - MBT LLC formation plan written (Tracy will file; not yet incorporated)

================================================================
PHASE 1 — CODE REVIEW AXES
================================================================

For each axis, walk the relevant code paths and flag findings with
severity (CRITICAL / HIGH / MEDIUM / LOW / COSMETIC), category, file:line,
description, why-it-matters, recommended fix, and effort estimate.

---- 1A. Security ----

  - Authentication: apps/web/lib/auth*, app/api/auth/*, next-auth config.
    Are sessions HTTP-only, signed, rotated? Is there CSRF protection on
    state-changing routes?
  - Authorization: every app/api/* route — is the caller's tenant /
    role checked, or do routes trust input?
  - Multi-tenant isolation: middleware.ts → domain-routes.ts → tenants.ts.
    Can a request to brand A's domain ever read brand B's data via a
    crafted URL, query param, or cookie?
  - Secret leakage: any env vars logged, sent to a client component,
    embedded in HTML, or echoed in error messages?
  - SQL injection / Prisma misuse: any `$queryRawUnsafe` or string-
    concatenated SQL? Any user input flowing directly into Prisma
    `where` filters without a typed allowlist?
  - HMAC + webhook verification: Stripe, Resend, GitHub webhooks — are
    signatures verified before parsing? Replay protection?
  - File upload paths (if any): MIME validation? Size limits? Storage
    paths sanitized?
  - Open redirect / SSRF in any fetch helper.
  - Sentry / logging: PII scrubbed? Or are full request bodies logged?

---- 1B. Multi-tenant isolation ----

  - Middleware tenant resolution: apps/web/middleware.ts.
  - Tenant config: apps/web/config/tenants.ts + domain-routes.ts +
    packages/config/brands.ts.
  - Every Prisma query — does it filter by tenantId? Use `rg "prisma\.(.+)\.find"`
    and audit each call site.
  - Sanity queries — same question for Sanity dataset / project scoping.
  - GCS bucket access — bmt-media-bigmuddy is shared across tenants;
    are object paths namespaced by tenant?
  - Cross-tenant API calls: any case where Tenant A's webhook can
    affect Tenant B's data?

---- 1C. Database schema ----

  - packages/database/prisma/schema.prisma — full read.
  - Are there missing indexes on the columns we filter / sort by in
    high-traffic queries (e.g., subscriptionId on ModuleEngagement,
    tenantId on BusEvent)?
  - Foreign key cascades — onDelete behavior. Any silent-data-loss
    risks (CASCADE where it should be RESTRICT, or vice versa)?
  - Nullable fields that should be required, or required fields that
    will fail on real data.
  - cuid vs autoincrement int ID inconsistency — any join confusion?
  - Are there model fields that are stale (referenced nowhere in code)
    or that the code expects but the schema lacks?
  - Migration history — has any migration been edited after being
    applied? Squashed in a way that loses history?

---- 1D. Code quality ----

  - Error handling: are errors swallowed? Re-thrown with lost stack?
    `catch (e) { /* nothing */ }` patterns?
  - Idempotency: webhook handlers — safe to replay? Cron jobs — safe
    if the previous run is still in flight?
  - Race conditions: anywhere two concurrent requests could corrupt
    shared state (booking holds, subscription activation)?
  - Type safety: `as any`, `as unknown`, `as never` casts. Use
    `rg "as (any|unknown|never)" --type ts` and audit each.
  - Dead code: route handlers that no UI calls; util functions that
    nothing imports.
  - Duplication: same logic in two places that could drift.
  - Naming consistency: per CLAUDE.md, the Directory module is no
    longer sold as walk-in tiered SaaS. Are STRIPE_PAYMENT_LINK_*
    env vars + matching code paths still alive? Should they be
    deprecated or removed?

---- 1E. Dependencies + vulnerabilities ----

  - There are 64 Dependabot alerts on this repo (2 critical, 20 high,
    38 moderate, 4 low) as of 2026-04-23. List the critical + high
    ones. Triage which can be auto-bumped vs which need code changes.
  - Run `npm audit` (or `pnpm audit`) and reconcile with Dependabot.
  - Package versions: Next 14.2.35 — is there a security release we're
    behind on? Prisma version + breaking-change risk for the next bump.
  - Lockfile drift: package.json vs lock file consistency.

---- 1F. Deployment + CI ----

  - .github/workflows/* — what runs on push, on PR? Are tests run? Is
    the deploy gated on test pass, or just on build success?
  - vercel.json + apps/web/next.config.js — any misconfigured caches,
    redirects, or rewrites?
  - Environment variable surface: docs/operations/ENVIRONMENT_VARIABLES.md
    vs actual `process.env.*` reads in code. List discrepancies.
  - Build size + cold start: any obvious bundle bloat (full lodash
    imports, unused images shipped to client)?

---- 1G. Performance ----

  - Page-level: any pages doing N+1 Prisma queries in a loop?
  - Image optimization: are public/ images served via Next.js Image
    or raw <img>? Are large hero photos pre-resized for mobile?
  - Caching: ISR / revalidate strategy on /articles, /shows, /artists,
    /events. Are revalidate windows reasonable?
  - LLM API cost-control: any code that calls Vertex AI / Gemini /
    Claude on every request without caching? Token budget guards?

---- 1H. Accessibility + SEO ----

  - Semantic HTML, alt text on photos, color contrast (the touring
    "dark twilight" theme — is it AA on body text?).
  - Robots.txt + sitemap.xml correctness across the 14 domains.
  - The Hollow pages (apps/web/public/the-hollow*.html) are marked
    noindex/nofollow — verify the meta tags actually fire and the
    pages aren't inadvertently linked from a public sitemap.
  - llms.txt at apps/web/public/llms.txt — is the content honest +
    current?

---- 1I. AI integrations ----

  - apps/web/lib/ai-models.ts — single source of model routing.
  - Any code path that hardcodes a model name instead of importing
    from ai-models.ts? (CLAUDE.md QC rule.)
  - ELEVENLABS_API_KEY is provisioned in Vercel but reportedly NOT
    integrated. Confirm. If integrated, where?
  - Vertex AI scripts (scripts/ai/*.mjs) — are GCP credentials
    handled cleanly, or is there a JSON key checked into the repo?

================================================================
PHASE 2 — BUSINESS REVIEW AXES
================================================================

This is the half Gemini didn't do. The codebase reflects business
decisions; the docs encode positioning, pricing, and partner promises.
Read for consistency, honesty, and risk.

---- 2A. Positioning consistency across surfaces ----

  - The new umbrella tagline is: "An entertainment, hospitality, and
    media ecosystem anchored in Natchez, Mississippi."
  - Find every page footer, metadata description, llms.txt, About
    page, hero copy, press piece, social bio, and confirm consistency.
    Flag any surface still using a stale variant (e.g., "media-
    hospitality company", "Seven brands", "Powered by HDI", etc.)
  - The Big Muddy brand family (Touring, Magazine, Radio, Records,
    Entertainment) each have their own brand-specific tagline —
    those are correct as-is. Don't conflate.
  - HDI vs MBT vs Big Muddy — the three-layer model is in flux:
    HDI is being retired, MBT is the operating entity, Big Muddy
    is the consumer flagship. Find places where these are conflated
    or contradicted. (CLAUDE.md and THE_THESIS.md are the truth.)

---- 2B. Pricing coherence ----

  - Big Muddy Acres unit structure (LOCKED 2026-04-24):
      • 3 Premium Full units @ 2 acres each @ $200K
      • 2 Standard Full units @ 1 acre each @ $100K
      • 2 Half-share units @ shared 2 acres @ $600/mo each
      • 2 Quarter-share units @ shared 2 acres @ $300/mo each
      • 1 Model home
    Find every doc, slide, pitch, and proforma referencing Big Muddy
    Acres / The Hollow / RRC. Flag any that doesn't match this LOCKED
    structure. Especially check apps/web/public/the-hollow.html,
    docs/decision-briefs/RRC*, the RRC proforma references, and the
    Hollow pitch markdown.
  - Rental program: Premium $250–300/night, Standard $175–200/night.
    Same exercise.
  - Directory module pricing: per CLAUDE.md, the Directory is NO
    LONGER sold as $25/$50/$99/$250 tiered walk-in SaaS. It is
    B2B engagement-only. Find any surface still pitching the tiered
    SaaS model. (Stripe payment links, marketing copy, FAQs, etc.)
  - MBT consumer slider $0–$99/mo on measurablybetter.life — verify
    this is internally consistent with "saves $500–800/mo" honesty
    claim (per CLAUDE.md feedback_honest_claims_only.md).
  - Subscription cap: MBT operating subscriptions capped at $1,000/mo
    per docs/ecosystem-subscriptions-2026-04-20.md. Reconcile against
    actual subscription stack.

---- 2C. Brand voice consistency ----

  - Touring = dark twilight, rock-and-roll energy.
  - Magazine = Southern Gothic, long-form editorial.
  - Radio = "the sound of the river."
  - Records = worn vinyl, blues/soul/gospel.
  - Outsider Economics = field manual, sovereign-economies tone.
  - Find marketing copy or article content that violates its
    declared brand voice. Cross-reference docs/voice/*.md +
    feedback_brand_voices.md guidance if present.
  - Tracy + Amy are EQUITY PARTNERS, never employees. Any copy
    calling them "team members" / "staff" / "employees" / "founders"
    in a way that contradicts equity-partner framing — flag.
  - "Arrie Aslin" is the correct spelling. Flag any "Arri", "Ari",
    "Arie", "Arrie B." variants.

---- 2D. Financial-model honesty gate ----

  - The $250k Y1 ecosystem revenue thesis (THE_THESIS.md) — is
    every revenue line backed by a real signed deal, a credible
    pipeline conversation, or a documented assumption? Or are
    there "gravity" numbers that exist only because the spreadsheet
    needed them?
  - The MBT "saves $500–800/mo" claim vs the older "$2,839/mo"
    claim — find any surface still using the inflated number.
  - The proforma for Big Muddy Acres / The Hollow / RRC — do the
    numbers reconcile to the locked unit structure? Is the rental-
    revenue assumption defensible (occupancy, ADR, seasonality)?
  - Tour economics on the Sprinter van rollout — does the cost
    model account for fuel, lodging, food, insurance, depreciation?

---- 2E. Legal exposure ----

  - The Hollow / RRC pitch implies a fractional-ownership offering
    (Half-share, Quarter-share at shared acreage). Securities-law
    risk: is this a "passive investment" or a "use right"? The line
    matters under SEC Reg D / state blue-sky laws. Flag the language
    that's closest to the line.
  - Big Muddy Records — recording-contract or distribution promises
    in marketing copy. Any unbacked promises ("we'll release your
    record")?
  - Magazine articles — any defamation risk in named-person stories?
    The Tracy-bylined IDs 24–27 in particular.
  - Privacy: any forms collecting PII without a privacy policy
    link? Cookie banners on EU traffic? CCPA "Do Not Sell" link?
  - Trademark: is "Big Muddy" trademarked? Are we using third-party
    trademarks (Cloudbeds, Stripe, etc.) within fair-use bounds?
  - The MBT Workspace + LLC formation — MBT LLC does not yet exist
    (per docs/decision-briefs/measurably-better-things-llc-formation-
    plan-2026-04-21.md). Any contract / pitch claiming MBT as the
    contracting party today is signing on behalf of a non-existent
    entity. Flag those contracts.
  - FarleyPierson LLC — being closed. Any lingering reference that
    implies it's the operating entity going forward?
  - Honest-claims gate on Product Management: any marketing-page
    feature claim that the underlying code doesn't actually deliver?
    (See feedback_honest_claims_only.md, project_claim_ladder.md.)

---- 2F. Claim ladder enforcement ----

  - Per project_claim_ladder.md, claims about MBT's capabilities
    are gap-gated — we don't pitch unshipped features. Walk every
    customer-facing page and the marketing copy, and flag claims
    that assume features marked "not built" or "stubbed" in the code.
  - Mac mini broadcast agent stubs (per Gemini review, SOP_PARALLEL_
    BUILD docs) — has anything claiming a fully-running broadcast
    agent leaked into customer-facing copy?

---- 2G. Operational readiness ----

  - Tracy + Amy onboarding: docs/ADMIN_ONBOARDING_GUIDE.md — does
    it accurately reflect what they'll see Day 1? Any tools mentioned
    that don't exist?
  - Tracy promotes-from-drafts rule (Sanity drafts.<ulid>) — verify
    no code path bypasses it.
  - Cron jobs in vercel.json — confirmed live? Schedule sane?
  - Email deliverability: SPF / DKIM / DMARC for the 14 domains.
    Audit sample. (Resend handles the sending; DNS records have to
    be in place.)
  - Domain pointing: every of the 14 brand domains correctly points
    to Vercel? www / apex parity?
  - The 64 Dependabot vulns + the Mac mini ramp-down (per CANONICAL_
    INFRASTRUCTURE doc) — any operational dependency on services
    that are about to be turned off?

---- 2H. Partner readiness ----

  - Tuthill Design + Studio C — the partner-studios-pitch doc.
    Are the deliverables, billing model, IP terms, and exit clauses
    all consistent with what's documented in
    docs/partners/tuthill-photography-scope-2026-04-20.md?
  - Vicki Wolpert (Woodstock) — the broker pilot framing. Any
    surface that promises Vicki a Directory product that contradicts
    the B2B-engagement model?
  - Paul Green (rock school) — the Bearsville pilot framing. Same.
  - Regina Charboneau (Biscuits & Blues) — internal client. Any
    surface treating her as external, or vice versa?
  - JP Houston — per CLAUDE.md, JP's deal is not finalized. Is JP
    named on any public-facing page, contract, or pitch?

---- 2I. Narrative drift ----

  - THE_THESIS.md is the canonical narrative (2026-04-19, Chase's
    voice). Find any other doc, page, or marketing copy that
    contradicts it — particularly on:
      • The two-region model (Natchez + Hudson Valley)
      • The Sprinter van story
      • The four-internal-clients-Q2-2026 list (Touring, Magazine,
        Biscuits & Blues, The Big Muddy Inn)
      • The Y1 revenue target
      • The "Big Muddy Magazine targets Inn guests, not music
        industry" framing
  - STORY_KIT.md is the public narrative. Does the website actually
    tell that story, or has the story drifted off-script?

---- 2J. Documentation accuracy ----

  - 230+ docs across docs/. Sample 20 random files. Are they
    accurate, dated, and referenced anywhere? Or are they
    hallucinated AI-generated drift?
  - Do README files in packages/modules/* match what the code
    actually exports?
  - Onboarding guides for partners — accurate to the Day-1 experience?

================================================================
PHASE 3 — DELIVERABLE STRUCTURE
================================================================

Write your review as a single Markdown document. Use this exact
top-level structure:

# MBT + Big Muddy — Independent Top-to-Bottom Review by ChatGPT Codex

**Date:** YYYY-MM-DD
**Reviewer:** ChatGPT Codex (model + version)
**Repo HEAD reviewed:** <commit SHA>
**Time spent:** <minutes>

## Executive summary
(5–8 sentences. Is this shippable? Are there CRITICAL items blocking
go-live? Top 3 risks to the business as a whole. Top 3 risks to the
codebase. One sentence of honest praise if warranted.)

## Top 20 findings (ranked by severity)

For each finding:

### Finding N — <one-line title>
- **Severity:** CRITICAL / HIGH / MEDIUM / LOW / COSMETIC
- **Category:** security / schema / code / docs / business logic /
  positioning / pricing / legal / brand / operational / financial
- **File reference:** `path/to/file.ext:line` (or doc reference)
- **What's wrong:** <2–4 sentences>
- **Why it matters:** <2–4 sentences — connect to revenue / risk /
  customer trust / partner trust / legal exposure>
- **Recommended fix:** <concrete, actionable, file:line specific>
- **Estimated effort:** <hours / days>
- **Owner suggestion:** <Chase / Tracy / Patch (technical director) /
  external counsel / etc.>

## Per-axis findings — CODE
(Detailed findings under each Phase 1 axis. Same structure.)

## Per-axis findings — BUSINESS
(Detailed findings under each Phase 2 axis. Same structure.)

## Cross-cutting themes
(2–5 themes that show up across multiple axes. Example: "The repo
treats HDI and MBT as interchangeable in 14 places — this is an
identity-drift problem with both legal and brand consequences.")

## What was done well
(Genuinely good decisions. Be honest — no boosterism, but acknowledge
craft when you see it. 5–10 items max.)

## What I would do differently if starting over
(Your structural recommendations. 5–10 items.)

## Approval matrix

For each major subsystem, state SHIP / FIX FIRST / BLOCK with a
one-line reason.

CODE SUBSYSTEMS:
  - Multi-tenant routing
  - Authentication + authorization
  - Database schema
  - Stripe / commerce
  - Sanity content pipeline
  - AI / LLM integrations
  - Deploy pipeline
  - Dependency security posture
  - Mac mini → Hetzner migration
  - The Hollow pages

BUSINESS SUBSYSTEMS:
  - Big Muddy Touring (entertainment engine)
  - Big Muddy Magazine
  - Big Muddy Radio
  - Big Muddy Records
  - Big Muddy Inn
  - Outsider Economics
  - Deep South Directory (B2B module)
  - The Hollow / RRC / Big Muddy Acres
  - MBT consumer slider (measurablybetter.life)
  - Tuthill / Studio C partner readiness
  - MBT LLC formation status
  - HDI retirement plan
  - Y1 revenue thesis
  - Honest-claims gate

## Triage matrix — what to do this week

| When | What | Who | Effort |
|---|---|---|---|
| Today | <CRITICAL items> | <owner> | <hrs> |
| This week | <HIGH items> | <owner> | <days> |
| This month | <MEDIUM items> | <owner> | <days> |
| Backlog | <LOW + COSMETIC> | <owner> | — |

## Open questions
Things you couldn't answer from the repo + docs alone. Enumerate
each, with the specific file you were reading + the assumption you
needed to make to keep going.

## Methodology notes
What you skipped + why. What heuristics you used. What tools you ran.
Time spent per phase. Token / API spend if measurable.

================================================================
GROUND RULES
================================================================

1. File + line references are NON-NEGOTIABLE for every finding.
   "Somewhere in the codebase" is not acceptable.

2. CRITICAL findings require a reproduction path (steps a human
   could follow to verify). Without repro, downgrade to HIGH.

3. Skip findings that just restate what's already in CLAUDE.md as
   a known issue. The point is what's NOT documented yet.

4. Disagree with the docs when the code says otherwise. Mark
   "DOCS DISAGREE" findings as their own category.

5. Voice: blunt, technical, concise. Don't start sections with
   "Overall, the codebase shows promise…" — start with the finding.

6. If a finding requires reading 5+ files to understand, include
   a "context" subsection with the call-graph or doc-cross-ref.

7. For business-side findings, name the dollar-or-relationship cost
   if known. ("This contradiction would cost Vicki Wolpert's trust
   on the broker-pilot pitch" is a useful framing.)

8. If you find evidence of AI hallucination in the docs (citations
   that don't resolve, partner names that don't appear elsewhere,
   dates that contradict git history), call it out as its own
   category: "HALLUCINATION RISK".

9. Length target: 8,000–15,000 words. Quality over padding.

10. End with a single sentence answering: "If I were Chase, what
    would I work on first thing tomorrow morning?"
```

---

## Usage notes (for the human, not for Codex)

### Why both code AND business review

ChatGPT Codex (and the Pro tier specifically) is one of the few tools that
can credibly hold both axes simultaneously. The Gemini review covered code
deeply but didn't touch positioning, pricing coherence, or partner-readiness.
Codex's Pro tier has the context window + reasoning depth to do both.

### What to do with the output

1. **CRITICAL** → file as GitHub issues, block deploy until resolved, escalate to Chase same-day.
2. **HIGH** → triage into `docs/router/QUEUE.md` as P0, target this week.
3. **MEDIUM** → triage into the queue as P1, target this month.
4. **LOW / COSMETIC** → batch into a cleanup sprint when convenient.
5. **DOCS DISAGREE / HALLUCINATION RISK** findings → escalate to Chief of Staff for narrative reconciliation before they propagate further.
6. **Open questions** → answer in a follow-up doc, then commit as context files so the next reviewer has them.

### Cost expectation

ChatGPT Pro gives you up to ~30k–60k context window per turn (model-dependent) and Codex agentic shell access. A thorough review across this codebase + 230 docs may take 30–90 minutes of wall-clock time and saturate the message-rate-limit on Pro. Plan to feed it Phase 0 + Phase 1 in turn 1, Phase 2 in turn 2, Phase 3 in turn 3 if it can't hold the whole thing at once.

### Cross-checking against Gemini

After Codex returns its review, compare against `docs/operations/REVIEW_BY_GEMINI_2026-04-19.md`. Findings that BOTH reviewers flag are the highest-confidence priorities. Findings only one of them caught are still real but warrant a sanity check before action. Findings Gemini caught that Codex missed (or vice versa) tell you something about each tool's blind spots.

### What we're hoping to learn

- What did Cos (Claude Code) get wrong over the last 5 days of fast-shipping?
- Are there pricing / positioning contradictions that have leaked into customer-facing surfaces during the rapid-iteration sprint?
- Is the Hollow / RRC pitch language structured in a way that creates securities-law exposure we haven't addressed?
- Is the codebase's multi-tenant isolation actually airtight, or just well-documented as airtight?
- What is the single-most-dangerous undocumented assumption in the repo?

If Codex finds even one of those, the review pays for itself.

---

*This prompt is a living artifact. Update the "RECENT STRATEGIC ADDITIONS" and "WHAT CHANGED SINCE GEMINI REVIEW" sections each time we run a fresh top-to-bottom. The next reviewer (whether human, Gemini, Codex, or a future model) needs the most current snapshot of where the business is, not where it was when the prompt was first written.*
