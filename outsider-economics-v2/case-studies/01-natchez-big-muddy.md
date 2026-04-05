# Case Study: Natchez — The Six-Room Media Company

Natchez, Mississippi gets 600,000 tourists a year. Population: 14,000. That's 43 visitors per resident per year. Median household income: $29,000. Poverty rate: 34%.

Six hundred thousand people drive into town, spend money, and leave. Between 60 and 70 percent of that money extracts out of Adams County within 30 days. Call it $100 million a year that passes through and never sticks.

The drain is open. Nobody built a bucket.

## The Problem

Every small town in the Deep South has the same list of complaints. Not enough foot traffic. Not enough bookings. Not enough visibility. And the tools that promise to fix it — Birdeye at $299 a month, Podium at $399, Thryv at $244 — are priced for suburban dentists, not Main Street restaurants. The marketing-industrial complex charges four figures a month for dashboards that nobody reads.

A restaurant owner in Natchez making $180,000 a year does not need a $299 marketing platform. That owner needs someone to fix the Google listing, post to Instagram three times a week, and respond to the one-star review from last Tuesday. That's digital hygiene. It costs $99 a month if you build the system right.

## What We Built

The Big Muddy Inn is a six-room boutique hotel on Main Street in downtown Natchez. It has a live music venue downstairs called the Blues Room. It is also the anchor for a regional media company that runs a magazine, a radio station, a record label, a touring circuit, a photography studio, and a business directory — all from one codebase deployed to one Vercel instance.

The architecture:

- **Deep South Directory** — the business-facing product. Google listing optimization, review monitoring, social posting, AI-drafted responses. $99 a month for the marketing tier. $250 for the full media company treatment.
- **Big Muddy Magazine** — editorial that features DSD businesses. A restaurant gets a DSD subscription and also gets a magazine feature. That feature drives traffic. Traffic drives bookings. Bookings fund the subscription.
- **Big Muddy Radio** — live stream from the Inn. DSD businesses get mentioned on air. Artists on the touring circuit play the Blues Room and get recorded for the radio.
- **Big Muddy Records** — artists keep their masters. The label handles distribution and sync rights. Every show recording becomes radio content becomes magazine content becomes social content.
- **Big Muddy Touring** — the circuit that brings bands through Natchez, Vicksburg, Clarksdale, Memphis. Every show has a 2:1 ecosystem multiplier. A $1,000 show generates $500+ in downstream revenue for the Inn, the directory, the magazine.

One show. Six revenue streams. That's the coordination premium.

## The Math

The DSD pricing replaces tools that cost 3x to 10x more:

| What You Get | DSD Cost | Competitor Cost |
|---|---|---|
| Google listing management | Included | Yext: $199/mo |
| Review monitoring + responses | Included | Birdeye: $299/mo |
| Social posting (3-5/week) | Included | Hootsuite: $99/mo |
| AI business assistant | Included | ChatGPT: $20/mo |
| Magazine feature | Included | PR agency: $2,000/mo |
| Radio mentions | Included | Radio ad buy: $500/mo |
| Professional photography | $250 tier | Photographer: $500/session |

A business paying $99 a month to DSD gets more than a business paying $3,000 a month to three separate vendors. The difference is that DSD owns the media. Every other platform manages what people find when they search for you. DSD also creates the content that makes you worth finding.

Five-tier pricing: Free, $25, $50, $99, $250. The $25 tier replaces ChatGPT with an AI that already knows your business and your town. The $99 tier is the digital hygiene autopilot. The $250 tier is a media company on retainer.

## The Flywheel

Every piece feeds every other piece:

Shows bring audiences to the Inn. The Inn hosts the Blues Room. The Blues Room records artists for Radio. Radio drives listeners to Magazine. Magazine features DSD businesses. DSD businesses sponsor shows. Shows bring audiences to the Inn.

That's not a business plan. That's a flywheel. And it runs on one codebase with 78 database models, 14 domains, and a team of four people in Natchez, Mississippi.

## What It Means

The gap is not technology. Every tool in this stack exists as open source or cheap SaaS. The gap is organization. Somebody has to sit in the middle and connect the magazine to the radio to the directory to the shows to the Inn. That coordination layer is the product.

Most towns are one whiteboard away from not being broke. The pieces are already there. The restaurants exist. The musicians exist. The tourists are already coming. What's missing is the system that connects them — and keeps the money circulating instead of extracting.

Natchez has 43 tourists per resident per year and a 34% poverty rate. Those two numbers should not be able to coexist. They coexist because nobody built the coordination layer. That's what we sell.

### Start This Week

1. Pick five businesses on your Main Street. Look up their Google listings. Count the wrong hours, missing photos, and unanswered reviews. That's your sales list.
2. Ask the owner of the best restaurant in town: "What do you pay for marketing?" Write down the number.
3. Build a spreadsheet: column A is the tool they're paying for, column B is what it costs, column C is whether you could do it for less with one system. The math will do the selling.
4. Find the one venue in town that hosts live music. That's your Blues Room. The flywheel starts there.
