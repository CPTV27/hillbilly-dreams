import { MeiliSearch } from 'meilisearch';

let client: MeiliSearch | null = null;

export function getMeiliClient(): MeiliSearch {
  if (client) return client;
  
  const host = process.env.MEILISEARCH_URL || 'http://127.0.0.1:7700';
  const apiKey = process.env.MEILISEARCH_API_KEY || 'hdi-meili-2026';
  
  client = new MeiliSearch({ host, apiKey });
  return client;
}

export async function searchContext(query: string, options?: {
  domain?: string;
  limit?: number;
}) {
  const meili = getMeiliClient();
  const index = meili.index('context');
  
  const filter = options?.domain ? `domain = "${options.domain}"` : undefined;
  
  const results = await index.search(query, {
    limit: options?.limit || 20,
    filter,
    attributesToHighlight: ['content'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  });
  
  return results;
}

export async function searchBusinesses(query: string, options?: {
  category?: string;
  tier?: string;
  limit?: number;
}) {
  const meili = getMeiliClient();
  const index = meili.index('businesses');
  
  const filters: string[] = [];
  if (options?.category) filters.push(`category = "${options.category}"`);
  if (options?.tier) filters.push(`tier = "${options.tier}"`);
  
  const results = await index.search(query, {
    limit: options?.limit || 20,
    filter: filters.length ? filters.join(' AND ') : undefined,
  });
  
  return results;
}
