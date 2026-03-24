// packages/config/types.ts
// BMT-specific domain types for the Big Muddy platform
// Platform-generic types live in platform-types.ts

// Re-export platform generics for backward compatibility
export type {
  ApiError,
  ApiSuccess,
  PaginatedResponse,
  KpiTile,
  UserRole,
  User,
  Nullable,
  Optional,
  MaybeNull,
} from './platform-types';

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
// CLIENT MANAGEMENT (Media-as-a-Service)
// ─────────────────────────────────────────────────────────────

export type ClientTier = 'front-porch' | 'route' | 'river-room' | 'blues-room';
export type ClientStatus = 'onboarding' | 'active' | 'paused' | 'churned';
export type BusinessType = 'restaurant' | 'venue' | 'hotel' | 'shop' | 'tour' | 'service' | 'other';

export interface Client {
  id: number;
  name: string;
  slug: string;
  tier: ClientTier | string;
  businessType: BusinessType | string;
  city: string;
  state: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  description?: string | null;
  voiceProfile?: Record<string, unknown> | null;
  platforms: string[];
  gbpPlaceId?: string | null;
  gbpUrl?: string | null;
  stripeCustomerId?: string | null;
  logoUrl?: string | null;
  heroImageUrl?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  notes?: string | null;
  status: ClientStatus | string;
  onboardedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Virtual fields
  _count?: { accounts?: number; reviews?: number; reports?: number };
}

export type ReviewResponseStatus = 'pending' | 'drafted' | 'approved' | 'posted' | 'skipped';

export interface Review {
  id: number;
  clientId: number;
  platform: string;
  externalId: string;
  author: string;
  rating: number;
  text?: string | null;
  response?: string | null;
  responseStatus: ReviewResponseStatus | string;
  aiDraft?: string | null;
  postedAt: Date | string;
  respondedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  client?: Client;
}

export type CalendarStatus = 'draft' | 'review' | 'approved' | 'active' | 'completed';

export interface ContentCalendar {
  id: number;
  clientId: number;
  month: number;
  year: number;
  posts: Array<{
    content: string;
    platform: string;
    scheduledDate: string;
    status: string;
    mediaUrl?: string;
    hashtags?: string[];
  }>;
  status: CalendarStatus | string;
  generatedAt: Date | string;
  approvedAt?: Date | string | null;
  approvedBy?: string | null;
  notes?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  client?: Client;
}

export interface Report {
  id: number;
  clientId: number;
  month: number;
  year: number;
  data: Record<string, unknown>;
  summary?: string | null;
  pdfUrl?: string | null;
  sentAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  client?: Client;
}

export interface Invoice {
  id: number;
  clientId: number;
  stripeInvoiceId?: string | null;
  amount: number;
  currency: string;
  status: string;
  periodStart: Date | string;
  periodEnd: Date | string;
  paidAt?: Date | string | null;
  dueDate?: Date | string | null;
  pdfUrl?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  client?: Client;
}

export type PublishJobStatus = 'pending' | 'processing' | 'published' | 'failed' | 'cancelled';

export interface PublishJob {
  id: number;
  postId: number;
  platform: string;
  status: PublishJobStatus | string;
  externalId?: string | null;
  externalUrl?: string | null;
  error?: string | null;
  attempts: number;
  scheduledAt?: Date | string | null;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ─────────────────────────────────────────────────────────────
// PUBLICATIONS (Books, Zines, Print)
// ─────────────────────────────────────────────────────────────

export type PublicationCategory = 'book' | 'zine' | 'print' | 'catalog';
export type PublicationFormat = 'hardcover' | 'softcover' | 'digital' | 'limited-edition';
export type PublicationStatus = 'draft' | 'production' | 'preorder' | 'available' | 'sold-out' | 'archived';

export interface Publication {
  id: number;
  title: string;
  slug: string;
  subtitle?: string | null;
  author: string;
  description?: string | null;
  longDescription?: string | null;
  category: PublicationCategory | string;
  format: PublicationFormat | string;
  pageCount?: number | null;
  dimensions?: string | null;
  isbn?: string | null;
  price?: number | null;
  currency: string;
  coverImageUrl?: string | null;
  backCoverUrl?: string | null;
  previewImages: string[];
  printPartner?: string | null;
  printUrl?: string | null;
  shopifyUrl?: string | null;
  status: PublicationStatus | string;
  edition?: string | null;
  printRun?: number | null;
  soldCount: number;
  relatedCity?: string | null;
  tags: string[];
  publishedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Tier configuration for pricing/features
export const CLIENT_TIERS: Record<ClientTier, {
  label: string;
  price: number; // Monthly price in dollars
  postsPerMonth: number;
  platforms: number;
  imagesPerMonth: number;
  videosPerMonth: number;
  features: string[];
}> = {
  'front-porch': {
    label: 'Front Porch',
    price: 99,
    postsPerMonth: 12,
    platforms: 1,
    imagesPerMonth: 0,
    videosPerMonth: 0,
    features: ['GBP optimization', 'Monthly report', 'Magazine directory listing'],
  },
  'route': {
    label: 'The Route',
    price: 299,
    postsPerMonth: 30,
    platforms: 3,
    imagesPerMonth: 4,
    videosPerMonth: 0,
    features: ['Review response management', 'Bi-weekly newsletter', 'Basic website', 'Quarterly strategy call', 'Magazine features'],
  },
  'river-room': {
    label: 'River Room',
    price: 599,
    postsPerMonth: 60,
    platforms: 6,
    imagesPerMonth: 8,
    videosPerMonth: 2,
    features: ['Full review management', 'Weekly email', 'Event promotion', 'Dedicated magazine page', 'Monthly strategy call'],
  },
  'blues-room': {
    label: 'The Blues Room',
    price: 1200,
    postsPerMonth: 100,
    platforms: 6,
    imagesPerMonth: 20,
    videosPerMonth: 4,
    features: ['Custom strategy', 'Professional photography', 'Long-form video', 'Managed ads', 'PR outreach', 'White-label dashboard', 'Co-branded events'],
  },
};

// ─────────────────────────────────────────────────────────────
// API / PAGINATION / USER / UTILITY TYPES
// (Canonical source: platform-types.ts — re-exported above)
// ─────────────────────────────────────────────────────────────

// MetricKey uses BMT-specific KPI names
export interface MetricKey {
  newsletter_subscribers: number;
  inn_occupancy_rate: number;
  spotify_followers: number;
  articles_published: number;
  upcoming_events: number;
  google_review_rating: number;
}
