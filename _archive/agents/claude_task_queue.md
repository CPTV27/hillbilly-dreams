# TICKET #3: BMT Dispatch Relay + Deep Theme Page Content

## Status: PENDING CLAUDE EXECUTION

**Context:**
The core Dispatch Adapter is now live in S2PX (commit 41a87a1). It reads `communicationStyle` and `communicationChannels` from the S2PX users table, formats messages per tone, and fires to Google Chat webhooks + logged channels. Two triggers are active: Morning Printout and QA Monkey.

For BMT, the user communication preferences are in Prisma (`interfaceTheme`, `communicationStyle`, `communicationChannels`). Ticket #2 built the settings page to change them. Now we need:

1. Deep theme should apply to the **page content** (dashboard cards, session list, progress indicators) — not just the layout chrome
2. A dispatch relay that can fire BMT-specific alerts through the same channel routing pattern

---

## Your Task:

### Part A: Deep Theme Application to Page Content

The settings page and layout now pass CSS custom properties (`--theme-card-bg`, `--theme-card-border`, `--theme-text-primary`, etc.) on the wrapper div. **Apply these tokens to the ops dashboard page content.**

In `(ops)/ops/page.tsx`:
1. Replace hardcoded card background colors with `var(--theme-card-bg)`
2. Replace hardcoded border colors with `var(--theme-card-border)`
3. Replace hardcoded text colors with `var(--theme-text-primary)`, `var(--theme-text-secondary)`, `var(--theme-text-muted)`
4. Replace hardcoded accent colors with `var(--theme-accent)`, `var(--theme-accent-bg)`
5. Replace hardcoded progress bar fills with `var(--theme-progress-fill)` on `var(--theme-progress-bg)`
6. Replace hardcoded hover states with `var(--theme-hover)`

The result: switching themes in Settings should immediately change how the dashboard cards, text, and progress indicators look — not just the header/nav.

### Part B: BMT Dispatch Relay

Create a lightweight dispatch utility at `packages/shared/lib/dispatch.ts`:

```typescript
interface BMTDispatchMessage {
  triggerId: string;
  recipientEmail: string;
  subject: string;
  body: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}
```

1. `formatForStyle(body: string, style: string): string` — same 3-style formatter as S2PX
2. `dispatchToChannel(channel: string, message: BMTDispatchMessage): Promise<boolean>` — Google Chat webhook (env: `GCHAT_WEBHOOK_URL`), email (console.log for now)
3. `dispatchForUser(userId: string, message: Omit<BMTDispatchMessage, 'recipientEmail'>): Promise<void>` — look up user prefs via Prisma, format, dispatch

### Part C: First BMT Trigger — Session Summary

Create `app/api/dispatch/session-summary/route.ts`:
- Query: count of active sessions by property, revenue this month, upcoming check-ins
- Format as a summary message
- Dispatch to all users with role 'admin' or 'owner'
- Developer-only test endpoint at `app/api/dispatch/test-session-summary/route.ts`

### Constraints:
- **Do not modify `auth.ts`** — JWT structure is locked.
- **Do not modify the Prisma schema** — all fields already exist.
- **Do not modify `(amy)` route group** — Amy is isolated.
- Deep theme: Use only the CSS custom properties already defined in layout.tsx. Do not add new ones.

Complete locally, verify build, commit to `feat/deep-theme-dispatch`, update `.agents/status_log.md`, and stop.
