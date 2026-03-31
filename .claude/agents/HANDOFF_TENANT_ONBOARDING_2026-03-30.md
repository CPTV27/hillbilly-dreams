# Handoff: Client Tenant Onboarding Process

**Date:** 2026-03-30
**From:** Claude Code (reverent-tu worktree)
**Status:** Plan complete, ready for coordinated implementation

---

## What This Is

A repeatable process for onboarding external clients as tenants on the multi-tenant platform. First client: **Studio C Video** (Woodstock/Bearsville, NY).

## Key Insight: Studio C Is a Client, Not Our Domain

We do NOT control DNS for studiocvideo.com. Studio C is an external client tenant — the first business using the same micromedia architecture we built for Big Muddy in Natchez. Their domains are configured in our routing, but they manage their own DNS. QA testing happens via the `/studio` route, not by hitting their domain.

## What's Already Built (Don't Rebuild)

- **Tenant config** — `apps/web/config/tenants.ts` has Studio C registered with correct Woodstock location, domains, features, accent color (#4A90D9)
- **Domain routing** — `apps/web/config/domain-routes.ts` maps `studiocvideo` / `studio-c` → `studio` route group
- **Middleware** — `apps/web/middleware.ts` rewrites correctly
- **Studio C pages** — `apps/web/app/studio/page.tsx` (595 lines) and `layout.tsx` exist but contain wrong content (Natchez/Big Muddy instead of Woodstock)
- **Brand DNA** — `.claude/agents/brands/BRAND_DNA_STUDIO.md` has voice guidance

## What's Wrong With Current Studio C Page

1. Says "Natchez, Mississippi" — should be Bearsville/Woodstock, NY
2. References Big Muddy Inn — should reference Utopia Studios
3. Contact email is `studio@thebigmuddyinn.com` — wrong
4. Layout uses `theme-touring` class — should be `theme-studio`
5. Footer has `brand="touring"` — should be `brand="studio"`
6. Features Arri Aslin (Big Muddy artist) — should feature Utopia Studios / Bearsville Theater connection
7. Gear list may be partially correct but needs verification

## Research Done (Use This)

Studio C Video is a B2B multicam video production company:
- **Address:** 293 Tinker Street, Woodstock, NY 12498
- **Phone:** (845) 518-7061
- **Facility:** At/near Utopia Studios Bearsville (historic Todd Rundgren studio, now run by Pete Caigan)
- **Services:** Multicam concert capture, event video, live streaming, post-production
- **Market:** Bearsville Theater (250-seat venue, 100+ shows/year), Hudson Valley arts community
- **Sister company:** Tuthill Design (real estate photography, virtual staging)
- **Online presence:** Yelp listing, The Bash profile, Instagram @studiocvideo — NO live website
- **Brand voice:** Professional, understated, B2B. NOT consumer-facing. Says "produce" not "create content." Specs matter.
- **Chase's background:** 25+ years broadcast video, IMDB credits, cinematographer/director

## The Plan (What Needs Building)

### New Files to Create

1. **`apps/web/config/briefs/CLIENT_BRIEF_TEMPLATE.md`** — Structured markdown template for any new client. Sections: identity, location, services, gear, packages, online presence, competitors, brand voice, media assets, contact.

2. **`apps/web/config/briefs/BRIEF_STUDIO_C.md`** — Filled brief for Studio C using research above.

3. **`apps/web/config/tenant-content.ts`** — TypeScript interface `TenantPageContent` with typed sections: hero, capabilities, packages, gear, featureSection, cta, navLinks, metadata. Most fields optional.

4. **`apps/web/config/tenant-content/studio-c.ts`** — Exports `TenantPageContent` object with real Woodstock data.

### Files to Modify

5. **`apps/web/app/studio/page.tsx`** — Refactor from 595 lines of hardcoded content to ~200 lines importing from content file. Same visual design, same CSS variables.

6. **`apps/web/app/studio/layout.tsx`** — Fix:
   - `className="theme-touring"` → `"theme-studio"`
   - Metadata title/description (remove Natchez)
   - `<Footer brand="touring" />` → `<Footer brand="studio" />`
   - Contact email

### Do NOT Touch

- `config/tenants.ts` — already correct
- `config/domain-routes.ts` — already correct
- `middleware.ts` — works as-is
- Prisma schema — no new models needed

## Architecture Pattern

```
Brief (markdown)     → researched business data (input document)
Brand DNA (markdown) → how to write for this brand (AI agent context)
TenantPageContent    → what the page renders (TypeScript export)
TenantConfig         → routing, theming, identity (already exists)
```

The brief is filled by research (human + AI). The content file is generated from the brief. The page.tsx imports the content file. The layout reads theme from tenant config.

## Coordination Notes

- This worktree (`reverent-tu`) has the plan but hasn't started implementation
- The `getTenantById()` and `getTenantByHostname()` functions in `tenants.ts` exist but are never imported by any page — the refactored page.tsx could use them
- The same pattern should eventually apply to Bearsville (`app/bearsville/`) and Tuthill (`app/tuthill/`) pages
- Future: CLI scripts to automate brief→content generation, but not blocking Studio C

## How to Verify

1. Run dev server, navigate to `/studio`
2. Confirm Woodstock/Bearsville location, correct contact info, no Natchez references
3. Check `theme-studio` class applied
4. Console error check
5. Mobile (375px) layout check
