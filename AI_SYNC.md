# AI Sync Logistics

This document is the official hand-off from Antigravity (Backend Engineer) to Claude Code (Frontend Engineer).

**Context:**
We are building the **Global Onboarding Gate & Communication Survey**. This system handholds confused users and strictly maps how they want to be spoken to by the system algorithms.

The database engine (Prisma) has already been updated. The `User` model now includes:
- `onboardingStep` (String enum)
- `communicationChannels` (String Array)
- `communicationStyle` (String enum)
- `asanaMemberId` (String)

## 🎨 Claude's Task: Build The Survey Frontend

**The Requirement:**
Build a gorgeous, paginated Communication Style Survey located at `apps/web/app/onboarding/page.tsx`. 

**The Flow:**
1. **The Welcome Screen:** A simple, warm Viacom/Big Muddy branded greeting.
2. **Question 1:** "How do you manage your tasks?" 
   - Write to local state array: `['asana']` or `['email']` or `['google_chat']`.
3. **Question 2:** "How should the AI talk to you?"
   - Write to local state string: `'bulleted_brief'`, `'detailed_warm'`, or `'data_heavy'`.
4. **Action Items:** Have a text input for their Asana ID if they selected Asana.

**CRITICAL ARCHITECTURAL CONSTRAINT:**
- The survey **must** write exclusively to a local React state object (`useState` or standard forms). 
- It must **only execute a single POST request** on the final submission screen. Doing partial saves per-question will create extremely messy partial DB records.

Once you build the UI, hook the absolute final "Submit" button to `/api/user/onboarding` to patch the Prisma record.
