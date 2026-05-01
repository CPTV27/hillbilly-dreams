/**
 * Studio C production ops Sanity schema barrel.
 *
 * Phase 1 (2026-05-01). Schema-only registration. Wire up to apps/web/sanity/schemas/index.ts
 * when ready to expose the studio in Sanity Studio (Phase 2).
 */
import { studioCClient } from './client';
import { studioCBrand } from './brand';
import { studioCBrandKit } from './brandKit';
import { studioCShow } from './show';
import { studioCEpisode } from './episode';

export const studioCSchemaTypes = [
  studioCClient,
  studioCBrand,
  studioCBrandKit,
  studioCShow,
  studioCEpisode,
];
