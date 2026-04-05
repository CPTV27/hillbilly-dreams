import { z } from 'zod';

/** Remove angle-bracket tags to reduce HTML/script injection in plain-text fields. */
export function stripHtmlTags(s: string): string {
  return s.replace(/<[^>]{0,500}>/g, '').trim();
}

const t = (min: number, max: number) =>
  z
    .string()
    .max(max + 4096)
    .transform(stripHtmlTags)
    .refine((s) => s.length >= min && s.length <= max, { message: `Must be ${min}-${max} characters` });

const tOptional = (max: number) =>
  z
    .string()
    .max(max + 2048)
    .optional()
    .transform((s) => (s === undefined ? undefined : stripHtmlTags(s)))
    .refine((s) => s === undefined || s.length <= max, { message: 'Too long' });

export const directorySubmitSchema = z.object({
  name: t(1, 300),
  category: t(1, 120),
  city: t(1, 120),
  state: z.string().max(4).optional().default('MS').transform(stripHtmlTags),
  website: z
    .union([z.string().url().max(2000), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : v)),
  description: t(10, 20_000),
  toolsOrigin: tOptional(500),
  softwareSpend: tOptional(200),
  contactName: t(1, 200),
  contactEmail: z.string().email().max(320),
  contactPhone: tOptional(80),
  hearAbout: tOptional(500),
  genre: tOptional(200),
  streamingLinks: tOptional(2000),
  availability: tOptional(500),
  feeRange: tOptional(200),
});

export const directoryClaimSchema = z.object({
  name: t(1, 300),
  businessType: z.enum(['restaurant', 'venue', 'hotel', 'shop', 'tour', 'service', 'other']),
  city: t(1, 120),
  state: z.string().max(4).optional().transform((s) => (s ? stripHtmlTags(s) : undefined)),
  address: tOptional(500),
  phone: tOptional(80),
  email: z
    .union([z.string().email().max(320), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : v)),
  contactName: tOptional(200),
  website: z
    .union([z.string().url().max(2000), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : v)),
  description: tOptional(20_000),
  tier: z.enum(['free', 'front-porch', 'route', 'river-room', 'blues-room']),
  existingClientId: z.coerce.number().int().positive().optional(),
});

export const contactCreateSchema = z.object({
  name: t(1, 300),
  role: tOptional(200),
  organization: tOptional(300),
  email: z
    .union([z.string().email().max(320), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : v)),
  phone: tOptional(80),
  category: tOptional(80),
  notes: tOptional(20_000),
  lastContact: z.string().max(80).optional().transform((v) => (v === '' ? undefined : v)),
});

const slugPart = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, 'slug must be URL-safe')
  .transform((s) => stripHtmlTags(s).toLowerCase());

export const articleCreateSchema = z.object({
  title: t(1, 500),
  slug: slugPart,
  category: z
    .string()
    .max(120)
    .optional()
    .transform((s) =>
      s != null && String(s).trim() ? stripHtmlTags(String(s)).slice(0, 120) : 'city-guide'
    ),
  city: tOptional(120),
  author: z
    .string()
    .max(200)
    .optional()
    .transform((s) =>
      s != null && String(s).trim() ? stripHtmlTags(String(s)).slice(0, 200) : 'Big Muddy Magazine'
    ),
  status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
  excerpt: tOptional(5000),
  body: tOptional(200_000),
  heroImage: z
    .union([z.string().url().max(2000), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : v)),
  readTime: tOptional(50),
  publishedAt: z.string().max(80).optional().transform((v) => (v === '' ? undefined : v)),
});

export const draftUpdateSchema = z.object({
  id: z.coerce.number().int().positive(),
  status: z.enum(['pending', 'approved', 'published', 'rejected']).optional(),
  content: tOptional(200_000),
  approvedBy: tOptional(200),
});

export const playlistCreateSchema = z.object({
  name: t(1, 300),
  description: tOptional(5000),
  trackCount: z.coerce.number().int().min(0).max(1_000_000).optional().default(0),
  spotifyUrl: z
    .union([z.string().url().max(2000), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : v)),
  coverImage: z
    .union([z.string().url().max(2000), z.literal('')])
    .optional()
    .transform((v) => (v === '' || v === undefined ? undefined : v)),
  status: z.enum(['active', 'archived']).optional().default('active'),
});

export function formatZodError(err: z.ZodError): string {
  return err.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
}
