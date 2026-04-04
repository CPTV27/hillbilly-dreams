import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { redirect } from 'next/navigation';

/** Same surface as `requireAdmin()` on API routes — page shell is staff-only. */
export default async function StudioOsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email || !isAllowedUser(session.user.email)) {
    redirect('/admin/login');
  }
  return <>{children}</>;
}
