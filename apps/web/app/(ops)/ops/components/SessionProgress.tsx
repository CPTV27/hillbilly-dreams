'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LaunchTask } from '@prisma/client';
import { getStatusColor } from '@/lib/utils';

interface SessionProgressProps {
    tasks: LaunchTask[];
    sessionName: string;
    sessionNumber: number;
}

export default function SessionProgress({ tasks, sessionName, sessionNumber }: SessionProgressProps) {
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const skippedTasks = tasks.filter(t => t.status === 'skipped').length;
    const totalTasks = tasks.length;

    // Calculate progress percentage
    const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Determine overall badge properties based on progress
    let badgeText = 'Pending';
    let badgeColorClass = getStatusColor('pending');

    if (progressPercent === 100) {
        badgeText = 'Complete';
        badgeColorClass = getStatusColor('done');
    } else if (progressPercent > 0) {
        badgeText = 'In Progress';
        badgeColorClass = 'text-amber-800 bg-amber-100 border border-amber-200'; // Specific intermediate color
    }

    // Determine progress bar fill color
    let barFillColor = 'bg-amber-500';
    if (progressPercent === 100) barFillColor = 'bg-green-500';
    if (progressPercent === 0) barFillColor = 'bg-neutral-300';

    // Time estimate for remaining
    let totalMinutesRemaining = 0;
    for (const t of tasks.filter(t => t.status === 'pending')) {
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

    return (
        <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm mb-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Session {sessionNumber}: {sessionName}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-neutral-500">{completedTasks} of {totalTasks} Complete</span>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", badgeColorClass)}>
                        {badgeText}
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="w-full bg-neutral-100 rounded-full h-4 overflow-hidden border border-neutral-200 shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={cn("h-4 rounded-full transition-colors relative", barFillColor)}
                    >
                        {progressPercent >= 10 && (
                            <span className="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-bold text-white/90">
                                {progressPercent}%
                            </span>
                        )}
                    </motion.div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 font-medium">
                <div className="flex gap-4 bg-neutral-50 px-4 py-2 rounded-lg border border-neutral-100">
                    <span className="text-green-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> {completedTasks} done</span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-amber-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> {pendingTasks} pending</span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-neutral-500 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-neutral-400"></div> {skippedTasks} skipped</span>
                </div>

                {pendingTasks > 0 && (
                    <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>Est. Remaining: {timeRemainingString}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
