'use client';

import { useState } from 'react';
import { LaunchTask, ContentPack } from '@prisma/client';
import { cn } from '@/lib/utils';
import { sanitizeTaskGuide } from '@/lib/sanitize';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskCard({ task }: { task: LaunchTask & { contentPack: ContentPack | null } }) {
    const [status, setStatus] = useState(task.status);
    const [expanded, setExpanded] = useState(false);
    const [contentExpanded, setContentExpanded] = useState(false);

    const toggleStatus = async () => {
        const newStatus = status === 'done' ? 'pending' : 'done';
        setStatus(newStatus);

        await fetch(`/api/ops/tasks/${task.taskNumber}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
    };

    return (
        <div className={cn(
            "bg-white border rounded-xl overflow-hidden transition-all shadow-sm",
            status === 'done' ? 'border-green-300 bg-green-50/10' : 'border-neutral-200'
        )}>
            <div className="p-4 sm:p-6 flex items-start gap-4">
                <div className="pt-1">
                    <input
                        type="checkbox"
                        checked={status === 'done'}
                        onChange={toggleStatus}
                        className="w-6 h-6 rounded-md border-neutral-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                        <h3 className={cn(
                            "font-semibold text-lg",
                            status === 'done' ? 'text-neutral-500 line-through' : 'text-neutral-900'
                        )}>
                            Task {task.taskNumber}: {task.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                            {task.platform && <span className="bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-md">{task.platform}</span>}
                            {task.timeEstimate && <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md">{task.timeEstimate}</span>}
                        </div>
                    </div>

                    <div className="flex gap-3 text-sm font-medium mt-3">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-1"
                        >
                            {expanded ? 'Hide Guide' : 'Read Guide'}
                        </button>

                        {task.contentPack && (
                            <button
                                onClick={() => setContentExpanded(!contentExpanded)}
                                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                            >
                                {contentExpanded ? 'Hide Content' : 'View Content'}
                            </button>
                        )}

                        {task.link && (
                            <a href={task.link} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 hover:underline flex items-center gap-1">
                                Open Link ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {expanded && task.guide && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 sm:px-6 py-5 bg-neutral-50 border-t border-neutral-100 text-neutral-700 prose prose-amber max-w-none text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: sanitizeTaskGuide(task.guide) }} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {contentExpanded && task.contentPack && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 sm:px-6 py-5 bg-blue-50/30 border-t border-blue-100">
                            <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                📘 {task.contentPack.title}
                            </h4>
                            <div className="space-y-4">
                                {(task.contentPack.sections as Array<{ label: string, content: string }>).map((sec, idx) => (
                                    <div key={idx} className="bg-white border border-blue-100 p-4 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <h5 className="font-semibold text-neutral-800">{sec.label}</h5>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(sec.content)}
                                                className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium px-3 py-1.5 rounded-md transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                        <div className="text-sm text-neutral-600 space-y-2 whitespace-pre-wrap font-mono bg-neutral-50 p-3 rounded border border-neutral-100">
                                            {sec.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
