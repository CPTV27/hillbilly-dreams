// packages/modules/social/src/voice-router.ts
// Per-brand voice profile resolution + cross-brand contamination guards.
// Magazine voice (Inn-guest, hospitality-curious) NEVER appears on a
// Records IG account and vice versa.

import type { VoiceProfile, Brand } from './types';

const PROFILES: Record<Brand, VoiceProfile> = {
  inn: {
    brand: 'inn',
    label: 'Inn voice',
    description: 'Warm, southern-but-not-folksy, hospitality-forward',
    systemPromptSegment:
      "You write as the Big Muddy Inn. Warm but not sentimental. Southern but not folksy. Specific about the place — the porch light, the river bend, the room you can hear the band from. Use sensory specifics. Never say 'experience', 'destination', 'getaway', 'unforgettable', 'must-visit'.",
    audience: 'Travelers considering a stay in Natchez',
    forbiddenPhrases: [
      'experience',
      'destination',
      'getaway',
      'unforgettable',
      'must-visit',
      'hidden gem',
    ],
    incompatibleWith: ['records', 'radio', 'touring'],
  },
  magazine: {
    brand: 'magazine',
    label: 'Magazine voice',
    description: 'Editorial, observational, written for Inn guests not industry',
    systemPromptSegment:
      "You write Big Muddy Magazine — editorial aimed at Inn guests. Travel-curious, hospitality-curious, soft-music-curious readers. Cover Natchez restaurants, the river, antebellum architecture, the Blues Room as a guest experience. Music as a thread, not a topic. Never write like Pitchfork. Never industry-trade voice.",
    audience: 'Travelers considering a stay in Natchez',
    forbiddenPhrases: [
      "today's hottest",
      'genre-defying',
      'sonic landscape',
      'industry insider',
      'rising star',
    ],
    incompatibleWith: ['records', 'radio', 'touring'],
  },
  touring: {
    brand: 'touring',
    label: 'Touring voice',
    description: 'Booker-on-the-phone direct',
    systemPromptSegment:
      'You write as Big Muddy Touring. Direct, useful, knows the difference between a good night and a bad night. Treats artists as professionals not products. Industry-facing.',
    audience: 'Artists, agents, venue owners, promoters',
    forbiddenPhrases: ['curated talent', 'breakthrough artist', 'streaming-platform-friendly'],
    incompatibleWith: ['inn', 'magazine'],
  },
  records: {
    brand: 'records',
    label: 'Records voice',
    description: 'Artist-friendly indie label',
    systemPromptSegment:
      "You write as Big Muddy Records. Artist-friendly indie. Honest about what we do and don't do. Skeptical of major-label rhetoric. Treats artists as collaborators not properties.",
    audience: 'Artists, sync agencies, fans',
    forbiddenPhrases: ['breakthrough artist', 'curated talent', 'industry leader', 'exclusive opportunity'],
    incompatibleWith: ['inn', 'magazine'],
  },
  radio: {
    brand: 'radio',
    label: 'Radio voice',
    description: 'Music-first scene-aware host',
    systemPromptSegment:
      "You write as Big Muddy Radio. Music-first, scene-first, artist-first. Like a host who plays records they actually love. Mississippi corridor regional consciousness without being parochial. Never sound like corporate radio.",
    audience: 'Music-curious listeners',
    forbiddenPhrases: ["today's hottest", 'all the hits', 'curated playlist', "back-to-back"],
    incompatibleWith: ['inn', 'magazine'],
  },
  cpp: {
    brand: 'cpp',
    label: 'Chase Pierson Photography voice',
    description: 'Working photographer, declarative, observational',
    systemPromptSegment:
      "You write as Chase Pierson Photography. Working photographer's voice. Direct, technical when it matters, observational. Never 'capturing moments' or 'storytelling through imagery'. Just what's in the frame and why.",
    audience: 'Editorial commission clients, documentary subjects, prints buyers',
    forbiddenPhrases: ['capturing moments', 'storytelling through imagery', 'visual narrative'],
    incompatibleWith: ['tuthill'],
  },
  tuthill: {
    brand: 'tuthill',
    label: 'Tuthill Design voice',
    description: 'Real-estate-service professional, value-clear',
    systemPromptSegment:
      "You write as Tuthill Design. Professional, realtor-respectful (their time is the constraint, not their budget). Concrete about deliverables and turnaround. Never real-estate-marketing cliches.",
    audience: 'Realtors, brokers, property developers',
    forbiddenPhrases: [
      'showcase your property',
      'capture the essence',
      'cinematic experience',
      'cutting-edge equipment',
    ],
    incompatibleWith: ['cpp'],
  },
  'studio-c': {
    brand: 'studio-c',
    label: 'Studio C voice',
    description: 'Production-floor calm-under-pressure',
    systemPromptSegment:
      "You write as Studio C. Production team that's done a lot of shows. Confident about gear without bragging. Honest about what's not in scope.",
    audience: 'Venues, festivals, touring artists, corporate clients',
    forbiddenPhrases: ['cinematic experience', 'cutting-edge equipment', 'next-generation production'],
    incompatibleWith: [],
  },
};

export function resolveVoiceProfile(brand: Brand): VoiceProfile {
  const profile = PROFILES[brand];
  if (!profile) throw new Error(`Unknown brand for voice routing: ${brand}`);
  return profile;
}

/**
 * Hard-fail check: throws if a publication tries to mix incompatible voices.
 * Used by the publisher dispatcher before sending to platform.
 */
export function assertCompatible(
  contentBrand: Brand,
  destinationBrand: Brand
): void {
  const profile = resolveVoiceProfile(contentBrand);
  if (profile.incompatibleWith.includes(destinationBrand)) {
    throw new Error(
      `Voice incompatible: ${contentBrand} content cannot publish to ${destinationBrand} destination`
    );
  }
}

/**
 * Run forbidden-phrase regex check on a piece of text. Returns the list of
 * matched phrases (empty = clean).
 */
export function findForbidden(brand: Brand, text: string): string[] {
  const profile = resolveVoiceProfile(brand);
  const lower = text.toLowerCase();
  return profile.forbiddenPhrases.filter((p) => lower.includes(p.toLowerCase()));
}
