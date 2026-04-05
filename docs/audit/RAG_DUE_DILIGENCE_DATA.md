# Due Diligence Data Dump — Hillbilly Dreams Incorporated
# Paste this entire document into any LLM for McKinsey-grade analysis.
# Generated: April 5, 2026 from live codebase + database

## PHASE 1: BUSINESS MODEL

### Pricing (from memory/project_mbt_pricing_tiers.md)

### Competitive Matrix (from docs/DSD_MARKETING_COPY.md)
| Yext | "The AI-Led Digital Presence Platform" | Custom/Enterprise | 200+ integrations, Fortune 500 | "Request a Demo" | Accuracy at scale | Wrong info costs customers |
| Birdeye | "#1 AI Marketing Platform for Local Brands" | ~$299/mo | 150K+ businesses, G2 #1 | "Get Started" | Autonomous AI agents | Marketing is hard |
| Podium | "The Winner's Circle for Local Business" | $399/mo Core | 100K+ local businesses | "Get a Demo" | Lead-to-conversion via text | Phone tag killing sales |
| Thryv | "The Small Business Command Center" | ~$244/mo+ | 50K+ small businesses | "See Pricing" | End-to-end business OS | Juggling 10 apps |
| Vendasta | "The All-in-One Local Business Platform" | White-label scalable | 60K+ partners | "Book a Walkthrough" | White-label marketplace | Can't scale manually |
| HighLevel | "Capture, Nurture, Close." | $97/mo Starter | 1.2M+ users | "14-Day Free Trial" | Marketing automation all-in-one | Leads leaking through cracks |
| SOCi | "Your Local Visibility is Slipping" | $500/mo+ Enterprise | 800+ multi-location brands | "Talk to Sales" | Genius AI agents for multi-location | Fragmented local data |
| Townsquare | "Local Business Growth Made Simple" | Affordable (est. $499) | 300+ local radio markets | "Get a Free Quote" | "We live in your community" | National companies don't know your town |
| Scorpion | "Rank High. Get Hired. Grow Faster." | Growth as a Service | Millions of leads | "Request Consultation" | Vertical expertise | Great at your job, not marketing |
| Hootsuite | "Social is for Business" | $99/mo Professional | 200K+ paying customers | "Start Free Trial" | The original social pioneer | Wasting hours posting to 5 sites |
| Sprout Social | "Built for Connection" | $249/seat/mo | 30K+ customers, G2 Leader | "Try Free" | Deep social intelligence | Social feels like a black hole |
| Mailchimp | "Turn Emails into Revenue" | $13-20/mo Starter | 12M+ users | "Sign Up Free" | Easiest way to start | Generic emails ignored |
--
**Townsquare Interactive** ($499/mo) — THE direct competitor. Radio + digital bundle across 300 markets. But: no magazine, no photography, no hotel, no record label. And $499/mo prices out Main Street.

**HighLevel** ($97/mo) — Closest price match with massive feature set. But: agency-focused, not Main Street. No media properties. No local presence.

**Locable** ($99/mo) — Small-town directories. No media production at all.
--
- **We cost less than a single Yelp ad.** Birdeye starts at $299. Thryv starts at $244. You get more from DSD for less — and no sales call to find out the price.
- **We give you media, not just software.** Magazine editorial coverage. Radio mentions. Professional photography. That's not a feature. That's a full-time PR agency at 1/10th the cost.
- **One subscription. Everything handled.** Listings synced across Google, Yelp, Facebook, and 50+ directories. Reviews monitored. Social content posted. Monthly report in your inbox.
--
| Listings management | Yext | $199 |
| Review management | Birdeye | $299 |
| Social media scheduling | Hootsuite | $99 |
| Professional photography | Freelancer (avg) | $300-500/session |
| **Traditional total** | **4 subscriptions** | **~$1,097/mo** |

