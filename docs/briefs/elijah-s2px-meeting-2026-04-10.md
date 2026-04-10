# Elijah / S2PX Custody Handoff — Meeting Brief
**Date:** 2026-04-10
**Duration:** 30 min
**Purpose:** Present the plan, give access, open shared task list, align on first sprint

---

## One-line summary

Chase is handing S2PX custody to Elijah (via Tuthill Design LLC) so Chase can focus on other HDI work. S2PX gets licensed to a founding customer on pay-what-you-want + revenue share terms. Bundle includes the Website Manager (marketing platform) as a cross-sell.

---

## State of S2PX (reality check before the meeting)

**S2PX was never actually archived.** It was mothballed after the Owen Bush dissolution on 2026-03-25, but the codebase is production-grade and actively committed through 2 weeks ago:

| Fact | Value |
|---|---|
| Lines of code | 208,502+ (per DEAL_CONTEXT.md) |
| Database tables | 106 (47 documented + 59 newer) |
| API routes | 59–62 route modules |
| AI agents | 7 Gemini personas (Operator, Strategist, CFO, Engineer, Closer, Pricing, Feature) |
| Unit tests | 261 |
| E2E tests | 450 (Playwright) |
| Dev phases shipped | 27+ |
| Replacement cost | $750K–$1.5M (per DEAL_CONTEXT.md) |
| Stack | React 19 + Vite 6 / Express + Drizzle ORM / PostgreSQL / Firebase Auth / Cloud Run / GCS |

**Features already built:**
- 5-stage sales pipeline (Kanban)
- 78-field scoping form (master deal record)
- CEO pricing engine with 45% margin integrity gate
- 9-11 page PDF proposal generator
- QuickBooks Online OAuth + invoice sync
- 6-stage production pipeline with auto-prefill cascade
- Field ops (scantech tokens, checklists, upload shares)
- Knowledge Base with full-text search + AI chat
- 7 agent personas with AI-first Command Center
- Agent Command Dashboard
- Dispatch Adapter (trigger-first comms routing)
- LicensingDeck 5-slide pitch (already built for Owen era — repurpose)
- Sentry telemetry + Checkly synthetic monitoring + CodeRabbit PR review

**Branches (on CPTV27/S2PX):**
| Branch | State | Contents |
|---|---|---|
| `main` | current | day-to-day development |
| `production` | +23 | actual live environment |
| `sandbox` | +35 | test environment |
| `twinner` | +35 / -5 | Twinner venture fork |
| `twinner-capstone-dev` | +21 | Dennis Shelden / RPI students work |
| `feature/website-manager` | **+213** | marketing platform bundle component |
| `fix-connection-pool-limits` | **+138** | all the infra hardening |
| `claude/friendly-nash` | active | another Claude session work |

---

## The "bundle" we're selling

**Two products, one customer:**

1. **S2PX** (operations platform) — GCP stack, $750K–$1.5M replacement cost
2. **Website Manager / Marketing platform** — sits on `feature/website-manager` branch (213 commits unmerged), wires into sandbox DB for live data on the customer's marketing site

### Hosting model — UNDECIDED (present both paths in meeting, decide after)

Chase is still thinking this through. Two credible models on the table:

#### Path A — "Black box" (HDI hosts, customer is a tenant)
- One multi-tenant S2PX deployment, operated by HDI
- Each customer = a tenant row with isolated data, auth, storage
- Customer accesses via their own subdomain (`customer-name.s2px.hdi.com`)
- Customer pays HDI an infrastructure passthrough covering their GCP portion
- Customer never touches GCP, Firebase, Cloud SQL, or source code

**Pros:** IP protection (no fork/reverse-engineer), one deployment to operate, consistent security posture across all customers, HDI controls data + compliance, faster onboarding (1 day), lower per-customer operational cost.

