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
import sharp from 'sharp';
import { generateImage } from '@/lib/imagen';
import { uploadToGCS } from '@/lib/gcs';
// constellation removed in prune — stubs preserve call-site shapes
const queryConstellationStats = async () => ({ nodes: 0, edges: 0 });
const queryConstellationSubgraph = async (
  _entityType: string,
  _entityId: string,
  _depth: number
): Promise<{
  ok: boolean;
  error?: string;
  notFound?: boolean;
  root?: unknown;
  depth: number;
  nodes: unknown[];
  edges: unknown[];
}> => ({
  ok: false,
  error: 'constellation pruned',
  notFound: true,
  depth: _depth,
  nodes: [],
  edges: [],
});

// ── Tool Declarations (Gemini function calling format) ──────

// Tool declarations use raw objects — the @google/genai SDK accepts
// plain objects matching the FunctionDeclaration interface.
export const VOICE_TOOL_DECLARATIONS: Record<string, unknown>[] = [
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
  {
    name: 'get_constellation_stats',
    description:
      'Returns counts of constellation graph nodes and edges (derived touring + directory graph). Use when asked how big the graph is or whether constellation data is loaded.',
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
  },
  {
    name: 'get_constellation_subgraph',
    description:
      'Loads a neighborhood of the Postgres constellation graph around one entity: venues, hotels, restaurants, cities, routes, directory businesses. Use for questions about how a venue connects to routes, cities, or listings. entityType is one of: venue, hotel, restaurant, city, route, directory_business. entityId is the numeric id as a string.',
    parameters: {
      type: 'OBJECT',
      properties: {
        entityType: {
          type: 'STRING',
          description: 'venue | hotel | restaurant | city | route | directory_business',
        },
        entityId: { type: 'STRING', description: 'Primary key id as string, e.g. "12"' },
        depth: {
          type: 'NUMBER',
          description: 'How many hops from root (0-4). Default 2.',
        },
      },
      required: ['entityType', 'entityId'],
    },
  },
  {
    name: 'search_touring_venues',
    description:
      'Search Big Muddy touring venues: capacity, city, type (club, theater, etc.). Read-only. Use for load-in, booking context, or "where can we play near X".',
    parameters: {
      type: 'OBJECT',
      properties: {
        query: { type: 'STRING', description: 'Name or keyword; optional' },
        city: { type: 'STRING', description: 'Filter by city name' },
        state: { type: 'STRING', description: 'Two-letter state, default MS' },
        limit: { type: 'NUMBER', description: 'Max rows, default 8, max 15' },
      },
    },
  },
  {
    name: 'list_corridor_cities',
    description:
      'Lists corridor cities in drive order with role (hub, stopover, etc.). Use for tour planning or "what cities are on the corridor".',
    parameters: {
      type: 'OBJECT',
      properties: {
        limit: { type: 'NUMBER', description: 'Max cities, default 20' },
      },
    },
  },
  {
    name: 'list_tour_routes',
    description:
      'Lists public pre-built tour routes with names and slug. Use when the user asks about defined routes or corridors.',
    parameters: {
      type: 'OBJECT',
      properties: {
        limit: { type: 'NUMBER', description: 'Max routes, default 10' },
      },
    },
  },
  {
    name: 'search_directory_listings',
    description:
      'Search Deep South Directory business listings (DirectoryBusiness): name, city, category. Read-only. Prefer this for "businesses on the directory" vs paid CRM clients.',
    parameters: {
      type: 'OBJECT',
      properties: {
        query: { type: 'STRING', description: 'Name or keyword' },
        city: { type: 'STRING', description: 'City filter' },
        limit: { type: 'NUMBER', description: 'Max rows, default 6' },
      },
    },
  },
  {
    name: 'generate_image',
    description:
      'Generate an image via Vertex AI Imagen 3 and save it to GCS. Use for branded mockups where typography must render legibly — vehicle wraps, apparel, signage, album covers, packaging, posters with visible text. Also use for photoreal scene renders. Do NOT use for editorial illustrations that should be text-free (use the creative hub for those). Returns a public URL the user can open or share. One call = one image; do not loop unless the user explicitly asks for variations.',
    parameters: {
      type: 'OBJECT',
      properties: {
        prompt: {
          type: 'STRING',
          description:
            'Full descriptive prompt. Include subject, setting, lighting, style, and any typography/branding to render. Be explicit about fonts (e.g. "tall condensed all-caps sans-serif") and colors (e.g. "burnt orange on matte black"). Max ~900 characters.',
        },
        aspect_ratio: {
          type: 'STRING',
          description: 'One of 1:1, 16:9, 4:3, 3:4, 9:16. Default 16:9. Use 9:16 for posters, 1:1 for social, 16:9 for vehicles and wide scenes.',
        },
        album: {
          type: 'STRING',
          description: 'GCS album/folder name, default "dawn-generated". Use short kebab-case (e.g. "van-wrap-mockups", "album-covers", "merch-mockups").',
        },
        allow_text: {
          type: 'BOOLEAN',
          description: 'Default true. Set false to suppress any lettering in the output (use for text-free editorial illustrations).',
        },
        style: {
          type: 'STRING',
          description: 'Either "photoreal" (default, for mockups, vehicles, apparel on real products) or "illustration" (for flat graphics, editorial art).',
        },
      },
      required: ['prompt'],
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
    case 'get_constellation_stats':
      return getConstellationStats();
    case 'get_constellation_subgraph':
      return getConstellationSubgraphTool(args);
    case 'search_touring_venues':
      return searchTouringVenues(args);
    case 'list_corridor_cities':
      return listCorridorCities(args);
    case 'list_tour_routes':
      return listTourRoutes(args);
    case 'search_directory_listings':
      return searchDirectoryListings(args);
    case 'generate_image':
      return generateImageTool(args);
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

async function getConstellationStats() {
  try {
    const stats = await queryConstellationStats();
    return stats;
  } catch (e) {
    console.error('[voice/tools] getConstellationStats error', e);
    return { error: 'Could not read constellation stats.' };
  }
}

async function getConstellationSubgraphTool(args: Record<string, unknown>) {
  const entityType = String(args.entityType || '').trim();
  const entityId = String(args.entityId || '').trim();
  const depth = Math.min(4, Math.max(0, Number(args.depth ?? 2) || 2));
  if (!entityType || !entityId) {
    return { error: 'entityType and entityId are required.' };
  }
  try {
    const result = await queryConstellationSubgraph(entityType, entityId, depth);
    if (!result.ok) {
      return { error: result.error, notFound: result.notFound === true };
    }
    return {
      root: result.root,
      depth: result.depth,
      nodeCount: result.nodes.length,
      edgeCount: result.edges.length,
      nodes: result.nodes.slice(0, 40),
      edges: result.edges.slice(0, 80),
    };
  } catch (e) {
    console.error('[voice/tools] getConstellationSubgraph error', e);
    return { error: 'Could not load constellation subgraph.' };
  }
}

async function searchTouringVenues(args: Record<string, unknown>) {
  const query = (args.query as string)?.trim() || '';
  const city = (args.city as string)?.trim();
  const state = (args.state as string)?.trim() || 'MS';
  const limit = Math.min(15, Math.max(1, Number(args.limit) || 8));

  try {
    const venues = await prisma.touringVenue.findMany({
      where: {
        isPublic: true,
        state: { equals: state.length === 2 ? state.toUpperCase() : state },
        ...(city && { city: { contains: city, mode: 'insensitive' } }),
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { venueType: { contains: query, mode: 'insensitive' } },
            { notes: { contains: query, mode: 'insensitive' } },
          ],
        }),
      },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        capacity: true,
        venueType: true,
        slug: true,
      },
      take: limit,
      orderBy: { name: 'asc' },
    });
    return { count: venues.length, venues };
  } catch (e) {
    console.error('[voice/tools] searchTouringVenues error', e);
    return { error: 'Could not search touring venues.' };
  }
}

