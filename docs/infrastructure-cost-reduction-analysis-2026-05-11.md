# Infrastructure Cost Reduction Analysis

**Date:** 2026-05-11
**Companion:** `docs/infrastructure-cost-analysis-2026-05-11.md` (the baseline inventory) + `docs/infrastructure-cost-analysis-2026-05-11.csv`
**Audience:** Chase (and Tracy + Amy for relevant decision points downstream)
**Purpose:** Where the real savings are if we shrink the stack. Walks Chase's four levers: reduce cloud footprint, swap in third-party platforms where they're cheaper, reduce surface area, address Asana specifically.

---

## TL;DR

- **Realistic 90-day target:** **$150–400/mo** of savings = **$1,800–4,800/yr**, against a current MBT spend of ~$740–1,005/mo. That's a **20–40% cut** if everything lands.
- **Easy this-week wins** (no friction, just cancellations): ~$60–130/mo. Mostly killing redundant AI APIs and a couple of small overlaps.
- **Medium wins (1–2 weeks):** ~$50–90/mo. Consolidating servers, killing audio infrastructure that's pre-audience.
- **Hard wins (1–2 month migration projects):** ~$40–190/mo. Replacing Sanity and Vercel are the big ones — but the migration cost is real and you have to want it.
- **The Asana question:** if you're on the free tier today, going Asana-free saves $0 and adds churn. If you're paying, switch to the free tier first before considering alternatives. Real consolidation move would be Notion (tasks + docs + memos in one tool) but the friction is high. **Default: stay on Asana free, revisit Q4.**
- **What I'd refuse to cut:** Claude Max ($125), Adobe CC for Elijah ($60), Cloudbeds for the Inn ($300–500), Google Workspace Ultra ($35), Vercel Pro (without a real migration plan). These are load-bearing.
- **Hidden ask underneath the spend question:** the bigger lever isn't the cost. It's whether **Big Muddy Radio's whole audio stack** (AzuraCast + DigitalOcean + Buzzsprout + ElevenLabs + Restream) is paying back yet. If we're pre-audience, dropping that whole stack is a ~$80–150/mo cut + a huge operational simplification. The cost analysis is partly a forcing function for that strategic question.

---

## Methodology

Each opportunity is scored two ways:

- **Impact** — monthly $$ saved, plus surface-area reduction (fewer tools, fewer credentials, fewer integrations, less to break).
- **Ease** — migration effort, training cost, risk to ongoing operations.

Categories of move:
- **Cut** — cancel outright, capability gone.
- **Consolidate** — multiple subscriptions or hosts collapse into one.
- **Replace** — swap a paid tool for a cheaper one (free tier, OSS, partner stack).
- **Self-host** — move a managed service onto Hetzner (which is currently under-utilized at 11 GB used / 150 GB).
- **Reverse self-host** — move a self-hosted thing TO a paid service if the SaaS is cheaper than the operational load.

What this analysis does NOT recommend cutting:
- **Load-bearing infrastructure** that keeps the websites, the Inn, or partner work alive.
- **Subscriptions whose value is in the partners' hands** (Tracy + Amy's Claude Pro accounts, Tracy's Attio, etc.) — those decisions are theirs.

---

## Lever 1 — Reduce cloud footprint

The principle: move managed cloud services onto the Hetzner box we already pay for, which is currently 7% utilized.

**Hetzner CCX23 today:** 4 vCPU, 16 GB RAM, 150 GB NVMe. Running Immich + Caddy. ~11 GB disk used. We have substantial headroom for additional services.

### Candidates to self-host on Hetzner

