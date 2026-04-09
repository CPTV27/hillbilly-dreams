import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Article',
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
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Big Muddy Magazine',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'City Guide', value: 'city-guide' },
          { title: 'Feature', value: 'feature' },
          { title: 'Photo Essay', value: 'photo-essay' },
          { title: 'Interview', value: 'interview' },
          { title: 'Food & Drink', value: 'food-drink' },
          { title: 'Music', value: 'music' },
        ],
      },
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      options: {
        list: [
          { title: 'Memphis', value: 'memphis' },
          { title: 'Clarksdale', value: 'clarksdale' },
          { title: 'Natchez', value: 'natchez' },
          { title: 'New Orleans', value: 'new-orleans' },
          { title: 'Vicksburg', value: 'vicksburg' },
          { title: 'Greenville', value: 'greenville' },
          { title: 'Indianola', value: 'indianola' },
          { title: 'Oxford', value: 'oxford' },
          { title: 'Tupelo', value: 'tupelo' },
          { title: 'Helena', value: 'helena' },
          { title: 'Tunica', value: 'tunica' },
          { title: 'Jackson', value: 'jackson' },
          { title: 'Yazoo City', value: 'yazoo-city' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero Image URL (GCS legacy)',
      type: 'url',
      description: 'For articles migrated from GCS. Use heroImage field for new articles.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "5 min read"',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'credit',
              type: 'string',
              title: 'Credit',
            },
          ],
        },
        {
          name: 'pullQuote',
          type: 'object',
          title: 'Pull Quote',
          fields: [
            { name: 'text', type: 'text', title: 'Quote Text' },
            { name: 'attribution', type: 'string', title: 'Attribution' },
          ],
        },
        {
          name: 'photoGallery',
          type: 'object',
          title: 'Photo Gallery',
          fields: [
            { name: 'title', type: 'string', title: 'Gallery Title' },
            {
              name: 'images',
              type: 'array',
              title: 'Images',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    { name: 'caption', type: 'string', title: 'Caption' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'heroImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
