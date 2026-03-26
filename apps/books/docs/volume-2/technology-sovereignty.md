---
sidebar_position: 15
title: "Technology Sovereignty"
---

# Chapter 15: Technology Sovereignty

## Overview

Most coordination networks depend on corporate technology platforms (Google Sheets, WhatsApp, Trello, Dropbox) for their operational infrastructure. These platforms are owned by companies that read user data, sell attention, and retain the ability to terminate access at any time. As a network grows and the value flowing through it increases, control over tools becomes equivalent to control over the economy. This chapter defines a three-level graduated approach to technology sovereignty, identifies the three critical data assets to protect, and addresses the technical skills gap.

---

## The Default Dependency Stack

Most coordination networks run on the following by default:

| Function | Typical Tool | Owner |
|----------|-------------|-------|
| Communication | WhatsApp, iMessage, SMS | Meta, Apple, Carrier |
| Coordination | Google Sheets, Notion, Airtable | Google, Notion Inc., Airtable Inc. |
| Task management | Trello, Asana, shared docs | Atlassian, Asana Inc., Google |
| File storage | Google Drive, Dropbox, iCloud | Google, Dropbox Inc., Apple |
| Video calls | Zoom, Google Meet | Zoom Inc., Google |

Every tool listed above is a service not controlled by the network, hosted on servers not owned by the network, governed by terms of service not negotiated by the network. The network is building economic sovereignty on top of digital tenancy.

At small scale (under 15 members), this dependency carries negligible practical risk. At larger scales, it introduces a structural vulnerability that contradicts the network's core purpose.

---

## Three-Level Sovereignty Path

### Level 1: Aware

**Position:** Corporate tools are in use, but the network is conscious of the dependency and mitigates data loss risk.

**Actions:**

| Action | Implementation |
|--------|---------------|
| Monthly data export | Download Google Sheets as CSV. Export chat history. Back up files to local storage. If the service disappeared tomorrow, nothing would be lost. |
| Paper backup of critical data | Print the skills inventory, exchange ledger, and member list. Store in a physical binder. The binder works without WiFi. |
| Encrypted communication | Switch from WhatsApp (Meta reads metadata) to Signal (open-source, end-to-end encrypted, no data harvesting). This is a 5-minute installation per person. |

**Cost:** $0
**Difficulty:** Trivial
**Result:** Resilience against service interruption and data loss without changing workflow.

---

### Level 2: Hybrid

**Position:** Critical functions migrate to self-hosted or community-owned alternatives. Non-critical functions remain on corporate platforms.

**Actions:**

| Function | Self-Hosted Alternative | Notes |
|----------|------------------------|-------|
| Communication | Signal or Matrix | Signal is the easiest switch. Matrix is more powerful (federated, self-hostable, multi-room). Matrix requires one tech-comfortable member. |
| Coordination | Local spreadsheet or self-hosted Nextcloud | Nextcloud is open-source alternative to Google Drive: file storage, spreadsheets, calendars, contacts. Runs on a $150 mini-PC or $5/month VPS. Data stays on network-owned hardware. |
| Task board | Self-hosted kanban (Kanboard, WeKan, Planka) | Open-source tools that replicate Trello functionality. Hosted on network-controlled hardware. Setup takes one afternoon. |

**Cost:** $150-$300 for hardware, or $5-$10/month for a VPS
**Difficulty:** Moderate (requires one tech-comfortable member)
**Result:** Coordination data resides on network infrastructure. No corporate intermediary can access, sell, or terminate it.

---

### Level 3: Sovereign

**Position:** The entire coordination stack runs on community-owned infrastructure.

**Actions:**

| Function | Implementation | Hardware Cost |
|----------|---------------|--------------|
| Communication server | Matrix with self-hosted homeserver. Fully federated: network server communicates with other networks via open protocol. No central authority. | Included in compute hardware |
| Community mesh network | Local mesh WiFi providing internet-independent communication between members. Each node: $50-$100. If the ISP goes down, local communication continues. Documented deployments exist post-hurricane and in areas without broadband. | $50-$100 per node |
| Local-first software | Applications that work on devices first, sync when connected. Task board, exchange ledger, calendar all functional offline. | $0 (software) |
| Self-hosted AI tools | Small language models (e.g., Llama) running on local hardware for administrative tasks: drafting messages, analyzing exchange patterns, generating reports. No data leaves the network. | Mid-range computer (~$500-$800) |

