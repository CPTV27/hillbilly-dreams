# Navigational Architecture — A Deep Analysis

*Authored 2026-04-30 by Cos. Opinionated. Disagreement with what exists is the point.*

> **Bottom line up front:** The codebase has built a multi-tenant platform with five different navigation paradigms layered on top of each other and no governing IA. Customers can't trace the ecosystem. Partners can't find their tools. The chat — your most important new surface — boots into a 720px column with no context, no tenant identity, and no escape hatch. This document maps the damage and proposes a single nav contract that survives the chat-as-primary pivot.

---

## 1. Current State Map — Every Surface, Mapped

### 1.1 The routing engine (what the platform actually does)

The middleware (`/Users/chasethis/hillbilly-dreams/apps/web/middleware.ts`) does two things on every request:

1. **Hostname → route group rewrite.** `bigmuddytouring.com/shows` rewrites internally to `/touring/shows`. The user never sees the route group.
2. **Pass-through carve-outs.** A list of paths (`/constellation`, `/dawn`, `/admin`, `/directory`, `/gallery`, `/snap`, `/kiosk`, `/magazine`, `/radio`, `/records`, `/entertainment`, `/studio`, `/air`, `/chase`, `/mbt`, `/hillbilly`, `/demo`, `/links`, `/foreman`, `/chat`, `/chat/`) skip the rewrite entirely.

This is good architecture. The URL the customer sees is `bigmuddytouring.com/shows` — not `bigmuddytouring.com/(touring)/shows`. Route groups don't leak. SEO and link sharing work cleanly.

What's bad: the **pass-through list keeps growing as a flat namespace**. There is no convention for what makes a URL eligible for pass-through versus tenant-rewritten. `/chat` is universal — every domain serves it. `/admin` is universal. But `/magazine`, `/radio`, `/records`, `/entertainment` are also pass-through because of the April 2026 Cloudflare consolidation — content that *used* to live on its own domain (`bigmuddyrecordlabel.com`) is now a sub-path of `bigmuddytouring.com`, but every other tenant domain *also* passes those paths through. So `outsidereconomics.com/records` would silently render the records section. Nobody intends that. It's a latent SEO collision and a brand-confusion bomb.

### 1.2 The brand sites (15 active domains, ~9 distinct experiences)

From `/Users/chasethis/hillbilly-dreams/packages/config/brands.ts`, the `BRANDS` registry defines 9 brand IDs (`touring`, `magazine`, `radio`, `records`, `directory`, `economics`, `entertainment`, `hillbilly`, `admin`) with per-brand `nav.links` arrays. Each brand has its own layout (`apps/web/app/touring/layout.tsx`, `app/magazine/layout.tsx`, etc.) that imports `<Navigation>` and `<Footer>` from `@bigmuddy/ui`.

Inventory by surface type:

| Surface | URL | Render path | Nav source |
|---|---|---|---|
| Touring | bigmuddytouring.com | `/touring/page.tsx` | `BRANDS.touring.nav.links` |
| Magazine | bigmuddytouring.com/magazine (CF redirect from .com) | `/magazine/page.tsx` | `BRANDS.magazine.nav.links` |
| Radio | bigmuddytouring.com/radio (CF redirect) | `/radio/page.tsx` | `BRANDS.radio.nav.links` |
| Records | bigmuddytouring.com/records (CF redirect) | `/records/page.tsx` | `BRANDS.records.nav.links` |
| Entertainment | bigmuddytouring.com/entertainment (CF redirect) | `/entertainment/page.tsx` | `BRANDS.entertainment.nav.links` |
| Directory | deepsouthdirectory.com | `/directory/page.tsx` | `BRANDS.directory.nav.links` |
| Economics | outsidereconomics.com | `/economics/page.tsx` | `BRANDS.economics.nav.links` |
| Hillbilly | hillbillydreamsinc.com | `/hillbilly/page.tsx` | `BRANDS.hillbilly.nav.links` |
| MBT | measurablybetter.life | `/measurably-better/page.tsx` | **No `<Navigation>` — bespoke header** |
| Bearsville | bearsvillemediagroup.com | `/bearsville/page.tsx` | bespoke layout |
| Studio C | studiocvideo.com | `/studio-c/page.tsx` | bespoke layout |
| Tuthill | tuthilldesign.com | `/tuthill/page.tsx` | bespoke layout |
| DCTV | dctv.org | `/dctv/page.tsx` | bespoke layout |
| Gallery | buycurious.art | `/gallery/page.tsx` | bespoke layout |
| Inverted Intelligence | invertedintelligence.fm | (not yet built — `apps/web/public/inverted-intelligence/` only contains a `pdfs/` dir) | none |

