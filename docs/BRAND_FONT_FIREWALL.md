# Brand Font Firewall

**Purpose:** Fonts do NOT cross brand boundaries. This document defines which fonts belong to which brand. If a page is using the wrong font, it's a bug.

**Last updated:** 2026-03-26 — after Build Agent mistakenly applied Big Muddy serif fonts to Measurably Better.

---

## The Rule

> **No brand may use another brand's display font.** Each brand owns its typography. Cross-contamination is a bug, not a style choice.

---

## Font Assignments

### Measurably Better (.theme-mb, .theme-mb-product, .theme-mb-editorial)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Inter | -apple-system, Helvetica Neue, sans-serif |
| **Body** | Inter | -apple-system, Helvetica Neue, sans-serif |
| **Mono** | JetBrains Mono | SF Mono, monospace |

**STRICT:** MB never uses a serif font. Not Playfair, not Abril Fatface, not Cormorant, not Georgia. If you see a serif on an MB page, fix it.

---

### The Big Muddy Inn (.theme-inn, .theme-inn-boutique)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Citrus Gothic | Abril Fatface, Georgia, serif |
| **Subhead** | Abril Fatface | Georgia, serif |
| **Body** | Montserrat | DM Sans, system-ui, sans-serif |

---

### Arri Aslin (artist brand — TBD, shares Inn origin)
| Role | Font | Fallback |
|---|---|---|
| **Display** | TBD (same family as Inn, maybe Citrus Gothic or custom) | Abril Fatface, Georgia, serif |
| **Body** | Montserrat | DM Sans, system-ui, sans-serif |

---

### Big Muddy Touring (.theme-bm-touring)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Outfit | system-ui, sans-serif |
| **Body** | DM Sans | system-ui, sans-serif |

**Note:** Touring is its own brand. Does NOT use Inn fonts.

---

### Big Muddy Radio (.theme-bm-radio)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Syne | system-ui, sans-serif |
| **Body** | DM Sans | system-ui, sans-serif |

**Note:** Radio is its own brand. Does NOT use Inn fonts.

---

### Big Muddy Records (.theme-bm-records)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Playfair Display | Georgia, serif |
| **Body** | DM Sans | system-ui, sans-serif |

**Note:** Records CAN use Playfair — it fits the vinyl/analog aesthetic. But this is Records' font, not MB's.

---

### Big Muddy Publishing (.theme-bm-publishing, .theme-bm-magazine)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Cormorant Garamond | Georgia, serif |
| **Body** | Inter | system-ui, sans-serif |

---

### Outsider Economics (.theme-outsider-econ)
| Role | Font | Fallback |
|---|---|---|
| **Display** | GT Sectra (if available) | Cormorant Garamond, Georgia, serif |
| **Body** | Inter | system-ui, sans-serif |

---

### Hillbilly Dreams Inc (.theme-hdi-holding, .theme-hillbilly)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Unbounded (or Optima if available) | Space Grotesk, system-ui, sans-serif |
| **Body** | Space Grotesk | system-ui, sans-serif |

---

### Deep South Directory (.theme-directory-local)
| Role | Font | Fallback |
|---|---|---|
| **Display** | Cooper Black (if available) | system-ui, sans-serif |
| **Body** | DM Sans | system-ui, sans-serif |

---

## How to Enforce

Every `.theme-*` class in `tokens.css` MUST explicitly set:
```css
--font-display: 'Font Name', fallback, fallback;
--font-body: 'Font Name', fallback, fallback;
```

The `:root` default fonts are for the Big Muddy Touring context (the original app). Every other brand's theme class must override both `--font-display` and `--font-body`.

**If a theme class does not set `--font-display`, it inherits `:root`'s Playfair Display — which is WRONG for MB, HDI, Radio, Directory, and others.**

---

## Quick Test

When reviewing a page, ask:
1. What theme class is applied?
2. Does the visible font match this chart?
3. If not → bug. Fix the theme class or add the font override.
