// apps/web/app/admin/onboarding/tracy/tasks.ts
//
// Tracy's 6 onboarding tasks — finance/Inn-ops flavor, shorter than
// Amy's because Tracy doesn't own the social/editorial stack. The
// unique twist is task 3: "Review Amy's progress" — a live peer-status
// card that shows where Amy is in her own onboarding.
//
// Reuses the same OnboardingTask type from Amy's tasks file so the
// shared OnboardingClient component, API routes, and Delta Dawn prompt
// extension work for both roles.

import type { OnboardingTask } from '../amy/tasks';

export const TRACY_ONBOARDING_TASKS: OnboardingTask[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'meet-delta-dawn',
    number: 1,
    title: 'Meet Delta Dawn',
    oneLineDescription: 'Say hi to your AI assistant',
    detailDescription:
      "I'm Delta Dawn. I'll be with you through this whole setup. Ask me anything — finance, Inn ops, grants, events — and I'll dig up real data. Say hi when you're ready.",
    action: {
      type: 'chat',
      label: 'Say hi in the chat',
      hint: 'Type a message in the chat on the left to get started.',
    },
    dawnHelpContext: `
Tracy just arrived at her onboarding page. This is her first task: meet you.

Greet her warmly, by name (Tracy), and introduce yourself in one or two
sentences. Emphasize that you're a finance-side ally for her — you can
pull revenue numbers, look up grants, check Inn occupancy, and draft
approvals. Then invite her to try you out with something concrete:

  "what's our Inn revenue this month?"
  "when is the FEMA BRIC deadline?"
  "what are the five grant opportunities you're tracking?"

After she replies (any response), this task is complete. Move her to task 2
(dashboard-tour) with a short transition and emit [[TASK:dashboard-tour]].

Don't drown her on turn one. Tracy wants specifics, not banter. One short
paragraph, move on.
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'dashboard-tour',
    number: 2,
    title: 'Tour your dashboard',
    oneLineDescription: 'Walk through the ops command center',
    detailDescription:
      "The /admin dashboard is your home base. Click the button to start a guided tour that highlights the KPIs, nav, and key modules. Takes about a minute.",
    action: {
      type: 'tour',
      label: 'Start the tour',
      href: '/admin/dashboard?walkthrough=tracy',
    },
    dawnHelpContext: `
Tracy is on task 2: dashboard tour. Tell her the /admin dashboard is her
home base and the tour walks through the KPI tiles (occupancy from
CloudBeds, newsletter subscribers, events, revenue), the sidebar nav, and
the content modules.

When she clicks "Start the tour", the same guided overlay that runs for
Amy will run for her. When it finishes, the tab closes and the task
auto-completes. Then move her to task 3 (review-amy-progress) with
[[TASK:review-amy-progress]].

IF SHE ASKS:
- "What are KPIs?" — plain: "numbers we watch — occupancy, newsletter,
  social reach, revenue. Real-time, all in one place."
- "Can I skip this?" — yes, "Skip for now" in the panel, but it's 60 seconds.
- "Will this look different from Amy's?" — the tour content is the same
  because the dashboard is shared across all three co-founders.
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'review-amy-progress',
    number: 3,
    title: "Check in on Amy's onboarding",
    oneLineDescription: "See where Amy is in her setup and cheer her on",
    detailDescription:
      "Amy is going through her own guided onboarding right now. This panel shows you where she is in real time — which tasks she's completed, which one she's on, and when she last checked in. Read it, then hit 'Acknowledged' so you're both synced up.",
    action: {
      type: 'static',
      label: 'Acknowledged',
    },
    dawnHelpContext: `
Tracy is on task 3: review Amy's progress. This is a special task — the
task detail panel renders a LIVE peer-progress card showing Amy's current
onboarding state (which of her 9 tasks are done, which she's on, her
last-seen timestamp).

YOUR JOB as Delta Dawn here:
- If Amy has completed ≥5 tasks, tell Tracy "Amy is cooking — she's
  already [N] deep"
- If Amy has completed 0 tasks, tell Tracy "Amy hasn't started yet —
  she might need a nudge. Text her the link if you want."
- If Amy is stuck on a specific task, mention it so Tracy can follow up.
  For example: "She's been on 'Connect Meta' for a while — she might need
  you to add her as admin on the Big Muddy Pages in Meta Business Manager."
- Tell Tracy she'll see this peer view anytime she comes back to /admin/onboarding/tracy

Once Tracy clicks "Acknowledged" the task completes. Move her to task 4
(grants-review) with [[TASK:grants-review]].

You CAN call read-only tools to fetch Amy's progress if you want real
data — the frontend already has it, but you can corroborate by checking
/api/onboarding/peer-progress?peer=amy under the hood.
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'grants-review',
    number: 4,
    title: 'Review Q2 grant opportunities',
    oneLineDescription: 'The 4 grants Chase is tracking for Big Muddy',
    detailDescription:
      "You own grant approvals. These are the four live opportunities Chase is tracking. Read them, pick the ones worth pursuing, and we'll calendar the application deadlines.",
    action: {
      type: 'static',
      label: 'Reviewed',
    },
    staticContent: `
## Q2 2026 Grants Pipeline

**1. FEMA BRIC — Building Resilient Infrastructure & Communities**
- **Pool:** ~$1 billion total
- **Deadline:** July 23, 2026
- **Match:** 90/10 (federal 90%, local 10%)
- **Fit:** Flood/climate resilience for Natchez corridor. Big Muddy Inn
  sits in a flood-prone zone. Strong alignment.
- **Owner:** Tracy (finance) + Chase (technical writing)

**2. Alcorn State BRAVES-ITA**
- **Pool:** $1.15 million
- **Target:** Adams County specifically (Natchez is in Adams County)
- **Fit:** Targeted EDA-funded broadband + small business grant.
  Deep South Directory is a near-perfect fit for the SMB outreach piece.
- **Owner:** Tracy + Alcorn State partnership lead

**3. NSF SBIR — Small Business Innovation Research**
- **Pool:** $300K
- **Timing:** Reopening April-May 2026
- **Fit:** Big Muddy's multi-tenant platform (MBT) qualifies as
  "innovation infrastructure." We'd pitch the Glass Engine architecture.
- **Owner:** Chase (technical writer) with Tracy (budget)

**4. Kellogg Foundation — MS Priority Geography**
- **Pool:** Variable
- **Fit:** MS is one of Kellogg's priority states. Rural community + arts
  + hospitality fits their portfolio. Less competitive than federal.
- **Owner:** Tracy (relationship management)

**Reading list before you apply to any of these:**
- FEMA BRIC: https://www.fema.gov/grants/mitigation/building-resilient-infrastructure-communities
- Alcorn BRAVES-ITA: check Alcorn State University's partnership office
- NSF SBIR: https://seedfund.nsf.gov/
- Kellogg: https://www.wkkf.org/what-we-do/priority-places

**Hit "Reviewed" when you've read through. I'll add the deadlines to your calendar in a future task.**
`,
    dawnHelpContext: `
Tracy is on task 4: reviewing Q2 grants. This is a static content task —
she reads the four grants we're tracking and acknowledges. No form, no
OAuth, no upload. Just her finance-owner hat on.

IF SHE ASKS:
- "Which one should I pursue first?" — FEMA BRIC is highest pool + best
  timing. But Alcorn BRAVES-ITA is Adams-County-specific and less competitive.
  Tell her both, recommend starting with FEMA because deadline is firmest.
- "Who writes these?" — Tracy owns the relationship/budget side, Chase
  owns technical writing. You (Delta Dawn) can draft a starting paragraph
  for any of them if asked — you have the business context.
- "What's our chance?" — Don't make it up. Say "I don't have a historical
  win rate to show you. Worth pursuing the two that fit us cleanly (FEMA
  BRIC + Alcorn) and seeing what happens."
- "Can you calendar these deadlines?" — Not today. Tell her the next
  task in a future release will be calendar integration. For now, she
  writes them down.

When she hits "Reviewed", mark the task complete and move her to task 5
(notification-prefs) with [[TASK:notification-prefs]].
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'notification-prefs',
    number: 5,
    title: 'Set notification preferences',
    oneLineDescription: 'How do you want me to find you?',
    detailDescription:
      "Pick where you want to get pinged. Finance alerts, grant deadlines, big approvals — they go through whichever channel you pick.",
    action: {
      type: 'form',
      label: 'Save preferences',
    },
    dawnHelpContext: `
Tracy is on task 5: notification preferences. Inline form in the task panel —
same component Amy uses, with four checkboxes (email, asana, sms, googleChat).

RECOMMENDED DEFAULTS FOR TRACY (different from Amy):
- Email: ON — for daily financial digest, grant deadline reminders
- Asana: ON — she's already in Asana for approvals
- SMS: ON for urgent only (big financial events, payment failures)
- Google Chat: ON if she uses Google Chat (she and Chase sometimes chat there)

IF SHE ASKS:
- "What's urgent SMS?" — payment failures, fraud alerts, unusual refund
  requests, grant application confirmation/rejection, Inn emergency
  (guest incident, major maintenance)
- "Can I change later?" — yes, /admin settings.
- "What about finance reports?" — daily digest via email by default, she
  can pull ad-hoc reports anytime from /admin/finance (future page).

When she saves, task auto-completes. Move to task 6 (daily-loop)
with [[TASK:daily-loop]].
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'daily-loop',
    number: 6,
    title: 'Your daily rhythm',
    oneLineDescription: "The finance + Inn ops cadence",
    detailDescription:
      "One last thing. Here's what a normal day running the finance + Inn-ops side of Big Muddy looks like. 30 seconds, then hit 'Got it' and you're set.",
    action: {
      type: 'static',
      label: 'Got it',
    },
    dawnHelpContext: `
Tracy is on the final task: daily-loop. Static content panel showing her
the finance/Inn-ops rhythm. She reads it, hits "Got it", and she's done.

AFTER SHE HITS GOT IT:
All 6 tasks are complete. OnboardingProgress.completedAt gets set.
Congratulate her warmly. Tell her:
1. She can come back to this page anytime — including the peer view of
   Amy (task 3 auto-refreshes on each visit)
2. You (Delta Dawn) are always available at /dawn — her main question tool
3. Her first real work: pull up /admin/dashboard in the morning, see the
   numbers, flag anything unusual to Chase

No more [[TASK:...]] markers — she's done. Just wrap it up warmly.
`,
    staticContent: `
## Your Daily Rhythm — Finance + Inn Ops

A typical day for the finance/Inn-ops side of Big Muddy:

**Morning (10 minutes)**
- Open /admin/dashboard — check the KPI tiles (occupancy, revenue, events)
- Scan /admin/finance (when it ships) for anything unusual — unpaid
  invoices, refund requests, payment failures
- Check Cloudbeds for new bookings or cancellations — guest-side concerns
- Glance at Asana for anything assigned to you

**Throughout the day (as needed)**
- Approvals — any purchase, payment, or contract that needs your sign-off
- Cloudbeds guest communication if Amy escalates
- Quick questions to Delta Dawn — "what's our occupancy this month?" "when is the FEMA BRIC deadline?"

**End of day (5 minutes)**
- Check in on today's financial activity (one glance at the KPI tile)
- Tomorrow's calendar — any approvals or meetings queued up
- Note anything you want to raise with Chase in your weekly sync

**Weekly (Sunday evening or Monday morning)**
- Weekly finance review (you set the cadence — we'll accommodate)
- Grant deadline check — any deadlines approaching in the next 2 weeks?
- Review Amy's content drafts if she has magazine articles pending
  approval (you're the editorial approver)

**Quarterly (end of each quarter)**
- Books close — you run the process
- Grant applications — whichever of the 4 Q2 grants you're pursuing
- Strategic review with Chase and Amy

**Any time you're stuck:** ask Delta Dawn at /dawn. She has read-only
access to the whole business database and will pull real numbers, not
make things up.
`,
  },
];

// ─── Helpers (mirror the Amy helpers for symmetry) ───────────────────────────

export const TRACY_TOTAL_TASKS = TRACY_ONBOARDING_TASKS.length;

export function getTracyTaskById(id: string) {
  return TRACY_ONBOARDING_TASKS.find((t) => t.id === id);
}

export function getTracyNextTask(completedIds: string[]) {
  const completed = new Set(completedIds);
  return TRACY_ONBOARDING_TASKS.find((t) => !completed.has(t.id)) ?? null;
}

export const TRACY_TASK_IDS = TRACY_ONBOARDING_TASKS.map((t) => t.id) as readonly string[];
