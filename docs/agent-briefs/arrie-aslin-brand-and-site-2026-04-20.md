# Agent Brief — Arrie Aslin Brand Package + Website

**Date:** April 20, 2026
**Briefed by:** Chase Pierson
**Target agent:** Any Claude Code session, ideally with frontend + content + design skill access (frontend-developer, Gallery Director, or a general-purpose agent that can orchestrate). Paste this prompt into the agent's starting message.
**Expected outputs:** Brand package (written + visual direction) + production website live on the MBT multi-tenant platform.

---

## The full agent prompt (paste below this line)

---

You're building the complete brand package and website for **Arrie Aslin** — the stage name of Amy Allen, equity partner in the Big Muddy / Measurably Better Things ecosystem.

## About Arrie Aslin

- Singer with a band. Performs original material + covers.
- Artist-in-residence at Big Muddy Inn + Blues Room (Natchez, MS)
- Host of an eponymous radio show on Big Muddy Radio
- Signed to Big Muddy Records (the label under the Big Muddy ecosystem)
- Based in Natchez; tours the Snowbird Circuit / Blues Highway / Mississippi corridor

## CRITICAL — spelling

**The canonical spelling is "Arrie Aslin."** Not "Arri Aslan," "Ari Aslan," "Ari B. Aslan," "Arri Aslin," or any other variant. Enforce this across every asset you produce — file names, page titles, meta tags, social handles, everything.

If you see other variants in the codebase or repo, they are drift — correct them in a follow-up commit.

---

## Before you write anything, read these

**Canonical source of truth (must-read before any work):**

1. `docs/THE_THESIS.md` — the ecosystem thesis; understand Amy's role as equity partner and Arrie Aslin as her artistic identity
2. `docs/STORY_KIT.md` — canonical bios, forbidden framings, brand voice rules
3. `docs/voice/` — per-brand voice docs; confirm whether Arrie Aslin voice doc already exists. If it does, extend it. If it doesn't, create one.
4. `docs/90_DAY_PLAN.md` — Amy's Week 1–12 role; the site should support her operational calendar (show dates, recording sessions, podcast pilot)
5. `docs/ecosystem-classification-taxonomy-2026-04-20.md` — classify all work as `TOUR` (Records is bundled under TOUR until it gets its own P&L)
6. `docs/ecosystem-subscriptions-2026-04-20.md` §C.3 — how Big Muddy Records distributes via DistroKid + SoundCloud; the site should embed/link to these
7. Existing MBT platform architecture: `apps/web/middleware.ts`, `apps/web/config/domain-routes.ts`, `apps/web/config/tenants.ts` — the multi-tenant routing pattern you'll extend

**Photo library:**
`GCS bucket bmt-media-bigmuddy` (229+ curated real Chase Pierson photos). Some of Amy performing as Arrie Aslin likely exist there. Grep the library index (`data/` or via CLIP search) for `arrie`, `amy`, `blues room`, `performance`, `inn`. Use these as the hero imagery. **Do not use AI-generated people imagery ever** — per the QA rules in `.claude/agents/QA_CHASE.md`.

---

## Deliverable 1 — Brand package (written + visual)

Produce a single structured doc: `docs/brands/arrie-aslin-brand-package-2026-04-20.md`

Contents:

### Positioning
- One-paragraph artist statement (200 words) — who Arrie Aslin is, what the music is, what the performer offers
- One-sentence pitch (signature line for bios, signatures, handles)
- Genre + aesthetic anchor (soul / blues / Americana / something else — verify with Amy what she considers her home genre; if ambiguous, propose 2–3 options with justification for each)

### Visual identity
- Logo direction: 2–3 written concepts (not actual logos — this is brief-level, Tuthill Design will execute). Examples: serif wordmark with Natchez geography cue, typographic monogram "AA", etc.
- Color palette (3–5 hex codes, with rationale). Iron & Earth brand family adjacent — warm amber, deep green, black, cream, gold — but Arrie Aslin should have her own accent. Propose a signature color.
- Typography direction: display + body pairing, consistent with MBT design tokens (`var(--font-display)`, `var(--font-body)`)
- Photography style: direction for shoots (lighting, setting, mood) — reference the existing Big Muddy photo library for anchor look

