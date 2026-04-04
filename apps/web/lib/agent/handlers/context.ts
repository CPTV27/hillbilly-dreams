import { prisma } from '@bigmuddy/database';
import { z } from 'zod';

export const ContextGetInputSchema = z.object({
  agent: z.string().optional(),
  topic: z.string().optional(),
  domain: z.string().optional(),
  q: z.string().optional(),
  key: z.string().optional(),
  limit: z.number().int().positive().max(100).optional().default(20),
  fresh: z.boolean().optional(),
});
export type ContextGetInput = z.infer<typeof ContextGetInputSchema>;

export const ContextPostInputSchema = z.object({
  domain: z.string().min(1),
  topic: z.string().min(1),
  key: z.string().min(1),
  content: z.string().min(1),
  source: z.string().optional(),
  agentAuthor: z.string().optional(),
  validUntil: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
});
export type ContextPostInput = z.infer<typeof ContextPostInputSchema>;

export async function executeGetContext(input: ContextGetInput) {
  const { topic, domain, q, key, limit, fresh } = input;

  const where: any = {};

  if (key) {
    where.key = key;
  }

  if (domain) {
    const domains = domain.split(',').map(d => d.trim());
    where.domain = domains.length === 1 ? domains[0] : { in: domains };
  }

  if (topic) {
    where.topic = { contains: topic, mode: 'insensitive' };
  }

  if (q) {
    where.content = { contains: q, mode: 'insensitive' };
  }

  if (fresh) {
    where.OR = [
      { validUntil: null },
      { validUntil: { gt: new Date() } },
    ];
    where.confidence = { gt: 0.3 };
  }

  const results = await prisma.agentContext.findMany({
    where,
    orderBy: [{ confidence: 'desc' }, { updatedAt: 'desc' }],
    take: limit,
  });

  return {
    success: true,
    count: results.length,
    results,
  };
}

export async function executePostContext(input: ContextPostInput) {
  const { domain, topic, key, content, source, agentAuthor, validUntil, confidence } = input;

  // Upsert — same domain+key overwrites (knowledge gets updated, not duplicated)
  const result = await prisma.agentContext.upsert({
    where: { domain_key: { domain, key } },
    create: {
      domain,
      topic,
      key,
      content,
      source: source || 'unknown',
      agentAuthor: agentAuthor || null,
      confidence: confidence ?? 1.0,
      validUntil: validUntil ? new Date(validUntil) : null,
    },
    update: {
      topic,
      content,
      source: source || undefined,
      agentAuthor: agentAuthor || undefined,
      confidence: confidence ?? 1.0,
      validUntil: validUntil ? new Date(validUntil) : null,
    },
  });

  return { success: true, id: result.id, key: result.key };
}
