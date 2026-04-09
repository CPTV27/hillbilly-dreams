# Design Tokens JSON — Source of Truth
> Source: Gemini analysis, March 27, 2026
> File location: packages/config/design-tokens.json

## Purpose
Machine-readable source of truth for ALL spacing, radii, shadows, and typography scales. CSS files are GENERATED from this JSON — agents edit JSON, build step generates CSS.

## Schema

```json
{
  "system": {
    "name": "Hillbilly Dreams Design System",
    "version": "1.0.0",
    "last_updated": "2026-03-27"
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "xxl": "4rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "1rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    "glow": "0 0 15px rgba(200, 148, 62, 0.3)"
  },
  "typography": {
    "base_size": "16px",
    "scale": 1.25,
    "weights": {
      "normal": 400,
      "medium": 500,
      "bold": 700
    }
  },
  "defaults": {
    "colors": {
      "bg": "#1a1816",
      "surface": "#231f1c",
      "text": "#f0ebe0",
      "accent": "#c8943e",
      "slate": "#4a6274",
      "error": "#ef4444",
      "success": "#22c55e"
    }
  }
}
```

## How Agents Use It
1. Agent reads `design-tokens.json` for current values
2. Agent modifies the JSON (e.g., changes spacing.md from 1rem to 1.25rem)
3. Build step generates `base/variables.css` from the JSON
4. All brands inherit the change automatically
