import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';

export function registerContentTools(server: McpServer) {
  server.tool(
    'list_playlists',
    'List Big Muddy Radio playlists.',
    {
      status: z.string().optional().default('active').describe('Playlist status: active, archived'),
      limit: z.number().optional().default(20),
    },
    async ({ status, limit }) => {
      const playlists = await prisma.playlist.findMany({
        where: status ? { status } : undefined,
        select: {
          id: true, name: true, description: true, trackCount: true,
          spotifyUrl: true, status: true, createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(playlists, null, 2) }] };
    }
  );

  server.tool(
    'list_newsletters',
    'List Big Muddy Newsletter issues.',
    {
      status: z.string().optional().describe('Newsletter status: draft, scheduled, sent'),
      limit: z.number().optional().default(10),
    },
    async ({ status, limit }) => {
      const issues = await prisma.newsletterIssue.findMany({
        where: status ? { status } : undefined,
        select: {
          id: true, issueNumber: true, subject: true, storyTitle: true,
          playlist: true, status: true, sendDate: true, createdAt: true,
        },
        orderBy: { issueNumber: 'desc' },
        take: Math.min(limit ?? 10, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(issues, null, 2) }] };
    }
  );

  server.tool(
    'list_publications',
    'List books, zines, and print publications.',
    {
      status: z.string().optional().describe('Publication status: draft, production, preorder, available, sold-out, archived'),
      limit: z.number().optional().default(10),
    },
    async ({ status, limit }) => {
      const pubs = await prisma.publication.findMany({
        where: status ? { status } : undefined,
        select: {
          id: true, title: true, slug: true, subtitle: true, author: true,
          category: true, format: true, price: true, status: true,
          edition: true, soldCount: true, publishedAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: Math.min(limit ?? 10, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(pubs, null, 2) }] };
    }
  );

  server.tool(
    'list_contacts',
    'List CRM contacts. Filter by category.',
    {
      category: z.string().optional().describe('Contact category: artist, vendor, media, partner, guest, team'),
      limit: z.number().optional().default(20),
    },
    async ({ category, limit }) => {
      const contacts = await prisma.contact.findMany({
        where: category ? { category } : undefined,
        select: {
          id: true, name: true, role: true, organization: true,
          email: true, category: true, lastContact: true,
        },
        orderBy: { name: 'asc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(contacts, null, 2) }] };
    }
  );
}
