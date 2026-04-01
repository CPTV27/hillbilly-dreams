export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Public-safe domains for AI assistant access
const PUBLIC_DOMAINS = ['touring', 'brand', 'product'];

// Inline public queries — avoids cross-package import issues
const PublicQueries = {
  articles: (opts?: { city?: string; category?: string; limit?: number }) =>
    prisma.article.findMany({
      where: { status: 'published', publishedAt: { not: null }, ...(opts?.city && { city: opts.city }), ...(opts?.category && { category: opts.category }) },
      select: { id: true, title: true, slug: true, excerpt: true, body: true, category: true, city: true, heroImage: true, author: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
      take: opts?.limit || 20,
    }),
  directoryListings: (opts?: { city?: string; category?: string; limit?: number }) =>
    prisma.directoryBusiness.findMany({
      where: { active: true, ...(opts?.city && { city: opts.city }), ...(opts?.category && { category: opts.category }) },
      select: { id: true, name: true, slug: true, category: true, subcategory: true, city: true, state: true, address: true, phone: true, website: true, description: true, spotlight: true, googleRating: true, hoursJson: true, photoUrls: true },
      orderBy: { name: 'asc' },
      take: opts?.limit || 50,
    }),
  events: (opts?: { limit?: number }) =>
    prisma.event.findMany({
      where: { status: 'upcoming', date: { gte: new Date() } },
      select: { id: true, name: true, date: true, time: true, artist: true, status: true, price: true, stream: true },
      orderBy: { date: 'asc' },
      take: opts?.limit || 20,
    }),
  agentContext: (opts?: { topic?: string; limit?: number }) =>
    prisma.agentContext.findMany({
      where: { domain: { in: PUBLIC_DOMAINS }, ...(opts?.topic && { topic: opts.topic }) },
      select: { key: true, content: true, domain: true, topic: true, confidence: true },
      orderBy: { confidence: 'desc' },
      take: opts?.limit || 30,
    }),
};

/**
 * GET /api/public/knowledge
 *
 * Public endpoint for AI assistant queries. Returns ONLY public data —
 * never billing, client info, or internal operations.
 *
 * Query params:
 *   topic — filter by topic (e.g., "restaurants", "music", "lodging")
 *   city — filter by city (e.g., "natchez", "clarksdale")
 *   category — filter directory by category
 *   type — what to search: "all" | "articles" | "listings" | "events" | "knowledge"
 *   limit — max results per type (default 10)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get('topic') || undefined;
  const city = searchParams.get('city') || undefined;
  const category = searchParams.get('category') || undefined;
  const type = searchParams.get('type') || 'all';
  const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);

  try {
    const results: Record<string, unknown> = {};

    if (type === 'all' || type === 'listings') {
      results.listings = await PublicQueries.directoryListings({ city, category, limit });
    }

    if (type === 'all' || type === 'articles') {
      results.articles = await PublicQueries.articles({ city, category, limit });
    }

    if (type === 'all' || type === 'events') {
      results.events = await PublicQueries.events({ limit });
    }

    if (type === 'all' || type === 'knowledge') {
      results.knowledge = await PublicQueries.agentContext({ topic, limit });
    }

    return NextResponse.json({
      success: true,
      data: results,
      _notice: 'This endpoint returns public data only. No client, billing, or internal data is included.',
    });
  } catch (err) {
    console.error('[public/knowledge] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch public knowledge' }, { status: 500 });
  }
}
