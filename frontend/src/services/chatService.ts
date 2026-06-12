import { request } from './api';
import type { ChatMessage } from '../types/chat';

/**
 * Sends messages to the chatbot backend
 * POST /chat
 */
export async function sendChatMessage(messages: { sender: 'user' | 'assistant'; content: string }[]): Promise<ChatMessage> {
  try {
    return await request<ChatMessage>('/chat', 'POST', { messages });
  }catch (error) {
  console.error(error);

  throw error;
}}
/**
 * Simulates a streaming typewriter output for a premium ChatGPT/Claude feel.
 */
export function streamResponse(
  content: string,
  onChunk: (text: string) => void,
  onComplete: () => void,
  speedMs: number = 15
) {
  let index = 0;
  let currentText = '';
  
  const timer = setInterval(() => {
    if (index < content.length) {
      currentText += content[index];
      onChunk(currentText);
      index++;
    } else {
      clearInterval(timer);
      onComplete();
    }
  }, speedMs);
  
  return () => clearInterval(timer);
}

/**
 * Local AI engine logic that reads memory files and responds intelligently.
 * Makes MnemOS feel like a live cognitive twin.
 */
