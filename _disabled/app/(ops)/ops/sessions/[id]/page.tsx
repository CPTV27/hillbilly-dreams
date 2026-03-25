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
        <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Link href="/ops" style={{
                color: 'var(--theme-accent)',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-block',
                marginBottom: '-0.5rem'
            }}>
                &larr; Back to Dashboard
            </Link>

            <SessionProgress
                tasks={tasks}
                sessionName={meta.title}
                sessionNumber={sessionId}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map((task) => (
                    <TaskCard key={task.taskNumber} task={task} />
                ))}
            </div>
        </div>
    );
}
