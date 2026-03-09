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
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-neutral-200 shadow-sm">
                <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">All Tasks</h1>
                <p className="text-neutral-500 mt-2 text-lg">
                    Complete list of all {tasks.length} tasks required to launch.
                </p>
            </div>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard key={task.taskNumber} task={task} />
                ))}
            </div>
        </div>
    );
}
