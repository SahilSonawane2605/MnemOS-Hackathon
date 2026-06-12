import React from 'react';
import { mockSuggestedPrompts } from '../../mock/chatMock';
import { HelpCircle, ChevronRight } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-neutral-400 text-xs font-mono">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>SUGGESTED QUERY PATHWAYS</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {mockSuggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="flex items-center justify-between p-3.5 text-left rounded-xl bg-neutral-900/60 border border-white/5 hover:border-neutral-700 hover:bg-neutral-900 transition-all font-mono text-xs text-neutral-300 group"
          >
            <span className="group-hover:text-[#D7FF00] transition-colors pr-2">
              {prompt}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#D7FF00] shrink-0 transition-all group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
