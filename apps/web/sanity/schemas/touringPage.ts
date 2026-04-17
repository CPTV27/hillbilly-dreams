import { defineField, defineType } from 'sanity';

/**
 * Singleton document for the Big Muddy Touring homepage.
 *
 * Only ONE `touringPage` document should ever exist, with the
 * fixed id `touringPage-singleton`. Seed/update via
 * `scripts/seed-touring-page.ts`. The Sanity Studio structure
 * (see `sanity.config.ts`) exposes this as a single editable doc
 * in the nav — it does not show a "New touringPage" button.
 */
// NOTE: create/delete blocking for singletons is enforced via the Studio
// `document.actions` filter in `sanity.config.ts` (not via the removed
// `__experimental_actions` schema field, which is no longer in the Sanity types).
export default defineType({
  name: 'touringPage',
  title: 'Touring Page',
  type: 'document',
  fields: [
    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          description: 'Small uppercase label above the headline (e.g. "Big Muddy Touring").',
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'The big H1. Use a vertical bar (|) to force a line break.',
        }),
        defineField({
          name: 'subhead',
          title: 'Subhead',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'primaryCta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Href', type: 'string' }),
          ],
        }),
      ],
    }),

    // ── CAPABILITY CARDS (6) ──────────────────────────────────────────────────
    defineField({
      name: 'capabilityCards',
      title: 'Capability Cards',
      type: 'array',
      description: 'The numbered "What we do" grid. Typically 6 cards.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Number (e.g. 01)', type: 'string' }),
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'string' }),
            defineField({ name: 'proof', title: 'Proof line', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'num', media: 'image' },
          },
        },
      ],
    }),

    // ── LOOP SECTION ──────────────────────────────────────────────────────────
    defineField({
      name: 'loopSection',
      title: 'Loop Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'subhead', title: 'Subhead', type: 'text', rows: 2 }),
        defineField({
          name: 'cities',
          title: 'Corridor Cities',
          type: 'array',
          description: 'Ordered north to south. Format: "City, ST" or "City, ST *" (asterisk marks the anchor city).',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'partnerNote', title: 'Partner Note', type: 'text', rows: 3 }),
      ],
    }),

    // ── HOUSE BAND ────────────────────────────────────────────────────────────
    defineField({
      name: 'houseBandSection',
      title: 'House Band Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', title: 'Headline', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
        defineField({ name: 'closer', title: 'Italic closer', type: 'string' }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    // ── SESSIONS ──────────────────────────────────────────────────────────────
    defineField({
      name: 'sessions',
      title: 'Recent Sessions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
            defineField({ name: 'note', title: 'Note (italic gold line)', type: 'string' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description', media: 'image' } },
        },
      ],
    }),

    // ── THREE DOORS OUT ───────────────────────────────────────────────────────
    defineField({
      name: 'threeDoorsOut',
      title: 'Three Doors Out',
      type: 'object',
      fields: [
        defineField({
          name: 'bands',
          title: 'For Bands',
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'headline', title: 'Headline', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
            defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'venues',
          title: 'For Venues',
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'headline', title: 'Headline', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
            defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'fans',
          title: 'For Fans',
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'headline', title: 'Headline', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'href', title: 'Href', type: 'string' }),
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // ── FOOTER ────────────────────────────────────────────────────────────────
    defineField({
      name: 'footerLine',
      title: 'Footer Line',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Touring Page' };
    },
  },
});
