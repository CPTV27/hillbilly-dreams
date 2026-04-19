// packages/modules/content-creation/index.ts
// @bigmuddy/content-creation — Phase C Block 6.
// AI content creation wizard backend. Wraps apps/web/lib/ai-models.ts
// failover chain (does not bypass). Owns: entity resolution from
// DirectoryBusiness, photo resolution from Immich CLIP search, prompt
// template loading, Sanity draft writing.

export * from './src/types';
export * as entityResolver from './src/entity-resolver';
export * as immichClient from './src/immich-client';
export * as templates from './src/templates';
export * as sanityWriter from './src/sanity-writer';
