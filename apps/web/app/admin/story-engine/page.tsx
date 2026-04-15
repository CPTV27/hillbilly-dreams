import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { StoryEngineDemo } from './StoryEngineDemo';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Story Engine — prototype',
  robots: { index: false, follow: false },
};

export default async function StoryEnginePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/api/auth/signin?callbackUrl=/admin/story-engine');
  }
  if (!isAllowedUser(session.user.email)) {
    return (
      <main style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text, #f5e9d1)' }}>
        <h1 style={{ margin: 0 }}>Not authorized</h1>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg, #0f0f0d)' }}>
      <StoryEngineDemo />
    </main>
  );
}
