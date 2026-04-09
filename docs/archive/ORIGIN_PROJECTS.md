# Origin Projects — The 10-Year Thread

*Every project Chase Pierson has built since 2016 fed into the platform you're looking at now. This document maps the lineage.*

---

## The Thread

In 2021, Chase got COVID and had a fever dream about Bearsville Media Group. A recording studio campus in the Catskills that could be a regional media company. Not a studio that rents rooms — a network that produces, distributes, and monetizes content from a single location. That fever dream became the organizing principle for everything that followed.

But the architecture was already there. Chase had been designing media production-to-distribution systems since 2022 with the DeFacto Codec Market — global infrastructure for broadcast, production, analytics, and distribution. The realization: the same architecture that runs a Viacom can run a small-town media economy. The gap isn't technology. It's organization.

---

## Project Lineage

### DeFacto Codec Market (2022)
**What it was:** A complete media infrastructure specification — broadcast encoding, production pipelines, content analytics, distribution endpoints. Built on open source tools.

**What it became:** The entire HDI platform architecture. The modular system. The multi-tenant deployment. The idea that one codebase can run multiple media brands.

**Key contribution:** Proved that broadcast-grade infrastructure doesn't require broadcast-grade budgets.

---

### RevoFi Media (2022-2023)
**What it was:** Decentralized content distribution through local mesh WiFi networks. Captive portals as content endpoints. Analytics from the network layer.

**What it became:**
- DSD WiFi Marketing Module (captive portals for businesses)
- Plex branded channels (local content on local networks)
- The DSD directory concept (local businesses as network nodes)
- DotStudio Pro player integration

**Key contribution:** The insight that WiFi infrastructure IS media infrastructure. A captive portal is a publishing platform.

---

### AICOE (2023-2024)
**What it was:** Media strategy consulting at $5,000/month. Four-phase engagement: discovery, production, publishing, publicity.

**What it became:** Studio C's tiered service model:
- $99/mo: App only, digital call sheets, discounted services
- $500/mo: All modules, services at cost + 20%
- $1,000/mo: Priority SLA

**Key contribution:** The pricing structure. Proved that small creative businesses will pay monthly for organized production services. Also proved that consulting doesn't scale — you need a platform.

---

### Andrew Freedman Home — South Bronx, NY (2023)
**What it was:** Community media infrastructure in a historic Bronx landmark. Studio production, WiFi, content distribution, economic development tools.

**What it became:** The proof that micro-media infrastructure works outside of commercial contexts. The same system that serves a bar in Natchez can serve a community center in the Bronx.

**Key contribution:** Municipal partnership models. Telco opportunity mapping (Winsonic partnership: Verizon, AT&T, ZenFi). The Affordable Connectivity Program as a funding mechanism.

---

### Scan2Plan / S2PX (2023-2025)
**What it was:** 3D laser scanning to floor plans for the architecture/engineering/construction industry. Owen Bush's company — Chase was CTO.

**What it became:** Tuthill Design's spatial scanning product (#75). The Gaussian splat to floor plan pipeline.

**What ended:** Partnership with Owen Bush dissolved March 25, 2026. Codebase archived to `~/S2PX-archive/`. The scanning technology and AEC industry knowledge transferred to Tuthill Design.

**Key contribution:** The AEC client vertical. Realtors, architects, interior designers as a market segment. This became Tuthill's primary business.

---

### Bearsville Media Group (2024-2025)
**What it was:** The fever dream made real. Rob Fraboni's Utopia Studios + First Sound + vinyl/streaming ecosystem. Chase's partnership with Pete for facility access and venue revenue share.

**What it became:** Bearsville Creative. The northeast media node. Studio C Video as the production arm. Tuthill Design as the creative services arm. All operating from the Utopia campus in Bearsville, NY.

**Key people:**
- Pete: facility access + revenue share on Utopia venue work only. Chase owns all equipment outright.
- Miles: runs day-to-day Studio C production. Chase is business development.
- Elijah: technical deployment (WiFi, NAS, infrastructure)

