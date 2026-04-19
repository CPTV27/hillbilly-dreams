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