**Cost:** $500-$1,500 total in hardware
**Difficulty:** Requires a dedicated tech member or a member willing to learn
**Result:** Complete technology sovereignty. Coordination stack runs on owned hardware, controlled software, and protocols that cannot be externally terminated.

---

## The Three Sovereign Assets

Not everything requires self-hosting. Focus sovereignty efforts on three critical data assets:

| Asset | Contents | Why It Matters |
|-------|----------|---------------|
| **Member list** | Names, skills, contact information | Most sensitive network data. If stored on Google's servers, Google has access. Keep local. |
| **Exchange ledger** | Every transaction, hour, and exchange | Economic history with tax, governance, and trust implications. Own it. |
| **Communication channel** | Member-to-member conversations | If routed through a corporate platform, that platform can read, sell, or terminate it. Use encrypted, self-hosted, or federated communication. |

Everything else (recipe collections, event flyers, meeting notes) can remain on convenient platforms. The member list, ledger, and communications are sovereign assets. Treat them accordingly.

---

## Addressing the Technical Skills Gap

Every network requires at least one member capable of basic systems administration. Two approaches to filling this gap:

### Approach 1: Recruit

Every town has someone with computer skills who is underemployed. This person is the most valuable potential network member. Recruit explicitly: offer access to every skill in the network in exchange for maintaining the tech stack.

### Approach 2: Develop

The required skills are simpler than most assume:
- Nextcloud on a mini-PC: ~2 hours with a tutorial
- Matrix server: one afternoon
- Mesh node: plug in a router and follow instructions

If a network member can change their own oil, they can learn to run a server. Once one network builds the stack, documentation can be shared with federated networks so subsequent deployments do not start from scratch.

---

## Implementation

### 24 Hours
1. Export all current coordination data.
   - Download the Google Sheet as CSV
   - Save chat history
   - Verify: if Google shut down the account tomorrow, would anything be lost?
   - If yes, create local copies of all critical data today.

### 7 Days
1. Switch the network's primary communication to Signal.
   - Installation: 5 minutes per person
   - Group chat functions identically
   - Meta can no longer read coordination conversations

### 90 Days
1. If a tech-comfortable member exists: set up Nextcloud on a mini-PC or VPS.
2. Migrate the task board, exchange ledger, and member directory to network-owned infrastructure.

---

## Checklist

- [ ] All coordination data exported to local storage (CSV, chat logs, files)
- [ ] Paper backup created for member list, exchange ledger, and skills inventory
- [ ] Primary communication switched to Signal (or Matrix)
- [ ] Critical data assets identified (member list, ledger, comms)
- [ ] Current sovereignty level assessed (Aware / Hybrid / Sovereign)
- [ ] Target sovereignty level selected
- [ ] Tech-capable member identified or recruitment plan created
- [ ] Nextcloud or equivalent self-hosted platform evaluated
- [ ] Monthly data export schedule established
- [ ] For networks at Level 3: mesh network feasibility assessed
- [ ] Documentation created for tech stack to share with federated networks

---

## Key Figures

| Metric | Value |
|--------|-------|
| Level 1 (Aware) cost | $0 |
| Level 2 (Hybrid) hardware cost | $150-$300 |
| Level 2 (Hybrid) VPS cost | $5-$10/month |
| Level 3 (Sovereign) hardware cost | $500-$1,500 |
| Mesh network node cost | $50-$100 per node |
| Nextcloud setup time | ~2 hours with tutorial |
| Matrix server setup time | ~1 afternoon |
| Signal migration time per person | 5 minutes |
| Critical sovereign assets | 3 (member list, exchange ledger, communication channel) |
