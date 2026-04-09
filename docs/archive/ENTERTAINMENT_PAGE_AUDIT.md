# Big Muddy Entertainment — page audit (`apps/web/app/entertainment/page.tsx`)

**Date:** 2026-04-05  
**Scope:** Copy and positioning only. **Do not edit** `apps/web/app/directory/page.tsx` per directive.

**Sources for rubric:** Chase’s brand separation as relayed in the audit request; `docs/HDI_BRAND_HIERARCHY_ANALYSIS.md` (Entertainment = “Community-first… Rise Up… Block party organizer”); `docs/BUSINESS_ARCHITECTURE.md` (Big Muddy pitch, DSD relationship).  
**Not found in repo:** `memory/feedback_brand_family.md` — no file at that path in this worktree. If it lives only on a machine-local `memory/` folder, merge the canonical version into `docs/` so agents share one source.

**DSD 5-tier reference (editorial draft):** `docs/DSD_HOMEPAGE_COPY_CONCEPTS.md` — **Free / $25 Essentials / $50 Pro / $99 Marketing / $250 Engine**. Legacy docs still cite **$20 / $49 / $99** in places (e.g. `BUSINESS_ARCHITECTURE.md`); treat Concepts doc as the “new structure” until pricing is unified in a single canonical file.

---

## 1. DSD pricing or business-directory language bleeding in

### Present on the page

| Location | Text | Verdict |
|----------|------|--------|
| “What We Do” → **The Whole Network** | “Venues end up in the **Deep South Directory**.” | **Ecosystem cross-sell**, not DSD tier pricing. It reads as “venues become directory clients” — aligned with `BUSINESS_ARCHITECTURE.md` (“Every venue becomes a DSD client”) but it **imports the B2B product name** onto the entertainment company page. |
| **For Venues** bullets | “Your venue in the **Deep South Directory**” | Same — accurate to ops narrative; **brand-wise** it ties the room to the SaaS product, not to “getting found” in plain language. |
| **Footer** | “**Powered by Deep South Directory** · Hillbilly Dreams Inc” | **Hierarchy bleed.** On **bigmuddyentertainment.com**, the directory product is a **sibling**, not the engine “powering” Entertainment. Reads like DSD is upstream of the label/promoter — Chase’s separation wants Entertainment = label + promoter + radio + artist network; DSD is parallel (Main Street). Prefer corporate attribution (HDI) or neutral “A Hillbilly Dreams Inc company” without “powered by” the directory SKU. |

### Absent

- No **DSD tier prices** ($20, $25, $49, $99, etc.) on this page — **good.**

---

## 2. Community enrichment tiers and “Measurably Better”

**Current `page.tsx`:** There is **no** “community enrichment” section, **no** dollar “free value” table, and **no** string **“Measurably Better”** (grep on `apps/web/app/entertainment` is empty).

**Conclusion:** Either (a) AG/Rook already removed or never merged that block into this file, or (b) it lives in another branch/PR. **No action on this file** for MBT strings until a version appears.

If a future PR reintroduces enrichment copy: align credits/value to **Deep South Directory** tier names (or generic “directory credits”) — **not** MBT — on this customer-facing Big Muddy domain.

---

## 3. $20 / $50 / $99 “free value” amounts vs new 5-tier DSD

**Current `page.tsx`:** **None of those figures appear.** Nothing to align or retire on this page.

**Cross-check:** If marketing elsewhere still says “$20/$50/$99 bundled value,” that’s **stale vs the drafted 5-tier ladder** (Free, **$25**, **$50**, **$99**, **$250**) in `DSD_HOMEPAGE_COPY_CONCEPTS.md`. Fix at source when that block exists — not here.

---

## 4. Match to Chase’s definition (label + promoter + radio + artist network + masters + publishing)

| Chase line | On the page? | Notes |
|------------|----------------|-------|
| **Record label + promoter + radio** | **Partially** | **Promoter** (booking, production, promotion) and **label** (Records card, recording, non-exclusive deals) are strong. **Radio** appears as a **sibling brand** in “The Family,” not as “we are the radio station” in the hero or company definition — acceptable if intentional (family grid), but the **single-sentence company identity** doesn’t say “radio” upfront. |
| **MySpace-style profiles + artist networking** | **Missing** | No mention of artist profiles, discovery, or corridor peer network. That’s a **major gap** vs the separation you described. |
| **Artists own masters** | **Correct** | Records: “You keep your masters.” For Bands + house band copy: “Non-exclusive… you keep your masters.” |
| **Big Muddy only earns on publishing when Big Muddy generates the work** | **Missing / vague** | Page says distribute, promote, sell — **does not** state the **conditional publishing economics** (no split unless BM-created publishing). Risk: sounds like standard label take without the guardrail. |
| **Magazine = rock and roll + Vanity Fair + Deep South Martha Stewart** | **Missing** | Magazine is “Long-form editorial… Every show gets a feature. Every artist gets a profile.” That’s **generic editorial** — not the **cultural cross** Chase named. |

---

## Summary tables

### What’s correct

- Corridor geography (Natchez–Memphis, Clarksdale, New Orleans) and **show logistics** (booking, transport, production, promotion).
- **Masters / non-exclusive** messaging, repeated in multiple sections — matches the ethical hook.
- **Media flywheel** (magazine, radio, records, touring) as one machine for bands and venues.
- **Arrie Aslin** feature — correct spelling; proof-of-roster narrative.
- **Footer** no longer says “Measurably Better” (if comparing to older audits).
- **Metadata** positions booking/promotion/production — not SaaS.

### What’s wrong or risky

- **Footer:** “Powered by Deep South Directory” — **wrong brand hierarchy** for Entertainment homepage; reads as DSD powering the company.
- **“Your all-access pass to the Deep South”** — Issue #73 flagged **SaaS-adjacent** language for Entertainment; still present in `metadata.title` and hero. Chase may still want a more **block-party / promoter** headline.
- **Sleeper bus** — “Sleeper bus coming for longer runs” — historically flagged as **unshipped**; confirm before keeping.
- **DSD named twice** for venues — factually aligned to ops; **optional softening** to “regional directory” or “get found on the map” if you want stricter product firewall on this domain.

### What’s missing

- **Artist networking / profile product** (MySpace-class promise) — no copy.
- **Publishing economics** — when Big Muddy earns publishing vs when it doesn’t.
- **Radio as part of the Entertainment company story** in the opening promise (if radio is co-equal with label/promoter, say it above the fold).
- **Magazine positioning** — rock + literary + Deep South lifestyle crossover (not just “long-form editorial”).
- **Community enrichment / tier value** — not in file; if it belongs on this page per strategy, it’s **absent**, not fixed.

---

## Suggested next step (editorial, not code)

1. Chase picks **one** footer line: HDI-only, or “Hillbilly Dreams Inc · Natchez” — **no “Powered by Deep South Directory”** on this domain.  
2. Add a **short** “For artists” block: profiles, network, ownership — even if the product isn’t shipped, **honesty gate** applies (say “building” if not live).  
3. One sentence on **publishing**: earn only on work the company generates.  
4. Refresh **Magazine** one-liner to match the **Vanity Fair / Martha Stewart / rock** triad without sounding like three press releases.

---

*End of audit.*