**Key contribution:** The multi-region model. Proved that the same platform can run in the Deep South AND the Hudson Valley. Different brands, same engine.

---

### Utopia Video (2025)
**What it was:** The production infrastructure specification for Utopia Studios. 5-VLAN production network. Equipment packages with day rates.

**What it became:** Studio C production pipeline (#77), multi-gimbal capture system (#79), Bearsville infrastructure deployment (#81).

**The VLAN architecture:**
- VLAN 1: Video (NDI) → Tricaster
- VLAN 2: Audio (DANTE/MADI) → ProTools
- VLAN 3: Lighting (ARNET) → OCTO
- VLAN 4: Comms → ClearCom/RTS
- VLAN 5: WiFi → Ubiquiti APs

**Equipment (Chase owns outright, ~$70-80K):**
- DJI Ronin 4D (primary cinema rig)
- Aputure 600D Pro + 300D Mark II
- 2x ATEM Extreme ISO 8-channel + ATEM TV Studio
- Tentacle Sync, DJI wireless audio, Rode wireless, TASCAM 6-channel
- Blackmagic cameras, Mac with Logic Pro, Apollo 10-channel interface

---

### Catskills Weekender (2024)
**What it was:** A vacation rental guest app. QR splash pages, social login, local directory, booking integration.

**What it became:** DSD's captive portal system + WiFi marketing + the local business directory concept applied to tourism.

**Key contribution:** The QR-to-directory flow. Tourist walks into a business, scans QR on WiFi splash page, sees local directory, discovers other businesses. That's the DSD onboarding funnel for the tourism market.

---

### Hudson Virtual Tours (2024)
**What it was:** Virtual property tours for Hudson Valley real estate agents.

**What it became:** Tuthill Design's Realtor Pulse product (#40). $500/month for AI narrative listings, video tours, photography, smart TV signage.

**Key contribution:** The real estate vertical as a repeatable service package.

---

### Mechanical Bull (2025)
**What it was:** A music release automation system built around a 17-track outlaw country album. 9 Airtable tables, 25 Zapier flows, viral detection, curator pipeline.

**What it became:** The MelodyVault concept in the platform. The Track/Artist/Split Prisma models. The social publishing pipeline. The automated content distribution system.

**Key contribution:** Proved that music marketing automation can reduce costs from $50,000-$100,000 to under $3,000 per release. Artists keep their masters. The label's value is the system, not the contract.

---

### DotStudio Pro (2022-2023)
**What it was:** Content management + distribution platform with integrated player and analytics.

**What it became:** Linear TV product. Plex channel programming. Content pipeline automation.

**Key contribution:** The concept of programmatic content distribution to display endpoints (lobby TVs, kiosks, smart signage).

---

## The Pattern

Every project solved the same problem at a different scale:

1. **A place has value** (a studio, a town, a community center, a recording)
2. **The value leaks** (through platforms, middlemen, extraction, disorganization)
3. **Organization is the fix** (connect the existing pieces into a system)
4. **The system runs on the same architecture** (production → distribution → analytics → monetization)

The technology never changed. What changed was the realization that Main Street needed it more than Hollywood did. That's what makes HDI different from every media-tech company that came before it. They built for scale. Chase built for sovereignty.

---

## Current State (April 2026)

All of these projects now run on one platform:
- **14 domains**, one Vercel deployment
- **78+ Prisma models**, one PostgreSQL database (Cloud SQL)
- **4 tenants**: Big Muddy (Natchez), Bearsville Creative (Woodstock), Studio C, Tuthill Design
- **5 DSD tiers**: Free / $25 / $50 / $99 / $250
- **Team of 4**: Chase (CEO/CTO), Tracy (Finance/Inn), Amy (Ops), JP (Shows)

The fever dream is running.

---

*Document created 2026-04-05. Source: Chase's project handoff documents, .claude/agents/ORIGIN_STORY.md, docs/BUSINESS_ARCHITECTURE.md, issue #83 comments.*
