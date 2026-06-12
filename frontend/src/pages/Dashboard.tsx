import React from 'react';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { LearningSummaryCard } from '../components/dashboard/LearningSummaryCard';
import { LearningDNAPanel } from '../components/dashboard/LearningDNAPanel';
import { RecommendationBanner } from '../components/dashboard/RecommendationBanner';
import { Card } from '../components/common/Card';
import { useApp } from '../context/AppContext';
import { Layers, Video, Code, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { memories, setActivePage } = useApp();

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'YouTube':
        return <Video className="w-3 h-3 text-red-400" />;
      case 'GitHub':
        return <Code className="w-3 h-3 text-white" />;
      case 'Documentation':
        return <BookOpen className="w-3 h-3 text-blue-400" />;
      default:
        return <AlertCircle className="w-3 h-3 text-neutral-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Grid */}
      <MetricsGrid />

      {/* Dominant summary block */}
      <LearningSummaryCard />

      {/* Grid: Recent activities vs Cognitive DNA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent memories feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1 select-none">
            <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>RECENT LEARNING MEMORIES</span>
            </div>
            <button
              onClick={() => setActivePage('memories')}
              className="flex items-center space-x-1.5 text-xs text-[#D7FF00] hover:text-white font-mono transition-colors group"
            >
              <span>Explore all</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {memories.slice(0, 3).map((mem) => (
              <Card key={mem.id} className="p-4 border-white/5 bg-neutral-900/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-neutral-950 border border-white/5 text-[9px] text-neutral-400 font-mono">
                      {getSourceIcon(mem.source)}
                      <span>{mem.source}</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-neutral-950 border border-[#7CF4FF]/20 text-[9px] text-[#7CF4FF] font-mono">
                      {mem.skillImpact}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Confidence: {mem.confidenceScore}%
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {mem.date}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white font-mono mb-1">{mem.topic}</h3>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                  {mem.aiSummary}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Cognitive DNA archetype panel */}
        <div>
          <LearningDNAPanel />
        </div>

      </div>

      {/* Advisory suggestions */}
      <RecommendationBanner />

    </div>
  );
};
export default Dashboard;
