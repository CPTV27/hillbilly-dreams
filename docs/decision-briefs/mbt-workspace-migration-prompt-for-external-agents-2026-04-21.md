# Decision Brief — MBT Google Workspace Migration + Billing Centralization + HDI Retirement

**For:** Any external AI agent (ChatGPT, Gemini, Grok, fresh Claude instance, strategic advisor) analyzing this decision from a clean-slate perspective.
**From:** Chase Pierson, 2026-04-21.
**What I want back:** A rigorous second opinion. Push back. Find risks I haven't considered. Propose alternatives I haven't listed. Tell me if I'm over-engineering this. Timeline estimates grounded in reality, not conservative padding.

---

## 1. Who I am + what I'm running

I'm Chase Pierson — 25-year media executive (Democracy Now, DCTV, Discovery, HBO, Netflix), working photographer with a 6-year track record, and operating partner of a shared technology and brand platform I've built over the last few years.

The business has multiple identity layers, and they've drifted apart. That's what this decision is about.

### The current structure

- **Measurably Better Things LLC (MBT)** — my **legal operating entity**. Incorporated. Owns intellectual property, will own service contracts going forward. This is the company.
- **Big Muddy** — the **consumer brand family**: the Big Muddy Inn + Blues Room (6-room boutique hotel with a 50-seat live-music venue in Natchez, Mississippi), Big Muddy Magazine (editorial, heritage-journal style), Big Muddy Touring (road/booking/transport), Big Muddy Records (label, early-stage), Big Muddy Radio (internet radio + podcasts). Flagship implementation of the MBT platform.
- **Hillbilly Dreams Inc (HDI)** — a **conceptual holding-layer brand name** that got stuck in the system. Never formally incorporated. Appears in docs, footers, and some internal branding ("HDI Sovereign", "Powered by HDI" in some places). Creates confusion.
- **Chase Pierson Photography (CPP)** — my **personal photography business**, 6-year track record. Currently its own LLC (FarleyPierson LLC) but the LLC is being retired, and CPP is being restructured as a DBA under MBT.
- **Partner studios:** Tuthill Design (real estate media house, operated by Elijah Davis) and Studio C Video (production company, operated by Miles Dubois) — DBAs under the same Tuthill Design LLC. Amplified inside the ecosystem on retainer + partner-revenue terms.

### The equity partners

Three of us, equal thirds:
- **Chase Pierson** (me) — platform operator, creative + technical lead
- **Tracy Alderson-Allen** — finance lead, Inn operator, editor of Big Muddy Magazine
- **Amy Allen** — Inn + bar operator, performs as Arrie Aslin (artist in residence at the Blues Room), hosts the Big Muddy Radio show

### The infrastructure today

14 active domains (bigmuddytouring.com, bigmuddymagazine.com, bigmuddyinn.com, bigmuddyradio.com, bigmuddyrecordlabel.com, bigmuddyentertainment.com, deepsouthdirectory.com, outsidereconomics.com, hillbillydreamsinc.com, tuthilldesign.com, studiocvideo.com, bearsvillemediagroup.com, measurablybetter.life, chasepierson.tv).

One Next.js codebase on Vercel Pro serves all 14 as a multi-tenant deployment.

All of the following live under **my personal Google Workspace at `chasepierson.tv`** (i.e., `me@chasepierson.tv` owns them):

