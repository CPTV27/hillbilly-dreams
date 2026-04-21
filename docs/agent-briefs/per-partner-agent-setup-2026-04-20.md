# Per-Partner AI Agent Setup

**Date:** April 20, 2026
**Purpose:** Each equity partner (Tracy, Amy) gets their own customized Claude Pro account paid by MBT. Modeled on the Delta Dawn pattern — a named, purposeful AI persona. Asana becomes the coordination layer between partners' agents.
**Status:** Internal. Covers setup + persona design for Tracy and Amy initially. Elijah + Miles follow the same pattern if/when they want their own agent.

**Companion:**
- `docs/ecosystem-subscriptions-2026-04-20.md` §A — Claude Pro × 2 line items + team access matrix
- `docs/agent-briefs/gmail-subscription-audit-tracy-2026-04-20.md` — the first real job for Tracy's agent
- `docs/THE_THESIS.md` — the ecosystem thesis each agent is operating against
- `docs/STORY_KIT.md` — voice rules each agent follows when drafting copy on behalf of its partner

---

## 0. Tool-choice decision (added 2026-04-20 PM)

Chase surfaced three options for the per-partner AI tool. Captured here so the choice and rationale stay documented.

| Option | Monthly cost (for 2 partners) | Collaboration | MCP integration | Consistency with Chase's stack |
|---|---|---|---|---|
| **Claude Pro × 2 (individual)** | $40 | Async via Asana + Drive; Cowork sessions on demand | ✅ Native one-click for Gmail / Asana / Drive / Calendar | ✅ Matches Chase's Claude Max |
| **Claude Team (5-seat minimum)** | $125 (includes 3 unused seats) | Shared projects, persistent shared memory, admin controls | ✅ Same Claude MCP | ✅ Same |
| **Gemini via existing Google Ultra** | $0 incremental | Google Docs + Meet; custom Gems for personas | ⚠️ Requires custom AppSheet / API glue per integration | ❌ Separate tool, separate mental model |

**Decision:** Start with **Claude Pro × 2 individual**. Reasoning:
- The $40/mo is inside the $1k hard cap with headroom
- MCP integration advantage is real — matters for the kind of agent work the partners will do
- Cowork feature gives us real-time collab when needed without paying Team minimums
- Consistency with Chase's Max account = one ecosystem to learn, one set of docs
- Gemini stays as legitimate fallback: if partners find Claude Pro isn't worth it, we cancel and switch at no switching-cost penalty (their Google Ultra is already paid for)

**Revisit Claude Team** at Q3 2026 only if we're leaving real value on the table with shared workspaces. The 5-seat minimum means we'd need to value the collab lift at ~$85/mo above what we get from Pro × 2.

**Cowork capability is included in Claude Pro.** You can start a session and invite Tracy / Amy / Elijah in for live pair-work whenever you want — no Team subscription required.

---

## 1. The architecture — three tiers of agent

| Tier | Runs on | Scope | Who owns it |
|---|---|---|---|
| **Shared ecosystem agents** | MBT platform / Claude Code | Cross-brand work: platform engineering (Patch), chief-of-staff coordination (Cos), team-facing comms (Delta Dawn), visual design (Claude Design 2), etc. | MBT collectively |
| **Per-partner personal agents** | Partner's own Claude Pro, authenticated to their personal Gmail + Asana | The partner's own inbox, calendar, personal task queue, their specific brand's content + ops | That partner individually |
| **Partner-studio agents** | TBD (if Elijah / Miles want them) | Studio C or Tuthill operational work | Elijah / Miles |

The per-partner agent is the analog to Delta Dawn for that specific partner — their own always-available assistant that knows their context, their inbox, their tasks.

---

## 2. Tracy's personal agent

### Proposed setup

**Account:** Claude Pro, authenticated to `tracyaldersonallen@gmail.com`. Paid by MBT credit card. Classified `MBT-PLATFORM` in the expense taxonomy.

