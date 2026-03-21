import { prisma } from '@bigmuddy/database';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { SESSION_META } from '@/lib/ops';
import { formatDate, cn, getRelativeTime } from '@/lib/utils';
import DashboardKPIs from './components/DashboardKPIs';
import { CheckCircle, SkipForward, LogIn, MessageCircle, Eye } from 'lucide-react';

export const revalidate = 0; // Dynamic data

export default async function OpsDashboard() {
    // Route users who haven't completed onboarding to the survey
    const session = await auth();
    const user = session?.user as any;
    if (user?.onboardingStep === 'pending_survey') {
        redirect('/ops/onboarding');
    }
    const [tasks, activities] = await Promise.all([
        prisma.launchTask.findMany({
            orderBy: { taskNumber: 'asc' },
        }),
        prisma.opsActivity.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
        }),
    ]);

    const completedCount = tasks.filter(t => t.status === 'done').length;
    const totalCount = tasks.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100) || 0;

    // Current Session
    const incompleteTasks = tasks.filter(t => t.status === 'pending');
    let currentSessionName = 'All caught up!';
    if (incompleteTasks.length > 0) {
        const currentSessionId = Math.min(...incompleteTasks.map(t => t.session));
        currentSessionName = SESSION_META[currentSessionId]?.title || `Session ${currentSessionId}`;
    }

    // Parse time strings
    let totalMinutesRemaining = 0;
    for (const t of incompleteTasks) {
        if (!t.timeEstimate) continue;
        const lower = t.timeEstimate.toLowerCase();
        let addMinutes = 0;
        const match = lower.match(/(\d+(?:\.\d+)?)/);
        if (match) {
            const val = parseFloat(match[1]);
            if (lower.includes('hour') || lower.includes('hr')) {
                addMinutes = val * 60;
            } else if (lower.includes('min')) {
                addMinutes = val;
            }
        }
        totalMinutesRemaining += addMinutes;
    }
    const hours = Math.floor(totalMinutesRemaining / 60);
    const mins = Math.round(totalMinutesRemaining % 60);
    const timeRemainingString = hours > 0
        ? `~${hours}h ${mins > 0 ? `${mins}m` : ''}`
        : `${mins} mins`;

    // Content Packs Used
    const contentPacksUsed = new Set(
        tasks.filter(t => (t.status === 'done' || t.status === 'skipped') && t.contentPackSlug)
            .map(t => t.contentPackSlug)
    ).size;

    // Group by session
    const sessionData = Array.from({ length: 7 }, (_, i) => {
        const sessionTasks = tasks.filter(t => t.session === i + 1);
        const completed = sessionTasks.filter(t => t.status === 'done').length;
        return {
            id: i + 1,
            total: sessionTasks.length,
            completed,
        };
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start justify-between bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Launch Dashboard</h1>
                    <p className="text-neutral-500 max-w-xl text-lg">
                        Track our progress through all 38 tasks required to get The Big Muddy Inn & Blues Room ready for opening night. Let's do this!
                    </p>
                </div>

                <div className="flex-shrink-0 flex items-center justify-center p-6 bg-amber-50 rounded-full h-32 w-32 relative group">
                    <svg className="absolute inset-0 w-full h-full text-neutral-200" viewBox="0 0 36 36">
                        <path
                            className="text-amber-200"
                            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className="text-amber-600 transition-all duration-1000 ease-out"
                            strokeDasharray={`${progressPercent}, 100`}
                            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                    </svg>
                    <div className="text-center z-10 font-bold text-amber-800">
                        <span className="text-2xl">{progressPercent}%</span>
                    </div>
                </div>
            </div>

            <DashboardKPIs
                completedTasks={completedCount}
                totalTasks={totalCount}
                currentSessionName={currentSessionName}
                timeRemainingString={timeRemainingString}
                contentPacksUsed={contentPacksUsed}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessionData.map((s) => {
                    const meta = SESSION_META[s.id];
                    return (
                        <Link
                            key={s.id}
                            href={`/ops/sessions/${s.id}`}
                            className="group bg-white border border-neutral-200 p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-amber-300 transition-all flex flex-col justify-between space-y-4 h-full"
                        >
                            <div className="space-y-2">
                                <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-full text-2xl group-hover:bg-amber-100 transition-colors">
                                    {meta.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-amber-800 transition-colors">Session {s.id}: {meta.title}</h3>
                                <p className="text-neutral-500 text-sm font-medium line-clamp-2">{meta.subtitle}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-600 font-medium">Progress</span>
                                    <span className="text-neutral-700 font-bold bg-neutral-100 px-2 py-0.5 rounded text-xs">{s.completed} / {s.total}</span>
                                </div>
                                <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-1.5 rounded-full transition-all",
                                            s.completed === s.total && s.total > 0 ? "bg-green-500" : s.completed > 0 ? "bg-amber-500" : "bg-neutral-300"
                                        )}
                                        style={{ width: `${s.total ? (s.completed / s.total) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-white border text-left border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <h3 className="px-6 py-4 font-semibold text-lg border-b border-neutral-100 bg-neutral-50 text-neutral-800">Recent Activity Feed</h3>
                <ul className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                    {activities.length > 0 ? activities.map((act, idx) => {
                        let icon = <div className="w-5 h-5" />;
                        if (act.type === 'task_completed') icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                        else if (act.type === 'task_skipped') icon = <SkipForward className="w-5 h-5 text-neutral-400" />;
                        else if (act.type === 'login') icon = <LogIn className="w-5 h-5 text-blue-500" />;
                        else if (act.type === 'chat') icon = <MessageCircle className="w-5 h-5 text-amber-500" />;
                        else if (act.type === 'content_viewed') icon = <Eye className="w-5 h-5 text-purple-500" />;

                        // Derive initial from name or email
                        let initial = '?';
                        if (act.userName) initial = act.userName.charAt(0).toUpperCase();
                        else if (act.userId) initial = act.userId.charAt(0).toUpperCase();

                        // Determine circle color (very rough mapping without full strict table role tracking, assuming names loosely)
                        let avatarColor = "bg-neutral-100 text-neutral-600";
                        const lowerName = (act.userName || act.userId || '').toLowerCase();
                        if (lowerName.includes('chase') || lowerName.includes('admin')) avatarColor = "bg-purple-100 text-purple-700";
                        else if (lowerName.includes('tracy') || lowerName.includes('amy')) avatarColor = "bg-blue-100 text-blue-700";
                        else avatarColor = "bg-amber-100 text-amber-700";

                        return (
                            <li
                                key={act.id}
                                className="px-6 py-4 flex gap-4 text-sm items-center hover:bg-neutral-50 transition-colors"
                            >
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm", avatarColor)}>
                                    {initial}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-neutral-800 font-medium truncate">{act.message}</p>
                                    <p className="text-neutral-500 text-xs mt-0.5">{getRelativeTime(act.createdAt)}</p>
                                </div>
                                <div className="flex-shrink-0 pl-2">
                                    {icon}
                                </div>
                            </li>
                        );
                    }) : (
                        <div className="p-12 text-center text-neutral-500 space-y-4">
                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-2xl">🌱</div>
                            <p className="font-medium">No activity yet. Complete a task to get started!</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}
