import type { SovereignEvent } from '@/lib/agent/eventProducer';

export type LoreKind = 'manual' | 'sop' | 'journal' | 'unknown';

export type TraceListItem =
  | { id: string; kind: 'reasoning'; text: string; at: number }
  | { id: string; kind: 'tool_start'; tool: string; params: Record<string, unknown>; at: number }
  | { id: string; kind: 'tool_end'; tool: string; summary: string; ok: boolean; at: number }
  | {
      id: string;
      kind: 'citation';
      source: string;
      snippet: string;
      confidence: number;
      loreKind: LoreKind;
      at: number;
    };

export type CitationCard = {
  id: string;
  source: string;
  snippet: string;
  confidence: number;
  loreKind: LoreKind;
  at: number;
};

export type GlassState =
  | { phase: 'idle'; lastAnswer: string; socketConnected: boolean }
  | {
      phase: 'thinking';
      sessionId: string;
      mode: 'standard' | 'enterprise';
      reasoningBuffer: string;
      messageBuffer: string;
      traceItems: TraceListItem[];
      pendingCitations: CitationCard[];
      lastLoreNamespace: string | null;
      socketConnected: boolean;
    }
  | {
      phase: 'resolved';
      sessionId: string;
      finalAnswer: string;
      traceItems: TraceListItem[];
      citations: CitationCard[];
      provenanceExpanded: boolean;
      socketConnected: boolean;
    };

export type GlassAction =
  | { type: 'sovereign_event'; event: SovereignEvent }
  | { type: 'toggle_provenance' }
  | { type: 'socket_status'; connected: boolean }
  | { type: 'reset_idle' };

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function namespaceToLoreKind(ns: string | undefined): LoreKind {
  if (ns === 'lore_manuals') return 'manual';
  if (ns === 'lore_sops') return 'sop';
  if (ns === 'lore_journals') return 'journal';
  return 'unknown';
}

export const initialGlassState: GlassState = {
  phase: 'idle',
  lastAnswer:
    'No answer yet. When the Hub emits session.init, the Glass surface enters the thinking state.',
  socketConnected: false,
};

export function glassReducer(state: GlassState, action: GlassAction): GlassState {
  if (action.type === 'socket_status') {
    if (state.phase === 'idle') return { ...state, socketConnected: action.connected };
    if (state.phase === 'thinking') return { ...state, socketConnected: action.connected };
    return { ...state, socketConnected: action.connected };
  }

  if (action.type === 'toggle_provenance' && state.phase === 'resolved') {
    return { ...state, provenanceExpanded: !state.provenanceExpanded };
  }

  if (action.type === 'reset_idle') {
    return {
      phase: 'idle',
      lastAnswer: state.phase === 'resolved' ? state.finalAnswer : state.phase === 'idle' ? state.lastAnswer : state.messageBuffer,
      socketConnected: state.socketConnected,
    };
  }

  if (action.type !== 'sovereign_event') return state;

  const ev = action.event;
  const now = Date.now();

  switch (ev.type) {
    case 'session.init': {
      const next: GlassState = {
        phase: 'thinking',
        sessionId: ev.payload.sessionId,
        mode: ev.payload.mode,
        reasoningBuffer: '',
        messageBuffer: '',
        traceItems: [],
        pendingCitations: [],
        lastLoreNamespace: null,
        socketConnected: state.socketConnected,
      };
      return next;
    }

    case 'reasoning.delta': {
      if (state.phase !== 'thinking') return state;
      const text = ev.payload.text;
      const traceItems = [
        ...state.traceItems,
        { id: uid(), kind: 'reasoning' as const, text, at: now },
      ];
      return {
        ...state,
        reasoningBuffer: state.reasoningBuffer + text,
        traceItems,
      };
    }

    case 'tool.call.start': {
      if (state.phase !== 'thinking') return state;
      const tool = ev.payload.tool;
      const params = ev.payload.params;
      let lastLoreNamespace = state.lastLoreNamespace;
      if (tool === 'lore_query' && typeof params.namespace === 'string') {
        lastLoreNamespace = params.namespace;
      }
      return {
        ...state,
        lastLoreNamespace,
        traceItems: [...state.traceItems, { id: uid(), kind: 'tool_start', tool, params, at: now }],
      };
    }

    case 'tool.call.end': {
      if (state.phase !== 'thinking') return state;
      return {
        ...state,
        traceItems: [
          ...state.traceItems,
          {
            id: uid(),
            kind: 'tool_end',
            tool: ev.payload.tool,
            summary: ev.payload.summary,
            ok: ev.payload.ok,
            at: now,
          },
        ],
      };
    }

    case 'lore.citation': {
      if (state.phase !== 'thinking') return state;
      const loreKind = namespaceToLoreKind(state.lastLoreNamespace ?? undefined);
      const card: CitationCard = {
        id: uid(),
        source: ev.payload.source,
        snippet: ev.payload.snippet,
        confidence: ev.payload.confidence,
        loreKind,
        at: now,
      };
      return {
        ...state,
        pendingCitations: [...state.pendingCitations, card],
        traceItems: [
          ...state.traceItems,
          {
            id: card.id,
            kind: 'citation',
            source: card.source,
            snippet: card.snippet,
            confidence: card.confidence,
            loreKind,
            at: now,
          },
        ],
      };
    }

    case 'message.delta': {
      if (state.phase !== 'thinking') return state;
      return {
        ...state,
        messageBuffer: state.messageBuffer + ev.payload.text,
      };
    }

    case 'message.final': {
      if (state.phase !== 'thinking') return state;
      const finalAnswer = ev.payload.text;
      return {
        phase: 'resolved',
        sessionId: state.sessionId,
        finalAnswer,
        traceItems: state.traceItems,
        citations: state.pendingCitations,
        provenanceExpanded: true,
        socketConnected: state.socketConnected,
      };
    }

    default:
      return state;
  }
}
