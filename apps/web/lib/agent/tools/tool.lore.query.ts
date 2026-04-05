import { z } from 'zod';
import { EventProducer } from '../eventProducer';
import type { ToolRunContext } from '../agentDispatch';

/** Lazy-load ChromaDB to avoid bundling onnxruntime-node binaries at build time. */
async function getChromaClient() {
  const { ChromaClient, DefaultEmbeddingFunction } = await import('chromadb');
  return { client: new ChromaClient(), embedder: new DefaultEmbeddingFunction() };
}

/** IncludeEnum values — hardcoded to avoid import at build time. */
const INCLUDE_DOCUMENTS = 'documents';
const INCLUDE_METADATAS = 'metadatas';
const INCLUDE_DISTANCES = 'distances';

export const queryLoreSchema = z.object({
  query: z.string().describe('The user question or subject to search for in the Deep Lore memory banks.'),
  namespace: z
    .enum(['lore_manuals', 'lore_journals', 'lore_sops'])
    .describe(
      'Which collection to search. Start with manuals for hardware, journals for history, or sops for rules.'
    ),
  maxResults: z.number().optional().default(3).describe('Number of chunks to retrieve.'),
});

export type QueryLoreParams = z.infer<typeof queryLoreSchema>;

/**
 * Local ChromaDB semantic search (Mac mini Hub). Emits Phase 2.3 socket events for Glass UI.
 */
export async function queryLore(params: QueryLoreParams, _context?: ToolRunContext) {
  const CHROMA_URL = process.env.CHROMA_URL || 'http://localhost:8000';
  const { ChromaClient: CC, DefaultEmbeddingFunction: DEF } = await import('chromadb');
  const client = new CC({ path: CHROMA_URL });
  const embedder = new DEF();

  const toolName = 'lore_query';
  EventProducer.toolCallStart(toolName, {
    query: params.query,
    namespace: params.namespace,
    maxResults: params.maxResults ?? 3,
  });

  try {
    const collection = await client.getCollection({
      name: params.namespace,
      embeddingFunction: embedder,
    });

    const results = await collection.query({
      queryTexts: [params.query],
      nResults: params.maxResults || 3,
      include: [INCLUDE_DOCUMENTS, INCLUDE_METADATAS, INCLUDE_DISTANCES] as any,
    });

    if (!results.documents?.[0]?.length) {
      EventProducer.toolCallEnd(toolName, 'No chunks matched.', true);
      return {
        status: 'success',
        findings: 'No strictly relevant lore detected for this query in the specified namespace.',
        namespace: params.namespace,
      };
    }

    const docs = results.documents[0] as string[];
    const metas = results.metadatas?.[0] ?? [];
    const dists = results.distances?.[0] as number[] | undefined;

    const findings = docs.map((doc, idx) => {
      const source = (metas[idx]?.source as string) || 'Unknown';
      const snippet = doc;
      const confidence = EventProducer.confidenceFromDistance(dists?.[idx]);
      EventProducer.loreCitation(source, snippet.slice(0, 2000), confidence);
      return `[Source: ${source}]\n${snippet}`;
    });

    EventProducer.toolCallEnd(
      toolName,
      `Returned ${findings.length} chunk(s) from ${params.namespace}.`,
      true
    );

    return {
      status: 'success',
      namespace: params.namespace,
      query: params.query,
      findings: findings.join('\n\n---\n\n'),
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`ChromaDB Lore Query Failed [${params.namespace}]:`, error);
    EventProducer.toolCallEnd(toolName, msg, false);
    return {
      status: 'error',
      reason: msg || 'Failed to connect to local Sovereign Chroma DB.',
    };
  }
}
