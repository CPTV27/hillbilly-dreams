---
sidebar_position: 5
title: "The Task Board"
---

# Chapter 5: The Task Board

## Overview

The task board is the minimum viable infrastructure for a coordination economy. It consists of three columns — NEED, CAN DO, DONE — deployed on any medium from a physical whiteboard ($11 at a hardware store) to a shared spreadsheet. The task board solves exactly one problem: information failure. Communities do not lack skills or needs. They lack visibility into what skills exist and what needs are outstanding. The task board makes the invisible visible. That single function is sufficient to unlock the coordination premium documented in Chapters 1-3. This chapter covers three implementation tiers, governance design, maturity indicators, and common objections with data-based responses.

---

## The Information Failure Problem

The primary barrier to coordination in small communities is not skill scarcity, resource scarcity, or trust deficit. It is information failure.

A resident who can rebuild a carburetor lives three houses from a resident who paid a shop $380 for that service last month. The carburetor owner needed help moving a piano and paid $200 to strangers from an online listing — unaware that the mechanic three doors down owns a truck and would have helped in exchange for the carburetor work.

| Transaction | Cost Paid | Alternative Cost (within network) | Value Lost to Information Failure |
|------------|-----------|----------------------------------|----------------------------------|
| Carburetor rebuild | $380 | $0 (direct exchange) | $380 |
| Piano move | $200 | $0 (direct exchange) | $200 |
| **Total** | **$580** | **$0** | **$580** |

$580 exited two households for no reason other than the absence of a visibility mechanism. No skill was missing. No resource was missing. Information was missing.

### The Uber Precedent

Uber did not invent driving or the need for rides. Uber made drivers visible to riders and riders visible to drivers. That visibility function — connecting existing supply to existing demand — was valued at $150 billion at IPO.

A task board performs the identical function for a local skill network, without the 30% platform commission, surge pricing, venture capital dependency, or exploitative labor classification.

---

## Three Implementation Tiers

Select the tier that matches the network's size and communication habits. The format is irrelevant. The visibility is the product.

### Tier 1: Physical Board

**Configuration:** A whiteboard mounted in a location the network visits regularly — a garage, church fellowship hall, coffee shop back room, or community center.

**Structure:** Three columns of removable notes (Post-its or index cards).

| Column | Content |
|--------|---------|
| NEED | Requests with descriptions. Example: "AC blowing warm — need someone to diagnose." |
| CAN DO | Offers with availability. Example: "Electrician — available Saturdays." |
| DONE | Completed exchanges, moved from the other columns. |

**Optimal group size:** 5-20 people who interact regularly in person.

**Advantage:** Zero technical friction. Zero technology dependency. No accounts, logins, or terms of service.

**Limitation:** Requires physical presence to view and update the board.

### Tier 2: Shared Spreadsheet

**Configuration:** A Google Sheet or Airtable base shared with the network via link.

**Structure:** Four columns.

| Column | Content |
|--------|---------|
| NEED | Request description |
| CAN DO | Offer description |
| WHO | Name and contact information of the poster |
| DONE | Completed exchanges with date |

**Optimal group size:** 10-50 people.

**Advantage:** Accessible from any device. Supports filtering by category, sorting by date, and keyword search. The WHO column builds accountability — when a name is attached to a commitment, follow-through rates increase.

**Limitation:** Requires one person to maintain the sheet — removing stale entries, prompting status updates, preventing the sheet from becoming a junk drawer.

### Tier 3: Group Channel

**Configuration:** A dedicated channel in the network's existing communication platform — group text, WhatsApp, Discord, or Slack.

**Structure:** Two posting conventions plus a completion protocol.

| Convention | Format |
|-----------|--------|
| Request | `[NEED]` followed by description |
| Offer | `[CAN DO]` followed by description |
| Completion | Reply with `[DONE]` and a one-line summary |

**Optimal group size:** 15-100 people.

