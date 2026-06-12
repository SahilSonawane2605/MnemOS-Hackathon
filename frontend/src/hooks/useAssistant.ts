import { useAssistant as useAssistantContext } from '../context/AssistantContext';

export function useAssistant() {
  const context = useAssistantContext();
  return {
    messages: context.messages,
    chatHistory: context.chatHistory,
    isTyping: context.isTyping,
    isAssistantModalOpen: context.isAssistantModalOpen,
    isCommandPaletteOpen: context.isCommandPaletteOpen,
    setIsAssistantModalOpen: context.setIsAssistantModalOpen,
    setIsCommandPaletteOpen: context.setIsCommandPaletteOpen,
    sendMessage: context.sendMessage,
    askQuickQuestion: context.askQuickQuestion,
    clearConversation: context.clearConversation
  };
}
