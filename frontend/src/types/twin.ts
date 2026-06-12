export interface TwinMetrics {
  confidenceScore: number;
  consistencyScore: number;
  knowledgeDepth: number;
  knowledgeBreadth: number;
  curiosityIndex: number;
  researchIntensity: number;
  learningMomentum: 'High' | 'Medium' | 'Emerging';
}

export interface LearningPersonality {
  type: string;
  description: string;
  radarTraits: {
    trait: string;
    value: number;
  }[];
}

export interface LearningStyle {
  primary: string;
  description: string;
}

export interface LearningTwinData {
  // Backend fields
  totalMemories?: number;
  topSkill?: string;
  topTopic?: string;
  curiosityScore?: number;
  learningMomentum?: number;
  learningPersonality?: string;

  // Legacy frontend fields
  metrics?: TwinMetrics;

  personality?: LearningPersonality;

  style?: LearningStyle;

  strengths?: string[];
  weakAreas?: string[];
  curiosityPatterns?: string[];
  careerTendencies?: string[];
  aiSummary?: string;
}