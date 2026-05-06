// config/tenants.ts
// ─────────────────────────────────────────────────────────────
// MULTI-TENANT REGISTRY
// ─────────────────────────────────────────────────────────────
// Single source of truth for every tenant on the platform.
// Add a new tenant here → it gets routing, theming, and admin access.
//
// Rule: Features go in the shared codebase. Brand goes in the tenant config.

export interface TenantConfig {
  id: string;
  name: string;
  entity: string;
  domains: string[];
  primaryDomain: string;
  routeGroup: string;
  themeClass: string;
  gcsBucket: string;
  accentColor: string;
  logo?: string;
  tagline: string;
  location: { city: string; state: string };
  features: string[];
}

export const TENANTS: TenantConfig[] = [
  {
    id: 'big-muddy',
    name: 'Big Muddy',
    entity: 'Hillbilly Dreams Inc',
    domains: [
      'bigmuddytouring.com', 'bigmuddymagazine.com', 'bigmuddyradio.com',
      'bigmuddyentertainment.com', 'deepsouthdirectory.com', 'measurablybetter.life',
      'outsidereconomics.com', 'measurablybetterthings.com',
      'bigmuddyrecordlabel.com', 'hillbillydreamsinc.com',
    ],
    primaryDomain: 'bigmuddytouring.com',
    routeGroup: 'touring',
    themeClass: 'theme-touring',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#c8943e',
    tagline: "The Mississippi's Music Region",
    location: { city: 'Natchez', state: 'MS' },
    features: ['directory', 'radio', 'magazine', 'gallery', 'studio', 'inn', 'entertainment', 'economics'],
  },
  {
    id: 'bearsville',
    name: 'Bearsville Creative',
    entity: 'Bearsville Creative LLC',
    domains: ['bearsvillemediagroup.com', 'bearsvillemedia.com'],
    primaryDomain: 'bearsvillemediagroup.com',
    routeGroup: 'bearsville',
    themeClass: 'theme-bearsville',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#c8943e',
    tagline: 'The Creative Region',
    location: { city: 'Woodstock', state: 'NY' },
    features: ['directory', 'radio', 'magazine', 'studio', 'gallery', 'creative', 'booking', 'realtor-pulse'],
  },
  {
    id: 'studio-c',
    name: 'Studio C',
    entity: 'Tuthill Design LLC d/b/a Studio C Video',
    domains: ['studiocvideo.com'],
    primaryDomain: 'studiocvideo.com',
    routeGroup: 'studioc',
    themeClass: 'theme-studio',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#4A90D9',
    tagline: 'Production. Recording. Broadcasting.',
    location: { city: 'Woodstock', state: 'NY' },
    features: ['gallery', 'studio', 'radio', 'creative', 'content-studio', 'media-vault'],
    // Studio C is the production arm — Chase 40% owner
    // Clients: Big Muddy/HDI, Bearsville, real estate
  },
  {
    id: 'tuthill',
    name: 'Tuthill Design',
    entity: 'Tuthill Design LLC',
    domains: ['tuthilldesign.com'],
    primaryDomain: 'tuthilldesign.com',
    routeGroup: 'tuthill',
    themeClass: 'theme-tuthill',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#2D5F2D',
    tagline: 'Design and Photography for the Hudson Valley',
    location: { city: 'Woodstock', state: 'NY' },
    features: ['gallery', 'studio', 'creative', 'content-studio'],
    // Tuthill Design is Elijah's company — integrates with Studio C
    // Shared access to Creative Hub + Google AI Studio
  },
  {
    id: 'arrie-aslin',
    name: 'Arrie Aslin',
    entity: 'Measurably Better Things LLC d/b/a Big Muddy Records',
    domains: ['arrieaslin.com'],
    primaryDomain: 'arrieaslin.com',
    routeGroup: 'arrie-aslin',
    themeClass: 'theme-arrie-aslin',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#994878',
    tagline: 'Singer · Natchez · Big Muddy Records',
    location: { city: 'Natchez', state: 'MS' },
    features: ['music', 'shows', 'press', 'mailing-list'],
    // Artist site for Amy Allen (stage name Arrie Aslin).
    // Brand spec: docs/brands/arrie-aslin-brand-package-2026-04-20.md
    // Visual spec: docs/brands/brand-guidelines/arrie-aslin-brand-guidelines-2026-04-21.md
  },
  {
    id: 'dctv',
    name: 'DCTV',
    entity: 'DCTV',
    domains: ['dctvny.org', 'dctv.org'],
    primaryDomain: 'dctvny.org',
    routeGroup: 'dctv',
    themeClass: 'theme-dctv',
    gcsBucket: 'bmt-media-bigmuddy',
    accentColor: '#38bdf8',
    tagline: 'Hudson Valley public access television',
    location: { city: 'Woodstock', state: 'NY' },
    features: ['broadcast', 'community-media', 'events'],
  },
];

/** Resolve tenant from hostname */
export function getTenantByHostname(hostname: string): TenantConfig | undefined {
  const h = hostname.toLowerCase().replace(/^www\./, '');
  return TENANTS.find(t => t.domains.some(d => h.includes(d.replace('www.', ''))));
}

/** Get tenant by ID */
export function getTenantById(id: string): TenantConfig | undefined {
  return TENANTS.find(t => t.id === id);
}

/** Get all tenant IDs */
export function getAllTenantIds(): string[] {
  return TENANTS.map(t => t.id);
}
