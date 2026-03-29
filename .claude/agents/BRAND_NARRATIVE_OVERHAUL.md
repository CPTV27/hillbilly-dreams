# Brand Narrative Overhaul — For All Agents

## Mission

Update every public-facing and internal page to tell one consistent story with value propositions that land 100%. No aspirational fluff. No made-up value. Everything we claim must be demoable today.

This is a coordinated effort across three agents:
- **Outsider Economics agent** — rewrites the philosophical framework
- **Voice agent** — enforces Chase's writing voice across all copy
- **Frontend agent** — implements the narrative in every page's UI

## The Origin Story (Read First)

Read `.claude/agents/ORIGIN_STORY.md` for full context. Short version:

Chase designed a complete media production-to-distribution pipeline in 2022 (the DeFacto Codec Market). It was global media infrastructure — broadcast, production, analytics, distribution — built on open source tools. He realized the same architecture that runs a Viacom can run a small-town media ecosystem. You don't need to be big. You need to be organized.

Big Muddy is that architecture, applied to Main Street, powered by AI, anchored in the Mississippi corridor.

## The Core Value Proposition

**One sentence:** We set up all your shit and make everything easy.

**Expanded:** You have a ChatGPT account you don't really know how to use. You have a Facebook page you haven't updated since October. You have a Google listing with wrong hours. You have 4-6 SaaS tools you're paying for and barely using. You know AI could help but you don't know where to start.

We do all of it. For $20/month, you get an AI assistant that already knows your business and your town. For $99/month, you get the whole media machine — your reviews answered, your social media running, your business featured in a magazine, mentioned on the radio, and listed in the directory every tourist sees.

**What makes this different from every other SaaS pitch:** We own the media properties. No competitor can offer editorial coverage, radio mentions, and a regional directory because they don't own a magazine, a radio station, or a hotel. We do.

## The Value Props (Must Land 100%)

### For the $20 AI Assistant:
**Don't say:** "AI-powered business intelligence platform"
**Say:** "It's like having ChatGPT, except it already knows your business, your town, your competitors, and your customers. Same price. Actually useful."

### For the $99 Engine:
**Don't say:** "Comprehensive digital marketing automation suite"
**Say:** "Your reviews get answered. Your social media runs. You're in the magazine. You're on the radio. You're in the directory. One bill. $99."

### For the free listing:
**Don't say:** "Optimize your digital presence across platforms"
**Say:** "Get listed where tourists actually look. Free. Takes 5 minutes."

### For the overall platform:
**Don't say:** "A vertically integrated media-hospitality ecosystem"
**Say:** "We set up your whole digital life and make it run. You do your job. We handle the rest."

## The Kiosk Angle

This is important and currently not reflected anywhere in the product:

**The vision:** Turn any computer into a one-button command center. You open the lid and you see YOUR dashboard — your tasks, your content, your media, your business. Nothing else. No distractions. No 47 browser tabs. Just what matters.

- **For a business owner:** Kiosk mode shows your directory listing, your reviews, your social calendar, your monthly report. One screen.
- **For an operator (Tracy/Amy/JP):** Kiosk mode shows Mission Control — today's tasks, tonight's show, the bar inventory, the guest arrivals.
- **For the Inn:** Kiosk mode on the lobby iMac shows the welcome screen, check-in flow, and local recommendations.

This connects to the in-room TV system (Plex) and the Raspberry Pi broadcast kit concept.

## The Raspberry Pi Kit

A pre-installed kit that turns any TV into a broadcast endpoint:
- Raspberry Pi + Plex client
- Pre-configured to connect to Big Muddy Radio + TV channels
- Plug in, connect to WiFi, you're on air
- Partner venues along the corridor each get one
- Content distribution through Plex — shows, music, slideshows
- FM transmitter optional add-on for in-building radio

**Don't mention this publicly yet** — but the architecture should support it. Every Plex endpoint is a distribution node.

