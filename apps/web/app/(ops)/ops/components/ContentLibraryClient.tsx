'use client';

import { useState } from 'react';
import ContentPackCard from './ContentPackCard';
import type { ContentPack } from '@prisma/client';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContentLibraryClient({ initialPacks }: { initialPacks: ContentPack[] }) {
    const [search, setSearch] = useState('');

    const filteredPacks = initialPacks.filter(pack =>
        pack.title.toLowerCase().includes(search.toLowerCase()) ||
        pack.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search content packs by title..."
                    className="w-full pl-11 pr-10 py-3.5 bg-white border border-neutral-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-neutral-900 placeholder:text-neutral-400"
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max items-start">
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
                    <div className="col-span-full py-12 text-center text-neutral-500 border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/50">
                        <div className="text-4xl mb-3">🔍</div>
                        <h3 className="text-lg font-semibold text-neutral-700">No matches found</h3>
                        <p>Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
