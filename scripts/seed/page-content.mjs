#!/usr/bin/env node
// scripts/seed/page-content.mjs
//
// Seed Sanity `pageContent` documents for the public front-facing pages.
// Pulls from docs/marketing-copy/pricing-page-copy-*.md + landing-page-copy-*.md
// where useful, but since those are per-brand marketing copy docs, this seed
// starts with hand-curated minimal defaults you can edit in Studio.
//
// Usage:
//   node scripts/seed/page-content.mjs --dry-run
//   node scripts/seed/page-content.mjs
//
// Requires: SANITY_WRITE_TOKEN + NEXT_PUBLIC_SANITY_PROJECT_ID

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
dotenv.config({ path: path.join(REPO_ROOT, 'apps/web/.env.local') });

const DRY_RUN = process.argv.includes('--dry-run');
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const PROJECT_ID = (
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? ''
).trim();
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

if (!PROJECT_ID) {
  console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID not set');
  process.exit(1);
}
if (!DRY_RUN && !TOKEN) {
  console.error('ERROR: SANITY_WRITE_TOKEN not set (required unless --dry-run)');
  process.exit(1);
}

// Initial pageContent docs — hand-curated starter content Tracy can edit.
const DOCS = [
  {
    _id: 'pageContent.pricing.global',
    _type: 'pageContent',
    title: 'Pricing (global default)',
    slug: 'pricing',
    heroEyebrow: 'Plans',
    heroHeadline: 'Pick the plan that fits how you work.',
    heroSub: 'Month-to-month. Cancel anytime. No contracts, no setup fees. Reach out if none of this fits — we build custom scopes for partners.',
    footerNote:
      'Secure payments by Stripe · Cancel anytime from your account · Questions? billing@bigmuddyinn.com',
    active: true,
  },
  {
    _id: 'pageContent.shows.global',
    _type: 'pageContent',
    title: 'Shows — Blues Room',
    slug: 'shows',
    heroEyebrow: 'The Blues Room',
    heroHeadline: 'Live music inside the Inn.',
    heroSub: 'A working venue, not a staged one. Fifty seats, good sightlines, a bar within arm\'s reach. Tickets are held for Inn guests first; walk-ups welcome if there\'s room.',
    footerNote: 'Questions? blues@bigmuddyinn.com',
    active: true,
  },
  {
    _id: 'pageContent.private-events.global',
    _type: 'pageContent',
    title: 'Private events at the Inn',
    slug: 'private-events',
    heroEyebrow: 'Private events',
    heroHeadline: "Tell us what you're imagining.",
    heroSub:
      "Whole-Inn rentals for weddings, retreats, dinners, and milestone gatherings. We'll come back with a real proposal — not a templated quote. Tracy reads every inquiry and answers within one business day.",
    footerNote:
      'We cook breakfast. Catering for dinners and events comes from third-party partners we know and trust.',
    active: true,
  },
  {
    _id: 'pageContent.checkout-success.global',
    _type: 'pageContent',
    title: 'Checkout success',
    slug: 'checkout/success',
    heroHeadline: "You're in.",
    heroSub:
      'Your subscription is active. A confirmation email is on its way with your receipt and a link to manage your account.',
    active: true,
  },
  {
    _id: 'pageContent.checkout-cancelled.global',
    _type: 'pageContent',
    title: 'Checkout cancelled',
    slug: 'checkout/cancelled',
    heroHeadline: 'Checkout cancelled.',
    heroSub:
      "No charge was made. If you weren't sure about something, reach out and we'll answer your questions directly.",
    active: true,
  },
  {
    _id: 'pageContent.account-subscriptions.global',
    _type: 'pageContent',
    title: 'Account — Subscriptions',
    slug: 'account/subscriptions',
    heroHeadline: 'Your subscriptions',
    heroSub: 'Manage billing, update your payment method, or cancel anytime.',
    footerNote: 'Questions? billing@bigmuddyinn.com',
    active: true,
  },
];

async function upsert(doc) {
  const url = `https://api.sanity.io/v2024-01-01/data/mutate/${PROJECT_ID}?dataset=${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.transactionId;
}

async function main() {
  console.log(`\n=== pageContent Sanity seed ===`);
  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Dataset: ${DATASET}`);
  console.log(`Docs:    ${DOCS.length}`);
  console.log(`Mode:    ${DRY_RUN ? 'DRY RUN' : 'WRITING'}\n`);

  let ok = 0;
  let fail = 0;
  for (const doc of DOCS) {
    process.stdout.write(`  ${doc._id} ... `);
    if (DRY_RUN) {
      console.log('skipped (dry-run)');
      continue;
    }
    try {
      const txn = await upsert(doc);
      console.log(`✓ (${txn.slice(0, 8)})`);
      ok++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
      fail++;
    }
  }

  if (!DRY_RUN) {
    console.log(`\nDone — ${ok} upserted, ${fail} failed.`);
    if (fail > 0) process.exit(1);
  } else {
    console.log(`\nDry run complete — ${DOCS.length} docs would be upserted.`);
  }
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
