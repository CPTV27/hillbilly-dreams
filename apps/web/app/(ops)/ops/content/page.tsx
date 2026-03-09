import { prisma } from '@bigmuddy/database';
import ContentLibraryClient from '../components/ContentLibraryClient';

export const revalidate = 0;

export default async function ContentLibrary() {
    const packs = await prisma.contentPack.findMany({
        orderBy: { title: 'asc' },
    });

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10 rounded-xl border border-blue-100 shadow-sm flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100/50 rounded-full text-3xl shrink-0">
                    📘
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-blue-900 tracking-tight">Content Library</h1>
                    <p className="text-blue-700/80 mt-2 text-lg">
                        Pre-written copy for our profiles, listings, and guest emails. Copy and paste what you need.
                    </p>
                </div>
            </div>

            <ContentLibraryClient initialPacks={packs} />
        </div>
    );
}
