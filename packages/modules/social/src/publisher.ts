// packages/modules/social/src/publisher.ts
// Cross-platform publishing dispatcher. Wraps Postiz (Mac mini bridge)
// for now; native platform APIs to be added later.

import { assertCompatible, findForbidden } from './voice-router';
import type { PublishInput, PublishResult, Brand } from './types';

/**
 * Publish a post. Enforces voice contamination guard + forbidden phrases
 * before sending to the platform.
 *
 * destinationBrand is read from destinationAccountId (caller must encode it,
 * e.g., "records.instagram.bigmuddyrecords") OR pass via metadata.brand.
 */
export async function publish(input: PublishInput): Promise<PublishResult> {
  const destinationBrand = (input.metadata?.destinationBrand as Brand) ?? input.brand;
  assertCompatible(input.brand, destinationBrand);

  const forbidden = findForbidden(input.brand, input.caption);
  if (forbidden.length > 0) {
    throw new Error(
      `Caption contains forbidden phrases for ${input.brand} voice: ${forbidden.join(', ')}`
    );
  }

  // For v1 we route through Postiz via the existing
  // apps/web/lib/social-publisher.ts. The actual delivery happens server-side.
  // This module's job is the voice gate; the network call lives in the route.
  return {
    postId: undefined,
    scheduledId: undefined,
    platform: input.platform,
    publishedAt: input.scheduledFor ?? undefined,
  };
}
