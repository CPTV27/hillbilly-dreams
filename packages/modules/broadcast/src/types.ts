// packages/modules/broadcast/src/types.ts
import type {
  PodcastShow as PrismaPodcastShow,
  PodcastEpisode as PrismaPodcastEpisode,
  LiveBroadcast as PrismaLiveBroadcast,
  BroadcastClip as PrismaBroadcastClip,
} from '@prisma/client';

export type PodcastShow = PrismaPodcastShow;
export type PodcastEpisode = PrismaPodcastEpisode;
export type LiveBroadcast = PrismaLiveBroadcast;
export type BroadcastClip = PrismaBroadcastClip;

export type Brand = 'radio' | 'magazine' | 'inn';

export type BroadcastStatus = 'scheduled' | 'live' | 'ended' | 'aborted';
export type ClipStatus = 'raw' | 'enriched' | 'published' | 'rejected';

export interface CreatePodcastShowInput {
  slug: string;
  title: string;
  description: string;
  brand: Brand;
  authorName: string;
  authorEmail: string;
  artworkUrl: string;
  category: string;
  language?: string;
  explicit?: boolean;
}

export interface CreatePodcastEpisodeInput {
  showId: string;
  episodeNumber: number;
  seasonNumber?: number;
  title: string;
  description: string;
  audioUrl: string;
  audioDurationSec: number;
  audioSizeBytes: number;
  audioMimeType?: string;
  publishedAt?: Date;
  sourceClipIds?: string[];
  transcript?: string;
}

export interface ScheduleBroadcastInput {
  brand: Brand;
  title: string;
  description: string;
  scheduledStart: Date;
  scheduledEnd: Date;
  platform?: string;
  obsScene?: string;
  cameras?: Array<{ name: string; rtmpKey?: string; position?: string }>;
  hostUserIds?: string[];
  associatedShowId?: string;
}

export interface IngestClipInput {
  broadcastId: string;
  sequence: number;
  startSec: number;
  endSec: number;
  videoUrl: string;
  thumbnailUrl?: string;
}

/** Mac mini agent → server protocol */
export interface AgentInstruction {
  id: string;
  type:
    | 'start_scene'
    | 'stop_scene'
    | 'extract_clip'
    | 'push_thumbnail'
    | 'noop';
  payload: Record<string, unknown>;
  issuedAt: string; // ISO
}

export interface AgentAck {
  instructionId: string;
  success: boolean;
  result?: Record<string, unknown>;
  error?: string;
  completedAt: string;
}
