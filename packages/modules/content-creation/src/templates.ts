// packages/modules/content-creation/src/templates.ts
// Content template loader. Templates are stored in Sanity (schema defined
// in packages/sanity/schemas/contentTemplate.ts — coming in a follow-up).
// For bootstrapping, we ship hardcoded defaults per content-type.
//
// Tracy tunes voice in Sanity Studio without a deploy; loader picks
// Sanity version if present, falls back to hardcoded otherwise.

import { voiceRouter } from '@bigmuddy/social';
import type { ContentType, Brand, ContentTemplate } from './types';

const DEFAULT_TEMPLATES: Record<ContentType, Omit<ContentTemplate, 'systemPrompt'>> = {
  'magazine-article': {
    contentType: 'magazine-article',
    audienceProfile:
      "A traveler considering a stay at the Big Muddy Inn. Travel-curious, hospitality-curious. Coastal flight cost matters to them. Reads Condé Nast Traveler and Garden & Gun.",
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
    lengthTarget: { min: 500, max: 2500 },
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
    contentType: 'social-post',
    audienceProfile:
      'Depends on brand — Inn/Magazine target travelers; Records/Radio target music fans; Tuthill targets realtors.',
    voiceRules: [
      'Platform-appropriate rhythm (IG caption ≠ TikTok caption ≠ X post)',
      'One idea per post, not a listicle',
      'No hashtag spam — 3 max on IG, 0 on X',
      'Entity-grounded — real places, real dates',
    ],
    requiredSections: ['hook', 'central line', 'soft CTA'],
    lengthTarget: { min: 50, max: 300 },
    forbiddenPhrases: [
      'check out',
      "don't miss",
      'tag a friend',
      'this is your sign',
      'link in bio',
    ],
  },
  'listing-description': {
    contentType: 'listing-description',
    audienceProfile:
      'Homebuyer browsing MLS/Zillow. Specific about property features, neighborhood, lifestyle fit.',
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
    lengthTarget: { min: 100, max: 600 },
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
    ],
  },
  'episode-description': {
    contentType: 'episode-description',
    audienceProfile:
      'Music-curious listener deciding whether to play. Also podcast-app algorithms parsing for discovery.',
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
    lengthTarget: { min: 200, max: 900 },
    forbiddenPhrases: [
      'check out this episode',
      "don't miss",
      'sit back and enjoy',
      "today's special guest",
      "today's hottest",
    ],
  },
  'pitch-deck-section': {
    contentType: 'pitch-deck-section',
    audienceProfile:
      'B2B decision-maker — realtor broker, civic partner, corporate sponsor. Skeptical, time-pressured, wants specifics.',
    voiceRules: [
      'Every section opens with a single declarative sentence',
      'Every section ends with a quantitative or specific anchor',
      'No abstractions without specifics',
      'No vague "we will explore" — only what we actually do',
    ],
    requiredSections: ['declarative claim', 'concrete evidence', 'specific next action'],
    lengthTarget: { min: 80, max: 200 },
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

/**
 * Assemble a system prompt that combines (1) the base template for the
 * content type, (2) the brand voice profile, (3) forbidden phrases + length
 * constraints. Injected into the AI call by the wizard agent.
 */
export function assembleSystemPrompt(
  contentType: ContentType,
  brand: Brand
): string {
  const base = DEFAULT_TEMPLATES[contentType];
  const voice = voiceRouter.resolveVoiceProfile(brand);
  return `
${voice.systemPromptSegment}

AUDIENCE: ${base.audienceProfile}

VOICE RULES (do not violate):
${base.voiceRules.map((r) => `- ${r}`).join('\n')}

REQUIRED SECTIONS (must include):
${base.requiredSections.map((s) => `- ${s}`).join('\n')}

LENGTH TARGET: ${base.lengthTarget.min}–${base.lengthTarget.max} words.

FORBIDDEN PHRASES (regex-blocked on output):
${[...base.forbiddenPhrases, ...voice.forbiddenPhrases].map((p) => `- "${p}"`).join('\n')}

Entity references MUST be grounded in the provided DirectoryBusiness
candidates — never invent businesses, musicians, or venues. If you name
a photo, it must be from the provided asset list.
`.trim();
}

export function getTemplate(
  contentType: ContentType,
  brand: Brand
): ContentTemplate {
  const base = DEFAULT_TEMPLATES[contentType];
  return { ...base, systemPrompt: assembleSystemPrompt(contentType, brand) };
}

// ── Sanity-first loader with hardcoded fallback ──────────────
// Tracy edits per-combo templates in Sanity Studio. If the Sanity doc
// exists + is active, we use its fields (audience, voice rules, forbidden
// phrases, length, optional system prompt override). If not — or Sanity
// is unreachable — we fall back to the hardcoded defaults above.

interface SanityContentTemplate {
  _id: string;
  contentType: ContentType;
  brand: Brand;
  audienceProfile?: string;
  voiceRules?: string[];
  requiredSections?: string[];
  lengthMin?: number;
  lengthMax?: number;
  forbiddenPhrases?: string[];
  systemPrompt?: string;
  active?: boolean;
}

// Simple in-memory cache — cleared on cold start. 5-min TTL.
const cache = new Map<string, { template: ContentTemplate; at: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function cacheKey(contentType: ContentType, brand: Brand): string {
  return `${contentType}::${brand}`;
}

async function fetchSanityTemplate(
  contentType: ContentType,
  brand: Brand
): Promise<SanityContentTemplate | null> {
  const projectId = (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
    process.env.SANITY_PROJECT_ID ??
    ''
  ).trim();
  if (!projectId) return null;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
  const apiVersion = process.env.SANITY_API_VERSION ?? '2024-01-01';

  // GROQ query by deterministic _id (set by the seed script)
  const docId = `contentTemplate.${contentType}.${brand}`;
  const query = encodeURIComponent(`*[_id == "${docId}" && active == true][0]`);
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, {
      // Public read — no auth required for public datasets. If the dataset
      // is private, pass a read token via SANITY_READ_TOKEN.
      headers: process.env.SANITY_READ_TOKEN
        ? { Authorization: `Bearer ${process.env.SANITY_READ_TOKEN}` }
        : undefined,
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: SanityContentTemplate };
    return data.result ?? null;
  } catch {
    return null;
  }
}

/**
 * Load a template — Sanity-first with hardcoded fallback.
 *
 * The wizard calls this per generation. Cached 5 min per (contentType, brand)
 * combo. Tracy's edits in Studio take effect within 5 minutes of save.
 */
export async function loadTemplate(
  contentType: ContentType,
  brand: Brand
): Promise<ContentTemplate> {
  const key = cacheKey(contentType, brand);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.template;
  }

  const sanity = await fetchSanityTemplate(contentType, brand);
  const base = DEFAULT_TEMPLATES[contentType];
  const voice = voiceRouter.resolveVoiceProfile(brand);

  const template: ContentTemplate = {
    contentType,
    audienceProfile: sanity?.audienceProfile ?? base.audienceProfile,
    voiceRules: sanity?.voiceRules ?? base.voiceRules,
    requiredSections: sanity?.requiredSections ?? base.requiredSections,
    lengthTarget: {
      min: sanity?.lengthMin ?? base.lengthTarget.min,
      max: sanity?.lengthMax ?? base.lengthTarget.max,
    },
    forbiddenPhrases: [
      ...(sanity?.forbiddenPhrases ?? base.forbiddenPhrases),
      ...voice.forbiddenPhrases,
    ],
    systemPrompt:
      // If Tracy set a custom prompt in Studio, use it verbatim.
      // Otherwise assemble from voice + audience + rules.
      sanity?.systemPrompt && sanity.systemPrompt.trim().length > 0
        ? sanity.systemPrompt
        : assembleSystemPromptFrom({
            voice: voice.systemPromptSegment,
            audience: sanity?.audienceProfile ?? base.audienceProfile,
            voiceRules: sanity?.voiceRules ?? base.voiceRules,
            requiredSections: sanity?.requiredSections ?? base.requiredSections,
            lengthMin: sanity?.lengthMin ?? base.lengthTarget.min,
            lengthMax: sanity?.lengthMax ?? base.lengthTarget.max,
            forbiddenPhrases: [
              ...(sanity?.forbiddenPhrases ?? base.forbiddenPhrases),
              ...voice.forbiddenPhrases,
            ],
          }),
  };

  cache.set(key, { template, at: Date.now() });
  return template;
}

/** Manually invalidate cache (e.g., Sanity webhook on contentTemplate edit). */
export function invalidateCache(contentType?: ContentType, brand?: Brand): void {
  if (contentType && brand) {
    cache.delete(cacheKey(contentType, brand));
  } else {
    cache.clear();
  }
}

function assembleSystemPromptFrom(inputs: {
  voice: string;
  audience: string;
  voiceRules: string[];
  requiredSections: string[];
  lengthMin: number;
  lengthMax: number;
  forbiddenPhrases: string[];
}): string {
  return `
${inputs.voice}

AUDIENCE: ${inputs.audience}

VOICE RULES (do not violate):
${inputs.voiceRules.map((r) => `- ${r}`).join('\n')}

REQUIRED SECTIONS (must include):
${inputs.requiredSections.map((s) => `- ${s}`).join('\n')}

LENGTH TARGET: ${inputs.lengthMin}–${inputs.lengthMax} words.

FORBIDDEN PHRASES (regex-blocked on output):
${inputs.forbiddenPhrases.map((p) => `- "${p}"`).join('\n')}

Entity references MUST be grounded in the provided DirectoryBusiness
candidates — never invent businesses, musicians, or venues. If you name
a photo, it must be from the provided asset list.
`.trim();
}
