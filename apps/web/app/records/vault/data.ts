// apps/web/app/records/vault/data.ts
// ─────────────────────────────────────────────────────────────
// MELODY VAULT — Demo Seed Data
// ─────────────────────────────────────────────────────────────
// Static seed for the same-night demo of the Melody Vault internal control
// panels. Mirrors the four roster artists referenced on the public records site.
//
// TODO(post-demo): Migrate this into Prisma — most fields already have a home
//   on the Artist / Track / Performance models. The strategy/calendar/checklist
//   blobs would become ArtistStrategyDoc + CampaignTask + EpkChecklistItem
//   tables. For tonight, this stays in-process so we can ship.

export type CapabilityStatus = 'operational' | 'demo' | 'next' | 'later';

export interface CapabilityCard {
  title: string;
  status: CapabilityStatus;
  blurb: string;
}

export interface StrategyDoc {
  positioning: string;
  audience: string;
  influences: string[];
  markets: string[];
  goals: string[];
}

export interface CampaignMilestone {
  /** Day offset from release. Negative = pre-release, 0 = release day, positive = post. */
  day: number;
  label: string;
  channel: 'radio' | 'magazine' | 'social' | 'live' | 'sync' | 'studio' | 'pr';
  status: 'done' | 'in-progress' | 'planned';
}

export interface ArtistTask {
  title: string;
  due: string;
  status: 'open' | 'in-review' | 'done';
}

export interface EpkChecklistItem {
  label: string;
  status: 'collected' | 'requested' | 'missing';
}

export interface AudiencePlan {
  primarySegments: string[];
  geoTargets: string[];
  lookalikes: string[];
  /** Channel mix in priority order — top of list = highest spend / focus */
  channelMix: string[];
}

export interface VaultArtist {
  slug: string;
  name: string;
  hometown: string;
  genre: string;
  tagline: string;
  status: 'discovered' | 'developing' | 'campaigning' | 'touring';
  strategy: StrategyDoc;
  audiencePlan: AudiencePlan;
  calendar: CampaignMilestone[];
  tasks: ArtistTask[];
  epk: EpkChecklistItem[];
  socials: { label: string; url: string | null }[];
}

// ─────────────────────────────────────────────────────────────
// Capability cards — what Melody Vault is, by status.
// Honest claims policy: nothing here claims a feature is shipped that isn't.
// ─────────────────────────────────────────────────────────────

export const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title: 'Audience Identification',
    status: 'demo',
    blurb:
      'Per-artist segmentation: who actually listens, where they live, what other artists they follow. Demo surface uses static segments tonight; live data sources (Spotify for Artists, Meta audiences, ticketing) wire in next.',
  },
  {
    title: 'Targeting & Channel Mix',
    status: 'demo',
    blurb:
      'Prioritized channel plan per release window — radio rotation, magazine features, paid social, owned email. Status flags show which placements are confirmed vs. planned.',
  },
  {
    title: 'Marketing Calendar',
    status: 'operational',
    blurb:
      'Day -30 to Day +30 release timeline with per-channel milestones. Radio adds, press hits, social drops, live anchors. Editable per artist.',
  },
  {
    title: 'EPK & Content Collection',
    status: 'operational',
    blurb:
      'Bio, photos, audio, one-sheet, performance video, social handles — collected from artists through onboarding and tracked here against a checklist.',
  },
  {
    title: 'Strategy & Positioning Docs',
    status: 'operational',
    blurb:
      'Living strategy doc per artist: positioning line, target audience, reference influences, market priorities, goals. Visible to artist and label staff.',
  },
  {
    title: 'Catalog Metadata',
    status: 'next',
    blurb:
      'ISRC, ISWC, songwriter splits, label copy. Track model already exists in the database; the vault editor is the next build.',
  },
  {
    title: 'Splits Readiness',
    status: 'next',
    blurb:
      'Songwriter, master, and producer splits captured per track with countersignature. Backed by Split model in schema; UI build follows catalog metadata.',
  },
  {
    title: 'Sync & Licensing Prep',
    status: 'later',
    blurb:
      'Pre-cleared sync brief, mood/genre tags, instrumental availability — sent to placement agents. Manual today, automated as the catalog grows.',
  },
  {
    title: 'PRO & Royalty Reporting',
    status: 'later',
    blurb:
      'PRO registration tracking and statement reconciliation across distributor, mechanicals, and performance income. Downstream of splits readiness.',
  },
  {
    title: 'AI-Assisted Briefing',
    status: 'later',
    blurb:
      'Auto-drafted release plans, press blurbs, and audience insights from artist inputs. Roadmap item — explicitly not shipped.',
  },
];

