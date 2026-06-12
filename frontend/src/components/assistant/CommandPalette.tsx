import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAssistant } from '../../hooks/useAssistant';
import { useApp, type ActivePage } from '../../context/AppContext';
import { Search, Monitor, Cpu, Layers, Sparkles, Network } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, askQuickQuestion } = useAssistant();
  const { setActivePage, memories } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  // List of navigation actions
  const navActions = [
    { label: 'Go to Dashboard', page: 'dashboard' as ActivePage, icon: <Monitor className="w-3.5 h-3.5" /> },
    { label: 'Go to AI Learning Twin', page: 'twin' as ActivePage, icon: <Cpu className="w-3.5 h-3.5" /> },
    { label: 'Go to Learning Memories Explorer', page: 'memories' as ActivePage, icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'Go to Knowledge Graph', page: 'graph' as ActivePage, icon: <Network className="w-3.5 h-3.5" /> }
  ];

  // List of AI quick queries
  const aiQueries = [
    { label: 'Ask Twin: What did I learn this week?', query: 'What did I learn this week?', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: 'Ask Twin: What should I learn next?', query: 'What should I learn next?', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: 'Ask Twin: Summarize my last 30 days', query: 'Summarize my last 30 days.', icon: <Sparkles className="w-3.5 h-3.5" /> }
  ];

  // Filters results based on user typing
  const filteredItems = useMemo(() => {
    const term = query.toLowerCase().trim();
    
    const navs = navActions
      .filter((n) => n.label.toLowerCase().includes(term))
      .map((item) => ({ ...item, type: 'nav' }));
      
    const ais = aiQueries
      .filter((a) => a.label.toLowerCase().includes(term))
      .map((item) => ({ ...item, type: 'ai' }));
      
    const mems = memories
      .filter((m) => m.topic.toLowerCase().includes(term) || m.aiSummary.toLowerCase().includes(term))
      .slice(0, 3)
      .map((item) => ({
        label: `Memory: ${item.topic} (${item.date})`,
        page: 'memories' as ActivePage,
        type: 'memory',
        icon: <Layers className="w-3.5 h-3.5" />
      }));

    return [...navs, ...ais, ...mems];
  }, [query, memories]);

  // Handle Keyboard navigation inside the palette
  useEffect(() => {
    if (!isCommandPaletteOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          triggerAction(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, selectedIndex, filteredItems]);

  if (!isCommandPaletteOpen) return null;

  const triggerAction = (item: any) => {
    setIsCommandPaletteOpen(false);
    if (item.type === 'nav' || item.type === 'memory') {
      setActivePage(item.page);
    } else if (item.type === 'ai') {
      askQuickQuestion(item.query);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/70 backdrop-blur-md flex items-start justify-center pt-[15vh] p-4">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setIsCommandPaletteOpen(false)} />

      {/* Palette Container */}
      <div className="relative w-full max-w-lg bg-[#090909] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10">
        
        {/* Search bar input */}
        <div className="flex items-center px-4 py-3 border-b border-white/5 bg-neutral-950/40">
          <Search className="w-4 h-4 text-neutral-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
            placeholder="Type a command or query your learning history..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="text-[10px] text-neutral-500 font-mono select-none">ESC TO CLOSE</span>
        </div>

        {/* Command list */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500 font-mono">
              No commands or learning memories matched your query.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={idx}
                  onClick={() => triggerAction(item)}
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-mono cursor-pointer select-none transition-all
                    ${isSelected 
                      ? 'bg-neutral-900 text-[#D7FF00] border-l-2 border-[#D7FF00]' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/30'
                    }
                  `}
                >
                  <span className={isSelected ? 'text-[#D7FF00]' : 'text-neutral-500 shrink-0'}>
                    {item.icon}
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {isSelected && (
                    <span className="text-[9px] text-neutral-500 font-mono shrink-0">ENTER</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
