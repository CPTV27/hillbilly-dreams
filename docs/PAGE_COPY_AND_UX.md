# PAGE COPY & UX DIRECTIVES
## For build agents — March 25, 2026
## Rule: This document tells you what every page SAYS and HOW IT FEELS. The build agent decides how to implement it.

---

## GUIDING PRINCIPLES

1. **Nobody wants software.** They want their life to be easier. Every page should communicate that.
2. **Show the engine, not the app.** The marketing site shows what the platform can do. It doesn't try to show "the product" because the product is different for every user.
3. **The proof is real.** We don't show mockups. We show live businesses running on the platform.
4. **The South is not a victim.** It's underleveraged. Everything is forward motion.
5. **Direct but warm.** Say what you mean, then stop. Concrete details over abstract claims.
6. **Never say:** synergy, leverage, ecosystem (in marketing copy), game-changer, disruptive, excited to announce
7. **Never attribute quotes to real people** unless Chase provided the exact quote. Describe what the platform does, not what people supposedly feel about it.
8. **"Case studies" not "proof."** The word "proof" is deprecated. Use "case studies" everywhere.
9. **The interaction model is text-first.** "It's just a text box. Text it a photo, a question, a video — like texting a friend who's really good at everything."
10. **The street pitch:** "It does all the cool stuff you don't know how to do. Take a picture. Watch what happens. $20 a month."
11. **Deprecated pitch — do NOT use:** "Same price as ChatGPT. Except this one reads your books."

---

# LEVEL 2: MEASURABLY BETTER (Product Brand)

---

## Page: `/` — The Front Door (Name Gate)

**Purpose:** First impression. Someone was given a link. They type their name and enter their personalized tour.

**Who sees it:** Tracy, Amy, JP, Chase, and eventually prospects/investors.

**UX directive:** Google sign-in energy. One input. No clutter. The page should feel like being welcomed into a private space — not like landing on a marketing site. Quiet confidence.

**Copy:**

```
[Abril Fatface, large]
Measurably Better

[Inter, medium, warm gray]
The South has the culture.
We're building the infrastructure to match.

[Input field, center-aligned]
Enter your name to continue

[Footer, small, muted]
Hillbilly Dreams, Inc. · Natchez, Mississippi
```

