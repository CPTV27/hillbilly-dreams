# Brand Page Audit Report
**Date:** April 4, 2026
**Scope:** Brand separation, terminology ("corridor"), brand-bleed ("Measurably Better"), and metadata accuracy.

---

### `apps/web/app/touring/page.tsx`
- **Current Title:** `Big Muddy — Gateway to the Heart of Soul Music` (Metadata)
- **Issues Found:**
  1. **Terminology ("corridor"):** Mentioned 5 times (e.g., "along the Mississippi corridor", "Natchez to Memphis"). Chase noted "corridor is not a thing for DSD, but MAY be acceptable for Touring." Needs manual confirmation if this should stay.
  2. **DSD Reference:** Mentions "Venues end up in the Deep South Directory" as an ecosystem output. This isn't direct pricing bleed, but borders on cross-brand marketing.
  3. **Metadata Accuracy:** The `<title>` omits the actual brand name "Big Muddy Touring" or "Big Muddy Entertainment".
- **Recommended Fix:** Review "corridor" usage for the touring context. Update the metadata title to explicitly say "Big Muddy Touring" (or "Big Muddy Entertainment", since it absorbed touring).

---

### `apps/web/app/records/page.tsx`
- **Current Title:** *None (No metadata exported)*
- **Issues Found:**
  1. **Metadata Bug:** The file is completely missing a `metadata` export for the page head.
  2. **Terminology ("corridor"):** Uses "corridor" 4 times (e.g., "Mississippi corridor"). Requires confirmation if the Records brand can use this phrasing.
- **Recommended Fix:** Add `export const metadata: Metadata = { title: 'Big Muddy Records', ... }`. Replace "corridor" with "regional network" or "local scene" if it is strictly sunset across all brands.

---

### `apps/web/app/magazine/page.tsx`
- **Current Title:** `Big Muddy Magazine`
- **Issues Found:**
  1. **Terminology ("corridor"):** Used extensively (Metadata, "The Corridor" region bucket, "Corridor Photo Strip"). Given the magazine context, it may be accurate, but needs explicit approval per recent guidelines.
- **Recommended Fix:** Either officially whitelist "corridor" for Big Muddy Magazine editorial standards, or execute a find-and-replace to use "The Region" or "The Deep South".

---

### `apps/web/app/radio/page.tsx`
- **Current Title:** `Big Muddy Radio`
- **Issues Found:**
  1. **Terminology ("corridor"):** Heavy usage ("Live from the mud.. just the corridor", "The Corridor Feed", "Curated for the Corridor").
- **Recommended Fix:** Clarify whether Radio can use "corridor". If not, replace with equivalents like "The Frequency", "The Sound", or "The Scene".

---

### `apps/web/app/bearsville/page.tsx`
- **Current Title:** `Bearsville Creative — Recording Studios of the Hudson Valley`
- **Issues Found:**
  1. **Brand Bleed Bug (MBT):** Contains a customer-facing reference to "Measurably Better Things" in the footer at line 511 (`Powered by Measurably Better Things`).
  2. **Stale Email/Brand:** Uses `hello@bearsvillemediagroup.com` in mailto links 5 times, failing to fully migrate to the "Bearsville Creative" moniker.
  3. **Terminology ("corridor"):** Uses "corridor" 5 times, largely referring to the "Big Muddy corridor" connection.
- **Recommended Fix:** Remove or replace the Measurebly Better footer text immediately. Update all mailto links to omit "mediagroup". Ensure the "corridor" linkage is still intended for the NY/Hudson Valley brand.

---

### `apps/web/app/hillbilly/page.tsx`
- **Current Title:** `Hillbilly Dreams Inc.`
- **Issues Found:**
  1. **Terminology ("corridor"):** Used 8 times across the copy.
  2. *Note: "Measurably Better" is correctly located in the B2B footer, which is an accepted use case per instruction.*
- **Recommended Fix:** Assess if "corridor" is acceptable for the corporate/holding company portfolio language. 

---

### `apps/web/app/studioc/page.tsx`
- **Current Title:** `Studio C Video — Live Production & Content from Woodstock, NY`
- **Issues Found:**
  1. **Location Conflict (Natchez vs. Woodstock):** The metadata correctly states Woodstock, NY. However, the UI copy directly contradicts this throughout the component. Line 150 reads `Live Production · Natchez, Mississippi` and Line 582 states `Studio C is at The Big Muddy Inn, 411 N Commerce St, Natchez, Mississippi.`
- **Recommended Fix:** Update the hardcoded component text (hero section and CTA section) from Natchez, MS to Woodstock, NY to accurately reflect the relocation of the Studio C entity.
