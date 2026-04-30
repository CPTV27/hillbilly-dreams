# Google Card Template — Reusable HTML Pattern

*Saved 2026-04-30 from Chase's "I like this CSS style that Google used" feedback. Use for reference / lookup / copy-paste-heavy content.*

## When to use this template vs the magazine template

| Use case | Template |
|---|---|
| **Long-form business case, narrative pitch, scroll-deck story** | Magazine template (Playfair + Source Serif, single column 720px, drop cap) — see `apps/web/public/big-muddy-acres/big-muddy-acres.html` |
| **Reference doc, lookup-style content, copy-paste-heavy library** | **Google Card template** (Tailwind + Inter + Playfair, sidebar + cards + copy buttons) — see `apps/web/public/marketing-library/index.html` |
| **Style guide, voice library, design system** | Google Card |
| **Long-form editorial / press release** | Magazine |

## Stack

- **Tailwind CSS** via CDN (`https://cdn.tailwindcss.com`)
- **Inter** for body, **Playfair Display** for serif accents (Google Fonts)
- **Lucide icons** via CDN (`https://unpkg.com/lucide@latest`)
- Inline Tailwind theme config script
- Pure vanilla JS for interactivity
- Custom scrollbar
- `document.execCommand('copy')` for clipboard (works in iframe sandboxes — `navigator.clipboard` often fails in embedded contexts)
- Toast notification component

## Layout primitives

- Sidebar nav: fixed on desktop, drawer on mobile (toggled by hamburger)
- Phrase cards: white bg, gray border, hover state (border darkens, shadow lifts)
- Code-style script blocks: dark gray bg, mono font, syntax-color spans
- Tier cards: color-coded headers
- Anti-vocabulary chips: small pill chips with strikethrough and red tint
- Voice rules / placement lists: icon + text

## Color tokens

```js
brand: {
  50: '#f6f7f9',   // page background
  100: '#eceef2',  // muted surface
  800: '#1e293b',  // dark accent
  900: '#0f172a',  // primary text + recommended-tier
}
```

Plus accents: `bg-amber-50` (project highlights), `bg-indigo-50` (thesis quotes), `bg-red-50` (anti-vocabulary), `bg-gray-900` (code blocks).

## Copy-button variants

1. `.copy-btn` — large card-level, "COPY" text, fades in on hover
2. `.copy-inline` — small icon-only for list items, fades in on hover
3. `.copy-btn-complex` — for multi-line code blocks, always visible

## Reuse pattern

1. Copy `apps/web/public/marketing-library/index.html` as starting point
2. Strip content, keep layout primitives
3. Replace nav items + section IDs
4. Sidebar headline + footer attribution stays in same slots
5. Keep copy-button JavaScript intact

## What NOT to change

- Font imports (Inter + Playfair Display)
- Brand color tokens
- Mobile-menu pattern
- `document.execCommand('copy')` approach
- Lucide icon usage (keep `data-lucide` attributes; call `lucide.createIcons()` after dynamic content)

## Live reference

http://localhost:8888/marketing-library/ — local
https://bigmuddytouring.com/marketing-library/ — live (after deploy)
