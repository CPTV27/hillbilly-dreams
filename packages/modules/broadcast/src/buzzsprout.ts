// packages/modules/broadcast/src/buzzsprout.ts
// Buzzsprout REST client. Used by the podcast-sync cron to push new
// episodes from our Postgres into Buzzsprout for distribution to
// Spotify, Apple Podcasts, YouTube Music, Amazon Music, etc.

interface BuzzsproutEpisode {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  episode_number?: number;
  season_number?: number;
  published_at?: string;
}

const BUZZSPROUT_API = 'https://www.buzzsprout.com/api';

function getToken(): string {
  const t = process.env.BUZZSPROUT_TOKEN;
  if (!t) throw new Error('BUZZSPROUT_TOKEN not configured');
  return t;
}

/**
 * Create an episode on Buzzsprout. Returns the Buzzsprout episode ID we
 * persist back to PodcastEpisode.buzzsproutEpisodeId.
 */
export async function createEpisode(
  podcastId: string,
  input: {
    title: string;
    description: string;
    audioUrl: string;
    episodeNumber?: number;
    seasonNumber?: number;
    publishedAt?: Date;
  }
): Promise<{ buzzsproutEpisodeId: string }> {
  const res = await fetch(`${BUZZSPROUT_API}/${podcastId}/episodes.json`, {
    method: 'POST',
    headers: {
      Authorization: `Token token=${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: input.title,
      description: input.description,
      audio_url: input.audioUrl,
      episode_number: input.episodeNumber,
      season_number: input.seasonNumber,
      published_at: input.publishedAt?.toISOString(),
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    throw new Error(`Buzzsprout createEpisode ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as BuzzsproutEpisode;
  return { buzzsproutEpisodeId: String(data.id) };
}

export async function listEpisodes(podcastId: string): Promise<BuzzsproutEpisode[]> {
  const res = await fetch(`${BUZZSPROUT_API}/${podcastId}/episodes.json`, {
    headers: { Authorization: `Token token=${getToken()}` },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Buzzsprout listEpisodes ${res.status}`);
  return res.json();
}

export async function updateEpisode(
  podcastId: string,
  episodeId: string,
  patch: Partial<{
    title: string;
    description: string;
    audio_url: string;
  }>
): Promise<void> {
  const res = await fetch(
    `${BUZZSPROUT_API}/${podcastId}/episodes/${episodeId}.json`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Token token=${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
      signal: AbortSignal.timeout(30_000),
    }
  );
  if (!res.ok) throw new Error(`Buzzsprout updateEpisode ${res.status}`);
}
