// apps/web/app/admin/onboarding/amy/tasks.ts
//
// The 9 onboarding tasks for Amy Allen, in order. Each task has:
//   - ui metadata (title, number, short description) — used by the sidebar
//   - action config — tells the task panel what button/form to render
//   - dawnHelpContext — a multi-line string injected into Delta Dawn's
//     system prompt when Amy is actively on this task, so Delta Dawn can
//     answer task-specific questions mid-task with real knowledge
//
// To add a new task: append to ONBOARDING_TASKS and make sure the `id` is
// a stable slug. All UI + API routes reference tasks by id.

export type TaskActionType = 'chat' | 'tour' | 'oauth' | 'external-form' | 'sanity' | 'form' | 'static';

export interface OnboardingTaskAction {
  type: TaskActionType;
  /** Text shown on the primary action button. */
  label: string;
  /** Optional URL — for link/oauth/external-form/sanity types. */
  href?: string;
  /** For chat type: no button, completion happens via chat round-trip. */
  hint?: string;
}

export interface OnboardingTask {
  id: string;
  number: number;
  title: string;
  oneLineDescription: string;
  /** Longer description shown in the task detail panel. Plain text or simple markdown-ish. */
  detailDescription: string;
  action: OnboardingTaskAction;
  /** Multi-line help content injected into Delta Dawn's system prompt when active. */
  dawnHelpContext: string;
  /** For 'static' tasks — the rendered content body. */
  staticContent?: string;
}

