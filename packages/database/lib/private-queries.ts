/**
 * PrivateQueries — authenticated access for admin and ops team only.
 *
 * Every function requires an auth object with userId and role.
 * Throws if role is not 'admin' or 'ops'.
 */

import { prisma } from '../index';

interface AuthContext {
  userId: string;
  role: string;
}

function requireAdmin(auth: AuthContext) {
  if (!['admin', 'ops'].includes(auth.role)) {
    throw new Error('Unauthorized — admin or ops role required');
  }
}

export const PrivateQueries = {
  /** All clients with billing data */
  clients: (auth: AuthContext, options?: { status?: string; limit?: number }) => {
    requireAdmin(auth);
    return prisma.client.findMany({
      where: options?.status ? { status: options.status } : {},
      include: {
        _count: { select: { reviews: true, reports: true, invoices: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: options?.limit || 50,
    });
  },

  /** All invoices */
  invoices: (auth: AuthContext, options?: { clientId?: number; status?: string }) => {
    requireAdmin(auth);
    return prisma.invoice.findMany({
      where: {
        ...(options?.clientId && { clientId: options.clientId }),
        ...(options?.status && { status: options.status }),
      },
      include: { client: { select: { id: true, name: true, tier: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  },

  /** Dashboard metrics */
  metrics: (auth: AuthContext) => {
    requireAdmin(auth);
    return prisma.metric.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  },

  /** All agent context — including private domains */
  agentContextAll: (auth: AuthContext, options?: { domain?: string; topic?: string }) => {
    requireAdmin(auth);
    return prisma.agentContext.findMany({
      where: {
        ...(options?.domain && { domain: options.domain }),
        ...(options?.topic && { topic: options.topic }),
      },
      orderBy: { updatedAt: 'desc' },
    });
  },

  /** Reviews with AI drafts */
  reviews: (auth: AuthContext, options?: { clientId?: number; status?: string }) => {
    requireAdmin(auth);
    return prisma.review.findMany({
      where: {
        ...(options?.clientId && { clientId: options.clientId }),
        ...(options?.status && { responseStatus: options.status }),
      },
      orderBy: { postedAt: 'desc' },
      take: 50,
    });
  },

  /** Chat history (Delta Dawn conversations) */
  chatMessages: (auth: AuthContext, options?: { sessionId?: string; userId?: string }) => {
    requireAdmin(auth);
    return prisma.chatMessage.findMany({
      where: {
        ...(options?.sessionId && { sessionId: options.sessionId }),
        ...(options?.userId && { userId: options.userId }),
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  },
};
