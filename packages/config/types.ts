// packages/config/types.ts
// Shared TypeScript types for the Big Muddy platform

// ─────────────────────────────────────────────────────────────
// CONTENT TYPES
// ─────────────────────────────────────────────────────────────

export type ArticleStatus = 'draft' | 'review' | 'published';
export type ArticleCategory =
  | 'city-guide'
  | 'feature'
  | 'photo-essay'
  | 'interview'
  | 'food-drink'
  | 'music'
  | 'case-study';

export type ArticleCity =
  | 'memphis'
  | 'clarksdale'
  | 'vicksburg'
  | 'natchez'
  | 'st-francisville'
  | 'baton-rouge'
  | 'new-orleans'
  | 'lafayette'
  | 'alexandria'
  | 'monroe'
  | 'ruston'
  | 'natchitoches'
  | 'shreveport'
  | 'el-dorado'
  | 'little-rock'
  | 'fayetteville'
  | 'bentonville'
  | 'branson'
  | 'other';

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: ArticleCategory | string;
  city?: ArticleCity | string | null;
  author: string;
  status: ArticleStatus | string;
  excerpt?: string | null;
  body?: string | null;
  heroImage?: string | null;
  readTime?: string | null;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;

  // S2PX Bridge Provenance
  sourceSystem?: string | null;
  sourceProjectId?: string | null;
  sourceSyncedAt?: Date | string | null;
}

export type PlaylistStatus = 'active' | 'archived';

export interface Playlist {
  id: number;
  name: string;
  description?: string | null;
  trackCount: number;
  spotifyUrl?: string | null;
  coverImage?: string | null;
  status: PlaylistStatus | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type EventStatus = 'upcoming' | 'sold-out' | 'cancelled' | 'completed';

export interface Event {
  id: number;
  name: string;
  date: Date | string;
  time?: string | null;
  artist?: string | null;
  description?: string | null;
  price?: string | null;
  capacity: number;
  status: EventStatus | string;
  stream: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type NewsletterStatus = 'draft' | 'scheduled' | 'sent';

export interface NewsletterIssue {
  id: number;
  issueNumber: number;
  subject: string;
  storyTitle?: string | null;
  storyBody?: string | null;
  playlist?: string | null;
  reason?: string | null;
  quickHits?: string | null;
  status: NewsletterStatus | string;
  sendDate?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type ContactCategory =
  | 'artist'
  | 'vendor'
  | 'media'
  | 'partner'
  | 'guest'
  | 'team';

export interface Contact {
  id: number;
  name: string;
  role?: string | null;
  organization?: string | null;
  email?: string | null;
  phone?: string | null;
  category?: ContactCategory | string | null;
  notes?: string | null;
  lastContact?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type MetricSource = 'beehiiv' | 'cloudbeds' | 'spotify' | 'manual';

export interface Metric {
  id: number;
  key: string;
  value: number;
  target?: number | null;
  label?: string | null;
  unit?: string | null;
  source?: MetricSource | string | null;
  updatedAt: Date | string;
}

// ─────────────────────────────────────────────────────────────
// BRIDGE CLIENTS (Multi-Tenant CaaS)
// ─────────────────────────────────────────────────────────────

export type BridgeClientStatus = 'active' | 'suspended';

export interface BridgeClient {
  id: number;
  name: string;
  apiKey: string;
  apiSecret: string; // Only returned on creation (masked otherwise)
  status: BridgeClientStatus | string;
  allowedCategories: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  lastSyncAt?: Date | string | null;
  // Virtual field for list view
  articleCount?: number;
}

// ─────────────────────────────────────────────────────────────
// API RESPONSE TYPES
// ─────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  message?: string;
  code?: string;
}

export interface ApiSuccess<T = unknown> {
  data: T;
  message?: string;
}

// ─────────────────────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD / METRICS
// ─────────────────────────────────────────────────────────────

export interface MetricKey {
  newsletter_subscribers: number;
  inn_occupancy_rate: number;
  spotify_followers: number;
  articles_published: number;
  upcoming_events: number;
  google_review_rating: number;
}

export interface KpiTile {
  key: string;
  label: string;
  value: number | string;
  target?: number;
  unit?: string;
  source?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

// ─────────────────────────────────────────────────────────────
// USER / AUTH
// ─────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'ops' | 'artist' | 'viewer';

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// ─────────────────────────────────────────────────────────────
// UTILITY TYPES
// ─────────────────────────────────────────────────────────────

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type MaybeNull<T> = T | null | undefined;
