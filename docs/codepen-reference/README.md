# CodePen Reference Designs — Chase Pierson

These are Chase's prototype designs from CodePen that need to be applied to the current MBT platform build. Each maps to a specific domain/tenant.

## 1. Studio C — Recording World Media
- **CodePen:** https://codepen.io/Chase-Pierson/pen/EayoVZd
- **Maps to:** `studiocvideo.com` (Studio C tenant)
- **What it is:** Catalog-forward media company site. Dark, minimal, amber accents. Sections: Hero, Catalog grid (6 projects), Live feed (social aggregation), About/POV, How the model works (produce/publish/plug in), Work with us CTA.
- **Key catalog items:** Clubhouse Studios (Mix Mag cover), Ardent Studios (documentary), Utopia Sessions (Matt Pond/Felice Brothers), Brian Mitchell (documentary + album art), Kate Hope × API (Utopia), Outsider Economics (book).
- **Status:** HTML saved. Needs conversion to Next.js page with inline CSS (no Tailwind) and real images from `/images/studio-c/`.

## 2. Feed Farm Protocol — Independent Left Ad Network
- **CodePen:** https://codepen.io/Chase-Pierson/pen/gbrBNbE
- **Maps to:** New tenant (feedfarm.network TBD) or proposal page
- **What it is:** Ad network aggregator for independent media creators. Katie Halper, Aaron Maté, Briahna Joy Gray as anchor nodes. One contract, one invoice, one creative brief, syndicated across the network.
- **Key details:** $45 CPM, $10K minimum buy, 3 sponsors/quarter, 1.2M aggregated subs, 5.5M monthly impressions. Ad products: Integrated Host Read, Network Bumper, Newsletter Syndicate.
- **Status:** Proposal written at `docs/clients/KATIE_HALPER_FEED_FARM_PROPOSAL.md`. HTML saved for reference.

## 3. Studio C — Story & Value (Pitch Deck)
- **CodePen:** (pasted directly, no URL)
- **Maps to:** `studiocvideo.com/about` or sales collateral
- **What it is:** A value proposition / pitch page for Studio C. Deep navy/dark theme, orange accents. 6 sections: Hero, The Real Problem, The Studio C Model (4 steps), Proof/Projects (8 cards), Podcast Sidecar, Value Equation, Closing.
- **Key insight:** "You're not just paying for a video — you're stepping into a system that knows what to do with it."
- **Status:** HTML saved. Needs conversion to Next.js page.

## 4. UTOPIA: The Recording History of Bearsville
- **Source:** Pasted directly (Python script with embedded HTML)
- **Maps to:** `utopiabearsville.com` (new domain / Bearsville tenant sub-route)
- **What it is:** Documentary series concept microsite. Long-form YouTube series exploring Bearsville/Woodstock recording history — Grossman era, The Band, Todd Rundgren, modern Studio C/Utopia.
- **Key people:** Baker Rorick (host/co-producer, luthier community bridge), Veillette Guitars (feature sponsor)
- **Sections:** Hero with cinematic still, Series & Format, Distribution & Audio Companion, Baker Rorick & Maker Culture, Sponsorship Landscape
- **Sponsors identified:** Veillette Guitars, Keystone Guitars, Carmine Street Guitars, Fodera, Martin, API, Rupert Neve, Telefunken, Dangerous Music, Bearfoot Sound, Burl Audio, Bearsville Theater, Woodstock Film Festival
- **Status:** HTML saved. Maps to Bearsville Creative tenant. Could be a sub-route of `bearsvillemediagroup.com` or standalone at `utopiabearsville.com`.

## 5. Monumental Taco — Music Series & Studio Partnership Model
- **Source:** Pasted directly (HTML strategy deck)
- **Maps to:** Internal strategy / pitch deck for studio partnerships. Could live at `studiocvideo.com/partnerships` or as a standalone pitch page.
- **What it is:** A content slate across Studio C, Utopia, 44 Pictures, and Ardent Studios. Four series concepts: Ardent Sessions (Atmos live films), Bushkill Sessions (intimate performances), Artist Radio Network (earned media), "Bananas Nights" (multi-room takeovers).
- **Key partners:** Ardent Studios (Memphis, Atmos mixing), Studio C (executive production), 44 Pictures (story craft, series packaging), Utopia (secondary venue, event crossovers)
- **Key people mentioned:** Eli, Miles (core crew), Mark (engineering bench), Dan Summer (vintage systems)
- **Revenue model:** Shared ownership of media properties, AVOD/SVOD streaming, licensing/sync, brand partnerships, physical bundles (Atmos Blu-ray, vinyl)
- **Artist pitch:** Zero recording cost + ownership share. Atmos + vintage dual-process. "Made-here" sound.
- **Special projects:** 4-Track Revival, Analog vs Atmos dual-release, Studio Time Capsule (vintage broadcast cameras), Bananas Night (A/B/C rooms live simultaneously)
- **Status:** HTML saved. Strategy doc for Ardent/Studio C partnership. Informs the Bearsville Creative and Studio C tenants.

## 6. Monumental Taco — How It Works (Label Services Model)
- **Source:** Pasted directly
- **Maps to:** Big Muddy Records operating model (not a website — an internal framework)
- **What it is:** Hybrid management + label services. $48K/yr retainer, 20-25% revenue participation, artists keep 100% masters, retainer-credit mechanic. Competitive positioning table vs AWAL, Kobalt, Empire, etc.
- **Key people:** Chase Pierson + Mark Danger (Ardent — **NOTE: Ardent relationship is terminated, active lawsuit**)
- **Analysis:** `docs/analysis/MONUMENTAL_TACO_TO_BIG_MUDDY_RECORDS.md` — 5 ideas to adopt, Ardent stripped
- **Status:** Early version of Big Muddy Records. Ideas extracted. Ardent removed from all active plans.

## 7. The Future of Filmmaking — Woodstock Film Festival (two versions)
- **Source:** Pasted directly (v1 = overview pitch, v2 = full event page with Director's Challenge)
- **Maps to:** Bearsville Creative event — `bearsvillemediagroup.com/events/film-festival` or standalone
- **What it is:** Unsanctioned counter-programming event during Woodstock Film Festival. Utopia Studios demos multi-cam wireless, live broadcast, AR/AI tools, campus radio. V2 adds the "Director's Challenge" — rotating 60-minute filmmaking sprints where directors concept, shoot, edit, and premiere a short film in one hour.
- **Key details:** 4-5 director slots, outdoor tent with large display, campus WiFi with captive portal, building projection, AR "ghosts" of historic musicians
- **Infrastructure:** All already owned — Ronin 4D, Blackmagic, ATEM, 200Mbps fiber, WiFi APs. Under $1K additional investment.
- **Status:** Event concept for October 2026 Woodstock Film Festival weekend. Needs date confirmation and director recruitment.

## Application Priority

1. **Studio C catalog page** → `studiocvideo.com` homepage (applies CodePen #1)
2. **Studio C value/pitch page** → `studiocvideo.com/about` (applies CodePen #3)
3. **Feed Farm landing page** → new route or standalone (applies CodePen #2)
4. **Utopia Bearsville documentary** → `utopiabearsville.com` or `bearsvillemediagroup.com/utopia` (applies CodePen #4)

## Conversion Notes

- All CodePens use Tailwind CDN. The live site uses **inline CSS only** — convert all Tailwind classes to inline styles.
- Use `var(--font-body)`, `var(--font-display)` for typography.
- Use CSS custom properties for colors.
- Replace placeholder image areas with real photos from `/images/studio-c/`.
- The Studio C tenant already exists in `tenants.ts`.
