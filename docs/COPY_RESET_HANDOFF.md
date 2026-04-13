# Copy Reset Handoff — April 13, 2026

## What Was Done

A full copy reset across 11 production files to align customer-facing pages with the locked business architecture (docs/BUSINESS_ARCHITECTURE.md) and locked pricing (CLAUDE.md, April 5, 2026).

**Two categories of work:**
1. **Pricing alignment** — Old tier names and prices were live on production pages. Fixed everywhere.
2. **Hero/positioning copy** — Key landing pages led with generic, defensive, or SaaS-flavored language. Rewritten to lead with what each brand *does* and *offers*.

---

## Files Changed (11 total)

### Pricing Fixes (5 files)

| File | What Changed |
|------|-------------|
| `apps/web/app/media/pricing/page.tsx` | **CRITICAL.** 4 old tiers (Front Porch $99, The Route $249, River Room $499, Blues Room $999) replaced with 5 locked tiers (Free $0, Essentials $25, Pro $50, Marketing $99, Engine $250). Grid changed from 4-col to 5-col. Comparison section anchored on $25 Essentials instead of $99. FAQ platform coverage updated. |
| `apps/web/app/media/page.tsx` | Feature comparison table updated from 4 columns to 5 columns with correct tier names. Added "Directory Listing" and "Magazine & Radio" rows. DSD stat changed from "$99/mo" to "From $25/mo". |
| `apps/web/app/media/get-started/page.tsx` | Onboarding form tier dropdown updated from 4 old tiers to 5 new tiers with correct prices. |
| `apps/web/app/media/how-it-works/page.tsx` | "River Room and up" changed to "Marketing and up". "The Route and up" changed to "Pro and up". |
| `apps/web/app/admin/dashboard/walkthrough.tsx` | Internal admin walkthrough tier references updated to match locked pricing. |

### Copy Rewrites (6 files)

