// seed-content-pipeline.ts
// Flood the production pipeline with content jobs for all brands
// Run: npx tsx packages/database/scripts/seed-content-pipeline.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const CAMPAIGNS = [
  {
    name: 'DSD Launch Campaign',
    slug: 'dsd-launch-apr-2026',
    conceptNumber: 1,
    tagline: 'Your digital hygiene — handled.',
    jobs: [
      {
        title: 'DSD — Cancel ChatGPT :15',
        slug: 'dsd-cancel-chatgpt-15',
        format: ':15',
        voicePreset: 'chase',
        ttsScript: 'Cancel ChatGPT. This one already knows your business. Deep South Directory. Starting at twenty-five a month.',
        veoPrompt: 'Warm interior of a small-town restaurant in Mississippi. Owner behind counter, looking at phone. Camera slowly pushes in. Gold accent lighting. Southern atmosphere. No text on screen.',
        musicDirection: 'Acoustic guitar, warm, unhurried. Delta blues fingerpicking. Fade under voice.',
        cta: 'deepsouthdirectory.com',
      },
      {
        title: 'DSD — Digital Hygiene :30',
        slug: 'dsd-digital-hygiene-30',
        format: ':30',
        voicePreset: 'chase',
        ttsScript: 'Right now, someone in Natchez is Googling best restaurant near me. Your listing has wrong hours, no photos, and zero reviews. They picked your competitor. We fix that. Google listing corrected. Reviews monitored. Social posts going out every week. Ninety-nine dollars a month. Not a thousand. Deep South Directory.',
        veoPrompt: 'Split screen montage: left side shows a neglected Google listing with wrong hours, right side shows the same listing polished and correct. Transition to phone screen showing positive reviews. End on Main Street storefront with "OPEN" sign. Warm, real, not corporate.',
        musicDirection: 'Start quiet, build with confidence. Acoustic to light percussion. Warm, not urgent.',
        cta: 'deepsouthdirectory.com',
      },
      {
        title: 'DSD — We Live Here :30',
        slug: 'dsd-we-live-here-30',
        format: ':30',
        voicePreset: 'chase',
        ttsScript: 'The companies charging three hundred a month have never been to Mississippi. We ate at your restaurant last week. We know Regina makes biscuits on Tuesdays. We know the Anthologist has live music on Fridays. Deep South Directory. Run by people who actually live here.',
        veoPrompt: 'Documentary style. Real Natchez Main Street. Morning light on brick buildings. People walking, waving. Interior of Biscuits and Blues. The Anthologist storefront. Faces of real people, not actors. Golden hour.',
        musicDirection: 'Slide guitar, warm and personal. Like a conversation, not a commercial.',
        cta: 'deepsouthdirectory.com',
      },
      {
        title: 'DSD — Sovereign Pi :60',
        slug: 'dsd-sovereign-pi-60',
        format: ':60',
        voicePreset: 'chase',
        ttsScript: 'What if your business had its own computer? Not in some cloud. Not on someone else\'s server. On your counter. A small box that knows your hours, your menu, your customers. It answers questions. It posts to social media. It monitors your reviews. And it works even when the internet doesn\'t. We call it the Sovereign Pi. Free with your Deep South Directory membership. Your data. Your desk. Your business.',
        veoPrompt: 'Close-up of hands unboxing a small aluminum device. Plugging it into a TV behind a restaurant counter. Screen lights up showing a business dashboard. Cut to: the same device on a counter in golden light, with the restaurant busy behind it. Cut to: the device outdoors with a solar panel, at a food truck. End on the device sitting quietly on a desk, small green light blinking.',
        musicDirection: 'Piano and acoustic guitar. Thoughtful, not flashy. Build to quiet confidence. No drums.',
        cta: 'deepsouthdirectory.com/store/sovereign-pi',
      },
    ],
  },
  {
    name: 'Big Muddy Touring Promos',
    slug: 'bmt-touring-promos',
    conceptNumber: 2,
    tagline: 'Gateway to the heart of soul music.',
    jobs: [
      {
        title: 'Touring — The Route :30',
        slug: 'bmt-the-route-30',
        format: ':30',
        voicePreset: 'delta-dawn',
        ttsScript: 'From Natchez to Memphis. Through Vicksburg, Clarksdale, and every juke joint in between. The Big Muddy Touring route. Live music. Real towns. The sound of the Deep South, on stage every weekend. Big Muddy Touring dot com.',
        veoPrompt: 'Aerial shots of Mississippi River towns. Sunset over the river. Interior of a dim juke joint, band on stage. Audience clapping. Cut between 3-4 venues. End on the Big Muddy van driving down a two-lane road at dusk.',
        musicDirection: 'Blues harmonica intro. Build to full band — drums, bass, guitar. Raw, live sound. Not produced.',
        cta: 'bigmuddytouring.com',
      },
      {
        title: 'Blues Room — Friday Night :15',
        slug: 'bmt-blues-room-friday-15',
        format: ':15',
        voicePreset: 'delta-dawn',
        ttsScript: 'Friday night. Blues Room. Downtown Natchez. The band starts at nine. Big Muddy Touring.',
        veoPrompt: 'Quick cuts: neon sign, guitar neck, hands on piano keys, audience silhouette, whiskey glass on bar, drummer in motion. All dark with warm amber lighting. Fast energy.',
        musicDirection: 'Electric blues riff. Raw. Like you walked past the open door and heard it from the street.',
        cta: 'bigmuddytouring.com/events',
      },
    ],
  },
  {
    name: 'Big Muddy Magazine Features',
    slug: 'bmm-magazine-features',
    conceptNumber: 3,
    tagline: 'Stories from the Deep South.',
    jobs: [
      {
        title: 'Magazine — Regina\'s Biscuits :60',
        slug: 'bmm-regina-biscuits-60',
        format: ':60',
        voicePreset: 'chase',
        ttsScript: 'Regina Charboneau trained at Le Cordon Bleu. She cooked in San Francisco. She wrote cookbooks. Andrew Zimmern has her number in his phone. And she came back to Natchez, Mississippi — population sixteen thousand — to make biscuits. Not artisanal small-batch heritage-grain biscuits. Just biscuits. The kind your grandmother made if your grandmother knew what she was doing. Read the full story in Big Muddy Magazine.',
        veoPrompt: 'Close-up: hands kneading dough on a flour-dusted counter. Wide shot: Biscuits and Blues interior, warm morning light. Regina (older woman, confident) pulling a tray from the oven. Macro: golden biscuit breaking open, steam rising. Main Street exterior. Magazine cover reveal at the end.',
        musicDirection: 'Solo piano. Simple, warm, unhurried. Like Sunday morning in a kitchen.',
        cta: 'bigmuddymagazine.com',
      },
    ],
  },
  {
    name: 'Big Muddy Radio Spots',
    slug: 'bmr-radio-spots',
    conceptNumber: 4,
    tagline: 'The sound of the Deep South.',
    jobs: [
      {
        title: 'Radio — Station ID :10',
        slug: 'bmr-station-id-10',
        format: ':10',
        voicePreset: 'delta-dawn',
        ttsScript: 'You\'re listening to Big Muddy Radio. Live from Natchez, Mississippi. The sound of the Deep South.',
        veoPrompt: null,
        musicDirection: 'Blues guitar lick — 3 seconds. Signature sound. Same every time. Recognizable.',
        cta: 'bigmuddyradio.com',
      },
      {
        title: 'Radio — DSD Sponsor Spot :15',
        slug: 'bmr-dsd-sponsor-15',
        format: ':15',
        voicePreset: 'delta-dawn',
        ttsScript: 'This hour brought to you by the Deep South Directory. Your business, online, done right. Starting at free. Visit deep south directory dot com.',
        veoPrompt: null,
        musicDirection: 'Soft bed under voice. Acoustic guitar. Fade in, fade out.',
        cta: 'deepsouthdirectory.com',
      },
      {
        title: 'Radio — Inn Promo :20',
        slug: 'bmr-inn-promo-20',
        format: ':20',
        voicePreset: 'delta-dawn',
        ttsScript: 'Six rooms in downtown Natchez. A Blues Room downstairs with live music every weekend. The Big Muddy Inn. Where the sound lives. Book direct at big muddy touring dot com.',
        veoPrompt: null,
        musicDirection: 'Muted trumpet over soft rhythm section. Late-night jazz feel. Warm.',
        cta: 'bigmuddytouring.com/touring/inn',
      },
    ],
  },
  {
    name: 'Big Muddy Records Artist Profiles',
    slug: 'bmrec-artist-profiles',
    conceptNumber: 5,
    tagline: 'Artists own their masters.',
    jobs: [
      {
        title: 'Records — Mechanical Bull :30',
        slug: 'bmrec-mechanical-bull-30',
        format: ':30',
        voicePreset: 'chase',
        ttsScript: 'Country, southern rock, and the kind of seventy\'s California guitar tone that makes you want to drive with the windows down. Mechanical Bull. Seventeen tracks of outlaw country from Woodstock, New York. On Big Muddy Records. Artists keep their masters.',
        veoPrompt: 'Band performance footage feel: guitarist silhouette against sunset, drummer in motion, bass player in a dim rehearsal room. Cut to: vinyl record spinning. Album artwork reveal. Woodstock, NY exterior shots — trees, old buildings, studio entrance.',
        musicDirection: 'Use actual Mechanical Bull track — pick the hookiest 15 seconds. Raw recording, not overproduced.',
        cta: 'bigmuddyrecordlabel.com',
      },
      {
        title: 'Records — Arrie Aslin :30',
        slug: 'bmrec-arrie-aslin-30',
        format: ':30',
        voicePreset: 'chase',
        ttsScript: 'Arrie Aslin. Co-owner of the Big Muddy Inn. Resident artist. Gospel and blues from Natchez, Mississippi. The Rise Up Gospel and Blues Band travels the Deep South — at every stop, a live show, a talent search, and the community that makes it all work. On Big Muddy Records.',
        veoPrompt: 'Arrie performing: stage, microphone, hands on guitar. Audience in a small venue, real faces, real reactions. Cut to: the Inn exterior at golden hour. Band loading gear into a van. Community gathering around a stage outdoors.',
        musicDirection: 'Gospel blues. Organ, choir feel, building to a crescendo. Spiritual energy.',
        cta: 'bigmuddyrecordlabel.com',
      },
    ],
  },
  {
    name: 'Bearsville Creative Preview',
    slug: 'bearsville-preview',
    conceptNumber: 6,
    tagline: 'Where the sound lives. Northeast.',
    jobs: [
      {
        title: 'Bearsville — Coming Summer 2026 :30',
        slug: 'bearsville-summer-2026-30',
        format: ':30',
        voicePreset: 'chase',
        ttsScript: 'Utopia Studios. Bearsville, New York. A legendary recording studio campus in the Catskills. This summer, it becomes the northeast node of the Big Muddy network. Same platform. Different region. New operators. Bearsville Creative. Coming summer twenty twenty-six.',
        veoPrompt: 'Aerial: wooded campus, old buildings among trees, Catskill mountains in background. Interior: recording studio control room, mixing desk, microphones. Golden light through windows. End on the Bearsville Creative logo — gold on dark.',
        musicDirection: 'Atmospheric. Reverb-heavy guitar. Spacious. Like the sound of the room itself.',
        cta: 'bearsvillemediagroup.com',
      },
    ],
  },
  {
    name: 'Outsider Economics Readings',
    slug: 'oe-readings',
    conceptNumber: 7,
    tagline: 'Field notes on local economic sovereignty.',
    jobs: [
      {
        title: 'OE — The Extraction Trap :3:00',
        slug: 'oe-extraction-trap-3min',
        format: '3:00',
        voicePreset: 'chase',
        ttsScript: 'Eighty cents of every dollar earned in a small Southern town leaves within forty-eight hours. Not bad luck. Not poverty. A machine designed to drain you. Here\'s how it works — and how to stop it. The dollar starts in someone\'s hand. A paycheck, a tip, a cash sale. Within minutes, it moves. Gas station, grocery store, pharmacy. Each one is a valve. Not a destination — a pass-through. The gas comes from a refinery in Houston. The groceries come from a distributor in Atlanta. The pharmacy is a chain headquartered in Rhode Island. Every transaction is an exit ramp for that dollar. This is Chapter Two of Outsider Economics. The full field manual is free at outsider economics dot com.',
        veoPrompt: 'Documentary style. Small town Main Street. Slow pan across storefronts — some open, some boarded. A dollar bill animation showing the flow: hand → register → truck → highway → corporate office. Real faces of real people. Not dramatic. Observational. Like a nature documentary about money.',
        musicDirection: 'Minimal. Ambient. Single instrument — maybe a banjo or steel guitar, very sparse. Let the words carry it.',
        cta: 'outsidereconomics.com',
      },
    ],
  },
];

