import { prisma } from '@bigmuddy/database';
import { z } from 'zod';

export const ActionGetInputSchema = z.object({
  agent: z.string().optional(),
  domain: z.string().optional(),
  since: z.string().optional(),
  limit: z.number().int().positive().max(100).optional().default(20),
});
export type ActionGetInput = z.infer<typeof ActionGetInputSchema>;

export const ActionPostInputSchema = z.object({
  agent: z.string().min(1),
  action: z.string().min(1),
  summary: z.string().min(1),
  detail: z.string().optional(),
  domain: z.string().min(1),
  impact: z.string().optional(),
});
export type ActionPostInput = z.infer<typeof ActionPostInputSchema>;

export async function executeGetAction(input: ActionGetInput) {
  const { agent, domain, since, limit } = input;

  const where: any = {};

  if (agent) where.agent = agent;
  if (domain) where.domain = domain;
  if (since) where.createdAt = { gte: new Date(since) };

  const results = await prisma.agentAction.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return { success: true, count: results.length, results };
}

export async function executePostAction(input: ActionPostInput) {
  const { agent, action, summary, detail, domain, impact } = input;

  const result = await prisma.agentAction.create({
    data: {
      agent,
      action,
      summary,
      detail: detail || null,
      domain,
      impact: impact || null,
    },
  });

  return { success: true, id: result.id };
}
