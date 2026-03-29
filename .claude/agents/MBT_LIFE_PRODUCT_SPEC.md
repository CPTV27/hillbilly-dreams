# Measurably Better Life — Product Spec

## The Pitch

Your community is the asset. Organization is the value multiplier. This app shows you how.

**measurablybetter.life** — better than ChatGPT, and it knows your neighborhood.

---

## What It Is

The practical answer to every "how do I actually do this?" question in Outsider Economics. Not a business SaaS. A life tool. Your community, your skills, your coordination — in your pocket.

Two products share one public database:

1. **Measurably Better Life** ($25/mo) — consumer app, your life is the focus
2. **Deep South Directory** (free / $99/mo) — local business network, feeds into the app

---

## Core Features

### Community Board
The Task Board from OE, built as an app. Post what you need done. See what your community needs. Match skills to tasks. Track completion.

### Skill Map
Your community's skills inventory. Searchable. "Who can wire a house?" answered in seconds. Voluntary — you list what you want to offer.

### Time Ledger
Track hour-for-hour exchanges. One hour welding = one hour bookkeeping. The time banking system from OE. IRS-recognized, not taxable barter.

### Local Directory
Browse Deep South Directory businesses. Find locals. Support locals. Enhanced access at paid tiers.

### Extraction Calculator
Track your spending for a week. See how much leaves your community. The OE math, personalized to your zip code.

### AI Coordinator
An AI that has context on your community's skills, local businesses, events, and the OE framework. Not a generic chatbot — a local coordinator.

Can answer:
- "Who in my community can help me build a deck this weekend?"
- "What's the best electrician in Natchez?"
- "How do I set up a tool library?"
- "Help me make the case for a community garden at the city council meeting"

### AI-Assisted Writing
When you search and find a topic you care about, say "I want to write about this." The AI:
- Drafts an article using your research, local context, and the OE editorial voice
- Checks editorial fit: does this advance community coordination, local value, practical self-sufficiency?
- If it fits — helps you polish it, publishes to the community knowledge base, you earn contributor credit
- If it doesn't fit — explains why and suggests how to reframe it

The app has a perspective. It's not neutral. It's for people building local economies.

Editorial standard: `.claude/agents/OE_WRITING_VOICE.md`

### Community-Contributed Data
Users can submit discoveries to the public database:
- Find a great local business, mechanic, farmer's market → submit it
- AI first pass + human review (existing PendingDraft pattern)
- Approved submissions added to the public directory
- Contributors earn credit (visible profile, redeemable for tier upgrades or time credits)
- Attribution: "This listing was contributed by Sarah M. from Natchez"

The more people use it, the better the database gets.

---

## Pricing

| Tier | Price | Focus |
|------|-------|-------|
| Free | $0 | Browse directory, read community boards (read-only) |
| Life | $25/mo | Full community tools, AI coordinator, AI writing, enhanced directory, contribution credit |
| Business | $99/mo | Everything in Life + directory listing, social media, reviews, content studio |
| Ops | $1,200+/mo | Full operating system deployment |

**Wedge:** The $25 Main Street business listing bundles the Life app. Come for the directory, stay for the life tools.

---

## Data Architecture

### Public Database (shared between DSD and MBT Life)
- `DirectoryBusiness` — local business listings (already exists)
- `CommunityProfile` — public profile of a community/pod
- `SkillListing` — public skill offerings
- `TaskPost` — task board posts
- `TimeExchange` — logged exchanges (anonymized public, detailed for participants)
- `ToolLibraryItem` — shared tools/equipment
- `LocalEvent` — community events
- `ContributedListing` — user-submitted businesses pending review
- `ContributorCredit` — earned credit for approved submissions

### Private Database (business operations only)
- `Client` — Stripe, voice profiles, operations
- `Review` — review pipeline, AI responses
- `ContentCalendar` — social media scheduling
- `Invoice` — billing
- `ClientIntegration` — OAuth tokens
- All agent context, decisions, drafts

