import React from 'react';
import { Phone, Archive, MoreVertical } from 'lucide-react';
import { Avatar } from '../Common/Avatar';
import { StatusDot } from '../Common/StatusDot';
import './Chat.css';

export const ChatHeader = ({ conversation }) => {
  const { employer, logo, verified } = conversation;

  return (
    <div className="chat-header">
      <div className="chat-partner">
        <div className="partner-avatar">
          <Avatar src={logo} alt={employer} fallback={employer.charAt(0)} size={48} />
        </div>
        <div className="partner-info">
          <h4 className="partner-name">{employer}</h4>
          <div className="partner-status">
            <StatusDot status="online" />
            <span>Verified South African Employer</span>
          </div>
        </div>
      </div>
      <div className="chat-actions">
        <button className="chat-action-btn">
          <Phone size={18} />
        </button>
        <button className="chat-action-btn">
          <Archive size={18} />
        </button>
        <button className="chat-action-btn">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};