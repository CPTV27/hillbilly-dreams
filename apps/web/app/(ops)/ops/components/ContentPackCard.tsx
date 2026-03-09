'use client';

import { useState } from 'react';
import type { ContentPack } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
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

    return (
        <motion.div
            layout="position"
            className={cn(
                "bg-white border rounded-xl overflow-hidden shadow-sm transition-all flex flex-col h-full",
                expanded ? "border-blue-300 ring-1 ring-blue-100 col-span-1 md:col-span-2" : "border-neutral-200 hover:border-blue-200"
            )}
        >
            <div
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div>
                    <h3 className="text-lg font-bold text-neutral-800">{pack.title}</h3>
                    <p className="text-sm text-neutral-500 font-medium">{sections.length} section{sections.length !== 1 ? 's' : ''}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors flex items-center justify-center w-10 h-10 rounded-full border border-blue-100 shadow-sm bg-white">
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5 border-t border-neutral-100 pt-5 bg-neutral-50 flex-1 overflow-hidden"
                    >
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={handleCopyAll}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-colors border shadow-sm",
                                    copiedAll ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                                )}
                            >
                                {copiedAll ? <Check size={16} /> : <Copy size={16} />}
                                {copiedAll ? 'Saved to Clipboard!' : 'Copy Entire Pack'}
                            </button>
                        </div>
                        <div className="space-y-5">
                            {sections.map((sec, idx) => (
                                <div key={idx} className="bg-white border border-neutral-200 p-5 rounded-xl shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-bold text-neutral-900 border-l-4 border-blue-400 pl-3">{sec.label}</h5>
                                        <button
                                            onClick={() => handleCopy(sec.content, idx)}
                                            className={cn(
                                                "text-xs font-bold px-3 py-1.5 rounded-md transition-colors border flex items-center gap-1.5 shadow-sm",
                                                copiedIndex === idx
                                                    ? "bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                                                    : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                                            )}
                                        >
                                            {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                                            {copiedIndex === idx ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <div
                                        className="text-sm text-neutral-700 bg-neutral-50/80 p-4 rounded-lg border border-neutral-100 prose prose-blue prose-sm max-w-none prose-p:leading-relaxed"
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
