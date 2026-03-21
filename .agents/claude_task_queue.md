# TICKET #2: User Settings Page & Deep Theme Application

## Status: PENDING CLAUDE EXECUTION

**Context:**
Ticket #1 is merged to `main` (commit 68c0e65). The onboarding survey is live, the JWT carries `interfaceTheme` and `onboardingStep`, and the layout chrome adapts per theme. The database is in sync — no migration needed.

**Problem:**
1. Users who completed onboarding have no way to change their preferences afterward.
2. The theme only affects the layout chrome (header/nav). The page content (dashboard cards, activity feed, session cards) still renders in the default minimal style regardless of theme selection.

**Your Task:**

### Part A: `/ops/settings` Page
1. Create `(ops)/ops/settings/page.tsx` — a settings page where the logged-in user can:
   - View and change their `interfaceTheme` (futuristic | retro | minimal)
   - View and change their `communicationStyle` (bulleted_brief | detailed_warm | data_heavy)
   - View and change their `communicationChannels` (multi-select: asana, email, google_chat, sms, slack)
   - See when preferences were last updated (`communicationPrefsUpdatedAt`)
2. Use the existing `POST /api/user/onboarding` endpoint to save changes (it already handles all three fields).
3. Pre-populate the form with the user's current values from the session.
4. Add a "Settings" link to the nav in `(ops)/ops/layout.tsx` (desktop and mobile).

### Part B: Deep Theme Tokens
1. In `(ops)/ops/layout.tsx`, pass the current `interfaceTheme` value down to children via a CSS custom property on the wrapping `<div>`:
   - `--theme-card-bg`, `--theme-card-border`, `--theme-text-primary`, `--theme-text-secondary`, `--theme-accent`
   - Futuristic: dark glass cards (`rgba(255,255,255,0.05)` bg, `rgba(255,255,255,0.1)` border, blue-400 accent)
   - Retro: warm parchment cards (`#f5f0e8` bg, `#c4b89c` border, `#8b4513` accent)
   - Minimal: current white cards (keep existing)
2. Update the dashboard page `(ops)/ops/page.tsx` to use these CSS variables for its card containers, text colors, and progress indicators instead of hardcoded Tailwind classes.

### Constraints:
- **Do not modify `auth.ts`** — the JWT structure is locked.
- **Do not modify the Prisma schema** — all fields are already deployed.
- **Do not modify Amy's route group** — `(amy)` is isolated and must stay untouched.
- The settings page must respect the current theme — if user is on futuristic, the settings page itself should render in the dark glass style.

Complete the development locally, verify it against the standard Next.js build, commit to `feat/settings-theme`, update `.agents/status_log.md`, and stop.
