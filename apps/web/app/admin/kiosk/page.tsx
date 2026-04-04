/**
 * Sovereign Glass — admin kiosk (Natchez Protocol).
 * Raw inline styles + Framer Motion; Socket.io when Hub is running.
 */
import { auth } from '@/lib/auth';
import { prisma } from '@bigmuddy/database';
import KioskLiveClient from './KioskLiveClient';

export const dynamic = 'force-dynamic';

export default async function AdminKioskPage() {
  const session = await auth();
  const userId = session?.user?.id ?? '';
  let credits = 0;
  if (userId) {
    const u = await prisma.user.findUnique({ where: { id: userId }, select: { credits: true } });
    credits = u?.credits ?? 0;
  }
  const sessionId = userId || 'anonymous-kiosk';
  return <KioskLiveClient initialCredits={credits} userId={userId} sessionId={sessionId} />;
}
