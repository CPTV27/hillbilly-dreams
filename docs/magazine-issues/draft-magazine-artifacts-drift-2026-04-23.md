# Magazine Artifacts — Drift Report & Reconciliation Guide

**Date:** 2026-04-23
**Source:** Two HTML magazine drafts pasted by Chase from external AI conversation, ~12:30 AM CDT.
**Status:** Both saved as DRAFTS in `docs/magazine-issues/`. **Neither promoted.** Both have drift that must close before publication or use.

---

## Artifact 1 — "The Machine Behind the Magazine"

**File:** `docs/magazine-issues/draft-back-office-platform-dispatch-2026-04-23.html`
**Apparent purpose:** A Big Muddy Magazine "Back Office" column — public dispatch about the platform/Stack/Studio C engagement. Reads as a published magazine piece.
**Functional overlap:** This is a polished public-magazine version of the same content as the Elijah handoff doc just produced (`docs/partners/elijah-platform-handoff-2026-04-23.md`). The handoff is internal/private; this is editorial/public. Both are useful artifacts but they answer to different audiences.

### Drift / inaccuracy table

| # | Claim in artifact | Canonical truth | Severity |
|---|---|---|---|
| 1 | "Thirteen modules" (Auth, People, Places, Events, Media, Commerce, Bookings, Content, Radio, Mail, Search, Analytics, AI) | `docs/BUSINESS_ARCHITECTURE.md` lists **9 modules** (Directory, Magazine, Radio, Records, Touring/Events, Commerce, Broadcasting, AI Content Pipeline, Hospitality). The artifact's 13 are a different (more code-engineering) decomposition. | Medium — not "wrong" per se, but conflicts with our canonical 9-module taxonomy. Pick one and stick with it. |
| 2 | "52,000 photos imported and searchable" on Hetzner Immich | Memory `project_photo_library.md` says **604 photos in GCS, 545 unreviewed** as of last count. Hetzner Immich is set up but the photo archive volume is nowhere near 52K. | **High** — quantitative claim that's an order of magnitude off. Don't publish. |
| 3 | "AI routing layer sends reasoning tasks to Gemini 2.5 Pro" | `apps/web/lib/ai-models.ts` routes reasoning to **Gemini 3.1 Pro** (with Claude Sonnet → Gemini Flash fallback). 2.5 is the generation model. | Low — model version off. |
| 4 | Mac mini "quietly humming on a shelf at 192.168.4.37" running OpenBroadcaster + Icecast + Plex + Postiz + Open Notebook | `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` §2: **the mini was never the production services host.** It's being powered off for the NY drive with zero business impact. The radio runs on the DigitalOcean `bigmuddy-radio` droplet (AzuraCast). Immich runs on Hetzner CCX23. | **High** — this paragraph paints a false picture of where production lives. If published as-is, future readers (including Chase six months from now) will form a wrong mental model. |
| 5 | "Big Muddy Touring's tour bus" / "bay big enough for a Prevost coach" | We have a **Sprinter van**, not a tour bus. Wrap spec at `docs/VAN_WRAP_SPEC.md`. | Medium — small-shop reality vs. aspirational glamour. |
| 6 | "Magazine Vol. 1 deployment to `bigmuddymedia.com/magazine/spring-2026`" | `bigmuddymedia.com` is **not in our canonical 14-domain list.** Magazine routes through `bigmuddytouring.com/magazine` after the April 2026 consolidation (per `apps/web/config/domain-routes.ts`). | Medium — wrong domain reference. |
| 7 | "By the Editors" byline | Magazine voice = **Tracy Alderson** (clarified 2026-04-22). If a Magazine piece needs a byline, default to Tracy unless explicitly overridden. | Low — easy fix. |
| 8 | "Cloudbeds channel manager — partially connected, OTAs not all routing clean" | We're still **sourcing a Cloudbeds consultant** per `docs/partners/cloudbeds-consultant-sourcing-2026-04-20.md`. "Partially connected" overstates current state. | Medium — claim ladder violation (claim what we can demo). |
| 9 | "Stripe payments live for the Inn and merch" | Stripe is wired but the Inn payments are still routed through the Inn's existing systems pending Cloudbeds work. Merch is largely placeholder. | Medium — same claim ladder issue. |
| 10 | "All editors onboarded" to Sanity | Tracy is the editor; "all editors onboarded" implies a team that doesn't exist. | Low. |
| 11 | "Studio C is a DBA inside Tuthill Design LLC" + monthly contract started April 1, 2026 | **Correct** ✓ — matches `docs/partners/scan2plan-tuthill-account-2026-04-20.md` and `docs/partners/tuthill-photography-scope-2026-04-20.md`. | None. |
| 12 | "MBT buys buckets of Studio C hours every month" | **Correct** ✓ — matches the $500/account × 2 = $1,000/mo per studio structure. | None. |
| 13 | "Tuthill Design proper — the real estate photography, video, 3D, and LiDAR practice... not on a recurring monthly engagement with MBT" | **Inconsistent with Tuthill scope doc.** Tuthill Design IS on the same $1,000/mo engagement as Studio C (TOUR + INN/MAG accounts) per `docs/partners/tuthill-photography-scope-2026-04-20.md` §3. The artifact frames Tuthill as outside the recurring engagement, which is wrong. | **High** — directly contradicts the partner scope doc. |
| 14 | Security/operational disclosure: publishing the exact Postgres choice, Cloudbeds use, Hetzner host with Mac-mini IP, etc. | This is a **public magazine column.** Some of this detail is fine (the philosophy), but specific infra IPs / host vendors give competitors and bad actors info they don't need. The IP `192.168.4.37` is a private LAN address so it's harmless; the vendor stack however is more revealing than necessary. | Medium — editorial judgment call. |

