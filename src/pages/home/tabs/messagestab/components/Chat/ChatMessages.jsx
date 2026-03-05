import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import './Chat.css';

export const ChatMessages = ({ messages, isTyping, employerName }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-messages">
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator employerName={employerName} />}
      <div ref={messagesEndRef} />
    </div>
  );
};