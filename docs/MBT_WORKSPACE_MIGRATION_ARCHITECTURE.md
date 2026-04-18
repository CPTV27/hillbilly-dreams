# MBT Workspace Migration — Architecture Sketch

*Initial shape of the move from the current HDI-era infrastructure footprint to a clean Measurably Better Things LLC footprint. Not the final playbook — the skeleton to think in.*

*Drafted 2026-04-18 while Chase drove to NOLA. To be refined in collaboration with Claude Chat + Cos as details firm up.*

---

## The big move

Shut down the Hillbilly Dreams Inc Google Workspace + supporting infrastructure. Stand up a clean Measurably Better Things LLC footprint. Deploy the platform cleanly under the new name once the code is finalized. Build forward from that point — don't keep dragging HDI references along.

This is an **infrastructure rename**, not a feature change. The platform keeps working the way it does. Names, ownership, billing, and identity shift.

---

## Current state (HDI-era footprint, April 2026)

| Layer | Service | Owner / account |
|---|---|---|
| Google Workspace | hillbillydreamsinc.com (or chasepierson.tv?) | Chase's account |
| Email | me@chasepierson.tv + per-brand forwarders | Chase's personal / Google Workspace |
| GitHub | `CPTV27/hillbilly-dreams` | Chase's personal account |
| Vercel | team `chase-piersons-projects`, project `hillbilly-dreams` | Chase |
| Cloudflare | ChasePierson.TV account | Chase |
| Hetzner | bigmuddy-services (`5.161.61.151`) | Chase |
| GCS | bucket `bmt-media-bigmuddy` | FarleyPierson LLC billing |
| Sanity | project `5p7h8glj`, dataset `production` | Chase |
| Bitwarden | single personal vault | Chase |
| Domains | 14 domains in Cloudflare | Chase |
| Legal entity | FarleyPierson LLC (EIN 81-4280721) | Chase + partner history |

## Target state (MBT-era footprint)

| Layer | Service | Owner / account |
|---|---|---|
| Legal entity | Measurably Better Things LLC (NY, to be filed) | Chase + Tracy + Amy (equal thirds) |
| Google Workspace | measurablybetterthings.com (or measurablybetter.life if we want a shorter domain) | MBT LLC |
| Email | chase@, tracy@, amy@ + billing@, ops@, support@, legal@ | MBT Workspace |
| GitHub | new org (e.g., `mbt-platform`) | MBT (with Chase, Tracy, Amy as owners) |
| Vercel | new team `mbt-platform` or `measurably-better-things` | MBT |
| Cloudflare | new account under ops@mbt email | MBT |
| Hetzner | existing server rebilled under MBT account | MBT |
| GCS | new bucket `mbt-media` (or similar) under MBT billing | MBT |
| Sanity | new org / transferred project under MBT | MBT |
| Bitwarden | MBT organization (not personal vault) | MBT, Chase + Tracy have admin |
| Domains | transferred to MBT Cloudflare account | MBT |
| Personal side | ChasePierson.TV stays Chase's personal (photography brand, personal projects, etc.) | Chase personal |

The personal/business split is important: Chase keeps ChasePierson.TV as his personal domain + Google Workspace. MBT gets its own clean account for everything business.

---

## Phasing — rough shape

### Phase 0 — Legal + identity (prerequisite, ~2 weeks)
- File MBT LLC in New York. Articles, registered agent, EIN, bank account.
- Operating agreement with explicit IP ownership language (real lawyer).
- Register `measurablybetterthings.com` if not owned. Keep `measurablybetter.life` as alias.
- Decision: which domain is the primary workspace domain? Shorter is usually better.

### Phase 1 — MBT Google Workspace (~3 days)
- Sign up for Google Workspace Business Standard under MBT LLC.
- Primary domain = whichever we picked in Phase 0.
- Create per-partner accounts: chase@, tracy@, amy@.
- Create functional accounts: billing@, ops@, support@, legal@, noreply@.
- Set up groups for routing.
- Bitwarden MBT organization — invite all three partners.

