// packages/ui/components/PlaylistCard.tsx
// Card component for radio playlists

import React from 'react';
import type { Playlist } from '@bigmuddy/config';

interface PlaylistCardProps {
  playlist: Playlist;
  variant?: 'default' | 'featured';
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#1DB954" />
      <path
        d="M11.5 10.5c-.2 0-.3-.1-.5-.2-1.3-.8-3-.9-5-.5-.2 0-.4-.1-.5-.3-.1-.2.1-.4.3-.5 2.1-.5 4.1-.4 5.6.5.2.1.3.3.2.5-.1.2-.1.5-.1.5zm.7-1.7c-.2 0-.4-.1-.5-.2-1.5-1-3.9-1.3-5.7-.7-.2.1-.5-.1-.5-.3-.1-.2.1-.5.3-.5 2.1-.6 4.8-.3 6.6.8.2.1.3.4.2.6-.2.2-.3.3-.4.3zm.1-1.7c-1.8-1.1-4.8-1.2-6.5-.6-.3.1-.5-.1-.6-.4-.1-.3.1-.5.4-.6 2-.6 5.3-.5 7.4.7.3.2.3.5.2.7-.2.4-.6.3-.9.2z"
        fill="white"
      />
    </svg>
  );
}

function MusicNoteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18V5l12-2v13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PlaylistCard({ playlist, variant = 'default' }: PlaylistCardProps) {
  const spotifyHref = playlist.spotifyUrl || undefined;

  if (variant === 'featured') {
    return (
      <article className="playlist-card playlist-card--featured">
        <div className="playlist-card__cover">
          {playlist.coverImage ? (
            <img
              src={playlist.coverImage}
              alt={playlist.name}
              className="playlist-card__cover-img"
              loading="lazy"
            />
          ) : (
            <div className="playlist-card__cover-placeholder">
              <MusicNoteIcon />
            </div>
          )}
        </div>
        <div className="playlist-card__body">
          <h3 className="playlist-card__title">{playlist.name}</h3>
          {playlist.description && (
            <p className="playlist-card__desc">{playlist.description}</p>
          )}
          <div className="playlist-card__meta">
            <span className="playlist-card__tracks">{playlist.trackCount} tracks</span>
          </div>
          {spotifyHref && (
            <a
              href={spotifyHref}
              className="playlist-card__spotify-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SpotifyIcon />
              Open in Spotify
            </a>
          )}
        </div>
        <style>{playlistCardStyles}</style>
      </article>
    );
  }

  return (
    <article className="playlist-card">
      {spotifyHref ? (
        <a
          href={spotifyHref}
          className="playlist-card__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${playlist.name} on Spotify`}
        >
          <div className="playlist-card__cover">
            {playlist.coverImage ? (
              <img
                src={playlist.coverImage}
                alt={playlist.name}
                className="playlist-card__cover-img"
                loading="lazy"
              />
            ) : (
              <div className="playlist-card__cover-placeholder">
                <MusicNoteIcon />
              </div>
            )}
          </div>
          <div className="playlist-card__body">
            <h3 className="playlist-card__title">{playlist.name}</h3>
            {playlist.description && (
              <p className="playlist-card__desc">{playlist.description}</p>
            )}
            <div className="playlist-card__meta">
              <span className="playlist-card__tracks">{playlist.trackCount} tracks</span>
              <span className="playlist-card__spotify">
                <SpotifyIcon />
              </span>
            </div>
          </div>
        </a>
      ) : (
        <div className="playlist-card__link">
          <div className="playlist-card__cover">
            <div className="playlist-card__cover-placeholder">
              <MusicNoteIcon />
            </div>
          </div>
          <div className="playlist-card__body">
            <h3 className="playlist-card__title">{playlist.name}</h3>
            {playlist.description && (
              <p className="playlist-card__desc">{playlist.description}</p>
            )}
            <div className="playlist-card__meta">
              <span className="playlist-card__tracks">{playlist.trackCount} tracks</span>
            </div>
          </div>
        </div>
      )}
      <style>{playlistCardStyles}</style>
    </article>
  );
}

const playlistCardStyles = `
  .playlist-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: border-color var(--duration-normal) var(--ease-default),
                transform var(--duration-normal) var(--ease-default);
  }
  .playlist-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-2px);
  }
  .playlist-card__link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
  }
  .playlist-card__cover {
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--surface-2);
    flex-shrink: 0;
  }
  .playlist-card__cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-slow) var(--ease-default);
  }
  .playlist-card:hover .playlist-card__cover-img {
    transform: scale(1.06);
  }
  .playlist-card__cover-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--surface-2) 0%, var(--surface-3) 100%);
    color: var(--text-disabled);
  }
  .playlist-card__body {
    padding: var(--space-5);
  }
  .playlist-card__title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--text);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-2);
    transition: color var(--duration-fast) var(--ease-default);
  }
  .playlist-card:hover .playlist-card__title {
    color: var(--accent-hover);
  }
  .playlist-card__desc {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-normal);
    margin: 0 0 var(--space-3);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .playlist-card__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .playlist-card__tracks {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-disabled);
    font-weight: 500;
  }
  .playlist-card__spotify {
    display: flex;
    align-items: center;
  }
  .playlist-card__spotify-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-4);
    padding: var(--space-2) var(--space-4);
    background: #1DB954;
    color: white;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    border-radius: var(--radius-full);
    text-decoration: none;
    transition: opacity var(--duration-fast) var(--ease-default);
  }
  .playlist-card__spotify-btn:hover {
    opacity: 0.9;
  }

  /* Featured variant */
  .playlist-card--featured {
    background: var(--surface);
    display: grid;
  }
  @media (min-width: 640px) {
    .playlist-card--featured {
      grid-template-columns: 200px 1fr;
    }
    .playlist-card--featured .playlist-card__cover {
      aspect-ratio: 1;
      width: 200px;
      height: 200px;
    }
    .playlist-card--featured .playlist-card__body {
      padding: var(--space-6);
    }
  }
`;

export default PlaylistCard;
