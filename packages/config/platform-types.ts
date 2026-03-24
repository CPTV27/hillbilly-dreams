// packages/config/platform-types.ts
// ─────────────────────────────────────────────────────────────
// Platform-Portable Type Definitions
// ─────────────────────────────────────────────────────────────
// These types are tenant-agnostic — usable by any HDX sovereign.
// BMT-specific domain types remain in types.ts.
//
// Split: 2026-03-24 (AG)
// ─────────────────────────────────────────────────────────────

// ─── API Response ────────────────────────────────────────────

export interface ApiError {
  error: string;
  message?: string;
  code?: string;
}

export interface ApiSuccess<T = unknown> {
  data: T;
  message?: string;
}

// ─── Pagination ──────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ─── Dashboard / KPI ─────────────────────────────────────────

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

// ─── User / Auth ─────────────────────────────────────────────

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

// ─── Utility Types ───────────────────────────────────────────

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type MaybeNull<T> = T | null | undefined;
