# S2PX Commercial License — Scan2Plan

**Licensor:** Hillbilly Dreams, Inc. ("HDI")
**Licensee:** Scan2Plan ("Scan2Plan")
**Effective date:** _____________ (date of Licensor signature)
**Version:** 1.0

---

## 1. Parties

This is a commercial license agreement between **Hillbilly Dreams, Inc.**, a Mississippi corporation that owns all rights to the S2PX platform and codebase ("S2PX"), and **Scan2Plan**, a company that wishes to continue using S2PX to run its business.

Chase Pierson signs for HDI as an authorized officer. Scan2Plan's authorized signer is listed at the bottom.

## 2. Grant

HDI grants Scan2Plan a **non-exclusive, non-transferable, revocable** license to install, run, and modify the S2PX codebase for Scan2Plan's own internal commercial use.

Scan2Plan may **not**:

- Sublicense S2PX to any third party.
- Resell, redistribute, or publish the S2PX source code.
- Use S2PX for any entity other than Scan2Plan itself. This license covers the Scan2Plan corporate entity only. Other companies controlled by Scan2Plan shareholders, officers, or affiliates are not covered and require their own license.

Source code access is limited to a single designated Scan2Plan technical contact. The current designated contact is **Elijah Tuthill**. Changes to the designated contact require written notice to HDI.

## 3. Pay-What-You-Want

Scan2Plan sets the monthly license fee at its own discretion.

- The minimum is $0.
- There is no ceiling.
- HDI will not audit, dispute, or negotiate the fee amount.
- Payment is due monthly to Hillbilly Dreams, Inc. on or before the last day of each month. Method of payment is Scan2Plan's choice.

The fee amount is separate from the metrics reporting obligation in §4. A $0 fee is acceptable. A missing metrics report is not.

## 4. Metrics Reporting — Hard Requirement

Scan2Plan must deliver a monthly report of **Revenue and Gross Merchandise Value (GMV)** for any revenue that flows through an S2PX-powered surface operated by Scan2Plan.

**Delivery.** One of two methods:

1. **Automatic.** HDI will provide a small telemetry module that aggregates revenue events monthly and posts a signed JSON payload to an HDI-controlled endpoint. If the module is installed and running, the reporting obligation is satisfied automatically.
2. **Manual.** If the telemetry module is disabled, uninstalled, or fails, Scan2Plan must email a CSV of the same figures to **me@chasepierson.tv** no later than **the 5th of each month** for the prior month's activity.

**Scope of data.** The report contains only:

- License ID (assigned by HDI)
- Reporting period (YYYY-MM)
- Total revenue / GMV in USD
- Transaction count
- Currency

No customer PII. No customer names. No deal-level detail. HDI is not asking for Scan2Plan's customer list — only the aggregate number.

**Consequences of non-reporting.** A missed or materially incomplete monthly report is a **material breach** of this license. HDI may suspend the license immediately upon written notice. The license is reinstated upon delivery of the missing report. Repeated non-reporting (two or more months in any rolling twelve-month period) is grounds for immediate termination under §6.

This is the one non-negotiable term of this agreement.

## 5. Ownership and Modifications

All right, title, and interest in S2PX — including any modifications, improvements, bug fixes, or derivative works made by Scan2Plan — remain with HDI.

Scan2Plan is free to modify S2PX for its own operational needs. Any such modifications are automatically licensed back to HDI on a perpetual, royalty-free, worldwide basis ("inbound contributions"). HDI may incorporate those modifications into the main S2PX codebase, offer them to other licensees, or use them in HDI's own products, with no obligation to Scan2Plan.

Scan2Plan retains ownership of its **data** — customer records, transactions, business content — processed by S2PX. Ownership of the code and ownership of the data are separate.

## 6. Termination

Either party may terminate this license with **30 days written notice** for any reason or no reason.

HDI may terminate **immediately** on written notice in the event of:

- Non-reporting under §4.
- Breach of the use restrictions in §2 (sublicensing, resale, entity-scope).
- Non-payment that continues for more than 30 days after HDI's written request for payment (noting that $0 is a valid payment — this applies only if Scan2Plan stops responding entirely).

On termination, Scan2Plan must cease all use of S2PX, remove the codebase from all production systems, and destroy or return all copies within 14 days. The metrics reporting obligation survives for the final partial month of use.

## 7. No Warranty, No Support

S2PX is provided **"AS IS"** with no warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.

HDI is not responsible for:

- Uptime, downtime, or availability.
- Bugs, security vulnerabilities, or data loss.
- Integration support, developer hours, or debugging assistance.
- Any arrangement Scan2Plan has with Elijah Tuthill or any other developer. Those arrangements are separate from this license and are not HDI's obligation.

If HDI chooses to provide informal support, fixes, or updates, that is at HDI's sole discretion and does not create an ongoing obligation.

## 8. Limitation of Liability

HDI's total aggregate liability under this license is capped at the total fees paid by Scan2Plan to HDI in the twelve months preceding the claim, or **$100**, whichever is greater. HDI is not liable for indirect, incidental, consequential, special, or punitive damages, lost profits, or loss of business.

## 9. Governing Law

This license is governed by the laws of the **State of Mississippi**, without regard to conflict of law principles. Any dispute arising under this license will be resolved in the state or federal courts located in Adams County, Mississippi.

## 10. Entire Agreement

This document is the entire agreement between HDI and Scan2Plan regarding S2PX. It supersedes all prior discussions, proposals, pitch decks, equity proposals, partnership drafts, and verbal understandings. Any amendment must be in writing and signed by both parties.

---

## Signatures

**Hillbilly Dreams, Inc.**

By: _______________________________
Chase Pierson, Authorized Officer
Date: _____________________________

**Scan2Plan**

By: _______________________________
Name: _____________________________
Title: ____________________________
Date: _____________________________
