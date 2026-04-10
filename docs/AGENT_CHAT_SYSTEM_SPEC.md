# Agent Chat System — Google Chat as the Primary Interface

**Date:** April 8, 2026
**Priority:** CRITICAL — this is how Chase runs the company

---

## The Vision

Google Chat is the front door. Chase sends a message. The right agent picks it up. The work gets done. It comes back for review. Chase approves or revises. It ships. Everything happens in chat.

It should behave like a real company with a real team:
- Tasks get assigned
- Work gets managed by multiple agents collaborating
- Deliverables come back with a review and approval process
- Easy editing, easy revisions
- Rules and contracts get enforced automatically
- Chase doesn't touch code, doesn't open a terminal, doesn't log into admin panels

---

## The Agent Roster

These agents live in Google Chat. Each has a personality, a domain, and clear responsibilities.

| Agent | Role | Domain | When to Use |
|---|---|---|---|
| **Primetime** | Chief of Staff / MacBook Pro | Code, deployment, pages, frontend, architecture | "Build me a page", "Fix the 404", "Deploy" |
| **Delta Dawn** | Big Muddy AI | Inn, magazine, radio, records, shows, corridor data | "How many venues?", "What shows this week?", "Write a magazine piece" |
| **Huck** | Build Agent | Infrastructure, CI/CD, database, migrations | "Run the migration", "Fix the build", "Set up the pipeline" |
| **Chuck** | Road Manager | Touring, venues, logistics, van, scheduling | "Book the band", "Route the corridor", "Van schedule" |
| **Ledger** | Data & Metrics | Analytics, census, enrichment, financial data | "Revenue this month", "How many businesses in the DB?", "Enrich these contacts" |
| **Rook** | Strategy | Chase-only, HDI holding company, valuations, investors | "Model the revenue", "Prepare the pitch", "Cap table" |
| **Mac Mini** | Media Processing | Photo/video processing, broadcasting, Plex, streaming | "Process these photos", "Start the radio stream", "Cut social clips" |
| **Tracy's Desk** | Inn Operations | Bookings, Cloudbeds, guest comms, daily ops | "Check tonight's bookings", "Guest arriving at 3pm" |

---

## How It Works

### 1. Chase sends a message in Google Chat
"Put horn player photos on the entertainment page"

### 2. Router detects the right agent
Keywords + context → Primetime (it's a page/frontend task)

### 3. Agent acknowledges
"Got it. Searching 16,936 photos for horn players. I'll show you options in 2 minutes."

### 4. Agent does the work
- Searches photo manifest
- Finds best matches
- Makes the edit
- Deploys

### 5. Agent sends back for review
Posts a card in Google Chat with:
- Screenshot or link to the preview
- "Approve" and "Revise" buttons
- Description of what changed

### 6. Chase approves or revises
- Tap "Approve" → agent deploys to production
- Type a revision → agent adjusts and re-submits

### 7. Agent confirms completion
"Live at bigmuddyentertainment.com. Horn player photos on the Touring and House Band sections."

---

## Multi-Agent Collaboration

Some tasks need multiple agents:

**"Make a magazine article about the Save the Hall Ball"**
1. Router → Delta Dawn (content)
2. Delta Dawn writes the article draft, posts for review
3. Delta Dawn → Mac Mini: "Process the Save the Hall Ball photos"
4. Mac Mini processes photos, posts them to GCS
5. Delta Dawn → Primetime: "Publish this article with these photos"
6. Primetime builds the page, deploys
7. Primetime → Chase: "Article live. Review here: [link]"

The agents coordinate through the chat thread. Chase sees the whole conversation.

---

## Review & Approval Flow

Every deliverable gets a review card:

```
┌─────────────────────────────────┐
│ 📋 Review: Entertainment Page   │
│ Primetime — MacBook Pro Agent   │
├─────────────────────────────────┤
│ Changed hero image to horn      │
│ player photo (smart-preview-    │
│ 13115). Added to Touring and    │
│ House Band sections.            │
│                                 │
│ Preview: localhost:3000/ent...  │
│                                 │
│ [✅ Approve]  [✏️ Revise]       │
└─────────────────────────────────┘
```

- **Approve** → agent deploys to production, confirms
- **Revise** → Chase types feedback, agent adjusts

---

## Rules Engine

Agents enforce rules automatically:
- Brand voice (read feedback_chase_voice.md before writing copy)
- Photo quality (only reviewed/approved photos on hero sections)
- No pitch language on partner pages
- No business terms on vision pages
- Tracy and Amy are equity partners, never employees
- Bitwarden for all credentials
- Verify deploys — CI passing ≠ deployed

Rules violations get flagged before delivery, not after.

---

## Technical Architecture

### Outbound (Agents → Chase): WORKING
- Webhook URLs per agent in `.env.local`
- `lib/gchat.ts` handles card formatting and posting
- Each agent has its own webhook for attribution

### Inbound (Chase → Agents): NEEDS SETUP
- Google Chat bot app registered in Google Cloud Console
- Bot webhook endpoint: `POST /api/gchat/bot`
- Messages stored in Cloudflare D1 queue
- Agents poll `/api/gchat/pending?agent=NAME`
- Agents reply via `POST /api/gchat/reply`

### Inter-Agent Communication
- Agents post in the same Google Chat thread
- Chase sees all agent-to-agent coordination
- Handoff files in `.claude/agents/` for async work
- T7 shared directory for large file exchange

---

## What Needs to Be Built

1. ✅ Outbound webhooks (working as of today)
2. ⬜ Google Chat bot registration (inbound messages)
3. ⬜ Cloudflare D1 message table creation
4. ⬜ Review/approve card buttons (interactive cards)
5. ⬜ Agent router intelligence (better than keyword matching)
6. ⬜ Multi-agent task orchestration
7. ⬜ Primetime agent added to roster with webhook
8. ⬜ Mac Mini agent added to roster with webhook
9. ⬜ Tracy's Desk agent added to roster