## Pages to Rewrite

### Priority 1: Landing pages (what visitors see first)
1. **deepsouthdirectory.com** — Lead with "Get listed free. Get an AI assistant for $20." Kill any jargon.
2. **measurablybetter.life** — Lead with "We set up your digital life. You run your business." Not a software pitch — a relief pitch.
3. **outsidereconomics.com** — Lead with the origin story. "A media infrastructure architect realized the same system that runs global media can run Main Street."

### Priority 2: Product pages (what people read before buying)
4. **DSD pricing section** — Every tier description must end with what the customer GETS, not what the system DOES.
5. **MBT value comparison** — Don't compare to SaaS tools. Compare to "what it would cost to have a marketing department."

### Priority 3: Internal pages (what the team sees)
6. **Admin dashboard** — The greeting should reinforce the mission. "You're running a media company."
7. **Team manual** — The How Do I guides should make people feel capable, not overwhelmed.
8. **Ecosystem lens dashboard** — The Personnel lens is the proof. Show the AI leverage.

## Voice Rules (Apply Everywhere)

Read `memory/feedback_chase_voice.md` for the full spec. Key rules:
- Start with impact. First sentence is the point.
- No hedging. No jargon without translation.
- End with action, not inspiration.
- "You" is the reader. "We" is never used on OE. On MBT/DSD, "we" means "Big Muddy."

## What to Kill

- Any sentence that starts with "Our platform enables..."
- Any mention of "vertically integrated" in customer-facing copy
- Any comparison that claims savings we can't demo
- Any feature description that doesn't end with what the customer gets
- "Leverage" "utilize" "robust" "scalable" "synergy" "holistic"
- Any value prop that sounds impressive but means nothing

## Illustration Policy (QC)

Read `memory/feedback_qc_policy.md` for illustration rules:
- Diverse representation (mix of races, ages, genders)
- No high-tech imagery (Main Street, not Silicon Valley)
- No wide AI cartography (zoom tight or use real maps)
- AI generates art, Canva handles typography

## How to Coordinate

1. **OE agent:** Rewrite outsidereconomics.com homepage and field manual intro with origin story
2. **Voice agent:** Audit all landing page copy against Chase's voice rules, rewrite what doesn't land
3. **Frontend agent:** Implement the rewritten copy, update UI to match narrative (kiosk references, simplicity)

All three should read this doc first, then `.claude/agents/ORIGIN_STORY.md`, then `memory/feedback_chase_voice.md`.

## The Internal Economy

This is the endgame — and it connects directly to Outsider Economics:

**Broadcasters get paid for eyeballs.** Every radio show, every magazine feature, every directory listing generates measurable reach. That reach has value. Sponsors pay for it — in cash or in credits.

**Service exchange, not just cash.** A restaurant gives the radio DJ a meal. The DJ mentions the restaurant on air. The restaurant's directory listing shows "Featured on Big Muddy Radio." The photographer shoots the restaurant's menu in exchange for catering the next show. All tracked. All valued. No cash changes hands, but real value moves.

**Sponsor deals based on reach.** The platform tracks impressions, plays, page views per business. A tourism board sponsors the businesses with the most reach. The math is transparent.

**Credits, not just dollars.** MBT credits let participants exchange services within the ecosystem. A $20/mo listing earns credits by contributing content. Credits buy services from other ecosystem members. This is the task board economy from Outsider Economics — implemented as a real platform feature.

**Don't mention this publicly yet** — but it's the reason the architecture matters. The media properties (magazine, radio, directory) generate measurable audience. The audience has value. The value flows to the operators who create it. That's the opposite of extraction.

## Success Criteria

When someone reads any page on any site, they should think: "These people actually do the thing. This isn't vaporware. This is a real media company that will handle my digital presence for $20/month."

If a value prop doesn't make a barber shop owner in Natchez nod and say "yeah, I need that" — rewrite it until it does.
