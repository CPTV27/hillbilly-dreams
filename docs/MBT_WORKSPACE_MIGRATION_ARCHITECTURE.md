# MBT Workspace Migration — Architecture (Rewritten 2026-04-18 PM)

*Major rewrite per Chase 2026-04-18: previous draft assumed we'd spin up a brand-new Google Workspace + new GitHub org + new Vercel team under MBT. **We're not doing that.** We're keeping the existing chasepierson.tv Workspace and the existing GitHub/Vercel/Cloudflare/Hetzner accounts in place — what changes is who pays the bills, who has seats, and what the Workspace's primary domain is called.*

---

## The corrected move

Keep what works. Rename and reseat what needs the MBT name on it. Transition billing from FarleyPierson LLC to MBT LLC once MBT is filed.

This is **NOT** a wholesale infrastructure migration. The previous architecture sketch implied weeks of cutover work, secret rotation, GitHub org transfer, Cloudflare account transfer, GCS bucket copying, etc. None of that is necessary. We avoid all of it by leaving the technical accounts where they are and only changing the contractual / billing layer.

---

## What changes

| Layer | Today | After MBT filing |
|---|---|---|
| Google Workspace | chasepierson.tv (Chase's account) | **Same Workspace.** Primary domain renamed (chasepierson.tv stays as a verified alias), Tracy + Amy added as paid seats. Billing payment method moves from Chase's personal card to the MBT LLC card. |
| Email | me@chasepierson.tv + per-brand forwarders | Same primary email. New per-partner addresses (tracy@, amy@) plus functional aliases (billing@, ops@, support@, legal@, noreply@) created inside the same Workspace. |
| GitHub | `CPTV27/hillbilly-dreams` (Chase's personal account) | **Same repo, same account.** No org transfer. Tracy and Amy added as collaborators if/when they need code access. (Chase remains the GitHub owner — that's a personal GitHub seat, not a corporate liability.) |
| Vercel | team `chase-piersons-projects` | **Same team, same project.** Payment method moves from Chase's personal card to the MBT LLC card. Add Tracy as a billing contact / member if needed. |
| Cloudflare | ChasePierson.TV account, all 14 domains | **Same account, same domains.** Payment method moves to MBT LLC card. |
| Hetzner | bigmuddy-services (`5.161.61.151`) under Chase's account | **Same server, same account.** Payment method moves to MBT LLC card. |
| GCS | bucket `bmt-media-bigmuddy` | **Same bucket.** GCP billing account migrates to MBT LLC. |
| Sanity | project `5p7h8glj`, dataset `production` | **Same project, same dataset.** Org payment moves to MBT LLC card. |
| Bitwarden | Chase's personal vault | **Same vault for personal items.** New MBT Bitwarden organization created for Tracy + Amy + Chase to share business credentials going forward. Personal vault stays Chase's. |
| Domains | 14 domains in Cloudflare | **Same Cloudflare account.** Domain registration renewals move to MBT LLC payment method. |
| Legal entity (operating expense payer) | FarleyPierson LLC (winding down) | **MBT LLC** (filing this month). All recurring SaaS subscriptions point to MBT's bank account / card. |

What does **not** change: account ownership of any cloud service, GitHub org, Vercel team, Cloudflare account, GCS bucket name, Sanity project ID, Hetzner server. Everything stays where it is. Only the credit card on file and the W-9 / business name on the receiving end of the bill changes.

---

## Why this is the correct move

The previous architecture sketch was conservative and process-heavy — appropriate if MBT had to be built from a clean room. But:

1. **The accounts are already correctly scoped.** Chase has held them in his name from day one, and that has not been a problem. Adding "MBT LLC" as the billing entity is a paperwork exercise inside each provider's billing settings, not an account-level migration.
2. **GitHub repo transfer would break every deploy.** GitHub Actions secrets, webhook URLs, deploy keys, branch protection rules — all would need redoing. There's no upside given that MBT can simply pay the bill on Chase's account or buy seats for partners.
3. **Cloudflare transfer would risk DNS continuity** for all 14 domains. We have customers on `deepsouthdirectory.com` and the Inn brand on `bigmuddytouring.com`. Even a 30-second misconfiguration during transfer is a loss we'd never recover.
4. **GCS bucket name change would require updating every Sanity asset reference and every code path that constructs URLs.** Massive surface area for very little gain.
5. **Workspace primary-domain rename is a 30-second operation in Google Admin Console.** chasepierson.tv stays as a verified alias, and the Workspace gets a new "MBT" identity for partner-facing email.

---

## What we still need to do

### Step 1 — File MBT LLC (in progress)
- Mississippi LLC filing, registered agent, EIN, bank account, MBT-issued debit/credit card.
- Operating agreement: three equal members (Chase, Tracy, Amy).
- Lawyer-coordinated, MBT and Big Muddy Touring LLC filing in parallel.

### Step 2 — Workspace primary-domain decision and rename (~30 minutes)
- Pick the primary Workspace domain. Options:
  - `measurablybetter.life` — short, owned, the consumer AI brand
  - `measurablybetterthings.com` — long, descriptive, owned
  - `mbt.life` — if available, cleanest
- In Google Admin Console: Domains → Add another domain → set as primary. chasepierson.tv stays as a secondary verified domain so existing email keeps working.
- Tracy and Amy each get a real seat: tracy@<primary>, amy@<primary>. (~$15/mo each on Business Standard.)
- Functional aliases: billing@, ops@, support@, legal@, noreply@ — routed to the right partner.

### Step 3 — Billing transitions, one provider at a time (~2 hours total)
For each of: Vercel · Cloudflare · Hetzner · GCP · Sanity · GitHub · Google Workspace · Bitwarden · Domain registrar (Cloudflare Registrar):

1. Open the provider's billing settings.
2. Add MBT LLC's payment method.
3. Set as default. Remove Chase's personal card.
4. Update the billing address / W-9 / business name to MBT LLC.

Each one is independent — can be done in any order, any week. None require downtime.

### Step 4 — Per-partner accounts and Bitwarden org (~1 hour)
- Tracy + Amy invited to Workspace (Step 2 covers the email seats).
- New Bitwarden organization "MBT". Chase, Tracy, Amy as admins.
- Migrate **business** credentials (Stripe, Cloudbeds, social accounts, etc.) from Chase's personal vault into MBT org. Personal credentials stay in Chase's personal vault.
- Tracy and Amy each invited to the GitHub repo as collaborators (read access at minimum, write if they're going to push commits).

### Step 5 — FarleyPierson wind-down (separate, lawyer-handled)
- See `docs/router/queue.json` → `P52-farleypierson-llc-shutdown`.
- Confirm no active SaaS subscriptions still bill the FarleyPierson card before dissolution.
- Tax/contract migration handled by the accountant + lawyer in parallel.

---

## What this is NOT

- **Not** a GitHub org migration. The repo stays at `CPTV27/hillbilly-dreams`.
- **Not** a Vercel team migration. Stays at `chase-piersons-projects`.
- **Not** a Cloudflare account transfer. Stays in the ChasePierson.TV account.
- **Not** a Hetzner account transfer. Stays in Chase's account.
- **Not** a GCS bucket rename or copy. Stays as `bmt-media-bigmuddy`.
- **Not** a Sanity project transfer. Stays at `5p7h8glj`.
- **Not** a domain transfer. All 14 domains stay where they are.
- **Not** a deploy infrastructure cutover. The single Next.js app keeps deploying to the same Vercel project across the same 14 hostnames.

The personal/business split that matters most: Chase's chasepierson.tv email keeps working, his photography brand stays his personal practice, his personal Bitwarden vault stays his. The MBT business identity gets layered on top of the existing infrastructure rather than replacing it.

---

## Sequencing with Chase's travel

| Phase | Timing | Blocked on |
|---|---|---|
| MBT LLC filing | In progress | Lawyer |
| Workspace primary domain pick | Decide before Chase leaves for summer | Chase |
| Workspace primary domain rename + Tracy/Amy seats | When MBT card is in hand | MBT card |
| Billing transitions | Rolling, one provider at a time, anytime | MBT card |
| Bitwarden MBT org | When MBT card + lawyer-confirmed entity are live | MBT formation |
| FarleyPierson wind-down | Begins after MBT is operational + billing migrated | MBT operational |

Nothing here is critical-path against Vicki's May 1 onboarding. Vicki can be set up on the existing infrastructure and the billing identity behind her account changes silently when MBT pays the next Vercel invoice.

---

## Open questions for Chase

1. **Primary MBT Workspace domain** — `measurablybetter.life`, `measurablybetterthings.com`, or check `mbt.life` availability?
2. **Tracy + Amy email handles** — `tracy@<primary>` and `amy@<primary>`, or first-initial-last-name style?
3. **Bitwarden migration scope** — does Chase want a clean inventory of personal-vs-business secrets before splitting, or just move anything tagged "business" / "MBT" / brand-related into the MBT org as he uses each one?
4. **Does Tracy need GitHub access at all?** She edits content via Sanity Studio + admin pages. If she never pushes code, skip the GitHub seat — saves a billing line and reduces blast radius.
5. **Does Vicki onboard on existing setup or wait?** The honest answer is "doesn't matter" — billing transition is invisible to her. She gets onboarded as soon as the launch is clean, regardless of what's on the credit card behind it.

---

*Supersedes the 2026-04-18 morning draft of this document, which assumed a full infrastructure migration to a new MBT-owned everything. That draft has been retained in git history. The corrected approach is in this document.*