async function seed() {
  console.log('Seeding content pipeline...');

  for (const campaign of CAMPAIGNS) {
    const c = await prisma.productionCampaign.upsert({
      where: { slug: campaign.slug },
      create: {
        name: campaign.name,
        slug: campaign.slug,
        conceptNumber: campaign.conceptNumber,
        tagline: campaign.tagline,
        status: 'active',
      },
      update: { name: campaign.name, tagline: campaign.tagline },
    });

    console.log(`Campaign: ${c.name} (${c.id})`);

    for (const job of campaign.jobs) {
      const j = await prisma.productionJob.upsert({
        where: { slug: job.slug },
        create: {
          campaignId: c.id,
          title: job.title,
          slug: job.slug,
          format: job.format,
          stage: 'script',
          voicePreset: job.voicePreset,
          ttsScript: job.ttsScript,
          veoPrompt: job.veoPrompt || null,
          musicDirection: job.musicDirection,
          cta: job.cta,
        },
        update: {
          title: job.title,
          ttsScript: job.ttsScript,
          veoPrompt: job.veoPrompt || null,
          musicDirection: job.musicDirection,
        },
      });

      console.log(`  Job: ${j.title} [${j.format}] → ${j.stage}`);
    }
  }

  console.log('\nPipeline seeded. Run production jobs from /admin/productions.');
}

seed()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
