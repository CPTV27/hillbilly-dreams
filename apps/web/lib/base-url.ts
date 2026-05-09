// apps/web/lib/base-url.ts
//
// Single source of truth for the production base URL used in Server Components
// and API routes that need to make build-time HTTP requests back into the app
// (e.g. generateStaticParams fetching from /api/articles).
//
// Pattern:
//   1. NEXT_PUBLIC_BASE_URL — explicit override (set in Vercel env when needed).
//   2. Production fallback — bigmuddytouring.com (always serves the latest deploy).
//   3. Local fallback — http://localhost:3000.
//
// We intentionally do NOT use VERCEL_URL here. VERCEL_URL points to the in-flight
// deployment which is not yet serving traffic during a build, so fetching from it
// during generateStaticParams creates a self-reference. The production domain
// alias serves the previous deploy, which gives us a one-deploy ISR lag — that's
// the trade-off we want.

export function getPublishingBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.NODE_ENV === 'production') return 'https://bigmuddytouring.com';
  return 'http://localhost:3000';
}
