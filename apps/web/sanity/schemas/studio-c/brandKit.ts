/**
 * Sanity schema — Studio C brand kit.
 *
 * The machine-readable brand kit. Drives downstream NLE template generation
 * (.mogrt for Premiere, .drfx for Resolve), social templates, chat voice routing,
 * and any per-brand visual specs.
 *
 * Onboarding spec (per /docs/studio-c/workflow-synthesis-2026-05-01.md):
 * - Logos: light, dark, mono
 * - Fonts: 3 max
 * - Palette: 5 colors max
 * - Lower-third template
 * - Intro / outro stings
 * - Social templates per platform
 *
 * Phase 1 (2026-05-01). No UI yet — schema only. Template generation pipeline = Phase 2.
 */
import { defineField, defineType } from 'sanity';

export const studioCBrandKit = defineType({
  name: 'studioCBrandKit',
  title: 'Studio C — Brand Kit',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Kit name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      description: 'Bump on any change. Downstream templates reference a specific version for reproducibility.',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().positive(),
    }),

    // ── Logos ──
    defineField({
      name: 'logoLight',
      title: 'Logo — light variant',
      type: 'image',
      description: 'For dark backgrounds.',
      options: { accept: 'image/svg+xml,image/png' },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo — dark variant',
      type: 'image',
      description: 'For light backgrounds.',
      options: { accept: 'image/svg+xml,image/png' },
    }),
    defineField({
      name: 'logoMono',
      title: 'Logo — monochrome',
      type: 'image',
      description: 'Single-color version for stamps, watermarks, etc.',
      options: { accept: 'image/svg+xml,image/png' },
    }),

    // ── Fonts ──
    defineField({
      name: 'fonts',
      title: 'Fonts (3 max)',
      type: 'array',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Font family' },
            {
              name: 'role',
              type: 'string',
              title: 'Role',
              options: { list: ['display', 'body', 'mono'], layout: 'radio' },
            },
            { name: 'url', type: 'url', title: 'Source URL (Google Fonts, Adobe, hosted)' },
            { name: 'weights', type: 'string', title: 'Weights used (comma separated)' },
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        },
      ],
    }),

    // ── Palette ──
    defineField({
      name: 'palette',
      title: 'Color palette (5 max)',
      type: 'array',
      validation: (Rule) => Rule.max(5),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Color name' },
            { name: 'hex', type: 'string', title: 'Hex code' },
            {
              name: 'role',
              type: 'string',
              title: 'Role',
              options: { list: ['primary', 'secondary', 'accent', 'background', 'ink'] },
            },
          ],
          preview: { select: { title: 'name', subtitle: 'hex' } },
        },
      ],
    }),

    // ── Voice ──
    defineField({
      name: 'voice',
      title: 'Voice + tone',
      description: 'Plain language description of the brand voice. Do/don\'t list. Used for chat voice routing.',
      type: 'text',
      rows: 8,
    }),

    // ── Templates ──
    defineField({
      name: 'lowerThird',
      title: 'Lower-third template asset',
      description: 'Reference to the AE/Motion source file or .mogrt/.drfx export.',
      type: 'file',
    }),
    defineField({
      name: 'introSting',
      title: 'Intro sting (audio + visual)',
      type: 'file',
    }),
    defineField({
      name: 'outroSting',
      title: 'Outro sting (audio + visual)',
      type: 'file',
    }),

    // ── Social templates ──
    defineField({
      name: 'socialTemplates',
      title: 'Social templates',
      description: 'Per-platform template references. Platforms covered today: Instagram feed/reels, TikTok, YouTube short, X.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: { list: ['instagram_feed', 'instagram_reels', 'tiktok', 'youtube_short', 'x'] },
            },
            { name: 'templateRef', type: 'file', title: 'Template file' },
            { name: 'aspectRatio', type: 'string', title: 'Aspect ratio (e.g. 9:16)' },
          ],
          preview: { select: { title: 'platform', subtitle: 'aspectRatio' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'version' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `v${subtitle}` }),
  },
});