- Vercel team + all 14 domain deployments
- GitHub organization `CPTV27` + two primary repos (`hillbilly-dreams`, `measurably-better-things`)
- Google Cloud project `bigmuddy-ff651` — runs Vertex AI (Gemini + Imagen), GCS bucket `bmt-media-bigmuddy` (229+ curated photography assets used across every brand page), Cloud SQL (Postgres 16 + pgvector), OAuth clients
- Neon Postgres (primary app DB)
- Sanity CMS (project ID `5p7h8glj` — 13 schemas across Magazine, brands, directory listings)
- Cloudflare (DNS for all 14 domains + email routing)
- Hetzner CCX23 ($40/mo, Ashburn VA) — Immich photo server + Caddy reverse proxy
- DigitalOcean droplet — AzuraCast streaming server for Big Muddy Radio
- Resend (transactional email across all brand domains)
- Buzzsprout (podcast hosting)
- Canva Team (5 seats, brand assets)
- Google Drive (2 TB Ultra, everyone's files)
- Bitwarden (36 credential items, one-person admin)

### The billing today

Two credit cards are involved:
- **Chase's personal Visa** — pays some Apple-ID-linked subscriptions, some SaaS, ~$200–300/mo of business tools
- **MBT business card** (held by me) — pays most of the platform infrastructure, ~$500–700/mo

**Monthly subscription cap:** $1,000/mo (set as a governance limit in our canonical subscriptions doc).

### The people who aren't me + who should probably inherit keys

- **Tracy** (equity partner, finance lead) — doesn't currently own any infrastructure. No admin seat on any service.
- **Amy** (equity partner) — same.
- **Elijah Davis** (Tuthill Design) — has limited access to Asana + a few brand-specific workspaces.
- **Miles Dubois** (Studio C) — similar.
- **If I get hit by a bus tomorrow:** Tracy and Amy inherit the cap table, but they don't inherit the Google Workspace, the Vercel team, the GCP project, the Bitwarden, or 90% of the operational infrastructure. That's a real problem.

---

## 2. The move I'm considering

Three interlocking changes, all in one initiative:

### A. Stand up a new Google Workspace for MBT

- Register a new primary domain (`measurablybetterthings.com` is my current preference — matches the LLC name)
- Buy Google Workspace Business Standard, 5 seats: Chase, Tracy, Amy, Elijah, Miles
- Migrate my daily email + Drive from `me@chasepierson.tv` → `chase@measurablybetterthings.com`
- Make MBT the **institutional Google identity** that owns everything going forward

### B. Centralize all business billing on one card held by Tracy

- Issue an MBT business credit card in Tracy's name (primary or authorized user on MBT's account)
- Move every business subscription off my personal Visa + off my MBT card onto Tracy's MBT card
- Tracy becomes the de facto budget owner — her monthly statement = the MBT operating cost statement
- My personal Visa only pays personal things (Netflix, iCloud, phone, etc.)

### C. Retire the "Hillbilly Dreams" brand entirely

- `hillbillydreamsinc.com` either sunsets or redirects to `measurablybetterthings.com`
- Every doc, footer, and internal reference to HDI gets cleaned up
- The mental model collapses from three layers (HDI holding → MBT platform → Big Muddy consumer) to two layers (MBT platform → implementations)

### D. Re-home chasepierson.tv as a photography-only identity

- Three options:
  1. Keep chasepierson.tv as its own small Workspace (1 seat, $6/mo, CPP-only)
  2. Add chasepierson.tv as a secondary/alias domain under the MBT Workspace (no extra seat cost; `me@chasepierson.tv` still works but delivers to the MBT user)
  3. Cancel the chasepierson.tv Workspace entirely, use Cloudflare email forwarding to the MBT address

### E. Infrastructure ownership transfer

Every SaaS account, every cloud project, every API key gets re-homed from `me@chasepierson.tv` to `chase@measurablybetterthings.com`. Most are simple email changes; the riskiest is the Google Cloud project transfer (because the photo library lives there and brand pages load from it).

---

## 3. What I actually want from the migration

In plain terms:

- **Durable institution.** If I'm unavailable, Tracy + Amy can inherit the infrastructure without calling a lawyer.
- **Clean books.** One card = one monthly statement = Tracy has full visibility into MBT's cost base without reconciling across accounts.
- **Brand clarity.** HDI confuses readers, internal docs, and potential partners. Getting rid of it removes a drift source.
- **Personal-vs-business separation.** My personal financial life shouldn't be entangled with business SaaS billing.
- **CPP as a clean DBA.** My photography business keeps its identity (chasepierson.tv) but billing + legal route through MBT.

