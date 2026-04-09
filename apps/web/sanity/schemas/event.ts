import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'reference',
      to: [{ type: 'location' }],
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      description: 'Artist or band name (plain text — not a Sanity reference)',
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. "$25" or "Free"',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'upcoming',
    }),
  ],
  orderings: [
    {
      title: 'Event Date',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      artist: 'artist',
      media: 'coverImage',
    },
    prepare({ title, date, artist }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date';
      return {
        title,
        subtitle: `${dateStr}${artist ? ` — ${artist}` : ''}`,
      };
    },
  },
});
