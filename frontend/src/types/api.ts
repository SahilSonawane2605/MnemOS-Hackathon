export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface HealthResponse {
  status: 'healthy' | 'degraded' | 'syncing';
  version: string;
  uptime: number;
  extensionConnected: boolean;
  lastSyncTime: string;
}

export interface CareerRoadmapStep {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'course' | 'documentation';
  estimatedHours: number;
  completed: boolean;
}

export interface CareerInsight {
  id: string;
  role: string;
  matchPercentage: number;
  evidence: string[];
  skillGaps: string[];
  recommendedRoadmap: CareerRoadmapStep[];
  aiExplanation: string;
}

export interface LearningTwinData {
  totalMemories: number;
  topSkill: string;
  topTopic: string;
  curiosityScore: number;
  learningMomentum: number;
  learningPersonality: string;
}