**Advantage:** Lowest-friction digital option. Meets participants in a tool they already use. No additional app installation or account creation.

**Limitation:** Signal-to-noise degradation if the channel fills with non-task conversation. Mitigation: enforce strict separation between the task channel and a separate conversation channel.

### Tier Selection Guide

| Network Profile | Recommended Tier |
|----------------|-----------------|
| 5 neighbors who see each other at the mailbox | Tier 1 (Physical Board) |
| 30-person church group across two counties | Tier 2 (Shared Spreadsheet) |
| 50+ people already active in a group chat | Tier 3 (Group Channel) |

Upgrade between tiers as the network grows. No migration is required — all three tiers can operate simultaneously if the network spans multiple communication contexts.

---

## Governance Design

### The Pricing Question

The most common governance question: how to determine the relative value of an hour of plumbing versus an hour of tutoring.

This is the wrong question. The task board does not set prices. It connects needs to skills. The terms of any exchange are determined by the two parties involved.

Two pricing models are in common use:

**Model A: Hour-for-Hour.** One hour of any skill equals one hour of any other skill. The plumber's hour equals the tutor's hour equals the babysitter's hour.

This model appears unfair when evaluated against market pricing — a plumber's market rate exceeds a babysitter's. Inside the network, however, the relevant question is not market value. The relevant question is: did both parties get what they needed? If the plumber needs tutoring and the tutor needs plumbing, an hour-for-hour exchange satisfies both needs regardless of the market rate differential.

**Model B: Points/Banking System.** Hours contributed are banked as credits. Hours received are debited. A participant who contributes 10 hours in a given month can draw 10 hours of other participants' skills in any subsequent period.

This model adds flexibility — direct swaps are not required — and creates a lightweight internal economy without money.

| Model | Simplicity | Flexibility | Scaling |
|-------|-----------|-------------|---------|
| Hour-for-hour | High | Low (requires direct swap) | Limited |
| Points/banking | Medium | High (deferred exchange) | Better |

Start with hour-for-hour. Switch to points/banking if direct swaps become logistically difficult.

### Dispute Resolution

Two parties talk to each other. If they cannot resolve the dispute, they select a third network member to mediate. No committee. No bylaws. No formal process.

### Free Rider Detection

The board is visible. If a participant consistently takes without offering, the pattern is observable to all network members. Social accountability in a network of 20-100 people is more effective than any written policy. One bad actor in a twenty-person network has nowhere to hide.

### Quality Control

Reputation. If a participant performs substandard work, the recipient reports it to the network. In a twenty-person network, one negative report has significant consequences because the reputational audience is the entire market. This provides more accountability than consumer review platforms, which operate on anonymous feedback in networks too large for individual reputation to carry weight.

---

## Maturity Indicators

A task board progresses through three observable stages.

### Stage 1: Adoption (Months 1-2)

The board is used deliberately. Participants post needs and offers with conscious effort. Exchanges are formal — posted, matched, completed, logged.

**Metrics:**
- 3-5 exchanges per week
- 5-15 active participants
- DONE column growing slowly

### Stage 2: Integration (Months 3-6)

The board becomes habitual. Participants check it as part of their routine. Exchanges begin occurring outside the formal board structure — people who met through the board now coordinate directly.

**Metrics:**
- 10-20 exchanges per week
- 15-30 active participants
- Clusters forming (recurring collaborations between specific participants)
- Standing offers appearing ("Any Saturday — available for any project needing extra hands")

### Stage 3: Infrastructure (Month 6+)

The board feels less like a system and more like a neighborhood. Participants notice needs they would not have noticed before. The board has changed how participants think about their community — from a collection of individuals to an inventory of capabilities.

