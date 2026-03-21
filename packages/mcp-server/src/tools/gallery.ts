import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';

export function registerGalleryTools(server: McpServer) {
  server.tool(
    'list_artist_applications',
    'List BuyCurious Art artist applications. Filter by status.',
    {
      status: z.string().optional().describe('Application status: pending, approved, rejected'),
      limit: z.number().optional().default(20),
    },
    async ({ status, limit }) => {
      const apps = await prisma.artistApplication.findMany({
        where: status ? { status } : undefined,
        select: {
          id: true, name: true, email: true, city: true, state: true,
          medium: true, yearsActive: true, portfolioUrl: true, status: true, createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(apps, null, 2) }] };
    }
  );

  server.tool(
    'list_artworks',
    'List artworks in the BuyCurious Art gallery. Filter by category, availability, or artist.',
    {
      category: z.string().optional().describe('Artwork category: original, print, photograph, sculpture, craft'),
      available: z.boolean().optional().default(true),
      featured: z.boolean().optional(),
      limit: z.number().optional().default(20),
    },
    async ({ category, available, featured, limit }) => {
      const artworks = await prisma.artwork.findMany({
        where: {
          ...(category && { category }),
          ...(available !== undefined && { available }),
          ...(featured !== undefined && { featured }),
        },
        select: {
          id: true, title: true, slug: true, medium: true, dimensions: true,
          price: true, salePrice: true, category: true, available: true, featured: true,
          year: true, tags: true,
          artist: { select: { name: true, slug: true, city: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(artworks, null, 2) }] };
    }
  );

  server.tool(
    'list_artist_profiles',
    'List artist profiles on BuyCurious Art.',
    {
      status: z.string().optional().default('active').describe('Profile status: active, inactive, pending'),
      featured: z.boolean().optional(),
      limit: z.number().optional().default(20),
    },
    async ({ status, featured, limit }) => {
      const artists = await prisma.artistProfile.findMany({
        where: {
          ...(status && { status }),
          ...(featured !== undefined && { featured }),
        },
        select: {
          id: true, name: true, slug: true, city: true, state: true,
          medium: true, featured: true, status: true,
          _count: { select: { artworks: true } },
        },
        orderBy: { name: 'asc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(artists, null, 2) }] };
    }
  );
}
