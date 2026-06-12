import React from 'react';
import { useApp, type ActivePage } from '../../context/AppContext';
import {
LayoutDashboard,
Cpu,
Layers,
Network,
CalendarDays,
TrendingUp,
Award,
MessageSquareCode,
Radio,
Settings as SettingsIcon
} from 'lucide-react';

export const Sidebar: React.FC = () => {
const { activePage, setActivePage, isSyncing } = useApp();

interface NavItem {
id: ActivePage;
label: string;
icon: React.ReactNode;
}

const navItems: NavItem[] = [
{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
{ id: 'twin', label: 'AI Learning Twin', icon: <Cpu className="w-4 h-4" /> },
{ id: 'memories', label: 'Learning Memories', icon: <Layers className="w-4 h-4" /> },
{ id: 'graph', label: 'Knowledge Graph', icon: <Network className="w-4 h-4" /> },
{ id: 'timeline', label: 'Learning Timeline', icon: <CalendarDays className="w-4 h-4" /> },
{ id: 'skills', label: 'Skill Evolution', icon: <TrendingUp className="w-4 h-4" /> },
{ id: 'career', label: 'Career Insights', icon: <Award className="w-4 h-4" /> },
{ id: 'assistant', label: 'AI Assistant', icon: <MessageSquareCode className="w-4 h-4" /> },
{ id: 'extension', label: 'Extension Status', icon: <Radio className="w-4 h-4" /> },
{ id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> }
];

return ( <aside className="w-72 border-r border-white/10 bg-[#050505] flex flex-col h-screen overflow-y-auto shrink-0 select-none">

  {/* Brand Header */}
  <div className="p-6 border-b border-white/5">
    <div className="flex flex-col items-center text-center">

      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D7FF00]/40 shadow-[0_0_25px_rgba(215,255,0,0.25)]">
        <img
          src="/logo.jpeg"
          alt="MnemOS Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">
        MnemOS
      </h1>

      <p className="text-xs text-neutral-400 mt-1 tracking-wide">
        Your AI Learning Twin
      </p>

      <div className="mt-3 px-3 py-1 rounded-full border border-[#D7FF00]/20 bg-[#D7FF00]/5">
        <span className="text-[10px] text-[#D7FF00] font-mono">
          Team Abhimanyu
        </span>
      </div>

    </div>
  </div>

  {/* Product Description */}
  <div className="mx-4 mt-4 p-4 bg-neutral-900/60 border border-white/5 rounded-xl text-[11px] text-neutral-400">

    <span className="text-white font-semibold block mb-1">
      AI LEARNING TWIN
    </span>

    <span className="italic leading-relaxed">
      Transforms browsing activity into learning intelligence and actionable insights.
    </span>

  </div>

  {/* Navigation */}
  <nav className="flex-1 px-3 py-6 space-y-1">
    {navItems.map((item) => {
      const isActive = activePage === item.id;

      return (
        <button
          key={item.id}
          onClick={() => setActivePage(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-150 font-mono ${
            isActive
              ? 'bg-neutral-900 text-[#D7FF00] border-l-2 border-[#D7FF00]'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
          }`}
        >
          <span className={isActive ? 'text-[#D7FF00]' : 'text-neutral-400'}>
            {item.icon}
          </span>

          <span>{item.label}</span>
        </button>
      );
    })}
  </nav>

  {/* Agent Status */}
  <div className="p-4 border-t border-white/10 bg-neutral-950/40">
    <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/50 border border-white/5">

      <div className="flex items-center space-x-2">

        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isSyncing ? 'bg-emerald-400' : 'bg-red-400'
            }`}
          />

          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isSyncing ? 'bg-emerald-500' : 'bg-red-500'
            }`}
          />
        </span>

        <span className="text-[10px] text-neutral-300 font-mono">
          {isSyncing ? 'MnemOS Agent Live' : 'Agent Disconnected'}
        </span>

      </div>

      <span className="text-[9px] text-neutral-500 font-mono">
        v1.0.0
      </span>

    </div>
  </div>

</aside>
)}
export default Sidebar;
