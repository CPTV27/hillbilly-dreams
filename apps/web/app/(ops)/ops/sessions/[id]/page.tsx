import { prisma } from '@bigmuddy/database';
import { notFound } from 'next/navigation';
import TaskCard from '../../components/TaskCard';
import { SESSION_META } from '@/lib/ops';
import Link from 'next/link';
import type { LaunchTask, ContentPack } from '@prisma/client';
import SessionProgress from '../../components/SessionProgress';

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
            <Link href="/ops" className="text-amber-600 hover:underline font-medium hover:text-amber-800 transition-colors">&larr; Back to Dashboard</Link>

            <SessionProgress
                tasks={tasks}
                sessionName={meta.title}
                sessionNumber={sessionId}
            />

            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard key={task.taskNumber} task={task} />
                ))}
            </div>
        </div>
    );
}
