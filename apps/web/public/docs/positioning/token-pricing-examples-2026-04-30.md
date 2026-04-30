# Human-Token Pricing — Worked Examples

*Drafted 2026-04-30 by Cos. Reference table for the MBT product. What real tasks cost in software-tokens + human-tokens, in plain English.*

## The unit

- **Software tokens** = LLM API consumption. A typical chat answer = 500–2,000 tokens. At pass-through rates that's roughly $0.005–$0.05 per answer.
- **Human tokens** = Studio C team time. Priced at $5/min for ops-tier work, $10/min for specialist work (engineering, design, accounting). Rounded to nearest 5-min increment. Customer sees both meters live in the chat.

The customer doesn't think in tokens. They think in tasks. The chat translates.

## What real tasks cost

### File management

| Task | Software | Human | Total to customer | What you'd pay elsewhere |
|---|---|---|---|---|
| "Organize my last 6 months of photos by event" | $0.02 (chat understands the request, generates the rules) | 30 min × $5 = $150 | **$150** | $50–200 to a freelancer + the back-and-forth |
| "Sort my Downloads folder, archive the cruft" | $0.01 | 15 min × $5 = $75 | **$75** | You'd never get around to it |
| "Find every contract I signed in 2025 and rename them consistently" | $0.05 | 45 min × $5 = $225 | **$225** | A bookkeeper would charge $150–300 + take a week |
| "Set up automatic backups for my whole laptop" | $0.05 | 25 min × $10 (specialist) = $250 | **$250** | Geek Squad $200 + appointment booking |

### Account sign-ups + admin

| Task | Software | Human | Total | Alternative |
|---|---|---|---|---|
| "Sign me up for QuickBooks and import last year's transactions" | $0.10 | 60 min × $5 = $300 | **$300** | Bookkeeper $400+ |
| "Cancel the 6 subscriptions I never use, give me a list of what I just saved" | $0.05 | 25 min × $5 = $125 | **$125** | Rocket Money $5/mo + you do the cancels |
| "Create a Stripe account, connect it to my new website, set up a $50 product" | $0.05 | 40 min × $10 (specialist) = $400 | **$400** | $500–1500 to a developer |
| "Move my domain from GoDaddy to Cloudflare" | $0.05 | 30 min × $10 = $300 | **$300** | Or you spend 3 hours fighting GoDaddy yourself |

### Writing + content

| Task | Software | Human | Total | Alternative |
|---|---|---|---|---|
| "Draft a thank-you note to my biggest customer this year" | $0.02 (chat drafts) | 0 (you approve as-is) | **$0.02** | A few minutes of your time |
| "Write a press release announcing our new partnership" | $0.05 (chat drafts) | 30 min × $10 = $300 (specialist polishes + tailors) | **$300** | Freelance copywriter $400–800 |
| "Write 4 LinkedIn posts about my product launch this week" | $0.10 | 0 (you approve drafts) OR 20 min × $5 = $100 (we tailor + schedule) | **$0.10–$100** | Social media manager retainer $500+/mo |
| "Edit my 6,000-word essay for clarity, tone, and pacing" | $0.15 | 90 min × $10 = $900 | **$900** | Editorial freelancer $600–1500 |

### Video + media production

| Task | Software | Human | Total | Alternative |
|---|---|---|---|---|
| "Cut a 30-second ad from this 5-min raw footage" | $0.10 (chat suggests cuts) | 60 min × $10 = $600 | **$600** | Video editor freelancer $300–1500 |
| "Color correct my podcast video and balance the audio" | $0.10 | 45 min × $10 = $450 | **$450** | Audio engineer $200–600 |
| "Make 8 vertical clips from this 90-min interview, captioned, ready for TikTok" | $0.20 | 120 min × $10 = $1,200 | **$1,200** | Agency $1,500–3,000 for the same |
| "Shoot, edit, and post a 60-second product demo this week" | $0.15 | 240 min × $10 = $2,400 (includes scripting, recording, editing, posting) | **$2,400** | Video production house $5,000+ |

