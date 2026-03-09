import { prisma } from '@bigmuddy/database';
import Link from 'next/link';
import { SESSION_META } from '@/lib/ops';

export const revalidate = 0; // Dynamic data

export default async function OpsDashboard() {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessionData.map((s) => {
                    const meta = SESSION_META[s.id];
                    return (
                        <Link
                            key={s.id}
                            href={`/ops/sessions/${s.id}`}
                            className="group bg-white border border-neutral-200 p-6 rounded-xl hover:shadow-lg hover:border-amber-300 transition-all flex flex-col justify-between space-y-4 h-full"
                        >
                            <div className="space-y-2">
                                <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 rounded-full text-2xl group-hover:bg-amber-100 transition-colors">
                                    {meta.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-800 group-hover:text-amber-800 transition-colors">Session {s.id}: {meta.title}</h3>
                                <p className="text-neutral-500 text-sm font-medium">{meta.subtitle}</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-600 font-medium">Progress</span>
                                    <span className="text-neutral-800 font-bold">{s.completed} / {s.total}</span>
                                </div>
                                <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="bg-amber-500 h-2.5 rounded-full transition-all"
                                        style={{ width: `${s.total ? (s.completed / s.total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-white border text-left border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <h3 className="px-6 py-4 font-semibold text-lg border-b border-neutral-100 bg-neutral-50 text-neutral-800">Recent Activity Feed</h3>
                <ul className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                    {activities.length > 0 ? activities.map((act) => (
                        <li key={act.id} className="px-6 py-4 flex gap-4 text-sm items-start hover:bg-neutral-50 transition-colors">
                            <div className="flex-shrink-0 mt-0.5">
                                {act.type === 'task_completed' ? '✅' : act.type === 'chat' ? '💬' : '📝'}
                            </div>
                            <div>
                                <p className="text-neutral-800 font-medium">{act.message}</p>
                                <p className="text-neutral-400 text-xs mt-1">{new Date(act.createdAt).toLocaleString()}</p>
                            </div>
                        </li>
                    )) : <div className="p-6 text-neutral-500 text-center italic">No activity yet. Let's get to work!</div>}
                </ul>
            </div>
        </div>
    );
}
