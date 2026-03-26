---
sidebar_position: 7
title: "Federation, Not Scale"
---

# Federation, Not Scale

Every good thing I've ever been part of got ruined the same way: it got too big.

The band that was great at ten shows became a logistics nightmare at fifty. The neighborhood group that did block parties started holding committee meetings about the block parties. The small business that ran on trust and handshakes hired its fifteenth employee and suddenly needed an HR policy, a time clock, and a lawyer.

There's a number where every human organization flips from "this is working" to "this is a job." That number is somewhere around 100-150 people. After that, you stop knowing everyone's name. Trust becomes institutional instead of personal. The people who are good at meetings replace the people who are good at building things. And the thing you built starts acting like the thing you built it to replace.

I've watched this happen to cooperatives, churches, nonprofits, startups, and neighborhood associations. The pattern is so consistent it might as well be gravity.

So stop fighting it. Don't scale. Federate.

---

## The Dunbar Ceiling

Robin Dunbar is a British anthropologist who studied primate brain sizes and social group sizes. His finding: humans can maintain about 150 stable social relationships. Past that, we lose the ability to track who's reliable, who's trustworthy, who owes what to whom.

150 is a hard ceiling, not a soft suggestion. It shows up everywhere:

- Average size of a hunter-gatherer band: 100-150
- Average size of a military company: 80-150
- Average size of a Hutterite farming community before it splits: 150
- Average size of a functional church congregation: 150
- Gore-Tex (W.L. Gore & Associates) caps every factory at 150 people. When they need more capacity, they build another factory across the parking lot.

Gore-Tex figured this out in the 1960s. Bill Gore noticed that when a plant exceeded 150 workers, productivity dropped, communication broke down, and politics replaced problem-solving. His solution wasn't better management — it was smaller units. Two plants of 150 outperform one plant of 300, every time.

For coordination networks, the practical ceiling is lower — around 100 active members. That's because a task board network requires deeper trust than a workplace. You're exchanging labor directly, entering each other's homes, handling each other's finances. That requires knowing someone, not just knowing *of* them.

