// WiFi captive portal — per-location branding + newsletter source tags.
// Base URL for QR / deep links: NEXT_PUBLIC_WIFI_PORTAL_BASE_URL (e.g. https://bigmuddytouring.com)

export type WifiPortalLocationConfig = {
  name: string;
  tagline: string;
  heroImage: string;
  /** Newsletter `brand` + analytics */
  brand: string;
};

export const DEFAULT_WIFI_PORTAL_LOCATION_KEY = 'big-muddy-inn';

/** Tenant/event keys → display + assets. Add rows for new venues without editing page TSX. */
export const WIFI_PORTAL_LOCATIONS: Record<string, WifiPortalLocationConfig> = {
  [DEFAULT_WIFI_PORTAL_LOCATION_KEY]: {
    name: 'The Big Muddy Inn',
    tagline: 'Natchez, Mississippi',
    heroImage: '/images/region/inn-hallway-gathering.webp',
    brand: 'inn',
  },
  'utopia-studios': {
    name: 'Utopia Studios',
    tagline: 'Natchez, Mississippi',
    heroImage: '/images/region/night-patio-string-lights.webp',
    brand: 'inn',
  },
};

export function getWifiPortalLocation(key: string | null): WifiPortalLocationConfig {
  const k = key && WIFI_PORTAL_LOCATIONS[key] ? key : DEFAULT_WIFI_PORTAL_LOCATION_KEY;
  return WIFI_PORTAL_LOCATIONS[k];
}

/** Canonical site origin for `/welcome/wifi` links (QR codes, router splash). */
export function getWifiPortalBaseUrl(): string {
  const fromEnv =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_WIFI_PORTAL_BASE_URL
      ? process.env.NEXT_PUBLIC_WIFI_PORTAL_BASE_URL.replace(/\/$/, '')
      : '';
  return fromEnv || 'https://bigmuddytouring.com';
}

export function buildWifiPortalUrl(locationKey?: string): string {
  const base = getWifiPortalBaseUrl();
  const loc = locationKey || DEFAULT_WIFI_PORTAL_LOCATION_KEY;
  const u = new URL('/welcome/wifi', base);
  u.searchParams.set('location', loc);
  return u.toString();
}
