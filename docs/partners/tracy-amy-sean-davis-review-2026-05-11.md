# Sean Davis Partnership — Material for Tracy & Amy Review

**Date:** 2026-05-11
**From:** Chase
**To:** Tracy, Amy
**Status:** Fact pack for joint partner decision. No recommendation taken.
**Companion documents:**
- `sean-davis-bmt-partnership-2026-05-11.md` — the full partnership framework
- `sean-davis-venue-database-2026-05-11.md` — the corridor venue map
- `sean-davis-bmt-agreement-DRAFT-2026-05-11.md` — example draft agreement for the proposed Season One arrangement
- `~/Documents/sean-davis-bmt-brief-2026-05-11.pdf` — the polished PDF currently drafted for Sean
- `infrastructure-cost-analysis-2026-05-11.md` — current ecosystem cost picture
- `infrastructure-cost-reduction-analysis-2026-05-11.md` — where the savings are (~$150–400/mo realistic; full deep-dive)

---

## 1. The situation

Sean Davis — manager of Doug Duffy and Badd (one month into the role), year-round Natchez resident, ex-director of the Arcade Theater at the Delta Music Museum in Ferriday — wants to combine forces with Big Muddy Touring. We had one working meeting on 2026-05-11.

A full partnership framework is drafted (see companion docs). Before that goes to Sean, this fact pack is for both of you to review jointly with Chase and decide whether and how to proceed.

The draft frames Season One as **non-exclusive, project-based collaboration** through the remainder of the Big Muddy season + a co-programmed Arcade season. Concrete terms of the proposed arrangement are in the example agreement (companion doc).

## 2. Facts about Sean

- Manager of Doug Duffy and Badd, started ~April 2026 (approximately one month into the role).
- 5 years as director of the Arcade Theater / Delta Music Museum, Ferriday LA. Knows the building, the board, the friends-of org, the local sponsorship pipeline.
- Background in politics.
- Lives in Natchez year-round. Does not migrate to NY in summer.
- Recently played the Big Muddy Inn with Doug Duffy and Badd; has direct experience with the venue and crew.

## 3. Facts about what is being proposed (Season One)

- **Term:** through the end of Big Muddy season (rough alignment with the Arcade season, 6–8 shows).
- **Structure:** non-exclusive, project-based collaboration. No employment, no equity, no fixed retainer.
- **Three working tracks:**
  - Doug Duffy and Badd promo — Sean as manager of record; BMT provides radio rotation, Records promo signing, Inn dates, Arcade dates.
  - Arcade Theater season — Sean leads on the Friends-of-the-Arcade relationship, local logistics, sponsorship; BMT handles booking, talent flow, ticketing, cross-promo with the Inn.
  - Other acts Sean brings — Sean scouts; BMT evaluates against the artist-first promo signing criteria.
- **Compensation:** per-show economics. P&L per Arcade show. Split TBD per show based on who carried what.
- **Records signing:** Doug Duffy and Badd would be offered a non-exclusive promotional signing on Big Muddy Records (artists keep masters; no distribution lock-in; one-page promo signing terms TBD with counsel).
- **Records masters:** artists retain.
- **Exclusivity:** none, in either direction.
- **Post-Season-One:** the draft memo deliberately does not foreclose any specific structure. Four illustrative shapes are listed (extended project-based / operating role / revenue share / principal in a future BMT LLC) as a menu, not a commitment.

Full terms in the example agreement (companion doc).

## 4. Facts about what Sean unlocks for BMT

These are concrete capabilities the partnership would add that BMT does not have on its own:

- **Year-round Natchez operational presence** during May–October when Chase is in the Hudson Valley.
- **Access to the Arcade Theater** — 300-cap room, 15 min from Natchez, $450 venue rent ($225 with Friends of the Arcade sponsorship).
- **A managed touring act** (Doug Duffy and Badd) added to the existing artist roster.
- **Local sponsor and board relationships** in Ferriday (Friends of the Arcade, Delta Music Museum board).
- **Org-design capacity** from Sean's political-background experience.

## 5. Facts about what the partnership would cost BMT and the Inn

