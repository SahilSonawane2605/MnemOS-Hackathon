import React from 'react';
import { useSkills } from '../hooks/useSkills';
import { Card } from '../components/common/Card';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp, Award } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills, radarData, lineData } = useSkills();

  const getMomentumColor = (momentum: string) => {
    switch (momentum) {
      case 'High':
        return '#D7FF00';
      case 'Medium':
        return '#7CF4FF';
      default:
        return '#FFFFFF';
    }
  };

  // SVG Sparkline creator
  const renderSparkline = (history: { level: number }[], strokeColor: string) => {
    if (history.length < 2) return null;
    const width = 80;
    const height = 24;
    const min = Math.min(...history.map((h) => h.level));
    const max = Math.max(...history.map((h) => h.level));
    const range = max - min || 1;

    const points = history
      .map((pt, i) => {
        const x = (i / (history.length - 1)) * width;
        const y = height - ((pt.level - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          points={points}
          className="drop-shadow-[0_0_2px_currentColor]"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="space-y-1 select-none">
        <h2 className="text-xl font-bold text-white font-mono">SKILL EVOLUTION</h2>
        <p className="text-xs text-neutral-400 font-sans">
          Track real-time intellectual competence gains derived from telemetry parsing logs.
        </p>
      </div>

      {/* Grid of individual skills cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skills.map((skill) => {
          const momentumColor = getMomentumColor(skill.momentum);
          return (
            <Card key={skill.id} className="p-4 border-white/5 space-y-3">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono">{skill.name}</span>
                <span
                  style={{ color: momentumColor, borderColor: `${momentumColor}20` }}
                  className="px-2 py-0.5 rounded border font-mono text-[8px] uppercase font-bold"
                >
                  {skill.momentum} Momentum
                </span>
              </div>

              {/* Stats & Sparkline */}
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-lg font-bold text-white font-mono">{skill.level}%</div>
                  <div className="text-[9px] font-mono text-neutral-400">
                    Vel: {skill.learningVelocity}h/wk • +{skill.growthRate}%
                  </div>
                </div>
                {renderSparkline(skill.history, momentumColor)}
              </div>

              {/* Slider track */}
              <div className="w-full h-1 bg-neutral-900 border border-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: momentumColor,
                    boxShadow: `0 0 6px ${momentumColor}`
                  }}
                />
              </div>

            </Card>
          );
        })}
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <Card glowColor="primary" className="p-5 border-white/5 h-[340px] flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono mb-4 select-none">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>HISTORICAL LEVEL MATRIX</span>
          </div>

          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="date" stroke="#606060" tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                <YAxis domain={[30, 100]} stroke="#606060" tick={{ fontSize: 9, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090909', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  labelStyle={{ color: '#D7FF00', fontSize: 10, fontFamily: 'monospace' }}
                  itemStyle={{ fontSize: 10, fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
                <Line type="monotone" dataKey="Cloud Computing" stroke="#D7FF00" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="DevOps" stroke="#7CF4FF" strokeWidth={2} />
                <Line type="monotone" dataKey="Web Development" stroke="#A0A0A0" strokeWidth={1.5} />
                <Line type="monotone" dataKey="AI/ML" stroke="#ffffff" strokeWidth={1.5} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Radar Chart */}
        <Card glowColor="secondary" className="p-5 border-white/5 h-[340px] flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono mb-4 select-none">
            <Award className="w-3.5 h-3.5" />
            <span>MASTERY VS CONFIDENCE</span>
          </div>

          <div className="flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#262626" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#A0A0A0', fontSize: 8, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#262626" tick={{ fill: '#404040', fontSize: 8 }} />
                <Radar name="Mastery Level" dataKey="A" stroke="#7CF4FF" fill="#7CF4FF" fillOpacity={0.1} />
                <Radar name="Confidence Score" dataKey="B" stroke="#D7FF00" fill="#D7FF00" fillOpacity={0.1} />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

    </div>
  );
};
export default Skills;
