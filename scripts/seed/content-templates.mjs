#!/usr/bin/env node
// scripts/seed/content-templates.mjs
//
// Seed Sanity contentTemplate documents — one per (contentType, brand) combo
// that makes sense. Tracy edits voice + audience + forbidden phrases in
// Studio once these land, no deploy required.
//
// Deterministic _ids mean the seed is idempotent — re-run anytime to
// refresh defaults without creating duplicates.
//
// Usage:
//   node scripts/seed/content-templates.mjs
//   node scripts/seed/content-templates.mjs --dry-run   # no mutations
//   node scripts/seed/content-templates.mjs --dataset=production
//
// Requires:
//   SANITY_WRITE_TOKEN — from manage.sanity.io → tokens (Write access)
//   NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID)
//   NEXT_PUBLIC_SANITY_DATASET (defaults to "production")

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(REPO_ROOT, 'apps/web/.env.local') });

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const DATASET =
  args.find((a) => a.startsWith('--dataset='))?.split('=')[1] ??
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  'production';

const TOKEN = process.env.SANITY_WRITE_TOKEN;
const PROJECT_ID = (
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? ''
).trim();

if (!PROJECT_ID) {
  console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID) not set');
  process.exit(1);
}
if (!DRY_RUN && !TOKEN) {
  console.error('ERROR: SANITY_WRITE_TOKEN not set (required unless --dry-run)');
  console.error('       Get one at https://manage.sanity.io → tokens → Editor access');
  process.exit(1);
}

// ── Template definitions ──────────────────────────────────────

// Base defaults per content type — drive audience/voice/length/required sections.
// Brand-specific overrides layer on top (brands with different audiences get
// adjusted audienceProfile + voiceRules).
const BASE = {
  'magazine-article': {
    audienceProfile:
      "A traveler considering a stay at the Big Muddy Inn. Travel-curious, hospitality-curious. Reads Condé Nast Traveler and Garden & Gun. Coastal flight cost matters to them.",
    voiceRules: [
      'Sensory specifics over generic adjectives',
      'Place-establishing paragraph early',
      'Central anecdote that humanizes the place',
      'Practical takeaway — something the reader could actually do',
      'Close with a soft CTA back to the Inn, not the Magazine subscription',
    ],
    requiredSections: [
      'opening hook',
      'place-establishing paragraph',
      'central anecdote or scene',
      'practical takeaway for the traveler',
      'CTA back to Inn',
    ],
    lengthMin: 500,
    lengthMax: 2500,
    forbiddenPhrases: [
      'must-visit destination',
      'hidden gem',
      'unforgettable experience',
      'in this article we will explore',
      'one-of-a-kind',
      'pride of place',
    ],
  },
  'social-post': {
    audienceProfile:
      'Depends on brand — varies by the brand-specific record below.',
    voiceRules: [
      'Platform-appropriate rhythm (IG caption ≠ TikTok caption ≠ X post)',
      'One idea per post, not a listicle',
      'No hashtag spam — 3 max on IG, 0 on X',
      'Entity-grounded — real places, real dates',
    ],
    requiredSections: ['hook', 'central line', 'soft CTA'],
    lengthMin: 50,
    lengthMax: 300,
    forbiddenPhrases: [
      'check out',
      "don't miss",
      'tag a friend',
      'this is your sign',
      'link in bio',
    ],
  },
  'listing-description': {
    audienceProfile:
      'Homebuyer browsing MLS / Zillow. Specific about features, neighborhood, lifestyle fit. Reading fast — opens 20 listings in a sitting.',
    voiceRules: [
      'Concrete square footage over "spacious"',
      'Room-by-room walk-through',
      'Neighborhood paragraph with real specifics',
      'Lifestyle paragraph naming the kind of buyer this fits',
      'Fair Housing compliant — no steering language',
    ],
    requiredSections: [
      'opening hook (property highlight)',
      'neighborhood',
      'room walk-through',
      'lifestyle fit',
      'closing (move-in window / showings)',
    ],
    lengthMin: 100,
    lengthMax: 600,
    forbiddenPhrases: [
      'cozy',
      'must-see',
      "won't last long",
      'priced to sell',
      "buyer's dream",
      'open concept',
      'turn-key',
      'great for families',
      'walk to schools',
      'safe neighborhood',
    ],
  },
  'episode-description': {
    audienceProfile:
      'Music-curious listener deciding whether to play. Also podcast-app algorithms parsing for discovery. First 200 chars carry weight.',
    voiceRules: [
      'First 200 chars carry weight — podcast apps truncate',
      'Artist names early for SEO + discovery',
      'Genre/scene keywords organically',
      'Host voice — opinionated, not corporate',
    ],
    requiredSections: [
      'hook',
      'guest/topic context',
      'episode arc',
      'recommended pairings',
      'CTA (subscribe + tune in)',
    ],
    lengthMin: 200,
    lengthMax: 900,
    forbiddenPhrases: [
      'check out this episode',
      "don't miss",
      'sit back and enjoy',
      "today's special guest",
      "today's hottest",
    ],
  },
  'pitch-deck-section': {
    audienceProfile:
      'B2B decision-maker — broker, civic partner, corporate sponsor. Skeptical, time-pressured, wants specifics.',
    voiceRules: [
      'Every section opens with a single declarative sentence',
      'Every section ends with a quantitative or specific anchor',
      'No abstractions without specifics',
      "No vague 'we will explore' — only what we actually do",
    ],
    requiredSections: ['declarative claim', 'concrete evidence', 'specific next action'],
    lengthMin: 80,
    lengthMax: 200,
    forbiddenPhrases: [
      'value proposition',
      'turnkey solution',
      'best-in-class',
      'industry-leading',
      'unparalleled',
      'cutting-edge',
      'innovative approach',
      'comprehensive solution',
      'end-to-end',
      'mission-critical',
      'world-class',
      'next-generation',
    ],
  },
};