**Time:**
- Chase: weekly check-ins, joint show-planning, calendar coordination. Estimated 4–6 hrs/week during Season One.
- Amy: Arcade season programming alignment with the Inn calendar. Estimated 2–3 hrs/week during active booking, less during execution.
- Tracy: biz dev surface coordination — overlap on sponsor/partner relationships.

**Money:**
- Zero added cost to MBT under the proposed Season One structure.
- Zero added cost to the Inn.
- Sean's compensation is per-show, paid out of show revenue.

**Process:**
- A one-page non-exclusive promo signing terms document needs to be drafted with counsel before any Records signing is real. Cost: counsel time.
- An entity-level decision on which entity carries BMT operations when Sean signs (current state: BMT is a DBA under MBT; long-term plan is a BMT LLC).

**Calendar:**
- 6–8 Arcade dates need to align with Inn programming windows without compromising Inn revenue. Coordination overhead during booking.

**Inn calendar exposure:**
- Sean, as a non-equity collaborator, would have visibility into the touring side of the Inn calendar to coordinate shows. Bleed of operational information is possible.

## 6. Facts about the ecosystem cost picture

Companions: `infrastructure-cost-analysis-2026-05-11.md` (current state) + `infrastructure-cost-reduction-analysis-2026-05-11.md` (where the savings are).

### Current state
- Current MBT software + infrastructure spend: ~$740–1,005/mo (~$9k–12k/yr).
- The $1,000/mo hard cap in THE_THESIS is intact.
- The Sean partnership adds zero infrastructure cost in Season One.

### Cost reduction analysis (just completed, 2026-05-11)
- A separate analysis identifies ~**$150–400/mo of realistic 90-day savings** (20–40% of current spend), with potential to land at ~$450–800/mo by Q4 (a 30–50% cut from today).
- **Easy this-week cuts** (~$60–148/mo): cancel deprecated Google Workspaces (already on May 15 list), cancel ChatGPT API + Perplexity API if usage is low, drop duplicate Adobe Photography plan, audit unused Cloud SQL instance.
- **The single largest strategic question:** the Big Muddy Radio audio infrastructure stack (DigitalOcean AzuraCast + Buzzsprout + ElevenLabs + Restream) costs $70–140/mo. Per CANONICAL_INFRASTRUCTURE the stream's SSL is still broken, meaning it isn't publicly polished yet. A "freeze the radio stack until audience milestones are hit" decision would save the full cluster + eliminate a whole operational layer.
- **What's NOT being recommended for cut:** Claude Max, Adobe CC for Elijah, Cloudbeds, Google Workspace Ultra, Vercel Pro, Tracy and Amy's Claude Pro accounts, Bitwarden Family, Spotify Family. These are load-bearing or partner-decision-only.

### Which cost decisions need partner input
- The Big Muddy Radio freeze decision (see §9 item 7) — strategic, partner-level.
- All other cost cuts are tactical and operational. Chase is driving those decisions directly (audit pre-flights, then cuts).

## 7. Risks (factual, not weighted)

- Sean is one month into managing his first artist. His own role as a manager is still establishing.
- Sean is the ex-director of the Arcade Theater. The Friends of the Arcade relationship runs through him personally. If the arrangement turns sour, the venue access likely goes with him.
- Doug Duffy has not been at any meeting. Sean represents him; the artist himself has not consented to a Records signing or radio rotation.
- A non-exclusive promo signing document does not exist yet. Without it, "Big Muddy Records" is interpreted by each artist's counsel.
- Entity formation status: BMT operates as a DBA under MBT. Whichever entity carries BMT operations when Sean signs is what the agreement is on. FarleyPierson LLC is closing.
- The draft framework memo does not foreclose any specific structure for what comes after Season One — including a future equity stake — listed as one of four illustrative shapes in a "business model options" section.

## 8. Facts about exit / wind-down

If Season One ends and we choose not to continue:

- No cap-table exposure to unwind.
- No retainer or salary to terminate.
- Doug Duffy and Badd would have received some Big Muddy Radio + Records promo work under a non-exclusive arrangement — there is no clawback mechanism in a non-exclusive promo signing.
- Inn / Arcade calendar coordination overhead goes to zero.
- One season of operational reps stays with BMT regardless of outcome.

## 9. Decision points

