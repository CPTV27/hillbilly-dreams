import { notFound } from 'next/navigation';
import { prisma } from '@bigmuddy/database';
import { pickTopAdCampaign } from '@/lib/ads/pickTopCampaign';
import DisplaySignageClient from './DisplaySignageClient';

export const dynamic = 'force-dynamic';

export default async function DisplaySignagePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const channel = await prisma.displayChannel.findUnique({ where: { slug } });
  if (!channel) notFound();

  const [loreRows, ad] = await Promise.all([
    prisma.loreEntry.findMany({
      where: { namespace: { in: ['vetted', 'scout', 'clearinghouse'] } },
      orderBy: { updatedAt: 'desc' },
      take: 12,
      select: { title: true, body: true },
    }),
    pickTopAdCampaign(),
  ]);

  const initialTicker = loreRows.map((r) => {
    const t = r.title?.trim() || 'Lore';
    const b = r.body.replace(/\s+/g, ' ').slice(0, 88);
    return `${t} — ${b}`;
  });

  const embedUrl = channel.youtubeVideoId
    ? `https://www.youtube.com/embed/${channel.youtubeVideoId}?autoplay=1&mute=1&playsinline=1`
    : channel.youtubeChannelId
      ? `https://www.youtube.com/embed/live_stream?channel=${channel.youtubeChannelId}&autoplay=1&mute=1&playsinline=1`
      : '';

  return (
    <DisplaySignageClient
      slug={slug}
      embedUrl={embedUrl}
      initialTicker={initialTicker}
      adTitle={ad?.title ?? null}
      adBid={ad?.bidAmount ?? null}
    />
  );
}
