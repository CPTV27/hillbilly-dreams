# Studio C — Business Plan

*Drafted 2026-04-29 for the Tracy + Amy partner walkthrough.*
*Voice per `docs/voice/admin-documentation-voice.md`. Lead with action. Truth over polish.*

**Positioning lock (2026-04-29):** Studio C is the administrative and implementation vendor that supports MBT (the platform). Studio C is **not** "the production arm of Tuthill Design LLC" — that framing is retired. Tuthill Design is real estate photography only, separate lane. Some older docs (`docs/voice/studio-c.md` line 10, `apps/web/config/tenants.ts` line 63) still carry the old framing; those are the cleanup queue, not the source of truth.

---

## 1. What it is

Provide the human hands behind the Glass Engine — the production, build, and ops work that turns MBT platform decisions into shipped video, code, content, and event delivery. Studio C is the vendor MBT hires to do the work; everyone else in the ecosystem (Big Muddy, Bearsville, future clients) gets that work routed through MBT, not directly through Studio C.

## 2. What's working today

- Retainer is live. $1,000/month bucket = 20 hours at $50/hr, backdated to April 1, 2026. Confirmed with Elijah and Miles 2026-04-20 PM.
- Existing Utopia account is the proof-of-concept for the engagement model. The new MBT relationship runs on the same shape.
- Scan2Plan is now contractually a client of Tuthill Design (re-structured 2026-04-20), not Studio C — clean separation already in motion.
- Sprinter wrap with Studio C logo shipped April. The brand surface is real and visible.
- Counter-seasonal capacity: NY peak May–Oct, Natchez peak Oct–April. Studio C can keep both regions covered without seasonal idle.
- Tier-1 Cloudbeds support layer for Big Muddy Inn — planned, contracted as part of the retainer scope per Tracy's ask for a human support contact.

## 3. The economics

**Revenue today:**
- $1,000/month MBT retainer ($12,000/year baseline).
- Existing Utopia account at $500/month or equivalent (per `docs/partner-studios-pitch-2026-04-20.md`).
- Overflow billing at $50/hr above the retainer cap.

**Costs we cover:** $0 from the MBT side beyond the retainer dollar. Studio C carries its own labor, gear, insurance, and overhead.

**12-month targets:**

| Line | Y1 Plan |
|---|---|
| MBT retainer | $12,000 (20 hrs/mo committed) |
| MBT overflow | $6,000–$18,000 (12–36 hrs/mo at $50/hr, depends on AEO + Sanity build velocity) |
| Inn Cloudbeds support | $6,000 (5 hrs/mo at $50 + on-call premium) |
| Other ecosystem brands billed via MBT | $0–$12,000 (Big Muddy Touring video, Magazine layout, Bearsville bridge work) |
| **Total Y1 from MBT-routed work** | **$24,000–$48,000** |

Honest unknown: overflow volume depends entirely on how fast we ship the AEO bundle, the Sanity `answerPage` schema, and the Patch task queue. If the platform stays in spec-mode, the floor holds. If we ship aggressively, overflow doubles.

## 4. The customer

**Customer = MBT.** Single counterparty. Single invoice cycle. Single point of contact (Chase as MBT principal, Elijah + Miles on the Studio C side).

The downstream consumers of the work — Big Muddy Inn, Big Muddy Touring, Big Muddy Magazine, Bearsville, future clients — are MBT's customers, not Studio C's. This matters for billing clarity, for entity boundaries, and for partner trust. Tracy and Amy don't manage Elijah or Miles; Chase (as MBT) does.

## 5. The 12-month plan

| Quarter | Ship |
|---|---|
| Q2 2026 | Lock the retainer-as-bucket model. Backdated April 1 invoicing. First overflow invoice if AEO build runs hot. Sprinter wrap maintained. |
| Q3 2026 | Cloudbeds Tier-1 support live for Inn. First Bearsville-region overflow billed through MBT. Quarterly utilization review with Elijah. |
| Q4 2026 | Decide retainer rate adjustment for 2027 based on actual 9-month utilization. Add a second retainer bucket if any single brand consistently consumes >15 hrs/mo. |
| Q1 2027 | Annual handshake. Renew or restructure based on Y1 data. |

Saturday meeting context (per WPC tasks): the standing S2PX/Studio C cadence on Saturdays is where Elijah, Miles, and Chase reconcile the week's hours, queue the next week's work, and surface anything that needs the retainer renegotiated. Cos posts the agenda Friday EOD; Chase walks it Saturday morning.

## 6. What we need to make it happen

- One invoice per month from Studio C → MBT, line-itemed by brand or project so the cost lands cleanly on the right P&L. (Same shape as the Utopia invoice Elijah already runs.)
- Time tracking that matches the bucket. Doesn't have to be fancy — a shared spreadsheet works. Pre-classified to brand at log time, not at billing time.
- A clear escalation path: overflow over 10 hrs in a week needs a quick text to Chase before it gets billed, not a surprise on the invoice.
- The S2PX Saturday meeting kept on the calendar, weekly, no skipping. That meeting is the relationship.
- Update `docs/voice/studio-c.md` line 10 and `apps/web/config/tenants.ts` line 63 to remove the "production arm of Tuthill Design" framing — already on the cleanup queue per the 2026-04-29 audit.

## 7. The risk

**Biggest risk:** scope creep without bucket discipline. If the retainer dollar gets treated as "Studio C is on call for anything," the hours blow past 20 inside three weeks and someone is upset. The bucket model only works if both sides log against it honestly and renegotiate when the number is wrong.

**Second risk:** the Tuthill / Studio C entity question. Older docs say Studio C is a DBA of Tuthill Design LLC. The 2026-04-29 lock says they're separate (Studio C = MBT vendor, Tuthill = real estate photo only). If that separation is not formalized in writing with Elijah + Miles, the next contract dispute will be about it. **Action: confirm the entity structure with the partners in the next Saturday meeting.**

**Third risk:** Elijah or Miles burns out on a brand-volatility quarter. The fix is the bucket — they get paid the same $1,000 whether they log 20 hours or 0, which means the retainer is also their cushion against our chaos.

**Fourth risk:** geographic split (NY + Natchez) becomes coordination overhead. Mitigated by counter-seasonality; if it stops being counter-seasonal in any year, revisit the staffing model.

## 8. Why it matters to the ecosystem

Studio C is the only reason MBT can ship at the speed the platform demands without putting that load on Chase, Tracy, or Amy. The retainer turns a partnership into a contract — predictable cost, predictable capacity, no awkward favors.

It also closes the loop on a real gap: every other brand in the ecosystem (Inn, Touring, Magazine, Bearsville) needs production hands at unpredictable moments, and we cannot afford to staff each one. By routing all of that demand through MBT → Studio C, we get one vendor relationship instead of five, and Studio C gets a steady book instead of feast-or-famine.

The Tuthill separation matters too. Real estate photography is a different sales motion, a different client type, a different insurance footprint. Keeping Studio C and Tuthill as clean lanes — both partner studios, neither subordinate to the other — is what makes the partner-amplification thesis work without entity confusion.

---

*Vendor: Studio C (Elijah + Miles). Customer: MBT (Chase as principal). Cadence: monthly invoice + weekly Saturday meeting. Floor: $1,000/month retainer, backdated April 1, 2026.*
