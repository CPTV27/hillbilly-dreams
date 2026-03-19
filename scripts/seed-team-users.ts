/**
 * Seed User records for the Big Muddy team.
 * Tracy and Amy get the "ceo" role — they can ask Delta Dawn questions
 * and input data, but can't access admin-level controls.
 *
 * Run: npx tsx scripts/seed-team-users.ts
 */

import { PrismaClient } from '../packages/database/node_modules/@prisma/client'

const prisma = new PrismaClient()

const TEAM_USERS = [
  {
    email: 'tracy@thebigmuddyinn.com',
    name: 'Tracy Allen',
    role: 'ceo',
  },
  {
    email: 'amy@thebigmuddyinn.com',
    name: 'Amy Allen',
    role: 'ceo',
  },
  {
    email: 'me@chasepierson.tv',
    name: 'Chase Pierson',
    role: 'admin',
  },
  {
    email: 'chase@scan2plan.io',
    name: 'Chase Pierson',
    role: 'admin',
  },
  {
    email: 'chase@scantoplan.io',
    name: 'Chase Pierson',
    role: 'admin',
  },
]

async function main() {
  for (const user of TEAM_USERS) {
    const result = await prisma.user.upsert({
      where: { email: user.email },
      update: { role: user.role, name: user.name },
      create: { email: user.email, name: user.name, role: user.role },
    })
    console.log(`✓ ${result.email} → role: ${result.role}`)
  }
  console.log('\nDone. All team users seeded.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
