// lib/gmail-service.ts
// Gmail thread scanning via Domain-Wide Delegation
// Used by artist onboarding pipeline to find existing email threads
// Same DWD pattern as calendar-service.ts and S2PX

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export interface EmailThread {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
}

/**
 * Search a workspace user's Gmail for threads matching a query.
 * Uses DWD impersonation — no per-user OAuth needed.
 *
 * @param userEmail - Workspace user to impersonate
 * @param query - Gmail search query (e.g. "Mechanical Bull onboarding")
 * @param maxResults - Max messages to return (default 25)
 */
export async function searchWorkspaceEmails(
  userEmail: string,
  query: string,
  maxResults = 25
): Promise<EmailThread[]> {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    clientOptions: { subject: userEmail },
  });

  const gmail = google.gmail({ version: 'v1', auth: auth as unknown as string });

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults,
  });

  const messages = res.data.messages || [];

  const threads = await Promise.all(
    messages.map(async (msg) => {
      if (!msg.id) return null;

      const messageData = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'Date'],
      });

      const headers = messageData.data.payload?.headers || [];
      return {
        id: msg.id,
        subject: headers.find((h) => h.name === 'Subject')?.value || 'No Subject',
        from: headers.find((h) => h.name === 'From')?.value || 'Unknown',
        date: headers.find((h) => h.name === 'Date')?.value || '',
        snippet: messageData.data.snippet || '',
      };
    })
  );

  return threads.filter((t): t is EmailThread => t !== null);
}

/**
 * Scan for all emails related to an artist by name.
 * Searches Tracy's inbox for any matching correspondence.
 */
export async function scanArtistEmails(artistName: string): Promise<EmailThread[]> {
  const tracyEmail = process.env.WORKSPACE_ADMIN_EMAIL || 'tracyaldersonallen@gmail.com';
  return searchWorkspaceEmails(tracyEmail, artistName);
}
