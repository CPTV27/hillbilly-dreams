// ─────────────────────────────────────────────────────────────
// MEASURABLY BETTER DIRECTIVE — LOCKED 2026-03-24
// ─────────────────────────────────────────────────────────────
// This file is the single source of truth for ALL brand copy,
// pricing, entity structure, and narrative language.
// UI components import from here — never hardcode narrative text.
//
// ARCHITECTURE:
//   HoldCo:           Hillbilly Dreams Inc. (IP, Vertex AI rails, ledger)
//   Product Brand:    Measurably Better™ (measurablybetterthings.com)
//   Internal V1:      Big Buddy (Hospitality/Travel/Entertainment — our money, our pipes)
//   External V2:      S2PX / Scan2Plan (AEC JV — Owen 10% figurehead, HDX 90% infra)
// ─────────────────────────────────────────────────────────────

export const HDX_NARRATIVE = {
  // ── Corporate Architecture ──
  holdCo: 'Hillbilly Dreams Inc.',
  productBrand: 'Measurably Better',
  productDomain: 'measurablybetterthings.com',
  verticals: {
    internal: { name: 'Big Buddy', sector: 'Hospitality, Travel, Entertainment' },
    external: { name: 'S2PX / Scan2Plan', sector: 'AEC Industry' },
  },

  // ── SaaS Pricing Tiers ──
  tiers: {
    free: { name: 'The Hook', price: 0, desc: 'Generous free account. Let them touch the utility.' },
    engine: { name: 'The Engine', price: 99, desc: 'Turnkey Utility Node. Off-the-shelf, zero-configuration automation.' },
    enterprise: { name: 'Enterprise / JV', price: null, desc: 'Custom deployments. Platform fees, equity splits, bespoke rails.' },
  },

  // ── S2PX JV Parameters (Model A — Owen) ──
  s2pxJV: {
    platformFee: 134_000,
    equitySplit: '90/10',   // HDX 90%, Owen 10% figurehead CEO
    hdxCommission: 7,
    baseRevenue: 1_120_000,
    outsideServices: 358_000,
    baseNetIncome: 261_000,
  },

  // ── Core Identity & Copy ──
  tagline: 'Measurably Better.',
  corePositioning: 'For everything, we are substantially and measurably better.',
  thePromise:
    'Life is supposed to get easier. This is the easy you\'ve been looking for.',
  thePromiseFull:
    'Yes, we run on the most advanced tech in the world. Because life is supposed to get easier, not harder. This is the easy you\'ve been looking for, and we\'re going to save you money.',
  canonicalClosing: 'We build local. The value stays local. We grow from within.',
  wrapperThesis: 'We don\'t build models. We build the rails.',
  economicPitch: 'We\'re not free — we\'re 60% cheaper and none of it leaves your zip code.',
  enginePitch: 'The antidote to the DIY open-source science project.',

  // ── The Problem ──
  coreProblem: 'The Deep South has an 80% extraction rate.',

  // ── Quantified Metrics ──
  metrics: {
    adminOverheadLoss: '23%',
    s2pxAnchor: '$134K/yr with an 82% platform margin',
    zeroItPlay: 'Replace $8,500/mo traditional IT overhead with a $99/mo Turnkey Node',
    zeroItTraditional: 8_500,
    zeroItNode: 99,
    retentionExtractive: 70,
    retentionSovereign: 88,
    extractiveTake: 30,
    sovereignTake: 12,
  },

  // ── Tech Stack — deterministic, no pixie dust ──
  techStack: 'Gemini 1.5 Pro, Vertex AI, and Cloud Run',

  // ── 4-Step Engagement Model ──
  engagementModel: [
    { step: '01', label: 'Audit', desc: 'Workflow Mapping' },
    { step: '02', label: 'Setup', desc: 'Node Deployment' },
    { step: '03', label: 'Build', desc: 'Custom Rails (Vertex AI → your data)' },
    { step: '04', label: 'Go-Live', desc: 'Live Operations' },
  ],

  // ── Design Language ──
  design: {
    style: 'Industrial Brutalism',
    background: 'slate950',
    accents: 'Terminal Green / Safety Yellow',
    fonts: 'Monospace for numbers, system-ui for prose',
    rule: 'Engineering control panel, not consumer SaaS toy.',
  },

  // ── Banned Words — NEVER use in any HDX/MB copy ──
  banned: ['magic', 'magical', 'seamless', 'revolutionize', 'disrupt', 'synergy', 'we extract nothing'],
} as const;

export type HDXNarrative = typeof HDX_NARRATIVE;
