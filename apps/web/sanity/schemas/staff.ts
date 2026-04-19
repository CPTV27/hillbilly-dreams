import { defineField, defineType } from 'sanity';

// Sanity schema for `staff` — team member profiles. Referenced by Article
// bylines, About pages, credits sections. Chase, Tracy, Amy + equity partners,
// Studio C team, future hires.

export default defineType({
  name: 'staff',
  title: 'Staff / Team member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
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
      name: 'role',
      title: 'Role / title',
      type: 'string',
      description: 'e.g., "Innkeeper · MBT Executive · Magazine Editor"',
    }),
    defineField({
      name: 'equityStatus',
      title: 'Equity status',
      type: 'string',
      options: {
        list: [
          { title: 'Equity partner', value: 'equity_partner' },
          { title: 'Team member (LLC)', value: 'team_member' },
          { title: 'Contractor', value: 'contractor' },
          { title: 'Agent / tenant', value: 'agent' },
        ],
      },
    }),
    defineField({
      name: 'brands',
      title: 'Associated brands',
      type: 'array',
      of: [{ type: 'string' }],
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
        ],
      },
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
      title: 'Short bio (one-liner for bylines)',
      type: 'string',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'email',
      title: 'Public email',
      type: 'string',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'url', type: 'url' }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Inactive staff hidden from bylines + About pages.',
    }),
  ],
  preview: {
    select: { title: 'name', role: 'role', media: 'photo' },
    prepare({ title, role, media }) {
      return { title, subtitle: role, media };
    },
  },
});
