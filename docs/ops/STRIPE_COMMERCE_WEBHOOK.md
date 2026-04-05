# Stripe — marketplace checkout webhook + affiliate commission

**Issues:** #68 (commerce webhook receiver), #55 (commission routing via `CreditLedger` on checkout — same implementation)

## What is live

- **Route:** `POST /api/webhooks/stripe` — `apps/web/app/api/webhooks/stripe/route.ts`
- **Event:** `checkout.session.completed`
- **Filter:** `metadata.commerce === 'marketplace'`
- **Fulfillment:** decrements `ApprovedSupply.inventory`
- **Commission:** if `metadata.affiliateUserId` is set and `AffiliateProgram` exists for the store, writes **`CreditLedger`** with `reason: affiliate_commission` and amount from `commissionRate × amount_total`

## Environment

| Variable | Role |
|----------|------|
| `STRIPE_SECRET_KEY` | Verify signature + API (required in production) |
| `STRIPE_COMMERCE_WEBHOOK_SECRET` or `STRIPE_WEBHOOK_SECRET_COMMERCE` | Webhook signing secret for this endpoint |

If `STRIPE_SECRET_KEY` is missing locally, `constructEvent` fails — expected in CI without secrets.

## Stripe Connect (account onboarding)

- **Connect Express / Standard** onboarding for sellers is separate from this webhook — tracked via `Client.stripeConnectId` and related UI. This webhook does **not** replace Connect account creation; it handles **checkout completion** for the marketplace SKU model.

## QA checklist

1. Stripe Dashboard → webhook endpoint → deliver test `checkout.session.completed` with metadata.
2. Confirm inventory decrements and optional `CreditLedger` row.
