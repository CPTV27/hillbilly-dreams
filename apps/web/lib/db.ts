// apps/web/lib/db.ts
// Shared Prisma singleton for all API routes in apps/web.
//
// Using a static top-level import here ensures Node.js module caching kicks in
// and the PrismaClient instance is only instantiated once per process, regardless
// of how many routes import this file. Dynamic `await import(...)` calls inside
// function bodies bypass that cache on every cold start, adding 400-800ms per
// request across 72+ routes — this file fixes that at the source.
//
// Usage in any API route:
//   import { prisma } from '@/lib/db';

import { prisma } from '@bigmuddy/database';

export { prisma };
