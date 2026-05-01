/**
 * Sanity schema — Studio C production client.
 *
 * The human-edited canonical record. Postgres `ProductionClient` mirrors a
 * subset for state-machine relations.
 *
 * Phase 1 (2026-05-01). No UI yet — schema only.
 */
import { defineField, defineType } from 'sanity';

export const studioCClient = defineType({
  name: 'studioCClient',
  title: 'Studio C — Production Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Internal vs external',
      type: 'string',
      options: {
        list: [
          { title: 'Internal MBT brand', value: 'internal' },
          { title: 'External paid client', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'tenantId',
      title: 'Tenant',
      description: 'Which MBT tenant owns this client. See apps/web/config/tenants.ts.',
      type: 'string',
      initialValue: 'mbt',
    }),
    defineField({
      name: 'contactName',
      title: 'Primary contact name',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Primary contact email',
      type: 'string',
    }),
    defineField({
      name: 'billingEntity',
      title: 'Billing entity',
      description: 'Legal entity to invoice. Empty for internal MBT brands.',
      type: 'string',
    }),
    defineField({
      name: 'brands',
      title: 'Brands',
      description: 'Brands operating under this client. e.g. MBT → Big Muddy Inn, Big Muddy Touring, etc.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'studioCBrand' }] }],
    }),
    defineField({
      name: 'notes',
      title: 'Engagement notes',
      type: 'text',
      rows: 6,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'kind' },
  },
});
