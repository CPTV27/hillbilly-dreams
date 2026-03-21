'use client';

import { useState } from 'react';
import { LaunchTask, ContentPack } from '@prisma/client';
import { sanitizeTaskGuide } from '@/lib/sanitize';

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
        <div style={{
            backgroundColor: status === 'done' ? 'var(--theme-success-bg, rgba(52,211,153,0.1))' : 'var(--theme-card-bg)',
            border: `1px solid ${status === 'done' ? 'var(--theme-success)' : 'var(--theme-card-border)'}`,
            borderRadius: '0.75rem',
            overflow: 'hidden',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            marginBottom: '1rem',
        }}>
            <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ paddingTop: '0.25rem' }}>
                    <input
                        type="checkbox"
                        checked={status === 'done'}
                        onChange={toggleStatus}
                        style={{
                            width: '1.5rem',
                            height: '1.5rem',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            accentColor: 'var(--theme-accent)'
                        }}
                    />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
                        <h3 style={{
                            fontWeight: 600,
                            fontSize: '1.125rem',
                            color: status === 'done' ? 'var(--theme-text-muted)' : 'var(--theme-text-primary)',
                            textDecoration: status === 'done' ? 'line-through' : 'none',
                            margin: 0
                        }}>
                            Task {task.taskNumber}: {task.title}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>
                            {task.platform && (
                                <span style={{ backgroundColor: 'var(--theme-hover)', color: 'var(--theme-text-secondary)', padding: '0.25rem 0.625rem', borderRadius: '0.375rem' }}>
                                    {task.platform}
                                </span>
                            )}
                            {task.timeEstimate && (
                                <span style={{ backgroundColor: 'var(--theme-accent-bg)', color: 'var(--theme-accent)', padding: '0.25rem 0.625rem', borderRadius: '0.375rem' }}>
                                    {task.timeEstimate}
                                </span>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.75rem' }}>
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={{ color: 'var(--theme-accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
                        >
                            {expanded ? 'Hide Guide' : 'Read Guide'}
                        </button>

                        {task.contentPack && (
                            <button
                                onClick={() => setContentExpanded(!contentExpanded)}
                                style={{ color: 'var(--theme-progress-fill)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
                            >
                                {contentExpanded ? 'Hide Content' : 'View Content'}
                            </button>
                        )}

                        {task.link && (
                            <a href={task.link} target="_blank" rel="noreferrer" style={{ color: 'var(--theme-text-muted)', textDecoration: 'none' }}>
                                Open Link ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {expanded && task.guide && (
                <div style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: 'var(--theme-hover)',
                    borderTop: '1px solid var(--theme-card-border)',
                    color: 'var(--theme-text-secondary)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6
                }}>
                    <div dangerouslySetInnerHTML={{ __html: sanitizeTaskGuide(task.guide) }} />
                </div>
            )}

            {contentExpanded && task.contentPack && (
                <div style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: 'var(--theme-progress-bg)',
                    borderTop: '1px solid var(--theme-card-border)',
                }}>
                    <h4 style={{ fontWeight: 700, color: 'var(--theme-text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                        📘 {task.contentPack.title}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {(task.contentPack.sections as Array<{ label: string, content: string }>).map((sec, idx) => (
                            <div key={idx} style={{ backgroundColor: 'var(--theme-card-bg)', border: '1px solid var(--theme-card-border)', padding: '1rem', borderRadius: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h5 style={{ fontWeight: 600, color: 'var(--theme-text-primary)', margin: 0 }}>{sec.label}</h5>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(sec.content)}
                                        style={{ fontSize: '0.75rem', backgroundColor: 'var(--theme-hover)', color: 'var(--theme-text-secondary)', border: 'none', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', cursor: 'pointer' }}
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--theme-text-secondary)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', backgroundColor: 'var(--theme-hover)', padding: '0.75rem', borderRadius: '0.25rem', border: '1px solid var(--theme-card-border)' }}>
                                    {sec.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