### Recommendation

This is a **good piece of writing** that needs a reconciliation pass before publication. It's the right *register* for a "Back Office" column. The fixes are mostly:
- Swap "thirteen modules" → align to the 9 canonical modules (or relabel the artifact's 13 as "platform primitives" vs. "consumer modules" — they're different layers)
- Drop the Mac-mini-as-production-host paragraph entirely or replace with "Hetzner CCX23 in Ashburn, VA"
- Fix the photo count (or omit the number — "thousands of images" is honest and aspirational)
- Fix the model version
- Fix the domain reference
- Update the Tuthill paragraph to match the partner scope doc
- Soften "all editors onboarded" / "Stripe live" / "Cloudbeds connected" to honest state
- Re-byline to Tracy

Then it could be a real Magazine Vol. 01 column. Possibly even a strong one. **Not tonight.**

---

## Artifact 2 — "Persimmon Hollow"

**File:** `docs/magazine-issues/draft-rockstar-retirement-feature-2026-04-23.html`
**Apparent purpose:** Big Muddy Magazine feature about the housing community — same use-case as the Kate/Chicken reverse-sell pitch article I drafted at `docs/partners/chicken-kate-pitch-article-2026-04-23.md`.
**Status:** Has TWO mutually incompatible jobs as currently written.

### Critical naming conflict

| Use case | Required name | Why |
|---|---|---|
| **Public Big Muddy Magazine feature** about the community | **"The Big Muddy Rockstar Retirement Community"** (per Chase, 2026-04-23) | New canonical name. Replaces both "Persimmon Hollow" (rejected 2026-04-22) and the working title "The". |
| **Kate/Chicken reverse-sell pitch tool** | **NOT** the Big Muddy name (per Chase, 2026-04-23: "But not for the fake article, because that'll give it away") | The whole point is plausible deniability — Chicken should read it as some other community. The Kate/Chicken pitch article uses "the Hollow" as a generic placeholder for exactly this reason. |

The pasted artifact uses "Persimmon Hollow" — which is a **rejected name** for the canonical version AND a **brand-positive name** that wouldn't trip the reverse-sell tripwire. So as currently written, the artifact is wrong for both jobs:
- Wrong for canonical (uses rejected name)
- Wrong for reverse-sell (the polish + the magazine framing + "Big Muddy Land Co. LLC, under MBT" callout in the sidebar would tip Chicken off immediately)

### Drift table (separate from naming)

