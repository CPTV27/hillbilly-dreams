# Finance & Accounting — Operational Report & Forecast
**Author:** Finance Director agent
**Date:** 2026-04-10
**Reporting period:** Q2 2026 + forward 24 months
**Owner:** Tracy Alderson-Allen (equity partner). Backup: Chase Pierson.

---

## 1. Current State

**Mission:** Keep the books honest, map revenue to calendar, and tell Chase when the cash runs out.

**What is actually live and making money today:**

| Stream | Monthly (as of Apr 2026) | Source |
|---|---|---|
| Big Muddy Inn (6 rooms) | ~$3,000 | `docs/EXTERNAL_AUDIT_PACKAGE.md` L313 |
| Bar (12 show nights/mo) | ~$2,000 | `docs/EXTERNAL_AUDIT_PACKAGE.md` L314 |
| Shows — door/tickets | ~$1,500 | `docs/EXTERNAL_AUDIT_PACKAGE.md` L315 |
| DSD self-serve (walk-in) | ~$500 | `docs/EXTERNAL_AUDIT_PACKAGE.md` L316 |
| Photography / gallery | ~$500 | `docs/EXTERNAL_AUDIT_PACKAGE.md` L317 |
| MBT institutional | $0 | `docs/EXTERNAL_AUDIT_PACKAGE.md` L318 |
| **Total current MRR** | **~$7,500** | |

Revenue recognition is informal. No closed-book month yet under the current structure. Numbers above are management estimates from the audit package, not GL-closed.

**Active recurring expenses (known):**

| Line | Monthly | Source |
|---|---|---|
| Infrastructure (Vercel, Neon, DO, GCS, etc.) | ~$31 | `docs/EXTERNAL_AUDIT_PACKAGE.md` L267 |
| IRS installment plan (2020 tax) | $100 | `memory/project_2020_tax_payment_plan.md` |
| Tuthill Form 1065 penalty (accruing) | $220/partner/mo | `docs/EXTERNAL_AUDIT_PACKAGE.md` L346 |
| Inn utilities / property / insurance | [?] | not in repo |
| Liquor license / bar COGS | [?] | not in repo |
| Van fuel / insurance / maintenance | [?] | not in repo |

Break-even target per Chase is ~$15,000/mo to cover all operating costs including partner draws (`EXTERNAL_AUDIT_PACKAGE.md` L323). We are roughly half that in cash revenue.

**Entity structure (the messy part):**
- Operating entity is **FarleyPierson LLC** (EIN 81-4280721, NY single-member LLC, 2016). Every dollar flows through here (`EXTERNAL_AUDIT_PACKAGE.md` L39).
- "Hillbilly Dreams Inc" is a **DBA, not yet incorporated**. This is a material finance issue — see Section 4.
- Studio C Video (Chase 40% owner) and Tuthill Design LLC (EIN 39-3499965, Chase + Elijah) are related but separate entities.
- Bearsville Media Group LLC (EIN 87-1868337) is dormant.
- **Equity:** equal thirds — Chase, Tracy, Amy (`EXTERNAL_AUDIT_PACKAGE.md` L44-48). No option pool yet. Pre-formation recommendation is 27/27/27/19.

**Finance headcount:** 0.25 FTE equivalent (Tracy handles Inn books + compliance after show nights; no dedicated bookkeeper; no accountant of record currently on retainer [?]).

---

## 2. Strategic Growth

Finance does not generate revenue. It generates **decision speed**. Where it creates leverage:

**6 months (Apr–Oct 2026):**
1. **Close the books monthly.** Right now we manage from guesses. A real close gives Chase unit economics per stream, which tells him which walk-ins to run, which show nights to drop.
2. **Unit economics per segment.** DSD walk-in ($99/$250), broker pilot ($1,500 setup + $500 first mo, then $199–$1,500/mo), and town kickstart ($10K setup + $500/mo SLA) all have very different CAC, margin, and payback. We don't have these numbers written down anywhere — they need to be modeled before the Vicki Wolpert close.
3. **Bridge cash model.** Inn + shows + self-serve DSD must carry the company until the first institutional check clears. Institutional sales cycle is 90–180 days. MS municipal fiscal year is July 1–June 30 (`EXTERNAL_AUDIT_PACKAGE.md` L306). A pitch in April lands as a Q4 2026 close at earliest. Finance owns that runway math.

