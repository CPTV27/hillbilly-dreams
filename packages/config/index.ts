// packages/config/index.ts
// Platform brand contract — selective export to avoid conflict with BMT's specialized BrandConfig
export { createBrandResolver } from './brand-types';
export type { BrandConfig as BrandConfigBase, BrandResolver } from './brand-types';
export * from './platform-types'; // Platform generics (canonical source)
export * from './brands';
export * from './types'; // BMT domain types + re-exports platform types for compat
export * from './permissions';
