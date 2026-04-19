import { defineField, defineType } from 'sanity';

// Sanity schema for `magazineIssue` — groups articles into a quarterly
// Big Muddy Magazine issue. Tracy uses this to organize the Inn-targeted
// Magazine. Referenced by article.ts via its "issue" field (follow-up).

export default defineType({
  name: 'magazineIssue',
  title: 'Magazine Issue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Spring 2026" or "Issue 1".',
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
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'deck',
      title: 'Deck',
      type: 'text',
      rows: 3,
      description: 'Short description shown on the issue landing page.',
    }),
    defineField({
      name: 'coverStory',
      title: 'Cover story',
      type: 'reference',
      to: [{ type: 'article' }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'shortForms',
      title: 'Short forms (departments, quick reads)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'letterFromEditor',
      title: "Letter from the editor",
      type: 'array',
      of: [{ type: 'block' }],
      description: "Tracy's opening note for the issue.",
    }),
    defineField({
      name: 'contributorCredits',
      title: 'Contributor credits',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'credit',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'bio', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', publishedAt: 'publishedAt', media: 'coverImage' },
    prepare({ title, publishedAt, media }) {
      return {
        title: title ?? 'Untitled issue',
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft',
        media,
      };
    },
  },
});
