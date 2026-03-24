// packages/config/brand-types.ts
// ─────────────────────────────────────────────────────────────
// PLATFORM-PORTABLE BRAND INTERFACES
// ─────────────────────────────────────────────────────────────
// These types define the HDX multi-tenant brand system contract.
// They are tenant-agnostic — any HDX deployment (BMT, S2PX, MVX, etc.)
// provides its own brand data that conforms to these interfaces.
//
// Seam introduced: 2026-03-24 — Phase 2 Config Seams (AG)
// ─────────────────────────────────────────────────────────────

/**
 * Shape of a brand configuration entry.
 * Every HDX tenant must provide a registry of brands conforming to this interface.
 */
export interface BrandConfig<TBrandId extends string = string> {
  id: TBrandId;
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

/**
 * A hostname-to-brand resolver function signature.
 * Each tenant implements its own resolver with its domain mappings.
 */
export type BrandResolver<TBrandId extends string = string> = (
  hostname: string
) => TBrandId;

/**
 * Create a type-safe brand registry lookup.
 * Platform utility — works with any tenant's brand data.
 */
export function createBrandResolver<TBrandId extends string>(
  matchers: Array<{ pattern: string; brandId: TBrandId }>,
  fallback: TBrandId
): BrandResolver<TBrandId> {
  return (hostname: string): TBrandId => {
    for (const { pattern, brandId } of matchers) {
      if (hostname.includes(pattern)) return brandId;
    }
    return fallback;
  };
}
