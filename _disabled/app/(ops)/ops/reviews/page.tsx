import { prisma } from '@bigmuddy/database';
import ReviewsClient from './ReviewsClient';

export const revalidate = 0;

export default async function ReviewsPage() {
    const reviews = await prisma.review.findMany({
        orderBy: { postedAt: 'desc' },
        take: 50,
        include: {
            client: { select: { name: true, businessType: true } },
        },
    });

    const stats = {
        total: reviews.length,
        pending: reviews.filter(r => r.responseStatus === 'pending').length,
        drafted: reviews.filter(r => r.responseStatus === 'drafted').length,
        approved: reviews.filter(r => r.responseStatus === 'approved').length,
        posted: reviews.filter(r => r.responseStatus === 'posted').length,
        avgRating: reviews.length > 0
            ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
            : 0,
    };

    // Serialize Date objects for client component
    const serialized = reviews.map(r => ({
        ...r,
        postedAt: r.postedAt.toISOString(),
        respondedAt: r.respondedAt?.toISOString() || null,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
    }));

    return <ReviewsClient reviews={serialized} stats={stats} />;
}
