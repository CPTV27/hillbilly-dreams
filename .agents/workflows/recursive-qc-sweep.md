---
description: Recursive QC sweep for pre-deploy verification of any Hillbilly Dreams property
---

# Recursive QC Sweep — Agent Handoff Protocol

This workflow codifies the recursive QC process used on the S2PX Owen build and extended during
the BMT brand audit. Run this protocol on any Hillbilly Dreams property before a client-facing
deploy or major brand/visual change.

## Prerequisites

- Access to the project's source code and Firebase hosting config
- The target deploy URL (e.g., `s2px-sandbox.web.app`, `bigmuddy-ff651.web.app`)
- A clear list of who the audience is (e.g., "Owen Bush, CEO of Scan2Plan")

---

## Phase 0: Brand Alignment (BMT-specific — run before Phase 1)

Every Hillbilly Dreams property routes through the token system in `packages/config/tokens.css`.
Before any visual deploy, verify:

### 0.1 Theme Class Wiring
```bash
# All themeClass assignments in brands.ts
grep "themeClass" packages/config/brands.ts

# All layout.tsx usages
grep -rn "theme-\|themeClass" apps/web/app/*/layout.tsx apps/web/app/\(*/layout.tsx 2>/dev/null
```
Every layout must use `brand.themeClass` from `BRANDS` config OR an intentional hardcoded override with a comment explaining why.

### 0.2 Token Class Completeness
```bash
# themeClass values declared in brands.ts
grep "themeClass" packages/config/brands.ts | grep -o "'theme-[a-z]*'" | tr -d "'"

# CSS classes defined in tokens.css
grep "^\.theme-" packages/config/tokens.css
```
**Every `theme-*` in `brands.ts` must have a matching class in `tokens.css`.** A missing class silently falls back to `:root` — no error, wrong brand.

### 0.3 Brand Color Sources
- **The Inn** (`theme-inn`): official colors come from Tracy's brand guidelines PDF (analyzed via Drive/Gemini). These differ from the live thebigmuddyinn.com website CSS. Always use the PDF values. Reference: `memory/brand_big_muddy_inn.md`.
- **All other properties**: confirm `primaryColor` in `brands.ts` matches `--accent` in the theme class.
- **Do not copy colors from the live website** without cross-referencing the official brand package.

### 0.4 Tailwind + Token Collision Check
If a page uses both Tailwind classes AND CSS custom properties, verify layout utilities are computing correctly:
```js
// In browser DevTools console:
window.getComputedStyle(document.querySelector('.your-grid-element')).display
// Must return 'grid' or 'flex' — not 'block'
```
If Tailwind's `grid` or `flex` computes as `block`, switch to 100% inline styles for that layout.
See: `apps/web/app/(demo)/demo/page.tsx` for the canonical fix pattern.

---

## Phase 1: Static Analysis Sweep

Run these checks in order. Fix everything before moving to Phase 2.

### 1.1 TypeScript Compilation

```bash
# BMT monorepo — must target the app-level tsconfig
npx tsc --project apps/web/tsconfig.json --noEmit 2>&1 | tail -20
```

Must produce no output (exit 0). No exceptions.

### 1.2 Hardcoded Data Audit

Search for ANY hardcoded numbers, names, or counts that could be fact-checked against live data:

```bash
# Numbers that could mismatch reality
rg -n '\b\d+ (active|projects|stages|deals|items|clients|users|suites|guests)\b' apps/ --type tsx --type ts

# Hardcoded names that should be dynamic
rg -n 'Chase Pierson|Owen|Dennis|Tracy|Amy' apps/ --type tsx --type ts
```

**Rule:** If a number appears in UI copy and references data that's fetched from an API, it MUST either:
- Be dynamically computed from the actual data, **OR**
- Be vague enough to not be fact-checked (e.g., "active projects" not "20 active projects")

### 1.3 Stale Text Sweep

Search for old/incorrect text that survived refactors:

```bash
# Old button labels, placeholder text, lorem ipsum
rg -ni 'placeholder|lorem|todo|fixme|hack|xxx' apps/ --type tsx --type ts

# Old email subjects or body text
rg -ni 'sandbox access|guided tour|let me know what time' apps/ --type tsx --type ts
```

### 1.4 Broken Link / Route Audit

```bash
# Find all internal route paths referenced in components
rg -n "href=['\"]/" apps/ --type tsx --type ts | grep -v node_modules

# Find all Next.js router.push calls
rg -n "router\.push\|useRouter" apps/ --type tsx --type ts
```

Cross-reference against the actual `<Route>` definitions in `App.tsx`. Every referenced path must have a matching route.

### 1.5 localStorage Key Consistency

