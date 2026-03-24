// apps/web/middleware.ts
// ─────────────────────────────────────────────────────────────
// HDX Multi-Tenant Hostname Routing Engine
// ─────────────────────────────────────────────────────────────
// PLATFORM-PORTABLE routing engine. Reads hostname, resolves
// the target route group from a tenant-provided domain table,
// and rewrites the URL. Auth helpers (getToken, getSession,
// redirectToLogin) are platform-level capabilities.
//
// TENANT DATA lives in config/domain-routes.ts (BMT-specific).
// To adapt this engine for another HDX sovereign, swap the import.
//
// Seam introduced: 2026-03-24 — Phase 2 Wave 3 (AG)
// ─────────────────────────────────────────────────────────────
//
// NOTE: We use getToken() instead of auth() wrapper because NextResponse.rewrite()
// inside auth() causes 401 errors on Firebase App Hosting (Cloud Run envoy proxy).

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// ── Tenant Config Import ──
import {
  ALL_BMT_DOMAIN_ROUTES,
  BMT_BRAND_PREFIXES,
  BMT_ADMIN_PATH_SHORTCUTS,
  BMT_VALID_DEV_BRANDS,
  BMT_DEFAULT_ROUTE_GROUP,
} from './config/domain-routes';
import type { DomainRoute } from './config/domain-routes';

// ── Platform: Hostname Extraction ──

function resolveHostname(request: NextRequest): string {
  // Firebase App Hosting may use different forwarded-host headers
  return (
    request.headers.get('x-forwarded-host') ||
    request.headers.get('x-fah-host') ||
    request.headers.get('x-original-host') ||
    request.headers.get('host') ||
    request.nextUrl.hostname ||
    ''
  );
}

// ── Platform: Domain Route Resolver ──

function matchDomainRoute(
  hostname: string,
  routes: DomainRoute[]
): DomainRoute | null {
  for (const route of routes) {
    if (hostname.includes(route.pattern)) {
      // Skip this match if excludeAdmin is set and hostname contains 'admin'
      if (route.excludeAdmin && hostname.includes('admin')) continue;
      return route;
    }
  }
  return null;
}

// ── Platform: Auth Helpers ──

function createSessionGetter(request: NextRequest) {
  return async () => {
    try {
      return await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
    } catch {
      return null;
    }
  };
}

function createLoginRedirector(request: NextRequest, pathname: string) {
  return () => {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  };
}

// ── Platform: Routing Engine ──

export async function middleware(request: NextRequest) {
  const hostname = resolveHostname(request);
  const pathname = request.nextUrl.pathname;

  // Helper: build a rewrite path, avoiding double/trailing slashes
  const rewriteTo = (prefix: string, path: string) => {
    const normalized = path === '/' ? '' : path;
    return NextResponse.rewrite(new URL(`/${prefix}${normalized}`, request.url));
  };

  // Platform auth helpers — available for use by any downstream logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getSession = createSessionGetter(request);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const redirectToLogin = createLoginRedirector(request, pathname);

  // ── www → apex redirect (301 permanent) — canonical URL for SEO ──
  if (hostname.startsWith('www.')) {
    const url = new URL(request.url);
    url.host = hostname.replace(/^www\./, '');
    return NextResponse.redirect(url, 301);
  }

  // ── Skip rewrites for API routes, Next.js internals, and static assets ──
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // ── Login page is always accessible without auth ──
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // ── Demo route is always public — no auth required ──
  if (pathname.startsWith('/demo')) {
    return NextResponse.next();
  }

  // ── If path already starts with a known brand prefix, pass through ──
  if (BMT_BRAND_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // ── Hostname-based routing: match against tenant domain table ──
  // Must run before admin path detection so that e.g.
  // bigmuddymagazine.com/articles/slug → /magazine/articles/slug
  // instead of being intercepted as an admin /articles path.

  const matched = matchDomainRoute(hostname, ALL_BMT_DOMAIN_ROUTES);

  if (matched) {
    // Handle per-domain path redirects (e.g., /dashboard → /ops on touring)
    if (matched.redirects) {
      for (const redirect of matched.redirects) {
        if (pathname === redirect.pathPrefix || pathname.startsWith(redirect.pathPrefix + '/')) {
          return NextResponse.redirect(new URL(redirect.target, request.url));
        }
      }
    }
    return rewriteTo(matched.routeGroup, pathname);
  }

  // ── Ops routes always pass through — never rewritten ──
  if (pathname === '/ops' || pathname.startsWith('/ops/')) {
    return NextResponse.next();
  }

  // ── Dev override: NEXT_PUBLIC_BRAND env var bypasses hostname detection ──
  const devBrand = process.env.NEXT_PUBLIC_BRAND;
  if (devBrand && BMT_VALID_DEV_BRANDS.includes(devBrand)) {
    return rewriteTo(devBrand, pathname);
  }

  // ── Admin domain: shortcut paths for admin UI ──
  // Only reached for admin domain, localhost, and unmatched hosts.
  if (BMT_ADMIN_PATH_SHORTCUTS.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return rewriteTo('admin', pathname);
  }

  // ── Admin subdomain explicitly ──
  if (hostname.includes('admin')) {
    return rewriteTo('admin', pathname);
  }

  // ── Default fallback ──
  // Handles the primary domain, Firebase hosted.app domain,
  // and any unmatched hostname that isn't admin.
  return rewriteTo(BMT_DEFAULT_ROUTE_GROUP, pathname);
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

