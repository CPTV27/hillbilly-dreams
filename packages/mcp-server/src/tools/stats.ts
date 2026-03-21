import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { prisma } from '@bigmuddy/database';

export function registerStatsTools(server: McpServer) {
  server.tool(
    'get_dashboard_stats',
    'Get aggregate counts across the entire Big Muddy ecosystem: articles, events, artists, clients, tasks, applications, etc.',
    {},
    async () => {
      const [
        articles, publishedArticles,
        events, upcomingEvents,
        playlists,
        contacts,
        clients, activeClients,
        reviews, pendingReviews,
        artists, activeTracks,
        artworks, availableArtworks,
        applications, pendingApplications,
        tasks, completedTasks,
        newsletters, sentNewsletters,
      ] = await Promise.all([
        prisma.article.count(),
        prisma.article.count({ where: { status: 'published' } }),
        prisma.event.count(),
        prisma.event.count({ where: { date: { gte: new Date() }, status: 'upcoming' } }),
        prisma.playlist.count({ where: { status: 'active' } }),
        prisma.contact.count(),
        prisma.client.count(),
        prisma.client.count({ where: { status: 'active' } }),
        prisma.review.count(),
        prisma.review.count({ where: { responseStatus: 'pending' } }),
        prisma.artist.count(),
        prisma.track.count({ where: { status: 'active' } }),
        prisma.artwork.count(),
        prisma.artwork.count({ where: { available: true } }),
        prisma.artistApplication.count(),
        prisma.artistApplication.count({ where: { status: 'pending' } }),
        prisma.launchTask.count(),
        prisma.launchTask.count({ where: { status: 'done' } }),
        prisma.newsletterIssue.count(),
        prisma.newsletterIssue.count({ where: { status: 'sent' } }),
      ]);

      const stats = {
        magazine: { total: articles, published: publishedArticles },
        events: { total: events, upcoming: upcomingEvents },
        radio: { activePlaylists: playlists },
        contacts: { total: contacts },
        directory: { totalClients: clients, active: activeClients },
        reviews: { total: reviews, pendingResponse: pendingReviews },
        records: { artists, activeTracks },
        gallery: { artworks, available: availableArtworks, applications, pendingApplications },
        ops: { totalTasks: tasks, completed: completedTasks },
        newsletter: { total: newsletters, sent: sentNewsletters },
      };

      return { content: [{ type: 'text' as const, text: JSON.stringify(stats, null, 2) }] };
    }
  );
}
