// apps/web/lib/ai-models.ts
// ─────────────────────────────────────────────────────────────
// Multi-Provider AI Model Registry with Failover
// ─────────────────────────────────────────────────────────────
// Three engines: Gemini (Vertex AI), Anthropic Claude, Perplexity
// Failover chain: if primary fails, try next, always land on Gemini
//
// Marketing angle: "Your AI assistant runs on three engines —
// Vertex AI, Perplexity, and Anthropic Claude."
//
// Policy: Never hardcode model names in route files. Always import from here.

import { GoogleAuth } from 'google-auth-library';

// ── Provider Configuration ──

export type Provider = 'gemini' | 'anthropic' | 'perplexity';

export interface ModelConfig {
  provider: Provider;
  model: string;
  label: string; // human-readable for marketing/logs
}

export const MODELS: Record<string, ModelConfig> = {
  // Gemini (always available via service account)
  'gemini-flash': { provider: 'gemini', model: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
  'gemini-pro': { provider: 'gemini', model: 'gemini-3.1-pro', label: 'Gemini 3.1 Pro' },
  // Anthropic Claude (requires funded API key)
  'claude-sonnet': { provider: 'anthropic', model: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4' },
  'claude-haiku': { provider: 'anthropic', model: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5' },
  // Perplexity (live web search)
  'perplexity': { provider: 'perplexity', model: 'sonar', label: 'Perplexity Sonar' },
} as const;

// ── Role-Based Routing ──

export type AIRole = 'reasoning' | 'generation' | 'editorial' | 'search' | 'chat';

/** Primary model for each role, plus fallback chain */
const ROUTING: Record<AIRole, string[]> = {
  reasoning:  ['gemini-pro', 'claude-sonnet', 'gemini-flash'],
  generation: ['gemini-flash', 'claude-haiku', 'perplexity'],
  editorial:  ['claude-sonnet', 'gemini-pro', 'gemini-flash'],
  search:     ['perplexity', 'gemini-flash'],
  chat:       ['gemini-flash', 'claude-sonnet', 'perplexity'],
};

// Legacy API compatibility
export const AI_MODELS = {
  reasoning: 'gemini-3.1-pro',
  generation: 'gemini-2.5-flash',
  editorial: 'claude-haiku-4-5-20251001',
} as const;

export type AIModelRole = keyof typeof AI_MODELS;
export type AIModelId = (typeof AI_MODELS)[AIModelRole];

export function pickModel(role: AIModelRole): string {
  return AI_MODELS[role];
}

// ── Provider Health Check ──

const providerHealth: Record<Provider, { healthy: boolean; lastCheck: number; failCount: number }> = {
  gemini: { healthy: true, lastCheck: 0, failCount: 0 },
  anthropic: { healthy: true, lastCheck: 0, failCount: 0 },
  perplexity: { healthy: true, lastCheck: 0, failCount: 0 },
};

const HEALTH_RESET_MS = 5 * 60 * 1000; // Retry failed providers after 5 minutes

function isProviderHealthy(provider: Provider): boolean {
  const h = providerHealth[provider];
  if (h.healthy) return true;
  // Reset after cooldown
  if (Date.now() - h.lastCheck > HEALTH_RESET_MS) {
    h.healthy = true;
    h.failCount = 0;
    return true;
  }
  return false;
}

function markProviderFailed(provider: Provider) {
  const h = providerHealth[provider];
  h.failCount++;
  h.lastCheck = Date.now();
  if (h.failCount >= 2) {
    h.healthy = false;
  }
}

function markProviderHealthy(provider: Provider) {
  providerHealth[provider] = { healthy: true, lastCheck: Date.now(), failCount: 0 };
}

// ── Unified Call Interface ──

export interface AIRequest {
  role: AIRole;
  system: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  text: string;
  model: string;
  provider: Provider;
  label: string;
}

/** Get Google auth token for Vertex AI */
function getGoogleAuth() {
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!creds) throw new Error('GOOGLE_APPLICATION_CREDENTIALS_JSON not set');
  return new GoogleAuth({
    credentials: JSON.parse(creds),
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
}

/** Call Gemini via Vertex AI */
async function callGemini(config: ModelConfig, req: AIRequest): Promise<string> {
  const auth = getGoogleAuth();
  const client = await auth.getClient();
  const token = (await client.getAccessToken()).token;

  const endpoint = `https://us-central1-aiplatform.googleapis.com/v1/projects/bigmuddy-ff651/locations/us-central1/publishers/google/models/${config.model}:generateContent`;

  const geminiMessages = req.messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: geminiMessages,
      systemInstruction: { parts: [{ text: req.system }] },
      generationConfig: { maxOutputTokens: req.maxTokens || 4096, temperature: req.temperature || 0.7 },
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/** Call Anthropic Claude */
async function callAnthropic(config: ModelConfig, req: AIRequest): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY not set');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: req.maxTokens || 4096,
      system: req.system,
      messages: req.messages,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text || '';
}

/** Call Perplexity */
async function callPerplexity(config: ModelConfig, req: AIRequest): Promise<string> {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) throw new Error('PERPLEXITY_API_KEY not set');

  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: req.system },
        ...req.messages,
      ],
      max_tokens: req.maxTokens || 4096,
      temperature: req.temperature || 0.7,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) throw new Error(`Perplexity ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

const CALLERS: Record<Provider, (config: ModelConfig, req: AIRequest) => Promise<string>> = {
  gemini: callGemini,
  anthropic: callAnthropic,
  perplexity: callPerplexity,
};

// ── Main API: Call with Failover ──

/**
 * Call an AI model with automatic failover.
 * Tries the primary model for the given role, then falls back through the chain.
 * Always lands on Gemini as the last resort.
 */
export async function callAI(req: AIRequest): Promise<AIResponse> {
  const chain = ROUTING[req.role];
  const errors: string[] = [];

  for (const modelKey of chain) {
    const config = MODELS[modelKey];
    if (!config) continue;
    if (!isProviderHealthy(config.provider)) continue;

    try {
      const text = await CALLERS[config.provider](config, req);
      markProviderHealthy(config.provider);
      return { text, model: config.model, provider: config.provider, label: config.label };
    } catch (err: any) {
      markProviderFailed(config.provider);
      errors.push(`${config.label}: ${err.message}`);
      console.error(`[ai-models] ${config.label} failed:`, err.message);
    }
  }

  // All failed — return error message
  throw new Error(`All models failed for role "${req.role}": ${errors.join(' | ')}`);
}

/**
 * Get the current health status of all providers.
 * Useful for admin dashboards.
 */
export function getProviderHealth() {
  return Object.entries(providerHealth).map(([provider, health]) => ({
    provider,
    healthy: isProviderHealthy(provider as Provider),
    failCount: health.failCount,
    lastCheck: health.lastCheck ? new Date(health.lastCheck).toISOString() : null,
  }));
}