### Research + analysis

| Task | Software | Human | Total | Alternative |
|---|---|---|---|---|
| "Compare the top 5 CRMs for a 12-person company, recommend one" | $0.30 (chat does most of it) | 30 min × $10 = $300 (specialist verifies + writes brief) | **$300** | Consultant $500–1500 |
| "Find me 20 podcast guests in my industry I should pitch" | $0.15 | 45 min × $5 = $225 | **$225** | A VA $100–300 |
| "Analyze my last 12 months of P&L, tell me what's bleeding cash" | $0.20 | 90 min × $10 = $900 | **$900** | Fractional CFO $300–1000 for the same conversation |
| "Read this 200-page contract and tell me what to negotiate" | $0.50 | 60 min × $10 = $600 | **$600** | Lawyer $500–1500 |

### Travel + logistics

| Task | Software | Human | Total | Alternative |
|---|---|---|---|---|
| "Book my Nashville trip — flights, hotel near the venue, dinner Friday night" | $0.05 | 25 min × $5 = $125 | **$125** | Travel agent $50–200 |
| "Plan a 3-day team retreat for 8 people in the Catskills, under $5K total" | $0.20 | 90 min × $5 = $450 | **$450** | Event planner $1,000+ |
| "Find someone to fix my dishwasher, schedule, get a quote" | $0.05 | 20 min × $5 = $100 | **$100** | Your time x frustration |

### Customer-facing work

| Task | Software | Human | Total | Alternative |
|---|---|---|---|---|
| "Reply to my last 30 customer emails in my voice" | $0.20 (chat drafts) | 30 min × $5 = $150 (specialist reviews + sends) | **$150** | A VA $50–150 |
| "Build a sales pipeline for my 50 warm leads, schedule the first round of follow-ups" | $0.30 | 60 min × $5 = $300 | **$300** | Sales ops freelancer $400+ |
| "Write personalized cold emails to these 100 prospects, each one referencing a specific thing about their company" | $0.50 | 90 min × $10 = $900 | **$900** | $1,500–3,000 to a copywriter |

## The pattern

Look at the prices. Most tasks land between **$75 and $450**. A handful (production work, deep analysis, multi-day projects) reach $1,200–$2,400. Almost all are 2x–10x cheaper than the freelancer / agency / consultant alternative — because most of the work is software-token-cheap and the human is doing the small accountability slice.

The honest comparison is even better than the table shows. The freelancer alternatives don't include:
- The hour of finding them
- The hour of explaining what you want
- The week of waiting for the first draft
- The two more hours of revisions

MBT skips all of that. You ask the chat. You get the answer or the deliverable. You see the meter the whole time.

## What's NOT in this list

There's **no licensing fee.** No "platform access" fee. No "setup" fee beyond the optional onboarding (which is itself token-billed if you take it). No annual contracts. No seat licenses.

Tier subscription ($20 / $100 / $200 / $500) buys you the chat door + a baseline allocation of human-tokens. Beyond the allocation, it's pay-as-you-go at the published rates.

If you don't ask the chat anything in a month, you pay your tier subscription and that's it. If you flood it with hard problems, you see the meter run and decide when to stop.

## How customers experience this

The chat shows two running totals at the bottom of the conversation:

```
This session:  ~$0.04 (software) + 25 min (human) = $129.04
This month:    $187.20 of $500 tier
```

No surprise bills. Optional caps you set. Pause anytime.

## What this lets MBT say in marketing

> "We do the work. You see what each piece costs. The price reflects whether software or a human delivered it. Same chat. Two meters. No surprises."

That's the whole pitch. The table above is the proof.

---

*Cos owns long-term updates. Update when the human-token rate changes, when a new task category emerges from real customer usage, or when the comparison alternatives shift.*
