// packages/modules/content-creation/src/entity-resolver.ts
// Two-stage entity resolution: (1) extract keywords + categories from topic,
// (2) query Prisma for matching DirectoryBusiness rows. Stage 1 uses AI
// (Gemini Flash); caller passes an extractor fn so we don't force a
// dependency on ai-models.ts from this package.

import { prisma } from '@bigmuddy/database';
import type { EntityCandidate } from './types';

export interface SearchTerms {
  keywords: string[];
  dateRange?: { start: Date; end: Date };
  categories?: string[];
  locations?: string[];
}

export type ExtractorFn = (topic: string) => Promise<SearchTerms>;

/**
 * Resolve entities from a topic. Caller provides the extractor (usually
 * a Gemini-Flash call that returns structured output).
 * Returns up to 15 candidates, ranked by relevance proxy (keyword match).
 */
export async function resolveEntities(
  topic: string,
  extract: ExtractorFn
): Promise<EntityCandidate[]> {
  const terms = await extract(topic);
  if (terms.keywords.length === 0 && !terms.categories?.length) return [];

  // Pragmatic Prisma query: OR across keyword LIKE-matches on name/description
  // + AND for categories/locations if provided.
  const keywordClauses = terms.keywords.flatMap((k) => [
    { name: { contains: k, mode: 'insensitive' as const } },
    { description: { contains: k, mode: 'insensitive' as const } },
  ]);

  const candidates = await prisma.directoryBusiness.findMany({
    where: {
      AND: [
        keywordClauses.length > 0 ? { OR: keywordClauses } : {},
        terms.categories?.length
          ? { category: { in: terms.categories } }
          : {},
        terms.locations?.length
          ? {
              OR: [
                { city: { in: terms.locations } },
                { state: { in: terms.locations } },
              ],
            }
          : {},
      ],
    },
    take: 15,
  });

  return candidates.map((c) => ({
    id: String(c.id),
    name: c.name,
    category: c.category,
    city: c.city,
    state: c.state,
    description: c.description,
    url: c.website ?? null,
  }));
}
