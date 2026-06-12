import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import { AssistantProvider } from './context/AssistantContext';
import { MainLayout } from './components/layout/MainLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { LearningTwin } from './pages/LearningTwin';
import { LearningMemories } from './pages/LearningMemories';
import { KnowledgeGraph } from './pages/KnowledgeGraph';
import { Timeline } from './pages/Timeline';
import { Skills } from './pages/Skills';
import { Career } from './pages/Career';
import { Assistant } from './pages/Assistant';
import { ExtensionStatus } from './pages/ExtensionStatus';
import { Settings } from './pages/Settings';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'twin':
        return <LearningTwin />;
      case 'memories':
        return <LearningMemories />;
      case 'graph':
        return <KnowledgeGraph />;
      case 'timeline':
        return <Timeline />;
      case 'skills':
        return <Skills />;
      case 'career':
        return <Career />;
      case 'assistant':
        return <Assistant />;
      case 'extension':
        return <ExtensionStatus />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return <MainLayout>{renderActivePage()}</MainLayout>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <AssistantProvider>
          <AppContent />
        </AssistantProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
