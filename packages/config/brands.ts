// packages/config/brands.ts
// Brand configuration for the Big Muddy multi-tenant platform

export type BrandId = 'touring' | 'magazine' | 'radio' | 'economics' | 'admin';

export interface BrandConfig {
  id: BrandId;
  name: string;
  shortName: string;
  tagline: string;
  domain: string;
  localDomain: string;
  description: string;
  themeClass: string;
  primaryColor: string;
  nav: {
    links: Array<{ label: string; href: string }>;
  };
}

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
        { label: 'Live Sessions', href: '/radio/live' },
        { label: 'Podcast', href: '/radio/podcast' },
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
    primaryColor: '#b54c4c',
    nav: {
      links: [
        { label: 'Field Manual', href: '/field-manual' },
        { label: 'The Math', href: '/the-math' },
        { label: 'Community', href: '/community' },
        { label: 'About', href: '/about' },
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
 * Resolve brand from a hostname string.
 * Used in middleware and server components.
 */
export function getBrandFromHostname(hostname: string): BrandId {
  if (hostname.includes('bigmuddytouring')) return 'touring';
  if (hostname.includes('bigmuddymagazine')) return 'magazine';
  if (hostname.includes('bigmuddyradio')) return 'radio';
  if (hostname.includes('outsidereconomics')) return 'economics';
  // admin.bigmuddy.*, localhost, and fallback
  return 'admin';
}

export default BRANDS;
