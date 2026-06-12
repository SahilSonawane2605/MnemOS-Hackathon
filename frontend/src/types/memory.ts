export interface LearningMemory {
  id: string;
  topic: string;
  source: 'GitHub' | 'YouTube' | 'Documentation' | 'Medium' | 'StackOverflow' | 'Other';
  sourceUrl: string;
  confidenceScore: number;       // e.g. 94%
  date: string;                  // e.g. "June 15, 2026"
  skillImpact: string;           // e.g. "+4 Cloud Computing"
  aiSummary: string;
}

export interface RawTelemetryEvent {
  id: string;
  url: string;
  title: string;
  timestamp: string;
  status: 'Connected' | 'Syncing' | 'Analyzing' | 'Processed';
  classification: string;        // e.g. "Cloud Computing", "AI/ML"
  confidenceScore: number;
}
