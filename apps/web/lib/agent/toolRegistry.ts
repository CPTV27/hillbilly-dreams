import { z } from 'zod';
import type { ToolBudget } from '@/lib/ai/openRouter';
import { ModelTier } from '@/lib/ai/modelTier';
import { executeRegisteredToolId, type ToolRunContext } from './agentDispatch';
import {
  ActionGetInputSchema,
  ActionPostInputSchema,
  executeGetAction,
  executePostAction,
} from './handlers/action';
import {
  ContextGetInputSchema,
  ContextPostInputSchema,
  executeGetContext,
  executePostContext,
} from './handlers/context';
import { HarvestInputSchema } from './handlers/harvest';
import {
  ContentReviewInputSchema,
  executeContentReview,
  executeStyleMatch,
  executeVisualPlaceholder,
  StyleMatchInputSchema,
  VisualPlaceholderInputSchema,
} from './handlers/editorialBureau';
import {
  executeMediaTranscribe,
  MediaTranscribeInputSchema,
} from './handlers/mediaTranscribe';
import { OrchestrateInputSchema } from './schemas/orchestrate';

// ChromaDB lore tool loaded dynamically to avoid bundling onnxruntime-node binaries.
// Schema is inline; execute() lazy-imports the module.
const queryLoreSchema = z.object({
  query: z.string().describe('The user question or subject to search for.'),
  namespace: z.enum(['lore_manuals', 'lore_journals', 'lore_sops']).describe('Which collection to search.'),
  maxResults: z.number().optional().describe('Max chunks to return (default 3).'),
});

/** Who may invoke this tool at the HTTP edge or via orchestration. */
export enum ToolAuthClass {
  PUBLIC = 'PUBLIC',
  SESSION = 'SESSION',
  ADMIN = 'ADMIN',
}


export type ToolDefinition<S extends z.ZodTypeAny = z.ZodTypeAny> = {
  id: string;
  name: string;
  /** Shown in Admin Command Plane / registry API only. */
  description?: string;
  authClass: ToolAuthClass;
  modelTier?: ModelTier;
  inputSchema: S;
  execute?: (input: z.infer<S>, context?: ToolRunContext) => Promise<unknown>;
};

export type ToolExecuteOptions = {
  maxTokens?: number;
  /** Estimated USD cap for this single run (OpenRouter path; see `openRouter.ts`). */
  maxSpend?: number;
  traceId?: string;
  /** Admin-only: echo `_telemetry` on LLM-backed tool results when true. */
  includeTelemetry?: boolean;
  /** Phase 1.8: Route writes to Sandbox mirrored tables */
  isSandbox?: boolean;
  /** Injected at HTTP edge from NextAuth session (not from tool params). */
  createdByUserId?: string;
};

export type RegisteredTool = {
  meta: ToolDefinition;
  execute: (params: unknown, execOpts?: ToolExecuteOptions) => Promise<unknown>;
};

export function toolExecuteOptionsToBudget(opts?: ToolExecuteOptions): ToolBudget | undefined {
  if (opts?.maxTokens == null && opts?.maxSpend == null) return undefined;
  return { maxTokens: opts.maxTokens, maxSpendUsd: opts.maxSpend };
}

/**
 * Strip invocation meta (`maxTokens`, `maxSpend`, `traceId`, `includeTelemetry`, `isSandbox`) from a JSON body
 * so the remainder matches a strict Zod tool schema.
 */
export function peelAgentInvocationOptions(raw: unknown): { rest: unknown; opts: ToolExecuteOptions } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { rest: raw, opts: {} };
  }
  const o = { ...(raw as Record<string, unknown>) };
  const maxTokens = typeof o.maxTokens === 'number' && Number.isFinite(o.maxTokens) ? o.maxTokens : undefined;
  const maxSpend = typeof o.maxSpend === 'number' && Number.isFinite(o.maxSpend) ? o.maxSpend : undefined;
  const traceId =
    typeof o.traceId === 'string' && o.traceId.trim().length > 0 ? o.traceId.trim().slice(0, 128) : undefined;
  const includeTelemetry = o.includeTelemetry === true;
  const isSandbox = o.isSandbox === true;
  delete o.maxTokens;
  delete o.maxSpend;
  delete o.traceId;
  delete o.includeTelemetry;
  delete o.isSandbox;
  return { rest: o, opts: { maxTokens, maxSpend, traceId, includeTelemetry, isSandbox } };
}

/** @deprecated Use `peelAgentInvocationOptions` */
export const peelBudgetFields = peelAgentInvocationOptions;

/** Build Token Guard context for a registry tool (tier + budget + trace). */
export function buildToolRunContext(
  toolId: string,
  meta: ToolDefinition,
  execOpts?: ToolExecuteOptions
): ToolRunContext {
  return {
    budget: toolExecuteOptionsToBudget(execOpts),
    modelTier: meta.modelTier,
    toolId,
    traceId: execOpts?.traceId,
    includeTelemetry: execOpts?.includeTelemetry === true,
    isSandbox: execOpts?.isSandbox === true,
    createdByUserId:
      typeof execOpts?.createdByUserId === 'string' && execOpts.createdByUserId.length > 0
        ? execOpts.createdByUserId
        : undefined,
  };
}

/**
 * Allowlisted agent tools — contract-coded surfaces only.
 * Anything callable under /api/agent/* that is not registered here is shadow debt.
 */
