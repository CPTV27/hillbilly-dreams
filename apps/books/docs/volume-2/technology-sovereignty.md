---
sidebar_position: 15
title: "Technology Sovereignty"
---

# Technology Sovereignty

You built a coordination network to stop sending your money to corporations. Then you put the whole thing on Google Sheets, coordinated through WhatsApp, and communicated on Gmail.

You see the problem.

Every tool I've recommended so far — Google Sheets, group chats, shared calendars — is owned by a company that reads your data, sells your attention, and can shut you off whenever they want. You built an economy without an off switch and then plugged it into someone else's infrastructure that absolutely has one.

At five members, this doesn't matter. Use whatever works. But as your network grows and the value flowing through it increases, the question of who controls your tools becomes the same question as who controls your economy.

---

## The Dependency Stack

Here's what most coordination networks run on by default:

- **Communication:** WhatsApp (Meta), iMessage (Apple), or SMS (your carrier)
- **Coordination:** Google Sheets, Notion, or Airtable (all cloud services, all corporate)
- **Task management:** Trello, Asana, or a shared doc (same story)
- **File storage:** Google Drive, Dropbox, iCloud
- **Video calls:** Zoom, Google Meet

Every one of these is a service you don't control, hosted on servers you don't own, governed by terms of service you didn't read. You're building economic sovereignty on top of digital tenancy.

Again — at small scale, this is fine. Google isn't going to shut down your fifteen-person neighborhood task board. But the principle matters: if your entire coordination infrastructure depends on tools you don't own, your network has a dependency that undermines the thing you're building.

---

## The Graduated Approach

I'm not going to tell you to set up a Linux server in your garage on day one. That's how you ensure nobody in your network talks to you again.

Instead, here's a graduated path from full dependency to meaningful sovereignty. Move at whatever speed your group can handle.

### Level 1: Aware (Where Most Networks Start)

You use corporate tools but you're conscious of the dependency.

**Actions:**
- **Export everything monthly.** Download your Google Sheet as a CSV. Export your chat history. Back up your files locally. If the service disappeared tomorrow, you'd lose nothing.
- **Keep a paper backup of critical data.** The skills inventory, the exchange ledger, the member list — print it. Put it in a binder. The binder works when the WiFi doesn't.
- **Use end-to-end encryption for sensitive communication.** Switch from WhatsApp (Meta reads metadata) to Signal (open-source, encrypted, no data harvesting). This is a five-minute change that dramatically reduces your exposure.

**Cost:** $0
**Difficulty:** Trivial
**What it gets you:** Resilience against service interruption and data loss, without changing your workflow.

### Level 2: Hybrid (Where Growing Networks Should Aim)

You start replacing corporate tools with self-hosted or community-owned alternatives for critical functions.

**Actions:**
- **Communication: Signal or Matrix.** Signal is the easiest switch — it works like any messaging app, it's encrypted, and it's free. Matrix is more powerful (federated, self-hostable, supports multiple rooms and channels) but requires someone who's comfortable with tech setup. Either way, you've moved your communication off corporate surveillance infrastructure.

- **Coordination: A local spreadsheet or self-hosted Nextcloud.** Nextcloud is the open-source alternative to Google Drive — file storage, shared spreadsheets, calendars, contacts. You can run it on a $150 mini-PC in someone's closet or on a $5/month VPS. Your data stays on your hardware.

- **Task board: A simple web app on your own server.** There are a dozen open-source kanban tools (Kanboard, WeKan, Planka) that do exactly what Trello does, hosted on hardware you control. Setup takes an afternoon if someone in your network knows basic tech. If nobody does — that's a skill gap your network should recruit for.

**Cost:** $150-300 for hardware, or $5-10/month for a VPS
**Difficulty:** Moderate (needs one tech-comfortable member)
**What it gets you:** Your coordination data on your infrastructure. No corporate intermediary can shut it off, read it, or sell it.

### Level 3: Sovereign (Where Mature Networks Go)

Your entire coordination stack runs on community-owned infrastructure.

**Actions:**
- **Self-hosted communication server.** Matrix with your own homeserver. Fully federated — your server talks to other networks' servers using an open protocol. No central authority. No corporate dependency.

- **Community mesh network.** For the ambitious: a local mesh WiFi network that provides internet-independent communication between network members. Hardware cost: $50-100 per node. If the ISP goes down, your local communication stays up. Communities have built these after hurricanes and in areas with no broadband. The technology exists and it's not complicated — it's just routers configured to talk to each other.

- **Local-first software.** Applications that work on your devices first and sync when connected, rather than requiring an internet connection to function. Your task board, your exchange ledger, your calendar — all functional offline, all syncing when they can. This means your coordination infrastructure works even when the internet doesn't.

- **Self-hosted AI tools.** Small language models running on local hardware for administrative tasks — drafting messages, analyzing exchange patterns, generating reports. Not ChatGPT (that's a corporate dependency). Local models like Llama running on a mid-range computer. Your data never leaves your network.

**Cost:** $500-1,500 in hardware
**Difficulty:** Requires a dedicated tech person or a member willing to learn
**What it gets you:** Complete technology sovereignty. Your entire coordination stack runs on hardware you own, using software you control, communicating through protocols that can't be shut off.

---

## The Tech Person Problem

"But nobody in my network knows how to set up a server."

I hear this a lot. Two responses:

**1. Recruit one.** Every town has someone who's good with computers and underemployed. That person is the most valuable potential member of your network, and they don't know it yet. A systems administrator who can set up and maintain your tech stack is worth their weight in coordinated labor. Recruit them explicitly: "We need someone who can run our infrastructure. In exchange, you get access to every skill in the network."

**2. It's simpler than you think.** Setting up Nextcloud on a mini-PC takes about two hours with a tutorial. Installing a Matrix server takes an afternoon. Running a mesh node requires plugging in a router and following instructions. This isn't enterprise IT — it's home networking with a purpose. If someone in your network can change their own oil, they can learn to run a server.

The tech sovereignty path is a skill development opportunity, not a barrier. And once one network builds the stack, they can document it and share it with the federation — so the next network doesn't start from scratch.

---

## What to Protect

Not everything needs to be self-hosted. Focus your sovereignty efforts on three things:

**1. The member list.** Who's in your network, what they can do, and how to reach them. This is the most sensitive data you have. If it lives on Google's servers, Google has it. Keep it local.

**2. The exchange ledger.** Every transaction, every hour, every exchange. This is the economic history of your network. It has tax implications, governance implications, and trust implications. Own it.

**3. The communication channel.** How your members talk to each other. If this runs through a corporate platform, that platform can read it, sell it, or shut it down. Use encrypted, self-hosted, or federated communication.

Everything else — your recipe collection, your event flyers, your meeting notes — can live on whatever platform is convenient. Don't let perfect be the enemy of functional. But the member list, the ledger, and the comms — those are sovereign assets. Treat them accordingly.

---

## Start This Week

**24 hours:** Export your current coordination data. Download the Google Sheet. Save the chat history. Make sure you have a local copy of everything critical. If Google shut down your account tomorrow, would you lose anything? If yes, fix that today.

**7 days:** Switch your network's primary communication to Signal. It takes five minutes per person to install. The group chat works the same way. The difference is that Meta can no longer read your coordination conversations.

**90 days:** If you have a tech-comfortable member, set up Nextcloud on a mini-PC or a cheap VPS. Move your task board, exchange ledger, and member directory to your own infrastructure. When you log in and see your data on your hardware, the sovereignty goes from abstract to concrete.

You're building an economy nobody can turn off. Make sure the tools you're building it with can't be turned off either.
