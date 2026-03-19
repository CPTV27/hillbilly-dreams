// experiments/prompts/image-optimization.ts
// Tunable variables for image optimization pipeline
// The auto-research agent can mutate these values and measure impact on:
//   - Bundle size (KPI: bundle_size_kb)
//   - Build time (KPI: build_time_ms)
//   - Lighthouse performance score

/** Next.js image quality setting (1-100) */
export const IMAGE_QUALITY = 80;

/** Maximum image width for srcset generation */
export const IMAGE_MAX_WIDTH = 1920;

/** Image device sizes for responsive srcset */
export const IMAGE_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920];

/** Image sizes for thumbnail srcset */
export const IMAGE_SIZES = [16, 32, 48, 64, 96, 128, 256, 384];

/** Enable AVIF format (better compression, slower build) */
export const ENABLE_AVIF = false;

// Agent notes:
// - Lower quality = smaller bundles but visible artifacts below ~65
// - AVIF adds ~30% build time but ~40% smaller images
// - Reducing device sizes cuts build time but may serve upscaled images
