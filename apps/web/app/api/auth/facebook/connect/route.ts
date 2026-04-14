export const dynamic = 'force-dynamic';
// GET /api/auth/facebook/connect — start Facebook Login for Pages (#78).

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { requireAdmin } from '@/lib/admin-auth';

const FB_API = 'https://www.facebook.com/v21.0/dialog/oauth';
const SCOPES = ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts'].join(',');

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const appId = process.env.META_APP_ID;
  if (!appId) {
    return NextResponse.json({ error: 'META_APP_ID not configured' }, { status: 503 });
  }

  const base =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
  if (!base) {
    return NextResponse.json({ error: 'NEXTAUTH_URL or VERCEL_URL required for redirect' }, { status: 503 });
  }

  const callbackUrl = `${base.replace(/\/$/, '')}/api/auth/facebook/callback`;
  const state = randomBytes(24).toString('hex');
  const cookieStore = cookies();
  cookieStore.set('fb_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });

  // If the connect was kicked off from Amy's onboarding flow, stash a
  // marker cookie so the callback redirects back to /admin/onboarding/amy
  // instead of the default /admin/social page.
  const onboardingSource = request.nextUrl.searchParams.get('onboarding');
  if (onboardingSource === 'amy') {
    cookieStore.set('onboarding_source', 'amy', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600,
      path: '/',
    });
  }

  const url = new URL(FB_API);
  url.searchParams.set('client_id', appId);
  url.searchParams.set('redirect_uri', callbackUrl);
  url.searchParams.set('scope', SCOPES);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('state', state);

  return NextResponse.redirect(url.toString());
}
