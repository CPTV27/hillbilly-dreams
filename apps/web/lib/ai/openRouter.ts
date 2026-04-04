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
}

export function resolveModelByTier(tier?: ModelTier): string {
  switch (tier) {
    case ModelTier.ARCHITECT:
      return 'anthropic/claude-3.7-sonnet';
    case ModelTier.CARPENTER:
      return 'google/gemini-2.5-flash';
    case ModelTier.INTERN:
      return 'meta-llama/llama-3.1-8b-instruct';
    default:
      return 'google/gemini-2.5-flash';
  }
}

// Fallback pricing estimate for telemetry
function estimateCost(model: string, usage: any) {
  if (model.includes('sonnet')) return ((usage.prompt_tokens || 0) * 0.000003) + ((usage.completion_tokens || 0) * 0.000015);
  if (model.includes('flash')) return ((usage.prompt_tokens || 0) * 0.000000075) + ((usage.completion_tokens || 0) * 0.0000003);
  return 0; // llama is virtually free
}

export async function generateTextWithTierOrVertex(tier: ModelTier, prompt: string, opts?: OpenRouterArgs) {
  const model = resolveModelByTier(tier);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    // If no OpenRouter key, fallback natively to vertex
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

  const bodyData: any = {
    model,
    messages: [{ role: 'user', content: prompt }],
  };

  if (opts?.jsonMode) {
    bodyData.response_format = { type: 'json_object' };
  }

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
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
      at: new Date().toISOString()
    });
  }

  return {
    text: content,
    model,
    usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0, cost: 0 },
    estimatedCostUsd: estimatedUsd,
  };
}
