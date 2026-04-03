// packages/config/brands.ts
// ─────────────────────────────────────────────────────────────
// CANONICAL BRAND REGISTRY — Single Source of Truth
// ─────────────────────────────────────────────────────────────
//
// 3-Layer Architecture:
//   Layer 1 — BRANDS:   Consumer-facing sites we own and operate
//   Layer 2 — PRODUCTS: What we sell (MBT SaaS, MBT Life)
//   Layer 3 — CLIENTS:  External tenants on our platform
//   Plus:     HOLDING (Hillbilly Dreams Inc) and HUB (Entertainment portal)
//
// SEAM: Platform interfaces live in brand-types.ts (HDX-portable).
//       This file provides BMT-specific brand data and ID union.
//       Existing exports preserved — no downstream changes needed.

import { BrandConfig as BaseBrandConfig, createBrandResolver } from './brand-types';

export type BrandId = 'touring' | 'magazine' | 'radio' | 'records' | 'directory' | 'economics' | 'entertainment' | 'hillbilly' | 'admin';

/** Brand layer classification */
export type BrandLayer = 'brand' | 'product' | 'client' | 'holding' | 'hub' | 'internal';

/** Which layer each brand belongs to */
export const BRAND_LAYERS: Record<BrandId, BrandLayer> = {
  touring: 'brand',
  magazine: 'brand',
  radio: 'brand',
  records: 'brand',
  directory: 'brand',
  economics: 'brand',
  entertainment: 'hub',        // Portal to Touring + Radio + Records — not its own product
  hillbilly: 'holding',        // Hillbilly Dreams Inc — corporate, not consumer-facing
  admin: 'internal',
};

/** Retired brand IDs — kept for reference, not in the union */
export const RETIRED_BRANDS = {
  gallery: 'Retired into Storefront module on MBT (was buycurious.art)',
} as const;

// BrandConfig is now the BMT-specific specialization of the platform interface
export type BrandConfig = BaseBrandConfig<BrandId>;

