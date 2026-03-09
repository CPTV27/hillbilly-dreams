import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes conditionally, resolving any conflicts using tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Maps common status strings to tailwind text/bg color pairs.
 */
export function getStatusColor(status: string) {
    const s = status?.toLowerCase() || '';

    if (['done', 'completed', 'success', 'published'].includes(s)) {
        return 'text-green-700 bg-green-50 border-green-200';
    }

    if (['pending', 'draft', 'in-progress', 'in_progress', 'review'].includes(s)) {
        return 'text-amber-700 bg-amber-50 border-amber-200';
    }

    if (['skipped', 'cancelled', 'archived', 'failed', 'error'].includes(s)) {
        return 'text-neutral-500 bg-neutral-100 border-neutral-200';
    }

    // fallback
    return 'text-blue-700 bg-blue-50 border-blue-200';
}

/**
 * Formats a given date to a short locale date string.
 */
export function formatDate(date: Date | string | null | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

/**
 * Provides a relative time string (e.g., "just now", "2 min ago", "1 hour ago").
 */
export function getRelativeTime(date: Date | string | number | null | undefined): string {
    if (!date) return '';
    const timeMs = typeof date === 'number' ? date : new Date(date).getTime();
    if (isNaN(timeMs)) return '';

    const deltaSeconds = Math.round((Date.now() - timeMs) / 1000);
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (deltaSeconds < 30) return 'just now';
    if (deltaSeconds < minute) return `${deltaSeconds} sec ago`;
    if (deltaSeconds < 2 * minute) return '1 min ago';
    if (deltaSeconds < hour) return `${Math.floor(deltaSeconds / minute)} min ago`;
    if (deltaSeconds < 2 * hour) return '1 hour ago';
    if (deltaSeconds < day) return `${Math.floor(deltaSeconds / hour)} hours ago`;
    if (deltaSeconds < 2 * day) return 'yesterday';

    // For anything older than yesterday, just use the short date
    return formatDate(new Date(timeMs));
}
