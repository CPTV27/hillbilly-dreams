import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The cost of a 30-day PRO_50 network pass
const PRO_PASS_COST_CREDITS = 1000;

/**
 * Sovereign Credit Weight Matrix
 * Defines the value of data extraction across the Mainframe.
 */
export const CreditWeights: Record<string, number> = {
  '.pdf': 50,    // High-value: Operational Manuals, Historical Zoning Docs
  '.xmp': 20,    // Mid-value: Curated Adobe metadata, tagging architecture
  '.md': 10,     // Low-value: Journals, passing notes
  '.csv': 75     // Very High-value: Spreadsheets, municipality ledger dumps
};

/**
 * Validates a submitted piece of Lore or Asset.
 * If verified by the "Brain", credits the user's wallet.
 */
export async function awardContributionCredits(userId: string, sourceFile: string, sourceId: string) {
  const ext = Object.keys(CreditWeights).find(e => sourceFile.toLowerCase().endsWith(e)) || '.md';
  const awardAmount = CreditWeights[ext];

  console.log(`[Wallet] Awarding ${awardAmount} credits to ${userId} for ${sourceFile}`);

  // Transaction ensures logging and wallet balance are synchronized
  await prisma.$transaction(async (tx) => {
    // Upsert the Log
    await tx.contributionLog.create({
      data: {
        userId,
        amount: awardAmount,
        reason: 'Sovereign Lore/Media Validation',
        fileType: ext,
        sourceId
      }
    });

    // Credit the Wallet
    await tx.user.update({
      where: { id: userId },
      data: { credits: { increment: awardAmount } }
    });
  });

  return awardAmount;
}

/**
 * CRON-style task to check the balances of users on the 'free' tier.
 * Automatically "purchases" a PRO_50 pass if their wallet can afford the tax.
 */
export async function processAutomaticTierUpgrades() {
  console.log('🔄 Engaging Sovereign Economy Cron: Processing Wallet Thresholds...');

  const eligibleUsers = await prisma.user.findMany({
    where: {
      dataTier: 'free',
      credits: { gte: PRO_PASS_COST_CREDITS }
    }
  });

  for (const user of eligibleUsers) {
    console.log(`[Economy] Upgrading User ${user.email} -> PRO_50 Pass. Debiting ${PRO_PASS_COST_CREDITS} Credits.`);
    
    await prisma.$transaction(async (tx) => {
      // Debit the cost
      await tx.user.update({
        where: { id: user.id },
        data: { 
          credits: { decrement: PRO_PASS_COST_CREDITS },
          dataTier: 'PRO_50' // Activating the Network Tier
        }
      });

      // Log the purchase
      await tx.contributionLog.create({
        data: {
          userId: user.id,
          amount: -PRO_PASS_COST_CREDITS,
          reason: 'Automatic PRO_50 Pass Purchase'
        }
      });
    });
  }

  console.log(`✅ Economy Check Complete. Upgraded ${eligibleUsers.length} Users.`);
}

// Standard CLI invocation block for the CRON layer
if (require.main === module) {
  processAutomaticTierUpgrades()
    .then(() => prisma.$disconnect())
    .catch(err => {
      console.error(err);
      prisma.$disconnect();
      process.exit(1);
    });
}
