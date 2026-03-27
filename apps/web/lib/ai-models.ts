// apps/web/lib/ai-models.ts
// ─────────────────────────────────────────────────────────────
// Centralized AI Model Registry
// ─────────────────────────────────────────────────────────────
// Single source of truth for which model handles what.
// Import from here instead of hardcoding model strings.
//
// Routing logic:
//   gemini-3.1-pro   → reasoning, analysis, extraction, function calling
//   gemini-2.5-flash → chat, generation, summaries, spotlight copy
//   claude-haiku     → quick editorial copy (used in directory spotlight)
//
// Policy: Never hardcode model names in route files. Always import from here.

export const AI_MODELS = {
  /** Deep reasoning: analysis, function calling, spatial extraction, complex decisions */
  reasoning: 'gemini-3.1-pro',

  /** Fast generation: chat, summaries, spotlight copy, social posts, content drafts */
  generation: 'gemini-2.5-flash',

  /** Editorial copy: short-form writing, business spotlights */
  editorial: 'claude-haiku-4-5-20251001',
} as const;

export type AIModelRole = keyof typeof AI_MODELS;
export type AIModelId = (typeof AI_MODELS)[AIModelRole];

/**
 * Pick the right model for a task.
 * Usage: `model: pickModel('reasoning')`
 */
export function pickModel(role: AIModelRole): string {
  return AI_MODELS[role];
}