| File | Old Hero | New Hero | Why |
|------|----------|----------|-----|
| `apps/web/app/directory/page.tsx` | Meta: "Digital hygiene for your business" | Meta: "Find locals. Get found." + media ecosystem differentiator | Old meta was SaaS jargon. Page body was already strong — hero, tiers, testimonials all correct. Only metadata needed work. |
| `apps/web/app/touring/page.tsx` | "The Hottest Room on the River" + venue address | "We bring the party." + full flywheel pitch + "Memphis to New Orleans - 13 cities - 735 venues" | Page led with the Blues Room venue instead of the touring *operation*. Now leads with what BMT does: book, transport, promote, record, release. Venue sections remain below as supporting detail. |
| `apps/web/app/entertainment/page.tsx` | "Natchez, Mississippi." + list of divisions | "One show becomes everything." + flywheel explanation (band plays Friday, by Monday there's a feature, radio session, concert film, next show booked) | Old hero named the city, not the operation. Five divisions were listed but not explained. New hero tells you *why* they're together. |
| `apps/web/app/records/page.tsx` | "The sound of the river." + "Why another label?" section | "Keep your masters. Get the machine." + "What you get." section | Old hero was poetic but not positioning. "Why another label?" was defensive. New hero is the value prop. New section leads with what the label offers (radio, magazine, touring, photography) rather than defending its existence. |
| `apps/web/app/magazine/page.tsx` | "Stories from the Southern Gothic heartland" | "The stories are already here. Somebody has to tell them right." + sharpened intro (music, food, architecture, people) | Old subtitle was generic. New one has voice. Intro now emphasizes real editorial + real photography + earned media for participants. |
| `apps/web/app/measurably-better/page.tsx` | Meta: "proposal-based" / Body: "Pricing is proposal-based" | Meta: "Natchez is customer zero — see what works before you buy" / Body: "No SaaS tier chart — we build what your corridor needs." | "Proposal-based" is corporate jargon. Replaced with proof-case positioning. |

### Additional fix (post-review)

| File | What Changed |
|------|-------------|
| `apps/web/app/entertainment/raya/page.tsx` | "The label exists because everything else already does" replaced with "Keep your masters. Get the machine." |

---

## What Was NOT Changed

- **`apps/web/app/hillbilly/page.tsx`** — Passes as-is. Berkshire Hathaway energy. No changes needed.
- **`apps/web/app/radio/page.tsx`** — "The radio works." Per copy reset plan, keep as-is.
- **`apps/web/app/bearsville/`** — Scaffold only. Summer 2026 activation. Don't touch until then.
- **Inn pages, admin pages, API routes** — Not in scope for this copy reset.
- **Blues Room references in studio-c, demo, call-sheet** — These refer to the *physical venue*, not the old pricing tier. Left alone intentionally.

---

## Voice Rules Applied

Per `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md`:
- First sentence is the point. No hedging.
- Killed: "Our platform enables," "vertically integrated," "proposal-based"
- End with action, not inspiration
- No savings claims that aren't demoable today
- Photography first (no AI illustration changes in this pass — copy only)

---

## Verification

- **Build passes clean:** `pnpm turbo build --filter=@bigmuddy/web` — 0 errors
- **Visual verification:** Dev server started, screenshots taken of pricing, touring, entertainment, records pages — all render correctly
- **Grep verification:** No remaining references to "Front Porch" (as tier), "The Route" (as tier), "River Room" (as tier), or "Blues Room" (as tier) in production app pages. Old prices ($249, $499, $999 as tier prices) eliminated from customer-facing pages.

---

## What's Still Open (Next Prompts)

### Copy Work Remaining
1. **Radio page** — Currently "keep as-is" but could benefit from the same treatment once the Part 15 transmitter is operational and there's more to say.
2. **Bearsville page** — Needs full copy when summer activation begins. Currently a scaffold.
3. **Gallery/photography pages** — Not audited in this pass. May have stale positioning.
4. **Economics/Outsider Economics** — Not audited. Field manual content is build-time sourced from `outsider-economics-v2/`.

### Feature Work Blocking Revenue (Not Copy)
5. **Review response flow** — 80% built, missing review ingestion from Google. Blocks $99 Marketing tier claim. See: `apps/web/lib/gbp-review-reply.ts`, `apps/web/app/api/ops/reviews/`, `apps/web/app/admin/reviews/`.
6. **Social publishing APIs** — 85% built, missing token refresh + Instagram/Google OAuth + admin UI polish. Blocks $49 Pro tier claim. See: `apps/web/lib/social-publisher.ts`, `apps/web/app/api/social/`, `apps/web/app/admin/social/`.
7. **Stripe payment links** — Tracy is handling. No code needed.

### Operational
8. **Stale git branches** — 39 remote branches, most untouched since Feb-Mar. Could clean up.
9. **GCS auth expired** — `gcloud auth login` needed on MacBook Pro for photo uploads.
10. **Entity incorporation** — FarleyPierson LLC exists but HDI not formally incorporated. Legal risk before institutional sales.

---

## Key Decisions Made

1. **"The label exists because everything else already does" was killed.** Chase flagged it as bad copy. Replaced everywhere with "Keep your masters. Get the machine." — which is the actual value prop.
2. **Directory page was mostly left alone.** The body copy, tiers, testimonials, and "Why DSD" section were already strong. Only metadata was stale.
3. **Pricing comparison section anchors on Essentials ($25)** instead of the old Front Porch ($99). The "What You'd Pay Elsewhere" math still works — $736/mo vs $25/mo is an even stronger comparison.
4. **Feature table expanded to 5 columns.** Added "Directory Listing" and "Magazine & Radio" rows to show the full value ladder from Free through Engine.
5. **Entertainment hero uses the flywheel as the headline** because "One show becomes everything" is the single most powerful line in the entire brand narrative. It explains why all five divisions exist in one sentence.

---

## Files to Read for Full Context

| File | What |
|------|------|
| `docs/BUSINESS_ARCHITECTURE.md` | Source of truth for three-layer model, module definitions, pricing |
| `docs/COPY_RESET_PLAN.md` | Original page-by-page audit that drove this work |
| `.claude/agents/BRAND_NARRATIVE_OVERHAUL.md` | Voice rules, kill words, copy patterns |
| `.claude/agents/QA_CHASE.md` | Full QC checklist for any future copy work |
| `CLAUDE.md` (project root) | Locked pricing, QC rules, architecture notes |
