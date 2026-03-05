import React from 'react';
import { Avatar } from '../Common/Avatar';
import { VerifiedBadge } from '../Common/VerifiedBadge';
import './Conversations.css';

export const ConversationItem = ({ conversation, isSelected, onSelect }) => {
  const { employer, logo, lastMessage, time, unread, verified } = conversation;

  return (
    <div 
      className={`conversation-item ${isSelected ? 'active' : ''} ${unread ? 'unread' : ''}`}
      onClick={onSelect}
    >
      <div className="conversation-avatar">
        <Avatar src={logo} alt={employer} fallback={employer.charAt(0)} />
        {verified && <VerifiedBadge />}
      </div>
      <div className="conversation-details">
        <div className="conversation-header">
          <h5 className="employer-name">{employer}</h5>
          <span className="conversation-time">{time}</span>
        </div>
        <p className="conversation-preview">{lastMessage}</p>
        {unread && <span className="unread-indicator"></span>}
      </div>
    </div>
  );
};