import { prisma } from '@bigmuddy/database';
import TaskCard from '../components/TaskCard';
import type { LaunchTask, ContentPack } from '@prisma/client';

export const revalidate = 0;

export default async function AllTasks() {
    const tasks = await prisma.launchTask.findMany({
        include: { contentPack: true },
        orderBy: { taskNumber: 'asc' },
    }) as Array<LaunchTask & { contentPack: ContentPack | null }>;

    return (
        <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                backgroundColor: 'var(--theme-card-bg)',
                padding: '1.5rem 2.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--theme-card-border)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--theme-text-primary)', letterSpacing: '-0.025em', margin: 0 }}>All Tasks</h1>
                <p style={{ color: 'var(--theme-text-secondary)', marginTop: '0.5rem', fontSize: '1.125rem', margin: '0.5rem 0 0 0' }}>
                    Complete list of all {tasks.length} tasks required to launch.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map((task) => (
                    <TaskCard key={task.taskNumber} task={task} />
                ))}
            </div>
        </div>
    );
}
