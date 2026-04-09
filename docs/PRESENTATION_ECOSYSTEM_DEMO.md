# Big Muddy / MBT Ecosystem Presentation

*For Tracy, Amy, Elijah, and Miles. April 9, 2026.*

---

## Slide 1: What We Built

We built a complete media-hospitality operating system. One codebase, one team, one platform — powering everything from the Inn to the radio station to the business directory.

**Everything you're about to see is live right now.**

---

## Slide 2: The Consumer Brand — Big Muddy

https://bigmuddytouring.com

This is the front door. Everything lives under one roof:

| Section | URL | What It Is |
|---|---|---|
| **Homepage** | https://bigmuddytouring.com | The touring circuit — 13 cities, booking, the van, house band |
| **Magazine** | https://bigmuddytouring.com/magazine | 18 city guides — Memphis, Natchez, Clarksdale, and more |
| **Radio** | https://bigmuddytouring.com/radio | Internet radio station — 18 shows, 7 DJs, streaming 24/7 |
| **Entertainment** | https://bigmuddytouring.com/entertainment | Shows, house band, event programming |
| **Records** | https://bigmuddytouring.com/records | Record label — 31 artists, non-exclusive, artists keep masters |
| **Directory** | https://bigmuddytouring.com/directory | Business directory for the Deep South |
| **Inn** | https://bigmuddytouring.com/inn | Lodging guide — 18 cities, 40+ properties, Big Muddy Inn |
| **Gallery** | https://bigmuddytouring.com/gallery | Chase's photography — 45 prints, $150-$1,800 |

**Four old domains now redirect here automatically:**
- bigmuddymagazine.com → /magazine
- bigmuddyradio.com → /radio
- bigmuddyentertainment.com → /entertainment
- bigmuddyrecordlabel.com → /records

---

## Slide 3: The Institutional Product — MBT

https://measurablybetter.life

This is what we sell to towns, chambers, and brokerages. It's a licensed civic-commerce operating system — not a subscription tool.

**Key elements on the page:**
- "A licensed local growth system for towns, districts, and cultural operators"
- Nine modules explained
- Four buyer types (town, chamber, brokerage, hospitality)
- Natchez proof points
- CTA: "Request a Deployment" → goes to Chase's calendar, not a checkout page

**This is a program sale, not a software sale.** The institution buys the program. Businesses participate under their umbrella.

---

## Slide 4: The Other Live Properties

| Property | URL | What It Is |
|---|---|---|
| **Deep South Directory** | https://deepsouthdirectory.com | The public business layer — listings, search, map |
| **Hillbilly Dreams Inc** | https://hillbillydreamsinc.com | Corporate page — 8 brands, 3 equity partners |
| **Outsider Economics** | https://outsidereconomics.com | Economic philosophy field manual |
| **BuyCurious Art** | https://buycurious.art | Gallery / storefront |

These all run on the same system. Same codebase, same database, same deploy.

---

## Slide 5: The CMS — How Tracy and Amy Edit Content

https://bigmuddytouring.com/studio

This is **Sanity Studio** — the content management system. Tracy and Amy log in with their Google accounts and can:

- **Write and publish magazine articles** (with photos, pull quotes, galleries)
- **Update Inn hours and descriptions**
- **Add events to the show calendar**
- **Edit location info** (Blues Room, Inn, venues)

No code. No developer needed. Edit, publish, it's live in seconds.

**Full walkthrough:** `docs/TRACY_AMY_CMS_WALKTHROUGH.md`

---

## Slide 6: The Radio Station

https://bigmuddytouring.com/radio

Big Muddy Radio is a real internet radio station:
- 18 scheduled shows, 7 DJs
- Streaming 24/7 via AzuraCast relay
- FM broadcast on 91.1 at the Inn (Part 15 transmitter)
- Web player with Now Playing metadata
- Fallback audio when the source drops — the stream never goes silent

**The relay server:** AzuraCast at 206.189.200.208 — handles all public listeners. The Mac mini pushes source audio out. The Mac mini's IP is never exposed.

**AzuraCast dashboard:** http://206.189.200.208 (Chase's login)

---

## Slide 7: The Directory — Self-Serve Track

https://bigmuddytouring.com/directory

Any business can submit a free listing. Paid tiers:
- **$99/mo Marketing** — AI listing, reviews, social posting, Magazine feature
- **$250/mo Engine** — full stack, dedicated account, custom integrations

Upgrade buttons appear on free listing pages and link to Stripe Payment Links — no login required.

**What happens behind the scenes:**
- AI generates an editorial spotlight for each business on submission
- Google Places and Yelp data auto-enriches the listing
- Geo coordinates for map view
- The listing feeds into the institutional program when a town or broker sponsors it

---

## Slide 8: The Institutional Data Model

When a town or broker buys the MBT program, this is the structure:

```
Organization (e.g., "Downtown Natchez Alliance")
  └── Program (e.g., "Natchez Main Street 2026")
       └── ProgramParticipant (each business in the program)
            └── OnboardingTask (checklist: agreement signed, listing approved, etc.)
       └── InstitutionalAgreement (the contract — license, implementation, services)
       └── ProgramReport (monthly outcome metrics — views, clicks, leads, participation)
```

**The key feature:** `sponsoredTier` — when an institution pays, the business gets upgraded features without paying themselves. A broker sponsors 20 businesses at $99/mo each. Those businesses get full Marketing tier for free.

---

## Slide 9: The Flywheel — How Everything Connects

```
Shows at the Blues Room
  → Recording goes to Radio rotation
  → Photos go to Magazine article
  → Social posts go out automatically
  → Band gets listed in the Directory
  → Venue gets listed in the Directory
  → Tourists find both via the Directory
  → They book a room at the Inn
  → They come to the next show
  → The cycle repeats
```

