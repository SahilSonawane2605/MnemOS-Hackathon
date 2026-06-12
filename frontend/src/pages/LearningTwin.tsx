import React from 'react';
import { TwinOrb } from '../components/twin/TwinOrb';
import { TwinMetrics } from '../components/twin/TwinMetrics';
import { PersonalityCard } from '../components/twin/PersonalityCard';
import { useLearningTwin } from '../hooks/useLearningTwin';
import { Card } from '../components/common/Card';
import { Compass, BookOpen } from 'lucide-react';

export const LearningTwin: React.FC = () => {
  const { twinData } = useLearningTwin();

  if (!twinData) {
    return (
      <div className="text-white p-6">
        Loading Learning Twin...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Orb + Personality */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        <div className="lg:col-span-3">
          <TwinOrb />
        </div>

        <div className="lg:col-span-2">
          <PersonalityCard />
        </div>

      </div>

      {/* Metrics + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <TwinMetrics />
        </div>

        <div className="space-y-4">

          {/* Curiosity Patterns */}
          <Card className="p-5 border-white/5 space-y-4">

            <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>CURIOSITY PATTERNS</span>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              {(
                twinData?.curiosityPatterns || [
                  'OpenCV',
                  'Python',
                  'Computer Vision',
                  'AI / ML',
                  'Problem Solving'
                ]
              ).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-neutral-900 border border-[#7CF4FF]/15 hover:border-[#7CF4FF]/45 text-[10px] text-[#7CF4FF] font-mono rounded-lg transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[10px] text-neutral-500 font-mono leading-relaxed pt-2 border-t border-white/5">
              Identified from browsing telemetry and learning behavior patterns.
            </p>

          </Card>

          {/* Career Tendencies */}
          <Card className="p-5 border-white/5 space-y-4">

            <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>INTELLECTUAL PATHWAYS</span>
            </div>

            <div className="space-y-2">
              {(
                twinData?.careerTendencies || [
                  'AI / ML Engineer',
                  'Computer Vision Engineer',
                  'Software Developer',
                  'Cloud Engineer'
                ]
              ).map((career, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-white/5 text-xs text-white font-mono"
                >
                  <span>{career}</span>

                  <span className="text-[10px] text-neutral-500">
                    Telemetry aligned
                  </span>
                </div>
              ))}
            </div>

          </Card>

        </div>

      </div>

    </div>
  );
};

export default LearningTwin;