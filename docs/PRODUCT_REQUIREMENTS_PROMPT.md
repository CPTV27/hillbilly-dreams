# Product Requirements Spec — External Consultant Prompt

**Copy this entire prompt and paste it into ChatGPT, Gemini, Perplexity, or any other AI agent. Each will give a different perspective. Bring the responses back to compare.**

---

You are a senior product consultant hired to build the technology platform for a small media-hospitality company. Your job is to produce a complete product requirements specification that a development team could execute against.

## The Business

**Measurably Better Things LLC (MBT)** is the platform layer for a media-hospitality ecosystem based in Natchez, Mississippi (population 14,000) with a second location in Woodstock/Bearsville, New York. Three equal partners: Chase (CEO/CTO, creative director, photographer, videographer), Tracy Alderson-Allen (innkeeper, MBT executive, magazine editor), Amy Allen (Inn and bar operations, performing artist on the Big Muddy Records label).

The company started because Amy needed her band promoted. Chase built a magazine, a record label, and a radio station to do it. Then he built the CMS to run it largely autonomously. Now they're duplicating those tools for applications in Bearsville, focusing on arts and culture.

## What the Business Does (Revenue Sources)

1. **The Big Muddy Inn** — 6-room hotel + bar + 50-seat live music venue (The Blues Room) in Natchez. Booked through Cloudbeds, Airbnb, VRBO. This is the cash flow anchor.

2. **Studio C** — Video production, photography, corporate events. B2B client work. This funds everything else. Also operates in the Hudson Valley (Tuthill Design brand for real estate photography).

3. **Big Muddy Touring** — Books bands on a circuit from Memphis to New Orleans. 13 cities, 735 venues in the database. Provides transport (Sprinter van) and production.

4. **Big Muddy Records** — Record label. Artists record at the studio, get distribution, radio play, magazine coverage, and touring support.

5. **Big Muddy Radio** — Streaming radio station from Natchez. Live sessions, curated playlists, interviews. Second station planned for Bearsville (Utopia Radio).

6. **Big Muddy Magazine** — Editorial coverage of the Mississippi corridor. Photography, artist features, city guides, food, architecture.

7. **Deep South Directory** — Local business directory for the corridor. Town-endorsed, broker-led model. Businesses subscribe at $25/$50/$99/$250 tiers.

8. **Chase Pierson Photography** — Chase's editorial and documentary photography practice (premium tier, distinct from Tuthill Design's rate card). 52,892 photos already ingested into the Hetzner Immich archive. Architectural, editorial, concert, landscape, aerial.

9. **Bearsville Creative** — Northeast node in Woodstock/Bearsville, NY. Photo-heavy, arts and culture. Summer 2026 activation. Partners: Miles and Elijah.

## What the Business Needs From Technology

### For Tracy and Amy (Non-Technical Operators)
- See tonight's bookings, tomorrow's check-ins, this week's shows — on one screen
- Get alerts when a guest books, cancels, or messages
- Post to social media without learning software (take a photo, it gets posted)
- See revenue dashboards without opening spreadsheets
- Manage the bar/kitchen ordering
- Print a daily sheet: who's checking in, who's checking out, what's happening tonight

### For Chase (Creative/Technical)
- Manage the entire media pipeline: shoot → edit → tag → publish → distribute
- Search 51,049 photos by content ("horn players", "Natchez sunset", "console close-up")
- Build and publish web pages with beautiful photography quickly
- Manage the radio station programming (shows, playlists, scheduling)
- Manage the record label (artists, releases, distribution)
- Manage touring (booking, routing, venues, shows)
- Send tasks to team members and track completion
- Communicate with AI agents via Google Chat (they do the work, he approves)

### For the Audience (Customers/Fans)
- Listen to the radio station
- Read the magazine
- Book a room at the Inn
- Buy tickets to shows
- Discover businesses in the directory
- Find music from Big Muddy Records artists
- View and buy photography prints

### For Business Clients (Directory Subscribers, Future Licensees)
- Claim and manage their business listing
- See analytics on their listing performance
- Get AI-generated social media content
- Get review management and response tools

## Current Technology

- **Stack:** Next.js 14 monorepo, TypeScript, Prisma/PostgreSQL, Vercel deployment
- **14 live domains** all served from one codebase with multi-tenant middleware routing
- **Google Cloud:** Vision API (photo tagging), Vertex AI (Gemini for AI features), GCS (media storage)
- **Cloudflare:** DNS for all domains, R2 storage, D1 database (message queue)
- **Apple ecosystem:** Lightroom Classic (photo catalog), Apple Photos (sync), CapCut (video editing)
- **Mac mini** runs broadcasting (OpenBroadcaster, Icecast), Plex, media processing
- **5,605 businesses** scraped and in database with census data for 13 corridor cities
- **8,548 nodes / 11,552 edges** in a constellation graph connecting venues, artists, hotels, restaurants
- **16,936 photos** processed through Vision API with labels (stranded in JSON, not in database yet)
- **55 music tracks** in MelodyVault (missing AI analysis)
- **Google Chat** webhooks working for agent → Chase communication

## What's Missing (Known Gaps)

1. **No authentication system** — no user accounts, no login for customers
2. **No billing/payments** — Stripe not integrated, pricing tiers defined but not wired
3. **No monitoring** — no error tracking, no uptime monitoring, no analytics beyond Clarity
4. **No photo search** — 16,936 tagged photos not queryable from the website
5. **No video catalog** — video content has no database, no tagging, no search
6. **No social media automation** — posting is manual
7. **Radio not streaming** — OBPlayer not connected to Icecast
8. **Google Chat bot** — outbound works, inbound messages not being received
9. **Brand voice not defined** — no documented voice guidelines per brand
10. **No onboarding flow** — for DSD subscribers, artists, or operators

## The Question

Given this business, these people, these revenue sources, and this existing technology — **what should the product be?**

Produce a complete product requirements specification covering:

1. **Product definition** — one sentence. What is this?
2. **User personas** — who are the 4-5 key users and what does their day look like?
3. **Core workflows** — the 10 most important things the system must do, in priority order
4. **Feature requirements** — grouped by module (Inn/Hospitality, Media/Content, Touring, Records, Radio, Directory, Admin/Ops)
5. **Technical architecture recommendations** — given the existing stack, what should change and what should stay?
6. **Build priority** — what gets built first, second, third? Why?
7. **What to kill** — what should this business stop doing or consolidate?
8. **Revenue model** — how does the technology generate or protect revenue?
9. **Team structure** — with 3 people, what's realistic? Where do AI agents fill gaps?
10. **90-day roadmap** — what ships in the first 90 days?

Be specific. Name tools, frameworks, and services. Include cost estimates where relevant. Don't be polite — be useful. If something is a bad idea, say so.

---

*This prompt was generated by Primetime (Chase's MacBook Pro agent) on April 9, 2026. Responses should be brought back to the hillbilly-dreams repo at docs/responses/ for comparison.*
