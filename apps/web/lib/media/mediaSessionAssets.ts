/**
 * Media Engine — link radio/studio `MediaSession` rows to `VisualAsset` and Network Highlight copy.
 * Call after ingest/transcription produces a hero frame or placeholder URL.
 */
import type { Prisma } from '@prisma/client';
import { prisma } from '@bigmuddy/database';

export type NetworkHighlightInput = {
  snippet: string;
  /** Optional still or short clip URL (GCS/R2) attached as a `VisualAsset` without an editorial `Job`. */
  heroImageUrl?: string | null;
  aiPlaceholderUrl?: string | null;
  status?: 'highlight_ready' | 'published';
};

/**
 * Persists highlight copy and optionally creates a `VisualAsset` tied only to the session.
 */
export async function applyNetworkHighlight(
  mediaSessionId: string,
  input: NetworkHighlightInput
): Promise<{ sessionId: string; visualAssetId?: string }> {
  const data: Prisma.MediaSessionUpdateInput = {
    networkHighlightSnippet: input.snippet,
    status: input.status ?? 'highlight_ready',
  };

  if (input.heroImageUrl || input.aiPlaceholderUrl) {
    data.visualAssets = {
      create: {
        finalPhotographyUrl: input.heroImageUrl ?? undefined,
        aiPlaceholderUrl: input.aiPlaceholderUrl ?? undefined,
      },
    };
  }

  const session = await prisma.mediaSession.update({
    where: { id: mediaSessionId },
    data,
    select: {
      id: true,
      visualAssets: { orderBy: { createdAt: 'desc' }, take: 1, select: { id: true } },
    },
  });

  const visualAssetId = session.visualAssets[0]?.id;
  return { sessionId: session.id, visualAssetId };
}
