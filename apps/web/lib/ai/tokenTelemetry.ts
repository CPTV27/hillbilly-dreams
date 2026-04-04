/**
 * Phase 1.6 — Token Guard telemetry (structured, opt-in logging).
 * Enable with LLM_TELEMETRY_LOG=1. Does not import OpenRouter to avoid cycles.
 */
import type { ModelTier } from '@/lib/ai/modelTier';

export type TelemetryUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost?: number;
};

/** Returned to admins when `includeTelemetry: true` on the universal agent route. */
export type LlmTelemetrySummary = {
  toolId?: string;
  traceId?: string;
  modelTier: ModelTier;
  provider: 'openrouter' | 'vertex';
  model: string;
  usage: TelemetryUsage;
  estimatedCostUsd: number;
};

export function emitLlmTelemetry(entry: LlmTelemetrySummary & { at: string }): void {
  if (process.env.LLM_TELEMETRY_LOG !== '1') return;
  const payload = { type: 'llm.usage', ...entry };
  console.info(JSON.stringify(payload));
}

/*
 * Phase 1.6 — remaining shadow LLM surfaces (direct SDK / vendor HTTP), to fold under tiered routing:
 * - apps/web/app/api/clients/[id]/voice/route.ts — @anthropic-ai/sdk
 * - apps/web/app/api/clients/[id]/calendar/route.ts — @anthropic-ai/sdk
 * - apps/web/app/api/directory/submit/route.ts — @anthropic-ai/sdk
 * - apps/web/app/api/social/generate/route.ts — @anthropic-ai/sdk
 * - apps/web/lib/whisper.ts — openai (audio)
 * - apps/web/app/api/voice/stream/route.ts — api.openai.com transcriptions
 */
