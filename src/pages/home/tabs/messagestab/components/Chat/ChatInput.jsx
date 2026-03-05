import React from 'react';
import { Send } from 'lucide-react';
import './Chat.css';

export const ChatInput = ({ value, onChange, onSend, onKeyPress }) => {
  return (
    <div className="chat-input-area">
      <div className="message-input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Type your message..."
          className="message-input"
        />
        <button
          className="send-message-btn"
          onClick={onSend}
          disabled={!value.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};