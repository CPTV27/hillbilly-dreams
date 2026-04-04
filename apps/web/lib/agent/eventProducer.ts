import type { Server } from 'socket.io';
import { ReasoningStreamTap, type StreamTapHandlers } from '@/lib/sovereign/reasoningStreamTap';

/** Populated by `apps/web/server.ts` on the Sovereign Hub (Socket.io singleton). */
export interface SovereignSocketGlobal {
  sovereignIo?: Server;
  /** @deprecated alias — prefer `sovereignIo` */
  ioTemplate?: Server;
}

/** Wire contract for Glass kiosks (Socket.io `sovereign_event`). */
export type SovereignEvent =
  | { type: 'session.init'; payload: { sessionId: string; mode: 'standard' | 'enterprise' } }
  | { type: 'reasoning.delta'; payload: { text: string } }
  | { type: 'tool.call.start'; payload: { tool: string; params: Record<string, unknown> } }
  | { type: 'tool.call.end'; payload: { tool: string; summary: string; ok: boolean } }
  | { type: 'lore.citation'; payload: { source: string; snippet: string; confidence: number } }
  | { type: 'message.delta'; payload: { text: string } }
  | { type: 'message.final'; payload: { text: string } };

/** Hub-wide pulse for kiosks, signage, and Smart TVs (`sovereign_pulse`). */
export type SovereignPulse =
  | {
      kind: 'credit';
      userId: string;
      change: number;
      balanceAfter: number;
      reason: string;
    }
  | {
      kind: 'submission';
      submissionId: string;
      contestId: string;
      userId: string;
      status: string;
    };

const LEGACY_ROOM = 'next-kiosk';

/**
 * Hub-singleton: pushes real-time events to Socket.io rooms on the Mac mini custom server.
 * Run via `pnpm dev:hub` (see apps/web/server.ts). Vercel does not mount Socket.io.
 */
export class EventProducer {
  private static activeSessionId: string | null = null;

  private static get io(): Server | undefined {
    const g = globalThis as SovereignSocketGlobal;
    return g.sovereignIo ?? g.ioTemplate;
  }

  /** Target room: `kiosk-room-{sessionId}` when session bound, else legacy `next-kiosk`. */
  private static targetRoom(): string {
    if (this.activeSessionId) return `kiosk-room-${this.activeSessionId}`;
    return LEGACY_ROOM;
  }

  /** Call at the start of an agent / LLM run so emits fan out to the right kiosks. */
  static setSessionRoom(sessionId: string | null): void {
    this.activeSessionId = sessionId;
  }

  static emit(event: SovereignEvent): void {
    const io = this.io;
    if (!io) {
      if (process.env.SOVEREIGN_DEBUG_EMIT === '1') {
        console.warn('[EventProducer] No Socket.io server — start with pnpm dev:hub on the Hub.', event.type);
      }
      return;
    }
    io.to(this.targetRoom()).emit('sovereign_event', event);
    if (process.env.SOVEREIGN_LOG_EVENTS === '1') {
      console.log('[EventProducer]', event.type, event.type === 'message.final' ? '' : event.payload);
    }
  }

  /** Broadcast to every connected client (kiosks + `display-{slug}` rooms all receive). */
  static broadcastPulse(pulse: SovereignPulse): void {
    const io = this.io;
    if (!io) {
      if (process.env.SOVEREIGN_DEBUG_EMIT === '1') {
        console.warn('[EventProducer] No Socket.io server — pulse dropped', pulse.kind);
      }
      return;
    }
    io.emit('sovereign_pulse', pulse);
    if (process.env.SOVEREIGN_LOG_EVENTS === '1') {
      console.log('[EventProducer] sovereign_pulse', pulse);
    }
  }

  static sessionInit(sessionId: string, mode: 'standard' | 'enterprise'): void {
    this.setSessionRoom(sessionId);
    this.emit({ type: 'session.init', payload: { sessionId, mode } });
  }

  static reasoningDelta(text: string): void {
    if (!text) return;
    this.emit({ type: 'reasoning.delta', payload: { text } });
  }

  static toolCallStart(tool: string, params: Record<string, unknown>): void {
    this.emit({ type: 'tool.call.start', payload: { tool, params } });
  }

  static toolCallEnd(tool: string, summary: string, ok: boolean): void {
    this.emit({ type: 'tool.call.end', payload: { tool, summary, ok } });
  }

  static loreCitation(source: string, snippet: string, confidence: number): void {
    const c = Number.isFinite(confidence) ? Math.max(0, Math.min(1, confidence)) : 0;
    this.emit({ type: 'lore.citation', payload: { source, snippet, confidence: c } });
  }

  static messageDelta(text: string): void {
    if (!text) return;
    this.emit({ type: 'message.delta', payload: { text } });
  }

  static messageFinal(text: string): void {
    this.emit({ type: 'message.final', payload: { text } });
  }

  /**
   * Stream adapter: splits `<|think|>` regions from answer text and emits matching events.
   */
  static createReasoningTap(): ReasoningStreamTap {
    return new ReasoningStreamTap();
  }

  static attachTapHandlers(tap: ReasoningStreamTap): StreamTapHandlers {
    return {
      onReasoningDelta: (t) => EventProducer.reasoningDelta(t),
      onMessageDelta: (t) => EventProducer.messageDelta(t),
    };
  }

  /** Map Chroma / cosine-style distance to [0,1] confidence heuristic. */
  static confidenceFromDistance(distance: number | undefined): number {
    if (distance == null || !Number.isFinite(distance)) return 0.85;
    const d = Math.max(0, distance);
    return Math.max(0, Math.min(1, 1 - d / 2));
  }
}
