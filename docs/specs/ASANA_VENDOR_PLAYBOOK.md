# DSD Vendor System: Asana Playbook for Ops

This playbook outlines exactly how Tracy and Amy will manage external vendors (contractors, musicians, repairmen) using the DSD Vendor Management integration within Asana. 

## Phase 1: Onboarding a New Vendor

1.  **Duplicate the Template:**
    *   Navigate to the `Vendors / Contractors` Portfolio in Asana.
    *   Find the project named `[TEMPLATE] Vendor Master`.
    *   Click the three dots `...` and select **Duplicate Project**.
    *   Name the new project after the vendor (e.g., `Vendor: Chandra (Housekeeping)`).

2.  **Define the Deal Terms:**
    *   In the newly created project, open the permanent task labeled `DEAL TERMS`.
    *   Fill out the custom fields: Hourly Rate/Flat Fee, Payment Schedule (Weekly, Net-30), and Scope of Work.

3.  **Choose the Interaction Mode:**
    *   **Mode A (The High-Tech Vendor — e.g., JP):** If the vendor uses Asana, click the `Share` button in the top right of the project and invite them as a Guest using their email. They will log in and see their tasks directly.
    *   **Mode B (The Low-Tech Vendor — e.g., Chandra):** If the vendor does not use apps, generate their Magic Link (see Phase 4). They will receive automated SMS texts mapping to Asana tasks.

## Phase 2: Assigning Tasks & Expense Tracking

**Creating a Task:**
1.  Add a new task in their project board (e.g., "Clean Rooms 3, 4, 5 on Thursday").
2.  Assign the due date. 
3.  *(For Mode B vendors)*: Adding the task automatically triggers an SMS to their phone via our Twilio integration. When they text back "Done," the Asana task automatically moves to the `Completed` column.

**Logging Expenses (Receipts):**
If a vendor buys supplies (e.g., cleaning chemicals):
1.  The vendor texts a photo of the receipt to the dedicated DSD Twilio number.
2.  The webhook creates a new task in their Asana board titled `Expense Submission: [Date]`.
3.  The photo of the receipt is automatically attached to the task for Tracy to review and reimburse against the QuickBooks ledger.

## Phase 3: Payment Tracking (Subtasks)

To maintain a clean audit trail without leaving Asana:
1.  When you write a check, pay via Venmo, or trigger an ACH, go to the `DEAL TERMS` task.
2.  Create a **Subtask** underneath it.
3.  Title the subtask with the payment amount and date (e.g., `PAID: $450.00 on April 12`).
4.  Optionally attach a screenshot of the digital receipt/check stub. 
5.  Mark the subtask `Complete`. This leaves a permanent, chronological billing ledger.

## Phase 4: Sending the Vendor Portal Link

Vendors do not need Asana accounts to see their total dashboard. 
1.  Inside your DSD Admin portal, navigate to the `Vendors` tab.
2.  Click the specific vendor name.
3.  Click **"Copy Vendor Portal Link"**.
4.  Text or email this link (`deepsouthdirectory.com/portal/vendor/[magic-token]`) to the vendor. 
5.  When they click it, they will see a read-only, dark-themed dashboard showing their active tasks, deal terms, and payment history.

*(Placeholder: UI Mockup Screenshot of the Vendor Portal dashboard showing Deal Terms on the left and Task List on the right).*
