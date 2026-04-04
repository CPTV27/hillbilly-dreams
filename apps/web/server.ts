/**
 * Mac mini / LAN Hub — custom Next.js + Socket.io entrypoint.
 *
 * Do not use for Vercel production. On the Hub run:
 *   pnpm dev   (root: tsx apps/web/server.ts)
 *   pnpm --filter @bigmuddy/web dev:hub
 *
 * Standard `next dev` does NOT load this file — Glass kiosks will not receive events.
 */
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath, parse } from 'url';
import next from 'next';
import { Server as SocketIOServer, type Socket } from 'socket.io';
import type { SovereignSocketGlobal } from './lib/agent/eventProducer';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.SOVEREIGN_HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

/** Next must resolve the app root when the process cwd is the monorepo root. */
const appDir = path.dirname(fileURLToPath(import.meta.url));
const app = next({ dev, hostname, port, dir: appDir });
const handle = app.getRequestHandler();

async function verifyPostgresForHub(): Promise<void> {
  try {
    const { prisma } = await import('@bigmuddy/database');
    await prisma.$connect();
    const rows = await prisma.$queryRaw<Array<{ db: string }>>`SELECT current_database()::text AS db`;
    const name = rows[0]?.db?.trim() ?? 'unknown';
    console.log(`[Sovereign] Prisma OK — database: ${name}`);
    if (process.env.SOVEREIGN_DB_LOG === '1') {
      console.log('[Sovereign] DATABASE_URL host is set:', Boolean(process.env.DATABASE_URL));
    }
    // Keep singleton connected for Next request handlers.
  } catch (err) {
    console.warn(
      '[Sovereign] Prisma connection check failed — Hub + Socket.io still start; set DATABASE_URL (e.g. hillbilly_sovereign) for API/SSR.',
      err
    );
  }
}

app.prepare().then(async () => {
  await verifyPostgresForHub();

  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const corsOrigins = process.env.SOVEREIGN_SOCKET_CORS
    ? process.env.SOVEREIGN_SOCKET_CORS.split(',').map((s) => s.trim()).filter(Boolean)
    : '*';

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: corsOrigins,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`[Sovereign] socket connected: ${socket.id}`);

    socket.on('join_session', (sessionId: string) => {
      if (typeof sessionId !== 'string' || !sessionId.trim()) return;
      const room = `kiosk-room-${sessionId.trim()}`;
      void socket.join(room);
      console.log(`[Sovereign] ${socket.id} joined ${room}`);
    });

    socket.on('leave_session', (sessionId: string) => {
      if (typeof sessionId !== 'string') return;
      void socket.leave(`kiosk-room-${sessionId.trim()}`);
    });

    /** @deprecated use join_session(sessionId) */
    socket.on('join_kiosk', () => {
      void socket.join('next-kiosk');
      console.log(`[Sovereign] ${socket.id} joined legacy next-kiosk`);
    });

    socket.on('join_display', (slug: string) => {
      if (typeof slug !== 'string' || !slug.trim()) return;
      const room = `display-${slug.trim()}`;
      void socket.join(room);
      console.log(`[Sovereign] ${socket.id} joined ${room}`);
    });

    socket.on('leave_display', (slug: string) => {
      if (typeof slug !== 'string') return;
      void socket.leave(`display-${slug.trim()}`);
    });

    socket.on('node_heartbeat', async (payload: { nodeId: string, ipAddress?: string }) => {
      if (!payload || typeof payload.nodeId !== 'string') return;
      try {
        const { prisma } = await import('@bigmuddy/database');
        await prisma.physicalNode.update({
          where: { name: payload.nodeId }, // Using name as the identifier based on handoff text
          data: { 
            lastSeen: new Date(),
            status: 'ONLINE',
            ...(payload.ipAddress && { ipAddress: payload.ipAddress })
          }
        });
        console.log(`[Sovereign] Pulse received from PhysicalNode: ${payload.nodeId}`);
      } catch (err: any) {
        // Node might not exist yet if seed script hasn't run
        if (err.code !== 'P2025') {
          console.error(`[Sovereign] Failed to update node heartbeat for ${payload.nodeId}`, err);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log(`[Sovereign] socket disconnected: ${socket.id}`);
    });
  });

  const g = globalThis as SovereignSocketGlobal;
  g.sovereignIo = io;
  g.ioTemplate = io;

  httpServer.once('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, hostname, () => {
    console.log(`
============================================================
SOVEREIGN HUB — Next.js + Socket.io
============================================================
  Bind    http://${hostname}:${port}
  Mode    ${dev ? 'development' : 'production'}
  Socket  Same port; rooms kiosk-room-{sessionId}, display-{slug}, next-kiosk (legacy)
============================================================
`);
  });
});
