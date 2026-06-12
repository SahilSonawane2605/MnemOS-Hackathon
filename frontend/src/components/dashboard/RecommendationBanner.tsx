import React from 'react';
import { Card } from '../common/Card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecommendationBanner: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <Card
      glowColor="secondary"
      className="p-5 border-[#7CF4FF]/20 bg-neutral-900/35 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Side: Sparkles logo & recommendations */}
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-neutral-950/80 border border-[#7CF4FF]/30 rounded-xl text-[#7CF4FF] shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-[#7CF4FF] font-mono uppercase tracking-wider block mb-0.5">Recommended Next Action</span>
            <p className="text-xs text-neutral-300 font-mono leading-relaxed">
              "Based on your recent focus on Docker networking, Kubernetes, and ECS configurations, your next logical step is **AWS EKS orchestration** and writing **Infrastructure as Code (IaC) with Terraform**."
            </p>
          </div>
        </div>

        {/* Right Side: Quick Action */}
        <button
          onClick={() => setActivePage('assistant')}
          className="shrink-0 flex items-center space-x-1.5 text-xs font-mono font-semibold text-[#7CF4FF] hover:text-white transition-colors group self-end md:self-auto"
        >
          <span>Ask Assistant</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>
    </Card>
  );
};
