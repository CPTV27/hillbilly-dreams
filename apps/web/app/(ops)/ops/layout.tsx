import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

// Theme configuration for the ops layout chrome
const THEME_CONFIG = {
  futuristic: {
    bg: 'bg-[#0a0a0f]',
    header: 'bg-[#0a0a0f]/80 border-white/10 backdrop-blur-xl',
    logo: 'bg-blue-500/20 text-blue-300',
    navLink: 'text-slate-400 hover:text-white',
    navActive: 'text-blue-400',
    userName: 'text-slate-300',
    main: 'text-slate-200',
    mobileLink: 'text-slate-400',
  },
  retro: {
    bg: 'bg-[#f5f0e8]',
    header: 'bg-[#e8e0d0] border-[#c4b89c]',
    logo: 'bg-[#d4c5a0] text-[#4a3f2f]',
    navLink: 'text-[#6b5d4a] hover:text-[#2c2416]',
    navActive: 'text-[#8b4513]',
    userName: 'text-[#4a3f2f]',
    main: 'text-[#2c2416]',
    mobileLink: 'text-[#6b5d4a]',
  },
  minimal: {
    bg: 'bg-neutral-50',
    header: 'bg-white border-neutral-200',
    logo: 'bg-amber-50 text-amber-900',
    navLink: 'text-neutral-600 hover:text-neutral-900',
    navActive: 'text-amber-700',
    userName: 'text-neutral-700',
    main: '',
    mobileLink: '',
  },
};

export default async function OpsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user as any;
  const interfaceTheme = user?.interfaceTheme || 'minimal';
  const onboardingStep = user?.onboardingStep || 'pending_survey';

  const theme = THEME_CONFIG[interfaceTheme as keyof typeof THEME_CONFIG] || THEME_CONFIG.minimal;

  return (
    <div className={`min-h-screen ${theme.bg} flex flex-col font-sans`}>
      <header className={`border-b sticky top-0 z-10 px-4 py-3 sm:px-6 ${theme.header}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/ops" className={`text-xl font-bold px-3 py-1 rounded-md ${theme.logo}`}>
              <span className="hidden sm:inline">The Big Muddy </span>Ops
            </Link>

            <nav className={`hidden sm:flex items-center gap-4 ml-8 text-sm font-medium`}>
              <Link href="/ops" className={theme.navLink}>Dashboard</Link>
              <Link href="/ops/tasks" className={theme.navLink}>All Tasks</Link>
              <Link href="/ops/content" className={theme.navLink}>Content Library</Link>
              <Link href="/ops/chat" className={theme.navLink}>Delta Dawn</Link>
              <Link href="/ops/property" className={theme.navLink}>Property Info</Link>
              <Link href="/ops/amy" className={`${theme.navLink} ${theme.navActive}`}>Amy</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className={`text-sm font-medium text-right hidden sm:block ${theme.userName}`}>
              {user?.name || user?.email || 'Guest'}
            </div>
            <div className={`sm:hidden flex flex-row gap-2 overflow-x-auto text-xs whitespace-nowrap ${theme.mobileLink}`}>
              <Link href="/ops">Dash</Link>
              <Link href="/ops/tasks">Tasks</Link>
              <Link href="/ops/content">Content</Link>
              <Link href="/ops/chat">Chat</Link>
              <Link href="/ops/amy" className={`${theme.navActive} font-semibold`}>Amy</Link>
            </div>
          </div>
        </div>
      </header>

      <main className={`flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 ${theme.main}`}>
        {children}
      </main>
    </div>
  );
}
