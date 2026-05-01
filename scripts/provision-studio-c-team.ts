/**
 * Provision Studio C team members in the platform User table.
 *
 * Creates User records for Elijah (admin / Chief of Staff) and Miles (ops / Production Manager)
 * with role, name, jobTitle, brandAffiliation, and onboardingStep populated.
 *
 * Idempotent: uses upsert. Safe to re-run.
 *
 * Run: npx tsx scripts/provision-studio-c-team.ts
 *
 * Requires: DATABASE_URL env var set to Neon production (or whichever DB you're targeting).
 *
 * Created: 2026-04-30 — Studio C team onboarding.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TEAM = [
  {
    email: 'elijah@chasepierson.tv',
    name: 'Elijah Tuttle',
    preferredName: 'Elijah',
    role: 'admin',
    jobTitle: 'Chief of Staff',
    brandAffiliation: 'StudioC',
    onboardingStep: 'pending_survey',
    interfaceTheme: 'minimal',
    notifyTo: 'business',
  },
  {
    email: 'team@chasepierson.tv',
    name: 'Miles Dubois',
    preferredName: 'Miles',
    role: 'ops',
    jobTitle: 'Production Manager',
    brandAffiliation: 'StudioC',
    onboardingStep: 'pending_survey',
    interfaceTheme: 'minimal',
    notifyTo: 'business',
  },
];

async function main() {
  console.log('Provisioning Studio C team...\n');

  for (const member of TEAM) {
    const result = await prisma.user.upsert({
      where: { email: member.email },
      update: {
        name: member.name,
        preferredName: member.preferredName,
        role: member.role,
        jobTitle: member.jobTitle,
        brandAffiliation: member.brandAffiliation,
        onboardingStep: member.onboardingStep,
        interfaceTheme: member.interfaceTheme,
        notifyTo: member.notifyTo,
      },
      create: {
        email: member.email,
        name: member.name,
        preferredName: member.preferredName,
        role: member.role,
        jobTitle: member.jobTitle,
        brandAffiliation: member.brandAffiliation,
        onboardingStep: member.onboardingStep,
        interfaceTheme: member.interfaceTheme,
        notifyTo: member.notifyTo,
      },
    });

    console.log(`  ${member.email} → ${member.role} / ${member.jobTitle} (id: ${result.id})`);
  }

  console.log('\nDone. Both users provisioned.');
}

main()
  .catch((e) => {
    console.error('Provisioning failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
