// apps/web/next.config.mjs
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // DO NOT set output: 'export' — this disables API routes and SSR.
  // Firebase App Hosting uses standalone output for deployment.
  output: 'standalone',

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
  experimental: {
    outputFileTracingRoot: resolve(__dirname, '../../'),
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
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

export default nextConfig;