### Access Control
- Free: read public directory, browse boards
- $25/mo: full read/write on community features, AI coordinator, writing tools
- $99/mo: all above + business operations
- Contributors: earn credit regardless of tier

---

## AI Architecture

Extend existing Sovereign Notebook pattern (Gemini 2.5 Flash, 1M context window).

Context packed into every conversation:
- User's community skill map
- Local directory businesses (hours, specialties, reviews)
- Time exchange history
- Task board state
- Local events and resources
- OE philosophy and frameworks (permanent context)
- OE voice spec (for editorial evaluation)

The AI is local-first. It knows your town. That's the moat.

---

## Editorial Harmony

The app has a vibe. Not a content policy — a tone. The AI acts as a tuning fork, not a gatekeeper.

**When something fits the frequency:**
- Community coordination, local value, practical self-sufficiency, skill sharing, federation — the AI helps you develop it, polish it, connect it to what others are building.

**When something is off-key:**
- The AI doesn't reject it. It helps you find the connection: "Here's how this relates to what the community is working on" or "Here's a way to frame this that's more useful to your neighbors."

**When something is factually wrong:**
- Say so. Clearly. "This claim doesn't hold up — here's what the data actually shows." Honest, not harsh.

**When something is toxic or destructive:**
- Don't publish it. But explain why without moralizing. "This reads as an attack on a specific person. The platform is for building, not tearing down. Rewrite it as a constructive proposal and resubmit."

This should rarely come up. The kind of people using a community coordination app are not the problem. The filter is a safety net for quality — is it true, is it useful, does it help somebody — not a speech code. No tone policing. No language rules. Just: don't lie, don't be destructive, and try to be useful.

---

## Implementation Phases

### Phase 1: Data Layer
- Add public schema models to Prisma
- API routes for public data (read free, write $25+)
- Migrate DirectoryBusiness to serve both products

### Phase 2: MBT Life Core (MVP)
- Community Board UI
- Skill Map UI
- Time Ledger UI
- Directory browse
- Auth + Stripe subscription tiers

### Phase 3: AI Coordinator + Writing
- Extend Sovereign Notebook with community context
- Chat UI for MBT Life
- AI-assisted article drafting with editorial filter
- OE voice spec as evaluation standard

### Phase 4: Community Contributions
- Submission flow for new directory listings
- AI + human review pipeline
- Contributor credit system
- Attribution on approved listings

### Phase 5: Personal Knowledge Sync
- Apple Notes integration — sync notes into the AI coordinator's context
- Notes automatically stored, referenced, organized, and searchable
- Your notes become part of your search results alongside directory data and community context
- Future: Google Keep, Obsidian, other note apps

### Phase 6: Federation
- Cross-community board visibility
- Inter-pod time exchange
- Shared services pooling
- Federation dashboard

---

## Native iPhone Integrations

- **Apple Notes** — sync notes into AI coordinator context. Your notes searchable alongside directory and community data.
- **Contacts** — auto-suggest community members from address book by location. "These 12 contacts are in Natchez."
- **Calendar** — sync time exchanges, task deadlines, community events.
- **Maps/Location** — directory businesses near you. Geofenced notifications near community resources.
- **Messages/iMessage** — share task posts and directory listings as rich links.
- **Photos** — snap and submit to directory or community board directly.
- **Wallet** — time credits as wallet pass. Contributor status. Community membership.
- **Shortcuts/Siri** — "Who in my community can fix a fence?" routes to AI coordinator.
- **Notifications** — task board alerts, exchange requests, new local listings.
- **Share Sheet** — browsing the web, hit Share → "Submit to MBT" for community contribution review.

## Philosophical Constraints

1. **No extraction** — the app charges a subscription, never a transaction percentage
2. **Data ownership** — your data is yours, export anytime, leave anytime
3. **Community-sized** — federation over scale, always
4. **Has a point of view** — the editorial filter means this isn't a neutral platform
5. **Local-first** — the AI's advantage is knowing your neighborhood
6. **Contributor-powered** — the community builds the database, gets credit for it
7. **Main Street pricing** — $25/mo, affordable for anyone
