'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type KPICardProps = {
    label: string;
    value: string | number;
    icon: ReactNode;
    color: string; // Tailwind bg and text classes merged
    index: number;
};

function KPICard({ label, value, icon, color, index }: KPICardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col items-start gap-4"
        >
            <div className={cn("p-3 rounded-xl", color)}>
                {icon}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-neutral-900">{value}</h3>
                <p className="text-sm font-medium text-neutral-500 mt-1">{label}</p>
            </div>
        </motion.div>
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
            icon: <CheckCircle className="w-6 h-6" />,
            color: 'text-green-600 bg-green-100',
        },
        {
            label: 'Current Session',
            value: currentSessionName,
            icon: <Zap className="w-6 h-6" />,
            color: 'text-blue-600 bg-blue-100',
        },
        {
            label: 'Time Remaining',
            value: timeRemainingString,
            icon: <Clock className="w-6 h-6" />,
            color: 'text-amber-600 bg-amber-100',
        },
        {
            label: 'Content Packs Used',
            value: contentPacksUsed,
            icon: <FileText className="w-6 h-6" />,
            color: 'text-purple-600 bg-purple-100',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
                <KPICard
                    key={kpi.label}
                    index={index}
                    label={kpi.label}
                    value={kpi.value}
                    icon={kpi.icon}
                    color={kpi.color}
                />
            ))}
        </div>
    );
}
