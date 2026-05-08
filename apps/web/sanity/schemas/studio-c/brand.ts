/**
 * Sanity schema — Studio C brand.
 *
 * Maps to existing Prisma `Brand` model. The Brand is the operating identity
 * the production work is FOR. e.g., "Big Muddy Inn" is a brand under the
 * MBT client.
 *
 * Phase 1 (2026-05-01). No UI yet — schema only.
 */
import { defineField, defineType } from 'sanity';

export const studioCBrand = defineType({
  name: 'studioCBrand',
  title: 'Studio C — Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Owning client',
      type: 'reference',
      to: [{ type: 'studioCClient' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brandKit',
      title: 'Brand kit',
      description: 'The machine-readable kit driving NLE templates, social templates, and chat voice routing.',
      type: 'reference',
      to: [{ type: 'studioCBrandKit' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'client.name' },
  },
});
