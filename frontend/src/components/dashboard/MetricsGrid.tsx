import React from 'react';
import { Card } from '../common/Card';
import { Clock, GraduationCap, Trophy, Gauge, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MetricsGrid: React.FC = () => {
  const { memories, skills, twinData } = useApp();

  const metrics = [
    {
      label: 'Learning Hours',
      value: '24.5 Hrs',
      change: '+14% this month',
      icon: <Clock className="w-4 h-4 text-[#7CF4FF]" />,
      glow: 'secondary' as const
    },
    {
      label: 'Topics Explored',
      value: (memories?.length || 0).toString(),
      change: '+2 this week',
      icon: <GraduationCap className="w-4 h-4 text-[#D7FF00]" />,
      glow: 'primary' as const
    },
    {
      label: 'Skills Identified',
      value: (skills?.length || 0).toString(),
      change: 'Active telemetry',
      icon: <Trophy className="w-4 h-4 text-white" />,
      glow: 'none' as const
    },  
   {
      label: 'Learning Velocity',
      value: '4.2 Hrs/Wk',
      change: '+23% consistency',
      icon: <Gauge className="w-4 h-4 text-[#7CF4FF]" />,
      glow: 'secondary' as const
    },
    {
  label: 'Knowledge Growth',
  value: twinData
    ? `${(twinData.totalMemories || 0) * 10} Pts`
    : '780 Pts',
  change: '+42 pts growth',
  icon: <Star className="w-4 h-4 text-[#D7FF00]" />,
  glow: 'primary' as const
}
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} glowColor={metric.glow} className="p-4 border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">{metric.label}</span>
            <div className="p-1 bg-neutral-900 border border-white/5 rounded-lg shrink-0">
              {metric.icon}
            </div>
          </div>
          <div className="text-xl font-bold text-white font-mono">{metric.value}</div>
          <div className="text-[10px] text-neutral-400 font-mono mt-1">{metric.change}</div>
        </Card>
      ))}
    </div>
  );
};
