# Perplexity Deep Research Prompt — Big Muddy Media Ecosystem

Copy this into Perplexity Pro with Deep Research enabled.

---

## The Prompt

I'm building a multi-brand media and hospitality ecosystem based in Natchez, Mississippi. I need comprehensive deep research across business model viability, comparable companies, market sizing, pricing strategy, and technology architecture. This is a real operating business, not a concept — I have a physical inn, a record label, a design agency, a touring brand, a magazine, a radio station, and an art marketplace all running from one technology platform.

### The Business

**The Big Muddy** is a media company disguised as a boutique inn. We own The Big Muddy Inn (6-room property at 411 N Commerce Street, Natchez, MS) and operate 7 brands from a single Next.js multi-tenant platform:

1. **Big Muddy Touring** (bigmuddytouring.com) — The flagship. A curated driving route along the Mississippi corridor covering 18 cities across 5 states (Tennessee, Mississippi, Louisiana, Arkansas, Missouri). Think Michelin Guide meets Southern Gothic road trip. The inn is the home base.

2. **Big Muddy Magazine** (bigmuddymagazine.com) — Long-form city guides, interviews, and photo essays about the music, food, and culture of the corridor. Content engine that drives SEO traffic for all other brands.

3. **Big Muddy Radio** (bigmuddyradio.com) — Curated Spotify playlists, a podcast ("Radio Big Muddy"), and live sessions recorded at the inn's Blues Room (Studio C). Bridges the radio station and the record label.

4. **Big Muddy Records** — Independent record label based at the inn. Artist roster includes Mechanical Bull (Woodstock, NY — Americana), Kate Skwire (Hudson Valley folk), and Arri Aslin (artist-in-residence). Revenue model: tiered marketing packages ($100/$250/$500/mo) where artists get recording time, social media management, PR, and placement across all Big Muddy brands. Artists keep their masters.

5. **Outsider Economics** (outsidereconomics.com) — Chase Pierson's book/newsletter about building parallel economic systems in small towns. 19 chapters published. Functions as the intellectual framework for why the whole ecosystem exists.

6. **Deep South Directory** (deepsouthdirectory.com) — B2B advertising network. Local businesses across the corridor pay $99/mo for placement across all Big Muddy brands. Delta Dawn (our AI design agent) generates their ads, social posts, and promotional materials.

7. **BuyCurious Art** (buycurious.art) — Online art marketplace for corridor artists. Commission-based.

Plus two service brands:
- **Studio C** (studioc.video) — Multi-camera live production studio inside the inn (ATEM Mini Extreme ISO, Blackmagic cameras, Steinway grand piano, Pro Tools). Books at $500/session, $1,500/day, $3,500/residency.
- **Tuthill Design** (tuthilldesign.com) — Creative services agency. Brand identity from $2,500, web from $5,000, photography from $1,500/session.

### Revenue Model — $760K Lean Target

The target is $760K/year across these streams:
- Inn lodging: $140K (6 rooms, 65% occupancy, ~$130 ADR)
- Events/weddings: $120K
- Advertising network (Deep South Directory): $120K
- Record label packages: $80K
- Design/creative services: $60K
- Studio bookings: $48K
- Content/newsletter: $24K
- Art marketplace: $24K
- Merch/BuyCurious: $24K
- Touring experiences: $120K

### Technology Stack

Single Next.js 14 App Router application serving all brands via middleware hostname routing. Prisma + Neon PostgreSQL. Google Cloud Storage for media. Firebase App Hosting on Cloud Run. Cloudbeds PMS integration for the inn (dynamic pricing, webhook-driven occupancy metrics). MelodyVault-style record label tech stack (AI track analysis, sync licensing marketplace, splits ledger, PRO registration, royalty tracking). Asana + Google Calendar task automation. Delta Dawn AI design agent for multi-modal media creation using Google Imagen + brand asset catalog.

### What I Need Researched

**1. Comparable Business Models**
- Are there other examples of media companies that own physical hospitality properties as their anchor? (Not just branded hotels — companies where the media arm and the hospitality arm are inseparable)
- What are the closest analogues to this "media engine + inn" model? Look at: Blackberry Farm (TN), Post House Inn (SC), Hotel Congress (Tucson), Marfa (TX) creative ecosystem, Ace Hotel's media strategy, The LINE Hotels content approach
- Any small-town media companies that successfully monetize a multi-brand portfolio?

**2. Mississippi Corridor Tourism Market**
- Current tourism revenue for the Mississippi corridor cities: Memphis, Clarksdale, Vicksburg, Natchez, Baton Rouge, New Orleans, Lafayette, Ocean Springs
- Natchez specifically: annual visitor count, average spend, seasonal patterns, Pilgrimage festival economic impact
- Growth trends in "heritage tourism" and "music tourism" in the Deep South
- Competitive landscape: who else is doing curated driving routes in this region?

**3. Boutique Inn Revenue Benchmarks**
- RevPAR and ADR benchmarks for 6-room boutique properties in Mississippi small towns
- Occupancy rate targets — is 65% realistic for Natchez?
- Cloudbeds PMS market share and competitors for small properties
- Dynamic pricing effectiveness for sub-10-room properties
- Wedding/event venue revenue for similar-sized properties in the South

**4. Independent Record Label Economics**
- Revenue models for micro-labels (under 10 artists)
- Is the "artists keep masters, label provides marketing infrastructure" model working anywhere?
- Sync licensing marketplace comps: Musicbed, Artlist, Epidemic Sound — what are their per-track payouts?
- What does a $100-$500/mo artist services package look like at competing labels?

**5. Local Advertising Network Viability**
- Can a $99/mo local business advertising network sustain at the 100-client scale?
- What is the CAC for local small business advertising clients?
- Comparable networks: Patch.com local, Nextdoor business, local chamber digital packages
- AI-generated ad creative as a differentiator — who else is doing this?

**6. Multi-Tenant Media Platform Architecture**
- Are there other companies running 5+ brands from a single codebase?
- How do media conglomerates (Vox Media, Condé Nast) handle multi-brand tech stacks?
- Cost efficiency of single-platform vs separate deployments at our scale

**7. Content Monetization**
- Newsletter economics for niche publications (Beehiiv, Substack). What's the conversion rate from free to paid?
- Podcast monetization at the <5,000 listener scale
- Photo essay / long-form content monetization models

**8. The "Outsider Economics" Thesis**
- Are there real-world examples of the economic theories in the book working? Specifically:
  - Agorism / counter-economics in small-town revival
  - Circular local economies that actually retained more capital
  - Creative class migration to small towns (Richard Florida's thesis applied to the Deep South)
  - "Distributed network" businesses where the physical node (the inn) is the hub

**9. Risk Analysis**
- What kills businesses like this? Seasonal dependency, key-person risk, market size ceiling?
- Insurance and liability for combined hospitality + media + events
- Scaling constraints for the inn anchor (6 rooms is small — what's the path to 20?)

**10. Growth Vectors**
- The "Porch Network" concept: franchising this model to other small towns along the corridor. Each town gets an inn + media node. Is there precedent for this kind of distributed hospitality network?
- Podcast → video → streaming: what's the realistic timeline and cost to build a video audience from a podcast base of ~2,000?
- Art marketplace scaling: BuyCurious as a platform play. How do regional art marketplaces grow?

### Format

Give me a structured research report with:
- Executive summary (1 paragraph)
- Each section numbered with findings, data points, and source citations
- A "Comparable Companies" table with revenue estimates where available
- A "Risk Matrix" with likelihood and impact ratings
- A "Recommended Next Steps" section based on your findings
- All dollar figures in USD, all data as recent as possible (2024-2026)