---

## 4. The specific open decisions I need other-agent perspectives on

For each of these, tell me (a) what you recommend, (b) why, (c) what you'd need to know to refine the answer.

### Decision 1 — The primary MBT domain

Options:
- **`measurablybetterthings.com`** — matches the LLC name, full word, professional.
- **`measurablybetter.life`** — already own, already pointing somewhere, more poetic.
- **Short/clever** — `mbt.co`, `mbt.life`, `mbthings.com`, something else.

Question: Does the primary business email domain need to be literal-and-professional (the full LLC name) or is something shorter + more memorable OK? I'm leaning toward `measurablybetterthings.com` because it's the clear answer when enterprise buyers ask "what company is this from?" But maybe I'm over-indexing on formality.

### Decision 2 — chasepierson.tv post-migration

Three options listed in §2.D above. I'm leaning toward Option 2 (alias inside MBT Workspace) because it saves money and aligns with CPP-as-DBA-of-MBT. But a reasonable argument for Option 1 (standalone) is that CPP might spin back out if I ever sell the platform or take investment.

Question: Is there a reason to keep CPP operationally separate from MBT even when they're the same legal entity?

### Decision 3 — hillbillydreamsinc.com

Options:
- **Let it lapse** (save $12/yr, risk someone squatting the name)
- **Park + redirect** to measurablybetterthings.com ($12/yr, protects brand)
- **Keep it active as a domain-level redirect** but still do the internal cleanup

I'm leaning toward redirect. Is there a third option worth considering (e.g., keeping HDI alive as a specific sub-brand for some purpose)?

### Decision 4 — Tracy's card structure

Options:
- **Authorized user** on the MBT card (I'm primary, she's on the account)
- **Primary holder** of a dedicated MBT business card (MBT is the account holder, Tracy is the primary cardholder)
- **Joint account** (we're both equal primary)

Question: Best practice for a 3-person equity partnership where finance lead is a partner, not the founder? Tax implications, audit-trail implications, control implications?

### Decision 5 — What's the ordered sequence of migration steps that minimizes risk?

I drafted a sequence: Bitwarden → GitHub → Vercel → Cloudflare → Neon → Sanity → Resend → Buzzsprout → Hetzner → DigitalOcean → Sentry → GCP (highest risk) → Stripe → Attio.

Question: Is that right? Which one should actually go first? (Argument for Bitwarden first: it's the master record. Argument for GCP last: production photo library. But maybe Stripe should be higher-risk than GCP because payment processing broken = revenue stopped, and photo library broken = visual-layer regression that's recoverable.)

### Decision 6 — How aggressive should the GCP project migration be?

Option A: **Transfer the existing project** (`bigmuddy-ff651`) to the new MBT Google Cloud organization via Google's built-in Resource Manager transfer. All resources + IAM stay intact. Cleaner. Faster.

Option B: **Create a new project under MBT**, migrate resources individually (GCS bucket copy, Cloud SQL dump-and-restore, re-create OAuth clients). Slower but gives a clean break — nothing carries legacy config.

The tradeoff is: (A) inherits years of accumulated IAM, service account drift, billing history we might not want, but preserves URLs and connections. (B) is a clean slate but requires more work and has more places to break.

Question: Which is actually cleaner for a small operating team that doesn't want to babysit a migration?

---

## 5. Timing — please challenge my estimate

My initial plan said 7–8 weeks with Friday-mornings-only migration days. I've already been told that's over-conservative — this team usually does in a day what I planned for a week.

Realistic revised estimate:
- **Phase 0 (decisions):** 1 day to decide, once all data is in hand
- **Phase 1 (Workspace standup):** 1 hour
- **Phase 2 (Drive + Gmail migration):** 2–4 hours active + overnight sync wait
- **Phase 3 (infrastructure ownership transfer, 14 services):** ~4 hours if batched, or 1 day
- **Phase 4 (billing swap, ~30 subscriptions):** ~2 hours if Tracy sits with me
- **Phase 5 (HDI doc cleanup):** ~2 hours (automated find-replace + review)
- **Phase 6 (chasepierson.tv isolation):** 30 minutes
- **Phase 7 (verification + audit):** 1 day

**Revised total: 2–3 focused working days, not 7–8 weeks.**

Question: Am I still over-estimating? Is this closer to a single long weekend? Or are there specific steps (GCP transfer verification, DNS propagation, Google Workspace data migration service timing) that force calendar time we can't compress?

---

## 6. What I want from you (the external agent)

Four things, in priority order:

1. **Red-team the plan.** What's the worst thing that could break during this migration that I haven't flagged? Specifically: any single step that could make the entire ecosystem go dark for more than 1 hour?

2. **Recommend a specific sequence + timeline.** Be concrete. "Do X first, then Y, then Z. Total time: N hours, assuming no external delays." If there are steps that MUST happen in series (DNS propagation, Google Workspace verification), call them out and give realistic wait times.

3. **Answer the 6 open decisions from §4** with specific recommendations + rationale.

4. **Identify anything I got wrong or missed.** Are there pieces of infrastructure I haven't mentioned that should factor in? (e.g., I didn't mention Postiz, or Open Notebook, or any Linear setup, or Apple Developer account if we have one, or Sentry config, or Stripe Connect for any per-tenant accounts, or Google Ads, or any CRM other than Attio.) A good external-agent response surfaces what I've missed.

