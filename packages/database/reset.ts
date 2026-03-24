import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.updateMany({
    where: { email: { in: ['tracy@thebigmuddyinn.com', 'amy@thebigmuddyinn.com'] } },
    data: { onboardingStep: 'pending_survey' },
  });
  console.log("Reset onboardingStep to pending_survey for Tracy and Amy");
}
main().catch(console.error).finally(() => prisma.$disconnect());
