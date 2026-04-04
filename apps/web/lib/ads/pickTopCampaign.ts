import { prisma } from '@bigmuddy/database';
import type { AdCampaign } from '@prisma/client';

/**
 * Sandbox auction: highest bid among ACTIVE campaigns with budget.
 * Mirrors `scripts/economy/ad-auctioneer.ts` for in-app signage.
 */
export async function pickTopAdCampaign(): Promise<AdCampaign | null> {
  const rows = await prisma.adCampaign.findMany({
    where: { status: 'ACTIVE', budget: { gt: 0 } },
    orderBy: { bidAmount: 'desc' },
    take: 1,
  });
  return rows[0] ?? null;
}