async function listCorridorCities(args: Record<string, unknown>) {
  const limit = Math.min(40, Math.max(1, Number(args.limit) || 20));
  try {
    const cities = await prisma.corridorCity.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        name: true,
        state: true,
        role: true,
        corridorOrder: true,
        slug: true,
      },
      orderBy: { corridorOrder: 'asc' },
      take: limit,
    });
    return { count: cities.length, cities };
  } catch (e) {
    console.error('[voice/tools] listCorridorCities error', e);
    return { error: 'Could not list corridor cities.' };
  }
}

async function listTourRoutes(args: Record<string, unknown>) {
  const limit = Math.min(20, Math.max(1, Number(args.limit) || 10));
  try {
    const routes = await prisma.tourRoute.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        name: true,
        slug: true,
        totalMiles: true,
        estimatedDriveHours: true,
      },
      orderBy: { name: 'asc' },
      take: limit,
    });
    return { count: routes.length, routes };
  } catch (e) {
    console.error('[voice/tools] listTourRoutes error', e);
    return { error: 'Could not list tour routes.' };
  }
}

async function searchDirectoryListings(args: Record<string, unknown>) {
  const query = (args.query as string)?.trim() || '';
  const city = (args.city as string)?.trim();
  const limit = Math.min(12, Math.max(1, Number(args.limit) || 6));

  if (!query && !city) {
    return { error: 'Provide a query or a city to search directory listings.' };
  }

  try {
    const rows = await prisma.directoryBusiness.findMany({
      where: {
        ...(city && { city: { contains: city, mode: 'insensitive' } }),
        ...(query && {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        }),
      },
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        category: true,
        tier: true,
        active: true,
      },
      take: limit,
      orderBy: { name: 'asc' },
    });
    return { count: rows.length, listings: rows };
  } catch (e) {
    console.error('[voice/tools] searchDirectoryListings error', e);
    return { error: 'Could not search directory listings.' };
  }
}

