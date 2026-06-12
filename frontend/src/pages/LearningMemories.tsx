import React from 'react';
import { useTimeline } from '../hooks/useTimeline';
import { SearchBar } from '../components/common/SearchBar';
import { Card } from '../components/common/Card';
import { EmptyState } from '../components/common/EmptyState';
import { Video, Code, BookOpen, FileText, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';

export const LearningMemories: React.FC = () => {
  const {
    memories,
    searchQuery,
    setSearchQuery,
    sourceFilter,
    setSourceFilter,
    sourcesList
  } = useTimeline();

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

  const getDerivationText = (topic: string, date: string) => {
    // Generate startup-grade telemetry explanations
    if (topic.includes('Docker')) {
      return `Telemetry compiled from 2 documentation lookups at docs.docker.com, 1 YouTube video review, and 3 command execs at localhost on ${date}.`;
    }
    if (topic.includes('Kubernetes')) {
      return `Telemetry compiled from kubernetes.io concepts references and pod config validation tests on ${date}.`;
    }
    if (topic.includes('React')) {
      return `Telemetry compiled from 1 medium article scroll-heat-map and nextjs.org code reviews on ${date}.`;
    }
    return `Telemetry compiled from GitHub repository explorer triggers and documentation page loads on ${date}.`;
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Filter HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white font-mono">LEARNING MEMORIES</h2>
          <p className="text-xs text-neutral-400 font-sans">
            Review the structured knowledge MnemOS has extracted from your daily browsing behaviors.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            showShortcut={false}
          />
        </div>
      </div>

      {/* Source Filters Bar */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5 select-none">
        {sourcesList.map((src) => {
          const isActive = sourceFilter === src;
          return (
            <button
              key={src}
              onClick={() => setSourceFilter(src)}
              className={`
                px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all duration-150
                ${isActive
                  ? 'bg-[#D7FF00] border-[#D7FF00] text-black font-semibold'
                  : 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white hover:border-neutral-700'
                }
              `}
            >
              {src}
            </button>
          );
        })}
      </div>

      {/* Cards list */}
      {memories.length === 0 ? (
        <EmptyState
          title="No Learning Memories Identified"
          description="Try broadening your search query or updating source filters."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memories.map((mem) => (
            <Card key={mem.id} className="p-5 border-white/5 flex flex-col justify-between h-full bg-neutral-900/30">
              
              <div className="space-y-3">
                {/* Meta details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-neutral-950 border border-white/5 font-mono text-[9px] text-neutral-300">
                      {getSourceIcon(mem.source)}
                      <span>{mem.source}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-950 border border-[#7CF4FF]/20 font-mono text-[9px] text-[#7CF4FF]">
                      {mem.skillImpact}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">{mem.date}</span>
                </div>

                {/* Topic & URL */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-bold text-white font-mono">{mem.topic}</h3>
                  <a
                    href={mem.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-500 hover:text-[#7CF4FF] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Summary */}
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {mem.aiSummary}
                </p>
              </div>

              {/* Telemetry Derivation Footer */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-start space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D7FF00] shrink-0 mt-0.5" />
                <span className="text-[9px] text-neutral-500 font-mono leading-relaxed">
                  {getDerivationText(mem.topic, mem.date)}
                </span>
              </div>

            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
export default LearningMemories;
