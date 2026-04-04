import type { z } from 'zod';
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
import { OrchestrateInputSchema } from './schemas/orchestrate';

/** Who may invoke this tool at the HTTP edge or via orchestration. */
export enum ToolAuthClass {
  PUBLIC = 'PUBLIC',
  SESSION = 'SESSION',
  ADMIN = 'ADMIN',
}


export type ToolDefinition<S extends z.ZodTypeAny = z.ZodTypeAny> = {
  id: string;
  name: string;
  authClass: ToolAuthClass;
  modelTier?: ModelTier;
  inputSchema: S;
  execute?: (input: z.infer<S>, context?: ToolRunContext) => Promise<unknown>;
};

/** Per-invocation caps passed to `toolRegistry.get(id).execute(params, options)`. */
export type ToolExecuteOptions = {
  maxTokens?: number;
  /** Estimated USD cap for this single run (OpenRouter path; see `openRouter.ts`). */
  maxSpend?: number;
  traceId?: string;
  /** Admin-only: echo `_telemetry` on LLM-backed tool results when true. */
  includeTelemetry?: boolean;
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
 * Strip invocation meta (`maxTokens`, `maxSpend`, `traceId`, `includeTelemetry`) from a JSON body
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
  delete o.maxTokens;
  delete o.maxSpend;
  delete o.traceId;
  delete o.includeTelemetry;
  return { rest: o, opts: { maxTokens, maxSpend, traceId, includeTelemetry } };
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
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.CARPENTER,
    inputSchema: HarvestInputSchema,
  },
  'agent.context': {
    id: 'agent.context',
    name: 'Agent Context Write',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ContextPostInputSchema,
  },
  'agent.action': {
    id: 'agent.action',
    name: 'Agent Action Log',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ActionPostInputSchema,
  },
  'rook.orchestrate': {
    id: 'rook.orchestrate',
    name: 'Agent Orchestrator',
    authClass: ToolAuthClass.ADMIN,
    modelTier: ModelTier.ARCHITECT,
    inputSchema: OrchestrateInputSchema,
  },
  'system.context.get': {
    id: 'system.context.get',
    name: 'Get Agent Context',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ContextGetInputSchema,
    execute: (input) => executeGetContext(input),
  },
  'system.context.post': {
    id: 'system.context.post',
    name: 'Save Agent Context',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ContextPostInputSchema,
    execute: (input) => executePostContext(input),
  },
  'system.action.get': {
    id: 'system.action.get',
    name: 'Get Agent Actions',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ActionGetInputSchema,
    execute: (input) => executeGetAction(input),
  },
  'system.action.post': {
    id: 'system.action.post',
    name: 'Log Agent Action',
    authClass: ToolAuthClass.ADMIN,
    inputSchema: ActionPostInputSchema,
    execute: (input) => executePostAction(input),
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
