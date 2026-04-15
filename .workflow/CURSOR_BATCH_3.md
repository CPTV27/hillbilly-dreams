# CURSOR BATCH 3 — April 15, 2026

**Context:** Dogfood phase. We're running the system on ourselves before external sales. Copy must be honest, pricing must be current, no SaaS jargon on customer pages.

**Gate:** `pnpm --filter @bigmuddy/web exec tsc --noEmit` must pass after each task.

**Rules:**
- No hardcoded fonts — use `var(--font-body)` or `var(--font-display)`
- No hardcoded colors — use CSS custom properties
- No tech jargon on customer-facing pages
- DSD product name is "Deep South Directory" — not "MBT" or "Measurably Better Things"
- Tracy and Amy are equity partners — never employees
- "Powered by Measurably Better Things" in footers is correct

---

## Task 1: DSD Pricing Update — All Pages

Current locked pricing (do NOT change these values):

| Tier | Price | Name |
|------|-------|------|
| Free | $0 | Free |
| Essentials | $25/mo | Essentials |
| Pro | $50/mo | Pro |
| Marketing | $99/mo | Marketing |
| Engine | $250/mo | Engine |

Search the entire `apps/web/` tree for any reference to the OLD pricing ($20, $49, "The Listing", "The Works", "The Engine", "Front Porch", "Route", "River Room", "Blues Room") and update to the new tier names and prices above.

Files likely affected:
- `apps/web/app/directory/page.tsx`
- Any pricing components
- Any PDF templates referencing tiers
- Press articles mentioning pricing

```bash
grep -rn '\$20\|$49\|\$20/mo\|The Listing\|The Works\|The Engine\|Front Porch\|River Room\|Blues Room' apps/web/ --include="*.tsx" --include="*.ts" --include="*.html" -l
```

## Task 2: Directory Page Copy Rewrite

File: `apps/web/app/directory/page.tsx`

The directory page still has old SaaS/tech language. Rewrite to plain Main Street language:
- Hero should lead with the region and the value ("Get found by travelers and locals in the Deep South")
- No "platform" or "SaaS" or "AI-powered" language in hero
- "How It Works" section: 3 simple steps (Claim your listing → Add your story → Get discovered)
- Testimonials section: keep if real, remove if placeholder
- CTA: "Claim Your Free Listing" → links to `/directory/onboard`
- Pricing section: use new 5-tier table from Task 1
- Photo hero: use real Natchez photos from GCS, not stock/AI

## Task 3: Hillbilly Dreams Inc Page Rewrite

File: `apps/web/app/page.tsx` (when hostname = hillbillydreamsinc.com) OR the HDI-specific route

This page currently reads like a Google case study. Rewrite:
- Strip all Google/tech branding
- Add real photography (GCS URLs from `bmt-media-bigmuddy`)
- Voice: understated, Mississippi-rooted, not corporate
- Content: "We're a media company anchored in Natchez, Mississippi. We run shows, publish a magazine, operate a radio station, and help Main Street businesses get found."
- Link to Big Muddy properties (touring, magazine, radio, directory)
- Do NOT list legal entity names or EINs

## Task 4: Technology Page → Corridor Connection

File: find the `/technology` or `/tech` route in `apps/web/`

Currently reads like a Google sales page. Rewrite to:
- Frame as "How the corridor works" — media, hospitality, directory all connected
- Show the flywheel: Shows → Magazine → Radio → Directory → Businesses → Shows
- Use real examples: "A band plays at Biscuits & Blues. We write about it in the magazine. The radio plays their set. The directory lists the venue. Travelers find it."
- No "API" or "infrastructure" or "pipeline" language
- Photography from GCS, not diagrams

## Task 5: MBT Consumer Page Voice Fix

File: route serving `measurablybetter.life`

MBT.life is the consumer AI agent (Southern Concierge). Check the landing page for:
- Remove any B2B/operator language (that's for licensees, not consumers)
- Voice should be warm, Southern, inviting — "Your personal guide to the Deep South"
- Slider concept: $0–$99/mo (if not built yet, just describe the tiers in copy)
- CTA: Try Delta Dawn (link to chat widget)
- Footer: "Powered by Measurably Better Things" is correct here

## Task 6: Hardcoded Colors Cleanup

Search for hardcoded hex colors and RGB values in customer-facing pages:

```bash
grep -rn '#[0-9a-fA-F]\{3,6\}\|rgb(' apps/web/app/ apps/web/components/ --include="*.tsx" --include="*.ts" -l | grep -v node_modules | grep -v '.test.'
```

Replace with CSS custom properties (`var(--bg)`, `var(--surface)`, `var(--text)`, `var(--accent)`, etc.).

Focus on:
- `apps/web/app/directory/`
- `apps/web/app/gallery/`
- `apps/web/components/` (non-admin)
- Skip admin pages for now

## Task 7: Console.log Migration

Migrate remaining `console.log/warn/error` in API routes to the structured logger:

```bash
grep -rn 'console\.\(log\|warn\|error\)' apps/web/app/api/ --include="*.ts" -l
```

Import `apiLog` from `lib/api-logger.ts` and replace:
- `console.log(...)` → `apiLog.info(...)`
- `console.warn(...)` → `apiLog.warn(...)`
- `console.error(...)` → `apiLog.error(...)`

## Task 8: Admin Dashboard Mobile Fix

File: `apps/web/app/admin/` pages

The admin dashboard overflows on mobile (375px). Fix:
- Tables: add `overflow-x: auto` wrapper
- Cards: single-column layout below 640px
- Sidebar nav: collapse to hamburger or bottom nav on mobile
- Test at 375px viewport width

Priority pages: `/admin/hq`, `/admin/social`, `/admin/events`

## Task 9: 404 Page — Add Directory Search

File: `apps/web/app/not-found.tsx`

The 404 page exists but should be more useful:
- Add a search bar that searches the directory (`/api/directory/search?q=`)
- "Looking for a local business?" prompt
- Show 3 random featured businesses from the directory
- Keep the library background image from Batch 2
- Link back to homepage and directory

## Task 10: Prisma $transaction on Multi-Write Routes

Find API routes that do multiple Prisma writes without a transaction:

```bash
grep -rn 'Promise\.all\|\.create\|\.update\|\.delete' apps/web/app/api/ --include="*.ts" -l
```

For routes with 2+ write operations, wrap in `prisma.$transaction([...])` to ensure atomicity. Priority routes:
- `/api/directory/onboard`
- `/api/admin/events`
- `/api/admin/articles`
- Any route with `Promise.all` containing writes

---

## VERIFICATION

After all tasks:
```bash
pnpm --filter @bigmuddy/web exec tsc --noEmit
pnpm test:p0
```

Both must pass. Push results to `.workflow/BATCH_3_QA_RESULTS.md`.

## DO NOT TOUCH

- `outsider-economics-v2/` — live content, never delete
- `packages/database/prisma/schema.prisma` — no model changes without Chase
- `apps/web/app/api/dawn/chat/route.ts` — Delta Dawn chat, working
- `scripts/media/` — photo pipeline
- Any `.env` files
