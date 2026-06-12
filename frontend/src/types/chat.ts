export interface ChatCitation {
  id: string;
  topic: string;
  source: string;
  confidenceScore: number;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: ChatCitation[];
  isStreaming?: boolean;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}
