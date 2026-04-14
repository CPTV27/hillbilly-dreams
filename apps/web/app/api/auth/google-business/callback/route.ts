export const dynamic = 'force-dynamic';
// GET /api/auth/google-business/callback — exchange code, fetch locations, store tokens on SocialAccount.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { apiLog } from '@/lib/api-logger';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GBP_API = 'https://mybusiness.googleapis.com/v4';
const ACCOUNT_MGMT_API = 'https://mybusinessaccountmanagement.googleapis.com/v1';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET not configured' }, { status: 503 });
  }

  const base =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
  if (!base) {
    return NextResponse.json({ error: 'NEXTAUTH_URL or VERCEL_URL required' }, { status: 503 });
  }
  const callbackUrl = `${base.replace(/\/$/, '')}/api/auth/google-business/callback`;

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const err = url.searchParams.get('error');

  if (err) {
    return NextResponse.redirect(new URL(`/admin/social?gbp_error=${encodeURIComponent(err)}`, base));
  }

  const cookieStore = await cookies();
  const expected = cookieStore.get('gbp_oauth_state')?.value;
  cookieStore.delete('gbp_oauth_state');

  if (!code || !state || !expected || state !== expected) {
    return NextResponse.redirect(new URL('/admin/social?gbp_error=invalid_state', base));
  }

  try {
    // Exchange authorization code for tokens
    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: callbackUrl,
        grant_type: 'authorization_code',
      }).toString(),
    });

    const tokenJson = (await tokenRes.json()) as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      error?: string;
      error_description?: string;
    };

    if (!tokenRes.ok || !tokenJson.access_token) {
      const msg = tokenJson.error_description || tokenJson.error || 'token_exchange_failed';
      apiLog.error('google-business/callback', 'token exchange failed', { error: msg });
      return NextResponse.redirect(new URL(`/admin/social?gbp_error=${encodeURIComponent(msg)}`, base));
    }

    const accessToken = tokenJson.access_token;
    const refreshToken = tokenJson.refresh_token;
    const tokenExpiry = tokenJson.expires_in
      ? new Date(Date.now() + tokenJson.expires_in * 1000)
      : null;

    // Fetch GBP accounts
    const accountsRes = await fetch(`${ACCOUNT_MGMT_API}/accounts`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const accountsJson = (await accountsRes.json()) as {
      accounts?: Array<{ name: string }>;
      error?: { message?: string };
    };

    if (!accountsRes.ok || !accountsJson.accounts?.length) {
      const msg = accountsJson.error?.message || 'no_gbp_accounts';
      apiLog.warn('google-business/callback', 'no accounts found', { error: msg });
      return NextResponse.redirect(new URL(`/admin/social?gbp_error=${encodeURIComponent(msg)}`, base));
    }

    // For each account, fetch locations and create SocialAccount records
    let totalLocations = 0;

    for (const account of accountsJson.accounts) {
      const locationsRes = await fetch(`${GBP_API}/${account.name}/locations?readMask=name,title,storefrontAddress`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const locationsJson = (await locationsRes.json()) as {
        locations?: Array<{ name: string; title: string }>;
      };

      if (!locationsJson.locations?.length) continue;

      for (const location of locationsJson.locations) {
        const handle = `gbp-${location.name.replace(/\//g, '-')}`;

        await prisma.socialAccount.upsert({
          where: { platform_handle: { platform: 'google_business', handle } },
          create: {
            platform: 'google_business',
            handle,
            brand: 'bigmuddy',
            status: 'active',
            platformId: location.name,
            accessToken,
            refreshToken: refreshToken || null,
            tokenExpiry,
            notes: location.title,
          },
          update: {
            accessToken,
            refreshToken: refreshToken || undefined,
            tokenExpiry,
            platformId: location.name,
            status: 'active',
            notes: location.title,
          },
        });
        totalLocations++;
      }
    }

    if (totalLocations === 0) {
      return NextResponse.redirect(new URL('/admin/social?gbp_error=no_locations', base));
    }

    apiLog.info('google-business/callback', 'connected locations', { count: totalLocations });
    return NextResponse.redirect(new URL('/admin/social?gbp_connected=1', base));
  } catch (e) {
    apiLog.error('google-business/callback', 'handler error', e);
    return NextResponse.redirect(new URL('/admin/social?gbp_error=callback_failed', base));
  }
}