export const BRANDS: Record<BrandId, BrandConfig> = {
  touring: {
    id: 'touring',
    name: 'Big Muddy Touring',
    shortName: 'Touring',
    tagline: "The Mississippi's Music Corridor",
    domain: 'bigmuddytouring.com',
    localDomain: 'bigmuddytouring.local',
    description:
      'The primary editorial hub for the Big Muddy ecosystem — inn, music route, and travel along the Mississippi corridor from Memphis to New Orleans.',
    themeClass: 'theme-touring',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Lodging', href: '/inn' },
        { label: 'The Route', href: '/route' },
        { label: 'Journal', href: '/inn/blog' },
        { label: 'Magazine', href: 'https://bigmuddymagazine.com' },
        { label: 'Radio', href: 'https://bigmuddyradio.com' },
      ],
    },
  },
  magazine: {
    id: 'magazine',
    name: 'Big Muddy Magazine',
    shortName: 'Magazine',
    tagline: 'Stories from the Southern Gothic heartland',
    domain: 'bigmuddymagazine.com',
    localDomain: 'bigmuddymagazine.local',
    description:
      'Long-form editorial, city guides, and feature stories from along the Mississippi music corridor.',
    themeClass: 'theme-magazine',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Features', href: '/articles?category=feature' },
        { label: 'City Guides', href: '/city-guides' },
        { label: 'Interviews', href: '/articles?category=interview' },
        { label: 'Photo Essays', href: '/articles?category=photo-essay' },
      ],
    },
  },
  radio: {
    id: 'radio',
    name: 'Big Muddy Radio',
    shortName: 'Radio',
    tagline: 'The sound of the river',
    domain: 'bigmuddyradio.com',
    localDomain: 'bigmuddyradio.local',
    description:
      'Curated playlists, live sessions, and the soundtrack of the Mississippi music corridor.',
    themeClass: 'theme-radio',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Playlists', href: '/radio/playlists' },
        { label: 'Shows', href: '/radio/shows' },
        { label: 'Live Sessions', href: '/radio/live' },
        { label: 'Podcast', href: '/radio/podcast' },
        { label: 'Directory', href: '/radio/directory' },
      ],
    },
  },
  economics: {
    id: 'economics',
    name: 'Outsider Economics',
    shortName: 'Economics',
    tagline: 'A Field Manual for Independent Economic Systems',
    domain: 'outsidereconomics.com',
    localDomain: 'outsidereconomics.local',
    description:
      'Resource center and community hub for building sovereign local economies — coordination math, extraction analysis, and field-tested frameworks.',
    themeClass: 'theme-economics',
    primaryColor: '#b54c4c',   /* Red — matches --accent in theme-economics */
    nav: {
      links: [
        { label: 'Field Manual', href: '/field-manual' },
        { label: 'The Math', href: '/the-math' },
        { label: 'Community', href: '/community' },
        { label: 'Rise Up', href: '/rise-up' },
        { label: 'About', href: '/about' },
      ],
    },
  },
  directory: {
    id: 'directory',
    name: 'Deep South Directory',
    shortName: 'Directory',
    tagline: 'The local business network for the Mississippi corridor',
    domain: 'deepsouthdirectory.com',
    localDomain: 'deepsouthdirectory.local',
    description:
      'Local business listings, review management, and media services for the Mississippi corridor — starting at $99/month.',
    themeClass: 'theme-directory',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Browse', href: '/directory' },
        { label: 'Join', href: '/directory/submit' },
        { label: 'How It Works', href: '/media/how-it-works' },
        { label: 'Pricing', href: '/media/pricing' },
      ],
    },
  },
  records: {
    id: 'records',
    name: 'Big Muddy Records',
    shortName: 'Records',
    tagline: 'Music from the Mississippi corridor',
    domain: 'bigmuddyrecordlabel.com',
    localDomain: 'bigmuddyrecordlabel.local',
    description:
      'Independent record label capturing the sound of the Mississippi music corridor — blues, soul, gospel, and the voices that carry the river.',
    themeClass: 'theme-records',
    primaryColor: '#c07830',   /* Deeper amber — worn vinyl label */
    nav: {
      links: [
        { label: 'Artists', href: '/records/artists' },
        { label: 'Releases', href: '/records/releases' },
        { label: 'Sessions', href: '/records/sessions' },
        { label: 'Radio', href: 'https://bigmuddyradio.com' },
        { label: 'About', href: '/records/about' },
      ],
    },
  },
  hillbilly: {
    id: 'hillbilly',
    name: 'Hillbilly Dreams Inc.',
    shortName: 'Hillbilly Dreams',
    tagline: 'The parent company behind the Big Muddy ecosystem',
    domain: 'hillbillydreamsinc.com',
    localDomain: 'hillbillydreamsinc.local',
    description:
      'Hillbilly Dreams Inc. — the holding company and creative engine behind Big Muddy Touring, Magazine, Radio, Records, BuyCurious Art, Outsider Economics, and the Deep South Directory.',
    themeClass: 'theme-hillbilly',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Touring', href: 'https://bigmuddytouring.com' },
        { label: 'Magazine', href: 'https://bigmuddymagazine.com' },
        { label: 'Radio', href: 'https://bigmuddyradio.com' },
        { label: 'Records', href: 'https://bigmuddyrecordlabel.com' },
        { label: 'Gallery', href: 'https://buycuriousart.com' },
        { label: 'Economics', href: 'https://outsidereconomics.com' },
      ],
    },
  },
  entertainment: {
    id: 'entertainment',
    name: 'Big Muddy Entertainment',
    shortName: 'Entertainment',
    tagline: 'Four divisions. One corridor.',
    domain: 'bigmuddyentertainment.com',
    localDomain: 'bigmuddyentertainment.local',
    description:
      'The music and media arm of Hillbilly Dreams, Inc. — touring artists, recording music, broadcasting radio, and building audiences along the Mississippi corridor.',
    themeClass: 'theme-bm-entertainment',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Touring', href: 'https://bigmuddytouring.com' },
        { label: 'Records', href: 'https://bigmuddyrecordlabel.com' },
        { label: 'Radio', href: 'https://bigmuddyradio.com' },
        { label: 'Talent Search', href: '#talent-search' },
        { label: 'Community', href: '#community' },
      ],
    },
  },
  admin: {
    id: 'admin',
    name: 'Big Muddy HQ',
    shortName: 'HQ',
    tagline: 'Operations center',
    domain: 'admin.bigmuddytouring.com',
    localDomain: 'admin.bigmuddy.local',
    description: 'Internal operations — content management, contacts, metrics, and platform controls.',
    themeClass: 'theme-admin',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Articles', href: '/articles' },
        { label: 'Playlists', href: '/playlists' },
        { label: 'Events', href: '/events' },
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Contacts', href: '/contacts' },
        { label: 'Calendar', href: '/calendar' },
      ],
    },
  },
};

/**
 * BMT hostname-to-brand matchers.
 * SEAM: This data is tenant-specific. The resolver engine (createBrandResolver) is platform.
 */
const BMT_BRAND_MATCHERS: Array<{ pattern: string; brandId: BrandId }> = [
  { pattern: 'bigmuddytouring', brandId: 'touring' },
  { pattern: 'bigmuddymagazine', brandId: 'magazine' },
  { pattern: 'bigmuddyradio', brandId: 'radio' },
  { pattern: 'bigmuddyrecordlabel', brandId: 'records' },
  { pattern: 'deepsouthdirectory', brandId: 'directory' },
  { pattern: 'outsidereconomics', brandId: 'economics' },
  { pattern: 'bigmuddyentertainment', brandId: 'entertainment' },
  { pattern: 'hillbillydreams', brandId: 'hillbilly' },
];

/**
 * Resolve brand from a hostname string.
 * Used in middleware and server components.
 */
export const getBrandFromHostname = createBrandResolver<BrandId>(
  BMT_BRAND_MATCHERS,
  'admin' // fallback: admin.bigmuddy.*, localhost, and unmatched
);

export default BRANDS;
