# External LLM Strategic Analysis Prompt

**Purpose:** A self-contained prompt to paste into ChatGPT, Gemini, another Claude instance, or any frontier LLM to get an independent analysis of Big Muddy Touring's situation, opportunities, and strategic options. The LLM doesn't have any prior context with us — this prompt provides everything it needs.

**How to use:**
1. Open ChatGPT, Gemini, Perplexity, or another LLM (a fresh chat — no prior context with you)
2. Paste the entire prompt below (everything between the `===PROMPT START===` and `===PROMPT END===` markers)
3. Get an independent strategic analysis + recommendations
4. Compare against the existing analyses in this repo
5. Optionally paste into multiple LLMs and compare their reads — useful triangulation

**What to expect:**
- The LLM will produce ~2,000–4,000 words of strategic analysis
- It will likely offer 3–5 specific recommendations
- It won't know your nuances (Tracy, Amy, Chase as people) but will work from the facts
- Different LLMs will frame the answer differently — that's the value of multiple takes

---

===PROMPT START===

I need your honest strategic analysis of an entertainment + hospitality + media business I co-own. Read the full context below carefully, then provide your independent analysis.

## My role

I'm Chase Pierson, one of three equity partners in Big Muddy Touring + Big Muddy Inn, anchored in Natchez, Mississippi. The other two partners are Tracy Alderson-Allen (finance, the Inn, business development) and Amy Allen (hospitality, music, Blues Room programming). Tracy and Amy co-own the Inn (a2natchez LLC). Big Muddy Touring is in formation as its own LLC.

## What we operate today

**Big Muddy Inn (Natchez)** — six guest rooms, a listening room (the Blues Room), regular live music, a bar. Operating since [several years]. The primary revenue source today.

**Big Muddy Touring** — booking, transport, season programming. Memphis to New Orleans down Highway 61. We just got a Sprinter van. A 40-foot Prevost sleeper bus is on the long roadmap.

**Big Muddy Records** — non-exclusive promotional label. Artists keep masters. Current roster: Mechanical Bull (a band with a 20-year catalog), Amy Allen's three musical projects (Big Muddy Blues Band, The Amy Allen Experience, Arrie Aslin). A small publishing catalog with writers in the network. Distribution via DistroKid Label.

**Big Muddy Radio** — a 24/7 internet stream (currently broken SSL, not publicly polished), plus podcasts and curated playlists.

**Big Muddy Magazine** — editorial pipeline. Long-form features, city guides, photo essays, scene reporting.

**Big Muddy Directory** — a publicly-indexed scout map of 67 music venues across 15 towns on the Mississippi corridor. Lives at `bigmuddytouring.com/circuit/venues`. Built as a custom Next.js page.

**Three partner production studios sitting alongside as collaborators (not employees, not vendors):**
- Chase Pierson Photography — my established 6-year practice, $100k+/yr revenue, portraits / live music / editorial / brand commercial work
- Studio C Video — partner studio run by Miles and Elijah. Video production, music videos, multi-camera live, EPK reels
- Tuthill Design — partner studio. Identity, print, posters, album packaging

**Underlying infrastructure (currently):** A custom multi-tenant Next.js app on Vercel serving 14 brand domains, Sanity CMS for editorial, Neon Postgres for data, a Hetzner server for self-hosted services (Immich photo library + Caddy reverse proxy), a DigitalOcean droplet running AzuraCast for the radio stream, plus a stack of AI APIs (Anthropic, Gemini, ElevenLabs, Perplexity).

## Our financial frame (THE_THESIS)

- **Break-even floor:** approximately $200k/yr ecosystem revenue (this is the line where we cover all costs).
- **First real profit milestone:** $250k/yr.
- **Baseline target:** $330k/yr.
- **Growth target:** 25%/yr sustainable. **No fundraise. No unicorn pressure.**
- **The ceiling is quality of life** — we will not trade more revenue for less of the life that justifies the work.

