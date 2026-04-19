import { defineField, defineType } from 'sanity';

// Sanity schema for `pageContent` — editable marketing content for any
// public page (/pricing, /shows, /private-events, /account/subscriptions,
// /checkout/*, brand homepages). Tracy edits in Studio → live site
// updates via webhook within seconds (or 5 min via cache TTL).
//
// One doc per (slug, brand) combo. `brand` optional — null = global default.
//
// Pages call `lib/page-content.ts` getPageContent(slug, brand) and
// fall back to their hardcoded copy if the Sanity doc is missing.

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (for Studio navigation)',
      type: 'string',
      description: 'e.g., "Pricing — Big Muddy Records"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page slug',
      type: 'string',
      description:
        'Matches the URL path (no leading slash). e.g., "pricing", "shows", "private-events", "home".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand (optional)',
      type: 'string',
      description:
        'Leave blank for global / default content. Set to match a specific brand to override per-brand.',
      options: {
        list: [
          { title: '(Global default)', value: '' },
          { title: 'Inn', value: 'inn' },
          { title: 'Magazine', value: 'magazine' },
          { title: 'Touring', value: 'touring' },
          { title: 'Records', value: 'records' },
          { title: 'Radio', value: 'radio' },
          { title: 'Chase Pierson Photography', value: 'cpp' },
          { title: 'Tuthill Design', value: 'tuthill' },
          { title: 'Studio C', value: 'studio-c' },
          { title: 'Deep South Directory', value: 'dsd' },
          { title: 'MBT (platform)', value: 'mbt' },
        ],
      },
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero — small text above headline',
      type: 'string',
      description: 'Tiny uppercase text above the big headline. Optional.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — headline',
      type: 'string',
      description: 'Big bold headline at top of page.',
    }),
    defineField({
      name: 'heroSub',
      title: 'Hero — subhead',
      type: 'text',
      rows: 3,
      description: 'One or two sentences below the headline.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero — background/top image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero — CTA button text',
      type: 'string',
      description: 'Optional. Leave blank if no button.',
    }),
    defineField({
      name: 'heroCtaHref',
      title: 'Hero — CTA button link',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Content sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              title: 'Section body',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Rich text with links + inline images.',
            }),
            defineField({
              name: 'image',
              title: 'Section image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA label',
              type: 'string',
            }),
            defineField({
              name: 'ctaHref',
              title: 'CTA link',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer fine-print',
      type: 'text',
      rows: 2,
      description: 'Small text at the bottom of the page.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO — Open Graph title',
      type: 'string',
      description: 'Appears in search results + social share cards.',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 chars for best rendering.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO — meta description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(165).warning('Keep under 165 chars.'),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'When off, page falls back to hardcoded defaults.',
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug', brand: 'brand', media: 'heroImage' },
    prepare({ title, slug, brand, media }) {
      return {
        title: title ?? 'Untitled page',
        subtitle: `/${slug}${brand ? ` · ${brand}` : ''}`,
        media,
      };
    },
  },
});
