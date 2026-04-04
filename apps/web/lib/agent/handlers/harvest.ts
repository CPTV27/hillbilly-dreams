import { prisma } from '@bigmuddy/database';
import { z } from 'zod';
import { ModelTier } from '@/lib/ai/modelTier';
import { generateTextWithTierOrVertex } from '@/lib/ai/openRouter';
import type { LlmTelemetrySummary } from '@/lib/ai/tokenTelemetry';
import type { ToolRunContext } from '@/lib/agent/agentDispatch';

/** Strict POST body for rook.harvest (regional directory research). */
export const HarvestInputSchema = z
  .object({
    city: z.string().trim().min(1).max(200).optional(),
    category: z.string().trim().max(500).optional(),
    /** Miles — reserved for future Places/geo use; not applied in current pipeline. */
    radius: z.number().finite().positive().max(500).optional(),
    /** Max businesses to request from the model (capped at 50). */
    limit: z.number().int().positive().max(50).optional(),
  })
  .strict();

export type HarvestInput = z.infer<typeof HarvestInputSchema>;

export type HarvestBusinessSummary = {
  name: string;
  category?: string;
  tier?: string;
  urgency?: string;
  digitalGapScore?: number;
};

export type HarvestResult =
  | {
      ok: true;
      location: string;
      found: number;
      saved: number;
      errors: number;
      businesses: HarvestBusinessSummary[];
      _telemetry?: LlmTelemetrySummary;
    }
  | { ok: false; error: string; detail?: string };

const DEFAULT_CATEGORY = 'restaurants, lodging, retail, arts, entertainment';

/**
 * Core harvest pipeline: tiered LLM (CARPENTER / OpenRouter) → DirectoryBusiness + AgentContext + AgentAction log.
 */
