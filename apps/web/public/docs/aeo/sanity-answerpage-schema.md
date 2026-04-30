# Sanity `answerPage` Content Type — Spec (v2)

*Spec drafted 2026-04-29. Trimmed to must-haves per Chase 2026-04-29 evening. Mirrors existing patterns in `apps/web/sanity/schemas/faq.ts` and `apps/web/sanity/schemas/article.ts`.*

## Convention notes (from existing schemas)

- All schemas use `defineField` + `defineType` from `sanity`
- Editorial body uses `array of [{type: 'block'}]` (portable text), like `article.body`
- Brand selector enum mirrors `faq.ts` brand list
- Images use `type: 'image'` with `options: { hotspot: true }`, like `article.heroImage`
- Validation pattern: `validation: (Rule) => Rule.required()`

## Must-have fields (10 only — everything else waits)

```ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'answerPage',
  title: 'Answer Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Question',
      type: 'string',
      description: 'The exact question, verbatim. Becomes the H1 and AEO target query.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'LLM-quotable paragraph. 50–80 words. Factual. Renders above the fold.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Key details',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3–5 supporting bullets.',
    }),
    defineField({
      name: 'editorial',
      title: 'Editorial expansion',
      type: 'array',
      of: [{ type: 'block' }],
      description: '150–250 words in Tracy voice.',
    }),
    defineField({
      name: 'business',
      title: 'Business',
      type: 'string',
      options: {
        list: [
          { title: 'Big Muddy', value: 'big-muddy' },
          { title: 'Studio C', value: 'studio-c' },
          { title: 'MBT', value: 'mbt' },
          { title: 'Bearsville', value: 'bearsville' },
          { title: 'Tuthill', value: 'tuthill' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Stay, Music, Venue, Touring, Natchez',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'asset', type: 'image', options: { hotspot: true } },
            {
              name: 'role',
              type: 'string',
              options: {
                list: [
                  { title: 'Hero (proof)', value: 'hero' },
                  { title: 'Context (place)', value: 'context' },
                  { title: 'Detail (texture)', value: 'detail' },
                  { title: 'Human (use)', value: 'human' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            },
            { name: 'alt', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'imageStatus',
      title: 'Image status',
      type: 'string',
      options: {
        list: [
          { title: 'Missing', value: 'missing' },
          { title: 'Partial', value: 'partial' },
          { title: 'Complete', value: 'complete' },
        ],
        layout: 'radio',
      },
      initialValue: 'missing',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citationTarget',
      title: 'Citation target',
      type: 'boolean',
      description: 'TRUE = this is a quotable AEO answer page (default). FALSE = editorial / support content. Filters the AEO measurement loop and enforces stricter answer-block rules.',
      initialValue: true,
    }),
    defineField({
      name: 'relatedAnswers',
      title: 'Related answers',
      type: 'array',
      description: 'Optional. Links to other answerPage docs for internal linking, clustering, and "next question" UX. Do not populate at initial paste — fill during the internal linking pass after first 7 are live.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'answerPage' }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', business: 'business', imageStatus: 'imageStatus' },
    prepare({ title, business, imageStatus }) {
      return {
        title,
        subtitle: `${business} · images: ${imageStatus}`,
      };
    },
  },
});
```

## What I dropped (per "everything else waits")

- `author` (use string default like `article.ts` does in render layer; or hardcode "Tracy Alderson" until needed)
- `related` (handle internal linking in the rendering layer, not the schema — pull from `business` + `category` matches)
- `orderRank`, `active` (FAQ has these; not needed for AEO since each page is its own URL)
- Custom validators on word count (handled in draft review, not schema)
- Per-page schema overrides (live in the rendering layer)

## Add to schema registry

Update `/Users/chasethis/hillbilly-dreams/apps/web/sanity/schemas/index.ts`:

```ts
import answerPage from './answerPage';

export const schemaTypes = [
  // ...existing
  answerPage,
];
```

## Rendering pattern (Next.js) — canonical order

`answerPage` = FAQ-style data + article-style presentation.

Order on the page (locked 2026-04-29):

1. **Question / title** (H1, the exact question)
2. **Answer block** — visually distinct, above the fold, large type
3. **Image placeholder OR hero image** — always render the slot, even when `imageStatus: missing` (use a styled placeholder so layout stays consistent across all pages from day 1)
4. **Details bullets** (Key details, bulleted list)
5. **Editorial body** (portable text rendering with the standard renderer used for `article.body`)
6. **Internal links** (Related — derived from `business` + `category` matches in the rendering layer)

