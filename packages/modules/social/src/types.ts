// packages/modules/social/src/types.ts

export type Platform =
  | 'instagram'
  | 'instagram_reels'
  | 'tiktok'
  | 'facebook'
  | 'x'
  | 'bluesky'
  | 'linkedin';

export type Brand =
  | 'inn'
  | 'magazine'
  | 'touring'
  | 'records'
  | 'radio'
  | 'cpp'
  | 'tuthill'
  | 'studio-c';

export interface VoiceProfile {
  brand: Brand;
  /** Short label shown in admin UI. */
  label: string;
  /** Human-readable description of the voice. */
  description: string;
  /** Base system prompt segment that gets injected into AI calls. */
  systemPromptSegment: string;
  /** Audience profile in 1 sentence. */
  audience: string;
  /** Phrases the voice never uses (regex-blocked at output time). */
  forbiddenPhrases: string[];
  /** Brands whose voice MUST NOT mix with this one. */
  incompatibleWith: Brand[];
}

export interface PublishInput {
  brand: Brand;
  platform: Platform;
  destinationAccountId: string;
  caption: string;
  mediaUrls?: string[];
  scheduledFor?: Date;
  metadata?: Record<string, unknown>;
}

export interface PublishResult {
  postId?: string;
  scheduledId?: string;
  url?: string;
  platform: Platform;
  publishedAt?: Date;
}
