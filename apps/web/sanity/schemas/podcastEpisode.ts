import { defineField, defineType } from 'sanity';

// Sanity schema for `podcastEpisode` — the editorial face of a Big Muddy Radio
// podcast episode. Audio-side fields (duration, size, audioUrl) live in
// Postgres (PodcastEpisode model); this is what Tracy/Amy edit in Studio.

export default defineType({
  name: 'podcastEpisode',
  title: 'Podcast Episode',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showId',
      title: 'Show ID',
      type: 'string',
      description:
        'The PodcastShow id this episode belongs to (Postgres). Connects to the show in /admin/podcast.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode number',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'seasonNumber',
      title: 'Season number',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 6,
      description: 'Shown in podcast apps (Spotify, Apple, YouTube Music). First 200 chars matter most.',
      validation: (Rule) => Rule.required().min(50),
    }),
    defineField({
      name: 'showNotes',
      title: 'Show notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'guest',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'bio', type: 'text', rows: 3 }),
            defineField({ name: 'link', type: 'url' }),
          ],
          preview: { select: { title: 'name' } },
        },
      ],
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'text',
      rows: 20,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'wizardMeta',
      title: 'Wizard metadata (read-only)',
      type: 'object',
      readOnly: true,
      fields: [
        defineField({ name: 'topic', type: 'string' }),
        defineField({ name: 'aiModel', type: 'string' }),
        defineField({ name: 'tokensUsed', type: 'number' }),
        defineField({ name: 'generatedAt', type: 'datetime' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', episodeNumber: 'episodeNumber', publishedAt: 'publishedAt' },
    prepare({ title, episodeNumber, publishedAt }) {
      const numLabel = episodeNumber ? `#${episodeNumber}` : '';
      const dateLabel = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unpublished';
      return { title: title ?? 'Untitled', subtitle: `${numLabel} · ${dateLabel}` };
    },
  },
});
