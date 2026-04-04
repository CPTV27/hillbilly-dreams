import { prisma } from '@bigmuddy/database';
import ContestsHubClient, { type ContestRow } from './ContestsHubClient';

export const dynamic = 'force-dynamic';

export default async function AdminContestsPage() {
  const rows = await prisma.contest.findMany({
    orderBy: { endDate: 'desc' },
    take: 40,
  });

  const contests: ContestRow[] = rows.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    entryFeeCredits: c.entryFeeCredits,
    status: c.status,
    submissionType: c.submissionType,
    startDate: c.startDate.toISOString(),
    endDate: c.endDate.toISOString(),
  }));

  return <ContestsHubClient contests={contests} />;
}
