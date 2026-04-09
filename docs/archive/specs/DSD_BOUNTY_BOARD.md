# DSD Bounty Board Ecosystem

This document outlines the wireframe and operational architecture for the internally managed DSD Bounty system. This drives direct freelance capital into the local creative economy.

## The Objective
To create an asynchronous, transparent micro-contracting pipeline where regional creatives can pick up ad-hoc operational or marketing missions (e.g. "We need 5 high-res photos of [Business X]", "Write a 500-word spotlight on [Artist Y]").

## Data Model Mapping
The workflow runs entirely on existing Prisma schema primitives:
*   **`TaskPost`**: Acts as the master `Bounty` record containing the brief, payout value, and deadline.
*   **`CommunityProfile`**: Tracks the authenticated creative user mapping to their identity.
*   **`ContributorCredit`**: Logs the completed mission and acts as the financial ledger trigger for payout.

## User Flow Journey

### 1. Bounty Origination (Admin)
- Admin logs into the HDI sovereign hub.
- Admin generates a new **TaskPost**.
- **Fields:** 
  - `Title` (e.g., "Photograph The Bluebird Cafe")
  - `Description` (detailed brief and format requirements)
  - `PaymentAmount` ($50.00 flat)
  - `Deadline`
  - `Status` (Open)

### 2. Market Browsing (Creative)
- Verified DSD constituents navigate to `/directory/bounties`.
- The UI presents an active feed of `TaskPost` records filtered by `Status: Open`.
- Listings display payout, urgency, and brief summary.

### 3. Claiming the Task (Creative)
- A creative finds an appealing bounty and clicks "Claim Mission."
- *Auth Gate:* If the user does not have a registered DSD `CommunityProfile`, they are forced to onboard.
- Upon claim, the `TaskPost` status flips from `Open` to `Claimed (In Progress)`, preventing double-work.

### 4. Proof of Delivery (Creative)
- The creative executes the physical/digital requirements.
- Returning to their DSD Portal, they submit the deliverables via a secure Dropbox/GCS upload link or direct URL attachment attached to the specific `TaskPost` instance.
- Status flips to `Pending Review`.

### 5. Final Approval & Liquidation (Admin)
- Admin receives a notification of delivery.
- Admin reviews the asset.
- If approved, the admin merges the asset into the production pipeline.
- A `ContributorCredit` is generated linking the `CommunityProfile` to the amount.
- Payment is executed (Stripe Connect / Direct ACH), and the status is permanently marked as `Resolved`.
