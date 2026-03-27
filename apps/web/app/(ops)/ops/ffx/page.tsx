import React from 'react';
import { PenTool, Library, Sparkles, Image as ImageIcon, Send } from 'lucide-react';

export default function FFXFeedEnginePage() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono flex">
      {/* 1. The Idea Swarm (Context Ingestion Sidebar) */}
      <aside className="w-80 border-r border-white/5 bg-slate-950/50 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-8">
          <Library className="text-indigo-500 w-6 h-6" />
          <h2 className="text-xl font-bold tracking-widest uppercase text-white">FFX Feed</h2>
        </div>
        
        <p className="text-xs text-slate-500 mb-6 uppercase tracking-wider">
          Friction Logs & Anomalies
        </p>

        <div className="flex-1 space-y-4 overflow-y-auto">
          {/* Mock Ingested Notebook Drops */}
          {[
            { tag: 'QuickBooks Sync', text: 'Anomalous marketing spend spike detected.', date: '12m ago' },
            { tag: 'LiDAR Scan', text: 'Natchez loading dock capacity recalculation.', date: '3h ago' },
            { tag: 'Ambient', text: 'Owen discussed the 4-step margin protocol.', date: '8h ago' },
          ].map((item, i) => (
            <button key={i} className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-indigo-400 uppercase tracking-widest">{item.tag}</span>
                <span className="text-[10px] text-slate-600">{item.date}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-200">
                {item.text}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* 2. The Drafting Table (Main Editor) */}
      <main className="flex-1 flex flex-col border-r border-white/5">
        <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs uppercase tracking-widest text-emerald-400">Swarm Active</span>
          </div>
          <button className="flex items-center gap-2 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            <Sparkles className="w-4 h-4" /> Synthesize Musing
          </button>
        </header>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <input 
            type="text" 
            placeholder="Document Title (e.g., Deploying The Margin Filter...)"
            className="w-full bg-transparent text-3xl md:text-5xl font-black tracking-tighter text-white placeholder-slate-800 outline-none pb-8 border-b border-white/5 focus:border-indigo-500/50 transition-colors"
          />
          
          <textarea 
            placeholder="The engine is listening. Draft your narrative or click 'Synthesize' to have the Swarm expand upon the Friction Logs..."
            className="w-full h-[500px] mt-8 bg-transparent text-lg text-slate-300 font-sans leading-relaxed placeholder-slate-700 outline-none resize-none"
          />
        </div>
      </main>

      {/* 3. Nano Banana Visual Generation */}
      <aside className="w-96 bg-black p-6 flex-col hidden xl:flex">
         <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6 px-2 flex items-center gap-2">
           <ImageIcon className="w-4 h-4" /> Asset Synthesis
         </h3>
         
         <div className="aspect-square w-full rounded-2xl border border-white/5 bg-slate-950 flex flex-col items-center justify-center p-6 text-center shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none" />
            <Sparkles className="w-8 h-8 text-slate-700 mb-4" />
            <p className="text-sm text-slate-500 leading-relaxed font-sans">
              No prompt required. The Swarm will automatically read your draft and command Nano Banana to synthesize an 8K Industrial Brutalism hero image.
            </p>
         </div>

         <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
           <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white rounded-xl py-4 font-bold uppercase tracking-widest transition-all border border-white/10 hover:border-white/20">
              <PenTool className="w-4 h-4" /> Execute Nano Pipeline
           </button>
           
           <button className="w-full flex items-center justify-center gap-3 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-500 rounded-xl py-4 font-bold uppercase tracking-widest transition-all border border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Send className="w-4 h-4" /> Publish Post
           </button>
         </div>
      </aside>
    </div>
  );
}
