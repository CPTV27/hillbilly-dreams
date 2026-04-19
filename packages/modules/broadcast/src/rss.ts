// packages/modules/broadcast/src/rss.ts
// Pure RSS XML builder for podcast feeds. Uses iTunes namespace extensions
// required by Apple Podcasts. Used by /api/podcast/rss/[show] (the canonical
// feed of record) AND by buzzsprout.ts (which uploads metadata).

import type { PodcastShow, PodcastEpisode } from './types';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatRfc2822(date: Date): string {
  return date.toUTCString();
}

function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0)
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export interface BuildRssInput {
  show: PodcastShow;
  episodes: PodcastEpisode[];
  baseUrl: string; // e.g., "https://bigmuddyradio.com"
}

export function buildRssXml(input: BuildRssInput): string {
  const { show, episodes, baseUrl } = input;
  const showLink = `${baseUrl}/podcast/${show.slug}`;
  const lastBuildDate = formatRfc2822(new Date());

  const items = episodes
    .filter((e) => e.publishedAt && e.publishedAt <= new Date())
    .map((e) => {
      const epLink = `${showLink}/${e.id}`;
      const pubDate = formatRfc2822(e.publishedAt!);
      const duration = formatDuration(e.audioDurationSec);
      return `    <item>
      <title>${escapeXml(e.title)}</title>
      <description><![CDATA[${e.description}]]></description>
      <link>${epLink}</link>
      <guid isPermaLink="false">${e.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${escapeXml(e.audioUrl)}" length="${e.audioSizeBytes}" type="${e.audioMimeType}" />
      <itunes:duration>${duration}</itunes:duration>
      ${e.episodeNumber ? `<itunes:episode>${e.episodeNumber}</itunes:episode>` : ''}
      ${e.seasonNumber ? `<itunes:season>${e.seasonNumber}</itunes:season>` : ''}
      <itunes:explicit>${show.explicit ? 'true' : 'false'}</itunes:explicit>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(show.title)}</title>
    <description><![CDATA[${show.description}]]></description>
    <link>${showLink}</link>
    <language>${show.language}</language>
    <atom:link href="${baseUrl}/api/podcast/rss/${show.slug}" rel="self" type="application/rss+xml" />
    <itunes:author>${escapeXml(show.authorName)}</itunes:author>
    <itunes:owner>
      <itunes:name>${escapeXml(show.authorName)}</itunes:name>
      <itunes:email>${escapeXml(show.authorEmail)}</itunes:email>
    </itunes:owner>
    <itunes:image href="${escapeXml(show.artworkUrl)}" />
    <itunes:category text="${escapeXml(show.category)}" />
    <itunes:explicit>${show.explicit ? 'true' : 'false'}</itunes:explicit>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;
}
