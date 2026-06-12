import React, { useRef, useEffect, useState } from 'react';
import { useAssistant } from '../hooks/useAssistant';
import { ChatMessage } from '../components/assistant/ChatMessage';
import { SuggestedPrompts } from '../components/assistant/SuggestedPrompts';
import { Cpu, Send, Trash2 } from 'lucide-react';

export const Assistant: React.FC = () => {
  const {
    messages,
    chatHistory,
    isTyping,
    sendMessage,
    clearConversation
  } = useAssistant();

  const [input, setInput] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
    <div className="flex h-[76vh] bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative select-none">
      
      {/* Left Column: Chat History list */}
      <div className="w-64 border-r border-white/5 bg-neutral-950/40 hidden md:flex flex-col select-none">
        
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-neutral-400 font-mono tracking-wider">CONVERSATION PATHS</span>
          <button
            onClick={clearConversation}
            className="p-1 text-neutral-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
            title="Clear Feed"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* History items */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatHistory.map((hist) => (
            <div
              key={hist.id}
              onClick={() => handleSelectPrompt(hist.title)}
              className="px-3 py-2 text-left rounded-lg text-[11px] font-mono text-neutral-400 hover:text-white hover:bg-neutral-900/60 cursor-pointer truncate transition-all"
            >
              {hist.title}
            </div>
          ))}
        </div>

      </div>

      {/* Right Column: Conversational Workspace */}
      <div className="flex-1 flex flex-col h-full bg-[#050505]">
        
        {/* Conversational stream scroll area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {messages.length === 0 ? (
            <div className="max-w-2xl mx-auto space-y-8 py-12">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#D7FF00]/10 border border-[#D7FF00]/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(215,255,0,0.2)]">
                  <Cpu className="w-6 h-6 text-[#D7FF00]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">MnemOS Workspace Assistant</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto font-sans leading-relaxed pt-1">
                    Query your learning twin parameters, skills momentum, or career diagnostic evidence.
                  </p>
                </div>
              </div>

              <div className="max-w-lg mx-auto border-t border-white/5 pt-6">
                <SuggestedPrompts onSelectPrompt={handleSelectPrompt} />
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
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
            </div>
          )}
        </div>

        {/* Floating helper shortcuts */}
        {messages.length > 0 && (
          <div className="px-6 py-2 border-t border-white/5 bg-neutral-950/20 overflow-x-auto flex space-x-2 shrink-0 select-none">
            {['What did I learn this week?', 'What are my strongest skills?', 'Summarize my last 30 days.'].map((q, idx) => (
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

        {/* Input Form */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-white/5 bg-[#070707] flex items-center space-x-3 shrink-0"
        >
          <input
            type="text"
            className="flex-1 px-4 py-3 bg-neutral-900/80 border border-white/5 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-all font-mono"
            placeholder="Query your cognitive operating system..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 bg-[#D7FF00] hover:bg-[#c2e600] disabled:bg-neutral-800 disabled:text-neutral-500 text-black rounded-xl transition-all shadow-[0_0_15px_rgba(215,255,0,0.2)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
export default Assistant;