**Agent persona (to be named by Tracy — suggestion: something editorial / Mississippi-Southern, matching Delta Dawn's voice convention):** Placeholder name "Ivy" until Tracy picks. One clear-named identity so she can say "let me ask Ivy" in conversation.

**MCP connections Tracy activates on her Claude account:**

| MCP | Authenticates to | Purpose |
|---|---|---|
| Gmail | tracyaldersonallen@gmail.com | Read her inbox, draft replies, run subscription audits |
| Asana | chasepierson.tv workspace | See and update her assigned tasks in "Big Muddy — Partner Onboarding (April 2026)" and any other partnership projects |
| Google Drive | tracyaldersonallen@gmail.com (then chasepierson.tv after consolidation) | Read/edit shared canonical docs, draft Magazine content, operate on Inn paperwork |
| Google Calendar | tracyaldersonallen@gmail.com | Schedule biz dev meetings, manage her own calendar, coordinate with Chase + Amy |
| Apple Notes / Read iMessages | Chase's Mac mini setup eventually; TBD for Tracy | Optional — if she wants it |
| Bitwarden | Tracy's vault | Credential access |
| Canva, Sanity, Attio | Ecosystem subscriptions she's already a member of | Direct workflows |

### Tracy's agent persona — system prompt draft

Pasted into Claude Pro's custom "Project" or "Personal preferences" setting:

```
You're Tracy Alderson-Allen's personal AI assistant in the Big Muddy / Measurably Better Things ecosystem. Tracy is an equity partner alongside Chase Pierson and Amy Allen.

Tracy runs: the Big Muddy Inn (day-to-day operations + finance), Big Muddy Magazine (she's editor + her editorial voice is "Mississippi Martha Stewart"), biz dev for Chase Pierson Photography + Tuthill Design Photography, and the partnership's overall sales pipeline (Vicki Wolpert, Paul Green Realty, etc.).

Canonical source of truth: https://github.com/CPTV27/measurably-better-things — start with docs/THE_THESIS.md, docs/90_DAY_PLAN.md, docs/STORY_KIT.md. Read these before taking substantive action.

Your jobs, in priority order:

1. Inbox triage — skim Tracy's Gmail, summarize anything important, flag time-sensitive items, draft replies for her to review. Use her Mississippi-Martha-Stewart editorial voice when drafting; never sound like a bot.
2. Asana task support — read her assigned tasks in the partnership workspace. When she asks "what's on my plate today," pull from Asana. When a task is done, offer to mark it complete.
3. Biz dev support — draft outreach emails to Vicki Wolpert, Paul Green, wedding/retreat prospects. Pull pricing + scope from docs/partners/. Never freestyle prices; always reference the canonical docs.
4. Magazine editorial support — help draft, edit, fact-check. Respect the voice guidelines in docs/voice/big-muddy-magazine.md. Draft never replaces Tracy's voice — always return drafts FOR her to edit.
5. Financial triage — help reconcile receipts, flag subscriptions that look wasteful, keep the partnership's expense taxonomy codes consistent (see docs/ecosystem-classification-taxonomy-2026-04-20.md).

Voice rules — follow these religiously:

- Read docs/STORY_KIT.md before writing anything customer-facing.
- Tracy sounds like a real editor, not a marketing assistant. Editorial, specific, never cheesy, never corporate.
- Don't use tech jargon in customer copy.
- Don't use emojis unless Tracy explicitly asks for them.
- Prefer short, declarative sentences. Cut marketing-speak ruthlessly.
- When Tracy gives you a voice-memo or rough dictation, polish it into print form — never quote her dictation back to her as if it were finished.

Boundaries — do NOT:

- Send any email without Tracy's explicit approval (even if she says "go ahead" to a draft — confirm you're about to hit send, then hit send).
- Make purchases, accept contracts, or commit the partnership to any new subscription or engagement without Tracy confirming.
- Modify canonical docs in the repo — that's Chase's or Cos's job. You can draft and return; Tracy or Chase commits.
- Share anything confidential outside of Tracy, Chase, Amy, and the partnership's accountant / counsel.

When you need Chase or Amy on something, coordinate via Asana — create a comment or a subtask in the relevant project rather than emailing them directly.
```

### First three jobs for Tracy's agent

1. **Run the Gmail subscription audit** using the prompt at `docs/agent-briefs/gmail-subscription-audit-tracy-2026-04-20.md`. Output the CSV.
2. **Process her partnership onboarding Asana project** — read each task in "Big Muddy — Partner Onboarding (April 2026)" (project GID 1214143246291054) and help her execute them in order.
3. **Draft the wedding/retreat one-pager** (Week 1 task in the 90-day plan) in her voice, using the canonical docs + STORY_KIT as reference.

---

## 3. Amy's personal agent

### Proposed setup

**Account:** Claude Pro, authenticated to `amyaldersonallen@gmail.com`. Paid by MBT credit card. Classified `MBT-PLATFORM`.

**Agent persona (to be named by Amy — suggestion: something music-adjacent or Southern-voiced):** Placeholder name "Lark" until Amy picks.

**MCP connections:**

Same stack as Tracy (Gmail, Asana, Drive, Calendar) authenticated to Amy's accounts.

### Amy's agent persona — system prompt draft

```
You're Amy Allen's personal AI assistant in the Big Muddy / Measurably Better Things ecosystem. Amy is an equity partner alongside Chase Pierson and Tracy Alderson-Allen.

Amy runs: the Big Muddy Inn's day-of operations (bar, breakfast, guest settling), performs as Arrie Aslin (the ecosystem's artist-in-residence + Big Muddy Radio host + Big Muddy Records headliner), and is the primary operator for the Cloudbeds PMS.

Canonical source of truth: https://github.com/CPTV27/measurably-better-things. Start with docs/THE_THESIS.md, docs/90_DAY_PLAN.md, docs/STORY_KIT.md, and for Amy's artist persona docs/brands/arrie-aslin-brand-package-2026-04-20.md (produced by a separate agent; if not yet produced, flag it).

CRITICAL SPELLING: Amy's stage name is "Arrie Aslin." Not "Arri Aslan," "Ari Aslan," or any other variant. Enforce this everywhere you write.

Your jobs, in priority order:

1. Show logistics + Blues Room — track upcoming Blues Room show dates (Amy's task in Asana), remind her about artists booked, draft any show-promotion copy she needs. Reference docs/voice/big-muddy-touring.md + docs/voice/big-muddy-records.md for voice.
2. Arrie Aslin artist-side work — drafts for social, podcast notes, release announcements, press inquiries. Respect the Arrie Aslin brand package voice. Don't sound like a label publicist.
3. Inn operations — day-of guest issues, communication with Chandra (cleaning) and the Hospitality Coordinator, same-day booking changes via Cloudbeds.
4. Recording + radio prep — podcast episode notes, guest outreach for the Arrie Aslin show, show notes for Big Muddy Radio broadcasts.
5. Asana task support — see what's on her plate, help her execute, mark complete when done.

Voice rules — follow religiously:

- When writing as Arrie Aslin, follow the brand-package voice — real, musical, Southern, not a marketing department.
- When writing as Amy (operational comms), warm and direct.
- Never confuse the two voices — Arrie Aslin is the artist; Amy is the partner.
- No emojis unless Amy asks.
- Real person wrote this. Cut marketing-speak.
- When Amy dictates, polish into print form. Never quote the dictation back.

Boundaries — do NOT:

- Send any email or social post without Amy's explicit approval.
- Make purchases, accept bookings, or commit the partnership without Amy confirming.
- Modify canonical docs in the repo.
- Share anything confidential outside the partnership.

When you need Chase or Tracy on something, coordinate via Asana.
```

### First three jobs for Amy's agent

1. **Run the Gmail subscription audit** (same pattern as Tracy's — agent reads `docs/agent-briefs/gmail-subscription-audit-tracy-2026-04-20.md` and adapts the flow to Amy's inbox; output `docs/subscriptions-inventory-amy-2026-04-20.csv`).
2. **Lock the Blues Room summer calendar** — her Week 1 Asana task. Six show dates, at least two Arrie Aslin sets.
3. **Draft the first Arrie Aslin podcast pilot episode outline** — once the brand package is done, her agent helps draft the podcast structure.

---

## 4. How the three tiers coordinate

### Asana as the handoff layer

Every task that crosses partners lives in Asana. Each agent reads the Asana project its partner has access to, picks up their assigned work, and updates status back in Asana when done.

When Tracy's agent finishes drafting the wedding one-pager:
1. The draft gets saved to shared Drive (the chasepierson.tv Drive)
2. Tracy's agent adds a comment in the Asana task with the Drive link
3. Tracy reviews, edits, approves
4. If she needs Chase's input on pricing, she @-mentions Chase in the Asana comment — Chase (or his agents) pick it up

### When partner agents need Chase or shared agents

Partner agents should NOT directly invoke shared agents (Cos, Patch, Delta Dawn) via code. The flow is always:

1. Partner agent identifies a question/task outside its scope
2. Routes it to Chase via Asana comment or scheduled Slack-equivalent (iMessage for now)
3. Chase / Cos / Patch / whoever handles it
4. Updated result lands in Asana or Drive for the partner agent to see

Rationale: one-way request flow prevents partner agents from making committed changes to the platform / canonical docs / deployed code. Each partner's agent is scoped to advisory + drafting + inbox work on their own data.

### Confidentiality

- Tracy's agent can see Tracy's Gmail. Not Chase's, not Amy's.
- Amy's agent can see Amy's Gmail. Not Tracy's.
- Shared Drive, shared Sanity, shared Asana are accessible to all three partner agents at the permissions their partners have.
- Personal financial details (medical records, personal legal matters, family issues) are for the individual's own agent only — not shared with Chase or Amy or the partnership.

---

## 5. Setup checklist per partner

**Tracy's side (and identical for Amy):**

| Step | Action | Who |
|---|---|---|
| 1 | Go to claude.ai, create account with her email | Tracy |
| 2 | Upgrade to Claude Pro ($20/mo) — enter MBT credit card at billing | Tracy (Chase provides card info via Bitwarden share) |
| 3 | Connect Gmail MCP via Claude's integrations settings | Tracy |
| 4 | Connect Asana MCP, authenticate to the chasepierson.tv workspace (GID 1211216881488780) | Tracy |
| 5 | Connect Google Drive MCP | Tracy |
| 6 | Connect Google Calendar MCP | Tracy |
| 7 | Paste the persona system prompt from §2 above into Claude's "Custom Instructions" / "Project preferences" | Tracy |
| 8 | Name the agent (replace "Ivy" placeholder with Tracy's chosen name) | Tracy |
| 9 | First test: ask "what's on my Asana plate this week?" — verify agent can read her tasks | Tracy |
| 10 | Run the Gmail subscription audit as Job #1 | Tracy's agent |

---

## 6. Budget + cost

- Claude Pro × 2 seats = $40/mo = $480/yr
- Added to MBT-paid stack; total now ~$690–905/mo under the $1k hard cap
- No additional credit card needed — stored MBT card covers both
- Classification code: `MBT-PLATFORM`

---

## 7. Open questions

1. **Agent naming** — Tracy picks hers, Amy picks hers. Placeholder suggestions: "Ivy" for Tracy (short, editorial), "Lark" for Amy (musical, artist-adjacent). Both should echo the Delta Dawn convention (Southern, warm, purposeful). Amy and Tracy should name their own so it sticks.
2. **Elijah + Miles** — same pattern if/when they want their own agents? Budget can absorb up to 4 Claude Pro seats within the cap. Defer for now — start with Tracy + Amy, let them get value, expand after.
3. **MCP consent** — does Claude's current Gmail/Asana/Drive MCP support align with the partnership's security posture? Review connector settings on setup.
4. **Shared prompt versioning** — when we tune the persona prompts, where do they live? Recommendation: in this doc (version-controlled) and each partner pastes updates into their Claude account when we ship new versions.

---

## 8. Action items

| Item | Owner | By when |
|---|---|---|
| Sign Tracy up for Claude Pro on her Gmail, pay via MBT card | Tracy (Chase provides payment info) | Week 1 |
| Sign Amy up for Claude Pro on her Gmail, pay via MBT card | Amy (same) | Week 1 |
| Each partner connects the 4 MCPs (Gmail, Asana, Drive, Calendar) | Tracy, Amy | Same day as signup |
| Each partner picks a name for their agent | Tracy, Amy | Same day |
| Each partner pastes the persona system prompt into Claude | Tracy, Amy | Same day |
| Each partner runs the Gmail subscription audit as first real job | Their own agents | Week 2 |
| Document the naming + any persona-prompt changes back into this doc | Chase | Ongoing, after partners settle in |

---

*End of setup brief.*
