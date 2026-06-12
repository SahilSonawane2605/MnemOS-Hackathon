import type { SkillData } from '../types/skill';

export const mockSkills: SkillData[] = [
  {
    id: 'skill-1',
    name: 'Cloud Computing',
    level: 82,
    growthRate: 14,
    learningVelocity: 4.5,
    confidenceScore: 91,
    momentum: 'High',
    history: [
      { date: 'May 07', level: 70 },
      { date: 'May 14', level: 72 },
      { date: 'May 21', level: 75 },
      { date: 'May 28', level: 77 },
      { date: 'Jun 04', level: 80 },
      { date: 'Jun 11', level: 82 }
    ]
  },
  {
    id: 'skill-2',
    name: 'DevOps',
    level: 78,
    growthRate: 18,
    learningVelocity: 5.2,
    confidenceScore: 89,
    momentum: 'High',
    history: [
      { date: 'May 07', level: 62 },
      { date: 'May 14', level: 66 },
      { date: 'May 21', level: 70 },
      { date: 'May 28', level: 73 },
      { date: 'Jun 04', level: 76 },
      { date: 'Jun 11', level: 78 }
    ]
  },
  {
    id: 'skill-3',
    name: 'Web Development',
    level: 85,
    growthRate: 6,
    learningVelocity: 2.1,
    confidenceScore: 93,
    momentum: 'Medium',
    history: [
      { date: 'May 07', level: 80 },
      { date: 'May 14', level: 81 },
      { date: 'May 21', level: 82 },
      { date: 'May 28', level: 83 },
      { date: 'Jun 04', level: 84 },
      { date: 'Jun 11', level: 85 }
    ]
  },
  {
    id: 'skill-4',
    name: 'AI/ML',
    level: 64,
    growthRate: 25,
    learningVelocity: 6.8,
    confidenceScore: 85,
    momentum: 'Emerging',
    history: [
      { date: 'May 07', level: 48 },
      { date: 'May 14', level: 50 },
      { date: 'May 21', level: 54 },
      { date: 'May 28', level: 57 },
      { date: 'Jun 04', level: 60 },
      { date: 'Jun 11', level: 64 }
    ]
  },
  {
    id: 'skill-5',
    name: 'Cybersecurity',
    level: 52,
    growthRate: 8,
    learningVelocity: 1.5,
    confidenceScore: 78,
    momentum: 'Emerging',
    history: [
      { date: 'May 07', level: 48 },
      { date: 'May 14', level: 48 },
      { date: 'May 21', level: 49 },
      { date: 'May 28', level: 50 },
      { date: 'Jun 04', level: 51 },
      { date: 'Jun 11', level: 52 }
    ]
  },
  {
    id: 'skill-6',
    name: 'Data Science',
    level: 45,
    growthRate: 2,
    learningVelocity: 0.5,
    confidenceScore: 72,
    momentum: 'Emerging',
    history: [
      { date: 'May 07', level: 44 },
      { date: 'May 14', level: 44 },
      { date: 'May 21', level: 45 },
      { date: 'May 28', level: 45 },
      { date: 'Jun 04', level: 45 },
      { date: 'Jun 11', level: 45 }
    ]
  }
];
