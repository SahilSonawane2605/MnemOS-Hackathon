import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { getCareerInsights } from '../services/twinService';
import type { CareerInsight } from '../types/api';
import { Award, CheckSquare, Square, Star, AlertCircle } from 'lucide-react';

export const Career: React.FC = () => {
  const [insights, setInsights] = useState<CareerInsight[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [roadmap, setRoadmap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function load() {
      const data = await getCareerInsights();

    if (Array.isArray(data)) {
      setInsights(data);
    } else {
      console.error("Career API returned:", data);
      setInsights([]);
    }
      if (data.length > 0) {
        setSelectedRoleId(data[0].id);
        
        // Populate local checklist tracker state for roadmap
        const initialStatus: Record<string, boolean> = {};
        data.forEach((role) => {
          role.recommendedRoadmap.forEach((step) => {
            initialStatus[step.id] = step.completed;
          });
        });
        setRoadmap(initialStatus);
      }
    }
    load();
  }, []);

  const safeInsights = Array.isArray(insights) ? insights : [];

  const activeInsight = safeInsights.find(
    (ins) => ins.id === selectedRoleId
  );

  const toggleStep = (stepId: string) => {
    setRoadmap((prev) => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="space-y-1 select-none">
        <h2 className="text-xl font-bold text-white font-mono">CAREER PATHWAYS</h2>
        <p className="text-xs text-neutral-400 font-sans">
          MnemOS cross-references your active cognitive development logs with job profile requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Role Selector */}
        <div className="space-y-3 select-none">
          <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider px-1 block">SUGGESTED ROLES</span>
          <div className="space-y-2">
            {insights.map((ins) => {
              const isActive = ins.id === selectedRoleId;
              return (
                <div
                  key={ins.id}
                  onClick={() => setSelectedRoleId(ins.id)}
                  className={`
                    p-4 rounded-xl border font-mono text-xs cursor-pointer transition-all duration-150
                    ${isActive
                      ? 'bg-neutral-900 border-[#D7FF00] text-white shadow-[0_0_15px_rgba(215,255,0,0.05)]'
                      : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">{ins.role}</span>
                    <span className={isActive ? 'text-[#D7FF00]' : 'text-neutral-500'}>
                      {ins.matchPercentage}% Match
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    {ins.skillGaps.length} gaps identified
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Role Analysis details */}
        <div className="lg:col-span-2">
          {activeInsight ? (
            <div className="space-y-4">
              
              {/* Core Match Card */}
              <Card glowColor="primary" className="p-5 border-white/5 space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-[#D7FF00]" />
                    <span className="font-mono text-sm font-bold text-white">{activeInsight.role}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold font-mono text-[#D7FF00]">{activeInsight.matchPercentage}%</span>
                    <span className="text-[9px] text-neutral-500 font-mono block">MATCH RATE</span>
                  </div>
                </div>

                {/* AI Explanation Box */}
                <div className="p-4 bg-neutral-900/60 border border-[#D7FF00]/10 rounded-xl space-y-1.5">
                  <span className="text-[9px] text-[#D7FF00] font-mono uppercase tracking-wider block">AI Match Assessment</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {activeInsight.aiExplanation}
                  </p>
                </div>

                {/* Match Evidence logs */}
                <div className="space-y-2">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider block">MATCH EVIDENCE</span>
                  <ul className="space-y-1.5">
                    {activeInsight.evidence.map((ev, idx) => (
                      <li key={idx} className="flex items-start text-xs text-neutral-300 font-sans leading-relaxed">
                        <span className="text-[#D7FF00] mr-2 shrink-0 select-none">•</span>
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skill Gaps Tags */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider block">IDENTIFIED SKILL GAPS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeInsight.skillGaps.map((gap, idx) => (
                      <span
                        key={idx}
                        className="flex items-center space-x-1.5 px-2.5 py-1 bg-neutral-950 border border-red-500/20 rounded-lg text-neutral-300 text-xs font-mono select-none"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <span>{gap}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </Card>

              {/* Recommended Roadmap Card */}
              <Card className="p-5 border-white/5 space-y-4">
                
                <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
                  <Star className="w-3.5 h-3.5" />
                  <span>RECOMMENDED ACQUISITION ROADMAP</span>
                </div>

                <div className="space-y-3">
                  {activeInsight.recommendedRoadmap.map((step) => {
                    const isCompleted = roadmap[step.id] || false;
                    return (
                      <div
                        key={step.id}
                        onClick={() => toggleStep(step.id)}
                        className={`
                          flex items-start space-x-3 p-3 bg-neutral-900 border rounded-xl cursor-pointer select-none transition-all duration-150
                          ${isCompleted 
                            ? 'border-white/5 bg-neutral-950/20 opacity-60' 
                            : 'border-white/5 hover:border-neutral-700 hover:bg-neutral-900/60'
                          }
                        `}
                      >
                        {/* Custom checkbox */}
                        <div className="pt-0.5 shrink-0 text-[#7CF4FF]">
                          {isCompleted ? (
                            <CheckSquare className="w-4 h-4 text-[#D7FF00]" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-500" />
                          )}
                        </div>
                        
                        <div className="space-y-0.5">
                          <h4 className={`text-xs font-bold font-mono text-white ${isCompleted ? 'line-through text-neutral-500' : ''}`}>
                            {step.title}
                          </h4>
                          <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                            {step.description}
                          </p>
                          <span className="text-[9px] text-neutral-500 font-mono block">
                            EST. TIME: {step.estimatedHours}h • TYPE: {step.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </Card>

            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500 font-mono">
              Loading career profile diagnostics...
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default Career;
