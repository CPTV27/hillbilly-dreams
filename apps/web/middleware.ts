// apps/web/middleware.ts
// Multi-tenant hostname routing for the Big Muddy platform
// Reads the Host header and rewrites the URL to the correct route group.
// The browser URL stays clean; Next.js serves from the appropriate subtree.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Skip rewrites for API routes, Next.js internals, and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Dev override: NEXT_PUBLIC_BRAND env var bypasses hostname detection.
  // Use this in local development if you don't want to set up /etc/hosts.
  // e.g. NEXT_PUBLIC_BRAND=magazine in .env.local
  const devBrand = process.env.NEXT_PUBLIC_BRAND;
  if (devBrand) {
    const validBrands = ['touring', 'magazine', 'radio', 'admin'];
    if (validBrands.includes(devBrand)) {
      return NextResponse.rewrite(
        new URL(`/${devBrand}${pathname}`, request.url)
      );
    }
  }

  // Production: route by hostname
  // bigmuddytouring.com → (touring) route group
  if (hostname.includes('bigmuddytouring') && !hostname.includes('admin')) {
    return NextResponse.rewrite(
      new URL('/touring' + pathname, request.url)
    );
  }

  // bigmuddymagazine.com → (magazine) route group
  if (hostname.includes('bigmuddymagazine')) {
    return NextResponse.rewrite(
      new URL('/magazine' + pathname, request.url)
    );
  }

  // bigmuddyradio.com → (radio) route group
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

  // Admin domain, localhost, and all fallback → (admin) route group
  // Handles: admin.bigmuddytouring.com, admin.bigmuddy.local, localhost:3000
  return NextResponse.rewrite(
    new URL('/admin' + pathname, request.url)
  );
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
