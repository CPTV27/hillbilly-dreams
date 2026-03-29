# Task: Studio C / Bearsville Tenant Replication

## Priority: High (Revenue-generating)

## Summary

Replicate the Big Muddy model for Bearsville, New York (Woodstock area). Studio C is the operator — a recording studio at Utopia Studios. Same architecture, different corridor, different slant.

## The Operators

- **Studio C** (studiocvideo.com) — Recording studio at Utopia Studios, Bearsville. Music + photography.
- **Tuthill Design** (tuthilldesign.com) — Same operators. Real estate, architecture, interior design services for the Catskills.

## What Needs to Exist

### Studio C Properties (Music/Recording Slant)
- **Catskill Music Magazine** (or "Up Catskill Magazine") — Long-form editorial about the Catskills music scene. Analog to Big Muddy Magazine.
- **Catskill Radio** — Internet radio from Bearsville. Analog to Big Muddy Radio.
- **Recording Sessions** — Live recording at Utopia Studios. Analog to Big Muddy Records sessions.
- **Catskill Touring** — Regional venue circuit in the Catskills/Hudson Valley. Analog to Big Muddy Touring.
- **Artist Directory** — Local musicians, photographers, artists. Analog to Deep South Directory.

### Tuthill Design Properties (Real Estate/Architecture Slant)
- **Interior Design Portfolio** — Showcase projects.
- **Architecture Services** — For Catskills properties.
- **Real Estate Marketing** — Photography + staging + digital presence for listings.

## Technical Approach

Same codebase. The domain-routes.ts already supports multi-tenant routing. New entries needed:
- Map Studio C domains to `/studio-c/` route group
- Map Catskill magazine domain to `/catskill-magazine/` route group
- Etc.

All existing API keys, AI models, and infrastructure apply. Same Google Cloud project. Same Vercel deployment.

## Revenue Angle

These properties need to start selling immediately. Same pricing model as DSD:
- Free listing tier
- $20/mo AI assistant
- $99/mo full media machine

## Context Files to Read

- `.claude/agents/MASTER_HANDOFF.md` — Full architecture overview
- `.claude/agents/ORIGIN_STORY.md` — The DeFacto Codec Market origin (this is the SAME architecture)
- `apps/web/config/domain-routes.ts` — How domain routing works
- `apps/web/middleware.ts` — Hostname-based routing logic

## Dependencies

- Domain registration for new properties
- Content: magazine articles, radio shows, directory listings for Catskills businesses
- Photography: Studio C has this covered

## Notes from Chase

- "We're using the same API keys for everything"
- "This is all part of our marketing effort"
- "They're going to start selling and generating revenue, it's a top priority"
- Studio C is actually in Bearsville at Utopia Studios
- The slant is recording industry and photography
- Tuthill Design slant is real estate, architecture, interior design services
