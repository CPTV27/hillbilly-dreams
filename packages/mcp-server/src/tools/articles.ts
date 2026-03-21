import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';

export function registerArticleTools(server: McpServer) {
  server.tool(
    'search_articles',
    'Search published articles across all Big Muddy brands. Filter by title, category, city, or brand.',
    {
      query: z.string().optional().describe('Search term for title (case-insensitive)'),
      category: z.string().optional().describe('Article category: city-guide, feature, photo-essay, interview, food-drink, music'),
      city: z.string().optional().describe('City slug: memphis, clarksdale, natchez, new-orleans, vicksburg'),
      status: z.string().optional().default('published').describe('Article status: draft, review, published'),
      limit: z.number().optional().default(20).describe('Max results (capped at 50)'),
    },
    async ({ query, category, city, status, limit }) => {
      const articles = await prisma.article.findMany({
        where: {
          ...(query && { title: { contains: query, mode: 'insensitive' as const } }),
          ...(category && { category }),
          ...(city && { city }),
          ...(status && { status }),
        },
        select: {
          id: true, title: true, slug: true, category: true, city: true,
          author: true, status: true, excerpt: true, readTime: true,
          publishedAt: true, createdAt: true,
        },
        orderBy: { publishedAt: 'desc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(articles, null, 2) }] };
    }
  );

  server.tool(
    'get_article',
    'Get a single article by ID or slug. Returns full content.',
    {
      id: z.number().optional().describe('Article ID'),
      slug: z.string().optional().describe('Article slug'),
    },
    async ({ id, slug }) => {
      if (!id && !slug) {
        return { content: [{ type: 'text' as const, text: 'Provide either id or slug' }] };
      }
      const article = await prisma.article.findFirst({
        where: id ? { id } : { slug: slug! },
        select: {
          id: true, title: true, slug: true, category: true, city: true,
          author: true, status: true, excerpt: true, body: true, heroImage: true,
          readTime: true, publishedAt: true, createdAt: true, updatedAt: true,
        },
      });
      if (!article) {
        return { content: [{ type: 'text' as const, text: 'Article not found' }] };
      }
      return { content: [{ type: 'text' as const, text: JSON.stringify(article, null, 2) }] };
    }
  );
}