Today's actual revenue stack: Inn room nights + Chase's photography ($100k+/yr) + an $18k/yr passive royalty from a prior venture (Scan2Plan). Everything else is aspirational.

Software + infrastructure spend today: ~$740–1,005/mo. We have a hard cap at $1,000/mo. Studio C and Tuthill have $1,000/mo retainers each ($50/hr × 20 hrs/mo). Chase contributes $2k/mo of personal living costs that the ecosystem needs to cover. Total gross ecosystem costs: ~$203k/yr.

## Decisions we've already made

These are locked. Don't propose reversing them.

1. **MBT brand dropped.** "Measurably Better Things" as a brand / framing layer is gone. Public-facing umbrella is just **Big Muddy Touring** (containing Radio, Magazine, Records, Directory) + **Big Muddy Inn** as a sister brand. No "Powered by Measurably Better Things" anywhere.
2. **Job Two (productize the platform as B2B) dropped.** We are not going to license our infrastructure to other regional ecosystems. The platform's only job is reducing our own cost-of-running (Job One).
3. **Bearsville Creative as a second-region brand deferred to Year 2+.** Chase living in the Hudson Valley May–October is separate from any brand launch there.
4. **Lifestyle is the ceiling.** Per THE_THESIS verbatim.
5. **Tracy and Amy are equity partners.** They are not employees. Decisions affecting them get framed as joint partner decisions, not directives.

## The Sean Davis question

Sean Davis is in conversation with us as a potential collaborator:
- Year-round Natchez resident (Chase is in the Hudson Valley May–October — Sean fills the local presence gap)
- Ex-director of the Arcade Theater in Ferriday, Louisiana (a 300-capacity venue 15 minutes from Natchez, rent ~$225/show with Friends of the Arcade sponsorship)
- One month into managing **Doug Duffy and Badd**, a band he'd want signed to Big Muddy Records on non-exclusive promo terms

Two scopes are on the table:
- **Aggressive:** Full Season One — 6–8 Arcade shows + Records signing + Sean publicly credited as a BMT collaborator
- **Conservative:** One trial Arcade show with Doug Duffy and Badd, decide on full Season One based on the result

Sean's role would be project-based, non-exclusive, no equity in Season One. Phase 2 (after Season One) is deliberately open — could be project-based continuation, more formal operating role, revenue share, or principal in the future Big Muddy Touring LLC.

## Three infrastructure options I'm comparing

**Option A — Operational Simplicity (pure off-the-shelf SaaS).** Everything moves to SaaS. Squarespace for the public site. Cloudbeds for the Inn (unchanged). Beehiiv for the Magazine. Airtable for the Directory. DistroKid + Hypeddit for Records. Eventbrite for ticketing. Klaviyo for email marketing. Buffer for social. Shopify Lite or Stripe Payment Links for commerce. The whole `apps/web` codebase frozen as historical reference.
- BMT-side monthly: ~$601
- Annual savings vs. today: $1,700–4,800
- Chase's recovered labor: 5–10 hrs/week

**Option B — Hybrid.** Same as Option A but keep ONE custom piece: the Big Muddy Directory at `/circuit/venues`. Lightweight to maintain ($40 Hetzner box), real moat (search-indexed BMT-branded scout map), serves Job One.
- BMT-side monthly: ~$650
- Annual savings vs. today: $1,300–4,200
- Chase's recovered labor: 3–5 hrs/week

**Option C — Status Quo.** Continue the custom Next.js platform. Pay $740–1,005/mo + 5–10 hrs/week of Chase's maintenance labor indefinitely. Keep maximum flexibility for bespoke features.

## What I want from you

Please provide an independent strategic analysis with the following structure:

### 1. Honest read of the situation
Tell me what you actually see. Don't soft-pedal. If you think we're over-built, say so. If you think we're under-investing somewhere critical, say so. If THE_THESIS objectives don't match what we're actually doing, point it out.

