export const dynamic = 'force-dynamic';
// GET /api/auth/google-business/connect — start Google Business Profile OAuth.
// Grants access to reviews, posts, and location data via the GBP API.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { requireAdmin } from '@/lib/admin-auth';

const GOOGLE_AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
].join(' ');

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: 'GOOGLE_CLIENT_ID not configured' }, { status: 503 });
  }

  const base =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
  if (!base) {
    return NextResponse.json({ error: 'NEXTAUTH_URL or VERCEL_URL required for redirect' }, { status: 503 });
  }

  const callbackUrl = `${base.replace(/\/$/, '')}/api/auth/google-business/callback`;
  const state = randomBytes(24).toString('hex');
  const cookieStore = await cookies();
  cookieStore.set('gbp_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });

  const url = new URL(GOOGLE_AUTH);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', callbackUrl);
  url.searchParams.set('scope', SCOPES);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');
  url.searchParams.set('state', state);

  return NextResponse.redirect(url.toString());
}
