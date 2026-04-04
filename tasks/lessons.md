# Lessons Learned — Read This at Session Start

Every agent reads this before starting work. Add new lessons as you learn them.

---

## Build & Deploy

- **GCS lazy-init required.** Never call `JSON.parse(credentials)` or `new Storage()` at module load. Use lazy-init functions (`getStorage()`, `getBucket()`). Module-level initialization breaks the build because credentials aren't available at build time.
- **`force-dynamic` on all API routes.** Every route that touches GCS, Prisma, or external APIs needs `export const dynamic = 'force-dynamic'` to prevent eager initialization during static generation.
- **CI passing != deployed.** Always verify the live URL after pushing. Vercel can show green checks while the deployment is still rolling out or failed silently.

## AI & Photos

- **AI default enhancement must never change people.** Only touch environment, lighting, color. Adding/removing people requires explicit user request — never by default. (Origin: Imagen 3 hallucinated extra children in a maternity session.)
- **AI photo scoring rewards tag quantity, not quality.** Top-ranked photos by tag count were "totally random photos that would most likely get deleted." Scoring needs aesthetic criteria, not just label count. Still unresolved.
- **DxO DeepPRIME over-processes.** Photos come out over-saturated with HDR look. Use lighter processing or different export presets.

## Naming & Brand

- **MBT = Measurably Better Things, never "MB."** Always MBT.
- **"Deep South Directory" on all customer-facing pages.** Never "MBT" or "Measurably Better Things" in DSD customer copy.
- **Arrie Aslin** — correct spelling. Not Arri Aslan, Ari Aslan, or Ari B. Aslan.
- **Tracy and Amy are equity partners** — never employees, never staff.

## Pricing

- **DSD pricing is NOT finalized (as of April 2026).** Leaning Free/$99/$250. Previous $20/$49/$99 tiers are superseded. Use "starting at" language everywhere. Never hardcode tier prices.

## Architecture

- **MBT and all brands are siblings under HDI** — not layers. MBT powers the others but doesn't sit above them.
- **Don't create separate MBT products.** Build for Big Muddy first, package as MBT later.
- **Green is wrong for Bearsville.** Gold (#c8943e) connects everything. Electric green (#00CC88) was merged by mistake in PR #20.

## Process

- **Stale worktrees accumulate fast.** Clean up after merging. Don't leave more than 2-3 active worktrees.
- **Memory files are machine-local** (in `~/.claude/projects/`), not in the repo. New agents can't find them by reading the repo — they need the memory system.
- **Don't over-plan sandbox/experimental work.** Just build it, put it in `/public/sandbox/`, iterate fast.
