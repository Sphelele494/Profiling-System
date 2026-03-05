import React from 'react';
import { MessageCircle } from 'lucide-react';
import './MessagesHeader.css';

export const MessagesHeader = () => {
  return (
    <div className="messages-header">
      <h3 className="section-title">
        <MessageCircle size={28} />
        <span>Messages</span>
      </h3>
      <p className="section-subtitle">Communicate with verified South African employers only</p>
    </div>
  );
};