### Format of your response

Please return:

- **Executive verdict** (2–4 sentences): "I recommend you do / don't do this move, because X."
- **Specific recommendations for each of the 6 open decisions.**
- **A sequenced to-do list** with realistic time estimates.
- **Top 3 risks** with mitigations.
- **Anything I didn't ask about that you think I should consider.**

---

## 7. Supporting context the external agent might want

### The canonical docs that describe the ecosystem (not shareable, but summarized):
- `docs/THE_THESIS.md` — the operating model
- `docs/CANONICAL_INFRASTRUCTURE_2026-04-20.md` — every piece of infrastructure, what it does, what it costs
- `docs/ecosystem-subscriptions-2026-04-20.md` — every subscription, who pays, what it's for
- `docs/90_DAY_PLAN.md` — Q2 2026 revenue roadmap ($60k target over 90 days)
- `docs/ecosystem-classification-taxonomy-2026-04-20.md` — how we code hours + dollars per brand/account

### Revenue context:
- Y1 fiscal year starts May 1, 2026. Target: $250k first-profit / $330k baseline.
- 90-day plan (May–July) targets $60k across private events, wedding packages, Big Muddy Inn rooms, Blues Room music nights, photography, magazine sponsorship, Tuthill + Studio C retainers.
- Revenue is ramping from near-zero today, so a migration that breaks payment processing is catastrophic; a migration that breaks photo library is annoying but recoverable.

### What's NOT in scope for this migration:
- Software refactoring (the Next.js app stays as-is)
- Schema changes (Prisma models stay as-is)
- Content migration (Sanity stays as-is, just changes ownership)
- Hiring or team expansion
- Legal entity changes beyond what's already in motion (FarleyPierson closure, MBT as universal operating entity)

### My current position (transparent):
I'm 60/40 on doing this migration. The value is clear (durability, simplicity, partnership equity in the infrastructure). The cost is real (N hours of focused work I could otherwise spend on revenue-generating activity). I'm skeptical of over-planning — the 7-8 week version I first drafted was wrong. I want to either commit to doing it in a 3-day window OR decide it's not worth it and close the question.

---

*End of brief. Ready for external-agent analysis.*
