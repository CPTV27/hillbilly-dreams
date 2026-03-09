'use client';

import { useState } from 'react';
import type { ContentPack } from '@prisma/client';

export default function ContentPackCard({ pack }: { pack: ContentPack }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all ${expanded ? 'border-blue-300 ring-1 ring-blue-100' : 'border-neutral-200 hover:border-blue-200'} flex flex-col h-full`}>
            <div
                className="p-5 flex justify-between items-center cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <h3 className="text-lg font-semibold text-neutral-800">{pack.title}</h3>
                <button className="text-neutral-400 hover:text-blue-600 transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100/50">
                    {expanded ? '−' : '+'}
                </button>
            </div>

            {expanded && (
                <div className="px-5 pb-5 border-t border-neutral-100 pt-4 bg-neutral-50/50 flex-1">
                    <div className="space-y-4">
                        {(pack.sections as Array<{ label: string, content: string }>).map((sec, idx) => (
                            <div key={idx} className="bg-white border border-neutral-200 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-3 border-b border-neutral-100 pb-2">
                                    <h5 className="font-medium text-neutral-900">{sec.label}</h5>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(sec.content)}
                                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-3 py-1.5 rounded-md transition-colors border border-blue-200"
                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className="text-sm text-neutral-600 space-y-2 whitespace-pre-wrap font-mono leading-relaxed bg-neutral-50/80 p-3 rounded-md">
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
