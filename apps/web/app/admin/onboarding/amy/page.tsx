// apps/web/app/admin/onboarding/amy/page.tsx
//
// Amy's guided onboarding page. Server component — checks auth, loads
// initial progress, and hands off to the client component that owns the
// state machine and live Delta Dawn chat.
//
// Route: /admin/onboarding/amy
// Protected: admin-only (same requireAdmin pattern used across /admin/*)

import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { getOrCreateOnboardingProgress } from '@/lib/onboarding-progress';
import { AmyOnboardingClient } from './AmyOnboardingClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Welcome, Amy — Onboarding',
  robots: { index: false, follow: false },
};

export default async function AmyOnboardingPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/api/auth/signin?callbackUrl=/admin/onboarding/amy');
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

  // Create or fetch progress row on first visit, touch lastSeenAt.
  const progress = await getOrCreateOnboardingProgress(session.user.email, 'amy');

  const userName = session.user.name?.split(' ')[0] || 'Amy';

  return (
    <AmyOnboardingClient
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
          progress.notifPrefs as Record<string, boolean> | null ?? null,
        completedAt: progress.completedAt
          ? progress.completedAt.toISOString()
          : null,
        sessionCount: progress.sessionCount,
        lastSeenAt: progress.lastSeenAt.toISOString(),
      }}
    />
  );
}
