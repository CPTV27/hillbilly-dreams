# Presentation Review Notes — April 15, 2026
**Source:** Chase's voice memo reviewing the HTML dashboard
**Purpose:** Capture every instruction for integration before the Rea meeting

---

## Note 1: Expand the Thesis — It's About Experiences, Not Organization

**What Chase said:**
> "We're living in a time where we have the greatest technology in the world. Winning looks like letting technology do the work so you can spend less time on screen and more time living and catering to experiences. We're selling experiences fundamentally, across a portfolio of platforms."

**Current thesis:** "The gap isn't technology, it's organization. That's what we sell."

**New thesis direction:** We sell **experiences**, enabled by technology that works invisibly. The organization is HOW we deliver it, but the WHAT is experiences — at the Inn, at shows, on radio, in the magazine, in the community.

**Action:** Rewrite the thesis section to lead with the experience angle, not the infrastructure angle. The infrastructure story is for institutional buyers. The experience story is for Tracy, Amy, Rea, artists, and fans.

---

## Note 2: Tell the Delta Dawn Story — Show the UX

**What Chase said:**
> "Imagine a world where you turn on your phone, and it opens up, and it's only one app: 'Hello, how's your day? Here's all the things you need to worry about. Your heart rate went down yesterday. You've got an email to send but I've already written it. Approve it over lunch. And it has the contract ready for signature for your 10th wedding booking this year.'"

**What this means:** Chase wants a narrative walkthrough of what it FEELS like to use the MBT platform from Tracy's perspective. Not features — feelings. Not a product spec — a day-in-the-life.

**Action:** Add a "A Day with Delta Dawn" section to the dashboard that walks through Tracy's morning:
1. Opens app → sees her day organized
2. Magazine article AI-drafted in her voice → she reviews and approves
3. Wedding inquiry came in overnight → contract already generated
4. Social posts scheduled → she just approves
5. At the end — a map showing all the things happening automatically (marketing going out, people arriving, social media posting)

---

## Note 3: Tracy Needs to FEEL the Product

**What Chase said:**
> "She thinks it's this big high-tech fancy thing she doesn't know what it does, but she knows she needs me to hook some shit up for Regina. We need to tell the story of using it. Simple use cases."

**Action:** The presentation needs to make Tracy go "Oh, THAT'S what this does." Not tech specs. Not module diagrams. Show her clicking a button and a wedding booking happening. Show her dictating an article and it appearing in the magazine.

---

## Note 4: Creative Production — Animated Explainer Video

**What Chase said:**
> "We should use our creative production department to develop some really cool ads. A few scenes telling the story of the app from Tracy's perspective as a user, in animation. Show her experience on the app full screen, then show the things happening — social media going out, marketing, people coming and going. A blur between her user experience and mapping out all the things that are happening."

**Action:** This is a production request, not a code task. Create a brief for an animated explainer:
- **Style:** Cute, warm, not corporate. Music underneath.
- **POV:** Tracy using the app on her phone
- **Structure:** App screens → real world consequences → map of ecosystem activity
- **Duration:** 60-90 seconds
- **Tools:** Remotion (React-based, fits our stack) or commission from animator

---

## Note 5: Custom Entry Points for Different Audiences

**What Chase said:**
> "It's too much for any one person to swallow. We need entry points for different people, relative to what their needs are and how this fits into their world."

**Action:** Build audience-specific landing views:
- **Tracy/Amy view:** "Here's your day, here's what the app does for you"
- **Band view:** "Here's how we book, promote, and pay you"
- **Venue view:** "Here's what we bring to your room"
- **Business owner view:** "Here's how you get found and promoted"
- **Institutional buyer view:** "Here's the platform you're licensing"

The current dashboard is the "whole story" view. We need shorter, targeted versions.

---

## Note 6: Reference Google Tech — Show the Stack Credibility

**What Chase said:**
> "We should have Google logos on there. Any reputable brands we're using. Show integrity that we're building on legit technology. We're using Google's best practices. Make it sound more official than it is. We would love to get Google's attention."

**Action for the dashboard:** Add a "Built On" section showing:
- Google Cloud (Vertex AI, Cloud Storage, Vision API, TTS)
- Stripe (payments, Connect)
- Vercel (deployment, edge network)
- Anthropic Claude (AI generation)
- Prisma + PostgreSQL (database)
- Next.js (framework)

Use their logos. Simple, clean. "Powered by" strip.

---

## Note 7: Google Compliance Agent

**What Chase said:**
> "We need an agent whose whole job is to review this app and make sure we're in alignment with Google. It needs to give a score. Rank each individual category."

**Action:** Create a QA agent or scoring system that evaluates:
- Google Cloud best practices compliance
- Accessibility (WCAG)
- Performance (Core Web Vitals)
- SEO (structured data, meta tags)
- Security (OWASP)
- Gives a score per section, like the sanity scorecard but for technical compliance

---

## Note 8: Touring — Emphasize the Promo Department

**What Chase said:**
> "We need to emphasize the built-in promo department. It's one thing to book the band. It's another thing to do all the promotion and get people there. We're building a network. We need to find influencers in different markets that'll help blast out our shit. Find them now, invite them to shows, pick them up in the Big Muddymobile, start razzledazzling."

