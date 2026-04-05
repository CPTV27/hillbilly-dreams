# Feed Farm Protocol — MBT Implementation Proposal for Katie Halper

*April 5, 2026. Internal draft. Chase Pierson.*

**CodePen reference:** https://codepen.io/Chase-Pierson/pen/gbrBNbE

---

## The Concept

**Feed Farm Protocol** is an ad network aggregator for independent media creators. One contract. One invoice. One creative brief. Syndicated across the top voices in a vertical — starting with **The Independent Left**.

Chase already built the prototype in CodePen. This document maps how MBT powers it for real.

---

## The Network (from the CodePen)

### Anchor Nodes
| Creator | Vertical | Subscribers | Format |
|---|---|---|---|
| **Katie Halper** | Politics / Culture / Humor | 155K+ | Podcast, YouTube, Substack |
| **Aaron Maté** | Investigative Journalism | 220K+ | Podcast, Substack, YouTube |
| **Briahna Joy Gray** | Commentary / Debate | 170K+ | Podcast (Bad Faith), YouTube |

### Extended Network
- Chris Hedges
- Matt Taibbi (Racket)
- Rotating guests

### Aggregate Stats (from prototype)
- 1.2M+ aggregated subscribers
- 5.5M monthly impressions
- 85% completion rate
- 100% human curated

---

## The Problem Feed Farm Solves

**For advertisers:** Buying ads on YouTube and X is gambling — algorithmic sludge, clickbait, bot traffic. To reach smart, engaged audiences you have to go direct to independent creators. But negotiating 20 separate contracts with 20 different podcasters is a logistical nightmare.

**Feed Farm solution:** One contract. One invoice. One creative brief. Syndicated instantly across the top voices in independent media.

---

## Ad Products (from the CodePen)

| Product | Description | Format |
|---|---|---|
| **Integrated Host Read** | 60-second native endorsement by the creator | Audio/video — high retention, impossible to skip |
| **Network Bumper** | Logo in the 5-second "Feed Farm Protocol" intro/outro | Brand association with entire vertical |
| **Newsletter Syndicate** | Top-of-fold placement in all network Substacks simultaneously | Email — direct inbox |

### Rate Card (Q3 2026)
| Metric | Value |
|---|---|
| Network CPM (Blended) | $45.00 |
| Minimum Buy | $10,000 |
| Projected Impressions | 220,000 / week |
| Inventory Limit | 3 sponsors per quarter (trust preservation) |
| Volume Discounts | Available for quarterly residencies |

---

## How MBT Powers Feed Farm

This is where the platform mapping gets interesting. Feed Farm isn't a new product — it's MBT modules configured for a media ad network.

| Feed Farm Need | MBT Module | How It Works |
|---|---|---|
| **Creator roster management** | Directory | Each creator = a DirectoryBusiness with profile, stats, content links |
| **Ad campaign management** | AI Content Pipeline + Commerce | Campaign creation, creative brief distribution, scheduling |
| **Impression tracking** | Analytics | Per-creator impression logs, completion rates, audience demographics |
| **Revenue splits** | Commerce (Stripe Connect) | Multi-party payouts — advertiser pays Feed Farm, Feed Farm splits to creators |
| **Newsletter syndication** | Magazine + AI Pipeline | Auto-generate newsletter placements from campaign brief |
| **Content calendar** | AI Content Pipeline | Schedule host reads, bumpers, newsletter drops across all creators |
| **Advertiser dashboard** | Analytics | Campaign performance, spend tracking, ROI reporting |
| **Creator dashboard** | Portal | Each creator sees their earnings, upcoming campaigns, content schedule |
| **Rate card / booking** | Commerce | Stripe checkout for campaign buys, inventory management |
| **Network feed** | Radio + Broadcasting | Aggregate content feed from all creators (podcast clips, video, social) |

### Stripe Connect Configuration
```
Feed Farm platform fee: 20% (matches touring/ticket config)
Creator payout: 80% of campaign revenue
Settlement: Monthly, net-30
```

