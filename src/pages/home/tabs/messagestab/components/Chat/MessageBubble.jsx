import React from 'react';
import './Chat.css';

export const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`message ${isUser ? 'sent' : 'received'}`}>
      <div className="message-content">
        <p>{message.content}</p>
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  );
};