// apps/web/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // DO NOT set output: 'export' — this disables API routes and SSR.
  // Firebase App Hosting supports full Next.js SSR natively.

  images: {
    remotePatterns: [
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
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
};

export default nextConfig;
