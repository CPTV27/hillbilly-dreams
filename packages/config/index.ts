// packages/config/index.ts
// Platform brand contract — selective export to avoid conflict with BMT's specialized BrandConfig
export { createBrandResolver } from './brand-types';
export type { BrandConfig as BrandConfigBase, BrandResolver } from './brand-types';
export * from './brands';
export * from './types';
export * from './permissions';
