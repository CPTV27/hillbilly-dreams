import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';

export function registerEventTools(server: McpServer) {
  server.tool(
    'list_events',
    'List events at Big Muddy venues. Filter by status or date range.',
    {
      status: z.string().optional().describe('Event status: upcoming, sold-out, cancelled, completed'),
      upcoming_only: z.boolean().optional().default(true).describe('Only show future events'),
      limit: z.number().optional().default(20).describe('Max results (capped at 50)'),
    },
    async ({ status, upcoming_only, limit }) => {
      const events = await prisma.event.findMany({
        where: {
          ...(status && { status }),
          ...(upcoming_only && { date: { gte: new Date() } }),
        },
        select: {
          id: true, name: true, date: true, time: true, artist: true,
          description: true, price: true, capacity: true, status: true, stream: true,
        },
        orderBy: { date: 'asc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(events, null, 2) }] };
    }
  );

  server.tool(
    'list_showcases',
    'List Rise Up showcases and their artist lineups.',
    {
      status: z.string().optional().describe('Showcase status: planning, confirmed, promoted, completed, cancelled'),
      limit: z.number().optional().default(10),
    },
    async ({ status, limit }) => {
      const showcases = await prisma.showcase.findMany({
        where: status ? { status } : undefined,
        select: {
          id: true, name: true, venue: true, venueCity: true, date: true, time: true,
          capacity: true, ticketPrice: true, status: true,
          slots: {
            select: {
              setOrder: true, setLength: true, status: true,
              artist: { select: { name: true, genre: true, city: true } },
            },
            orderBy: { setOrder: 'asc' },
          },
        },
        orderBy: { date: 'desc' },
        take: Math.min(limit ?? 10, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(showcases, null, 2) }] };
    }
  );
}
