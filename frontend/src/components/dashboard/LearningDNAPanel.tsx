import React from 'react';
import { Card } from '../common/Card';
import { Fingerprint } from 'lucide-react';

interface ProgressRingProps {
  percentage: number;
  label: string;
  color: string;
  size?: number;
  strokeWidth?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  label,
  color,
  size = 70,
  strokeWidth = 6
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-neutral-800"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress Circle */}
          <circle
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            className="drop-shadow-[0_0_4px_currentColor]"
          />
        </svg>
        {/* Percentage Label */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">
          {percentage}%
        </div>
      </div>
      <span className="text-[10px] text-neutral-400 font-mono text-center">{label}</span>
    </div>
  );
};

export const LearningDNAPanel: React.FC = () => {
  const dnaMetrics = [
    { label: 'Project First', percentage: 88, color: '#D7FF00' },
    { label: 'Documentation', percentage: 75, color: '#7CF4FF' },
    { label: 'Research Driven', percentage: 60, color: '#FFFFFF' },
    { label: 'Visual/Video', percentage: 45, color: '#7CF4FF' }
  ];

  return (
    <Card className="p-5 border-white/5 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
          <Fingerprint className="w-3.5 h-3.5" />
          <span>COGNITIVE DNA ARCHETYPE</span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2">
          {dnaMetrics.map((dna, idx) => (
            <ProgressRing
              key={idx}
              percentage={dna.percentage}
              label={dna.label}
              color={dna.color}
            />
          ))}
        </div>
      </div>

      <div className="text-[10px] text-neutral-500 font-mono leading-relaxed mt-4 pt-3 border-t border-white/5">
        MnemOS identifies that you learn primarily through hands-on compilation logs and codebase exploration rather than passive video reading.
      </div>
    </Card>
  );
};
