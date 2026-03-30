// packages/config/brands.ts
// Brand configuration for the Big Muddy multi-tenant platform
//
// SEAM: Platform interfaces live in brand-types.ts (HDX-portable).
//       This file provides BMT-specific brand data and ID union.
//       Existing exports preserved — no downstream changes needed.

import { BrandConfig as BaseBrandConfig, createBrandResolver } from './brand-types';

export type BrandId = 'touring' | 'magazine' | 'radio' | 'economics' | 'admin' | 'gallery' | 'records' | 'hillbilly' | 'entertainment';

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
  gallery: {
    id: 'gallery',
    name: 'BuyCurious Art',
    shortName: 'Gallery',
    tagline: 'Original art from the Mississippi corridor',
    domain: 'buycuriousart.com',
    localDomain: 'buycuriousart.local',
    description:
      'Curated art marketplace for original works from the artists, musicians, and makers who call the Deep South home.',
    themeClass: 'theme-gallery',
    primaryColor: '#c8943e',
    nav: {
      links: [
        { label: 'Gallery', href: '/gallery' },
        { label: 'Artists', href: '/gallery/artists' },
        { label: 'About', href: '/gallery/about' },
      ],
    },
  },
  records: {
    id: 'records',
    name: 'Big Muddy Records',
    shortName: 'Records',
    tagline: 'Music from the Mississippi corridor',
    domain: 'bigmuddyrecords.net',
    localDomain: 'bigmuddyrecords.local',
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
        { label: 'Records', href: 'https://bigmuddyrecords.net' },
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
        { label: 'Records', href: 'https://bigmuddyrecords.net' },
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
  { pattern: 'outsidereconomics', brandId: 'economics' },
  { pattern: 'buycurious', brandId: 'gallery' },
  { pattern: 'bigmuddyrecord', brandId: 'records' },
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
