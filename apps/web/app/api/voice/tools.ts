// apps/web/app/api/voice/tools.ts
// ─────────────────────────────────────────────────────────────
// Voice AI Tool Definitions + Executors
// ─────────────────────────────────────────────────────────────
// These tools let the voice AI query real data from the platform.
// Used by /api/voice/stream (Gemini Live) and /api/siri/analyze.
//
// Each tool has:
//   - declaration: Gemini function calling schema
//   - executor: async function that queries Prisma + returns data

import { prisma } from '@bigmuddy/database';

// ── Tool Declarations (Gemini function calling format) ──────

// Tool declarations use raw objects — the @google/genai SDK accepts
// plain objects matching the FunctionDeclaration interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VOICE_TOOL_DECLARATIONS: any[] = [
  {
    name: 'search_directory',
    description:
      'Search the Deep South Directory for local businesses by name, type, or city. Returns business names, descriptions, and contact info. Call this when the user asks about restaurants, shops, venues, hotels, or any local business.',
    parameters: {
      type: 'OBJECT',
      properties: {
        query: { type: 'STRING', description: 'Search term — business name, type (restaurant, bar, hotel), or general query' },
        city: { type: 'STRING', description: 'City to filter by. Default: Natchez' },
      },
    },
  },
  {
    name: 'get_shows',
    description:
      'Get upcoming shows and events at Big Muddy venues. Returns event names, dates, times, artists, and prices. Call this when the user asks what\'s playing, what\'s happening, or about upcoming events.',
    parameters: {
      type: 'OBJECT',
      properties: {
        days_ahead: { type: 'NUMBER', description: 'How many days ahead to look. Default: 7' },
      },
    },
  },
  {
    name: 'get_articles',
    description:
      'Search Big Muddy Magazine articles by topic, city, or category. Returns article titles, excerpts, and links. Call this when the user asks about things to do, city guides, features, or local stories.',
    parameters: {
      type: 'OBJECT',
      properties: {
        query: { type: 'STRING', description: 'Topic or keyword to search for' },
        city: { type: 'STRING', description: 'Filter by city' },
        category: { type: 'STRING', description: 'Article category: city-guide, feature, photo-essay, interview, food-drink, music' },
      },
    },
  },
  {
    name: 'get_business_reviews',
    description:
      'Get recent Google reviews for a specific business in the directory. Call this when the user asks about reviews, ratings, or how a business is doing.',
    parameters: {
      type: 'OBJECT',
      properties: {
        business_name: { type: 'STRING', description: 'The name of the business to get reviews for' },
      },
    },
  },
];

export const VOICE_TOOLS_CONFIG = [{
  functionDeclarations: VOICE_TOOL_DECLARATIONS,
}];

// ── Tool Executors ──────────────────────────────────────────

export async function executeVoiceTool(
  name: string,
  args: Record<string, unknown>
): Promise<Record<string, unknown>> {
  switch (name) {
    case 'search_directory':
      return searchDirectory(args);
    case 'get_shows':
      return getShows(args);
    case 'get_articles':
      return getArticles(args);
    case 'get_business_reviews':
      return getBusinessReviews(args);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ── Individual tool implementations ─────────────────────────

async function searchDirectory(args: Record<string, unknown>) {
  const query = (args.query as string) || '';
  const city = (args.city as string) || 'Natchez';

  try {
    const clients = await prisma.client.findMany({
      where: {
        status: { in: ['active', 'onboarding'] },
        city: { contains: city, mode: 'insensitive' },
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { businessType: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        name: true,
        businessType: true,
        city: true,
        state: true,
        description: true,
        phone: true,
        website: true,
        address: true,
      },
      take: 5,
    });

    if (clients.length === 0) {
      return { results: [], message: `No businesses found matching "${query}" in ${city}.` };
    }

    return {
      results: clients,
      count: clients.length,
    };
  } catch (e) {
    console.error('[voice/tools] searchDirectory error', e);
    return { error: 'Could not search the directory right now.' };
  }
}

async function getShows(args: Record<string, unknown>) {
  const daysAhead = (args.days_ahead as number) || 7;
  const now = new Date();
  const cutoff = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  try {
    const events = await prisma.event.findMany({
      where: {
        date: { gte: now, lte: cutoff },
        status: { in: ['upcoming', 'sold-out'] },
      },
      select: {
        name: true,
        date: true,
        time: true,
        artist: true,
        description: true,
        price: true,
        status: true,
      },
      orderBy: { date: 'asc' },
      take: 10,
    });

    if (events.length === 0) {
      return { results: [], message: `No shows scheduled in the next ${daysAhead} days.` };
    }

    return {
      results: events.map(e => ({
        ...e,
        date: e.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      })),
      count: events.length,
    };
  } catch (e) {
    console.error('[voice/tools] getShows error', e);
    return { error: 'Could not check the show schedule right now.' };
  }
}

async function getArticles(args: Record<string, unknown>) {
  const query = (args.query as string) || '';
  const city = args.city as string | undefined;
  const category = args.category as string | undefined;

  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'published',
        ...(city && { city: { contains: city, mode: 'insensitive' } }),
        ...(category && { category }),
        ...(query && {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
          ],
        }),
      },
      select: {
        title: true,
        slug: true,
        category: true,
        city: true,
        excerpt: true,
        author: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: 5,
    });

    if (articles.length === 0) {
      return { results: [], message: `No articles found about "${query}".` };
    }

    return {
      results: articles.map(a => ({
        ...a,
        url: `https://bigmuddymagazine.com/magazine/articles/${a.slug}`,
      })),
      count: articles.length,
    };
  } catch (e) {
    console.error('[voice/tools] getArticles error', e);
    return { error: 'Could not search articles right now.' };
  }
}

async function getBusinessReviews(args: Record<string, unknown>) {
  const businessName = (args.business_name as string) || '';

  try {
    const client = await prisma.client.findFirst({
      where: {
        name: { contains: businessName, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        reviews: {
          select: {
            platform: true,
            rating: true,
            text: true,
            author: true,
            postedAt: true,
          },
          orderBy: { postedAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!client) {
      return { error: `Could not find "${businessName}" in the directory.` };
    }

    const reviews = client.reviews;
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum: number, r: { rating: number }) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 'No ratings yet';

    return {
      business: client.name,
      averageRating: avgRating,
      reviewCount: reviews.length,
      recentReviews: reviews.map((r: { rating: number; text: string | null; author: string; postedAt: Date }) => ({
        rating: r.rating,
        text: r.text,
        author: r.author,
        date: r.postedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      })),
    };
  } catch (e) {
    console.error('[voice/tools] getBusinessReviews error', e);
    return { error: 'Could not check reviews right now.' };
  }
}
