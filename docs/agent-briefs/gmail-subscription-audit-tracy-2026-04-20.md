# Agent Brief — Gmail Subscription Audit for Tracy Alderson-Allen

**Date:** April 20, 2026
**Briefed by:** Chase Pierson
**Target agent:** A Claude session (Claude Code or claude.ai) with Gmail MCP authenticated to `tracyaldersonallen@gmail.com`. Tracy runs this in her own authenticated Claude session, OR Chase runs it if/when Tracy delegates access.
**Expected output:** A filled-in CSV matching the template at `docs/subscriptions-inventory-template.csv`, saved as `docs/subscriptions-inventory-tracy-2026-04-20.csv`.
**Estimated time:** 20–30 minutes.

---

## The full agent prompt (paste below this line)

---

You're running a subscription audit against Tracy Alderson-Allen's Gmail inbox. Tracy is an equity partner in the Big Muddy / Measurably Better Things ecosystem (a Natchez, MS hospitality + media business). The goal is to produce a complete inventory of every subscription, recurring charge, membership, or auto-renewing service she is currently paying for, so the partnership can decide which to cancel, which to consolidate, and which to migrate onto the MBT business credit card.

## Context

- Chase already went through this process for his own inboxes (me@chasepierson.tv, chasethis@gmail.com, chase@scan2plan.io, chase@farleypierson.com). His filled inventory is at `docs/subscriptions-inventory-chase-2026-04-20.csv` — reference it for format and classification patterns.
- The blank template is `docs/subscriptions-inventory-template.csv` — use the exact column structure.
- The partnership's canonical subscription strategy doc is `docs/ecosystem-subscriptions-2026-04-20.md` — read this to understand which tools belong under the MBT platform stack, which belong under Big Muddy Inn, and which stay personal.
- The classification taxonomy is `docs/ecosystem-classification-taxonomy-2026-04-20.md` — use its 8 codes when tagging the Classification Code column.

## Your task, step by step

### Step 1 — Run the Gmail sweep

Execute these searches against Tracy's Gmail (adjust the `after:` date to 2025/10/01 for a 6-month sweep, or 2025/04/01 for 12 months):

1. `subject:"receipt" OR subject:"invoice" after:2025/10/01`
2. `subject:"renewed" OR subject:"subscription" OR subject:"renewal" after:2025/10/01`
3. `subject:"your payment" OR subject:"payment confirmation" OR subject:"thank you for your payment" after:2025/10/01`
4. `from:billing OR from:noreply+billing OR from:payments after:2025/10/01`
5. `subject:"your plan" OR subject:"membership" OR subject:"trial" OR subject:"auto-renew" after:2025/10/01`
6. `"monthly charge" OR "annual charge" OR "yearly subscription" OR "per month" after:2025/12/01`

For each search, use `pageSize: 50`. If results saturate (50 returned), run again with `pageToken` to page through.

### Step 2 — Extract vendors + amounts

For each unique sender/vendor across all the results:

- Identify the service name (not the email address — the product name)
- Extract the billing amount if visible in the snippet; if not, call `get_thread` on the specific message to read the full body
- Note the billing frequency (monthly, annual, quarterly, one-off)
- Capture the billing email address and the payment method if shown (Apple, Google Play, Stripe direct, credit card last 4, etc.)
- Note the status (Active, Trial, Canceled, Expired, Failed, Past-due)

### Step 3 — Classify each subscription

For each subscription, fill in these columns:

- **Owner**: one of `Personal`, `MBT`, `Studio-C`, `Tuthill`, `Inn`, `Legacy`, `Client`, `Unknown` — see rules below.
- **Recommendation**: one of `KEEP`, `MIGRATE`, `CANCEL`, `VERIFY`, `DEFER`, `CONSOLIDATE` — see rules below.
- **Classification Code**: one of `INN`, `MAG`, `BLUES`, `EVENTS`, `TOUR`, `CPP`, `TUTHILL-PHOTO`, `TUTHILL-DESIGN`, `MBT-PLATFORM`, `PARTNER-MKT` — or blank if Personal.

#### Owner classification rules

