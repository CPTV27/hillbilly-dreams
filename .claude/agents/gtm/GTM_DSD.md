# Deep South Directory — GTM

*Canonical source: `docs/POSITIONING_UPDATE_2026-04-17.md` + `docs/BUSINESS_ARCHITECTURE.md` (April 17 amendment).*

*Last updated 2026-04-17 — rewritten after DSD soft-decouple from Big Muddy.*

---

## The play

DSD is not a revenue engine. It's a compounding SEO + local-guide asset that monetizes passively while we spend active energy on Big Muddy media and touring.

**Y1 target: $1–3K/mo** (passive self-serve subscriptions). Not $10K/mo. Not walk-in sales. The old walk-in pressure is gone.

**What generates money:**
- Self-serve listings: $0 / $25 / $50 / $99 / $250 per month
- Pricing tiers unchanged from April 5 canonical
- No bundle packages (those belong to Big Muddy media)
- No walk-in sales motion (walk-ins now pitch the Big Muddy media kit at `/admin/pulse`)

**What generates audience:**
- SEO — the AI content engine producing 3–5 pages/week targeting corridor commercial keywords
- DSD social accounts (to be created): `@deepsouthdirectory` on Instagram + TikTok
- Cross-links from Big Muddy properties (soft, not parent-branded)
- Field reports that post simultaneously to the directory listing AND DSD social

---

## Audience

Three primary personas:

- **Tourists searching commercial terms.** "best coffee in natchez," "things to do in vicksburg," "restaurants near ground zero blues club." They land, they convert (directions, bookings, phone calls). They don't need to know about Big Muddy.
- **Locals looking for ideas.** "Where should we take my mother-in-law to dinner?" "What's open late in Clarksdale?" They trust personal recommendations more than editorial ones.
- **Business owners.** They want to be listed where travelers look first. Self-serve through deepsouthdirectory.com — no sales call required.

---

## Content strategy

Three layers, shipped in this order of priority:

1. **AI bulk (this month):** weekly cron generates city guides + "best of" lists. Gemini Flash drafts. No per-article review. Bar: does it rank.
2. **Field reports (ongoing):** Chase, Tracy, Amy use `/admin/dsd/spot` from their phones. 60-second flow. Posts to listing + DSD social.
3. **Business self-submit (always on):** listing form, claim flow, Stripe checkout. Already wired via existing `DirectoryBusiness` schema.

### Photography rule

**Every DSD page uses Chase's original photos or field-report photos. Never stock.** Hierarchy: Chase's camera shoots > phone field reports > business-submitted (verified) > tasteful AI for general Delta imagery > nothing. Stock photography is banned. If a page has no real photo available, ship without an image rather than with stock. See `BRAND_DNA_DSD.md` for full rationale — real photos are the biggest trust signal DSD has.

---

## Growth channels (ranked)

| Channel | Effort | Payoff | Who owns |
|---|---|---|---|
| Organic SEO from AI bulk pages | Low (cron) | High (compounding) | Chase (set up) / automation |
| DSD Instagram + TikTok | Low-medium | Medium | Shared — Chase / Tracy / Amy |
| Field-report posts cross-linked from IG | Low (60 sec each) | Medium-high (authentic signal) | Chase / Tracy / Amy |
| Cross-links from Big Muddy Magazine | Low | Low-medium | Automatic (editorial cross-refs) |
| Paid ads | — | — | Not in scope Y1 |

---

## What we are NOT doing

- Walk-in DSD sales. Walk-ins sell Big Muddy media kits, not DSD.
- DSD-branded tear-sheets, pitch decks, or sales collateral. None of that exists.
- Bundle packages for DSD. Bundles live under Big Muddy ($99 / $199 / $399 / $599).
- Editorial review on AI bulk content. Flagged exceptions only.
- Parent-branding DSD with Big Muddy footer or "Powered by Measurably Better Things." That was the old model.
- Hiring a DSD sales role or content editor.
- Stock photography. Ever.

---

## Metrics to watch (quarterly)

- Indexed page count in Google Search Console
- Top 20 organic queries driving clicks
- Self-serve signups per month (target: 5–15/mo Y1)
- Social follower growth (baseline zero, target: modest but consistent)
- Field-report cadence (target: 2–4/week across Chase/Tracy/Amy combined)

If Y1 ends at $2K/mo subscription revenue and 10K monthly unique visitors, that's a win. Aggressive growth targets defeat the purpose — DSD is the slow-compounding sibling. Big Muddy is the active operation.

---

## Fastest path to audience

Before SEO has kicked in, the highest-leverage move is the three relationship emails identified in the band catalog research: WWOZ music director, Elizabeth Cawein at Music Export Memphis, Leslie Barker at Mississippi Arts Commission. Each of them controls a roster of artists that overlaps heavily with the bands we want featured on DSD listings and in field reports. Email templates live in the band catalog decision doc — same play here.
