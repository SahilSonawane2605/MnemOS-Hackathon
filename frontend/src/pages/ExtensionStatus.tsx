import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Terminal, ExternalLink, HardDrive, RefreshCw, Cpu } from 'lucide-react';

export const ExtensionStatus: React.FC = () => {
  const { telemetryEvents, isSyncing, setIsSyncing } = useApp();
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] MnemOS Agent daemon initialized successfully.',
    '[EXTENSION] Browser plugin connected. ID: mnemos-chrome-041a',
    '[SYNC] Awaiting user browsing activity...'
  ]);

  // Live Terminal Log Simulator
  useEffect(() => {
    if (!isSyncing) return;

    const mockMessages = [
      '[TELEMETRY] URL focus: github.com/kubernetes/kubernetes/issues',
      '[AI] Parsing page layout structures for intellectual nodes...',
      '[AI] Classification: DevOps (Confidence: 89%)',
      '[MEM] Appending telemetry to active draft memory...',
      '[TELEMETRY] URL focus: docs.aws.amazon.com/ecs/fargate',
      '[AI] Classifying target: Cloud Computing (Confidence: 91%)',
      '[SYNC] Pushing memory draft packet #4092 to local index server.',
      '[MEM] Transformed telemetry into 1 new Learning Memory successfully.'
    ];

    const interval = setInterval(() => {
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => {
        const next = [...prev, `[${timestamp}] ${randomMsg}`];
        // Keep logs capped at 15 items for layout
        if (next.length > 15) next.shift();
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isSyncing]);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white font-mono">EXTENSION TELEMETRY</h2>
          <p className="text-xs text-neutral-400 font-sans">
            Verify the status of the MnemOS telemetry capture agent and raw browser activity processing.
          </p>
        </div>

        {/* Toggle sync daemon */}
        <button
          onClick={() => setIsSyncing(!isSyncing)}
          className={`
            px-4 py-2 rounded-xl border font-mono text-xs font-semibold flex items-center space-x-2 transition-all duration-150
            ${isSyncing
              ? 'bg-[#7CF4FF]/10 border-[#7CF4FF]/35 text-[#7CF4FF] shadow-[0_0_15px_rgba(124,244,255,0.05)]'
              : 'bg-neutral-900 border-white/5 text-neutral-500'
            }
          `}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          <span>{isSyncing ? 'DAEMON SYNCING ACTIVE' : 'DAEMON PAUSED'}</span>
        </button>
      </div>

      {/* Real-time telemetry focus card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-white/5 md:col-span-2 space-y-2">
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider block">CURRENTLY CAPTURED WEBPAGE</span>
          <div className="text-xs font-bold text-white font-mono truncate">
            Configure Liveness, Readiness and Startup Probes | Kubernetes
          </div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono">
            <span className="truncate">kubernetes.io/docs/tasks/...</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </div>
        </Card>

        <Card className="p-4 border-white/5 space-y-2">
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider block">CLASSIFICATION CATEGORY</span>
          <div className="text-xs font-bold text-[#7CF4FF] font-mono">
            DevOps / Orchestration
          </div>
          <div className="text-[10px] text-neutral-400 font-mono">
            Confidence: 95% Match
          </div>
        </Card>

        <Card glowColor="primary" className="p-4 border-white/5 space-y-2 bg-[#D7FF00]/5 border-[#D7FF00]/10">
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider block">DAEMON SCAN INTERVAL</span>
          <div className="text-xs font-bold text-white font-mono flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-[#D7FF00] animate-pulse" />
            <span>Analyzing Activity...</span>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono">
            Local parsing engine active
          </div>
        </Card>
      </div>

      {/* Ticker stream vs Terminal Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* URL logs ticker */}
        <div className="space-y-4">
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider px-1 block select-none">Browser URL stream</span>
          <div className="space-y-2">
            {telemetryEvents.map((tel) => (
              <Card key={tel.id} className="p-3 border-white/5 bg-neutral-900/10">
                <div className="flex items-start justify-between gap-3 text-[11px] font-mono text-neutral-300">
                  <div className="space-y-1 truncate">
                    <div className="text-white font-semibold truncate leading-tight pr-6">{tel.title}</div>
                    <div className="text-neutral-500 text-[10px] truncate">{tel.url}</div>
                    <div className="text-neutral-400 text-[9px] uppercase tracking-wider">
                      CLASS: {tel.classification} ({tel.confidenceScore}%)
                    </div>
                  </div>
                  
                  {/* Status pill */}
                  <div className="text-right shrink-0">
                    <span
                      className={`
                        px-2 py-0.5 rounded text-[8px] border font-bold
                        ${tel.status === 'Processed'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : tel.status === 'Analyzing'
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                        }
                      `}
                    >
                      {tel.status.toUpperCase()}
                    </span>
                    <span className="text-[8px] text-neutral-500 block mt-1.5">
                      {new Date(tel.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sync logs terminal simulator */}
        <div className="space-y-4">
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider px-1 block select-none">DAEMON COMPILATION CONSOLE</span>
          <Card className="p-4 border-white/10 bg-[#020202] h-[340px] flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="flex items-center space-x-2 text-neutral-500 text-[10px] font-mono border-b border-white/5 pb-2 select-none shrink-0">
              <Terminal className="w-3.5 h-3.5" />
              <span>LOG STREAM CONSOLE (PAGER=cat)</span>
            </div>

            {/* Print logs */}
            <div className="flex-1 overflow-y-auto pt-3 space-y-1.5 font-mono text-[10px] text-emerald-400 leading-normal selection:bg-emerald-800 selection:text-white">
              {logs.map((log, idx) => (
                <div key={idx} className="break-all whitespace-pre-wrap">
                  {log}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div className="mt-2 border-t border-white/5 pt-2 flex items-center justify-between text-[8px] text-neutral-500 font-mono select-none shrink-0">
              <span className="flex items-center">
                <HardDrive className="w-3 h-3 mr-1" />
                BUFFER SIZE: 1.2MB / 10MB
              </span>
              <span>DAEMON ACTIVE</span>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
export default ExtensionStatus;
