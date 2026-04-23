# Measurably Better Things LLC — Formation Plan (for Tracy)

**Date:** 2026-04-21
**Author:** Cos (for Tracy and Chase)
**Status:** First-draft brief for Tracy to use with counsel + execute through the chosen state's filing portal. **Not legal advice** — this is the operational checklist; a lawyer signs off on the actual filing.

---

## The decision context

Earlier today (2026-04-21), Chase decided to formally retire the "Hillbilly Dreams Inc" placeholder brand and consolidate everything under **Measurably Better Things LLC** as the institutional operating entity. The plan to file Hillbilly Dreams Inc. as the corporation is **off** — Measurably Better Things LLC is what gets filed instead.

**What this entity becomes:**

- The legal owner of the Big Muddy / MBT platform
- The billing entity for all ecosystem subscriptions (Google Workspace, Vercel, Sanity, etc.)
- The DBA holder for "Chase Pierson Photography" (per the CPP-as-DBA-of-MBT direction in `docs/partners/tuthill-photography-scope-2026-04-20.md` §10)
- The parent for "Big Muddy Touring," "Big Muddy Magazine," "Big Muddy Records," "Big Muddy Radio" as DBAs (instead of separate LLCs, unless liability profile requires otherwise)
- The party that signs B2B Directory contracts (Vicki Wolpert, Paul Green, etc.)

**What it's NOT:**

- **NOT the Inn-operating entity.** Big Muddy Natchez LLC remains the operator of the Inn, kitchen, Blues Room, and hospitality operations (per `CLAUDE.md`). MBT is the platform; the Inn is its own LLC for liability + bank-account separation.
- **NOT replacing FarleyPierson LLC immediately.** FarleyPierson LLC (EIN 81-4280721) remains in place during a wind-down period. Counsel determines the cleanest closure path (close + DBA from MBT, vs. rename + retain).

---

## 1. Pre-filing decisions Chase + Tracy must answer

These block the actual filing. Should be answered before Tracy submits the Articles.

### 1.1 State of formation

The four real candidates:

| State | Pros | Cons | Annual cost |
|---|---|---|---|
| **New York** | Tracy is here; Chase splits NY/MS; legal infrastructure exists | $200 filing + ~$100/2 yrs biennial; **Publication requirement** (mandated newspaper publication, ~$500–2,000 in NYC, less upstate, ~$200–300 in Ulster County); state taxes + filings | ~$200–500/yr after publication |
| **Mississippi** | Big Muddy Inn is here; aligns with operations corridor | $50 filing fee; lower cost, simpler structure; less business-court infrastructure | ~$50/yr |
| **Delaware** | Standard for tech businesses; mature business courts; investor-friendly if we ever fundraise | Out-of-state foreign-LLC filings required in NY + MS where we operate; adds cost; Delaware franchise tax | ~$300/yr Delaware + foreign-LLC filings (~$200/yr per state) = ~$700/yr |
| **Wyoming** | Cheapest; strong privacy; no franchise tax | Foreign-LLC filings still required in NY + MS; weaker corporate-court reputation | ~$60/yr Wyoming + foreign-LLC filings |

**My recommendation: Mississippi.**