type AspectRatio = '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
const VALID_ASPECTS: AspectRatio[] = ['1:1', '16:9', '4:3', '3:4', '9:16'];

function slugifyPrompt(prompt: string): string {
  return prompt
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'image';
}

async function generateImageTool(args: Record<string, unknown>) {
  const prompt = (args.prompt as string)?.trim();
  if (!prompt) return { error: 'prompt is required' };
  if (prompt.length > 1000) return { error: 'prompt too long (max 1000 chars)' };

  const rawAspect = (args.aspect_ratio as string) || '16:9';
  const aspectRatio: AspectRatio = VALID_ASPECTS.includes(rawAspect as AspectRatio)
    ? (rawAspect as AspectRatio)
    : '16:9';

  const album = ((args.album as string) || 'dawn-generated')
    .toLowerCase()
    .replace(/[^\w-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'dawn-generated';

  const allowText = args.allow_text !== false;
  const style = ((args.style as string) || 'photoreal').toLowerCase();
  const allowPhotoreal = style !== 'illustration';

  const negatives: string[] = ['watermark'];
  if (!allowText) negatives.push('text', 'words', 'letters');
  if (!allowPhotoreal) negatives.push('photorealistic', '3d render', 'stock photo');
  const negativePrompt = negatives.join(', ');

  try {
    const [pngBuffer] = await generateImage(prompt, {
      negativePrompt,
      aspectRatio,
      sampleCount: 1,
    });

    const webpBuffer = await sharp(pngBuffer).webp({ quality: 85 }).toBuffer();

    const slug = slugifyPrompt(prompt);
    const timestamp = Date.now();
    const path = `${album}/${slug}-${timestamp}.webp`;

    const url = await uploadToGCS(webpBuffer, path, 'image/webp');

    return {
      url,
      path,
      album,
      aspectRatio,
      size: webpBuffer.length,
      prompt,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'image generation failed';
    console.error('[voice/tools] generateImageTool error', e);
    if (msg.includes('safety') || msg.includes('blocked')) {
      return { error: 'Prompt was blocked by the safety filter. Rephrase and try again.' };
    }
    if (msg.includes('quota') || msg.includes('429')) {
      return { error: 'Imagen rate limit hit. Try again in a minute.' };
    }
    return { error: `Image generation failed: ${msg}` };
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
