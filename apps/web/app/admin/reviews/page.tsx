import { prisma } from '@bigmuddy/database';
import AdminReviewsClient from './AdminReviewsClient';

export const revalidate = 0;

export const metadata = {
  title: 'Reviews',
};

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { postedAt: 'desc' },
    take: 100,
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

  const serialized = reviews.map(r => ({
    ...r,
    postedAt: r.postedAt.toISOString(),
    respondedAt: r.respondedAt?.toISOString() || null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return <AdminReviewsClient reviews={serialized} stats={stats} />;
}
