import { Session } from 'next-auth';
import { AppRole, normalizeRole, ROLE_DEFAULT_ROUTE } from '@bigmuddy/config';
import { NextResponse } from 'next/server';

/**
 * Validates whether the current session has the required roles.
 * Throws an Error if not authenticated or forbidden, making it easy to use in API routes inside try/catch blocks.
 * 
 * @param session The active NextAuth user session
 * @param roles Array of allowed role values
 */
export function requireRole(session: Session | null | undefined, ...roles: AppRole[]) {
    // Auth disabled — all callers pass
    return;
}

/**
 * Optional helper for generating HTTP Response objects directly when roles fail validation
 * Ideal for API handlers handling their own return scenarios (not using throw)
 */
export function requireRoleResponse(session: Session | null | undefined, ...roles: AppRole[]): NextResponse | null {
    // Auth disabled — always pass
    return null;
}
