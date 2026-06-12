import React from 'react';
import { Card } from '../common/Card';
import { useLearningTwin } from '../../hooks/useLearningTwin';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import { Fingerprint } from 'lucide-react';

export const PersonalityCard: React.FC = () => {
  const { twinData } = useLearningTwin();

  if (!twinData) return null;

  const personality = {
    type: twinData?.learningPersonality || 'Explorer',

    description:
      'Learns through experimentation, project building, exploration of new technologies, and solving real-world problems.',

    radarTraits: [
      { trait: 'Curiosity', value: 85 },
      { trait: 'Research', value: 75 },
      { trait: 'Creativity', value: 80 },
      { trait: 'Consistency', value: 65 },
      { trait: 'Problem Solving', value: 90 }
    ]
  };

  const style = {
    primary: 'Project First',

    description:
      'Prefers learning through practical implementation, experimentation, and iterative problem solving.'
  };

  return (
    <Card glowColor="secondary" className="p-6 border-white/5">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Information Section */}
        <div className="flex-1 space-y-4">

          <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>COGNITIVE CLASSIFICATION</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-mono">
              {personality.type}
            </h3>

            <p className="text-xs text-neutral-400 font-mono">
              Primary Style: {style.primary}
            </p>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            {personality.description}
          </p>

          <div className="p-3.5 bg-neutral-900 border border-white/5 rounded-xl font-mono text-[11px] text-neutral-400">
            <span className="text-[#7CF4FF] font-semibold block mb-0.5">
              Style Synopsis
            </span>

            {style.description}
          </div>

        </div>

        {/* Radar Chart */}
        <div className="w-full lg:w-[280px] h-[220px] shrink-0">

          <ResponsiveContainer width={280} height={220}>

            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="75%"
              data={personality.radarTraits}
            >

              <PolarGrid stroke="#262626" />

              <PolarAngleAxis
                dataKey="trait"
                tick={{
                  fill: '#A0A0A0',
                  fontSize: 8,
                  fontFamily: 'monospace'
                }}
              />

              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{
                  fill: '#404040',
                  fontSize: 6
                }}
                stroke="#262626"
              />

              <Radar
                name={personality.type}
                dataKey="value"
                stroke="#7CF4FF"
                fill="#7CF4FF"
                fillOpacity={0.15}
              />

            </RadarChart>

          </ResponsiveContainer>

        </div>

      </div>
    </Card>
  );
};

export default PersonalityCard;