**Cons:** Multi-tenant architecture is a real lift (1–2 weeks of work — see Issue #9). HDI bears data custody liability. Regulated customers (government, defense, HIPAA-adjacent) may not be able to use this model. HDI carries infra cost float (we pay GCP, then bill customer).

#### Path B — "Customer hosts" (HDI deploys into customer's cloud)
- HDI does a 1-time deploy into the customer's GCP account
- Customer owns the infrastructure, pays their GCP bill directly
- Elijah has admin access for ops and updates
- Source is still HDI IP, just running on customer hardware
- Each deployment is single-tenant (simpler per deployment)

**Pros:** Zero data custody liability for HDI. Regulated customers can use it. Customer keeps running even if HDI disappears (continuity story is strong). Customer owns their data for compliance. Simpler deployment per instance (no multi-tenant architecture needed).

**Cons:** Customers get closer access to source (harder to prevent reverse-engineering without obfuscation). 1–2 weeks of custom deployment work per customer. Harder to push updates (HDI has to deploy N times for N customers). Less operational control.

#### Path C — Hybrid (recommend to consider)
- Default: Path A (black box, multi-tenant, fast onboarding)
- Upgrade tier: Path B (sovereign deploy, for customers who need their own cloud for compliance)
- Single codebase, two deployment targets
- This is how Retool, Supabase, MongoDB Atlas, and most mature SaaS companies handle it

### What stays true regardless of the hosting decision
- Customer pays **infrastructure cost + pay-what-you-want floor + revenue share**
- Merge `feature/website-manager` to main (Issue #1)
- Merge `fix-connection-pool-limits` to main (Issue #2)
- Security hardening required (Issue #3 — mandatory for Path A, strongly recommended for Path B)
- Tuthill Design LLC is the contractual counterparty (Issue #5)
- Elijah is customer custodian (Issue #6)
- Metrics reporting framework (Issue #7)

### What changes based on the decision
- **Issue #9 (multi-tenant architecture)** — only required if Path A or Path C. Can be deferred or scoped differently if Path B is chosen for all customers.
- **Issue #10 (billing passthrough)** — only required if Path A. Under Path B, customer pays GCP directly.
- **Issue #4 (customer provisioning runbook)** — content differs significantly based on which path.

**Proposed meeting approach:** Tell Elijah both paths exist, walk through tradeoffs, don't commit in the meeting. Decide over the next few days after thinking it through with Tracy (finance implications), with counsel (IP / data custody), and with the founding customer's actual compliance needs.

---

## Deal structure (pitch this to Elijah)

### Three-layer IP structure
```
HDI (owns all IP)
  └─ licenses to → Tuthill Design LLC (operating partner)
                     └─ sells SaaS to → Customer
```

### Commercial terms
- **Infrastructure** — customer pays either HDI passthrough (Path A) or their own GCP bill (Path B), typically $80–$200/mo for a small customer
- **Pay-what-you-want floor** — customer commits to a minimum monthly fee on top of infra (TBD: $500 / $1,000 / other)
- **Revenue share** — customer pays % of their revenue (TBD: 3–5%) calibrated to efficiency gains S2PX delivers
- **Quarterly metrics reporting** — customer certifies revenue + efficiency gain numbers
- **Proprietary tech stays HDI** — customer gets a license to use, not own. Source code is HDI IP regardless of hosting path.

### The development boundary — "we are the developers, they are the users"

**Critical clause. This is what prevents the Owen situation from repeating.**

The customer is a USER of the software, not a co-developer. HDI is the exclusive developer. This is locked in the SLA and the license agreement:

- **HDI has exclusive commit rights.** Customer has no GitHub access to the repo, no merge rights, no admin on production deploys.
- **Customer cannot contract outside developers** to modify S2PX — not freelancers, not in-house engineers, not anyone.
- **Feature requests go through HDI, not around it.** Customer tells Elijah what they need; HDI decides if/when to build it.
- **No forking.** License terminates if the customer attempts to fork, copy, or reverse-engineer.
- **No in-house rebuilds.** Non-compete clause: customer cannot build or commission a competing product using patterns learned from S2PX.

### Baseline capabilities vs new features — a two-tier structure

**Tier 1: Baseline SLA (contractually guaranteed)**
The customer can count on these running every day. This is what the pay-what-you-want floor + revenue share pays for:
- Sales pipeline (Kanban, 5 stages)
- Scoping forms (78-field master record)
- CEO pricing engine + margin integrity
- Proposal PDF generation
- QuickBooks Online sync
- Production pipeline (6 stages, auto-prefill)
- Field ops (scantech tokens, checklists, upload shares)
- Knowledge base with AI chat
- 7 AI agent personas
- 99.5% uptime
- 24-hour response on critical bugs
- Weekly updates, no regressions

**Tier 2: New features (HDI develops at HDI's pace)**
Everything on top of the baseline is HDI's roadmap, not a customer obligation:
- Some features = free updates (bug fixes, small improvements, new AI capabilities)
- Some features = paid addons (major new modules, customer-specific customizations)
- Customer can REQUEST anything; HDI decides if/when/how
- HDI's incentive: features that benefit multiple customers get built first (platform logic)
- Customer's incentive: if they want a specific feature faster, they can pay for it as an addon

### Why this matters — it protects both sides

- **Customer protection:** the baseline SLA is enforceable. They know exactly what they're buying and paying for.
- **HDI protection:** new features are at HDI's discretion. Customer can't demand infinite free work based on vague "it needs to work for us" complaints.
- **Power dynamic:** HDI stays the exclusive developer. Customer can never grow into a "wait, what do you do anymore?" position because they never had commit rights in the first place.
- **Revenue alignment:** the rev share scales with customer success, so HDI is motivated to make the product better for the customer, but under HDI's roadmap, not their ad-hoc demands.

### Operational model
- **Elijah = customer custodian** — primary customer contact, day-to-day support, monthly health checks, quarterly reviews, tenant/instance provisioning, training sessions
- **Chase = architecture custodian** — still very involved in setup correctness, security reviews, major feature decisions. Custody handoff is OPERATIONAL, not architectural.
- **Tuthill Design LLC = contractual counterparty** — not HDI directly
- **Chase stays in the loop via Tuthill** — collaborates with Elijah on product
- **Escalation path** — Chase for architecture, security, legal, major features. Elijah for onboarding, day-to-day ops, bug triage.

---

## Sprint issues created (live on github.com/CPTV27/S2PX/issues)

| # | Title | Priority | Owner |
|---|---|---|---|
| 1 | [SPRINT] Land feature/website-manager (213 commits) | P1 | Elijah + Chase |
| 2 | [SPRINT] Land fix-connection-pool-limits (138 commits) | P1 | Elijah + Chase |
| 3 | [SPRINT] Security hardening — remove dev backdoors | **P0-BLOCKER** | Chase |
| 4 | [SPRINT] New customer provisioning runbook (now per-tenant, much simpler) | P1 | Elijah |
| 5 | [DEAL] Update DEAL_CONTEXT.md for pay-what-you-want model | P1 | Chase + counsel |
| 6 | [SPRINT] Elijah custodian handoff — runbook, credentials, SLA | P1 | Elijah + Chase |
| 7 | [SPRINT] Success metrics reporting framework | P2 | Elijah + Chase |
| 8 | [SPRINT] HDI backport analysis | P2 | Chase |
| **9** | **[ARCHITECTURE] Multi-tenant isolation — HDI hosts, customers rent** | **P0-BLOCKER** | **Chase + Elijah** |
| **10** | **[ARCHITECTURE] Infrastructure billing passthrough** | **P1** | **Chase + Tracy** |

**Critical path** for founding customer deploy:
`#9 (multi-tenant) → #3 (security) → #2 (infra land) → #1 (website manager land) → #10 (billing) → #4 (provisioning runbook) → deploy`

Issues 5, 6, 7 run in parallel with the architecture work.
Issue 8 is nice-to-have — back-port improvements, not a blocker.

**Biggest lift:** Issue #9 (multi-tenant architecture). This was not in scope 30 minutes ago but is now the **biggest blocker** because we decided to host everything. Plan for 1-2 weeks of architecture work before first external customer is live.

---

## Access granted to Elijah (so far)

- ✅ **S2PX repo** — admin collaborator invited, GitHub ID `ElijahFitzgeraldTuttle`, invitation URL https://github.com/CPTV27/S2PX/invitations
- ⏳ **GCP project** — Chase needs to add him manually via console
- ⏳ **Firebase project** — Chase needs to add him manually
- ⏳ **Cloud SQL** — comes with GCP project access
- ⏳ **Bitwarden vault** — scoped share of S2PX operations credentials
- ⏳ **Secret Manager** — read access for operational credentials

Elijah already knows the codebase — he committed to `feature/website-manager` 5 weeks ago.

---

## 5 decisions on the table (don't have to settle all in the meeting)

1. **Counterparty name?** — who's the founding customer? (ViATechnik? RPI commercial arm? Owen's old clients? Someone new Elijah has lined up?) The agreement can't be drafted without this.
2. **Hosting path?** — A (black box, HDI hosts), B (customer hosts), or C (hybrid with default + sovereign upgrade). **Don't force this decision in the meeting — think it through after with Tracy + counsel.**
3. **Floor amount?** — $0 / $500 / $1,000 / other. Recommend $500–$1,000 to keep customers serious.
4. **Revenue share %?** — recommend 3–5% (bundle rate on total customer revenue, not attribution-based).
5. **Bundle structure?** — recommend "founding customer carve-out" (S2PX + marketing platform bundled at pay-what-you-want + rev share, explicitly labeled as a one-time founding customer deal so the public DSD/MBT pricing tiers are not undermined).

**The only two that block the meeting conversation with Elijah are #1 (counterparty) and #5 (bundle structure).** The hosting path, floor, and revenue share can be decided over the next few days after Chase thinks it through.

---

## Next 7 days (if Elijah agrees to custody)

| Day | Task | Owner |
|---|---|---|
| Fri Apr 10 | Meeting + GitHub access granted | Chase + Elijah |
| Sat Apr 11 | Elijah reads CLAUDE.md + DEAL_CONTEXT.md + README + 8 sprint issues | Elijah |
| Mon Apr 13 | Sprint kickoff — Elijah starts on website-manager rebase (#1) | Elijah |
| Mon Apr 13 | Chase starts security hardening PR (#3) | Chase |
| Wed Apr 15 | Tuthill Form 1065 filed (unrelated but blocking Tuthill as contract counterparty) | Tracy + Chase |
| Thu Apr 16 | First merged PR (website-manager) | Elijah |
| Fri Apr 17 | Customer onboarding runbook v1 | Elijah |

---

## Risks to flag in the meeting

1. **Tuthill Form 1065 is delinquent** — $440/month penalty accruing. If Tuthill is the contractual counterparty, get this filed NOW. Tracy has the Asana task due Apr 15.
2. **Insurance gap** — Tuthill needs E&O + cyber before the first customer signs. Insurance broker outreach task is filed with Tracy, due Apr 15.
3. **Security blockers** — cannot ship to external customer without Issue #3 closed. This is Chase's work, not Elijah's.
4. **`feature/website-manager` has 5 weeks of drift** — rebase is going to be painful. Expect 1-2 days of conflict resolution.
5. **`fix-connection-pool-limits` has 4 weeks of drift** — same deal.
6. **Chase is the only person who knows the full codebase** — custody handoff is a real effort, not a formality. Weekly sync with Elijah for at least the first month.

---

*This brief is saved at `docs/briefs/elijah-s2px-meeting-2026-04-10.md`. Keep it or delete after the meeting.*
