import { prisma } from '@bigmuddy/database';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { SESSION_META } from '@/lib/ops';
import { formatDate, getRelativeTime } from '@/lib/utils';
import DashboardKPIs from './components/DashboardKPIs';

export const revalidate = 0; // Dynamic data

export default async function OpsDashboard() {
    // Route users who haven't completed onboarding to the survey
    const session = await auth();
    const user = session?.user as any;
    if (user?.onboardingStep === 'pending_survey') {
        redirect('/ops/onboarding');
    }
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

    // Current Session
    const incompleteTasks = tasks.filter(t => t.status === 'pending');
    let currentSessionName = 'All caught up!';
    if (incompleteTasks.length > 0) {
        const currentSessionId = Math.min(...incompleteTasks.map(t => t.session));
        currentSessionName = SESSION_META[currentSessionId]?.title || `Session ${currentSessionId}`;
    }

    // Parse time strings
    let totalMinutesRemaining = 0;
    for (const t of incompleteTasks) {
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

    // Content Packs Used
    const contentPacksUsed = new Set(
        tasks.filter(t => (t.status === 'done' || t.status === 'skipped') && t.contentPackSlug)
            .map(t => t.contentPackSlug)
    ).size;

    // Group by session
    const sessionIds = Object.keys(SESSION_META).map(Number).sort((a, b) => a - b);
    const sessionData = sessionIds.map(id => {
        const sessionTasks = tasks.filter(t => t.session === id);
        const completed = sessionTasks.filter(t => t.status === 'done').length;
        return {
            id,
            total: sessionTasks.length,
            completed,
        };
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Hero card */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                backgroundColor: 'var(--theme-card-bg)',
                padding: '1.5rem 2rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--theme-card-border)',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--theme-text-primary)', letterSpacing: '-0.025em', margin: 0 }}>
                        Launch Dashboard
                    </h1>
                    <p style={{ color: 'var(--theme-text-secondary)', maxWidth: '36rem', fontSize: '1.125rem', margin: 0 }}>
                        Track our progress through all {tasks.length} tasks required to get The Big Muddy Inn &amp; Blues Room ready for opening night.
                    </p>
                </div>

                <div style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem',
                    backgroundColor: 'var(--theme-accent-bg)',
                    borderRadius: '50%',
                    height: '8rem',
                    width: '8rem',
                    position: 'relative',
                }}>
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="var(--theme-progress-bg)"
                            strokeWidth="3"
                        />
                        <path
                            strokeDasharray={`${progressPercent}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="var(--theme-progress-fill)"
                            strokeWidth="3"
                        />
                    </svg>
                    <div style={{ textAlign: 'center', zIndex: 1, fontWeight: 700, color: 'var(--theme-accent)' }}>
                        <span style={{ fontSize: '1.5rem' }}>{progressPercent}%</span>
                    </div>
                </div>
            </div>

            <DashboardKPIs
                completedTasks={completedCount}
                totalTasks={totalCount}
                currentSessionName={currentSessionName}
                timeRemainingString={timeRemainingString}
                contentPacksUsed={contentPacksUsed}
            />

            {/* Session cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {sessionData.map((s) => {
                    const meta = SESSION_META[s.id];
                    const pct = s.total ? (s.completed / s.total) * 100 : 0;
                    const barColor = s.completed === s.total && s.total > 0
                        ? 'var(--theme-success)'
                        : s.completed > 0
                            ? 'var(--theme-progress-fill)'
                            : 'var(--theme-text-muted)';
                    return (
                        <Link
                            key={s.id}
                            href={`/ops/sessions/${s.id}`}
                            style={{
                                backgroundColor: 'var(--theme-card-bg)',
                                border: '1px solid var(--theme-card-border)',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'border-color 0.15s',
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{
                                    width: '3rem',
                                    height: '3rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'var(--theme-accent-bg)',
                                    borderRadius: '50%',
                                    fontSize: '1.5rem',
                                }}>
                                    {meta.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--theme-text-primary)', margin: 0 }}>
                                    Session {s.id}: {meta.title}
                                </h3>
                                <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>
                                    {meta.subtitle}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                                    <span style={{ color: 'var(--theme-text-secondary)', fontWeight: 500 }}>Progress</span>
                                    <span style={{
                                        color: 'var(--theme-text-primary)',
                                        fontWeight: 700,
                                        backgroundColor: 'var(--theme-hover)',
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        fontSize: '0.75rem',
                                    }}>
                                        {s.completed} / {s.total}
                                    </span>
                                </div>
                                <div style={{ width: '100%', backgroundColor: 'var(--theme-progress-bg)', borderRadius: '9999px', height: '0.375rem', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '0.375rem',
                                            borderRadius: '9999px',
                                            backgroundColor: barColor,
                                            width: `${pct}%`,
                                            transition: 'width 0.3s',
                                        }}
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Activity Feed */}
            <div style={{
                backgroundColor: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-card-border)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                textAlign: 'left',
            }}>
                <h3 style={{
                    padding: '1rem 1.5rem',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    borderBottom: '1px solid var(--theme-card-border)',
                    backgroundColor: 'var(--theme-hover)',
                    color: 'var(--theme-text-primary)',
                    margin: 0,
                }}>
                    Recent Activity Feed
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '24rem', overflowY: 'auto' }}>
                    {activities.length > 0 ? activities.map((act) => {
                        // Icon colors per type
                        let iconColor = 'var(--theme-text-muted)';
                        let iconLabel = '';
                        if (act.type === 'task_completed') { iconColor = 'var(--theme-success)'; iconLabel = '✓'; }
                        else if (act.type === 'task_skipped') { iconColor = 'var(--theme-text-muted)'; iconLabel = '»'; }
                        else if (act.type === 'login') { iconColor = 'var(--theme-accent)'; iconLabel = '→'; }
                        else if (act.type === 'chat') { iconColor = 'var(--theme-warning)'; iconLabel = '💬'; }
                        else if (act.type === 'content_viewed') { iconColor = 'var(--theme-progress-fill)'; iconLabel = '👁'; }

                        // Derive initial from name or email
                        let initial = '?';
                        if (act.userName) initial = act.userName.charAt(0).toUpperCase();
                        else if (act.userId) initial = act.userId.charAt(0).toUpperCase();

                        return (
                            <li
                                key={act.id}
                                style={{
                                    padding: '1rem 1.5rem',
                                    display: 'flex',
                                    gap: '1rem',
                                    fontSize: '0.875rem',
                                    alignItems: 'center',
                                    borderBottom: '1px solid var(--theme-card-border)',
                                }}
                            >
                                <div style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '1.125rem',
                                    flexShrink: 0,
                                    backgroundColor: 'var(--theme-accent-bg)',
                                    color: 'var(--theme-accent)',
                                }}>
                                    {initial}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ color: 'var(--theme-text-primary)', fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {act.message}
                                    </p>
                                    <p style={{ color: 'var(--theme-text-muted)', fontSize: '0.75rem', marginTop: '0.125rem', margin: '0.125rem 0 0' }}>
                                        {getRelativeTime(act.createdAt)}
                                    </p>
                                </div>
                                <div style={{ flexShrink: 0, paddingLeft: '0.5rem', color: iconColor, fontSize: '1.25rem' }}>
                                    {iconLabel}
                                </div>
                            </li>
                        );
                    }) : (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--theme-text-muted)' }}>
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                backgroundColor: 'var(--theme-hover)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                fontSize: '1.5rem',
                            }}>
                                🌱
                            </div>
                            <p style={{ fontWeight: 500, marginTop: '1rem' }}>No activity yet. Complete a task to get started!</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}
