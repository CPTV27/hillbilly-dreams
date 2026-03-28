# Delta Dawn — Brand Style Guide
> Source: Gemini analysis, March 27, 2026
> For: Delta Dawn (Ops agent) — Big Muddy content creation

## Typography Toolkit (5 approved fonts)

| Font | Variable | Use For |
|:---|:---|:---|
| **Abril Fatface** | `--font-abril` | Cinematic hero headlines, Southern Gothic branding |
| **Playfair Display** | `--font-display` | Editorial headlines (Magazine, Economics) |
| **Plus Jakarta Sans** | `--font-jakarta` | Modern SaaS interfaces, MBT marketing |
| **DM Sans** | `--font-body` | All standard body text, long-form articles |
| **Inter** | `--font-inter` | UI elements, navigation, minimal layouts |

## Visual Presets by Content Type

### The Delta Dark (Live Shows, Inn, Photography)
- Headline: Abril Fatface
- Body: DM Sans
- Colors: Deep Charcoal (#1a1816) + Amber Gold (#c8943e)

### The Broadside (Magazine Features, City Guides)
- Headline: Playfair Display
- Body: DM Sans
- Colors: Eggshell paper + Ink Black text

### The Modern MainStreet (DSD, MBT Product)
- Headline: Plus Jakarta Sans
- Body: Inter
- Colors: Crisp White + Black or Burgundy accent

## Color Tokens

| Token | Value | Purpose |
|:---|:---|:---|
| `--bg` | #1a1816 | Primary canvas (dark warm default) |
| `--text` | #f0ebe0 | Warm cream text (dark themes) |
| `--accent` | #c8943e | Amber Gold — interactive elements |
| `--surface` | #231f1c | Cards, panels, content blocks |
| `--shadow-glow` | rgba(200, 148, 62, 0.3) | Gold outer glow for featured content |

## Rules
1. **Never hardcode hex colors** — use tokens only
2. **Match the route** — Magazine gets Broadside, Inn gets Delta Dark
3. **Use spacing tokens** — XS to XXL from design-tokens.json
4. **Request new tokens from Huck** if a needed color doesn't exist
