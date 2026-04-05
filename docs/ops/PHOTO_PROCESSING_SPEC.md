# Photo Processing Specification — HDI Platform

*April 6, 2026. Updated based on live testing feedback.*

---

## The Problem

Current images are over-sharpened, over-processed, and some are oriented wrong. DxO DeepPRIME noise reduction + aggressive sharpening = crunchy look that screams "processed." The platform should feel like a magazine, not a tech demo.

## The Standard

**The image should look like it was shot by someone who knows what they're doing and didn't touch it much.** Film-like. Warm. Natural grain is OK. Over-sharpening is not.

Think: Kinfolk magazine, Cereal magazine, early Instagram before the HDR era.

## Processing Rules

### Lightroom / Camera Raw Settings

| Setting | Value | Why |
|---|---|---|
| Sharpening Amount | 25-40 (NOT 60+) | Enough for web, not crunchy |
| Sharpening Radius | 0.8-1.0 | Tight, not halos |
| Sharpening Detail | 25 | Default is fine |
| Sharpening Masking | 60-80 | Protect skies and smooth areas |
| Noise Reduction Luminance | 15-25 | Light touch, keep grain |
| Noise Reduction Color | 25 | Default |
| Clarity | 0 to +10 max | NOT +30-50 like current images |
| Texture | 0 to +15 max | Subtle or nothing |
| Dehaze | 0 | Never on interior/night shots |
| Vibrance | +5 to +15 | Warm, not neon |
| Saturation | 0 to +5 | Barely touch it |

### DxO DeepPRIME
- Use for noise reduction on high-ISO shots ONLY
- Do NOT use DeepPRIME on clean low-ISO images — it over-smooths
- After DeepPRIME, reduce Lightroom sharpening to 20 (it adds its own)

### Export Settings
- Format: WebP (for web) or JPEG (for print)
- WebP quality: 82-85 (good balance of size vs quality)
- Resize: 2400px long edge for web, full res for print
- Color space: sRGB for web
- No watermark

### Orientation
- CHECK EVERY IMAGE for correct orientation before export
- Lightroom: press R to check crop/rotation
- If the horizon is tilted, fix it. If the building is leaning, fix it.
- The victorian-mansion-natchez.webp was crooked — that's the kind of thing that kills credibility

### Color Treatment
- Warm. Golden hour energy even when it's not golden hour.
- Shadows lifted slightly (not crushed black, not flat)
- Highlights pulled down (preserve window/sky detail)
- White balance: slightly warm (5800-6200K for daylight, 3200-3800K for tungsten)
- Do NOT use heavy split toning or color grading
- The Inn's bar should feel amber and warm
- Night shots should feel moody, not dark

### What NOT to Do
- No HDR tonemapping
- No heavy clarity/structure
- No over-sharpened halos around edges
- No AI upscaling artifacts
- No oversaturated colors
- No crushed blacks (keep shadow detail)
- No aggressive vignetting
- No fake film grain overlays
- No preset stacking (one look, applied consistently)

## Batch Processing Workflow

1. **Import** to Lightroom catalog
2. **Cull** — pick selects (1-star minimum)
3. **Base edit** — exposure, white balance, tone curve (apply to batch)
4. **Individual tweaks** — crop, orientation, local adjustments
5. **Export** — WebP 2400px long edge, quality 82
6. **Review** — open each export at 100%, check for sharpening halos and orientation
7. **Deploy** — copy to `/apps/web/public/images/[category]/`
8. **Verify** — run health check, confirm images load on live pages

## Current Problem Areas

| Page | Issue | Fix |
|---|---|---|
| /directory categories | AI/stock images, wrong subjects | Replace with real Natchez photos |
| /directory hero | Acceptable but could be warmer | Re-process with warm WB |
| /inn/tv backgrounds | GCS images — some are AI illustrations | Replace with real photos |
| /explorer nodes | Mix of real and AI — verify each | Audit all 10 |
| Press articles | Some over-sharpened processed/slideshow images | Re-export with lower sharpening |

## Who Processes

- **Chase** processes in Lightroom with this spec
- **Tracy** reviews and approves final selections
- **Amy** flags any image that "doesn't feel right"
- **Cursor/AG** do NOT process photos — they only swap file paths in code

---

*Photography first. Processing invisible. If someone notices the editing, you've gone too far.*
