'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Edges } from '@react-three/drei';
import { Camera, Layers, Play, Settings, ShieldAlert, Cpu } from 'lucide-react';
import * as THREE from 'three';

// A brutalist, floating 3D monolithic structure representing the Scene Geometry
function BrutalistMonocle() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshPhysicalMaterial 
          color="#0f172a" 
          metalness={0.9} 
          roughness={0.1}
          clearcoat={1}
        />
        <Edges scale={1.0} threshold={15} color="#4f46e5" />
      </mesh>
      
      {/* Floating Spatial Nodes representing Swarm Logic */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(i * 1.5) * 5,
            Math.sin(i * 2) * 3,
            Math.sin(i * 1.5) * 5
          ]}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
        </mesh>
      ))}

      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
    </group>
  );
}

export default function MVXCinematicConsole() {
  const [vrMode, setVrMode] = useState(false);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col relative font-mono text-slate-300">
      
      {/* 1. Hardware Interface Layer / HUD */}
      <div className="absolute inset-x-0 top-0 h-20 border-b border-white/10 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between px-8 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Camera className="w-6 h-6 text-white" />
          <div>
             <h1 className="text-lg font-black tracking-widest text-white uppercase shadow-lg">MVX // Director's Console</h1>
             <p className="text-[10px] text-emerald-500 uppercase flex items-center gap-2 tracking-widest mt-1">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 1.04M Token Sequence Active
             </p>
          </div>
        </div>

        <div className="flex gap-4">
           <button 
             onClick={() => setVrMode(!vrMode)}
             className={`px-6 py-2 rounded-lg font-bold uppercase tracking-widest text-xs transition-all border ${
               vrMode ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'bg-black text-slate-400 border-white/20 hover:border-white/40'
             }`}
           >
             {vrMode ? 'VR Spatial Override: ON' : 'Toggle VR Spatial'}
           </button>
           <button className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all">
             <Settings className="w-4 h-4 text-slate-400" />
           </button>
        </div>
      </div>

      {/* 2. The 3D Engine Viewport (Three.js) */}
      <div className="flex-1 w-full relative">
        <Canvas shadows camera={{ position: [0, 2, 10], fov: vrMode ? 90 : 50 }}>
          <Environment preset="city" />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          <spotLight position={[-10, 10, -5]} intensity={2} color="#4f46e5" angle={0.5} penumbra={1} castShadow />
          
          <BrutalistMonocle />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            autoRotate={!vrMode}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* 3. The Sequence Control Terminal */}
      <div className="absolute inset-x-0 bottom-0 h-64 border-t border-white/10 bg-slate-950/90 backdrop-blur-xl z-10 flex text-sm">
         
         {/* Left: Swarm Scenario Branching */}
         <div className="w-1/3 border-r border-white/10 p-6 flex flex-col">
           <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2 font-bold">
             <Cpu className="w-4 h-4" /> AI Sequencing Logistics
           </h3>
           <div className="flex-1 space-y-3 overflow-y-auto">
             <div className="p-3 border border-indigo-500/30 rounded-lg bg-indigo-500/10">
                <span className="text-indigo-400 block text-[10px] uppercase mb-1">Scenario A</span>
                <p className="text-white text-xs leading-relaxed font-sans">Sequence natural sunlight mapping applied to the Southern exposure wall. Rendering margins...</p>
             </div>
             <div className="p-3 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/5 cursor-pointer transition-all">
                <span className="text-slate-500 block text-[10px] uppercase mb-1">Scenario B</span>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">Simulate catastrophic storm event audit mapping to external roof threshold.</p>
             </div>
           </div>
         </div>

         {/* Middle: Sequence Controls */}
         <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6">
            <button className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]">
               <Play className="w-5 h-5 fill-white" /> Sequence New Reality
            </button>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest max-w-sm text-center">
              The Sovereign Core is injecting spatial continuity parameters across 1.04M context tokens.
            </p>
         </div>

         {/* Right: Asset & Layout Management */}
         <div className="w-1/3 border-l border-white/10 p-6 flex flex-col justify-between">
           <div>
             <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2 font-bold">
               <Layers className="w-4 h-4" /> Physical Logic State
             </h3>
             <ul className="space-y-2 text-xs">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Geometry Integrity</span>
                  <span className="text-emerald-500 font-bold">LOCKED</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Node Sync</span>
                  <span className="text-emerald-500 font-bold">144 FPS</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">LiDAR Source</span>
                  <span className="text-indigo-400">Polycam_04A.las</span>
                </li>
             </ul>
           </div>

           {/* Spatial Edge Link Bridge */}
           <div className="mt-6 pt-6 border-t border-white/5">
             <h3 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">
               Spatial Edge Link
             </h3>
             <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all shadow-xl group">
               <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:bg-emerald-500 transition-colors" />
               <span className="text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-emerald-400">
                 Initialize Bridge
               </span>
             </button>
             <p className="text-[9px] text-slate-600 uppercase tracking-wider mt-3 text-center">
               Awaiting iOS Gyroscope & LiDAR Telemetry
             </p>
           </div>
         </div>

      </div>
    </div>
  );
}
