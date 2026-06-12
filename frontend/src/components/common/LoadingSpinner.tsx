import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="relative w-12 h-12">
        {/* Core pulsing glowing dot */}
        <div className="absolute inset-3 bg-[#D7FF00] rounded-full animate-ping opacity-75" />
        <div className="absolute inset-4 bg-[#D7FF00] rounded-full shadow-[0_0_10px_#D7FF00]" />
        
        {/* Orbiting cyber ring */}
        <div className="absolute inset-0 border-2 border-transparent border-t-[#7CF4FF] border-b-[#7CF4FF] rounded-full animate-spin" />
      </div>
      <span className="text-xs text-neutral-400 font-mono tracking-wider animate-pulse">
        CALIBRATING COGNITIVE TWIN...
      </span>
    </div>
  );
};
