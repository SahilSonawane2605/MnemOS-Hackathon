import React, { useRef, useEffect, useState } from 'react';
import { useAssistant } from '../../hooks/useAssistant';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import { X, Sparkles, Send } from 'lucide-react';

export const GlobalAssistantModal: React.FC = () => {
  const {
    messages,
    isTyping,
    isAssistantModalOpen,
    setIsAssistantModalOpen,
    sendMessage
  } = useAssistant();

  const [input, setInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAssistantModalOpen) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAssistantModalOpen, isTyping]);

  if (!isAssistantModalOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput('');
    await sendMessage(text);
  };

  const handleSelectPrompt = async (prompt: string) => {
    await sendMessage(prompt);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/70 backdrop-blur-md flex items-center justify-center p-4">
      {/* Click Outside Container */}
      <div className="absolute inset-0" onClick={() => setIsAssistantModalOpen(false)} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#090909] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col h-[75vh] max-h-[600px] overflow-hidden z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-neutral-950/60 select-none">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D7FF00]" />
            <span className="font-mono text-sm font-semibold tracking-wider text-white">MnemOS Assistant</span>
          </div>
          <button
            onClick={() => setIsAssistantModalOpen(false)}
            className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-6 py-8">
              <div className="text-center space-y-2">
                <p className="text-sm text-neutral-300 font-mono">Hello, I am MnemOS.</p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto font-mono">
                  Ask me about your learning habits, skills, career matches, or memory summary.
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <SuggestedPrompts onSelectPrompt={handleSelectPrompt} />
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <ChatMessage
                  message={{
                    id: 'typing',
                    sender: 'assistant',
                    content: '',
                    timestamp: 'Now'
                  }}
                />
              )}
              <div ref={messageEndRef} />
            </>
          )}
        </div>

        {/* Floating suggestion pills if conversation is active */}
        {messages.length > 0 && (
          <div className="px-6 py-2 border-t border-white/5 bg-neutral-950/20 overflow-x-auto flex space-x-2 shrink-0">
            {['What did I learn this week?', 'What should I learn next?', 'What is my skill profile?'].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPrompt(q)}
                className="px-3 py-1 bg-neutral-900 border border-white/5 hover:border-neutral-700 text-[10px] text-neutral-400 font-mono rounded-full hover:text-white whitespace-nowrap transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Chat input box */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#090909] flex items-center space-x-3 shrink-0">
          <input
            type="text"
            className="flex-1 px-4 py-2.5 bg-neutral-900/80 border border-white/5 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-all font-mono"
            placeholder="Query your intellectual history... (e.g. what should I learn next?)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 bg-[#D7FF00] hover:bg-[#c2e600] disabled:bg-neutral-800 disabled:text-neutral-500 text-black rounded-xl transition-all shadow-[0_0_10px_rgba(215,255,0,0.2)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
