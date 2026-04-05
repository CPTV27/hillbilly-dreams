# DSD Website Builder Options

To successfully bundle "Done-For-You" website provisioning into the $99 DSD Marketing Tier, we have evaluated three architectural pathways.

## Option A: Next.js Multi-Tenant Templates (Recommended)
Building our own static template generator directly into the Measurably Better Things (MBT) stack.
*   **How it Works:** DSD pulls the business's existing directory schema (hours, menu, photos, bio) and maps it into a predefined Next.js React template.
*   **Cost per Site:** $0 (Absorbed into existing Vercel Enterprise/Pro edge hosting).
*   **Custom Domain Support:** Yes, managed via Vercel Domains API.
*   **SEO:** Flawless. 100/100 Lighthouse scores due to static generation and edge caching.
*   **Edge:** Deepest integration; locks the customer firmly into the DSD ecosystem.

## Option B: White-Label Builders (e.g., Duda, Wix Studio)
Licensing a third-party builder and slapping the DSD logo on it.
*   **How it Works:** We buy a wholesale agency account (like Duda) and provision sub-accounts for DSD clients.
*   **Cost per Site:** Duda's White Label plan starts at $149/mo + additional fees per site beyond the initial 4-site cap. 
*   **Custom Domain Support:** Yes.
*   **SEO:** Good, but bloated compared to raw React.
*   **Edge:** High upfront cost. Ruins the $99/mo margin economics rapidly as we scale.

## Option C: Canva Websites
Using our existing Canva Business account to publish scrollable one-page sites.
*   **How it Works:** We design a one-page Canva presentation and hit "Publish as Website".
*   **Cost per Site:** $0 (Sunk cost of our Canva sub).
*   **Custom Domain Support:** Yes (Canva allows up to 5 domains per Pro account, making it unscalable for a directory of hundreds).
*   **SEO:** Poor. Extremely bloated DOM, weak metadata control.
*   **Edge:** Too fragile for genuine commercial infrastructure. Cannot scale beyond a handful of manual sites.

## Final Recommendation
**Option A (Next.js Templates).** It protects our $99 MRR margin, ensures blistering fast load times, and creates absolute product sticky-ness. If a client churns from DSD, their website goes down—making DSD a required utility, not a discretionary ad spend.