**12 months:**
1. **Incorporate HDI.** Cannot take outside capital, issue equity, or sign institutional contracts cleanly under a single-member LLC. This is the single biggest finance blocker.
2. **Stripe Connect multi-party splits** (already in code per `EXTERNAL_AUDIT_PACKAGE.md` L252) need a reconciliation workflow. When a town pays $10K and 20 businesses participate, who gets what, when, and taxed how.
3. **Grant accounting discipline.** Title IV-A, ARPA-successor funds, El Dorado Wins — any institutional win will bring restricted funds. Current books cannot handle fund accounting.

**24 months:**
1. **Investor-ready data room.** If the institutional model works, we will be pitched to raise. Clean 24-month P&L, cap table, contracts library, and outcome metrics by month are the price of admission.
2. **Multi-region consolidation.** Two-region model (Natchez + Bearsville) creates inter-entity flows. Finance has to design a consolidation method before the second region turns on.

---

## 3. Operations

**Current cadence:** none formal. Tracy handles Inn bookkeeping continuously; there is no defined close, no reconciliation schedule, no variance review.

**Proposed cadence (to stand up in Q2):**
- **Daily:** Deposits logged (Stripe, bar Z-tape, Square if used).
- **Weekly (Monday):** Bank reconciliation, A/R follow-up, show-night P&L from Saturday.
- **Monthly (5th business day):** Close books, produce P&L by stream, cash flow, A/P aging. Tracy + Chase review.
- **Quarterly:** Tax filings, partner distribution decision, scenario model refresh.

**Systems & tools:**
- Bookkeeping: [?] — unclear whether QuickBooks, Xero, or nothing is the current system of record.
- Stripe for payments (Payment Links for DSD, Connect for multi-party).
- Neon Postgres holds customer/subscription data — cannot serve as a GL.
- Tax database at `~/tax-db/` exists but is **not accessible from this worktree** (the path does not exist here). [?]
- Vendor credentials in **Bitwarden** per policy.

**SLAs:**
- Inn guest folios: same-day.
- Show-night settlement: next morning.
- Monthly close: 5 business days after month end (target — not currently met).

**Single points of failure:**
- Tracy is the only human touching Inn books.
- Chase is the only human touching platform revenue (Stripe, DSD, institutional).
- No accountant of record. If either of them is down, nothing gets recorded.

**Runbook:** does not exist. Needs to be created — `docs/runbooks/finance-close.md` [to create].

---

## 4. Insurance & Risk

Top five financial exposures and whether they are covered:

| # | Exposure | Covered? | Mitigation / policy type |
|---|---|---|---|
| 1 | **Entity structure risk** — HDI not incorporated, operating under single-member FarleyPierson LLC. Personal liability bleed into company; cannot sign institutional contracts cleanly; equity promises to Tracy/Amy are morally binding but not legally perfected. | **No** | Legal, not insurance. Incorporate HDI, execute founder agreements, issue equity. Then D&O once there's a board. |
| 2 | **Cash concentration** — nearly all receipts hit one operating account under FarleyPierson LLC. No segregation for restricted funds, grant money, or partner draws. | **No** | Operations discipline + commercial banking. Open segregated accounts. Not an insurance line. |
| 3 | **Customer concentration** — 100% of revenue comes from Natchez. One bad season or hurricane = cash crunch (`EXTERNAL_AUDIT_PACKAGE.md` L347). First institutional deal will almost certainly be >20% of ARR on day one. | Partially | Business interruption insurance (tied to property coverage on the Inn). Geographic diversification via Bearsville (summer 2026) and El Dorado (Q3 2026). |
| 4 | **Tax delinquency** — Tuthill Form 1065 past due, penalty $220/partner/mo accruing (`EXTERNAL_AUDIT_PACKAGE.md` L346). IRS installment plan on 2020 tax active at $100/mo. | Not applicable | File Form 1065 now. No insurance covers delinquent filings. |
| 5 | **Fraud / embezzlement / cyber payment theft** — Stripe, bank accounts, vendor ACH all sit on credentials that live in Bitwarden. No dual control. No accountant backstop. | **No** | Crime insurance (employee dishonesty + funds transfer fraud) and cyber liability. Also needs dual-approval workflow for ACH >$X threshold. |

