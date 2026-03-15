# Outsider Economics Content → Website Agent Handoff

## What This Folder Is

`/Users/chasethis/bmt/outsider-economics-v2/` contains the content for Outsider Economics — a series of standalone blog posts that function as a field manual for independent economic systems. Written by Chase Tuthill Pierson.

A separate agent (Claude Code, writing agent) is actively producing content in this folder. Your job is to consume it and render it on the website.

## Folder Structure

```
outsider-economics-v2/
├── AGENT-HANDOFF.md          ← You are here
├── SERIES-OUTLINE.md         ← Full post sequence and format spec
├── twitter-hooks.md          ← Twitter teasers per post (for social integration if needed)
├── ch01-the-450000-secret.md ← Post 1 (DONE)
├── 02-the-extraction-trap.md ← Post 2 (DONE)
├── 03-*.md                   ← Post 3 (upcoming)
└── ...                       ← More posts will appear here
```

## File Naming Convention

Posts follow this pattern:
- `ch01-the-450000-secret.md` (Post 1 used `ch01-` prefix)
- `02-the-extraction-trap.md` (Post 2+ use `##-slug.md`)
- Going forward, expect `##-slug.md` format

All content is Markdown. Posts use `#` for title, `##` for sections, `---` for horizontal rules between sections, and `**bold**` for emphasis and key terms.

## Content Format Per Post

Each post is:
- 1,500–2,500 words
- Standalone (no cross-references to other posts)
- Opens with a scene or a number — never a preamble
- Ends with a **Start This Week** section containing 24-hour / 7-day / 90-day action items
- Contains its own math and receipts inline

## What You're Building

The website is at `apps/web/app/economics/` in the BMT monorepo (`/Users/chasethis/bmt/`). The existing site has:
- A homepage (`page.tsx`) with the core concepts, thesis, and trends
- A layout (`layout.tsx`) using the `economics` brand from `@bigmuddy/config`
- Empty subdirectories: `/field-manual`, `/the-math`, `/about`, `/community`
- Navigation, footer, and theming already wired via the multi-tenant system

### Your decisions to make:
1. **Where do posts live on the site?** Options: under `/field-manual` as chapters, as a `/posts` or `/dispatch` blog section, or as standalone pages. Chase's Substack is at `outsidereconomics.substack.com` — the site should complement it, not duplicate it.
2. **Rendering**: Read the markdown files from this folder and render them as styled pages matching the existing `economics` brand/theme (CSS custom properties, not Tailwind).
3. **Index page**: Build a post listing page that auto-discovers posts from this folder.

## Brand / Theme

The economics site uses CSS custom properties defined in `packages/config/tokens.css`. Key vars:
- `--bg`, `--surface`, `--surface-2` for backgrounds
- `--text`, `--text-muted`, `--text-disabled` for type
- `--accent`, `--accent-hover` for the red accent color
- `--font-display`, `--font-body`, `--font-mono` for typography
- `--border`, `--border-strong` for borders

The aesthetic is: dark background, cream/warm text, red accents. Woodcut/linocut feel. Not corporate. Not startup. Iron & Earth.

## What NOT to Do

- Don't edit the markdown files in this folder — the writing agent owns them
- Don't rewrite or summarize the content — render it as written
- Don't add "Read Chapter 1 first" or sequential navigation — these are standalone posts
- Don't add comments, reactions, or social features unless Chase asks

## Coordination

- The writing agent will keep adding new `.md` files to this folder
- Your build should pick up new posts automatically (file-system based routing or build-time discovery)
- If a file changes (the writing agent may revise), your render should reflect the update

## Twitter Hooks

`twitter-hooks.md` contains 2-3 tweet options per post. If you're building any social/sharing integration, these are the pre-written hooks. Otherwise ignore this file.
