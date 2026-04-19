# PRD — [Tenant Name]

*Product Requirements Document for a Measurably Better Things client tenant. Studio C maintains this doc; Tuthill Design references it for platform operations.*

*Pattern per `docs/PLATFORM_ARCHITECTURE.md` — build once, reuse across tenants.*

---

## 1 · Tenant identity

| Field | Value |
|---|---|
| **Tenant slug** | `<short-slug>` (used in route prefixes, config keys) |
| **Primary brand name** | `<human-readable name>` |
| **Primary domain(s)** | `<domain>.com`, subdomains if any |
| **Primary stakeholder** | Name · email · phone |
| **Billing contact** | Name · email (if different from stakeholder) |
| **Start date** | `YYYY-MM-DD` |
| **Contract type** | Month-to-month · quarterly · annual · LOI-only |
| **Pricing (base)** | `$X/mo` |
| **Status** | prospect · LOI-signed · onboarding · active · paused · churned |

---

## 2 · Current scope — what's supported now

This is the **live, as-built** state. Do not list aspirations here.

### CMS (Sanity) schema
- Content types available to this tenant: *(list)*
- Custom fields or modifications: *(list, or "none — stock schema")*
- Dataset: *(shared or dedicated)*

### Directory module
- Enabled: yes / no
- Categories used: *(venues, musicians, businesses, etc.)*
- Visibility: internal-only / public / mixed
- Affiliate hooks: enabled / disabled

### Social automation
- Platforms connected: *(IG, FB, TikTok, X, LinkedIn)*
- Scheduling cadence: *(daily / weekly / ad-hoc)*
- Content sources: *(Sanity posts, directory updates, manual)*

### Marketing & SEO
- Landing page template: *(shared / custom)*
- SEO features: sitemap, schema.org, OG tags — which enabled
- Analytics: *(which tool, which account)*

### Integrations live
- Payments: *(Stripe, none, etc.)*
- Email: *(Resend, Postmark, etc.)*
- CRM: *(HubSpot, custom, none)*
- Other: *(list)*

### Reporting
- Monthly dashboard: yes / no
- What metrics are reported

---

## 3 · Pricing breakdown

| Line | Monthly | One-time | Notes |
|---|---|---|---|
| Base platform | $X | — | Includes: [list] |
| Additional service #1 | $Y | — | [desc] |
| Custom development | — | $Z | [scope, hours, rate] |
| **Total billed** | $X+Y | $Z | |

---

## 4 · Feature backlog — requested, not yet built

*This funnels into professional services. Each item gets a scope + estimate before commitment.*

| Request | Requested by | Priority | Estimate | Status |
|---|---|---|---|---|
| Example: custom CRM integration | Client | High | 20 hrs × $X/hr | Scoping |
| Example: branded print-on-demand flow | Client | Med | 40 hrs × $X/hr | Backlog |

---

## 5 · Reusable capabilities exposed

*Anything built for THIS tenant that's now available to others. Updates the MBT platform capability library.*

| Capability | Built for this tenant | Now reusable by |
|---|---|---|
| Example: "Vicki's List" directory view | Vicki Wolpert | Any realtor tenant |
| Example: Sponsor-slot module | Paul Green Realty | Any DSD-style directory tenant |

---

## 6 · Operational notes

- Primary contact cadence: *(weekly sync, monthly review, quarterly)*
- Escalation path: *(Chase → Tracy, or Studio C → Tuthill, etc.)*
- Known quirks / risks
- What has gone wrong and how it was resolved (institutional memory)

---

## 7 · Next review

| | |
|---|---|
| **Last reviewed** | `YYYY-MM-DD` |
| **Next review due** | `YYYY-MM-DD` (typically quarterly) |
| **Reviewer** | Chase / Tracy / Studio C / etc. |

---

*Template version 1.0 · 2026-04-18 · Update the template itself as patterns emerge across tenants.*
