// packages/ui/components/EventCard.tsx
// Card component for events (live sessions, shows)

import React from 'react';
import type { Event } from '@bigmuddy/config';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'featured';
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  upcoming: { label: 'Upcoming', color: 'var(--accent)' },
  'sold-out': { label: 'Sold Out', color: 'var(--error)' },
  cancelled: { label: 'Cancelled', color: 'var(--text-disabled)' },
  completed: { label: 'Completed', color: 'var(--text-disabled)' },
};

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 5h12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 1v2M10 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <span className="event-card__live-badge" aria-label="Live stream available">
      <span className="event-card__live-dot" />
      LIVE
    </span>
  );
}

export function EventCard({ event, variant = 'default' }: EventCardProps) {
  const statusInfo = STATUS_LABELS[event.status] || STATUS_LABELS.upcoming;
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();

  if (variant === 'compact') {
    return (
      <article className="event-card event-card--compact">
        <div className="event-card__date-badge">
          <span className="event-card__month">{month}</span>
          <span className="event-card__day">{day}</span>
        </div>
        <div className="event-card__body">
          <h4 className="event-card__name">{event.name}</h4>
          {event.artist && <p className="event-card__artist">{event.artist}</p>}
          <div className="event-card__meta">
            {event.time && <span className="event-card__time">{event.time}</span>}
            {event.price && <span className="event-card__price">{event.price}</span>}
            {event.stream && <LiveIcon />}
          </div>
        </div>
        <style>{eventCardStyles}</style>
      </article>
    );
  }

  return (
    <article className={`event-card ${variant === 'featured' ? 'event-card--featured' : ''}`}>
      <div className="event-card__header">
        <div className="event-card__date-badge">
          <span className="event-card__month">{month}</span>
          <span className="event-card__day">{day}</span>
        </div>
        <div className="event-card__status-wrap">
          <span
            className="event-card__status"
            style={{ color: statusInfo.color }}
          >
            {statusInfo.label}
          </span>
          {event.stream && <LiveIcon />}
        </div>
      </div>

      <div className="event-card__body">
        <h3 className="event-card__name">{event.name}</h3>
        {event.artist && <p className="event-card__artist">{event.artist}</p>}
        {event.description && (
          <p className="event-card__desc">{event.description}</p>
        )}
      </div>

      <div className="event-card__footer">
        <div className="event-card__details">
          <span className="event-card__full-date">
            <CalendarIcon />
            {formattedDate}
          </span>
          {event.time && <span className="event-card__time">{event.time}</span>}
        </div>
        {event.price && (
          <span className="event-card__price">{event.price}</span>
        )}
      </div>

      <style>{eventCardStyles}</style>
    </article>
  );
}

const eventCardStyles = `
  .event-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    transition: border-color var(--duration-normal) var(--ease-default);
  }
  .event-card:hover {
    border-color: var(--border-strong);
  }
  .event-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-3);
  }
  .event-card__date-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--accent-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-3);
    min-width: 52px;
    text-align: center;
    flex-shrink: 0;
  }
  .event-card__month {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    color: var(--accent);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    line-height: 1;
  }
  .event-card__day {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--text);
    line-height: 1;
    margin-top: 2px;
  }
  .event-card__status-wrap {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .event-card__status {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
  }
  .event-card__live-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: var(--tracking-wider);
    color: var(--error);
    text-transform: uppercase;
  }
  .event-card__live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--error);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .event-card__body {
    flex: 1;
  }
  .event-card__name {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--text);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-tight);
    margin: 0 0 var(--space-1);
  }
  .event-card__artist {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--accent);
    margin: 0 0 var(--space-2);
  }
  .event-card__desc {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-normal);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .event-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-subtle);
    flex-wrap: wrap;
  }
  .event-card__details {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }
  .event-card__full-date {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-muted);
  }
  .event-card__time {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--text-muted);
  }
  .event-card__price {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--accent);
  }

  /* Compact variant */
  .event-card--compact {
    flex-direction: row;
    align-items: flex-start;
    padding: var(--space-4) 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border-subtle);
    border-radius: 0;
    gap: var(--space-4);
  }
  .event-card--compact:hover {
    border-color: var(--border-subtle);
    background: transparent;
  }
  .event-card--compact .event-card__body {
    flex: 1;
  }
  .event-card--compact .event-card__name {
    font-size: var(--text-md);
  }
  .event-card--compact .event-card__meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }
`;

export default EventCard;
