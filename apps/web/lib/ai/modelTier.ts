/**
 * Registry-facing model tiers for usage-based routing (OpenRouter primary path).
 * Maps to capability classes — not raw vendor strings (those live in openRouter.ts).
 */
export enum ModelTier {
  /** Orchestration, routing, coding — highest capability. */
  ARCHITECT = 'ARCHITECT',
  /** Bulk harvest, extraction, high-volume generation — fast / cheap. */
  CARPENTER = 'CARPENTER',
  /** Classification, summarization, light tasks — smallest models. */
  INTERN = 'INTERN',
}
