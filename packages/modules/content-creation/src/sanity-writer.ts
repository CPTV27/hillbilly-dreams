// packages/modules/content-creation/src/sanity-writer.ts
// Writes generated drafts to Sanity as draft documents (drafts.{id} prefix).
// Tracy promotes to published in Studio. Module never publishes directly.

import type { GeneratedDraft, SaveDraftInput } from './types';

const SANITY_API = 'https://api.sanity.io/v2024-01-01';

function getToken(): string {
  const t = process.env.SANITY_WRITE_TOKEN;
  if (!t) throw new Error('SANITY_WRITE_TOKEN not configured');
  return t;
}

function getProjectId(): string {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
  if (!id) throw new Error('SANITY_PROJECT_ID not configured');
  return id.trim();
}

function generateUlid(): string {
  // Compact time-sortable ID (not a real ULID; adequate for Sanity doc IDs).
  const now = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `${now}${rand}`;
}

/**
 * Map contentType to a Sanity _type. Follow-up PR adds the actual schema.
 */
function sanityTypeFor(contentType: GeneratedDraft['wizardMeta']['contentType']): string {
  switch (contentType) {
    case 'magazine-article':
      return 'article';
    case 'social-post':
      return 'socialPost';
    case 'listing-description':
      return 'listingDescription';
    case 'episode-description':
      return 'episodeDescription';
    case 'pitch-deck-section':
      return 'pitchSection';
  }
}

/**
 * Create or update a draft document via Sanity's mutation API.
 * Draft IDs are prefixed with `drafts.` per Sanity convention.
 */
export async function saveDraft(
  input: SaveDraftInput
): Promise<{ docId: string; transactionId: string }> {
  const projectId = getProjectId();
  const dataset = input.dataset ?? 'production';
  const docId = `drafts.${generateUlid()}`;

  const doc = {
    _id: docId,
    _type: sanityTypeFor(input.draft.wizardMeta.contentType),
    title: input.draft.title,
    body: input.draft.body,
    wizardMeta: input.draft.wizardMeta,
  };

  const url = `${SANITY_API}/data/mutate/${projectId}?dataset=${dataset}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mutations: [{ createIfNotExists: doc }],
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`Sanity saveDraft ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { transactionId: string };
  return { docId, transactionId: data.transactionId };
}
