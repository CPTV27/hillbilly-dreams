// apps/web/app/admin/onboarding/tracy/page.tsx
//
// Tracy's guided onboarding page. Mirrors apps/web/app/admin/onboarding/amy/page.tsx
// but with role='tracy' and the 6-task flow with a peer-progress card for
// reviewing Amy's parallel onboarding.

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { getOrCreateOnboardingProgress } from '@/lib/onboarding-progress';
import { TracyOnboardingClient } from './TracyOnboardingClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Welcome, Tracy — Onboarding',
  robots: { index: false, follow: false },
};

export default async function TracyOnboardingPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/api/auth/signin?callbackUrl=/admin/onboarding/tracy');
  }
  if (!isAllowedUser(session.user.email)) {
    return (
      <main style={{ padding: '60px 24px', textAlign: 'center', color: '#f5e9d1' }}>
        <h1 style={{ margin: 0 }}>Not authorized</h1>
        <p style={{ opacity: 0.7, marginTop: 12 }}>
          Your email isn&apos;t on the allow-list yet. Text Chase with your
          Google address and he&apos;ll add you.
        </p>
      </main>
    );
  }

  const progress = await getOrCreateOnboardingProgress(session.user.email, 'tracy');
  const userName = session.user.name?.split(' ')[0] || 'Tracy';

  return (
    <TracyOnboardingClient
      userName={userName}
      userEmail={session.user.email}
      initialProgress={{
        completedTasks: progress.completedTasks,
        currentTaskId: progress.currentTaskId,
        currentTaskState: (progress.currentTaskState ?? {}) as Record<
          string,
          Record<string, unknown>
        >,
        notifPrefs:
          (progress.notifPrefs as Record<string, boolean> | null) ?? null,
        completedAt: progress.completedAt
          ? progress.completedAt.toISOString()
          : null,
        sessionCount: progress.sessionCount,
        lastSeenAt: progress.lastSeenAt.toISOString(),
      }}
    />
  );
}
