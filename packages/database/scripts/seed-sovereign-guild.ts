/**
 * Seed the "Sovereign 5" guild on a fresh sandbox DB (e.g. `hillbilly_sovereign`).
 *
 * Run:
 *   DATABASE_URL="postgresql://user@localhost:5432/hillbilly_sovereign" \
 *   DIRECT_DATABASE_URL="postgresql://user@localhost:5432/hillbilly_sovereign" \
 *   npx tsx packages/database/scripts/seed-sovereign-guild.ts
 *
 * Idempotent: skips `signing_bonus` ledger rows that already exist per user.
 * Internal ops only — not for anonymous public pages.
 */

import { PrismaClient, SovereignMembershipTier } from '@prisma/client';

const prisma = new PrismaClient();

const SIGNING_BONUS = 1000;

const GUILD: {
  email: string;
  name: string;
  tier: SovereignMembershipTier;
}[] = [
  { email: 'me@chasepierson.tv', name: 'Chase Pierson', tier: SovereignMembershipTier.INTEL },
  { email: 'tracyaldersonallen@gmail.com', name: 'Tracy Alderson-Allen', tier: SovereignMembershipTier.NETWORK },
  { email: 'amyaldersonallen@gmail.com', name: 'Amy Allen', tier: SovereignMembershipTier.NETWORK },
  { email: 'jphoustonlives@gmail.com', name: 'JP Houston', tier: SovereignMembershipTier.NETWORK },
  { email: 'info@reginaskitchen.com', name: 'Regina Charboneau', tier: SovereignMembershipTier.NETWORK },
];

async function main(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required.');
    process.exit(1);
  }

  let guildRootId: string | null = null;

  for (let i = 0; i < GUILD.length; i++) {
    const m = GUILD[i]!;
    const isRoot = i === 0;

    const user = await prisma.user.upsert({
      where: { email: m.email },
      create: {
        email: m.email,
        name: m.name,
        sovereignTier: m.tier,
        isVetted: true,
        credits: SIGNING_BONUS,
        referredById: isRoot ? null : guildRootId,
        role: isRoot ? 'admin' : 'ops',
      },
      update: {
        name: m.name,
        sovereignTier: m.tier,
        isVetted: true,
        ...(isRoot ? {} : guildRootId ? { referredById: guildRootId } : {}),
      },
    });

    if (isRoot) guildRootId = user.id;

    const existing = await prisma.creditLedger.findFirst({
      where: { userId: user.id, reason: 'signing_bonus' },
    });

    if (!existing) {
      await prisma.creditLedger.create({
        data: {
          userId: user.id,
          change: SIGNING_BONUS,
          reason: 'signing_bonus',
          balanceAfter: SIGNING_BONUS,
          metadata: { source: 'seed-sovereign-guild' },
        },
      });
      await prisma.user.update({
        where: { id: user.id },
        data: { credits: SIGNING_BONUS },
      });
    }

    console.log(`Guild member ready: ${m.name} <${m.email}> tier=${m.tier}`);
  }

  console.log('\nSovereign guild seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
