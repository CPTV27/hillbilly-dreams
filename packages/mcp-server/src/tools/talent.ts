import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';

export function registerTalentTools(server: McpServer) {
  server.tool(
    'list_artists',
    'List artists in the Big Muddy Records talent pipeline. Filter by status, genre, or city.',
    {
      status: z.string().optional().describe('Artist status: discovered, contacted, showcasing, touring, alumni'),
      genre: z.string().optional().describe('Genre: blues, soul, gospel, rock, folk, jazz, hip-hop, country'),
      city: z.string().optional(),
      limit: z.number().optional().default(20),
    },
    async ({ status, genre, city, limit }) => {
      const artists = await prisma.artist.findMany({
        where: {
          ...(status && { status }),
          ...(genre && { genre }),
          ...(city && { city }),
        },
        select: {
          id: true, name: true, slug: true, genre: true, city: true, state: true,
          source: true, status: true, riseUpCohort: true,
          _count: { select: { tracks: true, tourStops: true, showcases: true } },
        },
        orderBy: { name: 'asc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(artists, null, 2) }] };
    }
  );

  server.tool(
    'list_tour_stops',
    'List tour stops across all artists. Filter by status or date range.',
    {
      status: z.string().optional().describe('Tour stop status: hold, confirmed, advanced, completed, cancelled'),
      upcoming_only: z.boolean().optional().default(true),
      limit: z.number().optional().default(20),
    },
    async ({ status, upcoming_only, limit }) => {
      const stops = await prisma.tourStop.findMany({
        where: {
          ...(status && { status }),
          ...(upcoming_only && { date: { gte: new Date() } }),
        },
        select: {
          id: true, venue: true, venueCity: true, venueState: true,
          date: true, time: true, ticketPrice: true, status: true,
          artist: { select: { name: true, genre: true } },
        },
        orderBy: { date: 'asc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(stops, null, 2) }] };
    }
  );
}
