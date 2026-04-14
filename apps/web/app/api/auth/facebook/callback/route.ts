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

  // Read the onboarding_source cookie to decide where to redirect back to.
  // If it's "amy", we came from Amy's onboarding page and should return
  // there instead of the default /admin/social landing.
  const cookieStore = cookies();
  const onboardingSource = cookieStore.get('onboarding_source')?.value;
  cookieStore.delete('onboarding_source');

  const destBase =
    onboardingSource === 'amy' ? '/admin/onboarding/amy' : '/admin/social';
  const destWith = (params: Record<string, string>) => {
    const u = new URL(destBase, base);
    for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v);
    return u;
  };

  if (err) {
    return NextResponse.redirect(destWith({ fb_error: err }));
  }

  const expected = cookieStore.get('fb_oauth_state')?.value;
  cookieStore.delete('fb_oauth_state');

  if (!code || !state || !expected || state !== expected) {
    return NextResponse.redirect(destWith({ fb_error: 'invalid_state' }));
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
      return NextResponse.redirect(destWith({ fb_error: msg }));
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
      return NextResponse.redirect(destWith({ fb_error: msg }));
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

    apiLog.info('facebook/callback', 'connected pages', {
      count: pagesJson.data.length,
      onboardingSource: onboardingSource ?? null,
    });
    return NextResponse.redirect(
      destWith({ fb_connected: '1', step: 'connect-meta', status: 'success' })
    );
  } catch (e) {
    apiLog.error('facebook/callback', 'handler error', e);
    return NextResponse.redirect(destWith({ fb_error: 'callback_failed' }));
  }
}
