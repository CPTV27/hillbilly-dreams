# Handoff — MBT Platform Restructure

*Canonical source: `docs/HANDOFF_MBT_PLATFORM_RESTRUCTURE.docx`. This markdown is the AI-readable mirror.*

*Received 2026-04-18 · Supersedes all prior HDI-framed architecture docs.*

---

HANDOFF DOCUMENT

From: Chase Pierson

To: Chief of Staff

Date: April 18, 2026

Re: Entity restructure, platform architecture, and the Studio C / MBT relational model

Headline Decision

Hillbilly Dreams Incorporated will not be formed. Measurably Better Things becomes the operating company — the holding entity, the platform, and the brand customers touch.

Nothing was filed under HDI and there are no live agreements naming it, so the collapse is clean. No contract substitutions required.

The new one-paragraph story: Measurably Better Things LLC is the platform company. Three-way partnership — Chase, Tracy, Amy. It owns the software, the entity database, and the brand. Studio C is the production vendor. Tuthill Design is the platform operations vendor. Clients include Big Muddy Inn, Big Muddy Touring, Utopia, Vicki Wolpert, Paul Green Realty, the City of Natchez, and others. Outsider Economics is MBT’s open-source offering.

Entity Structure

MBT as the Sovereign Platform

MBT is the platform entity. It owns the software stack, the canonical entity database, and the brand. Every other organization in the ecosystem holds one or more roles relative to MBT: client, vendor, or both.

Roles are relationships, not identities. A given organization can be a client of MBT for one purpose and a vendor to MBT for another.

Vendor Relationships

Studio C — Production Vendor

Narrowed scope: production-related services only. Photo, video, content, shoots, edit.

Also a client of the platform — uses MBT to market its own services. Eats its own dog food.

Becomes the production hub at Tracy’s office.

Tuthill Design — Platform Operations Vendor

Contracted by MBT to handle platform operations and SLA management.

Keeps Studio C from becoming a confused hybrid of production and ops — different muscles, different people.

Gives Tuthill a second revenue lane beyond real estate photography.

Client Relationships (current and pipeline)

House Brands

Tuthill Design (advertised rates)

Chase Pierson Photography (premium rate, distinct from Tuthill)

Studio C (markets video production via the platform)

Big Muddy Ecosystem

Big Muddy Inn, Big Muddy Touring, Big Muddy Records, Big Muddy Radio, Arrie Aslin, Mechanical Bull

Bearsville Cluster

Utopia / Bearsville (active)

Clubhouse Studio (target pickup)

David Baron Studio (summer photo subject)

The Woods (limited collaboration — already has a partner)

Realtor Vertical

Vicki Wolpert — first paying realtor client, $500/mo, May 1 start

Paul Green Realty — broker-tier prospect, partner candidate for Deep South Directory

Other realtors — pipeline at $99 intro / $300–500/mo, price points TBD

Civic / Regional

City of Natchez — tourism and marketing partnership in development

Platform Architecture

Foundation

Sanity as the CMS underneath every tenant

Cloud PC for production runtime; staging environment likely needed (TBD)

Same tech stack across every property — marketing and social layers shared

Multi-Tenancy Model

Studio C / MBT operate at the operator level above the tenants

Tenants see only their own domains; shared resources sit underneath

A defined PRD per tenant sets baseline scope; feature requests funnel through professional services and bill accordingly

Build once, reuse across tenants — anything built for one client becomes available to others

The Directory Module

Concept

The directory is a containerized, reusable module within MBT. It functions as a multimedia contact directory — each entry is a rich entity with name, address, contact info, description, photos, video, floorplans, 3D models, and any other media associated with it.

It can be deployed as part of the front-end public offering or kept as a back-end operator tool. The choice is a per-project toggle, possibly per-entry within a project.

Per-Entry Anatomy

Identity: name, address, contact, hours

Media slots: photos, video, floorplan, 3D model, description

Affiliate hooks: links, codes, referral payload

Taxonomy: type, tags, region

Two Visibility Modes

Internal-only — operator-style tool (e.g., Vicki uses her directory to answer client questions)

External — published as a public directory site or section

Default proposal: internal-by-default, with publish-to-public as an opt-in

Content Acquisition

Tenant uploads (e.g., Vicki’s iPhone shots)

Studio C cleanup or re-shoot pipeline

Piggyback on existing shoots — when in Coxsackie or Hudson for other work, knock out 6 directory entries on the same trip. Real margin lever.

Monetization Layer

