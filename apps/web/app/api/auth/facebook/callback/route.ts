export const dynamic = 'force-dynamic';
// GET /api/auth/facebook/callback — exchange code, store page tokens on SocialAccount (#78).

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';
import { apiLog } from '@/lib/api-logger';

const GRAPH = 'https://graph.facebook.com/v21.0';

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  if (!appId || !appSecret) {
    return NextResponse.json({ error: 'META_APP_ID / META_APP_SECRET not configured' }, { status: 503 });
  }

  const base =
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
  if (!base) {
    return NextResponse.json({ error: 'NEXTAUTH_URL or VERCEL_URL required' }, { status: 503 });
  }
  const callbackUrl = `${base.replace(/\/$/, '')}/api/auth/facebook/callback`;

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const err = url.searchParams.get('error_description') || url.searchParams.get('error');

  if (err) {
    return NextResponse.redirect(new URL(`/admin/social?fb_error=${encodeURIComponent(err)}`, base));
  }

  const cookieStore = cookies();
  const expected = cookieStore.get('fb_oauth_state')?.value;
  cookieStore.delete('fb_oauth_state');

  if (!code || !state || !expected || state !== expected) {
    return NextResponse.redirect(new URL('/admin/social?fb_error=invalid_state', base));
  }

  try {
    const tokenParams = new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: callbackUrl,
      code,
    });
    const tokenRes = await fetch(`${GRAPH}/oauth/access_token?${tokenParams}`);
    const tokenJson = (await tokenRes.json()) as { access_token?: string; error?: { message?: string } };
    if (!tokenRes.ok || !tokenJson.access_token) {
      const msg = tokenJson.error?.message || 'token_exchange_failed';
      return NextResponse.redirect(new URL(`/admin/social?fb_error=${encodeURIComponent(msg)}`, base));
    }

    let longToken = tokenJson.access_token;
    const extendUrl = new URL(`${GRAPH}/oauth/access_token`);
    extendUrl.searchParams.set('grant_type', 'fb_exchange_token');
    extendUrl.searchParams.set('client_id', appId);
    extendUrl.searchParams.set('client_secret', appSecret);
    extendUrl.searchParams.set('fb_exchange_token', longToken);
    const extendRes = await fetch(extendUrl);
    const extendJson = (await extendRes.json()) as { access_token?: string };
    if (extendRes.ok && extendJson.access_token) {
      longToken = extendJson.access_token;
    }

    const pagesRes = await fetch(
      `${GRAPH}/me/accounts?fields=id,name,access_token&access_token=${encodeURIComponent(longToken)}`,
    );
    const pagesJson = (await pagesRes.json()) as {
      data?: Array<{ id: string; name: string; access_token: string }>;
      error?: { message?: string };
    };

    if (!pagesRes.ok || !pagesJson.data?.length) {
      const msg = pagesJson.error?.message || 'no_pages';
      return NextResponse.redirect(new URL(`/admin/social?fb_error=${encodeURIComponent(msg)}`, base));
    }

    for (const page of pagesJson.data) {
      const handle = `page-${page.id}`;
      await prisma.socialAccount.upsert({
        where: { platform_handle: { platform: 'facebook', handle } },
        create: {
          platform: 'facebook',
          handle,
          brand: 'bigmuddy',
          status: 'active',
          platformId: page.id,
          accessToken: page.access_token,
          notes: page.name,
        },
        update: {
          accessToken: page.access_token,
          platformId: page.id,
          status: 'active',
          notes: page.name,
        },
      });
    }

    apiLog.info('facebook/callback', 'connected pages', { count: pagesJson.data.length });
    return NextResponse.redirect(new URL('/admin/social?fb_connected=1', base));
  } catch (e) {
    apiLog.error('facebook/callback', 'handler error', e);
    return NextResponse.redirect(new URL('/admin/social?fb_error=callback_failed', base));
  }
}