| Service today | Monthly | Self-host on Hetzner means | Effort | Risk |
|---|---|---|---|---|
| **Neon Postgres** | $19 | Run Postgres in Docker alongside Immich. Daily pg_dump → R2 / GCS backup. | Medium (2–4 hrs setup + backup automation) | Medium — DB outages now have a single point of failure. Worth it only if we have backup discipline. |
| **DigitalOcean AzuraCast droplet** | $12–48 | Run AzuraCast in Docker on Hetzner. Stream domain CNAME stays the same. | Medium (3–6 hrs + DNS) | Low — same software, different box. Resolves the SSL issue while we're in there. |
| **Resend (transactional email)** | $20 | Run Postal or Listmonk + relay through a transactional SMTP provider's free tier (Mailgun free, SendGrid free at 100/day). | Hard — email deliverability is a domain reputation problem; self-hosting can poison your domain. | High — not worth it unless you really know what you're doing. |
| **Sentry** | bundled in Vercel? | Run Glitchtip (open-source Sentry-compatible) on Hetzner. | Medium | Low — observability degradation if it goes down isn't critical. |
| **Sanity CMS** | $15–99 | Run Strapi or Directus on Hetzner. Content schema migration is non-trivial. | Hard (1–2 weeks if any non-trivial content exists) | High — CMS migrations break references, lose history. |

**Realistic targets:**
- **Move AzuraCast → Hetzner.** Saves $12–48/mo + kills one host + fixes SSL while we're in there. **Recommended.**
- **Move Neon → Hetzner.** Saves $19/mo. Requires backup discipline. **Recommended IF we have backup automation; defer if we don't.**
- **Skip self-hosted email.** Resend is cheap insurance against deliverability problems.
- **Skip self-hosted Sanity** unless you have specific reasons. The migration cost is high.

**Total realistic Lever 1 savings:** $31–67/mo.

---

## Lever 2 — Use other platforms instead of our own

The principle: some things we self-host or pay for would be cheaper / simpler if we used somebody else's free or freemium platform.

### Candidates to NOT-self-host

| What we run today | Replace with | Savings vs. today | Tradeoff |
|---|---|---|---|
| **Self-hosted Immich** (Hetzner) | Google Photos via Workspace Ultra 2TB (already paid) | $0 saved (Hetzner stays for other things) but eliminates one stack | Loses Immich's bulk-photo features + AI search. Google Photos has these but for fewer photos free. |
| **Self-hosted Postiz** (Mac mini) | Buffer Starter ($15/mo) or Later free tier | Maybe -$15/mo, but eliminates Mac mini dependency | Postiz is free; the value is consolidation, not dollars |
| **Self-hosted OpenBroadcaster** (Mac mini) | Live-stream directly from OBS Studio to YouTube/FB Live | $0 saved; eliminates one stack | Less control; depends on YouTube/FB live infra |
| **Self-hosted Open Notebook** (Mac mini) | Google NotebookLM (free, in Workspace Ultra) | $0 saved; eliminates one stack | NotebookLM has a doc-count limit; Open Notebook is unlimited |
| **AzuraCast streaming** | Mixcloud or SoundCloud as the "radio" channel until there's an audience | $40 + DigitalOcean cost = $52–88/mo saved | Loses 24/7 stream branding. Strategic question, not just a cost question. |
| **Buzzsprout podcast hosting** | Spotify for Podcasters (free) | $18/mo saved | Loses Buzzsprout's analytics + episode-by-episode hosting niceties. |
| **ElevenLabs voice** | GCP TTS Journey (fallback already provisioned, $0–5) | $20–25/mo saved | Voice quality is lower. Matters for Delta Dawn agent voice + radio. |
| **Big Muddy Records DistroKid + SoundCloud Pro** ($24) | DistroKid Musician tier ($23/yr) for one or two artists | -$22/mo if we drop the Label tier | Loses unlimited-artists capability. Justified only if roster is small for a while. |
| **CapCut Team** ($45–60) | DaVinci Resolve (free) on Elijah's workstation | $45–60/mo saved | Elijah retraining; collaborative edit flows different. Big enough to be worth Elijah's input. |

**Realistic targets in this category:**
- **Drop ElevenLabs** if Delta Dawn voice + radio quality don't justify $25/mo. Use GCP TTS Journey. **Save $20–25/mo.** Easy.
- **Drop Buzzsprout** if Spotify for Podcasters covers the use case. **Save $18/mo.** Easy.
- **Replace AzuraCast with Mixcloud / SoundCloud** — this is the big one. It's a strategic move about whether we're pre-audience on the radio. If yes, drop the whole stack. **Save $52–88/mo + huge surface-area reduction.** Strategic.
- **Replace CapCut with DaVinci Resolve** — needs Elijah's buy-in. **Save $45–60/mo.** Hard.

