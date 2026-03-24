// apps/web/config/domain-routes.ts
// ─────────────────────────────────────────────────────────────
// BMT TENANT DOMAIN ROUTING TABLE
// ─────────────────────────────────────────────────────────────
// This file contains all BMT-specific domain-to-route mappings.
// The middleware routing engine (middleware.ts) is platform-portable
// and imports this tenant config to perform hostname-based rewrites.
//
// To add a new domain → route mapping, add an entry here.
// The middleware does NOT need to be modified.
//
// Seam introduced: 2026-03-24 — Phase 2 Wave 3 (AG)
// ─────────────────────────────────────────────────────────────

/**
 * A single hostname-to-route-group mapping.
 */
export interface DomainRoute {
  /** Substring to match against the hostname (e.g., 'bigmuddytouring') */
  pattern: string;
  /** The Next.js route group to rewrite to (e.g., 'touring') */
  routeGroup: string;
  /** If true, skip this mapping when hostname also contains 'admin' */
  excludeAdmin?: boolean;
  /** Optional special redirect rules for specific paths under this domain */
  redirects?: Array<{
    /** Path prefix to match (e.g., '/dashboard') */
    pathPrefix: string;
    /** Where to redirect (e.g., '/ops') */
    target: string;
  }>;
}

// ── Production Domain Mappings ──

export const BMT_DOMAIN_ROUTES: DomainRoute[] = [
  {
    pattern: 'bigmuddytouring',
    routeGroup: 'touring',
    excludeAdmin: true,
    redirects: [
      { pathPrefix: '/dashboard', target: '/ops' },
    ],
  },
  { pattern: 'bigmuddymagazine', routeGroup: 'magazine' },
  { pattern: 'bigmuddyradio', routeGroup: 'radio' },
  {
    pattern: 'deepsouthdirectory',
    routeGroup: 'media',
    excludeAdmin: true,
  },
  {
    pattern: 'bigmuddymedia',
    routeGroup: 'media',
    excludeAdmin: true,
  },
  { pattern: 'outsidereconomics', routeGroup: 'economics' },
  { pattern: 'buycurious', routeGroup: 'gallery' },
  { pattern: 'buycuriousart', routeGroup: 'gallery' },
  { pattern: 'bigmuddyrecord', routeGroup: 'records' },
  { pattern: 'superchase', routeGroup: 'platform' },
  { pattern: 'studiocvideo', routeGroup: 'studio' },
  { pattern: 'studio-c', routeGroup: 'studio' },
  { pattern: 'studioc.video', routeGroup: 'studio' },
  { pattern: 'tuthilldesign', routeGroup: 'tuthill' },
  { pattern: 'hillbillydreams', routeGroup: 'hillbilly' },
  { pattern: 'measurablybetter', routeGroup: 'measurably-better' },
];

// ── Local Development Domain Mappings ──
// These are for /etc/hosts + .local TLD development.

export const BMT_LOCAL_DOMAIN_ROUTES: DomainRoute[] = [
  {
    pattern: 'bigmuddytouring.local',
    routeGroup: 'touring',
    excludeAdmin: true,
  },
  { pattern: 'bigmuddymagazine.local', routeGroup: 'magazine' },
  { pattern: 'bigmuddyradio.local', routeGroup: 'radio' },
  { pattern: 'deepsouthdirectory.local', routeGroup: 'media' },
  { pattern: 'bigmuddymedia.local', routeGroup: 'media' },
  { pattern: 'outsidereconomics.local', routeGroup: 'economics' },
];

// ── Combined: all BMT domain routes (prod + local) ──
// Local routes are checked FIRST because their patterns are more specific
// (e.g., 'bigmuddytouring.local' should match before 'bigmuddytouring').

export const ALL_BMT_DOMAIN_ROUTES: DomainRoute[] = [
  ...BMT_LOCAL_DOMAIN_ROUTES,
  ...BMT_DOMAIN_ROUTES,
];

// ── Known route-group prefixes ──
// Used by the middleware passthrough logic to avoid double-rewrites.

export const BMT_BRAND_PREFIXES = [
  '/touring', '/magazine', '/radio', '/economics', '/media',
  '/admin', '/ops', '/portal', '/platform', '/gallery',
  '/records', '/studio', '/tuthill', '/hillbilly',
  '/measurably-better',
];

// ── Admin path shortcuts ──
// Paths that get rewritten to /admin/* when on the admin domain.

export const BMT_ADMIN_PATH_SHORTCUTS = [
  '/dashboard', '/articles', '/calendar', '/contacts',
  '/events', '/media', '/newsletter',
];

// ── Valid dev brand overrides ──
// Used by NEXT_PUBLIC_BRAND env var for local development.

export const BMT_VALID_DEV_BRANDS = [
  'touring', 'magazine', 'radio', 'economics', 'media',
  'admin', 'ops', 'gallery', 'records', 'platform',
  'studio', 'tuthill', 'hillbilly', 'measurably-better',
];

// ── Default fallback route group ──
export const BMT_DEFAULT_ROUTE_GROUP = 'touring';
