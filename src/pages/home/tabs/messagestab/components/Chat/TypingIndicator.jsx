import React from 'react';
import './Chat.css';

export const TypingIndicator = ({ employerName }) => {
  return (
    <div className="typing-indicator">
      <span>{employerName} is typing...</span>
    </div>
  );
};