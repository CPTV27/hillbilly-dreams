import { OPENROUTER_SLUGS } from '@/lib/ai-models';
import { ModelTier } from './modelTier';
import { emitLlmTelemetry, type LlmTelemetrySummary } from './tokenTelemetry';
import { getGeminiModel } from '@/lib/vertex-client'; // fallback for now

export type ToolBudget = { maxTokens?: number; maxSpendUsd?: number };

interface TelemetryOpts {
  toolId: string;
  traceId?: string;
  modelTier: ModelTier;
}

interface OpenRouterArgs {
  maxOutputTokens?: number;
  budget?: ToolBudget;
  telemetry?: TelemetryOpts;
  jsonMode?: boolean;
  /** OpenRouter reasoning payload when the provider supports it (non-Gemma paths). */
  thinkingMode?: boolean;
}

/** Alias for registry / docs that refer to "model ids". */
export { OPENROUTER_SLUGS as OPENROUTER_MODEL_IDS };

export function resolveModelByTier(tier?: ModelTier): string {
  switch (tier) {
    case ModelTier.ARCHITECT:
      return OPENROUTER_SLUGS.CLAUDE_3_7_SONNET;
    case ModelTier.CARPENTER:
      return OPENROUTER_SLUGS.GEMMA_4_31B_IT;
    case ModelTier.INTERN:
      return OPENROUTER_SLUGS.GEMMA_4_26B_A4B;
    default:
      return OPENROUTER_SLUGS.GEMMA_4_31B_IT;
  }
}

// Fallback pricing estimate for telemetry
function estimateCost(model: string, usage: any) {
  if (model.includes('sonnet')) return ((usage.prompt_tokens || 0) * 0.000003) + ((usage.completion_tokens || 0) * 0.000015);
  if (model.includes('flash')) return ((usage.prompt_tokens || 0) * 0.000000075) + ((usage.completion_tokens || 0) * 0.0000003);
  if (model.includes('gemma')) return ((usage.prompt_tokens || 0) * 0.00000015) + ((usage.completion_tokens || 0) * 0.0000006);
  return 0;
}

type OpenRouterResult = {
  text: string;
  model: string;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number; cost?: number };
  estimatedCostUsd: number;
};

async function generateTextOpenRouterRaw(
  model: string,
  userContent: string,
  opts?: OpenRouterArgs
): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const bodyData: Record<string, unknown> = {
    model,
    messages: [{ role: 'user', content: userContent }],
  };

  if (opts?.maxOutputTokens != null) {
    bodyData.max_tokens = opts.maxOutputTokens;
  }

  if (opts?.jsonMode) {
    bodyData.response_format = { type: 'json_object' };
  }

  if (opts?.thinkingMode) {
    bodyData.include_reasoning = true;
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.NEXTAUTH_URL || 'https://deepsouthdirectory.com',
      'X-Title': 'Big Muddy Edge - Token Guard',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenRouter HTTP ${res.status}: ${txt}`);
  }

  const data = await res.json();
  const content = data.choices[0]?.message?.content || '';

  const estimatedUsd = data.usage ? estimateCost(model, data.usage) : 0;

  if (opts?.telemetry) {
    emitLlmTelemetry({
      toolId: opts.telemetry.toolId,
      traceId: opts.telemetry.traceId,
      modelTier: opts.telemetry.modelTier,
      provider: 'openrouter',
      model,
      usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      estimatedCostUsd: estimatedUsd,
      at: new Date().toISOString(),
    });
  }

  return {
    text: content,
    model,
    usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0, cost: 0 },
    estimatedCostUsd: estimatedUsd,
  };
}

/**
 * Explicit OpenRouter model. No Vertex substitute.
 * `reasoningPrefix`: Gemma — lead the user turn with `<|think|>` so the model reasons before JSON / answer.
 */
export async function generateTextWithOpenRouterModel(
  model: string,
  prompt: string,
  opts?: OpenRouterArgs & { reasoningPrefix?: boolean }
): Promise<OpenRouterResult> {
  const userContent =
    opts?.reasoningPrefix === true && model.toLowerCase().includes('gemma')
      ? `<|think|>\n${prompt}`
      : prompt;
  return generateTextOpenRouterRaw(model, userContent, opts);
}

/**
 * Red Pen: Gemma 4 31B (thinking prefix) → JSON; falls back to Claude 3.7 Sonnet.
 */
export async function generateTextRedPen(
  prompt: string,
  opts?: OpenRouterArgs
): Promise<OpenRouterResult> {
  const primary = OPENROUTER_SLUGS.GEMMA_4_31B_IT;
  const fallback = OPENROUTER_SLUGS.CLAUDE_3_7_SONNET;
  try {
    return await generateTextWithOpenRouterModel(primary, prompt, {
      ...opts,
      reasoningPrefix: true,
      jsonMode: true,
    });
  } catch {
    return await generateTextWithOpenRouterModel(fallback, prompt, {
      ...opts,
      reasoningPrefix: false,
      jsonMode: true,
    });
  }
}

/** Voice Guard: style proximity score vs samples (26B MoE class). */
export async function generateStyleMatchScore(
  prompt: string,
  opts?: OpenRouterArgs
): Promise<OpenRouterResult> {
  return generateTextWithOpenRouterModel(OPENROUTER_SLUGS.GEMMA_4_26B_A4B, prompt, {
    ...opts,
    reasoningPrefix: false,
    jsonMode: true,
    maxOutputTokens: opts?.maxOutputTokens ?? 512,
  });
}

export async function generateTextWithTierOrVertex(tier: ModelTier, prompt: string, opts?: OpenRouterArgs) {
  const model = resolveModelByTier(tier);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    const vertexModel = getGeminiModel(tier === ModelTier.CARPENTER ? 'gemini-2.5-flash' : 'gemini-2.5-pro');
    const result = await vertexModel.generateContent(prompt);
    const content = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return {
      text: content,
      model: `vertex:${tier === ModelTier.CARPENTER ? 'gemini-2.5-flash' : 'gemini-2.5-pro'}`,
      usage: {
        prompt_tokens: result.response.usageMetadata?.promptTokenCount || 0,
        completion_tokens: result.response.usageMetadata?.candidatesTokenCount || 0,
        total_tokens: result.response.usageMetadata?.totalTokenCount || 0,
        cost: 0,
      },
      estimatedCostUsd: 0,
    };
  }

  return generateTextOpenRouterRaw(model, prompt, opts);
}