Yes / no / "let's talk" on each. Mark up directly. Items 1–6 are Sean Davis decisions; items 7–8 are cost decisions surfaced by the cost reduction analysis (§6).

### Sean Davis decisions

| # | Decision point | What approving commits BMT to | What declining means | Tracy | Amy |
|---|---|---|---|---|---|
| 1 | Approve Sean as a Season One project-based collaborator (per the draft framework + example agreement)? | Per the example agreement: Season One scope, non-exclusive, no equity, per-show economics. | Sean is informed BMT does not want to proceed. No relationship established. | | |
| 2 | Approve a Big Muddy Records non-exclusive promo signing for Doug Duffy and Badd? | A signed promo-signing one-pager (TBD with counsel). No masters change hands. Non-exclusive. | Sean is informed BMT does not extend a promo signing. The rest of the collaboration can still proceed without it. | | |
| 3 | Approve co-programming 6–8 Arcade shows aligned with the Inn calendar? | Amy retains veto on specific dates. Each show stands on its own P&L. | Sean is informed BMT does not want to program the Arcade season. The rest of the collaboration can still proceed without it. | | |
| 4 | Approve the draft framework memo's "Phase 2 — After Season One" framing, which lists four illustrative future shapes including "principal in a future BMT LLC"? | The memo Sean reads will say a future equity stake is one of four possible shapes, with no commitment to any. | The memo to Sean will explicitly remove equity / principal-in-BMT-LLC from the list of post-Season-One shapes. | | |
| 5 | Approve Sean's name appearing as a public-facing collaborator credit on `bigmuddytouring.com/circuit` once #1 is approved? | "Maintained by Big Muddy Touring with Sean Davis" footer on the venue directory page. | No public mention of Sean as a collaborator on BMT properties. | | |
| 6 | Anything to add to or modify in the risks list (§7) or facts in §3–5? | The framework + example agreement get updated before Sean sees them. | — | | |

### Cost reduction decisions

| # | Decision point | What approving commits BMT to | What declining means | Tracy | Amy |
|---|---|---|---|---|---|
| 7 | **Freeze the Big Muddy Radio audio infrastructure stack (AzuraCast + Buzzsprout + ElevenLabs + Restream, ~$70–140/mo) until audience milestones are hit?** | Cancel or pause the audio stack subscriptions. Big Muddy Radio output goes to Spotify playlists / SoundCloud as a placeholder. Delta Dawn voice falls back to GCP TTS Journey. Resumes when an audience milestone is met. | The stack stays active. Production cadence and SSL fix on the AzuraCast stream become real action items, not deferred ones. ~$70–140/mo continues. | | |
| 8 | Anything to add to or modify in the cost reduction findings (§6) or weigh in on other cuts not listed here? | Cost reduction analysis is updated before any cuts are actioned. | — | | |

## 10. Open questions that need answers before this advances

- Confirm Sean's Arcade rent figures with the Museum directly ($450 / $225 sponsored).
- Confirm the sponsoring org's exact name (Friends of the Arcade or otherwise).
- Counsel to bless the entity that signs with Sean (BMT DBA under MBT today; future BMT LLC).
- Counsel to draft the one-page non-exclusive promo signing terms.
- Decide whether Tracy and Amy want to meet Sean before the framework goes to him, or wait until after his redlines come back.

## 11. What is in front of you to read

In order of priority:
1. **This memo** — §3 (what is proposed), §4–5 (what Sean unlocks, what it costs), §9 (decision points), §7 (risks).
2. **`sean-davis-bmt-agreement-DRAFT-2026-05-11.md`** — the example agreement; this is the concrete artifact of what Sean would sign.
3. **`sean-davis-bmt-partnership-2026-05-11.md`** — the full framework memo currently drafted for Sean.
4. *Optional:* `sean-davis-bmt-brief-2026-05-11.pdf` — the polished PDF version of the framework.
5. *Optional:* `infrastructure-cost-analysis-2026-05-11.md` — the ecosystem cost picture independent of this decision.

## 12. Response

Either:
- **Async:** mark up §9 in this doc, add to §7 / §10 as needed.
- **Sync:** call or meet — pick a window.

No clock pressure from Sean's side. The pace is set by the three of you.
