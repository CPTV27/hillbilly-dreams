'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Mic, Activity, Video } from 'lucide-react';

export default function NeuralAvatar() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [connecting, setConnecting] = useState(true);

  // Simulate establishing the WebRTC bridge to HeyGen/Google Veo
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] bg-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
      
      {/* Background Ambience representing Video Synthesis */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-purple-950/20 to-black pointer-events-none" />
      
      {/* 
        This is where the actual <video> tag receiving the WebRTC stream from Google Veo / HeyGen will sit. 
        For now, it's a structural 3D placeholder simulating an advanced abstract neural entity.
      */}
      <div className="absolute inset-0 flex items-center justify-center">
        {connecting ? (
          <div className="flex flex-col items-center space-y-4">
             <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
             <p className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
               Negotiating WebRTC Bridge...
             </p>
          </div>
        ) : (
          <motion.div 
             animate={{ 
               scale: isSpeaking ? [1, 1.05, 1] : 1,
               opacity: isSpeaking ? [0.6, 1, 0.6] : 0.6
             }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
          >
             {/* Abstract Avatar Placeholder */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[60px] rounded-full" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 blur-[30px] rounded-full" />
             
             {/* Simulating facial tracking / Mesh synthesis */}
             <div className="relative w-32 h-32 border border-white/5 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md overflow-hidden">
                <Video className="w-8 h-8 text-white/20" />
                <div className="absolute inset-0 mask-radial-faded">
                   <div className="w-[200%] h-[200%] absolute top-0 left-0 bg-[url('/noise.svg')] opacity-20 animate-spin-slow" />
                </div>
             </div>
             
             {/* Subtitles / Synthesis Tracker */}
             <div className="absolute bottom-6 left-0 w-full flex justify-center px-8">
               <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-2xl max-w-xl text-center shadow-lg">
                 <p className="text-sm font-mono text-slate-300">
                    <span className="text-emerald-500 font-bold mr-2">AVATAR:</span>
                    Awaiting Google Veo stream ingestion...
                 </p>
               </div>
             </div>
          </motion.div>
        )}
      </div>

      {/* Overlays / Heads Up Display */}
      <div className="absolute top-4 left-4 flex gap-2">
         <div className="px-3 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-full flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connecting ? 'bg-amber-500' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]'}`} />
            <span className="text-[10px] font-mono font-medium text-white tracking-wider uppercase">
              {connecting ? 'VEO_WAIT' : 'LIVE_SYNC'}
            </span>
         </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
         <button className="p-2 bg-black/40 hover:bg-black/80 border border-white/10 rounded-full text-white/50 hover:text-white transition-all">
            <Maximize2 className="w-4 h-4" />
         </button>
      </div>
      
      {/* Microphone interaction testing */}
      <button 
         onClick={() => setIsSpeaking(!isSpeaking)}
         className={`absolute bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all ${isSpeaking ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-white/10 border border-white/20 hover:bg-white/20'} backdrop-blur-md`}
      >
         {isSpeaking ? <Activity className="w-5 h-5 text-white animate-pulse" /> : <Mic className="w-5 h-5 text-white" />}
      </button>

    </div>
  );
}