### Voice + tone
- 3–5 canonical statements Arrie Aslin says in her voice (polished, NOT transcribed voice memos — respect Chase's "don't quote me when I'm dictating" rule applied to Amy as well)
- Forbidden framings (things that would drift — e.g., never refer to her as "up-and-coming," never claim credentials she doesn't have)
- Sample copy blocks: short bio (50 words), medium bio (150 words), long bio (300 words) — all in her voice
- Social caption voice examples (Instagram, TikTok if she's on it, Twitter/X)

### Content categories
- Music (releases, discography, streaming links — Spotify, Apple Music, SoundCloud, Bandcamp)
- Shows (upcoming + past — pulls from the events module if possible)
- Press + EPK (electronic press kit for booking agents)
- Journal / notes (optional blog space for tour stories or behind-the-scenes)
- Mailing list signup

### Merchandise concepts
- 3–5 merch ideas aligned with her aesthetic (t-shirts, vinyl-era cover art merch, tour posters, etc.) — framework only, not final designs

---

## Deliverable 2 — Website

Build a production website for Arrie Aslin on the MBT multi-tenant platform (Next.js + Sanity CMS + Vercel).

### Architecture decisions

- **Domain:** recommend `arrieaslin.com` as the production domain. Check availability with `whois` or the Cloudflare Registrar API. If available, register under the chasepierson.tv Cloudflare account. If not, propose alternatives (arrieaslin.music, arrieaslinmusic.com, etc.).
- **Tenant setup:** add Arrie Aslin as a new tenant in `apps/web/config/tenants.ts`. Route `arrieaslin.com` to its own route group (e.g., `apps/web/app/(arrie-aslin)/`).
- **Sanity schema:** add (or reuse) schemas for artist, release, show, press-item. If these exist in `sanity/` already, extend them; otherwise create.

### Pages (initial v1)

1. `/` — Home hero (full-bleed performance photo, name, tagline, latest release embed, CTA: join mailing list / buy tickets to next show)
2. `/music` — Discography: albums, EPs, singles. Each release has cover art, release date, streaming links (Spotify + Apple + SoundCloud + Bandcamp), embedded player
3. `/shows` — Upcoming + past shows in a clean list. Integrate with the MBT events module if it exposes Arrie-Aslin-tagged events; otherwise stub with Sanity content
4. `/about` — Medium bio (pulled from brand package) + photo gallery + links to Big Muddy Inn artist-in-residence context + Big Muddy Radio show
5. `/press` — Electronic press kit: short bio, medium bio, long bio, high-res photo downloads, press quotes (when available), tech rider / stage plot (stub for now), contact-for-booking link routing to Tracy's biz dev email
6. `/contact` — Two forms: one for fan contact, one for booking inquiries. Both feed into the existing MBT inquiry pipeline (see `apps/web/app/api/inquiries/` or similar).
7. `/journal` (optional, defer to v2) — Blog for tour stories, cross-posted from Big Muddy Magazine when relevant

### Integrations (embed or link)

- Spotify artist embed (use `sanity.embed` field type if available, or custom Embed component)
- SoundCloud artist player embed
- Bandcamp embed for any releases on Bandcamp
- YouTube latest music video embed on home
- Apple Music badge
- Mailing list signup (stub: email capture into Attio CRM for now; when Klaviyo-class email platform is activated per the 90-day plan, migrate the list)

### Metadata + SEO

- Every page has proper Open Graph tags (title, description, image)
- `schema.org MusicGroup` structured data on the home page with performer name, genre, URL, sameAs (Spotify, Apple Music, SoundCloud, Bandcamp links)
- `schema.org Event` structured data on each show page (venue, date, ticket URL)
- Canonical URLs, sitemap, robots.txt
- `<link rel="icon">` + Apple touch icon using the brand package logo direction

### Performance + polish

- Core Web Vitals: target LCP under 2.5s, CLS under 0.1
- Images served via `next/image` with proper sizing
- Fonts via `next/font` with `var(--font-display)` and `var(--font-body)` tokens
- Preview deployment URL + production deployment; verify both work on mobile + desktop
- No hardcoded colors — use CSS custom properties per the QA rules
- Accessibility: WCAG 2.1 AA — contrast, keyboard nav, skip links, alt text

### Photography

- Hero photos sourced from `GCS bucket bmt-media-bigmuddy` — curated Chase Pierson originals
- Every photo has descriptive alt text
- All asset URLs must contain `/approved/` to verify they're real Chase photos (per CLAUDE.md)

### Content seed

- Create 3–5 Sanity content entries to seed the CMS:
  - 1 Artist record (Arrie Aslin)
  - 1–2 Release records (whatever Amy has released or plans to release — stub if none)
  - 3–5 Show records (Blues Room residency dates + Snowbird Circuit upcoming)
  - 1 Press-item record (stub press quote)
- Document the content model so Amy can add to it through the Sanity Studio without developer help

---

## Constraints + quality rules

- **Never use AI-generated imagery of people.** Real Chase Pierson photography only.
- **Respect the canonical spelling "Arrie Aslin" everywhere.**
- **No hardcoded model names.** Import from `lib/ai-models.ts` if you use any AI for content generation.
- **No hardcoded fonts or colors.** Use CSS custom properties.
- **No tech jargon on customer-facing pages.** She's a musician's site, not a platform demo.
- **No marketing-speak.** Voice must read like a real person wrote it — Chase's humanizer rule applies.
- **Page copy goes through the brand package voice doc first.** Don't write UI copy off the top of your head; pull from the canonical statements you produced in Deliverable 1.

---

## Workflow + output

1. Open a working branch: `claude/arrie-aslin-brand-and-site`
2. Deliver in three phases, committing at the end of each:
   - **Phase 1 (1–2 hours):** brand package written doc committed to `docs/brands/arrie-aslin-brand-package-2026-04-20.md`. Ping Chase + Amy for review before proceeding to Phase 2.
   - **Phase 2 (half a day):** tenant config + route group skeleton + Sanity schemas + 1 fully-built page (home). Deploy preview, review with Chase.
   - **Phase 3 (half a day):** remaining pages (music, shows, about, press, contact). Final deploy preview, handoff to Amy for content entry via Sanity Studio.
3. Every commit follows the repo convention: co-authored footer, scoped commit prefix (`feat(arrie-aslin):`, `docs(brands):`), clear summary.
4. Open a PR when Phase 3 is complete — don't merge without Chase's explicit approval.
5. Return a status summary at the end of each phase: what was built, what's live on preview, what's left, any blockers or open questions.

---

## Open questions the agent should flag (but not block on)

1. Final domain choice — verify `arrieaslin.com` availability and register if so
2. Amy's current releases — if none yet, what's the timeline for the first one? (Needed for the /music page to have real content instead of "coming soon")
3. Mailing list email platform — use Attio CRM for now, or wait until Klaviyo-class platform is picked per 90-day plan?
4. Photography shoot — does Amy need new promotional photos? If yes, Chase schedules a shoot; if no, what's in the GCS library is enough?
5. Booking inquiry routing — Tracy's biz dev email, or a dedicated `booking@arrieaslin.com` alias that forwards?

---

*End of brief.*
