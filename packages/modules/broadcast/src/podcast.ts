// packages/modules/broadcast/src/podcast.ts
// PodcastShow + PodcastEpisode CRUD.

import { prisma } from '@bigmuddy/database';
import type {
  PodcastShow,
  PodcastEpisode,
  CreatePodcastShowInput,
  CreatePodcastEpisodeInput,
  Brand,
} from './types';

export async function listShows(opts?: {
  brand?: Brand;
}): Promise<PodcastShow[]> {
  return prisma.podcastShow.findMany({
    where: { ...(opts?.brand && { brand: opts.brand }) },
    orderBy: { title: 'asc' },
  });
}

export async function getShow(id: string): Promise<PodcastShow | null> {
  return prisma.podcastShow.findUnique({ where: { id } });
}

export async function getShowBySlug(slug: string): Promise<PodcastShow | null> {
  return prisma.podcastShow.findUnique({ where: { slug } });
}

export async function createShow(
  input: CreatePodcastShowInput
): Promise<PodcastShow> {
  return prisma.podcastShow.create({
    data: {
      slug: input.slug,
      title: input.title,
      description: input.description,
      brand: input.brand,
      authorName: input.authorName,
      authorEmail: input.authorEmail,
      artworkUrl: input.artworkUrl,
      category: input.category,
      language: input.language ?? 'en-us',
      explicit: input.explicit ?? false,
    },
  });
}

export async function setShowBuzzsproutId(
  id: string,
  buzzsproutId: string
): Promise<PodcastShow> {
  return prisma.podcastShow.update({
    where: { id },
    data: { buzzsproutId },
  });
}

export async function listEpisodes(
  showId: string,
  opts?: { publishedOnly?: boolean }
): Promise<PodcastEpisode[]> {
  return prisma.podcastEpisode.findMany({
    where: {
      showId,
      ...(opts?.publishedOnly && { publishedAt: { lte: new Date() } }),
    },
    orderBy: [{ seasonNumber: 'desc' }, { episodeNumber: 'desc' }],
  });
}

export async function getEpisode(id: string): Promise<PodcastEpisode | null> {
  return prisma.podcastEpisode.findUnique({ where: { id } });
}

export async function createEpisode(
  input: CreatePodcastEpisodeInput
): Promise<PodcastEpisode> {
  return prisma.podcastEpisode.create({
    data: {
      showId: input.showId,
      episodeNumber: input.episodeNumber,
      seasonNumber: input.seasonNumber ?? null,
      title: input.title,
      description: input.description,
      audioUrl: input.audioUrl,
      audioDurationSec: input.audioDurationSec,
      audioSizeBytes: input.audioSizeBytes,
      audioMimeType: input.audioMimeType ?? 'audio/mpeg',
      publishedAt: input.publishedAt ?? null,
      sourceClipIds: input.sourceClipIds ?? [],
      transcript: input.transcript ?? null,
    },
  });
}

export async function setEpisodeBuzzsproutId(
  id: string,
  buzzsproutEpisodeId: string
): Promise<PodcastEpisode> {
  return prisma.podcastEpisode.update({
    where: { id },
    data: { buzzsproutEpisodeId },
  });
}

export async function publishEpisode(
  id: string,
  publishedAt: Date = new Date()
): Promise<PodcastEpisode> {
  return prisma.podcastEpisode.update({
    where: { id },
    data: { publishedAt },
  });
}

/**
 * Episodes that are published (publishedAt <= now) but haven't yet been
 * synced to Buzzsprout. Used by the Buzzsprout sync cron.
 */
export async function pendingBuzzsproutSync(): Promise<PodcastEpisode[]> {
  return prisma.podcastEpisode.findMany({
    where: {
      publishedAt: { lte: new Date(), not: null },
      buzzsproutEpisodeId: null,
    },
    include: { show: true },
  });
}
