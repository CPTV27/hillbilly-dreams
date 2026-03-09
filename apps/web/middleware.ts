// apps/web/middleware.ts
// Multi-tenant hostname routing + admin auth protection
// Reads the Host header and rewrites the URL to the correct route group.
// Admin routes require Google OAuth authentication via NextAuth.

import { NextResponse } from 'next/server';
import { auth } from './auth';

export default auth((request) => {
  const hostname = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

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

  // Auth API routes must always pass through (NextAuth callbacks, CSRF, etc.)
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Helper: redirect to login if not authenticated
  const redirectToLogin = () => {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  };

  // If the path already starts with a known brand prefix, pass through
  // without rewriting. Admin and ops routes require authentication.
  const brandPrefixes = ['/touring', '/magazine', '/radio', '/admin', '/ops'];
  if (brandPrefixes.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    if ((pathname.startsWith('/admin') || pathname.startsWith('/ops')) && !request.auth) {
      return redirectToLogin();
    }
    return NextResponse.next();
  }

  // ── Public domains: route by hostname FIRST ──
  // Must run before admin path detection so that e.g.
  // bigmuddymagazine.com/articles/slug → /magazine/articles/slug
  // instead of being intercepted as an admin /articles path.

  // Production domains
  if (hostname.includes('bigmuddytouring') && !hostname.includes('admin')) {
    return NextResponse.rewrite(
      new URL('/touring' + pathname, request.url)
    );
  }

  if (hostname.includes('bigmuddymagazine')) {
    return NextResponse.rewrite(
      new URL('/magazine' + pathname, request.url)
    );
  }

  if (hostname.includes('bigmuddyradio')) {
    return NextResponse.rewrite(
      new URL('/radio' + pathname, request.url)
    );
  }

  // Local development .local domains
  if (hostname.includes('bigmuddytouring.local') && !hostname.includes('admin')) {
    return NextResponse.rewrite(
      new URL('/touring' + pathname, request.url)
    );
  }

  if (hostname.includes('bigmuddymagazine.local')) {
    return NextResponse.rewrite(
      new URL('/magazine' + pathname, request.url)
    );
  }

  if (hostname.includes('bigmuddyradio.local')) {
    return NextResponse.rewrite(
      new URL('/radio' + pathname, request.url)
    );
  }

  // Dev override: NEXT_PUBLIC_BRAND env var bypasses hostname detection.
  // e.g. NEXT_PUBLIC_BRAND=magazine in .env.local
  const devBrand = process.env.NEXT_PUBLIC_BRAND;
  if (devBrand) {
    const validBrands = ['touring', 'magazine', 'radio', 'admin', 'ops'];
    if (validBrands.includes(devBrand)) {
      if ((devBrand === 'admin' || devBrand === 'ops') && !request.auth) return redirectToLogin();
      return NextResponse.rewrite(
        new URL(`/${devBrand}${pathname}`, request.url)
      );
    }
  }

  // ── Admin domain: shortcut paths for admin UI ──
  // Only reached for admin domain, localhost, and unmatched hosts.
  // Note: /playlists is NOT here — it's used by both radio and admin.
  const adminPaths = ['/dashboard', '/articles', '/calendar', '/contacts', '/events', '/media', '/newsletter'];
  if (adminPaths.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    if (!request.auth) return redirectToLogin();
    return NextResponse.rewrite(
      new URL('/admin' + pathname, request.url)
    );
  }

  // If path is exactly /ops or starts with /ops/
  if (pathname === '/ops' || pathname.startsWith('/ops/')) {
    if (!request.auth) return redirectToLogin();
    // Native Next.js App Router routing handles /ops since its directory is /ops
    return NextResponse.next();
  }

  // Admin domain, localhost, and all fallback → (admin) route group
  // Handles: admin.bigmuddytouring.com, admin.bigmuddy.local, localhost:3000
  if (!request.auth) return redirectToLogin();
  return NextResponse.rewrite(
    new URL('/admin' + pathname, request.url)
  );
});

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
