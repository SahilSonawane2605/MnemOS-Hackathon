import { request } from './api';
import type { SkillData } from '../types/skill';
import { mockSkills } from '../mock/skillsMock';

export async function getSkills(): Promise<SkillData[]> {
  try {
    return await request<SkillData[]>('/skills');
  } catch (error) {
    // Fallback to mock data in case backend is offline
    return mockSkills;
  }
}
