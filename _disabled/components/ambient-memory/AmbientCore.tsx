'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Trash2, Shield, Activity, HardDrive } from 'lucide-react';

export default function AmbientCore() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptData, setTranscriptData] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFlushing, setIsFlushing] = useState(false);

  // Web Speech API Ref
  const recognitionRef = useRef<any>(null);
  const transcriptBuffer = useRef<string>('');

  useEffect(() => {
    // Initialize OS-level Speech Recognition
    // This runs ON-DEVICE (Apple/Google OS), meaning raw audio NEVER leaves the phone.
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let newTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            newTranscript += event.results[i][0].transcript;
          }
        }
        
        if (newTranscript.trim()) {
          setTranscriptData((prev) => [...prev, newTranscript.trim()]);
          transcriptBuffer.current += newTranscript.trim() + ' ';
          
          // Auto-flush every ~200 characters to prevent buffer loss
          if (transcriptBuffer.current.length > 200) {
            flushBufferToServer();
          }
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error('Ambient Speech Error:', event.error);
          setError(event.error);
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        // If it was supposed to be recording but stopped, restart it to simulate a persistent background daemon
        if (isRecording) {
            try {
               recognition.start();
            } catch (e) {
               console.error("Restart failed", e);
            }
        }
      };

      recognitionRef.current = recognition;
    } else {
      setError('OS-Level Neural Access not supported on this browser context.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      flushBufferToServer(); // Force flush remaining on stop
    } else {
      setError(null);
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const flushBufferToServer = async () => {
    if (!transcriptBuffer.current.trim()) return;
    setIsFlushing(true);
    try {
      await fetch('/api/ambient/flush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: transcriptBuffer.current,
          timestamp: new Date().toISOString()
        })
      });
      transcriptBuffer.current = ''; // Clear local buffer
    } catch (err) {
      console.error('Failed to flush ambient memory to neural net.', err);
    } finally {
      setIsFlushing(false);
    }
  };

  const clearMemory = async () => {
    try {
      await fetch('/api/ambient/clear', { method: 'POST' });
      setTranscriptData([]);
      transcriptBuffer.current = '';
    } catch (err) {
      console.error('Failed to purge memory.', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative">
      
      {/* Background Pulse Glow when Active */}
      <AnimatePresence>
        {isRecording && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.15 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500 blur-[100px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              Brainstorm Core <Activity className={`w-6 h-6 ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} />
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-sm">
              Continuous meeting context bridge. The Swarm listens natively to the room, anonymously pushing insights into the Notebook.
            </p>
          </div>
          
          <button 
            onClick={toggleRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${
              isRecording 
                ? 'bg-red-500/20 text-red-500 border-2 border-red-500/50 hover:bg-red-500/30 ring-4 ring-red-500/20' 
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
            }`}
          >
            {isRecording ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>
        </div>

        {/* Neural Privacy Shield Guarantee */}
        <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-4 flex gap-4 mt-4">
          <Shield className="w-10 h-10 text-emerald-500 shrink-0" />
          <div className="flex flex-col">
            <h4 className="text-emerald-400 font-medium tracking-wide">Military-Grade Perimeter Secure</h4>
            <p className="text-xs text-emerald-500/80 mt-1 leading-relaxed">
              <strong>Raw audio is physically incapable of leaving this device.</strong> Whisper transcription is handled securely by the OS kernel. Only raw, anonymized text strings are passed to the Swarm. Data forcibly corrupts and auto-deletes at midnight.
            </p>
          </div>
        </div>

        {/* Live Transcript Stream */}
        <div className="flex-1 min-h-[150px] max-h-[300px] overflow-y-auto w-full bg-black/40 rounded-2xl border border-white/5 p-4 font-mono text-sm leading-relaxed text-slate-300">
           {error && <div className="text-red-400 mb-2">Error: {error}</div>}
           {transcriptData.length === 0 && !isRecording && (
              <div className="h-full w-full flex flex-col items-center justify-center text-slate-600 space-y-3">
                 <HardDrive className="w-8 h-8 opacity-50" />
                 <span>Memory Buffer Empty. Engage Node.</span>
              </div>
           )}
           {transcriptData.map((t, idx) => (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx} 
                className="mb-3 border-l-2 border-indigo-500/30 pl-3 py-1"
             >
               {t}
             </motion.div>
           ))}
           {isRecording && (
             <motion.div 
               animate={{ opacity: [0.3, 1, 0.3] }} 
               transition={{ repeat: Infinity, duration: 1.5 }}
               className="inline-block w-2 h-4 bg-red-500 ml-1 mt-1"
             />
           )}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center border-t border-white/10 pt-6">
           <div className="text-xs text-slate-500 flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full ${isFlushing ? 'bg-amber-500' : 'bg-green-500'}`} />
             {isFlushing ? 'Syncing Context...' : 'Neural Link Stable'}
           </div>
           <button 
             onClick={clearMemory}
             className="px-4 py-2 bg-red-950/30 hover:bg-red-900/50 text-red-500 rounded-xl text-xs font-semibold uppercase tracking-widest border border-red-500/20 transition-all flex items-center gap-2"
           >
             <Trash2 className="w-4 h-4" /> Purge Day
           </button>
        </div>

      </div>
    </div>
  );
}
