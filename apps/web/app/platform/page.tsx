"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, BrainCircuit, Target, Box, Network, Columns3 } from 'lucide-react';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  imagePlaceholderId: string;
  reverse?: boolean;
}

function FeatureSection({ title, subtitle, description, icon: Icon, imagePlaceholderId, reverse = false }: FeatureSectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-32 px-4 md:px-12 relative">
      <div className={`w-full max-w-7xl mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}>
        
        {/* Typography & Copy */}
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 space-y-8"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-cyan-400">
            <Icon size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 leading-tight">
              {title}
            </h2>
            <h3 className="text-xl md:text-2xl text-cyan-400 font-medium tracking-tight mb-8">
              {subtitle}
            </h3>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl font-light">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Visual Asset Placeholder (For Nano Banana) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full aspect-square md:aspect-[4/3] relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center justify-center group"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
          
          <div className="z-10 flex flex-col items-center justify-center text-center p-8">
            <Sparkles className="w-12 h-12 text-slate-600 mb-6 group-hover:text-cyan-400 transition-colors duration-500 animate-pulse" />
            <span className="text-sm font-mono tracking-widest text-slate-500 uppercase">Awaiting Asset Synthesis</span>
            <span className="text-xl font-bold text-slate-300 mt-2">{imagePlaceholderId}</span>
            <span className="text-xs text-slate-600 mt-4 max-w-xs leading-relaxed">
              Inject the corresponding Nano Banana 8K render here.
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function SovereignManifesto() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="bg-[#05050A] min-h-screen w-full overflow-hidden text-slate-200 selection:bg-cyan-500/30 font-sans">
      
      {/* Absolute Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* Hero Section (Maximum Negative Space) */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-12">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Measurably Better OS</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            The Sovereign <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Protocol.
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 font-light tracking-tight max-w-2xl mx-auto leading-relaxed">
            The spatial operating system for autonomous event logistics, hardware telemetry, and cognitive capital aggregation.
          </p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Initiate Sequence</span>
          <div className="w-px h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
        </motion.div>
      </div>

      {/* The Giant Scrolling Features List */}
      <div className="relative z-10 pb-32">
        <FeatureSection 
          title="The Sovereign Ledger"
          subtitle="One Million Tokens of Absolute Recall."
          description="A complete destruction of traditional databases. Raw files, audio notes, and PDFs are dropped directly into a unified cognitive context window, allowing the Swarm to cross-reference every piece of data instantly."
          icon={BrainCircuit}
          imagePlaceholderId="[nano_ledger_asset.png]"
        />

        <FeatureSection 
          title="The Optics Link"
          subtitle="Bidirectional Live Telemetry."
          description="Turn any mobile device into a physical sensor. Stream WebRTC 1FPS video directly from your camera lens into the Swarm's neural layer via Gemini Multimodal. The Swarm sees what you see, and talks back."
          icon={Target}
          imagePlaceholderId="[nano_optics_asset.png]"
          reverse
        />

        <FeatureSection 
          title="Edge Sensoring"
          subtitle="Instant 3D Spatial Ingestion."
          description="Stop guessing venue capacities. Walk through a property with Polycam LiDAR, and bypass complex native rendering by dropping the spatial metrics straight into the Swarm for automated volumetric analysis."
          icon={Box}
          imagePlaceholderId="[nano_spatial_asset.png]"
        />

        <FeatureSection 
          title="Mesh Topology"
          subtitle="Offline Swarm Routing."
          description="When cell towers fail, the network survives. iOS devices automatically form a Multipeer Connectivity mesh, bouncing logistical token data between staff until a connection is restored."
          icon={Network}
          imagePlaceholderId="[nano_mesh_asset.png]"
          reverse
        />

        <FeatureSection 
          title="The Sovereign Nexus"
          subtitle="Total Ecosystem Command."
          description="A centralized, executive glass-pane to monitor all brands, sub-properties, and active Swarm engagements in a single, perfectly structured organic layout."
          icon={Columns3}
          imagePlaceholderId="[nano_nexus_asset.png]"
        />
      </div>

    </div>
  );
}
