import React from 'react';
import type { LearningMemory } from '../../types/memory';
import { Card } from '../common/Card';
import { Video, Code, BookOpen, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';

interface TimelineItemProps {
  item: LearningMemory;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast = false }) => {
  
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'YouTube':
        return <Video className="w-3.5 h-3.5 text-red-400" />;
      case 'GitHub':
        return <Code className="w-3.5 h-3.5 text-white" />;
      case 'Documentation':
        return <BookOpen className="w-3.5 h-3.5 text-blue-400" />;
      case 'Medium':
        return <FileText className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  return (
    <div className="flex space-x-6 relative">
      
      {/* Date sidebar indicator */}
      <div className="w-24 shrink-0 text-right pt-1 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
        {item.date}
      </div>

      {/* Vertical connection timeline guide */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-neutral-900 border border-[#D7FF00] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(215,255,0,0.3)]">
          <div className="w-1 h-1 bg-[#D7FF00] rounded-full" />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-neutral-800 border-l border-white/5 my-1" />}
      </div>

      {/* Timeline detail card */}
      <div className="flex-1 pb-8">
        <Card interactive className="p-4 border-white/5 bg-neutral-900/40">
          <div className="flex items-start justify-between gap-4">
            
            <div className="space-y-2">
              {/* Category headers */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-neutral-950 border border-white/5 font-mono text-[9px] text-neutral-300">
                  {getSourceIcon(item.source)}
                  <span>{item.source}</span>
                </span>
                
                <span className="px-2 py-0.5 rounded bg-neutral-950 border border-[#7CF4FF]/20 font-mono text-[9px] text-[#7CF4FF]">
                  {item.skillImpact}
                </span>

                <span className="px-2 py-0.5 rounded bg-neutral-950 border border-white/5 font-mono text-[9px] text-neutral-500">
                  {item.confidenceScore}% Confidence
                </span>
              </div>

              {/* Memory Topic */}
              <h4 className="text-sm font-bold text-white font-mono">{item.topic}</h4>
              
              {/* AI Synopsis */}
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {item.aiSummary}
              </p>
            </div>

            {/* Link trigger */}
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 bg-neutral-950 border border-white/5 rounded-lg text-neutral-500 hover:text-white transition-colors hover:bg-neutral-900 shrink-0"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

          </div>
        </Card>
      </div>

    </div>
  );
};
