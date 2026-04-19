import { defineField, defineType } from 'sanity';

// Sanity schema for `faq` — reusable FAQ entries. Pages pull these
// by brand + topic. Generated from docs/customer-faqs/ as the starter
// set. Tracy maintains going forward.

export default defineType({
  name: 'faq',
  title: 'FAQ entry',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: [
          { title: 'Inn', value: 'inn' },
          { title: 'Magazine', value: 'magazine' },
          { title: 'Touring', value: 'touring' },
          { title: 'Records', value: 'records' },
          { title: 'Radio', value: 'radio' },
          { title: 'Chase Pierson Photography', value: 'cpp' },
          { title: 'Tuthill Design', value: 'tuthill' },
          { title: 'Studio C', value: 'studio-c' },
          { title: 'Deep South Directory', value: 'dsd' },
          { title: 'MBT (platform)', value: 'mbt' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Groups FAQs on the page (e.g., "Booking", "Pricing", "Cancellation").',
    }),
    defineField({
      name: 'orderRank',
      title: 'Display order rank',
      type: 'number',
      description: 'Lower = shown first within the category.',
      initialValue: 100,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'question', brand: 'brand', category: 'category' },
    prepare({ title, brand, category }) {
      return {
        title,
        subtitle: `${brand ?? '—'}${category ? ` · ${category}` : ''}`,
      };
    },
  },
});
