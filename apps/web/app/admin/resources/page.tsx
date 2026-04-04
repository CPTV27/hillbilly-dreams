import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';
import { ResourcesHubClient } from './ResourcesHubClient';

export const dynamic = 'force-dynamic';

export default async function AdminResourcesPage() {
  const session = await auth();
  const userId = session?.user?.id ?? '';
  let credits = 0;
  if (userId) {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });
    credits = u?.credits ?? 0;
  }
  return <ResourcesHubClient initialCredits={credits} />;
}
