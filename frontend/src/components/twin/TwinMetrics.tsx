import React from 'react';
import { Card } from '../common/Card';
import { useLearningTwin } from '../../hooks/useLearningTwin';
import { Award, Zap, BookOpen, Fingerprint } from 'lucide-react';

export const TwinMetrics: React.FC = () => {
  const { twinData } = useLearningTwin();

  if (!twinData) return null;

  const confidenceScore = 85;
  const consistencyScore = Math.min((twinData.totalMemories || 0) * 10, 100);
  const knowledgeDepth = Math.min((twinData.totalMemories || 0) * 8, 100);
  const knowledgeBreadth = 65;
  const curiosityIndex = twinData.curiosityScore || 40;
  const researchIntensity = twinData.learningMomentum || 30;
  const learningMomentum = twinData.learningMomentum || 30;

  const detailedMetrics = [
    {
      label: 'Twin Confidence Score',
      value: `${confidenceScore}%`,
      desc: 'Confidence in intellectual representation alignment.',
      color: '#D7FF00',
      icon: <Award className="w-3.5 h-3.5 text-[#D7FF00]" />,
      percentage: confidenceScore
    },
    {
      label: 'Learning Consistency Score',
      value: `${consistencyScore}%`,
      desc: 'Consistency of weekly cognitive activity streams.',
      color: '#7CF4FF',
      icon: <Zap className="w-3.5 h-3.5 text-[#7CF4FF]" />,
      percentage: consistencyScore
    },
    {
      label: 'Knowledge Depth Score',
      value: `${knowledgeDepth}/100`,
      desc: 'Mastery levels in specialized technical domains.',
      color: '#ffffff',
      icon: <BookOpen className="w-3.5 h-3.5 text-white" />,
      percentage: knowledgeDepth
    },
    {
      label: 'Knowledge Breadth Score',
      value: `${knowledgeBreadth}/100`,
      desc: 'Spread of subject matter across different tech spaces.',
      color: '#7CF4FF',
      icon: <Fingerprint className="w-3.5 h-3.5 text-[#7CF4FF]" />,
      percentage: knowledgeBreadth
    },
    {
      label: 'Curiosity Index',
      value: `${curiosityIndex}/100`,
      desc: 'Rate at which you explore unfamiliar technologies.',
      color: '#D7FF00',
      icon: <Award className="w-3.5 h-3.5 text-[#D7FF00]" />,
      percentage: curiosityIndex
    },
    {
      label: 'Research Intensity',
      value: `${researchIntensity}%`,
      desc: 'Ratio of documentation reading to implementation actions.',
      color: '#ffffff',
      icon: <Zap className="w-3.5 h-3.5 text-white" />,
      percentage: researchIntensity
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {detailedMetrics.map((met, idx) => (
        <Card key={idx} className="p-5 border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {met.icon}
              <span className="text-xs font-semibold font-mono text-white">
                {met.label}
              </span>
            </div>

            <span
              className="text-sm font-bold font-mono"
              style={{ color: met.color }}
            >
              {met.value}
            </span>
          </div>

          <p className="text-[11px] text-neutral-400 font-sans">
            {met.desc}
          </p>

          <div className="w-full h-1.5 bg-neutral-900 border border-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${met.percentage}%`,
                backgroundColor: met.color,
                boxShadow: `0 0 8px ${met.color}`
              }}
            />
          </div>
        </Card>
      ))}

      <Card
        glowColor="primary"
        className="col-span-1 md:col-span-2 p-5 border-[#D7FF00]/10 bg-[#D7FF00]/5 flex items-center justify-between font-mono text-xs"
      >
        <div>
          <span className="text-neutral-400 block mb-0.5">
            LEARNING MOMENTUM STATUS
          </span>

          <span className="text-white text-sm font-semibold">
            Your learning activity is actively building technical depth.
          </span>
        </div>

        <div className="px-4 py-2 bg-[#D7FF00] text-black font-bold rounded-lg shadow-[0_0_15px_rgba(215,255,0,0.4)]">
          {learningMomentum} VELOCITY
        </div>
      </Card>
    </div>
  );
};

export default TwinMetrics;