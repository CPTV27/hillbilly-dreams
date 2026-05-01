/**
 * Sanity schema — Studio C episode.
 *
 * Individual episode within a recurring show. Sanity holds prep notes, guest
 * list, and shoot plan. Prisma `StudioEpisode` holds the operational state.
 *
 * Phase 1 (2026-05-01). No UI yet — schema only.
 */
import { defineField, defineType } from 'sanity';

export const studioCEpisode = defineType({
  name: 'studioCEpisode',
  title: 'Studio C — Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'show',
      title: 'Show',
      type: 'reference',
      to: [{ type: 'studioCShow' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode number',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
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
      options: { source: 'title', maxLength: 80 },
    }),
    defineField({
      name: 'shootDate',
      title: 'Planned shoot date',
      type: 'datetime',
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      description: 'List of guests appearing in this episode. Used for rights tracking + show notes.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Guest name' },
            { name: 'role', type: 'string', title: 'Role / billing (host, co-host, guest, etc.)' },
            { name: 'email', type: 'string', title: 'Email' },
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        },
      ],
    }),
    defineField({
      name: 'prepNotes',
      title: 'Prep notes',
      description: 'Topic, talking points, stage directions, anything the team needs before the shoot.',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'sponsorReads',
      title: 'Sponsor reads',
      description: 'Scripts for any sponsor reads in this episode.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'sponsor', type: 'string', title: 'Sponsor' },
            { name: 'script', type: 'text', rows: 4, title: 'Read script' },
            { name: 'placement', type: 'string', title: 'Placement (pre-roll, mid-roll, post-roll)' },
          ],
          preview: { select: { title: 'sponsor', subtitle: 'placement' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', episodeNumber: 'episodeNumber', show: 'show.title' },
    prepare: ({ title, episodeNumber, show }) => ({
      title: `${show ?? '—'} · Ep ${episodeNumber}`,
      subtitle: title,
    }),
  },
});
