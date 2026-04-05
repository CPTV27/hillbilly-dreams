# CURSOR FINAL SPRINT — April 6-10 (Code Freeze)

**Tracy and Amy are testing TODAY. Everything must work. No excuses.**

**Gates on every commit:** `pnpm exec tsc --noEmit -p apps/web` + `pnpm test:p0`

---

## P0 — FIX TODAY (Tracy and Amy will hit these)

### 1. Delta Dawn widget — test every page
Tracy and Amy will tap the DD button on every page. Make sure:
- [ ] Widget renders on `/directory` (DSD theme)
- [ ] Widget renders on `/inn/tv` (doesn't block TV content)
- [ ] Widget renders on `/explorer` (doesn't interfere with D3 zoom)
- [ ] Widget renders on `/magazine` routes
- [ ] Widget renders on `/admin/*` routes
- [ ] localStorage persists between page navigations
- [ ] Streaming works (text appears word by word, not all at once)
- [ ] Error state shows helpful message if API fails
- [ ] Mobile: widget opens and closes cleanly on 375px
- [ ] Mobile: keyboard doesn't push widget off screen

### 2. Tracy's page — every link must work
- [ ] `deepsouthdirectory.com/tracy.html` — hero slides auto-advance
- [ ] All 4 action card links resolve (magazine, gallery, marketing kit, Delta Dawn)
- [ ] Gallery strip scrolls horizontally
- [ ] Bearsville photo grid loads all 8 images
- [ ] Magazine section links work (bigmuddymagazine.com, print ad, Bon Appetit, NYT Amy)
- [ ] Platform tiles all link to correct pages
- [ ] Stats render correctly ($160K, $167, $9.33, 14, 17956, 27, $1B+)
- [ ] Mobile responsive at 375px — nothing overflows

### 3. Amy's page — every element must work
- [ ] `deepsouthdirectory.com/amy.html` — particles animate
- [ ] Cosmic gradient shifts colors
- [ ] Flywheel rotates with 8 nodes
- [ ] Brand cards load photos and link correctly
- [ ] Bar section image loads
- [ ] Action cards link to correct pages
- [ ] Delta Dawn section links to the right URL
- [ ] Mobile responsive at 375px

### 4. Press articles — all 14 must load with images
- [ ] Run: `bash scripts/health-check.sh` — all endpoints return 200
- [ ] Open each article — hero images load (not broken)
- [ ] Internal-only banners present on all 14
- [ ] No broken images (check processed/slideshow paths are deployed)

### 5. Inn TV — must look perfect on a big screen
- [ ] `/inn/tv` — all 6 channels render
- [ ] Auto-cycle starts after 30 seconds
- [ ] Big Muddy TV spots cycle every 8 seconds
- [ ] Local Picks cycle every 10 seconds
- [ ] Radio visualizer animates
- [ ] Welcome screen shows WiFi, phone, radio
- [ ] Gold AUTO indicator shows when cycling

### 6. Spatial Explorer — must work on iPad
- [ ] `/explorer` — 10 nodes render with photos
- [ ] Flywheel edges animate (gold dashed lines)
- [ ] Pinch-to-zoom works (iPad Safari specifically)
- [ ] Tap a node — nothing crashes
- [ ] Photos load from correct paths (verify all 10 image files exist)
- [ ] Dark background, gold accents consistent

---

## P1 — SHIP BY WEDNESDAY (Before Freeze)

### 7. Marketing kit — copy buttons
- [ ] `/sandbox/inn-marketing-kit.html` — all content sections render
- [ ] Copy buttons actually copy to clipboard (test on Safari + Chrome)
- [ ] Mobile: sections don't overflow at 375px

### 8. Gallery — print sales flow
- [ ] `/gallery` — photos load
- [ ] "Buy Print" buttons exist (even if Stripe not wired yet)
- [ ] Gallery page looks professional, not placeholder
- [ ] Mobile responsive

### 9. DSD homepage — walk-in ready
- [ ] `/directory` — hero image loads
- [ ] Pricing tiers show Free/$25/$50/$99/$250
- [ ] Testimonials render
- [ ] Category images load
- [ ] "How It Works" section renders
- [ ] CTA buttons link to `/directory/onboard`
- [ ] Mobile: everything looks good at 375px

### 10. Onboarding flow
- [ ] `/directory/onboard` — form loads
- [ ] Tier selector works (free/essentials/pro/marketing/engine)
- [ ] Submit creates a DirectoryBusiness record
- [ ] Success screen shows confirmation
- [ ] Mobile friendly

### 11. Admin dashboard
- [ ] `/admin/hq` — loads without error (requires auth)
- [ ] Revenue numbers display
- [ ] System health card shows
- [ ] Sidebar navigation works (HQ, Report Card, Revenue, Churn, Social)
- [ ] Mobile: single column at 375px

### 12. Social command center
- [ ] `/admin/social` — loads
- [ ] "Connect Facebook Page" button visible
- [ ] Quick Post textarea works
- [ ] Character count displays
- [ ] Publish button enabled when text entered

---

## P2 — POLISH BEFORE FREEZE

### 13. Dependabot PR triage
- [ ] Merge safe patches: `@types/node`, `sharp`, `turbo`, `framer-motion`
- [ ] Close risky: `next` major bump (15.x)
- [ ] Comment "deferring until after freeze" on closed PRs

### 14. Stale branch cleanup
- [ ] Check each: `feat/dsd-copy-rewrite`, `feat/native-social-publisher`, `dev/cms-editor`, `feat/admin-master-roadmap`
- [ ] If changes are on main → delete remote branch
- [ ] If unique work → leave for now

### 15. Console.log cleanup
- [ ] `grep -r "console\.\(log\|warn\|error\)" apps/web/app/api/ --include="*.ts" -l`
- [ ] Migrate remaining to `apiLog` from `lib/api-logger.ts`

### 16. $transaction on multi-write routes
- [ ] `grep -r "Promise\.all" apps/web/app/api/ --include="*.ts" -l`
- [ ] Wrap in `prisma.$transaction` where multiple writes occur

---

## VERIFICATION CHECKLIST (Run Before Every Push)

```bash
# Type check
pnpm exec tsc --noEmit -p apps/web

# Tests
pnpm test:p0

# Health check
bash scripts/health-check.sh

# Delta Dawn test
curl -s -X POST "https://deepsouthdirectory.com/api/dawn/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What is DSD pricing?"}]}' \
  --max-time 15 | head -3
```

All four must pass. No exceptions.

---

## RULES

- Tracy and Amy are testing TODAY. Every bug they find is a P0.
- Code freeze is April 10. After that, bug fixes only.
- Don't touch `outsider-economics-v2/` content
- Don't rename Prisma models
- Don't run `db push` without Chase
- Static HTML pages (tracy.html, amy.html, press/*.html) — verify image paths exist before editing
- The DD widget is on every page now — test it everywhere, don't break it
- If Delta Dawn stops talking, check GEMINI_API_KEY in Vercel first

## WHEN DONE

Run the full verification checklist. Push results to `.workflow/FINAL_QA_RESULTS.md`. Update this file with [x] for completed items.
