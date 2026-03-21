import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';

export function registerClientTools(server: McpServer) {
  server.tool(
    'list_clients',
    'List Deep South Directory clients (local businesses). Filter by city, tier, or status.',
    {
      city: z.string().optional().describe('City name'),
      tier: z.string().optional().describe('Client tier: front-porch, route, river-room, blues-room'),
      status: z.string().optional().describe('Client status: onboarding, active, paused, churned'),
      limit: z.number().optional().default(20),
    },
    async ({ city, tier, status, limit }) => {
      const clients = await prisma.client.findMany({
        where: {
          ...(city && { city }),
          ...(tier && { tier }),
          ...(status && { status }),
        },
        select: {
          id: true, name: true, slug: true, tier: true, businessType: true,
          city: true, state: true, website: true, status: true,
          _count: { select: { articles: true, reviews: true } },
        },
        orderBy: { name: 'asc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(clients, null, 2) }] };
    }
  );

  server.tool(
    'list_reviews',
    'List reviews across all clients. Filter by platform or response status.',
    {
      platform: z.string().optional().describe('Review platform: google, yelp, tripadvisor, facebook'),
      responseStatus: z.string().optional().describe('Response status: pending, drafted, approved, posted, skipped'),
      limit: z.number().optional().default(20),
    },
    async ({ platform, responseStatus, limit }) => {
      const reviews = await prisma.review.findMany({
        where: {
          ...(platform && { platform }),
          ...(responseStatus && { responseStatus }),
        },
        select: {
          id: true, platform: true, author: true, rating: true, text: true,
          responseStatus: true, postedAt: true,
          client: { select: { name: true, city: true } },
        },
        orderBy: { postedAt: 'desc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(reviews, null, 2) }] };
    }
  );
}
