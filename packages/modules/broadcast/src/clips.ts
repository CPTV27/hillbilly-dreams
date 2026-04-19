// packages/modules/broadcast/src/clips.ts
// BroadcastClip CRUD + lifecycle. Clips originate from the Mac mini agent
// (raw status), get AI-enriched (caption + voice profile), then republished
// to social or appended to podcast highlights.

import { prisma } from '@bigmuddy/database';
import type { BroadcastClip, IngestClipInput, ClipStatus } from './types';

export async function list(opts?: {
  broadcastId?: string;
  status?: ClipStatus;
  voiceProfile?: string;
}): Promise<BroadcastClip[]> {
  return prisma.broadcastClip.findMany({
    where: {
      ...(opts?.broadcastId && { broadcastId: opts.broadcastId }),
      ...(opts?.status && { status: opts.status }),
      ...(opts?.voiceProfile && { voiceProfile: opts.voiceProfile }),
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function get(id: string): Promise<BroadcastClip | null> {
  return prisma.broadcastClip.findUnique({ where: { id } });
}

/**
 * Mac mini agent calls this after uploading the clip to GCS.
 * Status starts at 'raw' — AI enrichment cron picks up later.
 */
export async function ingest(input: IngestClipInput): Promise<BroadcastClip> {
  return prisma.broadcastClip.create({
    data: {
      broadcastId: input.broadcastId,
      sequence: input.sequence,
      startSec: input.startSec,
      endSec: input.endSec,
      videoUrl: input.videoUrl,
      thumbnailUrl: input.thumbnailUrl ?? null,
      status: 'raw',
    },
  });
}

export async function enrich(
  id: string,
  enrichment: { caption: string; voiceProfile: string; thumbnailUrl?: string }
): Promise<BroadcastClip> {
  return prisma.broadcastClip.update({
    where: { id },
    data: {
      caption: enrichment.caption,
      voiceProfile: enrichment.voiceProfile,
      ...(enrichment.thumbnailUrl && { thumbnailUrl: enrichment.thumbnailUrl }),
      status: 'enriched',
    },
  });
}

export async function recordPublished(
  id: string,
  destination: { platform: string; postId: string; url: string }
): Promise<BroadcastClip> {
  const clip = await prisma.broadcastClip.findUnique({ where: { id } });
  if (!clip) throw new Error(`Clip not found: ${id}`);
  const previous = (clip.publishedTo as Array<Record<string, unknown>>) ?? [];
  const updated = [...previous, { ...destination, at: new Date().toISOString() }];
  return prisma.broadcastClip.update({
    where: { id },
    data: {
      publishedTo: updated as never,
      status: 'published',
    },
  });
}

export async function reject(id: string, reason?: string): Promise<BroadcastClip> {
  return prisma.broadcastClip.update({
    where: { id },
    data: {
      status: 'rejected',
      caption: reason ? `[REJECTED] ${reason}` : '[REJECTED]',
    },
  });
}

/**
 * Clips ready for re-publish — enriched, vertical-aspect-suitable, not yet
 * pushed to a given platform.
 */
export async function listForRepublish(
  platform: string
): Promise<BroadcastClip[]> {
  const enriched = await prisma.broadcastClip.findMany({
    where: { status: 'enriched' },
  });
  return enriched.filter((c) => {
    const destinations = (c.publishedTo as Array<{ platform: string }>) ?? [];
    return !destinations.some((d) => d.platform === platform);
  });
}