// ─────────────────────────────────────────────────────────────
// Roster — four artists with full strategy + calendar
// ─────────────────────────────────────────────────────────────

export const VAULT_ARTISTS: VaultArtist[] = [
  {
    slug: 'mechanical-bull',
    name: 'Mechanical Bull',
    hometown: 'Woodstock, NY',
    genre: 'Alt-Country / Southern Rock',
    tagline: '70s California guitar tone, two-album catalog, John Medeski on organ.',
    status: 'campaigning',
    strategy: {
      positioning:
        'A working band with a deep catalog, not a project. Lean into the players: Medeski on organ, Widoff’s arrangements, the Hudson Valley room sound. Position as a band that adults who used to love rock and roll will love again.',
      audience:
        'Late 30s–60s, Americana / classic-rock listeners, NPR-music adjacent. Hudson Valley / NYC core; Mississippi corridor secondary via Big Muddy Touring routing.',
      influences: ['The Band', 'Little Feat', 'Wilco', 'Tom Petty', 'JJ Cale'],
      markets: ['Hudson Valley, NY', 'NYC', 'Natchez / Memphis corridor', 'Asheville', 'Austin'],
      goals: [
        'Re-release A Million Yesterdays with full distribution and press cycle.',
        'Cut a live Blues Room session to seed Big Muddy Radio rotation.',
        'Book a six-city corridor run anchored by the Inn.',
      ],
    },
    audiencePlan: {
      primarySegments: [
        'Americana/roots streaming listeners 35–65',
        'Hudson Valley music scene loyalists',
        'Big Muddy Radio / Magazine existing audience',
      ],
      geoTargets: ['Kingston/Woodstock', 'Brooklyn', 'Natchez', 'Memphis', 'New Orleans'],
      lookalikes: ['The Felice Brothers', 'Amos Lee', 'Hiss Golden Messenger'],
      channelMix: [
        'Big Muddy Radio rotation + American Parlor Songbook feature',
        'Big Muddy Magazine band profile (earned)',
        'Owned email — Hudson Valley + Mississippi lists',
        'Spotify editorial pitch via distributor',
        'Targeted Meta — lookalike of Felice Brothers / Amos Lee fans',
      ],
    },
    calendar: [
      { day: -28, label: 'Strategy doc finalized + EPK locked', channel: 'studio', status: 'done' },
      { day: -21, label: 'Big Muddy Magazine feature interview booked', channel: 'magazine', status: 'in-progress' },
      { day: -14, label: 'Single sent to Big Muddy Radio (early add)', channel: 'radio', status: 'planned' },
      { day: -10, label: 'Spotify editorial pitch via distributor', channel: 'pr', status: 'planned' },
      { day: -7, label: 'Pre-save campaign live', channel: 'social', status: 'planned' },
      { day: 0, label: 'Single drop + Magazine feature publishes', channel: 'magazine', status: 'planned' },
      { day: 3, label: 'Blues Room live session airs', channel: 'live', status: 'planned' },
      { day: 14, label: 'Corridor run kickoff — Natchez', channel: 'live', status: 'planned' },
      { day: 28, label: 'Sync placement brief sent to 3 supervisors', channel: 'sync', status: 'planned' },
    ],
    tasks: [
      { title: 'Approve final mix of lead single', due: 'Day -21', status: 'in-review' },
      { title: 'Submit press photos (vertical + horizontal)', due: 'Day -25', status: 'open' },
      { title: 'Confirm corridor run dates with Inn calendar', due: 'Day -14', status: 'open' },
      { title: 'Sign updated label deal memo', due: 'Day -30', status: 'done' },
    ],
    epk: [
      { label: 'Long-form bio', status: 'collected' },
      { label: 'Short bio (250 words)', status: 'collected' },
      { label: 'Press photos (3+, hi-res)', status: 'requested' },
      { label: 'Streaming-ready masters', status: 'collected' },
      { label: 'Live performance video', status: 'requested' },
      { label: 'One-sheet PDF', status: 'missing' },
    ],
    socials: [
      { label: 'Website', url: 'https://mechanicalbullband.blogspot.com' },
      { label: 'Spotify', url: null },
      { label: 'Instagram', url: null },
    ],
  },
  {
    slug: 'amy-allen',
    name: 'Amy Allen',
    hometown: 'Natchez, MS',
    genre: 'Soul / Blues / Storytelling',
    tagline: 'The Rhythm Nightclub Fire song. The reason this label exists.',
    status: 'developing',
    strategy: {
      positioning:
        'A Natchez songwriter whose material reads like oral history. Lead with the Rhythm Nightclub Fire song — it is the strongest emotional anchor in the catalog and ties the label to its place. Frame Amy as the voice of the river towns.',
      audience:
        'NPR-music listeners, civil-rights and Southern-history audiences, soul/blues purists. Strong fit for World Café / Mountain Stage / Tiny Desk pitches over time.',
      influences: ['Mavis Staples', 'Rhiannon Giddens', 'Lucinda Williams', 'Bettye LaVette'],
      markets: ['Natchez', 'Jackson', 'Memphis', 'Atlanta', 'Brooklyn'],
      goals: [
        'Release debut EP (Spring 2026) with the Rhythm Nightclub Fire song as anchor.',
        'Pitch World Café / Mountain Stage for the EP cycle.',
        'Develop a 5-show storytelling tour in partnership with regional museums.',
      ],
    },
    audiencePlan: {
      primarySegments: [
        'NPR-music listeners 35–70',
        'Civil-rights and Southern-history readers',
        'Soul/blues catalog listeners',
      ],
      geoTargets: ['Natchez', 'Jackson', 'Memphis', 'Atlanta', 'Brooklyn'],
      lookalikes: ['Mavis Staples', 'Rhiannon Giddens', 'Adia Victoria'],
      channelMix: [
        'Big Muddy Magazine long-form feature (earned)',
        'Big Muddy Radio rotation + interview',
        'World Café / Mountain Stage pitch',
        'Owned email + region partner emails (museums, libraries)',
        'Targeted Meta — narrow geo + lookalikes',
      ],
    },
    calendar: [
      { day: -30, label: 'Strategy doc + Rhythm Nightclub research file', channel: 'studio', status: 'done' },
      { day: -24, label: 'EPK collection in progress', channel: 'studio', status: 'in-progress' },
      { day: -18, label: 'Rough mixes circulated to label staff', channel: 'studio', status: 'planned' },
      { day: -10, label: 'Magazine long-form interview taped', channel: 'magazine', status: 'planned' },
      { day: -7, label: 'World Café pitch packet sent', channel: 'pr', status: 'planned' },
      { day: 0, label: 'EP release', channel: 'magazine', status: 'planned' },
      { day: 7, label: 'Storytelling night at the Inn (livestream)', channel: 'live', status: 'planned' },
      { day: 21, label: 'Region museum tour announce', channel: 'pr', status: 'planned' },
    ],
    tasks: [
      { title: 'Submit social handles + bio to vault', due: 'Day -28', status: 'open' },
      { title: 'Approve EP track sequence', due: 'Day -20', status: 'open' },
      { title: 'Confirm photographer for press shoot', due: 'Day -22', status: 'in-review' },
      { title: 'Write story-behind-the-song notes for each track', due: 'Day -14', status: 'open' },
    ],
    epk: [
      { label: 'Long-form bio', status: 'requested' },
      { label: 'Short bio (250 words)', status: 'collected' },
      { label: 'Press photos (3+, hi-res)', status: 'missing' },
      { label: 'Rough mixes / streaming masters', status: 'requested' },
      { label: 'Live performance video', status: 'missing' },
      { label: 'One-sheet PDF', status: 'missing' },
    ],
    socials: [
      { label: 'Spotify', url: null },
      { label: 'Instagram', url: null },
      { label: 'Website', url: null },
    ],
  },
  {
    slug: 'arrie-aslin',
    name: 'Arrie Aslin & Rise Up',
    hometown: 'Natchez, MS',
    genre: 'Americana / Parlor Folk / Blues',
    tagline:
      'Artist-in-Residence at the Big Muddy Inn. American Parlor Songbook host. House band for Friday Blues Room.',
    status: 'touring',
    strategy: {
      positioning:
        'Arrie is the curator-musician of the label — host of the Friday Blues Room, voice of the American Parlor Songbook radio show, and front-of-house for Rise Up. Her career arc and the Inn’s programming reinforce each other.',
      audience:
        'Inn-circuit travelers, parlor-folk and acoustic-blues listeners, public radio crossover. Local Natchez audience as the loyal core; tourist + media audience as the growth ring.',
      influences: ['Gillian Welch', 'Iris DeMent', 'Bonnie Raitt', 'Jerry Douglas'],
      markets: ['Natchez (resident)', 'Memphis', 'Nashville', 'Asheville', 'New Orleans'],
      goals: [
        'Release first American Parlor Songbook session (live-from-the-Inn series).',
        'Anchor Friday Blues Room as the must-visit live music night in Natchez.',
        'Develop a touring version of Rise Up that hits the corridor twice a year.',
      ],
    },
    audiencePlan: {
      primarySegments: [
        'Public radio Americana listeners',
        'Travelers booking the Big Muddy Inn',
        'Parlor / acoustic blues purists',
      ],
      geoTargets: ['Natchez', 'New Orleans', 'Memphis', 'Nashville', 'Asheville'],
      lookalikes: ['Gillian Welch', 'Iris DeMent', 'I’m With Her'],
      channelMix: [
        'American Parlor Songbook radio show (owned)',
        'Inn front-desk + concierge cross-promo',
        'Big Muddy Magazine column',
        'Targeted Meta — Inn-stay travelers + lookalikes',
        'Local press (Mississippi Today, Natchez Democrat)',
      ],
    },
    calendar: [
      { day: -30, label: 'Strategy doc finalized', channel: 'studio', status: 'done' },
      { day: -21, label: 'Parlor Songbook session #1 recorded', channel: 'studio', status: 'in-progress' },
      { day: -14, label: 'Magazine column published', channel: 'magazine', status: 'planned' },
      { day: -7, label: 'Radio show feature episode', channel: 'radio', status: 'planned' },
      { day: 0, label: 'Live session release + Inn livestream', channel: 'live', status: 'planned' },
      { day: 14, label: 'Corridor run announce', channel: 'pr', status: 'planned' },
      { day: 28, label: 'Parlor Songbook session #2', channel: 'studio', status: 'planned' },
    ],
    tasks: [
      { title: 'Confirm session musicians for Rise Up', due: 'Day -25', status: 'done' },
      { title: 'Approve session #1 final mix', due: 'Day -10', status: 'open' },
      { title: 'Update Inn concierge sheet with Friday lineup', due: 'Weekly', status: 'in-review' },
    ],
    epk: [
      { label: 'Long-form bio', status: 'collected' },
      { label: 'Short bio (250 words)', status: 'collected' },
      { label: 'Press photos (3+, hi-res)', status: 'collected' },
      { label: 'Live performance video', status: 'collected' },
      { label: 'Streaming-ready masters', status: 'requested' },
      { label: 'One-sheet PDF', status: 'requested' },
    ],
    socials: [
      { label: 'Instagram', url: null },
      { label: 'Spotify', url: null },
    ],
  },
  {
    slug: 'kate-squire',
    name: 'Kate Squire',
    hometown: 'Mississippi Region',
    genre: 'Folk / Americana / Singer-Songwriter',
    tagline: 'Quiet songs that hit hard. Spare arrangements, honest vocals.',
    status: 'developing',
    strategy: {
      positioning:
        'Kate is the spare-arrangement songwriter on the roster. Position around restraint — solo guitar / vocal recordings, room sound, no decoration. The opposite of the production-heavy pop-folk lane; it is what makes her a quiet standout.',
      audience:
        'Singer-songwriter listeners, sad-but-pretty playlist regulars, independent-bookstore demographic. Strong WFUV / WUMB / Folk Alley fit.',
      influences: ['Lori McKenna', 'Patty Griffin', 'Anaïs Mitchell', 'Damien Jurado'],
      markets: ['Jackson', 'Oxford, MS', 'Nashville', 'Brooklyn', 'Boston'],
      goals: [
        'Release first three songs as a single-then-EP arc (test which one travels).',
        'Get one Folk Alley feature.',
        'Open for Arrie at three Friday Blues Room sessions to build local audience.',
      ],
    },
    audiencePlan: {
      primarySegments: [
        'Folk / singer-songwriter playlist listeners',
        'Public folk radio audiences (WFUV, WUMB, Folk Alley)',
        'Independent bookstore + literary podcast demographic',
      ],
      geoTargets: ['Jackson', 'Oxford, MS', 'Nashville', 'Brooklyn', 'Boston'],
      lookalikes: ['Lori McKenna', 'Anaïs Mitchell', 'Damien Jurado'],
      channelMix: [
        'Folk Alley + public-folk radio pitch',
        'Big Muddy Radio rotation',
        'Magazine first-listen feature',
        'Owned email — independent bookstore partners',
        'Targeted Meta — narrow lookalikes',
      ],
    },
    calendar: [
      { day: -30, label: 'Onboarding form + influences submitted', channel: 'studio', status: 'in-progress' },
      { day: -21, label: 'First three songs tracked at Studio C', channel: 'studio', status: 'planned' },
      { day: -10, label: 'Press photos shot', channel: 'studio', status: 'planned' },
      { day: -7, label: 'Folk Alley pitch packet sent', channel: 'pr', status: 'planned' },
      { day: 0, label: 'Lead single drop', channel: 'radio', status: 'planned' },
      { day: 21, label: 'Magazine first-listen', channel: 'magazine', status: 'planned' },
      { day: 28, label: 'Open for Arrie — Friday Blues Room', channel: 'live', status: 'planned' },
    ],
    tasks: [
      { title: 'Complete onboarding form (socials, influences, markets)', due: 'Day -28', status: 'open' },
      { title: 'Send three demos for label review', due: 'Day -25', status: 'open' },
      { title: 'Confirm tracking dates with Studio C', due: 'Day -22', status: 'open' },
    ],
    epk: [
      { label: 'Long-form bio', status: 'requested' },
      { label: 'Short bio (250 words)', status: 'requested' },
      { label: 'Press photos (3+, hi-res)', status: 'missing' },
      { label: 'Streaming-ready masters', status: 'missing' },
      { label: 'Live performance video', status: 'missing' },
      { label: 'One-sheet PDF', status: 'missing' },
    ],
    socials: [
      { label: 'Website', url: 'https://kateskwiremusic.com' },
      { label: 'Spotify', url: null },
      { label: 'Instagram', url: null },
    ],
  },
];

export function getVaultArtist(slug: string): VaultArtist | undefined {
  return VAULT_ARTISTS.find((a) => a.slug === slug);
}