- **Personal** — essentials only (cell phone, personal utilities, personal insurance, personal health, car payment, mortgage). The partnership doesn't pay for these.
- **Inn** — Cloudbeds PMS, property management tools, guest-facing services, Inn-specific marketing, Inn utilities (if the Inn rents the space, those bills are on Tracy/Amy as owners of the Inn entity). **If you see Cloudbeds, Flipkey, Airbnb host fees, cleaning services, laundry services, hospitality vendors — Inn.**
- **MBT** — software, SaaS tools, platform infrastructure the ecosystem uses. Photography / design / video / music / content tools that support Tracy's Magazine editorial or BizDev work. **If in doubt, lean toward MBT over Personal.**
- **Studio-C** — video production tools not already covered under Chase's audit. Unlikely for Tracy.
- **Tuthill** — design tools Tuthill pays directly. Unlikely for Tracy.
- **Client** — anything billed to Tracy on behalf of a client she's working with outside the ecosystem.
- **Legacy** — dead projects, previous jobs, Scan2Plan-era stuff, old Farley Pierson stuff, Ardent-era stuff. Cancel.
- **Unknown** — flag for Tracy to clarify.

#### Recommendation rules

- **KEEP** — already on the right billing account, classification correct, useful and affordable.
- **MIGRATE** — currently on Tracy's personal billing, but is ecosystem-useful. Move to MBT card + chasepierson.tv account.
- **CANCEL** — unused, duplicate, legacy, or failed payments that should just die.
- **VERIFY** — snippet wasn't clear enough to tell what this is or whether it's active. Flag for Tracy.
- **DEFER** — good idea but not now. Backlog for a later review.
- **CONSOLIDATE** — the same service is billed from multiple accounts; pick one account to keep.

### Step 4 — Write the CSV

Output format: CSV matching `docs/subscriptions-inventory-template.csv` exactly. One row per distinct subscription.

Columns in order:
1. Service
2. Category (AI / Dev / Platform / Design / Media / Productivity / Security / Utility / Insurance / Finance / Shopping / Records / Unknown / etc.)
3. Plan
4. Monthly (USD) — numeric; empty if annual-only
5. Annual (USD) — numeric; empty if monthly-only
6. Billing Email
7. Billing Method (Apple / Google Play / Stripe direct / Credit card last 4 / etc.)
8. Status (Active / Trial / Canceled / Expired / Failed / Past-due)
9. Owner (Personal / MBT / Studio-C / Tuthill / Inn / Legacy / Client / Unknown)
10. Recommendation (KEEP / MIGRATE / CANCEL / VERIFY / DEFER / CONSOLIDATE)
11. Classification Code (INN / MAG / BLUES / EVENTS / TOUR / CPP / TUTHILL-PHOTO / TUTHILL-DESIGN / MBT-PLATFORM / PARTNER-MKT — or blank)
12. Notes — one line. What stands out, what to verify, which email to read for the exact price, anything Tracy should know.

Use proper CSV escaping: quote any field containing a comma, escape double quotes by doubling them.

Save the file to: `docs/subscriptions-inventory-tracy-2026-04-20.csv`

### Step 5 — Summary notes to flag at the end

After writing the CSV, produce a short (under 300 words) summary text block for Tracy that calls out:

- **Biggest dollar items** — the top 5 subscriptions by monthly cost
- **Zombie / unused subs to cancel immediately** — anything she's paying for but not using (based on inferred signal: failed payments repeatedly, "subscription expiring" messages, services from former employers or defunct projects)
- **Items that are ecosystem-useful but on personal billing** — these are the MIGRATE candidates where real money moves off Tracy's card onto the MBT card
- **Ambiguous items** — anything you had to classify as VERIFY / Unknown, with a one-line question per item so Tracy can answer quickly
- **Non-subscription red flags** — overdue bills, duplicate payments, anomalies (in Chase's audit we found a $6,896 overdue electric bill — watch for this class of thing in Tracy's inbox too)

Return the CSV path + the summary text in your final message.

## Data integrity rules

- **Never fabricate pricing.** If the snippet doesn't show the amount, leave the column blank and put the actual value in Notes as "[verify — see email thread ID XYZ]".
- **Don't guess classification for unknowns.** Mark `Unknown` + `VERIFY` rather than forcing a label.
- **Preserve original language for service names.** Don't rename Vendor A to Vendor A's parent company unless it's the same billing line.
- **Include every subscription, even tiny ones.** $2.99/mo apps and one-off $5 membership fees all go in the CSV — that's how we catch the death-by-a-thousand-cuts pattern.
- **Respect Tracy's privacy on personal-health / personal-financial details.** Include them in the CSV (we need the full picture) but don't over-annotate. A line-item in a spreadsheet is enough.

## Confidentiality

This audit is for Tracy + Chase + the partnership accountant. Don't share the output with anyone else. The CSV goes into the private `hillbilly-dreams` / `measurably-better-things` repos which are private to the partnership.

---

*End of brief. Paste everything above the "End of brief" line into a fresh Claude session with Gmail MCP authenticated to tracyaldersonallen@gmail.com.*