### Product Features with Competitor Pricing (from database)
Magazine Editorial Coverage | replaces PR agency | $3000/mo | shipped
Touring Circuit Promotion | replaces Event marketing agency | $1000/mo | shipped
Video Production | replaces Agency retainer | $600/mo | building
Radio Airplay & Mentions | replaces Local radio buy | $500/mo | building
Professional Photography | replaces Freelancer avg | $400/mo | shipped
Review Monitoring & Response | replaces Birdeye | $320/mo | shipped
Online Reservation Widget | replaces OpenTable / Cloudbeds | $249/mo | building
Business Listing Sync | replaces Yext | $199/mo | shipped
Social Media Scheduling | replaces Hootsuite | $120/mo | building
Local SEO Basics | replaces Semrush | $119/mo | shipped
WiFi Captive Portal | replaces Purple WiFi | $100/mo | shipped
Competitor Snapshot | replaces Semrush / SpyFu | $99/mo | shipped
Email Marketing & Newsletter | replaces Mailchimp | $75/mo | building
AI Content Writing | replaces Jasper / Writer | $59/mo | shipped
Event Promotion | replaces Eventbrite + ads | $50/mo | shipped
Simple Customer List | replaces HubSpot | $50/mo | shipped
Online Gift Cards & Merch Store | replaces Shopify | $39/mo | shipped
Google Business Profile Audit | replaces BrightLocal | $35/mo | building
Simple To-Do List | replaces Asana | $30/mo | shipped
Content Calendar | replaces CoSchedule | $29/mo | shipped
One-Number Analytics | replaces GA4 + extras | $25/mo | shipped
Simple Payments | replaces FreshBooks | $25/mo | shipped
Digital Filing Cabinet | replaces Notion | $20/mo | shipped
Monthly Report PDF | replaces AgencyAnalytics | $18/mo | building
Ready-Made Graphics | replaces Canva Pro / designer | $15/mo | shipped

## PHASE 2: TECHNOLOGY

### Schema Stats
Models: 122
Indexes: 254
Unique constraints: 65
Schema lines:     2749

### API Routes
Total routes:      201
Authenticated:      116 (57%)
callAI routes:       17
Direct Vertex (bypassing callAI):        1

### AI Model Routing
const ROUTING: Record<AIRole, string[]> = {
  reasoning:  ['gemini-pro', 'claude-sonnet', 'gemini-flash'],
  generation: ['gemini-flash', 'claude-haiku', 'perplexity'],
  editorial:  ['claude-sonnet', 'gemini-pro', 'gemini-flash'],
  search:     ['perplexity', 'gemini-flash'],
  chat:       ['gemini-flash', 'claude-sonnet', 'perplexity'],
  voice:      ['gemini-flash', 'gemini-pro'],  // Low latency first, reasoning fallback
};


### Multi-tenant Config
  name: string;
  primaryDomain: string;
  accentColor: string;
    name: 'Big Muddy',
    primaryDomain: 'bigmuddytouring.com',
    accentColor: '#c8943e',
    name: 'Bearsville Creative',
    primaryDomain: 'bearsvillemediagroup.com',
    accentColor: '#c8943e',
    name: 'Studio C',
    primaryDomain: 'studio-c.video',
    accentColor: '#4A90D9',
    name: 'Tuthill Design',
    primaryDomain: 'tuthilldesign.com',
    accentColor: '#2D5F2D',
