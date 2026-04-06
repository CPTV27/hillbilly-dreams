# ADR-003: EmDash as White-Label Site Builder for DSD Customers

**Status:** Accepted (Phase 2)
**Date:** 2026-04-06
**Decision maker:** Chase Pierson

---

## Context

DSD customers at $25/mo and above need a website. Currently we have no self-service site builder — Chase builds pages manually or customers bring their own. We need a zero-cost-per-site CMS that can be branded per customer, managed by Delta Dawn, and provisioned automatically from DSD onboarding.

## Decision

Use EmDash (Cloudflare's open-source CMS, MIT-licensed) as the white-label website builder module for Deep South Directory customers. Custom admin UI, pre-seeded templates per business type, Delta Dawn management via MCP.

## Architecture

```
DSD Onboarding ($25+/mo)
  → Provision EmDash instance on Cloudflare Workers + D1
  → Pre-seed with business type template (restaurant, bar, hotel, retail, service)
  → Auto-populate from Google Places data (already in DirectoryBusiness table)
  → Custom admin UI: "Your Business Dashboard" (not "EmDash Admin")
  → Delta Dawn manages via MCP: hours, photos, menu updates, review responses
  → Frontend on customer subdomain (business-name.deepsouthdirectory.com)
     or custom domain when provided
```

## Why EmDash

| Requirement | EmDash | WordPress | Custom Build |
|---|---|---|---|
| Cost per site | $0 (Workers free tier) | $5-20/mo hosting | $0 (our Vercel) |
| Security | Sandboxed plugins | 96% of vulns from plugins | Our responsibility |
| AI integration | Built-in MCP server | None | Custom |
| Content model | Portable text (structured) | HTML blobs | Prisma (structured) |
| Multi-tenant | Workers isolates | Separate installs | Our middleware |
| Admin UI | Customizable (MIT) | Theme-dependent | Full control |
| License | MIT | GPL (viral) | N/A |
| Deploy | Cloudflare Workers | Any server | Vercel |
| Auth | Passkeys (modern) | Passwords (legacy) | next-auth |

## Customer Admin UI

Replace EmDash's default admin with a DSD-branded interface:

**For a restaurant:**
- "Your Menu" (not "Posts")
- "Your Photos" (not "Media")
- "Your Hours" (not "Settings")
- "Your Events" (not "Calendar")
- "Your Reviews" (synced from Google/Yelp)
- "Ask Delta Dawn" (AI assistant panel)

**For a hotel/B&B:**
- "Your Rooms" with rates and availability
- "Your Amenities"
- "Guest Reviews"
- "Local Recommendations" (auto-populated from our corridor data)

**For retail:**
- "Your Products"
- "Your Store Hours"
- "Your Location & Directions"
- "Customer Reviews"

## Templates (Pre-seeded)

Each business type gets a seed file like `mississippi-magazine-seed.json`:
- Collections defined for their content type
- Fields mapped to their industry
- Taxonomies relevant to their category
- Sample content showing what a finished site looks like
- Navigation pre-configured

## Delta Dawn Integration

EmDash has a built-in MCP server. Delta Dawn connects and can:
- Create/update content (menu items, events, hours)
- Upload media (photos from GCS Upload pipeline)
- Search content
- Manage taxonomies
- Read analytics

Customer says "Hey Dawn, update my Friday hours to close at midnight" → Delta Dawn calls EmDash MCP → site updates instantly.

## Provisioning Pipeline

1. Customer completes DSD onboarding form
2. System creates Cloudflare Workers site from template
3. D1 database seeded with business type template
4. Google Places data populates address, hours, phone, photos, rating
5. Customer gets email with passkey setup link
6. Delta Dawn introduces herself in the admin panel
7. Site goes live on subdomain immediately

## Cost Model

| Component | Free Tier | Cost at Scale |
|---|---|---|
| Cloudflare Workers | 100K req/day | $0.50/million |
| D1 (SQLite) | 5GB storage | $0.75/GB/mo |
| R2 (media) | 10GB storage | $0.015/GB/mo |
| **Total per site** | **$0** | **~$0.25/mo** |

At $25/mo DSD Essentials, the margin is 99%+ on hosting. The cost is customer support and Delta Dawn AI credits.

## Risks

- EmDash is v0.1.0 developer preview — may have breaking changes
- Custom admin UI requires maintaining a fork or custom frontend
- Cloudflare Workers cold starts may affect first-visit latency
- D1 is serverless SQLite — not suitable for high-write workloads (fine for business sites)

## Revisit Triggers

- EmDash reaches v1.0 stable
- First 10 DSD customers onboarded and providing feedback
- Delta Dawn MCP integration tested end-to-end

## Prototype

Local test instance running at `~/emdash/demos/simple/` with Mississippi Magazine seed (8 articles, 12 corridor cities, 2 bylines). Validates the content model and admin UX.

## What NOT to Do

- Don't migrate our Next.js platform to EmDash — they serve different purposes
- Don't deploy EmDash to Vercel — it's designed for Cloudflare Workers
- Don't build the custom admin UI until we have 5+ paying DSD customers asking for websites
- Don't promise website builder in DSD marketing until Phase 2 ships
