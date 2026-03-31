// lib/calendar-service.ts
// Google Calendar automation via Domain-Wide Delegation
// Shared service account (bigmuddy-ff651)
// DWD scopes must be allowed in Google Workspace Admin for the SA

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export interface CalendarEventPayload {
  summary: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime: Date;
  attendees?: string[];
}

/**
 * Create a calendar event on a user's primary calendar via DWD impersonation.
 * No OAuth consent screen needed — the service account impersonates the user.
 *
 * @param userEmail - Workspace user to impersonate (e.g. tracy@bigmuddytouring.com)
 * @param payload - Event details
 * @returns Google Calendar event object
 */
export async function createCalendarEvent(
  userEmail: string,
  payload: CalendarEventPayload
) {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
    clientOptions: { subject: userEmail },
  });

  const calendar = google.calendar({ version: 'v3', auth: auth as unknown as string });

  const event = {
    summary: payload.summary,
    description: payload.description,
    location: payload.location,
    start: { dateTime: payload.startTime.toISOString(), timeZone: 'America/Chicago' },
    end: { dateTime: payload.endTime.toISOString(), timeZone: 'America/Chicago' },
    attendees: payload.attendees?.map((email) => ({ email })),
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    sendUpdates: 'all', // Force email notifications to all attendees
  });

  console.log(`[calendar] Created event "${payload.summary}" for ${userEmail}`);
  return res.data;
}

/**
 * Create a Studio C booking event.
 * Convenience wrapper with standard location and description.
 */
export async function createStudioBooking(
  artistEmail: string,
  opts: {
    title: string;
    startTime: Date;
    endTime: Date;
    tier: 'session' | 'production' | 'residency';
    notes?: string;
  }
) {
  const tierLabels = {
    session: 'Studio Session ($500)',
    production: 'Production Day ($1,500)',
    residency: 'Artist Residency ($3,500)',
  };

  return createCalendarEvent(artistEmail, {
    summary: `🎙️ Studio C — ${opts.title}`,
    description: [
      `Tier: ${tierLabels[opts.tier]}`,
      opts.notes || '',
      '',
      'Studio C at The Big Muddy Inn',
      '413 N Commerce St, Natchez, MS 39120',
      '',
      'Gear: ATEM Mini Extreme ISO, Blackmagic 6K, Steinway & Sons, Pro Tools',
    ]
      .filter(Boolean)
      .join('\n'),
    location: 'Studio C, The Big Muddy Inn, 413 N Commerce St, Natchez, MS 39120',
    startTime: opts.startTime,
    endTime: opts.endTime,
    attendees: [artistEmail],
  });
}
