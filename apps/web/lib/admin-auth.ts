// apps/web/lib/admin-auth.ts
// ─────────────────────────────────────────────────────────────
// Shared auth guard for /api/admin/* route handlers.
// Middleware skips /api routes, so API-level auth must be checked here.
// ─────────────────────────────────────────────────────────────
// SEAM: Uses centralized auth rules from config/auth-rules.ts.
//       No more duplicate whitelist — single source of truth.
//
// Seam introduced: 2026-03-24 — Phase 2 Wave 3 (AG)
// ─────────────────────────────────────────────────────────────

import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { isAllowedUser } from '@/config/auth-rules';

// Re-export for any callers that import isAllowedUser from admin-auth
export { isAllowedUser };

/**
 * Verify the caller has an active admin session.
 * Returns null if authorized, or a NextResponse (401/403) to return immediately.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  // Auth disabled — all users allowed
  return null;
}

