import React from 'react';
import { ConversationFilters } from './ConversationFilters';
import { ConversationItem } from './ConversationItem';
import './Conversations.css';

export const ConversationsSidebar = ({
  conversations,
  selectedConversation,
  filter,
  onFilterChange,
  onConversationSelect
}) => {
  return (
    <div className="conversations-sidebar">
      <div className="conversations-header">
        <h4 className="conversations-title">Employer Conversations</h4>
        <ConversationFilters
          currentFilter={filter}
          onFilterChange={onFilterChange}
        />
      </div>
      
      <div className="conversations-list">
        {conversations.length === 0 ? (
          <div className="no-conversations">
            <p>No conversations found</p>
          </div>
        ) : (
          conversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation?.id === conversation.id}
              onSelect={() => onConversationSelect(conversation)}
            />
          ))
        )}
      </div>
    </div>
  );
};