export async function executeHarvest(input: HarvestInput, ctx?: ToolRunContext): Promise<HarvestResult> {
  const location = input.city ?? 'Natchez, Mississippi';
  const searchCategory = input.category ?? DEFAULT_CATEGORY;
  const maxResults = Math.min(input.limit ?? 20, 50);
  const tier = ctx?.modelTier ?? ModelTier.CARPENTER;

  const researchPrompt = `You are a business researcher for the Deep South Directory, a regional business network in ${location}.

Research and identify ${maxResults} real businesses in ${location} in these categories: ${searchCategory}.

For EACH business, provide:
- name: The actual business name
- category: Food & Drink | Lodging | Arts & Culture | Retail | Services | Entertainment
- address: Street address if known
- phone: Phone number if known
- website: Website URL if known
- description: One sentence about what makes them special
- googleRating: Estimated Google rating (realistic, 3.0-5.0)
- reviewCount: Estimated review count (realistic)
- digitalGapScore: 1-100 (100 = completely invisible online, needs help most)
- tierRecommendation: "free" | "starter_20" | "growth_50" | "engine_99" | "operator_499"
- aestheticFlavor: "The Delta Dark" | "The Modern MainStreet" | "The Broadside" | "The White Walls" | "The Paper Trail"
- urgency: "high" | "medium" | "low" — how urgently they need the DSD Engine
- whyUrgent: One sentence explaining the marketing gap

Focus on REAL businesses that actually exist in ${location}. Use your knowledge of the area.
Prioritize: high-rated businesses with low online presence (the "Invisible Gems").

Return ONLY valid JSON array (no markdown):
[{ "name": "...", ... }]`;

  let businesses: unknown[];
  let llm: Awaited<ReturnType<typeof generateTextWithTierOrVertex>> | undefined;
  try {
    llm = await generateTextWithTierOrVertex(tier, researchPrompt, {
      maxOutputTokens: 8192,
      budget: ctx?.budget,
      telemetry: {
        toolId: ctx?.toolId ?? 'rook.harvest',
        traceId: ctx?.traceId,
        modelTier: tier,
      },
    });
    const responseText = llm.text;
    const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned || '[]') as unknown;
    if (!Array.isArray(parsed)) {
      return { ok: false, error: 'Invalid model output', detail: 'Expected a JSON array' };
    }
    businesses = parsed;
  } catch (e) {
    if (e instanceof Error && e.message === 'Budget Exceeded') {
      return { ok: false, error: 'Budget Exceeded', detail: (e as Error & { code?: string }).code };
    }
    const message = e instanceof Error ? e.message : String(e);
    return { ok: false, error: 'Harvest failed', detail: message };
  }

  let saved = 0;
  let errors = 0;

  for (const biz of businesses) {
    if (!biz || typeof biz !== 'object' || !('name' in biz) || typeof (biz as { name: unknown }).name !== 'string') {
      errors++;
      continue;
    }
    const row = biz as Record<string, unknown>;
    try {
      const slug = String(row.name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const createData = {
        name: String(row.name),
        slug,
        category: typeof row.category === 'string' ? row.category : 'Services',
        city: location.split(',')[0].trim(),
        state: location.split(',')[1]?.trim()?.replace(/^\s+/, '') || 'MS',
        description:
          typeof row.description === 'string' ? row.description : 'Local business in ' + location,
        contactName: 'DSD Harvest',
        contactEmail: 'harvest@deepsouthdirectory.com',
        tier:
          row.tierRecommendation === 'operator_499'
            ? 'the_route'
            : row.tierRecommendation === 'engine_99'
              ? 'main_street'
              : 'free',
        googleRating: row.googleRating != null ? parseFloat(String(row.googleRating)) : null,
        googleReviewCount: row.reviewCount != null ? parseInt(String(row.reviewCount), 10) : null,
        website: typeof row.website === 'string' ? row.website : null,
        phone: typeof row.phone === 'string' ? row.phone : null,
        address: typeof row.address === 'string' ? row.address : null,
        active: false,
      };

      const updateData = {
        description: typeof row.description === 'string' ? row.description : undefined,
        googleRating: row.googleRating != null ? parseFloat(String(row.googleRating)) : undefined,
        googleReviewCount: row.reviewCount != null ? parseInt(String(row.reviewCount), 10) : undefined,
      };

      const contextKey = `harvest.${slug}`;
      const contextCreateData = {
        domain: 'marketing',
        key: contextKey,
        topic: 'harvest-audit',
        content: JSON.stringify(row),
        source: `api/agent/harvest/${location}`,
        agentAuthor: 'rook-harvester',
        confidence: 0.8,
      };

      if (ctx?.isSandbox === true) {
        const uid = ctx.createdByUserId ?? null;
        await prisma.draftBusiness.upsert({
          where: { slug },
          create: { ...createData, createdByUserId: uid },
          update: { ...updateData, createdByUserId: uid ?? undefined },
        });
        await prisma.draftContext.upsert({
          where: { domain_key: { domain: 'marketing', key: contextKey } },
          create: { ...contextCreateData, createdByUserId: uid },
          update: { content: JSON.stringify(row), confidence: 0.8, createdByUserId: uid ?? undefined },
        });
      } else {
        await prisma.directoryBusiness.upsert({ where: { slug }, create: createData, update: updateData });
        await prisma.agentContext.upsert({
          where: { domain_key: { domain: 'marketing', key: contextKey } },
          create: contextCreateData,
          update: { content: JSON.stringify(row), confidence: 0.8 },
        });
      }

      saved++;
    } catch {
      errors++;
    }
  }

  try {
    const actionData = {
      agent: 'rook',
      action: 'harvest',
      summary: `Harvested ${saved} businesses in ${location} (${searchCategory})`,
      detail: `Found ${businesses.length}, saved ${saved}, errors ${errors}. Categories: ${searchCategory}`,
      domain: 'marketing',
      impact: 'high',
    };

    if (ctx?.isSandbox === true) {
      await prisma.draftAction.create({
        data: {
          ...actionData,
          summary: `[SANDBOX] ${actionData.summary}`,
          createdByUserId: ctx.createdByUserId ?? null,
        },
      });
    } else {
      await prisma.agentAction.create({ data: actionData });
    }
  } catch {
    // non-fatal
  }

  const base: HarvestResult = {
    ok: true,
    location,
    found: businesses.length,
    saved,
    errors,
    businesses: businesses
      .filter((b): b is Record<string, unknown> => b != null && typeof b === 'object' && 'name' in b)
      .map((b) => ({
        name: String(b.name),
        category: typeof b.category === 'string' ? b.category : undefined,
        tier: typeof b.tierRecommendation === 'string' ? b.tierRecommendation : undefined,
        urgency: typeof b.urgency === 'string' ? b.urgency : undefined,
        digitalGapScore:
          typeof b.digitalGapScore === 'number'
            ? b.digitalGapScore
            : b.digitalGapScore != null
              ? Number(b.digitalGapScore)
              : undefined,
      })),
  };

  if (ctx?.includeTelemetry === true && llm) {
    const summary: LlmTelemetrySummary = {
      toolId: ctx.toolId ?? 'rook.harvest',
      traceId: ctx.traceId,
      modelTier: tier,
      provider: llm.model.startsWith('vertex:') ? 'vertex' : 'openrouter',
      model: llm.model,
      usage: {
        prompt_tokens: llm.usage.prompt_tokens,
        completion_tokens: llm.usage.completion_tokens,
        total_tokens: llm.usage.total_tokens,
        cost: llm.usage.cost,
      },
      estimatedCostUsd: llm.estimatedCostUsd,
    };
    return { ...base, _telemetry: summary };
  }

  return base;
}