**The breakage**: `<Navigation>` from `packages/ui/components/Navigation.tsx` only knows the 9 brand IDs. So Bearsville, Studio C, Tuthill, DCTV, Gallery, MBT — six of fifteen domains — opt out of the shared component. Each writes its own header. None look like each other. Nothing carries the same logo, the same typography rhythm, the same footer.

### 1.3 The chat surface (the new primary product)

`/Users/chasethis/hillbilly-dreams/apps/web/app/chat/page.tsx` is 525 lines. It renders:
- A 20px header with the literal string "Big Muddy" in a 22px serif and a one-line description: "Assistant — ask anything. I'll answer, route to a specialist, or escalate."
- A 720px-wide message column.
- A composer at the bottom.
- No footer. No "Powered by" line. No link back to any brand site. No login indicator. No tenant identity (Bearsville users get the same "Big Muddy" header).
- No layout.tsx wrapping it. Server-side metadata is the global default.

The page comment explicitly says this is the **router UI layer** — it dispatches user prompts to specialists (which-specialist tool, route-to-specialist tool, create-task tool). The chat is doing the conceptual work of a navigational dispatcher already. But none of that surfaces to the user as navigation. There's no "where am I, what else is here, where do I go next" affordance.

### 1.4 Internal briefings (the genre we keep inventing in `public/`)

| Folder | URL | Purpose | Nav |
|---|---|---|---|
| `public/big-muddy-acres/` | /big-muddy-acres/ | Tracy + Amy briefing | Custom topstrap; 175-line index |
| `public/studio-c/` | /studio-c/ | Elijah/Miles pitch | Same topstrap pattern |
| `public/tokenomics/` | /tokenomics/ | 10-tokenomics-approach comparison | Sticky topbar + horizontal scroll nav |
| `public/inverted-intelligence/` | /inverted-intelligence/ | (PDF-only stub) | none |
| `public/index.html` | localhost:8888/ | Local dashboard | Sticky black topbar |

All four use the same Playfair / Source Serif 4 / Inter triplet, all noindex'd, all bespoke HTML. There's a *de facto* design system here that's never been extracted. The code repeats — same `:root` block, same `.topstrap`, same `.card` pattern — across four files. None link to each other consistently. None have a way to escape back to the production app.

### 1.5 Admin (`/admin/*` — 62 sub-routes)

The `/admin/` directory in `apps/web/app/admin/` has 62 entries. The `/(admin)/admin/` route group has 3 (`agents`, `editorial`, `studio`). Naming is chaotic — there's a `dashboard`, an `hq`, an `command`, a `pulse`, a `report-card`, a `revenue`, plus tenant-specific `tracy`, `amy`, `chase`, plus single-purpose surfaces like `churn-alerts`, `coordination`, `lookbook`. Some are real. Many are graveyards from earlier sprints. The April 23 audit (memory ID 1535 + the audit doc) confirmed roughly half are stale.

There is **no admin sitemap**. Tracy and Amy do not have a curated landing page that hides the 50+ orphan routes from them. The middleware sends authenticated users straight to `/admin` if they don't have a path, which lands on… `app/admin/page.tsx` — a single file with whatever was last shipped there.

### 1.6 Partner-facing (the WPC / onboarding plane)

Onboarding lives in markdown (`docs/operations/wpc-handbook.md`) and Asana (Weekly Partner Commitments project, GID 1214376792613690). There is no single web URL a partner can hit to see their workspace. Tracy gets `/admin/tracy`. Amy gets `/admin/amy`. JP has nothing. Elijah and Miles have nothing. The only orientation they have is the "/big-muddy-acres" briefing, which is noindex'd and ephemeral.

