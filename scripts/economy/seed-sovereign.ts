import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Sovereign Mainframe Database...');

  // 1. Admin Account
  const admin = await prisma.user.upsert({
    where: { email: 'chase@hillbillydreamsinc.com' },
    update: { credits: 10000, role: 'admin' },
    create: {
      email: 'chase@hillbillydreamsinc.com',
      name: 'Chase',
      role: 'admin',
      credits: 10000,
    },
  });
  console.log(`[Admin] Initialized: ${admin.name} (10k credits)`);

  // 2. Placeholder Sovereign Guild Members
  const guildMembers = ['tracy', 'amy', 'rook', 'chuck'];
  for (const member of guildMembers) {
    const user = await prisma.user.upsert({
      where: { email: `${member}@sovereign.local` },
      update: { credits: 1000, role: 'ops' },
      create: {
        email: `${member}@sovereign.local`,
        name: member.charAt(0).toUpperCase() + member.slice(1),
        role: 'ops',
        credits: 1000,
      },
    });
    console.log(`[Guild] Initialized: ${user.name} (1k credits)`);
  }

  console.log('✅ Sandbox Database Matrix Seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
