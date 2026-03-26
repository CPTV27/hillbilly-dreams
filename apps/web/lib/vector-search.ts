// lib/vector-search.ts
// Semantic vector search via pgvector cosine distance.
// Powers GET /api/search — "ask anything about the Deep South"

import { prisma } from '@/lib/db';
import { generateEmbedding } from '@/lib/vertex-embeddings';

export interface SearchResult {
  entityType: string;
  entityId: string;
  content: string;
  distance: number;
  chunkIndex: number;
}

export interface SearchOptions {
  entityType?: string;  // Filter to specific type (e.g. "directory_business")
  limit?: number;       // Max results (default 10)
  threshold?: number;   // Max cosine distance (default 0.5, lower = more similar)
}

/**
 * Semantic search across all embedded content.
 * 1. Embeds the query text via Vertex AI
 * 2. Runs pgvector cosine distance search
 * 3. Returns ranked results within the similarity threshold
 */
export async function searchSimilar(
  query: string,
  options?: SearchOptions
): Promise<SearchResult[]> {
  const limit = options?.limit ?? 10;
  const threshold = options?.threshold ?? 0.5;
  const entityType = options?.entityType ?? null;

  if (query.trim().length < 3) {
    throw new Error('Search query must be at least 3 characters');
  }

  // Generate embedding for the query
  const queryVector = await generateEmbedding(query);
  const vectorStr = `[${queryVector.join(',')}]`;

  // pgvector cosine distance search via raw SQL
  // <=> is the cosine distance operator (lower = more similar)
  const results = await prisma.$queryRawUnsafe<SearchResult[]>(
    `SELECT
       "entityType",
       "entityId",
       "content",
       "chunkIndex",
       (vector <=> $1::vector) AS distance
     FROM "Embedding"
     WHERE ($2::text IS NULL OR "entityType" = $2)
       AND (vector <=> $1::vector) < $3
     ORDER BY distance ASC
     LIMIT $4`,
    vectorStr,
    entityType,
    threshold,
    limit
  );

  return results;
}

/**
 * Search for similar businesses specifically.
 * Returns enriched results with business metadata.
 */
export async function searchBusinesses(
  query: string,
  limit: number = 10
): Promise<
  Array<{
    business: {
      id: number;
      name: string;
      slug: string;
      category: string;
      city: string;
      state: string;
      description: string;
      googleRating: number | null;
    };
    score: number;
    snippet: string;
  }>
> {
  const results = await searchSimilar(query, {
    entityType: 'directory_business',
    limit,
    threshold: 0.5,
  });

  if (results.length === 0) return [];

  // Fetch business details for matched IDs
  const businessIds = results.map((r) => parseInt(r.entityId, 10));
  const businesses = await prisma.directoryBusiness.findMany({
    where: { id: { in: businessIds }, active: true },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      city: true,
      state: true,
      description: true,
      googleRating: true,
    },
  });

  const bizMap = new Map(businesses.map((b) => [b.id, b]));

  return results
    .map((r) => {
      const biz = bizMap.get(parseInt(r.entityId, 10));
      if (!biz) return null;
      return {
        business: biz,
        score: Math.round((1 - r.distance) * 100) / 100, // Convert distance to similarity score
        snippet: r.content.slice(0, 200) + (r.content.length > 200 ? '...' : ''),
      };
    })
    .filter(Boolean) as Array<{
    business: (typeof businesses)[number];
    score: number;
    snippet: string;
  }>;
}
