# APP UX SPEC — The Three-Mode Interface
## March 26, 2026
## This is what the app actually is.

---

## THE APP IS THREE MODES

Swipe between them. Same workspace underneath. Different lens on the same data.

### Mode 1: TEXT
The conversation. You talk, it talks back. This is where everything starts.

- Morning briefing appears as the first message of the day
- Voice input via floating mic button
- You say things naturally: "I paid the plumber $150" / "Should I raise prices?" / "Post this photo"
- AI responds with actions, not essays: "Logged. Expense filed under maintenance."
- When AI needs you later, it references the conversation: "Remember the coffee cart idea? Here's the math."
- The conversation IS the input method for everything — no forms, no settings, no navigation

### Mode 2: TASKS
The living to-do list. AI puts things on it. AI does things on it. You handle the human parts.

- Items appear automatically from conversations, data triggers, and scheduled checks
- Each item has one of three states:
  - **AI handled** (green check) — done, you just see it happened. "Posted brisket photo to Instagram, Facebook, website."
  - **Needs you** (amber) — AI did the prep, you make the call. "New 1-star review. Draft response ready. [Approve] [Edit]"
  - **In progress** (blue pulse) — AI is working on it. "Running pricing analysis. Brief tomorrow morning."
- Items that are done fade to the bottom, then disappear after 24 hours
- You never create tasks manually. You just talk in Text mode and tasks appear.
- Tap any task to see the conversation context that created it

### Mode 3: GALLERY
Your photos, content, and media. Visual. Swipeable.

- Every photo you've taken through the app
- What was posted, where, when
- What's scheduled for the future
- What's in the hopper (drafted but not approved)
- Tap a photo to see its outputs: "Posted to Instagram 3/25, added to website gallery, included in March newsletter"
- The "take a photo" camera button lives here too — snap, AI processes, it appears with all its outputs
- Content calendar view: what's going out this week

---

## HOW THEY CONNECT

All three modes are lenses on the same workspace. The same event shows up differently in each:

| Event | Text | Tasks | Gallery |
|-------|------|-------|---------|
| You take a photo of brisket | "Got it. Posting to 4 channels." | "✓ Posted brisket photo (4 channels)" | Photo with overlay: IG ✓ FB ✓ Web ✓ Newsletter ✓ |
| AI detects margin drop | "Your food cost is up 6% since February." | "⚠ Review food costs [See analysis]" | — |
| You say "coffee cart idea" | "Got it. Brief tomorrow." | "◉ Running: Coffee cart analysis" → next day: "☐ Review coffee cart brief [Approve plan] [Shelve]" | — |
| New review comes in | "New 5-star review from Sarah M." | "✓ Auto-responded to 5-star review" | — |
| Bad review comes in | "New 2-star review. Draft response ready." | "⚠ Review response [Approve] [Edit]" | — |

---

## NAVIGATION

**Mobile:** Horizontal swipe between modes. Three dots at the bottom indicating which mode you're in. No tab bar. No hamburger menu. No settings icon. Just swipe.

**Desktop/Tablet:** Three subtle tabs at the top — Text / Tasks / Gallery. Or segmented control. Same content, more screen real estate.

**Kiosk mode:** Full screen on any device. Same three modes. Same swipe. The device IS the app.

---

## AI BEHAVIOR RULES

### What AI does silently (no approval needed):
- Log expenses from voice/text input
- Categorize transactions
- Monitor reviews (notify on negative, auto-respond to positive)
- Track compliance deadlines
- Update Google Business Profile hours
- Generate daily briefing
- Compile weekly summary

### What AI drafts for approval (human-in-the-loop):
- Social media posts from photos
- Review responses to negative reviews
- Email newsletters
- Business plan briefs
- Price change recommendations
- Vendor switch suggestions

### What AI never does without asking:
- Spend money (orders, subscriptions)
- Send emails to customers
- Change prices
- Hire/fire/schedule staff
- File taxes or legal documents
- Make public posts with the owner's name

### The pattern for every AI action:
1. **Capture** — user says something or data triggers something
2. **Triage** — AI proposes an action: "I can handle this. Want me to?"
3. **Work** — AI does the work (draft, analysis, research)
4. **Confirm** — user approves, edits, or defers
5. **Done** — task completes, moves to the done pile

---

## INLINE SUGGESTIONS (how AI proposes tasks)

When you're in Text mode and say something actionable, the AI doesn't just respond — it proposes a task inline:

```
You: "I need to order more napkins and also the AC is making a weird noise again"

AI: "Got it. Two things:"

[ ] Order napkins — want me to reorder from your last supplier? [Yes] [Different supplier]
[ ] AC maintenance — want me to find an HVAC tech nearby? [Yes] [I have a guy]
```

Each suggestion is one tap to accept. The accepted items appear instantly in Tasks mode. Rejected ones disappear. No friction.

---

## THE MORNING BRIEFING (in Text mode)

Every morning, the first thing in your text stream:

```
Good morning. Here's your Wednesday.

$2,840 yesterday (↑ 8% vs. your Wednesday average)

3 things today:
• 2 check-ins arriving (Hendersons at 3, Carters at 5)
• Grocery delivery at 10am — list attached
• New wedding inquiry from Sarah M. [See draft response]

1 thing to watch:
• Your food cost hit 37% this month (was 31% in January)
  [Show me why] [Ignore for now]
```

This isn't a notification. It's the first message in your conversation. You can respond to any part of it: "Why is food cost up?" → AI explains with your actual numbers.

---

## THE GRAYED-OUT PREVIEW (free tier)

Free users see Tasks mode with some items they can't act on:

- ✓ "Google rating: 4.6 (47 reviews)" — visible, interactive
- 🔒 "Daily Briefing" — grayed, shows first line then blurs. "Unlock with $20/mo"
- 🔒 "Marketing: 3 posts drafted" — grayed, shows thumbnails blurred. "Unlock with $20/mo"
- 🔒 "Business Coach" — grayed, shows "Your margins are..." then blurs. "Unlock with $20/mo"

They see the SHAPE of what they're missing every day. The upgrade is the product showing you what's behind the curtain.

---

## WHAT THIS IS NOT

- Not a dashboard with charts
- Not a CRM with contacts and pipelines
- Not a project management tool with Gantt charts
- Not a chat app with an AI bolted on
- Not a social media scheduler with a calendar view

**It's a workspace where you talk to your business and your business talks back.** The to-do list is the system's memory. The gallery is your content. The text is how you communicate. Three modes. One thumb. $20/mo.

---

## DESIGN DIRECTION

- **Linear's polish** — every interaction feels tactile and considered
- **Uber's simplicity** — three taps max for any action
- **Duolingo's habit** — the streak, the morning ritual, the encouragement
- **Spotify's dark mode** — for the ambient/gallery views
- **Airbnb's warmth** — for the hospitality-specific deployments
- **Our own "take a photo" moment** — nobody else has this

Colors, fonts, and tokens: see DESIGN_SYSTEM.md
Signature moves: see DESIGN_VISION.md
Architecture: see UX_RETHINK.md
This document: what the app actually IS.