**Every show has a 2:1 multiplier.** A $1,000 show generates $500+ in downstream Inn + Directory revenue.

**No competitor has this.** Yelp doesn't have a magazine. Google doesn't have a radio station. Townsquare doesn't own a hotel. We have all of it in one system.

---

## Slide 10: The Two-Region Model

| | Deep South (Natchez) | Northeast (Bearsville) |
|---|---|---|
| **Status** | Operating now | Summer 2026 activation |
| **Operators** | Chase + Tracy + Amy | Elijah + Miles |
| **Domain** | bigmuddytouring.com | bearsvillemediagroup.com |
| **Directory** | Deep South Directory | Bearsville Creative Directory |
| **Inn/Venue** | Big Muddy Inn + Blues Room | Utopia Studios |
| **Production** | Studio C (remote) | Studio C (on-site) |

**Same platform. Same architecture. Different operators. Different region.**

Prove it in Natchez. Clone it to Bearsville. Then license it to other markets.

**Elijah and Miles:** You're not contractors. You're the Northeast operators. Same deal structure, same equity conversation, different geography.

---

## Slide 11: The Tech Stack (For Elijah)

| Layer | Tool | Cost |
|---|---|---|
| Framework | Next.js 14.2, TypeScript | Free |
| Database | Neon PostgreSQL (120+ models) | Free tier |
| CMS | Sanity v3 (articles, events, locations) | Free tier |
| Deploy | Vercel | $20/mo |
| DNS/CDN | Cloudflare (14 domains) | Free |
| Radio relay | DigitalOcean + AzuraCast | $12/mo |
| Storage | GCS + Cloudflare R2 | ~$5/mo |
| Payments | Stripe Payment Links | Per transaction |
| AI | Gemini Pro, Claude, Perplexity | API costs |
| **Total infrastructure** | | **~$37/mo** |

The entire system runs for less than most people's phone bill.

---

## Slide 12: What's Next — The 90-Day Plan

| When | What |
|---|---|
| **This week** | Radio streaming live, all pages serving, Sanity Studio ready for Tracy/Amy |
| **This weekend** | Admin panel for Tracy (auto-generated from database, no code) |
| **Week 2** | First institutional conversations — one broker + DNA in Natchez, run in parallel |
| **Week 4** | Free pilot: 30 businesses onboarded, first outcome report |
| **Month 2** | Broker sponsorship live ($990/mo for 10 businesses) |
| **Month 3** | First institutional close. El Dorado pitch prep begins. |
| **Summer** | Bearsville activation — Elijah and Miles spin up the Northeast instance |

---

## Slide 13: What Each Person Does

### Chase
- Sells MBT to institutions (daytime walk-ins, tourism meetings)
- Codes and deploys the platform
- Photographs shows and content
- Manages radio programming

### Tracy
- Edits articles, events, Inn info in Sanity Studio
- Manages institutional contracts and financials (admin panel coming this weekend)
- Runs Inn and bar operations on show nights
- Opens doors in El Dorado (her relationships are the entry point)

### Amy
- Bar operations and guest experience on show nights
- Updates bar hours and specials in Sanity Studio
- Supports event production

### Elijah + Miles (Starting Summer 2026)
- Operate the Bearsville/Northeast instance
- Studio C production and media services
- Design (Tuthill Design integration)
- Northeast directory and content management

---

## Slide 14: The Business Model — How Money Flows

### Revenue Now
| Source | Monthly |
|---|---|
| Inn (6 rooms) | $3,000-$6,000 |
| Bar (12 show nights) | $2,000-$5,000 |
| Shows (tickets) | $1,500-$3,000 |
| DSD self-serve | $500-$5,000 |
| Photography | $500-$1,000 |

### Revenue Coming
| Source | Timeline | Size |
|---|---|---|
| First broker sponsorship | Month 2 | $990/mo |
| First institutional program | Month 3 | $5,000-$25,000 setup + annual |
| El Dorado | Q3 2026 | $15,000-$50,000 |
| Bearsville activation | Summer 2026 | New revenue region |

### The Math
- Break-even: ~$15,000/mo
- Current: ~$7,500/mo (Inn + bar + shows)
- Gap: $7,500/mo — closed by DSD walk-ins + first institutional close

---

## Slide 15: One More Thing

The SkyWest/United daily jet service from Natchez to Houston starts **July 1, 2026**.

That changes everything for Inn occupancy, tourism traffic, and the institutional pitch. When you can fly directly to Natchez, every tourism bureau and broker in town has a new story to tell.

We're building the infrastructure that captures that wave.

---

## Links — Everything in One Place

| What | URL |
|---|---|
| Big Muddy Homepage | https://bigmuddytouring.com |
| Magazine | https://bigmuddytouring.com/magazine |
| Radio | https://bigmuddytouring.com/radio |
| Entertainment | https://bigmuddytouring.com/entertainment |
| Records | https://bigmuddytouring.com/records |
| Directory | https://bigmuddytouring.com/directory |
| Inn | https://bigmuddytouring.com/inn |
| Gallery | https://bigmuddytouring.com/gallery |
| MBT (institutional) | https://measurablybetter.life |
| Sanity Studio (CMS) | https://bigmuddytouring.com/studio |
| HDI Corporate | https://hillbillydreamsinc.com |
| Deep South Directory | https://deepsouthdirectory.com |
| Outsider Economics | https://outsidereconomics.com |
| AzuraCast (radio admin) | http://206.189.200.208 |
| Cal.com (meeting booking) | https://cal.com/bigmuddy/30min |

---

*Walk through this in 30 minutes at the Inn. Open each link on the TV as you go. Let them click around in Sanity Studio. The key message: this is real, it's live, it's working, and everyone has a role.*