Reasoning:
- The Inn is in Natchez. The flagship implementation is in Natchez. The platform's center of gravity is Natchez even if Chase splits time with NY.
- Mississippi LLC formation is the cheapest + simplest of the operational states.
- Delaware/Wyoming are over-engineered for a 3-equity-partner LLC that's not raising VC.
- New York's publication requirement adds $500–2,000 in cost + 6 weeks of waiting just to be operational. The publication penalty if missed is catastrophic (LLC's authority to do business in NY gets suspended after 120 days).
- We avoid the whole NY publication mess by filing in MS and just registering MBT as a foreign LLC in NY when we have CPP / Bearsville client work that requires it. NY foreign LLC registration = $250 + biennial $9 + the publication requirement still applies (though many people just don't register foreign and accept the risk for low-volume out-of-state work). **Counsel should advise on whether MBT actually needs NY foreign-LLC status, given that the Inn is MS-only.**

**Ask Chase + counsel** to confirm before Tracy files. Default to MS if no objection.

### 1.2 Member structure

Three equity partners, equal thirds: **Chase Pierson (33.33%), Tracy Alderson-Allen (33.33%), Amy Allen (33.33%).** This matches the cap-table memory at `memory/project_cap_table.md`.

Decision needed: do we file with all three named as members from day one, or file Tracy as sole organizer + add Chase + Amy via the Operating Agreement? (Filing with all three is cleaner; sole-organizer + later-added is more flexible if cap-table is still being negotiated.)

**My recommendation: file with all three named members from day one.** The cap table is settled per the memory; adding members later requires amendments + counsel time.

### 1.3 Manager-managed vs. member-managed

- **Member-managed (default for multi-member LLCs):** all members participate in management decisions. Simpler, no separate manager class.
- **Manager-managed:** designated manager(s) handle day-to-day; members vote on big decisions only. Better when some members are silent/passive investors.

**My recommendation: member-managed**, with the Operating Agreement specifying that **Tracy is the designated finance lead** (handles books, bank, billing) and **Chase is the designated operations lead** (handles platform, infrastructure, client relationships) and **Amy is the designated artist/programming lead** (handles Inn artistry, Blues Room programming, Records output). All three sign on big decisions (>$X spending, contracts, hires, brand changes); each owns their lane below that threshold.

The Operating Agreement details the spending threshold + decision process. Sample threshold: any single expense >$1,000 or any contract >$5,000 requires majority sign-off; below that, the lane lead can act alone within their domain.

### 1.4 Tax classification

Default for a multi-member LLC = **partnership** (Form 1065). Each member gets a K-1 for their share of income/loss.

Alternative: **S-corp election** (Form 2553). Pros: payroll-tax savings if members take a salary + distributions; cons: requires running payroll, more accounting overhead, less flexible profit-distribution.

**My recommendation: stay with default partnership taxation for Y1.** Re-evaluate at year-end with the accountant once we know what real income looks like. S-corp election can happen later (deadline is 75 days into a tax year).

### 1.5 Operating Agreement scope

This is the big internal document. Counsel should draft, but Chase + Tracy + Amy have to agree on:

- **Capital contributions** — who's contributing what at formation? (Tracy + Amy already have $6k in via the inn-mbt-investment-history doc; Chase contributes the platform IP + brand assets; valuations TBD)
- **Profit + loss allocation** — equal thirds matches ownership; can be different if we want carried-interest-style alignment
- **Distribution policy** — how often does cash get distributed (quarterly? annually? against tax bills only?)
- **Decision thresholds** — see §1.3 above
- **Member departure / buyout terms** — what happens if one of the three wants out, or dies, or is bought out
- **New-member admission** — process for adding a 4th equity partner if we ever do (e.g., Elijah or Miles getting a small slice)
- **Dispute resolution** — mediation first, arbitration if mediation fails, in [chosen state]
- **Books + records access** — Tracy as finance lead has primary book ownership; all members can audit on 30-day notice
- **Non-compete / non-solicitation** — language around starting competing entities while a member, or after exiting

Counsel drafts; the three principals sign. Without a signed Operating Agreement, the LLC defaults to state-default rules, which are usually not what we want.

### 1.6 Registered agent

Required for LLC formation in every state. The agent receives legal service of process at a physical street address in the formation state.

Options:
- **Use one of us as the agent** (Tracy, since she's the finance lead and probably has the most stable address). Free. Minor downside: her home address becomes public record.
- **Use a registered agent service** (e.g., Northwest Registered Agent at $125/yr, ZenBusiness, etc.). Keeps personal address private. Mild ongoing cost.
- **Use counsel as the agent** if counsel offers the service.

**My recommendation: Northwest Registered Agent** — $125/yr is worth privacy + reliability.

### 1.7 LLC name availability

`Measurably Better Things LLC` — confirm it's available in the chosen state. Mississippi Secretary of State business search: https://www.sos.ms.gov/business-services/business-search

Tracy can verify in 5 minutes. If taken, alternatives: `Measurably Better Things Inc`, `MBT Holdings LLC`, `Measurably Better Things Mississippi LLC` (less elegant). Most likely available.

---

## 2. Filing checklist (Tracy executes)

In recommended order. Total elapsed time: 1–4 weeks depending on state processing speed.

### 2.1 Pre-filing (Day 0)

- [ ] Decide state of formation (per §1.1) — Chase + Tracy
- [ ] Confirm name availability on the state's business search portal
- [ ] Decide member structure (per §1.2)
- [ ] Decide manager-managed vs. member-managed (per §1.3)
- [ ] Engage counsel for Operating Agreement drafting (counsel can also do the filing if Tracy prefers; ~$500–1,500 typical fee for both)
- [ ] Pick + engage registered agent
- [ ] Have Tracy's MBT-interim credit card ready for filing fees + initial subscriptions

### 2.2 File the LLC (Day 1–2 if Mississippi; longer if NY)

- [ ] File **Articles of Organization** (Mississippi: online via MS Secretary of State portal; $50; instant-to-3-days processing)
- [ ] Receive filed Articles back from the state
- [ ] Save the filing receipt + Articles in shared MBT documents folder

### 2.3 Get the EIN (Day 3, after Articles are filed)

- [ ] Apply for **EIN (Employer Identification Number)** at IRS.gov — free, instant if Tracy is the responsible party with a valid SSN
- [ ] EIN application URL: https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online
- [ ] Save the EIN confirmation letter (CP 575) — needed for bank account, every vendor onboarding, every 1099 issued

### 2.4 Operating Agreement (Day 5–14, runs in parallel)

- [ ] Counsel drafts based on the 6 decisions in §1.5
- [ ] Chase + Tracy + Amy review + redline
- [ ] All three sign (electronic signature is fine; notarization not legally required in most states but recommended)
- [ ] Store signed copies in shared MBT documents folder + each member's personal records

### 2.5 Bank account (Day 7–10, after EIN)

- [ ] Tracy + Chase + Amy decide which bank (recommendation below)
- [ ] Open business checking account with the EIN, signed Operating Agreement, filed Articles
- [ ] Order business debit card + checks
- [ ] Set up wire/ACH for vendor payments
- [ ] Set up bookkeeping integration (QuickBooks Online / Xero / Wave)

**Bank recommendations:**

| Bank | Pros | Cons |
|---|---|---|
| **Mercury** | Tech-friendly, free business checking, no monthly fees, easy multi-user access, virtual cards for subscription billing, great UI | Online-only (no branch), requires LLC to be in good standing |
| **Local Mississippi bank** (Trustmark, Renasant, etc.) | In-person Tracy can walk in and resolve issues; good if Inn already banks somewhere local | Older UX, less subscription-billing ergonomics |
| **Chase Business** (the bank) | Big-bank features, branches in NY for Chase | $15/mo monthly fee unless balance minimums met; older account-management UX |

**My recommendation: Mercury** as the primary MBT business account. Free, tech-friendly, virtual cards for clean subscription tracking, multi-admin access for Tracy + Chase + accountant. Can pair with a local MS bank if Tracy wants in-person backup.

### 2.6 Business credit card (Day 10–30, after bank is operational)

This is the card that becomes the **MBT card** Chase has been talking about — the one that pays for everything ecosystem-business going forward.

- [ ] Apply for a business credit card through Mercury (Mercury IO Card) or a separate provider
- [ ] Tracy is the primary cardholder; Chase + Amy can be authorized users with their own cards
- [ ] Confirm credit limit ≥ $1,500 (covers the $1k subscription cap with cushion)
- [ ] Card details into Bitwarden as `Credit Card — MBT Business — Tracy Alderson-Allen`

### 2.7 State + federal compliance setup (Day 14–30)

- [ ] **State business license** (if Mississippi requires for our activity type — most service businesses don't)
- [ ] **Sales tax registration** (only if MBT directly sells taxable goods — unlikely; most ecosystem revenue is service-based and routes through other entities like the Inn LLC)
- [ ] **Foreign LLC registration in NY** (only if needed — counsel decides; CPP work in NY is the trigger)
- [ ] **Workers' comp** (only if MBT will have W-2 employees; in Y1, all team is partners or contractors, so probably not yet)
- [ ] **Annual report calendar** — set Asana reminder for MS annual report (due April 15 each year, $0 fee in MS; $9 in NY for biennial)

### 2.8 Insurance (Day 14–30, runs parallel with bank account)

The new Insurance & Risk Management department exists for exactly this. Per `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` and the Insurance department brief, MBT's coverage needs:

- General liability (covers most service work)
- Professional liability / E&O (covers platform-tier mistakes that hurt clients)
- Cyber liability (covers data breaches across the multi-tenant platform)
- Possibly a unified policy that wraps MBT + Big Muddy Natchez LLC + CPP + Bearsville etc.

Insurance dept owns this; Tracy doesn't have to be the lead. But the LLC must exist before any policy can name it as the insured.

---

## 3. The interim period — before MBT LLC exists, how do we operate?

The Workspace migration + the Phase A "bloat cut" + the billing centralization can't be 100% clean until MBT LLC has its bank account + business card. But we shouldn't wait 4 weeks to start moving.

**Tracy's interim card:** Chase mentioned Tracy already has a card we can use in the meantime. Two interpretations:

- **(a) Her personal credit card** — acceptable for short-term coverage, with reimbursement once MBT bank opens. Tracks every dollar via her statement; clean reimbursement at month-end.
- **(b) Big Muddy Natchez LLC card** — if the Inn LLC has a business card and Tracy is authorized on it, she could use that as a temporary MBT-shadow card. Cleaner accounting (entity → entity reimbursement at month-end), but mixes Inn books with platform books in the interim.

**My recommendation for the interim:**

1. Stand up the MBT Google Workspace tonight or this week using Tracy's personal card (temporary).
2. Tag every charge with `MBT-PRE-LLC-INTERIM` in a shared expense sheet so reimbursement is straightforward when MBT bank opens.
3. As MBT LLC formation completes (estimated 3–4 weeks), migrate the billing payment method on each subscription from Tracy's personal card to the MBT business card. Same flow as the original Phase 4 plan.
4. Tracy gets reimbursed in one lump sum from MBT's first cash position, against her tracked expenses.

Total interim period: ~4 weeks. Total interim out-of-pocket on Tracy's personal card: approximately **$280–340** (Workspace $70/mo × 4 + maybe $14 first-week if pro-rated + the domain renewal of `measurablybetterthings.com` if it's due in this window). Manageable + fully reimbursable.

---

## 4. Connection to the broader Workspace migration

Once MBT LLC is filed, EIN issued, and business bank/card operational:

- **Google Workspace billing flips** from Tracy's personal card to MBT business card (5-minute admin task)
- **Vercel team transfer** can complete with MBT as the legal owner instead of "Chase Piersons Projects"
- **GCP project transfer** can complete to the MBT Google Cloud organization
- **Stripe ownership transfer** can complete with MBT as the legal entity (key for tax + 1099 cleanliness)
- **All other SaaS accounts** (Sanity, Neon, Hetzner, DO, Resend, etc.) can flip billing to MBT card
- **CPP DBA registration** can be filed (per `docs/partners/tuthill-photography-scope-2026-04-20.md` §10, the recommendation is closing FarleyPierson + running CPP as a DBA of MBT)

These Phase 3 + Phase 4 tasks from the broader migration plan can run in the 1–2 weeks following LLC formation completion.

---

## 5. Coordination with the FarleyPierson LLC closure

FarleyPierson LLC (EIN 81-4280721) is being retired (per `CLAUDE.md`). Two paths counsel needs to resolve:

- **Path A: Close FarleyPierson entirely + run CPP as a DBA of MBT.** Cleanest. Single operating entity (MBT) with multiple DBAs (CPP, Big Muddy Touring, Big Muddy Magazine, etc. as needed). Recommended in the photography scope doc.
- **Path B: Keep FarleyPierson + rename to "Chase Pierson Photography LLC."** Preserves the EIN. Adds an ongoing entity to maintain.

This decision sits on Chase's plate, with counsel. **It does NOT block MBT LLC formation** — Tracy can file MBT today; FarleyPierson closure happens separately on its own timeline. The two tracks just need to coordinate so we don't have a brief period where the DBA naming is unclear (Tracy + counsel handle this).

---

## 6. What this changes in the existing canonical docs

After MBT LLC is filed, these docs need updates:

- `CLAUDE.md` (root) — update §"Legal operating entity" section: remove the misleading "MBT (Measurably Better Things LLC) is the platform-tier operating entity" line (it was aspirational, not factual). Add: "FarleyPierson LLC = legacy entity in wind-down. Big Muddy Natchez LLC = Inn operator. MBT LLC = newly filed [date], primary platform operator going forward."
- `docs/THE_THESIS.md` — entity section update
- `docs/BUSINESS_ARCHITECTURE.md` — entity layer update
- `memory/project_entity_registry.md` — add MBT LLC formation row
- `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` — when ownership transfers complete
- `docs/decision-briefs/chasepierson-tv-infrastructure-audit-2026-04-21.md` — status updates as items move

---

## 7. Action items + decision owners

| # | Action | Owner | By when | Blocks |
|---|---|---|---|---|
| 1 | Decide state of formation (MS recommended) | Chase + Tracy + counsel | This week | LLC filing |
| 2 | Engage counsel for filing + Operating Agreement | Tracy | This week | Filing |
| 3 | Confirm `Measurably Better Things LLC` name availability in MS Secretary of State search | Tracy | 5 min, anytime | Filing |
| 4 | File Articles of Organization | Tracy via counsel or MS portal | Within 7 days | All downstream |
| 5 | Apply for EIN at IRS.gov | Tracy | Same day Articles file | Bank account |
| 6 | Open Mercury (or chosen) business bank account | Tracy + Chase | Within 14 days of EIN | Business card |
| 7 | Apply for MBT business credit card | Tracy | Within 14 days of bank | Subscription billing migration |
| 8 | Sign Operating Agreement (Chase + Tracy + Amy) | All three | Within 30 days of filing | Long-term legal protection |
| 9 | Set up bookkeeping (QuickBooks Online recommended) | Tracy + Chase + accountant | Within 30 days | Tax preparation |
| 10 | Insurance department gets MBT named as insured on policies | Insurance dept | Within 30 days | Liability coverage |
| 11 | Update CLAUDE.md + business architecture docs to reflect MBT as filed entity | Cos | Same day Articles file | Doc accuracy |
| 12 | Run the Workspace migration tasks per the broader plan | Chase + Cos | Once MBT card is in hand | Subscription centralization |

---

## 8. Honest cost + timeline

### One-time costs

| Item | Cost |
|---|---|
| MS LLC filing fee | $50 |
| Registered agent (Northwest, Year 1) | $125 |
| Counsel for Articles + Operating Agreement | $500–1,500 |
| EIN | $0 |
| Bank account opening | $0 (Mercury) |
| Business credit card application | $0 |
| **Total formation one-time** | **~$675–1,675** |

### Annual recurring costs (MS LLC)

| Item | Cost |
|---|---|
| MS annual report | $0 |
| Registered agent renewal | $125 |
| Bookkeeping (QuickBooks Online or alternative) | $30–60/mo = $360–720/yr |
| Accountant for tax preparation | $1,000–2,500/yr |
| **Total recurring** | **~$1,485–3,345/yr** |

### Realistic timeline

| Phase | Time |
|---|---|
| Pre-filing decisions + counsel engagement | 1 week |
| Articles filed + EIN issued | 1–3 days after counsel ready |
| Operating Agreement drafted, reviewed, signed | 1–2 weeks |
| Bank account opened | 1 week after EIN |
| Business credit card issued | 1–2 weeks after bank |
| **MBT operational with bank + card** | **3–4 weeks total from kickoff** |

This means: if Tracy + Chase decide on state + engage counsel this week, **MBT LLC is fully operational with bank + card by mid-May**, which aligns with the 90-day plan's revenue ramp window.

---

## 9. Questions still open

1. **State of formation — Mississippi or other?** (Chase + Tracy + counsel decide)
2. **Counsel — same lawyer who's handling FarleyPierson closure, or a new one?**
3. **Mercury vs. local MS bank vs. both?**
4. **Tracy's interim card — her personal Visa, or some existing Inn-LLC card?** (affects how clean the reimbursement bookkeeping is)
5. **Operating Agreement specifics — capital contributions, distribution policy, decision thresholds — Chase + Tracy + Amy align before counsel drafts**
6. **Coordination with FarleyPierson closure — same counsel handling both, or separate tracks?**

---

*End of formation plan. Tracy can take this to counsel; Chase + Cos handle the Workspace migration in parallel using Tracy's interim card.*
