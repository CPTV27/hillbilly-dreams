# Off-the-Shelf Ecosystem Analysis

**Date:** 2026-05-12
**Question:** If Big Muddy ran on off-the-shelf SaaS products instead of our own custom platform, what would it look like and what would it cost?
**Companions:**
- `docs/infrastructure-cost-analysis-2026-05-11.md` — current state baseline
- `docs/infrastructure-cost-reduction-analysis-2026-05-11.md` — incremental cuts
- `docs/THE_THESIS.md` — the strategic frame this analysis tests

---

## TL;DR

- **Pure-dollar savings are surprisingly small.** A complete swap to off-the-shelf SaaS lands at **~$650–880/mo** vs. today's **~$740–1,005/mo**. Net: **$0–$200/mo saved**, or **$0–$2,400/yr**. Not life-changing.
- **The real cost being paid today isn't dollars — it's labor + cognitive load.** Chase's time maintaining custom infrastructure is the expensive line item. Off-the-shelf eliminates that. Conservatively: 5–10 hrs/week of platform work → freed.
- **The strategic cost of going pure off-the-shelf is the Glass Engine itself.** The "Measurably Better Things as a productizable B2B platform" thesis dies if we don't run a custom platform. Bearsville-as-second-region becomes "another set of Squarespace sites" instead of "the same OS in a second market."
- **Big Muddy as a brand and the businesses underneath (Inn, Touring, Records, Radio, Magazine) all survive intact on SaaS.** The customer-facing operation works either way.
- **Three viable scenarios** below, with end-state pictures. The fork is whether MBT is a real product or a private operational layer.

---

## The off-the-shelf replacement map

What each piece of the current custom stack would become if we swapped it for SaaS.

| Custom / self-hosted today | Off-the-shelf replacement | Monthly cost | What changes |
|---|---|---|---|
| **Next.js multi-tenant app on Vercel** (14 brand domains, one codebase) | **Squarespace Business**, 5 sites at $23/mo each — Touring, Inn, Records, Magazine, Directory landing | ~$115 | Each brand becomes its own SaaS site. No shared backend. Magazine theme ≠ Records theme. |
| **Sanity CMS** (Magazine + brand sites) | Bundled inside whichever site builder you pick | $0 marginal | Lose structured-content modeling. Each Squarespace site has its own native CMS. |
| **Neon Postgres** | Eliminated — no app DB to feed | $0 | All structured data lives in SaaS silos (Cloudbeds, Squarespace, Airtable, etc.). |
| **Hetzner CCX23 production server** | Eliminated — no self-hosted services | $0 | Immich → Google Photos. Postiz → Buffer. Plex → keep local. |
| **DigitalOcean droplet (AzuraCast)** | **Live365** for true 24/7 internet radio + royalty coverage bundled | $59 | Stream goes to Live365's player + native apps. Lose AzuraCast customization. |
| **Big Muddy Magazine (Sanity-driven editorial)** | **Beehiiv** newsletter at the Grow tier | $49 | Magazine becomes a newsletter with archive pages. Distribution is push (email) instead of pull (visit the site). Better SEO via Beehiiv pages. |
| **Big Muddy Directory** (custom Next.js Directory module, /circuit/venues) | **Airtable** + a **Notion / Glide** public-facing front-end | ~$25 | Loses the BMT-branded scout-map UX. Becomes a public Airtable embed. |
| **Booking + ticketing** (currently informal) | **Eventbrite** | $0 + per-ticket fees (~3.5%) | Standard. Loses brand control over the checkout page. |
| **Commerce / multi-party splits** (custom Stripe Connect) | **Shopify Basic** for merch + **Stripe Payment Links** for one-off settlements | $29 | Loses elegant artist/venue/promoter splits. Settlements become manual or use Stripe Connect's standard onboarding (still doable, no monthly). |
| **AzuraCast/streaming** | (covered above by Live365) | (covered) | |
| **Custom AI Content Pipeline** (Gemini + Claude routing via `lib/ai-models.ts`) | **Buffer with AI assistant** + Canva AI (already paid) | $15 | Loses cross-brand content sharing. Each brand posts independently. |
| **Sentry / observability** | **Sentry SaaS free tier** | $0 | Same product, smaller scale. |
| **Resend transactional email** | **Mailgun free** (1k/mo) or Gmail SMTP for low volume | $0 | Lose deliverability headroom; fine at low volume. |
| **Email marketing** (planned) | **Mailchimp Standard** | $35 | Standard list management. |
| **Records: Melody Vault platform** | **DistroKid Label** (already paying) + **Hypeddit** for marketing landing pages + **Spotify for Artists / Apple Music for Artists** (free) | $12 + $20 = $32 | Loses the "release calendar + artist task tracker" custom workflow Melody Vault provides. Each artist manages their own. |
| **Custom analytics / report cards** | **Google Analytics 4** + native platform analytics | $0 | Loses cross-brand rollup. Each platform reports separately. |
| **The "Glass Engine" / MBT platform** | Eliminated — Big Muddy is just a brand portfolio on SaaS | $0 | **MBT as a product / B2B platform thesis dies.** |