**Total realistic Lever 2 savings:** $90–190/mo depending on the strategic calls.

---

## Lever 3 — Reduce overall surface area

The principle: fewer tools = less to manage, fewer credentials, less complexity. Some savings here aren't dollar-driven but cognitive-load-driven.

### Audits + simplifications

| Surface | Current state | Action | Savings | Why |
|---|---|---|---|---|
| **Two Gemini API keys** | Per CANONICAL_INFRASTRUCTURE §5 | Audit usage, retire the legacy one. | $0 direct but hygiene | One canonical key; rotate cleanly |
| **Two Cloudflare API tokens** | "D1 Agent Desk" and "Huck" | Audit scopes, retire if duplicate. | $0 | Same hygiene |
| **Cloud SQL `sovereign-db-primary`** | Unknown purpose | Audit what uses it. Kill if nothing. | $0–50/mo (unknown until checked) | A "ghost" service in the bill. Top open audit item. |
| **Mystery Bitwarden items** (Loopback, Developer Knowledge API, mbt-seed-writer, Chuck/Huck/Ledger webhooks) | Per CANONICAL_INFRASTRUCTURE §5 | Document each in a single pass; retire what's not active. | $0–25/mo | Could surface a subscription we forgot about |
| **Deprecated Google Workspaces** | bigmuddyinn.com + hillbillydreamsinc.com | Already on the cancellation list per ecosystem-subscriptions §6a, due May 15. | $24–48/mo | Easiest big-impact win on the books today |
| **Two Adobe accounts** (Photography + CC full) | Both paid via MBT card | If Elijah's full CC covers Chase's needs, drop the standalone Photography plan. | $10/mo | Need confirmation that Chase + Elijah can co-exist on one Adobe org without license collisions |
| **Spotify Family 6 seats** | Personal + research | If only Chase / Tracy / Amy use it, drop seats or cancel entirely | $17/mo | Marginal — quality-of-life cut more than a real savings. Sensitive. |
| **5 Canva Teams seats** | Chase / Tracy / Amy / Miles / Elijah | If <5 are active, drop to 3 | $6/mo per seat dropped | Verify actual usage first |
| **ChatGPT API** | $50/mo cap | If usage <$5/mo (likely — Claude + Gemini cover most cases), cancel | $50/mo | Among the easiest big-dollar cuts |
| **Perplexity API** | $20–50/mo | Gemini Pro has search; Perplexity Pro covers most research queries. API may be redundant. | $20–50/mo | Verify actual API call volume first |
| **DigitalOcean droplet** | $12–48/mo for AzuraCast | Migrate to Hetzner (see Lever 1) | $12–48/mo | One less host to manage |
| **Mac mini as services host** | "Demoted" per CANONICAL_INFRASTRUCTURE but still runs Postiz, OpenBroadcaster, Plex, Open Notebook | Complete the migration to Hetzner OR formally retire each Mac mini service | $0 but huge cognitive | The mini-as-services-host story is half-finished. Close it. |

**Realistic targets in Lever 3:**
- **Cancel deprecated Google Workspaces** (already planned, do it). **Save $24–48/mo.**
- **Cancel ChatGPT API** unless evidence of real use. **Save up to $50/mo.**
- **Cancel Perplexity API** unless evidence of real use. **Save $20–50/mo.**
- **Drop duplicate Adobe Photography plan** if Elijah's CC org permits. **Save $10/mo.**
- **Close the Mac-mini-as-services-host story** — either migrate everything to Hetzner OR formally retire the services. Surface-area only, no dollars.

**Total realistic Lever 3 savings:** $54–158/mo direct + significant cognitive-load reduction.

---

## Lever 4 — Asana-free + similar