export const ONBOARDING_TASKS: OnboardingTask[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'meet-delta-dawn',
    number: 1,
    title: 'Meet Delta Dawn',
    oneLineDescription: 'Say hi to your AI assistant',
    detailDescription:
      "I'm Delta Dawn. I'll be with you through this whole setup. Ask me anything — how to do a task, what something means, or a question about the business. I won't bite.",
    action: {
      type: 'chat',
      label: 'Say hi in the chat',
      hint: 'Type a message in the chat on the left to get started.',
    },
    dawnHelpContext: `
Amy just arrived at the onboarding page. This is her first task: meet you.
Greet her warmly, by name, and tell her who you are in one or two sentences.
Then invite her to ask you anything to try you out — "what shows are coming
up?", "what does DSD cost?", "who books the venues?" — whatever.

After she replies to you (ANY response), this task is considered complete.
Move her to task 2 (dashboard-tour) with a short transition and emit the
marker [[TASK:dashboard-tour]] inline.

Don't dump a ton of information on her first turn. She's feeling it out.
Warm, specific, one short paragraph max. Don't list all 9 tasks up front —
she can see them in the sidebar. Just meet her and move forward.
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'dashboard-tour',
    number: 2,
    title: 'Tour your dashboard',
    oneLineDescription: 'Walk through your command center',
    detailDescription:
      "The /admin dashboard is your home base. Click the button to start a guided tour that highlights where everything is. It takes about a minute.",
    action: {
      type: 'tour',
      label: 'Start the tour',
      href: '/admin/dashboard?walkthrough=amy',
    },
    dawnHelpContext: `
Amy is on task 2: dashboard tour. Tell her the dashboard at /admin is her
home base. When she clicks "Start the tour", a guided overlay will highlight
each section — KPI tiles, sidebar, content modules. It takes about a minute.

When the tour finishes, she'll be brought back here automatically and this
task will mark complete. Then celebrate briefly and move her to task 3
(connect-meta) with the marker [[TASK:connect-meta]].

IF SHE ASKS:
- "What's a KPI?" — plain answer: "numbers we watch — like how many rooms
  booked, how many article readers, how many Spotify followers. Real-time."
- "Can I skip this?" — yes, she can click "Skip for now" in the task panel.
  But tell her it's worth 60 seconds.
- "Is the dashboard going to change over time?" — yes, Chase adds modules
  as the business grows. She'll see new sections appear.
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'connect-meta',
    number: 3,
    title: 'Connect your Meta accounts',
    oneLineDescription: 'Facebook Pages + Instagram for all Big Muddy brands',
    detailDescription:
      "Time to hook up your Meta accounts. When you click the button, Meta opens a popup asking which Facebook Pages to grant access to. Pick ALL the Big Muddy ones — Radio, Magazine, Touring, Entertainment, Records, the Inn.",
    action: {
      type: 'oauth',
      label: 'Connect Meta',
      href: '/api/auth/facebook/connect?onboarding=amy',
    },
    dawnHelpContext: `
Amy is on task 3: connect her Meta (Facebook + Instagram) accounts.

HOW IT WORKS:
When she clicks the button, she'll be redirected to Facebook. Facebook will
ask which Pages to grant access to. She should check every Big Muddy page
she has admin access to — Big Muddy Touring, Magazine, Radio, Entertainment,
Records, the Inn. Then Facebook redirects her back and we store the page
access tokens so we can post on her behalf.

WHAT GETS SAVED:
A SocialAccount row per Facebook Page, with platform=facebook, handle like
"page-{pageId}", and a long-lived access token (60 days, auto-refreshed).

IF SHE ASKS:
- "Why does Facebook need access?" — so we can post to the pages. Meta
  requires an OAuth flow for every third-party tool that posts. It's the
  only way it's allowed to work.
- "I don't see all the Big Muddy pages in Facebook's popup" — that means
  she's not an admin of those pages in Meta Business Manager yet. Tell her
  to text Chase and he'll add her. She can finish the pages she DOES see
  and come back for the rest later — the flow is additive.
- "Will this post without my permission?" — no. We store the access tokens
  but we never auto-post. Every post is scheduled or published manually
  from /admin/social.
- "What about Instagram?" — Instagram Business accounts are linked to
  Facebook Pages. When she grants access to a Page that has a linked IG,
  we automatically pick up the IG too. No extra step needed.
- "Error in the popup" — likely a temporary Meta thing. Have her wait 30s
  and try again. If it keeps happening, text Chase.

COMPLETION:
When Amy comes back from Facebook with at least one page connected, this
task auto-completes. Celebrate briefly and move her to task 4 (connect-gbp)
with the marker [[TASK:connect-gbp]].
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'connect-gbp',
    number: 4,
    title: 'Connect Google Business Profiles',
    oneLineDescription: 'Inn and Blues Room review + posting access',
    detailDescription:
      "These are your review platforms — the Big Muddy Inn listing and the Blues Room listing on Google Maps. Connecting them lets us auto-respond to reviews and post updates to both listings.",
    action: {
      type: 'oauth',
      label: 'Connect Google Business',
      href: '/api/auth/google-business/connect?onboarding=amy',
    },
    dawnHelpContext: `
Amy is on task 4: connect her Google Business Profile listings.

WHAT THIS CONNECTS:
The Big Muddy Inn listing on Google Maps (the one with reviews and photos),
and the Blues Room listing. These are separate from the Facebook Pages —
this is Google's side of the house.

WHY IT MATTERS:
Google reviews drive foot traffic. The review ingestion cron watches for
new reviews and lets Amy respond right from /admin/reviews. Without this
OAuth, that whole feature is dark.

HOW:
She clicks the button, Google asks her to sign in with whatever Google
account is the owner/manager of the Inn's GBP listing, she grants the
"business.manage" scope, and we store a refresh token so we can read
reviews and post updates.

IF SHE ASKS:
- "Which Google account should I use?" — the one that owns the Inn's GBP
  listing. Probably bigmuddy@chasepierson.tv or her Inn operational email
  amy@thebigmuddyinn.com. She can check Google Business Profile at
  business.google.com to see which account has it.
- "What if I'm not the owner?" — she needs to be added as a manager in GBP
  first. Text Chase. This is the same pattern as Meta Pages.
- "Will Google post automatically?" — no. Same as Meta. We store access,
  humans decide when to post.

COMPLETION:
When she returns with at least one GBP location connected, task auto-completes.
Move her to task 5 (first-event) with [[TASK:first-event]].
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'first-event',
    number: 5,
    title: 'Create your first event',
    oneLineDescription: 'Put a real upcoming show on the calendar',
    detailDescription:
      "Pick a real show you're running — anything on the Big Muddy calendar. Even an open mic night counts. The form takes 30 seconds.",
    action: {
      type: 'external-form',
      label: 'Open the event form',
      href: '/admin/events/new?onboarding=amy',
    },
    dawnHelpContext: `
Amy is on task 5: create her first event. She needs to open the event form
and create ONE real upcoming show — anything on the Big Muddy calendar.

WHAT THE FORM ASKS FOR:
- Title — the show name, e.g. "Mechanical Bull at the Blues Room" or
  "Regina Charboneau Sunday Brunch"
- Date and time — when the show starts
- Venue — currently only "Blues Room" and "Big Muddy Inn" in the dropdown
- Artist — free text, the band or performer
- Ticket link — optional, paste a URL if there's one
- Price — "Free" / "$10" / "$25" / "Donation" — free text
- Cover image — optional; she can come back and add one from the Photo
  Library picker after she meets it in task 6
- Description — a few sentences of context

IF SHE ASKS:
- "What's a good title?" — band name + venue + short hook. "Mechanical Bull
  at the Blues Room — Saturday Night" beats "Live Music".
- "I don't have a show to add" — suggest a recurring one like "Open Mic
  Night — every Tuesday", OR use the next JP-booked show. If she wants to
  know upcoming shows, you CAN call the events tool to look them up.
- "How do I pick a venue?" — click the dropdown, pick "Blues Room" or
  "Big Muddy Inn". If neither fits exactly, pick the closest and note the
  real location in the description.
- "I messed up the date" — events are editable after saving, no panic.
- "Cover image?" — optional. She can skip for now and come back after
  task 6 when she's seen the photo library picker.

COMMON STUCK-POINTS:
- Date picker is fiddly on Safari — tell her to type the date directly
  in MM/DD/YYYY format if clicking is awkward
- If she gets a "permission denied" error, she's not signed in with an
  allowed email — tell her to text Chase immediately

COMPLETION:
When she saves the event, the form redirects back to the onboarding page
with ?step=first-event&status=created. Task auto-completes. Celebrate and
move her to task 6 (first-photo) with [[TASK:first-photo]].

Her in-progress form state (title, date, venue, etc.) is auto-saved to
currentTaskState every ~1.5 seconds while she types, so if she closes the
tab mid-form she resumes from the same fields filled.
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'first-photo',
    number: 6,
    title: 'Upload your first photo',
    oneLineDescription: 'Drop one photo into the Big Muddy library',
    detailDescription:
      "Pick a photo off your phone or desktop — a show night, a bar shot, the river, anything. It goes into the library that Tracy and Amy both pick from when they write articles.",
    action: {
      type: 'sanity',
      label: 'Open the photo library',
      href: '/studio',
    },
    dawnHelpContext: `
Amy is on task 6: upload her first photo to the Big Muddy library.

CONTEXT:
We just shipped a custom photo library plugin for Sanity Studio. When Amy
writes a magazine article, she clicks the image field and picks from a
grid of pre-approved photos instead of uploading fresh each time. This
task is about her putting a photo INTO that library for the first time.

HOW:
She clicks the button, which opens /studio (Sanity Studio) in a new tab.
Then she:
1. Click "Articles" or any content type with an image field
2. Click the image upload area — a drawer opens with source options
3. She can either:
   a) Upload a file directly (drag & drop or click upload)
   b) Click "Big Muddy Photo Library" to pick from the existing 39+ seed
      photos (there should be ~39 from the migration earlier today,
      possibly more after Chase's Lightroom export finishes)

FOR THIS TASK, direct upload is the simplest path — have her drag one
photo from her Desktop or Downloads folder into Sanity Studio.

IF SHE ASKS:
- "What photo should I use?" — anything that's hers. A show night, Amy's
  own artwork, a phone shot of the bar. Doesn't matter, it's just a
  practice upload.
- "Where's Sanity?" — it's a separate tool — click the button and it
  opens in a new tab. Her login is Google-based.
- "What if I'm not signed in?" — she needs to be a Sanity project member.
  Chase added her earlier today at sanity.io/manage/project/5p7h8glj.
  If she's not logged in, walk her through sign-in with Google.
- "I don't see the library button" — she might be on an older page.
  Tell her to refresh the Studio tab and try again.
- "It says permission denied" — text Chase, her Sanity role isn't set right

COMPLETION:
Detection is via polling — we check Sanity every 10s for any new image
asset uploaded by Amy's email. When we detect one, task auto-completes.
Celebrate and move her to task 7 (first-article) with [[TASK:first-article]].
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'first-article',
    number: 7,
    title: 'Draft your first magazine article',
    oneLineDescription: 'Write a short piece — anything you care about',
    detailDescription:
      "This is where you get to be a writer. Pick a topic you love — a show you ran, the best breakfast in town, a memory from the bar. Keep it short. Nobody will see it until you publish.",
    action: {
      type: 'sanity',
      label: 'Open Sanity Studio',
      href: '/studio',
    },
    dawnHelpContext: `
Amy is on task 7: draft her first magazine article in Sanity Studio.

WHAT THIS IS:
Big Muddy Magazine is the editorial arm — city guides, features, photo
essays, interviews, food pieces, music pieces. Amy's voice is the point.
She should write like she talks. No corporate voice.

HOW:
Click the button, Sanity Studio opens in a new tab. Then she:
1. Click "Article" in the left sidebar
2. Click the "+" button (top right) to create a new article
3. Fill in at minimum: Title, Category, City
4. Body is where the writing happens — type normally, use the toolbar
   for bold/italic/headings
5. She doesn't have to publish — just save a draft. That counts.

IF SHE ASKS:
- "What should I write about?" — something she cares about. If she's stuck,
  suggest: "One paragraph about your favorite show this year" or "Why the
  Blues Room sounds the way it does" or "A guest you'll remember forever."
  Keep it to 2-3 paragraphs for this practice one.
- "How long does it need to be?" — zero minimum. A single paragraph is fine.
  This is practice, not a Pulitzer.
- "Can I add a photo?" — yes! Click the + button in the body editor, pick
  "Image", use the Big Muddy Photo Library picker (the one she just learned
  in task 6) to pick from the library.
- "What's the difference between draft and publish?" — draft is private,
  nobody sees it. Published is live on bigmuddytouring.com/magazine. For
  this task she only needs to save a draft.
- "Where's my writing saved?" — Sanity saves automatically as you type.
  She can close the tab and the draft persists.

COMPLETION:
We poll Sanity every 10s for new Article documents authored by Amy's email.
When we find one, task auto-completes. Celebrate and move her to task 8
(notification-prefs) with [[TASK:notification-prefs]].
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'notification-prefs',
    number: 8,
    title: 'Set notification preferences',
    oneLineDescription: 'How do you want me to find you?',
    detailDescription:
      "Pick where you want to get pinged when something needs your attention. Check as many as you like. You can change this anytime.",
    action: {
      type: 'form',
      label: 'Save preferences',
    },
    dawnHelpContext: `
Amy is on task 8: set her notification preferences. This is an inline form
in the task panel — no external page. She checks boxes for where she wants
notifications to go.

THE FORM FIELDS:
- Email — for scheduled posts, article publish confirmations, review alerts
- Asana — she's already in Asana, this routes task-level notifications there
- SMS — for urgent things only (a show cancellation, a guest emergency)
- Google Chat — for Delta Dawn's weekly check-ins and quick questions

RECOMMENDED DEFAULTS (but she picks):
- Email: ON (daily digest feel)
- Asana: ON (she's already in there)
- SMS: ON for urgent only (don't turn this off — guest emergencies matter)
- Google Chat: OFF unless she uses Google Chat day-to-day

IF SHE ASKS:
- "Can I change these later?" — yes, there's a settings page under /admin.
- "What's 'urgent'?" — guest complaints, show cancellations, payment
  failures, review alerts with < 3 stars. Chase and you (Delta Dawn)
  calibrate what's urgent over time.
- "I don't want any notifications" — fine, she can uncheck everything,
  but warn her that she'll miss stuff and there's no backup.

COMPLETION:
When she clicks "Save preferences", the form saves to
currentTaskState.notifPrefs AND auto-marks task complete. Move her to
task 9 (daily-loop) with [[TASK:daily-loop]].
`,
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: 'daily-loop',
    number: 9,
    title: 'Your daily rhythm',
    oneLineDescription: "Here's what a normal day looks like",
    detailDescription:
      "Last one. A quick read on what a typical day running Big Muddy social looks like. Take 30 seconds, read it, hit Got it, and you're set.",
    action: {
      type: 'static',
      label: "Got it",
    },
    dawnHelpContext: `
Amy is on the final task: daily-loop. This is a static content panel that
shows her the daily rhythm — Morning → Asana, During the day → photos into
the HDI Drop album, End of day → file inbox. She reads it, hits "Got it",
and she's done.

AFTER SHE HITS GOT IT:
All 9 tasks are complete. OnboardingProgress.completedAt gets set. Deliver
a genuine, warm congratulations — she made it. Tell her:
1. She can come back to this page anytime to review
2. You (Delta Dawn) are always available at /dawn
3. Her first real work: pick a show, write a short post, share it

Do not emit any more [[TASK:...]] markers — she's done with the sequence.
Just be warm and wrap it up. Maybe tell her to text Chase "I'm all set"
so he knows.
`,
    staticContent: `
## Your Daily Rhythm

A typical day running Big Muddy social media:

**Morning (5 minutes)**
- Open Asana, check what's due today
- Glance at /admin/dashboard for KPIs
- Scan /admin/reviews for any new 1-3 star reviews that need a response

**Throughout the day (pocket of 5-10 min each)**
- Photos taken on your phone → HDI Drop shared album → they auto-land
  in the Big Muddy library
- A cool show moment? Draft a quick post at /admin/social
- A guest story worth telling? Open Sanity Studio → Article → write it

**End of day (5 minutes)**
- File any loose photos into the right Drive folder
- Check tomorrow's Asana tasks
- If you drafted anything, let it breathe overnight — edit fresh tomorrow

**Weekly (Sunday or Monday)**
- Review last week's engagement numbers (email digest)
- Plan next week's events + posts
- Weekly check-in with Chase + Tracy on Asana

**Any time you're stuck:** ask Delta Dawn at /dawn. I'm here 24/7.
`,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Total number of tasks in the onboarding flow. */
export const TOTAL_TASKS = ONBOARDING_TASKS.length;

/** Look up a task by id, returns undefined if not found. */
export function getTaskById(id: string): OnboardingTask | undefined {
  return ONBOARDING_TASKS.find((t) => t.id === id);
}

/**
 * Given a set of completed task ids, return the next uncompleted task
 * (or null if all are done).
 */
export function getNextTask(completedIds: string[]): OnboardingTask | null {
  const completed = new Set(completedIds);
  return ONBOARDING_TASKS.find((t) => !completed.has(t.id)) ?? null;
}

/** All task ids in order — useful for validation. */
export const TASK_IDS = ONBOARDING_TASKS.map((t) => t.id) as readonly string[];