Additional items tied to other departments' policies but owned by Finance for reporting: workers comp (none — no W-2 employees yet), general liability on Inn/bar (held under Inn operating ownership [?]), liquor liability (pending with bar activation [?]).

**Tie to the unified insurance brief:** Finance needs Crime, Cyber, D&O (post-incorporation), and Business Interruption lines added to the master exploration brief.

---

## 5. Forecast — 3 Scenarios

All figures are modeled off `docs/EXTERNAL_AUDIT_PACKAGE.md` L309-319 (12-month conservative), `docs/MBT_REAL_ESTATE_PRICING.md` (broker + town pricing), and `.claude/agents/FINANCE_DIRECTOR.md` L75-100 (three scenarios). Where the audit number exists it is used directly; otherwise it is explicitly noted.

| Metric | Conservative | Base | Aggressive |
|---|---|---|---|
| **Revenue Y1 (2026)** | ~$150K | ~$275K | ~$450K |
| Of which Inn + bar + shows | ~$75K | ~$110K | ~$140K |
| Of which DSD self-serve | ~$30K | ~$60K | ~$100K |
| Of which broker pilots (Vicki + 1) | ~$8K (1 @ $1.5K setup + 6 mo @ $199–500) | ~$18K (2 pilots) | ~$45K (3 pilots, more moving to $500 tier) |
| Of which town kickstart (Natchez) | $0 | ~$10K setup + 2 mo @ $500 | ~$20K (Natchez + 1 more) + $3K SLA |
| Of which photography / records | ~$10K | ~$15K | ~$25K |
| **Revenue Y3 (2028)** | ~$200K | ~$500K | ~$1M+ |
| **Cost Y1 (operating)** | ~$180K | ~$220K | ~$320K |
| Infrastructure | ~$0.4K | ~$0.4K | ~$5K (tooling + Sentry + observability) |
| Partner draws (Chase/Tracy/Amy) | $0–$60K combined | ~$90K | ~$180K |
| House band / artist retainers | $0 | ~$20K | ~$60K |
| Van + touring ops | ~$12K [?] | ~$20K [?] | ~$30K [?] |
| Inn COGS + bar + utilities | [?] | [?] | [?] |
| **Y1 cash outcome** | **Negative ~$30K** | **Roughly flat** | **Positive ~$130K** |
| **Headcount Y3 (FTE equivalent)** | 3 (founders only) | 5 (founders + 1 bookkeeper + 1 content) | 10+ (founders + admin + content + producer + sales) |
| **Key risk** | Natchez season softens; institutional deal slips past Y1 end | First institutional deal slips one quarter; bridge stretches thin Aug–Oct | Over-hiring before institutional ARR is durable; founder bottleneck at Chase |

**Cash runway math (Conservative):** at ~$7.5K MRR today and rough burn of ~$12–15K/mo (`EXTERNAL_AUDIT_PACKAGE.md` L323), the gap is ~$5–7K/mo. With no cash reserve disclosed in repo [?], the company is running close to the line and depends on weekly receipts to meet weekly bills. One soft month breaks the model unless DSD walk-in ramps fast.

