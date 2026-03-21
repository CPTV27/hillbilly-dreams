'use client';
import { useState } from 'react';

export default function OnboardingSurvey() {
  const [step, setStep] = useState(1);
  const [channels, setChannels] = useState<string[]>([]);
  const [style, setStyle] = useState<string>('');
  const [asanaId, setAsanaId] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChannel = (val: string) => {
    if (channels.includes(val)) {
      setChannels(channels.filter(c => c !== val));
    } else {
      setChannels([...channels, val]);
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      // Hardcoding session user ID for demo purposes. Should be grabbed from NextAuth session.
      const userId = 'CURRENT_USER_ID'; 
      
      await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          communicationChannels: channels,
          communicationStyle: style,
          asanaMemberId: asanaId
        })
      });
      // Redirect on success
      window.location.href = '/ops';
    } catch (err) {
      console.error('Failed to save onboarding flow');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-slate-800">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="p-8 text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Welcome to Big Muddy</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We're setting up your custom operations remote. Before we drop you into the command center, 
              we need to know exactly how you like to receive important updates.
            </p>
            <button 
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
            >
              Configure My Setup
            </button>
          </div>
        )}

        {/* Step 2: Channels */}
        {step === 2 && (
          <div className="p-8 text-left animate-slide-up">
            <div className="mb-2 text-sm font-semibold text-blue-600 tracking-wide uppercase">Question 1 of 2</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">How do you manage your tasks?</h2>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={channels.includes('asana')} 
                  onChange={() => toggleChannel('asana')} 
                /> 
                <span className="font-medium text-gray-700">Asana Tasks</span>
              </label>
              
              {channels.includes('asana') && (
                <div className="pl-12 pr-4 pb-4 animate-fade-in">
                  <label className="block text-sm text-gray-500 mb-1">Enter your Asana Member ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 120539328221" 
                    className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    value={asanaId}
                    onChange={e => setAsanaId(e.target.value)}
                  />
                </div>
              )}

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={channels.includes('email')} 
                  onChange={() => toggleChannel('email')} 
                /> 
                <span className="font-medium text-gray-700">Email Updates</span>
              </label>
              
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={channels.includes('google_chat')} 
                  onChange={() => toggleChannel('google_chat')} 
                /> 
                <span className="font-medium text-gray-700">Google Chat Pings</span>
              </label>
            </div>
            
            <button 
              onClick={() => setStep(3)}
              disabled={channels.length === 0}
              className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors shadow-sm"
            >
              Next Step
            </button>
          </div>
        )}

        {/* Step 3: Style */}
        {step === 3 && (
          <div className="p-8 text-left animate-slide-up">
            <div className="mb-2 text-sm font-semibold text-blue-600 tracking-wide uppercase">Question 2 of 2</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">How should the system talk to you?</h2>
            
            <div className="space-y-3 mb-8">
              {[
                { id: 'bulleted_brief', label: 'Bulleted & Brief', desc: 'Direct, check-listed, no fluff.' },
                { id: 'detailed_warm', label: 'Detailed & Warm', desc: 'Conversational explanations with full context.' },
                { id: 'data_heavy', label: 'Raw Data Heavy', desc: 'Give me the numbers and the JSON strings.' },
              ].map(opt => (
                <div 
                  key={opt.id}
                  onClick={() => setStyle(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${style === opt.id ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{opt.desc}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleFinalSubmit}
              disabled={!style || loading}
              className="w-full py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors shadow-sm relative"
            >
              {loading ? 'Saving Layout...' : 'Save & Enter Command Center'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