| # | Claim in artifact | Canonical truth | Severity |
|---|---|---|---|
| 1 | "Persimmon Hollow" community name throughout | **Rejected 2026-04-22.** Current canonical: "The Big Muddy Rockstar Retirement Community" (for internal/public-Big-Muddy use). For reverse-sell: use generic placeholder. | **Critical** for either use. |
| 2 | "By Harper Lane" byline | Magazine voice = Tracy Alderson. | Low. |
| 3 | "Twelve acres" / "$900 rent" / "Hammond B3" / "Avalon preamp" / "Focal monitors" / "$31,000 build cost" / "$35,000 founder buy-in" / "$500 day rate" / "70/30 split" / "20/80 dog training split" / "$38,000 outside-buyer price" | None of these specific numbers are in the canonical business plan or the proforma. They're confident-sounding **fabrications**. The proforma at `docs/business-plan/proforma-hollow-2026-04-22.html` has the real numbers — and they're different (e.g., target build cost ranges, rent assumptions, etc.). | **High** for canonical use — these read as fact in a magazine, but they're invented. |
| 4 | "Big Muddy Touring's tour bus" / "Prevost coach bay" | Sprinter van, not a tour bus. | Medium. |
| 5 | "expected settlement from an unrelated legal matter" — implied as a meaningful funding source | Per `docs/decision-briefs/ardent-settlement-funding-scenario-2026-04-22.md`, the **conservative net to Chase personally is ~$43K** after 3-way split, 33% legal, 35% tax. The aggressive scenario nets ~$201K to MBT. Either way, framing it as a meaningful funding line in a public magazine is a category mistake — it's a contingent legal recovery, not a planned source. | **High** — publishing this would create a public record of expected litigation income, which is a thing lawyers and tax advisors get nervous about. |
| 6 | "Big Muddy Land Co. LLC, under MBT" as parent entity | **Correct** ✓ — matches the planned entity structure per the recent decision briefs. (Big Muddy Land Co. LLC is in the planned subsidiary list.) | None. |
| 7 | "The Engineer" character (drummer + dog trainer + mom in ADA unit, Muscle Shoals → Natchez) = Chicken/Wes | **Correct mapping** ✓ — matches the Chicken profile in `.claude/agents/HANDOFF_FROM_CHASE_2026-04-22.md`. Good character work. | None. |
| 8 | "The Grower" character (15 yrs in restaurant kitchens + Inn hospitality + garden) | This appears to be a **composite of Kate (Inn hospitality) and someone else (the 15-yr restaurant background, the Marika garden role)**. In the Kate/Chicken pitch article I wrote, Kate appears as "Delia Weaver" with the established Hudson Valley refugee + Nashville session vocalist background per the existing fiction. Chase should pick a consistent fiction. | Medium — character framing inconsistent with established Kate fiction. |
| 9 | "The Builder" character | New character not mapped to anyone in the current pinned cast. Could be a future resident or a fictional placeholder. | Low. |
| 10 | "10 founding residents" / "ten founders, then rental" / "$35K founder buy-in" cooperative structure | These specifics aren't in the canonical business plan. The business plan has "tiny house community" as a concept; the founder-circle / capital structure isn't documented yet. Inventing numbers in a public-facing magazine creates expectations we'd then have to honor. | **High** for canonical use. |
| 11 | "Year five, the compound is a closed system. Ten founders. Eight to ten rental units." | Same — speculative future-state framed as plan. | Medium. |
| 12 | Geographic: "12 acres outside Natchez, MS, 25 minutes from downtown" | Matches the business plan target range (10–25 acres in Adams Co. MS / Concordia Parish LA / Franklin Co. MS). 12 is in the range. | None. |

### Recommendation

**Do NOT use this artifact as-is for either purpose.**

For the **canonical magazine feature** (someday — when the community actually exists or is closer to existing):
- Rename to "The Big Muddy Rockstar Retirement Community" throughout
- Strip the fabricated numbers (rent, build cost, founder buy-in, day rate, splits)
- Strip the Ardent settlement reference
- Re-byline to Tracy Alderson
- Reconcile "The Grower" character with the established Kate fiction
- Wait until there's actually something to report on (you can't write "a Report from the Ground" about a property that doesn't exist yet — this becomes a publishable feature in 2026 fall at earliest, after pole barn + first occupancy)

For the **Kate/Chicken reverse-sell purpose**, the article I wrote at `docs/partners/chicken-kate-pitch-article-2026-04-23.md` is the right tool. It:
- Uses generic "the Hollow" placeholder
- Doesn't credit Big Muddy Magazine on the masthead — it's published BY Big Muddy Magazine but the community is presented as third-party
- Uses the established Wes (Chicken) and Delia Weaver (Kate) fiction names
- Doesn't fabricate numbers
- Doesn't reference the Ardent settlement

Recommendation: keep both drafts as reference material. Use the article I wrote for the actual reverse-sell. The pasted Persimmon Hollow piece is a useful style reference and a good scaffold for a future canonical feature, but it has to be substantially rewritten before it goes anywhere.

---

## What CoS is doing

- ✅ Saving both HTML drafts to `docs/magazine-issues/` with clear `draft-` prefix and HTML comment headers explaining status
- ✅ This drift report
- ✅ Updating `docs/decision-briefs/compound-timeline-and-structure-2026-04-23.md` to capture:
  - New canonical community name: "The Big Muddy Rockstar Retirement Community"
  - Greene County NY clarified as preferred over Ulster (better deals)
  - East Durham NY noted as a specific area of interest (Marika is there)

## What CoS is NOT doing

- Reconciling either HTML artifact into a publishable form (premature — neither has been requested for publication)
- Choosing between the 9-module canonical taxonomy and the 13-module artifact taxonomy
- Modifying the existing Kate/Chicken pitch article — it correctly uses "the Hollow" placeholder
- Removing "Persimmon Hollow" from the artifact filename — keeping the rejected name visible in the filename is itself a flag for any future reader

---

*Compiled by Chief of Staff 2026-04-23 ~12:45 AM CDT. Cross-references: `docs/magazine-issues/draft-back-office-platform-dispatch-2026-04-23.html`, `docs/magazine-issues/draft-rockstar-retirement-feature-2026-04-23.html`, `docs/partners/chicken-kate-pitch-article-2026-04-23.md`, `docs/partners/elijah-platform-handoff-2026-04-23.md`, `docs/decision-briefs/compound-timeline-and-structure-2026-04-23.md`, `docs/decision-briefs/ardent-settlement-funding-scenario-2026-04-22.md`, `.claude/agents/HANDOFF_FROM_CHASE_2026-04-22.md`.*
