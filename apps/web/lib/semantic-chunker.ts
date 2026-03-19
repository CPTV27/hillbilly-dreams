// lib/semantic-chunker.ts
// Semantic sliding-window chunker for transcript/content vectorization
// Adapted from S2PX server/scripts/pull-transcripts.ts
// Used for: Blues Room session transcripts, artist interviews, meeting notes

/**
 * Chunk configuration.
 * CHUNK_SIZE: ~1500 chars (≈300 words) — fits well in embedding models
 * OVERLAP: ~200 chars — prevents context loss at chunk boundaries
 * The "rewind" technique: advance by (CHUNK_SIZE - OVERLAP) each step
 */
const DEFAULT_CHUNK_SIZE = 1500;
const DEFAULT_OVERLAP = 200;
const MIN_CHUNK_LENGTH = 50; // Skip trailing whitespace fragments

export interface TextChunk {
  id: number;
  text: string;
  startIndex: number;
  endIndex: number;
  wordCount: number;
}

/**
 * Split text into overlapping semantic chunks.
 *
 * The sliding window advances by (chunkSize - overlap) characters,
 * creating topological overlap that preserves context across boundaries.
 * No sentence is ever severed without the next chunk picking up the trailing context.
 *
 * @param text - Full transcript or content text
 * @param chunkSize - Characters per chunk (default 1500)
 * @param overlap - Characters of overlap between chunks (default 200)
 * @returns Array of chunks with metadata
 */
export function chunkText(
  text: string,
  chunkSize: number = DEFAULT_CHUNK_SIZE,
  overlap: number = DEFAULT_OVERLAP
): TextChunk[] {
  const chunks: TextChunk[] = [];
  let startIndex = 0;
  let chunkId = 0;

  while (startIndex < text.length) {
    const chunkText = text.slice(startIndex, startIndex + chunkSize);

    // Skip tiny trailing fragments
    if (chunkText.trim().length < MIN_CHUNK_LENGTH) break;

    chunks.push({
      id: chunkId,
      text: chunkText,
      startIndex,
      endIndex: Math.min(startIndex + chunkSize, text.length),
      wordCount: chunkText.split(/\s+/).filter(Boolean).length,
    });

    // Advance by (chunkSize - overlap) to create the rewind overlap
    startIndex += chunkSize - overlap;
    chunkId++;
  }

  return chunks;
}

/**
 * Chunk and generate embeddings for a transcript.
 * Uses Gemini embedding model via Vertex AI.
 *
 * @param text - Full transcript text
 * @param generateEmbedding - Embedding function (injected for flexibility)
 * @returns Array of chunks with their embedding vectors
 */
export async function chunkAndEmbed(
  text: string,
  generateEmbedding: (text: string) => Promise<number[]>,
  opts?: { chunkSize?: number; overlap?: number }
): Promise<Array<TextChunk & { vector: number[] }>> {
  const chunks = chunkText(text, opts?.chunkSize, opts?.overlap);

  const results = await Promise.all(
    chunks.map(async (chunk) => {
      const vector = await generateEmbedding(chunk.text);
      return { ...chunk, vector };
    })
  );

  console.log(
    `[chunker] ${text.length} chars → ${results.length} chunks ` +
      `(size=${opts?.chunkSize ?? DEFAULT_CHUNK_SIZE}, overlap=${opts?.overlap ?? DEFAULT_OVERLAP})`
  );

  return results;
}

/**
 * Pre-process a transcript: normalize whitespace, remove timestamps, clean speaker labels.
 * Call before chunking for cleaner embeddings.
 */
export function preprocessTranscript(raw: string): string {
  return (
    raw
      // Remove timestamp patterns like [00:14:32] or (14:32)
      .replace(/[\[(]\d{1,2}:\d{2}(:\d{2})?[\])]/g, '')
      // Normalize speaker labels: "CHASE PIERSON:" → "Chase Pierson:"
      .replace(/^([A-Z][A-Z\s]+):/gm, (_, name) =>
        name
          .split(' ')
          .map((w: string) => w.charAt(0) + w.slice(1).toLowerCase())
          .join(' ') + ':'
      )
      // Collapse multiple whitespace/newlines
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim()
  );
}
