# Studio C — Service Boundary Map

*Who does what, who gets paid how, and what runs on autopilot.*

---

## The Three Lanes

### Lane 1: Studio C (the company)
Elijah and Miles handle this as part of the Studio C entity. Paid via HDI retainer.

| Service | What | Who | Notes |
|---------|------|-----|-------|
| Video production | Shoots, edits, delivery | Miles (production), Elijah (tech) | DJI Ronin 4D, Aputure, Blackmagic |
| Live broadcast | Multi-camera, ATEM switching, Restream | Elijah | 2x ATEM Extreme ISO + TV Studio |
| Recording sessions | Audio capture at Utopia | Studio engineer | Apollo 10-channel, Logic Pro |
| Equipment management | Maintenance, inventory, rental tracking | Elijah | ~$70-80K total equipment value |
| Campus infrastructure | WiFi, NAS, network, displays | Elijah | Ubiquiti, UNAS Pro, 5-VLAN |

**Retainer range:** $500-$1,000/mo (Chase + Elijah to finalize)

### Lane 2: Elijah Independent
Work Elijah takes on personally, billed separately through Tuthill Design or direct.

| Service | What | Client | Billing |
|---------|------|--------|---------|
| Realtor media | Property photography, video tours, staging | Tuthill Design clients | Per-project or Realtor Pulse ($500/mo) |
| Branding/design | Brand identity, web design, creative direction | Tuthill Design clients | Per-project |
| Social management | Content creation, posting, community | Select clients | Monthly retainer |
| Tech consulting | Network setup, hardware procurement | External clients | Hourly or per-project |

**Key rule:** Elijah's independent work is billed through Tuthill Design, not through Studio C. Studio C is HDI's production arm. Tuthill is Elijah's creative services business.

### Lane 3: Managed Services (no humans needed)
SaaS that handles complexity so the team doesn't have to.

| Service | What It Does | Cost/mo | What It Replaces |
|---------|-------------|---------|-----------------|
| Canva Business | Design templates, brand kits, bulk exports | $30 | Graphic designer |
| Google AI Studio | Content drafting, captions, review responses | $0 (GCP credit) | Copywriter |
| Vercel | Hosting, CDN, serverless, edge functions | $20 | DevOps engineer |
| Neon | Primary database (PostgreSQL) | $0-25 | DBA |
| Cloud SQL | Sovereign database (pgvector, backup) | $13 | DBA |
| Cloudflare | DNS, CDN, SSL, DDoS protection | $0 | Network admin |
| Restream.io | Multi-platform live streaming | $20-50 | Broadcast engineer |
| ElevenLabs | Voice/TTS for radio, concierge, content | $5-22 | Voice talent |
| Stripe | Payments, billing, Connect | Transaction fees | Bookkeeper (partial) |
| Twilio | SMS for vendor management | ~$5 | Phone system |
| **Total** | | **$113-165/mo** | |

---

## What Needs a Human (Non-Negotiable)

| Task | Person | Why |
|------|--------|-----|
| Walk-in sales | Chase | Relationship building, pitch delivery |
| Photography | Chase | Creative vision, editorial eye |
| Strategy + product | Chase | Nobody else sees the full picture |
| Inn guest experience | Amy | Hospitality requires human warmth |
| Social post approval | Amy | Brand voice gut-check |
| Live show production | Crew (JP + sound) | Physical presence, real-time decisions |
| Finance + compliance | Tracy | Fiduciary responsibility |
| Video shoots | Miles/Elijah | Camera operation, lighting, direction |
| Equipment rigging | Elijah | Physical setup, safety |
| Content review before publish | Chase or Amy | Honesty gate — no AI publishes without human approval |

## What Does NOT Need a Human (Automate It)

| Task | System | Runs How |
|------|--------|---------|
| Social post scheduling | Native publisher + cron | `/api/cron/social-publish` — daily |
| Review response drafting | callAI (Gemini Flash) | On new review, drafts response for approval |
| Monthly client reports | PDF generation + cron | `/api/cron/monthly-reports` — 1st of month |
| Listing sync | Google Places API | On client onboard + weekly refresh |
| Content calendar population | AI generation | On demand via admin |
| Photo tagging | Vision API | On upload |
| Email newsletter assembly | AI generation | Weekly via editorial cadence |
| Directory listing enrichment | Google Places enrichment | On add + 7-day refresh |
| Vendor SMS logging | Twilio webhook → Asana | Real-time |
| GBP health scoring | GBP audit API | On demand |

---

## SLA Expectations (HDI ↔ Studio C)

| Category | Response Time | Notes |
|----------|-------------|-------|
| Emergency (equipment failure, show day) | 1 hour | Call, don't text |
| Production request (new shoot) | 24 hours to acknowledge | Schedule within 1 week |
| Content delivery | Per project timeline | Agreed at intake |
| Infrastructure issue (WiFi, NAS) | Same day | Campus must be operational |
| Non-urgent (equipment order, planning) | 48 hours | Asana task |

---

## The Budget Summary

| Category | Monthly Cost |
|----------|-------------|
| Studio C retainer (Elijah/Miles) | $500-1,000 |
| Managed SaaS services | $113-165 |
| **Total infrastructure cost** | **$613-1,165/mo** |

For context: a single marketing agency charges $2,000-5,000/mo. A production house charges $3,000-10,000/project. The managed services stack replaces 6+ hired roles for under $200/mo.

---

## Decisions for Chase + Elijah

1. [ ] Studio C retainer amount — $500 or $1,000/mo?
2. [ ] What's included vs. billed separately? (e.g., is social management in the retainer?)
3. [ ] Restream subscription — who pays, Studio C or HDI?
4. [ ] ElevenLabs — which tier? ($5 starter vs $22 creator)
5. [ ] SLA: is 24-hour acknowledgment realistic for both sides?

---

*This doc lives in the repo. Update it when the deal with Elijah is finalized.*