The principle: **simpler tooling for the task management surface.**

### The Asana question

**What we know:**
- Asana is NOT in the subscriptions doc as a paid line item. Most likely we're on the **free tier** (10 users, basic features).
- The team is 3 equity partners + Miles + Elijah + future Hospitality Coordinator = ~6 people. Free-tier comfortably fits.
- Tracy and Amy's Claude Pro accounts have Asana MCP attached — they have agent-driven workflows there.
- Per CLAUDE.md the cos-ingestion-rule routes work-shaped input from Chase into Asana automatically.

**If we're on the Asana free tier today:** going Asana-free saves $0/mo. The reason to switch isn't cost — it's surface area, consolidation, or feature/dislike issues.

**If we're paying for Asana:** verify the line item, then either drop to free tier or migrate. Most realistic paid use case for a team this size is the Starter plan at ~$11/seat/mo; for 6 seats that's $66/mo. Worth verifying before any deeper decision.

### Alternatives ranked by fit for this operation

| Alternative | Cost | Fit | Friction |
|---|---|---|---|
| **Stay on Asana free** | $0 | Today's workflow keeps working. Cos-ingestion-rule, partner agents, MCP integrations all keep working. | None |
| **GitHub Projects** | $0 (already paying GitHub Team) | Good for engineering-track work. Less polished than Asana for partner-facing tasks. Tracy + Amy would need GitHub accounts comfortable enough to navigate. | Medium — Tracy + Amy onboarding to GitHub-as-task-tool |
| **Notion** | $0 free / $8–15/seat paid | Big consolidation win — tasks + docs + memos + databases all in one tool. Could replace Asana + parts of Google Drive + parts of the GitHub-as-docs pattern. | High — migration project, but the consolidation payoff is real |
| **Things 3** | $50 one-time per Apple device (free via the MCP existence) | Personal-favorite. Not collaborative. Wrong tool for partner coordination. | N/A — not really a candidate for a 3-partner team |
| **Plain markdown TODOs in the repo** (e.g., `WEEKLY_COMMITMENTS.md` that Cos reads/writes) | $0 | Maximum simplicity. Cos can edit. No new tool to learn. Loses the polished Asana UI Tracy + Amy currently use. | High for Tracy + Amy (UI regression) |
| **Linear** | $0 free / $8+/seat | Engineering-team-shaped. Not the right tool for partner coordination work. | Doesn't fit the actual use case |
| **Self-hosted Plane** (Hetzner) | $0 + Hetzner load | OSS Asana-alternative. Adds ops load to Hetzner. | High — yet another service to maintain |

### Honest read on Asana

The Asana-free question isn't really about saving money — there's probably no money to save. **It's about whether the Asana surface area is paying back for what we run there.** Two ways to think about it:

1. **If Asana is doing real work** (Cos routing, partner agent comms, weekly commitments tracking, the new Sean Davis partner-review tasks): keep it. The free tier is the right level. Going Asana-free here would lose working machinery.
2. **If Asana is mostly empty / Tracy + Amy aren't actually using it for what they're supposed to**: that's a different problem than the tool — it's an adoption problem. Switching to Notion or markdown TODOs doesn't fix that; only working with the partners does.

**Recommendation:** stay on Asana free tier. Set a Q3 review checkpoint with Tracy + Amy: "Is Asana working for you? What would you rather it be?" Decision driven by adoption, not by spend.

### Other "similar" simplifications

Same principle (cut tools, not capability) applies to a few other surfaces:

- **Slack / Discord / iMessage:** already on iMessage + Asana + Drive comments per the deferred list. Don't add team chat — surface area we don't need.
- **OpenPhone / Twilio numbers per brand:** deferred per ecosystem-subscriptions §6h-def. Skip until there's a clear operational need.
- **Calendly:** if Workspace Ultra calendar sharing works, skip Calendly entirely.
- **Zoom + Loom + Descript + Otter + Fireflies:** the planned addition of a meeting-recorder ($10–30/mo) only justifies if it actually feeds the canonical docs. Otherwise it's another tool. Pick one, use it, don't stack.