export const TOOL_REGISTRY = {
  'rook.harvest': {
    id: 'rook.harvest',
    name: 'Directory Harvest',
    description: 'Research and ingest regional businesses for the Deep South Directory (LLM + Prisma).',
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.CARPENTER,
    inputSchema: HarvestInputSchema,
  },
  'agent.context': {
    id: 'agent.context',
    name: 'Agent Context Write',
    description: 'Upsert a knowledge fragment (domain + key) for agent memory.',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ContextPostInputSchema,
  },
  'agent.action': {
    id: 'agent.action',
    name: 'Agent Action Log',
    description: 'Append a row to the coordination / audit log.',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ActionPostInputSchema,
  },
  'rook.orchestrate': {
    id: 'rook.orchestrate',
    name: 'Agent Orchestrator',
    description: 'Natural-language dispatcher: routes to registry tools or marketing APIs (ARCHITECT tier routing).',
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.ARCHITECT,
    inputSchema: OrchestrateInputSchema,
  },
  'system.context.get': {
    id: 'system.context.get',
    name: 'Get Agent Context',
    description: 'Query stored context fragments (filters: domain, topic, q, key, fresh).',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ContextGetInputSchema,
    execute: (input) => executeGetContext(input),
  },
  'system.context.post': {
    id: 'system.context.post',
    name: 'Save Agent Context',
    description: 'Same contract as agent.context write — explicit system tool id for universal router.',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ContextPostInputSchema,
    execute: (input) => executePostContext(input),
  },
  'system.action.get': {
    id: 'system.action.get',
    name: 'Get Agent Actions',
    description: 'Query recent agent actions (filters: agent, domain, since).',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ActionGetInputSchema,
    execute: (input) => executeGetAction(input),
  },
  'system.action.post': {
    id: 'system.action.post',
    name: 'Log Agent Action',
    description: 'Same as agent.action — explicit system tool id for universal router.',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ActionPostInputSchema,
    execute: (input) => executePostAction(input),
  },
  'tool.visual.placeholder': {
    id: 'tool.visual.placeholder',
    name: 'Editorial Visual Placeholder',
    description:
      'Generate an ideal-shot placeholder via Vertex Imagen, upload to GCS, attach to a Job (Editorial Bureau).',
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.CARPENTER,
    inputSchema: VisualPlaceholderInputSchema,
    execute: (input, ctx) => executeVisualPlaceholder(input, ctx),
  },
  'system.content-review': {
    id: 'system.content-review',
    name: 'Red Pen (Content Review)',
    description:
      'Gemma 4 Red Pen pass vs StyleGuide samples (thinking prefix); falls back to Claude. Optional persist to Job.',
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.CARPENTER,
    inputSchema: ContentReviewInputSchema,
    execute: (input, ctx) => executeContentReview(input, ctx),
  },
  'system.editorial.style_match': {
    id: 'system.editorial.style_match',
    name: 'Voice Guard (Style Match)',
    description: 'Score draft vs StyleGuide samples (Gemma 26B-class) — JSON score + rationale.',
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.INTERN,
    inputSchema: StyleMatchInputSchema,
    execute: (input, ctx) => executeStyleMatch(input, ctx),
  },
  'tool.lore.query': {
    id: 'tool.lore.query',
    name: 'Sovereign Lore Query',
    description: 'Retrieve semantic knowledge chunks from the local ChromaDB Sovereign Engine (Zero Cloud RAG). Currently stubbed — implementation was removed during codebase prune.',
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.CARPENTER,
    inputSchema: queryLoreSchema,
    execute: async () => {
      return { success: false, error: 'Lore query tool not yet re-implemented' };
    },
  },
  'tool.media.transcribe': {
    id: 'tool.media.transcribe',
    name: 'Audio Lore Transcription (placeholder)',
    description:
      'Radio Studio audio → transcript chunks → Chroma `lore_media` namespace. Stub until STT + collection wiring ships.',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: MediaTranscribeInputSchema,
    execute: (input) => executeMediaTranscribe(input),
  },
} as const satisfies Record<string, ToolDefinition>;

export type ToolRegistryKey = keyof typeof TOOL_REGISTRY;

export const toolRegistry = {
  get(id: string): RegisteredTool | null {
    const meta = TOOL_REGISTRY[id as ToolRegistryKey] as ToolDefinition | undefined;
    if (!meta) return null;

    if (typeof meta.execute === 'function') {
      return {
        meta,
        execute: async (params: unknown, execOpts?: ToolExecuteOptions) => {
          const parsed = meta.inputSchema.safeParse(params);
          if (!parsed.success) {
            return { error: 'validation_failed', issues: parsed.error.flatten() };
          }
          return meta.execute!(parsed.data, buildToolRunContext(id, meta, execOpts));
        },
      };
    }

    if (id === 'rook.orchestrate') {
      return {
        meta,
        execute: async (params: unknown, execOpts?: ToolExecuteOptions) => {
          const { executeOrchestrate } = await import('./handlers/orchestrate');
          const parsed = OrchestrateInputSchema.safeParse(params);
          if (!parsed.success) {
            return { error: 'validation_failed', issues: parsed.error.flatten() };
          }
          return executeOrchestrate(parsed.data, buildToolRunContext('rook.orchestrate', meta, execOpts));
        },
      };
    }

    return {
      meta,
      execute: (params: unknown, execOpts?: ToolExecuteOptions) =>
        executeRegisteredToolId(id, params, buildToolRunContext(id, meta, execOpts)),
    };
  },
};
