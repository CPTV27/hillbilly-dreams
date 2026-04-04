/**
 * Idempotent seed for Sovereign hardware registry (`PhysicalNode`).
 * Run: `pnpm --filter @bigmuddy/database exec tsx scripts/seed-physical-nodes.ts`
 * Requires DATABASE_URL (e.g. hillbilly_sovereign).
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.physicalNode.upsert({
    where: { name: 'MBP-MAINFRAME' },
    create: {
      name: 'MBP-MAINFRAME',
      type: 'SERVER',
      status: 'ONLINE',
      ipAddress: '127.0.0.1',
      lastSeen: new Date(),
    },
    update: {
      type: 'SERVER',
      ipAddress: '127.0.0.1',
      status: 'ONLINE',
      lastSeen: new Date(),
    },
  });

  await prisma.physicalNode.upsert({
    where: { name: 'IMAC-KIOSK-01' },
    create: {
      name: 'IMAC-KIOSK-01',
      type: 'KIOSK',
      status: 'PENDING',
    },
    update: {
      type: 'KIOSK',
      status: 'PENDING',
    },
  });

  console.log(JSON.stringify({ ok: true, nodes: ['MBP-MAINFRAME', 'IMAC-KIOSK-01'] }));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
