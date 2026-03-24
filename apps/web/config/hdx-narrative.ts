// ─────────────────────────────────────────────────────────────
// HDX Brand Narrative Dictionary — Single Source of Truth
// ─────────────────────────────────────────────────────────────
// All marketing copy, metrics, and brand strings live here.
// UI components import from this file — never hardcode narrative text.
//
// Created: 2026-03-24 — CC (Claude Code)
// Protocol: HDX Brand Narrative Guidelines + ENGINEERING_MANDATE.md
// ─────────────────────────────────────────────────────────────

export const HDX_NARRATIVE = {
  // Entity structure
  holdCo: 'Hillbilly Dreams Inc.',
  productBrand: 'Measurably Better',

  // Core identity
  tagline: 'Measurably Better.',
  corePositioning: 'For everything, we are substantially and measurably better.',
  thePromise:
    'Yes, we run on the most advanced tech in the world. Because life is supposed to get easier, not harder. This is the easy you\'ve been looking for, and we\'re going to save you money.',
  canonicalClosing: 'We build local. The value stays local. We grow from within.',
  wrapperThesis: 'We don\'t build models. We build the rails.',
  economicPitch: 'We\'re not free — we\'re 60% cheaper and none of it leaves your zip code.',

  // The problem
  coreProblem: 'The Deep South has an 80% extraction rate.',

  // Quantified metrics
  metrics: {
    adminOverheadLoss: '23%',
    s2pxAnchor: '$134K/yr with an 82% platform margin',
    zeroItPlay: 'Replace $8,500/mo traditional IT overhead with a $74/mo HDX Operator Node',
    zeroItTraditional: 8_500,
    zeroItHdx: 74,
    retentionExtractive: 70,
    retentionSovereign: 88,
    extractiveTake: 30,
    sovereignTake: 12,
  },

  // Tech stack — name-drop deterministically, no pixie dust
  techStack: 'Gemini 1.5 Pro, Vertex AI, and Cloud Run',

  // 4-step engagement model
  engagementModel: [
    { step: '01', label: 'Audit', desc: 'Workflow Mapping' },
    { step: '02', label: 'Setup', desc: 'Node Deployment' },
    { step: '03', label: 'Build', desc: 'Custom Rails (Vertex AI → your data)' },
    { step: '04', label: 'Go-Live', desc: 'Live Operations' },
  ],

  // Banned words — never use these in any HDX marketing copy
  banned: ['magic', 'revolutionize', 'disrupt', 'synergy', 'we extract nothing'],
} as const;

export type HDXNarrative = typeof HDX_NARRATIVE;
