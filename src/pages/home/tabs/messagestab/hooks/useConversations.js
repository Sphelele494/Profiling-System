import { useState, useMemo } from 'react';
import { mockConversations } from '../utils/mockData'; 

export function useConversations({ filter }) {
  const [conversations, setConversations] = useState(mockConversations);

  const filteredConversations = useMemo(() => {
    if (filter === 'Unread') {
      return conversations.filter(convo => convo.unread);
    }
    return conversations;
  }, [conversations, filter]);

  const markAsRead = (conversationId) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, unread: false } : conv
    ));
  };

  const updateLastMessage = (conversationId, message) => {
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { 
            ...conv, 
            lastMessage: message, 
            time: 'Just now',
            unread: false 
          }
        : conv
    ));
  };

  return {
    conversations,
    filteredConversations,
    markAsRead,
    updateLastMessage
  };
}