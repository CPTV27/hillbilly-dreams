'use client';

import { useState } from 'react';
import type { ContentPack } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';
import { sanitizeTaskGuide } from '@/lib/sanitize';

export default function ContentPackCard({ pack }: { pack: ContentPack }) {
    const [expanded, setExpanded] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);

    const sections = pack.sections as Array<{ label: string, content: string }>;

    const bgStripHtml = (htmlContent: string) => {
        // Strip out HTML tags for clipboard copies
        const tmp = document.createElement('div');
        tmp.innerHTML = sanitizeTaskGuide(htmlContent) || '';
        return tmp.textContent || tmp.innerText || '';
    };

    const handleCopy = (content: string, idx: number) => {
        const textToCopy = bgStripHtml(content);
        navigator.clipboard.writeText(textToCopy);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyAll = () => {
        const allContent = sections.map(s => `=== ${s.label} ===\n\n${bgStripHtml(s.content)}\n`).join('\n');
        navigator.clipboard.writeText(allContent);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const iconChevronDown = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
    const iconChevronUp = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
    const iconCopy = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
    const iconCheck = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

    return (
        <motion.div
            layout="position"
            style={{
                backgroundColor: 'var(--theme-card-bg)',
                border: `1px solid ${expanded ? 'var(--theme-accent)' : 'var(--theme-card-border)'}`,
                boxShadow: expanded ? '0 0 0 1px var(--theme-accent-bg)' : '0 1px 2px rgba(0,0,0,0.05)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.2s',
                ...(expanded ? { gridColumn: '1 / -1' } : {})
            }}
        >
            <div
                onClick={() => setExpanded(!expanded)}
                style={{
                    padding: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: expanded ? 'var(--theme-hover)' : 'transparent',
                }}
            >
                <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--theme-text-primary)', margin: 0 }}>{pack.title}</h3>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--theme-text-secondary)', margin: '0.25rem 0 0 0' }}>{sections.length} section{sections.length !== 1 ? 's' : ''}</p>
                </div>
                <button style={{
                    color: 'var(--theme-accent)',
                    backgroundColor: 'var(--theme-accent-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    border: '1px solid var(--theme-card-border)',
                    cursor: 'pointer',
                }}>
                    {expanded ? iconChevronUp : iconChevronDown}
                </button>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            padding: '1.25rem',
                            borderTop: '1px solid var(--theme-card-border)',
                            backgroundColor: 'var(--theme-hover)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                            <button
                                onClick={handleCopyAll}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    border: `1px solid ${copiedAll ? 'var(--theme-success)' : 'var(--theme-accent)'}`,
                                    backgroundColor: copiedAll ? 'var(--theme-success-bg, rgba(52,211,153,0.15))' : 'var(--theme-card-bg)',
                                    color: copiedAll ? 'var(--theme-success)' : 'var(--theme-accent)',
                                    cursor: 'pointer'
                                }}
                            >
                                {copiedAll ? iconCheck : iconCopy}
                                {copiedAll ? 'Saved to Clipboard!' : 'Copy Entire Pack'}
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {sections.map((sec, idx) => (
                                <div key={idx} style={{
                                    backgroundColor: 'var(--theme-card-bg)',
                                    border: '1px solid var(--theme-card-border)',
                                    padding: '1.25rem',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                        <h5 style={{
                                            fontWeight: 700,
                                            color: 'var(--theme-text-primary)',
                                            margin: 0,
                                            borderLeft: '4px solid var(--theme-accent)',
                                            paddingLeft: '0.75rem'
                                        }}>{sec.label}</h5>
                                        <button
                                            onClick={() => handleCopy(sec.content, idx)}
                                            style={{
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: '0.375rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.375rem',
                                                border: `1px solid ${copiedIndex === idx ? 'var(--theme-success)' : 'var(--theme-card-border)'}`,
                                                backgroundColor: copiedIndex === idx ? 'var(--theme-success-bg, rgba(52,211,153,0.15))' : 'var(--theme-hover)',
                                                color: copiedIndex === idx ? 'var(--theme-success)' : 'var(--theme-text-primary)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {copiedIndex === idx ? iconCheck : iconCopy}
                                            {copiedIndex === idx ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '0.875rem',
                                            color: 'var(--theme-text-secondary)',
                                            backgroundColor: 'var(--theme-hover)',
                                            padding: '1rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid var(--theme-card-border)',
                                            lineHeight: 1.6
                                        }}
                                        dangerouslySetInnerHTML={{ __html: sanitizeTaskGuide(sec.content) || '' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
