import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types/chat';
import { Cpu, User, Layers, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const { setActivePage } = useApp();

  const handleCitationClick = () => {
    setActivePage('memories');
  };

  return (
    <div className={`flex w-full space-x-4 ${isUser ? 'justify-end' : 'justify-start'} py-4`}>
      {/* Icon/Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-[#D7FF00]/30 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(215,255,0,0.2)]">
          <Cpu className="w-4 h-4 text-[#D7FF00]" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`max-w-[75%] flex flex-col space-y-2`}>
        {/* Header Metadata */}
        <div className={`text-[10px] font-mono text-neutral-500 ${isUser ? 'text-right' : 'text-left'}`}>
          {isUser ? 'USER IDENTIFIER' : 'MNEMOS COGNITIVE TWIN'} • {message.timestamp}
        </div>

        {/* Bubble */}
        <div
          className={`
            p-4 rounded-2xl text-sm leading-relaxed border font-sans
            ${isUser
              ? 'bg-neutral-800 border-neutral-700/60 text-white rounded-tr-none'
              : 'bg-neutral-900/60 backdrop-blur-md border-white/10 text-neutral-100 rounded-tl-none'
            }
          `}
        >
          {message.content ? (
            <div className="whitespace-pre-wrap font-mono text-xs">{message.content}</div>
          ) : (
            /* Typing / Streaming Loading Animation */
            <div className="flex items-center space-x-1 py-1">
              <span className="w-2 h-2 rounded-full bg-[#D7FF00] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#7CF4FF] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Citations / Memory Links */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {message.citations.map((cite) => (
              <div
                key={cite.id}
                onClick={handleCitationClick}
                className="flex items-center space-x-2 px-2.5 py-1 bg-neutral-950/60 border border-[#7CF4FF]/20 hover:border-[#7CF4FF]/50 rounded-lg text-neutral-300 text-xs font-mono cursor-pointer hover:bg-neutral-900 transition-all select-none group"
              >
                <Layers className="w-3 h-3 text-[#7CF4FF]" />
                <span>{cite.topic}</span>
                <span className="text-[10px] text-neutral-500">({cite.confidenceScore}%)</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-neutral-400" />
        </div>
      )}
    </div>
  );
};