// Per-brand audience overrides for content-types where the brand changes who reads it.
const BRAND_AUDIENCE = {
  inn: 'Travelers considering a stay in Natchez. Travel-curious, hospitality-curious.',
  magazine:
    "Inn-target reader — travelers drawn to Natchez, Mississippi corridor culture, hospitality with music in the mix. NOT music industry.",
  touring: 'Artists, agents, venue owners, promoters. Music-industry-facing.',
  records: 'Artists considering the label, fans buying records, sync agencies.',
  radio: 'Music-first listeners, scene-curious. Distinct from Magazine.',
  cpp: 'Editorial clients, documentary subjects, print buyers. Premium tier.',
  tuthill: 'Realtors, brokers, property developers. Professional service.',
  'studio-c': 'Venues, festivals, touring artists, corporate clients.',
};

// Valid (contentType, brand) combos — not every brand makes sense for every type.
const COMBOS = [
  // magazine-article is singular to magazine
  { contentType: 'magazine-article', brand: 'magazine' },

  // social-post: every brand has its own voice
  { contentType: 'social-post', brand: 'inn' },
  { contentType: 'social-post', brand: 'magazine' },
  { contentType: 'social-post', brand: 'touring' },
  { contentType: 'social-post', brand: 'records' },
  { contentType: 'social-post', brand: 'radio' },
  { contentType: 'social-post', brand: 'cpp' },
  { contentType: 'social-post', brand: 'tuthill' },
  { contentType: 'social-post', brand: 'studio-c' },

  // listing-description: real estate (tuthill primary, cpp for premium)
  { contentType: 'listing-description', brand: 'tuthill' },
  { contentType: 'listing-description', brand: 'cpp' },

  // episode-description: radio only
  { contentType: 'episode-description', brand: 'radio' },

  // pitch-deck-section: B2B brands
  { contentType: 'pitch-deck-section', brand: 'tuthill' },
  { contentType: 'pitch-deck-section', brand: 'studio-c' },
  { contentType: 'pitch-deck-section', brand: 'magazine' }, // B2B sponsor pitches
];

function buildDoc({ contentType, brand }) {
  const base = BASE[contentType];
  if (!base) throw new Error(`Unknown contentType: ${contentType}`);
  const audience = BRAND_AUDIENCE[brand] ?? base.audienceProfile;

  // Deterministic _id → re-running the seed overwrites in place.
  const docId = `contentTemplate.${contentType}.${brand}`;

  return {
    _id: docId,
    _type: 'contentTemplate',
    contentType,
    brand,
    audienceProfile: audience,
    voiceRules: base.voiceRules,
    requiredSections: base.requiredSections,
    lengthMin: base.lengthMin,
    lengthMax: base.lengthMax,
    forbiddenPhrases: base.forbiddenPhrases,
    // systemPrompt left empty — loader assembles from voice profile + these
    // fields at runtime. Tracy can override per-combo in Studio if she wants.
    systemPrompt: '',
    active: true,
  };
}

async function upsert(doc) {
  // Sanity mutate API requires the project-scoped hostname
  // (NOT the shared api.sanity.io) and path: /data/mutate/<dataset>.
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: [{ createOrReplace: doc }],
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    throw new Error(`${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.transactionId;
}

async function main() {
  console.log(`\n=== contentTemplate Sanity seed ===`);
  console.log(`Project: ${PROJECT_ID}`);
  console.log(`Dataset: ${DATASET}`);
  console.log(`Combos:  ${COMBOS.length}`);
  console.log(`Mode:    ${DRY_RUN ? 'DRY RUN (no mutations)' : 'WRITING'}\n`);

  let succeeded = 0;
  let failed = 0;
  for (const combo of COMBOS) {
    const doc = buildDoc(combo);
    process.stdout.write(`  ${doc._id} ... `);
    if (DRY_RUN) {
      console.log('skipped (dry-run)');
      continue;
    }
    try {
      const txnId = await upsert(doc);
      console.log(`✓ (txn ${txnId.slice(0, 8)})`);
      succeeded++;
    } catch (e) {
      console.log(`✗ ${e.message}`);
      failed++;
    }
  }

  if (DRY_RUN) {
    console.log(`\nDry run complete — ${COMBOS.length} docs would be upserted.`);
  } else {
    console.log(`\nDone — ${succeeded} upserted, ${failed} failed.`);
  }

  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
