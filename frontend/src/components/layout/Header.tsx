import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAssistant } from '../../hooks/useAssistant';
import { SearchBar } from '../common/SearchBar';
import { Button } from '../common/Button';
import { Sparkles, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  const { activePage } = useApp();
  const { setIsCommandPaletteOpen, setIsAssistantModalOpen } = useAssistant();

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return 'Intellectual Dashboard';
      case 'twin':
        return 'AI Learning Twin';
      case 'memories':
        return 'Learning Memories Explorer';
      case 'graph':
        return 'Knowledge Graph';
      case 'timeline':
        return 'Learning Timeline';
      case 'skills':
        return 'Skill Evolution';
      case 'career':
        return 'Career Insights';
      case 'assistant':
        return 'AI Assistant Workspace';
      case 'extension':
        return 'Extension Status Logs';
      case 'settings':
        return 'System Settings';
      default:
        return 'MnemOS';
    }
  };

  return (
    <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between shrink-0 bg-[#050505] select-none">
      {/* Title / Breadcrumb */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-neutral-400 font-mono">system /</span>
        <h2 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">{getPageTitle()}</h2>
      </div>

      {/* Global Search & Actions */}
      <div className="flex items-center space-x-6 w-96 justify-end">
        {/* Clickable Search Input which triggers Command Palette */}
        <div className="w-64 cursor-pointer" onClick={() => setIsCommandPaletteOpen(true)}>
          <SearchBar placeholder="Search memories... (⌘K)" showShortcut={false} readOnly />
        </div>

        {/* Global Quick Action triggers */}
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAssistantModalOpen(true)}
            className="flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-mono">Ask MnemOS</span>
          </Button>
          
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-neutral-900 border border-emerald-500/20 rounded-lg text-emerald-400">
            <Activity className="w-3 h-3 animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider">SYNCED</span>
          </div>
        </div>
      </div>
    </header>
  );
};
