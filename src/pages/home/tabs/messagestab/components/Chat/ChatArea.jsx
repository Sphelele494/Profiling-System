import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import './Chat.css';

export const ChatArea = ({
  conversation,
  messages,
  isTyping,
  messageInput,
  onMessageChange,
  onSendMessage,
  onKeyPress
}) => {
  return (
    <div className="chat-area">
      <ChatHeader conversation={conversation} />
      <ChatMessages messages={messages} isTyping={isTyping} employerName={conversation.employer} />
      <ChatInput
        value={messageInput}
        onChange={onMessageChange}
        onSend={onSendMessage}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};