Affiliate links / Amazon Associates

Referral fees for lead-gen (contractors, restaurants)

Sponsor slots (the Deep South Directory architecture)

Transactional commissions

Affiliate logic should live as its own sub-module. Directory entries reference it. Logic lives once, not per tenant.

The Canonical Entity Store

One Master Database

Every entity — a plumber in Catskill, Ground Zero in Clarksdale, a production services company in Memphis, a contractor in Natchez — lives in one place, once. The MBT master entity store. Tenant-facing directories are filtered views on top of this single source of truth.

Three Orthogonal Axes per Entity

Ownership / contribution: who added it, who maintains it

Visibility: which tenant directories it appears in

Relationship: directory entry, vendor, partner, sponsor, client, affiliate — an entity can be several at once

What This Unlocks

Cross-tenant intelligence: data compounds as more tenants touch a shared entity

Easy promotion: directory entry → &quot;we should build something for them&quot; becomes a database query, not a memory exercise

Network effects for MBT itself — the platform gets more valuable per tenant added because the entity graph thickens

Clean affiliate attribution: one entity, one affiliate record regardless of how many directories surface it

Architectural Cautions

Dedup is the hard part. Same business entered by two tenants must resolve to one record. Manual review for now, fuzzy matching later.

Provenance: who added what, who edited what, whose photos are whose. Matters for licensing once photos get reused.

Visibility is not privacy. A contractor Vicki adds may not be appropriate to surface in a competing realtor’s directory. Default rule must be explicit — &quot;contributed by X, visible to X only&quot; vs. &quot;shared to commons.&quot;

Action Items

Entity Formation (priority)

Run NY name search for &quot;Measurably Better Things LLC.&quot; If unavailable, fall back to MBT LLC or a variant.

File the LLC. Articles, registered agent, EIN.

Draft and execute the operating agreement. Three members — Chase, Tracy, Amy. Real lawyer, not a template. Must cover splits, voting, capital, departure, and IP ownership.

Open a bank account in MBT’s name. Set up QuickBooks under the entity.

IP Language in the Operating Agreement (do not skip)

The agreement must explicitly state that MBT owns the platform IP — the directory engine, the canonical entity database, the Sanity architecture, and the Outsider Economics code. Not Chase personally. Not Studio C. Not Tuthill. Easy at formation, painful to fix later.

Vicki Wolpert — May 1 Deadline

$500/mo, custom service with add-on capacity

Front-end deliverables must be ready before May 1

Upstate Directory needs initial seeding: Catskill, Hudson, Coxsackie, Athens — restaurants, attractions, services, contractors, builders, handymen

Dispatch a research team to begin populating directory entries

Pre-Summer Working Sessions

Monday night: Chase, Amy, Tracy — lock the front-end story; back-end requirements doc flows from there for Elijah and Miles

Before Chase leaves for summer: meeting with Paul Green Realty (and ideally City of Natchez) to set up a conversation that can continue across the summer

Recording Studio Summer Project

Photo and video coverage of David Baron Studio, Clubhouse, Utopia, others

Single body of work, multiple distribution targets: Studio C marketing, Utopia/Bearsville channels, Bearsville campus broadcast, Recording Studio Magazine, coffee table book

Feeds parallel Big Muddy content stream throughout

Sponsor Slot Architecture (Deep South Directory + adjacent products)

One top slot per industry vertical per market: realtor/broker, regional bank, insurance, hospital

Local businesses subscribe at ~$500/mo to participate

Drives social activation and influencer pipeline

Open Decisions

Realtor product price points (final numbers needed before sales outreach beyond Vicki).

Directory product placement — are Deep South Directory and Upstate Directory MBT-branded products, Studio C deliverables, or white-labeled per realtor?

Default visibility rule for entity contributions — contributor-private vs. shared commons.

Governance for the Outsider Economics as the open-source offering inside a commercial entity — license, contribution model, who maintains.

Staging environment for the platform — confirm whether a separate cloud PC is needed alongside production.

Operating Notes for the Chief of Staff

HDI is dead language. Do not reference it in any future document or conversation. The frame is: MBT is the holding company and the platform; three-way partnership Chase / Tracy / Amy.

Studio C is production only going forward. Anything that smells like platform operations routes to Tuthill Design.

All client engagements are with MBT. Studio C and Tuthill are subcontracted by MBT for delivery.

The directory module and the canonical entity store are the architectural backbone of the platform. Treat them as Tier-1 IP — anything that touches them is a board-level decision once formation is complete.