```bash
rg -n "localStorage\.(get|set|remove)Item" apps/ --type tsx --type ts
```

Verify every `removeItem` call uses the same key as the corresponding `setItem`. This caught a critical bug in S2PX where the demo tour reset was clearing the wrong key.

### 1.6 Context Provider / Hook Mismatch

For every `useContext` hook:
- Verify the component calling the hook is wrapped in the correct Provider
- If the hook throws when context is null, verify that's safe — or add a no-op fallback
- Check conditional hook calls — React rules of hooks prohibit calling hooks inside conditionals

```bash
# Find all context hooks
rg -n "useContext\(" apps/ --type tsx --type ts

# Find all providers
rg -n "Provider>" apps/ --type tsx --type ts
```

---

## Phase 2: Demo Identity Verification

If the property has a demo/public mode for a specific client:

### 2.1 Profile Override

- Verify the target user's name and initials display correctly
- Navigate between 3+ pages — ensure the override doesn't revert
- Check what role the demo user defaults to (should match the client's actual role)

### 2.2 Nav Filtering

- Verify role-based nav filtering doesn't hide features the demo is supposed to show
- On unauthenticated demo routes, check if `canAccessNav()` or equivalent is bypassed

### 2.3 Tour / Onboarding

- Count the actual tour steps vs. what the welcome copy promises
- Verify every tour target selector (`data-tour="..."`) has a matching DOM element
- Test the tour start → cancel → restart cycle

---

## Phase 3: Content Verification

### 3.1 Legal Names

```bash
rg -n "Owen|Sheldon|Pierson|Bush|Tracy|Allen" apps/ --type tsx --type ts
```

Every name reference must be intentional. Cross-check against the proposal/contract.

### 3.2 Financial Numbers

Any dollar amounts, percentages, or fee structures must match the agreed deal terms. Search:

```bash
rg -n '\$\d|percent|%|fee|deposit|rate' apps/ --type tsx --type ts
```

### 3.3 mailto / CTA Buttons

For every `mailto:` link:
- Check the recipient email is correct
- Read the subject and body — does the tone match the current deal stage?
- Verify `encodeURIComponent` is used for subject and body
- Physically click the button in a browser to test OS email client handoff

---

## Phase 4: Deploy & Runtime Verification

### 4.1 Build & Deploy

```bash
npx firebase deploy --only hosting:<target>
```

### 4.2 Incognito Walkthrough

Open the deployed URL in a fresh incognito window. Verify:

- [ ] Profile name/initials correct on first load
- [ ] Profile persists across navigation
- [ ] Tour starts with correct step count
- [ ] Tour cancel → free exploration works without UI artifacts
- [ ] All sidebar links navigate to correct pages
- [ ] View mode toggles only appear where expected
- [ ] CTA buttons trigger correct actions
- [ ] No console errors in DevTools

### 4.3 Sign-Off Protocol

Only sign off after **ALL** checks pass. If any fail:

1. Fix the issue in source
2. Run `npx tsc --noEmit` — must exit 0
3. Commit with descriptive message referencing the fix
4. Re-deploy
5. Re-verify the failed check AND all related checks

**Never sign off from terminal output alone. The browser is the source of truth.**

---

## Lessons Learned (S2PX Sprint)

| Bug | Root Cause | Detection Method |
|-----|-----------|-----------------|
| Tour showed 15 steps instead of 4 | Wrong provider (`TourProvider` vs `DemoTourProvider`) | grep for provider wiring in `App.tsx` |
| App crashed on `/demo` routes | `useTour()` called outside `TourProvider` | Context null check |
| "20 active projects" didn't match data | Hardcoded number in welcome copy | Manual text audit |
| Friction Log link went to Scorecard | Wrong path in `MODULES` array | Route cross-reference |
| "8-stage deal flow" was actually 5 | Hardcoded count didn't match constants | grep for stage definitions |
| localStorage key mismatch | `removeItem('x')` vs `setItem('y')` | localStorage key audit |
| Profile reverted to logged-in user | Role override not applied on demo routes | Navigation testing |
| Button said "Request Access" not "Authorize" | Copy not updated for deal stage | Text sweep |
| Tailwind `grid`/`flex` computed as `block` | Token system overrode spacing; Tailwind lost | `getComputedStyle()` check |
| `theme-gallery` rendered wrong brand | `brands.ts` had `themeClass: 'theme-touring'` | grep themeClass vs tokens.css |
| Inn used wrong brand colors | Live site CSS ≠ Tracy's official brand PDF | Gemini analysis of Drive PDF |
| `theme-admin`, `theme-records`, etc. had no styles | Classes in brands.ts not defined in tokens.css | diff brands.ts vs tokens.css |

// turbo-all
