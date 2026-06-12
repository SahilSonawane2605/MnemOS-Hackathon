export type SkillMomentum = 'High' | 'Medium' | 'Emerging';

export interface SkillHistoryPoint {
  date: string;
  level: number;
}

export interface SkillData {
  id: string;
  name: string;
  level: number;                 // current rating/score
  growthRate: number;            // e.g. 15% increase
  learningVelocity: number;      // hrs/week or tasks/week
  confidenceScore: number;       // e.g. 92%
  momentum: SkillMomentum;
  history: SkillHistoryPoint[];
}
