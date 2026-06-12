import React from 'react';
import { Card } from '../common/Card';
import { Cpu, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LearningSummaryCard: React.FC = () => {
  const { twinData, setActivePage } = useApp();

  return (
    <Card
      glowColor="primary"
      className="p-6 md:p-8 border border-[#D7FF00]/20 bg-neutral-900/40 relative shadow-[0_0_30px_rgba(215,255,0,0.05)]"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        
        {/* Left Side: Summary text */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center space-x-2 text-[#D7FF00] text-xs font-mono">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>AI COGNITIVE SYNOPSIS</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono leading-tight">
            Your Learning Twin Summary
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed font-sans">
            {twinData?.aiSummary || 
              'Your learning engine is compiling browsing metadata. Preliminary reviews indicate focus areas in Container Orchestration, Docker networking bridges, and Fargate infrastructure deployment profiles.'
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-neutral-950/60 border border-white/5 rounded-xl font-mono text-xs">
              <span className="text-neutral-500 block mb-0.5">EMERGING SPECIALTY</span>
              <span className="text-[#D7FF00] font-semibold">Cloud Computing</span>
            </div>
            <div className="p-3 bg-neutral-950/60 border border-white/5 rounded-xl font-mono text-xs">
              <span className="text-neutral-500 block mb-0.5">LEARNING RATE</span>
              <span className="text-[#7CF4FF] font-semibold">+23% Consistency</span>
            </div>
            <div className="p-3 bg-neutral-950/60 border border-white/5 rounded-xl font-mono text-xs">
              <span className="text-neutral-500 block mb-0.5">CAREER MATCH</span>
              <span className="text-white font-semibold">DevOps Platform Architect</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Action */}
        <button
          onClick={() => setActivePage('twin')}
          className="shrink-0 flex items-center justify-center space-x-2 px-4 py-3 bg-[#D7FF00] hover:bg-[#c2e600] text-black font-mono text-xs font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(215,255,0,0.25)] hover:shadow-[0_0_20px_rgba(215,255,0,0.4)]"
        >
          <span>Explore Brain Twin</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </button>

      </div>
    </Card>
  );
};
