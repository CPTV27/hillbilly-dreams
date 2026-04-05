# DeFacto Global — Integration Partner Brief

*April 5, 2026. Internal. Chase Pierson.*

---

## The Opportunity

**DeFacto Global** is Bob Bedard's company. Bob is a trusted advisor to Chase — referenced throughout the codebase as the person Chase would show work to before calling it ready.

DeFacto Global runs on a **spreadsheet interface** — which means integration is straightforward. Their system handles higher-end business operations that sit above what DSD serves. If MBT integrates with DeFacto Global, we can **sell up** to larger businesses that need more than $250/mo in services.

---

## The Integration Model

```
Small Business ($0-$250/mo)          Mid-Market ($500-$2,000/mo)
┌─────────────────────┐              ┌────────────────────────┐
│  Deep South Directory│              │   DeFacto Global       │
│  (MBT Platform)      │ ──────────→ │   (Spreadsheet-based)  │
│                       │ integration │                        │
│  Free / $25 / $50    │              │  Advanced analytics    │
│  $99 / $250          │              │  Enterprise reporting  │
│                       │              │  Custom workflows      │
└─────────────────────┘              └────────────────────────┘
```

**The pitch:** DSD is the on-ramp. DeFacto Global is the highway. A barbershop starts at $25/mo on DSD. When they grow to 3 locations and $500K+ revenue, they graduate to DeFacto Global — and we earn a referral commission or rev share.

---

## Why It Works

### For HDI/MBT:
1. **Upsell path** — $250/mo Engine tier hits a ceiling. Businesses that outgrow DSD have nowhere to go today. DeFacto Global is the next step.
2. **Bob's network** — Bob has relationships with established businesses that are too large for DSD's $250 ceiling but too small for enterprise SaaS.
3. **Credibility** — "Powered by MBT, with DeFacto Global for enterprise" sounds like a real stack, not a startup experiment.
4. **Revenue share** — Commission on every customer we send upstream.

### For DeFacto Global:
1. **Lead pipeline** — Every DSD customer at $99+ is a warm lead for DeFacto Global once they scale.
2. **Data layer** — MBT's regional data supply (business health signals, review sentiment, social engagement) enriches DeFacto's spreadsheet-based analytics.
3. **Media proof** — DSD customers come with Magazine features, Radio mentions, and a digital presence already built. They're not cold leads — they're proven businesses.

### For the Customer:
1. **Seamless growth** — Start at $25/mo. Grow into $250/mo. Graduate to DeFacto Global without rebuilding anything.
2. **One ecosystem** — Their data, their reviews, their media coverage all flow through. No migration pain.

---

## Technical Integration

DeFacto Global runs on spreadsheets. This makes integration dead simple:

### Phase 1: CSV/Spreadsheet Bridge
- **Export:** DSD customer data (business profile, review scores, social metrics, revenue indicators) as CSV
- **Import:** DeFacto Global reporting data back into MBT analytics dashboard
- **Mechanism:** Scheduled cron job or manual export via `/api/admin/export`
- **Effort:** 1 week

### Phase 2: Real-Time Sync
- **Google Sheets API** as the bridge (if DeFacto uses Google Sheets)
- **Or:** Airtable API (if they use Airtable)
- **Or:** Simple webhook → spreadsheet pipeline
- **Mechanism:** Write to shared spreadsheet on customer events (new review, social engagement spike, revenue milestone)
- **Effort:** 2-3 weeks

### Phase 3: Unified Dashboard
- DeFacto Global metrics visible in MBT admin dashboard
- MBT engagement data visible in DeFacto's spreadsheet
- Shared customer view across both platforms
- **Effort:** 4-6 weeks

---

## Historical Context

DeFacto was the original brand name for Chase's media infrastructure work (2022). The "DeFacto Codec Market" was the specification that became the MBT platform. Bob Bedard was involved from the beginning — his company carries the name forward.

From `docs/specs/DEFACTO_MEDIA_ORIGIN.md`:
- Original DeFacto pitch: $60K consulting + $20K marketing + $10K equipment
- Target: 1M+ digital impressions, 10K subscribers, transition from creator to media company
- Bob's relationship supported the structural goals that became HDI

The names diverged but the architecture is the same. DeFacto Global and MBT are branches of the same tree.

---

## Revenue Model

| Scenario | HDI Revenue | Notes |
|---|---|---|
| **Referral commission** | 10-15% of Year 1 revenue per customer referred | Standard SaaS referral |
| **Data licensing** | $500-2,000/mo | Regional business intelligence feed |
| **White-label module** | $2,000-5,000 setup + $500/mo | DSD module branded as DeFacto's entry tier |
| **Rev share** | 5% ongoing | On all customers in the shared pipeline |

**Recommendation:** Start with referral commission. Keep it simple. Prove the pipeline works with 5 customers, then negotiate rev share.

---

## Next Steps

1. **Chase calls Bob** — "I've built the engine we always talked about. It's running. I want to connect it to your system."
2. **Show the demo** — Walk Bob through a DSD listing, the admin dashboard, the AI content pipeline
3. **Share this doc** — Not the technical details, but the integration model
4. **Agree on 5 test customers** — Businesses that are in DSD today and could benefit from DeFacto Global's services
5. **Build the CSV bridge** — 1 week of engineering, prove the data flows

---

## The Line

"Bob, you've always been building for the businesses that are too big for my platform. I've always been building for the ones that are too small for yours. What if we connect the two?"

---

*This integration positions DeFacto Global as the enterprise tier of the MBT ecosystem. Small businesses enter through DSD, grow with us, and graduate to DeFacto Global when they're ready. Bob gets a pipeline. We get an upsell path. The customer never has to start over.*
