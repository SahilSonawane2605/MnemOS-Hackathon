import { request } from './api';
import type { LearningMemory, RawTelemetryEvent } from '../types/memory';
import { mockMemories, mockTelemetryEvents } from '../mock/memoryMock';

export async function getMemories(): Promise<LearningMemory[]> {
  try {
    return await request<LearningMemory[]>('/timeline');
  } catch (error) {
    // Fallback to mock data in case backend is offline
    return mockMemories;
  }
}

export async function postMemory(memory: Omit<LearningMemory, 'id'>): Promise<LearningMemory> {
  try {
    return await request<LearningMemory>('/memory', 'POST', memory);
  } catch (error) {
    // Return a mocked representation with a generated ID
    return {
      ...memory,
      id: `mem-${Math.floor(Math.random() * 10000)}`,
    };
  }
}

export async function getRawTelemetryFeed(): Promise<RawTelemetryEvent[]> {
  // Simulates fetching real-time telemetry captured by the MnemOS browser extension
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTelemetryEvents);
    }, 100);
  });
}