**Metrics:**
- 20+ exchanges per week
- 30-100 active participants
- Long DONE column functioning as trust evidence
- Cross-referral networks emerging (participants connecting each other's external clients)
- Informal sub-teams operating as crews for recurring project types

The DONE column is the critical psychological mechanism. Every completed exchange is empirical evidence that the system works — evidence that neighbors are reliable, that needs can be met without writing a check to a stranger. A long DONE column converts skeptics faster than any argument.

---

## Objection Responses

### "People here don't trust each other."

Trust is not a prerequisite for a task board. Trust is a product of a task board. Three successful exchanges between two participants establish empirical evidence of reliability. Trust follows from demonstrated competence and follow-through, not from prior social affinity.

### "Nobody has time."

Participants currently spend time on activities a network could handle more efficiently (Chapter 3: 40% of self-employed working time goes to non-skill overhead). The task board does not require additional time. It redirects time currently wasted on individual overhead toward higher-value coordinated activity.

### "We already tried a community thing and it failed."

Task boards fail when they are treated as community organizations, nonprofits, cooperatives, or movements — structures that require committees, bylaws, officers, and meetings. A task board is a whiteboard with three columns. It fails when a committee is placed on top of it. It succeeds when Post-it notes are placed on it.

### "Our town is too rural / too urban / too poor / too small."

This objection is the capital assumption (Chapter 1) repackaged. The claim that coordination requires money, population density, or infrastructure is empirically false. A task board requires visibility. A whiteboard provides visibility. The population density of the surrounding area is irrelevant to whether a network of 20 people can exchange skills.

---

## Implementation

1. **Deploy the board.** Select a tier. Tier 1: purchase a whiteboard and Post-its. Tier 2: create a shared Google Sheet with four columns (NEED, CAN DO, WHO, DONE). Tier 3: create a dedicated group channel with posting conventions. Time required: under 30 minutes.

2. **Seed with five participants.** Do not launch with twenty. Start with the five people who would be contacted if pipes burst at midnight. These are the highest-trust relationships. They are the founding kernel.

3. **Post first.** The person who deploys the board posts the first NEED and the first CAN DO. An empty board will remain empty. A board with one post invites a second post.

4. **Share with five people.** Message each of the five participants individually: "Post one thing you need and one thing you can do. See what happens."

5. **Log completions.** Every completed exchange moves to DONE with a one-line description and an estimated market value. The DONE column is the system's proof of concept.

6. **Expand at month three.** After 90 days of operation, add five more participants. Then five more. The math scales. The trust compounds. The board does the rest.

---

## Checklist

- [ ] Implementation tier selected (Physical Board / Shared Sheet / Group Channel)
- [ ] Board deployed with three columns (NEED, CAN DO, DONE)
- [ ] Five founding participants identified and contacted
- [ ] First NEED posted by board creator
- [ ] First CAN DO posted by board creator
- [ ] All five participants have posted at least one item each
- [ ] First exchange completed and logged in DONE column
- [ ] Market value of first exchange estimated and recorded
- [ ] 30-day exchange count tracked
- [ ] 90-day cumulative value calculated
- [ ] Expansion plan in place (next five participants identified)
- [ ] Communication separation established (task channel vs. conversation channel, if using Tier 3)

---

## Key Figures

| Figure | Value | Source/Derivation |
|--------|-------|-------------------|
| Cost of physical whiteboard | $11 | Hardware store retail price |
| Uber IPO valuation (visibility function) | $150 billion | IPO filing, 2019 |
| Information failure example (two households) | $580 | Carburetor ($380) + piano move ($200) |
| Tier 1 optimal group size | 5-20 | Physical proximity constraint |
| Tier 2 optimal group size | 10-50 | Spreadsheet maintenance capacity |
| Tier 3 optimal group size | 15-100 | Signal-to-noise threshold |
| Stage 1 exchange rate | 3-5/week | Months 1-2 |
| Stage 2 exchange rate | 10-20/week | Months 3-6 |
| Stage 3 exchange rate | 20+/week | Month 6+ |
| Deployment time | Under 30 minutes | Any tier |
| Founding participant count | 5 | Minimum viable trust kernel |
| Expansion increment | 5 participants | Added at 90-day intervals |
