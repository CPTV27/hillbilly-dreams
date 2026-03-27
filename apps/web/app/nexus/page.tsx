"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Cpu, 
  Radio, 
  Briefcase, 
  ExternalLink,
  BrainCircuit,
  ArrowRight,
  Globe2
} from 'lucide-react';
import Link from 'next/link';

interface NodeProps {
  title: string;
  subtitle: string;
  url: string;
  icon: React.ElementType;
  delay?: number;
  highlight?: boolean;
}

function OrgNode({ title, subtitle, url, icon: Icon, delay = 0, highlight = false }: NodeProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative group flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 w-64 ${
        highlight 
          ? 'bg-slate-900/80 border-cyan-500/50 hover:bg-slate-900 hover:border-cyan-400 hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-cyan-500/20 z-10' 
          : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900 hover:border-slate-700 hover:shadow-xl z-0'
      } backdrop-blur-md`}
    >
      <div className={`p-3 rounded-xl mb-3 ${highlight ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800/50 text-slate-300'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className={`font-bold text-center ${highlight ? 'text-white' : 'text-slate-200'} tracking-tight`}>
        {title}
      </h3>
      <p className="text-xs text-slate-400 text-center mt-1 uppercase tracking-widest font-mono">
        {subtitle}
      </p>
      
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className={`w-4 h-4 ${highlight ? 'text-cyan-400' : 'text-slate-500'}`} />
      </div>
    </motion.a>
  );
}

export default function SovereignNexus() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050510] overflow-y-auto overflow-x-hidden selection:bg-cyan-500/30 text-slate-200 hide-scrollbar font-sans">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-cyan-500/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Animated Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative min-h-full py-20 px-4 md:px-8 flex flex-col items-center">
        
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Sovereign Ecosystem</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
            Strategic Partner
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
            Director & Chief Executive. Mapping the intersection of experiential entertainment, spatial technology, and outsider economics.
          </p>
        </motion.div>

        {/* The Organizational Chart */}
        <div className="relative flex flex-col items-center w-full max-w-6xl mx-auto">
          
          {/* TOP NODE (The Holding/Swarm Core) */}
          <OrgNode 
            title="Measurably Better" 
            subtitle="Autonomous Operating Co." 
            url="/measurably-better" 
            icon={BrainCircuit}
            delay={0.1}
            highlight={true}
          />

          {/* Vertical Stem Line from Top Node */}
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: 64 }} 
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-px bg-gradient-to-b from-cyan-500/50 to-slate-700"
          />

          {/* Horizontal Branching Line */}
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "80%" }} // Spans across the children
            transition={{ duration: 0.5, delay: 0.6 }}
            className="h-px bg-slate-700 relative flex justify-between"
          >
            {/* The little drop lines down to each child */}
            <div className="absolute top-0 left-0 w-px h-8 bg-slate-700" />
            <div className="absolute top-0 left-[25%] w-px h-8 bg-slate-700 hidden lg:block" />
            <div className="absolute top-0 left-[50%] -translate-x-1/2 w-px h-8 bg-slate-700" />
            <div className="absolute top-0 right-[25%] w-px h-8 bg-slate-700 hidden lg:block" />
            <div className="absolute top-0 right-0 w-px h-8 bg-slate-700" />
          </motion.div>

          {/* spacer for the drop lines */}
          <div className="h-8 w-full" />

          {/* CHILD NODES LEVEL 1 */}
          <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-6 lg:gap-12 w-full px-4 items-center">
            
            <OrgNode 
              title="Big Muddy Tour" 
              subtitle="Live Media Network" 
              url="https://thebigmuddytour.com" 
              icon={Globe2}
              delay={0.8}
            />

            <OrgNode 
              title="The Inn" 
              subtitle="Hospitality Flagship" 
              url="/touring/inn" 
              icon={MapPin}
              delay={0.9}
            />

            <OrgNode 
              title="S2PX" 
              subtitle="Spatial Technology" 
              url="https://s2px.web.app" 
              icon={Cpu}
              delay={1.0}
            />

            <OrgNode 
              title="Feedfarm" 
              subtitle="Decentralized Broadcast" 
              url="#" 
              icon={Radio}
              delay={1.1}
            />

            <OrgNode 
              title="Hillbilly Dreams" 
              subtitle="Creative Agency" 
              url="https://hillbillydreams.com" 
              icon={Building2}
              delay={1.2}
            />

          </div>

          {/* Sub-Branching for Special Projects */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-24 pt-12 border-t border-slate-800/50 w-full max-w-3xl flex flex-col items-center"
          >
            <h2 className="text-slate-500 uppercase tracking-widest text-[10px] font-mono mb-8 text-center">
              Active Briefings & Publications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Link href="/hillbilly/proposal" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60 transition-colors group">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">Scan2Plan Proposal</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/notebook" className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60 transition-colors group">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">The Sovereign Ledger</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>
        
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20 text-center text-slate-600 font-mono text-[10px] uppercase tracking-widest pb-10"
        >
          Measurements Authorized // BMT System Registry
        </motion.div>
      </div>
    </div>
  );
}