### 2. The biggest risk we're not seeing
What's the thing we're likely missing? Where's the blind spot?

### 3. The biggest opportunity we're not pursuing
What's the obvious-in-hindsight move we should be making?

### 4. Your recommended infrastructure choice
Pick one of A, B, or C — with reasoning. Don't hedge. If you genuinely think a different option I haven't listed is right, propose it.

### 5. Your recommended Sean Davis scope
Pick aggressive or conservative — with reasoning.

### 6. The single highest-leverage move I should make in the next 30 days
One concrete action. Not a list.

### 7. What you would do differently if you were running this
Be honest. If you'd kill something we're doing, say so. If you'd double down on something we're treating as marginal, say so.

### 8. Three counter-arguments to your own recommendations
Steel-man the case against your own answers. This forces you to surface what you might be missing.

### 9. What additional information would change your analysis
What do you need to know that I haven't told you? If the answer to a question would meaningfully change your recommendation, flag it.

### 10. The decision-maker test
Imagine I have 90 minutes to make all the relevant decisions and act on them. What's the order I do them in?

## Rules for your response

- **Be direct.** Don't pad. Don't equivocate.
- **Use specific numbers when relevant.** Reference my financial frame.
- **Don't propose anything that requires more capital than we have** (no fundraise, no major hires).
- **Respect THE_THESIS lifestyle ceiling.** Don't recommend anything that would require us to work harder, not smarter.
- **Steel-man what you disagree with.** Where my plan or my partners' instincts diverge from your recommendation, explain both honestly.
- **Aim for 2,000–4,000 words.** Long enough to be substantive, short enough to actually read.

Go.

===PROMPT END===

---

## How to use the output

1. **Read the LLM's response fully before reacting.** First instinct on AI-generated strategy advice is often dismissive. Wait 24 hours; read it again.
2. **Compare against the in-repo analyses:**
   - `docs/first-principles-strategy-2026-05-12.md` — internal first-principles take
   - `docs/strategic-options-comparison-2026-05-12.md` — the option comparison
   - `docs/off-the-shelf-ecosystem-analysis-2026-05-12.md` — the per-service SaaS analysis
3. **Look for what the LLM caught that I missed.** That's the actual value of a second opinion — not validation, but blind-spot detection.
4. **Triangulate across LLMs.** Paste into ChatGPT-5, Gemini 2.5 Pro, and Claude Opus 4.5 (or whatever's current) and compare. Where they agree, that's a stronger signal. Where they disagree, that's where the genuine ambiguity is.
5. **Don't outsource the decision.** Use the analysis as input; the decision is still Chase's (and the partners').

## Variants of this prompt

If you want a different cut, adjust the closing section before pasting:

- **"Just the cost analysis"** — replace the structured response with: "Focus only on the infrastructure cost decision. Recommend A, B, or C with reasoning. Skip everything else."
- **"Sean Davis only"** — "Focus only on the Sean Davis partnership scope. Aggressive or conservative? Why? What would change your answer?"
- **"What am I missing"** — "Forget recommendations. Tell me three things this situation makes likely that I'm not preparing for."
- **"Stress-test THE_THESIS"** — "The thesis says lifestyle is the ceiling and growth is 25%/yr sustainable with no fundraise. Where does that break? What scenarios force a tradeoff?"

---

## A note on the prompt design

This prompt is built to:
1. **Give the LLM enough context** to actually analyze, not just regurgitate platitudes.
2. **Lock in the decisions already made** so it doesn't waste tokens re-proposing them.
3. **Force the LLM to be honest** by asking for counter-arguments to its own answers.
4. **Force specificity** by asking for one concrete move, one decision per option, etc.
5. **Surface its information gaps** so I know what to follow up on.

Frontier LLMs are good at strategic analysis when they're given enough context and forced to commit to specific answers. They're bad at strategic analysis when they're asked vague questions and rewarded for hedging.

— Chase, May 2026