### 1.7 The local dashboard (`localhost:8888`)

`apps/web/public/index.html` is the dashboard Chase uses to find tonight's deliverables. It's 327 lines of bespoke HTML and only renders when `python3 -m http.server 8888` is running from the public dir. It dies on sleep. It's the most-trafficked surface for one specific user (Chase) and it's the most fragile in the entire stack.

---

## 2. Identified Problems

### Problem A — Cross-surface coherence is zero

A customer who lands on `bigmuddytouring.com` sees a navigation that links to "Magazine" and "Radio" (good — both are in `BRANDS.touring.nav.links`). They click Magazine and the URL changes from `bigmuddytouring.com` to `bigmuddymagazine.com` (Cloudflare redirect to `bigmuddytouring.com/magazine`). They see a Playfair-forward nav with totally different links: Features, City Guides, Interviews, Photo Essays. **There is no breadcrumb back to Touring.** There is no "you are inside Big Muddy Magazine, here's the rest of the network" indicator. The Footer says "Powered by Measurably Better Things" but nothing explains what that means.

A customer who lands on `measurablybetter.life` (the chat platform) sees an entirely different visual language — full-bleed photo, massive serif headline ("Your guide to the Deep South"), no brand continuity with Big Muddy. They have no way to discover that the same company runs Big Muddy Touring. The "Powered by" line on Touring points back here, but the inverse path doesn't exist.

### Problem B — Header / footer / breadcrumb conventions are inconsistent

- **Header**: Touring/Magazine/Radio/Records use `<Navigation>` from packages/ui. Bearsville, Studio C, Tuthill, DCTV, Gallery, MBT, chat all roll their own.
- **Footer**: A `PoweredByFooter` component exists at `apps/web/components/PoweredByFooter.tsx`. The MBT page imports it. The brand sites use a *different* `Footer` from `@bigmuddy/ui`. The chat has no footer at all. The internal briefings have a custom `<footer>` HTML block.
- **Breadcrumbs**: None. Anywhere. Not in the brand layouts, not in the chat, not in admin.

### Problem C — The chat ships with no tenant context

`app/chat/page.tsx` hardcodes "Big Muddy" in the header. A Bearsville user — who would access the chat at (presumably) `bearsvillemediagroup.com/chat` — sees the wrong brand. The middleware lets `/chat` pass through on every domain (line 120-121 of middleware.ts) but the page doesn't read `headers().host` to discover which tenant context it's in. The chat is simultaneously the *most universal* surface (every domain serves it) and the *least tenant-aware* surface in the codebase.

### Problem D — Internal briefings cosplay as customer pages

`/big-muddy-acres/`, `/studio-c/`, `/tokenomics/`, `/inverted-intelligence/` all use the magazine-style Playfair + Source Serif visual language that the public Magazine site uses. They're noindex'd, but a Twitter share, a leaked Slack screenshot, or a "did you mean to send me this?" partner question can put them in front of an audience they weren't designed for. There is no path from "internal preview" to "publish to public site." Nobody has codified what an internal briefing IS versus what a `/articles/[id]` magazine feature IS, even though they look indistinguishable.

### Problem E — The router pattern is buried inside the chat

The chat backend (per the page comment) has a sophisticated router: `which_specialist` → `route_to_specialist` → multi-stream specialist responses with badge cards and accent borders. **This is exactly the IA pattern the website needs.** A customer who wants "shows in Memphis next month" should be able to type that anywhere in the ecosystem and get dispatched to the touring calendar. A partner who wants "my dashboard" should type that into any chat surface and get routed to their admin page. But the dispatch lives only inside `/chat`. Every other page has zero search and zero dispatch.

### Problem F — URL structure is mostly clean, but the pass-through list is a landmine

The customer-facing URL structure is good: `bigmuddytouring.com/shows` not `bigmuddytouring.com/(touring)/shows`. Route groups don't leak. SEO works.

But the pass-through list (`['/constellation', '/dawn', '/admin', '/directory', '/gallery', '/snap', '/kiosk', '/magazine', '/radio', '/records', '/entertainment', '/studio', '/air', '/chase', '/mbt', '/hillbilly', '/demo', '/links', '/foreman']` from middleware.ts line 231) means that *every domain* serves *every pass-through path*. So `outsidereconomics.com/records` renders the records section under the Outsider Economics hostname. There is no domain-specific access control on these paths. This is a brand-bleed problem and an SEO duplicate-content problem waiting to bite.

