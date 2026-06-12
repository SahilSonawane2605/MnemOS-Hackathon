import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LearningTwinData } from '../types/twin';
import type { LearningMemory, RawTelemetryEvent } from '../types/memory';
import type { SkillData } from '../types/skill';
import type { CareerInsight } from '../types/api';
import { getLearningTwin, getCareerInsights } from '../services/twinService';
import { getMemories, postMemory, getRawTelemetryFeed } from '../services/memoryService';
import { getSkills } from '../services/skillService';

export type ActivePage =
  | 'dashboard'
  | 'twin'
  | 'memories'
  | 'graph'
  | 'timeline'
  | 'skills'
  | 'career'
  | 'assistant'
  | 'extension'
  | 'settings';

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  twinData: LearningTwinData | null;
  memories: LearningMemory[];
  telemetryEvents: RawTelemetryEvent[];
  skills: SkillData[];
  careerInsights: CareerInsight[];
  isLoading: boolean;
  isSyncing: boolean;
  setIsSyncing: (syncing: boolean) => void;
  refreshAllData: () => Promise<void>;
  addNewMemory: (memory: Omit<LearningMemory, 'id'>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [twinData, setTwinData] = useState<LearningTwinData | null>(null);
  const [memories, setMemories] = useState<LearningMemory[]>([]);
  const [telemetryEvents, setTelemetryEvents] = useState<RawTelemetryEvent[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [careerInsights, setCareerInsights] = useState<CareerInsight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [twin, mems, tels, sks, careers] = await Promise.all([
        getLearningTwin(),
        getMemories(),
        getRawTelemetryFeed(),
        getSkills(),
        getCareerInsights()
      ]);
      setTwinData(twin);
      setMemories(mems);
      setTelemetryEvents(tels);
      setSkills(sks);
      setCareerInsights(careers);
    } catch (error) {
      console.error('Failed to load application data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Simulates telemetry updates in the background
  useEffect(() => {
    if (!isSyncing) return;
    
    const interval = setInterval(() => {
      // Pick a random telemetry event and make it "Processed" or add a new telemetry log
      setTelemetryEvents((prev) => {
        if (prev.length === 0) return prev;
        const copy = [...prev];
        const randomIndex = Math.floor(Math.random() * copy.length);
        
        // Simulating processing state shift
        if (copy[randomIndex].status === 'Analyzing') {
          copy[randomIndex] = {
            ...copy[randomIndex],
            status: 'Processed'
          };
        } else if (copy[randomIndex].status === 'Syncing') {
          copy[randomIndex] = {
            ...copy[randomIndex],
            status: 'Analyzing'
          };
        } else {
          // Toggle back to Syncing to show action
          copy[randomIndex] = {
            ...copy[randomIndex],
            status: 'Syncing',
            timestamp: new Date().toISOString()
          };
        }
        return copy;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isSyncing]);

  const refreshAllData = async () => {
    await loadData();
  };

  const addNewMemory = async (memory: Omit<LearningMemory, 'id'>) => {
    const created = await postMemory(memory);
    setMemories((prev) => [created, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        twinData,
        memories,
        telemetryEvents,
        skills,
        careerInsights,
        isLoading,
        isSyncing,
        setIsSyncing,
        refreshAllData,
        addNewMemory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
