# Style Preset Matrix — Five Visual Languages
> Source: Gemini analysis, March 27, 2026
> Uses only the 5 Google Fonts already loaded: Playfair Display, DM Sans, Plus Jakarta Sans, Abril Fatface, Inter

## The Five Presets

| Style Name | Primary Mood | Heading Font | Body Font | Best For |
|:---|:---|:---|:---|:---|
| **The Delta Dark** | Southern Gothic / Noir | Abril Fatface | DM Sans | Big Muddy Inn, Radio, Entertainment |
| **The Modern MainSt** | Tech-Forward / SaaS | Plus Jakarta Sans | Inter | MBT, CivicX, Superchase |
| **The Broadside** | Traditional Editorial | Playfair Display | DM Sans | Magazine, DSD |
| **The White Walls** | Minimal / High-Art | Inter | Inter | BuyCurious Gallery |
| **The Paper Trail** | Academic / Muted | Playfair Display | Inter | Outsider Economics |

## Brand → Preset Mapping

| Brand | Domain | Preset | Accent Color |
|:---|:---|:---|:---|
| Big Muddy Touring | bigmuddytouring.com | Delta Dark | #c8943e (amber gold) |
| The Inn | bigmuddytouring.com/inn | Delta Dark | #c8943e |
| Radio | bigmuddyradio.com | Delta Dark | #D4915E (warm amber) |
| Entertainment | bigmuddyentertainment.com | Delta Dark | #c8943e |
| Records | bigmuddyrecords.net | Delta Dark | #c8943e |
| Magazine | bigmuddymagazine.com | Broadside | #c8943e |
| Deep South Directory | deepsouthdirectory.com | Broadside | #C45B28 (brick) |
| Outsider Economics | outsidereconomics.com | Paper Trail | #e87461 (rose) |
| MBT | measurablybetterthings.com | Modern MainSt | #1A1A1A (black) |
| Gallery | buycurious.art | White Walls | #c8943e |
| Hillbilly Dreams | hillbillydreamsinc.com | Modern MainSt | #1A1A1A |
| SuperChase | superchase.app | Modern MainSt | #1A1A1A |

## CSS Definitions

### A. "The Delta Dark" (Southern Gothic)
```css
.theme-touring, .theme-inn, .theme-radio, .theme-bm-entertainment, .theme-records {
  --bg: #1a1816;
  --surface: #231f1c;
  --text: #f0ebe0;
  --accent: #c8943e;
  --font-display: var(--font-abril);
  --font-body: var(--font-body);
  --shadow-glow: 0 0 20px rgba(200, 148, 62, 0.4);
}
```

### B. "The Modern MainStreet" (Clean SaaS)
```css
.theme-mb, .theme-hillbilly {
  --bg: #ffffff;
  --surface: #f8fafc;
  --text: #0f172a;
  --accent: #1A1A1A;
  --font-display: var(--font-jakarta);
  --font-body: var(--font-inter);
  --radius-md: 0.75rem;
}
```

### C. "The Broadside" (Classic Magazine)
```css
.theme-magazine, .theme-dsd {
  --bg: #fdfcf8;
  --surface: #ffffff;
  --text: #1a1a1a;
  --accent: #c8943e;
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --text-base: 18px;
}
```

### D. "The White Walls" (Minimal Art)
```css
.theme-gallery {
  --bg: #fafaf8;
  --surface: #ffffff;
  --text: #1a1a1a;
  --accent: #c8943e;
  --font-display: var(--font-inter);
  --font-body: var(--font-inter);
}
```

### E. "The Paper Trail" (Academic)
```css
.theme-economics {
  --bg: #1a1816;
  --surface: #231f1c;
  --text: #d4c5b0;
  --accent: #e87461;
  --font-display: var(--font-display);
  --font-body: var(--font-inter);
}
```
