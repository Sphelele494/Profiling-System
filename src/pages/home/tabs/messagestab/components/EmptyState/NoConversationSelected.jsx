import React from 'react';
import { MessageCircle } from 'lucide-react';
import './EmptyState.css';

export const NoConversationSelected = () => {
  return (
    <div className="no-conversation-selected">
      <MessageCircle size={64} />
      <h4>Select a conversation</h4>
      <p>Choose a South African employer from the list to start messaging</p>
    </div>
  );
};