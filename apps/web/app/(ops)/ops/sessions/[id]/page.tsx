import { prisma } from '@bigmuddy/database';
import { notFound } from 'next/navigation';
import TaskCard from '../../components/TaskCard';
import { SESSION_META } from '@/lib/ops';
import Link from 'next/link';
import type { LaunchTask, ContentPack } from '@prisma/client';

export const revalidate = 0;

export default async function SessionDetail({ params }: { params: { id: string } }) {
    const sessionId = parseInt(params.id);
    if (isNaN(sessionId) || !SESSION_META[sessionId]) return notFound();

    const meta = SESSION_META[sessionId];

    const tasks = await prisma.launchTask.findMany({
        where: { session: sessionId },
        include: { contentPack: true },
        orderBy: { taskNumber: 'asc' },
    }) as Array<LaunchTask & { contentPack: ContentPack | null }>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Link href="/ops" className="text-amber-600 hover:underline font-medium">&larr; Back to Dashboard</Link>

            <div className="bg-white p-6 sm:p-10 rounded-xl border border-neutral-200 shadow-sm flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-amber-50 rounded-full text-3xl shrink-0">
                    {meta.icon}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Session {sessionId}: {meta.title}</h1>
                    <p className="text-neutral-500 mt-2 text-lg">
                        {tasks.length} tasks • Estimated time: {meta.subtitle}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard key={task.taskNumber} task={task} />
                ))}
            </div>
        </div>
    );
}