**Cash runway (Base):** the ~$15K break-even is hit ~Q3 2026 driven by DSD walk-in + a broker close. This is the Lean & Mean $760K target's early chapter (`.claude/agents/DEPARTMENTS.md` L63).

**Cash runway (Aggressive):** cash-flow positive by end of Q2 2026 if both Vicki and a Natchez town pilot close by June. This requires the sales cycle to be half of Chase's stated 90–180 days — unlikely but not impossible for the broker track.

**The $760K Lean & Mean target** sits between Base and Aggressive. It requires roughly: 50 DSD self-serve subs at blended ~$75/mo (~$45K/yr), 2 broker pilots at ~$6K/yr each fully ramped (~$12K/yr), 1 town kickstart ($10K + $6K SLA/yr), ~$150K Inn/bar/shows, and ~$500K pushed through institutional licensing by end of Y2. Y1 alone will not produce $760K under any realistic scenario.

---

## 6. Asks

**From Chase (decisions needed):**
1. **Pick a bookkeeping system of record by Apr 30.** QuickBooks Online is the default unless you want Xero. Finance cannot produce any of the above until this exists.
2. **Authorize HDI incorporation by May 15.** Delaware C-corp or MS LLC? Legal will advise; Finance needs the entity to book institutional deals cleanly.
3. **Sign off on Vicki Wolpert deal terms** as modeled in `docs/MBT_REAL_ESTATE_PRICING.md` so Finance can forecast against a real contract.
4. **File Tuthill Form 1065 now.** Every month of delay costs $440 across two partners.

**From other departments:**
- **Legal:** entity formation, founder agreements, Tuthill filing, IP assignment from FarleyPierson to HDI.
- **Sales (Enterprise + DSD):** weekly pipeline snapshot with stage, value, expected close. Cannot forecast without this.
- **Hospitality (Inn + Bar):** monthly RevPAR, occupancy, bar COGS. Right now these numbers don't exist on paper.
- **Patch / Tech:** Stripe data export + Connect split reports for reconciliation.
- **Insurance & Risk:** coverage map so we know what is and isn't insured before the first institutional deal signs.

**From capital:**
- **$15K emergency reserve.** One month of break-even burn in a segregated account. Not a raise — a discipline. Pull from show revenue in any month we clear it.
- **$2K for bookkeeping software + first 3 months of a fractional bookkeeper** (Tracy's time is better spent on the Inn and the institutional sales support).
- **$1.5K legal retainer** for HDI incorporation and founder agreement drafting.
- Total Q2 finance-department ask: **~$18.5K**.

**Timeline:** everything above needs to land before the first institutional contract is signed, which is Chase's stated Q4 2026 at the latest — so by Sept 30, 2026.

---

## Open Questions

- [ ] What bookkeeping system (if any) is currently in use? [?]
- [ ] What is the actual Inn monthly operating cost — utilities, property insurance, property tax, cleaning, linens? [?]
- [ ] Bar COGS ratio and liquor license status / annual cost? [?]
- [ ] Van monthly all-in cost (fuel, insurance, maintenance)? [?]
- [ ] Current cash on hand across all FarleyPierson LLC accounts? [?]
- [ ] Is `~/tax-db/chase_finance.db` still the authoritative source? It is not accessible from this worktree. [?]
- [ ] Are partner draws happening today, or are Tracy and Amy uncompensated for the Inn work? [?]
- [ ] Is there an accountant or tax preparer of record for FarleyPierson LLC? [?]
- [ ] What does the $1.4M pipeline in `tax-db` actually represent — and how stale is it? [?]
- [ ] Does insurance on the Inn currently extend to Blues Room events and bar operations, or is there a gap? [?]

---

*Word count: ~1,950. Sources cited inline. No invented figures — every number is either from `docs/EXTERNAL_AUDIT_PACKAGE.md`, `docs/MBT_REAL_ESTATE_PRICING.md`, `.claude/agents/FINANCE_DIRECTOR.md`, or `CLAUDE.md`, or explicitly tagged [?].*
