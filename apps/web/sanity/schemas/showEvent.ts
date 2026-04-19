import { defineField, defineType } from 'sanity';

// Sanity schema for `showEvent` — a Blues Room show at Big Muddy Inn.
// Public-facing (renders on /shows). Distinct from the Prisma Resource
// model (which holds ticket inventory + capacity). The Sanity doc holds
// the editorial layer: artist bio, set preview, photos, post-show recap.

export default defineType({
  name: 'showEvent',
  title: 'Show — Blues Room',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Show title',
      type: 'string',
      description: 'e.g., "The Tracy Lake Trio — Live at the Blues Room"',
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
      name: 'startsAt',
      title: 'Show starts',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endsAt',
      title: 'Show ends (estimated)',
      type: 'datetime',
    }),
    defineField({
      name: 'resourceId',
      title: 'Resource ID (Postgres)',
      type: 'string',
      description:
        'Links to the ticket-inventory Resource row in Postgres. Set after the Resource is created via /admin/booking.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'blurb',
      title: 'Short blurb (listing + social)',
      type: 'text',
      rows: 3,
      description: 'Under 200 chars. Appears on /shows and in sharing cards.',
      validation: (Rule) => Rule.max(250),
    }),
    defineField({
      name: 'artistBio',
      title: 'Artist bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'setPreview',
      title: 'Set preview / what to expect',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'recap',
      title: 'Post-show recap',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Filled in after the show. Drives replay/archive pages.',
    }),
    defineField({
      name: 'priceCents',
      title: 'Ticket price (cents)',
      type: 'number',
      description: 'Display only — canonical price lives on the Resource row.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Sold out', value: 'sold_out' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'upcoming',
    }),
  ],
  preview: {
    select: { title: 'title', startsAt: 'startsAt', media: 'coverImage' },
    prepare({ title, startsAt, media }) {
      return {
        title: title ?? 'Untitled show',
        subtitle: startsAt ? new Date(startsAt).toLocaleString() : 'TBD',
        media,
      };
    },
  },
});