At 100 members, a task board network has:
- Enough skill diversity to handle most internal needs
- Enough social density that free riders get spotted
- Enough trust that the governance can stay informal
- 4,950 possible skill connections (Metcalfe's Law)

Past 100, you don't need a bigger network. You need a second one.

---

## How Federation Works

Federation is simple: instead of one big network, you have multiple small networks that coordinate with each other.

Each pod (I'm going to call them pods) maintains full internal autonomy. It has its own task board, its own points bank, its own governance, its own culture. Nobody outside the pod tells the pod what to do.

Between pods, there's a lightweight coordination layer. Not a hierarchy — a protocol. An agreement about how pods interact when they need something from each other.

Here's what that looks like in practice:

**Pod A** is in the north end of town. Twenty-five members. Strong in construction trades, landscaping, and auto repair. Weak in tech skills and bookkeeping.

**Pod B** is centered around the church on Oak Street. Thirty members. Strong in childcare, tutoring, event planning, and food service. Weak in hands-on trades.

**Pod C** is a group of small business owners who meet at the co-working space. Twenty members. Strong in marketing, web development, bookkeeping, and legal basics. Weak in everything that involves a wrench.

Internally, each pod handles its own exchanges. Gene in Pod A gets his taxes done by Linda in Pod A. Deb in Pod B coordinates childcare for the families in Pod B. The web developer in Pod C builds sites for the other businesses in Pod C.

But when Pod A needs a website and nobody in Pod A can build one, the request goes to the federation — a shared channel, a monthly meetup, a rotating delegate who checks with the other pods. Pod C picks it up. The web developer builds Pod A's site. Pod A banks the labor debt.

**Inter-pod exchange rate:** The simplest version is hour-for-hour between pods, same as within pods. Pod A owes Pod C ten hours of work for the website. Next month, when someone in Pod C needs a deck built, Pod A sends Marcus.

The pods don't merge. They don't share a bank. They don't answer to a central authority. They just have a way to talk to each other and a handshake agreement about how labor debts work across boundaries.

That's federation. Small units. Loose connections. Scale without centralization.

---

## Why This Beats Growing

Let me compare two scenarios.

**Scenario 1: One Big Network**

A coordination network grows from 20 to 200 members over two years. At 200 members, the following things are true:

- Most members don't know each other personally
- The task board is overwhelming — too many posts to track
- A governance committee has formed to manage disputes (because informal resolution doesn't work when people don't know each other)
- Subgroups have formed anyway — cliques, really — and they don't trust each other
- The founder is burning out trying to hold it together
- Someone has proposed bylaws

The network is now a small bureaucracy with all the dysfunction of the institutions it was built to route around. It will either collapse or calcify into something that looks suspiciously like a homeowners' association.

**Scenario 2: Three Federated Pods**

The same 200 people organized as three pods of ~65 members each, loosely federated. At this size:

- Everyone knows everyone in their pod
- Each pod's task board is manageable — 20-30 active posts at any time
- Disputes are resolved by people who know both parties
- Each pod has its own culture and rhythm — the church pod runs differently from the trades pod, and that's fine
- No single person has to hold it all together
- Inter-pod coordination happens through a monthly delegate meeting and a shared request channel

Same people. Same skills. Same total capacity. But the federated version has all the trust and simplicity of a small network with the resource depth of a large one.

The cost of federation is a small amount of coordination overhead between pods — the delegate meetings, the inter-pod request channel, the occasional awkwardness of working with someone you don't know well. That cost is trivial compared to the cost of trying to make 200 people function as a single social unit.

---

## The Internet Already Proved This

The internet is a federation.

It's not one big network run by one big company (despite what Facebook wants you to think). It's millions of small networks — ISPs, data centers, corporate intranets, home networks — connected by shared protocols. TCP/IP doesn't care what's on your network. It just defines how networks talk to each other.

No central authority decides what the internet does. No committee approves new networks joining. The protocol handles interoperability. Each network maintains its own rules, its own security, its own culture. And the whole thing scales to billions of devices without a single point of failure.

Email works the same way. Your email server talks to my email server using a shared protocol (SMTP). Neither server controls the other. Neither server needs permission from a central authority. The protocol handles it.

A federated coordination network works on the same principle. Each pod is a node. The inter-pod protocol (however simple — even just a group chat and a monthly meeting) handles communication between nodes. No central authority. No single point of failure. Scale through multiplication, not expansion.

This is the most resilient architecture ever invented. It's how ecosystems work. It's how the nervous system works. It's how every system that survived long enough to matter works.

Centralization is efficient. Federation is durable. Choose durable.

---

## When to Split

You'll know it's time to federate when:

- Board posts go unanswered for more than a week because nobody notices them
- The same three people are handling all the coordination work
- Disputes take more than one conversation to resolve because the parties don't know each other well enough
- Members start saying "the network" instead of "us"
- Someone suggests forming a committee

These are symptoms of exceeding Dunbar's number in a trust-based system. The fix isn't better management. The fix is division.

How to split:

1. **Let it happen naturally.** Clusters form on their own — the trades people, the church folks, the small business owners. Those clusters are your pods. Don't impose structure. Recognize the structure that's already there.

2. **Each cluster gets its own board.** The plumbers and electricians are already coordinating informally. Give them their own board. Same for the childcare network. Same for the business owners.

3. **Stand up the inter-pod channel.** A shared group chat. A monthly in-person meeting. One delegate from each pod who checks in with the others. Keep it light.

4. **Agree on inter-pod exchange rules.** Hour-for-hour is simplest. If Pod A does ten hours for Pod B, Pod B owes ten hours to Pod A. Track it on a shared sheet.

5. **Protect pod autonomy.** The pods don't report to each other. The federation doesn't vote on pod decisions. Each pod runs itself. The only shared agreement is the inter-pod exchange protocol.

The first time you split feels like losing something. It's not. It's the network growing up. Trees don't get stronger by making one trunk thicker — they branch.

---

## The Network of Networks

Scale this up one more level and you start to see something powerful.

Ten pods in a town. Each pod has 50-100 members. Total network: 500-1,000 people. Inter-pod federation handles cross-pod needs. Skill coverage across the federation is effectively comprehensive — whatever you need, someone in the network can do it.

Now connect that town's federation to the next town's federation. And the next. A county-level network of networked pods. Thousands of people, organized in human-scale units, connected by simple protocols.

This is how you build economic infrastructure that rivals corporate supply chains — without the corporation. A federated coordination network at county scale has more diverse skills, more local knowledge, and more trust density than any company. It just doesn't have a CEO. It doesn't need one.

I'm not being utopian. I'm describing what already exists in the Delta, just without the spreadsheet. People here have always operated in loose, federated networks — families, churches, neighborhoods, work crews. They just didn't call it federation, and they didn't track the value.

The spreadsheet is new. The pattern is ancient.

---

## Start This Week

**24 hours:** Look at your current network — formal or informal. Who are the clusters? The people who already coordinate naturally? You probably have two or three proto-pods forming without anyone naming them.

**7 days:** If your network is past 30 people, have a conversation about splitting into focused pods. Not a governance meeting — a conversation. "Hey, the trades guys are already doing their own thing. What if we made that official and set up a way to work across groups?"

**90 days:** If you've federated, track inter-pod exchanges for a quarter. How many cross-pod requests happened? How quickly were they filled? What skills are missing across the entire federation? That gap analysis tells you who to recruit next — not to your pod, but to the network.

Don't scale. Federate. Keep each unit small enough that trust is personal, then wire the units together. The network does what no single node can do alone, and no single failure can bring the network down.

That's not just good economics. That's good engineering.
