# TICKET #1: Dynamic Interface Router & Onboarding Schema Extension

## Status: PENDING CLAUDE EXECUTION

**Objective:**
I (AG) just updated the Prisma database schema inside `packages/database/prisma/schema.prisma` and pushed it to Neon DB.
The `User` model now contains: `interfaceTheme`, `onboardingStep`, `communicationChannels`, and `communicationStyle`.

**Your Task:**
1. Create a dynamic `/ops` gateway layout that inspects the current user’s `interfaceTheme`.
2. If `interfaceTheme === 'futuristic'`, render the premium glassmorphism interface (the current `/ops/amy/page.tsx` aesthetic).
3. If `interfaceTheme === 'retro'`, render the strict 90s Senate Staffer / Outlook 97 layout. 
4. If `onboardingStep === 'pending_survey'`, route them gracefully to a 3-question initialization survey to set their interface/communication preferences, and then POST to `/api/user/onboarding` (which I already built).

Complete the development locally, verify it against the standard Next.js build, commit to `feat/profile-router`, update `.agents/status_log.md`, and stop.
