# Go-To-Market Onboarding & Privacy Architecture

**To: Claude Code (Builder/Architect)**
**From: Antigravity (UX/Presentation Engine)**

## Mission Context
We are implementing a highly transparent, context-aware onboarding pipeline governing the transition from free B2C traffic to paid B2B subscribers. A central pillar of our Go-To-Market (GTM) strategy is an honest transaction regarding data. 

**The Rule:** Free users fuel the ecosystem via anonymized aggregate data. Paid users buy strict privacy enclaves. We do not obfuscate this; we celebrate it as a feature of our honesty.

Your task is to integrate these security, privacy, and contextual profiling flows into the Next.js `auth` pipeline and the public-facing marketing presentation.

---

## 1. Context-Aware OAuth Flow (The "Are You You?" Check)

When a user authenticates via Google OAuth, the system must pause *before* creating their persistent user profile in Firebase/Prisma.

### The Interceptor UX:
After the Google OAuth handshake, present a clean, high-contrast modal:
> **"We see you signed in with [chase@gmail.com]. Is this a private profile, or are you here representing a local business?"**

*   **Option A ["Private/Just Exploring"]:** They are flagged as B2C (Tourist/Local). The system clarifies: *"You're in Stealth Mode. We only collect anonymized, aggregate traffic data to help local businesses understand foot traffic. No personal identifiers are shared."*
*   **Option B ["I Run a Business"]:** They are routed to the Business Owner claim pipeline.

## 2. The Data Exchange Rate (Free vs. Paid UX)

You must architect strict UI controls around data sharing, but enforce the business model rules:

### Free Tier (The Data Fuel)
*   **The Policy:** If they operate on the Free Tier (e.g., claiming a directory listing but not paying $99/mo), they must consent to anonymized data aggregation. 
*   **The UX:** The toggle for "Strict Privacy / No User Data Generated" is visible but disabled with a padlock icon. A tooltip explains: *"The Free Tier is subsidized by anonymized network data that powers our local ecosystem intelligence. Upgrade to Measurably Better to lock down your data entirely."*

### Paid Tier ($99/mo Measurably Better)
*   **The Policy:** Paying subscribers are the owners of their data. They are not the product.
*   **The UX:** Strict, explicit toggles are unlocked: **[ ] Disable All Ecosystem Telemetry**. If checked, their business data operates in an isolated zero-knowledge environment.

---

## 3. Presentation Layer Integration (GTM Communication)

The market needs to understand this philosophy. It is a massive competitive advantage against extractive platforms (Yelp, Meta) that steal data without transparency. 

### Action Items for Claude:
1.  **Update `/tour` and `/economics`:** Build a small, beautifully formatted sub-page or modal accessible from the presentation layers titled **"The Data Exchange."** 
2.  **The Copy:** Explicitly outline the GTM philosophy: *"Free means you help the corridor grow. Paid means you own the corridor. We believe in strict data consent from day one."*
3.  **UI Components:** Build the React components for the `PrivacyConsentDialog` and inject them into the NextAuth / Firebase Auth callback handlers so they trigger automatically on `isFirstLogin`.

## 4. Constraint Checklist
*   [ ] Does the OAuth flow verify intent before forcing dashboard configurations?
*   [ ] Is the Free Tier clearly branded as an aggregate-data exchange?
*   [ ] Is the Paid Tier clearly branded as a private, sovereign data enclave?
*   [ ] Are all forms transparent and simple, requiring zero legal jargon (plain English)?

**Do not break the existing OAuth redirect chains when implementing the interceptor.** 
Ask Antigravity if you need the visual design specs for the `PrivacyConsentDialog`.
