/**
 * Sanity schema — Studio C show.
 *
 * Recurring production format. Drives technical specs (frame rate, color space,
 * audio LUFS) and approval-tier defaults for episodes within the show.
 *
 * Maps to Prisma `StudioShow`. Sanity holds the human-edited content fields;
 * Prisma holds the relational/operational fields.
 *
 * Phase 1 (2026-05-01). No UI yet — schema only.
 */
import { defineField, defineType } from 'sanity';

export const studioCShow = defineType({
  name: 'studioCShow',
  title: 'Studio C — Show',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'studioCBrand' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'track',
      title: 'Production track',
      type: 'string',
      description: 'A = high-volume podcasts; B = cinematic / commercial.',
      options: {
        list: [
          { title: 'Track A — Podcast (high volume)', value: 'A' },
          { title: 'Track B — Cinematic / commercial', value: 'B' },
        ],
        layout: 'radio',
      },
      initialValue: 'A',
    }),
    defineField({
      name: 'cadence',
      title: 'Cadence',
      type: 'string',
      options: {
        list: ['weekly', 'biweekly', 'monthly', 'irregular'],
      },
      initialValue: 'weekly',
    }),
    defineField({
      name: 'primaryStudio',
      title: 'Primary studio',
      type: 'string',
      options: {
        list: [
          { title: 'Woodstock / Bearsville (BMD)', value: 'woodstock' },
          { title: 'Natchez (Sony)', value: 'natchez' },
        ],
        layout: 'radio',
      },
      initialValue: 'woodstock',
    }),
    defineField({
      name: 'approvalTier',
      title: 'Default approval tier',
      description: 'A = Chase only. B = Elijah/Miles can ship. C = automated.',
      type: 'string',
      options: {
        list: [
          { title: 'A — Chase required', value: 'A' },
          { title: 'B — Elijah / Miles can ship', value: 'B' },
          { title: 'C — Automated', value: 'C' },
        ],
        layout: 'radio',
      },
      initialValue: 'B',
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical specs',
      description: 'Frame rate, color space, audio LUFS targets, deliverable formats.',
      type: 'object',
      fields: [
        { name: 'frameRate', type: 'string', title: 'Frame rate (e.g. 23.976, 29.97)' },
        { name: 'colorSpace', type: 'string', title: 'Color space (e.g. Rec.709, BMD Film Gen 5)' },
        { name: 'audioLufs', type: 'string', title: 'Audio target LUFS' },
        { name: 'deliveryFormats', type: 'array', of: [{ type: 'string' }], title: 'Delivery formats' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'track' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `Track ${subtitle}` }),
  },
});
