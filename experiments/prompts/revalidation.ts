// experiments/prompts/revalidation.ts
// Tunable variables for Next.js ISR revalidation intervals
// The auto-research agent can mutate these values and measure impact on:
//   - API latency (KPI: api_avg_latency_ms)
//   - Build freshness vs cache hit ratio

/** Revalidation interval for article fetches (seconds) */
export const ARTICLE_REVALIDATE = 300; // 5 minutes

/** Revalidation interval for playlist fetches (seconds) */
export const PLAYLIST_REVALIDATE = 300;

/** Revalidation interval for event fetches (seconds) */
export const EVENT_REVALIDATE = 300;

/** Revalidation interval for metric dashboard (seconds) */
export const METRICS_REVALIDATE = 60;

// Agent notes:
// - Lower values = fresher content but more DB hits
// - Higher values = better cache performance but staler content
// - Sweet spot depends on content update frequency
// - Articles update ~daily, playlists ~weekly, events ~daily