**What stays the same (already off-the-shelf):**
- Cloudbeds for the Inn ($300–500/mo) — Inn entity, not MBT
- Google Workspace Ultra ($35)
- Adobe CC + Photography ($70 combined)
- Canva Teams (~$30)
- Claude Pro × 2 for Tracy + Amy ($40)
- Bitwarden ($3)
- Spotify Family ($17)
- GitHub Team ($20)
- Restream (you're already paying for this off-the-shelf service)
- Tracy / Amy Asana free tier

---

## The cost comparison

### Today (custom stack)

| Bucket | Monthly |
|---|---|
| A. chasepierson.tv identity + AI stack | $350–380 |
| B. Studio C production stack | $125–170 |
| C. MBT platform managed cloud | $140–230 |
| C.1 GCP services | $50–100 |
| C.3 Records label ops | $24 |
| D. Production servers (Hetzner + DO) | $50–88 |
| **Today's total** | **$740–1,005** |

### Off-the-shelf equivalent

| Bucket | Monthly | Notes |
|---|---|---|
| Identity + AI stack (Workspace, Claude, Adobe, Canva, Bitwarden, Spotify) | $350–380 | Same as today |
| Studio C production (Adobe CC, CapCut) | $105 | Drops Restream from this bucket (moves to BMT side) |
| **NEW: Squarespace sites** (5 brand sites) | $115 | Replaces Vercel + Sanity + custom routing |
| **NEW: Live365** radio | $59 | Replaces AzuraCast + DigitalOcean |
| **NEW: Beehiiv** newsletter (Magazine) | $49 | Replaces custom magazine pipeline |
| **NEW: Airtable + Notion** (Directory) | $25 | Replaces custom Directory module |
| **NEW: Shopify Basic** | $29 | Replaces custom Commerce module |
| **NEW: Hypeddit** + DistroKid Label (Records marketing) | $32 | Keeps DistroKid; adds marketing layer |
| **NEW: Buffer Essentials** | $15 | Replaces custom AI Content Pipeline |
| **NEW: Mailchimp Standard** | $35 | Email marketing (which we don't yet have) |
| Restream (multi-stream) | $20–49 | Stays; already off-the-shelf |
| Buzzsprout (podcast) — OR Spotify for Podcasters free | $0–18 | Optional |
| Eliminated: Hetzner, DigitalOcean, Vercel, Sanity, Neon, ElevenLabs, Resend, Cloud SQL, Vertex AI bulk | -$200 to -$350 | Real savings on the custom infra side |
| **Off-the-shelf total** | **$634–760** | After all swaps |

### The headline math

- **Today:** $740–1,005/mo = $8.9k–12.1k/yr
- **Off-the-shelf:** $634–760/mo = $7.6k–9.1k/yr
- **Pure-dollar saving:** $80–245/mo = $960–2,940/yr

**The savings are real but modest.** Less than 25% at the high end.

---

## What the off-the-shelf ecosystem actually looks like

If you walked someone through Big Muddy in this world:

- **bigmuddytouring.com** is a Squarespace Business site. Has pages for the Inn, the route, the artist roster, the directory (as an embedded Airtable view), and an Eventbrite ticketing flow.
- **The Inn** runs on Cloudbeds (same as today). Squarespace front-end pulls room availability via Cloudbeds widget.
- **Big Muddy Records** lives at a separate Squarespace site (or a section of the touring site). Artist pages link to Spotify / Apple Music. Releases go through DistroKid. Marketing landing pages are on Hypeddit.
- **Big Muddy Radio** lives on Live365. The stream player embeds on the Touring site. The podcast lives on Spotify for Podcasters or Buzzsprout.
- **Big Muddy Magazine** is a Beehiiv newsletter. Subscribers get it via email; the archive lives at `magazine.bigmuddytouring.com` or `bigmuddy.beehiiv.com`. SEO comes from Beehiiv's native pages.
- **The Directory** is an Airtable database. Public-facing view embeds in a Notion site or as an iframe on the Touring page. Filter, sort, search — all Airtable-native.
- **Booking shows** uses Eventbrite. Each show is a separate Eventbrite event. Tickets sold there; settlements go to the artist via Stripe Connect Standard (no custom multi-party math).
- **Social posts** queue through Buffer. Cross-posted to Instagram, Facebook, TikTok, LinkedIn, Twitter — same as today, just paid SaaS instead of self-hosted Postiz.
- **Email marketing** runs through Mailchimp. Past-guest sequences, welcome series, win-back campaigns.
- **Analytics** is Google Analytics 4 for web + native platform analytics (Spotify for Artists, Eventbrite reports, Beehiiv stats, Live365 listener counts) read individually.
- **The "Glass Engine"** is gone. No multi-tenant Next.js app, no shared Postgres, no Sanity, no custom routing. Each brand is its own SaaS account.
- **"Powered by Measurably Better Things"** footers come off everything. MBT as a stand-alone product / B2B engagement story stops existing.

---

## What changes strategically

### What you lose

1. **The MBT / Glass Engine thesis.** Per THE_THESIS, MBT is a licensed civic-commerce operating system. If Big Muddy isn't running on MBT, there is no MBT to license. Bearsville becomes "the same brand operation in a new region" instead of "the same OS in a new region." Future B2B engagements (Vicki Wolpert, Biscuits & Blues, others) can't be sold the platform — only individual marketing services.
2. **Cross-brand integration.** Today the magazine, the radio, the directory, and the commerce module all share a database and a brand system. In SaaS land, each is a silo. A show booked through Eventbrite doesn't auto-create a Big Muddy Records release calendar entry the way it would inside the custom platform.
3. **Brand consistency.** Each Squarespace site has its own template feel. Today the brand system is enforced centrally via shared CSS tokens and a single design language.
4. **Audience data ownership.** Each SaaS keeps the data it collects. Substack owns its subscribers in some sense. Live365 owns its listener data. Eventbrite owns its ticket buyers. Today everything lands in our database; we own the data.
5. **The Directory as a moat.** Today the directory at `bigmuddytouring.com/circuit/venues` is publicly indexed by search engines under the Big Muddy domain. As an Airtable embed, it's still searchable but less of a unique asset.
6. **"Powered by Measurably Better Things" as marketing.** The footer that signals the platform across properties just goes away.

### What you gain

1. **Real labor savings.** Estimated 5–10 hrs/week of Chase's time that currently goes to platform maintenance, deploys, infrastructure decisions, schema design, custom feature work. That's the actual win.
2. **Predictable monthly bills.** Each SaaS has a clear price and a free tier and a documented upgrade path. No "what's the actual AzuraCast bill this month" question.
3. **Faster onboarding for new operators.** Sean Davis doesn't need to learn the BMT custom stack. He uses Eventbrite for ticketing, Buffer for socials, Airtable for the venue list — tools he already knows or can learn in an hour.
4. **No "fall behind on infrastructure debt" risk.** Vercel, Sanity, Neon, Hetzner — every custom dependency is a thing that can break, fall behind, or surprise us. SaaS is the vendor's problem.
5. **Easier exit / handoff.** If Chase ever wanted to step back from operations, off-the-shelf is hand-offable. Custom is not.
6. **Less surface area for tooling debates.** Stop arguing whether to migrate to a different framework or self-host this or that. Pick the SaaS, use the SaaS.

---

## Three scenarios

### Scenario A — Pure off-the-shelf (the full swap)

Everything described above. Drop MBT as a product. Big Muddy is a brand portfolio on a SaaS stack. Bearsville is the same model in a new region — same SaaS tools, same brand playbook, no shared software platform.

**Annual spend:** $7.6k–9.1k (vs. $8.9k–12.1k today)
**Labor freed:** ~5–10 hrs/week of Chase's platform-maintenance time
**Strategic cost:** MBT-as-product is dead. No B2B platform engagements. No "Powered by Measurably Better Things" story. The "Glass Engine" disappears from the brand.

**Right answer if:** Chase wants out of platform engineering entirely. The lifestyle wins; the productizable-platform story loses. Big Muddy as a business survives intact.

### Scenario B — Hybrid (keep one custom thing, off-the-shelf everything else)

The honest middle path. Pick **one** custom asset to keep as the moat, off-the-shelf the rest.

**The strongest candidate to keep custom: the Directory.** It's the asset that's most uniquely Big Muddy, most defensible (search-indexed, growing over time), and lightest to maintain. The venue database is a SQL table plus a React component. Hetzner + a free Postgres on the existing box would run it for ~$40/mo of infrastructure.

**Drop custom: the Magazine (Sanity), the Radio infrastructure (AzuraCast + DigitalOcean), the multi-tenant routing on Vercel.** Move Inn / Touring / Records to Squarespace, Magazine to Beehiiv, Radio to Live365.

**Annual spend:** ~$8k–9.5k (closer to off-the-shelf)
**Labor freed:** ~3–5 hrs/week (less than full swap; some platform maintenance remains)
**Strategic cost:** MBT-as-product story is more nuanced. The Directory is a real proof-point of "we built something specific to the corridor that nobody else has." Sellable to similar regional B2B engagements with a specific scope — directory work — even if the full nine-module platform isn't.

**Right answer if:** Chase wants the lifestyle win without fully killing the unique-asset story. The Directory is the keepable moat.

### Scenario C — Status quo (the current custom platform path)

Everything stays. The Glass Engine thesis stays alive. Bearsville and future B2B engagements get sold the platform. The "Powered by Measurably Better Things" footer is real and means something.

**Annual spend:** $8.9k–12.1k (with the easy-tier cuts from the cost reduction analysis, lands closer to $7.5k–9.5k)
**Labor cost:** ~5–10 hrs/week of platform maintenance, indefinitely
**Strategic position:** MBT is a productizable thing. The thesis holds.

**Right answer if:** Chase is committed to MBT-as-product as a real long-game and the platform engineering work is part of how he wants to spend his time.

---

## What this actually tests about THE_THESIS

THE_THESIS says Big Muddy is **not a startup chasing a unicorn** — it's a portfolio of existing businesses being amplified by shared infrastructure. The shared infrastructure is the MBT platform.

The honest read: **the platform is doing two jobs at once.**

- **Job 1: Make the existing businesses cost less to run together.** Today this is genuinely true — one CMS instead of five, one DB instead of N, one auth system instead of five. But the savings are modest, and SaaS bundles increasingly compete with what the platform delivers.
- **Job 2: Be a productizable thing we can sell to other regional ecosystems.** This is the Bearsville → Vicki Wolpert → "MBT as licensed civic-commerce OS" path. This is the bigger bet hidden inside the smaller bet.

**If Job 2 is real**, the platform stays — even at the labor cost. MBT is the product; Big Muddy is the proof market.

**If Job 2 isn't real** (or isn't going to be real in a meaningful timeframe), Job 1 alone doesn't justify the labor cost of running custom infrastructure. Off-the-shelf wins.

The cost question Chase asked is really a strategic question about Job 2.

---

## My analytical read

*Clearly labeled as analytical, not a neutral fact.*

The dollar savings from off-the-shelf are too small to justify it on cost grounds alone. **The decision is about labor and strategy, not money.**

Chase is currently paying ~$1,000/mo in platform costs AND ~5–10 hrs/week in maintenance. The 5–10 hrs/week is the bigger number. If that time would be more valuable spent on touring, photography, label development, partner relationships — the answer leans off-the-shelf.

But Chase explicitly designed MBT as a thing to be licensed. Per ORIGIN_STORY.md: *"MBT doesn't sell software — it sells the entire media stack as a service. $99/mo gets you what would cost $50K/mo to build yourself."* That sentence only holds if there's an actual stack to license.

**My read:** Scenario B (hybrid) is the most honest middle path. Keep the Directory as the unique moat — it's lightweight to maintain and represents real differentiation. Off-the-shelf the rest. Reset the MBT story from "nine-module platform" to "we built and operate a specific kind of regional asset" (the directory) and let MBT be the operating layer that strings off-the-shelf tools together, not a custom application stack.

This preserves the lifestyle goal in THE_THESIS while not killing the productizable-thing story entirely. The platform as an OS stops being a product; the Directory becomes the thing we can offer other markets.

But this is my analytical read, not a partner decision. If this question goes to Tracy + Amy, it needs to be re-framed as neutral facts (per `feedback_partner_memo_neutral.md`).

---

## What a 90-day pilot would look like (if you wanted to test it)

Don't migrate everything at once. Test one piece.

**Pick the easiest one to swap and the easiest one to revert:** the Magazine.

- Move Big Muddy Magazine from Sanity-on-Vercel to Beehiiv. ~1 day of content migration.
- Run for 60 days. Measure: editorial cadence, reader engagement, SEO traffic, time Chase spends on it.
- Decide at 60 days whether Beehiiv is better, worse, or a wash.
- If better → expand to Radio (Live365) and Directory (Airtable) next.
- If worse → revert; keep custom; have learned something.

Cost of the test: $49/mo for Beehiiv × 2 months = $98 + one day of migration. Cheap learning.

---

## Next

If this analysis is useful, three follow-ups Chase could request:

1. **Drill into one scenario in detail.** Pick A, B, or C. I expand on the specific migration steps, the per-tool risk, the timing.
2. **Re-frame as a partner decision.** Strip my analytical read; restate as neutral facts. Goes to Tracy + Amy as a joint review (same shape as the Sean Davis review packet).
3. **Build the 60-day Magazine pilot plan.** Concrete: which Sanity content moves, which Beehiiv plan, which migration script, which measurement criteria.

Or none of the above — this analysis can sit as a strategic document and the decision can wait.

— Chase, May 2026
