import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { prisma } from '@bigmuddy/database';

export function registerOpsTools(server: McpServer) {
  server.tool(
    'list_tasks',
    'List launch tasks for the Inn operations dashboard. Filter by session or status.',
    {
      session: z.number().optional().describe('Session number (1-7)'),
      status: z.string().optional().describe('Task status: pending, done, skipped'),
      limit: z.number().optional().default(50),
    },
    async ({ session, status, limit }) => {
      const tasks = await prisma.launchTask.findMany({
        where: {
          ...(session && { session }),
          ...(status && { status }),
        },
        select: {
          taskNumber: true, title: true, session: true, sessionName: true,
          platform: true, timeEstimate: true, status: true, assignedTo: true,
          link: true, completedAt: true, completedBy: true,
        },
        orderBy: { taskNumber: 'asc' },
        take: Math.min(limit ?? 50, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(tasks, null, 2) }] };
    }
  );

  server.tool(
    'list_activity',
    'Get recent ops activity feed (logins, task completions, chat messages).',
    {
      limit: z.number().optional().default(20).describe('Max results (capped at 50)'),
    },
    async ({ limit }) => {
      const activity = await prisma.opsActivity.findMany({
        select: {
          id: true, type: true, message: true, userName: true, taskId: true, createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: Math.min(limit ?? 20, 50),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(activity, null, 2) }] };
    }
  );

  server.tool(
    'get_content_packs',
    'List all content packs (pre-written copy for Google, Facebook, Yelp, etc.).',
    {},
    async () => {
      const packs = await prisma.contentPack.findMany({
        select: { slug: true, title: true, sections: true },
        orderBy: { slug: 'asc' },
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(packs, null, 2) }] };
    }
  );

  server.tool(
    'get_metrics',
    'Get current dashboard metrics (occupancy, subscribers, followers, etc.).',
    {},
    async () => {
      const metrics = await prisma.metric.findMany({
        select: { key: true, value: true, target: true, label: true, unit: true, source: true, updatedAt: true },
        orderBy: { key: 'asc' },
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(metrics, null, 2) }] };
    }
  );
}