export function getTenantByHostname(hostname: string): TenantConfig | undefined {

## PHASE 3: FINANCIALS

### Revenue Projections (from HQ dashboard)
    revenue: { current: 0, projected: 120000, basis: '100 clients × $99/mo avg' },
    revenue: { current: 0, projected: 72000, basis: '3 shows/wk × $500 avg × 48 wks' },
    revenue: { current: 0, projected: 36000, basis: 'Ad revenue + sponsored features' },
    revenue: { current: 0, projected: 24000, basis: 'Sponsorships + streaming' },
    revenue: { current: 0, projected: 18000, basis: 'Distribution + sync licensing' },
    revenue: { current: 0, projected: 150562, basis: '6 rooms × $275 ADR × 25% occ × 365' },
    revenue: { current: 0, projected: 96000, basis: '~8 shoots/mo × $1,000 avg' },
    revenue: { current: 0, projected: 60000, basis: 'Realtor Pulse ($500/mo) × 10 clients' },
    revenue: { current: 0, projected: 0, basis: 'Summer 2026 activation' },
    revenue: { current: 0, projected: 12000, basis: 'Book sales + speaking' },
    revenue: { current: 0, projected: 0, basis: 'Infrastructure — revenue flows through brands' },

### Infrastructure Costs
Vercel Pro: $20/mo
Neon DB: $0-25/mo
Cloud SQL: $13/mo
Cloudflare: $0/mo
GCS Storage: ~$5/mo
Twilio SMS: ~$5/mo
ElevenLabs TTS: $5-22/mo
Asana Advanced: $47/mo (3 seats)
Canva Business: $30/mo
TOTAL: $145-167/mo

### Sovereign Pi Unit Economics
COGS base unit: $165 (Pi5 8GB + NVMe + case + power + microSD + HDMI)
COGS full bundle: $241 (+ battery + solar + Faraday)
Retail standalone: $299 (base) / $428 (bundle)
With subscription: $0 (financed into monthly tier)
Payback: 2 months at $99/mo
Add-on margins: 39-62%

## PHASE 4: OPERATIONS

### Team
Chase Pierson — CEO/CTO, day: tech + sales + media
Tracy Alderson-Allen — equity partner, finance + Inn ops
Amy Allen — equity partner, Inn + bar ops
JP Houston — shows + programming (deal not finalized)
Elijah Tuttle — tech deployment, Bearsville/Northeast
Miles — Studio C production

### Launch Timeline
April 10 — Code freeze
April 12 — Art show (first Pi demo)
April 17 — Soft launch (Amy's country show + Mechanical Bull)
April 27 — Full launch (DSD goes public, walk-in sales begin)
May 8 — Amy's Live at Five
Summer 2026 — Bearsville Creative activation

### Two-Region Model
Deep South (Natchez): Chase + Tracy + Amy operate
Northeast (Bearsville): Elijah + Miles operate (same platform, different region)
Studio C + Tuthill Design = founding partners of NE instance
Same deal structure, same platform, different operators

## PHASE 5: LEGAL

Current entity: FarleyPierson LLC (EIN 81-4280721)
New entity: Hillbilly Dreams Incorporated — Mississippi Corporation (filing this week)
Partners: Tracy, Amy, and a trust (Chase's interest)
Operating agreement: exists in Google Docs
IP assignment: needs verification in operating agreement
Terms of Service: not yet created (needed before payments)
Privacy policy: not yet created
Insurance: Tracy researching (E&O, cyber, media, equipment)

## PHASE 6: MARKET

Natchez, MS: 14,000 population, 600,000 annual tourists (43:1 ratio)
Median household income: $29,000
Poverty rate: 34%
Estimated storefronts: 400-600
Tourism revenue: ~$200M annual, 60-70% extracts
SAM (Natchez only): 225-335 businesses
SOM (5 regions by Y3): 1,500-2,350 businesses

Walk-in sales model: Chase drives to business, shows audit score on phone,
plugs in Sovereign Pi, business is live same day. No sales call, no contract,
no implementation timeline. CAC: ~$20 (Chase's time).

Media moat: Magazine + Radio + Photography + Touring. No SaaS competitor
owns media properties. DSD replaces $1,073/mo in software for $99/mo AND
adds media coverage that can't be purchased at any price from Birdeye/Podium.

Sovereign Pi: physical device on counter. Hardware lock-in reduces churn
40-60% vs pure SaaS. Works offline, on battery, on solar. Rural-ready.

---
Total data:      200 lines
Source: live codebase analysis + database queries + documentation
