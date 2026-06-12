import React from 'react';
import { useLearningTwin } from '../../hooks/useLearningTwin';

export const TwinOrb: React.FC = () => {
  const { orbNodes } = useLearningTwin();

  return (
    <div className="relative w-full h-[360px] bg-neutral-950/20 border border-white/5 rounded-3xl flex items-center justify-center overflow-hidden">
      
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
      
      {/* Pulsing glow background */}
      <div className="absolute w-[200px] h-[200px] bg-radial-glow bg-[#D7FF00]/10 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute w-[180px] h-[180px] bg-radial-glow bg-[#7CF4FF]/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1000ms' }} />

      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          {/* Radial gradients for glowing cores */}
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D7FF00" stopOpacity="1" />
            <stop offset="50%" stopColor="#7CF4FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit paths */}
        <circle cx="200" cy="200" r="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="110" stroke="rgba(124,244,255,0.04)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="200" r="140" stroke="rgba(215,255,0,0.04)" strokeWidth="1" fill="none" strokeDasharray="8 8" />

        {/* Neural connection vectors (Lines pulsing from central core to orbiting points) */}
        {orbNodes.map((node, index) => {
          // Calculate stationary vector directions for layout references
          const rad = (node.angle * Math.PI) / 180;
          const targetX = 200 + Math.cos(rad) * node.distance;
          const targetY = 200 + Math.sin(rad) * node.distance;

          return (
            <g key={`link-${index}`}>
              <line
                x1="200"
                y1="200"
                x2={targetX}
                y2={targetY}
                stroke={node.color}
                strokeWidth="1"
                className="opacity-20 animate-pulse"
                style={{ animationDelay: `${index * 200}ms` }}
              />
              {/* Transmission pulse particle */}
              <circle r="2" fill="#ffffff" className="opacity-80">
                <animateMotion
                  dur={`${3 + index}s`}
                  repeatCount="indefinite"
                  path={`M 200 200 L ${targetX} ${targetY}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Central Neural Orb Core */}
        <g className="cursor-pointer">
          {/* Outer glow ring */}
          <circle cx="200" cy="200" r="45" fill="url(#coreGlow)" className="opacity-40 animate-pulse" />
          
          {/* Inner solid core */}
          <circle cx="200" cy="200" r="24" fill="#090909" stroke="#D7FF00" strokeWidth="2" className="shadow-[0_0_15px_#D7FF00]" />
          
          {/* Cyber network lines inside core */}
          <circle cx="200" cy="200" r="12" fill="none" stroke="#7CF4FF" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '20s' }} />
          <circle cx="200" cy="200" r="4" fill="#ffffff" />
        </g>

        {/* Orbiting topic nodes (floating text groups revolving in time) */}
        {orbNodes.map((node, index) => {
          // Revolving parameters
          const duration = 25 + index * 5;
          return (
            <g key={`node-${index}`}>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 200"
                to="360 200 200"
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
              
              {/* Node container offset along radius */}
              <g transform={`translate(${node.distance}, 0)`}>
                {/* Prevent text rotation */}
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="-360 0 0"
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  additive="sum"
                />
                
                {/* Node Halo */}
                <circle cx="200" cy="200" r="8" fill="rgba(9,9,9,0.9)" stroke={node.color} strokeWidth="1.5" />
                <circle cx="200" cy="200" r="4" fill={node.color} className="animate-ping opacity-60" />

                {/* Floating Node Label */}
                <text
                  x="200"
                  y="186"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontFamily="monospace"
                  className="font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] fill-neutral-300"
                >
                  {node.label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Ticker HUD Overlay */}
      <div className="absolute top-4 left-4 p-2.5 bg-neutral-900/60 border border-white/5 rounded-xl font-mono text-[9px] text-neutral-400 space-y-0.5">
        <span className="text-[#D7FF00] font-semibold block uppercase">Telemetry Capture HUD</span>
        <div>MODEL: mnemos-twin-v1-dev</div>
        <div>ORBITS: active (revolving)</div>
        <div>STATUS: matching activities...</div>
      </div>
    </div>
  );
};
