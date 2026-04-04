import { withSentryConfig } from '@sentry/nextjs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone' disabled for Vercel (only needed for Firebase/Docker)

  // Skip ESLint during builds — we run lint separately
  eslint: { ignoreDuringBuilds: true },
  // Skip type checking during builds — we run tsc separately
  typescript: { ignoreBuildErrors: true },

  images: {
    // Custom loader: serves pre-optimized .webp/.avif from GCS directly,
    // routes everything else through Next.js /_next/image optimizer.
    loaderFile: './lib/image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/bmt-media-bigmuddy/**',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bigmuddytouring.com',
      },
      {
        protocol: 'https',
        hostname: '*.bigmuddytouring.com',
      },
    ],
  },

  // Transpile shared packages
  transpilePackages: ['@bigmuddy/ui', '@bigmuddy/config'],

  // Allow larger page payloads for rich article content
  // Increase timeout for large static pages (weddings = 1161 lines)
  staticPageGenerationTimeout: 120,

  experimental: {
    outputFileTracingRoot: resolve(__dirname, '../../'),
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
    // Sentry uses register() in instrumentation.ts (server + edge). Do not load Node OTEL here — edge runtime.
    instrumentationHook: true,
  },

  async redirects() {
    return [
      // bearsvillemedia.com → bearsvillemediagroup.com (301, preserve path)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'bearsvillemedia.com' }],
        destination: 'https://bearsvillemediagroup.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bearsvillemedia.com' }],
        destination: 'https://bearsvillemediagroup.com/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), geolocation=()' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: 'chasepiersontv',
  project: 'javascript-react',
  silent: !process.env.CI,
  // Prevent Sentry from injecting into middleware (edge runtime incompatible)
  excludeServerRoutes: ['/api/(.*)'],
  disableLogger: true,
  widenClientFileUpload: true,
  // Skip source map upload in dev / when no auth token
  authToken: process.env.SENTRY_AUTH_TOKEN,
  hideSourceMaps: true,
  tunnelRoute: '/monitoring',
});