### Phase 2 — GitHub reorg (~1 day)
- Create MBT GitHub org.
- Fork/transfer `hillbilly-dreams` → `mbt-platform` under MBT org.
- Chase, Tracy, Amy as org owners.
- Migrate GitHub Actions secrets.
- Old repo: archive (don't delete — commit history matters).

### Phase 3 — Vercel + deploy platform (~2 days)
- New Vercel team under MBT.
- Connect new GitHub repo (`mbt-platform/mbt-platform`).
- Migrate all environment variables.
- New Vercel project deploys against new repo.
- Production-equivalent preview URL stands up.
- Verify a full build succeeds before DNS cutover.

### Phase 4 — Cloudflare + domain transfers (~1 week, uses Cloudflare's existing transfer flow)
- New Cloudflare account under ops@mbt email.
- Transfer domains one at a time (Cloudflare allows inter-account transfers for free).
- **Caution:** Cloudflare transfers have a 60-day lock window after domain registration — check each domain's eligibility.
- As each domain transfers, DNS records stay intact. Only the account holder changes.
- Final step per domain: switch A record from old Vercel IP to new.

### Phase 5 — Storage + media (~2 days)
- New GCS bucket `mbt-media` under MBT billing.
- Copy (or rsync) from `bmt-media-bigmuddy` → `mbt-media`.
- Old bucket becomes read-only archive. Don't delete immediately — leave 60 days as rollback window.
- Update all Sanity references and app env vars.
- Immich on Hetzner: keep server running, rebill account to MBT.

### Phase 6 — Sanity (~2 days)
- Create new Sanity project under MBT or transfer existing project to MBT org.
- Simpler path: new project, export the `production` dataset from the old project, import into new. Saves ownership headaches.
- Update all references and tokens.

### Phase 7 — Cutover per property (~2 weeks, one property per day)
- Do NOT cutover all 14 domains at once. Pick lowest-risk first.
- Suggested order:
  1. `hillbillydreamsinc.com` (low traffic, test property) — sunset to a redirect
  2. `bearsvillemediagroup.com` (not yet activated, good low-risk)
  3. `tuthilldesign.com`
  4. `studiocvideo.com`
  5. Big Muddy family (one at a time — touring, magazine, radio, records, entertainment)
  6. `deepsouthdirectory.com` (primary revenue — last, highest care)
  7. `measurablybetter.life` + `buycurious.art` + `outsidereconomics.com`
- For each: DNS cutover, 24-hour soak, verify monitoring, then move to next.

### Phase 8 — Legacy wind-down (~30 days post-cutover)
- Archive old GitHub repo.
- Shut down old Vercel team (after 30 days of zero traffic on old deploys).
- Transfer old Cloudflare account ownership or close it.
- FarleyPierson LLC: keep operating as the legacy entity (Chase has tax/contract history) — does NOT dissolve. MBT LLC is a new parallel entity.
- Old GCS bucket: 60 days after migration, archive to Coldline or delete.
- Old HDI Google Workspace: 90 days for email forwarding, then shut down.

---

## Critical considerations

### Don't lose history
- Archive, don't delete. Git history, email archives, GCS media all stay accessible even after accounts migrate.
- 60-90 day rollback windows at every phase.

### Personal / business split matters
- Chase's ChasePierson.TV is his personal domain + workspace. Photography brand. Personal projects.
- MBT is the business. These don't overlap.
- Avoid a year from now wondering "is this client email in my personal inbox or the business inbox?"

### Per-partner accounts from the start
- Tracy and Amy each get real MBT accounts from day 1.
- No "we'll set them up later" — they're equity partners, they need the keys from filing day.

### Secrets rotation as part of the move
- Any API keys, tokens, webhook secrets rotate during migration.
- Bitwarden MBT org becomes the canonical vault. Personal Bitwarden vault stays Chase's.

### Billing clarity
- Every recurring service pays from the MBT bank account after filing.
- Chase stops reimbursing or fronting infra costs personally.
- Gives Tracy a clean P&L.

### Timing with Chase's travel
- Phase 0 (LLC filing) can start immediately, progress asynchronously.
- Phase 1–2 (Workspace + GitHub) best done before Chase leaves for summer.
- Phase 3–6 (platform + storage + Sanity) can be run in parallel across summer.
- Phase 7–8 (cutover + wind-down) in fall when Chase is back and the team is co-located for a few weeks.

### The Born Free Network angle
- If BFN is the open-source offering, it probably lives under a separate open GitHub org (e.g., `born-free-network`), not in the private MBT org.
- Decision needed: is BFN developed in-the-open from day 1, or extracted from private code later?

### Legacy "hillbillydreamsinc.com" → MBT
- Safest: permanent 301 redirect to `measurablybetterthings.com` (or wherever the MBT landing lives).
- If MBT isn't public-facing, redirect to a partner-facing login or a neutral holding page.
- Don't just let the domain expire — that breaks old email footers, business cards, search results.

---

## Open questions for Chase (add answers inline in the Google Doc)

1. **Primary MBT domain** — `measurablybetterthings.com` (long, descriptive) or `measurablybetter.life` (short, memorable, already owned)?
2. **GitHub org name** — `mbt-platform` or `measurably-better-things` or something else?
3. **Sanity path** — new project (simpler, migrate dataset) or transfer existing project to MBT org (preserves project ID, breaks less)?
4. **Phase 7 cutover order** — comfortable with the suggested order, or different?
5. **Legacy HDI Google Workspace wind-down** — 90 days enough, or longer for email forwarding?
6. **Sequencing vs Vicki's May 1 start** — does Vicki onboard on the OLD infrastructure and migrate with us, or do we wait until MBT is live so she's the first customer on the clean stack?

---

## One practical footnote — the Sanity env bug blocking Vercel deploys

Separate from this migration but landed while investigating today: **all Vercel deploys since lunch have failed** because `projectId` validation throws on the current build. The correct value is `5p7h8glj` (confirmed from local `.env.local`). Chase's 5-minute fix when at a laptop:

1. Open https://vercel.com/chase-piersons-projects/hillbilly-dreams/settings/environment-variables
2. Find `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_PROJECT_ID` for Production scope
3. Confirm both are exactly `5p7h8glj` (no quotes, no spaces, no uppercase)
4. Redeploy the latest commit

After that deploy turns green, every push I've made since noon lands at once — the `/plan` page, middleware fix, tour-bus update queue, all of it.

**Relevant to the migration:** when we stand up new Vercel under MBT, all env vars get re-entered cleanly. This is a one-time fix now, not something that has to travel with us.

---

*Next iteration: flesh out the Phase 0 legal items once MBT LLC filing begins. Refine phases 1–3 with real Google Workspace pricing + GitHub org pricing before any switch flips.*
