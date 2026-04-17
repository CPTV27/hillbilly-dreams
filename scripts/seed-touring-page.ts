/**
 * scripts/seed-touring-page.ts
 *
 * Create or replace the `touringPage` singleton in Sanity with the CURRENT
 * content of apps/web/app/touring/page.tsx. Idempotent — uses a fixed _id.
 *
 * Hero image is intentionally left blank (null) — Chase picks a new one in
 * the Studio from the freshly-uploaded asset library.
 *
 * Capability-card and session images reference the existing GCS URLs as
 * external placeholders via an `externalUrl` sibling field on the object
 * (the page renderer reads either a Sanity asset OR this external URL).
 *
 * Run from repo root (env must be loaded):
 *   set -a && source apps/web/.env.local && set +a && \
 *     npx tsx scripts/seed-touring-page.ts
 */

import { createClient } from '@sanity/client';

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('✗ Missing SANITY_PROJECT_ID or SANITY_API_TOKEN.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const SINGLETON_ID = 'touringPage-singleton';

const doc = {
  _id: SINGLETON_ID,
  _type: 'touringPage',

  hero: {
    eyebrow: 'Big Muddy Touring',
    headline: 'We bring|the party.', // | forces <br />
    subhead:
      'We book the bands. We drive them there. We put them on the radio. We put them on a record. We book them a room. And we split it fair.',
    // heroImage intentionally omitted — Chase picks from Studio.
    primaryCta: { label: 'Bring Your Band', href: '#bands' },
    secondaryCta: { label: 'Book Your Venue', href: '#venues' },
  },

  capabilityCards: [
    {
      _key: 'cap01',
      num: '01',
      heading: 'BOOK',
      body: 'Real venue relationships across the corridor.',
      proof: '26 venues across 13 cities, Memphis to New Orleans.',
    },
    {
      _key: 'cap02',
      num: '02',
      heading: 'TRANSPORT',
      body: 'Sprinter van, gear handling, no rentals required.',
      proof: 'Wrap landing this week. Yours for the run.',
    },
    {
      _key: 'cap03',
      num: '03',
      heading: 'PROMOTE',
      body: 'Through media we own, not platforms we rent.',
      proof: 'Big Muddy Magazine + Big Muddy Radio + corridor social — every show.',
    },
    {
      _key: 'cap04',
      num: '04',
      heading: 'RECORD',
      body: 'Sessions and releases through Big Muddy Records.',
      proof: '55 tracks in the catalog. Non-exclusive deals. You keep your masters.',
    },
    {
      _key: 'cap05',
      num: '05',
      heading: 'HOUSE',
      body: 'The Big Muddy Inn in Natchez, on the river.',
      proof: '6 rooms. Blues Room. Production base camp.',
    },
    {
      _key: 'cap06',
      num: '06',
      heading: 'SPLIT FAIR',
      body: "Artist-first deals. Non-exclusive. Terms we’d want if we were the ones on stage.",
      proof: 'Deal structures vary by artist and project — built together, not dictated.',
    },
  ],

  loopSection: {
    eyebrow: 'The Loop',
    headline: 'Memphis to New Orleans.',
    subhead: 'The Mississippi corridor. Real cities, real rooms, real audiences.',
    // Format: "City, ST" — suffix " *" marks the anchor city (Natchez).
    cities: [
      'Memphis, TN',
      'Tunica, MS',
      'Helena, AR',
      'Clarksdale, MS',
      'Greenville, MS',
      'Indianola, MS',
      'Yazoo City, MS',
      'Vicksburg, MS',
      'Natchez, MS *',
      'St. Francisville, LA',
      'Baton Rouge, LA',
      'Lafayette, LA',
      'New Orleans, LA',
    ],
    partnerNote:
      "Working with corridor partner Sean Davis (Doug Duffey’s manager, former director of the Delta Blues Museum) to expand routes through the Delta circuit.",
  },

  houseBandSection: {
    headline: 'Every great scene|had a house band.', // | = <br />
    body:
      "Muscle Shoals had the Swampers. Memphis had Booker T. & the M.G.’s. Stax had its rhythm section. Big Muddy has a rotating crew of corridor players who can back any artist who comes through. Singer-songwriter rolls in with no band? We’ve got you. Touring act needs a fill-in horn section? Done.",
    closer: "If you can play, you’re on the list. The music just has to be good.",
  },

  sessions: [
    {
      _key: 'ses01',
      title: 'Blues Room — Friday Night Sessions',
      description: 'Weekly live recordings at the Inn, every Friday.',
      note: 'Arrie Aslin hosts.',
    },
    {
      _key: 'ses02',
      title: 'Save the Hall Ball — A Night at Stanton Hall',
      description: 'Pilgrimage Garden Club fundraiser, March 2026.',
      note: 'Live recording in the magazine archive.',
    },
    {
      _key: 'ses03',
      title: 'Amy Allen — Live at Five',
      description: 'May 8 at the Big Muddy Inn.',
      note: 'Album showcase.',
    },
    {
      _key: 'ses04',
      title: 'Studio C Sessions — Utopia, Woodstock NY',
      description: 'Spring sessions for the corridor catalog.',
      note: 'Tracking now.',
    },
  ],

  threeDoorsOut: {
    bands: {
      eyebrow: 'For Bands',
      headline: 'Bring your band|to the corridor.',
      body:
        "Submit your music. We’ll listen. If it fits, we’ll route a tour, put you on the radio, and book you a room.",
      ctaLabel: 'Submit Your Band',
      ctaHref: 'mailto:bookings@bigmuddytouring.com',
    },
    venues: {
      eyebrow: 'For Venues',
      headline: 'Get on|the circuit.',
      body:
        "Tell us what you can hold and what nights are open. We’ll bring confirmed acts, production support, and audience.",
      ctaLabel: 'Get on the Circuit',
      ctaHref: 'mailto:bookings@bigmuddytouring.com',
    },
    fans: {
      eyebrow: 'For Fans',
      headline: "What’s|coming up.",
      body:
        'Live music every week somewhere on the river. The radio plays it 24/7. The magazine writes about it.',
      links: [
        { _key: 'ln01', label: 'Listen to Big Muddy Radio →', href: '/radio' },
        { _key: 'ln02', label: 'Read the Magazine →', href: '/magazine' },
        { _key: 'ln03', label: 'See Upcoming Shows →', href: '/touring/shows' },
      ],
    },
  },

  footerLine: 'Big Muddy Touring — Natchez, Mississippi',
};

async function main() {
  console.log(`→ Seeding ${SINGLETON_ID} in ${projectId}/${dataset}…`);
  const result = await client.createOrReplace(doc as any);
  console.log(`✓ OK  _id=${result._id}  _rev=${result._rev}`);
  console.log('\n  Open the Studio at https://bigmuddytouring.com/studio to edit.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