**UX notes:**
- Soft fade-in on load
- Input has bottom-border only, turns amber on focus
- Enter key submits — no button needed
- Unrecognized names get: "Name not recognized. Contact Chase for access."
- Warm paper background (#FAFAF8), not clinical white

---

## Page: `/measurably-better` — Product Landing

**Purpose:** The deal closer. This is where someone understands what MB is, what it costs, and why it matters. This is the most important page on the site.

**Who sees it:** Business owners, mayors, CVB directors, school superintendents, investors. Everyone except existing team members (they have their tours).

**UX directive:** Readability of Stripe's pricing page meets the confidence of Google Cloud. Long scroll, clear sections, no visual noise. Typography does the heavy lifting — not graphics, not illustrations, not stock photos. The page should feel trustworthy and calm, not urgent or salesy.

**Copy:**

### Hero (dark background)
```
[Small caps, amber]
measurablybetter.life

[Abril Fatface, white, large]
Same price as ChatGPT.
Except this one reads your books.

[Inter, light gray]
Your business data — QuickBooks, Stripe, Google — analyzed by AI
that actually knows your margins. Starting at $20/month. Free for a week.

[Button, amber]
Start free

[Small, muted]
Deep South Directory — every Main Street business gets a node.
DeepSouthDirectory.com
```

### Four Markets
```
[Section label] FOUR MARKETS
[Abril Fatface] One engine, four markets.
[Inter] Verified gap: no regional provider serves all four segments
in the Deep South. We do.

Cards:
- SMB / Main Street: "Local operators who bleed margin to disconnected
  subscriptions. One platform replaces five tools at a fraction of the cost."
- Civic / City Hall: "$826M in unspent ARPA sits in Mississippi alone. We come
  in at $9,600/year where the incumbent charges $25,000–75,000."
- Education / School Districts: "144 districts in Mississippi, most under 5,000
  students. One dashboard for enrollment, facilities, and compliance."
- Tourism / CVBs & Hospitality: "Content that markets, employs local writers,
  and becomes a permanent asset. Every dollar does triple duty."
```

### Product Lines
```
[Section label] PRODUCT LINES
[Abril Fatface] One engine. Every vertical.
[Inter] Each product is the same platform configured for a specific market.
The technology is the means. The local economy is the end.

Cards:
- Deep South Directory [Main Street]: "The front door for Main Street. Free
  listing, $20 dashboard, $99 automation. Every business on Main Street,
  one searchable node."
- Micromedia in a Bottle [Licensable]: "Hotel + magazine + radio + touring +
  records on one engine. Big Muddy is the case study. License it to any
  regional operator."
- Municipal Platform [Municipal]: "City hall front door for cities under 50K.
  Website, 311, payments, records search. $9,600/year."
- District Dashboard [Education]: "District dashboard, AI literacy, safety
  docs. Funded by E-Rate and Title IV-A."
- S2PX [Spatial]: "Spatial intelligence for the built environment. Your
  outsourced operating system for AEC."
```

### Pricing
```
[Section label] PRICING
[Abril Fatface] Start free. Upgrade when it pays for itself.
[Inter] No contracts. No surprises. Cancel anytime.

Tiers:
FREE ($0 forever)
  "Type your business name. See what we already know."
  ✓ Google Business Profile analysis
  ✓ Competitive snapshot (public data)
  ✓ 100 AI queries per month
  ✓ Directory listing
  ✓ Intro training
  [Button: Start free]

REPLACE CHATGPT ($20/mo)
  "Same price. Except this one can read your books."
  ✓ 7-day free trial — no credit card
  ✓ Connect 1 data source (QuickBooks, Stripe, or Google)
  ✓ Unlimited AI queries against YOUR data
  ✓ Daily briefing — one email, one insight
  ✓ Review monitoring + draft responses
  ✓ Monthly P&L summary
  ✓ Guided learning path
  [Button: Try free for a week]

THE ENGINE ($99/mo) ← highlighted
  "Connect everything. Act on everything."
  ✓ Everything in Replace ChatGPT
  ✓ Connect ALL data sources
  ✓ Multi-source correlation and cross-analysis
  ✓ Marketing automation
  ✓ Real-time alerts
  ✓ 3 team seats
  ✓ Weekly AI strategy memo
  ✓ Priority support
  [Button: Start the engine]

THE OPERATOR ($499/mo)
  "10 seats. Dedicated AI agent. Forecasting that actually works."
  ✓ Everything in The Engine
  ✓ 10 team seats
  ✓ Dedicated AI agent
  ✓ Revenue forecasting
  ✓ Phone support
  [Button: Talk to us]

INSTITUTIONAL (Custom)
  "Tyler charges $25K–75K/year. We start at $9,600. Grant-funded."
  ✓ Municipal front door
  ✓ K-12 curriculum
  ✓ Multi-department rollout
  ✓ ARPA & E-Rate compatible
  ✓ Dedicated account team
  [Button: Schedule a call]
```

### Three Ways In (GTM Channels)
```
[Section label] THREE WAYS IN
[Abril Fatface] No ads. No funnels. Just trust.
[Inter] We don't buy leads. We earn them — the same way every
Main Street business does.

Cards:
- "Your city already bought it": Municipalities buy blocks of licenses
  for Main Street businesses. Funded by ARPA, CDBG, or economic
  development budgets. You get a dashboard — the city gets anonymized
  growth data.
- "Walk in, try it free": "I run the hotel down the street. This is
  what I use. Want to try it?" Free tier — see your data — upgrade
  when it pays for itself. No salesperson. Just a neighbor.
- "Included with your directory listing": Join the Deep South Directory
  through your Chamber or CVB. Every listing comes with a free business
  dashboard. The directory IS the product.
```

### Mission CTA (dark card)
```
[Abril Fatface, white]
The South has the culture. We're building the infrastructure to match.

[Inter, light gray]
Every product we build is designed to keep money circulating locally.
The Deep South Directory keeps Main Street commerce visible. Big Muddy
keeps culture and entertainment dollars in the corridor. The municipal
and education products keep government technology dollars in-state.
The technology is the means. The community becoming measurably better
is the end.

[Button: Read the thesis]
[Outline button: The four markets]
```

### Footer
```
A product of Hillbilly Dreams, Inc. — Natchez, Mississippi.
hillbillydreamsinc.com
```

---

## Page: `/measurably-better/thesis` — Outsider Economics

**Purpose:** The philosophical foundation. Why this matters beyond making money.

**Who sees it:** Thinkers, policy people, grant writers, investors, the book audience.

**UX directive:** Long-read editorial feel. Single column, generous line height. Should feel like reading a magazine essay, not a product page. This is Level 4 (Outsider Economics) content housed under Level 2 (MB) navigation.

**Copy:** Already solid. Keep the four principles (Sovereignty, Density, Compounding, Local Velocity) and the Deep South market analysis. Voice polish only — make sure it matches the approved voice rules.

---

## Page: `/measurably-better/regional` — Four Markets

**Purpose:** The institutional sales page. Shows the four market segments with specific pricing and competitive positioning.

**Who sees it:** Mayors, superintendents, CVB directors, grant writers.

**UX directive:** Data-forward. Tables and comparisons. Should feel like a well-researched brief, not a marketing page. The person reading this is evaluating whether to put MB in a grant application.

**Copy:** Update SMB segment pricing from $5K/mo to the self-serve model ($0/$20/$99). Everything else is solid.

---

## Page: `/measurably-better/platform` — The HDX Engine

**Purpose:** Technical credibility. What the platform actually does under the hood.

**Who sees it:** Technical evaluators, CIOs, anyone who needs to know it's real infrastructure.

**UX directive:** Clean, confident, minimal. Six capability cards. No jargon, but technically precise. Should feel like reading Stripe's API docs overview — you trust it immediately.

**Copy:**
```
[Abril Fatface] The Engine
[Inter] One platform. Every deployment. Built on Google Cloud. Deployed in Mississippi.

Capabilities:
1. Multi-Tenant Routing — One codebase serves unlimited brands via hostname
   matching. Each deployment gets its own domain, theme, and data scope.
2. AI Intelligence Layer — Vertex AI and Gemini Pro for business data analysis,
   content generation, and decision support across all tenants.
3. Financial Sync — Live QuickBooks Online integration. Real-time P&L data
   in the dashboard. No exports, no manual reconciliation.
4. Content Engine — Built-in CMS for articles, events, playlists, newsletters.
   Each brand manages its own content within a shared editorial framework.
5. Payment Rails — Stripe Connect for split payments and direct payouts.
   Revenue flows to the right account without manual intervention.
6. Identity & Access — Role-based access control. Staff, operators, and admins
   each see exactly what they need. Nothing more.
```

---

# LEVEL 1: HILLBILLY DREAMS (Holding Company)

---

## Page: `/hillbilly-dreams` — The Holding Company

**Purpose:** Shows the corporate structure for partners, investors, and serious institutional buyers.

**Who sees it:** Investors, legal, grant evaluators, Tracy (as equity partner).

**UX directive:** Executive. Understated. Cool slate palette, not warm. Should feel like a well-formatted SEC filing crossed with a clean annual report. No marketing energy. Just facts and structure.

**Copy:**
```
[Abril Fatface] Hillbilly Dreams, Inc.
[Inter] Technology infrastructure for the New South.

[Body]
Hillbilly Dreams, Inc. is a privately held technology and media company
headquartered in Natchez, Mississippi. The company owns all intellectual
property, platform infrastructure, and equity across five operating
divisions.

Divisions:
- Measurably Better — Regional technology provider (SMB, Civic, Education, Tourism)
- Big Muddy Entertainment — Records, radio, touring, talent development (JP, Division Head)
- Big Muddy Publishing — Magazine, books, editorial content
- Big Muddy Hospitality — The Big Muddy Inn, weddings, events (Tracy, Division Head)

The Proof Stack:
[Table showing what's live, what's building, what's proposed]

The Cross-Promotion Engine:
One artist booking triggers seven revenue events:
1. They play the Inn's stage
2. Show gets recorded for Radio
3. Magazine writes the city guide
4. Artist joins Rise Up
5. Catalog lives on Records
6. Touring route adds the venue
7. Kiosk mode sells the ticket at the front desk

[Footer]
Hillbilly Dreams, Inc. — Natchez, Mississippi
hillbillydreamsinc.com
```

---

# LEVEL 3: BIG MUDDY (Media & Hospitality)

---

## Page: `/big-muddy` — The Ecosystem

**Purpose:** Shows how Big Muddy's divisions connect. The consumer-facing brand overview.

**Who sees it:** Partners, team members, curious visitors, CVB directors evaluating the content model.

**UX directive:** Editorial magazine energy. Warm. Abril Fatface headlines. Vintage cream background. Should feel like picking up a beautiful independent magazine, not visiting a tech company. This is the Level 3 brand — culture, music, travel, hospitality.

**Copy:**
```
[Abril Fatface, large]
Big Muddy

[Inter]
The Mississippi's music corridor. Stay. Drive. Read. Listen.

[Body]
Big Muddy is a media and hospitality company operating along the
Mississippi corridor from Memphis to New Orleans. It's also the proof
that the Measurably Better platform works — a hotel, a magazine, a
radio station, a touring company, and a record label, all running
on one engine with a four-person team.

Every division feeds the others. No division is an island.

Division Cards:
- Entertainment → /big-muddy/entertainment
- Hospitality → /big-muddy/hospitality
- Publishing → /big-muddy/publishing
```

---

## Page: `/big-muddy/entertainment` — JP's Division

**Purpose:** Overview of Big Muddy Entertainment for external audiences.

**Who sees it:** Artists, venue owners, music industry contacts, booking agents, fans.

**UX directive:** Independent record label energy. Dark backgrounds, sharp contrast. Periwinkle (#6477AD) accent. Should feel like a label's website — credible, cool, not corporate. Abril Fatface headlines.

**Copy:**
```
[Abril Fatface] Big Muddy Entertainment
[Inter] Records. Radio. Touring. Rise Up.

JP has full creative authority. He decides what the department needs.

Records:
100% masters retained. Always. We make money when you make money.
Artist-friendly label services — production, distribution, sync licensing.
The artist keeps their catalog.

Radio:
The sound of the Delta. Curated playlists, live sessions, and original
programming from the corridor. One show in production now.

Touring:
Memphis to New Orleans and 14 more cities. The Snowbird Circuit connects
venues, artists, and audiences across the Deep South.

Rise Up:
The talent has always been here. Rise Up is a gospel and blues talent
development program — regional talent searches, touring performances,
and a path from the church choir to the stage.

Amy Allen — lead vocalist.
Arri Aslin — Artist-in-Residence, headliner.

[Footer]
Big Muddy Entertainment — a division of Hillbilly Dreams, Inc.
```

---

## Page: `/big-muddy/hospitality` — Tracy's Division

**Purpose:** Overview of Big Muddy Hospitality. Also serves as a soft landing page for the Inn.

**Who sees it:** Potential guests, wedding inquiries, local partners.

**UX directive:** Boutique hotel warmth. Magnolia cream background. Burgundy (#7B1B46) accent. Should feel like the Inn's own website — inviting, personal, unhurried. Photography would make this page sing, but for now, clean typography carries it.

**Copy:**
```
[Abril Fatface] The Big Muddy Inn
[Inter] The anchor. Where the story started.

Six rooms in Natchez, Mississippi, on the bluffs above the river.
The Inn is where the music happens, the stories start, and the
ecosystem comes to life.

Tracy Alderson-Allen runs the profitable base. The rooms fund the ecosystem.

Weddings & Events:
The Inn hosts intimate weddings and private events on one of the most
photographed streets in the South. Inquire for availability.

What makes it different:
You're not staying at a hotel. You're staying inside a living media
company. The artist playing the parlor tonight is on Big Muddy Records.
The city guide in your room was written by Big Muddy Magazine. The
playlist on the speaker is Big Muddy Radio.

Everything connects. Nothing is accidental.

[Footer]
Big Muddy Hospitality — a division of Hillbilly Dreams, Inc.
```

---

## Page: `/big-muddy/publishing` — Editorial Division

**Purpose:** Overview of Big Muddy Publishing — the magazine, the books, the contributing writers program.

**Who sees it:** Writers, readers, advertisers, cultural organizations.

**UX directive:** Independent press energy. Newsprint background (#F3EFE9). Burgundy (#7B1B46) accent. Rich ink text. Should feel literary and substantial — like an independent publisher's about page, not a blog.

**Copy:**
```
[Abril Fatface] Big Muddy Publishing
[Inter] Stories from the corridor.

Big Muddy Magazine covers the people, places, music, and food along
the Mississippi corridor. City guides, interviews, photo essays, and
long-form storytelling rooted in the Deep South.

Outsider Economics is the book about why this matters — what happens
when the economy works for the people who actually live here.

Contributing Writers:
Every writer is a distribution node. Three tiers:
- Community: Unpaid. Your byline, your audience, our platform.
- Paid: Per-piece rates for assigned stories.
- Rev-share: Revenue participation for ongoing contributors.

Content compounds. Nothing is disposable.

[Footer]
Big Muddy Publishing — a division of Hillbilly Dreams, Inc.
```

---

# PERSONALIZED TOURS

---

## Page: `/welcome/tracy` — Tracy's Tour

**Purpose:** Tracy's personalized walkthrough of the platform, focused on hospitality and her role as equity partner.

**UX directive:** Warm, personal, not corporate. Should feel like Chase wrote her a letter, not a product demo. The tour stops are curated for what Tracy cares about — her division, the finances, the team structure, and the strategy.

**Copy:** Already deployed and working. Add her grant checklist items (already done by build agent). Keep the six-stop tour structure.

---

## Page: `/welcome/amy` — Amy's Tour

**Purpose:** Amy's personalized walkthrough, focused on entertainment and her role as talent.

**UX directive:** The warmest, simplest tour. Amy is not reading a strategy document. She's seeing where she fits and why it matters that she's on stage instead of answering emails. Short descriptions, emotional resonance.

**Copy:** Already deployed and working. Add her online presence checklist (already done by build agent).

---

## Page: `/welcome/jp` — JP's Tour

**Purpose:** JP's personalized walkthrough, focused on entertainment division authority.

**UX directive:** Direct, creative, empowering. JP should feel like the division is his. Every stop reinforces his authority. The tech is in service of his creative vision, not the other way around.

**Copy:** Already deployed and working. Solid as-is.

---

## Page: `/welcome/chase` — Chase's Master View

**Purpose:** The everything view. Every page, every section, every number.

**UX directive:** Efficient. No warmth needed — Chase wants density and speed. Seven stops, clean descriptions, get to the point.

**Copy:** Already updated. Seven stops, no duplicates.

---

# THE $20 LANDING PAGE (standalone)

---

## Page: Dedicated $20/mo conversion page (new — `/measurably-better/try` or similar)

**Purpose:** One-page conversion for the ChatGPT comparison. The single most important conversion page. Someone clicks a link, sees the pitch, starts a trial.

**Who sees it:** Small business owners who currently pay $20/mo for ChatGPT.

**UX directive:** Single column, max 720px. NO navigation, NO footer noise, NO distractions. One scroll. The page has exactly two things: the pitch and the button. If they scroll past the first button, they see a comparison table, then the same button again. That's it.

**Copy:**
```
[Abril Fatface, massive]
You're already paying $20/mo for an AI
that doesn't know your business.

[Inter, warm gray]
Pay the same $20 for one that does. It reads your QuickBooks.
It knows your margins. It writes your marketing.
And it learns your business every day.

$20 /month
Free for 7 days. No credit card required.

[Full-width button, amber]
Start your free week

[Small, muted]
Cancel anytime. Your data stays yours.

---

[Abril Fatface]
What $20/mo gets you here vs. there.

[Comparison table]
                    ChatGPT              Measurably Better
Knows your revenue  No                   Yes — live QuickBooks sync
Reads your P&L      No                   Yes — monthly summary
Monitors reviews    No                   Yes — with draft responses
Daily briefing      No                   Yes — email every morning
Knows competitors   Generic web data     Real local comparison
Training included   No                   Guided learning path
Your data           Their cloud          Your data stays yours

[Full-width button, amber]
Start your free week — $20/mo

[Small, muted]
A product of Hillbilly Dreams, Inc. · Natchez, Mississippi
```

---

# STRATEGY

---

## Page: `/strategy` — Executive Strategy Report

**Purpose:** The full internal strategy memo. Password-gated. For partners and serious stakeholders only.

**Who sees it:** Tracy, Amy, JP, Chase.

**UX directive:** Senate committee briefing. Courier monospace. Cream paper. Double-rule borders. This page already has the right design — keep it exactly as-is. Just update the data.

**Copy:** Already updated — Owen removed, SMB segment rewritten for self-serve via Deep South Directory, Delta Dawn references fixed, revenue projections updated for volume model.

---

# DESIGN SYSTEM APPLICATION

For the build agents applying the design system to these pages:

**Measurably Better pages:** Warm paper (#FAFAF8), Inter body, Abril Fatface headlines, amber (#B45309) accent, subtle borders (#E5E5E0)

**Hillbilly Dreams page:** Cool slate (#F7F8FA), boardroom navy (#1B2A4A) text, steel slate (#4A5568) accent. Executive, understated.

**Big Muddy Entertainment:** Vintage sleeve (#FAF7F2), charcoal (#2D2926) text, periwinkle (#6477AD) accent. Record label energy.

**Big Muddy Publishing:** Newsprint (#F3EFE9), rich ink (#111111) text, burgundy (#7B1B46) accent. Independent press.

**Big Muddy Hospitality:** Magnolia cream (#FDFAFC), espresso (#2A2421) text, burgundy (#7B1B46) accent. Boutique hotel warmth.

**Strategy page:** Keep the Courier/Senate style. Don't apply the design system to this page.

**Welcome/tour pages:** Use the MB design system (warm paper, Inter, amber). These are product tours, not brand pages.
