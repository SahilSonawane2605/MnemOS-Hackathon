import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ChatMessage, ChatHistoryItem } from '../types/chat';
import { mockChatMessages, mockChatHistory } from '../mock/chatMock';
import { sendChatMessage, streamResponse } from '../services/chatService';

interface AssistantContextType {
  messages: ChatMessage[];
  chatHistory: ChatHistoryItem[];
  isTyping: boolean;
  isAssistantModalOpen: boolean;
  isCommandPaletteOpen: boolean;
  setIsAssistantModalOpen: (open: boolean) => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
  sendMessage: (content: string) => Promise<void>;
  askQuickQuestion: (question: string) => Promise<void>;
  clearConversation: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>(mockChatHistory);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Modals visibility state
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global Keyboard shortcuts: Cmd+K / Ctrl+K for command palette, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsAssistantModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addMessageToFeed = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleMessageSend = async (content: string, streamOutput: boolean = true) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: 'Just now'
    };
    
    // Add user message to state
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Collect message history for context
      const chatHistoryPayload = messages
        .concat(userMsg)
        .map((m) => ({ sender: m.sender, content: m.content }));

      // Fetch AI response
      const aiResponse = await sendChatMessage(chatHistoryPayload);
      setIsTyping(false);

      if (streamOutput) {
        // Prepare container for streaming text
        const streamingMsg: ChatMessage = {
          id: aiResponse.id,
          sender: 'assistant',
          content: '',
          citations: aiResponse.citations,
          timestamp: 'Just now',
          isStreaming: true
        };
        
        // Push initial empty streaming message
        setMessages((prev) => [...prev, streamingMsg]);

        // Start streaming text chunks
        streamResponse(
          aiResponse.content,
          (chunkText) => {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiResponse.id ? { ...msg, content: chunkText } : msg
              )
            );
          },
          () => {
            // Streaming completed
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiResponse.id ? { ...msg, isStreaming: false } : msg
              )
            );
          }
        );
      } else {
        // Immediate placement
        addMessageToFeed(aiResponse);
      }

      // Add to conversation history sidebar if new thread
      const title = content.length > 30 ? `${content.substring(0, 30)}...` : content;
      setChatHistory((prev) => {
        if (prev.some((h) => h.title === title)) return prev;
        return [{ id: `ch-${Date.now()}`, title, timestamp: 'Just now' }, ...prev];
      });

    } catch (error) {
      console.error('Failed to get assistant response:', error);
      setIsTyping(false);
      addMessageToFeed({
        id: `m-err-${Date.now()}`,
        sender: 'assistant',
        content: "I ran into a connection error syncing with your learning twin. Please verify the API status.",
        timestamp: 'Just now'
      });
    }
  };

  const sendMessage = async (content: string) => {
    await handleMessageSend(content, true);
  };

  const askQuickQuestion = async (question: string) => {
    setIsAssistantModalOpen(true);
    await handleMessageSend(question, true);
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <AssistantContext.Provider
      value={{
        messages,
        chatHistory,
        isTyping,
        isAssistantModalOpen,
        isCommandPaletteOpen,
        setIsAssistantModalOpen,
        setIsCommandPaletteOpen,
        sendMessage,
        askQuickQuestion,
        clearConversation
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};