### New Tenant Entry
```typescript
{
  id: 'feed-farm',
  name: 'Feed Farm Protocol',
  entity: 'Feed Farm Network',
  domains: ['feedfarm.network'], // TBD
  primaryDomain: 'feedfarm.network',
  routeGroup: 'feed-farm',
  themeClass: 'theme-feed-farm',
  accentColor: '#ff4d4d', // Feed Farm red
  tagline: 'Reaching the Un-Algorithmable',
  location: { city: 'New York', state: 'NY' },
  features: ['directory', 'commerce', 'analytics', 'radio', 'magazine']
}
```

---

## Revenue Model

### For Feed Farm (the business)
| Revenue Stream | Calculation | Annual (Conservative) |
|---|---|---|
| **Campaign revenue** | 4 campaigns/quarter × $10K minimum × 4 quarters | $160,000 |
| **Platform fee (20%)** | 20% of total campaign spend after creator payouts | $32,000 |
| **Newsletter syndication** | Premium placement, separate from audio/video | $20,000 |
| **Data/analytics upsell** | Audience insights package for advertisers | $10,000 |
| **TOTAL** | | **$222,000** |

### For Creators (per creator, 3-creator network)
| | Per Quarter | Annual |
|---|---|---|
| **Host read revenue** | $8,000 - $15,000 | $32,000 - $60,000 |
| **Bumper revenue** | $2,000 - $5,000 | $8,000 - $20,000 |
| **Newsletter revenue** | $1,000 - $3,000 | $4,000 - $12,000 |
| **TOTAL per creator** | **$11,000 - $23,000** | **$44,000 - $92,000** |

### For HDI/MBT
| Revenue Path | Amount | Notes |
|---|---|---|
| Platform licensing | $500-1,000/mo | Feed Farm pays for MBT infrastructure |
| Transaction fee | 2-3% of campaign spend | On top of Stripe fees |
| Case study rights | Priceless | "MBT powers an independent media ad network" |

---

## The Pitch to Katie

"Katie, you already have the audience. Aaron and Briahna have the audience. The problem isn't reach — it's that every advertiser who wants to sponsor independent media has to negotiate 20 separate deals. Feed Farm makes it one deal. One invoice. One creative brief. We handle the scheduling, the tracking, and the payouts. You just do what you already do — and your show gets sponsored by brands that actually align with your values, not whatever the algorithm serves up.

I built the prototype. Here's what it looks like: [CodePen link]. I have the platform to run it for real. Same infrastructure that runs a touring circuit and a directory in Mississippi can run an ad network in New York. It's the same problem — aggregating independent operators into something bigger than any of them could build alone."

---

## Implementation Timeline

| Phase | Timeline | What Ships |
|---|---|---|
| **Phase 1: Prototype** | 2 weeks | Landing page (convert CodePen to live site on MBT), creator profiles, rate card |
| **Phase 2: Ad booking** | 4 weeks | Stripe checkout for campaign buys, creator dashboard, basic analytics |
| **Phase 3: Syndication** | 6 weeks | Newsletter automation, content calendar, cross-creator scheduling |
| **Phase 4: Full platform** | 10 weeks | Advertiser dashboard, impression tracking, automated payouts via Stripe Connect |

---

## Relationship to Studio C

The second CodePen (https://codepen.io/Chase-Pierson/pen/EayoVZd) is the **Studio C** media company site — "Recording World Media." This maps to `studiocvideo.com` and represents a different vertical:

- **Feed Farm** = independent political media aggregation (ad network model)
- **Studio C** = recording industry media and publishing (content catalog model)

Both run on MBT. Both are tenants. Both prove the platform works for media companies outside the Deep South.

---

## Next Steps

1. **Chase texts Katie the CodePen** — she's already seen it. Revive the conversation.
2. **Convert CodePen to live page** — either as a standalone site or under a new MBT tenant
3. **Get Katie, Aaron, and Briahna to verbally commit** — "if the platform exists, would you use it?"
4. **Build Phase 1** — 2 weeks to a live landing page with real creator profiles
5. **First advertiser** — Chase's network. Who wants to reach 1.2M engaged political media consumers?

---

*Feed Farm is the third proof point for MBT as a platform company: Big Muddy (hospitality-media, Deep South), DCTV (community media, NYC), Feed Farm (independent media ad network, national). Three completely different use cases. Same engine.*
