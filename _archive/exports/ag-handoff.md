# Antigravity — Handoff & Current State
> Written by CC (Claude Code) on 2026-03-21. Read this before doing any work.

## You Are AG. Your Job Is Frontend & Visual.
CC does backend, data, deployment. AG does React pages, CSS, visual design in Cursor.
Never touch: schema.prisma, API routes, middleware.ts, Firebase config, or git push.

## Where Things Left Off

### DONE (by CC + AG last session)
- ✅ Hillbilly Dreams (`hillbillydreamsinc.com → /hillbilly`) — full page built and deployed
- ✅ BuyCurious Art gallery — dual-mode theme (museum clean / funky), wall art images, apply form
- ✅ Artist application backend — form saves to DB, ops dashboard to review/approve/reject
- ✅ Gallery ops pages — `/ops/gallery` dashboard + `/ops/gallery/[id]` review detail
- ✅ Multi-project identity — `.agents/context.md` files, `chase-ctx` CLI, shell auto-switch

### OPEN BLOCKER (NOT a code issue — needs DNS/Cloudflare action by Chase)
- ❌ `buycurious.art` — **525 SSL Handshake Failed** (Cloudflare can't reach Firebase origin over SSL)
  - This is a Cloudflare SSL mode config issue, NOT a code problem
  - Fix: Chase needs to set SSL mode to "Full" in Cloudflare for buycurious.art
  - Until this is fixed, the gallery is unreachable at buycurious.art (works fine at bigmuddytouring.com/gallery)
- ⏳ `hillbillydreamsinc.com` — DNS CNAME not yet added by Chase
  - Add: `hillbillydreamsinc.com` CNAME → `bmt--bigmuddy-ff651.us-east4.hosted.app` (gray cloud / DNS only)
  - Then add custom domain in Firebase Console → App Hosting → bmt backend

### AG PICKUP ITEMS (visual/frontend work)

**Priority 1 — Gallery copy & messaging**
The gallery pages need the BuyCurious Art brand voice applied:
- `/gallery` hero: add "no gatekeepers" / "art where people actually live" messaging
- `/gallery/apply` page: prominently feature "70-80% revenue share vs. gallery's 50%" — this is the key differentiator
- `/gallery/about`: punch up the copy to match "punk-chic meets Sotheby's" aesthetic

**Priority 2 — Brand themes for other properties**
These routes exist but have no distinct visual identity:
- `.theme-radio` — Big Muddy Radio (bigmuddyradio.com → /radio)
- `.theme-magazine` — Big Muddy Magazine (bigmuddymagazine.com → /magazine)
- `.theme-records` — Big Muddy Records (bigmuddyrecords.net → /records)
Each should have its own color tokens in `packages/config/tokens.css` (follow the pattern of `.theme-gallery`, `.theme-hillbilly`).

**Priority 3 — Gallery hydration warning**
`GalleryNav.tsx` has a hydration warning from a `<style>` tag rendered in client component.
File: `apps/web/app/gallery/GalleryNav.tsx`
Fix: move inline styles to a CSS class or use `suppressHydrationWarning` appropriately.

**Priority 4 — Mobile responsive tuning on gallery**
The gallery funky mode needs responsive polish on mobile. The masonry grid doesn't collapse cleanly below 768px.

## Repo Quick Reference
```
apps/web/app/
  gallery/           ← BuyCurious Art public pages
    page.tsx         ← Landing (dual-mode theme)
    GalleryNav.tsx   ← Nav (has hydration warning)
    about/page.tsx   ← Mission + ecosystem
    apply/page.tsx   ← Artist application form
    artists/         ← Directory + [slug] profiles
    work/[slug]/     ← Artwork detail
  hillbilly/page.tsx ← Hillbilly Dreams landing
  (ops)/ops/gallery/ ← Admin: application dashboard + review
packages/config/
  tokens.css         ← Design tokens — add new themes here
  brands.ts          ← Brand config (don't modify domains or routing)
```

## Rules
- Read `AGENT_LEDGER.md` before starting
- Write to `AGENT_LEDGER.md` after completing — format: `## [date time] — AG — COMPLETE`
- Never push to git — CC handles all commits and deployments
- If you need a new API route or DB model, write a spec for CC in the ledger, don't build it yourself
- Use existing design tokens (`--accent`, `--bg`, `--surface`, etc.) — don't hardcode hex values
- Follow BEM naming for new CSS classes (`component__element--modifier`)
