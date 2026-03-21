'use client';

import { ReactNode } from 'react';

type KPICardProps = {
    label: string;
    value: string | number;
    icon: ReactNode;
    iconBg: string;
    iconColor: string;
};

function KPICard({ label, value, icon, iconBg, iconColor }: KPICardProps) {
    return (
        <div style={{
            backgroundColor: 'var(--theme-card-bg)',
            border: '1px solid var(--theme-card-border)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
        }}>
            <div style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                backgroundColor: iconBg,
                color: iconColor,
            }}>
                {icon}
            </div>
            <div>
                <h3 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--theme-text-primary)', margin: 0 }}>{value}</h3>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--theme-text-secondary)', marginTop: '0.25rem', margin: '0.25rem 0 0' }}>{label}</p>
            </div>
        </div>
    );
}

export default function DashboardKPIs({
    completedTasks,
    totalTasks,
    currentSessionName,
    timeRemainingString,
    contentPacksUsed,
}: {
    completedTasks: number;
    totalTasks: number;
    currentSessionName: string;
    timeRemainingString: string;
    contentPacksUsed: number;
}) {
    const kpis = [
        {
            label: 'Tasks Complete',
            value: `${completedTasks}/${totalTasks}`,
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
            iconBg: 'var(--theme-accent-bg)',
            iconColor: 'var(--theme-success)',
        },
        {
            label: 'Current Session',
            value: currentSessionName,
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
            iconBg: 'var(--theme-accent-bg)',
            iconColor: 'var(--theme-accent)',
        },
        {
            label: 'Time Remaining',
            value: timeRemainingString,
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            iconBg: 'var(--theme-accent-bg)',
            iconColor: 'var(--theme-warning)',
        },
        {
            label: 'Content Packs Used',
            value: contentPacksUsed,
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
            iconBg: 'var(--theme-accent-bg)',
            iconColor: 'var(--theme-progress-fill)',
        },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {kpis.map((kpi) => (
                <KPICard
                    key={kpi.label}
                    label={kpi.label}
                    value={kpi.value}
                    icon={kpi.icon}
                    iconBg={kpi.iconBg}
                    iconColor={kpi.iconColor}
                />
            ))}
        </div>
    );
}
