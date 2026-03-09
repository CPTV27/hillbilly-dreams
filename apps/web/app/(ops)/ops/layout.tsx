import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { canAccessRoute, normalizeRole, ROLE_DEFAULT_ROUTE } from '@bigmuddy/config';

export default async function OpsLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session?.user?.email) {
        redirect('/admin/login');
    }

    const role = normalizeRole((session.user as any)?.role as string);
    if (!canAccessRoute(role, '/ops')) {
        redirect(ROLE_DEFAULT_ROUTE[role] || '/');
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 px-4 py-3 sm:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/ops" className="text-xl font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded-md">
                            <span className="hidden sm:inline">The Big Muddy </span>Ops
                        </Link>

                        <nav className="hidden sm:flex items-center gap-4 ml-8 text-sm font-medium text-neutral-600">
                            <Link href="/ops" className="hover:text-neutral-900">Dashboard</Link>
                            <Link href="/ops/tasks" className="hover:text-neutral-900">All Tasks</Link>
                            <Link href="/ops/content" className="hover:text-neutral-900">Content Library</Link>
                            <Link href="/ops/chat" className="hover:text-neutral-900">Delta Dawn</Link>
                            <Link href="/ops/property" className="hover:text-neutral-900">Property Info</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-neutral-700 text-right hidden sm:block">
                            {session.user.name || session.user.email}
                        </div>
                        {/* Mobile Menu Button - simplify for now */}
                        <div className="sm:hidden flex flex-row gap-2 overflow-x-auto text-xs whitespace-nowrap">
                            <Link href="/ops">Dash</Link>
                            <Link href="/ops/tasks">Tasks</Link>
                            <Link href="/ops/content">Content</Link>
                            <Link href="/ops/chat">Chat</Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}