The `/chat` pass-through is correct in intent (chat should be everywhere) but wrong in implementation (chat doesn't know which tenant it's serving).

### Problem G — Mobile is an afterthought everywhere

The brand layouts (Touring, Magazine) use `<Navigation>` which has a hamburger menu (line 95+ of packages/ui/components/Navigation.tsx — useState menuOpen). That's fine.

The internal briefings use single-column `max-width: 980px` with media queries dropping to single-column at 720px. Acceptable, not great.

The chat uses `maxWidth: 720, margin: '0 auto'` and `padding: '24px 24px 0'`. On mobile this is fine for the message column but the **input composer at the bottom doesn't dodge the iOS keyboard**, doesn't handle safe-area insets, and there's no swipe-back affordance because there's nothing to swipe back to. The chat is the product. The chat is not mobile-first.

The local dashboard is desktop-only by design (it's Chase's tool). Fine.

The tokenomics iframe-comparison nav (sticky topbar, horizontally scrolling links per approach) will be brutal on mobile — multiple iframes nested, sticky bars stacking, no touch-friendly tap targets.

---

## 3. Architectural Recommendations — The IA I'd Build From Scratch

If we were starting today with the same business (one platform, multiple brand surfaces, chat as the primary product, partners and admins as separate audiences), I'd build five things and only five things.

### Recommendation 1 — Three navigation registers, one shared chrome

There are three audiences. They need three different chrome treatments, not nine.

| Register | Surfaces | Chrome |
|---|---|---|
| **Reader** | Touring, Magazine, Radio, Records, Entertainment, Directory, Economics, Bearsville, Studio C, Tuthill, DCTV, Gallery, MBT marketing | Editorial topbar + brand mark + the chat icon (always) + footer with ecosystem map |
| **Operator** | /admin, /tracy, /amy, /chase, partner workspaces | Topbar showing "you are: [name] / [role]" + sidebar of curated tools + chat icon + minimal footer |
| **Conversation** | /chat (and any embedded chat surface) | Headerless or minimal header showing tenant context + composer + footer is the meter strip (token usage live) |