The placeholder slot at #3 means the page renders cleanly without images. Once `imageStatus` flips to `partial` or `complete`, the slot fills with the `hero` role image. Context / detail / human images render below editorial only when present (gallery treatment, optional).

### Citation target rule (enforced when `citationTarget === true`)

The answer block must:

- Be under 80 words
- Be the first visible content (no preamble, no kicker, no image above it)
- Contain NO internal links (links live only in the Related section at the bottom)

This keeps the block cleanly extractable by LLM crawlers. If `citationTarget === false`, these constraints relax — the page renders as editorial/support content and is excluded from the AEO measurement loop.

### Visual treatment of the answer block

Make the answer block visually distinct from the rest of the page:

- Slightly larger font than body text
- Max width constraint (don't let it stretch full screen — readability + extractability)
- Subtle background tint or border to separate it from editorial body

Not for aesthetics — for extractability and consistency. Every page on the site renders this block the same way so LLM crawlers learn the pattern.

JSON-LD schema injection (rendering layer, not Sanity):
- `Article` schema with `headline`=title, `description`=answer, `datePublished`=updatedAt
- `LocalBusiness` reference for Big Muddy Inn / Studio C / etc. when `business` matches
- `FAQPage` schema on any index/collection page

## URL pattern

`/answers/{slug}` — flat namespace. Filter via `business` + `category` for collection pages.

### Slug enforcement rule

Slugs are auto-generated from the `title` field via Sanity's `source: 'title'` option. The operational rule:

**Slug must equal the normalized question. No manual edits. No variations.**

Example:
- Title: `"What is the best place to stay in Natchez for live music?"`
- Slug: `best-place-to-stay-natchez-live-music`
- URL: `/answers/best-place-to-stay-natchez-live-music`

Why this matters:
- Stable URLs (no broken citations later)
- LLM queries align with URL pattern (signal reinforcement)
- Prevents duplicate slug variants from creeping in over time

If Tracy or anyone needs to override the slug, treat it as a structural decision — not a typo fix.

## Operational rules (not enforced in code, enforced in review)

1. **No duplicate questions.** No two `citationTarget: true` pages may answer the same question with materially similar wording. LLMs pick one canonical answer per query — duplicates dilute the signal. Before publishing a new answer page, search existing pages for similar question wording.

2. **One question per page.** Don't combine multiple questions into one page (e.g., "What is X and how do I do it?"). Each LLM-asked question gets its own page.

3. **No fluff in the answer field.** "Many people ask..." / "Great question..." / "Looking for..." — strip all of it. The answer field starts with the noun phrase that answers the question.

4. **Update `updatedAt` when content changes materially.** Don't bump it for typo fixes. Do bump it when facts, structure, or related links change — signals freshness to crawlers.

## Pre-publish checklist (run for each page)

Before hitting publish in Sanity:

- [ ] `title` matches the LLM-asked question verbatim
- [ ] `answer` is under 80 words
- [ ] No internal links in the `answer` field
- [ ] `slug` is the normalized form of the title (no manual edits)
- [ ] `citationTarget: true` (unless the page is editorial/support)
- [ ] `imageStatus: missing` (or partial/complete if images backfilled)
- [ ] `business` set
- [ ] `updatedAt` set to today

That's the gate. Don't add anything else to it.

## First test

After the schema lands:
1. Verify Sanity Studio renders the new content type
2. Manually create one entry from `docs/aeo/big-muddy-pages-1-7-ready.md` page 1 to validate field shape
3. Set `imageStatus: 'missing'` (default), no images yet
4. Render the page and confirm the answer is above the fold, visually distinct
5. If working, batch-import the remaining 19 via `@sanity/client` mutations script

## Operational dashboard

GROQ for the cos-status-dashboard:

```js
*[_type == "answerPage"]{
  title,
  business,
  imageStatus,
  "url": "/answers/" + slug.current
} | order(imageStatus asc, title asc)
```

Shows: total pages live, count by image status (missing/partial/complete), backlog priority.

## Implementation owner

Chase or Patch. Estimated effort: 30–45 min including local Sanity Studio test.
