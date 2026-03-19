// apps/web/middleware.ts
// Multi-tenant hostname routing + admin auth protection
// Reads the Host header and rewrites the URL to the correct route group.
// Admin routes require Google OAuth authentication via NextAuth.
//
// NOTE: We use getToken() instead of auth() wrapper because NextResponse.rewrite()
// inside auth() causes 401 errors on Firebase App Hosting (Cloud Run envoy proxy).

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Firebase App Hosting may use different forwarded-host headers
  const hostname = request.headers.get('x-forwarded-host')
    || request.headers.get('x-fah-host')
    || request.headers.get('x-original-host')
    || request.headers.get('host')
    || request.nextUrl.hostname
    || '';
  const pathname = request.nextUrl.pathname;

  // Helper: build a rewrite path, avoiding double/trailing slashes
  const rewriteTo = (prefix: string, path: string) => {
    const normalized = path === '/' ? '' : path;
    return NextResponse.rewrite(new URL(`/${prefix}${normalized}`, request.url));
  };

  // www → apex redirect (301 permanent) — canonical URL for SEO
  if (hostname.startsWith('www.')) {
    const url = new URL(request.url);
    url.host = hostname.replace(/^www\./, '');
    return NextResponse.redirect(url, 301);
  }

  // Skip rewrites for API routes, Next.js internals, and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Login page is always accessible without auth
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Helper: check if the user is authenticated (reads JWT from cookies)
  const getSession = async () => {
    try {
      return await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
    } catch {
      return null;
    }
  };

  // Helper: redirect to login if not authenticated
  const redirectToLogin = () => {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  };

  // If the path already starts with a known brand prefix, pass through
  // without rewriting. Admin and ops routes require authentication.
  const brandPrefixes = ['/touring', '/magazine', '/radio', '/economics', '/media', '/admin', '/ops', '/portal', '/platform', '/gallery', '/records', '/studio', '/tuthill'];
  if (brandPrefixes.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/ops')) {
      const token = await getSession();
      if (!token) return redirectToLogin();
    }
    return NextResponse.next();
  }

  // ── Public domains: route by hostname FIRST ──
  // Must run before admin path detection so that e.g.
  // bigmuddymagazine.com/articles/slug → /magazine/articles/slug
  // instead of being intercepted as an admin /articles path.

  // Production domains
  if (hostname.includes('bigmuddytouring') && !hostname.includes('admin')) {
    return rewriteTo('touring', pathname);
  }

  if (hostname.includes('bigmuddymagazine')) {
    return rewriteTo('magazine', pathname);
  }

  if (hostname.includes('bigmuddyradio')) {
    return rewriteTo('radio', pathname);
  }

  if ((hostname.includes('deepsouthdirectory') || hostname.includes('bigmuddymedia')) && !hostname.includes('admin')) {
    return rewriteTo('media', pathname);
  }

  if (hostname.includes('outsidereconomics')) {
    return NextResponse.rewrite(
      new URL('/economics' + pathname, request.url)
    );
  }

  if (hostname.includes('buycurious') || hostname.includes('buycuriousart')) {
    return rewriteTo('gallery', pathname);
  }

  if (hostname.includes('bigmuddyrecord')) {
    return rewriteTo('records', pathname);
  }

  if (hostname.includes('superchase')) {
    return rewriteTo('platform', pathname);
  }

  if (hostname.includes('studiocvideo') || hostname.includes('studio-c') || hostname.includes('studioc.video')) {
    return rewriteTo('studio', pathname);
  }

  if (hostname.includes('tuthilldesign')) {
    return rewriteTo('tuthill', pathname);
  }

  // Local development .local domains
  if (hostname.includes('bigmuddytouring.local') && !hostname.includes('admin')) {
    return rewriteTo('touring', pathname);
  }

  if (hostname.includes('bigmuddymagazine.local')) {
    return rewriteTo('magazine', pathname);
  }

  if (hostname.includes('bigmuddyradio.local')) {
    return rewriteTo('radio', pathname);
  }

  if (hostname.includes('deepsouthdirectory.local') || hostname.includes('bigmuddymedia.local')) {
    return rewriteTo('media', pathname);
  }

  if (hostname.includes('outsidereconomics.local')) {
    return NextResponse.rewrite(
      new URL('/economics' + pathname, request.url)
    );
  }

  // Dev override: NEXT_PUBLIC_BRAND env var bypasses hostname detection.
  // e.g. NEXT_PUBLIC_BRAND=magazine in .env.local
  const devBrand = process.env.NEXT_PUBLIC_BRAND;
  if (devBrand) {
    const validBrands = ['touring', 'magazine', 'radio', 'economics', 'media', 'admin', 'ops', 'gallery', 'records', 'platform', 'studio', 'tuthill'];
    if (validBrands.includes(devBrand)) {
      if (devBrand === 'admin' || devBrand === 'ops') {
        const token = await getSession();
        if (!token) return redirectToLogin();
      }
      return rewriteTo(devBrand, pathname);
    }
  }

  // ── Admin domain: shortcut paths for admin UI ──
  // Only reached for admin domain, localhost, and unmatched hosts.
  const adminPaths = ['/dashboard', '/articles', '/calendar', '/contacts', '/events', '/media', '/newsletter'];
  if (adminPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    const token = await getSession();
    if (!token) return redirectToLogin();
    return rewriteTo('admin', pathname);
  }

  // If path is exactly /ops or starts with /ops/
  if (pathname === '/ops' || pathname.startsWith('/ops/')) {
    const token = await getSession();
    if (!token) return redirectToLogin();
    return NextResponse.next();
  }

  // Admin subdomain explicitly — requires auth
  if (hostname.includes('admin')) {
    const token = await getSession();
    if (!token) return redirectToLogin();
    return rewriteTo('admin', pathname);
  }

  // Default fallback → touring (public site)
  // This handles bigmuddytouring.com, the Firebase hosted.app domain,
  // and any unmatched hostname that isn't admin.
  return rewriteTo('touring', pathname);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
