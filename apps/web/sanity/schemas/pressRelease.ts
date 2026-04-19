import { defineField, defineType } from 'sanity';

// Sanity schema for `pressRelease` — official MBT announcements. Follows the
// AP-style template in docs/marketing-copy/press-release-template.md.
// Chase + Tracy draft; the wizard can generate drafts via
// /admin/create/pitch-deck-section with pressRelease type override.

export default defineType({
  name: 'pressRelease',
  title: 'Press Release',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: '8-12 words. No marketing fluff.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'headline', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateline',
      title: 'Dateline',
      type: 'string',
      description: 'e.g., "NATCHEZ, MS — April 19, 2026"',
    }),
    defineField({
      name: 'lede',
      title: 'Lede (first paragraph — the 5 W\'s)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(50),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'boilerplate',
      title: 'About boilerplate',
      type: 'text',
      rows: 4,
      description: '"About MBT" section at the bottom.',
    }),
    defineField({
      name: 'mediaContact',
      title: 'Media contact',
      type: 'object',
      fields: [
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'email', type: 'string' }),
        defineField({ name: 'phone', type: 'string' }),
      ],
    }),
    defineField({
      name: 'relatedAssets',
      title: 'Related media / downloads',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }, { type: 'file' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish at',
      type: 'datetime',
    }),
    defineField({
      name: 'distributedTo',
      title: 'Distributed to',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Mississippi Press Association', value: 'mpa' },
          { title: 'Natchez Democrat', value: 'natchez_democrat' },
          { title: 'Hudson Valley Magazine', value: 'hv_mag' },
          { title: 'Billboard / music trade', value: 'music_trade' },
          { title: 'Real estate trade', value: 're_trade' },
          { title: 'Internal only', value: 'internal' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'headline', publishedAt: 'publishedAt' },
    prepare({ title, publishedAt }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : 'Draft',
      };
    },
  },
});
