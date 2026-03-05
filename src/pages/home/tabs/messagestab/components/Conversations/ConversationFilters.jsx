import React from 'react';
import './Conversations.css';

export const ConversationFilters = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="conversation-filters">
      <button 
        className={`filter-btn ${currentFilter === 'All' ? 'active' : ''}`}
        onClick={() => onFilterChange('All')}
      >
        All
      </button>
      <button 
        className={`filter-btn ${currentFilter === 'Unread' ? 'active' : ''}`}
        onClick={() => onFilterChange('Unread')}
      >
        Unread
      </button>
    </div>
  );
};