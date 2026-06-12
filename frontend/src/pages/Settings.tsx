import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { ToggleLeft, ToggleRight, Key, Shield, ShieldAlert, Sliders } from 'lucide-react';

export const Settings: React.FC = () => {
  // Settings switches states
  const [incognito, setIncognito] = useState(false);
  const [githubSync, setGithubSync] = useState(true);
  const [youtubeSync, setYoutubeSync] = useState(true);
  const [retention, setRetention] = useState('forever');
  const [glowTheme, setGlowTheme] = useState('lime');

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="space-y-1 select-none">
        <h2 className="text-xl font-bold text-white font-mono">SYSTEM SETTINGS</h2>
        <p className="text-xs text-neutral-400 font-sans">
          Configure telemetry capture thresholds, retention filters, and privacy controls.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Privacy & collection preferences */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Privacy controls */}
          <Card className="p-5 border-white/5 space-y-4">
            <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono select-none">
              <Shield className="w-3.5 h-3.5" />
              <span>PRIVACY & SECURITY FILTERS</span>
            </div>

            <div className="space-y-4">
              
              {/* Incognito */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Capture Incognito Sessions</h4>
                  <p className="text-[10px] text-neutral-500 font-sans max-w-sm mt-0.5 leading-normal">
                    When enabled, telemetry will scan private windows. Highly discouraged if checking passwords or financial logs.
                  </p>
                </div>
                <button
                  onClick={() => setIncognito(!incognito)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {incognito ? (
                    <ToggleRight className="w-9 h-9 text-[#D7FF00]" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-neutral-600" />
                  )}
                </button>
              </div>

              {/* GitHub */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Parse GitHub Commit Telemetry</h4>
                  <p className="text-[10px] text-neutral-500 font-sans max-w-sm mt-0.5 leading-normal">
                    Allows MnemOS to track repositories visited and index readme files to match active libraries.
                  </p>
                </div>
                <button
                  onClick={() => setGithubSync(!githubSync)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {githubSync ? (
                    <ToggleRight className="w-9 h-9 text-[#D7FF00]" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-neutral-600" />
                  )}
                </button>
              </div>

              {/* Youtube */}
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h4 className="text-xs font-bold font-mono text-white">Parse YouTube Educational Videos</h4>
                  <p className="text-[10px] text-neutral-500 font-sans max-w-sm mt-0.5 leading-normal">
                    Aggregates transcription cues from developer tutorials, adding them to memory boards.
                  </p>
                </div>
                <button
                  onClick={() => setYoutubeSync(!youtubeSync)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {youtubeSync ? (
                    <ToggleRight className="w-9 h-9 text-[#D7FF00]" />
                  ) : (
                    <ToggleLeft className="w-9 h-9 text-neutral-600" />
                  )}
                </button>
              </div>

            </div>
          </Card>

          {/* Memory storage limits */}
          <Card className="p-5 border-white/5 space-y-4">
            <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono select-none">
              <Sliders className="w-3.5 h-3.5" />
              <span>COGNITIVE MEMORY RETENTION</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: '30days', label: 'Prune 30 Days', desc: 'Auto-delete older records' },
                { id: '90days', label: 'Prune 90 Days', desc: 'Auto-delete older records' },
                { id: 'forever', label: 'Retain Forever', desc: 'Full lifecycle backup' }
              ].map((item) => {
                const isActive = retention === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setRetention(item.id)}
                    className={`
                      p-3.5 rounded-xl border text-center font-mono cursor-pointer select-none transition-all duration-150
                      ${isActive
                        ? 'bg-[#7CF4FF]/10 border-[#7CF4FF] text-white shadow-[0_0_10px_rgba(124,244,255,0.05)]'
                        : 'bg-neutral-900/40 border-white/5 text-neutral-500 hover:text-neutral-300'
                      }
                    `}
                  >
                    <div className="text-xs font-bold leading-tight">{item.label}</div>
                    <div className="text-[8px] text-neutral-500 mt-1">{item.desc}</div>
                  </div>
                );
              })}
            </div>
          </Card>

        </div>

        {/* Right column: Theme Accent selection & Developer Access keys */}
        <div className="space-y-4 select-none">
          
          {/* Accent customization */}
          <Card className="p-5 border-white/5 space-y-4">
            <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
              <Sliders className="w-3.5 h-3.5" />
              <span>ACCENT SELECTIONS</span>
            </div>
            
            <div className="space-y-2">
              {[
                { id: 'lime', label: 'Neon Lime (#D7FF00)', color: '#D7FF00' },
                { id: 'cyan', label: 'Cyber Cyan (#7CF4FF)', color: '#7CF4FF' },
                { id: 'white', label: 'Classic White (#FFFFFF)', color: '#FFFFFF' }
              ].map((theme) => {
                const isActive = glowTheme === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setGlowTheme(theme.id)}
                    className={`
                      flex items-center justify-between p-3 rounded-lg border font-mono text-xs cursor-pointer transition-all duration-150
                      ${isActive 
                        ? 'bg-neutral-900 border-white/10 text-white font-bold' 
                        : 'bg-neutral-900/30 border-transparent text-neutral-500 hover:text-neutral-300'
                      }
                    `}
                  >
                    <span>{theme.label}</span>
                    <span
                      style={{ backgroundColor: theme.color }}
                      className="w-3.5 h-3.5 rounded-full border border-neutral-950 shrink-0"
                    />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Sync Connection credentials */}
          <Card className="p-5 border-white/5 space-y-4">
            <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
              <Key className="w-3.5 h-3.5" />
              <span>AGENT CONNECTION KEYS</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 font-mono block">AGENT DAEMON SYNC KEY</span>
              <input
                type="password"
                className="w-full px-3 py-2 bg-neutral-950 border border-white/5 rounded-lg text-xs font-mono text-white placeholder-neutral-700"
                value="mnemos_key_sh41_09a1_z41a"
                readOnly
              />
            </div>

            <div className="p-3 bg-red-950/20 border border-red-500/10 rounded-xl flex items-start space-x-2">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-[9px] text-neutral-500 font-mono leading-relaxed">
                Do not share your local agent connection keys. It contains decrypted metadata authorization blocks.
              </span>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
};
export default Settings;
