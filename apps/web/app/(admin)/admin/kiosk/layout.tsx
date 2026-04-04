import { auth } from '@/lib/auth';
import { isAllowedUser } from '@/config/auth-rules';
import { redirect } from 'next/navigation';

export default async function KioskLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email || !isAllowedUser(session.user.email)) {
    redirect('/admin/login');
  }
  return <>{children}</>;
}