---

## Top 10 opportunities ranked

| # | Move | Lever | Monthly savings | Effort | Risk | Recommend? |
|---|---|---|---|---|---|---|
| 1 | Cancel deprecated Google Workspaces (bigmuddyinn.com + hillbillydreamsinc.com) | 3 | $24–48 | Trivial | Low | **Do this week.** Already planned for May 15. |
| 2 | Cancel ChatGPT API (if usage is low) | 3 | up to $50 | Trivial | Low (Claude + Gemini cover) | **Do this week** after checking last-month usage. |
| 3 | Audit & retire Cloud SQL `sovereign-db-primary` if unused | 3 | $0–50 | 30 min audit | Low if truly unused | **Do this week.** Open question. |
| 4 | Drop AzuraCast → migrate to Mixcloud / SoundCloud, OR consolidate AzuraCast onto Hetzner (kill DigitalOcean) | 1+2 | $12–88 | Medium-high | Medium — strategic call on radio | **Decide this month.** This is the big strategic question. |
| 5 | Cancel Perplexity API (if usage is low) | 3 | $20–50 | Trivial | Low | **Do this week** after checking. |
| 6 | Cancel ElevenLabs (use GCP TTS Journey fallback) | 2 | $20–25 | Trivial | Medium — voice quality | **Test the fallback,** then cancel. |
| 7 | Drop Buzzsprout (move to Spotify for Podcasters free) | 2 | $18 | Easy | Low | **Do this month** if podcast volume justifies. |
| 8 | Drop duplicate Adobe Photography plan (if CC full covers Chase's needs) | 3 | $10 | 30 min check | Low | **Do this week** after verifying license can be shared. |
| 9 | Migrate Neon Postgres → self-hosted on Hetzner | 1 | $19 | Medium (backup discipline required) | Medium | **Defer to Q3** unless backup automation is already in place. |
| 10 | Replace CapCut Team with DaVinci Resolve | 2 | $45–60 | Hard (Elijah retraining) | Medium-high | **Defer to Q4** unless Elijah is already on the fence. |

**Sum of #1–8 (do-or-decide-now):** $89–289/mo = $1,068–3,468/yr.
**Adding #9 + #10 if landed:** another $64–79/mo.

---

## Strategic question: is the Big Muddy Radio stack paying back?

A meaningful slice of the spend is the audio/radio infrastructure:

| Line | Monthly |
|---|---|
| DigitalOcean droplet (AzuraCast) | $12–48 |
| Buzzsprout podcast hosting | $18 |
| ElevenLabs voice (used by Delta Dawn + radio) | $20–25 |
| Restream (Studio C subtotal) | $20–49 |
| **Total audio/radio cluster** | **$70–140/mo** |

This is **15–18% of total MBT spend** going into broadcast/audio infrastructure. The question isn't whether the tools are well-chosen — it's whether the audience and content cadence justify the stack. If we're pre-audience on Big Muddy Radio (per CANONICAL_INFRASTRUCTURE §3.2, SSL is still broken — meaning the stream isn't even publicly polished yet), this whole cluster is a candidate for the freezer until the audience exists.

**A "freeze the radio stack" decision would:**
- Save $70–140/mo immediately
- Eliminate the SSL action item
- Eliminate the AzuraCast host
- Eliminate two of the five mystery agent webhooks (Delta Dawn voice in particular)
- Force a clear strategic decision: do radio, or don't, but don't pay for the option

This is more important than any single cost-line decision in the table above. Worth raising explicitly.

---

## The load-bearing stack (do NOT cut)

Listed for completeness so we don't accidentally cut these in a sweep:

