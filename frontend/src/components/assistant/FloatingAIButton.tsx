import React from 'react';
import { useAssistant } from '../../hooks/useAssistant';
import { Cpu } from 'lucide-react';

export const FloatingAIButton: React.FC = () => {
  const { isAssistantModalOpen, setIsAssistantModalOpen } = useAssistant();

  return (
    <button
      onClick={() => setIsAssistantModalOpen(!isAssistantModalOpen)}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900 border border-[#D7FF00]/40 text-[#D7FF00] shadow-[0_0_20px_rgba(215,255,0,0.3)] hover:shadow-[0_0_30px_rgba(215,255,0,0.5)] hover:border-[#D7FF00] hover:scale-105 active:scale-95 transition-all duration-300 group"
      title="Ask your Learning Twin (Esc)"
    >
      <div className="absolute inset-0 rounded-full bg-radial-glow opacity-0 group-hover:opacity-10 transition-opacity" />
      
      {/* Central neural processor icon */}
      <Cpu className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform duration-300" />
    </button>
  );
};
