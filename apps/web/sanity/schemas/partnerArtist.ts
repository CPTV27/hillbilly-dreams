import { defineField, defineType } from 'sanity';

// Sanity schema for `partnerArtist` — artists on the Big Muddy Records label
// (Silver / Gold / Platinum tier). Separate from `staff` because artists are
// external collaborators, not internal team. Referenced by Records pages,
// Touring show lineups, Radio episode bylines.

export default defineType({
  name: 'partnerArtist',
  title: 'Partner Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Records tier',
      type: 'string',
      options: {
        list: [
          { title: 'Silver — $50-100/mo', value: 'silver' },
          { title: 'Gold — $200-400/mo', value: 'gold' },
          { title: 'Platinum — $750-1500/mo', value: 'platinum' },
          { title: 'Catalog only (Amy, Mechanical Bull)', value: 'catalog' },
          { title: 'Non-exclusive promotion partnership', value: 'promo_partner' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Former', value: 'former' },
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'shortBio',
      title: 'Short bio (one-liner)',
      type: 'string',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'genre',
      title: 'Genre / scene',
      type: 'string',
    }),
    defineField({
      name: 'homeBase',
      title: 'Home base',
      type: 'string',
    }),
    defineField({
      name: 'releases',
      title: 'Releases',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'release',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'kind', type: 'string', options: { list: ['single', 'ep', 'album', 'live'] } }),
            defineField({ name: 'releasedAt', type: 'date' }),
            defineField({ name: 'artwork', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'streamingUrls', type: 'array', of: [{ type: 'url' }] }),
          ],
          preview: { select: { title: 'title', subtitle: 'releasedAt' } },
        },
      ],
    }),
    defineField({
      name: 'links',
      title: 'Links (website, socials, bandcamp)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'url', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'subscriptionId',
      title: 'Subscription ID (Postgres)',
      type: 'string',
      description: 'Links to the recurring label-services Subscription row.',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'name', tier: 'tier', media: 'photo' },
    prepare({ title, tier, media }) {
      return { title, subtitle: tier ?? '—', media };
    },
  },
});
