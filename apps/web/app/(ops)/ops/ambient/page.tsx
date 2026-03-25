import React from 'react';
import AmbientCore from '@/components/ambient-memory/AmbientCore';
import NeuralAvatar from '@/components/ambient-memory/NeuralAvatar';

export default function AmbientMemoryPage() {
  return (
    <main className="min-h-screen bg-black bg-[url('/grid.svg')] md:bg-[url('/grid.svg')] flex flex-col items-center justify-center p-4">
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col space-y-8">
        <div className="text-center">
           <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 uppercase">
             Brainstorm Mode
           </h1>
           <p className="mt-4 text-slate-400 font-mono text-sm uppercase tracking-widest">
             Continuous Limitless Core :: Meeting Transcription
           </p>
        </div>

        {/* 1. The Interactive Facial Feed */}
        <NeuralAvatar />

        {/* 2. The Transcriptor & Intelligence Extractor */}
        <AmbientCore />

        <div className="text-center max-w-lg mx-auto text-xs font-mono text-slate-600 leading-relaxed border-t border-white/5 pt-8">
           Data Governance: The BMT Swarm strictly obeys iOS sandboxing. Raw audio buffers are violently discarded upon OS transcription. Telemetry strings injected into the intelligence graph are explicitly chained to an ephemeral decay cycle and can be manually nuked at any time.
        </div>
      </div>
    </main>
  );
}
