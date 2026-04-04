"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BusinessDiscoveryClient({ profile }: { profile: any }) {
  const [activeTab, setActiveTab] = useState<'DISCOVERY' | 'SHOP' | 'BROADCAST'>('DISCOVERY');

  // Bearsville Creative Gold (#c8943e) integration
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 font-sans md:p-8 p-4">
      
      {/* Mobile-First Floating Context Bar */}
      <nav className="sticky top-4 z-50 flex flex-col md:flex-row md:items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{profile.name}</h1>
          <p className="text-sm text-[#c8943e] tracking-widest uppercase mt-1">Sovereign Directory • {profile.city}, {profile.state}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto no-scrollbar">
          {['DISCOVERY', 'SHOP', 'BROADCAST'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-[#c8943e] text-black shadow-[0_0_15px_rgba(200,148,62,0.3)]' 
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'DISCOVERY' && (
          <motion.div 
            key="discovery"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* GMB Card */}
            <div className="lg:col-span-1 rounded-2xl bg-[#141414] border border-white/5 p-6 shadow-2xl">
              <h2 className="text-white/50 text-xs uppercase tracking-widest mb-4">Location & Logistics</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Address</span>
                  <span className="text-white">{profile.address}<br/>{profile.city}, {profile.state} {profile.zip}</span>
                </div>
                {profile.hoursJson && (
                  <div>
                    <span className="text-gray-500 block mb-1">Operating Hours</span>
                    <ul className="text-gray-300">
                      {Object.entries(profile.hoursJson).map(([day, hours]) => (
                        <li key={day} className="flex justify-between border-b border-white/5 py-1">
                          <span>{day}</span>
                          <span className="text-white">{hours as string}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Map/Context Card */}
            <div className="lg:col-span-2 rounded-2xl bg-zinc-900 overflow-hidden relative border border-white/5 h-64 lg:h-auto min-h-[300px]">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=42.0468,-74.137&zoom=14&size=800x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:landscape|color:0x1a1a1a&style=feature:poi|color:0x2a2a2a&style=feature:road|color:0x4a4a4a&style=feature:water|color:0x0f0f0f&key=YOUR_API_KEY_HERE')] bg-cover bg-center opacity-40 grayscale sepia-[.3] hue-rotate-[10deg]"></div>
              
              {/* Fake Map Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#c8943e] shadow-[0_0_20px_#c8943e]"></div>
                <div className="mt-2 px-3 py-1 bg-black/80 rounded backdrop-blur-sm text-xs font-mono text-[#c8943e] border border-[#c8943e]/30">
                  {profile.lat}, {profile.lng}
                </div>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs text-white">Sovereign Node Active</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'SHOP' && (
          <motion.div 
            key="shop"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Vendor Intro */}
            {profile.store && (
              <div className="rounded-2xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#c8943e]/20 p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8943e] opacity-5 blur-[100px] rounded-full"></div>
                <h2 className="text-3xl font-bold text-white mb-2">{profile.store.name}</h2>
                <p className="text-gray-400 max-w-2xl">{profile.store.description}</p>
                <div className="mt-4 flex gap-4 text-sm font-mono">
                  {profile.store.affiliate && (
                    <span className="text-[#c8943e] bg-[#c8943e]/10 px-3 py-1 rounded">
                      Local Affiliate Link Active ({(profile.store.affiliate.commissionRate * 100).toFixed(0)}% RevShare)
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Approved Supply Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.store?.supplies.map((item: any) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-[#111] p-5 group hover:border-[#c8943e]/50 transition-colors">
                  <div className="h-40 bg-white/5 rounded-lg mb-4 flex items-center justify-center text-white/20 uppercase text-xs tracking-widest font-mono">
                    [{item.sku}]<br/>Aesthetic Proxy
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#c8943e] transition-colors">{item.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-light text-gray-300">${(item.priceCents / 100).toFixed(2)}</span>
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-[#c8943e] hover:text-black transition-all text-sm font-medium">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'BROADCAST' && (
          <motion.div 
            key="broadcast"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center p-24 rounded-2xl bg-[#141414] border border-white/5 border-dashed"
          >
            <div className="text-center">
              <span className="text-4xl mb-4 block">📡</span>
              <h3 className="text-xl text-white font-medium mb-2">Social Broadcast Layer</h3>
              <p className="text-gray-500 mb-6">Connect to the Hootsuite integration to schedule Rolling Stone style regional narratives.</p>
              <button disabled className="px-6 py-3 bg-[#c8943e]/20 text-[#c8943e] border border-[#c8943e]/30 rounded-xl opacity-50 cursor-not-allowed">
                Integration Offline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
