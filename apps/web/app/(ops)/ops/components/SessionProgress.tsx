'use client';

import { motion } from 'framer-motion';
import { LaunchTask } from '@prisma/client';

export interface SessionProgressProps {
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
    let badgeBg = 'var(--theme-card-bg)';
    let badgeColor = 'var(--theme-text-secondary)';
    let badgeBorder = 'var(--theme-card-border)';

    if (progressPercent === 100) {
        badgeText = 'Complete';
        badgeBg = 'var(--theme-success-bg, rgba(52,211,153,0.15))';
        badgeColor = 'var(--theme-success)';
        badgeBorder = 'var(--theme-success)';
    } else if (progressPercent > 0) {
        badgeText = 'In Progress';
        badgeBg = 'var(--theme-warning-bg, rgba(251,191,36,0.15))';
        badgeColor = 'var(--theme-warning)';
        badgeBorder = 'var(--theme-warning)';
    }

    // Determine progress bar fill color
    let barFillColor = 'var(--theme-progress-fill)';
    if (progressPercent === 100) barFillColor = 'var(--theme-success)';
    if (progressPercent === 0) barFillColor = 'var(--theme-card-border)';

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
        <div style={{
            backgroundColor: 'var(--theme-card-bg)',
            border: '1px solid var(--theme-card-border)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--theme-text-primary)', margin: 0, letterSpacing: '-0.025em' }}>
                        Session {sessionNumber}: {sessionName}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--theme-text-secondary)' }}>
                            {completedTasks} of {totalTasks} Complete
                        </span>
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            backgroundColor: badgeBg,
                            color: badgeColor,
                            border: `1px solid ${badgeBorder}`
                        }}>
                            {badgeText}
                        </span>
                    </div>
                </div>

                <div style={{
                    width: '100%',
                    backgroundColor: 'var(--theme-progress-bg)',
                    borderRadius: '9999px',
                    height: '1rem',
                    overflow: 'hidden',
                    border: '1px solid var(--theme-card-border)',
                    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            height: '100%',
                            borderRadius: '9999px',
                            backgroundColor: barFillColor,
                            position: 'relative',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        {progressPercent >= 10 && (
                            <span style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingRight: '0.5rem',
                                fontSize: '0.625rem',
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.9)'
                            }}>
                                {progressPercent}%
                            </span>
                        )}
                    </motion.div>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--theme-text-secondary)' }}>
                <div style={{ display: 'flex', gap: '1rem', backgroundColor: 'var(--theme-hover)', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--theme-card-border)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--theme-success)' }}>
                        <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--theme-success)' }}></div> {completedTasks} done
                    </span>
                    <span style={{ color: 'var(--theme-card-border)' }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--theme-warning)' }}>
                        <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--theme-warning)' }}></div> {pendingTasks} pending
                    </span>
                    <span style={{ color: 'var(--theme-card-border)' }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--theme-text-muted)' }}>
                        <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--theme-text-muted)' }}></div> {skippedTasks} skipped
                    </span>
                </div>

                {pendingTasks > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--theme-warning)', backgroundColor: 'var(--theme-warning-bg, rgba(251,191,36,0.15))', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px dashed var(--theme-warning)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem' }}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>Est. Remaining: {timeRemainingString}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
