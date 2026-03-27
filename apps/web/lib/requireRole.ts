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
    if (!session?.user) {
        throw new Error('Not authenticated');
    }

    if (!roles.includes(normalizeRole((session.user as any).role as string))) {
        throw new Error('Forbidden');
    }
}

/**
 * Optional helper for generating HTTP Response objects directly when roles fail validation
 * Ideal for API handlers handling their own return scenarios (not using throw)
 */
export function requireRoleResponse(session: Session | null | undefined, ...roles: AppRole[]): NextResponse | null {
    if (!session?.user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!roles.includes(normalizeRole((session.user as any).role as string))) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return null;
}
