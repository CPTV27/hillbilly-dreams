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
import { isAllowedUser } from './config/auth-rules';

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

  // ── Spatial Explorer — public, no domain rewriting ──
  if (pathname.startsWith('/explorer')) {
    return NextResponse.next();
  }

  // ── Plan landing page — public, no domain rewriting ──
  // Single front-door page for partners/agents to view all docs at a glance.
  if (pathname === '/plan' || pathname.startsWith('/plan/')) {
    return NextResponse.next();
  }

  // ── Story landing page — public, no domain rewriting ──
  // Visual narrative explaining the whole MBT ecosystem to partners + prospects.
  if (pathname === '/story' || pathname.startsWith('/story/')) {
    return NextResponse.next();
  }

  // Press mocks — internal-only static HTML under /public/press.
  // Auth gate temporarily disabled so Tracy/Amy can access via direct links.
  // TODO: Re-enable auth after team has accounts. Each file has an internal-only banner.
  if (pathname === '/press' || pathname.startsWith('/press/')) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

  // Internal-only static HTML dashboards — overview, review board, etc.
  // Served directly from /public without tenant rewriting.
  if (
    pathname === '/overview.html' ||
    pathname === '/review-board.html' ||
    pathname.endsWith('.html')
  ) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }

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

  // ── Admin routes always pass through — no domain rewriting ──
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // ── Demo route is always public — no auth required ──
  if (pathname.startsWith('/demo')) {
    return NextResponse.next();
  }

  // ── Sovereign signage (4K displays, venue TVs) — public, no hostname rewrite ──
  if (pathname.startsWith('/display')) {
    return NextResponse.next();
  }

  // ── Briefings — password-gated, no domain rewriting ──
  if (pathname.startsWith('/briefings')) {
    return NextResponse.next();
  }

  // ── Welcome/tour pages — always pass through ──
  if (pathname.startsWith('/welcome')) {
    return NextResponse.next();
  }

  // ── Partner dashboards — standalone, no rewrite ──
  if (pathname.startsWith('/tracy') || pathname.startsWith('/amy')) {
    return NextResponse.next();
  }

  // ── Hostname-based routing: match against tenant domain table ──
  // MUST run before brand prefix check so that e.g.
  // bearsvillemediagroup.com/magazine → /bearsville/magazine (not /magazine)
  //
  // NOTE (April 2026): bigmuddymagazine.com, bigmuddyradio.com,
  // bigmuddyentertainment.com, and bigmuddyrecordlabel.com now 301 at
  // Cloudflare Bulk Redirects to bigmuddytouring.com/{path}. Their content
  // is accessible as /magazine, /radio, /entertainment, /records paths
  // under the touring default. Domain mappings removed from domain-routes.ts.

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
    // Before rewriting, check if this path is a top-level route that should NOT
    // be prefixed with the route group (e.g., /constellation, /dawn, /admin, /directory)
    // Consolidated sub-domains (April 2026) now live as top-level paths on bigmuddytouring.com
    const topLevelPassthrough = ['/constellation', '/dawn', '/admin', '/directory', '/gallery', '/snap', '/kiosk',
      '/magazine', '/radio', '/records', '/entertainment', '/studio', '/air', '/chase', '/mbt', '/hillbilly', '/demo', '/links', '/foreman'];
    if (topLevelPassthrough.some(p => pathname === p || pathname.startsWith(p + '/'))) {
      return NextResponse.next();
    }

    return rewriteTo(matched.routeGroup, pathname);
  }

  // ── If path already starts with a known brand prefix, pass through ──
  // Only checked AFTER hostname routing — so domain-based rewrites take priority
  if (BMT_BRAND_PREFIXES.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // ── Directory routes always pass through — never rewritten ──
  if (pathname === '/directory' || pathname.startsWith('/directory/')) {
    return NextResponse.next();
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

