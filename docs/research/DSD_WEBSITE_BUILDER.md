# DSD Website Builder Analysis

This document evaluates the opportunity to bundle basic website provisioning into the Deep South Directory (DSD) $99 "Marketing" tier.

## Competitor Baseline Pricing
Small businesses in the region typically turn to standard D.I.Y. platforms. Monthly costs (assuming annual commitments) look like:
*   **GoDaddy:** ~$10/mo to $25/mo. Aggressive initial discounts masking steep renewal fees.
*   **Squarespace:** ~$16/mo to $65/mo. Standard for premium aesthetics.
*   **Wix:** ~$17/mo to $159/mo. 

## The DSD Edge (Vercel Multi-Tenant)
Can we include a basic website in the $99 Marketing tier? **Absolutely.**

### Internal Unit Economics
Since DSD operates on a primary Vercel enterprise/pro architecture, spinning up statically generated constituent sites (e.g., `theirbusiness.deepsouthdirectory.com` or custom domains attached to our wildcard) essentially costs **$0 per site in computing overhead** due to edge caching and static generation.
*   **Custom Domain Cost:** ~$12/year (if DSD absorbs the domain registration).
*   **Hosting/Bandwidth:** ~$0 absorbed into our existing platform tier.
*   **Margin:** At $99/mo, DSD nets $1,188/yr. The raw technical cost of the website is ~$12/yr.

### The Value Proposition: "Done-For-You"
The fundamental flaw in GoDaddy/Squarespace is that the plumber or restaurant owner *has to build it themselves*. 
**The DSD Pitch:** 
"You don't need a website builder. We pull your menus, hours, and photos straight from your DSD profile and instantly generate a beautifully designed, SEO-optimized website. No coding, no templates to fight—we do it for you."

## Output Recommendation
Roll out a "Sites" feature on the MBT technology layer. 
1. The business hits "Enable Website" in their DSD Admin.
2. The platform generates an optimized Next.js static site pulling from their schema.
3. Automatically included in the $99 tier. This provides a hard lock-in against churn, as leaving DSD means losing their website.
