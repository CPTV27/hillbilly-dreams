import { PrismaClient } from '@prisma/client';
import { pickTopAdCampaign } from '../../apps/web/lib/ads/pickTopCampaign';

const prisma = new PrismaClient();

// The percentage of the bid amount that goes to the venue host
const VENUE_REVENUE_SHARE_PERCENTAGE = 0.5; // 50%

/**
 * Executes the "Auctioneer" logic to select the highest priority Ad for a given venue.
 *
 * In a fully realized Sovereign network, this would hit Vertex AI to weigh
 * "Regional Need" vs "Credit Bid". For the sandbox, we prioritize by highest bid
 * assuming the budget is not depleted. Logic is shared with signage (`pickTopAdCampaign`).
 */
export async function auctionAdForVenue(venueId: string, categoryData: unknown) {
  console.log(`🔨 [Auctioneer] Running ad auction for venue: ${venueId}`);
  void categoryData;

  const winningAd = await pickTopAdCampaign();

  if (!winningAd) {
    console.log(`[Auctioneer] No active ad inventory available.`);
    return null;
  }

  console.log(`🏆 [Auctioneer] Winning Bid: ${winningAd.title} @ ${winningAd.bidAmount} Credits/Impression`);

  return winningAd;
}

/**
 * The "Passive Income" Logic.
 * 
 * When an ad is displayed on a TV or Kiosk at an allied venue (the $500 tier),
 * the Network splits the ad revenue with the Host, issuing Sovereign Credits.
 */
export async function logAdImpressionAndShareRevenue(campaignId: string, venueHostUserId: string) {
  const campaign = await prisma.adCampaign.findUnique({ where: { id: campaignId } });
  
  if (!campaign || campaign.budget < campaign.bidAmount) {
    console.log(`[Passive Income] Campaign ${campaignId} lacks sufficient budget for impression.`);
    return;
  }

  const hostShare = Math.floor(campaign.bidAmount * VENUE_REVENUE_SHARE_PERCENTAGE);
  
  console.log(`💸 [Passive Income] Impression Logged. Sharing ${hostShare} credits with Host User: ${venueHostUserId}`);

  await prisma.$transaction(async (tx) => {
    // 1. Debit the Sponsor
    const updatedCampaign = await tx.adCampaign.update({
      where: { id: campaignId },
      data: { budget: { decrement: campaign.bidAmount } }
    });

    if (updatedCampaign.budget < updatedCampaign.bidAmount) {
      await tx.adCampaign.update({
        where: { id: campaignId },
        data: { status: 'DEPLETED' }
      });
    }

    // 2. Log the Impression
    await tx.impressionLog.create({
      data: {
        campaignId,
        venueHostId: venueHostUserId,
        payoutAmount: hostShare
      }
    });

    // 3. Credit the Venue Host Wallet
    await tx.user.update({
      where: { id: venueHostUserId },
      data: { credits: { increment: hostShare } }
    });

    // 4. Log the Host's Income via ContributionLog
    await tx.contributionLog.create({
      data: {
        userId: venueHostUserId,
        amount: hostShare,
        reason: `Ad Exchange Revenue Share (Campaign: ${campaign.title})`,
      }
    });
  });

  return hostShare;
}

// Sandbox test block for CLI execution
if (require.main === module) {
  console.log('Sovereign Ad Exchange engine mapped. Standby for live calls.');
  prisma.$disconnect();
}