**Action for dashboard:** Add "Promotion Network" to the Touring section:
- Built-in promotion through Radio, Magazine, Social
- Influencer network (identify and recruit regional influencers)
- Cross-promotion with venue partners
- The Big Muddymobile experience (pick up influencers, VIP treatment)

**Action for build:** Start an influencer database. Fields: name, market, platform, reach, relationship status, notes.

---

## Note 9: Broadcasting Module — Expand Description

**What Chase said:**
> "They're not gonna know what Icecast or OBS is. Say 'live production.' We've got TV channels rebroadcastable on public access. Integration module for public access stations. Free thing to power their station. Exchange between users through Google Drive to transfer shows and ingest with our pipeline."

**Action:** Rewrite the Broadcasting module description:
- **Old:** "Live production — OBS, Icecast, multi-stream to radio/web/social"
- **New:** "Live TV and radio production. Broadcast-ready channels for public access stations. Show exchange network — stations share content through a common pipeline. Your own broadcasting infrastructure, ready to go."

Also: The **public access integration module** is a new concept worth its own card. This is a product for public access TV stations.

---

## Note 10: 50/50 Revenue Split with Artists

**What Chase said:**
> "The net profit is split between Big Muddy and the artist 50/50. That just makes everything simple. Split everything with the artists, you create a lot of opportunities."

**Action:** Make the case study show the 50/50 split explicitly:
- Gross profit: $3,800
- Artist's share: $1,900
- Big Muddy's share: $1,900
- Plus Big Muddy keeps all downstream (radio content, magazine, directory listings)

---

## Note 11: MySpace for Deep South Musicians

**What Chase said:**
> "We want to create a MySpace for Deep South musicians. If you're a musician, you should be on there, putting up your stuff, people can listen to your songs, you could be on Big Muddy Radio. Get a lot of users to submit stuff, make it dope, host the show, get people on from the region."

**Current state:** Musician onboarding exists at `/directory/onboard/musician/page.tsx`. Records pages exist with artist profiles.

**Action:** This is a significant product concept — a musician community platform:
- Artist profiles with music playback
- Submit tracks for radio consideration
- Event calendar + booking availability
- Social features (follow, share)
- Integration with Big Muddy Radio rotation
- Think Bandcamp meets MySpace meets a regional network

This needs its own product spec. Not a sprint task — a product discussion.

---

## Note 12: Land & Expand — More Detail, Less Sticker Shock

**What Chase said:**
> "I want much more detail — show a plot of land with tiny houses on it, a rendering, put numbers on each house. Break it down so it doesn't look like $1.2 million. Account for every dollar. The unit economics of tiny houses is like $50K they're selling them for now. Maybe ours are $150K. We should figure out vertically integrating — build our own little factory."

**Action:** Rebuild the Land & Expand section with:
1. **Site plan rendering** — even a simple diagram showing layout (houses, common area, studio, pool)
2. **Phased cost breakdown** instead of lump sum:
   - Phase 1: Land + 2 houses + basic infrastructure = ~$250K
   - Phase 2: 4 more houses + common area = ~$350K
   - Phase 3: Studio + pool + workshop = ~$300K
   - Phase 4: Scale to full buildout = ~$330K
3. **Per-unit economics:**
   - Build cost: $50-150K per tiny house
   - Equity buy-in from member: $X
   - Monthly maintenance: $800
   - Rental income when empty: $120/night × 15 nights = $1,800/mo
   - ROI timeline per unit
4. **Marika pilot:** 2 houses on her land first as proof of concept
   - Chase gets a cabin, Marika gets a cabin
   - Test the rental model
   - Then decide to scale

---

## Note 13: Public Access Integration Module

**What Chase said:**
> "We have an integration module for public access stations so they can use our free thing to power their station. Allows exchange between other users through Google Drive or whatever storage mechanism to transfer shows and ingest them with our whole ingestion pipeline."

**New concept:** This is a B2B product for public access TV stations:
- Free tier: Use our broadcasting infrastructure
- Show exchange network: Stations share content
- Ingestion pipeline: Automated import, metadata, scheduling
- This connects to the DCTV tenant (already in the system)

---

## Summary: What Needs to Change in the Dashboard

| Section | Change |
|---------|--------|
| **Thesis** | Broaden from "organization" to "experiences enabled by invisible technology" |
| **Thesis cards** | Add Delta Dawn UX story — a day in Tracy's life |
| **Modules: Broadcasting** | Rewrite in plain language, add public access concept |
| **Modules: Touring** | Add promotion network / influencer strategy |
| **Case Study** | Show 50/50 artist split, clarify who keeps what |
| **Revenue** | Note that downstream content value stays with Big Muddy |
| **Land & Expand** | Phased breakdown, per-unit economics, site plan, less sticker shock |
| **New section** | "Built On" — Google, Stripe, Vercel, Anthropic logos |
| **New section** | "Musician Community" — MySpace for Deep South concept |
| **New concept** | Audience-specific entry points (Tracy view, band view, venue view) |
| **New concept** | Animated explainer video brief |
| **New concept** | Google compliance scoring agent |

---

*These notes modify the presentation but do NOT change the underlying business architecture. The architecture decisions from the first voice memo still stand. These are presentation and product refinements.*
