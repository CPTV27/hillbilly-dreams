# Optimization Anti-Goals

**Status:** What NOT to optimize for, stated explicitly.
**Last revised:** 2026-05-12

AI agents (and humans) naturally optimize toward generic-good-business defaults: scale, automation, completeness, feature expansion, growth, efficiency. Big Muddy explicitly rejects parts of that default. This file says what we are not optimizing for, so proposals can be filtered before they consume cycles.

---

## Do not optimize for

### Scale

- **Maximum attendee count** at events. The moat is 40–150 person intimate experiences. Anything proposing 500+ scale is wrong-shaped.
- **Geographic expansion** to multiple regions in Y1. Bearsville is deferred. Other regions are not on the menu.
- **Multi-tenant SaaS scale.** MBT-as-product is dead. The platform serves Big Muddy only.
- **Audience growth at the expense of audience quality.** A 100-person engaged audience > 10,000 disengaged followers.

### Enterprise complexity

- **Enterprise workflows for Tracy + Amy.** They are equity partners, not corporate operators. Tools should be ones they can learn in an afternoon.
- **Complex permissions systems** for a 3-partner team plus 2 partner studios. A shared Google Drive folder is usually the right answer.
- **Multi-stage approval flows** for routine decisions. The 3 partners coordinate by conversation, not by ticketing system.
- **CRM-like sophistication** for an artist roster of 4–6 acts. Asana free tier or a spreadsheet is sufficient.

### Venture scalability

- **Optimization patterns from VC-backed startups.** Big Muddy is not in that category. No fundraise; no exit pressure; no growth-at-all-costs.
- **Product-market-fit experiments.** Big Muddy is not a product company. The product is the ecosystem itself, which is operating with three real revenue inputs already.
- **Scaling content production** beyond what produces compounding value. Volume content (daily social posts, weekly podcasts, monthly drops) is anti-strategy unless the content compounds authority.
- **Optimization for investor narratives.** No investors. No board deck. No quarterly KPI dashboards in that sense.

### Daily content volume

- **Posting frequency** as a metric. One excellent piece per month > 30 mediocre pieces.
- **Always-on social presence.** Big Muddy is documentary-paced, not internet-paced.
- **Engagement-optimization tactics** that betray the documentary/cinematic voice.

### Large-team workflows

- **Tool selection optimized for 50-person teams.** Big Muddy is 3 partners + 2 partner studios = ~5 people max in the operating ring. Tools designed for scale are wrong-shaped.
- **Asynchronous documentation as primary communication.** The partners can pick up the phone. Coordination happens in conversation, documented after.
- **Project management methodologies** (Scrum, Kanban, OKRs at scale). Big Muddy uses Asana free tier as a shared task list, not as a methodology framework.

### 24/7 operational surfaces

- **Continuous monitoring and alerting** for systems that don't need it. The Inn has Cloudbeds; the website is Vercel-or-Squarespace; neither needs PagerDuty.
- **Real-time anything** unless the use case demands it. A Big Muddy Radio stream that goes down for 4 hours is not an emergency.
- **24/7 support coverage.** The Inn has a human (Tracy / Amy / staff); the platform has Vercel/Squarespace; that's enough.

### Maximum automation

- **Automating processes that happen 2–3 times per year.** Manual is fine for low-frequency events.
- **AI-generating content as a primary output.** AI assists; AI does not author the Big Muddy editorial voice.
- **Workflow automation** that requires Chase's maintenance time to keep working. The automation has to save more time than it costs.

### Completeness

- **Brand consistency across 14 domains.** We have 2–3 active. The other 11+ are redirects or parked.
- **Feature parity across modules.** Records doesn't need to match Touring's tooling.
- **Comprehensive analytics dashboards.** Native platform analytics (Cloudbeds reports, GA4, Spotify for Artists, Eventbrite) suffice. No custom analytics layer needed.
- **Polished beta versions** of new ideas. Acceptable incompleteness is doctrine.

### Founder-replacement automation

- **Trying to automate Chase out of the loop on strategic decisions.** The point is to free Chase's time, not to replace Chase's judgment.
- **Building systems that "could be handed off" to a future hire who doesn't exist.** Solve for the current 3-partner reality, not for a hypothetical 8-person team.

---

## How to use this list

If a proposal optimizes for anything on the "do not optimize for" list, **flag it before proposing.** The proposal isn't necessarily wrong, but it requires explicit justification for why this particular case is an exception.

Default behavior: reject proposals that fall into anti-goals without explanation. Suggest alternatives that align with the actual goals (cultural authority, simplicity, photography protection, Inn strengthening, BMT sustainability — see `OPERATING_DOCTRINE.md` evaluation rules).

---

## What we DO optimize for

For symmetry, the things we DO optimize for (per `OPERATING_DOCTRINE.md`):

1. **Cultural authority** — compounding regional reputation, narrative ownership, archive value
2. **Operational simplicity** — fewer tools, less surface area, simpler onboarding
3. **Photography revenue protection** — Chase's time goes here first
4. **Inn strengthening** — room nights, ADR, bar, repeat guests
5. **BMT sustainability** — cultural compounding + revenue trajectory
6. **Lifestyle preservation** — quality of life as the explicit ceiling

A proposal that scores high on these (and avoids the anti-goals) is well-aligned. Proceed.

---

## Connection to other doctrine

- `OPERATING_DOCTRINE.md` — the things we DO optimize for.
- `ENERGY_RULES.md` — why these anti-goals matter for Chase's time specifically.
- `SYSTEM_HIERARCHY.md` — which layers get to be priorities at all.

---

*If you find yourself optimizing for something not listed here as a goal or anti-goal, surface it. The list is incomplete; the principles are not.*
