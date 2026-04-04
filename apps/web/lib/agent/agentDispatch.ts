import type { ModelTier } from '@/lib/ai/modelTier';
import type { ToolBudget } from '@/lib/ai/openRouter';
import { ActionPostInputSchema, executePostAction } from './handlers/action';
import { ContextPostInputSchema, executePostContext } from './handlers/context';
import { HarvestInputSchema, executeHarvest } from './handlers/harvest';

/** Propagated from `toolRegistry` + universal `POST /api/agent` into LLM-backed handlers (Token Guard). */
export type ToolRunContext = {
  budget?: ToolBudget;
  /** From registry `ToolDefinition.modelTier` for this tool id. */
  modelTier?: ModelTier;
  toolId?: string;
  traceId?: string;
  /** When true, successful LLM steps may attach `_telemetry` on the result payload (admin-only caller). */
  includeTelemetry?: boolean;
};

/** Map dispatcher / LLM tool paths → registry tool ids (POST bodies). */
const AGENT_TOOL_PATH_TO_ID: Record<string, string> = {
  '/api/agent/harvest': 'rook.harvest',
  '/api/agent/context': 'agent.context',
  '/api/agent/action': 'agent.action',
};

export function normalizeAgentToolPath(raw: string): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const p = raw.trim().replace(/\/$/, '');
  return AGENT_TOOL_PATH_TO_ID[p] ?? null;
}

/**
 * Run a registered in-process tool by id (Zod-safe). Used by `toolRegistry.get(id).execute`.
 */
export async function executeRegisteredToolId(
  id: string,
  params: unknown,
  ctx?: ToolRunContext
): Promise<unknown> {
  switch (id) {
    case 'rook.harvest': {
      const r = HarvestInputSchema.safeParse(params);
      if (!r.success) return { error: 'validation_failed', issues: r.error.flatten() };
      return executeHarvest(r.data, ctx);
    }
    case 'agent.context': {
      const r = ContextPostInputSchema.safeParse(params);
      if (!r.success) return { error: 'validation_failed', issues: r.error.flatten() };
      return executePostContext(r.data);
    }
    case 'agent.action': {
      const r = ActionPostInputSchema.safeParse(params);
      if (!r.success) return { error: 'validation_failed', issues: r.error.flatten() };
      return executePostAction(r.data);
    }
    default:
      return { error: 'unknown_tool_id', id };
  }
}
