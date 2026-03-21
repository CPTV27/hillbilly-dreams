'use client';

import { useState } from 'react';
import ContentPackCard from './ContentPackCard';
import type { ContentPack } from '@prisma/client';
import { motion } from 'framer-motion';

export default function ContentLibraryClient({ initialPacks }: { initialPacks: ContentPack[] }) {
    const [search, setSearch] = useState('');

    const filteredPacks = initialPacks.filter(pack =>
        pack.title.toLowerCase().includes(search.toLowerCase()) ||
        pack.slug.toLowerCase().includes(search.toLowerCase())
    );

    const iconSearch = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    const iconX = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ position: 'relative', maxWidth: '36rem' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, paddingLeft: '1rem', display: 'flex', alignItems: 'center', pointerEvents: 'none', color: 'var(--theme-text-muted)' }}>
                    {iconSearch}
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search content packs by title..."
                    style={{
                        width: '100%',
                        padding: '0.875rem 2.5rem 0.875rem 2.75rem',
                        backgroundColor: 'var(--theme-card-bg)',
                        border: '1px solid var(--theme-card-border)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        color: 'var(--theme-text-primary)',
                        fontFamily: 'inherit',
                        fontSize: '1rem'
                    }}
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            paddingRight: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'var(--theme-text-muted)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {iconX}
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                {filteredPacks.length > 0 ? (
                    filteredPacks.map((pack, i) => (
                        <motion.div
                            key={pack.slug}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                            <ContentPackCard pack={pack} />
                        </motion.div>
                    ))
                ) : (
                    <div style={{
                        gridColumn: '1 / -1',
                        padding: '3rem',
                        textAlign: 'center',
                        color: 'var(--theme-text-secondary)',
                        border: '2px dashed var(--theme-card-border)',
                        borderRadius: '0.75rem',
                        backgroundColor: 'var(--theme-hover)'
                    }}>
                        <div style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>🔍</div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--theme-text-primary)' }}>No matches found</h3>
                        <p>Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
