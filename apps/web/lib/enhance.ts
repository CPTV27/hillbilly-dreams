// lib/enhance.ts
// Photo enhancement pipeline — Sharp-based presets that match the BMM editorial aesthetic.
// Each preset preserves the original photo's content while improving its visual quality.

import sharp from 'sharp';

export type EnhancePreset = 'auto' | 'editorial' | 'moody' | 'warm' | 'crisp';

export const ENHANCE_PRESETS: Record<EnhancePreset, string> = {
  auto: 'Auto-enhance — normalize exposure, sharpen, subtle warmth',
  editorial: 'Magazine editorial — rich contrast, warm shadows, desaturated highlights',
  moody: 'Blues Room mood — lifted blacks, cool shadows, warm highlights',
  warm: 'Southern warmth — golden hour tint, soft contrast, amber tones',
  crisp: 'Sharp & clean — high clarity, neutral color, detail recovery',
};

/**
 * Enhance a photo buffer using Sharp processing.
 * Returns a WebP buffer with the enhancement applied.
 */
export async function enhancePhoto(
  input: Buffer,
  preset: EnhancePreset = 'auto'
): Promise<Buffer> {
  let pipeline = sharp(input);

  switch (preset) {
    case 'auto':
      pipeline = pipeline
        .normalize()            // auto-levels: stretch histogram
        .sharpen({
          sigma: 1.2,
          m1: 1.0,
          m2: 0.5,
        })
        .modulate({
          brightness: 1.02,     // slight lift
          saturation: 1.08,     // subtle vibrancy
        })
        .tint({ r: 255, g: 248, b: 240 }); // whisper of warmth
      break;

    case 'editorial':
      pipeline = pipeline
        .normalize()
        .sharpen({
          sigma: 1.0,
          m1: 0.8,
          m2: 0.4,
        })
        .modulate({
          brightness: 1.0,
          saturation: 0.92,     // slightly desaturated (magazine feel)
        })
        .linear(1.15, -15)      // contrast boost with slight shadow lift
        .tint({ r: 250, g: 240, b: 228 }); // warm editorial tone
      break;

    case 'moody':
      pipeline = pipeline
        .normalize()
        .sharpen({
          sigma: 0.8,
          m1: 0.6,
          m2: 0.3,
        })
        .modulate({
          brightness: 0.95,     // slightly darker
          saturation: 0.88,     // muted
        })
        .linear(1.1, 8)         // lifted blacks (shadow detail)
        .tint({ r: 235, g: 240, b: 250 }); // cool shadow cast
      break;

    case 'warm':
      pipeline = pipeline
        .normalize()
        .sharpen({
          sigma: 0.9,
          m1: 0.7,
          m2: 0.4,
        })
        .modulate({
          brightness: 1.05,
          saturation: 1.12,     // rich color
        })
        .linear(1.08, -5)       // gentle contrast
        .tint({ r: 255, g: 235, b: 210 }); // golden hour amber
      break;

    case 'crisp':
      pipeline = pipeline
        .normalize()
        .sharpen({
          sigma: 1.8,           // strong sharpen
          m1: 1.2,
          m2: 0.8,
        })
        .modulate({
          brightness: 1.0,
          saturation: 1.0,      // neutral
        })
        .linear(1.2, -20);      // high contrast, deep blacks
      break;
  }

  return pipeline
    .webp({ quality: 90 })      // higher quality for enhanced output
    .toBuffer();
}