| Line | Monthly | Why keep |
|---|---|---|
| Claude Max | $125 | Chase's daily productivity tool. Cutting this is a meaningful productivity hit. |
| Adobe Creative Cloud (full) — Elijah | $60 | Studio C's primary tool. Cutting cripples the video pipeline. |
| Google Workspace Ultra (chasepierson.tv) | $35 | Master identity, 2TB Drive, Gemini Advanced. Foundation of the consolidation. |
| Vercel Pro | $20–40 | Hosts every brand site. Migration is a 1–2 week project; do not undertake casually. |
| Cloudbeds (Inn) | $300–500 | Inn operations. Not in MBT cap — Inn's own line. Don't touch. |
| Hetzner CCX23 | $40 | Already the cheapest production-services host we could find. Has plenty of headroom. |
| Big Muddy Records DistroKid Label | $12 | Cheap. Unlimited artists. Don't cut. |
| Tracy + Amy Claude Pro | $40 | Their personal AI agents. Their decision, not Chase's. |

---

## What to verify before cutting anything

Pre-flight checks for the recommended cuts:

1. **Pull last-month actual usage** on ChatGPT API and Perplexity API. If <$5/mo, both are easy cancels.
2. **Pull the DigitalOcean droplet's actual cost.** $12–48 is a wide range.
3. **Audit Cloud SQL `sovereign-db-primary`** — what queries it, what data lives in it, what breaks if we kill it.
4. **Confirm Adobe license sharing** — can Chase + Elijah operate on one Adobe CC org without seat conflicts?
5. **Decide on the Big Muddy Radio question** explicitly — freeze the audio stack, or commit to a content cadence that justifies it. Don't keep paying for both.
6. **Check actual Canva seat usage** — if some seats sit unused, drop them.

---

## 90-day plan

**Week 1 (this week)**
- Cancel deprecated Google Workspaces (already on the action list, finish it).
- Pull ChatGPT API + Perplexity API actuals; cancel if usage low.
- Audit `sovereign-db-primary`; kill if unused.
- Test GCP TTS Journey voice quality; cancel ElevenLabs if acceptable.
- Pull the DigitalOcean droplet cost line.

**Weeks 2–4**
- Make the radio decision (commit or freeze).
- If freezing: cancel AzuraCast on DO, cancel Buzzsprout, cancel ElevenLabs, downgrade Delta Dawn voice setup.
- If committing: fix SSL, schedule actual content production, set audience milestones.
- Migrate AzuraCast → Hetzner (if committing).
- Reduce Canva Teams seats to actual users.
- Drop duplicate Adobe Photography plan.

**Months 2–3**
- Migrate Neon → self-hosted Postgres (if backup automation is in place).
- Asana check-in with Tracy + Amy — confirm free tier still right.
- Q3 review: cost analysis re-run with two months of MBT card actuals + the cuts above factored in.

**Q4 candidates (defer)**
- CapCut Team → DaVinci Resolve.
- Sanity CMS evaluation.
- Vercel alternative evaluation.

---

## What this would land us at

Today: $740–1,005/mo (~$9k–12k/yr).

With Week 1 cuts: -$60–148/mo → $592–945/mo.
With radio decision (if freezing): -$70–140/mo additional → $452–805/mo.
With Q3 self-host moves: -$31–67/mo additional → $421–774/mo.

**Aggressive target end state by Q4:** ~$450–800/mo = $5.4k–9.6k/yr. **A 30–50% cut from today.**

**Cap line:** the $1,000/mo cap in THE_THESIS holds with significant new headroom (~$200–550/mo). Enough to add the P1 planned items (Klaviyo-class email, meeting recorder) without breaking the cap.

---

## What I'm not recommending

Even though they'd save money:

- **Don't cut Tracy + Amy's Claude Pro accounts.** Their tool, their decision, $40/mo is a rounding error.
- **Don't cut Bitwarden Family.** $3/mo for the canonical secrets store is non-negotiable.
- **Don't cut Spotify Family** unilaterally. Cosmetic savings, real quality-of-life impact on partners.
- **Don't migrate Vercel away in 90 days.** The migration cost is real and the upside is modest.
- **Don't switch from Asana to Notion in 90 days** unless there's a specific reason. Switching task tools mid-momentum costs more than the consolidation pays.

---

*End. Companion to `infrastructure-cost-analysis-2026-05-11.md`. Refresh: end of Q3 with billing actuals.*