The shared chrome is one `<EcosystemFrame>` component that takes a `register` prop and renders the appropriate variant. It owns:
- The brand mark (current tenant)
- The chat icon (always — opens an overlay if the user isn't already in /chat)
- The breadcrumb / tenant switcher (where am I, what else exists)
- The footer (ecosystem map for reader, minimal for operator, meter for conversation)

This collapses 9+ bespoke layouts into 1 component with 3 variants.

### Recommendation 2 — The chat is the primary nav. Every reader surface gets a chat icon that opens an overlay.

Verdict expanded in section 6. The chat is already a router. It already knows specialists. It already escalates. It is **strictly more capable than a static menu**. The only reason to keep static nav is for SEO/AEO crawlability and for first-touch users who don't trust chat yet.

So: every reader surface keeps a small static nav for crawl + first-touch. But the **dominant affordance** is a chat icon (or a search bar that IS a chat input) in the header. Click it and the chat slides in as an overlay; the page beneath stays scrolled. The chat knows you came from `bigmuddytouring.com/shows`, so it primes its context with that page. The dispatcher routes you wherever the conversation goes.

This is the "router as a paradigm" question from the brief. Answer: yes. Apply it everywhere.

### Recommendation 3 — Clean URL structure, locked pass-through whitelist per tenant

The current pass-through is global. Fix it.

Change `BMT_BRAND_PREFIXES` in `domain-routes.ts` to a per-tenant `passThrough` list. So Touring's tenant config says `passThrough: ['/magazine', '/radio', '/records', '/entertainment', '/inn']` (sub-content of the consolidated touring domain). Outsider Economics's tenant config says `passThrough: ['/field-manual', '/the-math']` (no magazine, no records, no chat-as-third-tenant collisions).

`/admin` and `/chat` stay universal but **gain tenant context**: the chat reads the host header on render and binds itself to the tenant; the admin checks tenant in `auth-rules.ts` before rendering surfaces.

### Recommendation 4 — Promote the briefing template into a real template

The four `/public/*/index.html` files have invented an internal-doc template. Extract it. Put it in `packages/ui/components/BriefingFrame.tsx` with a `mode: 'internal' | 'public'` prop. Internal mode renders noindex + the "For X · Internal Briefing" topstrap. Public mode renders the normal magazine chrome + an indexable URL.

This gives us a single migration path: a doc starts as a noindex briefing at `/briefings/[slug]`, gets reviewed, and flips to public at `/articles/[slug]` with one prop change. No copy-paste of `<style>` blocks. No drift between four CSS variable systems.

### Recommendation 5 — Build an actual ecosystem map page, link it from every footer

Create `/ecosystem` (or `/network` or `/hillbilly-dreams`). One page. Lists every brand. Lists every tool. Lists who serves who. Linked from the footer of every reader surface. This is the page that answers "who are these people, what is this universe" — the question every customer who lands on a single brand site is silently asking and currently can't answer.

Today the closest thing is `hillbillydreamsinc.com` (the holding-co page) which is "sparse" per CLAUDE.md. Make it not sparse. Make it the map.

---

## 4. Migration Path — How To Get There Without Breaking Anything

### Phase 0 — This week (cheap wins, no breakage)

1. **Fix the chat tenant binding.** In `app/chat/page.tsx`, read the host header server-side (the page is currently a Client Component — it needs a server wrapper or a `headers()` call that runs at request time). Pass tenant to the page. Show "Big Muddy" / "Bearsville" / "Studio C" depending on host. (~2 hours of engineering)

2. **Add a `<EcosystemFooter>` component** to every reader surface. Replace the existing `Footer` from `@bigmuddy/ui` and the `PoweredByFooter` with a single new component that lists: current brand, sister brands, Powered-by-MBT, /ecosystem link. (~3 hours)

3. **Tighten the pass-through list.** Audit `BMT_BRAND_PREFIXES` and `topLevelPassthrough` in middleware.ts. Anything that's tenant-specific (e.g., `/magazine`, `/radio`, `/records`, `/entertainment`) should be moved to the Touring tenant's pass-through list and *removed* from the global list. Universal paths (`/admin`, `/chat`, `/api`) stay global. (~4 hours)

### Phase 1 — Next two weeks (the chat-as-overlay pattern)

4. **Build `<ChatOverlay>` component.** A right-side slide-in (mobile: full-screen sheet). Triggered by a chat icon in every reader surface header. Pre-loads with the current page URL as context. Persists conversation across pages. (~2-3 days engineering)

5. **Add `<EcosystemFrame>` wrapper** to one tenant first (suggest: Touring). Three variants (reader / operator / conversation). Verify it composes correctly with existing `<Navigation>` from packages/ui. (~3 days)

6. **Roll the frame to the other 8 brands.** Each brand keeps its theme tokens; only the chrome changes. (~1 day per brand × 8 = 8 days, parallelizable)

### Phase 2 — Month two (the briefing → publish pipeline)

7. **Extract `<BriefingFrame>`.** Migrate the 4 existing `/public/*/index.html` files to use it. Verify they still render identically. (~2 days)

8. **Build `/briefings/[slug]` route.** Sanity collection. New briefings get published here as noindex; promoting to public flips a flag and surfaces them at `/articles/[slug]`. (~3 days)

9. **Build `/ecosystem` page.** Hand-curated. Living doc. The map every customer needs. (~1 day, mostly content)

### Phase 3 — When ready (chat-as-primary)

10. **A/B test the chat-as-search-bar header.** On Touring first. Static nav still exists but the visual prominence shifts. Measure: do users engage chat more? Does conversion to `/chat` open rate climb? (~2 weeks of measurement)

11. **If metrics support, roll the chat-first header to all reader surfaces.**

---

## 5. Conventions — The Nav Contract All Surfaces Follow

Codify these. Add to `docs/conventions/nav-contract.md`. Enforce in code review.

### Header (every surface)

```
┌─────────────────────────────────────────────────────────┐
│ [Brand Mark] [Brand Name · Sub-label]   [Chat icon]  │
│                                          [Login chip] │
└─────────────────────────────────────────────────────────┘
```

- **Left**: brand mark (32px square SVG) + brand name in serif + sub-label in sans. Fixed.
- **Right**: chat icon (always present, opens overlay or routes to `/chat`) + login state chip.
- **Center (desktop only)**: 4-7 brand-specific nav links.
- **Mobile**: hamburger replaces center, chat icon stays right.
- **Sticky on scroll**.
- **One height**: 64px desktop, 56px mobile. No exceptions.

### Footer (every reader surface)

```
┌─────────────────────────────────────────────────────────┐
│  THE NETWORK                                            │
│  Touring · Magazine · Radio · Records · Entertainment   │
│  Directory · Economics · Inn · Gallery                  │
│                                                         │
│  Powered by Measurably Better Things                    │
│  © 2026 Hillbilly Dreams Inc · Natchez, Mississippi    │
└─────────────────────────────────────────────────────────┘
```

- Network grid lists every active reader surface as inline links.
- "Powered by" line links to /ecosystem (not measurablybetter.life — keep the chain inside our universe).
- Operator surfaces get a minimal footer (just "© 2026 HDI · admin").
- Conversation surface (chat) gets a meter strip footer (token usage, plan, upgrade link).

### Primary nav pattern

- **Reader surfaces**: Static brand nav + chat icon (mandatory).
- **Operator surfaces**: Sidebar with curated tools (max 8 items, organized by frequency) + chat icon (mandatory).
- **Conversation surface**: No primary nav. Chat IS the nav.

### Search / chat surface

- Chat icon is the mandatory nav primitive on every surface.
- Click chat icon → `<ChatOverlay>` slides in (mobile: full-screen).
- The overlay carries page context (current URL, current tenant) into the chat as initial system context.
- When the chat dispatches to a destination, the overlay can either close (and route the page) or stay open (parallel context).

### Breadcrumbs

- **Reader**: Skip them on home pages. Use them inside taxonomies (`Magazine / City Guides / Memphis`).
- **Operator**: Always present (`Admin / Tracy / Inbox`).
- **Conversation**: Replaced by the conversation thread title.

### Mobile pattern

- Header: 56px sticky.
- Hamburger replaces nav.
- Chat icon stays.
- Composer in chat dodges keyboard via `position: fixed; bottom: env(safe-area-inset-bottom)`.
- Tap targets 44×44 minimum.
- iframe comparisons (tokenomics) become tap-to-fullscreen on mobile.

---

## 6. The Chat-As-Nav Question — My Verdict

**Verdict: chat is the primary navigation for customers in 18 months. Today, it's the *dominant secondary* navigation. Static nav still ships as the SEO/AEO/first-touch fallback.**

Reasoning:

1. **The chat is already a router.** The page comment in `app/chat/page.tsx` describes the dispatch architecture: `which_specialist` → `route_to_specialist` → multi-stream specialist responses. This is the IA pattern expressed in conversation form. It is strictly more capable than a static menu — it can ask clarifying questions, escalate to humans, remember prior context.

2. **Static nav has a known ceiling.** A 5-link top nav can express ~5 destinations. A chat can express infinite destinations *and* understand intent that doesn't map to any single page. ("I'm thinking about booking a corporate retreat for 12 people in October" doesn't fit any nav menu but fits a chat trivially.)

3. **AEO is the new SEO and chat-shaped queries are how AEO works.** If the customer is asking ChatGPT and Perplexity questions about Big Muddy, the answers come from structured pages that the LLM can chunk. A chat-first website is the same shape as the customer's question. Static nav is the artifact of an era that's ending.

4. **The "Powered by Measurably Better Things" footer is a promise the rest of the site doesn't keep.** If MBT is a chatbot-first hybrid SaaS+Service per `mbt-product-definition-2026-04-30.md`, then *every* surface should expose the chat affordance. Today only `/chat` and the dashboard's link in the topbar do.

5. **But — the static nav still ships.** Three reasons: (a) Google still crawls our pages, (b) some customers don't trust chat, (c) the chat is one feature failure away from a complete navigation outage. Defense in depth.

**Concrete prescription:**
- Every reader surface header: brand mark + 4-5 static links + a prominent chat icon.
- Header is treated as primary nav today; chat icon is treated as primary nav in 18 months. Plan for the swap.
- The `/ecosystem` page is the static fallback when chat fails or the user doesn't trust it.
- Operator surfaces lean harder on chat because operators benefit more from "what's my schedule next week" than from clicking through a sidebar.

**Anti-pattern to avoid:** Don't replace nav with chat overnight. The chat is V2 quality (one specialist tier, no memory, no per-user workspace). It's not ready to be the only door.

---

## 7. Open Questions for Chase

These are the calls only you can make. Each blocks a meaningful slice of the migration.

1. **Is "Big Muddy" the dominant brand on the chat surface, or does the chat take the tenant's brand when accessed via that tenant's domain?**
   - Today: hardcoded "Big Muddy". 
   - Option A: chat is always Big Muddy (the operating company brand for the chat product).
   - Option B: chat shows the tenant's brand (Bearsville users see "Bearsville Assistant").
   - Option C: chat shows MBT (the SaaS product) regardless of tenant.
   - This decides what 1,000 future customers see when they hit the chat from any domain.

2. **Should `/chat` be the default landing page for `measurablybetter.life` (the MBT product domain)?**
   - Today: measurablybetter.life renders the marketing page (`app/measurably-better/page.tsx`).
   - The product *is* the chat. Should the product domain default to the product?
   - If yes: the marketing page moves to `/about` or `/why` and `measurablybetter.life` becomes a chat instance.

3. **Do partners (Tracy, Amy, JP, Elijah, Miles) get individual subdomains or sub-paths under admin?**
   - Today: `/admin/tracy`, `/admin/amy`. No subdomains.
   - Subdomain option (`tracy.bigmuddytouring.com`) gives each partner their own Vercel project sense, distinct AEO/SEO surface, easier to brand individually.
   - Sub-path stays simpler. Pick one and stop having both.

4. **Is the local dashboard (`localhost:8888`) something we should ship as a real production page?**
   - Today: dies on sleep, runs from `python -m http.server`, only Chase uses it.
   - Option A: ship as `/dispatch` or `/dashboard` (admin-only) so it survives reboots.
   - Option B: kill it and let the chat be the dashboard.
   - The chat-as-nav verdict in §6 favors Option B.

5. **Internal briefings in `public/` — what's the lifecycle?**
   - Today: noindex'd, hand-written HTML, no path to publish.
   - Need a decision: are these always ephemeral (kill after the call) or do some become canonical case studies?
   - This blocks Recommendation 4.

6. **What's the canonical name for the ecosystem?**
   - The footer says "Powered by Measurably Better Things" but the product is also called MBT, the operating brand is Big Muddy, the holding company is Hillbilly Dreams Inc, and Inverted Intelligence is the marketing thesis.
   - The `/ecosystem` page needs ONE name at the top. Pick it.

7. **Mobile-first or desktop-first for the chat?**
   - The whole product hangs on this. Desktop-first means investing in keyboard shortcuts, multi-pane layouts, multi-specialist parallel streams in side-by-side cards. Mobile-first means investing in keyboard handling, swipe gestures, voice input, single-column flow.
   - I'd argue mobile-first because the customer-on-the-road (Tracy en route, Amy at the bar, a touring artist in a van) is the canonical user. But this is a strategic call.

---

## 8. The Test (the Vesper test from the manifesto)

> *"Does this make the photography look more expensive and the technology look more invisible?"*

Run this test on every nav element:

- Current `<Navigation>`: 9 nav links + brand mark + login chip = ~12 elements competing with the photography. **Fails.**
- Recommended `<EcosystemFrame>` reader header: 1 brand mark + 1 chat icon + ~5 nav links = ~7 elements. **Closer.**
- Best version: brand mark + chat icon (which IS the nav). 2 elements. **Passes.** This is where we end up in 18 months.

The migration path is the path from "nav as menu" to "nav as conversation." Get there gradually. Measure each step.

---

*Document complete. Next action: Chase reads §7 open questions, decides 1-2 of them, and we start Phase 0 implementation Monday.*
