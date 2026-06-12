import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { FloatingAIButton } from '../assistant/FloatingAIButton';
import { GlobalAssistantModal } from '../assistant/GlobalAssistantModal';
import { CommandPalette } from '../assistant/CommandPalette';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050505] text-white font-sans antialiased">
      {/* Navigation sidebar */}
      <Sidebar />

      {/* Main workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top header navigation */}
        <Header />

        {/* Dynamic page container */}
        <main className="flex-1 overflow-y-auto bg-radial-gradient">
          <div className="container mx-auto p-8 max-w-7xl animate-fadeIn">
            {children}
          </div>
        </main>
      </div>

      {/* Global Floating AI triggers */}
      <FloatingAIButton />
      <GlobalAssistantModal />
      <CommandPalette />
    </div>
  );
};
