import { defineField, defineType } from 'sanity';

// Sanity schema for the MBT Content Creation Wizard's per-content-type
// templates. Tracy edits these in Studio without a code deploy.
//
// Templates are loaded by @bigmuddy/content-creation/templates.ts at runtime
// (cached 5 min). Falls back to hardcoded defaults if Sanity is unreachable.

export default defineType({
  name: 'contentTemplate',
  title: 'Content Template',
  type: 'document',
  fields: [
    defineField({
      name: 'contentType',
      title: 'Content type',
      type: 'string',
      options: {
        list: [
          { title: 'Magazine article', value: 'magazine-article' },
          { title: 'Social post', value: 'social-post' },
          { title: 'Listing description', value: 'listing-description' },
          { title: 'Episode description', value: 'episode-description' },
          { title: 'Pitch deck section', value: 'pitch-deck-section' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      description:
        'Pick the brand voice this template enforces. Magazine and Radio templates target different audiences — never mix.',
      options: {
        list: [
          { title: 'Big Muddy Inn', value: 'inn' },
          { title: 'Big Muddy Magazine (Inn-targeted)', value: 'magazine' },
          { title: 'Big Muddy Touring', value: 'touring' },
          { title: 'Big Muddy Records', value: 'records' },
          { title: 'Big Muddy Radio (music-first)', value: 'radio' },
          { title: 'Chase Pierson Photography', value: 'cpp' },
          { title: 'Tuthill Design', value: 'tuthill' },
          { title: 'Studio C', value: 'studio-c' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audienceProfile',
      title: 'Audience profile',
      type: 'text',
      rows: 3,
      description: 'One paragraph: who reads this, what they want.',
      validation: (Rule) => Rule.required().min(40),
    }),
    defineField({
      name: 'voiceRules',
      title: 'Voice rules',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-list rules the wizard enforces (e.g., "Sensory specifics over generic adjectives").',
    }),
    defineField({
      name: 'requiredSections',
      title: 'Required sections',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Every generated draft must include these (e.g., "opening hook", "CTA").',
    }),
    defineField({
      name: 'lengthMin',
      title: 'Length target — min (words)',
      type: 'number',
      validation: (Rule) => Rule.required().min(20),
    }),
    defineField({
      name: 'lengthMax',
      title: 'Length target — max (words)',
      type: 'number',
      validation: (Rule) => Rule.required().min(50),
    }),
    defineField({
      name: 'forbiddenPhrases',
      title: 'Forbidden phrases',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Regex-blocked at output time. Lowercase exact strings (e.g., "must-visit destination").',
    }),
    defineField({
      name: 'systemPrompt',
      title: 'System prompt (overrides generated)',
      type: 'text',
      rows: 12,
      description:
        'OPTIONAL. If set, the wizard uses this verbatim instead of assembling from voice + audience + rules. Leave blank for default behavior.',
    }),
    defineField({
      name: 'exampleDrafts',
      title: 'Few-shot example drafts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      description: '2-3 reference drafts the wizard uses as voice exemplars.',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'When false, the wizard falls back to hardcoded defaults.',
    }),
  ],
  preview: {
    select: { contentType: 'contentType', brand: 'brand', active: 'active' },
    prepare({ contentType, brand, active }) {
      return {
        title: `${contentType ?? '—'} (${brand ?? '—'})`,
        subtitle: active ? 'Active' : 'Inactive',
      };
    },
  },
});
